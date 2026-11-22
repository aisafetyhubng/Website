/* Small page behaviours shared by every page. Everything here is progressive: the site works without it. */

const body = document.body;
const lookText = document.getElementById('look-txt');

/* "Pixel row" backgrounds in brand colours, echoing the squares in the logo. */
function drawMosaic(canvas: HTMLCanvasElement) {
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  if (!w || !h) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  const c = canvas.getContext('2d');
  if (!c) return;
  c.setTransform(dpr, 0, 0, dpr, 0, 0);
  const cs = getComputedStyle(body);
  const cols = ['--hero-a', '--hero-b', '--hero-c', '--hero-d'].map((k) => {
    const s = cs.getPropertyValue(k).trim().replace('#', '');
    return [parseInt(s.slice(0, 2), 16), parseInt(s.slice(2, 4), 16), parseInt(s.slice(4, 6), 16)];
  });
  let seed = Number(canvas.dataset.seed || 7);
  const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  const mix = (t: number) => {
    t = Math.max(0, Math.min(0.999, t)) * (cols.length - 1);
    const i = Math.floor(t), f = t - i, a = cols[i], b = cols[i + 1];
    return `rgb(${Math.round(a[0] + (b[0] - a[0]) * f)},${Math.round(a[1] + (b[1] - a[1]) * f)},${Math.round(a[2] + (b[2] - a[2]) * f)})`;
  };
  const row = Math.max(5, Math.round(h / 64));
  for (let y = 0; y < h; y += row) {
    let x = 0;
    const base = 0.5 + 0.42 * Math.sin((y / h) * 3.1 + 0.6) * Math.cos((y / h) * 1.3);
    while (x < w) {
      const seg = 8 + rnd() * (rnd() < 0.18 ? 220 : 60);
      c.fillStyle = mix(base + 0.38 * Math.sin((x / w) * 4.2 + (y / h) * 2.5) + (rnd() - 0.5) * 0.22);
      c.fillRect(x, y, seg + 1, row + 1);
      x += seg;
    }
  }
}
const drawAll = () => document.querySelectorAll<HTMLCanvasElement>('canvas.mosaic').forEach(drawMosaic);

/* Teal / cream switch, remembered per visitor. */
function applyLook(look: string | null) {
  if (look === 'warm') body.setAttribute('data-look', 'warm');
  else body.removeAttribute('data-look');
  if (lookText) lookText.textContent = look === 'warm' ? 'Teal' : 'Cream';
  drawAll();
}
applyLook(body.getAttribute('data-look'));
document.getElementById('look')?.addEventListener('click', () => {
  const next = body.getAttribute('data-look') === 'warm' ? 'teal' : 'warm';
  applyLook(next);
  try { localStorage.setItem('ashn-look', next); } catch { /* storage blocked */ }
});
let resizeTimer: number | undefined;
window.addEventListener('resize', () => {
  window.clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(drawAll, 120);
});

/* Programmes dropdown: hover on desktop, click/keyboard everywhere. */
const dd = document.querySelector<HTMLElement>('.dd');
if (dd) {
  dd.querySelector('button')?.addEventListener('click', () => dd.classList.toggle('open'));
  document.addEventListener('click', (e) => { if (!dd.contains(e.target as Node)) dd.classList.remove('open'); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') dd.classList.remove('open'); });
}

/* Mobile menu. */
const menu = document.getElementById('menu');
const drawer = document.getElementById('drawer');
if (menu && drawer) {
  menu.addEventListener('click', () => {
    const open = drawer.classList.toggle('open');
    menu.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  drawer.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).tagName === 'A') {
      drawer.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
    }
  });
}

/* Newsletter: check the address, then let the form post to Substack. */
document.querySelectorAll<HTMLFormElement>('form.sub-form').forEach((form) => {
  const input = form.querySelector('input') as HTMLInputElement;
  const msg = form.parentElement?.querySelector('.form-msg');
  form.addEventListener('submit', (e) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
      e.preventDefault();
      if (msg) msg.textContent = 'Enter a valid email address.';
      return;
    }
    if (msg) msg.textContent = 'Almost done. Confirm your subscription in the Substack tab that just opened.';
  });
  input.addEventListener('input', () => { if (msg) msg.textContent = ''; });
});

/* Copy buttons (contact page). */
document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((btn) => {
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy || '');
      btn.textContent = 'Copied';
    } catch {
      const target = btn.previousElementSibling;
      if (target) {
        const range = document.createRange();
        range.selectNodeContents(target);
        const sel = getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
      btn.textContent = 'Selected';
    }
    setTimeout(() => { btn.textContent = 'Copy'; }, 1600);
  });
});

/* Timeline (about page): the card sits above the selected date. */
const tl = document.querySelector<HTMLElement>('[data-timeline]');
if (tl) {
  const card = tl.querySelector<HTMLElement>('.tl-card')!;
  const buttons = Array.from(tl.querySelectorAll<HTMLButtonElement>('.tl-line button'));
  const place = (b: HTMLButtonElement) => {
    const li = b.parentElement as HTMLElement;
    const list = li.parentElement as HTMLElement;
    const max = tl.clientWidth - card.offsetWidth;
    const x = li.offsetLeft - list.scrollLeft - card.offsetWidth / 2 + 4;
    card.style.marginLeft = `${Math.max(0, Math.min(max, x))}px`;
  };
  const show = (b: HTMLButtonElement) => {
    buttons.forEach((x) => x.setAttribute('aria-pressed', x === b ? 'true' : 'false'));
    card.querySelector('.when')!.textContent = b.dataset.when || '';
    card.querySelector('h3')!.textContent = b.dataset.title || '';
    card.querySelector('p')!.textContent = b.dataset.text || '';
    place(b);
  };
  buttons.forEach((b) => b.addEventListener('click', () => show(b)));
  window.addEventListener('resize', () => {
    const on = tl.querySelector<HTMLButtonElement>('[aria-pressed="true"]');
    if (on) place(on);
  });
  show(buttons[buttons.length - 1]);
}
