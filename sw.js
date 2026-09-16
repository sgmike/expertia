/* Service worker: red primero, caché de respaldo. Funciona sin conexión y se actualiza si hay red. */
const CACHE = 'expertia-v1';
const ASSETS = [
  './', 'index.html', 'assets/css/app.css', 'assets/icon.svg',
  'assets/js/core/core.js', 'assets/js/core/store.js',
  'assets/js/content/ia-1-fundamentos.js', 'assets/js/content/ia-2-llm.js', 'assets/js/content/ia-3-entrenamiento.js',
  'assets/js/content/ia-4-historia.js', 'assets/js/content/ia-5-panorama.js', 'assets/js/content/ia-6-seguridad.js',
  'assets/js/content/ia-7-ejecutivo.js', 'assets/js/content/track-ia.js',
  'assets/js/content/cl-1-conocer.js', 'assets/js/content/cl-2-prompts.js', 'assets/js/content/cl-3-claudeai.js',
  'assets/js/content/cl-4-claude-code.js', 'assets/js/content/cl-5-api.js', 'assets/js/content/cl-6-agentes.js',
  'assets/js/content/cl-7-expertos.js', 'assets/js/content/track-claude.js',
  'assets/js/content/prompts.js', 'assets/js/content/glossary.js', 'assets/js/content/timeline.js',
  'assets/js/content/resources.js', 'assets/js/content/plan.js',
  'assets/js/app/render.js', 'assets/js/app/views.js', 'assets/js/app/main.js'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()).catch(() => {}));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || !e.request.url.startsWith(self.location.origin)) return;
  e.respondWith(
    fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
      return res;
    }).catch(() => caches.match(e.request).then(r => r || caches.match('index.html')))
  );
});
