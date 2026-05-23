// ============================================
// VUNASHORTS — Home Feed Screen
// ============================================
import { appStore } from '../services/store.js';
import { showToast } from '../components/utils.js';
import { Icons } from '../components/icons.js';
import logoUrl from '../assets/app-icon-transparent.png';

let currentIndex = 0;
let touchStartY = 0;
let isSwiping = false;

export function renderHomeFeed() {
  return `
    <div id="home-feed" class="full-screen" style="position:absolute;inset:0;overflow:hidden;background:var(--bg-primary);">
      <div id="feed-cards" style="position:relative;width:100%;height:100%;">
        <!-- Rendered via JS -->
      </div>
      <div id="feed-top-bar" style="position:absolute;top:0;left:0;right:0;z-index:10;padding:calc(var(--safe-top) + 12px) var(--space-4) var(--space-3);background:var(--gradient-cinematic-top);display:flex;justify-content:space-between;align-items:center;">
        <div style="font-family:var(--font-display);font-weight:800;font-size:var(--text-xl);display:flex;align-items:center;gap:var(--space-2);">
          <img src="${logoUrl}" alt="Logo" style="width:24px;height:24px;object-fit:contain;" />
          <div><span style="color:var(--text-primary);">Vuna</span><span style="background:var(--gradient-premium);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">Shorts</span></div>
        </div>
        <div style="display:flex;gap:var(--space-3);align-items:center;">
          <button class="btn btn-ghost btn-icon" id="btn-search-home" style="font-size:18px;">${Icons.Search()}</button>
          <button class="btn btn-ghost btn-icon" id="btn-notif-home" style="font-size:18px;position:relative;">${Icons.Bell()}<span class="nav-badge" style="top:6px;right:6px;"></span></button>
        </div>
      </div>
      <div id="feed-tabs" style="position:absolute;top:calc(var(--safe-top) + 56px);left:0;right:0;z-index:10;display:flex;justify-content:center;gap:var(--space-6);">
        <button class="feed-tab active" data-tab="foryou">For You</button>
        <button class="feed-tab" data-tab="trending">Trending</button>
        <button class="feed-tab" data-tab="following">Following</button>
      </div>
    </div>
    <style>
      .feed-card{position:absolute;inset:0;transition:transform 500ms cubic-bezier(0.16,1,0.3,1),opacity 500ms cubic-bezier(0.16,1,0.3,1);will-change:transform,opacity;}
      .feed-card.below{transform:translateY(100%);opacity:0;}
      .feed-card.above{transform:translateY(-30%);opacity:0;pointer-events:none;}
      .feed-card.active{transform:translateY(0);opacity:1;}
      .feed-tab{background:none;border:none;color:var(--text-muted);font-family:var(--font-display);font-size:var(--text-sm);font-weight:600;cursor:pointer;padding:var(--space-1) var(--space-2);position:relative;transition:color var(--duration-normal) var(--ease-out);}
      .feed-tab.active{color:var(--text-primary);}
      .feed-tab.active::after{content:'';position:absolute;bottom:-4px;left:50%;transform:translateX(-50%);width:20px;height:2px;background:var(--text-primary);border-radius:var(--radius-full);}
      .feed-action{display:flex;flex-direction:column;align-items:center;gap:2px;cursor:pointer;transition:transform var(--duration-fast) var(--ease-out);}
      .feed-action:active{transform:scale(0.9);}
      .feed-action-icon{width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,0.1);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;font-size:20px;transition:all var(--duration-normal) var(--ease-out);}
      .feed-action-icon:hover{background:rgba(255,255,255,0.2);}
      .feed-action-label{font-size:10px;color:var(--text-secondary);font-weight:500;font-family:var(--font-mono);}
      .feed-progress{position:absolute;bottom:0;left:0;right:0;height:3px;background:rgba(255,255,255,0.1);}
      .feed-progress-fill{height:100%;background:var(--text-primary);border-radius:0 var(--radius-full) var(--radius-full) 0;transition:width 100ms linear;}
      .feed-card-poster{position:absolute;inset:0;background-size:cover;background-position:center;}
      .feed-card-gradient{position:absolute;inset:0;background:linear-gradient(0deg,rgba(14,17,22,0.9) 0%,rgba(14,17,22,0.3) 30%,transparent 50%,rgba(14,17,22,0.5) 100%);}
      .episode-badge{display:inline-flex;align-items:center;gap:4px;padding:3px 10px;background:rgba(255,255,255,0.12);backdrop-filter:blur(8px);border-radius:var(--radius-full);font-size:var(--text-xs);font-weight:600;color:var(--text-primary);border:1px solid rgba(255,255,255,0.08);}
      .ai-badge{background:var(--accent-blue-dim);color:var(--accent-blue);border-color:rgba(88,166,255,0.2);}
      .creator-follow-btn{padding:4px 14px;background:rgba(255,255,255,0.15);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.2);border-radius:var(--radius-full);color:var(--text-primary);font-size:var(--text-xs);font-weight:600;font-family:var(--font-display);cursor:pointer;transition:all var(--duration-normal) var(--ease-out);}
      .creator-follow-btn:hover{background:var(--text-primary);color:var(--text-inverse);}
      .lock-overlay-mini{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;gap:var(--space-3);}
      .lock-icon-pulse{width:64px;height:64px;border-radius:50%;background:rgba(255,255,255,0.15);backdrop-filter:blur(12px);display:flex;align-items:center;justify-content:center;font-size:28px;animation:breathe 2s ease-in-out infinite;border:1px solid rgba(255,255,255,0.1);}
    </style>
  `;
}

function renderFeedCard(series, index) {
  const isLocked = index >= 3; // First 3 free
  const bgStyle = series.poster
    ? `background-image:url('${series.poster}')`
    : `background:${series.gradientPoster || 'linear-gradient(135deg,#1a1a2e,#16213e)'}`;
  const views = series.views;
  const ep = Math.min(index + 1, series.episodes);
  
  return `
    <div class="feed-card ${index === 0 ? 'active' : 'below'}" data-index="${index}">
      <div class="feed-card-poster" style="${bgStyle};${isLocked ? 'filter:blur(8px) brightness(0.5);' : ''}"></div>
      <div class="feed-card-gradient"></div>
      ${isLocked ? `
        <div class="lock-overlay-mini">
          <div class="lock-icon-pulse" style="color:white;">${Icons.Lock()}</div>
          <button class="btn btn-gold btn-sm" onclick="document.dispatchEvent(new CustomEvent('navigate',{detail:'episode-lock'}))">
            Unlock — ${series.currency} ${series.pricePerEpisode}
          </button>
        </div>
      ` : ''}
      <div style="position:absolute;right:12px;bottom:120px;z-index:5;display:flex;flex-direction:column;gap:var(--space-5);align-items:center;">
        <div class="feed-action" data-action="like">
          <div class="feed-action-icon" style="color:white;">${Icons.Heart()}</div>
          <span class="feed-action-label">${formatViews(Math.floor(Math.random() * 50000 + 10000))}</span>
        </div>
        <div class="feed-action" data-action="comment">
          <div class="feed-action-icon" style="color:white;">${Icons.MessageCircle()}</div>
          <span class="feed-action-label">${formatViews(Math.floor(Math.random() * 5000 + 500))}</span>
        </div>
        <div class="feed-action" data-action="share">
          <div class="feed-action-icon" style="color:white;">${Icons.Share()}</div>
          <span class="feed-action-label">Share</span>
        </div>
        <div class="feed-action" data-action="bookmark">
          <div class="feed-action-icon" style="color:white;">${Icons.Bookmark()}</div>
          <span class="feed-action-label">Save</span>
        </div>
        <div class="feed-action" data-action="tip">
          <div class="feed-action-icon" style="background:var(--accent-gold-dim);color:var(--accent-gold);">${Icons.Gift()}</div>
          <span class="feed-action-label">Tip</span>
        </div>
      </div>
      <div style="position:absolute;bottom:20px;left:16px;right:80px;z-index:5;">
        <div style="display:flex;align-items:center;gap:var(--space-2);margin-bottom:var(--space-2);">
          <div class="avatar avatar-sm" style="font-size:14px;">${series.creator.avatar}</div>
          <span style="font-weight:600;font-size:var(--text-sm);">${series.creator.name}</span>
          ${series.creator.verified ? `<span style="display:inline-flex;color:var(--accent-blue);width:12px;height:12px;">${Icons.CheckCircle()}</span>` : ''}
          <button class="creator-follow-btn">Follow</button>
        </div>
        <h3 style="font-size:var(--text-lg);font-weight:800;margin-bottom:2px;">${series.title}</h3>
        <p style="font-size:var(--text-xs);color:var(--text-secondary);margin-bottom:var(--space-2);line-height:1.4;" class="line-clamp-2">${series.description}</p>
        <div style="display:flex;gap:var(--space-2);flex-wrap:wrap;align-items:center;">
          <span class="episode-badge">${series.country} Ep ${ep}/${series.episodes}</span>
          <span class="episode-badge"><span style="color:var(--accent-gold);">${Icons.Star()}</span> ${series.rating}</span>
          <span class="episode-badge"><span style="color:var(--text-secondary);">${Icons.Eye()}</span> ${views}</span>
          ${series.tags.includes('trending') ? `<span class="episode-badge ai-badge"><span style="color:var(--accent-rose);">${Icons.Fire()}</span> Trending</span>` : ''}
        </div>
      </div>
      <div class="feed-progress">
        <div class="feed-progress-fill" style="width:${isLocked ? 0 : Math.random() * 60 + 20}%;"></div>
      </div>
    </div>
  `;
}

export function mountHomeFeed(el) {
  const feedCards = el.querySelector('#feed-cards');
  if (!feedCards) return;
  
  let unsubscribe;

  function renderCards() {
    const series = appStore.getSeries();
    feedCards.innerHTML = series.map((s, i) => renderFeedCard(s, i)).join('');
    currentIndex = 0;
    
    // Re-bind touch/swipe listeners since cards changed
    bindEvents(feedCards, series.length);
  }

  unsubscribe = appStore.subscribe('series', renderCards);
  renderCards();

  function bindEvents(cardsContainer, totalLength) {
    // Clear old listeners if we had a clean way, but we are just attaching to the container
    // We only attach to the container once
  }

  // Touch/swipe handling
  let touchStartY = 0;
  let isSwiping = false;

  feedCards.addEventListener('touchstart', e => {
    touchStartY = e.touches[0].clientY;
    isSwiping = true;
  }, { passive: true });

  feedCards.addEventListener('touchend', e => {
    if (!isSwiping) return;
    isSwiping = false;
    const dy = touchStartY - e.changedTouches[0].clientY;
    if (Math.abs(dy) > 60) {
      const length = appStore.getSeries().length;
      if (dy > 0 && currentIndex < length - 1) goToCard(currentIndex + 1, feedCards);
      else if (dy < 0 && currentIndex > 0) goToCard(currentIndex - 1, feedCards);
    }
  }, { passive: true });

  // Scroll wheel for desktop
  feedCards.addEventListener('wheel', e => {
    e.preventDefault();
    const length = appStore.getSeries().length;
    if (e.deltaY > 30 && currentIndex < length - 1) goToCard(currentIndex + 1, feedCards);
    else if (e.deltaY < -30 && currentIndex > 0) goToCard(currentIndex - 1, feedCards);
  }, { passive: false });

  // Feed tabs
  el.querySelectorAll('.feed-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      el.querySelectorAll('.feed-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      showToast(`Switched to ${tab.textContent}`, 'info');
    });
  });

  // Top Bar Actions
  const searchBtn = el.querySelector('#btn-search-home');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('navigate', { detail: 'discover' }));
    });
  }

  const notifBtn = el.querySelector('#btn-notif-home');
  if (notifBtn) {
    notifBtn.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('navigate', { detail: 'inbox' }));
    });
  }

  // Action buttons
  el.querySelectorAll('.feed-action').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      const icon = btn.querySelector('.feed-action-icon');
      if (action === 'like') {
        icon.style.animation = 'heartbeat 600ms ease forwards';
        icon.style.background = 'rgba(248,81,73,0.2)';
      } else if (action === 'bookmark') {
        icon.style.background = 'rgba(88,166,255,0.2)';
        showToast('Saved to your collection', 'success');
      } else if (action === 'tip') {
        document.dispatchEvent(new CustomEvent('navigate', { detail: 'episode-lock' }));
      } else if (action === 'share') {
        showToast('Share link copied!', 'success');
      }
    });
  });

  // Simulate progress bars
  simulateProgress(feedCards);

  el.addEventListener('DOMNodeRemoved', (e) => {
    if (e.target === el && unsubscribe) unsubscribe();
  });
}

function goToCard(index, container) {
  const cards = container.querySelectorAll('.feed-card');
  currentIndex = index;
  cards.forEach((card, i) => {
    card.classList.remove('active', 'above', 'below');
    if (i < index) card.classList.add('above');
    else if (i === index) card.classList.add('active');
    else card.classList.add('below');
  });
}

function simulateProgress(container) {
  setInterval(() => {
    const active = container.querySelector('.feed-card.active');
    if (!active) return;
    const fill = active.querySelector('.feed-progress-fill');
    if (!fill) return;
    let w = parseFloat(fill.style.width) || 0;
    w += 0.5;
    if (w > 100) w = 0;
    fill.style.width = w + '%';
  }, 200);
}

function formatViews(n) {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toString();
}
