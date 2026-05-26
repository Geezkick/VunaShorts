// ============================================
// VUNASHORTS — Video Editor Screen
// ============================================
import { appStore } from '../services/store.js';
import { Icons } from '../components/icons.js';
import { showToast } from '../components/utils.js';

const FILTERS = [
  { name: 'None', css: 'none' },
  { name: 'Cinematic', css: 'contrast(1.2) saturate(0.85) sepia(0.1)' },
  { name: 'Vintage', css: 'sepia(0.4) contrast(1.1) brightness(0.95)' },
  { name: 'B&W', css: 'grayscale(1) contrast(1.25)' },
  { name: 'Warm Gold', css: 'sepia(0.15) saturate(1.3) hue-rotate(-5deg) brightness(1.05)' },
  { name: 'Cool Mint', css: 'hue-rotate(15deg) saturate(1.1) brightness(1.02)' },
  { name: 'Drama', css: 'contrast(1.35) brightness(0.9) saturate(1.25)' },
  { name: 'Fade', css: 'contrast(0.9) brightness(1.05) saturate(0.75)' },
];

const MOCK_VIDEOS = [
  'https://assets.mixkit.co/videos/preview/mixkit-african-woman-smiling-at-camera-41808-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-young-black-woman-with-braids-smiling-41804-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-hands-playing-a-djembe-drum-43093-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-cheerful-african-man-dancing-40332-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-woman-dancing-slowly-in-the-streets-40347-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-djembe-drummer-close-up-43094-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-man-dancing-happy-in-the-street-40338-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-hands-drumming-rhythmically-on-a-conga-43092-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-black-woman-smiling-joyfully-41803-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-african-woman-cooking-with-passion-41810-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-djembe-drummer-in-action-43095-large.mp4'
];

const BACKGROUND_MUSIC = [
  { id: 'afrobeats', name: 'Afrobeats Gold', artist: 'Nairobi Beats', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'amapiano', name: 'Amapiano Wave', artist: 'DJ Zuri', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: 'drill', name: 'Nairobi Drill', artist: 'Hustle Syndicate', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { id: 'sahara', name: 'Desert Cinematic', artist: 'Kibo Tracks', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' }
];

const STICKERS = ['🔥', '❤️', '👑', '✨', '🌍', '🎙️', '😂', '🎬', '🌟', '💥', '🙌', '💯'];

export function renderVideoEditor() {
  return `
    <div id="video-editor" class="full-screen" style="position:absolute;inset:0;background:var(--bg-primary);display:flex;flex-direction:column;z-index:50;">
      <!-- Header -->
      <div style="padding:calc(var(--safe-top) + 12px) var(--space-4) var(--space-3);display:flex;justify-content:space-between;align-items:center;background:rgba(0,0,0,0.6);backdrop-filter:blur(10px);z-index:2;border-bottom:var(--border-subtle);">
        <button class="btn btn-ghost btn-icon" id="btn-editor-back" style="color:var(--text-primary);">${Icons.X()}</button>
        <div id="editor-step-title" style="font-weight:700;font-size:var(--text-base);letter-spacing:0.02em;">Select Media</div>
        <button class="btn btn-primary btn-sm hidden" id="btn-editor-next" style="border-radius:20px;padding:6px 18px;">Next</button>
      </div>

      <!-- Step 1: Media Library & Upload -->
      <div id="editor-step-1" style="flex:1;overflow-y:auto;padding:var(--space-3);background:var(--bg-primary);">
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;">
          <!-- Custom Upload Card -->
          <div id="btn-trigger-upload" class="media-thumb press-effect animate-pulse" style="aspect-ratio:9/16;position:relative;cursor:pointer;overflow:hidden;border:2px dashed rgba(212,168,83,0.3);border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;background:rgba(212,168,83,0.04);transition:all 0.3s;">
            <div style="width:44px;height:44px;border-radius:50%;background:rgba(212,168,83,0.15);display:flex;align-items:center;justify-content:center;color:var(--accent-gold);">${Icons.Plus()}</div>
            <div style="font-size:11px;font-weight:700;color:var(--accent-gold);text-transform:uppercase;letter-spacing:0.05em;">Upload Video</div>
            <input type="file" id="real-file-input" accept="video/*" style="display:none;">
          </div>

          <!-- Video Gallery Templates -->
          ${MOCK_VIDEOS.map((v, i) => `
            <div class="media-thumb press-effect gallery-video-thumb" data-video-url="${v}" data-idx="${i}" style="aspect-ratio:9/16;position:relative;cursor:pointer;overflow:hidden;border-radius:12px;box-shadow:0 4px 10px rgba(0,0,0,0.2);">
              <video src="${v}" muted playsinline style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;pointer-events:none;"></video>
              <div style="position:absolute;inset:0;background:linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.6));"></div>
              <div style="position:absolute;bottom:6px;right:6px;font-size:9px;background:rgba(0,0,0,0.75);padding:2px 6px;border-radius:4px;font-family:var(--font-mono);font-weight:600;">0:${(12 + i * 2).toString().padStart(2, '0')}</div>
              <div style="position:absolute;top:6px;left:6px;width:18px;height:18px;border:2px solid rgba(255,255,255,0.4);border-radius:50%;background:rgba(0,0,0,0.3);" class="thumb-check"></div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Step 2: Fully Functional Editor Suite -->
      <div id="editor-step-2" class="hidden" style="flex:1;display:flex;flex-direction:column;background:#050508;">
        <!-- Canvas/Preview Frame -->
        <div style="flex:1;background:#000;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;padding:var(--space-2);">
          <div id="editor-preview-container" style="position:relative;width:100%;height:100%;max-width:380px;aspect-ratio:9/16;border-radius:16px;overflow:hidden;box-shadow:0 12px 36px rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.06);background:#111;">
            <video id="editor-video-preview" loop playsinline style="width:100%;height:100%;object-fit:cover;transition:all 0.3s;"></video>
            
            <!-- Draggable/Configurable Overlays -->
            <div id="editor-text-overlay" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;z-index:10;"></div>
            <div id="editor-sticker-overlay" style="position:absolute;inset:0;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;font-size:48px;pointer-events:none;z-index:11;user-select:none;"></div>
            
            <!-- Dynamic cinematic lighting frame -->
            <div style="position:absolute;inset:0;box-shadow:inset 0 0 40px rgba(0,0,0,0.6);pointer-events:none;z-index:12;"></div>
            
            <!-- Video Loading Spinner -->
            <div id="editor-video-spinner" style="position:absolute;inset:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:13;" class="hidden">
              <div style="width:40px;height:40px;border-radius:50%;border:3px solid rgba(255,255,255,0.1);border-top-color:var(--accent-gold);animation:spin 1s linear infinite;"></div>
            </div>
          </div>
        </div>

        <!-- Suite Control Board -->
        <div id="editor-tools-panel" style="height:260px;background:var(--bg-secondary);border-top:1px solid rgba(255,255,255,0.08);display:flex;flex-direction:column;z-index:5;">
          <!-- Tabs Navigation (Horizontal Scrolling Tabs) -->
          <div style="display:flex;overflow-x:auto;scrollbar-width:none;border-bottom:1px solid rgba(255,255,255,0.06);background:rgba(0,0,0,0.2);">
            <div style="display:flex;min-width:max-content;width:100%;">
              <button class="editor-tool-tab active" data-tool="trim" style="flex:1;padding:12px var(--space-3);background:none;border:none;color:var(--text-primary);font-size:11px;font-weight:600;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px;transition:all 0.2s;"><span style="color:var(--accent-blue);">${Icons.Film()}</span>Trim</button>
              <button class="editor-tool-tab" data-tool="music" style="flex:1;padding:12px var(--space-3);background:none;border:none;color:var(--text-secondary);font-size:11px;font-weight:600;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px;transition:all 0.2s;"><span style="color:var(--accent-gold);">${Icons.Music()}</span>Music</button>
              <button class="editor-tool-tab" data-tool="filters" style="flex:1;padding:12px var(--space-3);background:none;border:none;color:var(--text-secondary);font-size:11px;font-weight:600;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px;transition:all 0.2s;"><span style="color:var(--accent-emerald);">${Icons.Star()}</span>Filters</button>
              <button class="editor-tool-tab" data-tool="adjust" style="flex:1;padding:12px var(--space-3);background:none;border:none;color:var(--text-secondary);font-size:11px;font-weight:600;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px;transition:all 0.2s;"><span style="color:var(--accent-blue);">${Icons.Sliders()}</span>Adjust</button>
              <button class="editor-tool-tab" data-tool="effects" style="flex:1;padding:12px var(--space-3);background:none;border:none;color:var(--text-secondary);font-size:11px;font-weight:600;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px;transition:all 0.2s;"><span style="color:var(--accent-rose);">${Icons.Sparkles()}</span>Effects</button>
              <button class="editor-tool-tab" data-tool="text" style="flex:1;padding:12px var(--space-3);background:none;border:none;color:var(--text-secondary);font-size:11px;font-weight:600;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px;transition:all 0.2s;"><span style="color:var(--text-primary);">${Icons.Pen()}</span>Text</button>
              <button class="editor-tool-tab" data-tool="stickers" style="flex:1;padding:12px var(--space-3);background:none;border:none;color:var(--text-secondary);font-size:11px;font-weight:600;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px;transition:all 0.2s;"><span style="color:var(--accent-gold);">${Icons.Smile()}</span>Stickers</button>
            </div>
          </div>

          <!-- 1. Trim Panel -->
          <div id="tool-trim" class="tool-panel" style="flex:1;padding:var(--space-4);display:flex;flex-direction:column;justify-content:center;gap:12px;">
            <div style="display:flex;justify-content:space-between;font-size:11px;font-family:var(--font-mono);color:var(--text-tertiary);"><span id="trim-start">00:00</span><span id="trim-end">00:15</span></div>
            <div style="position:relative;height:52px;background:var(--bg-tertiary);border-radius:8px;overflow:hidden;border:1px solid rgba(255,255,255,0.06);">
              <div style="position:absolute;inset:0;display:flex;">${Array(14).fill(0).map(()=>`<div style="flex:1;border-right:1px solid rgba(255,255,255,0.04);height:100%;"></div>`).join('')}</div>
              <div id="trim-range" style="position:absolute;left:0%;right:0%;top:0;bottom:0;border:2.5px solid var(--accent-gold);background:rgba(212,168,83,0.12);cursor:grab;border-radius:6px;">
                <div class="trim-handle" data-side="left" style="position:absolute;left:-8px;top:0;bottom:0;width:18px;cursor:ew-resize;display:flex;align-items:center;justify-content:center;z-index:2;"><div style="width:5px;height:26px;background:var(--accent-gold);border-radius:3px;box-shadow:0 0 6px rgba(0,0,0,0.5);"></div></div>
                <div class="trim-handle" data-side="right" style="position:absolute;right:-8px;top:0;bottom:0;width:18px;cursor:ew-resize;display:flex;align-items:center;justify-content:center;z-index:2;"><div style="width:5px;height:26px;background:var(--accent-gold);border-radius:3px;box-shadow:0 0 6px rgba(0,0,0,0.5);"></div></div>
              </div>
            </div>
            <div style="display:flex;justify-content:center;">
              <div style="text-align:center;"><div style="font-size:var(--text-lg);font-weight:800;font-family:var(--font-mono);color:var(--accent-gold);" id="trim-duration">0:15</div><div style="font-size:10px;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:0.04em;">Selected Duration</div></div>
            </div>
          </div>

          <!-- 2. Music Panel (Real Background Sound Addition) -->
          <div id="tool-music" class="tool-panel hidden" style="flex:1;padding:var(--space-3) var(--space-4);display:flex;flex-direction:column;gap:12px;overflow-y:auto;">
            <div style="display:flex;gap:10px;overflow-x:auto;scrollbar-width:none;padding-bottom:4px;">
              ${BACKGROUND_MUSIC.map((track) => `
                <button class="music-track-btn press-effect" data-track-url="${track.url}" data-track-id="${track.id}" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);color:var(--text-primary);cursor:pointer;padding:10px 14px;border-radius:12px;display:flex;align-items:center;gap:10px;min-width:180px;text-align:left;">
                  <div class="music-icon-wrap" style="width:32px;height:32px;border-radius:50%;background:rgba(212,168,83,0.12);color:var(--accent-gold);display:flex;align-items:center;justify-content:center;flex-shrink:0;">${Icons.Music()}</div>
                  <div style="overflow:hidden;">
                    <div style="font-size:12px;font-weight:700;color:var(--text-primary);" class="truncate">${track.name}</div>
                    <div style="font-size:10px;color:var(--text-secondary);" class="truncate">${track.artist}</div>
                  </div>
                </button>
              `).join('')}
            </div>
            
            <div style="display:flex;flex-direction:column;gap:8px;background:rgba(0,0,0,0.15);padding:10px;border-radius:10px;">
              <div style="display:flex;align-items:center;justify-content:space-between;font-size:11px;">
                <span style="color:var(--text-secondary);">Music Volume</span>
                <span id="music-vol-text" style="font-family:var(--font-mono);font-weight:600;">50%</span>
              </div>
              <input type="range" id="input-music-vol" min="0" max="100" value="50" style="width:100%;accent-color:var(--accent-gold);">
              
              <div style="display:flex;align-items:center;justify-content:space-between;font-size:11px;margin-top:4px;">
                <span style="color:var(--text-secondary);">Original Audio</span>
                <span id="orig-vol-text" style="font-family:var(--font-mono);font-weight:600;">100%</span>
              </div>
              <input type="range" id="input-orig-vol" min="0" max="100" value="100" style="width:100%;accent-color:var(--accent-blue);">
            </div>
          </div>

          <!-- 3. Filters Panel -->
          <div id="tool-filters" class="tool-panel hidden" style="flex:1;padding:var(--space-3);overflow-x:auto;">
            <div style="display:flex;gap:var(--space-3);min-width:max-content;padding:var(--space-2) var(--space-3);">
              ${FILTERS.map((f,i) => `
                <button class="filter-btn press-effect ${i===0?'active':''}" data-filter="${f.css}" style="background:none;border:${i===0?'2px solid var(--accent-gold)':'2px solid transparent'};color:var(--text-primary);cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:6px;padding:6px;border-radius:12px;transition:all 0.2s;">
                  <div style="width:62px;height:62px;border-radius:10px;background:linear-gradient(45deg,#1a1a2e,#16213e);filter:${f.css};box-shadow:0 4px 8px rgba(0,0,0,0.3);"></div>
                  <span style="font-size:10px;font-weight:600;">${f.name}</span>
                </button>
              `).join('')}
            </div>
          </div>

          <!-- 4. Adjust Panel (Interactive Sliders) -->
          <div id="tool-adjust" class="tool-panel hidden" style="flex:1;padding:var(--space-4) var(--space-5);display:flex;flex-direction:column;gap:12px;justify-content:center;">
            <div>
              <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:4px;"><span style="color:var(--text-secondary);">Brightness</span><span id="val-brightness" style="font-family:var(--font-mono);font-weight:600;">100%</span></div>
              <input type="range" id="slider-brightness" min="50" max="150" value="100" style="width:100%;accent-color:var(--accent-blue);">
            </div>
            <div>
              <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:4px;"><span style="color:var(--text-secondary);">Contrast</span><span id="val-contrast" style="font-family:var(--font-mono);font-weight:600;">100%</span></div>
              <input type="range" id="slider-contrast" min="50" max="150" value="100" style="width:100%;accent-color:var(--accent-blue);">
            </div>
            <div>
              <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:4px;"><span style="color:var(--text-secondary);">Saturation</span><span id="val-saturation" style="font-family:var(--font-mono);font-weight:600;">100%</span></div>
              <input type="range" id="slider-saturation" min="50" max="200" value="100" style="width:100%;accent-color:var(--accent-blue);">
            </div>
          </div>

          <!-- 5. Effects Panel -->
          <div id="tool-effects" class="tool-panel hidden" style="flex:1;padding:var(--space-4);display:flex;flex-wrap:wrap;gap:10px;align-content:flex-start;justify-content:center;overflow-y:auto;">
            ${['Glitch-FX','Cinematic Shake','Zoom Focus','White Flash','Slow-Motion','Speed Up'].map(e => `
              <button class="effect-btn btn btn-secondary" data-effect="${e.toLowerCase().replace(' ','-')}" style="font-size:12px;border-radius:12px;padding:8px 16px;">${e}</button>
            `).join('')}
          </div>

          <!-- 6. Text Panel -->
          <div id="tool-text" class="tool-panel hidden" style="flex:1;padding:var(--space-4);display:flex;flex-direction:column;gap:12px;justify-content:center;">
            <input type="text" id="text-input" class="input" placeholder="Enter series overlay text..." style="font-size:var(--text-sm);border-radius:10px;background:rgba(255,255,255,0.06);">
            <div style="display:flex;gap:var(--space-2);align-items:center;">
              <button class="btn btn-secondary btn-sm text-style-btn active" data-style="bold" style="font-weight:800;width:36px;height:36px;border-radius:10px;padding:0;">B</button>
              <button class="btn btn-secondary btn-sm text-style-btn" data-style="italic" style="font-style:italic;width:36px;height:36px;border-radius:10px;padding:0;">I</button>
              <button class="btn btn-secondary btn-sm text-style-btn" data-style="outline" style="font-size:10px;height:36px;border-radius:10px;">Outline</button>
              <div style="flex:1;"></div>
              <div style="display:flex;gap:6px;">
                ${['#fff','#F85149','#D4A853','#58A6FF','#3FB950'].map(c => `<button class="btn text-color-btn" data-color="${c}" style="background:${c};width:26px;height:26px;border-radius:50%;border:2px solid transparent;padding:0;min-height:0;box-shadow:0 2px 6px rgba(0,0,0,0.4);"></button>`).join('')}
              </div>
            </div>
          </div>

          <!-- 7. Stickers Panel -->
          <div id="tool-stickers" class="tool-panel hidden" style="flex:1;padding:var(--space-3) var(--space-4);overflow-y:auto;">
            <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:10px;justify-items:center;">
              ${STICKERS.map(sticker => `
                <button class="sticker-btn press-effect" data-sticker="${sticker}" style="background:none;border:none;font-size:32px;cursor:pointer;padding:4px;transition:transform 0.2s;">${sticker}</button>
              `).join('')}
            </div>
            <div style="display:flex;justify-content:center;margin-top:10px;">
              <button class="btn btn-secondary btn-sm" id="btn-clear-stickers" style="font-size:10px;border-radius:8px;padding:4px 10px;">Clear Stickers</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 3: Publish / Post Metadata Info -->
      <div id="editor-step-3" class="hidden" style="flex:1;overflow-y:auto;padding:var(--space-4);">
        <div style="display:flex;gap:var(--space-4);margin-bottom:var(--space-5);">
          <div id="post-thumb" style="width:96px;aspect-ratio:9/16;border-radius:12px;overflow:hidden;flex-shrink:0;box-shadow:0 4px 12px rgba(0,0,0,0.3);position:relative;">
            <div style="position:absolute;inset:0;background:linear-gradient(45deg,#1a1a2e,#16213e);"></div>
            <video id="editor-thumbnail-preview" muted style="width:100%;height:100%;object-fit:cover;pointer-events:none;"></video>
          </div>
          <div style="flex:1;"><textarea id="post-desc" class="input" rows="4" placeholder="Describe your series... What happens next? Add tags #VunaShorts #Drama" style="background:transparent;border:none;padding:0;resize:none;font-size:var(--text-sm);line-height:1.5;"></textarea></div>
        </div>
        <div style="display:flex;flex-direction:column;gap:var(--space-4);">
          <div><label style="font-size:var(--text-xs);color:var(--text-tertiary);margin-bottom:6px;display:block;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;">Series Title</label><input type="text" id="post-title" class="input" placeholder="Give your series a catchy title"></div>
          <div><label style="font-size:var(--text-xs);color:var(--text-tertiary);margin-bottom:6px;display:block;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;">Primary Genre</label><select id="post-genre" class="input" style="appearance:auto;background:rgba(255,255,255,0.04);"><option value="drama">Drama</option><option value="comedy">Comedy</option><option value="romance">Romance</option><option value="action">Action</option><option value="scifi">Sci-Fi</option></select></div>
          <div><label style="font-size:var(--text-xs);color:var(--text-tertiary);margin-bottom:6px;display:block;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;">Number of Episodes</label><input type="number" id="post-episodes" class="input" value="12" min="1"></div>
          <div style="display:flex;align-items:center;justify-content:space-between;padding:var(--space-3) 0;border-top:var(--border-subtle);"><div style="display:flex;align-items:center;gap:10px;"><span style="color:var(--accent-blue);">${Icons.MessageCircle()}</span><span style="font-size:var(--text-sm);font-weight:500;">Allow Comments</span></div><input type="checkbox" checked style="accent-color:var(--accent-blue);width:16px;height:16px;"></div>
          <div style="display:flex;align-items:center;justify-content:space-between;padding:var(--space-3) 0;border-top:var(--border-subtle);"><div style="display:flex;align-items:center;gap:10px;"><span style="color:var(--accent-gold);">${Icons.Download()}</span><span style="font-size:var(--text-sm);font-weight:500;">Allow Device Downloads</span></div><input type="checkbox" style="accent-color:var(--accent-gold);width:16px;height:16px;"></div>
        </div>
      </div>

      <!-- Realistic Upload Overlay -->
      <div id="editor-uploading" class="glass-overlay hidden" style="z-index:60;align-items:center;justify-content:center;background:rgba(10,10,14,0.85);backdrop-filter:blur(16px);">
        <div style="text-align:center;padding:var(--space-6);background:var(--bg-secondary);border-radius:24px;border:1px solid rgba(255,255,255,0.08);box-shadow:0 24px 48px rgba(0,0,0,0.5);max-width:280px;width:100%;">
          <div style="position:relative;width:72px;height:72px;margin:0 auto var(--space-4);display:flex;align-items:center;justify-content:center;">
            <div style="position:absolute;inset:0;border-radius:50%;border:4px solid rgba(88,166,255,0.1);border-top-color:var(--accent-blue);animation:spin 1s linear infinite;"></div>
            <div style="color:var(--accent-blue);">${Icons.Upload()}</div>
          </div>
          <h3 style="margin-bottom:6px;font-weight:700;">Uploading Series</h3>
          <p style="font-size:var(--text-xs);color:var(--text-secondary);margin-bottom:var(--space-4);">Encoding video and writing to PostgreSQL decentralized storage...</p>
          <div id="upload-progress-text" style="color:var(--accent-blue);font-family:var(--font-mono);font-size:var(--text-2xl);font-weight:800;">0%</div>
          <div style="width:100%;height:4px;background:rgba(255,255,255,0.08);border-radius:2px;overflow:hidden;margin-top:12px;">
            <div id="upload-progress-bar-fill" style="width:0%;height:100%;background:linear-gradient(90deg, var(--accent-blue), var(--accent-gold));transition:width 0.2s;"></div>
          </div>
        </div>
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
  let textOutline = false;
  
  // Custom adjust levels
  let brightness = 100;
  let contrast = 100;
  let saturation = 100;
  let selectedEffect = '';

  // Background Audio object
  let backgroundAudio = null;
  let currentTrackId = '';
  let currentTrackUrl = '';

  const backBtn = el.querySelector('#btn-editor-back');
  const nextBtn = el.querySelector('#btn-editor-next');
  const titleEl = el.querySelector('#editor-step-title');
  const s1 = el.querySelector('#editor-step-1');
  const s2 = el.querySelector('#editor-step-2');
  const s3 = el.querySelector('#editor-step-3');
  
  const videoPreview = el.querySelector('#editor-video-preview');
  const thumbnailPreview = el.querySelector('#editor-thumbnail-preview');
  const previewContainer = el.querySelector('#editor-preview-container');
  const spinner = el.querySelector('#editor-video-spinner');

  function show(s) {
    [s1, s2, s3].forEach(x => x.classList.add('hidden'));
    s.classList.remove('hidden');
  }

  function updateStep() {
    if (step === 1) {
      show(s1);
      titleEl.textContent = 'Select Media';
      nextBtn.classList.add('hidden');
      backBtn.innerHTML = Icons.X();
      
      // Stop video playback and music preview
      if (videoPreview) videoPreview.pause();
      stopBackgroundMusic();
    } 
    else if (step === 2) {
      show(s2);
      titleEl.textContent = 'Creative Studio';
      nextBtn.classList.remove('hidden');
      nextBtn.textContent = 'Next';
      backBtn.innerHTML = Icons.ArrowLeft();
      
      // Play preview video
      if (videoPreview) {
        spinner.classList.remove('hidden');
        videoPreview.play()
          .then(() => spinner.classList.add('hidden'))
          .catch(() => spinner.classList.add('hidden'));
      }
    } 
    else if (step === 3) {
      show(s3);
      titleEl.textContent = 'Publish Episode';
      nextBtn.classList.remove('hidden');
      nextBtn.textContent = 'Publish';
      backBtn.innerHTML = Icons.ArrowLeft();
      
      // Copy active video state to thumbnail preview
      if (thumbnailPreview && videoPreview) {
        thumbnailPreview.src = videoPreview.src;
        thumbnailPreview.currentTime = videoPreview.currentTime;
      }
      
      // Stop preview audio to avoid background noise in publishing step
      if (videoPreview) videoPreview.pause();
      stopBackgroundMusic();
    }
  }

  // --- Real File Selector / Upload Handling ---
  const triggerUpload = el.querySelector('#btn-trigger-upload');
  const realFileInput = el.querySelector('#real-file-input');
  
  if (triggerUpload && realFileInput) {
    triggerUpload.addEventListener('click', () => {
      realFileInput.click();
    });

    realFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const fileUrl = URL.createObjectURL(file);
        videoPreview.src = fileUrl;
        showToast('Local video loaded!', 'success');
        step = 2;
        updateStep();
      }
    });
  }

  // Gallery Select Selection
  el.querySelectorAll('.gallery-video-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      const vUrl = thumb.dataset.videoUrl;
      videoPreview.src = vUrl;
      
      // Highlight checkmark visually
      el.querySelectorAll('.thumb-check').forEach(c => {
        c.style.background = 'rgba(0,0,0,0.3)';
        c.style.borderColor = 'rgba(255,255,255,0.4)';
        c.innerHTML = '';
      });
      const check = thumb.querySelector('.thumb-check');
      check.style.background = 'var(--accent-gold)';
      check.style.borderColor = 'var(--accent-gold)';
      check.innerHTML = `<span style="color:#000;display:flex;">${Icons.Check()}</span>`;
      
      showToast('Video templates selected', 'success');
      setTimeout(() => {
        step = 2;
        updateStep();
      }, 300);
    });
  });

  // Navigation Back Button
  backBtn.addEventListener('click', () => {
    if (step === 1) {
      document.dispatchEvent(new CustomEvent('navigate', { detail: 'home' }));
    } else {
      step--;
      updateStep();
    }
  });

  // Next Step / Post Submission handler
  nextBtn.addEventListener('click', () => {
    if (step === 2) {
      step = 3;
      updateStep();
    } 
    else if (step === 3) {
      const title = el.querySelector('#post-title').value.trim();
      if (!title) {
        showToast('Please enter a series title', 'error');
        return;
      }
      
      const overlay = el.querySelector('#editor-uploading');
      const pctText = el.querySelector('#upload-progress-text');
      const progressFill = el.querySelector('#upload-progress-bar-fill');
      
      overlay.classList.remove('hidden');
      
      // We don't use the fake interval anymore
      // We'll let appStore handle the actual XMLHttpRequest progress
          const trimLeft = parseFloat(el.querySelector('#trim-range')?.style.left) || 0;
          const trimRight = parseFloat(el.querySelector('#trim-range')?.style.right) || 0;
          const trimStart = (trimLeft / 100) * 15;
          const trimDuration = (100 - trimLeft - trimRight) / 100 * 15;

          const edits = {
            filter: selectedFilter,
            brightness,
            contrast,
            saturation,
            musicTrack: currentTrackUrl, // URL
            musicVolume: parseInt(el.querySelector('#input-music-vol')?.value || 50),
            originalVolume: parseInt(el.querySelector('#input-orig-vol')?.value || 100),
            text: overlayText,
            textColor,
            textBold,
            textItalic,
            textOutline,
            trimStart,
            trimDuration,
            speed: videoPreview?.playbackRate || 1.0,
            effect: selectedEffect
          };

          const formData = new FormData();
          formData.append('title', title);
          formData.append('description', el.querySelector('#post-desc').value || 'Fresh episodes straight from VunaStudio.');
          formData.append('genre', el.querySelector('#post-genre').value);
          formData.append('episodes', parseInt(el.querySelector('#post-episodes').value) || 12);
          formData.append('edits', JSON.stringify(edits));

          const file = realFileInput?.files[0];
          
          let videoBlob = null;
          let filename = 'video.mp4';
          
          if (file && videoPreview.src.startsWith('blob:')) {
            videoBlob = file;
            filename = file.name;
          }

          const processAndUpload = async () => {
            if (!videoBlob && videoPreview.src) {
              try {
                pctText.textContent = 'Preparing...';
                const res = await fetch(videoPreview.src);
                videoBlob = await res.blob();
                filename = 'template.mp4';
              } catch (e) {
                console.error("Failed to fetch template video", e);
              }
            }

            if (videoBlob) {
              formData.append('video', videoBlob, filename);
            }

            // Write to store.js state (Add new Series)
            appStore.addSeries(formData, (p) => {
              if (p >= 100) {
                p = 100;
                pctText.textContent = 'Processing Video...';
              } else {
                pctText.textContent = Math.floor(p) + '%';
              }
              if (progressFill) progressFill.style.width = p + '%';
            }).then(() => {
              showToast('Series published successfully!', 'success');
              document.dispatchEvent(new CustomEvent('navigate', { detail: 'home' }));
            }).catch(() => {
              showToast('Failed to process video', 'error');
              overlay.classList.add('hidden');
            });
          };

          processAndUpload();
    }
  });

  // Tab switching for editor panels
  el.querySelectorAll('.editor-tool-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      el.querySelectorAll('.editor-tool-tab').forEach(t => {
        t.classList.remove('active');
        t.style.color = 'var(--text-secondary)';
      });
      tab.classList.add('active');
      tab.style.color = 'var(--text-primary)';
      
      el.querySelectorAll('.tool-panel').forEach(p => p.classList.add('hidden'));
      const activePanel = el.querySelector('#tool-' + tab.dataset.tool);
      if (activePanel) activePanel.classList.remove('hidden');
    });
  });

  // --- Real Background Music playback tool implementation ---
  function stopBackgroundMusic() {
    if (backgroundAudio) {
      backgroundAudio.pause();
      backgroundAudio = null;
    }
    el.querySelectorAll('.music-track-btn').forEach(btn => {
      btn.style.borderColor = 'rgba(255,255,255,0.08)';
      btn.style.background = 'rgba(255,255,255,0.04)';
      const iconWrap = btn.querySelector('.music-icon-wrap');
      if (iconWrap) {
        iconWrap.style.background = 'rgba(212,168,83,0.12)';
        iconWrap.innerHTML = Icons.Music();
      }
    });
  }

  el.querySelectorAll('.music-track-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const trackUrl = btn.dataset.trackUrl;
      const trackId = btn.dataset.trackId;

      if (currentTrackId === trackId && backgroundAudio && !backgroundAudio.paused) {
        // Toggle Pause
        backgroundAudio.pause();
        btn.querySelector('.music-icon-wrap').innerHTML = Icons.Play();
        showToast('Music paused', 'info');
        return;
      }

      stopBackgroundMusic();
      currentTrackId = trackId;
      currentTrackUrl = trackUrl;

      backgroundAudio = new Audio(trackUrl);
      backgroundAudio.loop = true;
      
      const musicVol = parseInt(el.querySelector('#input-music-vol').value) / 100;
      backgroundAudio.volume = musicVol;

      backgroundAudio.play()
        .then(() => {
          btn.style.borderColor = 'var(--accent-gold)';
          btn.style.background = 'rgba(212,168,83,0.06)';
          
          const iconWrap = btn.querySelector('.music-icon-wrap');
          iconWrap.style.background = 'var(--accent-gold)';
          iconWrap.innerHTML = Icons.Pause();
          
          showToast('Music track added!', 'success');
        })
        .catch(err => {
          console.error("Audio playback error:", err);
          showToast('Failed to play music track', 'error');
        });
    });
  });

  // Audio Volume Sliders
  const musicVolInput = el.querySelector('#input-music-vol');
  const musicVolText = el.querySelector('#music-vol-text');
  if (musicVolInput && musicVolText) {
    musicVolInput.addEventListener('input', () => {
      const val = musicVolInput.value;
      musicVolText.textContent = val + '%';
      if (backgroundAudio) {
        backgroundAudio.volume = val / 100;
      }
    });
  }

  const origVolInput = el.querySelector('#input-orig-vol');
  const origVolText = el.querySelector('#orig-vol-text');
  if (origVolInput && origVolText) {
    origVolInput.addEventListener('input', () => {
      const val = origVolInput.value;
      origVolText.textContent = val + '%';
      if (videoPreview) {
        videoPreview.volume = val / 100;
      }
    });
  }

  // --- Real-time Filter System ---
  el.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      el.querySelectorAll('.filter-btn').forEach(b => {
        b.style.borderColor = 'transparent';
        b.classList.remove('active');
      });
      btn.style.borderColor = 'var(--accent-gold)';
      btn.classList.add('active');
      
      selectedFilter = btn.dataset.filter;
      applyVideoFilters();
      showToast('Creative filter applied', 'info');
    });
  });

  // --- Real-time Slider Adjustments (Sat, Bri, Con) ---
  const sliderBri = el.querySelector('#slider-brightness');
  const valBri = el.querySelector('#val-brightness');
  if (sliderBri) {
    sliderBri.addEventListener('input', () => {
      brightness = sliderBri.value;
      valBri.textContent = brightness + '%';
      applyVideoFilters();
    });
  }

  const sliderCon = el.querySelector('#slider-contrast');
  const valCon = el.querySelector('#val-contrast');
  if (sliderCon) {
    sliderCon.addEventListener('input', () => {
      contrast = sliderCon.value;
      valCon.textContent = contrast + '%';
      applyVideoFilters();
    });
  }

  const sliderSat = el.querySelector('#slider-saturation');
  const valSat = el.querySelector('#val-saturation');
  if (sliderSat) {
    sliderSat.addEventListener('input', () => {
      saturation = sliderSat.value;
      valSat.textContent = saturation + '%';
      applyVideoFilters();
    });
  }

  function applyVideoFilters() {
    if (!videoPreview) return;
    
    let baseFilter = selectedFilter === 'none' ? '' : selectedFilter;
    let adjustFilter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
    videoPreview.style.filter = `${baseFilter} ${adjustFilter}`.trim();
  }

  // --- Cinematic Visual Effects ---
  el.querySelectorAll('.effect-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const fx = btn.dataset.effect;
      
      // Temporarily highlight button
      btn.classList.add('btn-gold');
      setTimeout(() => btn.classList.remove('btn-gold'), 1200);

      // Trigger actual animation transformations in CSS
      if (fx === 'glitch-fx') {
        previewContainer.style.animation = 'none';
        previewContainer.offsetHeight; // Reflow
        previewContainer.style.animation = 'shake 0.3s cubic-bezier(.36,.07,.19,.97) both';
        showToast('Glitch transition applied', 'success');
      } 
      else if (fx === 'cinematic-shake') {
        previewContainer.style.animation = 'none';
        previewContainer.offsetHeight; // Reflow
        previewContainer.style.animation = 'shake 0.6s cubic-bezier(.36,.07,.19,.97) both';
        showToast('Camera shake applied', 'success');
      } 
      else if (fx === 'zoom-focus') {
        videoPreview.style.transform = 'scale(1.25)';
        setTimeout(() => videoPreview.style.transform = 'scale(1)', 800);
        showToast('Focal zoom applied', 'info');
      } 
      else if (fx === 'white-flash') {
        videoPreview.style.filter = 'brightness(3.5)';
        setTimeout(() => applyVideoFilters(), 400);
        showToast('Cinematic flash applied', 'success');
      } 
      else if (fx === 'slow-motion') {
        videoPreview.playbackRate = 0.5;
        showToast('Speed rate set to 0.5x', 'info');
      } 
      else if (fx === 'speed-up') {
        videoPreview.playbackRate = 1.75;
        showToast('Speed rate set to 1.75x', 'info');
      }
    });
  });

  // --- Dynamic Stickers / Emojis tool ---
  const stickerOverlay = el.querySelector('#editor-sticker-overlay');
  
  el.querySelectorAll('.sticker-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const sticker = btn.dataset.sticker;
      
      // Visual click effect
      btn.style.transform = 'scale(1.3)';
      setTimeout(() => btn.style.transform = 'scale(1)', 150);

      if (stickerOverlay) {
        const span = document.createElement('span');
        span.style.cssText = 'position:absolute;cursor:move;user-select:none;font-size:48px;animation:heartbeat 0.3s ease;';
        span.textContent = sticker;
        
        // Dynamic random initial offset in preview frame
        const rx = Math.random() * 60 + 20;
        const ry = Math.random() * 60 + 20;
        span.style.left = rx + '%';
        span.style.top = ry + '%';
        
        stickerOverlay.appendChild(span);
        showToast('Sticker placed!', 'success');
      }
    });
  });

  const clearStickersBtn = el.querySelector('#btn-clear-stickers');
  if (clearStickersBtn && stickerOverlay) {
    clearStickersBtn.addEventListener('click', () => {
      stickerOverlay.innerHTML = '';
      showToast('Stickers cleared', 'info');
    });
  }

  // --- Text overlays ---
  const textInput = el.querySelector('#text-input');
  const textOverlay = el.querySelector('#editor-text-overlay');
  
  if (textInput) {
    textInput.addEventListener('input', () => {
      overlayText = textInput.value.trim();
      renderTextOverlay();
    });
  }
  
  el.querySelectorAll('.text-color-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      el.querySelectorAll('.text-color-btn').forEach(b => b.style.borderColor = 'transparent');
      btn.style.borderColor = 'white';
      textColor = btn.dataset.color;
      renderTextOverlay();
    });
  });

  el.querySelectorAll('.text-style-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const style = btn.dataset.style;
      if (style === 'bold') textBold = !textBold;
      if (style === 'italic') textItalic = !textItalic;
      if (style === 'outline') textOutline = !textOutline;
      
      btn.classList.toggle('active');
      renderTextOverlay();
    });
  });

  function renderTextOverlay() {
    if (!textOverlay) return;
    
    let textStyle = `color:${textColor};`;
    textStyle += `font-weight:${textBold ? '800' : '400'};`;
    textStyle += `font-style:${textItalic ? 'italic' : 'normal'};`;
    
    if (textOutline) {
      textStyle += `text-shadow:-1.5px -1.5px 0 #000, 1.5px -1.5px 0 #000, -1.5px 1.5px 0 #000, 1.5px 1.5px 0 #000, 0 3px 8px rgba(0,0,0,0.6);`;
    } else {
      textStyle += `text-shadow:0 3px 10px rgba(0,0,0,0.85);`;
    }

    textOverlay.innerHTML = overlayText 
      ? `<div style="font-size:26px;font-family:var(--font-display);${textStyle}padding:16px;text-align:center;word-break:break-word;width:100%;max-width:320px;line-height:1.2;">${overlayText}</div>` 
      : '';
  }

  // --- Trim range dragging handles simulation ---
  let dragging = null;
  const trimRange = el.querySelector('#trim-range');
  if (trimRange) {
    el.querySelectorAll('.trim-handle').forEach(h => {
      h.addEventListener('mousedown', (e) => { dragging = h.dataset.side; e.preventDefault(); });
      h.addEventListener('touchstart', (e) => { dragging = h.dataset.side; e.preventDefault(); }, { passive: false });
    });

    const onMove = (clientX) => {
      if (!dragging) return;
      const rect = trimRange.parentElement.getBoundingClientRect();
      const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
      
      if (dragging === 'left') {
        trimRange.style.left = Math.min(pct, 80) + '%';
      } else {
        trimRange.style.right = Math.min(100 - pct, 80) + '%';
      }
      
      const l = parseFloat(trimRange.style.left) || 0;
      const r = parseFloat(trimRange.style.right) || 0;
      const dur = Math.round(15 * (100 - l - r) / 100);
      
      el.querySelector('#trim-duration').textContent = '0:' + dur.toString().padStart(2, '0');
      el.querySelector('#trim-start').textContent = '00:' + Math.round(l * 15 / 100).toString().padStart(2, '0');
      el.querySelector('#trim-end').textContent = '00:' + Math.round(15 - r * 15 / 100).toString().padStart(2, '0');
      
      // Seek video to starting trim time dynamically
      if (videoPreview && videoPreview.duration) {
        const startSec = (l / 100) * videoPreview.duration;
        videoPreview.currentTime = startSec;
      }
    };

    document.addEventListener('mousemove', e => onMove(e.clientX));
    document.addEventListener('touchmove', e => onMove(e.touches[0].clientX));
    document.addEventListener('mouseup', () => dragging = null);
    document.addEventListener('touchend', () => dragging = null);
  }

  // Clean-up music on leaving screen
  el.addEventListener('DOMNodeRemoved', (e) => {
    if (e.target === el) {
      stopBackgroundMusic();
    }
  });
}
