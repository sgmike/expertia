#!/usr/bin/env node
/* Comprueba el contenido sin navegador: carga los scripts en un contexto simulado y valida
   lecciones, bloques, cuestionarios, tarjetas, recursos, glosario, prompts, línea de tiempo y plan. */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const scripts = [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map(m => m[1]);

const errors = [];
const warn = [];
const fail = (msg) => errors.push(msg);

// Contexto mínimo tipo navegador para los ficheros de contenido y núcleo
const sandbox = {
  console,
  window: {},
  document: { addEventListener() {}, querySelector() { return null; }, querySelectorAll() { return []; }, getElementById() { return null; }, documentElement: { dataset: {} } },
  localStorage: { _d: {}, getItem(k) { return this._d[k] === undefined ? null : this._d[k]; }, setItem(k, v) { this._d[k] = String(v); }, removeItem(k) { delete this._d[k]; } },
  location: { hash: '', protocol: 'file:' },
  navigator: {},
  setTimeout, clearTimeout, setInterval, clearInterval, URL, Blob: class {}, FileReader: class {}
};
sandbox.window.EX = undefined;
sandbox.window.addEventListener = () => {};
sandbox.self = sandbox.window;
vm.createContext(sandbox);

// Cargamos núcleo y contenido y render (no main.js, que arranca la app)
const load = scripts.filter(s => !s.endsWith('app/main.js'));
for (const s of load) {
  const src = fs.readFileSync(path.join(ROOT, s), 'utf8');
  try {
    vm.runInContext('var EX = window.EX; ' + src + '; window.EX = window.EX || EX;', sandbox, { filename: s });
  } catch (e) {
    fail('Error al cargar ' + s + ': ' + e.message);
  }
}
const EX = sandbox.window.EX;
if (!EX) { console.error(errors.join('\n')); process.exit(1); }

const BLOCK_TYPES = new Set(['h', 'h3', 'p', 'lead', 'key', 'tip', 'warn', 'note', 'analogy', 'quote', 'list', 'olist', 'table', 'code', 'prompt', 'compare', 'fig', 'deep', 'ex', 'steps', 'check', 'terms', 'cards', 'links', 'hr']);
const LINK_TYPES = new Set(['article', 'video', 'course', 'paper', 'book', 'doc', 'tool', 'podcast', 'repo']);
const LEVELS = new Set(['básico', 'intermedio', 'avanzado']);

const lessons = EX.allLessons();
const ids = new Set();
let stats = { lessons: 0, blocks: 0, quiz: 0, cards: 0, resources: 0, checks: 0, steps: 0, prompts: 0, words: 0 };

function checkBlocks(blocks, where, depth) {
  if (!Array.isArray(blocks)) return fail(where + ': body no es un array');
  for (const b of blocks) {
    stats.blocks++;
    if (!b || !BLOCK_TYPES.has(b.t)) { fail(where + ': bloque inválido ' + JSON.stringify(b).slice(0, 80)); continue; }
    const s = JSON.stringify(b);
    if (/undefined|NaN|\[object Object\]/.test(s)) fail(where + ': bloque con undefined/NaN/[object Object]: ' + s.slice(0, 120));
    stats.words += s.replace(/<[^>]+>/g, ' ').split(/\s+/).length;
    if ((b.t === 'deep' || b.t === 'ex') && depth < 3) checkBlocks(b.blocks, where + ' > ' + b.t, depth + 1);
    if (b.t === 'check') {
      stats.checks++;
      if (!Array.isArray(b.options) || b.options.length < 2) fail(where + ': check sin opciones');
      if (typeof b.answer !== 'number' || b.answer < 0 || b.answer >= b.options.length) fail(where + ': check con respuesta fuera de rango');
      if (!b.why) warn.push(where + ': check sin explicación');
    }
    if (b.t === 'steps') { stats.steps++; if (!Array.isArray(b.steps) || b.steps.length < 2) fail(where + ': steps con menos de 2 pasos'); }
    if (b.t === 'prompt') { stats.prompts++; if (!b.text || b.text.length < 40) fail(where + ': prompt demasiado corto'); }
    if (b.t === 'table') {
      if (!Array.isArray(b.head) || !Array.isArray(b.rows)) fail(where + ': tabla mal formada');
      else for (const r of b.rows) if (r.length !== b.head.length) fail(where + ': fila de tabla con ' + r.length + ' celdas, cabecera con ' + b.head.length);
    }
    if (b.t === 'compare' && (!Array.isArray(b.aItems) || !Array.isArray(b.bItems))) fail(where + ': compare mal formado');
    if (b.t === 'links') checkLinks(b.items, where);
    // enlaces internos
    for (const m of s.matchAll(/href=\\"#\/leccion\/([^\\"]+)\\"/g)) if (!EX.lesson(m[1])) fail(where + ': enlace a lección inexistente ' + m[1]);
  }
}
function checkLinks(items, where) {
  if (!Array.isArray(items)) return fail(where + ': recursos no es un array');
  for (const r of items) {
    stats.resources++;
    if (!r.t || !r.u) fail(where + ': recurso sin título o URL');
    if (!/^https?:\/\//.test(r.u || '')) fail(where + ': URL inválida ' + r.u);
    if (r.type && !LINK_TYPES.has(r.type)) fail(where + ': tipo de recurso desconocido ' + r.type);
    if (r.lang && !['ES', 'EN'].includes(r.lang)) fail(where + ': lang desconocido ' + r.lang);
  }
}

for (const l of lessons) {
  stats.lessons++;
  const where = l.id;
  if (ids.has(l.id)) fail('id de lección duplicado: ' + l.id);
  ids.add(l.id);
  if (!/^(ia|cl)-\d+-\d+$/.test(l.id)) fail(where + ': id con formato inesperado');
  if (!l.title || !l.summary) fail(where + ': falta título o resumen');
  if (typeof l.minutes !== 'number' || l.minutes < 3) fail(where + ': minutos inválidos');
  if (l.level && !LEVELS.has(l.level)) fail(where + ': nivel desconocido ' + l.level);
  let body;
  try { body = typeof l.body === 'function' ? l.body() : l.body; } catch (e) { fail(where + ': body() lanza ' + e.message); continue; }
  checkBlocks(body, where, 0);
  if (!body.some(b => b.t === 'key') && l.id !== 'cl-7-5') warn.push(where + ': sin bloque de idea clave');
  // quiz
  if (!Array.isArray(l.quiz) || l.quiz.length < 3) fail(where + ': cuestionario con menos de 3 preguntas');
  else for (const [i, q] of l.quiz.entries()) {
    stats.quiz++;
    const qw = where + ' q' + (i + 1);
    if (!q.q) fail(qw + ': sin enunciado');
    if (!q.why) fail(qw + ': sin explicación');
    const type = q.type || 'choice';
    if (type === 'choice') {
      if (!Array.isArray(q.o) || q.o.length < 2) fail(qw + ': sin opciones');
      else if (typeof q.a !== 'number' || q.a < 0 || q.a >= q.o.length) fail(qw + ': respuesta fuera de rango');
      else {
        if (!EX.checkAnswer(q, q.a)) fail(qw + ': la respuesta correcta no valida');
        if (EX.checkAnswer(q, (q.a + 1) % q.o.length)) fail(qw + ': una respuesta incorrecta valida');
      }
    } else if (type === 'multi') {
      if (!Array.isArray(q.o) || !Array.isArray(q.a) || !q.a.length) fail(qw + ': multi mal formada');
      else {
        if (q.a.some(x => x < 0 || x >= q.o.length)) fail(qw + ': índice fuera de rango');
        if (!EX.checkAnswer(q, q.a.slice())) fail(qw + ': la respuesta correcta no valida');
        if (EX.checkAnswer(q, q.a.slice(1))) fail(qw + ': subconjunto valida como correcto');
      }
    } else if (type === 'tf') {
      if (typeof q.a !== 'boolean') fail(qw + ': tf sin booleano');
      else if (!EX.checkAnswer(q, q.a) || EX.checkAnswer(q, !q.a)) fail(qw + ': tf no valida bien');
    } else if (type === 'fill') {
      if (!Array.isArray(q.a) || !q.a.length) fail(qw + ': fill sin respuestas aceptadas');
      else {
        if (!EX.checkAnswer(q, q.a[0])) fail(qw + ': la respuesta aceptada no valida');
        if (!EX.checkAnswer(q, '  ' + q.a[0].toUpperCase() + ' ')) fail(qw + ': fill no normaliza mayúsculas/espacios');
        if (EX.checkAnswer(q, 'zzz-respuesta-imposible')) fail(qw + ': fill acepta basura');
      }
    } else fail(qw + ': tipo desconocido ' + type);
  }
  // tarjetas
  if (!Array.isArray(l.cards) || l.cards.length < 1) fail(where + ': sin tarjetas');
  else for (const c of l.cards) { stats.cards++; if (!Array.isArray(c) || c.length !== 2 || !c[0] || !c[1]) fail(where + ': tarjeta mal formada'); }
  // recursos
  if (!Array.isArray(l.resources) || l.resources.length < 1) fail(where + ': sin recursos para seguir aprendiendo');
  else checkLinks(l.resources, where + ' recursos');
}

// pistas y módulos
if (EX.TRACKS.length !== 2) fail('se esperaban 2 pistas, hay ' + EX.TRACKS.length);
for (const t of EX.TRACKS) {
  if (!t.route || !t.title || !t.intro) fail('pista ' + t.id + ' incompleta');
  for (const m of t.modules) {
    if (!m || !m.id || !m.title || !m.icon || !m.desc) fail('módulo incompleto en pista ' + t.id + ': ' + (m && m.id));
    if (!Array.isArray(m.goals) || !m.goals.length) fail('módulo ' + m.id + ' sin objetivos');
    if (!m.lessons.length) fail('módulo ' + m.id + ' sin lecciones');
  }
}

// glosario
const terms = new Set();
for (const c of EX.GLOSSARY.categories) for (const t of c.terms) {
  if (!t.t || !t.d) fail('término de glosario incompleto en ' + c.id);
  const k = t.t.toLowerCase();
  if (terms.has(k)) fail('término duplicado en glosario: ' + t.t);
  terms.add(k);
  if (t.l && !EX.lesson(t.l)) fail('glosario "' + t.t + '" enlaza a lección inexistente ' + t.l);
}

// prompts
let promptCount = 0;
for (const c of EX.PROMPTS.categories) {
  if (!c.id || !c.title || !c.icon) fail('categoría de prompts incompleta');
  for (const p of c.items) { promptCount++; if (!p.title || !p.text || p.text.length < 60 || !p.why) fail('prompt incompleto: ' + (p.title || '?')); }
}

// línea de tiempo
const LABS = new Set(['hito', 'anthropic', 'openai', 'google', 'deepseek', 'meta', 'xai', 'otros']);
for (const e of EX.TIMELINE) {
  if (!/^\d{4}(-\d{2}(-\d{2})?)?$/.test(e.date)) fail('fecha de línea de tiempo inválida: ' + e.date);
  if (!e.title || !e.desc || !LABS.has(e.lab)) fail('evento de línea de tiempo incompleto: ' + e.title);
  if (e.l && !EX.lesson(e.l)) fail('evento "' + e.title + '" enlaza a lección inexistente ' + e.l);
}

// recursos agregados
const urls = new Set();
for (const r of EX.RESOURCES.items) {
  if (!EX.RESOURCES.topics.some(t => t.id === r.topic)) fail('recurso con tema desconocido: ' + r.topic + ' (' + r.t + ')');
  if (urls.has(r.u)) fail('URL duplicada en biblioteca: ' + r.u);
  urls.add(r.u);
}

// plan
const planned = new Set();
for (const [i, w] of EX.PLAN.entries()) {
  if (!w.title || !w.goal || !w.practice) fail('semana ' + (i + 1) + ' del plan incompleta');
  for (const id of w.lessons) { if (!EX.lesson(id)) fail('plan semana ' + (i + 1) + ' enlaza a lección inexistente ' + id); if (planned.has(id)) fail('lección repetida en el plan: ' + id); planned.add(id); }
}
for (const l of lessons) if (!planned.has(l.id)) fail('lección no incluida en el plan: ' + l.id);

// tarjetas y repaso
const allCards = EX.allCards();
if (allCards.length !== stats.cards) fail('EX.allCards devuelve ' + allCards.length + ' pero hay ' + stats.cards);
EX.store.load();
const c0 = allCards[0];
EX.store.gradeCard(c0.id, true);
if (EX.store.cardState(c0.id).box !== 1) fail('gradeCard no sube de caja');
EX.store.gradeCard(c0.id, false);
if (EX.store.cardState(c0.id).box !== 0) fail('gradeCard no baja de caja');
const rq = EX.store.recordQuiz(lessons[0].id, 3, 4);
if (rq.pct !== 75) fail('recordQuiz calcula mal el porcentaje');

// informe
console.log('Expertia · selftest');
console.log('  lecciones: ' + stats.lessons + ' en ' + EX.allModules().length + ' módulos');
console.log('  bloques: ' + stats.blocks + ' · pasos animados: ' + stats.steps + ' · comprobaciones inline: ' + stats.checks + ' · prompts en lecciones: ' + stats.prompts);
console.log('  preguntas de cuestionario: ' + stats.quiz + ' · tarjetas: ' + stats.cards + ' · recursos en lecciones: ' + stats.resources);
console.log('  biblioteca: ' + EX.RESOURCES.items.length + ' recursos · glosario: ' + terms.size + ' términos · prompts: ' + promptCount + ' · línea de tiempo: ' + EX.TIMELINE.length + ' hitos · plan: ' + EX.PLAN.length + ' semanas');
console.log('  palabras aproximadas en lecciones: ' + stats.words.toLocaleString('es-ES'));
if (warn.length) { console.log('\nAvisos (' + warn.length + '):'); warn.slice(0, 20).forEach(w => console.log('  · ' + w)); }
if (errors.length) { console.log('\nERRORES (' + errors.length + '):'); errors.forEach(e => console.log('  ✗ ' + e)); process.exit(1); }
console.log('\nOK: todo el contenido es válido.');
