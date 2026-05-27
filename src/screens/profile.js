// ============================================
// VUNASHORTS — User Profile Screen
// ============================================
import { USER_PROFILE, SERIES } from '../data/mock-data.js';
import { Icons } from '../components/icons.js';
import { i18n } from '../services/i18n.js';
import { authService } from '../services/auth.js';
import { navigate } from '../router.js';
import { showToast } from '../components/utils.js';
import { appStore } from '../services/store.js';

export function renderProfile() {
  const user = authService.getCurrentUser() || USER_PROFILE;
  const isPremium = user.tier !== 'free' || USER_PROFILE.premium;
  const displayName = user.name || USER_PROFILE.name;
  const displayEmail = user.email || user.handle || USER_PROFILE.handle;
  const displayAvatar = user.avatar || USER_PROFILE.avatar || displayName.charAt(0).toUpperCase();

  const allSeries = appStore.state.series && appStore.state.series.length > 0 ? appStore.state.series : SERIES;
  let userUploads = allSeries.filter(s => s.creator && (s.creator.id === user.id || s.creator.handle === user.handle || s.creator.id === 'u1'));
  
  if (userUploads.length === 0) {
    // Fallback just to show something if no uploads exist
    userUploads = allSeries.slice(0, 3);
  }

  const t = i18n.t.bind(i18n);

  return `
    <div class="screen" style="padding-bottom:calc(var(--nav-height) + 16px);">
      <div style="max-width: 600px; margin: 0 auto;">
        <!-- Header / User Info -->
        <div style="padding:calc(var(--safe-top) + 32px) var(--space-4) var(--space-6);display:flex;flex-direction:column;align-items:center;text-align:center;gap:var(--space-3);">
          <div class="avatar avatar-xl" style="position:relative;margin:0 auto;box-shadow:0 10px 20px rgba(0,0,0,0.3);">
            <span id="display-avatar">${displayAvatar}</span>
            ${isPremium ? `<div style="position:absolute;bottom:-4px;right:-4px;background:var(--bg-primary);border-radius:50%;padding:4px;"><div style="color:var(--accent-gold);width:20px;height:20px;display:flex;align-items:center;justify-content:center;">${Icons.Crown()}</div></div>` : ''}
          </div>
          <div style="width:100%;">
            <h2 style="font-size:var(--text-2xl);margin-bottom:4px;line-height:1.2;display:flex;align-items:center;justify-content:center;gap:8px;">
              <span id="profile-name">${displayName}</span>
            </h2>
            <p style="color:var(--text-secondary);font-size:var(--text-sm);font-family:var(--font-mono);margin-bottom:var(--space-4);"><span id="profile-email">${displayEmail}</span></p>
            <div style="display:flex;justify-content:center;gap:var(--space-2);">
              <button class="btn btn-secondary btn-sm" id="profile-edit-btn" style="min-width:140px;">${t('editProfile')}</button>
            </div>
          </div>
        </div>

        <!-- App Settings placed directly under the button -->
        <div style="padding:0 var(--space-4);margin-bottom:var(--space-6);">
          <div class="card" style="padding:0;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);">
            <div id="btn-lang" class="press-effect" style="padding:var(--space-3) var(--space-4);display:flex;justify-content:space-between;align-items:center;border-bottom:var(--border-subtle);cursor:pointer;">
              <div style="display:flex;align-items:center;gap:var(--space-3);">
                <span style="color:var(--text-secondary);">${Icons.Globe()}</span>
                <span style="font-size:var(--text-sm);font-weight:500;">Language & Region</span>
              </div>
              <span style="color:var(--text-tertiary);font-size:var(--text-sm);display:flex;align-items:center;gap:4px;">English (KE) <span style="width:16px;height:16px;">${Icons.ChevronRight()}</span></span>
            </div>
            <div id="btn-payment" class="press-effect" style="padding:var(--space-3) var(--space-4);display:flex;justify-content:space-between;align-items:center;border-bottom:var(--border-subtle);cursor:pointer;">
              <div style="display:flex;align-items:center;gap:var(--space-3);">
                <span style="color:var(--text-secondary);">${Icons.CreditCard()}</span>
                <span style="font-size:var(--text-sm);font-weight:500;">Payment Methods</span>
              </div>
              <span style="color:var(--text-tertiary);font-size:var(--text-sm);display:flex;align-items:center;gap:4px;">M-PESA <span style="width:16px;height:16px;">${Icons.ChevronRight()}</span></span>
            </div>
            <div id="btn-data-saver" class="press-effect" style="padding:var(--space-3) var(--space-4);display:flex;justify-content:space-between;align-items:center;border-bottom:var(--border-subtle);cursor:pointer;">
              <div style="display:flex;align-items:center;gap:var(--space-3);">
                <span style="color:var(--text-secondary);">${Icons.Signal()}</span>
                <span style="font-size:var(--text-sm);font-weight:500;">Data Saver Mode</span>
              </div>
              <div id="data-saver-toggle" style="width:40px;height:24px;background:var(--accent-emerald);border-radius:12px;position:relative;transition:all var(--duration-fast);">
                <div class="toggle-knob" style="width:20px;height:20px;background:white;border-radius:50%;position:absolute;top:2px;right:2px;box-shadow:var(--shadow-sm);transition:all var(--duration-fast);"></div>
              </div>
            </div>
            <div id="btn-logout" class="press-effect" style="padding:var(--space-3) var(--space-4);display:flex;justify-content:space-between;align-items:center;cursor:pointer;">
              <div style="display:flex;align-items:center;gap:var(--space-3);">
                <span style="color:var(--error-color);">${Icons.LogOut()}</span>
                <span style="font-size:var(--text-sm);font-weight:600;color:var(--error-color);">Log Out</span>
              </div>
            </div>
          </div>
          <button id="btn-install-app" class="btn btn-primary hidden" style="width:100%;margin-top:var(--space-4);display:flex;align-items:center;justify-content:center;gap:var(--space-2);background:var(--accent-blue);">
            ${Icons.Download()} Install App
          </button>
        </div>

        <!-- Stats -->
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:var(--space-2);padding:0 var(--space-4) var(--space-6);">
          <div class="card" style="text-align:center;padding:var(--space-4) var(--space-2);">
            <div style="font-family:var(--font-mono);font-size:var(--text-xl);font-weight:800;color:var(--text-primary);margin-bottom:2px;">124</div>
            <div style="font-size:10px;color:var(--text-tertiary);font-weight:600;text-transform:uppercase;letter-spacing:0.05em;" id="stat-eps">${t('epsWatched')}</div>
          </div>
          <div class="card" style="text-align:center;padding:var(--space-4) var(--space-2);">
            <div style="font-family:var(--font-mono);font-size:var(--text-xl);font-weight:800;color:var(--text-primary);margin-bottom:2px;">42.5</div>
            <div style="font-size:10px;color:var(--text-tertiary);font-weight:600;text-transform:uppercase;letter-spacing:0.05em;" id="stat-hours">${t('hoursWatched')}</div>
          </div>
          <div class="card" style="text-align:center;padding:var(--space-4) var(--space-2);">
            <div style="font-family:var(--font-mono);font-size:var(--text-xl);font-weight:800;color:var(--accent-emerald);margin-bottom:2px;">8</div>
            <div style="font-size:10px;color:var(--text-tertiary);font-weight:600;text-transform:uppercase;letter-spacing:0.05em;" id="stat-completed">${t('seriesCompleted')}</div>
          </div>
        </div>

        <!-- Tabs -->
        <div style="display:flex;gap:var(--space-2);padding:0 var(--space-4) var(--space-4);">
          <button class="btn btn-secondary active" style="flex:1;border-radius:var(--radius-full);" id="tab-uploads">Uploads</button>
          <button class="btn btn-ghost" style="flex:1;border-radius:var(--radius-full);" id="tab-saved">${t('saved')}</button>
          <button class="btn btn-ghost" style="flex:1;border-radius:var(--radius-full);" id="tab-downloads">${t('downloads')}</button>
        </div>

        <!-- Content Grid (User Uploads) -->
        <div style="padding:0 var(--space-4);display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-2);">
          ${userUploads.map(s => `
            <div class="press-effect" style="cursor:pointer;" onclick="document.dispatchEvent(new CustomEvent('navigate',{detail:'home'}))">
              <div style="width:100%;padding-top:140%;border-radius:var(--radius-md);background:${s.poster ? "url('" + s.poster + "') center/cover" : s.gradientPoster || 'var(--gradient-cinematic)'};position:relative;overflow:hidden;margin-bottom:4px;">
                <div style="position:absolute;bottom:0;left:0;right:0;height:3px;background:rgba(255,255,255,0.2);">
                  <div style="height:100%;background:var(--accent-blue);width:${Math.random() * 100}%;"></div>
                </div>
              </div>
              <div style="font-size:10px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${s.title}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- Edit Profile Modal -->
    <div id="edit-profile-modal" class="modal-overlay" style="display:none;align-items:flex-end;justify-content:center;padding:0;">
      <div class="card" style="width:100%;max-width:600px;border-radius:var(--radius-2xl) var(--radius-2xl) 0 0;padding:var(--space-6);animation:slideUp 300ms var(--ease-out);">
        <h3 style="margin-bottom:var(--space-4);font-size:var(--text-xl);">Edit Profile</h3>
        <div style="margin-bottom:var(--space-4);">
          <label style="display:block;font-size:var(--text-xs);color:var(--text-secondary);margin-bottom:var(--space-2);">Display Name</label>
          <input type="text" id="edit-name-input" class="input" value="${displayName}" style="width:100%;">
        </div>
        <div style="margin-bottom:var(--space-6);">
          <label style="display:block;font-size:var(--text-xs);color:var(--text-secondary);margin-bottom:var(--space-2);">Handle / Email</label>
          <input type="text" id="edit-handle-input" class="input" value="${displayEmail}" style="width:100%;">
        </div>
        <div style="display:flex;gap:var(--space-3);">
          <button class="btn btn-secondary" id="btn-cancel-edit" style="flex:1;">Cancel</button>
          <button class="btn btn-primary" id="btn-save-edit" style="flex:1;">Save Changes</button>
        </div>
      </div>
    </div>
  `;
}

export function mountProfile(el) {
  const langSub = i18n.onLangChange(() => {
    const editBtn = el.querySelector('#profile-edit-btn');
    const tabU = el.querySelector('#tab-uploads');
    const tabS = el.querySelector('#tab-saved');
    const tabD = el.querySelector('#tab-downloads');
    const statE = el.querySelector('#stat-eps');
    const statH = el.querySelector('#stat-hours');
    const statC = el.querySelector('#stat-completed');
    
    if (editBtn) editBtn.textContent = i18n.t('editProfile');
    if (tabU) tabU.textContent = 'Uploads'; // Usually not translated or we can add it to i18n later
    if (tabS) tabS.textContent = i18n.t('saved');
    if (tabD) tabD.textContent = i18n.t('downloads');
    if (statE) statE.textContent = i18n.t('epsWatched');
    if (statH) statH.textContent = i18n.t('hoursWatched');
    if (statC) statC.textContent = i18n.t('seriesCompleted');
  });

  el.addEventListener('DOMNodeRemoved', (e) => {
    if (e.target === el) langSub();
  });

  const installBtn = document.getElementById('btn-install-app');
  
  // Edit Profile Modal Logic
  const editBtn = el.querySelector('#profile-edit-btn');
  const modal = el.querySelector('#edit-profile-modal');
  const cancelBtn = el.querySelector('#btn-cancel-edit');
  const saveBtn = el.querySelector('#btn-save-edit');
  const nameInput = el.querySelector('#edit-name-input');
  const handleInput = el.querySelector('#edit-handle-input');

  if (editBtn) {
    editBtn.addEventListener('click', () => {
      modal.style.display = 'flex';
    });
  }

  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const newName = nameInput.value.trim();
      const newHandle = handleInput.value.trim();
      
      if (newName) {
        // Update DOM immediately
        const nameEl = el.querySelector('#profile-name');
        const emailEl = el.querySelector('#profile-email');
        const avatarEl = el.querySelector('#display-avatar');
        
        if (nameEl) nameEl.textContent = newName;
        if (emailEl) emailEl.textContent = newHandle;
        if (avatarEl) avatarEl.textContent = newName.charAt(0).toUpperCase();

        // Save to mockup profile state
        const user = authService.getCurrentUser();
        if (user) {
          user.name = newName;
          user.handle = newHandle;
        }
        USER_PROFILE.name = newName;
        USER_PROFILE.handle = newHandle;

        showToast('Profile updated successfully!', 'success');
        modal.style.display = 'none';
      } else {
        showToast('Name cannot be empty.', 'error');
      }
    });
  }
  
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

  // Tabs
  const tabs = [
    { id: 'tab-uploads', name: 'Uploads' },
    { id: 'tab-saved', name: 'Saved' },
    { id: 'tab-downloads', name: 'Downloads' }
  ];

  tabs.forEach(t => {
    const btn = document.getElementById(t.id);
    if (btn) {
      btn.addEventListener('click', () => {
        tabs.forEach(other => {
          const ob = document.getElementById(other.id);
          if (ob) {
            ob.classList.remove('btn-secondary', 'active');
            ob.classList.add('btn-ghost');
          }
        });
        btn.classList.remove('btn-ghost');
        btn.classList.add('btn-secondary', 'active');
        showToast(`Showing ${t.name} view`, 'info');
      });
    }
  });
}
