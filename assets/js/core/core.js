/* Expertia · núcleo: utilidades, bloques de contenido y registro del curso.
   Sin dependencias, sin compilación: ficheros clásicos en orden. */
(function () {
  'use strict';
  const EX = (window.EX = window.EX || {});

  EX.VERSION = '1.0.0';

  /* ---------- utilidades ---------- */
  EX.esc = s => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  EX.slug = s => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  EX.today = () => {
    const d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  };
  EX.addDays = (iso, n) => {
    const d = new Date(iso + 'T12:00:00');
    d.setDate(d.getDate() + n);
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  };
  EX.daysBetween = (a, b) => Math.round((new Date(b + 'T12:00:00') - new Date(a + 'T12:00:00')) / 86400000);

  /* generador determinista (mulberry32) para barajar preguntas de forma reproducible */
  EX.rng = function (seed) {
    let a = (seed >>> 0) || 1;
    const next = () => {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    return {
      next,
      int: (lo, hi) => lo + Math.floor(next() * (hi - lo + 1)),
      pick: arr => arr[Math.floor(next() * arr.length)],
      shuffle: arr => {
        const c = arr.slice();
        for (let i = c.length - 1; i > 0; i--) {
          const j = Math.floor(next() * (i + 1));
          [c[i], c[j]] = [c[j], c[i]];
        }
        return c;
      }
    };
  };

  EX.fmt = n => Number(n).toLocaleString('es-ES');

  EX.minutesLabel = m => m < 60 ? m + ' min' : Math.round(m / 60 * 10) / 10 + ' h';

  /* ---------- bloques de contenido ----------
     Las lecciones se escriben como listas de bloques; la vista los convierte en HTML.
     Cada helper devuelve un objeto {t: tipo, ...}. */
  const B = (EX.B = {});
  B.h = txt => ({ t: 'h', txt });
  B.h3 = txt => ({ t: 'h3', txt });
  B.p = html => ({ t: 'p', html });
  B.lead = html => ({ t: 'lead', html });
  B.key = html => ({ t: 'key', html });          // idea clave
  B.tip = html => ({ t: 'tip', html });          // consejo práctico
  B.warn = html => ({ t: 'warn', html });        // cuidado / error común
  B.note = html => ({ t: 'note', html });        // matiz o dato
  B.analogy = html => ({ t: 'analogy', html });  // analogía
  B.quote = (html, who) => ({ t: 'quote', html, who });
  B.list = items => ({ t: 'list', items });
  B.olist = items => ({ t: 'olist', items });
  B.table = (head, rows, caption) => ({ t: 'table', head, rows, caption });
  B.code = (lang, src, title) => ({ t: 'code', lang, src, title });
  B.prompt = (title, text, why) => ({ t: 'prompt', title, text, why }); // prompt copiable
  B.compare = (aTitle, aItems, bTitle, bItems) => ({ t: 'compare', aTitle, aItems, bTitle, bItems });
  B.fig = (svg, caption) => ({ t: 'fig', svg, caption });
  B.deep = (title, blocks) => ({ t: 'deep', title, blocks }); // profundiza (plegable)
  B.ex = (title, blocks) => ({ t: 'ex', title, blocks });     // ejemplo resuelto
  B.steps = (title, steps) => ({ t: 'steps', title, steps }); // reproductor paso a paso
  B.check = (q, options, answer, why) => ({ t: 'check', q, options, answer, why }); // mini comprobación inline
  B.terms = pairs => ({ t: 'terms', pairs });                 // término → definición
  B.cards = items => ({ t: 'cards', items });                 // tarjetas de resumen {icon,title,html}
  B.links = items => ({ t: 'links', items });                 // recursos {t,u,note}
  B.hr = () => ({ t: 'hr' });

  /* ---------- registro de contenido ---------- */
  EX.TRACKS = [];        // pistas (curso IA, manual Claude)
  EX.track = function (def) {
    if (!def.id || !def.title || !Array.isArray(def.modules)) throw new Error('track inválido');
    EX.TRACKS.push(def);
    return def;
  };
  EX.allModules = () => EX.TRACKS.flatMap(t => t.modules.map(m => Object.assign({ track: t.id }, m)));
  EX.allLessons = () => EX.allModules().flatMap(m => m.lessons.map(l => Object.assign({ module: m.id, track: m.track }, l)));
  EX.module = id => EX.allModules().find(m => m.id === id);
  EX.lesson = id => EX.allLessons().find(l => l.id === id);
  EX.trackOf = id => EX.TRACKS.find(t => t.id === id);
  EX.moduleOfLesson = id => EX.allModules().find(m => m.lessons.some(l => l.id === id));
  EX.nextLesson = id => {
    const all = EX.allLessons();
    const i = all.findIndex(l => l.id === id);
    return i >= 0 && i + 1 < all.length ? all[i + 1] : null;
  };
  EX.prevLesson = id => {
    const all = EX.allLessons();
    const i = all.findIndex(l => l.id === id);
    return i > 0 ? all[i - 1] : null;
  };

  /* Preguntas: {q, o:[...], a: índice | [índices], why}. type:'tf' usa a:true/false.
     type:'fill' usa a: [respuestas aceptadas] (texto, sin distinguir mayúsculas). */
  EX.checkAnswer = function (question, given) {
    const type = question.type || 'choice';
    if (type === 'tf') return Boolean(given) === Boolean(question.a);
    if (type === 'multi') {
      const want = (question.a || []).slice().sort().join(',');
      const got = (Array.isArray(given) ? given : []).slice().sort().join(',');
      return want === got;
    }
    if (type === 'fill') {
      const norm = s => String(s || '').trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, ' ');
      return (question.a || []).some(acc => norm(acc) === norm(given));
    }
    return Number(given) === Number(question.a);
  };

  /* Utilidad de copiado */
  EX.copy = async function (text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (e) {
      const ta = document.createElement('textarea');
      ta.value = text; document.body.appendChild(ta); ta.select();
      let ok = false;
      try { ok = document.execCommand('copy'); } catch (err) { ok = false; }
      ta.remove();
      return ok;
    }
  };
})();
