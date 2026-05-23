// ============================================
// VUNASHORTS — Router
// ============================================

const routes = {};
let currentScreen = null;
let screenContainer = null;

export function registerRoute(path, renderFn) {
  routes[path] = renderFn;
}

export function navigate(path, opts = {}) {
  if (currentScreen === path && !opts.force) return;
  const prev = currentScreen;
  currentScreen = path;
  window.location.hash = path;
  renderScreen(path, prev, opts);
}

export function getCurrentScreen() {
  return currentScreen;
}

function renderScreen(path, prev, opts) {
  if (!screenContainer) screenContainer = document.getElementById('screen-container');
  const renderFn = routes[path];
  if (!renderFn) return;

  const oldScreen = screenContainer.querySelector('.screen');
  const newEl = document.createElement('div');
  // Routes that need full-screen (no nav padding, absolute fill)
  const fullScreenRoutes = ['home', 'watch-party', 'splash', 'go-live', 'video-editor', 'inbox'];
  newEl.className = 'screen screen-enter';
  if (opts.fullScreen || fullScreenRoutes.includes(path)) {
    newEl.classList.add('full-screen');
  }
  newEl.innerHTML = renderFn();
  
  if (oldScreen) {
    oldScreen.classList.add('screen-exit');
    setTimeout(() => oldScreen.remove(), 300);
  }
  screenContainer.appendChild(newEl);

  // fire mount callbacks
  if (routes[path + ':mount']) {
    setTimeout(() => routes[path + ':mount'](newEl), 50);
  }
}

export function onMount(path, fn) {
  routes[path + ':mount'] = fn;
}

export function init() {
  screenContainer = document.getElementById('screen-container');
  window.addEventListener('hashchange', () => {
    const path = window.location.hash.slice(1) || 'home';
    navigate(path);
  });
}
