// ============================================
// VUNASHORTS — Episode Lock / Payment Screen
// Integrated with Pesapal API v3
// ============================================
import { SERIES, PAYMENT_METHODS } from '../data/mock-data.js';
import { showToast } from '../components/utils.js';
import { Icons } from '../components/icons.js';

const API_URL = import.meta.env.VITE_API_URL || (window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://vunashorts.onrender.com');

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
            <p style="font-size:var(--text-xs);color:var(--text-tertiary);">Secure payment via Pesapal • M-PESA, Card & More</p>
          </div>
          <div style="margin-bottom:var(--space-4);">
            <p style="font-size:var(--text-xs);color:var(--text-tertiary);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:var(--space-3);font-weight:600;">Cliffhanger Preview</p>
            <div style="padding:var(--space-4);background:var(--bg-secondary);border-radius:var(--radius-lg);border:var(--border-subtle);font-style:italic;color:var(--text-secondary);font-size:var(--text-sm);line-height:1.6;">
              "She turned around slowly, her eyes wide with terror. Standing in the shadows was the one person she never expected to see again..."
            </div>
          </div>
          <!-- Billing Info -->
          <div style="margin-bottom:var(--space-4);">
            <p style="font-size:var(--text-xs);color:var(--text-tertiary);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:var(--space-3);font-weight:600;">Your Details</p>
            <div style="display:flex;flex-direction:column;gap:var(--space-2);">
              <input type="email" id="pay-email" class="input" placeholder="Email address" value="" style="font-size:var(--text-sm);">
              <input type="tel" id="pay-phone" class="input" placeholder="Phone (+254 7XX...)" value="+254 " style="font-family:var(--font-mono);font-size:var(--text-sm);">
            </div>
          </div>
          <!-- Pay Button -->
          <button class="btn btn-gold btn-lg btn-full" id="btn-unlock" style="font-size:var(--text-base);padding:var(--space-4);border-radius:var(--radius-xl);display:flex;align-items:center;justify-content:center;gap:var(--space-2);">
            ${Icons.Unlock()} Pay with Pesapal — ${s.currency} ${s.pricePerEpisode}
          </button>
          <!-- Pesapal Checkout iFrame Container (hidden initially) -->
          <div id="pesapal-checkout-container" class="hidden" style="margin-top:var(--space-4);border-radius:var(--radius-xl);overflow:hidden;border:1px solid rgba(240,246,252,0.1);position:relative;">
            <div id="pesapal-loader" style="display:flex;align-items:center;justify-content:center;padding:var(--space-6);gap:var(--space-2);color:var(--text-secondary);font-size:var(--text-sm);">
              <div class="splash-loader" style="width:20px;height:20px;border-width:2px;"></div>
              Loading Pesapal checkout...
            </div>
            <iframe id="pesapal-iframe" style="width:100%;height:450px;border:none;display:none;background:white;border-radius:var(--radius-lg);"></iframe>
          </div>
          <!-- Payment Status -->
          <div id="payment-status" class="hidden" style="margin-top:var(--space-4);padding:var(--space-4);border-radius:var(--radius-lg);text-align:center;font-size:var(--text-sm);"></div>
          <div style="text-align:center;margin-top:var(--space-4);">
            <button class="btn btn-ghost" style="font-size:var(--text-xs);color:var(--accent-gold);" id="btn-subscribe-upsell">
              <span style="display:inline-flex;align-items:center;gap:4px;">${Icons.Sparkles()} Subscribe for unlimited access — Save 80%</span>
            </button>
          </div>
          <div style="display:flex;align-items:center;justify-content:center;gap:var(--space-2);margin-top:var(--space-3);opacity:0.5;">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <span style="font-size:10px;color:var(--text-muted);">Secured by Pesapal • SSL Encrypted</span>
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
  const s = SERIES[0];
  const unlockBtn = el.querySelector('#btn-unlock');
  const checkoutContainer = el.querySelector('#pesapal-checkout-container');
  const pesapalIframe = el.querySelector('#pesapal-iframe');
  const pesapalLoader = el.querySelector('#pesapal-loader');
  const paymentStatus = el.querySelector('#payment-status');
  let currentOrderId = null;
  let pollInterval = null;

  // Unlock button — Initiate real Pesapal payment
  if (unlockBtn) {
    unlockBtn.addEventListener('click', async () => {
      const email = el.querySelector('#pay-email').value.trim();
      const phone = el.querySelector('#pay-phone').value.trim();

      if (!email || !email.includes('@')) {
        showToast('Please enter a valid email address', 'error');
        return;
      }

      unlockBtn.innerHTML = '<div class="splash-loader" style="width:20px;height:20px;border-width:2px;margin:0 auto;"></div>';
      unlockBtn.disabled = true;

      try {
        const response = await fetch(`${API_URL}/api/payments/initiate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            seriesId: s.id,
            episode: 4,
            amount: s.pricePerEpisode,
            currency: s.currency === 'KSh' ? 'KES' : s.currency === '₦' ? 'NGN' : s.currency === 'R' ? 'ZAR' : s.currency === 'GH₵' ? 'GHS' : 'KES',
            email,
            phone,
            firstName: 'VunaShorts',
            lastName: 'User'
          })
        });

        const data = await response.json();

        if (data.success && data.redirectUrl) {
          currentOrderId = data.orderId;

          // Show the checkout container with the Pesapal iframe
          checkoutContainer.classList.remove('hidden');
          unlockBtn.classList.add('hidden');

          pesapalIframe.src = data.redirectUrl;
          pesapalIframe.onload = () => {
            pesapalLoader.style.display = 'none';
            pesapalIframe.style.display = 'block';
          };

          showToast('Complete your payment in the form below', 'info');

          // Poll for payment status every 5 seconds
          pollInterval = setInterval(async () => {
            try {
              const statusRes = await fetch(`${API_URL}/api/payments/status/${data.trackingId}`);
              const statusData = await statusRes.json();

              if (statusData.local && statusData.local.status === 'completed') {
                clearInterval(pollInterval);
                checkoutContainer.classList.add('hidden');
                paymentStatus.classList.remove('hidden');
                paymentStatus.style.background = 'rgba(63,185,80,0.15)';
                paymentStatus.style.border = '1px solid rgba(63,185,80,0.3)';
                paymentStatus.innerHTML = `
                  <div style="color:#3FB950;font-size:var(--text-lg);margin-bottom:var(--space-2);">${Icons.CheckCircle()}</div>
                  <div style="font-weight:700;color:#3FB950;">Payment Successful!</div>
                  <div style="color:var(--text-secondary);margin-top:4px;font-size:var(--text-xs);">Episode 4 has been unlocked</div>
                `;
                showToast('Episode 4 unlocked! Enjoy watching!', 'success');
                setTimeout(() => {
                  document.dispatchEvent(new CustomEvent('navigate', { detail: 'home' }));
                }, 2500);
              } else if (statusData.local && statusData.local.status === 'failed') {
                clearInterval(pollInterval);
                checkoutContainer.classList.add('hidden');
                paymentStatus.classList.remove('hidden');
                paymentStatus.style.background = 'rgba(248,81,73,0.15)';
                paymentStatus.style.border = '1px solid rgba(248,81,73,0.3)';
                paymentStatus.innerHTML = `
                  <div style="color:var(--accent-rose);font-weight:700;">Payment Failed</div>
                  <div style="color:var(--text-secondary);margin-top:4px;font-size:var(--text-xs);">Please try again</div>
                `;
                unlockBtn.classList.remove('hidden');
                unlockBtn.disabled = false;
                unlockBtn.innerHTML = `${Icons.Unlock()} Retry Payment — ${s.currency} ${s.pricePerEpisode}`;
              }
            } catch (e) {
              console.error('Status poll error:', e);
            }
          }, 5000);
        } else {
          throw new Error(data.error || 'Failed to create payment');
        }
      } catch (err) {
        console.error('Payment initiation error:', err);
        showToast('Payment failed: ' + err.message, 'error');
        unlockBtn.disabled = false;
        unlockBtn.innerHTML = `${Icons.Unlock()} Pay with Pesapal — ${s.currency} ${s.pricePerEpisode}`;
      }
    });
  }

  // Listen for real-time payment updates from Socket.io
  const onPaymentUpdate = (data) => {
    if (data.orderId === currentOrderId && data.status === 'completed') {
      if (pollInterval) clearInterval(pollInterval);
      checkoutContainer.classList.add('hidden');
      paymentStatus.classList.remove('hidden');
      paymentStatus.style.background = 'rgba(63,185,80,0.15)';
      paymentStatus.style.border = '1px solid rgba(63,185,80,0.3)';
      paymentStatus.innerHTML = `
        <div style="color:#3FB950;font-size:var(--text-lg);margin-bottom:var(--space-2);">${Icons.CheckCircle()}</div>
        <div style="font-weight:700;color:#3FB950;">Payment Confirmed!</div>
        <div style="color:var(--text-secondary);margin-top:4px;font-size:var(--text-xs);">Paid via ${data.method || 'Pesapal'}</div>
      `;
      showToast('Episode unlocked!', 'success');
      setTimeout(() => {
        document.dispatchEvent(new CustomEvent('navigate', { detail: 'home' }));
      }, 2500);
    }
  };

  // Use the global socket if available
  if (window.__vunaSocket) {
    window.__vunaSocket.on('payment_update', onPaymentUpdate);
  }

  // Subscribe upsell
  const subBtn = el.querySelector('#btn-subscribe-upsell');
  if (subBtn) {
    subBtn.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('navigate', { detail: 'premium' }));
    });
  }

  // Cleanup on unmount
  el.addEventListener('DOMNodeRemoved', (e) => {
    if (e.target === el) {
      if (pollInterval) clearInterval(pollInterval);
      if (window.__vunaSocket) window.__vunaSocket.off('payment_update', onPaymentUpdate);
    }
  });
}
