// ============================================
// VUNASHORTS — Splash Screen
// ============================================
import { LANGUAGES } from '../data/mock-data.js';
import { Icons } from '../components/icons.js';
import logoUrl from '../assets/app-icon-transparent.png';

export function renderSplash() {
  return `
    <div id="splash-inner" style="position:fixed;inset:0;z-index:var(--z-splash);background:var(--bg-primary);display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;">
      <div class="splash-grain"></div>
      <div class="splash-glow"></div>
      <div class="splash-logo anim-scale-in" style="text-align:center;position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;gap:var(--space-4);">
        <img src="${logoUrl}" alt="VunaShorts Logo" style="width:140px;height:140px;object-fit:contain;filter:drop-shadow(0 10px 20px rgba(212,168,83,0.3));" />
        <div style="font-family:var(--font-display);font-size:3.5rem;font-weight:900;letter-spacing:-0.03em;line-height:1;">
          <span style="color:var(--text-primary);">Vuna</span><span style="background:var(--gradient-premium);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">Shorts</span>
        </div>
        <div style="font-family:var(--font-body);font-size:var(--text-sm);color:var(--text-secondary);margin-top:var(--space-3);letter-spacing:var(--tracking-wider);text-transform:uppercase;">
          Africa's Stories. One Minute at a Time.
        </div>
        <div style="margin-top:var(--space-8);display:flex;justify-content:center;">
          <div class="splash-loader"></div>
        </div>
      </div>
      <div id="lang-select" class="hidden" style="position:absolute;bottom:0;left:0;right:0;background:var(--bg-glass);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-top:var(--border-glass);border-radius:var(--radius-2xl) var(--radius-2xl) 0 0;padding:var(--space-6) var(--space-4) var(--space-8);z-index:3;max-height:70vh;overflow-y:auto;">
        <h3 style="text-align:center;margin-bottom:var(--space-2);">Choose Your Language</h3>
        <p style="text-align:center;font-size:var(--text-sm);margin-bottom:var(--space-6);">You can change this later in settings</p>
        <div class="lang-grid stagger-children">
          ${LANGUAGES.map(l => `
            <button class="lang-option btn btn-secondary" data-lang="${l.code}" style="display:flex;align-items:center;gap:var(--space-3);padding:var(--space-3) var(--space-4);width:100%;justify-content:flex-start;margin-bottom:var(--space-2);">
              <span style="color:var(--text-secondary);display:flex;align-items:center;justify-content:center;">${Icons.Globe()}</span>
              <div style="text-align:left;">
                <div style="font-weight:600;color:var(--text-primary);font-size:var(--text-base);">${l.name}</div>
                <div style="font-size:var(--text-xs);color:var(--text-tertiary);">${l.native}</div>
              </div>
            </button>
          `).join('')}
        </div>
      </div>
    </div>
    <style>
      .splash-grain { position:absolute;inset:0;opacity:0.03;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E"); }
      .splash-glow { position:absolute;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(212,168,83,0.15),transparent 70%);top:50%;left:50%;transform:translate(-50%,-50%);animation:breathe 3s ease-in-out infinite; }
      .splash-loader { width:32px;height:32px;border:2px solid rgba(255,255,255,0.1);border-top-color:var(--accent-gold);border-radius:50%;animation:spin 0.8s linear infinite; }
    </style>
  `;
}

export function mountSplash(onComplete) {
  setTimeout(() => {
    const langSelect = document.getElementById('lang-select');
    if (langSelect) {
      langSelect.classList.remove('hidden');
      langSelect.style.animation = 'slideUpModal 500ms var(--ease-cinematic) forwards';
    }
  }, 2000);

  document.querySelectorAll('.lang-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const splash = document.getElementById('splash-inner');
      if (splash) {
        splash.style.animation = 'fadeOut 500ms var(--ease-out) forwards';
        setTimeout(() => {
          splash.remove();
          onComplete();
        }, 500);
      }
    });
  });
}
