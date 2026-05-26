import { USER_PROFILE, SERIES } from '../data/mock-data.js';
import { Icons } from '../components/icons.js';
import { authService } from '../services/auth.js';
import { navigate } from '../router.js';
import { showToast } from '../components/utils.js';

export function renderProfile() {
  const user = authService.getCurrentUser() || USER_PROFILE;
  const isPremium = USER_PROFILE.premium;
  const displayName = user.name || USER_PROFILE.name;
  const displayEmail = user.email || USER_PROFILE.handle;

  return `
    <div class="screen" style="padding-bottom:calc(var(--nav-height) + 16px);">
      <!-- Header -->
      <div style="padding:calc(var(--safe-top) + 24px) var(--space-4) var(--space-6);text-align:center;position:relative;">
        <div style="position:absolute;top:calc(var(--safe-top) + 12px);right:16px;">
          <button class="btn btn-ghost btn-icon">${Icons.Settings()}</button>
        </div>
        <div class="avatar avatar-xl ${isPremium ? 'avatar-gold' : ''}" style="margin:0 auto var(--space-3);">
          ${USER_PROFILE.avatar}
        </div>
        <h2 style="font-size:var(--text-xl);margin-bottom:2px;">${displayName}</h2>
        <p style="font-size:var(--text-sm);color:var(--text-secondary);margin-bottom:var(--space-3);">${displayEmail} • ${USER_PROFILE.country}</p>
        
        ${isPremium ? `
          <div style="display:inline-flex;align-items:center;gap:var(--space-2);padding:var(--space-1) var(--space-3);background:var(--accent-gold-dim);border:1px solid var(--accent-gold);border-radius:var(--radius-full);color:var(--accent-gold);font-size:var(--text-xs);font-weight:600;font-family:var(--font-display);">
            ${Icons.Crown()} VunaShorts Pro Member
          </div>
        ` : `
          <button class="btn btn-gold btn-sm" onclick="document.dispatchEvent(new CustomEvent('navigate',{detail:'premium'}))">Upgrade to Premium</button>
        `}
      </div>

      <!-- Stats -->
      <div style="padding:0 var(--space-4);display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-2);margin-bottom:var(--space-6);">
        <div class="card" style="padding:var(--space-3);text-align:center;">
          <div style="font-family:var(--font-mono);font-size:var(--text-lg);font-weight:700;">124</div>
          <div style="font-size:10px;color:var(--text-tertiary);text-transform:uppercase;">Eps Watched</div>
        </div>
        <div class="card" style="padding:var(--space-3);text-align:center;">
          <div style="font-family:var(--font-mono);font-size:var(--text-lg);font-weight:700;">12</div>
          <div style="font-size:10px;color:var(--text-tertiary);text-transform:uppercase;">Following</div>
        </div>
        <div class="card" style="padding:var(--space-3);text-align:center;">
          <div style="font-family:var(--font-mono);font-size:var(--text-lg);font-weight:700;">3</div>
          <div style="font-size:10px;color:var(--text-tertiary);text-transform:uppercase;">Supported</div>
        </div>
      </div>

      <!-- Tabs -->
      <div style="padding:0 var(--space-4);margin-bottom:var(--space-4);">
        <div class="tab-bar">
          <button class="tab active">History</button>
          <button class="tab">Saved</button>
          <button class="tab">Downloads</button>
        </div>
      </div>

      <!-- Content Grid -->
      <div style="padding:0 var(--space-4);display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-2);">
        ${SERIES.slice(0, 6).map(s => `
          <div class="press-effect" style="cursor:pointer;" onclick="document.dispatchEvent(new CustomEvent('navigate',{detail:'home'}))">
            <div style="width:100%;padding-top:140%;border-radius:var(--radius-md);background:${s.poster ? "url('" + s.poster + "') center/cover" : s.gradientPoster};position:relative;overflow:hidden;margin-bottom:4px;">
              <div style="position:absolute;bottom:0;left:0;right:0;height:3px;background:rgba(255,255,255,0.2);">
                <div style="height:100%;background:var(--accent-blue);width:${Math.random() * 100}%;"></div>
              </div>
            </div>
            <div style="font-size:10px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${s.title}</div>
          </div>
        `).join('')}
      </div>

      <!-- Settings Menu -->
      <div class="section-header" style="margin-top:var(--space-6);display:flex;align-items:center;gap:var(--space-2);">
        ${Icons.Settings()} <h3 style="margin:0;">Settings</h3>
      </div>
      <div style="padding:0 var(--space-4);">
        <div class="card" style="padding:0;margin-bottom:var(--space-6);">
          <div id="btn-lang" class="press-effect" style="padding:var(--space-4);display:flex;justify-content:space-between;align-items:center;border-bottom:var(--border-subtle);cursor:pointer;">
            <div style="display:flex;align-items:center;gap:var(--space-3);">
              <span style="color:var(--text-secondary);">${Icons.Globe()}</span>
              <span style="font-size:var(--text-sm);font-weight:500;">Language & Region</span>
            </div>
            <span style="color:var(--text-tertiary);font-size:var(--text-sm);display:flex;align-items:center;gap:4px;">English (KE) <span style="width:16px;height:16px;">${Icons.ChevronRight()}</span></span>
          </div>
          <div id="btn-payment" class="press-effect" style="padding:var(--space-4);display:flex;justify-content:space-between;align-items:center;border-bottom:var(--border-subtle);cursor:pointer;">
            <div style="display:flex;align-items:center;gap:var(--space-3);">
              <span style="color:var(--text-secondary);">${Icons.CreditCard()}</span>
              <span style="font-size:var(--text-sm);font-weight:500;">Payment Methods</span>
            </div>
            <span style="color:var(--text-tertiary);font-size:var(--text-sm);display:flex;align-items:center;gap:4px;">M-PESA <span style="width:16px;height:16px;">${Icons.ChevronRight()}</span></span>
          </div>
          <div id="btn-data-saver" class="press-effect" style="padding:var(--space-4);display:flex;justify-content:space-between;align-items:center;cursor:pointer;">
            <div style="display:flex;align-items:center;gap:var(--space-3);">
              <span style="color:var(--text-secondary);">${Icons.Signal()}</span>
              <span style="font-size:var(--text-sm);font-weight:500;">Data Saver Mode</span>
            </div>
            <div id="data-saver-toggle" style="width:40px;height:24px;background:var(--accent-emerald);border-radius:12px;position:relative;transition:all var(--duration-fast);">
              <div class="toggle-knob" style="width:20px;height:20px;background:white;border-radius:50%;position:absolute;top:2px;right:2px;box-shadow:var(--shadow-sm);transition:all var(--duration-fast);"></div>
            </div>
          </div>
        </div>

        <button id="btn-install-app" class="btn btn-primary hidden" style="width:100%;display:flex;align-items:center;justify-content:center;gap:var(--space-2);margin-bottom:var(--space-4);background:var(--accent-blue);">
          ${Icons.Download()} Install App
        </button>

        <button id="btn-logout" class="btn btn-secondary" style="width:100%;display:flex;align-items:center;justify-content:center;gap:var(--space-2);color:var(--error-color);border-color:var(--error-color);">
          ${Icons.LogOut()} Log Out
        </button>
      </div>
    </div>
  `;
}

export function mountProfile() {
  const installBtn = document.getElementById('btn-install-app');
  
  // Show button if installable
  if (window.deferredInstallPrompt) {
    installBtn?.classList.remove('hidden');
  }

  // Listen for the global event just in case it fires while on this screen
  const onInstallable = () => installBtn?.classList.remove('hidden');
  document.addEventListener('appInstallable', onInstallable);

  if (installBtn) {
    installBtn.addEventListener('click', async () => {
      if (window.deferredInstallPrompt) {
        window.deferredInstallPrompt.prompt();
        const { outcome } = await window.deferredInstallPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);
        window.deferredInstallPrompt = null;
        installBtn.classList.add('hidden');
      }
    });
  }

  // Cleanup
  document.getElementById('btn-install-app')?.parentElement.addEventListener('DOMNodeRemoved', (e) => {
    if (e.target.parentElement === null) {
      document.removeEventListener('appInstallable', onInstallable);
    }
  });

  const logoutBtn = document.getElementById('btn-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      authService.signOut();
      navigate('auth', { force: true });
    });
  }

  const langBtn = document.getElementById('btn-lang');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      showToast('Language settings opened', 'info');
    });
  }

  const paymentBtn = document.getElementById('btn-payment');
  if (paymentBtn) {
    paymentBtn.addEventListener('click', () => {
      showToast('Payment methods opened', 'info');
    });
  }

  let dataSaverOn = true;
  const dataSaverBtn = document.getElementById('btn-data-saver');
  if (dataSaverBtn) {
    dataSaverBtn.addEventListener('click', () => {
      dataSaverOn = !dataSaverOn;
      const toggle = document.getElementById('data-saver-toggle');
      const knob = toggle.querySelector('.toggle-knob');
      if (dataSaverOn) {
        toggle.style.background = 'var(--accent-emerald)';
        knob.style.right = '2px';
        knob.style.left = 'auto';
      } else {
        toggle.style.background = 'var(--bg-tertiary)';
        knob.style.right = 'auto';
        knob.style.left = '2px';
      }
      showToast(`Data Saver is now ${dataSaverOn ? 'ON' : 'OFF'}`, 'success');
    });
  }
}
