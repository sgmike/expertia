/* Expertia · pantallas. Cada vista devuelve HTML; main.js lo monta. */
(function () {
  'use strict';
  const EX = window.EX;
  const esc = EX.esc;
  const R = EX.render;
  const V = (EX.views = {});
  const st = () => EX.store.get();

  const trackClass = t => t === 'claude' ? 'track-claude' : 'track-ia';
  const btnClass = t => t === 'claude' ? 'claude' : 'primary';

  function nextUnread() {
    const all = EX.allLessons();
    return all.find(l => !EX.store.isRead(l.id)) || all[0];
  }

  /* ---------- inicio ---------- */
  V.home = function () {
    const S = st();
    const nxt = nextUnread();
    const lv = EX.store.level();
    const all = EX.allLessons();
    const read = all.filter(l => S.read[l.id]).length;
    const dueCards = EX.store.dueCards(EX.allCards().map(c => c.id)).length;
    const streak = S.streak.count || 0;
    let h = '<section class="hero"><div>' +
      '<p class="eyebrow">Tu camino</p>' +
      '<h1>De cero a experto en IA. Y maestro de Claude.</h1>' +
      '<p class="lead">Dos pistas, una meta: entender de verdad cómo funciona la inteligencia artificial (como lo entienden quienes dirigen los laboratorios) y saber usar Claude mejor que nadie.</p>' +
      '<div class="btnrow"><a class="btn primary lg" href="#/leccion/' + esc(nxt.id) + '">▶ ' + (read ? 'Continuar: ' : 'Empezar: ') + esc(nxt.title) + '</a>' +
      (dueCards ? '<a class="btn lg" href="#/tarjetas">🃏 Repasar ' + dueCards + ' tarjetas</a>' : '') + '</div></div>' +
      '<div class="stats">' +
      '<div class="stat"><b>' + read + '/' + all.length + '</b><span>lecciones leídas</span></div>' +
      '<div class="stat"><b>' + EX.fmt(S.xp || 0) + '</b><span>XP · nivel ' + lv.n + '</span></div>' +
      '<div class="stat"><b>' + streak + ' 🔥</b><span>días seguidos</span></div>' +
      '<div class="stat"><b>' + EX.store.activeDays(30) + '</b><span>días activos (30 d)</span></div>' +
      '</div></section>';

    h += '<div class="grid two">';
    for (const t of EX.TRACKS) {
      const lessons = t.modules.flatMap(m => m.lessons);
      const pct = EX.store.lessonPct(lessons);
      const mins = lessons.reduce((s, l) => s + (l.minutes || 10), 0);
      h += '<a class="track-card ' + (t.id === 'claude' ? 'claude' : '') + '" href="#/' + esc(t.route) + '">' +
        '<div class="ticon">' + t.icon + '</div><h2>' + esc(t.title) + '</h2><p>' + t.desc + '</p>' +
        '<div class="row small muted"><span>' + t.modules.length + ' módulos</span><span>·</span><span>' + lessons.length + ' lecciones</span><span>·</span><span>~' + EX.minutesLabel(mins) + ' de lectura</span></div>' +
        '<div class="bar ' + (t.id === 'claude' ? 'claude' : '') + '"><i style="width:' + pct + '%"></i></div><div class="small muted">' + pct + ' % completado</div></a>';
    }
    h += '</div>';

    h += '<h2>Cómo sacarle partido</h2><div class="summary-cards">' +
      '<div><div class="sci">📖</div><h4>Lee una lección al día</h4><p>Cada lección lleva de 10 a 25 minutos. Termínala con su cuestionario: ahí es donde el conocimiento se fija.</p></div>' +
      '<div><div class="sci">🃏</div><h4>Repasa las tarjetas</h4><p>Repetición espaciada: el sistema te enseña cada tarjeta justo antes de que la olvides.</p></div>' +
      '<div><div class="sci">✍️</div><h4>Copia y prueba los prompts</h4><p>El manual está lleno de prompts listos para pegar en Claude. Prueba cada uno y modifícalo.</p></div>' +
      '<div><div class="sci">🗓️</div><h4>Sigue el plan de 8 semanas</h4><p>Un recorrido ordenado con objetivos semanales. Consúltalo en <a href="#/plan">Plan</a>.</p></div>' +
      '</div>';
    return h;
  };

  /* ---------- pista (curso / manual) ---------- */
  V.track = function (trackId) {
    const t = EX.trackOf(trackId);
    if (!t) return V.notFound();
    const lessons = t.modules.flatMap(m => m.lessons);
    const pct = EX.store.lessonPct(lessons);
    let h = '<div class="' + trackClass(t.id) + '"><div class="pagehead"><p class="eyebrow">' + t.icon + ' Pista</p><h1>' + esc(t.title) + '</h1><p class="lead">' + t.intro + '</p>' +
      '<div class="bar ' + (t.id === 'claude' ? 'claude' : '') + '" style="max-width:420px"><i style="width:' + pct + '%"></i></div><div class="small muted">' + pct + ' % · ' + lessons.filter(l => EX.store.isRead(l.id)).length + ' de ' + lessons.length + ' lecciones</div></div>';
    h += '<div class="grid">';
    t.modules.forEach((m, i) => {
      const mp = EX.store.lessonPct(m.lessons);
      const mins = m.lessons.reduce((s, l) => s + (l.minutes || 10), 0);
      const qa = EX.store.quizAvg(m.lessons);
      h += '<a class="module-card" href="#/modulo/' + esc(m.id) + '"><div class="micon">' + m.icon + '</div><div class="grow"><h3>' + (i + 1) + '. ' + esc(m.title) + '</h3><p>' + m.desc + '</p>' +
        '<div class="mmeta"><span>' + m.lessons.length + ' lecciones</span><span>~' + EX.minutesLabel(mins) + '</span>' + (qa !== null ? '<span>cuestionarios: ' + qa + ' %</span>' : '') + '</div>' +
        '<div class="bar ' + (t.id === 'claude' ? 'claude' : '') + '" style="margin-top:8px"><i style="width:' + mp + '%"></i></div></div></a>';
    });
    h += '</div></div>';
    return h;
  };

  /* ---------- módulo ---------- */
  V.module = function (id) {
    const m = EX.module(id);
    if (!m) return V.notFound();
    const t = EX.trackOf(m.track);
    let h = '<div class="' + trackClass(t.id) + ' reading"><div class="pagehead"><p class="eyebrow"><a href="#/' + esc(t.route) + '">' + esc(t.title) + '</a></p><h1>' + m.icon + ' ' + esc(m.title) + '</h1><p class="lead">' + m.desc + '</p>';
    if (m.goals) h += '<div class="callout key"><div class="ci">🎯</div><div class="cb"><span class="clabel">Al terminar sabrás</span><ul>' + m.goals.map(g => '<li>' + g + '</li>').join('') + '</ul></div></div>';
    h += '</div><ul class="lesson-list">';
    m.lessons.forEach((l, i) => {
      const done = EX.store.isRead(l.id);
      const q = st().quiz[l.id];
      h += '<li><a href="#/leccion/' + esc(l.id) + '"><span class="num ' + (done ? 'done' : '') + '">' + (done ? '✓' : (i + 1)) + '</span><span class="lt"><b>' + esc(l.title) + '</b><span>' + esc(l.summary || '') + ' · ' + (l.minutes || 10) + ' min</span></span>' +
        (q ? '<span class="score">' + q.best + ' %</span>' : '') + '</a></li>';
    });
    h += '</ul></div>';
    return h;
  };

  /* ---------- lección ---------- */
  function sideNav(m, current) {
    const t = EX.trackOf(m.track);
    let h = '<aside class="side" id="side"><button class="btn sm sidetoggle" data-act="side-toggle">☰ Índice del módulo <span>▾</span></button><div class="sidelist">' +
      '<h4><a href="#/' + esc(t.route) + '" style="padding:0;display:inline">' + esc(t.title) + '</a></h4><h4><a href="#/modulo/' + esc(m.id) + '" style="padding:0;display:inline">' + m.icon + ' ' + esc(m.title) + '</a></h4>';
    m.lessons.forEach(l => {
      const done = EX.store.isRead(l.id);
      h += '<a href="#/leccion/' + esc(l.id) + '" class="' + (l.id === current ? 'active' : '') + '"><span class="tick ' + (done ? 'done' : '') + '">' + (done ? '✓' : '') + '</span><span>' + esc(l.title) + '</span></a>';
    });
    const all = EX.allModules().filter(x => x.track === m.track);
    const idx = all.findIndex(x => x.id === m.id);
    if (all[idx + 1]) h += '<h4>Siguiente módulo</h4><a href="#/modulo/' + esc(all[idx + 1].id) + '">' + all[idx + 1].icon + ' ' + esc(all[idx + 1].title) + '</a>';
    h += '</div></aside>';
    return h;
  }

  V.lesson = function (id) {
    const l = EX.lesson(id);
    if (!l) return V.notFound();
    const m = EX.moduleOfLesson(id);
    const t = EX.trackOf(m.track);
    const done = EX.store.isRead(id);
    const prev = EX.prevLesson(id), next = EX.nextLesson(id);
    const body = typeof l.body === 'function' ? l.body() : (l.body || []);
    const bm = EX.store.isBookmarked(id);
    let h = '<div class="' + trackClass(t.id) + ' with-side">' + sideNav(m, id) + '<article class="article" id="article">' +
      '<div class="pagehead"><p class="eyebrow"><a href="#/modulo/' + esc(m.id) + '">' + m.icon + ' ' + esc(m.title) + '</a></p><h1>' + esc(l.title) + '</h1>' +
      (l.summary ? '<p class="lead">' + l.summary + '</p>' : '') +
      '<div class="meta"><span>⏱ ' + (l.minutes || 10) + ' min</span>' + (l.level ? '<span>📶 ' + esc(l.level) + '</span>' : '') + (done ? '<span>✅ leída</span>' : '') +
      '<button class="btn sm ghost" data-act="bookmark" data-id="' + esc(id) + '">' + (bm ? '🔖 Guardada' : '🔖 Guardar') + '</button></div></div>';
    h += R.blocks(body, { track: t.id });

    if (l.resources && l.resources.length) {
      h += '<h2 id="para-seguir-aprendiendo">📚 Para seguir aprendiendo</h2><p class="muted small">Lecturas, vídeos y fuentes originales para profundizar. Los enlaces se abren en una pestaña nueva.</p>' + R.links(l.resources);
    }

    // notas personales
    h += '<h2>📝 Tus notas</h2><div class="notes"><textarea data-note="' + esc(id) + '" placeholder="Apunta aquí lo que quieras recordar de esta lección. Se guarda solo.">' + esc(st().notes[id] || '') + '</textarea></div>';

    // quiz
    if (l.quiz && l.quiz.length) h += '<div id="quiz"></div>';

    h += '<div class="lesson-done ' + (done ? 'done' : '') + '" id="lessonDone"><div class="grow"><b>' + (done ? 'Lección completada' : '¿Terminaste de leer?') + '</b><div class="small muted">' + (done ? 'Leída el ' + esc(st().read[id]) + '. Puedes repetir el cuestionario cuando quieras.' : 'Márcala como leída para sumar 20 XP y avanzar en el plan.') + '</div></div>' +
      (done ? '' : '<button class="btn ' + btnClass(t.id) + '" data-act="mark-read" data-id="' + esc(id) + '">✓ Marcar como leída</button>') + '</div>';

    h += '<div class="lesson-nav">' + (prev ? '<a class="btn" href="#/leccion/' + esc(prev.id) + '">← ' + esc(prev.title) + '</a>' : '<span></span>') +
      (next ? '<a class="btn ' + btnClass(t.id) + '" href="#/leccion/' + esc(next.id) + '">' + esc(next.title) + ' →</a>' : '<a class="btn primary" href="#/progreso">Ver progreso 🎉</a>') + '</div>';
    h += '</article></div>';
    return h;
  };

  /* ---------- quiz (estado en memoria) ---------- */
  const Q = { run: null };
  V.quizStart = function (lessonId) {
    const l = EX.lesson(lessonId);
    if (!l || !l.quiz) return;
    const seed = Date.now() % 100000;
    const rng = EX.rng(seed);
    const items = l.quiz.map((q, qi) => {
      const type = q.type || 'choice';
      if (type === 'tf' || type === 'fill') return { q, qi, order: null };
      const order = rng.shuffle(q.o.map((o, i) => i));
      return { q, qi, order };
    });
    Q.run = { lessonId, items, i: 0, correct: 0, answered: false, results: [], sel: [] };
  };
  V.quizHtml = function () {
    const r = Q.run;
    if (!r) return '';
    const l = EX.lesson(r.lessonId);
    const best = st().quiz[r.lessonId];
    if (r.i >= r.items.length) {
      const pct = Math.round(r.correct / r.items.length * 100);
      return '<div class="quiz"><div class="result"><div class="big">' + pct + ' %</div><p><b>' + r.correct + ' de ' + r.items.length + '</b> correctas' + (pct === 100 ? ' · ¡perfecto! 🎉' : pct >= 70 ? ' · ¡bien!' : ' · repasa la lección y vuelve a intentarlo') + '</p>' +
        (best ? '<p class="small muted">Mejor resultado: ' + best.best + ' % · intentos: ' + best.attempts + '</p>' : '') +
        '<div class="btnrow" style="justify-content:center"><button class="btn" data-act="quiz-again" data-id="' + esc(r.lessonId) + '">↻ Repetir</button>' +
        (r.wrongIds && r.wrongIds.length ? '<button class="btn" data-act="quiz-review">Ver mis errores</button>' : '') + '</div></div></div>';
    }
    const it = r.items[r.i];
    const q = it.q;
    const type = q.type || 'choice';
    let h = '<div class="quiz"><div class="qh"><h3>🧪 Cuestionario</h3><span class="small muted">Pregunta ' + (r.i + 1) + ' de ' + r.items.length + (best ? ' · mejor: ' + best.best + ' %' : '') + '</span></div>';
    h += '<div class="qprog">' + r.items.map((x, k) => '<i class="' + (k < r.i ? (r.results[k] ? 'ok' : 'bad') : k === r.i ? 'cur' : '') + '"></i>').join('') + '</div>';
    h += '<div class="qq">' + q.q + '</div>';
    if (type === 'tf') {
      h += '<div class="co">' + [['true', 'Verdadero'], ['false', 'Falso']].map(([v, lab]) => {
        let cls = '';
        if (r.answered) { if (String(q.a) === v) cls = 'ok'; else if (r.given === v) cls = 'bad'; }
        return '<button class="' + cls + '" data-act="quiz-opt" data-v="' + v + '" ' + (r.answered ? 'disabled' : '') + '><span class="ol">' + (v === 'true' ? 'V' : 'F') + '</span><span>' + lab + '</span></button>';
      }).join('') + '</div>';
    } else if (type === 'fill') {
      h += '<div class="co"><input class="fill" data-act="quiz-fill" placeholder="Escribe tu respuesta y pulsa Enter" ' + (r.answered ? 'disabled value="' + esc(r.given || '') + '"' : '') + '></div>' +
        (r.answered ? '' : '<div class="btnrow"><button class="btn primary" data-act="quiz-fill-ok">Comprobar</button></div>');
    } else {
      const multi = type === 'multi';
      h += (multi ? '<p class="small muted">Puede haber varias respuestas correctas.</p>' : '') + '<div class="co ' + (multi ? 'multi' : '') + '">' + it.order.map((oi, k) => {
        let cls = '';
        const isAns = multi ? (q.a || []).includes(oi) : Number(q.a) === oi;
        const chosen = multi ? r.sel.includes(oi) : r.given === oi;
        if (r.answered) { if (isAns) cls = 'ok'; else if (chosen) cls = 'bad'; }
        else if (chosen) cls = 'sel';
        return '<button class="' + cls + '" data-act="quiz-opt" data-v="' + oi + '" ' + (r.answered ? 'disabled' : '') + '><span class="ol">' + String.fromCharCode(65 + k) + '</span><span>' + q.o[oi] + '</span></button>';
      }).join('') + '</div>';
      if (multi && !r.answered) h += '<div class="btnrow"><button class="btn primary" data-act="quiz-multi-ok" ' + (r.sel.length ? '' : 'disabled') + '>Comprobar</button></div>';
    }
    if (r.answered) {
      const ok = r.results[r.i];
      h += '<div class="qw ' + (ok ? 'ok' : 'bad') + '"><b>' + (ok ? '✅ Correcto. ' : '❌ No exactamente. ') + '</b>' + (q.why || '') + '</div>' +
        '<div class="btnrow"><button class="btn primary" data-act="quiz-next">' + (r.i + 1 < r.items.length ? 'Siguiente →' : 'Ver resultado') + '</button></div>';
    }
    h += '</div>';
    return h;
  };
  V.quizAnswer = function (given) {
    const r = Q.run; if (!r || r.answered) return;
    const it = r.items[r.i];
    const q = it.q;
    const type = q.type || 'choice';
    let g = given;
    if (type === 'tf') g = given === 'true';
    else if (type === 'multi') g = r.sel;
    else if (type === 'choice') g = Number(given);
    const ok = EX.checkAnswer(q, g);
    r.answered = true; r.given = type === 'tf' ? String(given) : (type === 'choice' ? Number(given) : given);
    r.results[r.i] = ok;
    if (ok) r.correct++;
    else (r.wrongIds = r.wrongIds || []).push(it.qi);
  };
  V.quizToggle = function (oi) {
    const r = Q.run; if (!r || r.answered) return;
    const i = r.sel.indexOf(oi);
    if (i >= 0) r.sel.splice(i, 1); else r.sel.push(oi);
  };
  V.quizNext = function () {
    const r = Q.run; if (!r) return;
    r.i++; r.answered = false; r.sel = []; r.given = undefined;
    if (r.i >= r.items.length) {
      const res = EX.store.recordQuiz(r.lessonId, r.correct, r.items.length);
      r.final = res;
    }
  };
  V.quizRun = () => Q.run;

  /* ---------- tarjetas ---------- */
  EX.allCards = function () {
    const out = [];
    for (const l of EX.allLessons()) {
      (l.cards || []).forEach((c, i) => out.push({ id: l.id + '#' + i, front: c[0], back: c[1], lesson: l.id, track: l.track }));
    }
    return out;
  };
  const F = { queue: [], cur: null, flipped: false, done: 0, ok: 0, filter: 'all' };
  V.cardsStart = function (filter) {
    F.filter = filter || F.filter;
    let cards = EX.allCards();
    if (F.filter === 'ia' || F.filter === 'claude') cards = cards.filter(c => c.track === F.filter);
    if (F.filter === 'read') cards = cards.filter(c => EX.store.isRead(c.lesson));
    const due = EX.store.dueCards(cards.map(c => c.id));
    const rng = EX.rng(Date.now() % 99991);
    F.queue = rng.shuffle(cards.filter(c => due.includes(c.id))).slice(0, 20);
    F.cur = F.queue.shift() || null; F.flipped = false; F.done = 0; F.ok = 0;
    F.total = cards.length; F.dueTotal = due.length;
  };
  V.cards = function () {
    const S = st();
    const all = EX.allCards();
    const boxes = [0, 0, 0, 0, 0];
    all.forEach(c => { boxes[EX.store.cardState(c.id).box]++; });
    let h = '<div class="reading"><div class="pagehead"><p class="eyebrow">Repetición espaciada</p><h1>🃏 Tarjetas de memoria</h1><p class="lead">Cada tarjeta sube de caja cuando la aciertas y baja cuando fallas. Las cajas altas se repasan cada vez más tarde: así se fija el conocimiento con el mínimo esfuerzo.</p></div>';
    h += '<div class="boxes">' + ['Nuevas', '1 día', '3 días', '7 días', 'Dominadas'].map((n, i) => '<div><b>' + boxes[i] + '</b>' + n + '</div>').join('') + '</div>';
    h += '<div class="filters">' + [['all', 'Todas'], ['ia', 'Curso de IA'], ['claude', 'Manual de Claude'], ['read', 'Solo lecciones leídas']].map(([k, lab]) => '<button data-act="cards-filter" data-v="' + k + '" class="' + (F.filter === k ? 'on' : '') + '">' + lab + '</button>').join('') + '</div>';
    if (!F.cur) {
      h += '<div class="card center"><p style="font-size:2rem;margin:0">🎉</p><p><b>' + (F.done ? 'Sesión terminada: ' + F.ok + ' de ' + F.done + ' acertadas.' : 'No hay tarjetas pendientes en este filtro.') + '</b></p><p class="muted">Pendientes hoy: ' + (F.dueTotal || 0) + ' de ' + (F.total || 0) + '. Vuelve mañana o sigue leyendo lecciones para desbloquear más.</p>' +
        '<div class="btnrow" style="justify-content:center"><button class="btn" data-act="cards-start">↻ Buscar pendientes</button><a class="btn primary" href="#/curso">Seguir con el curso</a></div></div></div>';
      return h;
    }
    const c = F.cur;
    const stc = EX.store.cardState(c.id);
    const l = EX.lesson(c.lesson);
    h += '<div class="flash"><p class="small muted center">Quedan ' + (F.queue.length + 1) + ' en esta sesión · acertadas ' + F.ok + '/' + F.done + '</p>' +
      '<div class="flashcard" data-act="card-flip"><span class="fl">' + (F.flipped ? 'Respuesta' : 'Pregunta') + '</span><span class="fb">caja ' + stc.box + ' · ' + esc(l ? l.title : '') + '</span>' +
      (F.flipped ? '<div class="back">' + c.back + '</div>' : '<div>' + c.front + '</div>') + '</div>';
    if (!F.flipped) h += '<div class="fbtns"><button class="btn primary lg" data-act="card-flip">Ver respuesta</button></div>';
    else h += '<div class="fbtns"><button class="btn lg" data-act="card-grade" data-v="0">✗ No la sabía</button><button class="btn primary lg" data-act="card-grade" data-v="1">✓ La sabía</button></div>';
    h += '<p class="small muted center" style="margin-top:14px"><a href="#/leccion/' + esc(c.lesson) + '">Ir a la lección</a></p></div></div>';
    return h;
  };
  V.cardFlip = () => { F.flipped = !F.flipped; };
  V.cardGrade = ok => {
    if (!F.cur) return;
    EX.store.gradeCard(F.cur.id, ok);
    F.done++; if (ok) F.ok++;
    F.cur = F.queue.shift() || null; F.flipped = false;
  };

  /* ---------- biblioteca de prompts ---------- */
  const P = { cat: 'all', q: '' };
  V.prompts = function () {
    const cats = EX.PROMPTS.categories;
    let h = '<div class="track-claude"><div class="pagehead"><p class="eyebrow">Manual de Claude</p><h1>✍️ Biblioteca de prompts</h1><p class="lead">Prompts probados, organizados por uso. Cópialos, pégalos en Claude y adáptalos: cambia lo que va entre corchetes. Cada uno explica por qué funciona.</p></div>';
    h += '<input class="search" data-act="prompt-search" placeholder="Buscar en los prompts…" value="' + esc(P.q) + '">';
    h += '<div class="filters"><button data-act="prompt-cat" data-v="all" class="' + (P.cat === 'all' ? 'on' : '') + '">Todos</button>' + cats.map(c => '<button data-act="prompt-cat" data-v="' + esc(c.id) + '" class="' + (P.cat === c.id ? 'on' : '') + '">' + c.icon + ' ' + esc(c.title) + '</button>').join('') + '</div>';
    const q = P.q.trim().toLowerCase();
    for (const c of cats) {
      if (P.cat !== 'all' && P.cat !== c.id) continue;
      const items = c.items.filter(p => !q || (p.title + ' ' + p.text + ' ' + (p.why || '')).toLowerCase().includes(q));
      if (!items.length) continue;
      h += '<h2>' + c.icon + ' ' + esc(c.title) + '</h2>' + (c.desc ? '<p class="muted">' + c.desc + '</p>' : '');
      h += items.map(p => R.block(EX.B.prompt(p.title, p.text, p.why))).join('');
    }
    h += '</div>';
    return h;
  };
  V.promptState = P;

  /* ---------- glosario ---------- */
  const G = { q: '', cat: 'all' };
  V.glossary = function () {
    const q = G.q.trim().toLowerCase();
    const cats = EX.GLOSSARY.categories;
    let h = '<div class="reading"><div class="pagehead"><p class="eyebrow">Referencia</p><h1>🔤 Glosario</h1><p class="lead">Los términos que oirás en cualquier conversación seria sobre IA, explicados en una o dos frases. En inglés cuando el término se usa así en el sector.</p></div>';
    h += '<input class="search" data-act="gloss-search" placeholder="Buscar término…" value="' + esc(G.q) + '">';
    h += '<div class="filters"><button data-act="gloss-cat" data-v="all" class="' + (G.cat === 'all' ? 'on' : '') + '">Todos</button>' + cats.map(c => '<button data-act="gloss-cat" data-v="' + esc(c.id) + '" class="' + (G.cat === c.id ? 'on' : '') + '">' + esc(c.title) + '</button>').join('') + '</div>';
    let n = 0;
    h += '<div class="gloss">';
    for (const c of cats) {
      if (G.cat !== 'all' && G.cat !== c.id) continue;
      for (const t of c.terms.slice().sort((a, b) => a.t.localeCompare(b.t, 'es'))) {
        if (q && !(t.t + ' ' + (t.en || '') + ' ' + t.d).toLowerCase().includes(q)) continue;
        n++;
        h += '<div><b>' + esc(t.t) + (t.en ? '<span class="gen">' + esc(t.en) + '</span>' : '') + '</b><p>' + t.d + '</p>' + (t.l ? '<p class="small"><a href="#/leccion/' + esc(t.l) + '">Ver lección →</a></p>' : '') + '</div>';
      }
    }
    h += '</div>' + (n ? '' : '<p class="muted">Sin resultados.</p>') + '</div>';
    return h;
  };
  V.glossState = G;

  /* ---------- línea de tiempo ---------- */
  const T = { lab: 'all' };
  V.timeline = function () {
    const labs = [['all', 'Todo'], ['hito', 'Hitos científicos'], ['anthropic', 'Anthropic'], ['openai', 'OpenAI'], ['google', 'Google DeepMind'], ['deepseek', 'DeepSeek'], ['meta', 'Meta'], ['xai', 'xAI'], ['otros', 'Otros']];
    let h = '<div class="reading"><div class="pagehead"><p class="eyebrow">Historia</p><h1>🕰️ Línea de tiempo de la IA</h1><p class="lead">De la primera neurona artificial (1943) a los modelos de 2026. Filtra por laboratorio para ver la carrera desde cada bando.</p></div>';
    h += '<div class="filters">' + labs.map(([k, lab]) => '<button data-act="tl-lab" data-v="' + k + '" class="' + (T.lab === k ? 'on' : '') + '">' + lab + '</button>').join('') + '</div>';
    const ev = EX.TIMELINE.filter(e => T.lab === 'all' || e.lab === T.lab).slice().sort((a, b) => a.date.localeCompare(b.date));
    let year = null;
    h += '<div class="timeline">';
    for (const e of ev) {
      const y = e.date.slice(0, 4);
      if (y !== year) { year = y; h += '<div class="tl-year">' + y + '</div>'; }
      h += '<div class="tl-item ' + esc(e.lab) + '"><b>' + esc(e.title) + '</b><div class="tld">' + e.desc + '</div><div class="tlm"><span class="tag">' + esc(e.date.length > 4 ? e.date : y) + '</span>' + (e.tags || []).map(t => '<span class="tag">' + esc(t) + '</span>').join('') + (e.l ? '<a href="#/leccion/' + esc(e.l) + '">lección →</a>' : '') + '</div></div>';
    }
    h += '</div></div>';
    return h;
  };
  V.tlState = T;

  /* ---------- biblioteca de recursos ---------- */
  const L = { type: 'all', topic: 'all', q: '' };
  V.library = function () {
    const items = EX.RESOURCES.items;
    const topics = EX.RESOURCES.topics;
    const types = [['all', 'Todo'], ['video', '🎬 Vídeos'], ['course', '🎓 Cursos'], ['article', '📄 Artículos'], ['doc', '📑 Documentación'], ['paper', '🧪 Papers'], ['book', '📘 Libros'], ['podcast', '🎙️ Podcasts'], ['repo', '💻 Código']];
    let h = '<div class="reading"><div class="pagehead"><p class="eyebrow">Para leer y ver</p><h1>📚 Biblioteca</h1><p class="lead">Todo lo que merece la pena leer o ver para llegar a nivel experto, ordenado por tema y formato. Empieza por lo marcado como <span class="tag">imprescindible</span>. Los recursos en español están marcados con <span class="tag">ES</span>.</p></div>';
    h += '<input class="search" data-act="lib-search" placeholder="Buscar recurso…" value="' + esc(L.q) + '">';
    h += '<div class="filters">' + types.map(([k, lab]) => '<button data-act="lib-type" data-v="' + k + '" class="' + (L.type === k ? 'on' : '') + '">' + lab + '</button>').join('') + '</div>';
    h += '<div class="filters"><button data-act="lib-topic" data-v="all" class="' + (L.topic === 'all' ? 'on' : '') + '">Todos los temas</button>' + topics.map(t => '<button data-act="lib-topic" data-v="' + esc(t.id) + '" class="' + (L.topic === t.id ? 'on' : '') + '">' + esc(t.title) + '</button>').join('') + '</div>';
    const q = L.q.trim().toLowerCase();
    let n = 0;
    for (const t of topics) {
      if (L.topic !== 'all' && L.topic !== t.id) continue;
      const list = items.filter(r => r.topic === t.id && (L.type === 'all' || r.type === L.type) && (!q || (r.t + ' ' + (r.note || '')).toLowerCase().includes(q)));
      if (!list.length) continue;
      n += list.length;
      h += '<h2>' + esc(t.title) + '</h2>' + R.links(list.map(r => Object.assign({}, r, { note: (r.must ? '<span class="tag">imprescindible</span> ' : '') + (r.note || '') })));
    }
    h += (n ? '' : '<p class="muted">Sin resultados.</p>') + '<p class="small muted">Enlaces revisados en septiembre de 2026. Si alguno deja de funcionar, busca el título entre comillas.</p></div>';
    return h;
  };
  V.libState = L;

  /* ---------- plan ---------- */
  V.plan = function () {
    const S = st();
    const start = S.created;
    const week = Math.min(8, Math.max(1, Math.floor(EX.daysBetween(start, EX.today()) / 7) + 1));
    let h = '<div class="reading"><div class="pagehead"><p class="eyebrow">Ruta</p><h1>🗓️ Plan de 8 semanas</h1><p class="lead">Unas 4 horas por semana: una lección al día entre semana, tarjetas cada día y una práctica real con Claude el fin de semana. Empezaste el ' + esc(start) + ' · vas por la semana ' + week + '.</p></div>';
    EX.PLAN.forEach((w, i) => {
      const lessons = w.lessons.map(id => EX.lesson(id)).filter(Boolean);
      const done = lessons.filter(l => EX.store.isRead(l.id)).length;
      const cur = i + 1 === week;
      h += '<div class="card" style="margin-bottom:14px;' + (cur ? 'border-color:var(--brand)' : '') + '"><div class="row"><h3 style="margin:0" class="grow">Semana ' + (i + 1) + ' · ' + esc(w.title) + '</h3>' + (cur ? '<span class="tag">esta semana</span>' : '') + '<span class="small muted">' + done + '/' + lessons.length + '</span></div>' +
        '<p class="muted" style="margin:6px 0 10px">' + w.goal + '</p><ul class="lesson-list">' +
        lessons.map(l => '<li><a href="#/leccion/' + esc(l.id) + '"><span class="num ' + (EX.store.isRead(l.id) ? 'done' : '') + '">' + (EX.store.isRead(l.id) ? '✓' : '·') + '</span><span class="lt"><b>' + esc(l.title) + '</b><span>' + (l.minutes || 10) + ' min</span></span></a></li>').join('') +
        '</ul>' + (w.practice ? '<div class="callout tip"><div class="ci">🛠️</div><div class="cb"><span class="clabel">Práctica del fin de semana</span>' + w.practice + '</div></div>' : '') + '</div>';
    });
    h += '</div>';
    return h;
  };

  /* ---------- progreso ---------- */
  V.progress = function () {
    const S = st();
    const lv = EX.store.level();
    const all = EX.allLessons();
    let h = '<div class="reading"><div class="pagehead"><p class="eyebrow">Tu avance</p><h1>📈 Progreso</h1></div>';
    h += '<div class="progress-grid">' +
      '<div class="card"><div class="small muted">Nivel</div><b style="font-size:2rem">' + lv.n + '</b><div class="bar"><i style="width:' + lv.pct + '%"></i></div><div class="small muted">' + EX.fmt(lv.xp) + ' XP' + (lv.next ? ' · siguiente nivel a ' + EX.fmt(lv.next) : ' · nivel máximo') + '</div></div>' +
      '<div class="card"><div class="small muted">Racha</div><b style="font-size:2rem">' + (S.streak.count || 0) + ' 🔥</b><div class="small muted">mejor racha: ' + (S.streak.best || 0) + ' días</div></div>' +
      '<div class="card"><div class="small muted">Lecciones</div><b style="font-size:2rem">' + all.filter(l => S.read[l.id]).length + '/' + all.length + '</b><div class="small muted">' + Object.keys(S.quiz).length + ' cuestionarios hechos</div></div>' +
      '<div class="card"><div class="small muted">Tarjetas dominadas</div><b style="font-size:2rem">' + EX.allCards().filter(c => EX.store.cardState(c.id).box >= 4).length + '</b><div class="small muted">de ' + EX.allCards().length + '</div></div></div>';
    // actividad últimas 8 semanas
    h += '<h2>Actividad (últimas 8 semanas)</h2><div class="heat">';
    for (let i = 55; i >= 0; i--) {
      const d = EX.addDays(EX.today(), -i);
      const n = S.days[d] || 0;
      h += '<i class="' + (n >= 6 ? 'l3' : n >= 3 ? 'l2' : n ? 'l1' : '') + '" title="' + d + ': ' + n + '"></i>';
    }
    h += '</div>';
    for (const t of EX.TRACKS) {
      h += '<h2>' + t.icon + ' ' + esc(t.title) + '</h2>';
      for (const m of t.modules) {
        const pct = EX.store.lessonPct(m.lessons);
        const qa = EX.store.quizAvg(m.lessons);
        h += '<div class="row" style="margin:8px 0"><span style="width:28px">' + m.icon + '</span><a class="grow" href="#/modulo/' + esc(m.id) + '">' + esc(m.title) + '</a><span class="small muted" style="width:120px;text-align:right">' + pct + ' % leído' + (qa !== null ? ' · ' + qa + ' %' : '') + '</span></div><div class="bar ' + (t.id === 'claude' ? 'claude' : '') + '"><i style="width:' + pct + '%"></i></div>';
      }
    }
    if (S.bookmarks.length) {
      h += '<h2>🔖 Guardadas</h2><ul class="lesson-list">' + S.bookmarks.map(id => EX.lesson(id)).filter(Boolean).map(l => '<li><a href="#/leccion/' + esc(l.id) + '"><span class="num">🔖</span><span class="lt"><b>' + esc(l.title) + '</b></span></a></li>').join('') + '</ul>';
    }
    const notes = Object.keys(S.notes);
    if (notes.length) {
      h += '<h2>📝 Tus notas</h2>' + notes.map(id => { const l = EX.lesson(id); return l ? '<div class="card" style="margin-bottom:10px"><b><a href="#/leccion/' + esc(id) + '">' + esc(l.title) + '</a></b><p style="white-space:pre-wrap;margin:6px 0 0">' + esc(S.notes[id]) + '</p></div>' : ''; }).join('');
    }
    h += '</div>';
    return h;
  };

  /* ---------- ajustes ---------- */
  V.settings = function () {
    const S = st();
    return '<div class="reading"><div class="pagehead"><h1>⚙️ Ajustes</h1></div>' +
      '<div class="card"><h3>Apariencia</h3><div class="row"><label>Tema</label><select data-set="theme"><option value="auto" ' + (S.settings.theme === 'auto' ? 'selected' : '') + '>Automático</option><option value="light" ' + (S.settings.theme === 'light' ? 'selected' : '') + '>Claro</option><option value="dark" ' + (S.settings.theme === 'dark' ? 'selected' : '') + '>Oscuro</option></select>' +
      '<label>Letra</label><select data-set="font"><option value="sm" ' + (S.settings.font === 'sm' ? 'selected' : '') + '>Pequeña</option><option value="md" ' + (S.settings.font === 'md' ? 'selected' : '') + '>Normal</option><option value="lg" ' + (S.settings.font === 'lg' ? 'selected' : '') + '>Grande</option></select></div></div>' +
      '<div class="card" style="margin-top:14px"><h3>Copia de seguridad</h3><p class="muted">El progreso vive en este navegador. Descarga una copia para llevarlo a otro dispositivo.</p><div class="btnrow"><button class="btn" data-act="export">⬇️ Descargar progreso (.json)</button><label class="btn">⬆️ Cargar copia <input type="file" accept="application/json" data-act="import" hidden></label></div></div>' +
      '<div class="card" style="margin-top:14px"><h3>Reiniciar</h3><p class="muted">Borra todo el progreso de este navegador.</p><button class="btn" data-act="reset">🗑️ Borrar progreso</button></div>' +
      '<p class="small muted" style="margin-top:20px">Expertia v' + EX.VERSION + ' · sitio estático sin servidor: nada de lo que escribes sale de tu navegador.</p></div>';
  };

  V.notFound = () => '<div class="reading center" style="padding:60px 0"><h1>No encontrado</h1><p class="muted">Esa página no existe.</p><a class="btn primary" href="#/">Volver al inicio</a></div>';
})();
