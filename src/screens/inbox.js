// ============================================
// VUNASHORTS — Inbox / Messaging Screen
// ============================================
import { Icons } from '../components/icons.js';
import { CREATORS } from '../data/mock-data.js';
import { showToast } from '../components/utils.js';

const MOCK_CHATS = CREATORS.slice(0,5).map((c,i) => ({
  id: c.id, name: c.name, avatar: c.avatar, verified: c.verified,
  lastMsg: ['Hey! Loved your latest episode 🔥','Collab?','Thanks for the tip!','Can we chat about Season 2?','Amazing work!'][i],
  time: ['2m','15m','1h','3h','1d'][i], unread: i<2 ? (3-i) : 0,
}));

const ACTIVITY = [
  { type:'like', user:'Kwame', text:'liked your episode "Streets of Nairobi"', time:'5m', icon: Icons.Heart() },
  { type:'follow', user:'Zuri', text:'started following you', time:'20m', icon: Icons.User() },
  { type:'tip', user:'Jabari', text:'sent you KSh 500', time:'1h', icon: Icons.Coins() },
  { type:'comment', user:'Fatima', text:'commented: "This is fire 🔥"', time:'2h', icon: Icons.MessageCircle() },
  { type:'like', user:'Chidi', text:'liked your series "The Hustle"', time:'5h', icon: Icons.Heart() },
];

export function renderInbox() {
  return `
    <div class="screen" style="position:absolute;inset:0;background:var(--bg-primary);display:flex;flex-direction:column;">
      <div style="padding:calc(var(--safe-top) + 12px) var(--space-4) var(--space-3);display:flex;align-items:center;gap:var(--space-3);background:var(--bg-secondary);border-bottom:var(--border-subtle);">
        <button class="btn btn-ghost btn-icon" id="btn-inbox-back">${Icons.ArrowLeft()}</button>
        <h2 style="flex:1;font-size:var(--text-lg);">Inbox</h2>
        <button class="btn btn-ghost btn-icon">${Icons.Pen()}</button>
      </div>
      <div style="display:flex;border-bottom:var(--border-subtle);">
        <button class="inbox-tab active" data-tab="messages" style="flex:1;padding:12px;background:none;border:none;border-bottom:2px solid var(--accent-blue);color:var(--text-primary);font-weight:600;font-size:var(--text-sm);cursor:pointer;">Messages</button>
        <button class="inbox-tab" data-tab="activity" style="flex:1;padding:12px;background:none;border:none;border-bottom:2px solid transparent;color:var(--text-tertiary);font-weight:500;font-size:var(--text-sm);cursor:pointer;">Activity</button>
      </div>
      <div id="inbox-messages" style="flex:1;overflow-y:auto;">
        ${MOCK_CHATS.map(c => `
          <div class="chat-row press-effect" data-chat="${c.id}" style="display:flex;align-items:center;gap:var(--space-3);padding:var(--space-3) var(--space-4);border-bottom:var(--border-subtle);cursor:pointer;">
            <div class="avatar" style="font-size:12px;flex-shrink:0;">${c.avatar}</div>
            <div style="flex:1;min-width:0;">
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <span style="font-weight:${c.unread?'700':'500'};font-size:var(--text-sm);">${c.name}${c.verified?` <span style="color:var(--accent-gold);font-size:10px;">✓</span>`:''}</span>
                <span style="font-size:10px;color:var(--text-tertiary);">${c.time}</span>
              </div>
              <div style="font-size:var(--text-xs);color:${c.unread?'var(--text-primary)':'var(--text-tertiary)'};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${c.lastMsg}</div>
            </div>
            ${c.unread ? `<div style="width:18px;height:18px;border-radius:50%;background:var(--accent-blue);color:white;font-size:10px;display:flex;align-items:center;justify-content:center;font-weight:700;">${c.unread}</div>` : ''}
          </div>
        `).join('')}
      </div>
      <div id="inbox-activity" class="hidden" style="flex:1;overflow-y:auto;">
        ${ACTIVITY.map(a => `
          <div style="display:flex;align-items:flex-start;gap:var(--space-3);padding:var(--space-3) var(--space-4);border-bottom:var(--border-subtle);">
            <div style="width:36px;height:36px;border-radius:50%;background:var(--bg-secondary);display:flex;align-items:center;justify-content:center;color:${a.type==='like'?'var(--accent-rose)':a.type==='tip'?'var(--accent-gold)':'var(--accent-blue)'};">${a.icon}</div>
            <div style="flex:1;"><span style="font-weight:600;font-size:var(--text-sm);">${a.user}</span> <span style="font-size:var(--text-sm);color:var(--text-secondary);">${a.text}</span><div style="font-size:10px;color:var(--text-tertiary);margin-top:2px;">${a.time} ago</div></div>
          </div>
        `).join('')}
      </div>

      <!-- Chat Thread -->
      <div id="chat-thread" class="hidden" style="position:absolute;inset:0;background:var(--bg-primary);display:flex;flex-direction:column;z-index:5;">
        <div style="padding:calc(var(--safe-top) + 12px) var(--space-4) var(--space-3);display:flex;align-items:center;gap:var(--space-3);background:var(--bg-secondary);border-bottom:var(--border-subtle);">
          <button class="btn btn-ghost btn-icon" id="btn-chat-back">${Icons.ArrowLeft()}</button>
          <div class="avatar" style="width:32px;height:32px;font-size:11px;" id="chat-avatar"></div>
          <div style="flex:1;"><div style="font-weight:600;font-size:var(--text-sm);" id="chat-name"></div><div style="font-size:10px;color:var(--accent-emerald);">Online</div></div>
        </div>
        <div id="chat-messages" style="flex:1;overflow-y:auto;padding:var(--space-4);display:flex;flex-direction:column;gap:var(--space-3);"></div>
        <div style="padding:var(--space-3) var(--space-4) calc(var(--nav-height) + var(--space-3));display:flex;gap:var(--space-2);border-top:var(--border-subtle);background:var(--bg-secondary);">
          <input type="text" id="chat-input" class="input" placeholder="Message..." style="flex:1;border-radius:var(--radius-full);">
          <button class="btn btn-primary btn-icon" id="btn-send-msg" style="border-radius:50%;width:40px;height:40px;flex-shrink:0;">${Icons.ArrowRight()}</button>
        </div>
      </div>
    </div>
  `;
}

export function mountInbox(el) {
  // Tabs
  el.querySelectorAll('.inbox-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      el.querySelectorAll('.inbox-tab').forEach(t => { t.classList.remove('active'); t.style.borderBottomColor='transparent'; t.style.color='var(--text-tertiary)'; });
      tab.classList.add('active'); tab.style.borderBottomColor='var(--accent-blue)'; tab.style.color='var(--text-primary)';
      el.querySelector('#inbox-messages').classList.toggle('hidden', tab.dataset.tab!=='messages');
      el.querySelector('#inbox-activity').classList.toggle('hidden', tab.dataset.tab!=='activity');
    });
  });

  el.querySelector('#btn-inbox-back').addEventListener('click', () => document.dispatchEvent(new CustomEvent('navigate',{detail:'home'})));

  // Chat rows
  el.querySelectorAll('.chat-row').forEach(row => {
    row.addEventListener('click', () => {
      const chat = MOCK_CHATS.find(c => c.id === row.dataset.chat);
      if(!chat) return;
      el.querySelector('#chat-name').textContent = chat.name;
      el.querySelector('#chat-avatar').textContent = chat.avatar;
      const msgs = el.querySelector('#chat-messages');
      msgs.innerHTML = `
        <div style="align-self:flex-start;max-width:75%;padding:8px 12px;background:var(--bg-secondary);border-radius:12px 12px 12px 4px;font-size:var(--text-sm);">${chat.lastMsg}</div>
        <div style="align-self:flex-end;max-width:75%;padding:8px 12px;background:var(--accent-blue);color:white;border-radius:12px 12px 4px 12px;font-size:var(--text-sm);">Thanks! 🙏</div>
        <div style="align-self:flex-start;max-width:75%;padding:8px 12px;background:var(--bg-secondary);border-radius:12px 12px 12px 4px;font-size:var(--text-sm);">Let's connect soon!</div>
      `;
      el.querySelector('#chat-thread').classList.remove('hidden');
    });
  });

  el.querySelector('#btn-chat-back').addEventListener('click', () => el.querySelector('#chat-thread').classList.add('hidden'));

  // Send message
  const input = el.querySelector('#chat-input');
  const sendBtn = el.querySelector('#btn-send-msg');
  const sendMsg = () => {
    if(!input.value.trim()) return;
    const msgs = el.querySelector('#chat-messages');
    const msg = document.createElement('div');
    msg.style.cssText = 'align-self:flex-end;max-width:75%;padding:8px 12px;background:var(--accent-blue);color:white;border-radius:12px 12px 4px 12px;font-size:var(--text-sm);animation:slideInRight 200ms ease-out;';
    msg.textContent = input.value;
    msgs.appendChild(msg);
    msgs.scrollTop = msgs.scrollHeight;
    input.value = '';
    // Simulate reply
    setTimeout(() => {
      const reply = document.createElement('div');
      reply.style.cssText = 'align-self:flex-start;max-width:75%;padding:8px 12px;background:var(--bg-secondary);border-radius:12px 12px 12px 4px;font-size:var(--text-sm);animation:slideInRight 200ms ease-out;';
      reply.textContent = ['Nice!','That sounds great!','Let me think about it 🤔','Absolutely! 🔥','💯'][Math.floor(Math.random()*5)];
      msgs.appendChild(reply);
      msgs.scrollTop = msgs.scrollHeight;
    }, 1200);
  };
  sendBtn.addEventListener('click', sendMsg);
  input.addEventListener('keydown', e => { if(e.key==='Enter') sendMsg(); });

  // Compose Message
  const composeBtn = el.querySelector('.btn-ghost.btn-icon:not(#btn-inbox-back)');
  if (composeBtn) {
    composeBtn.addEventListener('click', () => {
      showToast('New message feature coming soon', 'info');
    });
  }
}
