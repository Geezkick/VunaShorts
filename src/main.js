// ============================================
// VUNASHORTS — Main Entry Point
// ============================================
import { init as initRouter, registerRoute, navigate, onMount } from './router.js';
import { renderNavBar, updateNavState } from './components/nav-bar.js';
import { registerSW } from 'virtual:pwa-register';

// Register Service Worker for PWA
const updateSW = registerSW({
  onNeedRefresh() {
    import('./components/utils.js').then(({ showToast }) => {
      showToast('New update available. Reloading...', 'info');
      setTimeout(() => updateSW(true), 1500);
    });
  },
  onOfflineReady() {
    import('./components/utils.js').then(({ showToast }) => {
      showToast('VunaShorts is ready for offline use.', 'success');
    });
  },
});

// PWA Install Prompt
window.deferredInstallPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  window.deferredInstallPrompt = e;
  // Dispatch a custom event so screens can show their install buttons
  document.dispatchEvent(new Event('appInstallable'));
});

// Screens
import { renderSplash, mountSplash } from './screens/splash.js';
import { renderHomeFeed, mountHomeFeed } from './screens/home-feed.js';
import { renderEpisodeLock, mountEpisodeLock } from './screens/episode-lock.js';
import { renderDiscover, mountDiscover } from './screens/discover.js';
import { renderCreatorStudio, mountCreatorStudio } from './screens/creator-studio.js';
import { renderAIEngine, mountAIEngine } from './screens/ai-engine.js';
import { renderMarketplace, mountMarketplace } from './screens/marketplace.js';
import { renderCrowdfunding, mountCrowdfunding } from './screens/crowdfunding.js';
import { renderWatchParty, mountWatchParty } from './screens/watch-party.js';
import { renderProfile, mountProfile } from './screens/profile.js';
import { renderPremium, mountPremium } from './screens/premium.js';
import { renderAdmin, mountAdmin } from './screens/admin.js';
import { renderAuthScreen, mountAuthScreen } from './screens/auth-screen.js';
import { renderVideoEditor, mountVideoEditor } from './screens/video-editor.js';
import { renderGoLive, mountGoLive } from './screens/go-live.js';
import { renderInbox, mountInbox } from './screens/inbox.js';
import { authService } from './services/auth.js';

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  console.log('VunaShorts initializing...');

  // Setup Navigation
  const navEl = document.getElementById('bottom-nav');
  navEl.innerHTML = renderNavBar();
  navEl.style.transition = 'transform 300ms var(--ease-out)';
  
  navEl.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      navigate(item.dataset.path);
    });
  });

  // Global Navigation Event Listener
  document.addEventListener('navigate', (e) => {
    navigate(e.detail);
  });

  // Action Sheet Listeners
  const actionSheet = document.getElementById('create-action-sheet');
  const modalOverlay = document.getElementById('modal-overlay');
  
  if (actionSheet && modalOverlay) {
    const closeSheet = () => {
      actionSheet.classList.add('hidden');
      modalOverlay.classList.add('hidden');
    };

    document.getElementById('btn-close-action-sheet')?.addEventListener('click', closeSheet);
    modalOverlay.addEventListener('click', closeSheet);

    document.querySelectorAll('.action-sheet-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        closeSheet();
        const action = btn.dataset.action;
        if (action === 'upload') navigate('video-editor');
        else if (action === 'go-live') navigate('go-live');
        else if (action === 'studio') navigate('creator-studio');
      });
    });
  }

  // Register Routes
  registerRoute('splash', renderSplash);
  registerRoute('home', renderHomeFeed);
  registerRoute('episode-lock', renderEpisodeLock);
  registerRoute('discover', renderDiscover);
  registerRoute('creator-studio', renderCreatorStudio);
  registerRoute('ai-engine', renderAIEngine);
  registerRoute('marketplace', renderMarketplace);
  registerRoute('crowdfunding', renderCrowdfunding);
  registerRoute('watch-party', renderWatchParty);
  registerRoute('profile', renderProfile);
  registerRoute('premium', renderPremium);
  registerRoute('admin', renderAdmin);
  registerRoute('auth', renderAuthScreen);
  registerRoute('video-editor', renderVideoEditor);
  registerRoute('go-live', renderGoLive);
  registerRoute('inbox', renderInbox);

  // Register Mount Callbacks
  onMount('splash', (el) => mountSplash(() => navigate('home', { force: true })));
  onMount('home', mountHomeFeed);
  onMount('episode-lock', mountEpisodeLock);
  onMount('discover', mountDiscover);
  onMount('creator-studio', mountCreatorStudio);
  onMount('ai-engine', mountAIEngine);
  onMount('marketplace', mountMarketplace);
  onMount('crowdfunding', mountCrowdfunding);
  onMount('watch-party', mountWatchParty);
  onMount('profile', mountProfile);
  onMount('premium', mountPremium);
  onMount('admin', mountAdmin);
  onMount('auth', (el) => mountAuthScreen(() => navigate('home', { force: true })));
  onMount('video-editor', mountVideoEditor);
  onMount('go-live', mountGoLive);
  onMount('inbox', mountInbox);

  // Handle route changes to update nav
  window.addEventListener('hashchange', () => {
    const path = window.location.hash.slice(1) || 'home';
    updateNavState(path);
  });

  // Start Router
  initRouter();

  // Initial Boot Sequence
  const splashEl = document.getElementById('splash-screen');
  splashEl.innerHTML = renderSplash();
  mountSplash(() => {
    document.getElementById('main-app').classList.remove('hidden');
    if (!authService.isAuthenticated()) {
      navigate('auth', { force: true });
      updateNavState('auth');
    } else {
      navigate(window.location.hash.slice(1) || 'home', { force: true });
      updateNavState(window.location.hash.slice(1) || 'home');
    }
  });
});
