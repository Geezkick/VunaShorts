// ============================================
// VUNASHORTS — Go Live Screen
// ============================================
import { Icons } from '../components/icons.js';
import { showToast } from '../components/utils.js';

export function renderGoLive() {
  return `
    <div id="go-live" class="full-screen" style="position:absolute;inset:0;background:#000;display:flex;flex-direction:column;z-index:50;overflow:hidden;">
      
      <!-- Camera Preview Background -->
      <div id="live-camera-preview" style="position:absolute;inset:0;background:linear-gradient(45deg, #2b1055, #7597de);opacity:0.6;background-size:cover;background-position:center;">
        <!-- Simulated camera feed -->
      </div>
      
      <!-- Pre-Live Overlay -->
      <div id="pre-live-overlay" style="position:absolute;inset:0;display:flex;flex-direction:column;padding:calc(var(--safe-top) + 16px) var(--space-4) var(--space-6);z-index:10;">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <button class="btn btn-ghost btn-icon btn-close-live" style="color:white;">${Icons.X()}</button>
          <button class="btn btn-ghost" style="color:white;font-size:var(--text-xs);"><span style="color:var(--accent-emerald);">${Icons.Settings()}</span> Settings</button>
        </div>
        
        <div style="flex:1;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:var(--space-6);">
          <div class="card" style="background:rgba(0,0,0,0.5);backdrop-filter:blur(10px);width:100%;max-width:300px;border:1px solid rgba(255,255,255,0.1);border-radius:var(--radius-lg);">
            <div style="display:flex;padding:var(--space-3);border-bottom:1px solid rgba(255,255,255,0.1);">
              <input type="text" id="live-title" placeholder="Add a title..." style="background:transparent;border:none;color:white;font-size:var(--text-lg);font-weight:600;width:100%;text-align:center;">
            </div>
            <div style="display:flex;justify-content:space-between;padding:var(--space-3);font-size:var(--text-xs);color:var(--text-secondary);">
              <span style="display:flex;align-items:center;gap:4px;"><span style="color:var(--accent-blue);">${Icons.Crown()}</span> Premium only</span>
              <input type="checkbox" style="accent-color:var(--accent-blue);">
            </div>
          </div>
          
          <div style="display:flex;gap:var(--space-6);">
            <button class="btn btn-ghost" style="flex-direction:column;gap:8px;color:white;"><span style="background:rgba(255,255,255,0.2);padding:12px;border-radius:50%;">${Icons.Sparkles()}</span> Filters</button>
            <button class="btn btn-ghost" style="flex-direction:column;gap:8px;color:white;"><span style="background:rgba(255,255,255,0.2);padding:12px;border-radius:50%;">${Icons.Zap()}</span> Enhance</button>
          </div>
        </div>
        
        <button id="btn-start-live" class="btn btn-primary btn-full" style="padding:var(--space-4);font-size:var(--text-lg);border-radius:var(--radius-full);background:var(--accent-rose);color:white;border:none;box-shadow:0 0 20px rgba(248,81,73,0.5);">GO LIVE</button>
      </div>

      <!-- Live Broadcast Overlay -->
      <div id="live-broadcast-overlay" class="hidden" style="position:absolute;inset:0;display:flex;flex-direction:column;padding:calc(var(--safe-top) + 16px) var(--space-4) var(--space-3);z-index:20;">
        <!-- Top HUD -->
        <div style="display:flex;justify-content:space-between;align-items:flex-start;">
          <div style="display:flex;align-items:center;background:rgba(0,0,0,0.5);border-radius:var(--radius-full);padding:4px 12px 4px 4px;gap:8px;">
            <div class="avatar avatar-sm" style="width:24px;height:24px;">ME</div>
            <div style="display:flex;flex-direction:column;">
              <span style="font-size:10px;font-weight:700;">Host</span>
              <span style="font-size:8px;color:var(--text-secondary);display:flex;align-items:center;gap:2px;"><span style="color:var(--accent-rose);">${Icons.Heart()}</span> 1.2K</span>
            </div>
            <button class="btn btn-primary" style="padding:4px 8px;font-size:10px;border-radius:var(--radius-full);height:auto;min-height:0;">Follow</button>
          </div>
          
          <div style="display:flex;gap:var(--space-2);">
            <div style="background:rgba(0,0,0,0.5);border-radius:var(--radius-full);padding:4px 10px;display:flex;align-items:center;gap:4px;font-size:12px;font-weight:600;">
              ${Icons.Users()} <span id="live-viewer-count">0</span>
            </div>
            <button class="btn btn-ghost btn-icon btn-close-live" style="background:rgba(0,0,0,0.5);border-radius:50%;width:32px;height:32px;">${Icons.X()}</button>
          </div>
        </div>

        <!-- Gifts/Effects Animation Area -->
        <div id="live-effects-area" style="flex:1;position:relative;pointer-events:none;">
          <!-- Hearts bubble up here -->
        </div>

        <!-- Chat Stream -->
        <div id="live-chat-stream" style="height:200px;overflow-y:auto;display:flex;flex-direction:column;justify-content:flex-end;gap:4px;mask-image:linear-gradient(to bottom, transparent, black 20%);padding-bottom:var(--space-4);">
          <!-- Chat messages simulated via JS -->
        </div>

        <!-- Bottom Actions -->
        <div style="display:flex;gap:var(--space-3);align-items:center;">
          <input type="text" class="input" placeholder="Say something..." style="flex:1;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.2);border-radius:var(--radius-full);">
          <button class="btn btn-ghost btn-icon" style="background:rgba(0,0,0,0.5);border-radius:50%;color:var(--accent-gold);">${Icons.Gift()}</button>
          <button class="btn btn-ghost btn-icon" style="background:rgba(0,0,0,0.5);border-radius:50%;color:var(--accent-rose);">${Icons.Share()}</button>
        </div>
      </div>
      
    </div>
  `;
}

export function mountGoLive(el) {
  const preLive = el.querySelector('#pre-live-overlay');
  const broadcast = el.querySelector('#live-broadcast-overlay');
  const chatStream = el.querySelector('#live-chat-stream');
  const viewerCount = el.querySelector('#live-viewer-count');
  
  let isLive = false;
  let chatInterval;
  let viewerInterval;

  // Simulate WebRTC Camera
  try {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } })
      .then(stream => {
        const video = document.createElement('video');
        video.srcObject = stream;
        video.autoplay = true;
        video.playsInline = true;
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'cover';
        el.querySelector('#live-camera-preview').innerHTML = '';
        el.querySelector('#live-camera-preview').appendChild(video);
        
        // Cleanup stream when navigating away
        el.addEventListener('DOMNodeRemoved', (e) => {
          if (e.target === el) {
            stream.getTracks().forEach(track => track.stop());
          }
        });
      }).catch(err => {
        console.log("Camera access denied or unavailable, using cinematic background.");
      });
  } catch(e) {}

  el.querySelectorAll('.btn-close-live').forEach(btn => {
    btn.addEventListener('click', () => {
      if (isLive) {
        if(confirm("Are you sure you want to end your live stream?")) {
          document.dispatchEvent(new CustomEvent('navigate', { detail: 'home' }));
        }
      } else {
        document.dispatchEvent(new CustomEvent('navigate', { detail: 'home' }));
      }
    });
  });

  el.querySelector('#btn-start-live').addEventListener('click', () => {
    const title = el.querySelector('#live-title').value || "My Awesome Stream";
    
    // Countdown
    preLive.innerHTML = `<div style="flex:1;display:flex;align-items:center;justify-content:center;font-size:72px;font-weight:800;font-family:var(--font-display);">3</div>`;
    let count = 3;
    const cd = setInterval(() => {
      count--;
      if (count > 0) {
        preLive.innerHTML = `<div style="flex:1;display:flex;align-items:center;justify-content:center;font-size:72px;font-weight:800;font-family:var(--font-display);animation:pulse 1s;">${count}</div>`;
      } else {
        clearInterval(cd);
        preLive.classList.add('hidden');
        broadcast.classList.remove('hidden');
        startSimulation();
      }
    }, 1000);
  });

  function startSimulation() {
    isLive = true;
    showToast("You are now live!", "success");
    
    let viewers = 0;
    
    // Viewer count simulation
    viewerInterval = setInterval(() => {
      viewers += Math.floor(Math.random() * 5);
      if(Math.random() > 0.8) viewers -= Math.floor(Math.random() * 2); // sometimes people leave
      if (viewers < 0) viewers = 0;
      viewerCount.textContent = viewers.toLocaleString();
    }, 1500);

    // Chat simulation
    const names = ['Amara', 'Kwame', 'Zuri', 'Jabari', 'Fatima', 'Chidi', 'Fan_123', 'MovieBuff'];
    const messages = ['Wow!', 'Looking great!', 'When is the next episode?', 'Love this vibe', '⭐⭐⭐', 'So cool', 'Greetings from Lagos'];
    const colors = ['#3FB950', '#F85149', '#D29922', '#58A6FF', '#8957E5'];

    chatInterval = setInterval(() => {
      if (Math.random() > 0.3) {
        const name = names[Math.floor(Math.random() * names.length)];
        const msg = messages[Math.floor(Math.random() * messages.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        const chatEl = document.createElement('div');
        chatEl.style.cssText = 'padding:4px 8px;background:rgba(0,0,0,0.4);border-radius:8px;font-size:12px;width:fit-content;animation:slideInRight 300ms var(--ease-out);';
        chatEl.innerHTML = `<span style="color:${color};font-weight:600;margin-right:8px;">${name}</span><span>${msg}</span>`;
        
        chatStream.appendChild(chatEl);
        chatStream.scrollTop = chatStream.scrollHeight;
        
        // Remove old messages to keep DOM light
        if (chatStream.children.length > 20) {
          chatStream.removeChild(chatStream.firstChild);
        }
      }
      
      // Simulate gifts
      if (Math.random() > 0.9) {
        if (navigator.vibrate) navigator.vibrate(50);
        const effectArea = el.querySelector('#live-effects-area');
        const giftEl = document.createElement('div');
        giftEl.style.cssText = `position:absolute;bottom:0;left:${Math.random()*80}%;font-size:24px;animation:floatUp 2s ease-out forwards;`;
        giftEl.innerHTML = '🎁';
        effectArea.appendChild(giftEl);
        setTimeout(() => giftEl.remove(), 2000);
      }
    }, 800);
  }

  el.addEventListener('DOMNodeRemoved', (e) => {
    if (e.target === el) {
      clearInterval(chatInterval);
      clearInterval(viewerInterval);
    }
  });
}
