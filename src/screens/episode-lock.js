// ============================================
// VUNASHORTS — Content Lock / Upgrade Gateway
// Tier-based: redirects to premium subscription
// ============================================
import { SERIES, USER_PROFILE } from '../data/mock-data.js';
import { showToast } from '../components/utils.js';
import { Icons } from '../components/icons.js';
import { i18n } from '../services/i18n.js';

export function renderEpisodeLock() {
  const t = i18n.t.bind(i18n);
  const s = SERIES[0];
  const requiredTier = s.requiredTier || 'pro';
  const tierLabel = requiredTier === 'premium' ? 'Premium' : 'Pro';
  const tierColor = requiredTier === 'premium' ? 'var(--accent-gold)' : 'var(--accent-blue)';

  return `
    <div class="screen" style="background:var(--bg-primary);position:relative;overflow:hidden;padding-bottom:calc(var(--nav-height) + 16px);">
      <div style="position:relative;height:45vh;overflow:hidden;">
        <button class="btn btn-ghost btn-icon" style="position:absolute;top:var(--space-4);left:var(--space-4);z-index:10;color:white;background:rgba(0,0,0,0.3);backdrop-filter:blur(8px);" onclick="document.dispatchEvent(new CustomEvent('navigate',{detail:'home'}))">${Icons.X()}</button>
        <div style="position:absolute;inset:0;background:url('${s.poster}') center/cover;filter:blur(12px) brightness(0.4);transform:scale(1.1);"></div>
        <div style="position:absolute;inset:0;background:var(--gradient-cinematic);"></div>
        <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;z-index:2;">
          <div style="width:80px;height:80px;border-radius:50%;background:rgba(255,255,255,0.1);backdrop-filter:blur(20px);display:flex;align-items:center;justify-content:center;color:white;margin:0 auto var(--space-4);border:1px solid rgba(255,255,255,0.15);animation:breathe 2s ease-in-out infinite;">${Icons.Lock()}</div>
          <h3 style="font-size:var(--text-xl);margin-bottom:var(--space-1);">${t('contentLocked')}</h3>
          <p style="font-size:var(--text-sm);color:var(--text-secondary);">${t('upgradeRequired', { tier: tierLabel })}</p>
        </div>
      </div>
      <div style="padding:var(--space-6) var(--space-4);position:relative;z-index:2;margin-top:-40px;">
        <div class="card-glass" style="padding:var(--space-6);border-radius:var(--radius-2xl);animation:slideUp 600ms var(--ease-cinematic) forwards;">
          <div style="text-align:center;margin-bottom:var(--space-6);">
            <div style="display:inline-flex;align-items:center;gap:8px;padding:6px 16px;border-radius:var(--radius-full);background:${requiredTier === 'premium' ? 'var(--accent-gold-dim)' : 'var(--accent-blue-dim)'};color:${tierColor};font-weight:700;font-size:var(--text-sm);margin-bottom:var(--space-3);">
              ${Icons.Crown()} ${tierLabel} ${t('upgrade')}
            </div>
            <p style="font-size:var(--text-xs);color:var(--text-tertiary);">Unlock all ${tierLabel} content with a single subscription</p>
          </div>
          
          <!-- Quick tier benefits -->
          <div style="display:flex;flex-direction:column;gap:var(--space-3);margin-bottom:var(--space-6);">
            ${(requiredTier === 'premium' 
              ? ['Ultra-HD 4K streaming', 'Unlimited downloads', 'Early access to new series', 'Creator studio access', 'Priority support']
              : ['Unlimited episode unlocks', 'Ad-free experience', 'HD streaming', 'Offline downloads (5)', 'AI recommendations']
            ).map(f => `
              <div style="display:flex;align-items:center;gap:var(--space-3);">
                <div style="color:${tierColor};flex-shrink:0;">${Icons.CheckCircle()}</div>
                <div style="font-size:var(--text-sm);color:var(--text-primary);">${f}</div>
              </div>
            `).join('')}
          </div>

          <button class="btn ${requiredTier === 'premium' ? 'btn-gold' : 'btn-primary'} btn-lg btn-full" id="btn-upgrade-now" style="font-size:var(--text-base);padding:var(--space-4);border-radius:var(--radius-xl);display:flex;align-items:center;justify-content:center;gap:var(--space-2);">
            ${Icons.Crown()} ${t('upgradeNow')} — ${tierLabel}
          </button>

          <div style="text-align:center;margin-top:var(--space-4);">
            <button class="btn btn-ghost" style="font-size:var(--text-xs);color:var(--text-tertiary);" id="btn-view-all-plans">
              ${t('viewPlans')}
            </button>
          </div>

          <div style="display:flex;align-items:center;justify-content:center;gap:var(--space-2);margin-top:var(--space-3);opacity:0.5;">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <span style="font-size:10px;color:var(--text-muted);">Secured by Pesapal • SSL Encrypted</span>
          </div>
        </div>

        <!-- More Series in this tier -->
        <div style="margin-top:var(--space-6);padding:0 var(--space-2);">
          <h4 style="margin-bottom:var(--space-3);">${tierLabel} Exclusives</h4>
          <div style="display:flex;gap:var(--space-3);overflow-x:auto;padding-bottom:var(--space-4);">
            ${SERIES.filter(sr => sr.requiredTier === requiredTier).map(sr => `
              <div style="flex-shrink:0;width:100px;cursor:pointer;" class="press-effect">
                <div style="width:100px;height:140px;border-radius:var(--radius-md);background:${sr.poster ? "url('" + sr.poster + "') center/cover" : sr.gradientPoster};position:relative;overflow:hidden;">
                  <div style="position:absolute;inset:0;background:rgba(14,17,22,0.4);display:flex;align-items:center;justify-content:center;color:${tierColor};">${Icons.Crown()}</div>
                  <div style="position:absolute;bottom:0;left:0;right:0;padding:4px 6px;background:linear-gradient(transparent,rgba(0,0,0,0.8));font-size:10px;font-weight:600;">${sr.title}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

export function mountEpisodeLock(el) {
  // Upgrade button — go to premium pricing
  const upgradeBtn = el.querySelector('#btn-upgrade-now');
  if (upgradeBtn) {
    upgradeBtn.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('navigate', { detail: 'premium' }));
    });
  }

  // View all plans
  const viewPlansBtn = el.querySelector('#btn-view-all-plans');
  if (viewPlansBtn) {
    viewPlansBtn.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('navigate', { detail: 'premium' }));
    });
  }
}
