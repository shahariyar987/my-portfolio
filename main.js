(() => {
const $ = (s, c = document) => c.querySelector(s), $$ = (s, c = document) => [...c.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const PAGE = document.body.dataset.page;
const store = {
  get(k, s) { try { return (s ? sessionStorage : localStorage).getItem(k) } catch (e) { return null } },
  set(k, v, s) { try { (s ? sessionStorage : localStorage).setItem(k, v) } catch (e) {} }
};
const toast = msg => { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('show'), 2200); };
const copy = (txt, label) => { (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(() => toast(label + ' copied ✓')).catch(() => toast(txt)); };
const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const esc = s => String(s).replace(/</g, '&lt;');
$$('.yr').forEach(e => e.textContent = new Date().getFullYear());

const PAGES = [
  { href: 'index.html', id: 'home', label: 'Home', ico: '🏠' },
  { href: 'research.html', id: 'research', label: 'Research', ico: '🔬' },
  { href: 'projects.html', id: 'projects', label: 'Projects', ico: '🚀' },
  { href: 'skills.html', id: 'skills', label: 'Skills', ico: '🧰' },
  { href: 'journey.html', id: 'journey', label: 'Journey', ico: '🎓' },
  { href: 'contact.html', id: 'contact', label: 'Contact', ico: '✉️' }
];

/* ---------- icons ---------- */
const ICON = {
  linkedin: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.6 8.65 21 11.3 21 14.7V21h-4v-5.6c0-1.34-.03-3.06-1.86-3.06-1.87 0-2.15 1.46-2.15 2.96V21H9z"/></svg>',
  github: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 016 0C17.3 4.7 18.3 5 18.3 5c.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.1 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0012 .5z"/></svg>',
  facebook: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.8c0-.9.3-1.5 1.6-1.5h1.6V3.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.4H7.6V13h2.7v8z"/></svg>',
  scholar: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L1 9l11 6 9-4.9V17h2V9zM5 13.2v4L12 21l7-3.8v-4L12 17z"/></svg>',
  mail: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="M2 7l10 6 10-6"/></svg>',
  phone: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L8 9.9a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.8.7a2 2 0 011.7 2z"/></svg>',
  pin: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s7-6.3 7-12a7 7 0 10-14 0c0 5.7 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  sun: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4l1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  moon: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/></svg>',
  ext: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M8 7h9v9"/></svg>'
};

/* ---------- preloader (first visit of the session only) ---------- */
(() => {
  const ld = $('#loader'); if (!ld) return;
  if (store.get('booted', true) || PAGE !== 'home') { ld.remove(); return; }
  store.set('booted', '1', true);
  const steps = ['> booting portfolio.sys', '> loading research.model', '> compiling projects', '> ready.'];
  let p = 0;
  const iv = setInterval(() => {
    p = Math.min(100, p + 9 + Math.random() * 16); $('#ld-fill').style.width = p + '%';
    $('#ld-text').textContent = steps[Math.min(steps.length - 1, Math.floor(p / 26))];
    if (p >= 100) { clearInterval(iv); setTimeout(() => ld.classList.add('done'), 250); }
  }, reduce ? 10 : 90);
})();

/* ---------- page transitions ---------- */
const curtain = $('#curtain');
requestAnimationFrame(() => curtain.classList.add('off'));
addEventListener('pageshow', e => { if (e.persisted) { curtain.classList.remove('on'); curtain.classList.add('off'); } });
const goTo = url => { if (reduce) return (location.href = url); curtain.classList.remove('off'); curtain.classList.add('on'); setTimeout(() => location.href = url, 380); };
document.addEventListener('click', e => {
  const a = e.target.closest('a[href]'); if (!a || a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey) return;
  const href = a.getAttribute('href');
  if (/^[a-z-]+\.html(#.*)?$/.test(href)) {
    const [file, hash] = href.split('#');
    if (file === (location.pathname.split('/').pop() || 'index.html') && hash) return;
    e.preventDefault(); goTo(href);
  }
});

/* ---------- theme ---------- */
const setTheme = t => { document.documentElement.dataset.theme = t; $('#theme-btn').innerHTML = t === 'dark' ? ICON.sun : ICON.moon; store.set('theme', t); };
setTheme(store.get('theme') || 'dark');
$('#theme-btn').onclick = () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');

/* ---------- nav ---------- */
$('#nav-links').innerHTML = PAGES.slice(1).map(p => `<li><a href="${p.href}" class="${p.id === PAGE ? 'active' : ''}">${p.label}</a></li>`).join('');
$('#menu-btn').onclick = () => $('#nav-links').classList.toggle('open');

/* ---------- socials ---------- */
const socialsHTML = () => {
  const soc = Object.entries(DATA.socials).filter(([, v]) => v).map(([k, v]) => `<a href="${v}" target="_blank" rel="noopener" aria-label="${k}" title="${k}">${ICON[k]}</a>`);
  soc.push(`<a href="mailto:${DATA.email}" aria-label="email" title="Email">${ICON.mail}</a>`);
  return soc.join('');
};
$$('.socials').forEach(s => s.innerHTML = socialsHTML());

/* ---------- next-page card ---------- */
(() => {
  const el = $('#next-page'); if (!el) return;
  const i = PAGES.findIndex(p => p.id === PAGE), nx = PAGES[(i + 1) % PAGES.length];
  el.href = nx.href;
  el.innerHTML = `<div><small>Next page →</small><h3>${nx.ico} <span class="grad-text">${nx.label}</span></h3></div><span class="circle">→</span>`;
})();

/* ---------- typer ---------- */
(() => {
  const el = $('#typer'); if (!el) return; let r = 0, c = 0, del = false;
  const tick = () => {
    const w = DATA.roles[r]; el.textContent = w.slice(0, c);
    if (!del && c === w.length) { del = true; return setTimeout(tick, 1600); }
    if (del && c === 0) { del = false; r = (r + 1) % DATA.roles.length; }
    c += del ? -1 : 1; setTimeout(tick, del ? 35 : 75);
  };
  reduce ? (el.textContent = DATA.roles[0]) : tick();
})();

/* ---------- live counts (data-count="all" | type) ---------- */
$$('[data-count]').forEach(el => { const t = el.dataset.count; el.textContent = t === 'all' ? DATA.projects.length : DATA.projects.filter(p => t.split('|').includes(p.type)).length; });

/* ---------- hide CV buttons if resume.pdf isn't uploaded yet ---------- */
if (location.protocol.startsWith('http')) fetch(DATA.resume, { method: 'HEAD' }).then(r => { if (!r.ok) $$(`a[href="${DATA.resume}"]`).forEach(a => a.style.display = 'none'); }).catch(() => {});

/* ---------- photo ---------- */
$$('.photo-img').forEach(img => { img.src = DATA.photo; });

/* ---------- marquee ---------- */
if ($('#marquee')) {
  const mq = ['Large Language Models', 'Natural Language Processing', 'Machine Learning', 'XGBoost', 'Next.js', 'Security', 'C++', 'Python', 'TypeScript', 'Supabase', 'IoT', 'Robotics', 'Teaching', 'Research'];
  $('#marquee').innerHTML = [...mq, ...mq].map(t => `<span>${t}</span>`).join('');
}

/* ---------- stats ---------- */
DATA.stats.forEach(s => { if (s.auto === 'projects') s.n = DATA.projects.length; });
if ($('#stats')) $('#stats').innerHTML = DATA.stats.map(s => `<div class="card spot stat reveal"><div class="num grad-text" data-n="${s.n}" data-dec="${s.dec || 0}" data-suf="${s.suf}">0</div><div class="lbl">${s.lbl}</div></div>`).join('');
const countUp = el => {
  const n = +el.dataset.n, dec = +el.dataset.dec, suf = el.dataset.suf, t0 = performance.now(), dur = 1600;
  const step = now => { const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3); el.textContent = (n * e).toFixed(dec) + suf; if (k < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
};

/* ---------- explore cards (home) ---------- */
if ($('#explore')) {
  const ex = [
    { id: 'research', d: 'LLMs, NLP, ML and security — the questions I want to spend the next decade on, plus a live tokenizer demo.', foot: `${DATA.research.length} areas · ${DATA.questions.length} open questions`, wide: true },
    { id: 'projects', d: 'ML price forecasting, full-stack Next.js apps, robots and IoT — each with full details and GitHub source.', foot: `${DATA.projects.length} projects` },
    { id: 'skills', d: 'The languages, tools and fundamentals I build with.', foot: `${DATA.skills.reduce((a, s) => a + s.items.length, 0)} skills` },
    { id: 'journey', d: 'Education at UIU and my years of teaching students.', foot: `${DATA.education.length + DATA.teaching.length} milestones` },
    { id: 'contact', d: 'Open to research assistant roles, internships and collaborations.', foot: 'replies within a day' }
  ];
  $('#explore').innerHTML = ex.map((x, i) => { const p = PAGES.find(p => p.id === x.id); return `<a href="${p.href}" class="card spot ex-card reveal${x.wide ? ' wide' : ''}" style="transition-delay:${i * 70}ms"><span class="ex-n">0${i + 1} / 0${ex.length}</span><div class="ex-ico">${p.ico}</div><h3>${p.label}<span class="arrow">↗</span></h3><p>${x.d}</p><div class="ex-foot">// ${x.foot}</div></a>`; }).join('');
}

/* ---------- terminal (home) ---------- */
(() => {
  const body = $('#term-body'); if (!body) return;
  const intro = [
    ['<span class="p">❯</span> whoami', 300],
    ['<span class="s">"Md. Al Shahariyar"</span> <span class="c">// CSE undergrad @ UIU</span>', 200],
    ['<span class="p">❯</span> cat interests.json', 300],
    ['{ <span class="k">"primary"</span>: <span class="s">"AI & ML"</span>, <span class="k">"direction"</span>: <span class="s">"LLMs"</span>,', 80],
    ['&nbsp;&nbsp;<span class="k">"nlp"</span>: <span class="s">true</span>, <span class="k">"security"</span>: <span class="s">true</span> }', 200],
    ['<span class="p">❯</span> echo $GOAL', 300],
    ['<span class="s">Higher studies → research → academia</span>', 200],
    ['<span class="c"># try: help, projects, research, cd projects, contact, clear</span>', 0]
  ];
  let started = false;
  const print = h => { const d = document.createElement('div'); d.innerHTML = h; body.appendChild(d); body.scrollTop = body.scrollHeight; };
  const run = async () => { if (started) return; started = true; for (const [l, w] of intro) { print(l); await new Promise(r => setTimeout(r, reduce ? 0 : w + 180)); } };
  new IntersectionObserver((e, o) => { if (e[0].isIntersecting) { run(); o.disconnect(); } }, { threshold: .4 }).observe(body);
  const cmds = {
    help: () => 'commands: <span class="k">whoami, skills, projects, research, education, teaching, contact, cv, theme, cd &lt;page&gt;, clear</span>',
    whoami: () => `<span class="s">${DATA.name}</span> — CSE @ UIU, aspiring researcher`,
    skills: () => DATA.skills.map(s => `<span class="k">${s.cat}:</span> ${s.items.join(', ')}`).join('<br>'),
    projects: () => DATA.projects.map((p, i) => `<span class="k">[${i + 1}]</span> ${p.title} <span class="c">— ${p.sub}</span>`).join('<br>') + '<br><span class="c"># cd projects to see them all</span>',
    research: () => DATA.research.map(r => `<span class="k">${r.ico}</span> ${r.t}`).join('<br>'),
    education: () => DATA.education.map(e => `<span class="k">${e.when}</span> ${e.t}`).join('<br>'),
    teaching: () => DATA.teaching.map(e => `<span class="k">${e.when}</span> ${e.t}`).join('<br>'),
    contact: () => `<span class="k">email:</span> ${DATA.email}<br><span class="k">phone:</span> ${DATA.phone}`,
    cv: () => { window.open(DATA.resume, '_blank'); return 'opening resume…'; },
    theme: () => { $('#theme-btn').click(); return 'theme toggled ✓'; },
    ls: () => PAGES.map(p => `<span class="k">${p.id}/</span>`).join('  '),
    cd: arg => { const p = PAGES.find(p => p.id === arg); if (!p) return `cd: no such page: ${esc(arg || '')} — try <span class="k">ls</span>`; setTimeout(() => goTo(p.href), 300); return `navigating to ${p.label}…`; },
    sudo: () => '<span class="s">nice try 😄 — permission denied</span>',
    clear: () => { body.innerHTML = ''; return null; }
  };
  $('#term-in').addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;
    const v = e.target.value.trim(); e.target.value = ''; if (!v) return;
    print(`<span class="p">❯</span> ${esc(v)}`);
    const [c, arg] = v.toLowerCase().split(/\s+/), f = cmds[c];
    const out = f ? f(arg) : `command not found: ${esc(v)} — try <span class="k">help</span>`;
    if (out) print(out);
  });
})();

/* ---------- research page ---------- */
if ($('#research-grid')) $('#research-grid').innerHTML = DATA.research.map((r, i) => `<div class="card spot r-card reveal" style="transition-delay:${i * 80}ms"><div class="r-ico">${r.ico}</div><h4>${r.t}</h4><p>${r.d}</p><div class="tag">// ${r.tag}</div></div>`).join('');
if ($('#questions')) {
  $('#questions').innerHTML = DATA.questions.map((q, i) => `<div class="card spot q reveal"><span class="qn">${String(i + 1).padStart(2, '0')}</span><div><h4>${q.q}</h4><div class="qa">${q.a}</div></div><span class="plus">+</span></div>`).join('');
  $$('.q').forEach(q => q.onclick = () => q.classList.toggle('open'));
}
if ($('#roadmap')) $('#roadmap').innerHTML = DATA.roadmap.map((r, i) => `<div class="card spot rm ${r.cls} reveal" style="transition-delay:${i * 90}ms"><span class="phase"><i></i>${r.phase}</span><h4>${r.t}</h4><ul>${r.items.map(x => `<li>${x}</li>`).join('')}</ul></div>`).join('');

/* ---------- tokenizer playground ---------- */
(() => {
  const box = $('#tokens'), inp = $('#pg-in'); if (!box) return;
  const vocab = ['ing', 'tion', 'ment', 'ness', 'able', 'ize', 'ers', 'est', 'ful', 'ous', 'ive', 'ly', 'ed', 'er', 's'];
  const hash = s => { let h = 2166136261; for (const ch of s) h = Math.imul(h ^ ch.codePointAt(0), 16777619); return (h >>> 0) % 50257; };
  const split = w => {
    if (w.length <= 4) return [w];
    const out = []; let rest = w;
    for (const p of ['trans', 'inter', 'pre', 'un', 're']) if (rest.toLowerCase().startsWith(p) && rest.length > p.length + 3) { out.push(rest.slice(0, p.length)); rest = rest.slice(p.length); break; }
    let suf = '';
    for (const s of vocab) if (rest.toLowerCase().endsWith(s) && rest.length > s.length + 2) { suf = rest.slice(-s.length); rest = rest.slice(0, -s.length); break; }
    while (rest.length > 6) { out.push(rest.slice(0, 4)); rest = rest.slice(4); }
    out.push(rest); if (suf) out.push(suf);
    return out;
  };
  const tokenize = txt => {
    const parts = txt.match(/\s*[\p{L}\p{N}]+|\s*[^\s\p{L}\p{N}]|\s+/gu) || [], toks = [];
    parts.forEach(p => { const lead = p.match(/^\s*/)[0], core = p.slice(lead.length); if (!core) return; split(core).forEach((t, i) => toks.push((i === 0 ? lead : '') + t)); });
    return toks;
  };
  const hues = [168, 258, 300, 200, 30, 340, 120];
  const render = () => {
    const toks = tokenize(inp.value);
    box.innerHTML = toks.map((t, i) => `<span class="tok" data-i="${i}" style="background:hsla(${hues[i % 7]},80%,60%,.18);border:1px solid hsla(${hues[i % 7]},80%,60%,.35)">${esc(t).replace(/ /g, '·')}<span class="id">#${hash(t.trim().toLowerCase())}</span></span>`).join('') || '<span class="pg-hint">start typing…</span>';
    $('#pg-tok').textContent = toks.length; $('#pg-chr').textContent = inp.value.length;
    $('#pg-rat').textContent = toks.length ? (inp.value.length / toks.length).toFixed(2) : 0;
    const els = $$('.tok', box);
    els.forEach(el => {
      el.onmouseenter = () => {
        const i = +el.dataset.i, a = toks[i].trim().toLowerCase();
        els.forEach((o, j) => { const b = toks[j].trim().toLowerCase(); let s = j === i ? 1 : Math.exp(-Math.abs(i - j) / 3) * .6; for (const ch of new Set(a)) if (b.includes(ch)) s += .05; o.style.opacity = Math.max(.15, Math.min(1, s)); });
      };
      el.onmouseleave = () => els.forEach(o => (o.style.opacity = 1));
    });
  };
  inp.addEventListener('input', render); render();
})();

/* ---------- skills page ---------- */
if ($('#skill-cats')) $('#skill-cats').innerHTML = DATA.skills.map((s, i) => `<div class="card spot skill-cat reveal" style="transition-delay:${i * 70}ms"><h4>${s.ico} ${s.cat}<span>${String(s.items.length).padStart(2, '0')}</span></h4><div class="chips">${s.items.map(x => `<span class="chip">${x}</span>`).join('')}</div></div>`).join('');
(() => {
  const orbit = $('#orbit'); if (!orbit) return;
  const rings = [{ r: 28, items: ['C', 'C++', 'Java', 'Python', 'PHP'], speed: .00018 }, { r: 45, items: ['Next.js', 'TypeScript', 'MySQL', 'Supabase', 'XGBoost', 'LLMs', 'NLP', 'IoT', 'Security'], speed: -.00011 }];
  const nodes = [];
  rings.forEach(rg => {
    const t = document.createElement('div'); t.className = 'track';
    Object.assign(t.style, { left: 50 - rg.r + '%', top: 50 - rg.r + '%', width: rg.r * 2 + '%', height: rg.r * 2 + '%' }); orbit.appendChild(t);
    rg.items.forEach((name, i) => { const n = document.createElement('div'); n.className = 'node'; n.textContent = name; orbit.appendChild(n); nodes.push({ n, rg, a: (i / rg.items.length) * Math.PI * 2 }); });
  });
  let paused = false; orbit.onmouseenter = () => paused = true; orbit.onmouseleave = () => paused = false;
  let last = performance.now();
  const loop = now => { const dt = now - last; last = now; nodes.forEach(o => { if (!paused && !reduce) o.a += o.rg.speed * dt; o.n.style.left = 50 + Math.cos(o.a) * o.rg.r + '%'; o.n.style.top = 50 + Math.sin(o.a) * o.rg.r + '%'; }); requestAnimationFrame(loop); };
  requestAnimationFrame(loop);
})();

/* ---------- generative project visuals ---------- */
const visual = (kind, seed = 1) => {
  const c1 = 'var(--a1)', c2 = 'var(--a2)'; let g = '';
  if (kind === 'grid') { for (let x = 0; x < 9; x++) for (let y = 0; y < 4; y++) { const h = 20 + ((x * 7 + y * 13) % 5) * 9; g += `<rect x="${30 + x * 62}" y="${190 - h}" width="40" height="${h}" rx="4" fill="${(x + y) % 3 ? c2 : c1}" opacity="${.15 + ((x * y) % 4) * .12}"><animate attributeName="opacity" values=".15;.6;.15" dur="${3 + (x % 3)}s" begin="${(x + y) * .2}s" repeatCount="indefinite"/></rect>`; } g += `<path d="M30 110 L120 70 L210 70 L300 40 L390 80 L480 50 L570 60" stroke="${c1}" stroke-width="2.5" fill="none" stroke-dasharray="600" stroke-dashoffset="600"><animate attributeName="stroke-dashoffset" to="0" dur="2.5s" fill="freeze"/></path>`; }
  if (kind === 'kanban') { ['To do', 'Doing', 'Done'].forEach((col, i) => { g += `<rect x="${40 + i * 180}" y="30" width="160" height="180" rx="14" fill="var(--surface2)" stroke="var(--border)"/><text x="${56 + i * 180}" y="56" fill="var(--muted)" font-size="12" font-family="JetBrains Mono, monospace">${col}</text>`; for (let k = 0; k < 3 - (i === 2 ? 1 : 0); k++) g += `<rect x="${54 + i * 180}" y="${70 + k * 42}" width="132" height="32" rx="8" fill="${i === 1 ? c2 : c1}" opacity=".25"><animate attributeName="y" values="${70 + k * 42};${66 + k * 42};${70 + k * 42}" dur="${2.5 + k}s" repeatCount="indefinite"/></rect>`; }); }
  if (kind === 'wave') { for (let k = 0; k < 4; k++) { let d = 'M0 120'; for (let x = 0; x <= 600; x += 20) d += ` L${x} ${120 + Math.sin(x / 40 + k) * (18 + k * 10) * Math.sin(x / 190)}`; g += `<path d="${d}" stroke="${k % 2 ? c2 : c1}" stroke-width="2" fill="none" opacity="${.9 - k * .18}"><animateTransform attributeName="transform" type="translate" values="0 0;-40 0;0 0" dur="${4 + k}s" repeatCount="indefinite"/></path>`; } }
  if (kind === 'nodes') { const pts = [[300, 120], [140, 60], [460, 60], [120, 180], [480, 180], [300, 30], [300, 210]]; pts.slice(1).forEach(([x, y], i) => { g += `<line x1="300" y1="120" x2="${x}" y2="${y}" stroke="var(--border)" stroke-width="2"/><circle r="4" fill="${c1}"><animateMotion dur="${2 + i * .4}s" repeatCount="indefinite" path="M300 120 L${x} ${y}"/></circle>`; }); pts.forEach(([x, y], i) => g += `<circle cx="${x}" cy="${y}" r="${i ? 14 : 26}" fill="${i ? 'var(--bg2)' : c2}" stroke="${i ? c1 : 'none'}" stroke-width="2" opacity="${i ? 1 : .8}"/>`); }
  if (kind === 'house') {
    // skyline of houses, bouncing map pins, a search bar and listing card
    const houses = [[40, 70, 84], [120, 56, 106], [186, 80, 72], [276, 60, 98], [346, 90, 78], [446, 64, 112], [520, 60, 86]];
    houses.forEach(([x, w, h], i) => {
      const y = 215 - h;
      g += `<g opacity="${.55 + (i % 3) * .15}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="var(--surface2)" stroke="var(--border)"/>`;
      g += `<path d="M${x - 6} ${y + 2} L${x + w / 2} ${y - 26} L${x + w + 6} ${y + 2}Z" fill="${i % 2 ? c2 : c1}" opacity=".35"/>`;
      for (let r = 0; r < Math.floor(h / 34); r++) for (let c = 0; c < Math.floor(w / 24); c++) g += `<rect x="${x + 8 + c * 22}" y="${y + 14 + r * 30}" width="10" height="12" rx="2" fill="${(r + c + i) % 3 ? 'var(--border)' : c1}" opacity=".8">${(r + c + i) % 4 === 0 ? `<animate attributeName="opacity" values=".2;1;.2" dur="${2 + (i % 3)}s" begin="${r * .3}s" repeatCount="indefinite"/>` : ''}</rect>`;
      g += `<rect x="${x + w / 2 - 7}" y="${215 - 22}" width="14" height="22" rx="2" fill="var(--bg2)"/></g>`;
    });
    g += `<line x1="0" y1="215" x2="600" y2="215" stroke="var(--border)" stroke-width="2"/>`;
    [[150, 92, 0], [310, 104, .5], [478, 76, 1]].forEach(([x, y, d], i) => {
      g += `<g><animateTransform attributeName="transform" type="translate" values="0 0;0 -8;0 0" dur="2.2s" begin="${d}s" repeatCount="indefinite"/><path d="M${x} ${y + 26} C${x - 16} ${y + 8} ${x - 16} ${y - 8} ${x} ${y - 8} C${x + 16} ${y - 8} ${x + 16} ${y + 8} ${x} ${y + 26}Z" fill="${i === 1 ? c2 : c1}"/><circle cx="${x}" cy="${y + 3}" r="5" fill="var(--bg)"/></g>`;
    });
    g += `<g transform="translate(170 34)"><rect width="260" height="30" rx="15" fill="var(--bg2)" stroke="var(--border)"/><circle cx="18" cy="15" r="6" fill="none" stroke="${c1}" stroke-width="2"/><line x1="22" y1="19" x2="27" y2="24" stroke="${c1}" stroke-width="2"/><text x="36" y="20" fill="var(--muted)" font-size="12" font-family="JetBrains Mono, monospace">Rent in Dhaka · 2 bed<animate attributeName="opacity" values="1;.4;1" dur="2s" repeatCount="indefinite"/></text></g>`;
  }
  if (kind === 'forecast') {
    let hist = 'M30 170', fc = '', up = '', lo = '', y = 170;
    const pts = [];
    for (let i = 0; i <= 12; i++) { y = 170 - i * 5 - Math.sin(i * 1.3) * 14; pts.push([30 + i * 28, y]); }
    pts.forEach(([x, yy]) => hist += ` L${x} ${yy}`);
    const [lx, ly] = pts[pts.length - 1]; fc = `M${lx} ${ly}`; up = `M${lx} ${ly}`; lo = '';
    const fpts = [];
    for (let i = 1; i <= 8; i++) { const x = lx + i * 28, yy = ly - i * 6 - Math.sin(i) * 6; fpts.push([x, yy, i * 4.5]); fc += ` L${x} ${yy}`; }
    fpts.forEach(([x, yy, b]) => up += ` L${x} ${yy - b}`);
    [...fpts].reverse().forEach(([x, yy, b]) => lo += ` L${x} ${yy + b}`);
    for (let k = 0; k < 5; k++) g += `<line x1="30" y1="${50 + k * 35}" x2="580" y2="${50 + k * 35}" stroke="var(--border)"/>`;
    g += `<path d="${up}${lo} Z" fill="${c2}" opacity=".18"/>`;
    g += `<path d="${hist}" stroke="${c1}" stroke-width="3" fill="none" stroke-dasharray="800" stroke-dashoffset="800"><animate attributeName="stroke-dashoffset" to="0" dur="2s" fill="freeze"/></path>`;
    g += `<path d="${fc}" stroke="${c2}" stroke-width="3" fill="none" stroke-dasharray="7 6"><animate attributeName="stroke-dashoffset" values="26;0" dur="1s" repeatCount="indefinite"/></path>`;
    g += `<line x1="${lx}" y1="30" x2="${lx}" y2="215" stroke="var(--muted)" stroke-dasharray="3 4"/><text x="${lx + 8}" y="40" fill="var(--muted)" font-size="11" font-family="JetBrains Mono, monospace">forecast →</text>`;
    g += `<circle cx="${lx}" cy="${ly}" r="6" fill="${c1}"><animate attributeName="r" values="5;9;5" dur="1.6s" repeatCount="indefinite"/></circle>`;
    ['🐔 chicken', '🍚 rice', '🐟 fish'].forEach((t, i) => g += `<g transform="translate(${36 + i * 108} 20)"><rect width="98" height="24" rx="12" fill="var(--bg2)" stroke="var(--border)"/><text x="49" y="16" text-anchor="middle" fill="var(--muted)" font-size="11" font-family="JetBrains Mono, monospace">${t}</text></g>`);
  }
  if (kind === 'dash') {
    g += `<rect x="24" y="20" width="90" height="200" rx="12" fill="var(--surface2)" stroke="var(--border)"/>`;
    for (let i = 0; i < 6; i++) g += `<rect x="38" y="${42 + i * 28}" width="${i === 1 ? 62 : 50}" height="10" rx="5" fill="${i === 1 ? c1 : 'var(--border)'}"/>`;
    [['৳ 42', 'per meal'], ['৳ 18k', 'spent'], ['+৳ 1.2k', 'balance']].forEach(([v, l], i) => g += `<g transform="translate(${130 + i * 150} 20)"><rect width="138" height="62" rx="12" fill="var(--surface2)" stroke="var(--border)"/><text x="14" y="32" fill="${i === 2 ? c1 : 'var(--text)'}" font-size="20" font-weight="700" font-family="Space Grotesk, sans-serif">${v}</text><text x="14" y="50" fill="var(--muted)" font-size="11" font-family="JetBrains Mono, monospace">${l}</text></g>`);
    g += `<rect x="130" y="94" width="268" height="126" rx="12" fill="var(--surface2)" stroke="var(--border)"/>`;
    for (let i = 0; i < 9; i++) { const h = 20 + ((i * 37) % 70); g += `<rect x="${146 + i * 27}" y="${206 - h}" width="16" height="${h}" rx="4" fill="${i % 2 ? c2 : c1}" opacity=".75"><animate attributeName="height" values="${h};${h * .6};${h}" dur="${2.5 + i % 3}s" repeatCount="indefinite"/><animate attributeName="y" values="${206 - h};${206 - h * .6};${206 - h}" dur="${2.5 + i % 3}s" repeatCount="indefinite"/></rect>`; }
    g += `<rect x="410" y="94" width="158" height="126" rx="12" fill="var(--surface2)" stroke="var(--border)"/>`;
    for (let r = 0; r < 4; r++) for (let c = 0; c < 7; c++) g += `<rect x="${422 + c * 20}" y="${108 + r * 26}" width="14" height="14" rx="3" fill="${(r * 7 + c) % 5 === 0 ? c2 : (r * 7 + c) % 3 === 0 ? c1 : 'var(--border)'}" opacity=".8"/>`;
  }
  if (kind === 'tree') {
    const N = [[300, 40], [180, 100], [420, 100], [120, 165], [240, 165], [360, 165], [480, 165], [90, 215], [150, 215]];
    const E = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6], [3, 7], [3, 8]];
    E.forEach(([a, b]) => g += `<line x1="${N[a][0]}" y1="${N[a][1]}" x2="${N[b][0]}" y2="${N[b][1]}" stroke="var(--border)" stroke-width="2"/>`);
    const order = [0, 1, 3, 7, 8, 4, 2, 5, 6];
    N.forEach(([x, y], i) => { const k = order.indexOf(i); g += `<circle cx="${x}" cy="${y}" r="16" fill="var(--bg2)" stroke="${c1}" stroke-width="2"><animate attributeName="fill" values="var(--bg2);${c2};var(--bg2)" keyTimes="0;.12;1" dur="4.5s" begin="${k * .5}s" repeatCount="indefinite"/></circle><text x="${x}" y="${y + 4}" text-anchor="middle" fill="var(--text)" font-size="12" font-family="JetBrains Mono, monospace">${[8, 4, 12, 2, 6, 10, 14, 1, 3][i]}</text>`; });
    g += `<text x="560" y="225" text-anchor="end" fill="var(--muted)" font-size="11" font-family="JetBrains Mono, monospace">DFS traversal · O(n)</text>`;
  }
  return `<svg viewBox="0 0 600 240" preserveAspectRatio="xMidYMid slice"><defs><radialGradient id="rg${seed}" cx="50%" cy="0%" r="80%"><stop offset="0" stop-color="${c2}" stop-opacity=".25"/><stop offset="1" stop-color="${c2}" stop-opacity="0"/></radialGradient></defs><rect width="600" height="240" fill="url(#rg${seed})"/>${g}</svg>`;
};

/* ---------- overlays ---------- */
const openOverlay = sel => { $(sel).classList.add('open'); document.body.style.overflow = 'hidden'; };
const closeAll = () => {
  $$('.overlay').forEach(o => o.classList.remove('open')); document.body.style.overflow = '';
  if (PAGE === 'projects' && location.hash) history.replaceState(null, '', location.pathname);
};
$$('.overlay').forEach(o => o.addEventListener('click', e => { if (e.target === o || e.target.closest('[data-close]')) closeAll(); }));

/* ---------- projects page ---------- */
let current = -1;
const openProject = i => {
  const N = DATA.projects.length; i = (i + N) % N; current = i;
  const p = DATA.projects[i];
  $('#modal-head').innerHTML = visual(p.visual, 'm' + i) + `<span class="mh-title">0${i + 1} · ${p.type}</span><button class="icon-btn close-x" data-close aria-label="Close">✕</button>`;
  const gh = p.repo
    ? `<a class="gh-btn" href="${p.repo}" target="_blank" rel="noopener">${ICON.github}<span>View on GitHub<small>${p.repo.replace(/^https?:\/\/(www\.)?/, '')}</small></span><span class="go">${ICON.ext}</span></a>`
    : `<div class="gh-btn disabled">${ICON.github}<span>GitHub repository<small>link coming soon</small></span></div>`;
  const live = p.live ? `<a class="live-btn" href="${p.live}" target="_blank" rel="noopener">🌐 Live demo <span style="margin-left:auto">${ICON.ext}</span></a>` : '';
  $('#modal-body').innerHTML = `
    <h3>${p.title}</h3><div class="sub">${p.sub}</div>
    <div class="modal-grid">
      <div>
        <h5>Overview</h5><p>${p.overview || p.desc}</p>
        <h5>Key features</h5><ul>${p.points.map(x => `<li>${x}</li>`).join('')}</ul>
        ${p.learned ? `<h5>What I learned</h5><p>${p.learned}</p>` : ''}
      </div>
      <div>
        <div class="side-box">
          <h5>Project info</h5>
          <dl><dt>TYPE</dt><dd>${p.type}</dd>${p.role ? `<dt>ROLE</dt><dd>${p.role}</dd>` : ''}${p.year ? `<dt>CONTEXT</dt><dd>${p.year}</dd>` : ''}${p.status ? `<dt>STATUS</dt><dd>${p.status}</dd>` : ''}</dl>
          <h5>Built with</h5><div class="stack">${p.stack.map(s => `<span>${s}</span>`).join('')}</div>
        </div>
        ${gh}${live}
      </div>
    </div>
    <div class="modal-nav"><button data-step="-1">← ${DATA.projects[(i - 1 + N) % N].title}</button><span class="count">${i + 1} / ${N}</span><button data-step="1">${DATA.projects[(i + 1) % N].title} →</button></div>`;
  $$('[data-step]', $('#modal-body')).forEach(b => b.onclick = () => openProject(current + +b.dataset.step));
  $('#modal').scrollTop = 0;
  history.replaceState(null, '', '#' + slug(p.title));
  openOverlay('#proj-overlay');
};
if ($('#proj-grid')) {
  const types = ['All', ...new Set(DATA.projects.map(p => p.type))];
  $('#filters').innerHTML = types.map((t, i) => `<button class="filter${i ? '' : ' active'}" data-f="${t}">${t} <span class="mono" style="opacity:.6">${i ? DATA.projects.filter(p => p.type === t).length : DATA.projects.length}</span></button>`).join('');
  $('#proj-grid').innerHTML = DATA.projects.map((p, i) => `
    <article class="card spot proj reveal" data-type="${p.type}" data-i="${i}" tabindex="0" role="button" aria-label="Open ${p.title} details">
      <div class="proj-visual">${visual(p.visual, i)}<span class="proj-num">0${i + 1}</span><span class="proj-type">${p.type}</span></div>
      <div class="proj-body"><h3>${p.title}<span class="arrow">↗</span></h3><p>${p.desc}</p><div class="stack">${p.stack.map(s => `<span>${s}</span>`).join('')}</div>
        <div class="proj-links-row"><span class="mini-link">📖 Details</span><span class="mini-link${p.repo ? '' : ' off'}">${ICON.github} ${p.repo ? 'GitHub' : 'GitHub soon'}</span></div>
      </div>
    </article>`).join('');
  $$('.filter').forEach(b => b.onclick = () => { $$('.filter').forEach(x => x.classList.remove('active')); b.classList.add('active'); $$('.proj').forEach(c => c.classList.toggle('hide', b.dataset.f !== 'All' && c.dataset.type !== b.dataset.f)); });
  $$('.proj').forEach(c => {
    c.addEventListener('mousemove', e => { if (reduce) return; const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; c.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateY(-4px)`; });
    c.addEventListener('mouseleave', () => c.style.transform = '');
    c.addEventListener('click', () => openProject(+c.dataset.i));
    c.addEventListener('keydown', e => e.key === 'Enter' && openProject(+c.dataset.i));
  });
  const fromHash = () => { const i = DATA.projects.findIndex(p => '#' + slug(p.title) === location.hash); if (i > -1) setTimeout(() => openProject(i), 450); };
  fromHash();
  document.addEventListener('keydown', e => {
    if (!$('#proj-overlay').classList.contains('open')) return;
    if (e.key === 'ArrowRight') openProject(current + 1);
    if (e.key === 'ArrowLeft') openProject(current - 1);
  });
}

/* ---------- journey page ---------- */
const tl = (arr, el) => $(el) && $(el).insertAdjacentHTML('beforeend', arr.map(e => `<div class="card spot tl-item"><div class="when">${e.when}</div><h4>${e.t}</h4><div class="where">${e.where}</div><p>${e.p}</p>${e.pill ? `<span class="pill">${e.pill}</span>` : ''}</div>`).join(''));
tl(DATA.education, '#tl-edu'); tl(DATA.teaching, '#tl-teach');

/* ---------- contact page ---------- */
if ($('#c-info')) {
  $('#c-info').innerHTML = `
    <h3 style="font-family:var(--head);font-size:24px;margin-bottom:6px">Get in touch</h3>
    <p style="color:var(--muted);margin-bottom:8px">I usually reply within a day.</p>
    <div class="c-row"><div class="ic">${ICON.mail}</div><div><small>EMAIL</small><a class="v" href="mailto:${DATA.email}">${DATA.email}</a></div><button class="icon-btn" data-copy="${DATA.email}" data-label="Email" title="Copy">⧉</button></div>
    <div class="c-row"><div class="ic">${ICON.phone}</div><div><small>PHONE</small><a class="v" href="tel:${DATA.phoneRaw}">${DATA.phone}</a></div><button class="icon-btn" data-copy="${DATA.phoneRaw}" data-label="Phone" title="Copy">⧉</button></div>
    <div class="c-row"><div class="ic">${ICON.pin}</div><div><small>LOCATION</small><span class="v">${DATA.location}</span></div></div>
    ${DATA.socials.linkedin ? `<div class="c-row"><div class="ic">${ICON.linkedin}</div><div><small>LINKEDIN</small><a class="v" href="${DATA.socials.linkedin}" target="_blank" rel="noopener">md-al-shahariyar</a></div></div>` : ''}
    ${DATA.socials.github ? `<div class="c-row"><div class="ic">${ICON.github}</div><div><small>GITHUB</small><a class="v" href="${DATA.socials.github}" target="_blank" rel="noopener">${DATA.socials.github.replace(/^https?:\/\/(www\.)?/, '')}</a></div></div>` : ''}`;
  $('#c-form').addEventListener('submit', async e => {
    e.preventDefault();
    const n = $('#f-name').value, m = $('#f-mail').value, s = $('#f-sub').value || `Portfolio message from ${n}`, msg = $('#f-msg').value;
    const note = $('#form-note'), btn = $('#c-form button[type=submit]');
    if (!DATA.formKey) {
      location.href = `mailto:${DATA.email}?subject=${encodeURIComponent(s)}&body=${encodeURIComponent(msg + '\n\n— ' + n + ' (' + m + ')')}`;
      note.textContent = `If your email app didn't open, write to ${DATA.email}`; return;
    }
    btn.disabled = true; btn.style.opacity = .6; note.textContent = 'Sending…';
    try {
      const r = await fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: DATA.formKey, subject: s, from_name: 'Portfolio — ' + n, name: n, email: m, message: msg, botcheck: $('#f-bot').checked }) });
      const j = await r.json();
      if (!j.success) throw new Error(j.message);
      $('#c-form').reset(); note.textContent = '✓ Message sent — I\'ll get back to you soon.'; toast('Message sent ✓');
    } catch (err) {
      note.textContent = `Couldn't send right now. Please email me at ${DATA.email}`;
    } finally { btn.disabled = false; btn.style.opacity = 1; }
  });
}
document.addEventListener('click', e => { const b = e.target.closest('[data-copy]'); if (b) copy(b.dataset.copy, b.dataset.label); });

/* ---------- command palette ---------- */
(() => {
  const items = [
    ...PAGES.map(p => [p.ico, 'Go to ' + p.label, 'page', () => { closeAll(); goTo(p.href); }]),
    ...DATA.projects.map((p, i) => ['📁', 'Open project: ' + p.title, 'project', () => { closeAll(); PAGE === 'projects' ? setTimeout(() => openProject(i), 150) : goTo('projects.html#' + slug(p.title)); }]),
    ['📋', 'Copy email address', 'action', () => { closeAll(); copy(DATA.email, 'Email'); }],
    ['📄', 'Open CV / Resume', 'action', () => { closeAll(); window.open(DATA.resume, '_blank'); }],
    ['🌗', 'Toggle light / dark theme', 'action', () => { closeAll(); $('#theme-btn').click(); }],
    ...(DATA.socials.linkedin ? [['🔗', 'Open LinkedIn', 'link', () => { closeAll(); window.open(DATA.socials.linkedin, '_blank'); }]] : []),
    ...(DATA.socials.github ? [['🐙', 'Open GitHub', 'link', () => { closeAll(); window.open(DATA.socials.github, '_blank'); }]] : [])
  ];
  let sel = 0, shown = items;
  const draw = () => { $('#pal-list').innerHTML = shown.map((it, i) => `<div class="pal-item${i === sel ? ' sel' : ''}" data-i="${i}">${it[0]} ${it[1]}<small>${it[2]}</small></div>`).join('') || '<div class="pal-item" style="color:var(--dim)">No results</div>'; };
  const open = () => { openOverlay('#pal-overlay'); $('#pal-in').value = ''; shown = items; sel = 0; draw(); setTimeout(() => $('#pal-in').focus(), 50); };
  $('#open-palette').onclick = open;
  $('#pal-in').addEventListener('input', e => { const q = e.target.value.toLowerCase(); shown = items.filter(it => it[1].toLowerCase().includes(q)); sel = 0; draw(); });
  $('#pal-in').addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') { sel = Math.min(shown.length - 1, sel + 1); draw(); e.preventDefault(); }
    if (e.key === 'ArrowUp') { sel = Math.max(0, sel - 1); draw(); e.preventDefault(); }
    if (e.key === 'Enter' && shown[sel]) shown[sel][3]();
  });
  $('#pal-list').addEventListener('click', e => { const it = e.target.closest('[data-i]'); if (it && shown[+it.dataset.i]) shown[+it.dataset.i][3](); });
  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); $('#pal-overlay').classList.contains('open') ? closeAll() : open(); }
    if (e.key === 'Escape') closeAll();
  });
})();

/* ---------- scroll chrome ---------- */
const onScroll = () => {
  const y = scrollY, h = Math.max(1, document.documentElement.scrollHeight - innerHeight);
  $('#progress').style.width = (y / h) * 100 + '%';
  $('#nav').classList.toggle('scrolled', y > 30);
  $('#top-btn').classList.toggle('show', y > 700);
};
addEventListener('scroll', onScroll, { passive: true }); onScroll();
$('#top-btn').onclick = () => scrollTo({ top: 0, behavior: 'smooth' });

/* ---------- reveal on scroll ---------- */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add('in');
  $$('.num[data-n]', e.target).forEach(countUp);
  $$('.timeline', e.target).forEach(t => t.classList.add('in'));
  io.unobserve(e.target);
}), { threshold: .12 });
$$('.reveal').forEach(el => io.observe(el));

/* ---------- spotlight + magnetic + cursor glow ---------- */
document.addEventListener('mousemove', e => {
  const g = $('#cursor-glow'); g.style.left = e.clientX + 'px'; g.style.top = e.clientY + 'px';
  const c = e.target.closest('.spot'); if (c) { const r = c.getBoundingClientRect(); c.style.setProperty('--mx', e.clientX - r.left + 'px'); c.style.setProperty('--my', e.clientY - r.top + 'px'); }
});
$$('.magnetic').forEach(b => {
  b.addEventListener('mousemove', e => { if (reduce) return; const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .25}px,${(e.clientY - r.top - r.height / 2) * .35}px)`; });
  b.addEventListener('mouseleave', () => b.style.transform = '');
});

/* ---------- photo tilt ---------- */
(() => { const w = $('#photo-wrap'); if (!w || reduce) return;
  w.addEventListener('mousemove', e => { const r = w.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; w.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`; });
  w.addEventListener('mouseleave', () => w.style.transform = '');
})();

/* ---------- neural-network background ---------- */
(() => {
  const cv = $('#bg-canvas'), ctx = cv.getContext('2d'); let W, H, pts = [], mouse = { x: -999, y: -999 };
  const dpr = Math.min(devicePixelRatio || 1, 2);
  const resize = () => {
    W = cv.width = innerWidth * dpr; H = cv.height = innerHeight * dpr; cv.style.width = innerWidth + 'px'; cv.style.height = innerHeight + 'px';
    const n = Math.min(90, Math.floor(innerWidth * innerHeight / 16000));
    pts = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .3 * dpr, vy: (Math.random() - .5) * .3 * dpr }));
  };
  resize(); addEventListener('resize', resize);
  addEventListener('mousemove', e => { mouse.x = e.clientX * dpr; mouse.y = e.clientY * dpr; });
  const col = () => getComputedStyle(document.documentElement).getPropertyValue('--a2').trim() || '#a78bfa';
  let color = col(); new MutationObserver(() => color = col()).observe(document.documentElement, { attributes: true });
  const D = 140 * dpr;
  const frame = () => {
    ctx.clearRect(0, 0, W, H);
    for (const p of pts) {
      if (!reduce) { p.x += p.vx; p.y += p.vy; }
      if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1;
      const dx = p.x - mouse.x, dy = p.y - mouse.y, dm = Math.hypot(dx, dy);
      if (dm < 160 * dpr && dm > 0) { p.x += dx / dm * .8; p.y += dy / dm * .8; }
    }
    ctx.strokeStyle = color; ctx.fillStyle = color;
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i], b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < D) { ctx.globalAlpha = (1 - d / D) * .35; ctx.lineWidth = dpr * .8; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
      }
      ctx.globalAlpha = .7; ctx.beginPath(); ctx.arc(pts[i].x, pts[i].y, 1.6 * dpr, 0, 7); ctx.fill();
    }
    ctx.globalAlpha = 1; requestAnimationFrame(frame);
  };
  frame();
})();
})();
