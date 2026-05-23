// ============================================
// VUNASHORTS — Business Marketplace Screen
// ============================================
import { BRAND_CAMPAIGNS, SERIES } from '../data/mock-data.js';
import { Icons } from '../components/icons.js';

export function renderMarketplace() {
  return `
    <div class="screen" style="padding-bottom:calc(var(--nav-height) + 16px);">
      <div style="padding:calc(var(--safe-top) + 16px) var(--space-4) var(--space-3);">
        <h1 style="font-size:var(--text-2xl);margin-bottom:var(--space-1);display:flex;align-items:center;gap:8px;">${Icons.BarChart()} Brand Marketplace</h1>
        <p style="font-size:var(--text-sm);color:var(--text-secondary);">Connect with top African brands for sponsorships and product placements.</p>
      </div>

      <!-- Quick Stats -->
      <div style="padding:var(--space-4);display:grid;grid-template-columns:repeat(2,1fr);gap:var(--space-3);">
        <div class="card" style="padding:var(--space-3);text-align:center;">
          <div style="font-family:var(--font-mono);font-size:var(--text-xl);font-weight:700;color:var(--accent-gold);">KSh 2.4M</div>
          <div style="font-size:var(--text-xs);color:var(--text-tertiary);">Avg Campaign Value</div>
        </div>
        <div class="card" style="padding:var(--space-3);text-align:center;">
          <div style="font-family:var(--font-mono);font-size:var(--text-xl);font-weight:700;color:var(--accent-blue);">45+</div>
          <div style="font-size:var(--text-xs);color:var(--text-tertiary);">Active Brands</div>
        </div>
      </div>

      <!-- Active Campaigns -->
      <div class="section-header"><h3><span style="display:inline-flex;align-items:center;gap:8px;vertical-align:bottom;color:var(--accent-rose);">${Icons.Fire()}</span> Open Opportunities</h3><span class="see-all">Filter</span></div>
      <div style="padding:0 var(--space-4);display:flex;flex-direction:column;gap:var(--space-4);margin-bottom:var(--space-6);">
        ${BRAND_CAMPAIGNS.map(c => `
          <div class="card-premium press-effect" style="padding:var(--space-4);cursor:pointer;">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:var(--space-3);">
              <div style="display:flex;align-items:center;gap:var(--space-3);">
                <div style="width:40px;height:40px;border-radius:var(--radius-md);background:var(--bg-tertiary);display:flex;align-items:center;justify-content:center;font-size:1.5rem;">${c.logo}</div>
                <div>
                  <h4 style="font-size:var(--text-base);">${c.brand}</h4>
                  <div style="font-size:var(--text-xs);color:var(--accent-gold);font-weight:600;">${c.type}</div>
                </div>
              </div>
              <span class="badge ${c.status === 'active' ? 'badge-emerald' : 'badge-blue'}">${c.status.toUpperCase()}</span>
            </div>
            <p style="font-size:var(--text-sm);color:var(--text-secondary);margin-bottom:var(--space-4);">${c.description}</p>
            <div style="display:flex;justify-content:space-between;align-items:center;padding-top:var(--space-3);border-top:var(--border-subtle);">
              <div>
                <div style="font-size:var(--text-xs);color:var(--text-tertiary);margin-bottom:2px;">Budget</div>
                <div style="font-family:var(--font-mono);font-weight:700;">${c.budget}</div>
              </div>
              <div style="text-align:right;">
                <div style="font-size:var(--text-xs);color:var(--text-tertiary);margin-bottom:2px;">Target Reach</div>
                <div style="font-family:var(--font-mono);font-weight:700;">${c.reach}</div>
              </div>
            </div>
            ${c.status === 'open' ? `<button class="btn btn-gold btn-full btn-apply-campaign" style="margin-top:var(--space-4);">Apply Now</button>` : ''}
          </div>
        `).join('')}
      </div>

      <!-- Success Stories -->
      <div class="section-header"><h3><span style="display:inline-flex;align-items:center;gap:8px;vertical-align:bottom;color:var(--accent-gold);">${Icons.Crown()}</span> Success Stories</h3></div>
      <div class="h-scroll" style="padding-bottom:var(--space-6);">
        ${[0, 1].map(i => {
          const s = SERIES[i];
          return `
            <div class="card" style="width:240px;padding:var(--space-4);">
              <div style="display:flex;gap:var(--space-3);margin-bottom:var(--space-3);">
                <div style="width:40px;height:60px;border-radius:var(--radius-md);background:url('${s.poster}') center/cover;"></div>
                <div>
                  <div style="font-weight:600;font-size:var(--text-sm);">${s.title}</div>
                  <div style="font-size:var(--text-xs);color:var(--text-tertiary);">Sponsored by Safaricom</div>
                </div>
              </div>
              <div style="background:var(--bg-primary);padding:var(--space-2);border-radius:var(--radius-sm);font-size:var(--text-xs);text-align:center;">
                <span style="color:var(--accent-emerald);font-weight:600;">+340% ROI</span> on product placement
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

export function mountMarketplace(el) {
  el.querySelectorAll('.btn-apply-campaign').forEach(btn => {
    btn.addEventListener('click', () => {
      import('../components/utils.js').then(({ showToast }) => {
        btn.innerHTML = '<div class="splash-loader" style="width:18px;height:18px;border-width:2px;margin:0 auto;border-top-color:white;"></div>';
        btn.disabled = true;
        setTimeout(() => {
          btn.innerHTML = 'Application Submitted';
          btn.classList.remove('btn-gold');
          btn.classList.add('btn-secondary');
          showToast('Brand pitch submitted successfully!', 'success');
        }, 1500);
      });
    });
  });
}
