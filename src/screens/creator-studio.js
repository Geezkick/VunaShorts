// ============================================
// VUNASHORTS — Creator Studio Screen
// ============================================
import { ANALYTICS_DATA, CREATORS } from '../data/mock-data.js';
import { appStore } from '../services/store.js';
import { renderLineChart, renderBarChart, renderDonutChart } from '../components/charts.js';
import { showToast } from '../components/utils.js';
import { Icons } from '../components/icons.js';

export function renderCreatorStudio() {
  return `
    <div class="screen" style="padding-bottom:calc(var(--nav-height) + 16px);">
      <div style="padding:calc(var(--safe-top) + 16px) var(--space-4) var(--space-3);">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-4);">
          <h1 style="font-size:var(--text-2xl);">Creator Studio</h1>
          <button class="btn btn-gold btn-sm" id="btn-upload" style="display:flex;align-items:center;gap:4px;">${Icons.Upload()} Upload</button>
        </div>
      </div>

      <div class="desktop-grid-2" style="padding:0 var(--space-4);margin-bottom:var(--space-6);">
        <!-- Earnings Overview -->
        <div class="card-premium" style="padding:var(--space-5);margin-bottom:var(--space-4);">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:var(--space-4);">
            <div>
              <p style="font-size:var(--text-xs);color:var(--text-tertiary);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:var(--space-1);font-weight:600;">Total Earnings</p>
              <div style="font-family:var(--font-mono);font-size:var(--text-3xl);font-weight:700;background:var(--gradient-premium);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">KSh 847,250</div>
              <div style="display:flex;align-items:center;gap:var(--space-1);margin-top:var(--space-1);">
                <span class="badge badge-emerald">↑ 23%</span>
                <span style="font-size:var(--text-xs);color:var(--text-tertiary);">vs last month</span>
              </div>
            </div>
            <button class="btn btn-primary btn-sm">Withdraw</button>
          </div>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-3);">
            <div style="text-align:center;padding:var(--space-3);background:var(--bg-secondary);border-radius:var(--radius-md);">
              <div style="font-family:var(--font-mono);font-size:var(--text-lg);font-weight:700;color:var(--accent-blue);">47.2K</div>
              <div style="font-size:var(--text-xs);color:var(--text-tertiary);">Views Today</div>
            </div>
            <div style="text-align:center;padding:var(--space-3);background:var(--bg-secondary);border-radius:var(--radius-md);">
              <div style="font-family:var(--font-mono);font-size:var(--text-lg);font-weight:700;color:var(--accent-emerald);">1,247</div>
              <div style="font-size:var(--text-xs);color:var(--text-tertiary);">New Fans</div>
            </div>
            <div style="text-align:center;padding:var(--space-3);background:var(--bg-secondary);border-radius:var(--radius-md);">
              <div style="font-family:var(--font-mono);font-size:var(--text-lg);font-weight:700;color:var(--accent-gold);">87%</div>
              <div style="font-size:var(--text-xs);color:var(--text-tertiary);">Completion</div>
            </div>
          </div>
        </div>

        <!-- Revenue Chart -->
        <div class="card" style="padding:var(--space-4);margin-bottom:var(--space-4);">
          <h4 style="margin-bottom:var(--space-3);display:flex;align-items:center;gap:8px;"><span style="color:var(--accent-gold);">${Icons.TrendingUp()}</span> Revenue Trend</h4>
          <canvas id="chart-revenue" style="width:100%;height:180px;"></canvas>
        </div>
      </div>

      <div class="desktop-grid-2" style="padding:0 var(--space-4);margin-bottom:var(--space-6);">
        <!-- Views Chart -->
        <div class="card" style="padding:var(--space-4);margin-bottom:var(--space-4);">
          <h4 style="margin-bottom:var(--space-3);display:flex;align-items:center;gap:8px;"><span style="color:var(--text-secondary);">${Icons.Eye()}</span> Views (Last 14 Days)</h4>
          <canvas id="chart-views" style="width:100%;height:150px;"></canvas>
        </div>

        <!-- Revenue Split -->
        <div class="card" style="padding:var(--space-4);margin-bottom:var(--space-4);">
          <h4 style="margin-bottom:var(--space-3);display:flex;align-items:center;gap:8px;"><span style="color:var(--accent-emerald);">${Icons.Coins()}</span> Revenue Split</h4>
          <div style="display:flex;align-items:center;gap:var(--space-4);">
            <canvas id="chart-split" style="width:120px;height:120px;"></canvas>
            <div style="flex:1;display:flex;flex-direction:column;gap:var(--space-2);">
              <div style="display:flex;align-items:center;gap:var(--space-2);font-size:var(--text-sm);">
                <div style="width:10px;height:10px;border-radius:50%;background:#58A6FF;"></div>
                <span style="color:var(--text-secondary);">Episode Unlocks</span>
                <span style="margin-left:auto;font-weight:600;font-family:var(--font-mono);">62%</span>
              </div>
              <div style="display:flex;align-items:center;gap:var(--space-2);font-size:var(--text-sm);">
                <div style="width:10px;height:10px;border-radius:50%;background:#3FB950;"></div>
                <span style="color:var(--text-secondary);">Tips</span>
                <span style="margin-left:auto;font-weight:600;font-family:var(--font-mono);">21%</span>
              </div>
              <div style="display:flex;align-items:center;gap:var(--space-2);font-size:var(--text-sm);">
                <div style="width:10px;height:10px;border-radius:50%;background:#D4A853;"></div>
                <span style="color:var(--text-secondary);">Sponsorships</span>
                <span style="margin-left:auto;font-weight:600;font-family:var(--font-mono);">17%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div style="padding:0 var(--space-4) var(--space-6);">
        <h4 style="margin-bottom:var(--space-3);display:flex;align-items:center;gap:8px;"><span style="color:var(--accent-blue);">${Icons.Zap()}</span> Quick Actions</h4>
        <div class="responsive-grid-2 desktop-grid-4" style="display:grid;gap:var(--space-3);">
          <button class="card press-effect" style="padding:var(--space-4);text-align:center;cursor:pointer;border:none;background:var(--bg-secondary);color:var(--text-primary);" onclick="document.dispatchEvent(new CustomEvent('navigate',{detail:'ai-engine'}))">
            <div style="color:var(--accent-purple);display:flex;justify-content:center;margin-bottom:var(--space-2);">${Icons.Sparkles()}</div>
            <div style="font-size:var(--text-sm);font-weight:600;">AI Story Engine</div>
            <div style="font-size:var(--text-xs);color:var(--text-tertiary);">Generate scripts</div>
          </button>
          <button id="btn-studio-analytics" class="card press-effect" style="padding:var(--space-4);text-align:center;cursor:pointer;border:none;background:var(--bg-secondary);color:var(--text-primary);">
            <div style="color:var(--accent-blue);display:flex;justify-content:center;margin-bottom:var(--space-2);">${Icons.BarChart()}</div>
            <div style="font-size:var(--text-sm);font-weight:600;">Analytics</div>
            <div style="font-size:var(--text-xs);color:var(--text-tertiary);">Deep insights</div>
          </button>
          <button id="btn-studio-messages" class="card press-effect" style="padding:var(--space-4);text-align:center;cursor:pointer;border:none;background:var(--bg-secondary);color:var(--text-primary);">
            <div style="color:var(--accent-gold);display:flex;justify-content:center;margin-bottom:var(--space-2);">${Icons.MessageCircle()}</div>
            <div style="font-size:var(--text-sm);font-weight:600;">Fan Messages</div>
            <div style="font-size:var(--text-xs);color:var(--text-tertiary);">12 new</div>
          </button>
          <button id="btn-studio-collab" class="card press-effect" style="padding:var(--space-4);text-align:center;cursor:pointer;border:none;background:var(--bg-secondary);color:var(--text-primary);">
            <div style="color:var(--accent-emerald);display:flex;justify-content:center;margin-bottom:var(--space-2);">${Icons.Users()}</div>
            <div style="font-size:var(--text-sm);font-weight:600;">Collaborators</div>
            <div style="font-size:var(--text-xs);color:var(--text-tertiary);">Manage team</div>
          </button>
        </div>
      </div>
      
      <!-- My Series -->
      <div class="section-header" style="margin-top:-16px;"><h3><span style="display:inline-flex;align-items:center;gap:8px;vertical-align:bottom;color:var(--text-secondary);">${Icons.Film()}</span> My Series</h3><span class="see-all">Manage</span></div>
      <div id="creator-series-list" class="desktop-grid-3" style="padding:0 var(--space-4);display:flex;flex-direction:column;gap:var(--space-3);margin-bottom:var(--space-6);">
        <!-- Dynamically rendered -->
      </div>
    </div>

    <!-- Modals -->

    <div id="modal-delete" class="glass-overlay hidden" style="z-index:var(--z-modal);align-items:center;">
      <div class="card" style="width:100%;max-width:400px;margin:var(--space-4);padding:var(--space-5);border-color:var(--error-color);">
        <h3 style="color:var(--error-color);margin-bottom:var(--space-2);">Delete Series</h3>
        <p style="font-size:var(--text-sm);color:var(--text-secondary);margin-bottom:var(--space-4);">This action cannot be undone. All episodes and analytics will be permanently removed.</p>
        <div style="display:flex;gap:var(--space-3);">
          <button class="btn btn-secondary btn-full" id="btn-delete-cancel">Cancel</button>
          <button class="btn btn-danger btn-full" id="btn-delete-confirm">Delete Forever</button>
        </div>
      </div>
    </div>

    <div id="modal-boost" class="glass-overlay hidden" style="z-index:var(--z-modal);align-items:center;">
      <div class="card-premium" style="width:100%;max-width:400px;margin:var(--space-4);padding:var(--space-5);background:var(--bg-secondary);">
        <h3 style="margin-bottom:var(--space-2);display:flex;align-items:center;gap:8px;"><span style="color:var(--accent-gold);">${Icons.Zap()}</span> Boost Campaign</h3>
        <p style="font-size:var(--text-sm);color:var(--text-secondary);margin-bottom:var(--space-4);">Increase visibility across the platform.</p>
        <div style="margin-bottom:var(--space-4);">
          <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
            <label style="font-size:var(--text-sm);font-weight:600;">Daily Budget</label>
            <span style="font-family:var(--font-mono);color:var(--accent-gold);" id="boost-budget-display">KSh 1,000</span>
          </div>
          <input type="range" id="boost-budget" min="500" max="10000" step="500" value="1000" style="width:100%;accent-color:var(--accent-gold);">
          <div style="display:flex;justify-content:space-between;font-size:10px;color:var(--text-tertiary);margin-top:4px;">
            <span>Est. +50K views</span><span>Est. +500K views</span>
          </div>
        </div>
        <div style="display:flex;gap:var(--space-3);">
          <button class="btn btn-secondary btn-full" id="btn-boost-cancel">Cancel</button>
          <button class="btn btn-gold btn-full" id="btn-boost-confirm">Launch Campaign</button>
        </div>
      </div>
    </div>
  `;
}

export function mountCreatorStudio(el) {
  let unsubscribe;

  // Render charts
  setTimeout(() => {
    const revCanvas = el.querySelector('#chart-revenue');
    if (revCanvas) {
      renderLineChart(revCanvas, ANALYTICS_DATA.revenueByMonth.map(d => ({ value: d.value, month: d.month })), { color: '#D4A853' });
    }
    const viewsCanvas = el.querySelector('#chart-views');
    if (viewsCanvas) {
      renderBarChart(viewsCanvas, ANALYTICS_DATA.viewsByDay.map((v, i) => ({ value: v, label: `D${i + 1}` })), { color: '#58A6FF' });
    }
    const splitCanvas = el.querySelector('#chart-split');
    if (splitCanvas) {
      renderDonutChart(splitCanvas, [{ value: 62 }, { value: 21 }, { value: 17 }], { centerText: '70%', centerLabel: 'Your Share' });
    }
  }, 100);

  // Withdraw
  const btnWithdraw = el.querySelector('#btn-withdraw');
  if (btnWithdraw) {
    btnWithdraw.addEventListener('click', () => {
      showToast('Processing withdrawal to M-PESA...', 'info');
      setTimeout(() => {
        showToast('KSh 12,450 withdrawn successfully!', 'success');
      }, 1500);
    });
  }

  // Quick Actions
  const btnAnalytics = el.querySelector('#btn-studio-analytics');
  if (btnAnalytics) btnAnalytics.addEventListener('click', () => showToast('Analytics dashboard coming soon', 'info'));
  
  const btnMessages = el.querySelector('#btn-studio-messages');
  if (btnMessages) btnMessages.addEventListener('click', () => document.dispatchEvent(new CustomEvent('navigate', { detail: 'inbox' })));
  
  const btnCollab = el.querySelector('#btn-studio-collab');
  if (btnCollab) btnCollab.addEventListener('click', () => showToast('Team management coming soon', 'info'));

  function renderSeriesList() {
    const listEl = el.querySelector('#creator-series-list');
    if (!listEl) return;
    
    // We get creator's series. Mock creator index 0.
    const mySeries = appStore.getCreatorSeries(CREATORS[0].id);
    
    if (mySeries.length === 0) {
      listEl.innerHTML = `<div style="text-align:center;padding:var(--space-6);color:var(--text-secondary);">No series yet. Upload your first short!</div>`;
      return;
    }

    listEl.innerHTML = mySeries.map(s => `
      <div class="card" style="padding:var(--space-3);display:flex;gap:var(--space-3);position:relative;overflow:visible;">
        <div style="width:60px;height:80px;border-radius:var(--radius-md);overflow:hidden;flex-shrink:0;">
          <div style="width:100%;height:100%;${s.poster ? "background:url('" + s.poster + "') center/cover" : "background:" + s.gradientPoster};"></div>
        </div>
        <div style="flex:1;">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;">
            <div style="display:flex;align-items:center;gap:4px;">
              <h4 style="font-size:var(--text-sm);max-width:140px;" class="truncate">${s.title}</h4>
              ${s.tags.includes('promoted') ? `<span class="badge badge-gold" style="font-size:8px;">PROMOTED</span>` : ''}
            </div>
            <div class="dropdown-container" style="position:relative;">
              <button class="btn btn-ghost btn-icon action-menu-btn" data-id="${s.id}" style="width:24px;height:24px;color:var(--text-secondary);">⋮</button>
            </div>
          </div>
          <p style="font-size:var(--text-xs);color:var(--text-tertiary);margin:var(--space-1) 0;">${s.episodes} eps • ${s.views} views</p>
          <div class="progress-bar" style="margin-top:var(--space-2);">
            <div class="progress-bar-fill" style="width:${s.completionRate || 0}%;"></div>
          </div>
          <div style="display:flex;justify-content:space-between;margin-top:4px;">
            <span style="font-size:10px;color:var(--text-tertiary);">${s.completionRate || 0}% avg completion</span>
            <span style="font-size:10px;color:var(--accent-emerald);">${s.currency} ${Math.floor(Math.random() * 200000 + 50000).toLocaleString()}</span>
          </div>
        </div>
      </div>
    `).join('');

    // Attach menu listeners
    listEl.querySelectorAll('.action-menu-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        // Remove existing menus
        document.querySelectorAll('.action-menu-dropdown').forEach(m => m.remove());
        
        const id = btn.dataset.id;
        const menu = document.createElement('div');
        menu.className = 'action-menu-dropdown card';
        menu.style.cssText = 'position:absolute;top:24px;right:0;width:120px;z-index:20;display:flex;flex-direction:column;padding:4px;';
        menu.innerHTML = `
          <button class="btn btn-ghost menu-boost" style="justify-content:flex-start;font-size:12px;color:var(--accent-gold);"><span style="width:16px;">${Icons.Zap()}</span> Boost</button>
          <button class="btn btn-ghost menu-delete" style="justify-content:flex-start;font-size:12px;color:var(--error-color);"><span style="width:16px;">${Icons.Trash()}</span> Delete</button>
        `;
        
        btn.parentElement.appendChild(menu);

        menu.querySelector('.menu-delete').addEventListener('click', () => {
          menu.remove();
          activeSeriesId = id;
          el.querySelector('#modal-delete').classList.remove('hidden');
        });

        menu.querySelector('.menu-boost').addEventListener('click', () => {
          menu.remove();
          activeSeriesId = id;
          el.querySelector('#modal-boost').classList.remove('hidden');
        });
      });
    });
  }

  // Close menus on click outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown-container')) {
      document.querySelectorAll('.action-menu-dropdown').forEach(m => m.remove());
    }
  });

  unsubscribe = appStore.subscribe('series', renderSeriesList);
  renderSeriesList();

  let activeSeriesId = null;

  // Upload Logic - Redirect to Professional Video Editor
  el.querySelector('#btn-upload').addEventListener('click', () => {
    document.dispatchEvent(new CustomEvent('navigate', { detail: 'video-editor' }));
  });

  // Delete Logic
  const modalDelete = el.querySelector('#modal-delete');
  el.querySelector('#btn-delete-cancel').addEventListener('click', () => modalDelete.classList.add('hidden'));
  el.querySelector('#btn-delete-confirm').addEventListener('click', () => {
    if (activeSeriesId) {
      appStore.deleteSeries(activeSeriesId);
      showToast('Series deleted permanently.', 'success');
    }
    modalDelete.classList.add('hidden');
  });

  // Boost Logic
  const modalBoost = el.querySelector('#modal-boost');
  const boostBudget = el.querySelector('#boost-budget');
  const boostDisplay = el.querySelector('#boost-budget-display');
  
  boostBudget.addEventListener('input', (e) => {
    boostDisplay.textContent = 'KSh ' + parseInt(e.target.value).toLocaleString();
  });

  el.querySelector('#btn-boost-cancel').addEventListener('click', () => modalBoost.classList.add('hidden'));
  el.querySelector('#btn-boost-confirm').addEventListener('click', () => {
    if (activeSeriesId) {
      appStore.boostSeries(activeSeriesId, parseInt(boostBudget.value));
      showToast('Campaign launched! Your series is now promoted.', 'gold');
    }
    modalBoost.classList.add('hidden');
  });

  // Cleanup
  el.addEventListener('DOMNodeRemoved', (e) => {
    if (e.target === el && unsubscribe) unsubscribe();
  });
}
