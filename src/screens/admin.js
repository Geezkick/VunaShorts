// ============================================
// VUNASHORTS — Admin Dashboard Screen
// ============================================

import { Icons } from '../components/icons.js';

export function renderAdmin() {
  return `
    <div class="screen" style="padding-bottom:calc(var(--nav-height) + 16px);background:var(--bg-primary);">
      <div style="padding:calc(var(--safe-top) + 16px) var(--space-4) var(--space-4);border-bottom:var(--border-subtle);">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <h1 style="font-size:var(--text-xl);color:var(--accent-rose);display:flex;align-items:center;gap:var(--space-2);">${Icons.Shield()} Admin Center</h1>
          <span class="badge badge-rose">Superuser</span>
        </div>
      </div>

      <!-- Metric Cards -->
      <div style="padding:var(--space-4);display:grid;grid-template-columns:repeat(2,1fr);gap:var(--space-3);">
        <div class="card" style="padding:var(--space-3);">
          <div style="font-size:var(--text-xs);color:var(--text-tertiary);margin-bottom:2px;">Pending Moderation</div>
          <div style="font-family:var(--font-mono);font-size:var(--text-xl);font-weight:700;color:var(--accent-rose);">142</div>
        </div>
        <div class="card" style="padding:var(--space-3);">
          <div style="font-size:var(--text-xs);color:var(--text-tertiary);margin-bottom:2px;">Flagged Transactions</div>
          <div style="font-family:var(--font-mono);font-size:var(--text-xl);font-weight:700;color:var(--accent-orange);">12</div>
        </div>
        <div class="card" style="padding:var(--space-3);">
          <div style="font-size:var(--text-xs);color:var(--text-tertiary);margin-bottom:2px;">Creator KYC Pending</div>
          <div style="font-family:var(--font-mono);font-size:var(--text-xl);font-weight:700;color:var(--accent-blue);">45</div>
        </div>
        <div class="card" style="padding:var(--space-3);">
          <div style="font-size:var(--text-xs);color:var(--text-tertiary);margin-bottom:2px;">Platform Revenue (24h)</div>
          <div style="font-family:var(--font-mono);font-size:var(--text-xl);font-weight:700;color:var(--accent-emerald);">$14.2K</div>
        </div>
      </div>

      <!-- Action Modules -->
      <div style="padding:0 var(--space-4) var(--space-4);">
        <h3 style="margin-bottom:var(--space-3);font-size:var(--text-lg);">Modules</h3>
        <div style="display:flex;flex-direction:column;gap:var(--space-2);">
          ${[
            { icon: Icons.Clapperboard(), name: 'Content Moderation', desc: 'Review AI-flagged videos and user reports' },
            { icon: Icons.CreditCard(), name: 'Payment Gateway Status', desc: 'M-PESA, Flutterwave API health' },
            { icon: Icons.Users(), name: 'Creator Verification', desc: 'Process KYC documents and approve badges' },
            { icon: Icons.BarChart(), name: 'Brand Campaigns', desc: 'Approve new SME sponsorships' },
            { icon: Icons.Server(), name: 'AI System Logs', desc: 'Monitor Story Engine quota usage' }
          ].map(m => `
            <div class="card press-effect" style="padding:var(--space-3) var(--space-4);display:flex;align-items:center;gap:var(--space-3);cursor:pointer;">
              <div style="color:var(--text-secondary);display:flex;align-items:center;justify-content:center;">${m.icon}</div>
              <div style="flex:1;">
                <div style="font-weight:600;font-size:var(--text-sm);">${m.name}</div>
                <div style="font-size:10px;color:var(--text-tertiary);">${m.desc}</div>
              </div>
              <div style="color:var(--text-muted);display:flex;align-items:center;width:16px;height:16px;">${Icons.ChevronRight()}</div>
            </div>
          `).join('')}
        </div>
      </div>
      
      <!-- System Health -->
      <div style="padding:0 var(--space-4) var(--space-4);">
        <div class="card" style="padding:var(--space-4);background:var(--bg-secondary);">
          <div style="display:flex;justify-content:space-between;margin-bottom:var(--space-3);">
            <div style="font-size:var(--text-sm);font-weight:600;">System Health</div>
            <div style="font-size:var(--text-xs);color:var(--accent-emerald);">All Systems Operational</div>
          </div>
          <div style="display:flex;flex-direction:column;gap:var(--space-2);font-family:var(--font-mono);font-size:10px;color:var(--text-secondary);">
            <div style="display:flex;justify-content:space-between;"><span>Nairobi Edge Node</span><span style="color:var(--accent-emerald);">24ms</span></div>
            <div style="display:flex;justify-content:space-between;"><span>Lagos Edge Node</span><span style="color:var(--accent-emerald);">31ms</span></div>
            <div style="display:flex;justify-content:space-between;"><span>Joburg Edge Node</span><span style="color:var(--accent-emerald);">18ms</span></div>
            <div style="display:flex;justify-content:space-between;"><span>DB Load</span><span style="color:var(--accent-blue);">42%</span></div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function mountAdmin() {}
