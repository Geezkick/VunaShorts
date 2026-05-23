// ============================================
// VUNASHORTS — Navigation Bar Component
// ============================================

import { Icons } from './icons.js';

export function renderNavBar() {
  return `
    <button class="nav-item active" data-path="home">
      <div class="nav-icon">${Icons.Film()}</div>
      <div class="nav-label">Home</div>
    </button>
    <button class="nav-item" data-path="discover">
      <div class="nav-icon">${Icons.Compass()}</div>
      <div class="nav-label">Discover</div>
    </button>
    <button class="nav-item nav-item-create" id="btn-create-action">
      <div class="nav-icon" style="background:var(--gradient-premium);color:white;border-radius:var(--radius-full);width:40px;height:40px;display:flex;align-items:center;justify-content:center;box-shadow:var(--shadow-glow);">${Icons.Plus()}</div>
    </button>
    <button class="nav-item" data-path="crowdfunding">
      <div class="nav-icon">${Icons.HandHeart()}</div>
      <div class="nav-label">Fund</div>
    </button>
    <button class="nav-item" data-path="profile">
      <div class="nav-icon">${Icons.User()}</div>
      <div class="nav-label">Profile</div>
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
  if (path === 'premium' || path === 'admin') activeTab = 'profile';

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

  // Hide nav on full screen views
  if (path === 'splash' || path === 'watch-party' || path === 'go-live' || path === 'video-editor' || path === 'inbox') {
    nav.style.transform = 'translateY(100%)';
  } else {
    nav.style.transform = 'translateY(0)';
  }
}
