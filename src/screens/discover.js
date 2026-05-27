// ============================================
// VUNASHORTS — Discover Screen
// ============================================
import { CREATORS } from '../data/mock-data.js';
import { appStore } from '../services/store.js';
import { showToast } from '../components/utils.js';
import { Icons } from '../components/icons.js';
import { i18n } from '../services/i18n.js';

export function renderDiscover() {
  const regions = [
    { name: 'Kenya', code: 'KE', color: '#3FB950' },
    { name: 'Nigeria', code: 'NG', color: '#F85149' },
    { name: 'South Africa', code: 'ZA', color: '#D29922' },
    { name: 'Ghana', code: 'GH', color: '#58A6FF' },
    { name: 'Tanzania', code: 'TZ', color: '#8957E5' }
  ];

  const t = i18n.t.bind(i18n);

  return `
    <div class="screen" style="padding-bottom:calc(var(--nav-height) + 16px);">
      <div style="padding:calc(var(--safe-top) + 16px) var(--space-4) var(--space-4);display:flex;justify-content:space-between;align-items:center;">
        <h1 style="font-size:var(--text-2xl);margin:0;" id="discover-title">${t('discoverTitle')}</h1>
        <button class="btn btn-ghost btn-icon" id="btn-discover-notif" style="position:relative;">
          ${Icons.Bell()}
          <span class="nav-badge" style="top:4px;right:4px;"></span>
        </button>
      </div>
      
      <div style="padding: 0 var(--space-4) var(--space-3);">
        <!-- Search Bar -->
        <div style="position:relative;margin-bottom:var(--space-6);">
          <div style="position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--text-tertiary);">${Icons.Search()}</div>
          <input type="text" id="discover-search" class="input search-input" placeholder="${t('searchPlaceholder')}" style="padding-left:40px;border-radius:var(--radius-full);background:var(--bg-secondary);">
        </div>

        <!-- Trending Now -->
        <div class="section-header"><h3><span style="display:inline-flex;align-items:center;gap:8px;vertical-align:bottom;color:var(--accent-blue);">${Icons.Trending()}</span> <span id="discover-trending-title">${t('trendingNow')}</span></h3></div>
        <div id="discover-trending-list" class="desktop-grid-2" style="display:flex;flex-direction:column;gap:var(--space-3);margin-bottom:var(--space-6);">
          <!-- Rendered via JS -->
        </div>

        <!-- Regions -->
        <div class="section-header"><h3 id="discover-regions-title">${t('regions')}</h3></div>
        <div class="h-scroll" style="padding-bottom:var(--space-6);">
          ${regions.map(r => `
            <div class="press-effect region-card" data-region="${r.name}" style="width:120px;padding:var(--space-4);background:var(--bg-secondary);border-radius:var(--radius-lg);border:var(--border-subtle);cursor:pointer;text-align:center;">
              <div style="width:48px;height:48px;border-radius:50%;background:${r.color}20;border:2px solid ${r.color}40;display:flex;align-items:center;justify-content:center;margin:0 auto var(--space-2);color:${r.color};">
                ${Icons.Globe()}
              </div>
              <div style="font-size:var(--text-sm);font-weight:600;">${r.name}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

export function mountDiscover(el) {
  let unsubscribe;

  function renderTrending() {
    const listEl = el.querySelector('#discover-trending-list');
    if (!listEl) return;
    
    const allSeries = appStore.getSeries();

    if (!allSeries || allSeries.length === 0) {
      // Skeleton UI
      listEl.innerHTML = Array(4).fill(0).map(() => `
        <div class="card" style="display:flex;gap:var(--space-3);padding:var(--space-2);">
          <div style="width:100px;height:140px;border-radius:var(--radius-md);background:var(--bg-tertiary);animation:pulse 1.5s infinite;"></div>
          <div style="flex:1;padding:var(--space-2) 0;">
            <div style="width:40px;height:14px;border-radius:4px;background:var(--bg-tertiary);margin-bottom:var(--space-1);animation:pulse 1.5s infinite;"></div>
            <div style="width:80%;height:18px;border-radius:4px;background:var(--bg-tertiary);margin-bottom:var(--space-2);animation:pulse 1.5s infinite;"></div>
            <div style="width:50%;height:14px;border-radius:4px;background:var(--bg-tertiary);animation:pulse 1.5s infinite;"></div>
          </div>
        </div>
      `).join('');
      return;
    }

    const trending = [...allSeries].sort((a, b) => parseFloat(b.views) - parseFloat(a.views));
    listEl.innerHTML = trending.slice(0, 5).map((s, i) => `
      <div class="card press-effect" style="display:flex;gap:var(--space-3);padding:var(--space-2);cursor:pointer;" onclick="document.dispatchEvent(new CustomEvent('navigate',{detail:'watch-party'}))">
        <div style="width:100px;height:140px;border-radius:var(--radius-md);overflow:hidden;flex-shrink:0;position:relative;">
          <div style="position:absolute;inset:0;${s.poster ? "background:url('" + s.poster + "') center/cover" : "background:" + s.gradientPoster};"></div>
          <div style="position:absolute;top:4px;left:4px;background:rgba(0,0,0,0.6);backdrop-filter:blur(4px);padding:2px 6px;border-radius:4px;font-size:10px;font-weight:700;">#${i + 1}</div>
        </div>
        <div style="flex:1;padding:var(--space-2) 0;">
          <div style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:var(--space-1);">
            ${s.tags.map(t => `<span class="badge ${t === 'promoted' ? 'badge-gold' : ''}" style="font-size:9px;">${t.toUpperCase()}</span>`).join('')}
          </div>
          <h4 style="font-size:var(--text-base);margin-bottom:4px;line-height:1.2;">${s.title}</h4>
          <p style="font-size:var(--text-xs);color:var(--text-secondary);margin-bottom:var(--space-2);">${s.episodes} ${i18n.t('episodes')}</p>
          <div style="display:flex;align-items:center;gap:var(--space-2);font-size:var(--text-xs);color:var(--text-tertiary);">
            <div class="avatar avatar-sm" style="width:20px;height:20px;font-size:10px;">${s.creator.avatar}</div>
            ${s.creator.name}
          </div>
        </div>
      </div>
    `).join('');
  }

  unsubscribe = appStore.subscribe('series', renderTrending);
  renderTrending();

  // Region cards - functional click
  el.querySelectorAll('.region-card').forEach(card => {
    card.addEventListener('click', () => {
      const region = card.dataset.region;
      el.querySelectorAll('.region-card').forEach(c => {
        c.style.borderColor = 'transparent';
        c.style.background = 'var(--bg-secondary)';
      });
      card.style.borderColor = 'var(--accent-blue)';
      card.style.background = 'var(--bg-tertiary)';
      showToast(`Showing series from ${region}`, 'info');
    });
  });

  // Handle Search Input
  const searchInput = el.querySelector('.search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      const listEl = el.querySelector('#discover-trending-list');
      const allSeries = appStore.getSeries();
      
      const filtered = query === '' ? 
        [...allSeries].sort((a, b) => parseFloat(b.views) - parseFloat(a.views)).slice(0, 5) :
        allSeries.filter(s => s.title.toLowerCase().includes(query) || s.tags.some(t => t.toLowerCase().includes(query)));

      listEl.innerHTML = filtered.map((s, i) => `
        <div class="card press-effect" style="display:flex;gap:var(--space-3);padding:var(--space-2);cursor:pointer;" onclick="document.dispatchEvent(new CustomEvent('navigate',{detail:'watch-party'}))">
          <div style="width:100px;height:140px;border-radius:var(--radius-md);overflow:hidden;flex-shrink:0;position:relative;">
            <div style="position:absolute;inset:0;${s.poster ? "background:url('" + s.poster + "') center/cover" : "background:" + s.gradientPoster};"></div>
          </div>
          <div style="flex:1;padding:var(--space-2) 0;">
            <h4 style="font-size:var(--text-base);margin-bottom:4px;line-height:1.2;">${s.title}</h4>
            <p style="font-size:var(--text-xs);color:var(--text-secondary);margin-bottom:var(--space-2);">${s.episodes} episodes</p>
          </div>
        </div>
      `).join('');
    });
  }

  // Notification Button
  const notifBtn = el.querySelector('#btn-discover-notif');
  if (notifBtn) {
    notifBtn.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('navigate', { detail: 'inbox' }));
    });
  }

  // Update text dynamically on language change
  const langSub = i18n.onLangChange(() => {
    const tDiscover = el.querySelector('#discover-title');
    const tSearch = el.querySelector('#discover-search');
    const tTrending = el.querySelector('#discover-trending-title');
    const tRegions = el.querySelector('#discover-regions-title');
    
    if (tDiscover) tDiscover.textContent = i18n.t('discoverTitle');
    if (tSearch) tSearch.placeholder = i18n.t('searchPlaceholder');
    if (tTrending) tTrending.textContent = i18n.t('trendingNow');
    if (tRegions) tRegions.textContent = i18n.t('regions');
    renderTrending();
  });

  // Cleanup
  el.addEventListener('DOMNodeRemoved', (e) => {
    if (e.target === el) {
      if (unsubscribe) unsubscribe();
      langSub();
    }
  });
}
