// ============================================
// VUNASHORTS — Crowdfunding Screen
// ============================================
import { CROWDFUNDING_PROJECTS, CREATORS } from '../data/mock-data.js';
import { Icons } from '../components/icons.js';
import { showToast } from '../components/utils.js';

export function renderCrowdfunding() {
  return `
    <div class="screen" style="padding-bottom:calc(var(--nav-height) + 16px);">
      <div style="padding:calc(var(--safe-top) + 16px) var(--space-4) var(--space-4);">
        <h1 style="font-size:var(--text-2xl);margin-bottom:var(--space-1);">Fan Funding</h1>
        <p style="font-size:var(--text-sm);color:var(--text-secondary);margin-bottom:var(--space-4);">Support creators and bring stories to life</p>

        <!-- Stats Bar -->
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-3);margin-bottom:var(--space-6);">
          <div class="card" style="padding:var(--space-3);text-align:center;">
            <div style="color:var(--accent-gold);margin-bottom:4px;display:flex;justify-content:center;">${Icons.Coins()}</div>
            <div style="font-family:var(--font-mono);font-size:var(--text-lg);font-weight:700;">KSh 4.2M</div>
            <div style="font-size:9px;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:0.05em;">Total Raised</div>
          </div>
          <div class="card" style="padding:var(--space-3);text-align:center;">
            <div style="color:var(--accent-emerald);margin-bottom:4px;display:flex;justify-content:center;">${Icons.Users()}</div>
            <div style="font-family:var(--font-mono);font-size:var(--text-lg);font-weight:700;">5,686</div>
            <div style="font-size:9px;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:0.05em;">Backers</div>
          </div>
          <div class="card" style="padding:var(--space-3);text-align:center;">
            <div style="color:var(--accent-blue);margin-bottom:4px;display:flex;justify-content:center;">${Icons.Film()}</div>
            <div style="font-family:var(--font-mono);font-size:var(--text-lg);font-weight:700;">12</div>
            <div style="font-size:9px;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:0.05em;">Projects Funded</div>
          </div>
        </div>
      </div>

      <!-- Active Campaigns -->
      <div class="section-header"><h3><span style="display:inline-flex;align-items:center;gap:8px;color:var(--accent-rose);">${Icons.Fire()}</span> Active Campaigns</h3></div>
      <div style="padding:0 var(--space-4);display:flex;flex-direction:column;gap:var(--space-4);">
        ${CROWDFUNDING_PROJECTS.map(p => {
          const pct = Math.round((p.raised / p.goal) * 100);
          return `
            <div class="card press-effect campaign-card" data-id="${p.id}" style="overflow:hidden;cursor:pointer;">
              <div style="position:relative;height:140px;overflow:hidden;">
                <div style="position:absolute;inset:0;${p.poster ? "background:url('" + p.poster + "') center/cover" : 'background:var(--gradient-purple)'};"></div>
                <div style="position:absolute;inset:0;background:linear-gradient(0deg,rgba(14,17,22,0.95) 0%,transparent 60%);"></div>
                <div style="position:absolute;top:12px;right:12px;">
                  <span class="badge ${p.daysLeft <= 10 ? 'badge-rose' : 'badge-emerald'}" style="font-size:9px;">
                    <span style="display:inline-flex;align-items:center;gap:3px;">${Icons.Clock()} ${p.daysLeft}d left</span>
                  </span>
                </div>
                <div style="position:absolute;bottom:12px;left:12px;right:12px;">
                  <h4 style="font-size:var(--text-base);margin-bottom:2px;">${p.title}</h4>
                  <div style="font-size:var(--text-xs);color:var(--text-secondary);">by ${p.creator.name}</div>
                </div>
              </div>
              <div style="padding:var(--space-4);">
                <p style="font-size:var(--text-xs);color:var(--text-secondary);margin-bottom:var(--space-3);line-height:1.5;">${p.description}</p>
                <div style="margin-bottom:var(--space-3);">
                  <div style="display:flex;justify-content:space-between;margin-bottom:var(--space-1);">
                    <span style="font-family:var(--font-mono);font-size:var(--text-sm);font-weight:700;">${p.currency} ${(p.raised/1000).toFixed(0)}K</span>
                    <span style="font-size:var(--text-xs);color:var(--text-tertiary);">of ${p.currency} ${(p.goal/1000).toFixed(0)}K</span>
                  </div>
                  <div class="progress-bar" style="height:6px;border-radius:3px;">
                    <div class="progress-bar-fill" style="width:${pct}%;background:${pct >= 75 ? 'var(--accent-emerald)' : 'var(--accent-blue)'};border-radius:3px;"></div>
                  </div>
                </div>
                <div style="display:flex;justify-content:space-between;align-items:center;">
                  <div style="display:flex;gap:var(--space-4);font-size:var(--text-xs);color:var(--text-tertiary);">
                    <span style="display:flex;align-items:center;gap:4px;">${Icons.Users()} ${p.backers.toLocaleString()}</span>
                    <span style="display:flex;align-items:center;gap:4px;">${Icons.HandHeart()} ${pct}%</span>
                  </div>
                  <button class="btn btn-primary btn-sm back-btn" data-project="${p.id}">Back Project</button>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- How It Works -->
      <div style="padding:var(--space-6) var(--space-4);">
        <h3 style="text-align:center;margin-bottom:var(--space-4);">How Fan Funding Works</h3>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-3);">
          ${[
            { icon: Icons.HandHeart(), title: 'Choose', desc: 'Pick a project you believe in', color: 'var(--accent-blue)' },
            { icon: Icons.CreditCard(), title: 'Pledge', desc: 'Support via M-PESA or card', color: 'var(--accent-gold)' },
            { icon: Icons.Film(), title: 'Watch', desc: 'Get early access to the series', color: 'var(--accent-emerald)' }
          ].map(s => `
            <div class="card" style="padding:var(--space-4);text-align:center;">
              <div style="color:${s.color};display:flex;justify-content:center;margin-bottom:var(--space-2);">${s.icon}</div>
              <div style="font-weight:700;font-size:var(--text-sm);margin-bottom:4px;">${s.title}</div>
              <div style="font-size:10px;color:var(--text-tertiary);line-height:1.4;">${s.desc}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

export function mountCrowdfunding(el) {
  // Back project buttons
  el.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.project;
      btn.textContent = 'Backed!';
      btn.style.background = 'var(--accent-emerald)';
      btn.disabled = true;
      showToast('Thank you for backing this project!', 'success');
    });
  });

  // Campaign card click
  el.querySelectorAll('.campaign-card').forEach(card => {
    card.addEventListener('click', () => {
      showToast('Campaign details coming soon!', 'info');
    });
  });
}
