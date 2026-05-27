// ============================================
// VUNASHORTS — Splash Screen
// ============================================
import { LANGUAGES } from '../data/mock-data.js';
import { Icons } from '../components/icons.js';
import logoUrl from '../assets/app-logo.png';
import { i18n } from '../services/i18n.js';

export function renderSplash() {
  const savedLangCode = localStorage.getItem('vunashorts_language') || 'en';
  const defaultLang = LANGUAGES.find(l => l.code === savedLangCode) || LANGUAGES[0] || { code: 'en', name: 'English', native: 'English' };

  return `
    <div id="splash-inner" style="position:fixed;inset:0;z-index:var(--z-splash);background:var(--bg-primary);display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;">
      <div class="splash-grain"></div>
      <div class="splash-glow"></div>
      <div class="splash-logo anim-scale-in" style="text-align:center;position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;gap:var(--space-4);">
        <img src="${logoUrl}" alt="VunaShorts Logo" style="width:140px;height:140px;object-fit:contain;filter:drop-shadow(0 10px 20px rgba(212,168,83,0.3));" />
        <div style="font-family:var(--font-display);font-size:3.5rem;font-weight:900;letter-spacing:-0.03em;line-height:1;">
          <span style="color:var(--text-primary);">Vuna</span><span style="background:var(--gradient-premium);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">Shorts</span>
        </div>
        <div id="splash-tagline" style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--text-secondary);margin-top:var(--space-3);letter-spacing:var(--tracking-wider);text-transform:uppercase;text-align:center;">
          ${i18n.t('tagline')}
        </div>
      </div>

      <!-- Compact Language Picker + Continue -->
      <div id="splash-actions" class="hidden" style="position:absolute;bottom:0;left:0;right:0;padding:var(--space-6) var(--space-5) calc(var(--space-8) + env(safe-area-inset-bottom, 0px));z-index:3;display:flex;flex-direction:column;align-items:center;gap:var(--space-4);">
        <!-- Language dropdown button -->
        <div style="position:relative;width:100%;max-width:320px;">
          <button id="lang-toggle" class="btn btn-secondary" style="width:100%;display:flex;align-items:center;justify-content:space-between;padding:var(--space-3) var(--space-4);border-radius:var(--radius-lg);">
            <span style="display:flex;align-items:center;gap:var(--space-2);">
              <span style="color:var(--text-secondary);display:flex;">${Icons.Globe()}</span>
              <span id="lang-selected-label" style="font-weight:500;color:var(--text-primary);font-size:var(--text-sm);">${defaultLang.name}</span>
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--text-tertiary);transition:transform 200ms ease;" id="lang-chevron"><polyline points="6 9 12 15 18 9"/></svg>
          </button>

          <!-- Dropdown list -->
          <div id="lang-dropdown" class="hidden" style="position:absolute;bottom:calc(100% + var(--space-2));left:0;right:0;background:rgba(22,27,34,0.95);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.1);border-radius:var(--radius-xl);padding:var(--space-2);max-height:240px;overflow-y:auto;box-shadow:0 -12px 40px rgba(0,0,0,0.5);">
            ${LANGUAGES.map(l => `
              <button class="lang-option ${l.code === defaultLang.code ? 'selected' : ''}" data-lang="${l.code}" style="display:flex;align-items:center;gap:var(--space-3);padding:var(--space-3) var(--space-4);width:100%;background:transparent;border:none;border-radius:var(--radius-md);cursor:pointer;transition:background 200ms ease;color:var(--text-primary);font-family:var(--font-body);">
                <div style="text-align:left;">
                  <div style="font-weight:600;font-size:var(--text-sm);">${l.name}</div>
                  <div style="font-size:var(--text-xs);color:var(--text-tertiary);">${l.native}</div>
                </div>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Continue button -->
        <button id="splash-continue" class="btn btn-gold btn-lg" style="width:100%;max-width:320px;border-radius:var(--radius-lg);">
          ${i18n.t('getStarted')}
        </button>
      </div>
    </div>
    <style>
      .splash-grain { position:absolute;inset:0;opacity:0.03;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E"); }
      .splash-glow { position:absolute;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(212,168,83,0.15),transparent 70%);top:50%;left:50%;transform:translate(-50%,-50%);animation:breathe 3s ease-in-out infinite; }
      .splash-loader { width:32px;height:32px;border:2px solid rgba(255,255,255,0.1);border-top-color:var(--accent-gold);border-radius:50%;animation:spin 0.8s linear infinite; }
      #lang-dropdown .lang-option:hover { background:rgba(255,255,255,0.08); }
      #lang-dropdown .lang-option.selected { background:rgba(212,168,83,0.12); }
      #splash-actions { animation: slideUpModal 500ms var(--ease-cinematic) forwards; }
    </style>
  `;
}

export function mountSplash(onComplete) {
  // Show actions after brief loading delay
  setTimeout(() => {
    const actions = document.getElementById('splash-actions');
    if (actions) {
      actions.classList.remove('hidden');
    }
  }, 2000);

  // Language dropdown toggle
  const toggle = document.getElementById('lang-toggle');
  const dropdown = document.getElementById('lang-dropdown');
  const chevron = document.getElementById('lang-chevron');
  const label = document.getElementById('lang-selected-label');

  if (toggle && dropdown) {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = !dropdown.classList.contains('hidden');
      if (isOpen) {
        dropdown.classList.add('hidden');
        if (chevron) chevron.style.transform = 'rotate(0deg)';
      } else {
        dropdown.classList.remove('hidden');
        if (chevron) chevron.style.transform = 'rotate(180deg)';
      }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
      dropdown.classList.add('hidden');
      if (chevron) chevron.style.transform = 'rotate(0deg)';
    });

    dropdown.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  // Language option selection
  document.querySelectorAll('.lang-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const langName = btn.querySelector('div > div:first-child')?.textContent || 'English';
      if (label) label.textContent = langName;

      // Mark selected
      document.querySelectorAll('.lang-option').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');

      // Close dropdown
      if (dropdown) dropdown.classList.add('hidden');
      if (chevron) chevron.style.transform = 'rotate(0deg)';
      
      // Save preference
      i18n.setLang(btn.dataset.lang);
      
      // Update UI texts immediately
      const tagline = document.getElementById('splash-tagline');
      if (tagline) tagline.textContent = i18n.t('tagline');
      const continueBtn = document.getElementById('splash-continue');
      if (continueBtn) continueBtn.textContent = i18n.t('getStarted');
    });
  });

  // Continue button
  const continueBtn = document.getElementById('splash-continue');
  if (continueBtn) {
    continueBtn.addEventListener('click', () => {
      const splash = document.getElementById('splash-inner');
      if (splash) {
        splash.style.animation = 'fadeOut 500ms var(--ease-out) forwards';
        setTimeout(() => {
          splash.remove();
          onComplete();
        }, 500);
      }
    });
  }
}
