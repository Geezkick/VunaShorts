import { authService } from '../services/auth.js';
import { Icons } from '../components/icons.js';
import { showToast } from '../components/utils.js';

export function renderAuthScreen() {
  return `
    <div id="auth-container" style="position:fixed;inset:0;z-index:var(--z-modal);background:var(--bg-primary);display:flex;flex-direction:column;overflow-y:auto;">
      <div class="auth-header" style="padding:var(--space-6);text-align:center;margin-top:var(--space-8);">
        <div class="auth-logo anim-scale-in" style="margin-bottom:var(--space-4);display:flex;flex-direction:column;align-items:center;gap:var(--space-3);">
          <img src="/src/assets/app-icon-transparent.png" alt="VunaShorts Logo" style="width:80px;height:80px;object-fit:contain;filter:drop-shadow(0 4px 10px rgba(212,168,83,0.3));" />
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
          
          <button type="submit" id="auth-submit-btn" class="btn btn-primary" style="width:100%;padding:var(--space-3);border-radius:var(--radius-md);font-weight:600;display:flex;justify-content:center;align-items:center;gap:var(--space-2);">
            Sign In
          </button>
        </form>

        <div style="margin:var(--space-6) 0;display:flex;align-items:center;text-align:center;color:var(--text-tertiary);">
          <div style="flex:1;height:1px;background:var(--border-light);"></div>
          <span style="margin:0 var(--space-4);font-size:var(--text-sm);">OR</span>
          <div style="flex:1;height:1px;background:var(--border-light);"></div>
        </div>

        <div class="social-auth stagger-children">
          <button id="btn-apple" class="btn" style="width:100%;padding:var(--space-3);margin-bottom:var(--space-3);border-radius:var(--radius-md);background:#000;color:#fff;border:1px solid #333;display:flex;align-items:center;justify-content:center;gap:var(--space-2);">
            ${Icons.Apple()} Continue with Apple
          </button>
          <button id="btn-google" class="btn" style="width:100%;padding:var(--space-3);border-radius:var(--radius-md);background:#fff;color:#000;border:1px solid #ddd;display:flex;align-items:center;justify-content:center;gap:var(--space-2);">
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
  toggleBtn.addEventListener('click', (e) => {
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
    document.getElementById('toggle-mode').addEventListener('click', toggleBtn.click);
  });

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

  // Social Auth
  document.getElementById('btn-apple').addEventListener('click', async () => {
    try {
      await authService.signInWithApple();
      if (onComplete) onComplete();
    } catch (err) {
      showToast('Apple Sign In failed', 'error');
    }
  });

  document.getElementById('btn-google').addEventListener('click', async () => {
    try {
      await authService.signInWithGoogle();
      if (onComplete) onComplete();
    } catch (err) {
      showToast('Google Sign In failed', 'error');
    }
  });
}
