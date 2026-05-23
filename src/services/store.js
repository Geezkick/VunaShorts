// ============================================
// VUNASHORTS — Global Store
// ============================================
import { SERIES as initialSeries, CREATORS } from '../data/mock-data.js';

class Store {
  constructor() {
    this.state = {
      series: [],
    };
    this.listeners = {};
    this.init();
  }

  async init() {
    try {
      const res = await fetch('/api/series');
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
  async addSeries(newSeries) {
    try {
      const res = await fetch('/api/series', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSeries)
      });
      if (res.ok) {
        // Refresh series list
        await this.init();
        return;
      }
    } catch (e) {
      console.error('Failed to post to API', e);
    }

    // Fallback if API fails
    const series = {
      id: 's' + (this.state.series.length + 1) + Date.now(),
      creator: CREATORS[0], // Mocking the current logged-in user
      views: '0',
      rating: '0.0',
      episodes: newSeries.episodes || 1,
      freeEpisodes: 1,
      pricePerEpisode: 50,
      currency: 'KSh',
      completionRate: 0,
      tags: ['new'],
      country: 'KE',
      gradientPoster: 'linear-gradient(135deg, #1a1a2e, #16213e)',
      ...newSeries
    };
    
    this.state.series.unshift(series);
    this.notify('series');
    return series;
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
