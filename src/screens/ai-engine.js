// ============================================
// VUNASHORTS — AI Story Engine Screen
// ============================================
import { renderGauge } from '../components/charts.js';
import { showToast } from '../components/utils.js';
import { Icons } from '../components/icons.js';

export function renderAIEngine() {
  return `
    <div class="screen" style="padding-bottom:calc(var(--nav-height) + 16px);">
      <div style="padding:calc(var(--safe-top) + 16px) var(--space-4) var(--space-3);">
        <h1 style="font-size:var(--text-2xl);margin-bottom:var(--space-1);display:flex;align-items:center;gap:8px;">${Icons.Sparkles()} AI Story Engine</h1>
        <p style="font-size:var(--text-sm);color:var(--text-secondary);">Powered by advanced AI to supercharge your storytelling</p>
      </div>

      <!-- AI Tools Grid -->
      <div style="padding:var(--space-4);display:grid;grid-template-columns:repeat(2,1fr);gap:var(--space-3);margin-bottom:var(--space-4);">
        <div class="card press-effect ai-tool active-tool" data-tool="script" style="padding:var(--space-4);cursor:pointer;border:1px solid var(--accent-blue);">
          <div style="color:var(--text-secondary);display:flex;justify-content:center;margin-bottom:var(--space-2);">${Icons.Pen()}</div>
          <div style="font-size:var(--text-sm);font-weight:600;color:var(--accent-blue);">Script Generator</div>
        </div>
        <div class="card press-effect ai-tool" data-tool="cliffhanger" style="padding:var(--space-4);cursor:pointer;">
          <div style="color:var(--text-secondary);display:flex;justify-content:center;margin-bottom:var(--space-2);">${Icons.AlertCircle()}</div>
          <div style="font-size:var(--text-sm);font-weight:600;">Cliffhangers</div>
        </div>
        <div class="card press-effect ai-tool" data-tool="subtitle" style="padding:var(--space-4);cursor:pointer;">
          <div style="color:var(--text-secondary);display:flex;justify-content:center;margin-bottom:var(--space-2);">${Icons.Languages()}</div>
          <div style="font-size:var(--text-sm);font-weight:600;">Subtitles</div>
        </div>
        <div class="card press-effect ai-tool" data-tool="viral" style="padding:var(--space-4);cursor:pointer;">
          <div style="color:var(--text-secondary);display:flex;justify-content:center;margin-bottom:var(--space-2);">${Icons.BarChart()}</div>
          <div style="font-size:var(--text-sm);font-weight:600;">Viral Score</div>
        </div>
      </div>

      <!-- Script Generator Panel -->
      <div id="panel-script" class="ai-panel" style="padding:0 var(--space-4);">
        <div class="card" style="padding:var(--space-4);margin-bottom:var(--space-4);">
          <h4 style="margin-bottom:var(--space-3);">Generate Script</h4>
          <div style="margin-bottom:var(--space-3);">
            <label style="font-size:var(--text-xs);color:var(--text-tertiary);display:block;margin-bottom:var(--space-2);font-weight:500;">Genre</label>
            <select class="input" id="ai-genre" style="appearance:auto;">
              <option>Romance</option><option>Crime</option><option>Comedy</option><option>Drama</option><option>Campus</option><option>Mythology</option>
            </select>
          </div>
          <div style="margin-bottom:var(--space-3);">
            <label style="font-size:var(--text-xs);color:var(--text-tertiary);display:block;margin-bottom:var(--space-2);font-weight:500;">Prompt</label>
            <textarea class="input" id="ai-prompt" rows="3" placeholder="Describe your story idea... e.g., A campus love triangle during exam week in Lagos" style="resize:vertical;font-family:var(--font-body);"></textarea>
          </div>
          <div style="display:flex;gap:var(--space-2);margin-bottom:var(--space-3);">
            <select class="input" style="flex:1;appearance:auto;" id="ai-language">
              <option>English</option><option>Swahili</option><option>Pidgin</option><option>Yoruba</option><option>Hausa</option>
            </select>
            <select class="input" style="flex:1;appearance:auto;" id="ai-duration">
              <option>30 seconds</option><option>60 seconds</option><option>90 seconds</option><option>2 minutes</option>
            </select>
          </div>
          <button class="btn btn-primary btn-full" id="btn-generate" style="display:flex;align-items:center;justify-content:center;gap:8px;">${Icons.Sparkles()} Generate Script</button>
        </div>

        <div id="ai-output" class="hidden" style="margin-bottom:var(--space-4);">
          <div class="card" style="padding:var(--space-4);">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-3);">
              <h4 style="display:flex;align-items:center;gap:8px;">${Icons.Film()} Generated Script</h4>
              <button class="btn btn-ghost btn-sm" id="btn-copy-script">Copy</button>
            </div>
            <div id="ai-script-text" style="font-family:var(--font-body);font-size:var(--text-sm);line-height:1.8;color:var(--text-secondary);white-space:pre-wrap;background:var(--bg-primary);padding:var(--space-4);border-radius:var(--radius-md);border:var(--border-subtle);max-height:300px;overflow-y:auto;"></div>
            <div style="display:flex;gap:var(--space-2);margin-top:var(--space-3);">
              <button class="btn btn-secondary btn-sm flex-1" id="btn-regen-script" style="display:flex;align-items:center;justify-content:center;gap:4px;">${Icons.Sparkles()} Regenerate</button>
              <button class="btn btn-gold btn-sm flex-1" id="btn-save-script" style="display:flex;align-items:center;justify-content:center;gap:4px;">${Icons.Download()} Save</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Cliffhanger Panel -->
      <div id="panel-cliffhanger" class="ai-panel hidden" style="padding:0 var(--space-4);">
        <div class="card" style="padding:var(--space-4);margin-bottom:var(--space-3);">
          <h4 style="margin-bottom:var(--space-3);display:flex;align-items:center;gap:8px;"><span style="color:var(--accent-gold);">${Icons.AlertCircle()}</span> Cliffhanger Suggestions</h4>
          <p style="font-size:var(--text-sm);color:var(--text-secondary);margin-bottom:var(--space-4);">AI-generated endings that keep viewers coming back.</p>
          ${['The letter falls from her hands. The name on it... is her own.', 
             'He picks up the phone. The voice on the other end says: "Don\'t turn around."',
             'She opens the door to find the apartment empty — except for a single red rose and a note that reads "I know."',
             'The DNA results flash on the screen. The doctor looks up and whispers: "This is impossible."'].map((c, i) => `
            <div class="card" style="padding:var(--space-3);margin-bottom:var(--space-2);border:var(--border-subtle);background:var(--bg-primary);">
              <div style="display:flex;gap:var(--space-2);align-items:flex-start;">
                <span style="color:var(--accent-gold);font-weight:700;font-family:var(--font-mono);">#${i + 1}</span>
                <p style="font-size:var(--text-sm);color:var(--text-secondary);font-style:italic;line-height:1.5;">"${c}"</p>
              </div>
              <div style="display:flex;gap:var(--space-2);margin-top:var(--space-2);justify-content:flex-end;">
                <button class="btn btn-ghost btn-sm btn-use-cliffhanger">Use</button>
                <button class="btn btn-ghost btn-sm btn-edit-cliffhanger">Edit</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Subtitle Panel -->
      <div id="panel-subtitle" class="ai-panel hidden" style="padding:0 var(--space-4);">
        <div class="card" style="padding:var(--space-4);">
          <h4 style="margin-bottom:var(--space-3);display:flex;align-items:center;gap:8px;"><span style="color:var(--accent-blue);">${Icons.Languages()}</span> Auto-Subtitle Generator</h4>
          <p style="font-size:var(--text-sm);color:var(--text-secondary);margin-bottom:var(--space-4);">Translate and generate subtitles in 9 African languages.</p>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-2);">
            ${['EN English', 'KE Swahili', 'KE Sheng', 'NG Hausa', 'NG Yoruba', 'NG Igbo', 'FR French', 'SA Arabic', 'BR Portuguese'].map(l => `
              <button class="btn btn-secondary btn-sm btn-lang-sel" style="font-size:10px;">${l}</button>
            `).join('')}
          </div>
          <button id="btn-generate-subtitles" class="btn btn-primary btn-full" style="margin-top:var(--space-4);">Generate Subtitles</button>
        </div>
      </div>

      <!-- Viral Score Panel -->
      <div id="panel-viral" class="ai-panel hidden" style="padding:0 var(--space-4);">
        <div class="card" style="padding:var(--space-4);text-align:center;">
          <h4 style="margin-bottom:var(--space-4);display:flex;align-items:center;justify-content:center;gap:8px;"><span style="color:var(--accent-emerald);">${Icons.BarChart()}</span> Viral Prediction Score</h4>
          <canvas id="chart-viral" style="width:200px;height:140px;margin:0 auto;"></canvas>
          <div style="margin-top:var(--space-4);display:grid;grid-template-columns:repeat(2,1fr);gap:var(--space-3);text-align:left;">
            <div style="padding:var(--space-3);background:var(--bg-primary);border-radius:var(--radius-md);">
              <div style="font-size:var(--text-xs);color:var(--text-tertiary);margin-bottom:2px;">Emotional Hook</div>
              <div style="font-family:var(--font-mono);font-weight:700;color:var(--accent-emerald);">92/100</div>
            </div>
            <div style="padding:var(--space-3);background:var(--bg-primary);border-radius:var(--radius-md);">
              <div style="font-size:var(--text-xs);color:var(--text-tertiary);margin-bottom:2px;">Binge Factor</div>
              <div style="font-family:var(--font-mono);font-weight:700;color:var(--accent-blue);">88/100</div>
            </div>
            <div style="padding:var(--space-3);background:var(--bg-primary);border-radius:var(--radius-md);">
              <div style="font-size:var(--text-xs);color:var(--text-tertiary);margin-bottom:2px;">Share Potential</div>
              <div style="font-family:var(--font-mono);font-weight:700;color:var(--accent-gold);">76/100</div>
            </div>
            <div style="padding:var(--space-3);background:var(--bg-primary);border-radius:var(--radius-md);">
              <div style="font-size:var(--text-xs);color:var(--text-tertiary);margin-bottom:2px;">Monetization</div>
              <div style="font-family:var(--font-mono);font-weight:700;color:var(--accent-purple);">84/100</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function mountAIEngine(el) {
  // Tool tabs
  el.querySelectorAll('.ai-tool').forEach(tool => {
    tool.addEventListener('click', () => {
      el.querySelectorAll('.ai-tool').forEach(t => { t.style.borderColor = ''; t.querySelector('div:last-child').style.color = ''; });
      tool.style.borderColor = 'var(--accent-blue)';
      tool.querySelector('div:last-child').style.color = 'var(--accent-blue)';
      el.querySelectorAll('.ai-panel').forEach(p => p.classList.add('hidden'));
      const panel = el.querySelector(`#panel-${tool.dataset.tool}`);
      if (panel) panel.classList.remove('hidden');

      if (tool.dataset.tool === 'viral') {
        setTimeout(() => {
          const gauge = el.querySelector('#chart-viral');
          if (gauge) renderGauge(gauge, 85, 100, { label: 'Viral Score' });
        }, 100);
      }
    });
  });

  // Generate script
  const genBtn = el.querySelector('#btn-generate');
  if (genBtn) {
    genBtn.addEventListener('click', () => {
      genBtn.innerHTML = '<div class="splash-loader" style="width:18px;height:18px;border-width:2px;margin:0 auto;"></div>';
      genBtn.disabled = true;
      setTimeout(() => {
        genBtn.innerHTML = `<span style="display:flex;align-items:center;gap:8px;">${Icons.Sparkles()} Generate Script</span>`;
        genBtn.disabled = false;
        const output = el.querySelector('#ai-output');
        const text = el.querySelector('#ai-script-text');
        if (output && text) {
          output.classList.remove('hidden');
          text.textContent = `FADE IN:

INT. UNIVERSITY OF LAGOS - LECTURE HALL - DAY

ADEBAYO (22, sharp-dressed, confident) sits in the back row, pretending to take notes. His phone buzzes.

TEXT MESSAGE: "Meet me at the car park. We need to talk. - Chioma"

He glances across the room at BOLAJI (21, his best friend), who's laughing with ADESUWA (20, stunning, the girl they both want).

ADEBAYO (V.O.)
Three years of friendship. Three years of hiding how I feel. Today it all ends.

He stands up. The professor stops mid-sentence.

PROFESSOR
Mr. Adebayo, class isn't over.

ADEBAYO
(walking out)
Some lessons can't wait, Prof.

The door slams. Bolaji's smile fades. He knows.

SMASH CUT TO:

EXT. CAR PARK - CONTINUOUS

Chioma is waiting. Her eyes are red from crying.

CHIOMA
He knows, Ade. About us. About everything.

FREEZE FRAME on Adebayo's face.

TITLE CARD: "CAMPUS KINGS - Episode 4"

END OF EPISODE.`;
          output.style.animation = 'slideUp 400ms var(--ease-cinematic) forwards';
          showToast('Script generated successfully!', 'success');
        }
      }, 2500);
    });
  }

  // Cliffhanger Actions
  el.querySelectorAll('.btn-use-cliffhanger').forEach(btn => {
    btn.addEventListener('click', () => {
      showToast('Cliffhanger saved to clipboard!', 'success');
    });
  });

  el.querySelectorAll('.btn-edit-cliffhanger').forEach(btn => {
    btn.addEventListener('click', () => {
      showToast('Opening in Script Editor...', 'info');
    });
  });

  // Script Output Buttons
  const copyBtn = el.querySelector('#btn-copy-script');
  if (copyBtn) copyBtn.addEventListener('click', () => showToast('Script copied to clipboard!', 'success'));

  const saveBtn = el.querySelector('#btn-save-script');
  if (saveBtn) saveBtn.addEventListener('click', () => showToast('Script saved to your Creator Studio', 'success'));

  const regenBtn = el.querySelector('#btn-regen-script');
  if (regenBtn) regenBtn.addEventListener('click', () => {
    regenBtn.innerHTML = '<div class="splash-loader" style="width:14px;height:14px;border-width:2px;margin:0 auto;"></div>';
    setTimeout(() => {
      regenBtn.innerHTML = `${Icons.Sparkles()} Regenerate`;
      showToast('New variation generated!', 'success');
    }, 1500);
  });

  // Languages Selection
  el.querySelectorAll('.btn-lang-sel').forEach(btn => {
    btn.addEventListener('click', () => {
      el.querySelectorAll('.btn-lang-sel').forEach(b => {
        b.style.borderColor = 'transparent';
        b.style.color = 'var(--text-primary)';
      });
      btn.style.borderColor = 'var(--accent-blue)';
      btn.style.color = 'var(--accent-blue)';
    });
  });

  // Subtitles
  const subBtn = el.querySelector('#btn-generate-subtitles');
  if (subBtn) {
    subBtn.addEventListener('click', () => {
      subBtn.innerHTML = '<div class="splash-loader" style="width:18px;height:18px;border-width:2px;margin:0 auto;border-top-color:white;"></div>';
      subBtn.disabled = true;
      setTimeout(() => {
        subBtn.innerHTML = 'Subtitles Generated!';
        subBtn.classList.remove('btn-primary');
        subBtn.classList.add('btn-secondary');
        showToast('Subtitles added to your latest video', 'success');
      }, 2000);
    });
  }
}
