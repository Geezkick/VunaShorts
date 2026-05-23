// ============================================
// VUNASHORTS — Video Editor Screen
// ============================================
import { appStore } from '../services/store.js';
import { Icons } from '../components/icons.js';
import { showToast } from '../components/utils.js';

const FILTERS = [
  { name: 'None', css: 'none' },
  { name: 'Cinematic', css: 'contrast(1.2) saturate(0.8) sepia(0.15)' },
  { name: 'Vintage', css: 'sepia(0.5) contrast(1.1) brightness(0.9)' },
  { name: 'B&W', css: 'grayscale(1) contrast(1.3)' },
  { name: 'Warm', css: 'sepia(0.2) saturate(1.4) brightness(1.05)' },
  { name: 'Cool', css: 'hue-rotate(20deg) saturate(1.2) brightness(1.05)' },
  { name: 'Drama', css: 'contrast(1.4) brightness(0.85) saturate(1.3)' },
  { name: 'Fade', css: 'contrast(0.85) brightness(1.1) saturate(0.7)' },
];

export function renderVideoEditor() {
  return `
    <div id="video-editor" class="full-screen" style="position:absolute;inset:0;background:var(--bg-primary);display:flex;flex-direction:column;z-index:50;">
      <div style="padding:calc(var(--safe-top) + 12px) var(--space-4) var(--space-3);display:flex;justify-content:space-between;align-items:center;background:rgba(0,0,0,0.6);backdrop-filter:blur(10px);z-index:2;">
        <button class="btn btn-ghost btn-icon" id="btn-editor-back" style="color:var(--text-primary);">${Icons.X()}</button>
        <div id="editor-step-title" style="font-weight:600;">Select Media</div>
        <button class="btn btn-primary btn-sm hidden" id="btn-editor-next">Next</button>
      </div>

      <!-- Step 1: Gallery -->
      <div id="editor-step-1" style="flex:1;overflow-y:auto;padding:var(--space-2);">
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:2px;">
          ${Array(12).fill(0).map((_, i) => `
            <div class="media-thumb press-effect" data-idx="${i}" style="aspect-ratio:9/16;position:relative;cursor:pointer;overflow:hidden;">
              <div style="position:absolute;inset:0;background:linear-gradient(${i*30}deg, hsl(${i*30},50%,18%), hsl(${(i*30)+60},40%,12%));"></div>
              <div style="position:absolute;bottom:4px;right:4px;font-size:10px;background:rgba(0,0,0,0.7);padding:2px 6px;border-radius:4px;">0:${(15+i*3).toString().padStart(2,'0')}</div>
              <div style="position:absolute;top:4px;left:4px;width:16px;height:16px;border:2px solid rgba(255,255,255,0.5);border-radius:50;" class="thumb-check"></div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Step 2: Editor -->
      <div id="editor-step-2" class="hidden" style="flex:1;display:flex;flex-direction:column;">
        <div style="flex:1;background:#000;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;">
          <div id="editor-preview" style="width:100%;height:100%;max-width:400px;margin:0 auto;position:relative;transition:filter 0.3s;">
            <div style="position:absolute;inset:0;background:linear-gradient(45deg,#1a1a2e,#16213e);"></div>
            <div id="editor-text-overlay" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;"></div>
            <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.15);">${Icons.Play()}</div>
          </div>
        </div>
        <!-- Tool Panels -->
        <div id="editor-tools-panel" style="height:240px;background:var(--bg-secondary);border-top:var(--border-subtle);display:flex;flex-direction:column;">
          <div style="display:flex;border-bottom:var(--border-subtle);">
            <button class="editor-tool-tab active" data-tool="trim" style="flex:1;padding:10px;background:none;border:none;color:var(--text-primary);font-size:11px;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px;"><span style="color:var(--accent-blue);">${Icons.Film()}</span>Trim</button>
            <button class="editor-tool-tab" data-tool="filters" style="flex:1;padding:10px;background:none;border:none;color:var(--text-secondary);font-size:11px;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px;"><span style="color:var(--accent-gold);">${Icons.Star()}</span>Filters</button>
            <button class="editor-tool-tab" data-tool="effects" style="flex:1;padding:10px;background:none;border:none;color:var(--text-secondary);font-size:11px;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px;"><span style="color:var(--accent-rose);">${Icons.Sparkles()}</span>Effects</button>
            <button class="editor-tool-tab" data-tool="text" style="flex:1;padding:10px;background:none;border:none;color:var(--text-secondary);font-size:11px;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px;"><span style="color:var(--accent-emerald);">${Icons.Pen()}</span>Text</button>
          </div>
          <!-- Trim Panel -->
          <div id="tool-trim" class="tool-panel" style="flex:1;padding:var(--space-3);display:flex;flex-direction:column;gap:var(--space-3);">
            <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--text-tertiary);"><span id="trim-start">00:00</span><span id="trim-end">00:15</span></div>
            <div style="position:relative;height:48px;background:var(--bg-tertiary);border-radius:6px;overflow:hidden;">
              <div style="position:absolute;inset:0;display:flex;">${Array(12).fill(0).map(()=>`<div style="flex:1;border-right:1px solid rgba(255,255,255,0.03);"></div>`).join('')}</div>
              <div id="trim-range" style="position:absolute;left:10%;right:10%;top:0;bottom:0;border:2px solid var(--accent-gold);background:rgba(212,168,83,0.15);cursor:grab;">
                <div class="trim-handle" data-side="left" style="position:absolute;left:-8px;top:0;bottom:0;width:16px;cursor:ew-resize;display:flex;align-items:center;justify-content:center;"><div style="width:4px;height:24px;background:var(--accent-gold);border-radius:2px;"></div></div>
                <div class="trim-handle" data-side="right" style="position:absolute;right:-8px;top:0;bottom:0;width:16px;cursor:ew-resize;display:flex;align-items:center;justify-content:center;"><div style="width:4px;height:24px;background:var(--accent-gold);border-radius:2px;"></div></div>
              </div>
            </div>
            <div style="display:flex;justify-content:center;gap:var(--space-4);">
              <div style="text-align:center;"><div style="font-size:var(--text-lg);font-weight:700;font-family:var(--font-mono);" id="trim-duration">0:15</div><div style="font-size:10px;color:var(--text-tertiary);">Duration</div></div>
            </div>
          </div>
          <!-- Filters Panel -->
          <div id="tool-filters" class="tool-panel hidden" style="flex:1;padding:var(--space-3);overflow-x:auto;">
            <div style="display:flex;gap:var(--space-3);min-width:max-content;">
              ${FILTERS.map((f,i) => `
                <button class="filter-btn press-effect ${i===0?'active':''}" data-filter="${f.css}" style="background:none;border:${i===0?'2px solid var(--accent-gold)':'2px solid transparent'};color:var(--text-primary);cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px;padding:4px;border-radius:var(--radius-md);">
                  <div style="width:56px;height:56px;border-radius:var(--radius-md);background:linear-gradient(45deg,#1a1a2e,#16213e);filter:${f.css};"></div>
                  <span style="font-size:10px;">${f.name}</span>
                </button>
              `).join('')}
            </div>
          </div>
          <!-- Effects Panel -->
          <div id="tool-effects" class="tool-panel hidden" style="flex:1;padding:var(--space-3);display:flex;flex-wrap:wrap;gap:var(--space-2);align-content:flex-start;">
            ${['Glitch','Shake','Zoom','Flash','Slow-Mo','Speed Up'].map(e => `
              <button class="effect-btn btn btn-secondary btn-sm" data-effect="${e.toLowerCase()}" style="font-size:11px;">${e}</button>
            `).join('')}
          </div>
          <!-- Text Panel -->
          <div id="tool-text" class="tool-panel hidden" style="flex:1;padding:var(--space-3);display:flex;flex-direction:column;gap:var(--space-3);">
            <input type="text" id="text-input" class="input" placeholder="Type your text..." style="font-size:var(--text-sm);">
            <div style="display:flex;gap:var(--space-2);">
              <button class="btn btn-secondary btn-sm text-style-btn active" data-style="bold" style="font-weight:700;">B</button>
              <button class="btn btn-secondary btn-sm text-style-btn" data-style="italic" style="font-style:italic;">I</button>
              <button class="btn btn-secondary btn-sm text-style-btn" data-style="outline">Outline</button>
              ${['#fff','#F85149','#D4A853','#58A6FF','#3FB950'].map(c => `<button class="btn btn-sm text-color-btn" data-color="${c}" style="background:${c};width:28px;height:28px;border-radius:50%;border:2px solid transparent;padding:0;min-height:0;"></button>`).join('')}
            </div>
          </div>
        </div>
      </div>

      <!-- Step 3: Post -->
      <div id="editor-step-3" class="hidden" style="flex:1;overflow-y:auto;padding:var(--space-4);">
        <div style="display:flex;gap:var(--space-4);margin-bottom:var(--space-5);">
          <div id="post-thumb" style="width:90px;aspect-ratio:9/16;border-radius:var(--radius-md);overflow:hidden;flex-shrink:0;"><div style="width:100%;height:100%;background:linear-gradient(45deg,#1a1a2e,#16213e);"></div></div>
          <div style="flex:1;"><textarea id="post-desc" class="input" rows="4" placeholder="Describe your series... #tags" style="background:transparent;border:none;padding:0;resize:none;"></textarea></div>
        </div>
        <div style="display:flex;flex-direction:column;gap:var(--space-4);">
          <div><label style="font-size:var(--text-xs);color:var(--text-tertiary);margin-bottom:4px;display:block;">Title</label><input type="text" id="post-title" class="input" placeholder="Give your series a catchy title"></div>
          <div><label style="font-size:var(--text-xs);color:var(--text-tertiary);margin-bottom:4px;display:block;">Genre</label><select id="post-genre" class="input" style="appearance:auto;"><option value="drama">Drama</option><option value="comedy">Comedy</option><option value="romance">Romance</option><option value="action">Action</option><option value="scifi">Sci-Fi</option></select></div>
          <div><label style="font-size:var(--text-xs);color:var(--text-tertiary);margin-bottom:4px;display:block;">Episodes</label><input type="number" id="post-episodes" class="input" value="10" min="1"></div>
          <div style="display:flex;align-items:center;justify-content:space-between;padding:var(--space-3) 0;border-top:var(--border-subtle);"><div style="display:flex;align-items:center;gap:8px;"><span style="color:var(--text-secondary);">${Icons.MessageCircle()}</span><span>Allow Comments</span></div><input type="checkbox" checked style="accent-color:var(--accent-blue);"></div>
          <div style="display:flex;align-items:center;justify-content:space-between;padding:var(--space-3) 0;border-top:var(--border-subtle);"><div style="display:flex;align-items:center;gap:8px;"><span style="color:var(--text-secondary);">${Icons.Download()}</span><span>Allow Downloads</span></div><input type="checkbox" style="accent-color:var(--accent-blue);"></div>
        </div>
      </div>

      <!-- Upload Overlay -->
      <div id="editor-uploading" class="glass-overlay hidden" style="z-index:60;align-items:center;justify-content:center;">
        <div style="text-align:center;"><div style="width:64px;height:64px;border-radius:50%;border:4px solid var(--bg-tertiary);border-top-color:var(--accent-blue);animation:spin 1s linear infinite;margin:0 auto var(--space-4);"></div><h3 style="margin-bottom:4px;">Posting...</h3><div id="upload-progress-text" style="color:var(--accent-blue);font-family:var(--font-mono);">0%</div></div>
      </div>
    </div>
  `;
}

export function mountVideoEditor(el) {
  let step = 1;
  let selectedFilter = 'none';
  let overlayText = '';
  let textColor = '#fff';
  let textBold = true;
  let textItalic = false;

  const backBtn = el.querySelector('#btn-editor-back');
  const nextBtn = el.querySelector('#btn-editor-next');
  const titleEl = el.querySelector('#editor-step-title');
  const s1 = el.querySelector('#editor-step-1');
  const s2 = el.querySelector('#editor-step-2');
  const s3 = el.querySelector('#editor-step-3');
  const preview = el.querySelector('#editor-preview');

  function show(s) { [s1,s2,s3].forEach(x=>x.classList.add('hidden')); s.classList.remove('hidden'); }

  function updateStep() {
    if (step===1) { show(s1); titleEl.textContent='Select Media'; nextBtn.classList.add('hidden'); backBtn.innerHTML=Icons.X(); }
    else if (step===2) { show(s2); titleEl.textContent='Edit'; nextBtn.classList.remove('hidden'); nextBtn.textContent='Next'; backBtn.innerHTML=Icons.ArrowLeft(); }
    else if (step===3) { show(s3); titleEl.textContent='Post'; nextBtn.classList.remove('hidden'); nextBtn.textContent='Post'; backBtn.innerHTML=Icons.ArrowLeft(); }
  }

  // Step 1: Select
  el.querySelectorAll('.media-thumb').forEach(t => t.addEventListener('click', () => { step=2; updateStep(); }));

  // Back
  backBtn.addEventListener('click', () => { if(step===1) document.dispatchEvent(new CustomEvent('navigate',{detail:'home'})); else { step--; updateStep(); } });

  // Next / Post
  nextBtn.addEventListener('click', () => {
    if (step===2) { step=3; updateStep(); }
    else if (step===3) {
      const title = el.querySelector('#post-title').value;
      if (!title) { showToast('Please enter a title','error'); return; }
      const overlay = el.querySelector('#editor-uploading');
      const pctText = el.querySelector('#upload-progress-text');
      overlay.classList.remove('hidden');
      let pct=0;
      const iv = setInterval(()=>{
        pct+=Math.random()*18; if(pct>=100){pct=100;clearInterval(iv);
          appStore.addSeries({ title, description:el.querySelector('#post-desc').value, genre:el.querySelector('#post-genre').value, episodes:parseInt(el.querySelector('#post-episodes').value)||1 });
          setTimeout(()=>{ showToast('Series posted!','success'); document.dispatchEvent(new CustomEvent('navigate',{detail:'home'})); },400);
        } pctText.textContent=Math.floor(pct)+'%';
      },180);
    }
  });

  // Tool tabs
  el.querySelectorAll('.editor-tool-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      el.querySelectorAll('.editor-tool-tab').forEach(t=>{ t.classList.remove('active'); t.style.color='var(--text-secondary)'; });
      tab.classList.add('active'); tab.style.color='var(--text-primary)';
      el.querySelectorAll('.tool-panel').forEach(p=>p.classList.add('hidden'));
      el.querySelector('#tool-'+tab.dataset.tool).classList.remove('hidden');
    });
  });

  // Filters
  el.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      el.querySelectorAll('.filter-btn').forEach(b=>b.style.borderColor='transparent');
      btn.style.borderColor='var(--accent-gold)';
      selectedFilter = btn.dataset.filter;
      preview.style.filter = selectedFilter;
      showToast('Filter applied','info');
    });
  });

  // Effects
  el.querySelectorAll('.effect-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const fx = btn.dataset.effect;
      btn.style.background='var(--accent-rose)'; btn.style.color='white';
      if(fx==='glitch') { preview.style.animation='none'; preview.offsetHeight; preview.style.animation='shake 0.3s'; }
      else if(fx==='shake') { preview.style.animation='none'; preview.offsetHeight; preview.style.animation='shake 0.5s'; }
      else if(fx==='zoom') { preview.style.transform='scale(1.2)'; setTimeout(()=>preview.style.transform='scale(1)',600); }
      else if(fx==='flash') { preview.style.filter='brightness(3)'; setTimeout(()=>preview.style.filter=selectedFilter,300); }
      else if(fx==='slow-mo'||fx==='speed up') { showToast(fx+' applied','success'); }
      setTimeout(()=>{ btn.style.background=''; btn.style.color=''; },800);
    });
  });

  // Text overlay
  const textInput = el.querySelector('#text-input');
  const textOverlay = el.querySelector('#editor-text-overlay');
  if(textInput) {
    textInput.addEventListener('input', () => {
      overlayText = textInput.value;
      renderTextOverlay();
    });
  }
  el.querySelectorAll('.text-color-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      el.querySelectorAll('.text-color-btn').forEach(b=>b.style.borderColor='transparent');
      btn.style.borderColor='white';
      textColor = btn.dataset.color;
      renderTextOverlay();
    });
  });
  el.querySelectorAll('.text-style-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if(btn.dataset.style==='bold') textBold=!textBold;
      if(btn.dataset.style==='italic') textItalic=!textItalic;
      btn.classList.toggle('active');
      renderTextOverlay();
    });
  });

  function renderTextOverlay() {
    if(!textOverlay) return;
    textOverlay.innerHTML = overlayText ? `<div style="font-size:24px;color:${textColor};font-weight:${textBold?'800':'400'};font-style:${textItalic?'italic':'normal'};text-shadow:0 2px 8px rgba(0,0,0,0.8);padding:16px;text-align:center;">${overlayText}</div>` : '';
  }

  // Trim handles (drag simulation)
  let dragging = null;
  const trimRange = el.querySelector('#trim-range');
  if(trimRange) {
    el.querySelectorAll('.trim-handle').forEach(h => {
      h.addEventListener('mousedown', (e) => { dragging=h.dataset.side; e.preventDefault(); });
      h.addEventListener('touchstart', (e) => { dragging=h.dataset.side; e.preventDefault(); }, {passive:false});
    });
    const onMove = (clientX) => {
      if(!dragging) return;
      const rect = trimRange.parentElement.getBoundingClientRect();
      const pct = Math.max(0, Math.min(100, ((clientX-rect.left)/rect.width)*100));
      if(dragging==='left') trimRange.style.left=Math.min(pct,80)+'%';
      else trimRange.style.right=Math.min(100-pct,80)+'%';
      const l=parseFloat(trimRange.style.left)||0, r=parseFloat(trimRange.style.right)||0;
      const dur = Math.round(15*(100-l-r)/100);
      el.querySelector('#trim-duration').textContent = '0:'+dur.toString().padStart(2,'0');
      el.querySelector('#trim-start').textContent = '00:'+Math.round(l*15/100).toString().padStart(2,'0');
      el.querySelector('#trim-end').textContent = '00:'+Math.round(15-r*15/100).toString().padStart(2,'0');
    };
    document.addEventListener('mousemove', e=>onMove(e.clientX));
    document.addEventListener('touchmove', e=>onMove(e.touches[0].clientX));
    document.addEventListener('mouseup', ()=>dragging=null);
    document.addEventListener('touchend', ()=>dragging=null);
  }
}
