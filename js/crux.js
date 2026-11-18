/* Crux, drawn live: a 1:1 port of the Remotion clips (animaciones/src) to SVG strings.
   150 frames at 30 fps; every clip is a pure function of the frame. */
window.Crux = (() => {
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
const NS = 'http://www.w3.org/2000/svg';

/* =====================================================================
   Crux: port 1:1 de animaciones/src (bag.tsx + anims.tsx) a SVG en texto.
   150 frames a 30 fps; cada clip es una función pura del frame.
   ===================================================================== */
const FPS = 30, N = 150;
const n = v => Math.round(v * 100) / 100;
const clamp01 = v => Math.max(0, Math.min(1, v));
const lerp = (a, b, t) => a + (b - a) * t;
// muelle de Remotion (masa 1) en forma cerrada
function spring(fr, c, k) {
  const t = fr / FPS; if (t <= 0) return 0;
  const w0 = Math.sqrt(k), z = c / (2 * w0);
  if (z < 1) { const wd = w0 * Math.sqrt(1 - z * z); return 1 - Math.exp(-z * w0 * t) * (Math.cos(wd * t) + (z * w0 / wd) * Math.sin(wd * t)); }
  if (z === 1) return 1 - Math.exp(-w0 * t) * (1 + w0 * t);
  const s = Math.sqrt(z * z - 1), r1 = -w0 * (z - s), r2 = -w0 * (z + s);
  return 1 - (r2 * Math.exp(r1 * t) - r1 * Math.exp(r2 * t)) / (r2 - r1);
}
const sp = (f, f0, d, k) => f < f0 ? 0 : spring(f - f0, d, k);
const on = (f, f0, f1, d1 = 12, k1 = 160, d2 = 16, k2 = 140) => sp(f, f0, d1, k1) * (1 - sp(f, f1, d2, k2));
const osc = (f, p, ph = 0) => Math.sin(2 * Math.PI * f / p + ph);
const blinkAt = (f, f0) => { const d = f - f0; return d < 0 || d > 6 ? 0 : Math.sin(d / 6 * Math.PI); };
const eio = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
function kf(f, xs, ys) {
  if (f <= xs[0]) return ys[0];
  for (let i = 1; i < xs.length; i++) if (f <= xs[i]) return lerp(ys[i - 1], ys[i], eio((f - xs[i - 1]) / (xs[i] - xs[i - 1])));
  return ys[ys.length - 1];
}
const arc = (f, f0, f1, h) => { if (f <= f0 || f >= f1) return 0; const t = (f - f0) / (f1 - f0); return -h * 4 * t * (1 - t); };
const impact = (f, f0, k = 1) => f < f0 ? 0 : k * (1 - spring(f - f0, 7, 200));
const rnd = (i, k) => { const s = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return s - Math.floor(s); };
const squash = (r, sq, st = 0) => { r.sy += -sq + st; r.sx += 0.7 * sq - 0.6 * st; };

const C = { chalk: '#FFFFFF', chalkShade: '#DCE3EA', tongue: '#EF8676', coral: '#E98A6B', mustard: '#E7B75A',
  lavender: '#A99BE6', heart: '#E5604A', wall: '#5F6C7B', wallDark: '#4D5866', body: '#6F95C9' };

const SKINS = [
  ['classic', '#6F95C9', '#577BAD', '#4A6A98', '#3F5B85'],
  ['coral', '#E98A6B', '#D06E50', '#B85A3F', '#A04C34'],
  ['mustard', '#E7B75A', '#D29E40', '#B58434', '#9C702A', '#3A2A14'],
  ['alpine', '#A99BE6', '#8F80D2', '#7464BA', '#5F52A0'],
  ['night', '#3B4658', '#2F3848', '#252C39', '#1E2430', '#F4EFE7'],
  ['plaid', '#8DB39A', '#739A81', '#5F846C', '#4F705B', '#1F2E25'],
  ['flamenco', '#E899A8', '#D47E92', '#BA6A7E', '#A05A6C'],
  ['glaciar', '#7FB8C4', '#639EAC', '#528795', '#447380'],
  ['magma', '#C7523F', '#A84234', '#8E372B', '#762E24'],
  ['musgo', '#5F8F6B', '#4C7757', '#3E6348', '#33523C', '#14281B'],
  ['ghost', '#FFFFFF', '#E3E8EE', '#C9D2DC', '#AEB9C6', '#2B3442'],
  ['oro', '#F2C84B', '#DCAA33', '#C08F27', '#A3761F', '#4A3508'],
].map(([id, body, shade, cuff, feet, eye = '#1F2A3A']) => ({ id, body, shade, cuff, feet, eye, cheek: '#F2A58F' }));
const SK = Object.fromEntries(SKINS.map(s => [s.id, s]));

const defaultRig = () => ({
  x: 0, y: 0, rot: 0, sx: 1, sy: 1, feetY: 0, feetSpread: 0, feetDX: 0, footLY: 0, footRY: 0,
  leftAng: 118, rightAng: 62, leftBend: 8, rightBend: 8, armsFront: false, armsHidden: false, leftFront: false,
  eyes: 'open', eyeScale: 1, blink: 0, lookX: 0, lookY: 0, brows: null, browAmt: 0,
  mouth: 'smile', mouthScale: 1, blush: 0.65,
  chalkA: 'rest', chalkB: 'rest', chalkT: 0, chalkSquash: 1, chalkRot: 0, bubble: 0,
});
const BAG = 'M-74,-72 L74,-72 C82,-72 88,-66 88,-56 L96,80 C96,106 78,120 52,120 L-52,120 C-78,120 -96,106 -96,80 L-88,-56 C-88,-66 -82,-72 -74,-72 Z';
const HEART = 'M0,0.9 C-0.25,0.72 -1,0.28 -1,-0.25 C-1,-0.68 -0.66,-0.98 -0.32,-0.98 C-0.13,-0.98 0,-0.86 0,-0.66 C0,-0.86 0.13,-0.98 0.32,-0.98 C0.66,-0.98 1,-0.68 1,-0.25 C1,0.28 0.25,0.72 0,0.9 Z';
const CHALK = {
  rest: { main: [[-50,-84,26],[-18,-104,32],[20,-100,30],[52,-82,24],[0,-80,30],[-4,-96,0],[44,-94,0],[0,-90,0],[30,-90,0]], sh: [[-52,-78,24],[52,-76,22]] },
  big: { main: [[-72,-104,36],[-30,-142,44],[24,-150,46],[72,-110,36],[0,-100,40],[-4,-190,26],[44,-184,20],[0,-110,0],[30,-110,0]], sh: [[-70,-96,34],[70,-94,32]] },
  heart: { main: [[-28,-150,30],[-14,-116,26],[28,-150,30],[14,-116,26],[0,-130,28],[0,-98,18],[-50,-82,20],[50,-80,18],[0,-84,24]], sh: [[-50,-78,18],[50,-76,16]] },
};
function chalk(r) {
  const A = CHALK[r.chalkA], B2 = CHALK[r.chalkB], t = r.chalkT; let s = '';
  const draw = (a, b, col, wob) => a.forEach((c, i) => {
    const d = b[i], w = wob ? 1 + 0.06 * Math.sin(Math.PI * 8 * r.bubble + i * 1.7) : 1;
    const rad = Math.max(0, lerp(c[2], d[2], t) * w);
    if (rad > .2) s += `<circle cx="${n(lerp(c[0], d[0], t))}" cy="${n(lerp(c[1], d[1], t))}" r="${n(rad)}" fill="${col}"/>`;
  });
  draw(A.sh, B2.sh, C.chalkShade, false); draw(A.main, B2.main, C.chalk, true);
  if (r.chalkB === 'heart' && t > .02) {
    const k = Math.min(1.2, t), o = Math.min(1, t * 1.5);
    s += `<path d="${HEART}" fill="${C.chalkShade}" transform="translate(4,-126) scale(${n(56 * k)})" opacity="${n(o)}"/><path d="${HEART}" fill="#fff" transform="translate(0,-130) scale(${n(54 * k)})" opacity="${n(o)}"/>`;
  }
  return `<g transform="translate(0,-76) rotate(${n(r.chalkRot)}) scale(1,${n(r.chalkSquash)}) translate(0,76)">${s}</g>`;
}
function stick(side, ang, bend, col) {
  const sx = side * 84, sy = 16, a = ang * Math.PI / 180;
  const hx = sx + Math.cos(a) * 62, hy = sy + Math.sin(a) * 62, nx = -Math.sin(a), ny = Math.cos(a);
  const cx = (sx + hx) / 2 + nx * bend * side, cy = (sy + hy) / 2 + ny * bend * side;
  return `<path d="M${sx},${sy} Q${n(cx)},${n(cy)} ${n(hx)},${n(hy)}" stroke="${col}" stroke-width="9" stroke-linecap="round" fill="none"/><circle cx="${n(hx)}" cy="${n(hy)}" r="9.5" fill="${col}"/>`;
}
function arms(r, P, layer) {
  const lf = r.armsFront || r.leftFront, rf = r.armsFront, show = fr => layer === 'all' || (layer === 'front') === fr;
  return (show(lf) ? stick(-1, r.leftAng, r.leftBend, P.feet) : '') + (show(rf) ? stick(1, r.rightAng, r.rightBend, P.feet) : '');
}
function eye(r, s, P) {
  const E = P.eye, st = d => `<path d="${d}" stroke="${E}" stroke-width="5" stroke-linecap="round" fill="none"/>`; let el;
  if (r.eyes === 'happy') el = st('M-10,3 Q0,-12 10,3');
  else if (r.eyes === 'heart') el = `<path d="${HEART}" fill="${C.heart}" transform="translate(0,1) scale(15)"/>`;
  else if (r.blink > .6) el = st('M-10,0 Q0,7 10,0');
  else el = `<ellipse cx="${n(r.lookX)}" cy="${n(r.lookY)}" rx="8.5" ry="${n(10.5 * (1 - r.blink))}" fill="${E}"/>` +
    (r.blink < .3 ? `<circle cx="${n(r.lookX + 2.8)}" cy="${n(r.lookY - 3.6)}" r="3" fill="#fff"/>` : '');
  return `<g transform="translate(${s * 30},12) scale(${n(r.eyeScale)})">${el}</g>`;
}
const BROWS = { up: [-24,-24,-24,-24], curious: [-22,-22,-30,-30] };
function brows(r, P) {
  if (!r.brows || r.browAmt <= .01) return '';
  const v = BROWS[r.brows]; let s = '';
  [-1, 1].forEach((sd, i) => {
    const x = sd * 30, xo = x + sd * 12, xi = x - sd * 10;
    const yo = 12 + v[i * 2] - 4 * (1 - r.browAmt), yi = 12 + v[i * 2 + 1] - 4 * (1 - r.browAmt);
    s += `<path d="M${xo},${n(yo)} Q${(xo + xi) / 2},${n(Math.min(yo, yi) - 5)} ${xi},${n(yi)}" stroke="${P.eye}" stroke-width="4.4" stroke-linecap="round" fill="none"/>`;
  });
  return `<g opacity="${n(Math.min(1, r.browAmt))}">${s}</g>`;
}
function mouth(r, P) {
  const S = d => `<path d="${d}" stroke="${P.eye}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`; let el;
  if (r.mouth === 'smile') el = S('M-13,-4 Q0,7 13,-4');
  else { const s = r.mouth === 'big' ? 1.4 : 1;
    el = `<g transform="scale(${s})"><path d="M-15,-6 Q0,-3 15,-6 Q13,14 0,15 Q-13,14 -15,-6 Z" fill="${P.eye}"/><path d="M-8,9 Q0,2 8,9 Q4,15 0,15 Q-4,15 -8,9 Z" fill="${C.tongue}"/></g>`; }
  return `<g transform="translate(0,38) scale(${n(r.mouthScale)})">${el}</g>`;
}
const bodyTf = r => `translate(0,120) rotate(${n(r.rot)}) scale(${n(r.sx)},${n(r.sy)}) translate(0,-120)`;
function bag(r, P, id) {
  return `<g transform="translate(${n(r.x)},${n(r.y)})">` +
    `<g transform="translate(${n(r.feetDX)},${n(r.feetY)})"><ellipse cx="${n(-40 - r.feetSpread)}" cy="${n(132 + r.footLY)}" rx="24" ry="12" fill="${P.feet}"/><ellipse cx="${n(40 + r.feetSpread)}" cy="${n(132 + r.footRY)}" rx="24" ry="12" fill="${P.feet}"/></g>` +
    `<g transform="${bodyTf(r)}">${r.armsHidden ? '' : arms(r, P, 'back')}<rect x="88" y="-20" width="16" height="40" rx="8" fill="${P.cuff}"/>` +
    `<defs><clipPath id="clip-${id}"><path d="${BAG}"/></clipPath></defs><path d="${BAG}" fill="${P.shade}"/>` +
    `<g clip-path="url(#clip-${id})"><path d="${BAG}" fill="${P.body}" transform="translate(14,-8)"/></g>` +
    chalk(r) + `<rect x="-94" y="-76" width="188" height="30" rx="15" fill="${P.cuff}"/>` +
    eye(r, -1, P) + eye(r, 1, P) + brows(r, P) + mouth(r, P) +
    `<ellipse cx="-56" cy="28" rx="11" ry="6.5" fill="${P.cheek}" opacity="${n(.8 * r.blush)}"/><ellipse cx="56" cy="28" rx="11" ry="6.5" fill="${P.cheek}" opacity="${n(.8 * r.blush)}"/>` +
    (r.armsHidden ? '' : arms(r, P, 'front')) + `</g></g>`;
}
const armsLayer = (r, P) => `<g transform="translate(${n(r.x)},${n(r.y)})"><g transform="${bodyTf(r)}">${arms(r, P, 'all')}</g></g>`;

function base(f) {
  const r = defaultRig(), br = osc(f, 50);
  r.sy = 1 + .015 * br; r.sx = 1 - .009 * br; r.rot = 1.2 * osc(f, 150);
  r.leftAng = 118 + 3 * osc(f, 50, .6); r.rightAng = 62 - 3 * osc(f, 50, .6);
  r.bubble = f / N; r.chalkSquash = 1 + .02 * osc(f, 50, .8);
  return r;
}

const CLIPS = {};
CLIPS.idle = (f, P, id) => {
  const r = base(f);
  r.lookX = kf(f, [0, 25, 35, 70, 80, 115, 125, 150], [-1, -1, 5, 5, -5, -5, -1, -1]);
  r.lookY = kf(f, [0, 30, 70, 80, 115, 150], [0, -2, -2, 1, 1, 0]);
  r.rot += r.lookX * .4 + 2 * osc(f, 75); r.x = 4 * osc(f, 75);
  r.blink = Math.max(blinkAt(f, 20), blinkAt(f, 96), blinkAt(f, 104));
  let puffs = '';
  [40, 110].forEach(b => { const a = (f - b) / 34; if (a < 0 || a > 1) return;
    for (let j = 0; j < 3; j++) puffs += `<circle cx="${n(r.x + (j - 1) * 14 + 6 * Math.sin(a * 5 + j))}" cy="${n(-150 - a * 80 - j * 10)}" r="${n((7 - j * 1.5) * (.5 + .5 * a))}" fill="#fff" opacity="${n(a > .6 ? 1 - (a - .6) / .4 : 1)}"/>`; });
  return bag(r, P, id) + puffs;
};

CLIPS.wave = (f, P, id) => {
  const r = base(f);
  const crouch = on(f, 8, 18, 14, 260, 30, 500), y = arc(f, 18, 32, 40);
  const tA = f > 18 && f < 32 ? (f - 18) / 14 : -1, imp = impact(f, 32, .7);
  squash(r, .12 * crouch + .14 * imp, tA >= 0 ? .06 * Math.abs(1 - 2 * tA) : 0);
  const up = on(f, 16, 112, 11, 150, 16, 120), w = f >= 34 && f <= 100 ? Math.sin(2 * Math.PI * (f - 34) / 22) : 0;
  r.rightAng = lerp(r.rightAng, -80, up) + 34 * w * up; r.rightBend = lerp(8, -12, up) + 6 * w * up;
  r.rot += -10 * up + 3 * w * up; squash(r, .035 * Math.max(0, w) * up);
  if (f >= 82 && f < 104) r.eyes = 'happy';
  r.y = y + 6 * crouch; r.feetY = -10 * clamp01(-y / 40);
  r.mouth = up > .3 ? 'open' : 'smile'; r.brows = 'up'; r.browAmt = up;
  r.lookX = 3 * up; r.lookY = -up; r.blush = .65 + .35 * up; r.blink = blinkAt(f, 128);
  r.chalkSquash *= 1 - .14 * crouch + .1 * imp; r.chalkRot = -3 * w * up;
  let bub = '';
  [30, 40, 50, 62, 74, 86].forEach((b, i) => { const a = (f - b) / 40; if (a < 0 || a > 1) return;
    const x = (rnd(i, 1) - .5) * 80 + 8 * Math.sin(a * 6 + i), yy = r.y - 130 - a * 130, rad = 5 + rnd(i, 2) * 6;
    bub += `<circle cx="${n(x)}" cy="${n(yy)}" r="${n(rad * (.6 + .4 * a))}" fill="#fff" opacity="${n(a > .7 ? 1 - (a - .7) / .3 : 1)}"/>`; });
  return bag(r, P, id) + bub;
};

const ST = { crouch: 34, takeoff: 46, land: 72, hop1: 86, hop2: 104, settle: 124 }, JUMP = 125;
const sendHeight = f => arc(f, ST.takeoff, ST.land, JUMP) + arc(f, ST.hop1, ST.hop1 + 12, 34) + arc(f, ST.hop2, ST.hop2 + 12, 24);
CLIPS.send = (f, P, id) => {
  const r = base(f);
  const crouch = on(f, ST.crouch, ST.takeoff, 14, 220, 30, 500), y = sendHeight(f), air = clamp01(-y / JUMP);
  const tAir = f > ST.takeoff && f < ST.land ? (f - ST.takeoff) / (ST.land - ST.takeoff) : -1;
  const imp = impact(f, ST.land) + impact(f, ST.hop1 + 12, .5) + impact(f, ST.hop2 + 12, .35);
  const preHop = .5 * on(f, ST.hop1 - 5, ST.hop1, 14, 300, 30, 500) + .35 * on(f, ST.hop2 - 5, ST.hop2, 14, 300, 30, 500);
  squash(r, .15 * crouch + .16 * imp + .12 * preHop, tAir >= 0 ? .1 * Math.abs(1 - 2 * tAir) : 0);
  const boom = sp(f, ST.takeoff, 9, 160), calm = sp(f, ST.land + 4, 14, 90), rest = sp(f, ST.settle, 16, 80);
  r.chalkB = 'big'; r.chalkT = Math.max(0, boom * (1 - .55 * calm) * (1 - rest));
  r.chalkSquash *= 1 - .18 * crouch + .12 * imp;
  const up = sp(f, ST.takeoff - 2, 10, 150) * (1 - sp(f, ST.settle, 16, 120));
  const wig = f > ST.land ? 12 * osc(f - ST.land, 20) * up : 0;
  r.leftAng = lerp(r.leftAng, 232, up) + 12 * crouch - wig; r.rightAng = lerp(r.rightAng, -52, up) - 12 * crouch + wig;
  r.leftBend = lerp(8, -6, up); r.rightBend = lerp(8, -6, up);
  r.y = y + 8 * crouch;
  r.rot += 3 * Math.sin((f - ST.land) / 7) * clamp01((f - ST.land) / 6) * (1 - rest);
  r.feetY = -14 * air; r.feetSpread = -6 * air + 6 * crouch;
  const happy = f >= ST.crouch + 4 && f < ST.settle + 8;
  r.eyes = happy ? 'happy' : 'open';
  r.blink = Math.max(blinkAt(f, 18), blinkAt(f, 140));
  r.lookX = kf(f, [0, 28, ST.settle, N], [-2, 3, 3, -2]);
  r.mouth = f >= ST.takeoff && f < ST.settle ? 'big' : f >= ST.crouch && f < ST.settle + 8 ? 'open' : 'smile';
  r.blush = happy ? 1 : .65;
  let fx = '';
  const tC = (f - (ST.takeoff + 3)) / FPS, cols = [C.coral, C.mustard, C.lavender, C.body];
  if (tC >= 0 && tC <= 1.5) for (let i = 0; i < 26; i++) {
    const vx = (rnd(i, 5) - .5) * 700, vy = -(520 + rnd(i, 6) * 340), x = vx * tC, yy = -260 + vy * tC + 575 * tC * tC;
    fx += `<rect x="-7" y="-4" width="14" height="8" rx="2" fill="${cols[i % 4]}" opacity="${n(tC > 1.1 ? 1 - (tC - 1.1) / .4 : 1)}" transform="translate(${n(x)},${n(yy)}) rotate(${n((rnd(i, 7) - .5) * 900 * tC)})"/>`;
  }
  const d = f - ST.land;
  if (d >= 0 && d <= 18) { let g = ''; [-1, 1].forEach(s => [0, 1].forEach(j => g += `<circle cx="${n(s * (80 + 80 * (d / 18) + j * 22))}" cy="${n(140 - 14 * (d / 18) - j * 8)}" r="${n((14 - j * 4) * (1 + .6 * (d / 18)))}" fill="#fff"/>`)); fx += `<g opacity="${n(1 - d / 18)}">${g}</g>`; }
  const tB = (f - ST.takeoff) / FPS;
  if (tB >= 0 && tB <= 1.6) for (let i = 0; i < 34; i++) {
    const a = -Math.PI / 2 + (rnd(i, 1) - .5) * Math.PI * 1.5, v = 260 + rnd(i, 2) * 420, dist = (v / 3.2) * (1 - Math.exp(-3.2 * tB));
    const x = Math.cos(a) * dist, yy = sendHeight(ST.takeoff + 2) - 120 + Math.sin(a) * dist + 60 * tB * tB, rad = (4 + rnd(i, 3) * 9) * (1 - tB / 1.6);
    fx += `<circle cx="${n(x)}" cy="${n(yy)}" r="${n(Math.max(0, rad))}" fill="#fff"/>`;
  }
  return fx + bag(r, P, id);
};

CLIPS.love = (f, P, id) => {
  const r = base(f), crouch = on(f, 14, 26, 14, 260, 30, 500), love = on(f, 24, 124, 10, 140, 16, 120);
  squash(r, .1 * crouch); r.chalkB = 'heart'; r.chalkT = love;
  const hearty = f >= 26 && f < 128;
  r.eyes = hearty ? 'heart' : 'open';
  r.eyeScale = hearty ? Math.max(.05, sp(f, 26, 8, 220) * (1 - sp(f, 122, 14, 200))) : 1;
  const sway = 6 * osc(f, 50) * love;
  r.leftAng = lerp(r.leftAng, 212, love) + sway; r.rightAng = lerp(r.rightAng, -32, love) + sway;
  r.leftBend = lerp(8, -10, love); r.rightBend = lerp(8, -10, love);
  squash(r, .035 * Math.max(0, osc(f, 25)) * love);
  r.blush = .65 + .35 * love; r.rot += 4 * osc(f, 50) * love; r.blink = blinkAt(f, 138);
  let fl = '';
  for (let i = 0; i < 7; i++) { const b = 36 + i * 12, a = (f - b) / 40; if (a < 0 || a > 1) continue;
    const side = i % 2 ? 1 : -1, x = side * (60 + rnd(i, 1) * 50) + 10 * Math.sin(a * 6 + i), yy = -110 - a * 140, s = (8 + rnd(i, 2) * 6) * Math.min(1, a * 5);
    fl += `<path d="${HEART}" fill="${C.heart}" transform="translate(${n(x)},${n(yy)}) scale(${n(s)})" opacity="${n(a > .7 ? 1 - (a - .7) / .3 : 1)}"/>`; }
  return bag(r, P, id) + fl;
};

const WALL = 'M-270,170 L-270,62 Q-270,46 -254,46 L254,46 Q270,46 270,62 L270,170 Z';
let PEEK_HOLES = '';
for (let gx = -238; gx <= 238; gx += 48) for (const gy of [86, 132]) PEEK_HOLES += `<circle cx="${gx}" cy="${gy}" r="4" fill="${C.wallDark}"/>`;
CLIPS.peek = (f, P, id) => {
  const r = base(f), rise = on(f, 12, 116, 10, 120, 14, 140);
  r.y = lerp(152, 4, rise);
  const grip = on(f, 26, 110, 11, 200, 18, 220);
  r.leftAng = lerp(120, 161, grip); r.rightAng = lerp(60, 19, grip); r.leftBend = 4; r.rightBend = -4; r.armsHidden = true;
  r.lookX = kf(f, [0, 36, 46, 66, 76, 100, 110, N], [0, 0, -6, -6, 6, 6, 0, 0]);
  r.rot += r.lookX * .5; r.brows = 'curious'; r.browAmt = rise; r.blink = blinkAt(f, 70);
  r.chalkSquash *= 1 + .08 * impact(f, 24, .6);
  return `<defs><clipPath id="above-${id}"><rect x="-300" y="-400" width="600" height="451"/></clipPath></defs>` + bag(r, P, id) +
    `<path d="${WALL}" fill="${C.wall}"/>${PEEK_HOLES}` +
    `<path d="M-150,110 C-140,92 -108,94 -106,112 C-104,128 -140,132 -150,110 Z" fill="${C.coral}"/>` +
    `<path d="M106,140 C110,122 150,118 156,134 C160,148 120,156 106,140 Z" fill="${C.mustard}"/>` +
    `<path d="M-40,92 C-34,78 -6,80 -4,94 C-2,106 -36,108 -40,92 Z" fill="${C.lavender}"/>` +
    `<path d="M150,74 C156,64 176,66 178,76 C180,86 154,88 150,74 Z" fill="${C.body}"/>` +
    `<path d="M-230,150 C-224,138 -200,140 -198,150 C-196,160 -226,162 -230,150 Z" fill="${C.body}"/>` +
    `<path d="M20,150 C26,140 46,142 48,152 C50,160 22,162 20,150 Z" fill="${C.coral}"/>` +
    `<g clip-path="url(#above-${id})">${armsLayer(r, P)}</g>`;
};

/* ---------- Player: one clock for every visible Crux ---------- */
const players = [];
const io = new IntersectionObserver(es => es.forEach(e => { const p = players.find(p => p.el === e.target); if (p) p.visible = e.isIntersecting; }), { rootMargin: '80px' });
class Player {
  constructor(el, { clip = 'idle', skin = SK.classic, still = 60, viewBox = '-270 -380 540 540', f = 0, then = null, fps30 = false } = {}) {
    Object.assign(this, { el, clip, P: skin, f: REDUCED ? still : f, still, then, fps30, lastDrawn: -1, visible: false, frozen: false, id: 'c' + players.length });
    if (!el.getAttribute('viewBox')) el.setAttribute('viewBox', viewBox);
    this.g = document.createElementNS(NS, 'g'); el.appendChild(this.g);
    players.push(this); io.observe(el);
    this.draw();
  }
  play(clip, from = 0, then = null) { this.clip = clip; this.f = REDUCED ? this.still : from; this.then = then; this.draw(); }
  skin(P) { this.P = P; this.draw(); }
  seek(f) { this.f = Math.max(0, Math.min(N - 1, f)); this.draw(); }
  tick(dt) {
    this.f += dt * FPS;
    if (this.f >= N) { if (this.then) { const t = this.then; this.then = null; t(this); return; } this.f -= N; }
    if (this.fps30 && Math.floor(this.f) === this.lastDrawn) return;
    this.draw();
  }
  draw() { this.lastDrawn = Math.floor(this.f); this.g.innerHTML = CLIPS[this.clip](this.f, this.P, this.id, {}); }
}
const tickers = [];
let last = performance.now();
function loop(now) {
  const dt = Math.min(.05, (now - last) / 1000); last = now;
  if (!REDUCED) for (const p of players) if (p.visible && !p.frozen) p.tick(dt);
  for (const t of tickers) t(dt, now);
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

/* A still Crux hanging from two straps (used on the wordmark). */
function hanging(P = SK.classic, id = 'hang') {
  const r = defaultRig();
  Object.assign(r, { leftAng: 102, rightAng: 78, leftBend: 4, rightBend: 4, feetY: 6, feetSpread: -6, blush: .9 });
  return `<path d="M0,-196 L-80,-62 M0,-196 L80,-62" stroke="${P.cuff}" stroke-width="11" stroke-linecap="round" fill="none"/>` + bag(r, P, id);
}

return { Player, SKINS, SK, CLIPS, C, N, FPS, REDUCED, tickers, hanging, bag, defaultRig, spring };
})();
