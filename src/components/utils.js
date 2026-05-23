// ============================================
// VUNASHORTS — Utility Functions
// ============================================

import { Icons } from './icons.js';

export function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  const icons = { 
    success: Icons.CheckCircle(), 
    error: Icons.AlertCircle(), 
    info: Icons.AlertCircle(), 
    gold: Icons.Star() 
  };
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${icons[type] || ''}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'fadeOut 300ms var(--ease-out) forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

export function formatNumber(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toString();
}

export function formatCurrency(amount, currency) {
  return `${currency} ${amount.toLocaleString()}`;
}

export function delay(ms) {
  return new Promise(r => setTimeout(r, ms));
}

export function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function createEl(tag, className, innerHTML) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (innerHTML) el.innerHTML = innerHTML;
  return el;
}
