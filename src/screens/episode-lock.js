// ============================================
// VUNASHORTS — Episode Lock / Payment Screen
// ============================================
import { SERIES, PAYMENT_METHODS } from '../data/mock-data.js';
import { showToast } from '../components/utils.js';
import { Icons } from '../components/icons.js';

export function renderEpisodeLock() {
  const s = SERIES[0];
  return `
    <div class="screen" style="background:var(--bg-primary);position:relative;overflow:hidden;padding-bottom:calc(var(--nav-height) + 16px);">
      <div style="position:relative;height:45vh;overflow:hidden;">
        <button class="btn btn-ghost btn-icon" style="position:absolute;top:var(--space-4);left:var(--space-4);z-index:10;color:white;background:rgba(0,0,0,0.3);backdrop-filter:blur(8px);" onclick="document.dispatchEvent(new CustomEvent('navigate',{detail:'home'}))">
          ${Icons.X()}
        </button>
        <div style="position:absolute;inset:0;background:url('${s.poster}') center/cover;filter:blur(12px) brightness(0.4);transform:scale(1.1);"></div>
        <div style="position:absolute;inset:0;background:var(--gradient-cinematic);"></div>
        <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;z-index:2;">
          <div style="width:80px;height:80px;border-radius:50%;background:rgba(255,255,255,0.1);backdrop-filter:blur(20px);display:flex;align-items:center;justify-content:center;color:white;margin:0 auto var(--space-4);border:1px solid rgba(255,255,255,0.15);animation:breathe 2s ease-in-out infinite;">${Icons.Lock()}</div>
          <h3 style="font-size:var(--text-xl);margin-bottom:var(--space-1);">Episode 4 Locked</h3>
          <p style="font-size:var(--text-sm);color:var(--text-secondary);">Continue watching "${s.title}"</p>
        </div>
      </div>
      <div style="padding:var(--space-6) var(--space-4);position:relative;z-index:2;margin-top:-40px;">
        <div class="card-glass" style="padding:var(--space-6);border-radius:var(--radius-2xl);animation:slideUp 600ms var(--ease-cinematic) forwards;">
          <div style="text-align:center;margin-bottom:var(--space-6);">
            <div style="font-family:var(--font-display);font-size:var(--text-3xl);font-weight:800;margin-bottom:var(--space-1);">
              <span style="color:var(--text-secondary);font-size:var(--text-lg);font-weight:400;">Unlock for </span>
              <span style="background:var(--gradient-premium);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">${s.currency} ${s.pricePerEpisode}</span>
            </div>
            <p style="font-size:var(--text-xs);color:var(--text-tertiary);">One-time payment • Instant access</p>
          </div>
          <div style="margin-bottom:var(--space-4);">
            <p style="font-size:var(--text-xs);color:var(--text-tertiary);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:var(--space-3);font-weight:600;">Cliffhanger Preview</p>
            <div style="padding:var(--space-4);background:var(--bg-secondary);border-radius:var(--radius-lg);border:var(--border-subtle);font-style:italic;color:var(--text-secondary);font-size:var(--text-sm);line-height:1.6;">
              "She turned around slowly, her eyes wide with terror. Standing in the shadows was the one person she never expected to see again..."
            </div>
          </div>
          <div style="margin-bottom:var(--space-6);">
            <p style="font-size:var(--text-xs);color:var(--text-tertiary);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:var(--space-3);font-weight:600;">Payment Method</p>
            <div style="display:flex;flex-direction:column;gap:var(--space-2);">
              ${PAYMENT_METHODS.map((pm, i) => `
                <label class="payment-option ${i === 0 ? 'selected' : ''}" style="display:flex;align-items:center;gap:var(--space-3);padding:var(--space-3) var(--space-4);background:${i === 0 ? 'var(--bg-tertiary)' : 'var(--bg-secondary)'};border-radius:var(--radius-md);cursor:pointer;border:1px solid ${i === 0 ? 'var(--accent-blue)' : 'rgba(240,246,252,0.06)'};transition:all var(--duration-normal) var(--ease-out);">
                  <input type="radio" name="payment" value="${pm.id}" ${i === 0 ? 'checked' : ''} style="display:none;">
                  <span style="font-size:1.3rem;">${pm.icon}</span>
                  <span style="font-weight:500;font-size:var(--text-sm);flex:1;">${pm.name}</span>
                  <div style="width:18px;height:18px;border-radius:50%;border:2px solid ${i === 0 ? 'var(--accent-blue)' : 'var(--text-muted)'};display:flex;align-items:center;justify-content:center;">
                    ${i === 0 ? '<div style="width:10px;height:10px;border-radius:50%;background:var(--accent-blue);"></div>' : ''}
                  </div>
                </label>
              `).join('')}
            </div>
          </div>
          <div id="mpesa-phone" style="margin-bottom:var(--space-4);">
            <p style="font-size:var(--text-xs);color:var(--text-tertiary);margin-bottom:var(--space-2);font-weight:500;">M-PESA Phone Number</p>
            <input type="tel" class="input" placeholder="+254 7XX XXX XXX" value="+254 " style="font-family:var(--font-mono);font-size:var(--text-lg);letter-spacing:0.05em;">
          </div>
          <button class="btn btn-gold btn-lg btn-full" id="btn-unlock" style="font-size:var(--text-base);padding:var(--space-4);border-radius:var(--radius-xl);display:flex;align-items:center;justify-content:center;gap:var(--space-2);">
            ${Icons.Unlock()} Unlock Episode — ${s.currency} ${s.pricePerEpisode}
          </button>
          <div style="text-align:center;margin-top:var(--space-4);">
            <button class="btn btn-ghost" style="font-size:var(--text-xs);color:var(--accent-gold);" id="btn-subscribe-upsell">
              <span style="display:inline-flex;align-items:center;gap:4px;">${Icons.Sparkles()} Subscribe for unlimited access — Save 80%</span>
            </button>
          </div>
        </div>
        <div style="margin-top:var(--space-6);padding:0 var(--space-2);">
          <h4 style="margin-bottom:var(--space-3);">More in "${s.title}"</h4>
          <div style="display:flex;gap:var(--space-3);overflow-x:auto;padding-bottom:var(--space-4);">
            ${Array.from({length: 6}, (_, i) => `
              <div style="flex-shrink:0;width:100px;cursor:pointer;" class="press-effect">
                <div style="width:100px;height:140px;border-radius:var(--radius-md);background:${s.poster ? "url('" + s.poster + "') center/cover" : s.gradientPoster};position:relative;overflow:hidden;">
                  ${i >= 3 ? `<div style="position:absolute;inset:0;background:rgba(14,17,22,0.6);display:flex;align-items:center;justify-content:center;color:white;">${Icons.Lock()}</div>` : ''}
                  <div style="position:absolute;bottom:0;left:0;right:0;padding:4px 6px;background:linear-gradient(transparent,rgba(0,0,0,0.8));font-size:10px;font-weight:600;">Ep ${i + 1}</div>
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
  // Payment method selection
  el.querySelectorAll('.payment-option').forEach(opt => {
    opt.addEventListener('click', () => {
      el.querySelectorAll('.payment-option').forEach(o => {
        o.classList.remove('selected');
        o.style.background = 'var(--bg-secondary)';
        o.style.borderColor = 'rgba(240,246,252,0.06)';
        o.querySelector('div:last-child').innerHTML = '';
      });
      opt.classList.add('selected');
      opt.style.background = 'var(--bg-tertiary)';
      opt.style.borderColor = 'var(--accent-blue)';
      opt.querySelector('div:last-child').innerHTML = '<div style="width:10px;height:10px;border-radius:50%;background:var(--accent-blue);"></div>';
      opt.querySelector('input').checked = true;
    });
  });

  // Unlock button
  const unlockBtn = el.querySelector('#btn-unlock');
  if (unlockBtn) {
    unlockBtn.addEventListener('click', () => {
      unlockBtn.innerHTML = '<div class="splash-loader" style="width:20px;height:20px;border-width:2px;margin:0 auto;"></div>';
      unlockBtn.disabled = true;
      setTimeout(() => {
        unlockBtn.innerHTML = `<span style="display:flex;align-items:center;gap:8px;">${Icons.CheckCircle()} Episode Unlocked!</span>`;
        unlockBtn.style.background = 'var(--gradient-emerald)';
        showToast('Episode 4 unlocked! Enjoy!', 'success');
        setTimeout(() => {
          document.dispatchEvent(new CustomEvent('navigate', { detail: 'home' }));
        }, 1500);
      }, 2000);
    });
  }

  // Subscribe upsell
  const subBtn = el.querySelector('#btn-subscribe-upsell');
  if (subBtn) {
    subBtn.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('navigate', { detail: 'premium' }));
    });
  }
}
