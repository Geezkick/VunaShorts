// ============================================
// VUNASHORTS — Watch Party Screen
// ============================================
import { SERIES } from '../data/mock-data.js';
import { Icons } from '../components/icons.js';
import { io } from 'socket.io-client';

const API_URL = import.meta.env.VITE_API_URL || (window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://vunashorts.onrender.com');
const socket = io(API_URL);

export function renderWatchParty() {
  const s = SERIES[2]; // Love in Joburg
  return `
    <div class="screen" style="background:#000;position:relative;overflow:hidden;">
      <!-- Video Area -->
      <div style="position:absolute;inset:0;background:url('${s.poster}') center/cover;filter:brightness(0.7);"></div>
      <div style="position:absolute;inset:0;background:var(--gradient-cinematic);"></div>
      
      <!-- Top Bar -->
      <div style="position:absolute;top:0;left:0;right:0;padding:calc(var(--safe-top) + 12px) var(--space-4);display:flex;justify-content:space-between;align-items:center;z-index:10;">
        <button class="btn btn-ghost btn-icon" style="color:white;background:rgba(0,0,0,0.3);backdrop-filter:blur(8px);" onclick="document.dispatchEvent(new CustomEvent('navigate',{detail:'home'}))">←</button>
        <div class="badge badge-live" style="padding:4px 12px;font-size:var(--text-sm);">LIVE PARTY</div>
        <div style="background:rgba(0,0,0,0.5);backdrop-filter:blur(8px);padding:4px 12px;border-radius:var(--radius-full);display:flex;align-items:center;gap:var(--space-2);font-size:var(--text-xs);font-weight:600;">
          ${Icons.Eye()} 4.2K
        </div>
      </div>

      <!-- Live Chat Overlay -->
      <div style="position:absolute;bottom:calc(var(--nav-height) + var(--safe-bottom) + 80px);left:0;right:0;height:40vh;background:linear-gradient(0deg, rgba(0,0,0,0.8), transparent);z-index:10;display:flex;flex-direction:column;justify-content:flex-end;padding:var(--space-4);">
        <div id="chat-messages" style="overflow-y:auto;max-height:100%;display:flex;flex-direction:column;gap:var(--space-2);mask-image:linear-gradient(to bottom, transparent, black 20%);-webkit-mask-image:linear-gradient(to bottom, transparent, black 20%);padding-top:20px;">
          <!-- Simulated messages -->
          <div class="anim-slide-up" style="display:flex;gap:var(--space-2);align-items:flex-start;">
            <div class="avatar avatar-sm">A</div>
            <div>
              <span style="font-size:10px;color:rgba(255,255,255,0.6);font-weight:600;">@ade_boy</span>
              <div style="font-size:var(--text-sm);">No way he just said that!</div>
            </div>
          </div>
          <div class="anim-slide-up" style="display:flex;gap:var(--space-2);align-items:flex-start;animation-delay:1s;">
            <div class="avatar avatar-sm">Z</div>
            <div>
              <span style="font-size:10px;color:rgba(255,255,255,0.6);font-weight:600;">@zuri_fan</span>
              <div style="font-size:var(--text-sm);">The tension is too much!!</div>
            </div>
          </div>
          <div class="anim-slide-up" style="display:flex;gap:var(--space-2);align-items:flex-start;animation-delay:2s;">
            <div class="avatar avatar-sm" style="border-color:var(--accent-gold);">KD</div>
            <div style="background:rgba(212,168,83,0.2);padding:4px 8px;border-radius:var(--radius-md);border:1px solid rgba(212,168,83,0.3);">
              <span style="font-size:10px;color:var(--accent-gold);font-weight:600;">@king_david</span>
              <div style="font-size:var(--text-sm);">Sent a Golden Lion Gift!</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Reaction Bubbles -->
      <div id="reaction-container" style="position:absolute;bottom:calc(var(--nav-height) + 120px);right:20px;width:60px;height:300px;z-index:9;pointer-events:none;"></div>

      <!-- Input Area -->
      <div style="position:absolute;bottom:0;left:0;right:0;padding:var(--space-3) var(--space-4) calc(var(--nav-height) + var(--safe-bottom) + var(--space-3));background:rgba(14,17,22,0.9);backdrop-filter:blur(20px);z-index:11;display:flex;gap:var(--space-2);align-items:center;">
        <input type="text" id="wp-chat-input" class="input" placeholder="Say something..." style="border-radius:var(--radius-full);background:rgba(255,255,255,0.1);border:none;">
        <button class="btn btn-ghost btn-icon" id="btn-react" style="font-size:24px;display:flex;align-items:center;justify-content:center;color:white;">${Icons.Heart()}</button>
        <button class="btn btn-ghost btn-icon" id="btn-gift-wp" style="font-size:24px;display:flex;align-items:center;justify-content:center;color:white;">${Icons.Gift()}</button>
      </div>
    </div>
  `;
}

export function mountWatchParty(el) {
  const reactBtn = el.querySelector('#btn-react');
  const giftBtn = el.querySelector('#btn-gift-wp');
  const container = el.querySelector('#reaction-container');
  const chatMessages = el.querySelector('#chat-messages');
  const chatInput = el.querySelector('#wp-chat-input');
  
  // Local fallback mock function
  function mockPartyReact(data) {
    const bubble = document.createElement('div');
    if (data.type === 'gift') {
      bubble.innerHTML = '🎁';
      bubble.style.position = 'absolute';
      bubble.style.bottom = '0';
      bubble.style.left = '10px';
      bubble.style.fontSize = '48px';
      bubble.style.animation = 'giftPop 1.5s ease-out forwards';
      showToast('You sent a Gift!', 'success');
    } else {
      bubble.innerHTML = data.type === 'heart' ? '❤️' : data.type === 'fire' ? '🔥' : '⭐';
      bubble.style.position = 'absolute';
      bubble.style.bottom = '0';
      bubble.style.right = (Math.random() * 20) + 'px';
      bubble.style.fontSize = (Math.random() * 12 + 20) + 'px';
      bubble.style.animation = `floatUp ${1.5 + Math.random()}s ease-in forwards`;
    }
    
    container.appendChild(bubble);
    setTimeout(() => bubble.remove(), 2000);
  }

  function mockPartyChat(data) {
    const msg = document.createElement('div');
    msg.className = 'anim-slide-up';
    msg.innerHTML = `
      <div style="display:flex;gap:var(--space-2);align-items:flex-start;margin-top:var(--space-2);">
        <div class="avatar avatar-sm">${data.sender.charAt(0)}</div>
        <div>
          <span style="font-size:10px;color:rgba(255,255,255,0.6);font-weight:600;">${data.handle}</span>
          <div style="font-size:var(--text-sm);">${data.text}</div>
        </div>
      </div>
    `;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    if (chatMessages.children.length > 30) chatMessages.removeChild(chatMessages.firstChild);
  }

  // Join Room
  const partyId = 'room_123';
  socket.emit('join_party', partyId);

  // React Button
  if (reactBtn && container) {
    reactBtn.addEventListener('click', () => {
      const reactionType = ['heart', 'fire', 'star'][Math.floor(Math.random() * 3)];
      socket.emit('party_react', { partyId, type: reactionType });
      if (!socket.connected) mockPartyReact({ type: reactionType });
    });
  }

  // Gift Button
  if (giftBtn && container) {
    giftBtn.addEventListener('click', () => {
      if (navigator.vibrate) navigator.vibrate([50, 50, 50]);
      socket.emit('party_react', { partyId, type: 'gift', sender: 'ME' });
      if (!socket.connected) mockPartyReact({ type: 'gift' });
    });
  }

  // User Chat Input
  if (chatInput && chatMessages) {
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && chatInput.value.trim()) {
        const payload = {
          partyId,
          text: chatInput.value,
          sender: 'ME',
          handle: '@you'
        };
        socket.emit('party_chat', payload);
        if (!socket.connected) mockPartyChat(payload);
        chatInput.value = '';
      }
    });
  }

  // Listeners for Socket.io
  socket.on('party_chat', mockPartyChat);
  socket.on('party_react', mockPartyReact);


  // Cleanup
  el.addEventListener('DOMNodeRemoved', (e) => {
    if (e.target === el) {
      socket.off('party_chat');
      socket.off('party_react');
    }
  });
}
