# Expertia · Curso de IA y manual maestro de Claude

Web de estudio en español, personal, para pasar de usuario avanzado a experto en inteligencia
artificial y maestro de Claude. Dos pistas:

- **🧠 Curso de IA (7 módulos, 47 lecciones)**: qué es aprender para una máquina, neuronas y gradiente,
  tokens y transformers, por qué los modelos necesitan tanta memoria, la ventana de contexto, alucinaciones,
  razonamiento; cómo se entrena un modelo (preentrenamiento, RLHF, IA constitucional, RLVR), leyes de escalado,
  benchmarks; ochenta años de historia hasta Fable 5.1 y GPT-6; los laboratorios y sus líderes (Anthropic, OpenAI,
  Google DeepMind, DeepSeek, xAI, Meta), la economía de chips y energía, abierto vs cerrado y geopolítica;
  seguridad, alineación, interpretabilidad y gobernanza (RSP, Glasswing, AI Act); y cómo piensa un ejecutivo de IA.
- **🪶 Manual maestro de Claude (7 módulos, 48 lecciones)**: cómo piensa Claude, la familia de modelos 2026 y cuál usar,
  superficies y planes; el arte de pedir (nivel avanzado); claude.ai a fondo (Proyectos, memoria, artefactos,
  conectores, Skills, Cowork, Chrome, Slack, rutinas); Claude Code completo (comandos, CLAUDE.md y reglas,
  permisos y sandbox, modo plan, Skills, subagentes, hooks, MCP, contexto y coste, automatización, plugins,
  buenas prácticas); la API, el Agent SDK y Managed Agents; agentes autónomos (patrones, herramientas, memoria,
  multiagente, seguridad, evals) con dos casos completos; y lo que hacen los expertos, con un plan por etapas.

Cada lección tiene explicación con ejemplos del negocio del alumno, diagramas, reproductor paso a paso,
comprobaciones inline, **cuestionario autocorregido**, **tarjetas de memoria** (repetición espaciada) y una sección
**"Para seguir aprendiendo"** con artículos, vídeos, cursos y papers. Además: biblioteca de prompts copiables,
glosario, línea de tiempo (1943-2026), biblioteca de recursos, plan de 8 semanas y progreso con nivel, XP y racha.

## Cómo se usa

1. Abre la URL (ver *Publicar*). El progreso se guarda en el navegador; en **Ajustes** puedes descargar una copia.
2. Sigue el **Plan** (8 semanas) o entra por la pista que prefieras. Cada lección: leer → cuestionario → marcar leída.
3. Repasa las **Tarjetas** a diario: el sistema te enseña cada una justo antes de que la olvides.
4. Copia los **Prompts** y pruébalos en Claude. Cuando uno te funcione tres veces, conviértelo en una Skill.

## Publicar (GitHub Pages)

Sitio estático sin compilación.

1. En GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions** (una sola vez).
2. Cada push a `main` ejecuta `.github/workflows/pages.yml`: pasa el selftest y publica.
3. URL: `https://sgmike.github.io/expertia/`.

También funciona abriendo `index.html` desde el disco y se puede instalar como app (PWA) con lectura sin conexión.

## Estructura

```
index.html                         una sola página; las pantallas se montan con JS
assets/css/app.css                 estilos (claro/oscuro, móvil, impresión)
assets/js/core/core.js             utilidades, bloques de contenido (EX.B), registro de pistas, validación de respuestas
assets/js/core/store.js            progreso: lecciones leídas, cuestionarios, tarjetas (Leitner), notas, XP, racha
assets/js/content/ia-*.js          los 7 módulos del curso de IA
assets/js/content/cl-*.js          los 7 módulos del manual de Claude
assets/js/content/track-*.js       ensamblan las pistas
assets/js/content/prompts.js       biblioteca de prompts
assets/js/content/glossary.js      glosario
assets/js/content/timeline.js      línea de tiempo
assets/js/content/resources.js     biblioteca de recursos (curados + los de cada lección)
assets/js/content/plan.js          plan de 8 semanas
assets/js/app/render.js            bloques → HTML, reproductor paso a paso
assets/js/app/views.js             pantallas
assets/js/app/main.js              rutas, eventos, arranque
tools/selftest.js                  valida todo el contenido sin navegador
tools/smoke.js                     recorre la web en Chromium
```

### Añadir una lección

Cada lección es un objeto dentro de `lessons` de su módulo:

```js
{
  id: 'cl-4-14', title: 'Título', minutes: 12, level: 'intermedio',
  summary: 'Una frase.',
  body: () => [ B.lead('…'), B.h('Sección'), B.p('…'), B.key('Idea clave'), B.steps('Título', ['paso 1', 'paso 2']) ],
  quiz: [ { q: '¿…?', o: ['a', 'b', 'c'], a: 1, why: 'Porque…' }, { q: '…', type: 'tf', a: true, why: '…' } ],
  cards: [ ['Pregunta', 'Respuesta'] ],
  resources: [ { type: 'doc', t: 'Título', u: 'https://…', lang: 'EN', note: '…' } ]
}
```

Tipos de pregunta: `choice` (por defecto), `multi` (`a: [índices]`), `tf` (`a: true/false`) y `fill` (`a: ['respuestas aceptadas']`).
Bloques disponibles en `EX.B`: `h, h3, p, lead, key, tip, warn, note, analogy, quote, list, olist, table, code, prompt, compare, fig, deep, ex, steps, check, terms, cards, links, hr`.
Añade la lección al plan en `plan.js`; el selftest avisa si falta.

## Pruebas

```bash
node tools/selftest.js      # valida lecciones, cuestionarios, tarjetas, enlaces internos, glosario, prompts, plan
node tools/smoke.js         # abre la web en Chromium (escritorio y móvil) y recorre todas las pantallas
node tools/smoke.js --shots # además guarda capturas en tools/shots/
```

## Fuentes

El contenido se apoya en la documentación oficial de Anthropic (Claude Platform y Claude Code), en los artículos
de investigación e ingeniería de Anthropic, en los anuncios oficiales de los laboratorios y en las fuentes
enlazadas en cada lección. Estado del sector a septiembre de 2026.
