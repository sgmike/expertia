/* Expertia · convierte bloques de contenido en HTML. */
(function () {
  'use strict';
  const EX = window.EX;
  const esc = EX.esc;

  const ICONS = { key: '💡', tip: '✅', warn: '⚠️', note: 'ℹ️', analogy: '🧩' };
  const LABELS = { key: 'Idea clave', tip: 'Consejo', warn: 'Cuidado', note: 'Dato', analogy: 'Analogía' };
  const LINK_ICON = { article: '📄', video: '🎬', course: '🎓', paper: '🧪', book: '📘', doc: '📑', tool: '🛠️', podcast: '🎙️', repo: '💻' };
  const LINK_LABEL = { article: 'artículo', video: 'vídeo', course: 'curso', paper: 'paper', book: 'libro', doc: 'documentación', tool: 'herramienta', podcast: 'podcast', repo: 'código' };

  let uid = 0;
  const nextId = p => (p || 'b') + (++uid);

  function blocks(list, ctx) {
    ctx = ctx || {};
    return (list || []).map(b => block(b, ctx)).join('');
  }

  function callout(kind, html) {
    return '<div class="callout ' + kind + '"><div class="ci">' + ICONS[kind] + '</div><div class="cb"><span class="clabel">' + LABELS[kind] + '</span>' + html + '</div></div>';
  }

  function block(b, ctx) {
    if (!b) return '';
    switch (b.t) {
      case 'h': return '<h2 id="' + esc(EX.slug(b.txt)) + '">' + esc(b.txt) + '</h2>';
      case 'h3': return '<h3>' + esc(b.txt) + '</h3>';
      case 'p': return '<p>' + b.html + '</p>';
      case 'lead': return '<p class="lead">' + b.html + '</p>';
      case 'key': case 'tip': case 'warn': case 'note': case 'analogy': return callout(b.t, b.html);
      case 'quote': return '<blockquote class="q">' + b.html + (b.who ? '<footer>— ' + b.who + '</footer>' : '') + '</blockquote>';
      case 'list': return '<ul>' + b.items.map(i => '<li>' + i + '</li>').join('') + '</ul>';
      case 'olist': return '<ol>' + b.items.map(i => '<li>' + i + '</li>').join('') + '</ol>';
      case 'table':
        return '<div class="tbl"><table>' + (b.caption ? '<caption>' + b.caption + '</caption>' : '') +
          '<thead><tr>' + b.head.map(h => '<th>' + h + '</th>').join('') + '</tr></thead><tbody>' +
          b.rows.map(r => '<tr>' + r.map(c => '<td>' + c + '</td>').join('') + '</tr>').join('') + '</tbody></table></div>';
      case 'code': {
        const id = nextId('code');
        return '<div class="codebox" id="' + id + '"><div class="ch"><span>' + esc(b.title || b.lang || '') + '</span>' +
          '<button data-act="copy-code" data-target="' + id + '">Copiar</button></div>' +
          '<pre><code class="lang-' + esc(b.lang || 'text') + '">' + esc(b.src) + '</code></pre></div>';
      }
      case 'prompt': {
        const id = nextId('pr');
        return '<div class="promptbox" id="' + id + '"><div class="ph"><span>✍️ ' + esc(b.title || 'Prompt') + '</span>' +
          '<button data-act="copy-prompt" data-target="' + id + '">Copiar prompt</button></div>' +
          '<pre>' + esc(b.text) + '</pre>' + (b.why ? '<div class="pw"><b>Por qué funciona:</b> ' + b.why + '</div>' : '') + '</div>';
      }
      case 'compare':
        return '<div class="compare"><div><h4>' + b.aTitle + '</h4><ul>' + b.aItems.map(i => '<li>' + i + '</li>').join('') + '</ul></div>' +
          '<div><h4>' + b.bTitle + '</h4><ul>' + b.bItems.map(i => '<li>' + i + '</li>').join('') + '</ul></div></div>';
      case 'fig': return '<figure class="fig">' + b.svg + (b.caption ? '<figcaption>' + b.caption + '</figcaption>' : '') + '</figure>';
      case 'deep': return '<details class="deep"><summary>🔬 ' + esc(b.title) + '</summary><div class="db">' + blocks(b.blocks, ctx) + '</div></details>';
      case 'ex': return '<details class="ex" open><summary>🧪 ' + esc(b.title) + '</summary><div class="db">' + blocks(b.blocks, ctx) + '</div></details>';
      case 'steps': return player(b);
      case 'check': return check(b);
      case 'terms': return '<dl class="terms">' + b.pairs.map(p => '<dt>' + p[0] + '</dt><dd>' + p[1] + '</dd>').join('') + '</dl>';
      case 'cards': return '<div class="summary-cards">' + b.items.map(c => '<div><div class="sci">' + (c.icon || '•') + '</div><h4>' + c.title + '</h4><p>' + c.html + '</p></div>').join('') + '</div>';
      case 'links': return links(b.items);
      case 'hr': return '<hr class="sep">';
      default: return '';
    }
  }

  function links(items) {
    return '<ul class="links">' + items.map(l => {
      const type = l.type || 'article';
      return '<li><span class="lk">' + (LINK_ICON[type] || '🔗') + '</span><div><a href="' + esc(l.u) + '" target="_blank" rel="noopener">' + esc(l.t) + '</a>' +
        '<span class="lb">' + (LINK_LABEL[type] || 'enlace') + '</span>' + (l.lang ? '<span class="lb">' + esc(l.lang) + '</span>' : '') + (l.min ? '<span class="lb">' + l.min + ' min</span>' : '') +
        (l.note ? '<span class="ln">' + l.note + '</span>' : '') + '</div></li>';
    }).join('') + '</ul>';
  }

  function player(b) {
    const id = nextId('pl');
    return '<div class="player" id="' + id + '" data-n="' + b.steps.length + '" data-i="0">' +
      '<div class="pt">▶ ' + esc(b.title) + '<span>paso <b class="pcur">1</b> de ' + b.steps.length + '</span></div>' +
      '<div class="ps">' + b.steps.map((s, i) => '<div class="stp' + (i === 0 ? ' on' : '') + '"><span class="sn">Paso ' + (i + 1) + '</span><div>' + s + '</div></div>').join('') + '</div>' +
      '<div class="pc"><button data-act="pl-prev" data-target="' + id + '" title="Anterior">⏮</button>' +
      '<button data-act="pl-play" data-target="' + id + '" title="Reproducir">▶</button>' +
      '<button data-act="pl-next" data-target="' + id + '" title="Siguiente">⏭</button>' +
      '<div class="dots">' + b.steps.map((s, i) => '<i class="' + (i === 0 ? 'on' : '') + '"></i>').join('') + '</div></div></div>';
  }

  function check(b) {
    const id = nextId('ck');
    return '<div class="check" id="' + id + '" data-answer="' + b.answer + '"><div class="cq">🤔 ' + b.q + '</div><div class="co">' +
      b.options.map((o, i) => '<button data-act="check-opt" data-target="' + id + '" data-i="' + i + '">' + o + '</button>').join('') +
      '</div><div class="cw hidden">' + (b.why || '') + '</div></div>';
  }

  /* reproductor paso a paso: controlador */
  const timers = {};
  function plSet(el, i) {
    const n = Number(el.dataset.n);
    i = Math.max(0, Math.min(n - 1, i));
    el.dataset.i = i;
    el.querySelectorAll('.stp').forEach((s, k) => s.classList.toggle('on', k === i));
    el.querySelectorAll('.dots i').forEach((d, k) => d.classList.toggle('on', k <= i));
    const cur = el.querySelector('.pcur'); if (cur) cur.textContent = i + 1;
  }
  function plStop(el) {
    if (timers[el.id]) { clearInterval(timers[el.id]); delete timers[el.id]; }
    const btn = el.querySelector('[data-act="pl-play"]'); if (btn) btn.textContent = '▶';
  }
  function plPlay(el) {
    if (timers[el.id]) return plStop(el);
    const n = Number(el.dataset.n);
    if (Number(el.dataset.i) >= n - 1) plSet(el, 0);
    const btn = el.querySelector('[data-act="pl-play"]'); if (btn) btn.textContent = '⏸';
    timers[el.id] = setInterval(() => {
      const i = Number(el.dataset.i);
      if (i >= n - 1) return plStop(el);
      plSet(el, i + 1);
    }, 3200);
  }

  EX.render = { blocks, block, links, plSet, plStop, plPlay, LINK_ICON, LINK_LABEL };
})();
