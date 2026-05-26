// ============================================
// VUNASHORTS — Global Store
// ============================================
import { SERIES as initialSeries, CREATORS } from '../data/mock-data.js';
import { io } from 'socket.io-client';

const API_URL = import.meta.env.VITE_API_URL || (window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://vunashorts.onrender.com');
const socket = io(API_URL);
window.__vunaSocket = socket; // Expose for payment listeners

class Store {
  constructor() {
    this.state = {
      series: [],
    };
    this.listeners = {};
    this.init();

    // Listen for real-time new series
    socket.on('new_series', (series) => {
      // Check if it already exists to avoid duplicates
      if (!this.state.series.find(s => s.id === series.id)) {
        this.state.series.unshift(series);
        this.notify('series');
      }
    });
  }

  async init() {
    try {
      const res = await fetch(`${API_URL}/api/series`);
      if (res.ok) {
        this.state.series = await res.json();
        this.notify('series');
      } else {
        console.warn('Failed to fetch from API, falling back to mock data');
        this.state.series = [...initialSeries];
        this.notify('series');
      }
    } catch (e) {
      console.warn('API not reachable, using mock data');
      this.state.series = [...initialSeries];
      this.notify('series');
    }
  }

  // Subscribe to changes
  subscribe(key, callback) {
    if (!this.listeners[key]) this.listeners[key] = [];
    this.listeners[key].push(callback);
    return () => {
      this.listeners[key] = this.listeners[key].filter(cb => cb !== callback);
    };
  }

  // Notify listeners
  notify(key) {
    if (this.listeners[key]) {
      this.listeners[key].forEach(cb => cb(this.state[key]));
    }
  }

  // Getters
  getSeries() {
    return this.state.series;
  }

  getCreatorSeries(creatorId) {
    return this.state.series.filter(s => s.creator.id === creatorId);
  }

  searchSeries(query) {
    if (!query) return this.state.series;
    const q = query.toLowerCase();
    return this.state.series.filter(s => 
      s.title.toLowerCase().includes(q) || 
      (s.genre && s.genre.toLowerCase().includes(q)) ||
      (s.tags && s.tags.some(t => t.toLowerCase().includes(q)))
    );
  }

  // Actions
  addSeries(data, onProgress) {
    let formData = data;
    if (!(data instanceof FormData)) {
      formData = new FormData();
      for (const key in data) {
        if (data[key] !== undefined && data[key] !== null) {
          if (Array.isArray(data[key])) {
            formData.append(key, JSON.stringify(data[key]));
          } else {
            formData.append(key, data[key]);
          }
        }
      }
    }

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `${API_URL}/api/series`);
      
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable && onProgress) {
          const percentComplete = (e.loaded / e.total) * 100;
          onProgress(percentComplete);
        }
      });

      xhr.onload = async () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            // Note: the socket will also push the new series, but we can resolve here.
            resolve(JSON.parse(xhr.response));
          } catch (e) {
            resolve({});
          }
        } else {
          reject(new Error('Upload failed'));
        }
      };

      xhr.onerror = () => reject(new Error('Network error during upload'));

      xhr.send(formData);
    });
  }

  deleteSeries(id) {
    this.state.series = this.state.series.filter(s => s.id !== id);
    this.notify('series');
  }

  boostSeries(id, budget) {
    this.state.series = this.state.series.map(s => {
      if (s.id === id) {
        return {
          ...s,
          tags: [...new Set([...s.tags, 'promoted'])],
          views: (parseFloat(s.views) || 0) + (budget / 100) + 'K', // Artificial view boost
        };
      }
      return s;
    });
    this.notify('series');
  }
}

export const appStore = new Store();
