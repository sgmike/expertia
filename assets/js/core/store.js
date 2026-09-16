/* Expertia · progreso y ajustes en localStorage. */
(function () {
  'use strict';
  const EX = window.EX;
  const KEY = 'expertia.v1';

  const DEFAULTS = {
    settings: { theme: 'auto', font: 'md', name: '' },
    read: {},          // lessonId -> fecha ISO de lectura completa
    quiz: {},          // lessonId -> {best, attempts, last, correct, total}
    cards: {},         // cardId -> {box (0-4), due 'YYYY-MM-DD', seen, ok}
    notes: {},         // lessonId -> texto
    bookmarks: [],     // ids de lecciones o prompts
    days: {},          // 'YYYY-MM-DD' -> minutos/acciones del día
    xp: 0,
    streak: { count: 0, last: null, best: 0 },
    prompts: {},       // promptId -> veces copiado
    created: null
  };

  let S = null;

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      S = raw ? JSON.parse(raw) : null;
    } catch (e) { S = null; }
    if (!S || typeof S !== 'object') S = JSON.parse(JSON.stringify(DEFAULTS));
    for (const k of Object.keys(DEFAULTS)) if (S[k] === undefined) S[k] = JSON.parse(JSON.stringify(DEFAULTS[k]));
    S.settings = Object.assign({}, DEFAULTS.settings, S.settings || {});
    if (!S.created) S.created = EX.today();
    return S;
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* sin almacenamiento */ }
  }

  const store = (EX.store = {
    load, save,
    get: () => S || load(),

    setSetting(k, v) { S.settings[k] = v; save(); },

    touchDay(n) {
      const d = EX.today();
      S.days[d] = (S.days[d] || 0) + (n || 1);
      // racha
      const st = S.streak;
      if (st.last !== d) {
        if (st.last && EX.daysBetween(st.last, d) === 1) st.count += 1;
        else if (!st.last || EX.daysBetween(st.last, d) > 1) st.count = 1;
        st.last = d;
        st.best = Math.max(st.best || 0, st.count);
      }
      save();
    },

    addXp(n) { S.xp = (S.xp || 0) + n; this.touchDay(1); save(); },

    markRead(lessonId) {
      const first = !S.read[lessonId];
      S.read[lessonId] = EX.today();
      if (first) this.addXp(20); else save();
      return first;
    },
    isRead: id => !!(S && S.read[id]),

    recordQuiz(lessonId, correct, total) {
      const q = S.quiz[lessonId] || { best: 0, attempts: 0, last: null, correct: 0, total: 0 };
      const pct = total ? Math.round(correct / total * 100) : 0;
      q.attempts += 1; q.last = EX.today(); q.correct = correct; q.total = total;
      const improved = pct > q.best;
      q.best = Math.max(q.best, pct);
      S.quiz[lessonId] = q;
      this.addXp(correct * 5 + (pct === 100 ? 15 : 0));
      return { pct, improved };
    },

    /* Tarjetas: sistema de cajas (Leitner). Caja 0 = nueva, 4 = dominada. */
    cardState(id) { return S.cards[id] || { box: 0, due: EX.today(), seen: 0, ok: 0 }; },
    gradeCard(id, ok) {
      const INTERVALS = [0, 1, 3, 7, 21];
      const c = this.cardState(id);
      c.seen += 1;
      if (ok) { c.ok += 1; c.box = Math.min(4, c.box + 1); }
      else c.box = Math.max(0, c.box - 1);
      c.due = EX.addDays(EX.today(), INTERVALS[c.box] || 0);
      S.cards[id] = c;
      this.addXp(ok ? 2 : 1);
      return c;
    },
    dueCards(allIds) {
      const t = EX.today();
      return allIds.filter(id => {
        const c = S.cards[id];
        return !c || c.due <= t;
      });
    },

    setNote(lessonId, text) { if (text && text.trim()) S.notes[lessonId] = text; else delete S.notes[lessonId]; save(); },
    toggleBookmark(id) {
      const i = S.bookmarks.indexOf(id);
      if (i >= 0) S.bookmarks.splice(i, 1); else S.bookmarks.push(id);
      save();
      return i < 0;
    },
    isBookmarked: id => S.bookmarks.includes(id),
    countCopy(id) { S.prompts[id] = (S.prompts[id] || 0) + 1; save(); },

    /* resúmenes */
    lessonPct(lessons) {
      const n = lessons.length; if (!n) return 0;
      return Math.round(lessons.filter(l => S.read[l.id]).length / n * 100);
    },
    quizAvg(lessons) {
      const done = lessons.filter(l => S.quiz[l.id]);
      if (!done.length) return null;
      return Math.round(done.reduce((s, l) => s + S.quiz[l.id].best, 0) / done.length);
    },
    level() {
      const xp = S.xp || 0;
      const LV = [0, 100, 250, 500, 900, 1400, 2000, 2800, 3800, 5000, 6500];
      let i = 0; while (i + 1 < LV.length && xp >= LV[i + 1]) i++;
      const next = LV[i + 1] || null;
      return { n: i + 1, xp, next, pct: next ? Math.round((xp - LV[i]) / (next - LV[i]) * 100) : 100 };
    },
    activeDays(n) {
      let c = 0;
      for (let i = 0; i < n; i++) if (S.days[EX.addDays(EX.today(), -i)]) c++;
      return c;
    },

    exportJson() { return JSON.stringify(S, null, 2); },
    importJson(text) {
      const obj = JSON.parse(text);
      if (!obj || typeof obj !== 'object' || !obj.read) throw new Error('formato');
      S = obj; load(); save();
    },
    reset() { S = JSON.parse(JSON.stringify(DEFAULTS)); S.created = EX.today(); save(); }
  });
})();
