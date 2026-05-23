// ============================================
// VUNASHORTS — Premium Subscription Screen
// ============================================
import { PREMIUM_PLANS } from '../data/mock-data.js';
import { Icons } from '../components/icons.js';

export function renderPremium() {
  const pro = PREMIUM_PLANS[2];
  return `
    <div class="screen" style="padding-bottom:calc(var(--nav-height) + 16px);background:var(--bg-primary);">
      <!-- Hero -->
      <div style="position:relative;padding:calc(var(--safe-top) + 40px) var(--space-4) var(--space-8);text-align:center;overflow:hidden;">
        <div style="position:absolute;inset:0;background:radial-gradient(circle at top, rgba(212,168,83,0.15) 0%, transparent 60%);pointer-events:none;"></div>
        <div style="display:inline-flex;align-items:center;justify-content:center;width:64px;height:64px;border-radius:50%;background:var(--gradient-premium);box-shadow:0 0 40px rgba(212,168,83,0.4);color:white;margin-bottom:var(--space-4);animation:breathe 3s ease-in-out infinite;">
          ${Icons.Crown()}
        </div>
        <h1 style="font-size:var(--text-3xl);margin-bottom:var(--space-2);background:var(--gradient-premium);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">VunaShorts Pro</h1>
        <p style="font-size:var(--text-base);color:var(--text-secondary);max-width:280px;margin:0 auto;">Unlock the ultimate African micro-cinema experience.</p>
      </div>

      <!-- Pricing Card -->
      <div style="padding:0 var(--space-4);margin-bottom:var(--space-8);position:relative;z-index:2;">
        <div class="card-premium anim-slide-up" style="padding:var(--space-6);text-align:center;box-shadow:0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1);">
          <div style="font-size:var(--text-xs);color:var(--accent-gold);text-transform:uppercase;letter-spacing:0.1em;font-weight:700;margin-bottom:var(--space-2);">Most Popular</div>
          <div style="display:flex;align-items:baseline;justify-content:center;gap:4px;margin-bottom:var(--space-6);">
            <span style="font-size:var(--text-xl);color:var(--text-secondary);font-weight:500;">KSh</span>
            <span style="font-family:var(--font-mono);font-size:var(--text-5xl);font-weight:800;color:var(--text-primary);">599</span>
            <span style="font-size:var(--text-sm);color:var(--text-tertiary);">/mo</span>
          </div>
          
          <div style="text-align:left;display:flex;flex-direction:column;gap:var(--space-3);margin-bottom:var(--space-6);">
            ${pro.features.map(f => `
              <div style="display:flex;align-items:flex-start;gap:var(--space-3);">
                <div style="color:var(--accent-gold);flex-shrink:0;">${Icons.CheckCircle()}</div>
                <div style="font-size:var(--text-sm);color:var(--text-primary);line-height:1.4;">${f}</div>
              </div>
            `).join('')}
          </div>

          <button id="btn-subscribe-premium" class="btn btn-gold btn-lg btn-full" style="font-size:var(--text-base);border-radius:var(--radius-xl);">
            Start 7-Day Free Trial
          </button>
          <div style="font-size:10px;color:var(--text-tertiary);margin-top:var(--space-3);">Cancel anytime. Auto-renews via M-PESA.</div>
        </div>
      </div>

      <!-- Comparison -->
      <div style="padding:0 var(--space-4) var(--space-8);">
        <h3 style="text-align:center;margin-bottom:var(--space-4);">Why Upgrade?</h3>
        <div class="card" style="overflow:hidden;">
          <div style="display:grid;grid-template-columns:2fr 1fr 1fr;padding:var(--space-3);background:var(--bg-tertiary);border-bottom:var(--border-subtle);font-size:10px;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-tertiary);font-weight:600;">
            <div>Feature</div>
            <div style="text-align:center;">Free</div>
            <div style="text-align:center;color:var(--accent-gold);">Pro</div>
          </div>
          ${[
            { name: 'Ad-Free Viewing', free: Icons.X(), pro: Icons.Check() },
            { name: 'Unlimited Unlocks', free: Icons.X(), pro: Icons.Check() },
            { name: 'Video Quality', free: 'SD', pro: '4K Ultra' },
            { name: 'Offline Downloads', free: Icons.X(), pro: 'Unlimited' },
            { name: 'Creator Support', free: 'Basic', pro: 'Priority' }
          ].map(row => `
            <div style="display:grid;grid-template-columns:2fr 1fr 1fr;padding:var(--space-3);border-bottom:var(--border-subtle);font-size:var(--text-sm);align-items:center;">
              <div style="color:var(--text-secondary);">${row.name}</div>
              <div style="text-align:center;color:var(--text-tertiary);display:flex;justify-content:center;">${row.free}</div>
              <div style="text-align:center;color:var(--text-primary);font-weight:600;display:flex;justify-content:center;">${row.pro}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

export function mountPremium(el) {
  const subscribeBtn = el.querySelector('#btn-subscribe-premium');
  if (subscribeBtn) {
    subscribeBtn.addEventListener('click', () => {
      import('../components/utils.js').then(({ showToast }) => {
        showToast('Processing M-PESA payment...', 'info');
        setTimeout(() => {
          showToast('Welcome to VunaShorts Pro!', 'success');
        }, 2000);
      });
    });
  }
}
