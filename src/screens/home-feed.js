// ============================================
// VUNASHORTS — Home Feed Screen
// ============================================
import { appStore } from '../services/store.js';
import { USER_PROFILE } from '../data/mock-data.js';
import { i18n } from '../services/i18n.js';
import { showToast } from '../components/utils.js';
import { Icons } from '../components/icons.js';
import logoUrl from '../assets/app-icon-transparent.png';
import Hls from 'hls.js';

let currentIndex = 0;
let touchStartY = 0;
let isSwiping = false;
const hlsInstances = new Map();

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
          <button class="btn btn-ghost btn-icon" id="btn-mute-home" style="font-size:18px;">${Icons.VolumeMute()}</button>
          <button class="btn btn-ghost btn-icon" id="btn-notif-home" style="font-size:18px;position:relative;">${Icons.Bell()}<span class="nav-badge" style="top:6px;right:6px;"></span></button>
        </div>
      </div>
      <div id="feed-tabs" style="position:absolute;top:calc(var(--safe-top) + 56px);left:0;right:0;z-index:10;display:flex;justify-content:center;gap:var(--space-6);">
        <button class="feed-tab active" data-tab="foryou">${i18n.t('forYou')}</button>
        <button class="feed-tab" data-tab="trending">${i18n.t('trending')}</button>
        <button class="feed-tab" data-tab="following">${i18n.t('following')}</button>
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
      
      #feed-cards.swiping .feed-card { transition: none !important; }
      
      @keyframes floatUp {
        0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
        15% { transform: translate(calc(-50% + var(--tx, 0px)), calc(-50% - 40px)) scale(1.2); opacity: 1; }
        100% { transform: translate(calc(-50% + var(--tx, 0px) * 2), calc(-50% - 150px)) scale(1); opacity: 0; }
      }
      .floating-particle {
        position: absolute;
        font-size: 50px;
        pointer-events: none;
        z-index: 100;
        animation: floatUp 1.2s ease-out forwards;
        filter: drop-shadow(0 4px 12px rgba(0,0,0,0.4));
      }
      @keyframes popIn {
        0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
        50% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
      }
      @keyframes fadeOutPlay {
        0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(1.2); }
      }
      .play-overlay {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 80px;
        height: 80px;
        background: rgba(0,0,0,0.4);
        backdrop-filter: blur(12px);
        border: 1px solid rgba(255,255,255,0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 36px;
        z-index: 50;
        pointer-events: none;
        animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
      }
      .play-overlay.fade-out {
        animation: fadeOutPlay 0.3s ease-out forwards;
      }
    </style>
  `;
}

function renderFeedCard(series, index) {
  const userTier = USER_PROFILE.tier || 'free';
  const reqTier = series.requiredTier || 'free';
  const tierOrder = { free: 0, pro: 1, premium: 2 };
  const isLocked = tierOrder[userTier] < tierOrder[reqTier];
  const t = i18n.t.bind(i18n);
  const bgStyle = series.poster
    ? `background-image:url('${series.poster}')`
    : `background:${series.gradientPoster || 'linear-gradient(135deg,#1a1a2e,#16213e)'}`;
  const views = series.views;
  const ep = Math.min(index + 1, series.episodes);
  
  // Publicly available high-quality loopable fast loading African-themed mp4 videos
  const videoUrls = [
    'https://assets.mixkit.co/videos/preview/mixkit-african-woman-smiling-at-camera-41808-large.mp4',
    'https://assets.mixkit.co/videos/preview/mixkit-young-black-woman-with-braids-smiling-41804-large.mp4',
    'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-hands-playing-a-djembe-drum-43093-large.mp4',
    'https://assets.mixkit.co/videos/preview/mixkit-cheerful-african-man-dancing-40332-large.mp4',
    'https://assets.mixkit.co/videos/preview/mixkit-woman-dancing-slowly-in-the-streets-40347-large.mp4',
    'https://assets.mixkit.co/videos/preview/mixkit-djembe-drummer-close-up-43094-large.mp4',
    'https://assets.mixkit.co/videos/preview/mixkit-man-dancing-happy-in-the-street-40338-large.mp4',
    'https://assets.mixkit.co/videos/preview/mixkit-hands-drumming-rhythmically-on-a-conga-43092-large.mp4'
  ];
  
  const videoSrc = series.video_url 
    ? `http://localhost:3000${series.video_url}` 
    : videoUrls[index % videoUrls.length];
  
  return `
    <div class="feed-card ${index === 0 ? 'active' : 'below'}" data-index="${index}">
      <div class="feed-card-poster" style="${bgStyle};${isLocked ? 'filter:blur(8px) brightness(0.5);' : ''}"></div>
      ${!isLocked ? `
        <video class="feed-card-video" data-src="${videoSrc}" loop playsinline muted style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:1;opacity:0;transition:opacity 0.4s;">
          ${videoSrc.endsWith('.m3u8') ? `<track label="AI Subtitles" kind="subtitles" srclang="en" src="${videoSrc.replace('.m3u8', '.vtt')}" default>` : ''}
        </video>
      ` : ''}
      <div class="feed-card-gradient" style="z-index:2;"></div>
      ${isLocked ? `
        <div class="lock-overlay-mini" style="z-index:3;">
          <div class="lock-icon-pulse" style="color:white;">${Icons.Lock()}</div>
          <button class="btn ${reqTier === 'premium' ? 'btn-gold' : 'btn-primary'} btn-sm" onclick="document.dispatchEvent(new CustomEvent('navigate',{detail:'episode-lock'}))">
            ${Icons.Crown()} ${t('upgradeRequired', { tier: reqTier === 'premium' ? 'Premium' : 'Pro' })}
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
        <div class="feed-action" data-action="cc">
          <div class="feed-action-icon" style="color:white;">${Icons.MoreHorizontal()}</div>
          <span class="feed-action-label">CC</span>
        </div>
        <div class="feed-action" data-action="download">
          <div class="feed-action-icon" style="color:white;">${Icons.Download()}</div>
          <span class="feed-action-label">${t('save')}</span>
        </div>
        <div class="feed-action" data-action="tip">
          <div class="feed-action-icon" style="background:var(--accent-gold-dim);color:var(--accent-gold);">${Icons.Gift()}</div>
          <span class="feed-action-label">${t('tip')}</span>
        </div>
      </div>
      <div style="position:absolute;bottom:20px;left:16px;right:80px;z-index:5;">
        <div style="display:flex;align-items:center;gap:var(--space-2);margin-bottom:var(--space-2);">
          <div class="avatar avatar-sm" style="font-size:14px;">${series.creator.avatar}</div>
          <span style="font-weight:600;font-size:var(--text-sm);">${series.creator.name}</span>
          ${series.creator.verified ? `<span style="display:inline-flex;color:var(--accent-blue);width:12px;height:12px;">${Icons.CheckCircle()}</span>` : ''}
          <button class="creator-follow-btn">${t('follow')}</button>
        </div>
        <h3 style="font-size:var(--text-lg);font-weight:800;margin-bottom:2px;">${series.title}</h3>
        <p style="font-size:var(--text-xs);color:var(--text-secondary);margin-bottom:var(--space-2);line-height:1.4;" class="line-clamp-2">${series.description}</p>
        <div style="display:flex;gap:var(--space-2);flex-wrap:wrap;align-items:center;">
          <span class="episode-badge">${series.country} ${t('episode')} ${ep}/${series.episodes}</span>
          <span class="episode-badge"><span style="color:var(--accent-gold);">${Icons.Star()}</span> ${series.rating}</span>
          <span class="episode-badge"><span style="color:var(--text-secondary);">${Icons.Eye()}</span> ${views}</span>
          ${series.tags.includes('trending') ? `<span class="episode-badge ai-badge"><span style="color:var(--accent-rose);">${Icons.Fire()}</span> ${t('trending')}</span>` : ''}
        </div>
      </div>
      <div class="feed-progress" style="z-index:6;">
        <div class="feed-progress-fill" style="width:0%;"></div>
      </div>
    </div>
  `;
}

export function mountHomeFeed(el) {
  const feedCards = el.querySelector('#feed-cards');
  if (!feedCards) return;
  
  let unsubscribe;

  // Initialize global mute state if not set
  if (window.feedMuted === undefined) {
    window.feedMuted = true; // start muted for safe autoplay
  }

  function renderCards() {
    const series = appStore.getSeries();
    feedCards.innerHTML = series.map((s, i) => renderFeedCard(s, i)).join('');
    currentIndex = 0;
    
    // Play the very first video initially
    setTimeout(() => {
      playActiveVideo(feedCards);
      updateMuteButtonIcon();
    }, 300);
  }

  function updateMuteButtonIcon() {
    const muteBtn = el.querySelector('#btn-mute-home');
    if (muteBtn) {
      muteBtn.innerHTML = window.feedMuted ? Icons.VolumeMute() : Icons.Volume2();
      muteBtn.style.color = window.feedMuted ? 'var(--text-secondary)' : 'var(--accent-gold)';
    }
  }

  unsubscribe = appStore.subscribe('series', renderCards);
  i18n.onLangChange(() => renderCards()); // re-render on language change
  renderCards();

  // Mute button handler
  const muteBtn = el.querySelector('#btn-mute-home');
  if (muteBtn) {
    muteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      window.feedMuted = !window.feedMuted;
      updateMuteButtonIcon();
      
      // Update all video elements immediately
      const videos = feedCards.querySelectorAll('.feed-card-video');
      videos.forEach(v => {
        v.muted = window.feedMuted;
      });
      
      showToast(window.feedMuted ? 'Muted' : 'Unmuted', 'info');
    });
  }

  // Touch/swipe/tap handling (TikTok Physics Engine)
  let touchStartY = 0;
  let isSwiping = false;
  let lastTapTime = 0;
  let tapTimeout = null;
  let touchStartTime = 0;

  feedCards.addEventListener('touchstart', e => {
    touchStartY = e.touches[0].clientY;
    touchStartTime = Date.now();
    isSwiping = true;
    feedCards.classList.add('swiping');
  }, { passive: true });

  feedCards.addEventListener('touchmove', e => {
    if (!isSwiping) return;
    const dy = e.touches[0].clientY - touchStartY;
    
    // Apply 1:1 physics tracking
    const active = feedCards.querySelector('.feed-card.active');
    if (active) {
       active.style.transform = `translateY(${dy}px)`;
    }
  }, { passive: true });

  feedCards.addEventListener('touchend', e => {
    if (!isSwiping) return;
    isSwiping = false;
    feedCards.classList.remove('swiping');
    
    // Reset any inline transforms so CSS classes take over smoothly
    feedCards.querySelectorAll('.feed-card').forEach(c => c.style.transform = '');

    const dy = touchStartY - e.changedTouches[0].clientY; // Distance swiped UP
    const touchDuration = Date.now() - touchStartTime;

    // Detect Tap vs Swipe
    if (Math.abs(dy) < 10 && touchDuration < 300) {
      // It's a tap!
      const now = Date.now();
      if (now - lastTapTime < 300) {
        // Double Tap!
        clearTimeout(tapTimeout);
        lastTapTime = 0;
        triggerDoubleTapLike(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
      } else {
        lastTapTime = now;
        tapTimeout = setTimeout(() => {
          triggerSingleTapPlayPause();
        }, 300);
      }
      return;
    }

    // Velocity-based momentum snapping
    const velocity = Math.abs(dy) / touchDuration;
    const length = appStore.getSeries().length;
    
    if ((Math.abs(dy) > 100 || velocity > 0.5)) {
      if (dy > 0 && currentIndex < length - 1) {
        if (navigator.vibrate) navigator.vibrate([15]); // Haptic snap
        goToCard(currentIndex + 1, feedCards);
      } else if (dy < 0 && currentIndex > 0) {
        if (navigator.vibrate) navigator.vibrate([15]); // Haptic snap
        goToCard(currentIndex - 1, feedCards);
      }
    }
  }, { passive: true });

  function triggerDoubleTapLike(x, y) {
    if (navigator.vibrate) navigator.vibrate([15, 50, 15]); // Heartbeat haptic feedback
    
    // Spawn 3D floating particle
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    particle.textContent = '❤️';
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.setProperty('--tx', `${(Math.random() - 0.5) * 60}px`); // Randomize drift
    document.body.appendChild(particle);
    
    // Animate the actual like button
    const activeCard = feedCards.querySelector('.feed-card.active');
    if (activeCard) {
      const likeIcon = activeCard.querySelector('.feed-action[data-action="like"] .feed-action-icon');
      if (likeIcon) {
        likeIcon.style.animation = 'none'; // reset
        void likeIcon.offsetWidth; // trigger reflow
        likeIcon.style.animation = 'heartbeat 600ms ease forwards';
        likeIcon.style.background = 'rgba(248,81,73,0.2)';
      }
    }

    setTimeout(() => {
      particle.remove();
    }, 1200);
  }

  function triggerSingleTapPlayPause() {
    const activeCard = feedCards.querySelector('.feed-card.active');
    if (!activeCard) return;
    const video = activeCard.querySelector('.feed-card-video');
    if (!video) return;

    if (video.paused) {
      video.play();
      const existingOverlay = activeCard.querySelector('.play-overlay');
      if (existingOverlay) {
        existingOverlay.classList.add('fade-out');
        setTimeout(() => existingOverlay.remove(), 300);
      }
    } else {
      video.pause();
      const overlay = document.createElement('div');
      overlay.className = 'play-overlay';
      overlay.innerHTML = Icons.Play();
      activeCard.appendChild(overlay);
    }
  }

  // Scroll wheel for desktop (debounce slightly so it doesn't trigger rapidly)
  let lastWheelTime = 0;
  feedCards.addEventListener('wheel', e => {
    e.preventDefault();
    const now = Date.now();
    if (now - lastWheelTime < 600) return; // scroll transition time
    const length = appStore.getSeries().length;
    if (e.deltaY > 20 && currentIndex < length - 1) {
      goToCard(currentIndex + 1, feedCards);
      lastWheelTime = now;
    } else if (e.deltaY < -20 && currentIndex > 0) {
      goToCard(currentIndex - 1, feedCards);
      lastWheelTime = now;
    }
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
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const action = btn.dataset.action;
      const icon = btn.querySelector('.feed-action-icon');
      if (action === 'like') {
        icon.style.animation = 'heartbeat 600ms ease forwards';
        icon.style.background = 'rgba(248,81,73,0.2)';
      } else if (action === 'download') {
        icon.style.background = 'rgba(88,166,255,0.2)';
        showToast('Downloading episode for offline viewing...', 'info');
        
        // PWA Offline Cache logic
        const activeCard = feedCards.querySelector('.feed-card.active');
        const video = activeCard ? activeCard.querySelector('.feed-card-video') : null;
        if (video && video.dataset.src) {
          if ('caches' in window) {
            caches.open('vunashorts-offline').then(cache => {
              cache.add(video.dataset.src).then(() => {
                showToast('Episode saved for offline viewing!', 'success');
              }).catch(err => {
                console.error("Cache add failed", err);
                showToast('Failed to save episode', 'error');
              });
            });
          } else {
             showToast('Offline viewing not supported on this browser', 'error');
          }
        }
      } else if (action === 'cc') {
        const activeCard = feedCards.querySelector('.feed-card.active');
        const video = activeCard ? activeCard.querySelector('.feed-card-video') : null;
        if (video && video.textTracks && video.textTracks.length > 0) {
          const track = video.textTracks[0];
          if (track.mode === 'showing') {
            track.mode = 'hidden';
            icon.style.background = 'rgba(255,255,255,0.1)';
            showToast('AI Translation Off', 'info');
          } else {
            track.mode = 'showing';
            icon.style.background = 'var(--accent-gold-dim)';
            showToast('AI Translation On', 'success');
          }
        } else {
          showToast('No subtitles available for this episode', 'info');
        }
      } else if (action === 'tip') {
        document.dispatchEvent(new CustomEvent('navigate', { detail: 'episode-lock' }));
      } else if (action === 'share') {
        showToast('Share link copied!', 'success');
      }
    });
  });

  // Track video progress dynamically instead of random simulation
  const progressInterval = setInterval(() => {
    const activeCard = feedCards.querySelector('.feed-card.active');
    if (!activeCard) return;
    const video = activeCard.querySelector('.feed-card-video');
    const fill = activeCard.querySelector('.feed-progress-fill');
    if (!video || !fill) return;
    if (video.duration) {
      const pct = (video.currentTime / video.duration) * 100;
      fill.style.width = pct + '%';
    }
  }, 100);

  // Pause active video when navigated away
  el.addEventListener('DOMNodeRemoved', (e) => {
    if (e.target === el) {
      if (unsubscribe) unsubscribe();
      clearInterval(progressInterval);
      
      // Cleanup HLS instances
      for (let hls of hlsInstances.values()) {
        hls.destroy();
      }
      hlsInstances.clear();
      
      const activeVideo = feedCards.querySelector('.feed-card.active .feed-card-video');
      if (activeVideo) activeVideo.pause();
    }
  });
}

function playActiveVideo(container) {
  const cards = container.querySelectorAll('.feed-card');
  cards.forEach((card, i) => {
    const video = card.querySelector('.feed-card-video');
    if (!video) return;
    
    const src = video.dataset.src;
    
    // Preload immediate adjacent videos
    if (i >= currentIndex - 1 && i <= currentIndex + 1) {
      if (src && src.endsWith('.m3u8')) {
        if (Hls.isSupported()) {
          if (!hlsInstances.has(i)) {
            const hls = new Hls({ autoStartLoad: false });
            hls.loadSource(src);
            hls.attachMedia(video);
            hlsInstances.set(i, hls);
          }
          // Aggressively load active
          if (i === currentIndex) hlsInstances.get(i).startLoad();
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          if (!video.src) video.src = src;
        }
      } else {
        if (!video.src) video.src = src;
        if (i !== currentIndex) video.preload = "auto";
      }
    } else {
      // Out of view, clean up resources to save memory
      if (hlsInstances.has(i)) hlsInstances.get(i).stopLoad();
    }

    if (i === currentIndex) {
      video.muted = window.feedMuted;
      video.currentTime = 0;
      video.style.opacity = '1';
      
      // Cinematic audio fade-in
      if (!window.feedMuted) {
        video.volume = 0;
        const fadeInt = setInterval(() => {
          if (video.volume < 0.9) video.volume += 0.1;
          else { video.volume = 1; clearInterval(fadeInt); }
        }, 30);
      } else {
        video.volume = 1;
      }
      
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Auto-play prevented, starting muted.", error);
          video.muted = true;
          video.play();
        });
      }
    } else {
      video.pause();
      video.style.opacity = '0';
    }
  });
}

function goToCard(index, container) {
  currentIndex = index;
  const cards = container.querySelectorAll('.feed-card');
  cards.forEach((card, i) => {
    card.classList.remove('active', 'above', 'below');
    if (i < index) card.classList.add('above');
    else if (i === index) card.classList.add('active');
    else card.classList.add('below');
  });
  
  // Trigger video playback corresponding to active card
  playActiveVideo(container);
}

function formatViews(n) {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toString();
}
