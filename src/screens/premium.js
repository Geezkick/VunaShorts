// ============================================
// VUNASHORTS — Premium & Support Screen
// 2-Tier: Free / Premium + Donate to Films
// ============================================
import { USER_PROFILE, CROWDFUNDING_PROJECTS } from '../data/mock-data.js';
import { Icons } from '../components/icons.js';
import { showToast } from '../components/utils.js';
import { i18n } from '../services/i18n.js';
import { appStore } from '../services/store.js';

const API_URL = import.meta.env.VITE_API_URL || (window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://vunashorts.onrender.com');

export function renderPremium() {
  const userTier = USER_PROFILE.tier || 'free';
  const isPremium = userTier === 'premium' || userTier === 'pro';

  return `
    <div class="screen" style="padding-bottom:calc(var(--nav-height) + 16px);background:var(--bg-primary);">
      <style>
        .prem-hero { position:relative;padding:calc(var(--safe-top) + 28px) var(--space-4) var(--space-4);text-align:center;overflow:hidden; }
        .prem-hero::before { content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% -20%, rgba(212,168,83,0.18) 0%, transparent 65%);pointer-events:none; }
        .prem-crown { width:60px;height:60px;border-radius:50%;background:var(--gradient-premium);box-shadow:0 0 50px rgba(212,168,83,0.4),0 0 100px rgba(212,168,83,0.15);color:white;display:inline-flex;align-items:center;justify-content:center;margin-bottom:var(--space-3);animation:breathe 3s ease-in-out infinite; }
        .prem-title { font-size:var(--text-2xl);font-weight:800;margin-bottom:6px;background:linear-gradient(135deg,#D4A853,#F0D78C,#D4A853);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
        .prem-tabs { display:flex;gap:6px;padding:0 var(--space-4) var(--space-4); }
        .prem-tab { flex:1;padding:10px 0;border-radius:var(--radius-full);border:none;font-size:var(--text-sm);font-weight:700;cursor:pointer;font-family:var(--font-body);transition:all 250ms cubic-bezier(.25,.46,.45,.94); }
        .prem-tab.active { background:var(--bg-secondary);color:var(--text-primary);box-shadow:0 2px 8px rgba(0,0,0,0.2); }
        .prem-tab:not(.active) { background:transparent;color:var(--text-tertiary); }
        .plan-card { padding:var(--space-5);position:relative;overflow:hidden;transition:transform 200ms ease; }
        .plan-card-free { border:1.5px solid rgba(255,255,255,0.06); }
        .plan-card-premium { border:2px solid rgba(212,168,83,0.5);box-shadow:0 4px 40px rgba(212,168,83,0.12),inset 0 1px 0 rgba(212,168,83,0.15); }
        .plan-card-premium::before { content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,#D4A853,#F0D78C,#D4A853,transparent); }
        .billing-pill { display:flex;background:var(--bg-tertiary);border-radius:var(--radius-full);padding:3px;border:var(--border-subtle); }
        .billing-pill button { flex:1;padding:8px 14px;border-radius:var(--radius-full);border:none;font-size:var(--text-xs);font-weight:700;cursor:pointer;font-family:var(--font-body);transition:all 200ms ease; }
        .billing-pill button.active { background:linear-gradient(135deg,#D4A853,#C49B38);color:#0E1116;box-shadow:0 2px 10px rgba(212,168,83,0.3); }
        .billing-pill button:not(.active) { background:transparent;color:var(--text-tertiary); }
        .savings-badge { display:inline-block;background:rgba(63,185,80,0.15);color:var(--accent-emerald);font-size:10px;font-weight:800;padding:2px 8px;border-radius:var(--radius-full);margin-left:6px; }
        .feature-row { display:flex;align-items:center;gap:10px;padding:6px 0;font-size:var(--text-sm); }
        .feature-icon { width:28px;height:28px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }
        .compare-grid { display:grid;grid-template-columns:2fr 1fr 1fr;align-items:center; }
        .donate-chip { border-radius:var(--radius-full);padding:10px 18px;font-family:var(--font-mono);font-size:var(--text-sm);font-weight:700;border:1.5px solid rgba(255,255,255,0.08);background:transparent;color:var(--text-primary);cursor:pointer;transition:all 200ms ease; }
        .donate-chip.selected { background:var(--accent-blue);border-color:var(--accent-blue);color:white;box-shadow:0 2px 12px rgba(88,166,255,0.3); }
        .film-card { display:flex;gap:var(--space-3);padding:var(--space-3);cursor:pointer;border:2px solid transparent;transition:all 200ms ease;border-radius:var(--radius-lg); }
        .film-card.selected { border-color:var(--accent-blue);background:rgba(88,166,255,0.05); }
      </style>

      <!-- Hero -->
      <div class="prem-hero">
        <div class="prem-crown">${Icons.Crown()}</div>
        <h1 class="prem-title">VunaShorts Premium</h1>
        <p style="font-size:var(--text-sm);color:var(--text-secondary);max-width:280px;margin:0 auto;">Unlock everything or support the creators you love</p>
      </div>

      <!-- Tab Switcher -->
      <div class="prem-tabs">
        <button class="prem-tab active" data-tab="plans">${Icons.Crown()} Plans</button>
        <button class="prem-tab" data-tab="support">${Icons.HandHeart()} Support a Film</button>
      </div>

      <!-- ═══════════════ PLANS TAB ═══════════════ -->
      <div id="tab-plans" style="padding:0 var(--space-4);">

        <!-- Premium Card (shown first — it's the hero) -->
        <div class="card plan-card plan-card-premium anim-slide-up" style="margin-bottom:var(--space-4);">
          <div style="position:absolute;top:14px;right:14px;background:linear-gradient(135deg,#D4A853,#C49B38);color:#0E1116;font-size:9px;font-weight:800;padding:4px 12px;border-radius:var(--radius-full);text-transform:uppercase;letter-spacing:0.05em;">Recommended</div>

          <div style="display:flex;align-items:center;gap:10px;margin-bottom:var(--space-3);">
            <div style="width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,rgba(212,168,83,0.2),rgba(212,168,83,0.05));display:flex;align-items:center;justify-content:center;color:var(--accent-gold);">${Icons.Crown()}</div>
            <div>
              <div style="font-weight:800;font-size:var(--text-lg);font-family:var(--font-display);">Premium</div>
              <div style="font-size:11px;color:var(--text-tertiary);">The full VunaShorts experience</div>
            </div>
          </div>

          <!-- Billing Toggle -->
          <div class="billing-pill" style="margin-bottom:var(--space-3);">
            <button class="billing-toggle active" data-billing="monthly">Monthly</button>
            <button class="billing-toggle" data-billing="yearly">Yearly<span class="savings-badge">Save KSh 579</span></button>
          </div>

          <div style="display:flex;align-items:baseline;gap:4px;margin-bottom:var(--space-1);">
            <span style="font-size:var(--text-sm);color:var(--text-tertiary);">KSh</span>
            <span class="premium-price" style="font-family:var(--font-mono);font-size:38px;font-weight:800;letter-spacing:-1px;">299</span>
            <span class="premium-period" style="font-size:var(--text-xs);color:var(--text-tertiary);">/month</span>
          </div>
          <div class="yearly-note" style="font-size:11px;color:var(--text-tertiary);margin-bottom:var(--space-4);display:none;">That's just KSh 583/month, billed annually</div>

          <div style="display:flex;flex-direction:column;gap:2px;margin-bottom:var(--space-5);">
            ${[
              { icon: Icons.Play(), label: 'Unlimited episodes — all series', bg: 'rgba(88,166,255,0.1)', color: 'var(--accent-blue)' },
              { icon: Icons.X(), label: 'Zero ads, ever', bg: 'rgba(248,81,73,0.1)', color: 'var(--accent-rose)' },
              { icon: Icons.Sparkles(), label: 'HD & 4K Ultra streaming', bg: 'rgba(212,168,83,0.1)', color: 'var(--accent-gold)' },
              { icon: Icons.Download(), label: 'Unlimited offline downloads', bg: 'rgba(63,185,80,0.1)', color: 'var(--accent-emerald)' },
              { icon: Icons.Clock(), label: 'Early access to new series', bg: 'rgba(188,140,255,0.1)', color: '#BC8CFF' },
              { icon: Icons.Film(), label: 'Creator studio & AI tools', bg: 'rgba(88,166,255,0.1)', color: 'var(--accent-blue)' },
              { icon: Icons.Zap(), label: 'Priority support', bg: 'rgba(212,168,83,0.1)', color: 'var(--accent-gold)' },
            ].map(f => `
              <div class="feature-row">
                <div class="feature-icon" style="background:${f.bg};color:${f.color};">${f.icon}</div>
                <span style="color:var(--text-secondary);">${f.label}</span>
              </div>
            `).join('')}
          </div>
          <button class="btn btn-gold btn-full plan-select-btn" data-tier="premium" style="border-radius:var(--radius-xl);padding:14px;font-size:var(--text-base);font-weight:800;" ${isPremium ? 'disabled' : ''}>${isPremium ? '✓ Current Plan' : 'Upgrade to Premium'}</button>
          <div style="text-align:center;font-size:10px;color:var(--text-tertiary);margin-top:8px;">Cancel anytime · M-PESA, Card, or Mobile Money</div>
        </div>

        <!-- Free Tier (compact) -->
        <div class="card plan-card plan-card-free anim-slide-up" style="margin-bottom:var(--space-6);">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:var(--space-3);">
            <div style="width:36px;height:36px;border-radius:10px;background:rgba(255,255,255,0.05);display:flex;align-items:center;justify-content:center;color:var(--text-tertiary);">${Icons.User()}</div>
            <div>
              <div style="font-weight:800;font-size:var(--text-lg);font-family:var(--font-display);">Free</div>
              <div style="font-size:11px;color:var(--text-tertiary);">KSh 0 — forever free</div>
            </div>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:var(--space-4);">
            ${['3 free eps/series', 'Ads supported', 'SD quality', 'Donate to creators'].map(f => `
              <span style="font-size:11px;padding:4px 10px;border-radius:var(--radius-full);background:var(--bg-tertiary);color:var(--text-secondary);">${f}</span>
            `).join('')}
          </div>
          <button class="btn btn-secondary btn-full" style="border-radius:var(--radius-xl);padding:12px;" disabled>${isPremium ? 'Downgrade' : '✓ Current Plan'}</button>
        </div>

        <!-- Comparison -->
        <h3 style="text-align:center;margin-bottom:var(--space-4);font-size:var(--text-base);">Free vs Premium</h3>
        <div class="card" style="overflow:hidden;margin-bottom:var(--space-6);">
          <div class="compare-grid" style="padding:var(--space-3);background:var(--bg-tertiary);border-bottom:var(--border-subtle);font-size:9px;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-tertiary);font-weight:600;">
            <div>Feature</div>
            <div style="text-align:center;">Free</div>
            <div style="text-align:center;color:var(--accent-gold);">Premium</div>
          </div>
          ${[
            { name: 'Ads', free: 'Yes', prem: 'None' },
            { name: 'Episodes', free: '3 free', prem: 'All' },
            { name: 'Quality', free: 'SD', prem: '4K Ultra' },
            { name: 'Downloads', free: '—', prem: '∞' },
            { name: 'Early Access', free: '—', prem: Icons.Check() },
            { name: 'Creator Tools', free: '—', prem: Icons.Check() },
          ].map(row => `
            <div class="compare-grid" style="padding:10px var(--space-3);border-bottom:var(--border-subtle);font-size:var(--text-xs);">
              <div style="color:var(--text-secondary);">${row.name}</div>
              <div style="text-align:center;color:var(--text-tertiary);display:flex;justify-content:center;">${row.free}</div>
              <div style="text-align:center;color:var(--accent-gold);font-weight:600;display:flex;justify-content:center;">${row.prem}</div>
            </div>
          `).join('')}
        </div>

        <!-- Social Proof -->
        <div class="card" style="padding:var(--space-4);margin-bottom:var(--space-6);text-align:center;">
          <div style="font-size:var(--text-xs);color:var(--text-tertiary);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:var(--space-2);">Trusted by</div>
          <div style="font-family:var(--font-mono);font-size:var(--text-2xl);font-weight:800;color:var(--accent-gold);margin-bottom:4px;">12,000+</div>
          <div style="font-size:var(--text-sm);color:var(--text-secondary);">Premium members across Africa</div>
        </div>
      </div>

      <!-- ═══════════════ SUPPORT TAB ═══════════════ -->
      <div id="tab-support" style="padding:0 var(--space-4);display:none;">

        <div style="text-align:center;margin-bottom:var(--space-5);">
          <div style="font-size:32px;margin-bottom:var(--space-2);">🎬</div>
          <p style="font-size:var(--text-sm);color:var(--text-secondary);max-width:300px;margin:0 auto;">Love a series? Send the creators some love.<br><strong style="color:var(--accent-emerald);">100% goes directly to them.</strong></p>
        </div>

        <!-- Step 1: Amount -->
        <div style="margin-bottom:var(--space-5);">
          <div style="font-size:var(--text-xs);font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-tertiary);margin-bottom:var(--space-2);">Step 1 — Choose amount</div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:var(--space-3);">
            ${[50, 100, 250, 500, 1000].map(amt => `
              <button class="donate-chip press-effect" data-amount="${amt}">KSh ${amt.toLocaleString()}</button>
            `).join('')}
          </div>
          <div style="display:flex;gap:8px;align-items:center;">
            <span style="font-size:var(--text-sm);color:var(--text-secondary);font-weight:600;">KSh</span>
            <input type="number" id="custom-donate-amount" class="input" placeholder="Or enter custom" style="flex:1;border-radius:var(--radius-full);text-align:center;font-family:var(--font-mono);">
          </div>
        </div>

        <!-- Step 2: Film -->
        <div style="margin-bottom:var(--space-5);">
          <div style="font-size:var(--text-xs);font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-tertiary);margin-bottom:var(--space-2);">Step 2 — Pick a film</div>
          <div style="display:flex;flex-direction:column;gap:var(--space-2);" id="donate-campaigns">
            ${CROWDFUNDING_PROJECTS.map(p => {
              const pct = Math.round((p.raised / p.goal) * 100);
              return `
                <div class="card film-card press-effect donate-film-card" data-film-id="${p.id}" data-film-title="${p.title}">
                  <div style="width:64px;height:90px;border-radius:var(--radius-md);overflow:hidden;flex-shrink:0;position:relative;">
                    <div style="position:absolute;inset:0;${p.poster ? "background:url('" + p.poster + "') center/cover" : 'background:var(--gradient-purple)'};"></div>
                  </div>
                  <div style="flex:1;min-width:0;">
                    <h4 style="font-size:var(--text-sm);font-weight:700;margin-bottom:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${p.title}</h4>
                    <div style="font-size:11px;color:var(--text-tertiary);margin-bottom:6px;">by ${p.creator.name}</div>
                    <div class="progress-bar" style="height:4px;border-radius:2px;margin-bottom:4px;">
                      <div class="progress-bar-fill" style="width:${pct}%;background:${pct >= 75 ? 'var(--accent-emerald)' : 'var(--accent-blue)'};border-radius:2px;"></div>
                    </div>
                    <div style="display:flex;justify-content:space-between;font-size:10px;color:var(--text-tertiary);">
                      <span>${p.currency} ${(p.raised/1000).toFixed(0)}K raised</span>
                      <span>${p.backers.toLocaleString()} backers</span>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Step 3: Send -->
        <button class="btn btn-primary btn-full" id="btn-send-donation" style="border-radius:var(--radius-xl);padding:14px;font-size:var(--text-base);font-weight:700;margin-bottom:var(--space-4);" disabled>
          <span style="display:flex;align-items:center;justify-content:center;gap:8px;">${Icons.HandHeart()} Select a film & amount</span>
        </button>

        <!-- How It Works -->
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-2);margin-bottom:var(--space-6);">
          ${[
            { icon: Icons.Heart(), title: 'Choose', desc: 'Pick a film you love', color: 'var(--accent-rose)' },
            { icon: Icons.CreditCard(), title: 'Send', desc: 'M-PESA or card', color: 'var(--accent-gold)' },
            { icon: Icons.Film(), title: 'Impact', desc: '100% to creators', color: 'var(--accent-emerald)' }
          ].map(s => `
            <div class="card" style="padding:var(--space-3);text-align:center;">
              <div style="color:${s.color};display:flex;justify-content:center;margin-bottom:6px;">${s.icon}</div>
              <div style="font-weight:700;font-size:11px;margin-bottom:2px;">${s.title}</div>
              <div style="font-size:9px;color:var(--text-tertiary);line-height:1.4;">${s.desc}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

export function mountPremium(el) {
  let selectedAmount = 0;
  let selectedFilmId = null;
  let selectedFilmTitle = '';

  // --- Tab Switching ---
  el.querySelectorAll('.prem-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      el.querySelectorAll('.prem-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.dataset.tab;
      el.querySelector('#tab-plans').style.display = target === 'plans' ? 'block' : 'none';
      el.querySelector('#tab-support').style.display = target === 'support' ? 'block' : 'none';
    });
  });

  // --- Billing Toggle ---
  el.querySelectorAll('.billing-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      el.querySelectorAll('.billing-toggle').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const priceEl = el.querySelector('.premium-price');
      const periodEl = el.querySelector('.premium-period');
      const yearlyNote = el.querySelector('.yearly-note');

      if (btn.dataset.billing === 'yearly') {
        priceEl.textContent = '6,999';
        periodEl.textContent = '/year';
        if (yearlyNote) yearlyNote.style.display = 'block';
      } else {
        priceEl.textContent = '299';
        periodEl.textContent = '/month';
        if (yearlyNote) yearlyNote.style.display = 'none';
      }
    });
  });

  // --- Plan Subscribe ---
  el.querySelectorAll('.plan-select-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const tier = btn.dataset.tier;
      if (tier === 'free') return;

      btn.innerHTML = '<div class="splash-loader" style="width:20px;height:20px;border-width:2px;margin:0 auto;"></div>';
      btn.disabled = true;

      showToast('Processing M-PESA payment...', 'info');
      setTimeout(() => {
        USER_PROFILE.tier = tier;
        USER_PROFILE.premium = true;
        showToast('Welcome to VunaShorts Premium! 🎉', 'success');
        setTimeout(() => {
          document.dispatchEvent(new CustomEvent('navigate', { detail: 'home' }));
        }, 1500);
      }, 2500);
    });
  });

  // --- Donation: Amount Selection ---
  function updateDonateBtn() {
    const btn = el.querySelector('#btn-send-donation');
    if (!btn) return;
    if (selectedAmount > 0 && selectedFilmId) {
      btn.disabled = false;
      btn.innerHTML = `<span style="display:flex;align-items:center;justify-content:center;gap:8px;">${Icons.HandHeart()} Donate KSh ${selectedAmount.toLocaleString()} to ${selectedFilmTitle}</span>`;
    } else if (selectedAmount > 0) {
      btn.disabled = true;
      btn.innerHTML = `<span style="display:flex;align-items:center;justify-content:center;gap:8px;">${Icons.HandHeart()} Now pick a film (KSh ${selectedAmount.toLocaleString()})</span>`;
    } else {
      btn.disabled = true;
      btn.innerHTML = `<span style="display:flex;align-items:center;justify-content:center;gap:8px;">${Icons.HandHeart()} Select a film & amount</span>`;
    }
  }

  el.querySelectorAll('.donate-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      el.querySelectorAll('.donate-chip').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedAmount = parseInt(btn.dataset.amount);
      const customInput = el.querySelector('#custom-donate-amount');
      if (customInput) customInput.value = '';
      updateDonateBtn();
    });
  });

  const customInput = el.querySelector('#custom-donate-amount');
  if (customInput) {
    customInput.addEventListener('input', () => {
      const val = parseInt(customInput.value);
      el.querySelectorAll('.donate-chip').forEach(b => b.classList.remove('selected'));
      selectedAmount = val > 0 ? val : 0;
      updateDonateBtn();
    });
  }

  // --- Donation: Film Selection ---
  el.querySelectorAll('.donate-film-card').forEach(card => {
    card.addEventListener('click', () => {
      el.querySelectorAll('.donate-film-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedFilmId = card.dataset.filmId;
      selectedFilmTitle = card.dataset.filmTitle;
      updateDonateBtn();
    });
  });

  // --- Send Donation ---
  const donateBtn = el.querySelector('#btn-send-donation');
  if (donateBtn) {
    donateBtn.addEventListener('click', () => {
      if (!selectedAmount || !selectedFilmId) return;
      donateBtn.innerHTML = '<div class="splash-loader" style="width:20px;height:20px;border-width:2px;margin:0 auto;"></div>';
      donateBtn.disabled = true;

      showToast(`Processing KSh ${selectedAmount.toLocaleString()} donation...`, 'info');
      setTimeout(() => {
        showToast(`Thank you! KSh ${selectedAmount.toLocaleString()} sent to "${selectedFilmTitle}" 🙏`, 'success');
        donateBtn.innerHTML = `<span style="display:flex;align-items:center;justify-content:center;gap:8px;">${Icons.CheckCircle()} Donation Sent!</span>`;
        donateBtn.style.background = 'var(--accent-emerald)';

        setTimeout(() => {
          selectedAmount = 0;
          selectedFilmId = null;
          selectedFilmTitle = '';
          el.querySelectorAll('.donate-chip').forEach(b => b.classList.remove('selected'));
          el.querySelectorAll('.donate-film-card').forEach(c => c.classList.remove('selected'));
          if (customInput) customInput.value = '';
          donateBtn.style.background = '';
          updateDonateBtn();
        }, 3000);
      }, 2000);
    });
  }
}
