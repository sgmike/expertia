#!/usr/bin/env node
/* Prueba de humo en un navegador real (Chromium via Playwright): recorre las pantallas,
   hace un cuestionario, repasa una tarjeta, copia un prompt, busca en el glosario.
   Uso: node tools/smoke.js [--shots]
   Requiere playwright instalado globalmente o en node_modules, y Chromium. */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PORT = 8898;
const SHOTS = process.argv.includes('--shots');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.webmanifest': 'application/manifest+json', '.json': 'application/json' };

function serve() {
  return new Promise(resolve => {
    const srv = http.createServer((req, res) => {
      let p = decodeURIComponent(req.url.split('?')[0]);
      if (p === '/') p = '/index.html';
      const f = path.join(ROOT, p);
      if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end('404'); }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
      fs.createReadStream(f).pipe(res);
    });
    srv.listen(PORT, () => resolve(srv));
  });
}

function requirePlaywright() {
  const candidates = ['playwright', '/opt/node22/lib/node_modules/playwright', '/usr/lib/node_modules/playwright', '/usr/local/lib/node_modules/playwright'];
  for (const c of candidates) { try { return require(c); } catch (e) { /* siguiente */ } }
  throw new Error('No se encuentra playwright. Instálalo: npm i -D playwright');
}
function chromiumPath() {
  if (process.env.CHROMIUM_PATH) return process.env.CHROMIUM_PATH;
  const base = process.env.PLAYWRIGHT_BROWSERS_PATH || '/opt/pw-browsers';
  try {
    const dirs = fs.readdirSync(base).filter(d => d.startsWith('chromium'));
    for (const d of dirs) {
      const p = path.join(base, d, 'chrome-linux', 'chrome');
      if (fs.existsSync(p)) return p;
    }
  } catch (e) { /* nada */ }
  return undefined;
}

(async () => {
  const srv = await serve();
  const { chromium } = requirePlaywright();
  const browser = await chromium.launch({ executablePath: chromiumPath() });
  const failures = [];
  const step = async (name, fn) => {
    try { await fn(); console.log('  ✓ ' + name); }
    catch (e) { failures.push(name + ': ' + e.message); console.log('  ✗ ' + name + ': ' + e.message.split('\n')[0]); }
  };
  if (SHOTS) fs.mkdirSync(path.join(ROOT, 'tools/shots'), { recursive: true });
  const shot = async (page, name) => { if (SHOTS) await page.screenshot({ path: path.join(ROOT, 'tools/shots', name + '.png'), fullPage: false }); };

  for (const vp of [{ name: 'escritorio', width: 1280, height: 900 }, { name: 'movil', width: 390, height: 844, isMobile: true, hasTouch: true }]) {
    console.log('\n' + vp.name);
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, isMobile: !!vp.isMobile, hasTouch: !!vp.hasTouch });
    const page = await ctx.newPage();
    const errs = [];
    page.on('pageerror', e => errs.push(e.message));
    page.on('console', m => { if (m.type() === 'error' && !/fonts\.g|favicon|net::ERR/.test(m.text())) errs.push(m.text()); });
    const base = 'http://localhost:' + PORT + '/';

    await step('inicio carga', async () => {
      await page.goto(base + '#/', { waitUntil: 'load' });
      await page.waitForSelector('.hero h1');
      await shot(page, vp.name + '-inicio');
    });
    await step('pista IA y módulo', async () => {
      await page.goto(base + '#/curso'); await page.waitForSelector('.module-card');
      await page.click('.module-card'); await page.waitForSelector('.lesson-list a');
      await shot(page, vp.name + '-modulo');
    });
    await step('lección: bloques, reproductor y comprobación inline', async () => {
      await page.goto(base + '#/leccion/ia-1-2'); await page.waitForSelector('article h1');
      if (!(await page.$('.player'))) throw new Error('sin reproductor paso a paso');
      await page.click('.player [data-act="pl-next"]');
      const cur = await page.textContent('.player .pcur');
      if (cur.trim() !== '2') throw new Error('el reproductor no avanza');
      await page.click('.check .co button');
      await page.waitForSelector('.check .cw:not(.hidden)');
      await shot(page, vp.name + '-leccion');
    });
    await step('cuestionario completo', async () => {
      await page.goto(base + '#/leccion/ia-1-1'); await page.waitForSelector('#quiz .quiz');
      for (let i = 0; i < 12; i++) {
        if (await page.$('.quiz .result')) break;
        const fill = await page.$('.quiz input.fill');
        if (fill) { await fill.fill('respuesta'); await page.click('[data-act="quiz-fill-ok"]'); }
        else {
          const multi = await page.$('.quiz .co.multi');
          await page.click('.quiz .co button');
          if (multi) await page.click('[data-act="quiz-multi-ok"]');
        }
        await page.waitForSelector('.quiz .qw');
        await page.click('[data-act="quiz-next"]');
      }
      await page.waitForSelector('.quiz .result .big');
      await shot(page, vp.name + '-quiz');
    });
    await step('marcar leída y XP', async () => {
      await page.waitForTimeout(500);
      const btn = await page.$('[data-act="mark-read"]');
      if (!btn) throw new Error('sin botón de marcar leída');
      await btn.scrollIntoViewIfNeeded();
      await btn.click({ force: true });
      await page.waitForSelector('.lesson-done.done');
      const chip = await page.textContent('#levelText');
      if (!/XP/.test(chip)) throw new Error('chip de nivel sin XP');
    });
    await step('tarjetas: voltear y calificar', async () => {
      await page.goto(base + '#/tarjetas'); await page.waitForSelector('.boxes');
      if (await page.$('.flashcard')) {
        await page.click('.flashcard'); await page.waitForSelector('.flashcard .back');
        await page.click('[data-act="card-grade"][data-v="1"]');
        await page.waitForSelector('.boxes');
      }
      await shot(page, vp.name + '-tarjetas');
    });
    await step('prompts: filtrar y copiar', async () => {
      await page.goto(base + '#/prompts'); await page.waitForSelector('.promptbox');
      await page.click('[data-act="prompt-cat"][data-v="maya"]');
      await page.waitForSelector('.promptbox');
      await page.click('.promptbox [data-act="copy-prompt"]');
      await page.waitForSelector('.toast.show');
    });
    await step('glosario: buscar', async () => {
      await page.goto(base + '#/glosario'); await page.waitForSelector('.gloss > div');
      await page.fill('[data-act="gloss-search"]', 'transformer');
      await page.waitForTimeout(400);
      const n = await page.$$eval('.gloss > div', els => els.length);
      if (n < 1 || n > 15) throw new Error('búsqueda devuelve ' + n);
    });
    await step('línea de tiempo con filtro', async () => {
      await page.goto(base + '#/historia'); await page.waitForSelector('.tl-item');
      await page.click('[data-act="tl-lab"][data-v="anthropic"]');
      await page.waitForSelector('.tl-item.anthropic');
      const other = await page.$('.tl-item.openai');
      if (other) throw new Error('el filtro no filtra');
    });
    await step('biblioteca', async () => {
      await page.goto(base + '#/biblioteca'); await page.waitForSelector('.links li');
      await page.click('[data-act="lib-type"][data-v="video"]');
      await page.waitForSelector('.links li');
    });
    await step('plan, progreso, ajustes, manual', async () => {
      await page.goto(base + '#/plan'); await page.waitForSelector('.card');
      await page.goto(base + '#/progreso'); await page.waitForSelector('.heat');
      await page.goto(base + '#/ajustes'); await page.waitForSelector('[data-set="theme"]');
      await page.goto(base + '#/manual'); await page.waitForSelector('.track-claude .module-card');
      await page.goto(base + '#/leccion/cl-4-6'); await page.waitForSelector('.codebox');
      await shot(page, vp.name + '-manual');
    });
    if (vp.isMobile) {
      await step('móvil: barra de pestañas y menú Más', async () => {
        await page.goto(base + '#/');
        const visible = await page.isVisible('.tabbar');
        if (!visible) throw new Error('tabbar no visible en móvil');
        await page.click('.tabbar [data-act="more"]');
        await page.waitForSelector('#modal:not([hidden])');
        await page.click('#modal a[href="#/glosario"]');
        await page.waitForSelector('.gloss');
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
        if (overflow) throw new Error('scroll horizontal en móvil');
      });
    }
    await step('sin errores de JS', async () => { if (errs.length) throw new Error(errs.join(' | ').slice(0, 300)); });
    await ctx.close();
  }
  await browser.close();
  srv.close();
  console.log('\n' + (failures.length ? 'FALLOS (' + failures.length + '):\n  ' + failures.join('\n  ') : 'OK: prueba de humo superada.'));
  process.exit(failures.length ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
