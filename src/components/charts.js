// ============================================
// VUNASHORTS — Charts Component (Canvas)
// ============================================

export function renderLineChart(canvas, data, opts = {}) {
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
  const w = rect.width, h = rect.height;
  const pad = { top: 20, right: 16, bottom: 30, left: 50 };
  const cw = w - pad.left - pad.right;
  const ch = h - pad.top - pad.bottom;
  const values = data.map(d => d.value);
  const max = Math.max(...values) * 1.1;
  const min = 0;
  const color = opts.color || '#58A6FF';
  const labels = data.map(d => d.label || d.month || '');

  // Grid
  ctx.strokeStyle = 'rgba(240,246,252,0.06)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = pad.top + (ch / 4) * i;
    ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(w - pad.right, y); ctx.stroke();
  }

  // Y-axis labels
  ctx.fillStyle = '#6E7681';
  ctx.font = '10px Inter';
  ctx.textAlign = 'right';
  for (let i = 0; i <= 4; i++) {
    const y = pad.top + (ch / 4) * i;
    const val = max - (max / 4) * i;
    ctx.fillText(formatShort(val), pad.left - 8, y + 3);
  }

  // X-axis labels
  ctx.textAlign = 'center';
  const step = Math.max(1, Math.floor(labels.length / 6));
  labels.forEach((l, i) => {
    if (i % step === 0) {
      const x = pad.left + (cw / (labels.length - 1)) * i;
      ctx.fillText(l, x, h - 8);
    }
  });

  // Line + gradient fill
  const points = values.map((v, i) => ({
    x: pad.left + (cw / (values.length - 1)) * i,
    y: pad.top + ch - ((v - min) / (max - min)) * ch,
  }));

  // Gradient fill
  const grad = ctx.createLinearGradient(0, pad.top, 0, h - pad.bottom);
  grad.addColorStop(0, color + '30');
  grad.addColorStop(1, color + '00');
  ctx.beginPath();
  ctx.moveTo(points[0].x, h - pad.bottom);
  points.forEach(p => ctx.lineTo(p.x, p.y));
  ctx.lineTo(points[points.length - 1].x, h - pad.bottom);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // Line
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  points.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
  ctx.stroke();

  // Dots
  const last = points[points.length - 1];
  ctx.beginPath();
  ctx.arc(last.x, last.y, 4, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(last.x, last.y, 8, 0, Math.PI * 2);
  ctx.strokeStyle = color + '40';
  ctx.lineWidth = 2;
  ctx.stroke();
}

export function renderBarChart(canvas, data, opts = {}) {
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
  const w = rect.width, h = rect.height;
  const pad = { top: 16, right: 16, bottom: 30, left: 10 };
  const cw = w - pad.left - pad.right;
  const ch = h - pad.top - pad.bottom;
  const values = data.map(d => d.value || d.percentage);
  const max = Math.max(...values) * 1.1;
  const barW = Math.min(28, (cw / data.length) - 8);
  const color = opts.color || '#58A6FF';

  data.forEach((d, i) => {
    const x = pad.left + (cw / data.length) * i + (cw / data.length - barW) / 2;
    const barH = ((d.value || d.percentage) / max) * ch;
    const y = pad.top + ch - barH;
    const grad = ctx.createLinearGradient(x, y, x, pad.top + ch);
    grad.addColorStop(0, color);
    grad.addColorStop(1, color + '40');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(x, y, barW, barH, [4, 4, 0, 0]);
    ctx.fill();

    ctx.fillStyle = '#6E7681';
    ctx.font = '10px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(d.label || d.name || d.month || '', x + barW / 2, h - 8);
  });
}

export function renderDonutChart(canvas, segments, opts = {}) {
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
  const cx = rect.width / 2, cy = rect.height / 2;
  const r = Math.min(cx, cy) - 10;
  const inner = r * 0.65;
  let start = -Math.PI / 2;
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  const colors = opts.colors || ['#58A6FF', '#3FB950', '#D4A853', '#F85149', '#BC8CFF'];

  segments.forEach((seg, i) => {
    const angle = (seg.value / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(cx, cy, r, start, start + angle);
    ctx.arc(cx, cy, inner, start + angle, start, true);
    ctx.closePath();
    ctx.fillStyle = colors[i % colors.length];
    ctx.fill();
    start += angle;
  });

  // Center text
  ctx.fillStyle = '#F0F6FC';
  ctx.font = 'bold 20px Outfit';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(opts.centerText || '', cx, cy - 6);
  ctx.fillStyle = '#8B949E';
  ctx.font = '11px Inter';
  ctx.fillText(opts.centerLabel || '', cx, cy + 14);
}

export function renderGauge(canvas, value, maxVal, opts = {}) {
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
  const cx = rect.width / 2, cy = rect.height * 0.6;
  const r = Math.min(cx, cy) - 10;
  const startAngle = Math.PI * 0.8;
  const endAngle = Math.PI * 2.2;
  const pct = Math.min(value / maxVal, 1);
  const color = pct > 0.7 ? '#3FB950' : pct > 0.4 ? '#D4A853' : '#F85149';

  // BG arc
  ctx.beginPath();
  ctx.arc(cx, cy, r, startAngle, endAngle);
  ctx.strokeStyle = 'rgba(240,246,252,0.08)';
  ctx.lineWidth = 10;
  ctx.lineCap = 'round';
  ctx.stroke();

  // Value arc
  ctx.beginPath();
  ctx.arc(cx, cy, r, startAngle, startAngle + (endAngle - startAngle) * pct);
  ctx.strokeStyle = color;
  ctx.lineWidth = 10;
  ctx.lineCap = 'round';
  ctx.stroke();

  // Center text
  ctx.fillStyle = '#F0F6FC';
  ctx.font = 'bold 28px Outfit';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(Math.round(value), cx, cy);
  ctx.fillStyle = '#8B949E';
  ctx.font = '11px Inter';
  ctx.fillText(opts.label || '', cx, cy + 22);
}

function formatShort(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(0) + 'K';
  return n.toFixed(0);
}
