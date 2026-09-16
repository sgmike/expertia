/* Curso de IA · Módulo 7: Pensar como ejecutivo de IA. */
(function () {
  'use strict';
  const B = EX.B;
  EX.MOD = EX.MOD || {};

  EX.MOD['ia-7'] = {
    id: 'ia-7', icon: '🎩', title: 'Pensar como ejecutivo de IA',
    desc: 'Cómo aplican todo lo anterior quienes toman decisiones: evaluar un modelo para tu empresa, construir o comprar, costes y retorno, riesgos legales, las preguntas que hacen los expertos, cómo mantenerte al día y qué esperar de 2026 a 2030.',
    goals: [
      'Decidir qué modelo usar para cada tarea con criterios y números, no con impresiones.',
      'Diseñar el stack de IA de una empresa mediana y saber qué construir y qué comprar.',
      'Calcular el coste real y el retorno de un caso de uso con IA.',
      'Tener el marco mental (las 12 preguntas) con el que un ejecutivo del sector evalúa cualquier propuesta.',
      'Construir tu rutina de actualización y tener una opinión propia sobre 2026-2030.'
    ],
    lessons: [
      /* ------------------------------------------------------------------ */
      {
        id: 'ia-7-1', title: 'Cómo evaluar un modelo para tu empresa', minutes: 14, level: 'intermedio',
        summary: 'Los cinco criterios que importan (calidad en tu tarea, coste, latencia, fiabilidad, cumplimiento), cómo medirlos y cómo tu política Fable/Opus/Sonnet encaja.',
        body: () => [
          B.lead('Ya tienes una política intuitiva: Fable para decisiones y auditorías, Opus para construir, Sonnet para lo mecánico. Esta lección la convierte en un método que puedas defender con números y aplicar a cualquier proveedor.'),
          B.h('Los cinco criterios'),
          B.table(['Criterio', 'Pregunta', 'Cómo se mide'], [
            ['<b>Calidad en tu tarea</b>', '¿Resuelve <i>mis</i> casos, no los del benchmark?', 'Eval propio (módulo 3): 50-200 casos reales con criterio de éxito'],
            ['<b>Coste</b>', '¿Cuánto por tarea completada, no por token?', 'Tokens medios × precio, incluidos reintentos y razonamiento; con caché'],
            ['<b>Latencia</b>', '¿Llega a tiempo para el uso?', 'p50 y p95 del tiempo de respuesta; para WhatsApp, <10 s; para auditorías, da igual'],
            ['<b>Fiabilidad</b>', '¿Falla de forma predecible? ¿Sigue el formato? ¿Respeta las reglas?', 'Tasa de errores de formato, de violaciones de política, variabilidad entre ejecuciones'],
            ['<b>Cumplimiento y datos</b>', '¿Dónde van mis datos? ¿Se entrena con ellos? ¿Qué certificaciones?', 'Términos de servicio, retención, SOC 2/ISO, ubicación; opción de cero retención']
          ]),
          B.h('Un ejemplo con números: elegir modelo para Maya'),
          B.ex('Tres modelos, un eval de 100 conversaciones reales', [
            B.table(['Modelo', 'Exactitud herramienta', 'Calidad texto (juez 1-5)', 'Coste / 1.000 turnos', 'Latencia p95'], [
              ['Haiku 4.5', '91 %', '4,1', '~1,5 $', '4 s'],
              ['Sonnet 5', '97 %', '4,6', '~12 $', '9 s'],
              ['Opus 5', '98 %', '4,7', '~30 $', '14 s']
            ], 'Cifras ilustrativas construidas a partir del volumen real de Maya (agosto de 2026: ~2.500 turnos con LLM, ~8,8 M tokens de entrada y 1,4 M de salida) y de los precios de la API. Sustitúyelas por tu eval.'),
            B.p('Lectura: Sonnet 5 gana. Opus mejora un punto por más del doble de coste; Haiku pierde 6 puntos de exactitud, que en dinero (pedidos, pagos) es inaceptable. Y un detalle que solo ves con el eval: el 63 % de los turnos ni siquiera llegan al modelo gracias al router determinístico. <b>La mejor optimización de coste es no llamar al modelo cuando no hace falta.</b>')
          ]),
          B.h('Errores habituales al elegir'),
          B.list([
            '<b>Elegir por benchmark.</b> Los benchmarks miden tareas genéricas. Tu tarea es específica.',
            '<b>Elegir el más barato por token.</b> Un modelo barato que necesita tres reintentos y supervisión humana es caro por tarea.',
            '<b>Elegir uno para todo.</b> Lo correcto es <b>enrutar</b>: modelo pequeño para lo simple, grande para lo difícil, y reglas sin modelo para lo determinista. Tu política ya lo hace a mano; se puede automatizar.',
            '<b>No medir la variabilidad.</b> Corre el eval tres veces. Si los resultados bailan, tu proceso no es estable.',
            '<b>Ignorar el cambio de versión.</b> Los proveedores actualizan modelos y retiran versiones. Fija la versión (ID con fecha) y vuelve a correr el eval antes de migrar.'
          ]),
          B.h('Cuándo cambiar de proveedor'),
          B.p('Casi nunca por precio (los precios convergen) y casi siempre por <b>fiabilidad en tu tarea</b>, <b>ecosistema</b> (herramientas, agentes, integraciones que ya usas) y <b>términos de datos</b>. Cambiar cuesta: prompts ajustados, evals, integraciones. Manténlo posible (abstracción de proveedor, eval listo para correr) pero no lo hagas por titulares.'),
          B.key('Un modelo se elige con un eval propio, por coste por tarea completada y con la vía de datos correcta. La mejor decisión suele ser <b>enrutar</b>: reglas para lo determinista, modelo pequeño para lo simple, grande para lo difícil.'),
          B.check('Un proveedor te ofrece un modelo un 40 % más barato por token que Sonnet 5. ¿Qué haces?', ['Cambiar de inmediato', 'Correr tu eval con él y comparar coste por tarea completada, fiabilidad y términos de datos antes de decidir', 'Ignorarlo', 'Preguntar en Twitter'], 1, 'El precio por token no es el coste. Y cambiar tiene coste propio.'),
          B.cards([
            { icon: '📋', title: 'Cinco criterios', html: 'Calidad en tu tarea, coste por tarea, latencia, fiabilidad, datos.' },
            { icon: '🧪', title: 'Eval propio', html: '100 casos reales > cualquier benchmark.' },
            { icon: '🔀', title: 'Enrutar', html: 'Reglas → pequeño → grande. El 63 % de Maya no llama al modelo.' },
            { icon: '📌', title: 'Fijar versión', html: 'Reevaluar antes de migrar.' }
          ])
        ],
        quiz: [
          { q: 'El criterio principal para elegir un modelo es…', o: ['su puntuación en MMLU', 'su calidad en tus casos reales medida con un eval propio, junto con coste por tarea, latencia, fiabilidad y datos', 'su fecha de lanzamiento', 'la opinión de un influencer'], a: 1, why: 'Los benchmarks miden tareas genéricas; tu tarea es específica.' },
          { q: '"Coste por tarea completada" incluye…', type: 'multi', o: ['Tokens de entrada y salida', 'Tokens de razonamiento', 'Reintentos y fallos', 'El precio de la GPU del proveedor'], a: [0, 1, 2], why: 'Lo que pagas es por tarea resuelta; un modelo barato con reintentos sale caro.' },
          { q: 'Usar un solo modelo para todas las tareas es la práctica recomendada.', type: 'tf', a: false, why: 'Lo recomendado es enrutar: reglas para lo determinista, modelo pequeño para lo simple, grande para lo difícil.' },
          { q: 'En el ejemplo de Maya, ¿qué explica el mayor ahorro de coste?', o: ['Usar Haiku', 'Que el 63 % de los turnos se resuelven con un router determinístico sin llamar al modelo', 'Bajar la temperatura', 'Usar respuestas más cortas'], a: 1, why: 'No llamar al modelo cuando no hace falta es la mejor optimización.' },
          { q: 'Antes de migrar a una versión nueva de un modelo conviene…', type: 'fill', a: ['correr el eval', 'volver a correr el eval', 'pasar el eval', 'ejecutar el eval', 'repetir el eval', 'evaluar'], why: 'Volver a correr el eval propio. Los modelos cambian de comportamiento entre versiones.' }
        ],
        cards: [
          ['Los cinco criterios para elegir un modelo', 'Calidad en tu tarea (eval propio), coste por tarea completada (con reintentos y razonamiento), latencia (p50/p95), fiabilidad (formato, políticas, variabilidad) y cumplimiento de datos.'],
          ['¿Qué es enrutar modelos?', 'Asignar cada tipo de tarea al recurso más barato que la resuelve: reglas sin modelo para lo determinista, modelo pequeño para lo simple, grande para lo difícil.'],
          ['¿Por qué fijar la versión del modelo?', 'Porque los proveedores actualizan y retiran versiones y el comportamiento cambia. Usa IDs con fecha y vuelve a correr el eval antes de migrar.']
        ],
        resources: [
          { type: 'doc', t: 'Anthropic: Choosing the right model', u: 'https://platform.claude.com/docs/en/about-claude/models/choosing-a-model', lang: 'EN' },
          { type: 'doc', t: 'Anthropic: guía de evaluaciones (define success, develop tests)', u: 'https://platform.claude.com/docs/en/test-and-evaluate/define-success', lang: 'EN' },
          { type: 'article', t: 'Artificial Analysis: comparativas independientes de calidad, precio y velocidad', u: 'https://artificialanalysis.ai/', lang: 'EN', note: 'Para una primera criba antes de tu eval: latencia, tokens/s y precio de todos los modelos.' }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'ia-7-2', title: 'Construir o comprar: el stack de IA de una empresa', minutes: 14, level: 'intermedio',
        summary: 'Las capas de un stack de IA, qué se construye dentro y qué se compra, y cómo se ve el stack real de RRB.',
        body: () => [
          B.lead('Toda empresa que usa IA en serio acaba con un stack de cinco capas. La decisión importante no es qué modelo, sino en qué capa concentras tu esfuerzo y qué compras hecho.'),
          B.h('Las cinco capas'),
          B.table(['Capa', 'Qué es', 'Construir o comprar', 'En RRB'], [
            ['<b>1. Modelos</b>', 'Los LLM y modelos especializados', '<b>Comprar</b> siempre (API). Entrenar es para una docena de empresas', 'Claude (Sonnet 5, Opus 5, Fable 5.1), ElevenLabs, Veo; DeepSeek como failover'],
            ['<b>2. Plataforma y orquestación</b>', 'Loop de agente, herramientas, memoria, sesiones, colas, evaluación', '<b>Comprar el motor, construir la configuración</b>: Agent SDK, Managed Agents, frameworks', 'Agent SDK como motor de un turno; router, sesiones y workers propios en Node'],
            ['<b>3. Datos y conocimiento</b>', 'Tus bases de datos, documentos, reglas, embeddings', '<b>Construir</b>: es tu ventaja. Nadie tiene tus datos', 'MySQL de la Oficina Virtual, Documento maestro / facts, maya_conversaciones'],
            ['<b>4. Integraciones</b>', 'Conexión con sistemas: pagos, envíos, mensajería, correo', '<b>Comprar conectores</b> (MCP, APIs) y construir los tuyos', 'Meta WhatsApp, MercadoPago, Skydropx, Chatwoot, Apps Script bancario'],
            ['<b>5. Aplicaciones y experiencia</b>', 'Lo que ve el usuario: chat, admin, app, informes', '<b>Construir</b> lo diferencial; comprar lo genérico (Claude.ai para el equipo)', 'Maya y Max, admin, app móvil, Academia, panel personal']
          ]),
          B.key('La regla de oro: <b>compra las capas donde no puedes diferenciarte</b> (modelos, motor de agente, conectores) y <b>construye donde está tu ventaja</b> (datos, reglas de negocio, experiencia). Cada hora que dedicas a reinventar un loop de agente es una hora que no dedicas a tus facts.'),
          B.h('Las tres formas de acceder al modelo'),
          B.compare('API directa / Agent SDK (lo que usas)', ['Máximo control y menor coste por token.', 'Tú hospedas y operas (Hetzner).', 'Ideal para agentes integrados en tu sistema: Maya.', 'Requiere alguien que mantenga el código (Claude, en tu caso).'],
            'Managed Agents / plataformas alojadas', ['Anthropic corre el loop y el sandbox; tú defines el agente.', 'Sesiones largas, programación, memoria y outcomes sin infraestructura.', 'Ideal para agentes de trabajo interno: informes, investigación, tareas programadas.', 'Menos control sobre el runtime; coste de plataforma.']),
          B.p('Y la tercera: <b>productos terminados</b> (Claude.ai, Cowork, Claude en Chrome, Claude en Slack, Copilot) para que las personas del equipo trabajen con IA sin que tú construyas nada. Es la vía para Edna, Mónica y los centros: un plan Team con un Proyecto por área y Skills con las reglas del negocio.'),
          B.h('El error de construir demasiado'),
          B.p('En 2023-2024 muchas empresas construyeron sus propios frameworks de agentes, sus propias bases vectoriales y sus propios sistemas de memoria. En 2026 casi todo eso lo ofrece el proveedor mejor y más barato (Agent SDK, memoria, caché, compactación, MCP). El chat HTTP entre tus sesiones de Claude es un buen ejemplo: fue valioso cuando no existía nada mejor, y sigue siéndolo para sesiones en otras máquinas y para que tú arbitres desde un visor; para sesiones en la misma cuenta, los mensajes nativos entre sesiones te ahorran plomería. Revisa cada seis meses qué parte de tu stack ya la ofrece el proveedor.'),
          B.h('El error de comprar demasiado'),
          B.p('El opuesto: contratar una "plataforma de IA" genérica que promete todo y no conoce tu negocio. Sin tus datos, tus reglas y tu experiencia de usuario, es un chat caro. Las capas 3 y 5 son tuyas.'),
          B.analogy('Es como tu logística: no fabricas camiones (modelos) ni construyes carreteras (nube), pero sí decides las rutas, los centros de distribución y la experiencia del distribuidor. La IA se organiza igual.'),
          B.check('¿Qué capa del stack de IA debe construir siempre una empresa?', ['Los modelos', 'La nube', 'Los datos, reglas de negocio y la experiencia diferencial', 'El loop de agente'], 2, 'Es donde está la ventaja que nadie más tiene. El resto se compra.'),
          B.cards([
            { icon: '🏗️', title: 'Cinco capas', html: 'Modelos, orquestación, datos, integraciones, aplicaciones.' },
            { icon: '🛒', title: 'Comprar', html: 'Modelos, motor de agente, conectores.' },
            { icon: '🔨', title: 'Construir', html: 'Datos, reglas, experiencia.' },
            { icon: '🔁', title: 'Revisar cada 6 meses', html: 'Lo que construiste quizá ya lo ofrece el proveedor.' }
          ])
        ],
        quiz: [
          { q: 'La regla de oro del stack de IA es…', o: ['construir todo para tener control', 'comprar todo para ir rápido', 'comprar donde no te diferencias (modelos, motor, conectores) y construir donde está tu ventaja (datos, reglas, experiencia)', 'usar solo software libre'], a: 2, why: 'Cada hora en reinventar infraestructura es una hora menos en tu ventaja.' },
          { q: '¿Cuál de estas capas es "comprar siempre"?', o: ['Datos y conocimiento', 'Modelos', 'Experiencia de usuario', 'Reglas de negocio'], a: 1, why: 'Entrenar modelos frontera está al alcance de una docena de empresas.' },
          { q: 'Managed Agents se diferencia del Agent SDK en que…', o: ['es más barato por token', 'Anthropic corre el loop y el sandbox; tú no hospedas ni operas la infraestructura', 'no permite herramientas', 'solo funciona con Haiku'], a: 1, why: 'Harness y despliegue gestionados frente a harness que tú hospedas.' },
          { q: 'En 2026 sigue siendo buena idea construir tu propio framework de agentes desde cero.', type: 'tf', a: false, why: 'El proveedor ofrece loop, memoria, caché, compactación y MCP mejor y más barato. Construye configuración y herramientas, no el motor.' },
          { q: 'Para que el equipo (no técnico) use IA con las reglas del negocio, la vía recomendada es…', o: ['darles acceso a la API', 'un plan Team de Claude con Proyectos por área y Skills con las reglas', 'que programen sus agentes', 'un modelo abierto en cada portátil'], a: 1, why: 'Producto terminado, con controles de administrador y sin construir nada.' }
        ],
        cards: [
          ['Las cinco capas del stack de IA', '1) Modelos (comprar) · 2) Plataforma/orquestación (comprar motor, construir configuración) · 3) Datos y conocimiento (construir) · 4) Integraciones (comprar conectores, construir los propios) · 5) Aplicaciones (construir lo diferencial).'],
          ['Tres formas de acceder al modelo', 'API directa / Agent SDK (control, tú hospedas), Managed Agents (Anthropic corre loop y sandbox), productos terminados (Claude.ai, Cowork, Chrome, Slack) para el equipo.'],
          ['Los dos errores del stack', 'Construir demasiado (reinventar loops, memoria, vectores que el proveedor ya da) y comprar demasiado (plataformas genéricas sin tus datos ni reglas). Revisar cada seis meses.']
        ],
        resources: [
          { type: 'doc', t: 'Anthropic: Agent SDK overview', u: 'https://platform.claude.com/docs/en/agent-sdk/overview', lang: 'EN' },
          { type: 'doc', t: 'Anthropic: Managed Agents overview', u: 'https://platform.claude.com/docs/en/managed-agents/overview', lang: 'EN' },
          { type: 'article', t: 'Anthropic: Building effective agents (cuándo usar agentes y cuándo no)', u: 'https://www.anthropic.com/research/building-effective-agents', lang: 'EN', note: 'El artículo más citado sobre arquitectura de agentes. Se estudia a fondo en el manual.' },
          { type: 'book', t: 'Chip Huyen: AI Engineering (2025)', u: 'https://www.oreilly.com/library/view/ai-engineering/9781098166298/', lang: 'EN', note: 'El libro de referencia para construir aplicaciones con modelos fundacionales: evals, RAG, agentes, costes.' }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'ia-7-3', title: 'Costes, retorno y la economía del token', minutes: 13, level: 'intermedio',
        summary: 'Cómo calcular lo que cuesta de verdad un caso de uso, dónde se esconde el gasto, las seis palancas de ahorro y cómo medir el retorno.',
        body: () => [
          B.lead('Con precios que caen un 90 % cada dos años, el coste de la IA parece irrelevante. No lo es: los agentes multiplican los tokens por 10 o por 100, y quien no mide acaba con sorpresas. Pero medir bien también revela retornos enormes.'),
          B.h('Anatomía del coste de una tarea'),
          B.code('text', 'Coste por tarea = Σ turnos [ (entrada_no_cacheada × P_in) + (entrada_cacheada × P_cache) + (salida + razonamiento) × P_out ]\n                 + coste de herramientas externas (búsqueda web, ejecución de código)\n                 + coste de reintentos y de supervisión humana\n\nEjemplo (Sonnet 5, 2 $/M entrada, 0,20 $/M caché, 10 $/M salida), un turno de Maya:\n  system prompt 15.000 tokens (cacheado)  → 15.000 × 0,20 / 1M = 0,003 $\n  historial + mensaje 2.000 (no cacheado) → 2.000 × 2 / 1M     = 0,004 $\n  2 llamadas a herramientas + respuesta 600 tokens de salida → 600 × 10 / 1M = 0,006 $\n  Total ≈ 0,013 $ por turno → 2.500 turnos/mes ≈ 33 $', 'Cálculo de coste'),
          B.p('Fíjate en dos cosas: el <b>system prompt cacheado</b> es casi gratis aunque tenga 1.200 líneas, y la <b>salida</b> pesa más que la entrada. Sin caché, ese mismo turno costaría 0,04 $: tres veces más.'),
          B.h('Dónde se esconde el gasto en agentes'),
          B.list([
            '<b>Turnos acumulados</b>: un agente de 30 pasos reenvía todo el contexto 30 veces. Sin caché, el coste crece con el cuadrado del número de pasos.',
            '<b>Resultados de herramientas enormes</b>: un log de 50.000 líneas o una tabla completa en el contexto. Recorta antes de devolver.',
            '<b>Razonamiento</b>: en tareas difíciles los tokens de pensamiento pueden superar a la respuesta. Controlar con effort.',
            '<b>Bucles y reintentos</b>: un agente que no consigue algo y lo intenta 20 veces. Poner límites de turnos y de presupuesto.',
            '<b>Modelo sobredimensionado</b>: Opus para clasificar tickets.'
          ]),
          B.h('Las seis palancas de ahorro (en orden de impacto)'),
          B.olist([
            '<b>No llamar al modelo</b> cuando reglas o código bastan (el router de Maya: 63 % de los turnos a coste cero).',
            '<b>Caché de prompts</b>: prefijo estable primero; ahorro del 90 % en lo repetido. Automático en Claude Code; explícito en la API.',
            '<b>Enrutar por dificultad</b>: Haiku/Sonnet para lo simple, Opus/Fable para lo difícil. Tu política, automatizada.',
            '<b>Batch API</b> (−50 %) para todo lo que no sea en tiempo real: el juez nocturno de Maya, informes, clasificaciones masivas.',
            '<b>Controlar contexto y salida</b>: compactar, recortar resultados de herramientas, pedir respuestas concisas, salidas estructuradas.',
            '<b>Effort y presupuestos</b>: effort bajo para lo mecánico; límites de turnos y de tokens por tarea (task budgets).'
          ]),
          B.h('El otro lado: el retorno'),
          B.p('Un cálculo honesto de retorno tiene tres términos:'),
          B.table(['Término', 'Cómo estimarlo', 'Ejemplo Maya'], [
            ['<b>Tiempo humano sustituido o liberado</b>', 'Horas/mes × coste hora cargado', 'Cientos de conversaciones de atención al mes que antes atendían personas: si son 60 horas a 150 MXN cargados, ~9.000 MXN/mes'],
            ['<b>Ingresos habilitados</b>', 'Ventas que ocurren porque el proceso es inmediato (24/7, sin espera)', 'Pedidos cerrados por WhatsApp fuera de horario; pagos conciliados en 10 minutos en vez de al día siguiente'],
            ['<b>Errores y riesgos evitados</b>', 'Coste de un error × reducción de frecuencia', 'Pagos mal vinculados, guías equivocadas, respuestas fuera de política']
          ]),
          B.p('Frente a un coste de tokens de ~30 $/mes (a precio de API) más el servidor y el tiempo de construcción, el retorno de Maya es de decenas de veces. Lo mismo vale para el admin construido con Claude Code: compara el coste de la suscripción y las horas con lo que costaría un equipo de desarrollo para 165 endpoints y 65 módulos. La conclusión general del sector en 2026 es que <b>el coste de los tokens casi nunca es el problema; el problema es medir y mantener la calidad</b>.'),
          B.warn('Suscripción vs API: la suscripción Max tiene límites de uso y sus términos están pensados para el trabajo interactivo de una persona; el Agent SDK y los agentes en producción están documentados para usar una clave de API con facturación por token. Conviene revisar los términos vigentes de Anthropic para el uso de Maya en producción y presupuestar el paso a API (~30-40 $/mes al volumen actual), que además te da cero retención, métricas de uso y continuidad si los límites de la suscripción cambian.'),
          B.key('Mide el coste por tarea, no por token. Ahorra primero no llamando al modelo, luego con caché y enrutado. Y calcula el retorno con tres términos: tiempo, ingresos habilitados y errores evitados. En 2026 el coste de tokens rara vez es la restricción.'),
          B.check('¿Cuál es la palanca de ahorro de mayor impacto en un agente como Maya?', ['Bajar la temperatura', 'Resolver con reglas o código los turnos que no necesitan modelo', 'Usar respuestas más largas', 'Cambiar de proveedor cada mes'], 1, 'El 63 % de los turnos de Maya no llegan al modelo: coste cero y cero alucinaciones.'),
          B.cards([
            { icon: '🧮', title: 'Coste por tarea', html: 'Entrada (cacheada o no) + salida + razonamiento + herramientas + reintentos.' },
            { icon: '💾', title: 'Caché', html: 'El system prompt de 1.200 líneas cuesta casi nada si va primero.' },
            { icon: '🎚️', title: 'Seis palancas', html: 'No llamar, caché, enrutar, batch, contexto, effort.' },
            { icon: '📈', title: 'Retorno', html: 'Tiempo + ingresos habilitados + errores evitados.' }
          ])
        ],
        quiz: [
          { q: 'En un turno típico de Maya con caché, ¿qué componente pesa más en el coste?', o: ['El system prompt cacheado', 'Los tokens de salida', 'El nombre del modelo', 'La latencia'], a: 1, why: 'La salida cuesta 5 veces la entrada y el prefijo cacheado cuesta el 10 %.' },
          { q: 'Sin caché, el coste de un agente de muchos pasos crece…', o: ['linealmente con los pasos', 'aproximadamente con el cuadrado del número de pasos, porque cada turno reenvía todo el contexto', 'no crece', 'decrece'], a: 1, why: 'Por eso la caché de prompts es imprescindible en agentes.' },
          { q: 'La Batch API ofrece un descuento del…', type: 'fill', a: ['50 %', '50%', '50', 'cincuenta por ciento', 'mitad'], why: '50 % para trabajos que no requieren respuesta en tiempo real: jueces nocturnos, informes, clasificaciones.' },
          { q: 'El coste de tokens es hoy la principal restricción para usar IA en una empresa mediana.', type: 'tf', a: false, why: 'Rara vez. La restricción es medir y mantener la calidad. Maya cuesta ~30 $/mes en tokens a precio de API.' },
          { q: 'Los tres términos de un cálculo honesto de retorno son…', type: 'multi', o: ['Tiempo humano sustituido o liberado', 'Ingresos habilitados', 'Errores y riesgos evitados', 'Número de tokens generados'], a: [0, 1, 2], why: 'Los tokens son coste, no retorno.' }
        ],
        cards: [
          ['Fórmula del coste por tarea', 'Suma por turno de entrada no cacheada × precio + entrada cacheada × precio caché + (salida + razonamiento) × precio salida, más herramientas externas, reintentos y supervisión.'],
          ['Las seis palancas de ahorro', '1) No llamar al modelo cuando bastan reglas. 2) Caché de prompts. 3) Enrutar por dificultad. 4) Batch API (−50 %). 5) Controlar contexto y salida. 6) Effort y presupuestos.'],
          ['Cómo calcular el retorno de un caso de uso', 'Tiempo humano liberado (horas × coste cargado) + ingresos habilitados (ventas por inmediatez/24-7) + errores y riesgos evitados (coste × reducción de frecuencia).'],
          ['Suscripción vs API para agentes en producción', 'La suscripción tiene límites y términos para uso interactivo; el Agent SDK en producción está documentado con clave de API (facturación por token, cero retención, métricas). Revisar términos y presupuestar.']
        ],
        resources: [
          { type: 'doc', t: 'Anthropic: Prompt caching (cómo ordenar el prompt para ahorrar)', u: 'https://platform.claude.com/docs/en/build-with-claude/prompt-caching', lang: 'EN' },
          { type: 'doc', t: 'Anthropic: Message Batches API', u: 'https://platform.claude.com/docs/en/build-with-claude/batch-processing', lang: 'EN' },
          { type: 'doc', t: 'Anthropic: Task budgets (límites de gasto por tarea)', u: 'https://platform.claude.com/docs/en/build-with-claude/task-budgets', lang: 'EN' },
          { type: 'doc', t: 'Anthropic: Usage and Cost Admin API', u: 'https://platform.claude.com/docs/en/build-with-claude/usage-cost-api', lang: 'EN', note: 'Para medir el gasto real por clave y por modelo.' }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'ia-7-4', title: 'Riesgos legales, de marca y de cumplimiento', minutes: 12, level: 'intermedio',
        summary: 'Lo que un director general debe tener controlado: responsabilidad por lo que dice el modelo, datos personales, propiedad intelectual, publicidad regulada y transparencia.',
        body: () => [
          B.lead('La IA no cambia tus obligaciones legales: las amplifica. Todo lo que un empleado no podría decir o hacer, un agente tampoco. Y el agente lo hace a escala y a las 3 de la mañana.'),
          B.h('1. Responsabilidad por lo que el modelo dice'),
          B.p('Air Canada (2024): su chatbot inventó una política de reembolso por duelo; el tribunal obligó a la aerolínea a cumplirla. Lección: <b>lo que tu agente dice es una declaración de tu empresa</b>. Medidas: reglas en el system prompt y en los facts, respuestas literales para lo que compromete (precios, plazos, políticas), aviso claro de que es un asistente automatizado, escalado a humano fácil, y auditoría periódica (el juez nocturno de Maya).'),
          B.h('2. Publicidad y claims regulados'),
          B.p('En tu sector, esto es lo primero. <b>COFEPRIS</b> en México (y la FTC si vendes en EE. UU.) regulan qué se puede afirmar sobre suplementos: nada de curar, tratar ni prevenir enfermedades; nada de promesas de ingresos en mercadeo en red. Un modelo optimizado para ser útil tiende a <i>completar</i> lo que el cliente quiere oír ("¿sirve para la presión?"). Medidas: prohibiciones explícitas en el prompt, lista de frases permitidas, detección automática de claims en las respuestas (un clasificador barato con Haiku), y revisión humana de todo material de marketing generado. Tus líneas rojas (sin afirmaciones de salud, sin promesas de ingresos, Plata 1000 y Acqua 1000 nunca "plata coloidal") son exactamente esta capa.'),
          B.h('3. Datos personales'),
          B.p('La <b>LFPDPPP</b> mexicana (y el RGPD si tratas datos de europeos) exige base legal, finalidad, minimización y seguridad. Cuando mandas datos de un distribuidor a un proveedor de IA, ese proveedor es un encargado del tratamiento: necesitas términos que lo garanticen (los planes empresariales y la API de Anthropic los ofrecen: sin entrenamiento, retención limitada o cero, cifrado). Minimiza: Maya no necesita el RFC completo para responder cuándo llega un pedido. Y documenta en tu aviso de privacidad que usas sistemas automatizados.'),
          B.h('4. Propiedad intelectual'),
          B.list([
            '<b>Lo que generas</b>: en la mayoría de jurisdicciones, el texto o la imagen generados por IA sin aportación humana sustancial no tienen protección de autor. Para tu marca no importa mucho (guiones, descripciones), pero no esperes exclusividad sobre un logo generado.',
            '<b>Lo que el modelo aprendió</b>: las demandas de autores y medios contra los laboratorios (NYT vs OpenAI, Authors Guild, la de Anthropic con autores resuelta en 2025 con un acuerdo de 1.500 millones por libros descargados de sitios piratas) se dirimen entre ellos; Anthropic ofrece indemnización por derechos de autor a clientes de la API.',
            '<b>Tu código</b>: el código que Claude escribe para ti es tuyo según los términos de Anthropic. Revisa licencias de dependencias como con cualquier código.'
          ]),
          B.h('5. Transparencia y trato justo'),
          B.list([
            'El AI Act (si operas en Europa) y varias leyes estatales de EE. UU. exigen informar cuando alguien interactúa con una IA y prohíben manipulación. Buena práctica universal: que Maya se presente como asistente virtual.',
            'Decisiones automatizadas con efectos jurídicos (aprobar un crédito, rechazar una inscripción): derecho a intervención humana. Si un modelo decide sobre KYC o inscripciones, que sea recomendación con revisión.',
            'Sesgos: un modelo puede tratar distinto a personas por nombre, zona o forma de escribir. Audita con casos de prueba.'
          ]),
          B.h('6. Secretos y seguridad operativa'),
          B.p('Llaves de API, tokens y contraseñas nunca en prompts, ni en el repo, ni en mensajes de chat entre sesiones. El incidente del 14 de septiembre (una clave de correo en <code>new.php</code> que casi entra al repo) es el caso típico. Medidas: variables de entorno, hooks que bloqueen commits con patrones de llaves, escáner de secretos en el repositorio (GitHub lo ofrece), rotación periódica.'),
          B.key('Cinco controles que resuelven el 90 %: (1) reglas de claims en prompt + detector automático; (2) respuestas literales para lo que compromete; (3) datos por API/plan empresarial con minimización; (4) humano en decisiones con efecto jurídico; (5) secretos fuera del código con hooks. Todo lo demás es supervisión continua.'),
          B.check('Un distribuidor le pregunta a Maya si un producto "sirve para la diabetes". ¿Qué debe ocurrir?', ['Maya responde con lo que sabe del producto', 'Maya responde con una fórmula aprobada que no hace afirmaciones de salud y, si procede, escala a un humano; un detector registra el intento', 'Maya inventa una respuesta prudente', 'Maya ignora el mensaje'], 1, 'Reglas explícitas, respuesta literal aprobada, escalado y auditoría. La empresa responde por lo que diga.'),
          B.cards([
            { icon: '⚖️', title: 'Air Canada', html: 'Lo que dice tu bot te obliga.' },
            { icon: '🚫', title: 'Claims', html: 'COFEPRIS/FTC: prompt + detector + revisión humana.' },
            { icon: '🔏', title: 'Datos', html: 'LFPDPPP/RGPD: API o plan empresarial, minimizar.' },
            { icon: '🔑', title: 'Secretos', html: 'Fuera del código; hooks que bloqueen.' }
          ])
        ],
        quiz: [
          { q: 'El caso Air Canada (2024) estableció que…', o: ['los chatbots están prohibidos en aerolíneas', 'una empresa responde por lo que su chatbot afirma, aunque sea inventado', 'los reembolsos son obligatorios', 'la IA no puede hablar de políticas'], a: 1, why: 'Lo que el agente dice es una declaración de la empresa. Reglas, respuestas literales y auditoría.' },
          { q: '¿Cuál es la medida más eficaz contra claims de salud no permitidos en un agente de ventas?', type: 'multi', o: ['Prohibiciones explícitas en el system prompt y en los facts', 'Un detector automático de claims en las respuestas', 'Revisión humana del material de marketing', 'Subir la temperatura para que sea creativo'], a: [0, 1, 2], why: 'Capas: prompt, detección, revisión. La creatividad es justo lo que no quieres aquí.' },
          { q: 'El texto generado íntegramente por IA sin aportación humana sustancial suele tener protección de derechos de autor.', type: 'tf', a: false, why: 'En la mayoría de jurisdicciones no. Importa poco para guiones; importa si esperas exclusividad sobre un logo.' },
          { q: 'La ley mexicana de protección de datos personales en posesión de particulares se abrevia…', type: 'fill', a: ['LFPDPPP', 'lfpdppp'], why: 'LFPDPPP. Al enviar datos a un proveedor de IA, este es encargado del tratamiento: necesitas términos adecuados.' },
          { q: 'Ante una decisión automatizada con efecto jurídico (rechazar una inscripción), lo correcto es…', o: ['que el modelo decida solo', 'que el modelo recomiende y una persona revise', 'no usar IA nunca', 'pedirle al cliente que acepte'], a: 1, why: 'Derecho a intervención humana; además, reduce el riesgo de sesgo.' }
        ],
        cards: [
          ['Responsabilidad por lo que dice el modelo', 'Lo que tu agente afirma es una declaración de tu empresa (caso Air Canada, 2024). Reglas en prompt y facts, respuestas literales para lo que compromete, aviso de asistente automatizado, escalado y auditoría.'],
          ['Cumplimiento de claims en RRB', 'COFEPRIS/FTC: nada de curar, tratar o prevenir; sin promesas de ingresos; Plata 1000 y Acqua 1000 nunca "plata coloidal". Prompt + detector automático + revisión humana del marketing.'],
          ['Datos personales e IA', 'LFPDPPP/RGPD: el proveedor de IA es encargado del tratamiento; usa API o plan empresarial (sin entrenamiento, retención limitada); minimiza los datos enviados; documenta en el aviso de privacidad.'],
          ['Cinco controles legales básicos', '1) Reglas de claims + detector. 2) Respuestas literales. 3) Datos por vía adecuada y minimizados. 4) Humano en decisiones con efecto jurídico. 5) Secretos fuera del código con hooks.']
        ],
        resources: [
          { type: 'article', t: 'Anthropic: términos comerciales y política de uso', u: 'https://www.anthropic.com/legal/commercial-terms', lang: 'EN' },
          { type: 'article', t: 'Anthropic: Usage Policy (qué usos están permitidos)', u: 'https://www.anthropic.com/legal/aup', lang: 'EN' },
          { type: 'article', t: 'Anthropic Trust Center (certificaciones, retención, seguridad)', u: 'https://trust.anthropic.com/', lang: 'EN' },
          { type: 'article', t: 'Caso Moffatt v. Air Canada (2024), resumen', u: 'https://www.canlii.org/en/bc/bccrt/doc/2024/2024bccrt149/2024bccrt149.html', lang: 'EN', note: 'La sentencia original, breve y legible.' }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'ia-7-5', title: 'Las doce preguntas que hacen los expertos', minutes: 12, level: 'avanzado',
        summary: 'El marco mental con el que un ejecutivo del sector evalúa cualquier anuncio, propuesta, proveedor o proyecto de IA en cinco minutos.',
        body: () => [
          B.lead('Después de seis módulos tienes las piezas. Esta lección las convierte en un instrumento: doce preguntas que puedes hacer a un proveedor, a un anuncio de modelo, a un artículo o a tu propio proyecto, y que revelan en minutos si hay sustancia.'),
          B.h('Sobre la tecnología'),
          B.olist([
            '<b>¿Qué tipo de sistema es?</b> Reglas, modelo que clasifica, modelo que genera, agente con herramientas. Cada uno falla distinto y cuesta distinto (módulo 1).',
            '<b>¿Qué hay en el contexto y qué no?</b> ¿De dónde saca los datos: de sus parámetros (alucinación posible), del contexto (RAG, documentos) o de herramientas (verificable)? (módulo 2).',
            '<b>¿Cómo se verifica la salida?</b> ¿Hay tests, una respuesta comprobable, un humano, un juez? Si nada verifica, es una demo (módulo 3).',
            '<b>¿Qué pasa cuando falla?</b> ¿Falla de forma segura (se abstiene, escala) o de forma peligrosa (inventa, actúa)? ¿Hay confirmación humana en lo irreversible? (módulo 6).'
          ]),
          B.h('Sobre las cifras'),
          B.olist([
            '<b>¿Medido en qué?</b> Ante cualquier porcentaje: qué benchmark, cuántos intentos, con qué herramientas, con qué esfuerzo, con datos de quién. Un 95 % sin esas cinco respuestas no significa nada (módulo 3).',
            '<b>¿Coste por tarea completada?</b> No por token, no por licencia: por resultado, incluyendo reintentos y supervisión (módulo 7).',
            '<b>¿Qué pasa si el volumen se multiplica por 10?</b> Coste, latencia, límites del proveedor, cuellos de botella humanos.'
          ]),
          B.h('Sobre la estrategia'),
          B.olist([
            '<b>¿Qué haría esto obsoleto en 12 meses?</b> Si el proveedor del modelo lo ofrece nativo el año que viene (memoria, agentes, conectores), no construyas encima; configura (módulo 7).',
            '<b>¿Dónde está la ventaja que nadie más tiene?</b> Datos propios, reglas, distribución, relación con el cliente. Si la propuesta no la usa, es genérica.',
            '<b>¿Cuánto depende de un solo proveedor, chip o país?</b> Y cuánto costaría cambiar. La geopolítica mueve precios y disponibilidad (módulo 5).'
          ]),
          B.h('Sobre las personas y el riesgo'),
          B.olist([
            '<b>¿Quién responde por lo que diga o haga?</b> Legalmente y operativamente. ¿Qué datos ve, con qué base, dónde se guardan? (módulos 6 y 7).',
            '<b>¿Qué visión del mundo hay detrás?</b> Quien anuncia, ¿es Amodei, Altman, LeCun o un vendedor? Sus incentivos y creencias explican el mensaje (módulo 5).'
          ]),
          B.h('Aplicación rápida: tres casos'),
          B.ex('Caso 1: un proveedor te ofrece "un agente de ventas con IA para WhatsApp"', [
            B.p('Preguntas 1-4: ¿es un flujo de reglas con un LLM que redacta, o un agente con herramientas? ¿Cómo accede a mis pedidos y pagos? ¿Cómo evita afirmar cosas de salud? ¿Qué hace si no sabe? Pregunta 6: ¿precio por conversación resuelta? Pregunta 9: ¿qué aporta que Maya no tenga ya? Resultado típico: descubres que vende lo que ya construiste, sin tus datos.')
          ]),
          B.ex('Caso 2: un titular dice "el nuevo modelo X supera a los médicos"', [
            B.p('Pregunta 5: ¿en qué examen, con cuántos intentos, contra qué médicos, con qué acceso a información? Pregunta 12: ¿quién lo publica y qué vende? Casi siempre: examen tipo test con respuestas conocidas, frente a médicos sin acceso a referencias. Impresionante y a la vez no lo que sugiere el titular.')
          ]),
          B.ex('Caso 3: tu propia idea de automatizar el corte de regalías con un agente', [
            B.p('Pregunta 1: el cálculo es determinista → reglas y SQL, no modelo. El modelo sirve para explicar anomalías y redactar el resumen. Pregunta 3: verificación = cuadre con pagovta. Pregunta 4: acción irreversible (pagar) → confirmación tuya. Resultado: un diseño correcto en dos minutos, que es el que ya intuías.')
          ]),
          B.key('Las doce preguntas no requieren saber programar. Requieren entender cómo funciona la tecnología, cómo se mide, cómo se cobra y quién habla. Eso es exactamente lo que este curso te ha dado. Úsalas en la siguiente reunión.'),
          B.check('Un vendedor dice que su modelo "acierta el 97 %". ¿Cuál es la primera pregunta?', ['¿Cuánto cuesta?', '¿Medido en qué: qué tarea, qué datos, cuántos intentos, con qué herramientas?', '¿Es de Estados Unidos?', '¿Tiene app móvil?'], 1, 'Sin las condiciones de medida, el porcentaje no significa nada.'),
          B.cards([
            { icon: '🔧', title: 'Tecnología', html: '¿Qué tipo? ¿De dónde saca los datos? ¿Cómo se verifica? ¿Cómo falla?' },
            { icon: '📊', title: 'Cifras', html: '¿Medido en qué? ¿Coste por tarea? ¿Y con ×10?' },
            { icon: '♟️', title: 'Estrategia', html: '¿Obsoleto en 12 meses? ¿Tu ventaja? ¿Dependencia?' },
            { icon: '🧑‍⚖️', title: 'Riesgo', html: '¿Quién responde? ¿Qué visión hay detrás?' }
          ])
        ],
        quiz: [
          { q: 'Ante una propuesta de "agente de IA", la primera pregunta técnica es…', o: ['¿qué modelo usa?', '¿qué tipo de sistema es: reglas, clasificador, generador o agente con herramientas?', '¿cuánto cuesta la licencia?', '¿tiene interfaz bonita?'], a: 1, why: 'El tipo de sistema determina cómo falla y cuánto cuesta.' },
          { q: 'Si nada verifica la salida de un sistema de IA…', o: ['es perfecto', 'es una demo, no un producto', 'es más barato', 'es más rápido'], a: 1, why: 'Sin tests, respuesta comprobable, humano o juez, no hay fiabilidad medible.' },
          { q: 'El cálculo del corte de regalías debería hacerlo un LLM porque es más flexible.', type: 'tf', a: false, why: 'Es determinista: reglas y SQL. El modelo sirve para explicar anomalías y redactar el resumen.' },
          { q: 'La pregunta "¿qué haría esto obsoleto en 12 meses?" sirve para…', o: ['asustar al proveedor', 'evitar construir lo que el proveedor del modelo ofrecerá nativo pronto', 'calcular impuestos', 'elegir el color del logo'], a: 1, why: 'Memoria, agentes, conectores: lo que era proyecto en 2024 es configuración en 2026.' },
          { q: 'La pregunta 12 (¿qué visión del mundo hay detrás?) se apoya en el módulo sobre…', type: 'fill', a: ['líderes', 'los líderes', 'panorama', 'el panorama', 'lideres', 'módulo 5', 'modulo 5'], why: 'El panorama y las visiones de los líderes (módulo 5): los incentivos y creencias explican el mensaje.' }
        ],
        cards: [
          ['Las 4 preguntas sobre tecnología', '¿Qué tipo de sistema es? ¿Qué hay en el contexto y de dónde salen los datos? ¿Cómo se verifica la salida? ¿Qué pasa cuando falla?'],
          ['Las 3 preguntas sobre cifras', '¿Medido en qué (benchmark, intentos, herramientas, esfuerzo, datos)? ¿Coste por tarea completada? ¿Qué pasa con volumen ×10?'],
          ['Las 3 preguntas sobre estrategia', '¿Qué lo haría obsoleto en 12 meses? ¿Dónde está la ventaja que nadie más tiene? ¿Cuánto depende de un proveedor, chip o país?'],
          ['Las 2 preguntas sobre personas y riesgo', '¿Quién responde por lo que diga o haga, y qué datos ve? ¿Qué visión del mundo e incentivos hay detrás de quien lo propone?']
        ],
        resources: [
          { type: 'article', t: 'Anthropic: Building effective agents (la sección "cuándo usar agentes")', u: 'https://www.anthropic.com/research/building-effective-agents', lang: 'EN' },
          { type: 'article', t: 'Ethan Mollick: One Useful Thing (blog sobre IA en el trabajo, para directivos)', u: 'https://www.oneusefulthing.org/', lang: 'EN', note: 'Profesor de Wharton. Lo más útil que puede leer un ejecutivo sobre IA cada semana.' },
          { type: 'book', t: 'Ethan Mollick: Co-Intelligence (2024)', u: 'https://www.penguinrandomhouse.com/books/741805/co-intelligence-by-ethan-mollick/', lang: 'EN', note: 'Cómo trabajar con IA como colega. Hay edición en español ("Inteligencia artificial para líderes" no; busca "Co-inteligencia").' }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'ia-7-6', title: 'Cómo mantenerte al día sin ahogarte', minutes: 10, level: 'básico',
        summary: 'Una rutina semanal de 45 minutos, las fuentes que leen los ejecutivos y cómo usar a Claude para filtrar el ruido.',
        body: () => [
          B.lead('El sector publica más en una semana que lo que puedes leer en un mes. La solución no es leer más: es elegir pocas fuentes primarias y usar a Claude para digerir el resto.'),
          B.h('La rutina: 45 minutos a la semana'),
          B.olist([
            '<b>15 min · Fuentes primarias.</b> Los anuncios oficiales de Anthropic (news y engineering), y una pasada por los de OpenAI y Google DeepMind. Lo que dicen los laboratorios, no lo que dicen de ellos.',
            '<b>15 min · Un analista.</b> Uno solo: Ethan Mollick (para uso en el trabajo), Simon Willison (para herramientas y seguridad), Zvi Mowshowitz (para todo, denso), Nathan Lambert (post-entrenamiento) o Latent Space (para ingeniería). Cambia cada trimestre si quieres.',
            '<b>15 min · Digestión con Claude.</b> Pega los enlaces o el texto y pídele: "Resume qué cambia para RRB y qué no. Tres puntos. Sin hype". Guarda el resumen en tu carpeta maestra.'
          ]),
          B.h('Una vez al mes'),
          B.list([
            'El <b>changelog de Claude Code</b> y las notas de la API: es donde aparecen las funciones que te ahorran horas (memoria, skills, rutinas, Cowork llegaron así).',
            'Un episodio largo del <b>Dwarkesh Podcast</b> o de <b>Lex Fridman</b> con un líder del sector, en el coche o en el gimnasio.',
            'Revisar con Claude si algo de tu stack (chat entre sesiones, memoria propia, workers) ya lo ofrece el proveedor mejor.'
          ]),
          B.h('Una vez al año'),
          B.list([
            '<b>State of AI Report</b> (octubre) y <b>Stanford AI Index</b> (abril): los dos resúmenes que citan los ejecutivos.',
            '<b>International AI Safety Report</b> (enero): el consenso científico sobre riesgos.',
            'Releer los ensayos de Amodei y Altman del año y comparar con lo que pasó.'
          ]),
          B.h('Fuentes recomendadas (todas en la Biblioteca)'),
          B.table(['Tipo', 'Fuente', 'Para qué'], [
            ['Oficial', 'anthropic.com/news · anthropic.com/engineering · code.claude.com/docs · platform.claude.com/docs', 'Lo que cambia en Claude'],
            ['Oficial', 'openai.com/news · deepmind.google/blog · api-docs.deepseek.com/news', 'La competencia'],
            ['Datos', 'Epoch AI · Artificial Analysis · Stanford AI Index', 'Cifras fiables de cómputo, precios, adopción'],
            ['Análisis', 'One Useful Thing (Mollick) · simonwillison.net · thezvi.substack.com · Interconnects (Lambert) · SemiAnalysis', 'Interpretación con criterio'],
            ['Audio', 'Dwarkesh Podcast · Lex Fridman · Latent Space · Hard Fork (NYT)', 'Largo formato con los protagonistas'],
            ['Español', 'DotCSV (YouTube) · Xataka · Hipertextual · newsletter de Andrés Torrubia', 'Divulgación y noticias en tu idioma'],
            ['Papers', 'arXiv (cs.CL, cs.AI) vía alphaXiv o Hugging Face Papers', 'Solo si un analista lo destaca; nunca por volumen']
          ]),
          B.tip('Configura una <b>rutina programada</b> en Claude (manual, módulo 3): cada lunes a las 7:00, que busque las novedades de la semana en las fuentes oficiales, las resuma en cinco líneas orientadas a tu negocio y te las mande. Es la lección de este módulo convertida en algo que ocurre solo.'),
          B.key('Pocas fuentes primarias, un analista de confianza, y Claude como filtro. 45 minutos semanales bastan para estar más al día que el 95 % de los directivos. Lo que no leas, no importa: si de verdad importa, volverá a aparecer.'),
          B.check('¿Cuál es la fuente más fiable sobre qué ha cambiado en un modelo de Claude?', ['Un hilo viral en redes', 'El anuncio oficial de Anthropic y la documentación', 'Un vídeo de reacción', 'Un rumor en un foro'], 1, 'Fuentes primarias primero; análisis después; redes casi nunca.'),
          B.cards([
            { icon: '⏱️', title: '45 min/semana', html: '15 oficial + 15 un analista + 15 digestión con Claude.' },
            { icon: '📅', title: 'Mensual', html: 'Changelog de Claude Code, un podcast largo, revisar tu stack.' },
            { icon: '📆', title: 'Anual', html: 'State of AI, AI Index, Safety Report.' },
            { icon: '🤖', title: 'Automatiza', html: 'Una rutina de Claude que te resuma la semana.' }
          ])
        ],
        quiz: [
          { q: 'La rutina semanal recomendada es…', o: ['leer todo lo que salga', '15 min de fuentes oficiales, 15 de un analista, 15 de digestión con Claude', 'solo redes sociales', 'no leer nada'], a: 1, why: 'Pocas fuentes primarias y Claude como filtro.' },
          { q: '¿Qué dos informes anuales citan más los ejecutivos del sector?', type: 'multi', o: ['State of AI Report', 'Stanford AI Index', 'Un ranking de influencers', 'El informe de una consultora cualquiera'], a: [0, 1], why: 'Octubre y abril respectivamente. Más el International AI Safety Report en enero.' },
          { q: 'Leer papers de arXiv por volumen es una buena forma de mantenerse al día para un directivo.', type: 'tf', a: false, why: 'Solo si un analista de confianza los destaca. El volumen es inabarcable y la mayoría no cambia nada.' },
          { q: 'La forma de convertir esta rutina en algo automático es…', type: 'fill', a: ['rutina programada', 'una rutina programada', 'rutinas programadas', 'rutina', 'routine', 'tarea programada'], why: 'Una rutina programada de Claude que busque, resuma y te envíe las novedades cada semana.' }
        ],
        cards: [
          ['Rutina semanal de actualización (45 min)', '15 min fuentes oficiales (Anthropic, OpenAI, Google) + 15 min un analista de confianza (Mollick, Willison, Zvi, Lambert) + 15 min digestión con Claude orientada a tu negocio.'],
          ['Fuentes anuales imprescindibles', 'State of AI Report (octubre), Stanford AI Index (abril), International AI Safety Report (enero).'],
          ['Fuentes de datos fiables sobre IA', 'Epoch AI (cómputo, costes), Artificial Analysis (precio, velocidad, calidad de modelos), Stanford AI Index (adopción, inversión).']
        ],
        resources: [
          { type: 'article', t: 'Anthropic: noticias', u: 'https://www.anthropic.com/news', lang: 'EN' },
          { type: 'article', t: 'Anthropic Engineering Blog', u: 'https://www.anthropic.com/engineering', lang: 'EN' },
          { type: 'doc', t: 'Claude Code: changelog', u: 'https://code.claude.com/docs/en/changelog', lang: 'EN' },
          { type: 'article', t: 'Ethan Mollick: One Useful Thing', u: 'https://www.oneusefulthing.org/', lang: 'EN' },
          { type: 'article', t: 'Simon Willison\'s Weblog', u: 'https://simonwillison.net/', lang: 'EN' },
          { type: 'article', t: 'Zvi Mowshowitz: Don\'t Worry About the Vase', u: 'https://thezvi.substack.com/', lang: 'EN' },
          { type: 'podcast', t: 'Latent Space (ingeniería de IA)', u: 'https://www.latent.space/', lang: 'EN' },
          { type: 'video', t: 'DotCSV (noticias y explicaciones en español)', u: 'https://www.youtube.com/@DotCSV', lang: 'ES' }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'ia-7-7', title: 'Hacia dónde va esto: 2026-2030', minutes: 14, level: 'avanzado',
        summary: 'Las predicciones de los que saben, las tendencias que ya están en marcha, los cuellos de botella, y cómo formarte una opinión propia sin comprar ningún relato.',
        body: () => [
          B.lead('Nadie sabe qué pasará. Pero los mejores del sector tienen predicciones concretas y públicas, y las tendencias de los últimos tres años apuntan en direcciones claras. Tu trabajo como ejecutivo no es adivinar: es prepararte para varios escenarios.'),
          B.h('Lo que ya está en marcha (alta confianza)'),
          B.list([
            '<b>Agentes que trabajan horas y días.</b> La duración de las tareas que un agente completa con fiabilidad se dobla cada ~7 meses (METR). En 2026 son horas; hacia 2027-2028, jornadas completas. Tu Maya de hoy es un agente de turnos de segundos; los de 2028 gestionarán un proceso completo de principio a fin.',
            '<b>El código como primer dominio transformado.</b> Ya ocurre: tú diriges 165 endpoints sin programar. En 2027 la mayoría del código nuevo del mundo lo escribirán agentes bajo dirección humana.',
            '<b>Razonamiento cada vez más barato.</b> Lo que hoy cuesta effort máximo en Fable costará effort bajo en un modelo mediano en 18 meses. La inteligencia se abarata un orden de magnitud cada dos años.',
            '<b>Multimodal y en el mundo.</b> Voz natural, visión, computer use; y los primeros robots humanoides útiles en fábricas y almacenes (Figure, Tesla Optimus, Unitree, 1X), con IA generalista.',
            '<b>Ciencia acelerada.</b> Diseño de proteínas (Fable 5.1 con afinidades 10× mejores), materiales, matemáticas (problemas abiertos resueltos), y la "IA como investigador" que Amodei y Altman esperan para 2026-2027.',
            '<b>La energía como límite.</b> Gigavatios, nuclear, gas; los países con electricidad barata ganan peso.'
          ]),
          B.h('Las predicciones de los líderes'),
          B.table(['Quién', 'Qué predice', 'Cuándo'], [
            ['Dario Amodei', '"IA poderosa" (un país de genios en un centro de datos); la mitad de los empleos de oficina junior en riesgo; posibilidad de que la IA haga investigación de IA', '2026-2027; empleo en 5 años'],
            ['Sam Altman', 'Agentes (2025) → sistemas que descubren cosas nuevas (2026) → robots útiles (2027); superinteligencia en pocos años', '2025-2030'],
            ['Demis Hassabis', 'AGI (exigente) hacia 2030; curas para la mayoría de las enfermedades en una década con IA', '~2030'],
            ['Yann LeCun', 'Los LLM no llevan a inteligencia humana; hacen falta modelos de mundo; décadas para IA de nivel humano', 'Décadas'],
            ['Informe AI 2027 (Kokotajlo et al.)', 'Escenario detallado de IA que automatiza la investigación de IA en 2027 con una carrera EE. UU.-China; criticado por agresivo, influyente en Washington', '2027-2028'],
            ['METR (medición)', 'La longitud de tareas autónomas se dobla cada ~7 meses', 'Tendencia observada']
          ]),
          B.h('Lo incierto (baja confianza, alto impacto)'),
          B.list([
            '<b>¿Se automatiza la investigación de IA?</b> Si los modelos aceleran su propio desarrollo, todo se acelera; es el umbral de ASL-4 y la premisa de "AI 2027". Los laboratorios ya usan modelos para gran parte de su ingeniería; el salto a investigación autónoma no ha ocurrido.',
            '<b>¿Aguanta la economía la inversión?</b> Una corrección financiera (burbuja) frenaría la construcción de centros de datos sin detener la tecnología.',
            '<b>¿Regulación fuerte o débil?</b> Un incidente grave (ciber, bio) podría traer regulación estricta de golpe.',
            '<b>¿Taiwán?</b> Un conflicto detendría la cadena de suministro durante años.',
            '<b>¿Alineación?</b> Si los comportamientos de laboratorio (alignment faking, chantaje) aparecen en despliegues reales con agentes autónomos, cambiaría la velocidad de todo.'
          ]),
          B.h('Cómo formarte una opinión propia'),
          B.olist([
            'Separa <b>tendencias medidas</b> (METR, Epoch, precios) de <b>predicciones</b> (ensayos) y de <b>marketing</b> (anuncios).',
            'Pregunta siempre qué gana quien predice: Altman vende abundancia; Amodei, seguridad y urgencia; LeCun, su nueva empresa; los analistas, suscripciones. Todos pueden tener razón a la vez en parte.',
            'Mira lo que <b>hacen</b>, no lo que dicen: los laboratorios gastan cientos de miles de millones en cómputo. Nadie apuesta eso a una moda.',
            'Escribe tu predicción anual en tu carpeta maestra y revísala. Es el único método que mejora el criterio.'
          ]),
          B.h('Qué significa para RRB y para ti'),
          B.list([
            '<b>Corto plazo (2026-2027)</b>: Maya gestiona pedidos completos y anticipa problemas; rutinas que trabajan mientras duermes; Claude para todo el equipo con permisos por rol; auditorías continuas. Todo eso existe ya; es tu plan por etapas del manual.',
            '<b>Medio plazo (2028-2030)</b>: agentes que dirigen procesos completos (atención, logística, contabilidad) bajo tu supervisión; el "CTO fraccional en IA" que planeas es una profesión en crecimiento; la ventaja pasa a quien tiene datos, relación y criterio, no a quien programa.',
            '<b>Siempre</b>: tus líneas rojas y tu criterio de negocio son lo que la IA no sustituye. Un director que entiende la tecnología (este curso) y que sabe qué quiere (tú) es exactamente el perfil que multiplica su alcance con estas herramientas.'
          ]),
          B.quote('La IA no va a reemplazar a los directivos. Los directivos que usen IA van a reemplazar a los que no.', 'Máxima repetida en el sector, con variantes, desde 2023'),
          B.key('Prepárate para varios escenarios: uno donde el progreso sigue como hasta ahora (agentes de días, ciencia acelerada, presión sobre el empleo), uno más rápido (investigación de IA automatizada hacia 2027) y uno de frenazo (financiero, regulatorio o geopolítico). En los tres, el que entiende la tecnología y tiene datos y criterio propios sale ganando.'),
          B.check('Según METR, la duración de las tareas que un agente completa con fiabilidad…', ['se mantiene estable', 'se dobla aproximadamente cada 7 meses', 'se reduce', 'se dobla cada 10 años'], 1, 'De segundos (2022) a horas (2026). Hacia 2027-2028, jornadas completas.'),
          B.cards([
            { icon: '📈', title: 'Tendencias medidas', html: 'Tareas ×2 cada 7 meses; inteligencia 10× más barata cada 2 años.' },
            { icon: '🔮', title: 'Predicciones', html: 'Amodei 2026-27; Altman gradual; Hassabis 2030; LeCun décadas.' },
            { icon: '❓', title: 'Incertidumbres', html: 'I+D de IA automatizada, burbuja, regulación, Taiwán, alineación.' },
            { icon: '🧭', title: 'Tu posición', html: 'Datos + relación + criterio. Eso no se automatiza.' }
          ])
        ],
        quiz: [
          { q: '¿Qué tendencia medida por METR es clave para anticipar los agentes de 2027-2028?', o: ['El precio de la GPU', 'La duración de las tareas autónomas completadas con fiabilidad se dobla cada ~7 meses', 'El número de papers', 'El tamaño del vocabulario'], a: 1, why: 'De segundos a horas en cuatro años; jornadas completas en el horizonte.' },
          { q: 'El umbral que marcaría la mayor aceleración (y el nivel ASL-4) es…', o: ['modelos con 10 billones de parámetros', 'que los modelos automaticen la investigación y el desarrollo de IA', 'la traducción perfecta', 'la generación de vídeo'], a: 1, why: 'Premisa de "AI 2027" y umbral revisado en la RSP v3.4.' },
          { q: 'Todos los líderes del sector coinciden en que la AGI llegará antes de 2030.', type: 'tf', a: false, why: 'LeCun habla de décadas y niega que los LLM lleven allí. Hassabis dice ~2030 con una definición exigente. Amodei y Altman son más cercanos.' },
          { q: 'Para formarte una opinión propia conviene separar…', type: 'multi', o: ['Tendencias medidas', 'Predicciones de ensayos', 'Marketing de anuncios', 'Colores de las gráficas'], a: [0, 1, 2], why: 'Y preguntar qué gana quien predice; y mirar lo que hacen (gasto en cómputo), no solo lo que dicen.' },
          { q: 'En todos los escenarios de 2026-2030, la ventaja que la IA no sustituye es…', o: ['saber programar', 'datos propios, relación con el cliente y criterio de negocio', 'tener muchas GPU', 'seguir a influencers'], a: 1, why: 'El perfil que multiplica su alcance: entiende la tecnología y sabe qué quiere.' }
        ],
        cards: [
          ['Tendencias de alta confianza 2026-2030', 'Agentes de horas a jornadas (×2 cada 7 meses), código escrito por agentes, razonamiento 10× más barato cada 2 años, multimodal y robots, ciencia acelerada, energía como límite.'],
          ['Predicciones de los líderes', 'Amodei: IA poderosa 2026-27, mitad de empleos junior en 5 años. Altman: agentes 2025 → descubrimientos 2026 → robots 2027. Hassabis: AGI ~2030. LeCun: décadas, no con LLM.'],
          ['Las cinco grandes incertidumbres', 'Automatización de la I+D de IA, sostenibilidad financiera (burbuja), regulación tras un incidente, Taiwán, y si la desalineación de laboratorio aparece en despliegues reales.'],
          ['Cómo formar opinión propia sobre IA', 'Separar tendencias medidas, predicciones y marketing; preguntar qué gana quien predice; mirar lo que hacen (gasto) no lo que dicen; escribir y revisar tu predicción anual.']
        ],
        resources: [
          { type: 'article', t: 'METR: Measuring AI ability to complete long tasks', u: 'https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/', lang: 'EN', note: 'La medición de "duplicación cada 7 meses". Actualizada periódicamente.' },
          { type: 'article', t: 'AI 2027 (Kokotajlo, Alexander, Larsen, Lifland, Dean)', u: 'https://ai-2027.com/', lang: 'EN', note: 'El escenario detallado y polémico. Léelo como ejercicio, no como profecía.' },
          { type: 'article', t: 'Dario Amodei: Machines of Loving Grace', u: 'https://darioamodei.com/machines-of-loving-grace', lang: 'EN' },
          { type: 'article', t: 'Sam Altman: The Gentle Singularity', u: 'https://blog.samaltman.com/the-gentle-singularity', lang: 'EN' },
          { type: 'article', t: 'Epoch AI: tendencias de cómputo y predicciones', u: 'https://epoch.ai/trends', lang: 'EN' }
        ]
      }
    ]
  };
})();
