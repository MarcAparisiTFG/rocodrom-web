/* rocodrom.com — page behaviour: languages, the pinned phone, scroll motion, live Crux. */
(() => {
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
const wide = matchMedia('(min-width: 900px)');
const { Player, SK, SKINS } = window.Crux;
const MOTION = !!window.gsap && !REDUCED;
if (window.gsap) gsap.registerPlugin(ScrollTrigger);
const EXPO = 'expo.out';
const clamp01 = v => Math.max(0, Math.min(1, v));

/* ------------------------------------------------------------------ languages */
const LANGS = Object.keys(I18N);
let lang = 'es';
function pickLang() {
  const q = new URLSearchParams(location.search).get('lang');
  if (q && I18N[q]) return q;
  try { const s = localStorage.getItem('lang'); if (s && I18N[s]) return s; } catch (e) {}
  for (const l of navigator.languages || [navigator.language || 'es']) {
    const k = l.slice(0, 2).toLowerCase();
    if (I18N[k]) return k;
  }
  return 'en';
}
function t(path) {
  let v = I18N[lang];
  for (const k of path.split('.')) v = v == null ? v : v[k];
  if (typeof v === 'string' && lang === 'fr') v = v.replace(/ ([?!:;»])/g, ' $1').replace(/« /g, '« ');
  return v;
}
function lines(el, arr) {
  el.textContent = '';
  arr.forEach(s => {
    const ln = document.createElement('span');
    ln.className = /[ÀÁÂÃÄÅÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÑ]/.test(s.toUpperCase()) ? 'ln acc' : 'ln';
    const inner = document.createElement('span');
    inner.textContent = lang === 'fr' ? s.replace(/ ([?!:;])/g, ' $1') : s;
    ln.appendChild(inner); el.appendChild(ln);
  });
}
function applyLang(next, first) {
  lang = next;
  document.documentElement.lang = lang;
  document.title = t('title');
  $('meta[name="description"]').content = t('desc');
  $$('[data-i18n]').forEach(el => { const v = t(el.dataset.i18n); if (v != null) el.textContent = v; });
  $$('[data-i18n-lines]').forEach(el => lines(el, t(el.dataset.i18nLines)));
  $$('[data-i18n-aria]').forEach(el => el.setAttribute('aria-label', t(el.dataset.i18nAria)));
  $$('[data-i18n-alt]').forEach(el => { el.alt = t(el.dataset.i18nAlt); });
  $('#langCode').textContent = lang.toUpperCase();
  $$('#langMenu button').forEach(b => b.setAttribute('aria-selected', b.dataset.lang === lang));
  $$('#footLangs button').forEach(b => b.setAttribute('aria-current', b.dataset.lang === lang));
  if (!first) {
    try { localStorage.setItem('lang', lang); } catch (e) {}
    fit(); measure(); track(true);
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  }
}
function buildLangUI() {
  const menu = $('#langMenu'), foot = $('#footLangs'), btn = $('#langBtn');
  LANGS.forEach(k => {
    const b = document.createElement('button');
    b.type = 'button'; b.setAttribute('role', 'option'); b.dataset.lang = k;
    b.innerHTML = `${I18N[k].name}<span>${k.toUpperCase()}</span>`;
    b.addEventListener('click', () => { applyLang(k); close(); btn.focus(); });
    menu.appendChild(b);
    const f = document.createElement('button');
    f.type = 'button'; f.dataset.lang = k; f.lang = k; f.textContent = I18N[k].name;
    f.addEventListener('click', () => applyLang(k));
    foot.appendChild(f);
  });
  const close = () => { menu.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); };
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
    if (open) (menu.querySelector('[aria-selected="true"]') || menu.firstChild).focus();
  });
  document.addEventListener('click', e => { if (!menu.contains(e.target)) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu.classList.contains('open')) { close(); btn.focus(); } });
}

/* ------------------------------------------------------------------ wall-scale type: fit every headline to its column */
function fit() {
  const vh = innerHeight, big = wide.matches;
  $$('.shout').forEach(h => {
    h.style.fontSize = '';
    const max = parseFloat(getComputedStyle(h).fontSize);
    const avail = h.clientWidth;
    const spans = $$('.ln > span', h);
    let widest = 0;
    spans.forEach(s => { widest = Math.max(widest, s.getBoundingClientRect().width); });
    if (!widest || !avail) return;
    let fs = Math.min(max, max * avail / widest * .992);
    if (big && h.dataset.maxh) fs = Math.min(fs, (vh * h.dataset.maxh / 100) / (spans.length * .88));
    h.style.fontSize = Math.max(34, fs).toFixed(1) + 'px';
  });
}

/* ------------------------------------------------------------------ the frame: which circuit are we on */
const fields = $$('.field');
const legend = $$('.legend li');
const screenBox = $('#screen');
const shots = {};       // id -> <img> in the pinned phone
const order = [];       // every screen, in scroll order
let metrics = [], active = -1, shown = null;

fields.forEach((f, i) => {
  f._screens = (f.dataset.screens || '').split(',').filter(Boolean);
  f._screens.forEach(id => order.push({ id, field: i }));
});
function buildStage() {
  order.forEach(({ id }) => {
    const img = new Image();
    img.alt = ''; img.decoding = 'async'; img.dataset.src = `assets/img/app-${id}.webp`;
    screenBox.appendChild(img); shots[id] = img;
  });
}
const load = id => { const img = shots[id]; if (img && !img.src) img.src = img.dataset.src; };
function show(id, fieldIndex) {
  if (id === shown || !shots[id]) return;
  load(id);
  const k = order.findIndex(o => o.id === id);
  if (order[k + 1]) load(order[k + 1].id);
  if (shown) shots[shown].classList.remove('is-on');
  shots[id].classList.add('is-on');
  shown = id;
  screenBox.setAttribute('aria-label', t('a.' + fieldIndex) || '');
}
function measure() {
  metrics = fields.map(f => { const r = f.getBoundingClientRect(); return { top: r.top + scrollY, h: r.height }; });
}
function track(force) {
  const mid = scrollY + innerHeight * .5;
  let i = 0;
  for (let k = 0; k < metrics.length; k++) if (mid >= metrics[k].top) i = k;
  if (i !== active || force) {
    active = i;
    legend.forEach((li, k) => {
      li.classList.toggle('is-on', k <= i);
      li.classList.toggle('is-now', k === i);
      if (k === i) li.firstElementChild.setAttribute('aria-current', 'true'); else li.firstElementChild.removeAttribute('aria-current');
    });
    $('#whereName').textContent = t('c.' + i);
    $('#whereLevel').textContent = fields[i].dataset.level;
    document.body.classList.toggle('on-dark', i === fields.length - 1);
    document.body.classList.toggle('at-start', i === 0);
    document.documentElement.style.setProperty('--now', i === fields.length - 1 ? '#7B828D' : `var(--c${i + 1})`);
  }
  const f = fields[i];
  if (wide.matches && f._screens.length) {
    const p = clamp01((mid - metrics[i].top) / metrics[i].h);
    show(f._screens[Math.min(f._screens.length - 1, Math.floor(p * f._screens.length))], i);
  }
}
let ticking = false;
addEventListener('scroll', () => {
  if (ticking) return; ticking = true;
  requestAnimationFrame(() => { ticking = false; track(); });
}, { passive: true });

/* ------------------------------------------------------------------ live Crux */
function heroCrux(el) {
  const p = new Player(el, { clip: 'idle', still: 60 });
  const top = () => p.play('send', 20, () => p.play('love', 8, () => p.play('idle', 0)));
  el.addEventListener('click', top);
  return { p, top };
}
function parade() {
  const track = $('#parade');
  const clips = ['idle', 'wave', 'love', 'idle', 'wave'];
  const list = [...SKINS, ...SKINS.slice(0, 4)];
  list.forEach((skin, i) => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '-150 -250 300 410');
    track.appendChild(svg);
    const clip = clips[i % clips.length];
    const p = new Player(svg, { clip, skin, still: 40 + i * 7, f: (i * 37) % 150, fps30: true });
    svg.addEventListener('click', () => p.play('send', 30, () => p.play(clip, 0)));
  });
  return track;
}

/* ------------------------------------------------------------------ motion */
function motion(hero) {
  const mm = gsap.matchMedia();

  // The start: the headline rises line by line, the phone climbs in, Crux tops out.
  const intro = gsap.timeline({ defaults: { ease: EXPO } });
  intro.to('.f1 .shout .ln > span', { y: 0, duration: 1.1, stagger: .09 }, .1)
    .to(['.f1 .lead', '.f1 .act', '.f1 .start'], { opacity: 1, duration: .9, stagger: .08 }, .55)
    .from(['.f1 .lead', '.f1 .act'], { y: 18, duration: .9, stagger: .08 }, .55)
    .from(wide.matches ? '.phone-in' : '.f1 .shot', { yPercent: 34, opacity: 0, duration: 1.3 }, .25)
    .add(() => hero.top(), 1.05)
    .add(() => document.documentElement.classList.remove('anim'));

  // Panel cuts: each field arrives steep and settles as it takes the screen.
  fields.slice(1).forEach(f => {
    gsap.fromTo(f, { '--cut-s': 2.3 }, {
      '--cut-s': 1, ease: 'none',
      scrollTrigger: { trigger: f, start: 'top bottom', end: 'top 45%', scrub: true },
    });
  });

  // Headlines rise out of their line, body and tag follow; tags swing to rest from the hole.
  fields.slice(1).forEach(f => {
    const tl = gsap.timeline({ defaults: { ease: EXPO }, scrollTrigger: { trigger: f, start: 'top 58%', once: true } });
    tl.from($$('.shout .ln > span', f), { yPercent: 112, duration: 1, stagger: .08 }, 0);
    const body = $$('.body, .act, .col > .hand', f);
    if (body.length) tl.from(body, { opacity: 0, y: 18, duration: .9, stagger: .08 }, .3);
    const tag = $('.tag', f);
    if (tag) tl.from(tag, { opacity: 0, rotate: '-=9', y: 26, duration: 1.2 }, .42);
    const rows = $$('.score li', f);
    if (rows.length) {
      tl.from($$('.score h3', f), { opacity: 0, duration: .6 }, .4);
      tl.from(rows, { opacity: 0, y: 14, duration: .7, stagger: .07 }, .45);
      rows.forEach((li, k) => {
        const b = $('b', li), txt = b.textContent, m = txt.match(/^(\D*)(\d+)([.,](\d+))?$/);
        if (!m) return;
        const target = parseFloat(m[2] + (m[4] ? '.' + m[4] : '')), o = { v: m[4] ? 1 : 0 };
        tl.to(o, {
          v: target, duration: .9, ease: 'power3.out',
          onUpdate: () => { b.textContent = m[1] + (m[4] ? o.v.toFixed(m[4].length).replace('.', m[3][0]) : Math.round(o.v)); },
          onComplete: () => { b.textContent = t(b.dataset.i18n); },
        }, .5 + k * .07);
      });
    }
  });

  mm.add('(min-width: 900px)', () => {
    // The pinned phone: tilted on the start hold, upright once the climb begins, a slight lean per field.
    gsap.fromTo('#phone', { rotate: 6.5, yPercent: 12, xPercent: -4 }, {
      rotate: 0, yPercent: 0, xPercent: 0, ease: 'none',
      scrollTrigger: { trigger: '#blanco', start: 'top top', end: 'bottom 62%', scrub: .5 },
    });
    gsap.to('#heroCrux', {
      opacity: 0, y: -24, ease: 'none',
      scrollTrigger: { trigger: '#blanco', start: '18% top', end: '55% top', scrub: true },
    });
    const lean = k => (k === 0 ? 0 : k % 2 ? -1.6 : 1.6);
    fields.slice(1, 7).forEach((f, k) => {
      gsap.fromTo('.phone-in', { rotate: lean(k) }, {
        rotate: lean(k + 1), ease: 'none', immediateRender: false,
        scrollTrigger: { trigger: f, start: 'top 50%', end: 'bottom 50%', scrub: .6 },
      });
    });
  });
  mm.add('(max-width: 899.98px)', () => {
    $$('.field:not(.f1) .shot').forEach(s => {
      gsap.from(s, {
        y: 60, rotate: '+=4', opacity: 0, duration: 1.2, ease: EXPO,
        scrollTrigger: { trigger: s, start: 'top 88%', once: true },
      });
    });
  });

  // The parade walks past as you scroll through the purple field.
  const tr = $('#parade');
  gsap.fromTo(tr, { x: () => innerWidth * .12 }, {
    x: () => -(tr.scrollWidth - (innerWidth - tr.parentElement.offsetLeft)) - 24, ease: 'none',
    scrollTrigger: { trigger: '.parade', start: 'top bottom', end: 'bottom top', scrub: .4, invalidateOnRefresh: true },
  });

  // The top.
  gsap.from('.f8 .tape', {
    rotate: -9, scale: 1.25, opacity: 0, duration: 1.1, ease: EXPO, delay: .55,
    scrollTrigger: { trigger: '#negro', start: 'top 58%', once: true },
  });

}

/* ------------------------------------------------------------------ boot */
function boot() {
  buildLangUI();
  buildStage();
  applyLang(pickLang(), true);
  fit(); measure(); track(true);

  const hero = heroCrux($(wide.matches ? '#heroCrux' : '#heroCruxM'));
  if (wide.matches) heroCrux($('#heroCruxM')); else heroCrux($('#heroCrux'));
  parade();
  new Player($('#peek'), { clip: 'peek', still: 70, viewBox: '-270 -200 540 370' });

  if (MOTION) motion(hero);
  else { document.documentElement.classList.remove('anim'); document.documentElement.classList.add('still'); }

  const relayout = () => { fit(); measure(); track(true); if (window.ScrollTrigger) ScrollTrigger.refresh(); };
  let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(relayout, 120); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(relayout);
  addEventListener('load', relayout);

  // Preload the remaining screens quietly once the page is idle.
  const idle = window.requestIdleCallback || (fn => setTimeout(fn, 1500));
  idle(() => { if (wide.matches) order.forEach((o, k) => setTimeout(() => load(o.id), k * 250)); });
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
