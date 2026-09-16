/* Expertia · rutas, eventos y arranque. */
(function () {
  'use strict';
  const EX = window.EX;
  const V = EX.views;
  const R = EX.render;
  const $ = s => document.querySelector(s);
  const main = $('#main');

  /* ---------- rutas ---------- */
  const ROUTES = [
    ['/', () => V.home()],
    ['/curso', () => V.track('ia')],
    ['/manual', () => V.track('claude')],
    ['/modulo/:id', p => V.module(p.id)],
    ['/leccion/:id', p => V.lesson(p.id)],
    ['/prompts', () => V.prompts()],
    ['/tarjetas', () => { if (!V._cardsInit) { V.cardsStart('all'); V._cardsInit = true; } return V.cards(); }],
    ['/glosario', () => V.glossary()],
    ['/historia', () => V.timeline()],
    ['/biblioteca', () => V.library()],
    ['/plan', () => V.plan()],
    ['/progreso', () => V.progress()],
    ['/ajustes', () => V.settings()]
  ];
  function match(path) {
    for (const [pat, fn] of ROUTES) {
      const a = pat.split('/'), b = path.split('/');
      if (a.length !== b.length) continue;
      const params = {}; let ok = true;
      for (let i = 0; i < a.length; i++) {
        if (a[i].startsWith(':')) params[a[i].slice(1)] = decodeURIComponent(b[i]);
        else if (a[i] !== b[i]) { ok = false; break; }
      }
      if (ok) return { fn, params, pat };
    }
    return null;
  }
  function path() {
    const h = location.hash.replace(/^#/, '') || '/';
    return h.startsWith('/') ? h : '/' + h;
  }
  let lastPath = null;
  function render() {
    const p = path();
    const m = match(p);
    main.innerHTML = m ? m.fn(m.params) : V.notFound();
    // nav activa
    const top = '/' + (p.split('/')[1] || '');
    const navKey = p === '/' ? '/' : (top === '/modulo' || top === '/leccion') ? trackRoute(p) : top;
    document.querySelectorAll('[data-nav]').forEach(a => a.classList.toggle('active', a.dataset.nav === navKey));
    document.querySelectorAll('[data-tab]').forEach(a => a.classList.toggle('active', a.dataset.tab === navKey));
    // quiz
    if (m && m.pat === '/leccion/:id') {
      const l = EX.lesson(m.params.id);
      if (l && l.quiz && l.quiz.length) {
        const run = V.quizRun();
        if (!run || run.lessonId !== l.id) V.quizStart(l.id);
        const q = $('#quiz'); if (q) q.innerHTML = V.quizHtml();
      }
      EX.store.touchDay(1);
    }
    if (p !== lastPath) window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    lastPath = p;
    updateChip();
  }
  function trackRoute(p) {
    const id = p.split('/')[2];
    const m = p.startsWith('/modulo') ? EX.module(id) : EX.moduleOfLesson(id);
    return m && m.track === 'claude' ? '/manual' : '/curso';
  }
  function updateChip() {
    const lv = EX.store.level();
    const t = $('#levelText'); if (t) t.textContent = 'Nivel ' + lv.n + ' · ' + EX.fmt(lv.xp) + ' XP';
  }
  function rerenderQuiz() { const q = $('#quiz'); if (q) q.innerHTML = V.quizHtml(); }

  /* ---------- utilidades UI ---------- */
  let toastT = null;
  EX.toast = function (msg) {
    const t = $('#toast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2200);
  };
  EX.modal = function (html) {
    const m = $('#modal'); m.innerHTML = '<div class="mbox">' + html + '</div>'; m.hidden = false;
  };
  EX.closeModal = () => { $('#modal').hidden = true; };

  function applyTheme() {
    const s = EX.store.get().settings;
    document.documentElement.dataset.theme = s.theme || 'auto';
    document.documentElement.dataset.font = s.font || 'md';
  }

  /* ---------- eventos ---------- */
  document.addEventListener('click', async e => {
    const go = e.target.closest('[data-go]');
    if (go) { location.hash = go.dataset.go; return; }
    if (e.target.closest('#themeBtn')) {
      const s = EX.store.get().settings;
      const order = ['auto', 'light', 'dark'];
      EX.store.setSetting('theme', order[(order.indexOf(s.theme) + 1) % 3]); applyTheme();
      EX.toast('Tema: ' + { auto: 'automático', light: 'claro', dark: 'oscuro' }[EX.store.get().settings.theme]); return;
    }
    if (e.target.closest('#fontBtn')) {
      const s = EX.store.get().settings;
      const order = ['sm', 'md', 'lg'];
      EX.store.setSetting('font', order[(order.indexOf(s.font) + 1) % 3]); applyTheme(); return;
    }
    if (e.target.closest('#modal') && !e.target.closest('.mbox')) { EX.closeModal(); return; }

    const btn = e.target.closest('[data-act]');
    if (!btn) return;
    const act = btn.dataset.act;
    const tgt = btn.dataset.target ? document.getElementById(btn.dataset.target) : null;

    switch (act) {
      case 'more':
        EX.modal('<h3>Más secciones</h3><div class="grid" style="grid-template-columns:1fr 1fr">' +
          [['#/prompts', '✍️ Prompts'], ['#/historia', '🕰️ Línea de tiempo'], ['#/glosario', '🔤 Glosario'], ['#/biblioteca', '📚 Biblioteca'], ['#/plan', '🗓️ Plan'], ['#/progreso', '📈 Progreso'], ['#/ajustes', '⚙️ Ajustes']]
            .map(([h, t]) => '<a class="btn" href="' + h + '" data-act="modal-close">' + t + '</a>').join('') + '</div>');
        return;
      case 'modal-close': EX.closeModal(); return;
      case 'side-toggle': { const s = $('#side'); if (s) s.classList.toggle('open'); return; }
      case 'copy-code': {
        const code = tgt && tgt.querySelector('code');
        if (code && await EX.copy(code.textContent)) EX.toast('Código copiado');
        return;
      }
      case 'copy-prompt': {
        const pre = tgt && tgt.querySelector('pre');
        if (pre && await EX.copy(pre.textContent)) { EX.toast('Prompt copiado. Pégalo en Claude.'); EX.store.countCopy(tgt.id); }
        return;
      }
      case 'pl-prev': if (tgt) { R.plStop(tgt); R.plSet(tgt, Number(tgt.dataset.i) - 1); } return;
      case 'pl-next': if (tgt) { R.plStop(tgt); R.plSet(tgt, Number(tgt.dataset.i) + 1); } return;
      case 'pl-play': if (tgt) R.plPlay(tgt); return;
      case 'check-opt': {
        if (!tgt || tgt.dataset.done) return;
        tgt.dataset.done = '1';
        const ans = Number(tgt.dataset.answer), i = Number(btn.dataset.i);
        tgt.querySelectorAll('.co button').forEach((b, k) => { b.disabled = true; if (k === ans) b.classList.add('ok'); else if (k === i) b.classList.add('bad'); });
        const w = tgt.querySelector('.cw'); w.classList.remove('hidden');
        w.innerHTML = (i === ans ? '<b>✅ Correcto.</b> ' : '<b>❌ No.</b> ') + w.innerHTML;
        EX.store.addXp(i === ans ? 3 : 1); updateChip();
        return;
      }
      case 'bookmark': {
        const on = EX.store.toggleBookmark(btn.dataset.id);
        btn.textContent = on ? '🔖 Guardada' : '🔖 Guardar'; EX.toast(on ? 'Lección guardada' : 'Quitada de guardadas');
        return;
      }
      case 'mark-read': {
        const first = EX.store.markRead(btn.dataset.id);
        EX.toast(first ? '+20 XP · Lección completada' : 'Lección completada');
        render(); return;
      }
      /* quiz */
      case 'quiz-opt': {
        const run = V.quizRun(); if (!run) return;
        const q = run.items[run.i].q;
        if ((q.type || 'choice') === 'multi') { V.quizToggle(Number(btn.dataset.v)); rerenderQuiz(); return; }
        V.quizAnswer(btn.dataset.v); rerenderQuiz(); return;
      }
      case 'quiz-multi-ok': V.quizAnswer(null); rerenderQuiz(); return;
      case 'quiz-fill-ok': {
        const inp = document.querySelector('[data-act="quiz-fill"]');
        if (inp && inp.value.trim()) { V.quizAnswer(inp.value); rerenderQuiz(); }
        return;
      }
      case 'quiz-next': {
        V.quizNext();
        const run = V.quizRun();
        if (run && run.i >= run.items.length && run.final) {
          EX.toast(run.final.pct + ' % · ' + (run.final.improved ? '¡nuevo récord!' : 'cuestionario guardado'));
          updateChip();
        }
        rerenderQuiz();
        const qEl = $('#quiz'); if (qEl) qEl.scrollIntoView({ behavior: 'auto', block: 'nearest' });
        return;
      }
      case 'quiz-again': V.quizStart(btn.dataset.id); rerenderQuiz(); return;
      case 'quiz-review': {
        const run = V.quizRun(); const l = EX.lesson(run.lessonId);
        EX.modal('<h3>Preguntas que fallaste</h3>' + run.wrongIds.map(i => { const q = l.quiz[i]; return '<div class="card" style="margin-bottom:10px"><b>' + q.q + '</b><p class="small">' + (q.why || '') + '</p></div>'; }).join('') + '<button class="btn primary" data-act="modal-close">Cerrar</button>');
        return;
      }
      /* tarjetas */
      case 'cards-filter': V.cardsStart(btn.dataset.v); render(); return;
      case 'cards-start': V.cardsStart(); render(); return;
      case 'card-flip': V.cardFlip(); render(); return;
      case 'card-grade': V.cardGrade(btn.dataset.v === '1'); render(); updateChip(); return;
      /* filtros */
      case 'prompt-cat': V.promptState.cat = btn.dataset.v; render(); return;
      case 'gloss-cat': V.glossState.cat = btn.dataset.v; render(); return;
      case 'tl-lab': V.tlState.lab = btn.dataset.v; render(); return;
      case 'lib-type': V.libState.type = btn.dataset.v; render(); return;
      case 'lib-topic': V.libState.topic = btn.dataset.v; render(); return;
      /* ajustes */
      case 'export': {
        const blob = new Blob([EX.store.exportJson()], { type: 'application/json' });
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'expertia-progreso-' + EX.today() + '.json'; a.click();
        setTimeout(() => URL.revokeObjectURL(a.href), 1000); return;
      }
      case 'reset':
        EX.modal('<h3>¿Borrar todo el progreso?</h3><p>No se puede deshacer. Descarga antes una copia si quieres conservarlo.</p><div class="btnrow"><button class="btn" data-act="modal-close">Cancelar</button><button class="btn primary" data-act="reset-ok">Sí, borrar</button></div>');
        return;
      case 'reset-ok': EX.store.reset(); EX.closeModal(); applyTheme(); render(); EX.toast('Progreso borrado'); return;
    }
  });

  document.addEventListener('change', e => {
    const set = e.target.closest('[data-set]');
    if (set) { EX.store.setSetting(set.dataset.set, set.value); applyTheme(); return; }
    if (e.target.dataset.act === 'import' && e.target.files[0]) {
      const fr = new FileReader();
      fr.onload = () => { try { EX.store.importJson(fr.result); applyTheme(); render(); EX.toast('Progreso cargado'); } catch (err) { EX.toast('Archivo no válido'); } };
      fr.readAsText(e.target.files[0]);
    }
  });

  let noteT = null, searchT = null;
  document.addEventListener('input', e => {
    const note = e.target.closest('[data-note]');
    if (note) { clearTimeout(noteT); noteT = setTimeout(() => EX.store.setNote(note.dataset.note, note.value), 400); return; }
    const act = e.target.dataset.act;
    if (act === 'prompt-search' || act === 'gloss-search' || act === 'lib-search') {
      const state = act === 'prompt-search' ? V.promptState : act === 'gloss-search' ? V.glossState : V.libState;
      state.q = e.target.value;
      clearTimeout(searchT);
      searchT = setTimeout(() => {
        const pos = e.target.selectionStart;
        render();
        const inp = document.querySelector('[data-act="' + act + '"]');
        if (inp) { inp.focus(); try { inp.setSelectionRange(pos, pos); } catch (err) { /* nada */ } }
      }, 180);
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Enter' && e.target.dataset && e.target.dataset.act === 'quiz-fill') {
      e.preventDefault();
      if (e.target.value.trim()) { V.quizAnswer(e.target.value); rerenderQuiz(); }
    }
    if (e.key === 'Escape') EX.closeModal();
  });

  window.addEventListener('hashchange', render);

  /* ---------- arranque ---------- */
  EX.store.load();
  applyTheme();
  render();
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
})();
