// ============================================
// VUNASHORTS — Navigation Bar Component
// ============================================

import { Icons } from './icons.js';
import { i18n } from '../services/i18n.js';

export function renderNavBar() {
  const t = i18n.t.bind(i18n);
  return `
    <button class="nav-item active" data-path="home">
      <div class="nav-icon">${Icons.Film()}</div>
      <div class="nav-label" id="nav-label-home">${t('home')}</div>
    </button>
    <button class="nav-item" data-path="discover">
      <div class="nav-icon">${Icons.Compass()}</div>
      <div class="nav-label" id="nav-label-discover">${t('discover')}</div>
    </button>
    <button class="nav-item nav-item-create" id="btn-create-action">
      <div class="nav-icon" style="background:var(--gradient-premium);color:white;border-radius:var(--radius-full);width:40px;height:40px;display:flex;align-items:center;justify-content:center;box-shadow:var(--shadow-glow);">${Icons.Plus()}</div>
    </button>
    <button class="nav-item" data-path="premium">
      <div class="nav-icon">${Icons.Crown()}</div>
      <div class="nav-label" id="nav-label-premium">${t('premium')}</div>
    </button>
    <button class="nav-item" data-path="profile">
      <div class="nav-icon">${Icons.User()}</div>
      <div class="nav-label" id="nav-label-profile">${t('profile')}</div>
    </button>
  `;
}

export function updateNavState(path) {
  const nav = document.getElementById('bottom-nav');
  if (!nav) return;
  
  // Map specific paths to nav tabs
  let activeTab = path;
  if (path === 'episode-lock' || path === 'watch-party') activeTab = 'home';
  if (path === 'marketplace') activeTab = 'discover';
  if (path === 'ai-engine') activeTab = 'creator-studio';
  if (path === 'admin') activeTab = 'profile';

  nav.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
    if (item.dataset.path === activeTab && activeTab !== undefined) {
      item.classList.add('active');
    }
  });

  // Action sheet listener
  const createBtn = nav.querySelector('#btn-create-action');
  if (createBtn) {
    // Remove old listeners to prevent duplicates
    const newBtn = createBtn.cloneNode(true);
    createBtn.parentNode.replaceChild(newBtn, createBtn);
    newBtn.addEventListener('click', () => {
      document.getElementById('create-action-sheet').classList.remove('hidden');
      document.getElementById('modal-overlay').classList.remove('hidden');
    });
  }

  // Hide nav on full-screen / immersive screens
  const fullScreenPaths = ['splash', 'auth', 'video-editor', 'go-live'];
  const mainApp = document.getElementById('main-app');
  if (fullScreenPaths.includes(path)) {
    nav.style.transform = 'translateY(100%)';
    nav.style.display = 'none';
    if (mainApp) mainApp.classList.add('no-nav');
  } else {
    nav.style.transform = 'translateY(0)';
    nav.style.display = 'flex';
    if (mainApp) mainApp.classList.remove('no-nav');
  }
}

// Global listener to update nav labels when language changes
if (typeof window !== 'undefined') {
  i18n.onLangChange(() => {
    const lHome = document.getElementById('nav-label-home');
    const lDiscover = document.getElementById('nav-label-discover');
    const lPremium = document.getElementById('nav-label-premium');
    const lProfile = document.getElementById('nav-label-profile');
    if (lHome) lHome.textContent = i18n.t('home');
    if (lDiscover) lDiscover.textContent = i18n.t('discover');
    if (lPremium) lPremium.textContent = i18n.t('premium');
    if (lProfile) lProfile.textContent = i18n.t('profile');
  });
}
