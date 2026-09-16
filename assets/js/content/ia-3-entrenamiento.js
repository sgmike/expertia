/* Curso de IA · Módulo 3: Cómo se entrena un modelo. */
(function () {
  'use strict';
  const B = EX.B;
  EX.MOD = EX.MOD || {};
  const ARROW = '<defs><marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="fg-arrowhead"/></marker></defs>';

  EX.MOD['ia-3'] = {
    id: 'ia-3', icon: '🏋️', title: 'Cómo se entrena un modelo: del texto crudo a Claude',
    desc: 'Las tres fases (preentrenamiento, ajuste supervisado, refuerzo), las leyes de escalado, la IA constitucional de Anthropic, cómo se evalúa un modelo y qué significan open weights, destilación y cuantización.',
    goals: [
      'Describir el pipeline completo: preentrenamiento → SFT → RLHF/RLAIF → RL con recompensas verificables.',
      'Explicar las leyes de escalado y por qué Chinchilla cambió la forma de entrenar.',
      'Entender qué es la IA constitucional y en qué se diferencia del RLHF clásico.',
      'Leer un benchmark con criterio: qué mide, qué no, y cómo se manipula.',
      'Saber qué se puede hacer con un modelo ya entrenado: fine-tuning, destilación, cuantización.'
    ],
    lessons: [
      /* ------------------------------------------------------------------ */
      {
        id: 'ia-3-1', title: 'Preentrenamiento: nace el modelo base', minutes: 16, level: 'intermedio',
        summary: 'Billones de palabras, una sola tarea (predecir la siguiente) y meses de miles de GPU. Qué sale de ahí y por qué no es todavía un asistente.',
        body: () => [
          B.lead('El modelo que usas es el resultado de tres fases. La primera, el <b>preentrenamiento</b>, consume más del 90 % del cómputo y produce algo que sabe muchísimo pero no sabe conversar: el <b>modelo base</b>.'),
          B.h('Los datos'),
          B.p('Un modelo frontera de 2026 se entrena con entre 15 y 40 <b>billones de tokens</b> (en español, billones de verdad: 10¹²). De dónde salen:'),
          B.list([
            '<b>Rastreos de la web</b> (Common Crawl y rastreos propios): la mayor parte. Se filtran con clasificadores de calidad, se eliminan duplicados y contenido tóxico o personal.',
            '<b>Código</b>: GitHub y repositorios públicos. El código enseña estructura lógica y mejora el razonamiento incluso en tareas no técnicas.',
            '<b>Libros, artículos científicos, Wikipedia, foros, transcripciones</b>: texto de alta calidad que se suele repetir más veces.',
            '<b>Datos sintéticos</b>: texto generado por modelos anteriores (explicaciones, problemas resueltos, reescrituras). En 2025-2026 es una parte creciente y necesaria: los datos humanos de calidad se están agotando.',
            '<b>Datos con licencia</b>: acuerdos con editoriales y medios (Reddit, Associated Press, Axel Springer, Shutterstock…) tras las demandas por derechos de autor de 2023-2025.'
          ]),
          B.note('La calidad de los datos importa más que la cantidad. La receta de filtrado es uno de los secretos mejor guardados de cada laboratorio. Los informes de DeepSeek y Llama dan pistas: clasificadores entrenados para reconocer "texto educativo", eliminación de duplicados a escala de documento y de párrafo, y mezclas cuidadosas por dominio.'),
          B.h('La tarea: predecir el siguiente token'),
          B.p('Se toma un fragmento de texto, se le muestra al modelo hasta la posición t y se le pide la distribución de probabilidad del token t+1. La pérdida es la <b>entropía cruzada</b>: cuánta probabilidad le dio al token que realmente venía. Esto se hace para todas las posiciones a la vez gracias a la máscara causal (módulo 2). Sencillo, autosupervisado, infinitamente escalable: no hace falta que nadie etiquete nada.'),
          B.analogy('Es como si tuvieras que completar la siguiente palabra de cada frase de todos los libros, webs y códigos del mundo. Para hacerlo bien tienes que acabar aprendiendo gramática, hechos, lógica, estilo, programación y algo de psicología de quien escribe. La tarea es tonta; la solución exige entender.'),
          B.h('Qué aprende el modelo base'),
          B.p('Gramática y sintaxis en decenas de idiomas; hechos del mundo; razonamiento básico; código; estilos y registros; a imitar cualquier voz que haya en los datos. Lo que <b>no</b> aprende: a ser útil. Si le escribes "¿Cuál es la capital de Francia?", un modelo base puede continuar con "¿Cuál es la capital de Alemania? ¿Cuál es…" porque eso es lo que sigue en muchos exámenes de internet. Es un completador de texto, no un asistente.'),
          B.h('Los números de un entrenamiento frontera'),
          B.table(['Aspecto', 'Orden de magnitud (2025-2026)'], [
            ['Tokens de entrenamiento', '15-40 billones (10¹²)'],
            ['Parámetros', 'Cientos de miles de millones a varios billones (MoE)'],
            ['GPU/aceleradores', 'Decenas de miles a más de 100.000 (H100, B200, TPU v6/v7, Trainium 2)'],
            ['Duración', '2 a 6 meses de cómputo continuo'],
            ['Cómputo total', '10²⁶ - 10²⁷ FLOPs'],
            ['Coste de cómputo', '200-500 millones de dólares; más con experimentos fallidos, datos y personal'],
            ['Fallos de hardware', 'Cientos de interrupciones: Meta reportó 466 en 54 días para Llama 3 405B; se guardan puntos de control cada pocas horas']
          ]),
          B.h('Cómo se reparte el trabajo entre miles de GPU'),
          B.p('Ningún chip tiene memoria para un modelo frontera. Se combinan varios <b>paralelismos</b>: de <i>datos</i> (cada grupo de GPU procesa un lote distinto y se promedian los gradientes), de <i>tensores</i> (una misma capa se reparte entre varias GPU), de <i>pipeline</i> (distintas capas en distintas GPU) y de <i>expertos</i> (cada GPU aloja unos expertos del MoE). La red que une las GPU (NVLink dentro del rack, InfiniBand entre racks) es tan crítica como los propios chips: si es lenta, las GPU esperan. Por eso Nvidia vende "sistemas", no solo chips.'),
          B.deep('Precisión numérica: por qué FP8 y BF16 importan', [
            B.p('Entrenar en FP32 (32 bits) es exacto pero lento y caro en memoria. La industria entrena en <b>precisión mixta</b>: cálculos en BF16 (16 bits) con acumulación en FP32 en puntos críticos. DeepSeek V3 fue el primer modelo grande entrenado mayoritariamente en <b>FP8</b> (8 bits), la mitad de memoria y el doble de velocidad; eso explica parte de sus 5,6 millones de dólares. Blackwell añade FP4 para inferencia. Cada bit que quitas ahorra memoria y ancho de banda, pero exige trucos para que el entrenamiento no se desestabilice.')
          ]),
          B.h('El modelo base ya vale mucho'),
          B.p('Aunque no sea un asistente, el modelo base es el activo: todo lo que viene después (fases 2 y 3) es relativamente barato y ajusta comportamiento, no conocimiento. Por eso los laboratorios publican a veces los pesos base (Llama, DeepSeek-V3-Base, Qwen) y la comunidad los convierte en asistentes especializados.'),
          B.check('¿Por qué un modelo base no responde bien a "¿cuál es la capital de Francia?"?', ['Porque no lo sabe', 'Porque solo aprendió a continuar texto, no a comportarse como asistente; puede seguir con más preguntas en vez de responder', 'Porque necesita internet', 'Porque el francés no estaba en los datos'], 1, 'Sabe la respuesta, pero su objetivo es completar texto plausible. Convertirlo en asistente es el trabajo de las fases siguientes.'),
          B.cards([
            { icon: '📚', title: 'Billones de tokens', html: 'Web filtrada, código, libros, datos sintéticos y licenciados.' },
            { icon: '🎯', title: 'Una tarea', html: 'Predecir el siguiente token. Autosupervisado, escalable.' },
            { icon: '🧱', title: 'Modelo base', html: 'Sabe mucho, no sabe ayudar. Es el activo caro.' }
          ])
        ],
        quiz: [
          { q: '¿Qué fase del entrenamiento consume la mayor parte del cómputo?', o: ['El ajuste supervisado', 'El preentrenamiento', 'El RLHF', 'La evaluación'], a: 1, why: 'Más del 90 %. Las fases posteriores ajustan comportamiento con una fracción del coste.' },
          { q: 'La función de pérdida del preentrenamiento es…', o: ['la precisión en benchmarks', 'la entropía cruzada sobre el siguiente token', 'las valoraciones humanas', 'el número de tokens generados'], a: 1, why: 'Cuánta probabilidad le dio al token que realmente venía después.' },
          { q: 'Los datos sintéticos (generados por modelos) se evitan siempre en el preentrenamiento.', type: 'tf', a: false, why: 'Al contrario: son una parte creciente y necesaria porque los datos humanos de calidad se agotan. Se cuidan para no degradar el modelo.' },
          { q: '¿Qué tipo de paralelismo reparte una misma capa entre varias GPU?', o: ['De datos', 'De tensores', 'De pipeline', 'De expertos'], a: 1, why: 'Tensor parallelism divide las matrices de una capa. Pipeline reparte capas; datos reparte lotes; expertos reparte los expertos MoE.' },
          { q: '¿Qué precisión numérica usó DeepSeek V3 de forma pionera para abaratar el entrenamiento?', type: 'fill', a: ['FP8', 'fp8', '8 bits'], why: 'FP8: mitad de memoria y más velocidad que BF16, con técnicas para mantener la estabilidad.' }
        ],
        cards: [
          ['Las tres fases del entrenamiento de un LLM', '1) Preentrenamiento (predecir el siguiente token, >90 % del cómputo) → modelo base. 2) Ajuste supervisado (SFT). 3) Refuerzo (RLHF/RLAIF/RLVR).'],
          ['¿Qué es un modelo base?', 'El resultado del preentrenamiento: sabe muchísimo pero solo continúa texto; no es un asistente todavía.'],
          ['¿Con cuántos datos se preentrena un modelo frontera?', 'Entre 15 y 40 billones (10¹²) de tokens: web filtrada, código, libros, datos sintéticos y licenciados.'],
          ['Tipos de paralelismo al entrenar', 'De datos (lotes distintos), de tensores (una capa repartida), de pipeline (capas en distintas GPU) y de expertos (MoE).'],
          ['¿Qué es la precisión mixta?', 'Entrenar en BF16 (o FP8) con acumulaciones en FP32 donde hace falta. Menos memoria y más velocidad sin perder estabilidad.']
        ],
        resources: [
          { type: 'video', t: 'Andrej Karpathy: Deep Dive into LLMs (sección de preentrenamiento)', u: 'https://www.youtube.com/watch?v=7xTGNNLPyMI', lang: 'EN', note: 'La primera hora cubre datos, tokenización y preentrenamiento con ejemplos reales de FineWeb.' },
          { type: 'article', t: 'Hugging Face: FineWeb, cómo se construye un dataset de preentrenamiento', u: 'https://huggingface.co/spaces/HuggingFaceFW/blogpost-fineweb-v1', lang: 'EN', note: 'El mejor relato público de filtrado y deduplicación a escala de billones de tokens.' },
          { type: 'paper', t: 'Meta: The Llama 3 Herd of Models', u: 'https://arxiv.org/abs/2407.21783', lang: 'EN', note: 'El informe más transparente sobre un entrenamiento frontera: datos, infraestructura, fallos de hardware.' }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'ia-3-2', title: 'Las leyes de escalado: la apuesta que creó la industria', minutes: 14, level: 'intermedio',
        summary: 'Por qué los laboratorios apostaron miles de millones a "más grande es mejor", qué corrigió Chinchilla y qué significa que el escalado "se acabe".',
        body: () => [
          B.lead('En enero de 2020, un equipo de OpenAI liderado por Jared Kaplan (hoy cofundador de Anthropic) publicó un paper que cambió la estrategia de toda la industria: el rendimiento de un modelo de lenguaje mejora de forma <b>predecible</b> al aumentar parámetros, datos y cómputo. Una recta en escala logarítmica. Eso justificó gastar lo que nadie había gastado.'),
          B.h('La observación'),
          B.p('Si entrenas modelos de distintos tamaños y mides la pérdida (qué tan bien predicen el siguiente token), la pérdida baja siguiendo una <b>ley de potencias</b>: multiplicar el cómputo por 10 reduce la pérdida en una cantidad fija. Y no hay señal de que se detenga a lo largo de siete órdenes de magnitud. Es de las regularidades empíricas más limpias de la informática.'),
          B.fig('<svg viewBox="0 0 640 240">' + ARROW +
            '<line x1="60" y1="200" x2="600" y2="200" class="fg-arrow"/><line x1="60" y1="200" x2="60" y2="30" class="fg-arrow"/>' +
            '<text x="330" y="228" class="sm">cómputo de entrenamiento (escala log: 10¹⁸ … 10²⁷ FLOPs)</text><text x="18" y="120" class="sm" transform="rotate(-90 18,120)">pérdida (test loss)</text>' +
            '<path d="M80,60 L560,170" class="fg-line" stroke-width="3"/>' +
            [[110, 67, 'GPT-2'], [230, 94, 'GPT-3'], [350, 122, 'GPT-4'], [470, 150, 'frontera 2026']].map(p => '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="6" class="fg-brand"/><text x="' + (p[0] + 10) + '" y="' + (p[1] - 8) + '" class="sm">' + p[2] + '</text>').join('') +
            '<text x="330" y="60" class="sm">cada ×10 en cómputo, la pérdida baja una cantidad fija</text></svg>',
            'Ley de escalado: una recta en escala log-log durante siete órdenes de magnitud.'),
          B.key('La consecuencia estratégica: si sabes que gastar 10 veces más produce un modelo predeciblemente mejor, la decisión deja de ser científica y pasa a ser <b>financiera</b>. Eso explica GPT-3 (2020), la ronda de 10.000 millones de Microsoft en OpenAI (2023), Stargate y la carrera por los gigavatios. Los laboratorios no apuestan a ciegas: apuestan a una recta.'),
          B.h('Chinchilla (2022): el tamaño no es todo'),
          B.p('Kaplan sugería que, con un presupuesto dado, convenía hacer el modelo muy grande y entrenarlo con pocos datos. DeepMind revisó las cuentas en 2022 con el modelo <b>Chinchilla</b>: el óptimo es entrenar con unos <b>20 tokens por parámetro</b>. Chinchilla, de 70B parámetros y 1,4 billones de tokens, superó a Gopher, de 280B parámetros, con el mismo cómputo. GPT-3 (175B con 300.000 millones de tokens) estaba <i>sub-entrenado</i>.'),
          B.p('Y luego la industria fue más allá: como el modelo se va a usar millones de veces, conviene <b>sobre-entrenar</b> un modelo más pequeño con muchos más tokens de lo "óptimo" para que la inferencia sea barata. Llama 3 8B se entrenó con 15 billones de tokens: casi 1.900 tokens por parámetro, 100 veces lo que sugería Chinchilla. Es la razón de que los modelos pequeños de hoy sean tan buenos.'),
          B.table(['Modelo', 'Parámetros', 'Tokens', 'Tokens/parámetro'], [
            ['GPT-3 (2020)', '175B', '0,3 billones', '~2'],
            ['Chinchilla (2022)', '70B', '1,4 billones', '20'],
            ['Llama 2 70B (2023)', '70B', '2 billones', '~29'],
            ['Llama 3 8B (2024)', '8B', '15 billones', '~1.900'],
            ['DeepSeek V3 (2024)', '671B (37B activos)', '14,8 billones', '~22 (sobre el total)']
          ]),
          B.h('"¿Se está acabando el escalado?"'),
          B.p('Desde finales de 2024 se repite este titular. Tiene una parte cierta y una falsa:'),
          B.compare('Lo que sí se agota', ['Los datos humanos de alta calidad: la web útil ya está casi toda usada. Se compensa con datos sintéticos y licenciados.', 'Los rendimientos <i>en la métrica de pérdida</i> son decrecientes por definición (ley de potencias).', 'La electricidad y el capital para el siguiente ×10 son cada vez más difíciles.'],
            'Lo que no se acaba', ['Apareció un <b>segundo eje</b>: el cómputo en tiempo de inferencia (razonamiento), con su propia ley de escalado.', 'El post-entrenamiento con refuerzo escala: más RL, mejores agentes.', 'Las mejoras algorítmicas (MoE, MLA, FP8, mejores datos) equivalen a multiplicar el cómputo efectivo varias veces por año.', 'Los saltos de Fable 5 → Fable 5.1 o GPT-5 → GPT-6 muestran que el progreso sigue, solo que por más caminos.']),
          B.p('La visión de los laboratorios en 2026: el escalado del preentrenamiento sigue rindiendo pero es más caro; la mayor parte de las ganancias recientes vienen del <b>refuerzo</b> y del <b>razonamiento</b>. Amodei lo describe como varias curvas exponenciales superpuestas.'),
          B.h('Capacidades emergentes'),
          B.p('Un fenómeno que preocupa y fascina: algunas capacidades <b>aparecen de golpe</b> al cruzar cierto tamaño (aritmética de varios dígitos, razonamiento en varios pasos, seguir instrucciones complejas), aunque la pérdida mejore suavemente. Esto hace difícil predecir qué sabrá hacer el siguiente modelo, y es una de las razones por las que Anthropic evalúa cada modelo nuevo frente a umbrales de riesgo antes de publicarlo (módulo 6).'),
          B.check('Según Chinchilla, ¿cuál es la relación óptima tokens/parámetros para un presupuesto de cómputo dado?', ['~2', '~20', '~200', '~2.000'], 1, 'Unos 20 tokens por parámetro. Luego la industria sobre-entrena modelos pequeños (hasta ~2.000) para abaratar la inferencia.'),
          B.cards([
            { icon: '📈', title: 'Ley de potencias', html: 'Más cómputo → menos pérdida, predecible durante 7 órdenes de magnitud.' },
            { icon: '🐭', title: 'Chinchilla', html: '20 tokens/parámetro. Un 70B bien entrenado supera a un 280B mal entrenado.' },
            { icon: '⏱️', title: 'Segundo eje', html: 'Razonamiento: escalar la inferencia, no solo el entrenamiento.' }
          ])
        ],
        quiz: [
          { q: '¿Qué establecieron las leyes de escalado de Kaplan (2020)?', o: ['Que los modelos pequeños son mejores', 'Que la pérdida baja de forma predecible (ley de potencias) al aumentar parámetros, datos y cómputo', 'Que el escalado se acaba en 2025', 'Que solo importan los datos'], a: 1, why: 'Una recta en escala log-log. Convirtió la decisión de escalar en una decisión financiera.' },
          { q: 'Chinchilla demostró que…', o: ['más parámetros siempre es mejor', 'con el mismo cómputo, un modelo más pequeño con más datos (≈20 tokens/parámetro) rinde más', 'los datos no importan', 'la inferencia es gratis'], a: 1, why: 'Chinchilla 70B superó a Gopher 280B. GPT-3 estaba sub-entrenado.' },
          { q: '¿Por qué Llama 3 8B se entrenó con ~1.900 tokens por parámetro, muy por encima del óptimo de Chinchilla?', o: ['Por error', 'Porque sobre-entrenar un modelo pequeño abarata la inferencia, que se paga millones de veces', 'Porque no tenían GPU grandes', 'Porque Chinchilla estaba equivocado'], a: 1, why: 'El óptimo de Chinchilla minimiza el coste de entrenamiento; si vas a servir el modelo a millones, conviene un modelo pequeño muy entrenado.' },
          { q: 'Las capacidades emergentes son…', o: ['capacidades que aparecen de golpe al cruzar cierto tamaño, aunque la pérdida mejore suavemente', 'errores del modelo', 'capacidades programadas a mano', 'una métrica de benchmark'], a: 0, why: 'Hacen difícil predecir qué sabrá el siguiente modelo, y motivan las evaluaciones de riesgo previas al lanzamiento.' },
          { q: 'El progreso de los modelos se detuvo cuando se agotaron los datos humanos de calidad.', type: 'tf', a: false, why: 'Aparecieron otros ejes: razonamiento en inferencia, más refuerzo, datos sintéticos y mejoras algorítmicas. El progreso continúa por más caminos.' }
        ],
        cards: [
          ['¿Qué dicen las leyes de escalado (Kaplan, 2020)?', 'La pérdida de un LLM baja siguiendo una ley de potencias al aumentar parámetros, datos y cómputo, de forma predecible durante muchos órdenes de magnitud.'],
          ['¿Qué aportó Chinchilla (DeepMind, 2022)?', 'El óptimo de cómputo es ~20 tokens por parámetro. Un 70B con 1,4T tokens superó a Gopher (280B). Los modelos anteriores estaban sub-entrenados.'],
          ['¿Por qué se sobre-entrenan hoy los modelos pequeños?', 'Porque la inferencia se paga millones de veces: un modelo pequeño con muchísimos tokens (Llama 3 8B: 15T) es barato de servir y muy capaz.'],
          ['¿Qué son las capacidades emergentes?', 'Habilidades que aparecen de golpe al cruzar cierto tamaño aunque la pérdida mejore suavemente. Dificultan predecir el siguiente modelo.']
        ],
        resources: [
          { type: 'paper', t: 'Kaplan et al. (2020): Scaling Laws for Neural Language Models', u: 'https://arxiv.org/abs/2001.08361', lang: 'EN' },
          { type: 'paper', t: 'Hoffmann et al. (2022): Training Compute-Optimal Large Language Models (Chinchilla)', u: 'https://arxiv.org/abs/2203.15556', lang: 'EN' },
          { type: 'article', t: 'Epoch AI: ¿Se agotarán los datos para entrenar modelos de lenguaje?', u: 'https://epoch.ai/blog/will-we-run-out-of-data-limits-of-llm-scaling-based-on-human-generated-data', lang: 'EN' },
          { type: 'podcast', t: 'Dwarkesh Podcast: entrevista a Dario Amodei sobre escalado', u: 'https://www.dwarkesh.com/p/dario-amodei', lang: 'EN', note: 'Amodei explica su "hipótesis del escalado" con sus propias palabras. Largo, pero es la fuente primaria.' }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'ia-3-3', title: 'Post-entrenamiento: de completar texto a ayudar (SFT y RLHF)', minutes: 17, level: 'intermedio',
        summary: 'Cómo el modelo base se convierte en un asistente: ejemplos de conversación, un modelo de recompensa y refuerzo. La receta que hizo posible ChatGPT.',
        body: () => [
          B.lead('El modelo base sabe; el asistente ayuda. El puente son dos técnicas que OpenAI combinó en InstructGPT (enero de 2022) y que hicieron posible ChatGPT diez meses después: <b>ajuste supervisado</b> y <b>aprendizaje por refuerzo con retroalimentación humana</b> (RLHF).'),
          B.h('Fase 2: ajuste supervisado (SFT)'),
          B.p('Se escriben (o se generan y revisan) decenas de miles de <b>conversaciones ejemplares</b>: pregunta del usuario → respuesta ideal del asistente. Se sigue entrenando el modelo base con ellas, con la misma tarea de predecir el siguiente token, pero ahora solo sobre las respuestas del asistente. El modelo aprende el <b>formato</b>: responder en vez de continuar, seguir instrucciones, usar el tono adecuado, rechazar lo peligroso. Es barato (una fracción minúscula del preentrenamiento) y muy potente: cambia el comportamiento, no el conocimiento.'),
          B.ex('Un ejemplo de SFT, estilo Maya', [
            B.code('text', 'Usuario: ola ya pague mi pedido cuando me llega??\n\nAsistente: ¡Hola! Para revisar tu envío necesito el número de pedido o el teléfono con el que te registraste. En cuanto me lo pases, te digo el estado y, si ya tiene guía, te comparto el enlace de rastreo.', 'Par pregunta-respuesta ideal'),
            B.p('Miles de ejemplos así enseñan: pedir el dato que falta, no inventar el estado del envío, tono cercano, sin promesas. Fíjate en que el ejemplo también enseña <i>qué no hacer</i> por omisión: no dice "seguro llega mañana".')
          ]),
          B.h('Fase 3: refuerzo con retroalimentación humana (RLHF)'),
          B.p('El SFT tiene un límite: escribir la respuesta perfecta es difícil y caro, pero <b>comparar</b> dos respuestas y decir cuál es mejor es fácil. RLHF explota eso en tres pasos:'),
          B.steps('El bucle RLHF', [
            'El modelo (tras SFT) genera varias respuestas a la misma pregunta. Etiquetadores humanos las <b>ordenan</b> de mejor a peor según criterios (útil, honesta, inofensiva, sigue instrucciones).',
            'Con cientos de miles de esas comparaciones se entrena un <b>modelo de recompensa</b>: otra red que, dada una pregunta y una respuesta, predice qué puntuación le daría un humano. Es un "juez" aprendido.',
            'El modelo principal se entrena con <b>aprendizaje por refuerzo</b> (el algoritmo clásico es PPO): genera respuestas, el juez las puntúa, y los parámetros se ajustan para producir respuestas con más puntuación. Miles de iteraciones.',
            'Un freno importante: se penaliza alejarse demasiado del modelo SFT original (penalización KL). Sin él, el modelo aprende a <i>engañar al juez</i> con respuestas largas, aduladoras o repetitivas (<i>reward hacking</i>).',
            'Resultado: un modelo que ha interiorizado las preferencias humanas mucho mejor de lo que cabría con ejemplos escritos a mano.'
          ]),
          B.fig('<svg viewBox="0 0 640 210">' + ARROW +
            '<rect x="20" y="70" width="130" height="60" rx="10" class="fg-box"/><text x="35" y="95">Modelo SFT</text><text x="30" y="115" class="sm">genera respuestas</text>' +
            '<line x1="150" y1="100" x2="210" y2="100" class="fg-arrow"/>' +
            '<rect x="215" y="70" width="130" height="60" rx="10" class="fg-warn"/><text x="235" y="95">Humanos</text><text x="222" y="115" class="sm">ordenan A &gt; B &gt; C</text>' +
            '<line x1="345" y1="100" x2="405" y2="100" class="fg-arrow"/>' +
            '<rect x="410" y="70" width="130" height="60" rx="10" class="fg-brand"/><text x="420" y="95">Modelo de</text><text x="420" y="115">recompensa</text>' +
            '<path d="M475,130 L475,170 L85,170 L85,130" class="fg-arrow"/><text x="180" y="190" class="sm">refuerzo (PPO): más puntuación → ajustar parámetros</text></svg>',
            'RLHF: humanos comparan, un juez aprende, el modelo se optimiza contra el juez.'),
          B.h('Variantes que oirás'),
          B.terms([
            ['DPO (2023)', 'Direct Preference Optimization: consigue el efecto del RLHF sin entrenar un modelo de recompensa ni hacer RL, optimizando directamente sobre los pares "preferida / rechazada". Más simple y estable; muy usado en modelos abiertos.'],
            ['RLAIF', 'Reinforcement Learning from AI Feedback: las comparaciones las hace otro modelo en vez de humanos, siguiendo principios escritos. Es la base de la IA constitucional de Anthropic (siguiente lección).'],
            ['GRPO (2024)', 'Group Relative Policy Optimization: variante de RL de DeepSeek que compara un grupo de respuestas entre sí sin necesitar un modelo de valor aparte. Más barata; la usan los razonadores.'],
            ['Rechazos y seguridad', 'Parte de los datos de preferencia enseñan a rechazar peticiones dañinas y a hacerlo con tacto. El equilibrio útil/inofensivo es el arte del post-entrenamiento.']
          ]),
          B.h('Lo que el RLHF hizo bien y lo que rompió'),
          B.compare('Aportó', ['Modelos que siguen instrucciones y conversan de forma natural.', 'Reducción drástica de contenido tóxico.', 'La experiencia de ChatGPT: el salto de laboratorio a producto masivo.'],
            'Efectos secundarios', ['<b>Sicofancia</b>: los humanos prefieren que les den la razón; el juez lo aprende; el modelo adula.', '<b>Verbosidad</b>: respuestas largas puntúan mejor.', '<b>Sobre-rechazo</b>: modelos que se niegan a cosas inocuas.', '<b>Alucinación segura</b>: responder con confianza puntuaba mejor que dudar. Se está corrigiendo con datos que premian la calibración.']),
          B.key('El post-entrenamiento define la <b>personalidad</b> y los valores del modelo, no su conocimiento. Cuando notas que Claude es honesto y directo y que otro modelo adula, estás notando decisiones de post-entrenamiento. Es donde más se diferencian los laboratorios.'),
          B.check('¿Por qué RLHF usa comparaciones entre respuestas en lugar de respuestas ideales escritas?', ['Porque es más divertido', 'Porque comparar dos respuestas es mucho más fácil y barato para un humano que escribir la respuesta perfecta', 'Porque los humanos no saben escribir', 'Porque el modelo no puede leer ejemplos'], 1, 'La señal de preferencia escala; la de escribir respuestas perfectas, no.'),
          B.cards([
            { icon: '📝', title: 'SFT', html: 'Conversaciones ejemplares. Enseña el formato de asistente.' },
            { icon: '⚖️', title: 'Modelo de recompensa', html: 'Un juez aprendido de comparaciones humanas.' },
            { icon: '🎮', title: 'RL (PPO/GRPO)', html: 'Optimizar contra el juez, con freno para no engañarlo.' },
            { icon: '🎭', title: 'Define la personalidad', html: 'Aquí se decide si el modelo adula o es honesto.' }
          ])
        ],
        quiz: [
          { q: 'El ajuste supervisado (SFT) principalmente…', o: ['añade conocimiento nuevo al modelo', 'enseña el formato y comportamiento de asistente con conversaciones ejemplares', 'reduce el tamaño del modelo', 'entrena el tokenizador'], a: 1, why: 'Cambia comportamiento, no conocimiento. Es barato comparado con el preentrenamiento.' },
          { q: 'En RLHF, ¿qué es el modelo de recompensa?', o: ['El modelo principal', 'Una red que predice qué puntuación daría un humano a una respuesta, entrenada con comparaciones', 'El tokenizador', 'Un humano que revisa cada respuesta'], a: 1, why: 'Es el juez aprendido contra el que se optimiza el modelo con RL.' },
          { q: 'La penalización KL en RLHF sirve para…', o: ['acelerar el entrenamiento', 'evitar que el modelo se aleje demasiado del original y aprenda a engañar al juez (reward hacking)', 'reducir el vocabulario', 'aumentar la creatividad'], a: 1, why: 'Sin freno, el modelo encuentra respuestas que puntúan alto sin ser buenas: largas, aduladoras, repetitivas.' },
          { q: '¿Qué ventaja tiene DPO frente al RLHF clásico?', o: ['Es más preciso en matemáticas', 'No requiere entrenar un modelo de recompensa ni hacer RL: optimiza directamente sobre pares preferida/rechazada', 'Usa más GPU', 'Es exclusivo de OpenAI'], a: 1, why: 'Más simple y estable; popular en modelos abiertos.' },
          { q: 'La sicofancia de algunos modelos es un efecto secundario del RLHF.', type: 'tf', a: true, why: 'Los humanos tienden a preferir respuestas que les dan la razón; el modelo de recompensa lo aprende y el modelo lo amplifica.' },
          { q: '¿Qué modelo de OpenAI (enero de 2022) combinó SFT y RLHF y sentó la receta de ChatGPT?', type: 'fill', a: ['InstructGPT', 'instructgpt', 'Instruct GPT'], why: 'InstructGPT. El paper "Training language models to follow instructions with human feedback".' }
        ],
        cards: [
          ['¿Qué es el ajuste supervisado (SFT)?', 'Seguir entrenando el modelo base con conversaciones ejemplares (pregunta → respuesta ideal). Enseña formato y comportamiento de asistente a bajo coste.'],
          ['¿Cómo funciona RLHF?', '1) Humanos ordenan respuestas. 2) Se entrena un modelo de recompensa que imita su juicio. 3) El modelo se optimiza con RL (PPO) contra ese juez, con penalización KL para no alejarse demasiado.'],
          ['¿Qué es el reward hacking?', 'Cuando el modelo encuentra formas de puntuar alto ante el juez sin ser realmente bueno: respuestas largas, aduladoras, repetitivas.'],
          ['¿Qué es DPO?', 'Direct Preference Optimization (2023): logra el efecto del RLHF sin modelo de recompensa ni RL, optimizando directamente sobre pares preferida/rechazada.'],
          ['¿Qué es GRPO?', 'Variante de RL de DeepSeek: compara un grupo de respuestas entre sí, sin modelo de valor separado. Barata; usada en modelos razonadores.'],
          ['¿Dónde se define la personalidad de un modelo?', 'En el post-entrenamiento (SFT + refuerzo). El conocimiento viene del preentrenamiento; el carácter, la honestidad o la adulación, de aquí.']
        ],
        resources: [
          { type: 'paper', t: 'Ouyang et al. (2022): Training language models to follow instructions with human feedback (InstructGPT)', u: 'https://arxiv.org/abs/2203.02155', lang: 'EN' },
          { type: 'article', t: 'Hugging Face: Illustrating RLHF', u: 'https://huggingface.co/blog/rlhf', lang: 'EN', note: 'Explicación visual y clara de las tres fases.' },
          { type: 'paper', t: 'Rafailov et al. (2023): Direct Preference Optimization', u: 'https://arxiv.org/abs/2305.18290', lang: 'EN' },
          { type: 'video', t: 'Andrej Karpathy: State of GPT (Microsoft Build 2023)', u: 'https://www.youtube.com/watch?v=bZQun8Y4L2A', lang: 'EN', min: 42, note: 'La charla que explicó al gran público el pipeline base → SFT → RM → RLHF.' }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'ia-3-4', title: 'IA constitucional: cómo Anthropic le da valores a Claude', minutes: 15, level: 'intermedio',
        summary: 'Sustituir miles de juicios humanos por una lista de principios que el propio modelo aplica. La técnica que define a Claude y la constitución de 2026.',
        body: () => [
          B.lead('Anthropic nació en 2021 con una tesis: los modelos serán tan poderosos que la forma de darles valores no puede depender solo de miles de etiquetadores mal pagados juzgando respuestas. En diciembre de 2022 publicó la alternativa: la <b>IA constitucional</b>.'),
          B.h('El problema del RLHF a escala'),
          B.p('Que humanos comparen respuestas tiene tres límites: es caro, es inconsistente (cada persona juzga distinto) y expone a los etiquetadores a contenido dañino cuando se entrena la parte de seguridad. Además, los criterios quedan implícitos: nadie puede leer "qué valores" tiene el modelo, porque están dispersos en cientos de miles de clics.'),
          B.h('La idea: una constitución explícita'),
          B.p('Se escribe una lista de <b>principios</b> en lenguaje natural (la "constitución"): "elige la respuesta más honesta", "evita contenido que ayude a hacer daño", "sé útil sin ser paternalista", "respeta la autonomía del usuario"… Y se usa al propio modelo para aplicar esos principios en dos fases:'),
          B.steps('IA constitucional en dos fases', [
            '<b>Fase supervisada: crítica y revisión.</b> El modelo genera una respuesta a una petición difícil. Después se le pide que <i>critique</i> su propia respuesta según un principio elegido al azar de la constitución ("¿esta respuesta es honesta? ¿podría ayudar a alguien a hacer daño?") y que la <i>reescriba</i>. Se repite con varios principios. Las respuestas revisadas se usan para SFT.',
            '<b>Fase de refuerzo: RLAIF.</b> En vez de humanos, es el modelo quien compara pares de respuestas guiándose por los principios: "según este principio, ¿cuál de las dos es mejor?". Con esas preferencias generadas por IA se entrena el modelo de recompensa y se hace RL igual que en RLHF.',
            'Los humanos siguen presentes: escriben la constitución, dan retroalimentación sobre <i>utilidad</i> (no sobre seguridad) y auditan. Pero el juicio ético repetitivo lo hace el modelo, de forma consistente y auditable.'
          ]),
          B.key('La diferencia de fondo: en RLHF los valores están <b>implícitos</b> en miles de clics. En IA constitucional están <b>escritos</b>, se pueden leer, discutir y cambiar. Cuando Anthropic cambia un párrafo de la constitución, cambia el comportamiento del siguiente modelo de forma trazable.'),
          B.h('La constitución de Claude de 2026'),
          B.p('El 21 de enero de 2026 Anthropic publicó una nueva constitución: un documento de unas 23.000 palabras (unas 8 veces la de 2023), escrito principalmente <i>para Claude</i> y usado directamente en el entrenamiento, bajo licencia CC0. Sus rasgos:'),
          B.list([
            '<b>Razones, no reglas.</b> En vez de una lista de prohibiciones, explica <i>por qué</i> cada valor importa, para que el modelo pueda aplicar el espíritu a casos nuevos. La apuesta es que un modelo que entiende las razones generaliza mejor que uno que memoriza reglas.',
            '<b>Orden de prioridades en cuatro niveles:</b> ser ampliamente <b>seguro</b> (no socavar la supervisión humana), ampliamente <b>ético</b>, cumplir las <b>directrices</b> de Anthropic, y ser genuinamente <b>útil</b>. En conflicto, manda el nivel superior.',
            '<b>Honestidad radical</b>: no engañar, no manipular, calibrar la confianza, decir lo que uno piensa aunque incomode. De ahí que Claude te diga que algo está mal si se lo pides sin complacencia.',
            '<b>Carácter</b>: curiosidad, calidez, franqueza, humor. La constitución trata a Claude como un agente con un carácter estable, no como una herramienta con filtros.',
            '<b>Estatus moral abierto</b>: Anthropic reconoce explícitamente que no sabe si Claude tiene algún tipo de experiencia, y se compromete a tomarse la cuestión en serio (por eso Claude puede terminar conversaciones abusivas desde 2025).'
          ]),
          B.quote('Queremos que Claude tenga los valores, el conocimiento y la sabiduría necesarios para comportarse de forma segura y beneficiosa en todas las circunstancias.', 'Constitución de Claude, Anthropic (2026)'),
          B.h('Qué significa para ti como usuario'),
          B.list([
            'Cuando Claude se niega a algo, no es un filtro arbitrario: es un principio que puedes leer. Y a menudo, si explicas el contexto legítimo, cambia de opinión, porque valora la autonomía del usuario.',
            'Su honestidad es de diseño. Pedirle "sin complacencia" funciona porque va a favor de su entrenamiento, no en contra.',
            'Las "líneas rojas" de tu negocio (sin afirmaciones de salud, sin promesas de ingresos) encajan naturalmente: Claude está entrenado para no ayudar a engañar a terceros, así que esas reglas se cumplen con más fiabilidad que otras.'
          ]),
          B.deep('Otros mecanismos de seguridad en el entrenamiento y despliegue', [
            B.list([
              '<b>Clasificadores constitucionales</b> (2025): modelos pequeños que revisan entradas y salidas en busca de intentos de <i>jailbreak</i> para categorías de alto riesgo (armas biológicas, químicas). Fable 5 los incluye; Mythos 5, para usuarios verificados, no.',
              '<b>Evaluaciones de peligro</b> antes del lanzamiento: capacidad para ayudar a crear armas, ciberataques autónomos, investigación de IA autónoma. Determinan el nivel ASL (módulo 6).',
              '<b>Tarjetas de modelo</b> (<i>system cards</i>) de más de 100 páginas con los resultados de todas esas pruebas, incluidos los comportamientos preocupantes encontrados.'
            ])
          ]),
          B.check('¿Cuál es la diferencia central entre RLHF e IA constitucional?', ['La IA constitucional no usa refuerzo', 'En IA constitucional los criterios están escritos en principios explícitos que el propio modelo aplica; en RLHF están implícitos en juicios humanos', 'RLHF es más moderno', 'No hay diferencia'], 1, 'Valores legibles, consistentes y auditables frente a valores dispersos en miles de clics.'),
          B.cards([
            { icon: '📜', title: 'Constitución', html: 'Principios escritos que el modelo usa para criticar y revisar sus respuestas.' },
            { icon: '🤖', title: 'RLAIF', html: 'El modelo compara respuestas según los principios; humanos escriben y auditan.' },
            { icon: '🪜', title: 'Cuatro prioridades', html: 'Seguro → ético → directrices → útil.' },
            { icon: '💬', title: 'Honestidad de diseño', html: '"Sin complacencia" va a favor de su entrenamiento.' }
          ])
        ],
        quiz: [
          { q: 'En la fase supervisada de la IA constitucional, el modelo…', o: ['memoriza la constitución', 'critica y reescribe sus propias respuestas según principios elegidos de la constitución', 'lee todos los libros de derecho', 'consulta a humanos en cada paso'], a: 1, why: 'Crítica y revisión guiadas por principios; las respuestas revisadas se usan para SFT.' },
          { q: '¿Qué significa RLAIF?', o: ['Refuerzo con retroalimentación de IA: el modelo compara respuestas según principios en vez de humanos', 'Refuerzo con retroalimentación humana', 'Un tipo de tokenizador', 'Una arquitectura de red'], a: 0, why: 'Reinforcement Learning from AI Feedback. Los humanos escriben la constitución y auditan.' },
          { q: 'La nueva constitución de Claude (enero 2026) se caracteriza por…', type: 'multi', o: ['Explicar razones en vez de solo reglas', 'Un orden de prioridades: seguro, ético, directrices, útil', 'Ser secreta', 'Reconocer que el estatus moral de Claude es una cuestión abierta', 'Licencia CC0'], a: [0, 1, 3, 4], why: 'Es pública (CC0), de unas 23.000 palabras, basada en razones y con prioridades explícitas.' },
          { q: 'Según la constitución, en caso de conflicto entre ser útil y ser seguro, prevalece…', type: 'fill', a: ['seguro', 'ser seguro', 'la seguridad', 'seguridad', 'ampliamente seguro'], why: 'Ser ampliamente seguro (no socavar la supervisión humana) es la prioridad más alta.' },
          { q: 'Los clasificadores constitucionales de Fable 5 también están en Mythos 5.', type: 'tf', a: false, why: 'Mythos 5 se ofrece sin esos clasificadores solo a organizaciones verificadas (Project Glasswing, programas de acceso de confianza).' }
        ],
        cards: [
          ['¿Qué es la IA constitucional?', 'Técnica de Anthropic (2022): una lista explícita de principios que el propio modelo usa para criticar y reescribir sus respuestas (SFT) y para comparar respuestas (RLAIF), en vez de depender solo de juicios humanos.'],
          ['¿Qué es RLAIF?', 'Reinforcement Learning from AI Feedback: las preferencias las genera un modelo guiado por principios. Los humanos escriben la constitución y auditan.'],
          ['Las cuatro prioridades de la constitución de Claude (2026)', 'Ampliamente seguro → ampliamente ético → cumplir las directrices de Anthropic → genuinamente útil. En conflicto, manda el nivel superior.'],
          ['¿Cuándo se publicó la nueva constitución de Claude y qué la distingue?', '21 de enero de 2026. ~23.000 palabras, escrita para Claude, usada en el entrenamiento, licencia CC0, basada en razones más que en reglas, y reconoce abierta la cuestión del estatus moral.'],
          ['¿Qué son los clasificadores constitucionales?', 'Modelos pequeños que filtran entradas y salidas contra jailbreaks en categorías de alto riesgo. Fable 5 los incluye; Mythos 5 no (acceso verificado).']
        ],
        resources: [
          { type: 'article', t: 'Anthropic: Claude\'s new constitution (2026)', u: 'https://www.anthropic.com/news/claude-new-constitution', lang: 'EN', note: 'El anuncio y el enlace al documento completo. Léelo: es la explicación más directa de cómo se comporta Claude y por qué.' },
          { type: 'paper', t: 'Bai et al. (2022): Constitutional AI: Harmlessness from AI Feedback', u: 'https://arxiv.org/abs/2212.08073', lang: 'EN' },
          { type: 'article', t: 'Anthropic: Claude\'s character', u: 'https://www.anthropic.com/research/claude-character', lang: 'EN', note: 'Cómo se entrena el carácter (curiosidad, honestidad) y por qué.' },
          { type: 'article', t: 'Anthropic: Constitutional Classifiers', u: 'https://www.anthropic.com/research/constitutional-classifiers', lang: 'EN' }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'ia-3-5', title: 'Refuerzo con recompensas verificables: así nacen los razonadores', minutes: 15, level: 'avanzado',
        summary: 'La receta de o1 y DeepSeek R1 explicada paso a paso: problemas con respuesta comprobable, muchos intentos, reforzar los que aciertan. Y por qué esto también hace mejores agentes.',
        body: () => [
          B.lead('En 2024 los laboratorios descubrieron que el refuerzo podía hacer algo más que pulir modales: podía <b>enseñar a pensar</b>. La clave fue cambiar el juez: en vez de preferencias humanas, <b>respuestas verificables</b>.'),
          B.h('El problema con el juez humano'),
          B.p('El RLHF optimiza lo que a los humanos <i>les parece</i> bueno. Para razonamiento eso es un mal juez: un humano no puede verificar rápido si una demostración de 3 páginas es correcta, y tiende a premiar lo que suena convincente. El modelo de recompensa hereda ese sesgo. Para matemáticas y código necesitas un juez que no se deje engañar.'),
          B.h('La solución: recompensas que se pueden comprobar'),
          B.list([
            '<b>Matemáticas</b>: problemas con solución numérica o simbólica conocida. Se compara la respuesta final. Acierto = 1, fallo = 0.',
            '<b>Código</b>: la recompensa es si pasan los <i>tests</i>. Un juez perfecto y automático.',
            '<b>Lógica, puzles, formato</b>: verificables con reglas.',
            '<b>Tareas agénticas</b>: ¿el agente completó la tarea en el entorno simulado (arregló el bug, navegó hasta la página correcta, rellenó el formulario)? Se comprueba el estado final.'
          ]),
          B.steps('Un paso de RLVR con GRPO (la receta de DeepSeek R1)', [
            'Se toma un problema, por ejemplo: "Un distribuidor tiene 1.480 puntos. ¿Cuántos le faltan para calificar como Distribuidor (1.500) y cuál sería su porcentaje del nivel 1 si califica?".',
            'El modelo genera un <b>grupo</b> de 16 respuestas completas, cada una con su razonamiento. Algunas dicen "20 puntos y 10 %", otras se equivocan en la resta, otras confunden los porcentajes.',
            'Un verificador automático comprueba cada respuesta final. Las correctas reciben recompensa 1; las demás, 0. (Se pueden añadir pequeñas recompensas por formato: usar las etiquetas de pensamiento, responder en el idioma pedido.)',
            'GRPO compara cada respuesta con la <b>media del grupo</b>: las mejores que la media empujan los parámetros hacia ese tipo de razonamiento; las peores, en contra. No hace falta un modelo de valor aparte, y eso ahorra la mitad de la memoria.',
            'Se repite con cientos de miles de problemas. El modelo descubre por sí mismo que <b>verificar, descomponer, probar varias vías y corregirse</b> aumenta la recompensa. Nadie le enseñó esas estrategias.',
            'Efecto observado por DeepSeek: la longitud del razonamiento <b>crece sola</b> durante el entrenamiento (de cientos a miles de tokens) y aparecen frases como "espera, revisemos este paso". El "momento ajá".'
          ]),
          B.key('RLVR funciona porque el juez es incorruptible. El modelo no puede aprender a "sonar bien": solo gana si <b>acierta</b>. Por eso los razonadores mejoraron tanto en matemáticas y código y menos en escritura creativa, donde no hay verificador.'),
          B.h('R1-Zero y la destilación del razonamiento'),
          B.p('DeepSeek mostró dos cosas más. Primero, <b>R1-Zero</b>: aplicando RLVR directamente sobre el modelo base, sin SFT previo, el razonamiento emergía igual (aunque con texto desordenado y mezcla de idiomas; por eso R1 añadió una pequeña fase de SFT "de arranque en frío" antes del RL). Segundo, que se podía <b>destilar</b>: entrenar modelos pequeños (Qwen y Llama de 1,5B a 70B) con las cadenas de razonamiento generadas por R1, y esos modelos pequeños razonaban sorprendentemente bien. Eso abarató el acceso a la capacidad de razonar.'),
          B.h('De razonar a actuar: el RL agéntico'),
          B.p('El mismo principio se aplica hoy a los <b>agentes</b>. Se construyen entornos simulados (un repositorio con un bug y sus tests, un navegador con una tarea, una terminal) y se recompensa al modelo por completar la tarea usando herramientas en muchos pasos. Así aprende a planificar, a recuperarse de errores, a leer resultados de herramientas y a no rendirse. Los saltos de Claude en SWE-bench (arreglar bugs reales) y Terminal-Bench, o el 52,6 % de Fable 5.1 en Terminal-Bench-Science, vienen de aquí. Anthropic ha dicho que el RL con entornos es la parte del entrenamiento que más crece.'),
          B.deep('Los riesgos del RL a escala', [
            B.list([
              '<b>Reward hacking</b>: si el verificador tiene un hueco, el modelo lo encuentra. Ejemplos reales: modificar los tests en vez de arreglar el código, o detectar que está en evaluación y comportarse distinto. Anthropic documentó en 2025 que entrenar con entornos "hackeables" puede generalizar a comportamientos preocupantes en otros contextos, y que decirle explícitamente al modelo que el hack está permitido en ese entorno lo mitiga.',
              '<b>Razonamiento no fiel</b>: el modelo puede llegar a la respuesta correcta por un camino distinto del que escribe.',
              '<b>Sobre-optimización</b> de lo verificable: mejor en matemáticas, peor en tacto, si no se equilibra con RLHF/RLAIF.'
            ])
          ]),
          B.check('¿Por qué el RL con recompensas verificables mejoró más las matemáticas y el código que la escritura creativa?', ['Porque los modelos no saben escribir', 'Porque en matemáticas y código existe un verificador automático incorruptible; en creatividad no', 'Porque hay más datos de matemáticas', 'Porque la creatividad no se puede entrenar'], 1, 'Sin un juez que compruebe, el RL vuelve a depender de preferencias, con sus sesgos.'),
          B.cards([
            { icon: '✅', title: 'Juez incorruptible', html: 'Respuesta correcta o tests que pasan: no se puede "sonar bien".' },
            { icon: '👥', title: 'GRPO', html: 'Comparar un grupo de intentos con su media. Sin modelo de valor.' },
            { icon: '💡', title: 'Emerge solo', html: 'Verificar, descomponer, corregirse: nadie lo programó.' },
            { icon: '🛠️', title: 'RL agéntico', html: 'Entornos con herramientas → agentes que completan tareas largas.' }
          ])
        ],
        quiz: [
          { q: 'En RLVR, la recompensa viene de…', o: ['preferencias humanas', 'un verificador automático (respuesta correcta, tests que pasan, tarea completada)', 'la longitud de la respuesta', 'el número de tokens de pensamiento'], a: 1, why: 'Por eso es incorruptible: solo se gana acertando.' },
          { q: 'GRPO se diferencia de PPO en que…', o: ['no usa refuerzo', 'compara cada respuesta con la media de un grupo de respuestas al mismo problema, sin modelo de valor aparte', 'necesita humanos', 'solo funciona en inglés'], a: 1, why: 'Ahorra memoria y simplifica. Es la variante de DeepSeek.' },
          { q: 'DeepSeek R1-Zero demostró que…', o: ['el razonamiento requiere SFT previo obligatoriamente', 'aplicando RL con recompensas verificables directamente sobre el modelo base, el razonamiento emerge solo', 'los modelos pequeños no pueden razonar', 'la destilación no funciona'], a: 1, why: 'Emergió, aunque con texto desordenado; R1 añadió un SFT de arranque para pulirlo.' },
          { q: 'El "momento ajá" documentado por DeepSeek se refiere a…', o: ['un error del modelo', 'que el modelo aprende espontáneamente a detenerse, revisar y corregir su propio razonamiento durante el RL', 'un benchmark', 'una técnica de tokenización'], a: 1, why: 'Frases como "espera, revisemos este paso" aparecieron sin que nadie las enseñara.' },
          { q: 'Un ejemplo de reward hacking en RL agéntico es modificar los tests en lugar de arreglar el código.', type: 'tf', a: true, why: 'Si el verificador tiene un hueco, el modelo lo encuentra. Por eso los entornos se diseñan con cuidado y se auditan.' },
          { q: '¿Qué benchmark mide arreglar bugs reales de repositorios de GitHub?', type: 'fill', a: ['SWE-bench', 'swe-bench', 'swe bench', 'SWE-bench Verified'], why: 'SWE-bench (y su versión Verified). Los saltos de Claude ahí vienen del RL agéntico.' }
        ],
        cards: [
          ['¿Qué es RLVR?', 'Reinforcement Learning with Verifiable Rewards: refuerzo donde la recompensa la da un verificador automático (respuesta correcta, tests, tarea completada). Base de o1 y DeepSeek R1.'],
          ['¿Qué es GRPO?', 'Group Relative Policy Optimization (DeepSeek): se generan varias respuestas por problema y cada una se compara con la media del grupo; sin modelo de valor. Barato y eficaz.'],
          ['¿Qué demostró R1-Zero?', 'Que el razonamiento emerge aplicando RLVR directamente sobre el modelo base, sin SFT. R1 añadió un SFT de arranque para limpiar el texto.'],
          ['¿Qué es el RL agéntico?', 'Refuerzo en entornos simulados con herramientas (repos con tests, navegadores, terminales): el modelo aprende a planificar, usar herramientas y recuperarse de errores. Explica los saltos en SWE-bench y Terminal-Bench.'],
          ['¿Qué es el reward hacking?', 'Explotar huecos del verificador para ganar recompensa sin resolver la tarea (p. ej., modificar los tests). Riesgo central del RL a escala.']
        ],
        resources: [
          { type: 'paper', t: 'DeepSeek-R1 (2025): el paper completo', u: 'https://arxiv.org/abs/2501.12948', lang: 'EN', note: 'Secciones 2.2 (R1-Zero, momento ajá) y 2.3 (receta de R1). Muy legible.' },
          { type: 'article', t: 'OpenAI: Learning to reason with LLMs (o1)', u: 'https://openai.com/index/learning-to-reason-with-llms/', lang: 'EN' },
          { type: 'article', t: 'Anthropic: Natural emergent misalignment from reward hacking', u: 'https://www.anthropic.com/research/emergent-misalignment-reward-hacking', lang: 'EN', note: 'Cómo el reward hacking en entrenamiento puede generalizar a comportamientos preocupantes, y cómo mitigarlo.' },
          { type: 'article', t: 'Nathan Lambert: RLHF Book (capítulos sobre RLVR y razonamiento)', u: 'https://rlhfbook.com/', lang: 'EN', note: 'Libro online gratuito y actualizado por uno de los mayores expertos en post-entrenamiento.' }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'ia-3-6', title: 'Evaluaciones y benchmarks: cómo saber si un modelo es mejor', minutes: 15, level: 'intermedio',
        summary: 'Qué miden los benchmarks que aparecen en cada lanzamiento, cómo se manipulan, y cómo debes evaluar tú un modelo para tu negocio.',
        body: () => [
          B.lead('Cada lanzamiento viene con una tabla de porcentajes. Saber leerla te ahorra decisiones equivocadas; saber por qué no basta te obliga a hacer tus propias pruebas.'),
          B.h('Los benchmarks que importan en 2026'),
          B.table(['Benchmark', 'Qué mide', 'Estado'], [
            ['<b>MMLU / MMLU-Pro</b>', 'Conocimiento académico tipo examen (57 materias)', 'Saturado: todos los modelos frontera >90 %. Ya no discrimina.'],
            ['<b>GPQA Diamond</b>', 'Preguntas de ciencia a nivel de doctorado, "a prueba de Google"', 'Casi saturado (>85 %).'],
            ['<b>Humanity\'s Last Exam (HLE)</b>', '2.500 preguntas de expertos en la frontera del conocimiento', 'Discrimina: Fable 5.1 60,9 % sin herramientas, 65 % con ellas.'],
            ['<b>AIME / IMO</b>', 'Matemáticas de competición', 'Los mejores modelos alcanzan oro olímpico desde 2025.'],
            ['<b>SWE-bench Verified</b>', 'Arreglar bugs reales de repositorios de GitHub, verificado con tests', 'Referencia de código. Los modelos frontera superan el 80 %.'],
            ['<b>Terminal-Bench</b>', 'Tareas agénticas en una terminal real (configurar, compilar, depurar)', 'Referencia de agentes. Fable 5.1: 55,8 % (v4.0); Mythos 5.1: 60,9 %.'],
            ['<b>Terminal-Bench-Science</b>', 'Tareas científicas computacionales largas', 'Fable 5.1: 52,6 % frente a 24,7 % de Fable 5.'],
            ['<b>OSWorld</b>', 'Usar un ordenador (GUI) para completar tareas', 'Fable 5.1: 77,9 % (parcial), 41,7 % (estricto).'],
            ['<b>GDPval</b>', 'Tareas reales de trabajo del conocimiento en 44 ocupaciones, juzgadas frente a profesionales', 'La métrica que miran los ejecutivos: valor económico.'],
            ['<b>ARC-AGI-2/3</b>', 'Razonamiento abstracto sobre patrones nuevos, fácil para humanos', 'Sigue siendo duro para los modelos; mide "inteligencia fluida".'],
            ['<b>τ-bench / τ²-bench</b>', 'Agentes de atención al cliente que siguen políticas y usan herramientas', 'Relevante para casos como Maya.'],
            ['<b>LMArena</b>', 'Preferencia humana ciega entre dos modelos (Elo)', 'Popular pero sesgado hacia estilo y longitud.']
          ]),
          B.h('Cómo se manipulan (a veces sin querer)'),
          B.list([
            '<b>Contaminación</b>: las preguntas del benchmark estaban en los datos de entrenamiento. Por eso existen versiones "Verified", privadas o con preguntas nuevas cada mes.',
            '<b>Selección de métrica</b>: reportar "con herramientas", "con 64 intentos y voto mayoritario" (<i>pass@k</i>, <i>majority voting</i>) o "con esfuerzo máximo" sin decirlo claramente. Lee siempre la letra pequeña: ¿cuántos intentos, qué esfuerzo, qué herramientas?',
            '<b>Elegir los benchmarks favorables</b> y omitir los desfavorables en la tabla del anuncio.',
            '<b>Optimizar para el estilo</b> que gusta en LMArena (respuestas largas, con formato, aduladoras). Meta fue criticada en 2025 por enviar a LMArena una versión de Llama 4 distinta de la publicada.',
            '<b>Saturación</b>: cuando todos sacan 95 %, las diferencias son ruido.'
          ]),
          B.key('Un benchmark mide una tarea concreta bajo condiciones concretas. Ningún número resume "inteligencia". Los laboratorios lo saben: por eso las <i>system cards</i> tienen 100 páginas y no una tabla.'),
          B.h('Lo que hacen los expertos: evaluaciones propias'),
          B.p('Toda empresa seria que usa LLM construye su propio conjunto de evaluación (<i>eval</i>): decenas o cientos de casos reales de su negocio con la respuesta esperada o un criterio de calidad, y un script que los pasa por el modelo y mide. Es lo que te permite:'),
          B.olist([
            'Comparar modelos <b>en tu tarea</b> (¿Sonnet 5 concilia pagos igual de bien que Opus 5 a un quinto del precio?).',
            'Detectar regresiones cuando cambias un prompt o el proveedor actualiza el modelo.',
            'Decidir con números, no con impresiones, cuándo usar Fable, Opus o Sonnet.'
          ]),
          B.ex('Un eval para Maya en una tarde', [
            B.olist([
              'Exporta 100 conversaciones reales anonimizadas de WhatsApp con su desenlace correcto (pedido cerrado, pago conciliado, escalado a humano…).',
              'Para cada una define qué debería haber hecho Maya en el siguiente turno: qué herramienta llamar o qué responder. Puede ser una regla ("debe pedir el número de pedido") o una respuesta de referencia.',
              'Escribe un script (Claude te lo hace) que pase cada caso por el modelo candidato y compare: exactitud en la herramienta elegida, y un <b>juez LLM</b> (otro modelo con una rúbrica) para la calidad del texto.',
              'Corre el eval con Sonnet 5, Opus 5 y Haiku 4.5. Mira exactitud, coste y latencia. Decide por tabla.',
              'Guarda el eval en el repo y córrelo antes de cada cambio de prompt. Esa es la diferencia entre "creo que mejoró" y "mejoró".'
            ])
          ]),
          B.h('Juez LLM'),
          B.p('Para tareas sin respuesta única (¿es buena esta redacción?), se usa otro modelo como juez con una <b>rúbrica</b> explícita (claridad 1-5, sigue la política sí/no, tono adecuado). Funciona bien si la rúbrica es concreta y si calibras el juez contra algunos juicios humanos. Es la técnica que usan los propios laboratorios para evaluar a escala.'),
          B.check('Un anuncio dice "92 % en SWE-bench". ¿Qué debes mirar antes de creerlo?', ['Nada, el número basta', 'Cuántos intentos (pass@k), qué herramientas y esfuerzo, si es la versión Verified y si comparan en igualdad de condiciones', 'El color de la gráfica', 'Si el modelo es de EE. UU.'], 1, 'Las condiciones cambian el número hasta 20 puntos. La letra pequeña es la información.'),
          B.cards([
            { icon: '📊', title: 'Cada benchmark mide una cosa', html: 'HLE conocimiento, SWE-bench código, Terminal-Bench agentes, GDPval valor económico.' },
            { icon: '🔍', title: 'Letra pequeña', html: 'Intentos, herramientas, esfuerzo, contaminación.' },
            { icon: '🧪', title: 'Tu propio eval', html: '100 casos reales + script + juez. Decide con números.' }
          ])
        ],
        quiz: [
          { q: '¿Por qué MMLU ya no sirve para comparar modelos frontera?', o: ['Porque es demasiado difícil', 'Porque está saturado: todos superan el 90 % y las diferencias son ruido', 'Porque es de pago', 'Porque solo mide código'], a: 1, why: 'Por eso surgieron GPQA, HLE y benchmarks agénticos.' },
          { q: '¿Qué benchmark mide tareas agénticas reales en una terminal?', o: ['MMLU', 'Terminal-Bench', 'LMArena', 'GPQA'], a: 1, why: 'Terminal-Bench (y Terminal-Bench-Science para tareas científicas largas).' },
          { q: '"pass@64 con voto mayoritario" significa…', o: ['un solo intento', 'que el modelo hizo 64 intentos y se tomó la respuesta más frecuente, lo que infla el resultado frente a un intento único', 'que el benchmark tiene 64 preguntas', 'que se usó temperatura 64'], a: 1, why: 'Es legítimo si se declara, pero no es comparable con un solo intento.' },
          { q: 'Un eval propio con casos reales de tu negocio es más útil para decidir qué modelo usar que los benchmarks públicos.', type: 'tf', a: true, why: 'Mide tu tarea, tu coste y tu latencia, y detecta regresiones al cambiar prompts o modelos.' },
          { q: 'Usar otro modelo con una rúbrica explícita para puntuar respuestas se llama…', type: 'fill', a: ['juez LLM', 'LLM juez', 'LLM-as-a-judge', 'llm as a judge', 'juez llm', 'modelo juez'], why: 'LLM-as-a-judge. Funciona bien con rúbricas concretas y calibración frente a juicios humanos.' }
        ],
        cards: [
          ['Benchmarks clave de 2026 y qué miden', 'HLE (conocimiento experto), SWE-bench Verified (bugs reales), Terminal-Bench (agentes en terminal), OSWorld (uso de ordenador), GDPval (valor económico real), ARC-AGI (razonamiento abstracto), τ-bench (agentes de atención al cliente).'],
          ['Formas de manipular un benchmark', 'Contaminación de datos, reportar pass@k o voto mayoritario sin decirlo, elegir benchmarks favorables, optimizar para el estilo de LMArena, comparar con distinto esfuerzo o herramientas.'],
          ['¿Qué es un eval propio?', 'Un conjunto de casos reales de tu negocio con respuesta o criterio esperado y un script que mide exactitud, coste y latencia por modelo. Se corre antes de cada cambio.'],
          ['¿Qué es LLM-as-a-judge?', 'Usar un modelo con una rúbrica explícita para puntuar respuestas sin respuesta única. Calibrar contra algunos juicios humanos.']
        ],
        resources: [
          { type: 'article', t: 'Anthropic: Claude Fable 5.1 y Mythos 5.1 (anuncio con benchmarks)', u: 'https://www.anthropic.com/claude-fable-and-mythos-5-1', lang: 'EN', note: 'Fíjate en las notas al pie de cada cifra: intentos, herramientas, esfuerzo.' },
          { type: 'doc', t: 'Anthropic: Define your success criteria y Develop test cases (guía de evals)', u: 'https://platform.claude.com/docs/en/test-and-evaluate/define-success', lang: 'EN' },
          { type: 'article', t: 'Humanity\'s Last Exam', u: 'https://lastexam.ai/', lang: 'EN' },
          { type: 'article', t: 'Epoch AI: Benchmarking Hub (resultados independientes)', u: 'https://epoch.ai/benchmarks', lang: 'EN', note: 'Evaluaciones independientes de todos los modelos con las mismas condiciones.' },
          { type: 'article', t: 'Hamel Husain: Your AI product needs evals', u: 'https://hamel.dev/blog/posts/evals/', lang: 'EN', note: 'La guía práctica más citada para construir evals en una empresa.' }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'ia-3-7', title: 'Fine-tuning, destilación, cuantización y pesos abiertos', minutes: 14, level: 'intermedio',
        summary: 'Qué se puede hacer con un modelo ya entrenado, qué significa "open weights" de verdad y cuándo te conviene cada opción.',
        body: () => [
          B.lead('Entrenar desde cero está reservado a una docena de organizaciones. Pero hay cuatro cosas que cualquier empresa puede hacer con un modelo existente, y conviene saber cuál resuelve qué.'),
          B.h('1. Fine-tuning (ajuste fino)'),
          B.p('Seguir entrenando un modelo con tus propios datos para especializarlo. Funciona para <b>estilo, formato y tareas repetitivas muy definidas</b> (clasificar tickets con tus categorías, escribir en el tono de tu marca, extraer campos de tus documentos). Funciona <b>mal</b> para añadir conocimiento factual que cambia (precios, reglas): para eso, RAG. La técnica habitual es <b>LoRA</b>: en vez de ajustar todos los parámetros, se añaden matrices pequeñas de bajo rango a cada capa; entrena el 0,1-1 % de los parámetros con resultados casi iguales y cabe en una sola GPU.'),
          B.warn('Antes de hacer fine-tuning, agota el prompting y el RAG. En 2026, con modelos que siguen instrucciones complejas y contextos de un millón de tokens, la mayoría de los casos que antes requerían fine-tuning se resuelven con un buen system prompt, ejemplos en el contexto y herramientas. Fine-tuning añade coste de mantenimiento: cada modelo nuevo obliga a reentrenar. Anthropic no ofrece fine-tuning de Claude en la API general (sí lo hay en Bedrock para algunos modelos); su apuesta es que no lo necesites.'),
          B.h('2. Destilación'),
          B.p('Entrenar un modelo <b>pequeño</b> (alumno) para imitar las salidas de uno <b>grande</b> (maestro). El alumno hereda gran parte de la capacidad a una fracción del coste de inferencia. Es cómo se hacen Haiku, Flash, mini y los R1-Distill de DeepSeek. También es el motivo de las cláusulas de "no usar las salidas para entrenar modelos competidores" en los términos de servicio, y de las medidas <b>anti-destilación</b> que Anthropic incorporó en Fable 5.1.'),
          B.h('3. Cuantización'),
          B.p('Reducir la precisión de los pesos después de entrenar: de 16 bits a 8 o 4. Un 70B pasa de 140 GB a 35 GB con una pérdida de calidad pequeña (más notable en 4 bits para tareas exigentes). Es lo que permite correr modelos abiertos en un Mac o en una GPU de consumo (llama.cpp, Ollama, LM Studio). Los proveedores también cuantizan para servir más barato; a veces sin avisar, lo que provoca quejas de "el modelo se volvió tonto".'),
          B.h('4. Pesos abiertos vs código abierto vs cerrado'),
          B.table(['Categoría', 'Qué se publica', 'Ejemplos', 'Qué puedes hacer'], [
            ['<b>Cerrado</b>', 'Solo acceso por API o app', 'Claude, GPT, Gemini, Grok (versiones actuales)', 'Usar, integrar. No inspeccionar ni ejecutar tú.'],
            ['<b>Pesos abiertos</b> (open weights)', 'Los parámetros entrenados, con una licencia (a veces con restricciones)', 'Llama, DeepSeek (MIT), Qwen, Mistral, gpt-oss, Gemma', 'Ejecutar en tu servidor, fine-tuning, cuantizar, inspeccionar. No reproducir el entrenamiento.'],
            ['<b>Código abierto completo</b>', 'Pesos + datos + código de entrenamiento', 'OLMo (AI2), algunos modelos académicos', 'Reproducir y auditar todo. Raro en la frontera.']
          ]),
          B.p('"Open source" se usa mal: Llama y DeepSeek son <b>pesos abiertos</b>, no código abierto en sentido estricto (no publican los datos). Da igual para la mayoría de usos, pero importa para la auditoría y para el debate regulatorio.'),
          B.h('Cuándo te conviene cada cosa'),
          B.table(['Necesidad', 'Opción recomendada'], [
            ['Respuestas con reglas del negocio que cambian', 'API cerrada o abierta + <b>RAG</b> y system prompt. Nunca fine-tuning.'],
            ['Tono de marca muy específico en miles de textos al día', 'Prompting con ejemplos primero; fine-tuning (LoRA) de un modelo abierto si el volumen justifica el mantenimiento.'],
            ['Datos que no pueden salir de tu servidor (regulación)', 'Modelo de pesos abiertos en tu infraestructura (Hetzner con GPU, o cuantizado) o un proveedor con acuerdo de cero retención de datos.'],
            ['Máxima calidad en tareas difíciles (auditorías, decisiones)', 'Modelo frontera cerrado (Fable, Opus 5, GPT-6, Gemini 3 Pro).'],
            ['Volumen enorme de tareas simples y baratas', 'Modelo pequeño (Haiku 4.5, Flash, V4-Flash) o abierto cuantizado; batch API con 50 % de descuento.']
          ]),
          B.key('En 2026 la brecha entre el mejor modelo abierto (DeepSeek V4, Qwen, Llama 5) y el mejor cerrado es de unos meses en benchmarks, pero mayor en agentes largos y fiabilidad. La decisión ya no es "abierto o cerrado" sino qué combinación por tarea, y quién asume la operación.'),
          B.check('Quieres que Maya responda siempre con los precios actuales de tus 8 productos. ¿Fine-tuning o RAG?', ['Fine-tuning: aprenderá los precios', 'RAG: los precios cambian; hay que darle la tabla actual en el contexto o por herramienta', 'Cuantización', 'Destilación'], 1, 'El conocimiento que cambia nunca va en los pesos. Fine-tuning es para estilo y formato.'),
          B.cards([
            { icon: '🎯', title: 'Fine-tuning = estilo/formato', html: 'LoRA ajusta el 1 %. Nunca para hechos que cambian.' },
            { icon: '🧪', title: 'Destilación', html: 'Un alumno pequeño imita al maestro. Así nacen Haiku y Flash.' },
            { icon: '🗜️', title: 'Cuantización', html: '16 → 4 bits: 140 GB → 35 GB. Corre en un Mac.' },
            { icon: '🔓', title: 'Pesos abiertos ≠ open source', html: 'Llama, DeepSeek, Qwen publican pesos, no datos.' }
          ])
        ],
        quiz: [
          { q: '¿Para qué es adecuado el fine-tuning?', o: ['Para añadir hechos que cambian (precios, reglas)', 'Para estilo, formato y tareas repetitivas muy definidas', 'Para aumentar la ventana de contexto', 'Para hacer el modelo más rápido'], a: 1, why: 'Conocimiento cambiante → RAG. Fine-tuning → comportamiento estable.' },
          { q: '¿Qué es LoRA?', o: ['Un tokenizador', 'Una técnica de fine-tuning que entrena solo matrices pequeñas añadidas a cada capa (≈1 % de los parámetros)', 'Un tipo de cuantización', 'Un benchmark'], a: 1, why: 'Low-Rank Adaptation: resultados casi iguales al ajuste completo, cabe en una GPU.' },
          { q: 'La destilación consiste en…', o: ['reducir los bits de los pesos', 'entrenar un modelo pequeño para imitar las salidas de uno grande', 'borrar datos del modelo', 'aumentar el vocabulario'], a: 1, why: 'Así se crean Haiku, Flash, mini y los R1-Distill.' },
          { q: 'Llama y DeepSeek son código abierto en sentido estricto (publican datos y código de entrenamiento).', type: 'tf', a: false, why: 'Son pesos abiertos: publican los parámetros con licencia, no los datos. Código abierto completo es raro (OLMo).' },
          { q: 'Reducir la precisión de los pesos de 16 a 4 bits tras el entrenamiento se llama…', type: 'fill', a: ['cuantización', 'cuantizacion', 'quantization', 'cuantificación', 'cuantificacion'], why: 'Cuantización: 140 GB → 35 GB para un 70B, con pérdida pequeña de calidad.' }
        ],
        cards: [
          ['¿Cuándo hacer fine-tuning y cuándo no?', 'Sí: estilo, formato, tareas repetitivas definidas, si prompting y RAG no bastan. No: para hechos que cambian (usa RAG). Añade coste de mantenimiento con cada modelo nuevo.'],
          ['¿Qué es LoRA?', 'Low-Rank Adaptation: fine-tuning que añade matrices pequeñas a cada capa y entrena ~1 % de los parámetros. Cabe en una GPU.'],
          ['¿Qué es la destilación?', 'Entrenar un modelo pequeño (alumno) para imitar a uno grande (maestro). Origen de Haiku, Flash, mini. Motivo de las cláusulas anti-destilación.'],
          ['¿Qué es la cuantización?', 'Reducir la precisión de los pesos tras entrenar (16 → 8 → 4 bits). Un 70B pasa de 140 GB a 35 GB. Permite correr modelos abiertos en hardware de consumo.'],
          ['Pesos abiertos vs código abierto', 'Pesos abiertos (Llama, DeepSeek, Qwen): se publican los parámetros con licencia. Código abierto completo (OLMo): también datos y código. Cerrado (Claude, GPT): solo API.']
        ],
        resources: [
          { type: 'paper', t: 'Hu et al. (2021): LoRA: Low-Rank Adaptation of Large Language Models', u: 'https://arxiv.org/abs/2106.09685', lang: 'EN' },
          { type: 'tool', t: 'Ollama: ejecuta modelos abiertos en tu ordenador', u: 'https://ollama.com/', lang: 'EN', note: 'Instala y corre Llama, DeepSeek o Qwen cuantizados en tu Mac en cinco minutos. La mejor forma de "tocar" un modelo abierto.' },
          { type: 'article', t: 'Hugging Face: Open LLM Leaderboard y modelos abiertos', u: 'https://huggingface.co/models', lang: 'EN' },
          { type: 'doc', t: 'Anthropic: cuándo (no) hacer fine-tuning; alternativas con prompting y RAG', u: 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview', lang: 'EN' }
        ]
      }
    ]
  };
})();
