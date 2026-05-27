import { authService } from '../services/auth.js';
import { Icons } from '../components/icons.js';
import { showToast } from '../components/utils.js';
import logoUrl from '../assets/app-logo.png';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

export function renderAuthScreen() {
  return `
    <div id="auth-container" style="position:fixed;inset:0;z-index:var(--z-modal);background:var(--bg-primary);display:flex;flex-direction:column;overflow-y:auto;">
      <div class="auth-header" style="padding:var(--space-6);text-align:center;margin-top:var(--space-8);">
        <div class="auth-logo anim-scale-in" style="margin-bottom:var(--space-4);display:flex;flex-direction:column;align-items:center;gap:var(--space-3);">
          <img src="${logoUrl}" alt="VunaShorts Logo" style="width:80px;height:80px;object-fit:contain;filter:drop-shadow(0 4px 10px rgba(212,168,83,0.3));" />
          <div style="font-family:var(--font-display);font-size:2.5rem;font-weight:900;line-height:1;">
            <span style="color:var(--text-primary);">Vuna</span><span style="background:var(--gradient-premium);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">Shorts</span>
          </div>
        </div>
        <h2 id="auth-title" style="font-size:var(--text-2xl);font-weight:700;">Welcome Back</h2>
        <p id="auth-subtitle" style="color:var(--text-secondary);margin-top:var(--space-2);">Sign in to continue</p>
      </div>

      <div class="auth-form-container" style="padding:0 var(--space-6);max-width:400px;margin:0 auto;width:100%;">
        <form id="auth-form" class="stagger-children">
          <div id="name-field" style="display:none;margin-bottom:var(--space-4);">
            <label style="display:block;margin-bottom:var(--space-2);color:var(--text-secondary);font-size:var(--text-sm);">Full Name</label>
            <input type="text" id="auth-name" placeholder="John Doe" class="input-field" style="width:100%;padding:var(--space-3);border-radius:var(--radius-md);background:var(--bg-secondary);border:1px solid var(--border-light);color:var(--text-primary);">
          </div>
          <div style="margin-bottom:var(--space-4);">
            <label style="display:block;margin-bottom:var(--space-2);color:var(--text-secondary);font-size:var(--text-sm);">Email</label>
            <input type="email" id="auth-email" placeholder="you@example.com" required class="input-field" style="width:100%;padding:var(--space-3);border-radius:var(--radius-md);background:var(--bg-secondary);border:1px solid var(--border-light);color:var(--text-primary);">
          </div>
          <div style="margin-bottom:var(--space-6);">
            <label style="display:block;margin-bottom:var(--space-2);color:var(--text-secondary);font-size:var(--text-sm);">Password</label>
            <div style="position:relative;">
              <input type="password" id="auth-password" placeholder="••••••••" required class="input-field" style="width:100%;padding:var(--space-3);border-radius:var(--radius-md);background:var(--bg-secondary);border:1px solid var(--border-light);color:var(--text-primary);">
              <button type="button" id="toggle-password" style="position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:none;color:var(--text-secondary);cursor:pointer;">
                ${Icons.Eye()}
              </button>
            </div>
            <div id="password-strength" style="display:none;margin-top:var(--space-2);height:4px;border-radius:2px;background:var(--bg-tertiary);overflow:hidden;">
              <div id="strength-bar" style="height:100%;width:0%;transition:width 0.3s, background-color 0.3s;"></div>
            </div>
          </div>
          
          <button type="submit" id="auth-submit-btn" class="btn btn-primary btn-lg btn-full" style="border-radius:14px;display:flex;justify-content:center;align-items:center;gap:var(--space-2);">
            Sign In
          </button>
        </form>

        <div style="margin:var(--space-6) 0;display:flex;align-items:center;text-align:center;color:var(--text-tertiary);">
          <div style="flex:1;height:1px;background:var(--border-light);"></div>
          <span style="margin:0 var(--space-4);font-size:var(--text-sm);">OR</span>
          <div style="flex:1;height:1px;background:var(--border-light);"></div>
        </div>

        <div class="social-auth stagger-children">
          <!-- Google Sign-In Button rendered by Google SDK -->
          <div id="google-signin-btn" style="display:flex;justify-content:center;margin-bottom:var(--space-3);"></div>
          
          <!-- Fallback button if SDK doesn't load -->
          <button id="btn-google-fallback" class="btn btn-google btn-full hidden" style="padding:var(--space-3);border-radius:14px;display:flex;align-items:center;justify-content:center;gap:var(--space-2);font-size:var(--text-sm);">
            ${Icons.Google()} Continue with Google
          </button>
        </div>

        <div style="margin-top:var(--space-8);text-align:center;">
          <p id="auth-toggle-text" style="color:var(--text-secondary);font-size:var(--text-sm);">
            Don't have an account? <a href="#" id="toggle-mode" style="color:var(--accent-gold);text-decoration:none;font-weight:600;">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  `;
}

export function mountAuthScreen(onComplete) {
  let isSignUp = false;
  
  const form = document.getElementById('auth-form');
  const title = document.getElementById('auth-title');
  const subtitle = document.getElementById('auth-subtitle');
  const nameField = document.getElementById('name-field');
  const submitBtn = document.getElementById('auth-submit-btn');
  const toggleBtn = document.getElementById('toggle-mode');
  const toggleText = document.getElementById('auth-toggle-text');
  const passwordInput = document.getElementById('auth-password');
  const togglePasswordBtn = document.getElementById('toggle-password');
  const strengthContainer = document.getElementById('password-strength');
  const strengthBar = document.getElementById('strength-bar');

  // Toggle Password Visibility
  togglePasswordBtn.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      togglePasswordBtn.innerHTML = Icons.EyeOff();
    } else {
      passwordInput.type = 'password';
      togglePasswordBtn.innerHTML = Icons.Eye();
    }
  });

  // Password Strength
  passwordInput.addEventListener('input', (e) => {
    if (!isSignUp) return;
    const val = e.target.value;
    let strength = 0;
    if (val.length > 5) strength += 33;
    if (val.match(/[A-Z]/)) strength += 33;
    if (val.match(/[0-9]/)) strength += 34;
    
    strengthBar.style.width = `${strength}%`;
    if (strength < 50) strengthBar.style.backgroundColor = 'var(--error-color, #ff4444)';
    else if (strength < 100) strengthBar.style.backgroundColor = 'var(--warning-color, #ffbb33)';
    else strengthBar.style.backgroundColor = 'var(--success-color, #00C851)';
  });

  // Toggle Mode
  const handleToggle = (e) => {
    e.preventDefault();
    isSignUp = !isSignUp;
    
    if (isSignUp) {
      title.textContent = 'Create Account';
      subtitle.textContent = 'Join VunaShorts today';
      nameField.style.display = 'block';
      strengthContainer.style.display = 'block';
      submitBtn.textContent = 'Sign Up';
      toggleText.innerHTML = 'Already have an account? <a href="#" id="toggle-mode" style="color:var(--accent-gold);text-decoration:none;font-weight:600;">Sign In</a>';
    } else {
      title.textContent = 'Welcome Back';
      subtitle.textContent = 'Sign in to continue';
      nameField.style.display = 'none';
      strengthContainer.style.display = 'none';
      submitBtn.textContent = 'Sign In';
      toggleText.innerHTML = "Don't have an account? <a href='#' id='toggle-mode' style='color:var(--accent-gold);text-decoration:none;font-weight:600;'>Sign Up</a>";
    }
    
    // Re-bind toggle after innerHTML change
    document.getElementById('toggle-mode')?.addEventListener('click', handleToggle);
  };

  toggleBtn.addEventListener('click', handleToggle);

  // Handle Form Submit
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<div class="splash-loader" style="width:20px;height:20px;border-width:2px;"></div>';

    try {
      const email = document.getElementById('auth-email').value;
      const password = passwordInput.value;
      
      if (isSignUp) {
        const name = document.getElementById('auth-name').value;
        await authService.signUpWithEmail(name, email, password);
        showToast('Account created successfully!', 'success');
      } else {
        await authService.signInWithEmail(email, password);
        showToast('Signed in successfully!', 'success');
      }
      
      // Cleanup and redirect
      const container = document.getElementById('auth-container');
      container.style.animation = 'fadeOut 300ms var(--ease-out) forwards';
      setTimeout(() => {
        container.remove();
        if (onComplete) onComplete();
      }, 300);
      
    } catch (err) {
      showToast(err.message, 'error');
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });

  // Initialize Google Sign-In SDK
  const initGoogle = () => {
    if (typeof google !== 'undefined' && google.accounts && GOOGLE_CLIENT_ID) {
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
      });

      google.accounts.id.renderButton(
        document.getElementById('google-signin-btn'),
        {
          theme: 'filled_black',
          size: 'large',
          width: 320,
          shape: 'pill',
          text: 'continue_with',
          logo_alignment: 'center'
        }
      );
    } else {
      // Show fallback button if SDK doesn't load or no client ID
      const fallbackBtn = document.getElementById('btn-google-fallback');
      if (fallbackBtn) {
        fallbackBtn.classList.remove('hidden');
        fallbackBtn.addEventListener('click', () => {
          showToast('Google Sign-In requires configuration. Use email for now.', 'info');
        });
      }
    }
  };

  async function handleGoogleResponse(response) {
    if (!response.credential) {
      showToast('Google Sign In cancelled', 'error');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<div class="splash-loader" style="width:20px;height:20px;border-width:2px;"></div>';

    try {
      await authService.signInWithGoogle(response.credential);
      showToast('Signed in with Google!', 'success');

      const container = document.getElementById('auth-container');
      container.style.animation = 'fadeOut 300ms var(--ease-out) forwards';
      setTimeout(() => {
        container.remove();
        if (onComplete) onComplete();
      }, 300);
    } catch (err) {
      showToast(err.message, 'error');
      submitBtn.textContent = 'Sign In';
      submitBtn.disabled = false;
    }
  }

  // Try to init Google after a short delay (SDK loads async)
  setTimeout(initGoogle, 500);
  // Also listen for late SDK load
  window.addEventListener('load', () => setTimeout(initGoogle, 1000));
}
