/* Curso de IA · Módulo 5: El panorama: laboratorios, líderes y economía. */
(function () {
  'use strict';
  const B = EX.B;
  EX.MOD = EX.MOD || {};

  EX.MOD['ia-5'] = {
    id: 'ia-5', icon: '🌍', title: 'El panorama: laboratorios, líderes y la economía de la IA',
    desc: 'Quién es quién en 2026, cómo piensan los que dirigen los laboratorios, de dónde sale el dinero y a dónde va, quién fabrica los chips y por qué la IA es ya un asunto geopolítico.',
    goals: [
      'Describir la estrategia, los modelos y las personas clave de Anthropic, OpenAI, Google DeepMind, DeepSeek, xAI, Meta y los principales laboratorios chinos y europeos.',
      'Resumir la visión del mundo de Amodei, Altman, Hassabis, Liang, Musk, Zuckerberg, LeCun y Sutskever, y en qué discrepan.',
      'Explicar la cadena de valor: energía → chips → nubes → modelos → aplicaciones, y dónde están los márgenes.',
      'Entender el debate abierto vs cerrado y los controles de exportación como estrategia.'
    ],
    lessons: [
      /* ------------------------------------------------------------------ */
      {
        id: 'ia-5-1', title: 'Anthropic: seguridad en la frontera', minutes: 15, level: 'intermedio',
        summary: 'Misión, estructura, personas, modelos, negocio y la apuesta que define a la empresa detrás de Claude.',
        body: () => [
          B.lead('Anthropic es la empresa que hizo la herramienta con la que construiste RRB. Entender su tesis explica por qué Claude se comporta como se comporta, por qué retuvo a Mythos y por qué apuesta por el código y las empresas.'),
          B.h('La tesis fundacional'),
          B.p('Fundada en enero de 2021 por siete exinvestigadores de OpenAI, con <b>Dario Amodei</b> (CEO) y <b>Daniela Amodei</b> (presidenta) al frente. Tesis: la IA transformadora llegará pronto, será muy peligrosa si se hace mal, y la única forma de influir en cómo se hace es estar en la frontera. De ahí la frase interna: "seguridad en la frontera". No construyen modelos <i>a pesar</i> del riesgo, sino para que el modelo más capaz del mundo lo haya hecho alguien que se toma el riesgo en serio.'),
          B.h('Estructura poco común'),
          B.list([
            '<b>Corporación de beneficio público</b> (PBC) en Delaware: el consejo puede priorizar la misión sobre el beneficio.',
            '<b>Long-Term Benefit Trust</b>: un fideicomiso independiente que con el tiempo elige a la mayoría del consejo, pensado para que la misión sobreviva a la presión de los inversores. Fue la respuesta a lo que pasó en OpenAI en noviembre de 2023.',
            '<b>Inversores</b>: Google (desde 2023) y Amazon (hasta 8.000 millones de dólares) como socios de nube; rondas con Lightspeed, Menlo, Salesforce, Microsoft y Nvidia (2025). Valoración de 183.000 millones en septiembre de 2025, sensiblemente mayor en 2026.',
            '<b>Personas clave</b>: Jared Kaplan (científico jefe, leyes de escalado), Chris Olah (interpretabilidad), Jack Clark (política), Mike Krieger (producto, cofundador de Instagram), Amanda Askell (carácter de Claude y constitución), Jan Leike (alineación, ex OpenAI), Boris Cherny (creador de Claude Code).'
          ]),
          B.h('Los modelos'),
          B.table(['Año', 'Modelos', 'Aportación'], [
            ['2023', 'Claude 1, Claude 2 (100K contexto)', 'Contexto largo y IA constitucional como diferenciadores'],
            ['2024', 'Claude 3 (Haiku/Sonnet/Opus), 3.5 Sonnet, computer use', 'Supera a GPT-4; Artifacts; el favorito para programar; primer agente de ordenador'],
            ['2025', '3.7 Sonnet + Claude Code, Opus 4 y Sonnet 4 (ASL-3), Opus 4.1, Sonnet 4.5, Haiku 4.5, Opus 4.5', 'Pensamiento extendido; agentes de código; Agent SDK; Skills; memoria'],
            ['2026', 'Opus 4.6, Sonnet 4.6, Mythos Preview (Glasswing), Opus 4.7, 4.8, <b>Fable 5 / Mythos 5</b>, Sonnet 5, Opus 5, <b>Fable 5.1 / Mythos 5.1</b>', 'Clase Mythos; retención por seguridad; Managed Agents; Cowork; caché al 25 %']
          ]),
          B.h('El negocio'),
          B.p('A diferencia de OpenAI, Anthropic no apostó por el consumidor masivo sino por <b>empresas y desarrolladores</b>: más del 70-80 % de sus ingresos vienen de la API y de Claude Code, no de suscripciones de chat. Claude Code superó los 1.000 millones de ingresos anualizados en 2025 a los pocos meses de lanzarse. La compañía pasó de unos 1.000 millones de ingresos anualizados a principios de 2025 a más de 5.000 a mediados, y siguió multiplicándose en 2026 con los agentes. La consecuencia práctica: Claude está optimizado para código, análisis, agentes y trabajo profesional, que es exactamente tu caso de uso.'),
          B.h('Cómputo'),
          B.p('Anthropic es el único laboratorio frontera que entrena en tres plataformas: <b>TPU de Google</b> (acuerdo de hasta un millón de chips, octubre de 2025), <b>Trainium de Amazon</b> (Project Rainier, cientos de miles de chips) y <b>GPU de Nvidia</b> vía Microsoft Azure (acuerdo de 30.000 millones de dólares en noviembre de 2025). Diversificar proveedores es estrategia: no depender de nadie.'),
          B.h('Lo que la distingue'),
          B.list([
            '<b>Responsible Scaling Policy</b> (2023, v3 en 2026): niveles ASL ligados a capacidades peligrosas; el primer marco de su tipo, imitado luego por OpenAI y Google.',
            '<b>Interpretabilidad</b> como prioridad de investigación: entender qué pasa dentro del modelo (módulo 6).',
            '<b>Honestidad</b> como rasgo de producto: Claude está diseñado para decirte que estás equivocado.',
            '<b>Política</b>: apoyo a los controles de exportación de chips a China; apoyo a la ley SB 53 de California sobre transparencia de modelos frontera; postura crítica con la carrera sin frenos y a la vez con la regulación mal hecha.',
            '<b>Project Glasswing</b>: decidir no lanzar el mejor modelo del mundo y dárselo a los defensores. Ningún otro laboratorio lo había hecho.'
          ]),
          B.quote('Estamos en una carrera, y la única manera de ganarla de forma segura es estar delante y demostrar que se puede ser seguro y competitivo al mismo tiempo.', 'Paráfrasis de la postura pública de Dario Amodei'),
          B.check('¿Cuál es la principal fuente de ingresos de Anthropic?', ['Suscripciones de consumidores a Claude.ai', 'API y Claude Code para empresas y desarrolladores', 'Publicidad', 'Venta de chips'], 1, 'Más del 70-80 % viene de empresas y desarrolladores. Por eso Claude está optimizado para código y agentes.'),
          B.cards([
            { icon: '🎯', title: 'Seguridad en la frontera', html: 'Estar delante para influir en cómo se hace.' },
            { icon: '🏛️', title: 'PBC + Trust', html: 'Estructura para que la misión sobreviva a los inversores.' },
            { icon: '💼', title: 'Empresas y código', html: 'API y Claude Code, no consumo masivo.' },
            { icon: '🔀', title: 'Tres nubes', html: 'TPU, Trainium y Nvidia: no depender de nadie.' }
          ])
        ],
        quiz: [
          { q: 'Anthropic se fundó en…', o: ['2015', '2019', '2021', '2023'], a: 2, why: 'Enero de 2021, por siete exinvestigadores de OpenAI liderados por Dario y Daniela Amodei.' },
          { q: '¿Qué es el Long-Term Benefit Trust?', o: ['Un fondo de pensiones', 'Un fideicomiso independiente que con el tiempo elige a la mayoría del consejo para proteger la misión', 'El nombre del modelo Claude 1', 'Una filial en Europa'], a: 1, why: 'Diseñado para que la misión sobreviva a la presión de los inversores.' },
          { q: 'Anthropic entrena sus modelos exclusivamente con GPU de Nvidia.', type: 'tf', a: false, why: 'Usa TPU de Google, Trainium de Amazon y Nvidia vía Azure. Diversificar es estrategia.' },
          { q: '¿Qué producto de Anthropic superó los 1.000 millones de dólares anualizados a los pocos meses de lanzarse en 2025?', type: 'fill', a: ['Claude Code', 'claude code'], why: 'Claude Code, el agente de programación en la terminal.' },
          { q: 'La Responsible Scaling Policy fue…', o: ['una ley de EE. UU.', 'el primer marco de niveles de seguridad (ASL) ligados a capacidades, publicado por Anthropic en 2023 e imitado por otros laboratorios', 'un benchmark', 'un acuerdo con Google'], a: 1, why: 'v1 en septiembre de 2023, v3 en febrero de 2026 con hojas de ruta e informes de riesgo públicos.' }
        ],
        cards: [
          ['¿Cuál es la tesis fundacional de Anthropic?', '"Seguridad en la frontera": la IA transformadora llega pronto y es peligrosa; la única forma de influir es estar entre los mejores y demostrar que seguridad y competitividad son compatibles.'],
          ['Estructura corporativa de Anthropic', 'Corporación de beneficio público + Long-Term Benefit Trust que elige a la mayoría del consejo. Inversores: Amazon, Google, Microsoft, Nvidia y fondos.'],
          ['¿De dónde vienen los ingresos de Anthropic?', 'Más del 70-80 % de API y Claude Code (empresas y desarrolladores). Claude Code superó 1.000 M$ anualizados en 2025.'],
          ['Personas clave de Anthropic', 'Dario Amodei (CEO), Daniela Amodei (presidenta), Jared Kaplan (científico jefe), Chris Olah (interpretabilidad), Jack Clark (política), Mike Krieger (producto), Amanda Askell (carácter), Boris Cherny (Claude Code).']
        ],
        resources: [
          { type: 'article', t: 'Anthropic: Core Views on AI Safety (2023), la tesis de la empresa', u: 'https://www.anthropic.com/news/core-views-on-ai-safety', lang: 'EN', note: 'El documento fundacional. Explica por qué construyen lo que temen.' },
          { type: 'podcast', t: 'Lex Fridman: Dario Amodei, Amanda Askell y Chris Olah (2024)', u: 'https://www.youtube.com/watch?v=ugvHCXCOmm4', lang: 'EN', min: 300 },
          { type: 'article', t: 'Anthropic: Responsible Scaling Policy', u: 'https://www.anthropic.com/responsible-scaling-policy', lang: 'EN' },
          { type: 'article', t: 'Anthropic: The Long-Term Benefit Trust', u: 'https://www.anthropic.com/news/the-long-term-benefit-trust', lang: 'EN' }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'ia-5-2', title: 'OpenAI: de laboratorio sin ánimo de lucro a imperio', minutes: 14, level: 'intermedio',
        summary: 'La empresa que hizo ChatGPT: su estructura contradictoria, su apuesta por el consumidor y la infraestructura, sus personas y sus modelos hasta GPT-6.',
        body: () => [
          B.lead('OpenAI es la empresa más influyente y más contradictoria del sector: nació para evitar que una corporación monopolizara la IA y hoy es la corporación de IA más valiosa del mundo.'),
          B.h('De la misión al capital'),
          B.olist([
            '<b>2015</b>: organización sin ánimo de lucro, 1.000 millones comprometidos, publicación abierta.',
            '<b>2019</b>: crea OpenAI LP, de "beneficio limitado" (los inversores no pueden ganar más de 100 veces), controlada por la organización sin ánimo de lucro. Microsoft invierte 1.000 millones y se convierte en su nube exclusiva.',
            '<b>2023</b>: Microsoft invierte 10.000 millones más. Crisis del consejo en noviembre.',
            '<b>2024-2025</b>: Musk demanda a OpenAI por traicionar la misión. La empresa intenta convertirse en corporación de beneficio público; tras presión de fiscales generales, en octubre de 2025 cierra una recapitalización: la Fundación OpenAI (sin ánimo de lucro) conserva alrededor del 26 % y el control del consejo; Microsoft, ~27 %; el resto, empleados e inversores (SoftBank lideró rondas gigantes). Valoración de 500.000 millones en 2025.',
            '<b>2026</b>: reorganización de liderazgo (Greg Brockman al frente de producto, nuevo jefe de ingresos, foco renovado en empresas tras perder cuota frente a Anthropic en ese segmento).'
          ]),
          B.h('Personas'),
          B.list([
            '<b>Sam Altman</b>, CEO: el mejor recaudador de capital de la historia de la tecnología; ex presidente de Y Combinator. Su tesis: la abundancia (energía e inteligencia baratas) y la "singularidad suave".',
            '<b>Greg Brockman</b>, presidente y cofundador, el ingeniero que construye.',
            '<b>Jakub Pachocki</b> (científico jefe) y <b>Mark Chen</b> (investigación): sucesores de Sutskever.',
            '<b>Fidji Simo</b>, CEO de Aplicaciones (desde 2025): el negocio de consumo y publicidad.',
            '<b>Sarah Friar</b> (CFO) y <b>Brad Lightcap</b> (COO). Salidas notables: Sutskever (2024, fundó Safe Superintelligence), Mira Murati (2024, fundó Thinking Machines), Jan Leike (2024, a Anthropic), John Schulman.'
          ]),
          B.h('Estrategia: consumo + infraestructura'),
          B.p('OpenAI apuesta por ser el <b>producto de consumo</b> (ChatGPT tiene cientos de millones de usuarios semanales, con publicidad y comercio desde 2025-2026) y por controlar la <b>infraestructura</b>: <b>Stargate</b> (anunciado en enero de 2025 con SoftBank, Oracle y MGX: 500.000 millones de dólares para unos 10 GW en EE. UU., con sitios en Abilene y varios estados), acuerdos de cómputo con Oracle, AMD, Nvidia, Broadcom (chips propios) y CoreWeave, y hardware de consumo con Jony Ive. Es la apuesta de escala más grande de la historia empresarial, financiada con deuda y compromisos futuros, lo que genera el debate sobre una "burbuja".'),
          B.h('Modelos'),
          B.table(['Año', 'Modelos', 'Notas'], [
            ['2018-2020', 'GPT-1, GPT-2, GPT-3', 'La serie que fundó el campo'],
            ['2022-2023', 'ChatGPT (GPT-3.5), GPT-4, GPT-4 Turbo, DALL·E 3', 'El producto que lo cambió todo'],
            ['2024', 'GPT-4o, o1 (razonamiento), Sora (vídeo)', 'Multimodal en tiempo real; inauguran los razonadores'],
            ['2025', 'o3, o4-mini, GPT-4.5, GPT-4.1, Codex (agente), GPT-5 (ago), gpt-oss (abierto), GPT-5.1, 5.2, Sora 2, Atlas (navegador)', 'GPT-5 unifica con un router; recepción tibia; giro a agentes'],
            ['2026', 'GPT-5.3-Codex (feb), GPT-5.4 (mar), GPT-5.6 (jul), GPT-Live (voz), <b>GPT-6 Astra</b> (3 sep)', 'GPT-6: computer use, código, ciberseguridad y ciencia como frentes']
          ]),
          B.h('Fortalezas y debilidades'),
          B.compare('Fortalezas', ['Marca: "ChatGPT" es sinónimo de IA para el público.', 'Escala de usuarios y datos de interacción.', 'Capacidad de captar capital e infraestructura sin igual.', 'Investigación puntera en razonamiento (o1 fue primero).'],
            'Debilidades', ['Gobernanza turbulenta y salidas de fundadores.', 'Coste de infraestructura enorme frente a ingresos.', 'Pérdida de cuota empresarial frente a Anthropic (del ~50 % en 2023 al ~27 % a finales de 2025 según estimaciones del sector).', 'Tensión permanente entre misión declarada y realidad comercial.']),
          B.check('¿Qué es Stargate?', ['Un modelo de OpenAI', 'Un proyecto de infraestructura de ~500.000 M$ y ~10 GW de centros de datos en EE. UU. con SoftBank, Oracle y MGX', 'Una película', 'El nombre interno de GPT-6'], 1, 'La apuesta de infraestructura más grande de la historia empresarial, anunciada en enero de 2025.'),
          B.cards([
            { icon: '🔁', title: 'Sin ánimo → PBC', html: 'De fundación (2015) a recapitalización (2025) con la fundación al ~26 %.' },
            { icon: '📱', title: 'Consumo', html: 'ChatGPT: cientos de millones de usuarios; anuncios y comercio.' },
            { icon: '🏗️', title: 'Stargate', html: '500.000 M$, 10 GW. La apuesta de escala.' },
            { icon: '🧑‍💼', title: 'Altman', html: 'Recaudador sin igual; visión de abundancia.' }
          ])
        ],
        quiz: [
          { q: 'Tras la recapitalización de octubre de 2025, la fundación sin ánimo de lucro de OpenAI…', o: ['desapareció', 'conserva alrededor del 26 % y el control del consejo', 'posee el 100 %', 'fue comprada por Microsoft'], a: 1, why: 'Microsoft ~27 %; el resto empleados e inversores. La fundación mantiene el control formal.' },
          { q: 'La estrategia de OpenAI se apoya sobre todo en…', o: ['pesos abiertos', 'el consumidor masivo (ChatGPT) y el control de la infraestructura (Stargate)', 'solo la API para empresas', 'hardware de videojuegos'], a: 1, why: 'A diferencia de Anthropic, que se centra en empresas y desarrolladores.' },
          { q: 'GPT-5 (agosto de 2025) fue recibido como un salto comparable a GPT-3 → GPT-4.', type: 'tf', a: false, why: 'La recepción fue tibia: unificó modelos con un router pero el salto fue menor. Señal del cambio hacia razonamiento y agentes.' },
          { q: '¿Quién dirige el negocio de aplicaciones de consumo de OpenAI desde 2025?', type: 'fill', a: ['Fidji Simo', 'fidji simo', 'Simo'], why: 'Fidji Simo, CEO de Aplicaciones, ex Instacart y Facebook.' },
          { q: 'El modelo de OpenAI presentado el 3 de septiembre de 2026 se llama…', o: ['GPT-5.7', 'GPT-6 Astra', 'o5', 'Orion'], a: 1, why: 'GPT-6 Astra, con foco en computer use, código, ciberseguridad y ciencia.' }
        ],
        cards: [
          ['Evolución de la estructura de OpenAI', '2015 sin ánimo de lucro → 2019 beneficio limitado con Microsoft → 2023 crisis del consejo → 2025 recapitalización: fundación ~26 % con control, Microsoft ~27 %.'],
          ['Estrategia de OpenAI', 'Consumo masivo (ChatGPT, publicidad, comercio, hardware con Jony Ive) + infraestructura propia (Stargate: 500.000 M$, 10 GW; chips con Broadcom).'],
          ['Modelos de OpenAI 2024-2026', 'GPT-4o, o1, o3, GPT-4.5, GPT-5 (ago 2025), gpt-oss, GPT-5.x, GPT-6 Astra (sep 2026). Sora para vídeo, Codex para agentes de código.'],
          ['Salidas notables de OpenAI', 'Sutskever (2024 → Safe Superintelligence), Murati (2024 → Thinking Machines), Leike (2024 → Anthropic), Schulman, y la salida de Musk en 2018 con demanda posterior.']
        ],
        resources: [
          { type: 'article', t: 'Sam Altman: The Gentle Singularity (junio 2025)', u: 'https://blog.samaltman.com/the-gentle-singularity', lang: 'EN', note: 'La visión de Altman en dos páginas: agentes en 2025, descubrimientos en 2026, robots en 2027.' },
          { type: 'article', t: 'OpenAI: Announcing The Stargate Project', u: 'https://openai.com/index/announcing-the-stargate-project/', lang: 'EN' },
          { type: 'book', t: 'Karen Hao: Empire of AI', u: 'https://www.penguinrandomhouse.com/books/743569/empire-of-ai-by-karen-hao/', lang: 'EN' },
          { type: 'article', t: 'OpenAI: notas de lanzamiento de modelos (actualizado)', u: 'https://help.openai.com/en/articles/9624314-model-release-notes', lang: 'EN' }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'ia-5-3', title: 'Google DeepMind: el gigante que inventó casi todo', minutes: 12, level: 'intermedio',
        summary: 'Transformer, TPU, AlphaGo, AlphaFold, Gemini. Por qué Google llegó tarde al chat y cómo recuperó terreno.',
        body: () => [
          B.lead('Google inventó el transformer, tiene los datos, los chips propios y un premio Nobel al frente. Y aun así, en 2023 estaba en "código rojo". Su historia es la de un gigante que tenía todo menos la urgencia.'),
          B.h('Dos linajes que se fusionan'),
          B.p('<b>Google Brain</b> (2011, Jeff Dean, Andrew Ng): el equipo que creó TensorFlow, el transformer, BERT, PaLM. <b>DeepMind</b> (Londres, 2010, comprada en 2014): AlphaGo, AlphaZero, AlphaFold, refuerzo. Rivales internos durante años, se fusionan en abril de 2023 como <b>Google DeepMind</b> bajo <b>Demis Hassabis</b>, empujados por ChatGPT.'),
          B.h('Hassabis'),
          B.p('Prodigio del ajedrez, diseñador de videojuegos a los 17, doctor en neurociencia. Fundó DeepMind con la misión de "resolver la inteligencia". Nobel de Química en 2024 (con John Jumper) por AlphaFold, que predijo la estructura de 200 millones de proteínas y aceleró la biología una década. Su visión: la IA como <b>herramienta científica</b> por encima de todo (medicina, materiales, fusión), y una postura de seguridad cercana a la de Anthropic: pide cooperación internacional y considera la AGI plausible hacia 2030.'),
          B.h('La ventaja estructural: TPU'),
          B.p('Google diseña sus propios chips de IA desde 2015: las <b>TPU</b> (Tensor Processing Units), ya en la séptima generación (Ironwood). No depende de Nvidia, controla su coste por token y alquila TPU a terceros (Anthropic firmó por hasta un millón). Además tiene la mayor infraestructura de centros de datos del mundo, los datos de Búsqueda, YouTube, Gmail y Android, y 2.000 millones de usuarios para distribuir.'),
          B.h('Gemini'),
          B.table(['Fecha', 'Modelo', 'Notas'], [
            ['dic 2023', 'Gemini 1.0', 'Multimodal nativo desde el diseño'],
            ['feb 2024', 'Gemini 1.5 Pro', 'Contexto de 1 millón de tokens: primero en la industria'],
            ['dic 2024', 'Gemini 2.0', 'Agentes (Project Astra, Mariner); Flash barato y rápido'],
            ['mar 2025', 'Gemini 2.5 Pro', 'Lidera LMArena y varios benchmarks durante meses'],
            ['18 nov 2025', 'Gemini 3 Pro y Deep Think', 'Vuelve a la cima; integración total en Búsqueda (AI Mode), Workspace, Android'],
            ['2026', 'Gemini 3.5 Flash-Lite, 3.6/3.7/3.8 Flash, 3.5 Flash Cyber, Transcribe', 'Prioridad: eficiencia y modelos especializados; sin 3.5 Pro a septiembre']
          ]),
          B.p('Además: <b>Veo 3</b> (vídeo con audio, base de Flow, la herramienta de tus vídeos), <b>Imagen</b> y <b>Nano Banana</b> (imagen), <b>Genie 3</b> (mundos interactivos), <b>AlphaEvolve</b> (descubrimiento de algoritmos), <b>Gemini Robotics</b>, <b>Isomorphic Labs</b> (fármacos). Nadie tiene un catálogo tan ancho.'),
          B.h('Por qué llegó tarde y cómo volvió'),
          B.compare('Por qué tarde', ['Miedo al riesgo reputacional y a canibalizar la Búsqueda (su negocio de 200.000 M$).', 'Burocracia y rivalidad Brain-DeepMind.', 'Bard (2023) salió apresurado y flojo.'],
            'Cómo volvió', ['Fusión bajo Hassabis, foco y urgencia.', 'TPU: coste por token imbatible; Flash gratis o casi para ganar desarrolladores.', 'Distribución: Gemini en Android, Chrome, Gmail, Búsqueda; 650+ millones de usuarios mensuales en 2025.', 'Investigación: 1M de contexto, Deep Think, agentes.']),
          B.key('Google es el competidor con más recursos, mejor coste y mayor distribución. Su riesgo es la Búsqueda: cada respuesta de IA que sustituye a un clic amenaza su negocio principal. Y aun así ha decidido canibalizarse antes de que lo hagan otros.'),
          B.check('¿Cuál es la ventaja estructural de Google frente a los demás laboratorios?', ['Tener más empleados', 'Chips propios (TPU) e infraestructura y distribución masivas: no depende de Nvidia y controla su coste por token', 'Publicar pesos abiertos', 'Haber inventado internet'], 1, 'TPU desde 2015, la mayor red de centros de datos y 2.000 M de usuarios.'),
          B.cards([
            { icon: '🔬', title: 'Hassabis', html: 'Nobel 2024 por AlphaFold. IA como herramienta científica.' },
            { icon: '🔧', title: 'TPU', html: 'Chips propios desde 2015. Coste por token imbatible.' },
            { icon: '📲', title: 'Distribución', html: 'Búsqueda, Android, Gmail: 2.000 M de usuarios.' },
            { icon: '⚠️', title: 'Dilema', html: 'La IA canibaliza la Búsqueda. Lo hacen igual.' }
          ])
        ],
        quiz: [
          { q: 'Google DeepMind nació en 2023 de la fusión de…', o: ['Google y Nvidia', 'Google Brain y DeepMind', 'YouTube y Android', 'Waymo y DeepMind'], a: 1, why: 'Empujados por ChatGPT, los dos linajes rivales se unieron bajo Hassabis.' },
          { q: 'Demis Hassabis recibió el Nobel de Química en 2024 por…', o: ['Gemini', 'AlphaGo', 'AlphaFold (predicción de estructura de proteínas)', 'el transformer'], a: 2, why: 'Con John Jumper. AlphaFold predijo 200 millones de proteínas.' },
          { q: 'Gemini 1.5 Pro (2024) fue el primer modelo comercial con contexto de un millón de tokens.', type: 'tf', a: true, why: 'Febrero de 2024. Los demás tardaron más de un año en igualarlo.' },
          { q: 'Los chips de IA propios de Google se llaman…', type: 'fill', a: ['TPU', 'tpu', 'Tensor Processing Unit', 'tensor processing units'], why: 'TPU, desde 2015, séptima generación (Ironwood) en 2025-2026.' },
          { q: '¿Qué herramienta de Google genera los vídeos que usas en Flow?', o: ['Imagen', 'Veo', 'Genie', 'Gemini Robotics'], a: 1, why: 'Veo 3 (vídeo con audio sincronizado) es el motor de Flow.' }
        ],
        cards: [
          ['¿Quién es Demis Hassabis?', 'CEO de Google DeepMind, cofundador de DeepMind (2010), Nobel de Química 2024 por AlphaFold. Ve la IA como herramienta científica; postura de seguridad cooperativa.'],
          ['Ventajas estructurales de Google', 'TPU propias (sin depender de Nvidia), la mayor infraestructura de centros de datos, datos de Búsqueda/YouTube y distribución a 2.000 M de usuarios.'],
          ['Catálogo de Google DeepMind', 'Gemini (texto/multimodal), Veo (vídeo), Imagen/Nano Banana (imagen), Genie 3 (mundos), AlphaFold, AlphaEvolve, Gemini Robotics, Isomorphic Labs.'],
          ['El dilema de Google', 'Cada respuesta de IA sustituye un clic de Búsqueda (su negocio de 200.000 M$). Decidió canibalizarse antes de que lo hagan otros.']
        ],
        resources: [
          { type: 'article', t: 'Google: Gemini 3 (anuncio)', u: 'https://blog.google/products-and-platforms/products/gemini/gemini-3/', lang: 'EN' },
          { type: 'podcast', t: 'Lex Fridman: Demis Hassabis (2025)', u: 'https://www.youtube.com/watch?v=-HzgcbRXUK8', lang: 'EN', min: 150, note: 'Hassabis sobre AlphaFold, AGI, seguridad y el futuro de la ciencia.' },
          { type: 'article', t: 'Google DeepMind: blog de investigación', u: 'https://deepmind.google/discover/blog/', lang: 'EN' }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'ia-5-4', title: 'DeepSeek y la ola china: abierto, barato y a meses de la frontera', minutes: 14, level: 'intermedio',
        summary: 'Liang Wenfeng y su fondo, la receta de eficiencia, V3, R1, V4, y el ecosistema chino (Qwen, Kimi, GLM) que domina los pesos abiertos.',
        body: () => [
          B.lead('DeepSeek no es una startup al uso: es el proyecto de investigación de un fondo de inversión cuantitativa, dirigido por un ingeniero que rechaza entrevistas y que ha convertido la <b>restricción</b> en filosofía. Cambió los precios de la industria y la geopolítica de los chips.'),
          B.h('Liang Wenfeng y High-Flyer'),
          B.p('Liang, nacido en 1985 en Guangdong, ingeniero por Zhejiang, fundó en 2015 el fondo cuantitativo <b>High-Flyer</b> (幻方), que acumuló miles de GPU Nvidia A100 para sus modelos financieros antes de los controles de exportación. En 2023 crea <b>DeepSeek</b> con ese cómputo, sin inversores externos, con un equipo joven de graduados de universidades chinas (no de Silicon Valley) y una meta declarada: <b>AGI</b>, no productos. Su estilo: papers detallados, pesos abiertos, precios mínimos, cero marketing.'),
          B.quote('Una empresa dispuesta a dejar más valor a los demás hoy aumenta sus posibilidades de crear algo mucho mayor mañana. La IA es demasiado grande para que un solo jugador la monopolice sin ser abandonado por la historia.', 'Liang Wenfeng, paráfrasis de sus declaraciones sobre restricción y código abierto'),
          B.h('La receta: hacer más con menos'),
          B.list([
            '<b>MLA</b> (atención latente multi-cabeza, V2 en 2024): comprime la caché KV unas 10 veces. Inferencia barata con contexto largo.',
            '<b>MoE fino</b>: muchos expertos pequeños (256 en V3, 8 activos + 1 compartido) y balanceo de carga sin pérdida auxiliar.',
            '<b>FP8</b> en entrenamiento y <b>predicción multi-token</b>.',
            '<b>Ingeniería de infraestructura</b> obsesiva: comunicaciones entre GPU optimizadas a bajo nivel para exprimir las H800 (versión recortada de la H100 permitida para China).',
            '<b>GRPO y RLVR</b> para razonamiento sin modelo de valor.'
          ]),
          B.table(['Fecha', 'Modelo', 'Hito'], [
            ['may 2024', 'DeepSeek-V2', 'MLA; precios 1/100 de GPT-4; desata la guerra de precios en China'],
            ['26 dic 2024', 'DeepSeek-V3', '671B MoE (37B activos), 14,8T tokens, ~5,6 M$ de cómputo final. Nivel GPT-4o abierto'],
            ['20 ene 2025', '<b>DeepSeek-R1</b>', 'Razonador nivel o1, MIT, receta pública. Nvidia −600.000 M$ el 27 de enero'],
            ['2025', 'R1-0528, V3.1, V3.2', 'Mejoras de agentes y razonamiento; problemas para entrenar R2 con chips Huawei según la prensa'],
            ['24 abr 2026', '<b>DeepSeek-V4</b> Pro (1,6T MoE, 49B activos) y Flash (284B/13B), MIT, 1M contexto', 'Cerca de GPT-5.4 en matemáticas y QA; 1,74 $/M tokens de entrada'],
            ['jul-ago 2026', 'V4-Flash-0731 y V4-Pro-0813 oficiales', 'Pesos en Hugging Face; adopción masiva en Asia y en empresas que quieren control']
          ]),
          B.h('Por qué el "momento DeepSeek" importó tanto'),
          B.olist([
            '<b>Precio</b>: demostró que la inferencia frontera podía costar una fracción; todos los proveedores bajaron precios en 2025.',
            '<b>Apertura</b>: los pesos MIT dejaron el razonamiento en manos de cualquiera, incluidos gobiernos y empresas que no quieren depender de EE. UU.',
            '<b>Geopolítica</b>: probó que los controles de exportación frenan pero no detienen; Washington respondió con más controles (y episodios de ida y vuelta con los chips H20) y Pekín aceleró Huawei Ascend y la autosuficiencia.',
            '<b>Estrategia</b>: los laboratorios de EE. UU. se dieron cuenta de que la eficiencia algorítmica es una ventaja competitiva tan real como el cómputo bruto.'
          ]),
          B.h('El ecosistema chino'),
          B.table(['Laboratorio', 'Modelos', 'Rasgo'], [
            ['<b>Alibaba (Qwen)</b>', 'Qwen2.5, Qwen3 (2025), Qwen3-Max', 'La familia abierta más descargada del mundo; decenas de tamaños y variantes; base de miles de derivados'],
            ['<b>Moonshot AI</b>', 'Kimi K2 (jul 2025, 1T MoE abierto), K2 Thinking', 'Agentes y contexto largo; fundada por Yang Zhilin'],
            ['<b>Zhipu (Z.ai)</b>', 'GLM-4.5, GLM-4.6', 'Spin-off de Tsinghua; fuerte en código y agentes'],
            ['<b>MiniMax, ByteDance (Doubao/Seed), Baidu (Ernie), Tencent (Hunyuan), StepFun</b>', 'Modelos propios', 'Gigantes con distribución masiva en China; ByteDance es el mayor consumidor de cómputo del país']
          ]),
          B.p('Rasgo común: <b>pesos abiertos como estrategia nacional</b>. Con restricciones de chips, la apertura gana adopción global, talento y estándares. En 2026, la mayoría de los modelos abiertos usados en el mundo son chinos, lo que preocupa a Washington tanto como el hardware.'),
          B.key('DeepSeek demostró que la restricción (poco cómputo, sin inversores, sin marketing) puede ser una ventaja si obliga a innovar en eficiencia. Y que abrir los pesos es una forma de poder blando. Para ti: los modelos abiertos chinos son la alternativa real si algún día necesitas correr un modelo en tu propio servidor.'),
          B.check('¿Cuál fue la reacción del mercado a DeepSeek R1 y por qué resultó equivocada?', ['Subieron las acciones de Nvidia', 'Nvidia cayó ~600.000 M$ por miedo a que la IA barata redujera la demanda de chips; pero la IA barata multiplicó el uso (paradoja de Jevons)', 'No hubo reacción', 'Cayeron las acciones de Apple'], 1, 'La eficiencia aumenta la demanda total. Nvidia recuperó y superó su valor.'),
          B.cards([
            { icon: '🏦', title: 'Un fondo cuant', html: 'High-Flyer financia DeepSeek sin inversores externos.' },
            { icon: '⚙️', title: 'Eficiencia', html: 'MLA, MoE fino, FP8, GRPO: más con menos.' },
            { icon: '🔓', title: 'MIT', html: 'Pesos abiertos como poder blando.' },
            { icon: '🇨🇳', title: 'Ecosistema', html: 'Qwen, Kimi, GLM: la mayoría de los abiertos son chinos.' }
          ])
        ],
        quiz: [
          { q: 'DeepSeek está financiada por…', o: ['el gobierno chino directamente', 'el fondo cuantitativo High-Flyer de su fundador, sin inversores externos', 'Alibaba', 'inversores de Silicon Valley'], a: 1, why: 'Liang Wenfeng fundó High-Flyer en 2015 y DeepSeek en 2023 con su cómputo.' },
          { q: '¿Qué innovación de DeepSeek comprime la caché KV unas 10 veces?', o: ['FP8', 'MLA (atención latente multi-cabeza)', 'GRPO', 'Top-p'], a: 1, why: 'Multi-head Latent Attention, introducida en V2 (2024).' },
          { q: 'DeepSeek V4-Pro (2026) tiene 1,6 billones de parámetros y todos se activan en cada token.', type: 'tf', a: false, why: 'Es MoE: 1,6T totales, ~49B activos por token.' },
          { q: 'La familia de modelos abiertos china más descargada del mundo es…', type: 'fill', a: ['Qwen', 'qwen', 'Qwen de Alibaba', 'Alibaba Qwen'], why: 'Qwen (Alibaba), con decenas de tamaños y miles de derivados.' },
          { q: 'La filosofía declarada de Liang Wenfeng se resume en…', o: ['maximizar beneficios rápido', 'restricción: dejar valor a otros, código abierto y foco en AGI', 'copiar a OpenAI', 'cerrar los modelos'], a: 1, why: 'Restraint: capturar menos valor hoy para crear algo mayor mañana.' }
        ],
        cards: [
          ['¿Quién es Liang Wenfeng?', 'Fundador de DeepSeek (2023) y del fondo cuantitativo High-Flyer (2015). Ingeniero de Zhejiang, equipo joven chino, sin inversores, meta AGI, filosofía de restricción y código abierto.'],
          ['La receta de eficiencia de DeepSeek', 'MLA (caché KV 10× menor), MoE fino con balanceo, FP8, predicción multi-token, infraestructura optimizada para H800, GRPO para razonamiento.'],
          ['Modelos de DeepSeek', 'V2 (may 2024), V3 (dic 2024, 671B MoE, ~5,6 M$), R1 (ene 2025, razonador MIT), V3.1/3.2 (2025), V4 Pro 1,6T y Flash 284B (2026, 1M contexto).'],
          ['El ecosistema abierto chino', 'Qwen (Alibaba, el más descargado), Kimi K2 (Moonshot, 1T), GLM (Zhipu), MiniMax, ByteDance, Baidu, Tencent. Pesos abiertos como estrategia nacional.']
        ],
        resources: [
          { type: 'paper', t: 'DeepSeek-V3 Technical Report', u: 'https://arxiv.org/abs/2412.19437', lang: 'EN' },
          { type: 'article', t: 'DeepSeek: anuncio de V4 (documentación de la API)', u: 'https://api-docs.deepseek.com/news/news260424/', lang: 'EN' },
          { type: 'article', t: 'ChinaTalk / Fred Gao: las declaraciones de Liang Wenfeng traducidas', u: 'https://www.fredgao.com/p/deepseeks-liang-wenfeng-breaks-his', lang: 'EN', note: 'La fuente más directa sobre su filosofía.' },
          { type: 'video', t: 'Welch Labs: How DeepSeek rewrote the Transformer', u: 'https://www.youtube.com/watch?v=0VLAoVGf_74', lang: 'EN', min: 18 }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'ia-5-5', title: 'xAI, Meta y el resto del tablero', minutes: 14, level: 'intermedio',
        summary: 'Grok y el cómputo bruto de Musk, el giro de Meta de lo abierto a lo mixto, Mistral en Europa, Microsoft, Amazon, Apple, Nvidia y los nuevos laboratorios de los fundadores que se fueron.',
        body: () => [
          B.lead('Además de los cuatro grandes, hay un segundo anillo de actores que definen el tablero: uno que apuesta todo al cómputo, otro que cambió de estrategia, y varios que controlan la distribución o el hardware.'),
          B.h('xAI: la fuerza bruta'),
          B.p('Fundada por <b>Elon Musk</b> en julio de 2023 tras su ruptura con OpenAI, con el lema de una IA "que busque la verdad al máximo" y menos filtros. Su estrategia es el <b>cómputo</b>: el clúster <b>Colossus</b> en Memphis pasó de 100.000 GPU (montado en 122 días, 2024) a más de 200.000, y Colossus 2 se diseña a escala de gigavatio con turbinas de gas propias. Integrada con X (Twitter) en 2025, lo que le da datos y distribución; en 2026 xAI pasó a formar parte del grupo SpaceX. Modelos: Grok 1 (2023), Grok 3 (feb 2025), <b>Grok 4</b> y Grok 4 Heavy (jul 2025, RL a escala de preentrenamiento), Grok 4.1, <b>Grok 4.5</b> (jul 2026, 1,5T MoE para agentes y código, 500K contexto), Grok 4.6 (ago 2026), y <b>Grok 5</b> en entrenamiento (6T rumoreados, sin fecha). Fortaleza: velocidad de ejecución y cómputo. Debilidades: controversias por salidas ofensivas (julio de 2025), rotación de directivos, y una postura de seguridad que Anthropic y otros consideran laxa.'),
          B.h('Meta: del Linux de la IA a la estrategia mixta'),
          B.p('Meta tenía a <b>Yann LeCun</b> desde 2013 (FAIR) y apostó con <b>Llama</b> (2023-2024) por los pesos abiertos: <b>Zuckerberg</b> argumentaba que lo abierto se convierte en estándar, atrae talento y evita depender de un proveedor, y que el negocio de Meta es la atención, no vender modelos. Llama 3 (2024) fue un éxito; <b>Llama 4</b> (abril de 2025) decepcionó y hubo polémica por la versión enviada a LMArena. Reacción: en junio de 2025 Zuckerberg crea <b>Meta Superintelligence Labs</b>, invierte 14.300 millones en Scale AI para fichar a <b>Alexandr Wang</b> como director de IA, contrata a Nat Friedman y a decenas de investigadores con ofertas de nueve cifras, y anuncia centros de datos de varios gigavatios (Prometheus, Hyperion). LeCun deja Meta a finales de 2025 para fundar una empresa de modelos de mundo. En abril de 2026 Meta lanza <b>Llama 5</b> (abierto) junto con <b>Muse Spark</b>, su primer modelo propietario: el defensor de lo abierto pasa a una estrategia mixta.'),
          B.h('Europa: Mistral y la soberanía'),
          B.p('<b>Mistral AI</b> (París, 2023; Arthur Mensch, ex DeepMind, con ex Meta) es el campeón europeo: Mistral 7B y Mixtral (MoE abierto) en 2023, Mistral Large, Le Chat, y una apuesta por la <b>soberanía</b> (nube europea, contratos con gobiernos y empresas que no quieren datos en EE. UU. o China). Valorada en más de 11.000 millones en 2025 con inversión de ASML. Otros: Aleph Alpha (Alemania), Black Forest Labs (imagen, FLUX), DeepL (traducción). Europa lidera en regulación (AI Act) y va por detrás en cómputo.'),
          B.h('Los que controlan la distribución'),
          B.table(['Empresa', 'Papel', 'Modelos propios'], [
            ['<b>Microsoft</b>', 'Nube (Azure), socio y accionista de OpenAI (~27 %), Copilot en Office y Windows, GitHub Copilot', 'Familia MAI bajo Mustafa Suleyman (ex DeepMind, Inflection); modelos Phi pequeños; ofrece Claude en Azure y Copilot'],
            ['<b>Amazon</b>', 'Nube (AWS, Bedrock con todos los modelos), mayor inversor de Anthropic, chips Trainium', 'Familia Nova; Alexa+ con Claude'],
            ['<b>Apple</b>', 'Distribución a 2.000 M de dispositivos; privacidad en el dispositivo', 'Apple Intelligence (modelos pequeños); acuerdo con Google Gemini para Siri (2026); llegó tarde'],
            ['<b>Nvidia</b>', 'El proveedor de todos: ~80-90 % de los aceleradores; la empresa más valiosa del mundo', 'Nemotron (abiertos); invierte en OpenAI, Anthropic, xAI, Mistral y decenas más'],
            ['<b>Oracle, CoreWeave, Lambda, Nebius, Crusoe</b>', 'Nubes especializadas en GPU que construyen para OpenAI y otros', '—']
          ]),
          B.h('Los nuevos laboratorios de los fundadores'),
          B.list([
            '<b>Safe Superintelligence</b> (Ilya Sutskever, jun 2024): un solo objetivo, superinteligencia segura, sin productos; valorada en 32.000 millones sin ingresos.',
            '<b>Thinking Machines Lab</b> (Mira Murati, feb 2025): ronda semilla de 2.000 millones, la mayor de la historia; producto Tinker para ajuste fino.',
            '<b>Reflection AI</b>, <b>Periodic Labs</b> (IA para ciencia), <b>World Labs</b> (Fei-Fei Li, mundos 3D), la empresa de <b>LeCun</b> (modelos de mundo), <b>Humans&</b> y otras: la diáspora de OpenAI, DeepMind y Meta creando la siguiente generación.',
            'Y los <b>constructores de aplicaciones</b> que multiplican valor sobre los modelos: <b>Cursor</b> (código, uno de los mayores clientes de Anthropic), <b>Perplexity</b> (búsqueda), <b>Harvey</b> (legal), <b>Glean</b>, <b>Sierra</b> (agentes de atención al cliente), <b>Lovable</b> y <b>Replit</b> (crear software sin programar).'
          ]),
          B.key('El tablero de 2026: cuatro laboratorios frontera (Anthropic, OpenAI, Google, y xAI empujando con cómputo), China con los mejores modelos abiertos, Meta reconstruyéndose, Europa en soberanía, y tres gigantes (Microsoft, Amazon, Apple) que no lideran en modelos pero controlan la distribución y la nube. Nvidia cobra a todos.'),
          B.check('¿Por qué Meta apostó por pesos abiertos con Llama, según Zuckerberg?', ['Para vender los modelos más caros', 'Porque lo abierto se convierte en estándar, atrae talento y evita depender de un proveedor; el negocio de Meta es la atención, no los modelos', 'Por obligación legal', 'Porque no tenía dinero para cerrarlos'], 1, 'La analogía de Zuckerberg era Linux. En 2026 la estrategia se volvió mixta con Muse Spark.'),
          B.cards([
            { icon: '🔋', title: 'xAI', html: 'Colossus: cómputo bruto y velocidad. Grok 5 en camino.' },
            { icon: '🔄', title: 'Meta', html: 'De Llama abierto a Llama 5 + Muse Spark propietario. MSL con Wang.' },
            { icon: '🇪🇺', title: 'Mistral', html: 'Soberanía europea; ASML como inversor.' },
            { icon: '🏬', title: 'Distribución', html: 'Microsoft, Amazon, Apple; Nvidia cobra a todos.' }
          ])
        ],
        quiz: [
          { q: 'La estrategia central de xAI es…', o: ['pesos abiertos', 'cómputo masivo (Colossus) y velocidad de ejecución, con menos filtros', 'fine-tuning para empresas', 'chips propios'], a: 1, why: 'Colossus pasó de 100.000 a más de 200.000 GPU; Colossus 2 a escala de gigavatio.' },
          { q: 'Meta Superintelligence Labs se creó en 2025 y está dirigido por…', o: ['Yann LeCun', 'Alexandr Wang (ex Scale AI)', 'Mark Zuckerberg directamente', 'Ilya Sutskever'], a: 1, why: 'Tras invertir 14.300 M$ en Scale AI. LeCun dejó Meta a finales de 2025.' },
          { q: 'En 2026 Meta sigue publicando solo modelos abiertos.', type: 'tf', a: false, why: 'Lanzó Llama 5 (abierto) junto con Muse Spark, propietario: estrategia mixta.' },
          { q: 'El campeón europeo de modelos de IA es…', type: 'fill', a: ['Mistral', 'mistral', 'Mistral AI'], why: 'Mistral AI (París, 2023), con apuesta por la soberanía europea.' },
          { q: '¿Qué empresa fundó Ilya Sutskever tras dejar OpenAI?', o: ['Thinking Machines', 'Safe Superintelligence', 'Reflection AI', 'World Labs'], a: 1, why: 'Junio de 2024; un solo objetivo (superinteligencia segura), sin productos.' }
        ],
        cards: [
          ['¿Qué es xAI y cuál es su estrategia?', 'Laboratorio de Elon Musk (jul 2023); apuesta por cómputo bruto (Colossus, 200.000+ GPU; Colossus 2 a escala de gigavatio) y menos filtros. Grok 4/4.5/4.6; Grok 5 en entrenamiento. Integrado con X y luego SpaceX.'],
          ['El giro de Meta (2025-2026)', 'Llama 4 decepciona → Meta Superintelligence Labs con Alexandr Wang (14.300 M$ en Scale AI), fichajes masivos, LeCun se va → Llama 5 abierto + Muse Spark propietario (abr 2026).'],
          ['Mistral AI', 'Campeón europeo (París, 2023, Arthur Mensch). Mistral 7B, Mixtral, Mistral Large, Le Chat. Apuesta por soberanía; inversión de ASML.'],
          ['Los laboratorios de la diáspora', 'Safe Superintelligence (Sutskever), Thinking Machines (Murati, semilla de 2.000 M$), Reflection, Periodic Labs, World Labs (Fei-Fei Li), la empresa de LeCun.']
        ],
        resources: [
          { type: 'article', t: 'xAI: Grok 4 (anuncio)', u: 'https://x.ai/news/grok-4', lang: 'EN' },
          { type: 'article', t: 'Mark Zuckerberg: Open Source AI Is the Path Forward (julio 2024)', u: 'https://about.fb.com/news/2024/07/open-source-ai-is-the-path-forward/', lang: 'EN', note: 'El manifiesto de lo abierto, antes del giro de 2026. Léelo sabiendo cómo acabó.' },
          { type: 'article', t: 'Mistral AI: noticias', u: 'https://mistral.ai/news', lang: 'EN' },
          { type: 'article', t: 'Meta Superintelligence Labs (Wikipedia)', u: 'https://en.wikipedia.org/wiki/Meta_Superintelligence_Labs', lang: 'EN' }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'ia-5-6', title: 'Cómo piensan los líderes: ocho visiones del mundo', minutes: 18, level: 'avanzado',
        summary: 'Amodei, Altman, Hassabis, Liang, Musk, Zuckerberg, LeCun y Sutskever: qué creen sobre el futuro, en qué coinciden y en qué se pelean. El conocimiento que distingue a un ejecutivo del sector.',
        body: () => [
          B.lead('Los ejecutivos de los laboratorios no solo dirigen empresas: tienen <b>teorías del mundo</b> que determinan qué construyen y cómo. Conocerlas te permite interpretar cada anuncio y anticipar el siguiente movimiento.'),
          B.h('Dario Amodei (Anthropic)'),
          B.p('<b>Tesis</b>: el escalado funciona y la "IA poderosa" (más capaz que un Nobel en casi todo, autónoma durante días, en millones de copias) puede llegar hacia 2026-2027. <b>Optimismo condicional</b>: en <i>Machines of Loving Grace</i> (oct 2024) describe un "siglo comprimido" en el que la IA cura la mayoría de las enfermedades, dobla la esperanza de vida y saca de la pobreza a miles de millones, <i>si</i> sobrevivimos a los riesgos. En <i>The Adolescence of Technology</i> (ene 2026) enumera esos riesgos (mal uso en bioarmas y ciber, autonomía descontrolada, concentración de poder en manos de autócratas o de las propias empresas, disrupción laboral masiva) y propone un plan: controles de exportación para mantener la ventaja democrática, transparencia obligatoria, interpretabilidad, y redistribución. Frases suyas que definen su postura: la IA podría eliminar la mitad de los empleos de oficina de nivel inicial; los laboratorios necesitan regulación, pero bien hecha; "carrera hacia la cima" en seguridad. Es el ejecutivo que más advierte y a la vez el que más construye.'),
          B.h('Sam Altman (OpenAI)'),
          B.p('<b>Tesis</b>: la <b>abundancia</b>. En <i>The Intelligence Age</i> (sep 2024) y <i>The Gentle Singularity</i> (jun 2025) sostiene que la inteligencia y la energía baratas resolverán la mayoría de los problemas, que la singularidad ya ha empezado pero se sentirá gradual ("suave"), y que 2025 trae agentes, 2026 sistemas que descubren cosas nuevas y 2027 robots útiles. Menos énfasis en los riesgos catastróficos que Amodei, más en la transición económica (propone ideas como "compute como derecho" y renta básica). Cree en construir y desplegar rápido para que la sociedad se adapte con la tecnología ("despliegue iterativo"). Su fortaleza es narrar el futuro y financiarlo.'),
          B.h('Demis Hassabis (Google DeepMind)'),
          B.p('<b>Tesis</b>: la IA como el <b>instrumento científico definitivo</b>. AlphaFold es el modelo a seguir: usar la IA para resolver problemas de "raíz" (proteínas, materiales, fusión, enfermedades). Estima la AGI para alrededor de 2030 y define AGI de forma exigente (igualar todas las capacidades cognitivas humanas, incluida la creatividad de Einstein). Pide un organismo internacional tipo CERN o AIEA para la IA y cooperación entre laboratorios en seguridad. Más cauto en plazos que Altman, más optimista en la ciencia que nadie.'),
          B.h('Liang Wenfeng (DeepSeek)'),
          B.p('<b>Tesis</b>: <b>restricción y apertura</b>. La IA es demasiado grande para que una sola empresa la capture; quien intente monopolizarla "será abandonado por la historia". Prefiere investigar a hacer productos, publicar pesos a cobrar, y equipos jóvenes chinos a estrellas de Silicon Valley. Cree que China debe pasar de imitar a innovar y que el código abierto es cultura, no táctica. Su meta es AGI y su método, la eficiencia.'),
          B.h('Elon Musk (xAI)'),
          B.p('<b>Tesis</b>: una IA "que busque la verdad al máximo" y sea "curiosa" será más segura que una con valores impuestos, y las restricciones de los otros laboratorios son sesgo. Fue de los primeros en advertir de los riesgos existenciales (2014-2018) y en pedir regulación; hoy prioriza la velocidad y el cómputo. Su visión a largo plazo: la IA y los robots (Optimus) como parte de una civilización multiplanetaria. Es el actor más impredecible y el que más cómputo despliega por dólar.'),
          B.h('Mark Zuckerberg (Meta)'),
          B.p('<b>Tesis 2024</b>: lo abierto gana (Linux); la IA no es el negocio, es el medio; cada persona tendrá su asistente y las gafas serán la interfaz. <b>Tesis 2025-2026</b>: la "superinteligencia personal" es la prioridad de la compañía y vale cualquier precio en talento y centros de datos; lo abierto se mantiene para lo que no sea frontera, lo frontera puede ser cerrado (Muse Spark). Es la muestra de cómo cambia una visión cuando la competencia se acelera.'),
          B.h('Yann LeCun (ex Meta)'),
          B.p('<b>Tesis</b>: los LLM son un callejón sin salida hacia la inteligencia humana. No entienden el mundo físico, no tienen memoria persistente ni planificación real; predecir texto no da sentido común. Propone <b>modelos de mundo</b> que aprendan de vídeo (JEPA). Considera exagerados los riesgos existenciales y absurda la idea de regular la investigación; defiende lo abierto sin matices. Es la voz contraria más cualificada del sector, y su salida de Meta para fundar su empresa (2025) es la apuesta de que tiene razón.'),
          B.h('Ilya Sutskever (Safe Superintelligence)'),
          B.p('<b>Tesis</b>: la superinteligencia es alcanzable y es lo único que importa; hay que construirla de forma segura, sin la distracción de productos ni ciclos comerciales. Cree que el preentrenamiento "tal como lo conocemos" ha tocado techo por los datos ("los datos son el combustible fósil de la IA") y que el futuro está en el razonamiento y en agentes que aprendan como los humanos. Habla poco; cada declaración mueve al sector.'),
          B.h('El mapa de coincidencias y desacuerdos'),
          B.table(['Pregunta', 'Amodei', 'Altman', 'Hassabis', 'LeCun', 'Liang'], [
            ['¿Cuándo llega la IA transformadora?', '2026-2027', 'Ya empezó; gradual', '~2030', 'Décadas; no con LLM', 'AGI es la meta, sin fecha'],
            ['¿Riesgo catastrófico?', 'Real y urgente', 'Real pero manejable con despliegue', 'Real; cooperación internacional', 'Exagerado', 'Poco énfasis público'],
            ['¿Abierto o cerrado?', 'Cerrado en la frontera; controles de chips', 'Cerrado + algo abierto (gpt-oss)', 'Cerrado (Gemma abierto pequeño)', 'Abierto sin matices', 'Abierto como principio'],
            ['¿Regulación?', 'Sí, transparencia y controles bien diseñados', 'Sí, pero ligera; contra la de estados', 'Sí, internacional', 'No a la investigación; sí a productos', 'Silencio; opera bajo el marco chino'],
            ['¿Empleo?', 'Disrupción masiva pronto; hay que prepararse', 'Transición; renta básica; nuevos empleos', 'Transformación, la ciencia compensa', 'Como toda tecnología', 'AGI como 10 % del PIB']
          ]),
          B.key('Todos coinciden en una cosa: la IA es la tecnología más importante de la historia y su empresa debe estar delante. Discrepan en el plazo, en el riesgo y en quién debe controlarla. Cuando leas un anuncio, pregúntate qué visión del mundo lo produce: casi siempre lo explica.'),
          B.check('¿Qué líder sostiene que los LLM no llevan a la inteligencia humana y propone modelos de mundo?', ['Sam Altman', 'Yann LeCun', 'Dario Amodei', 'Demis Hassabis'], 1, 'LeCun: predecir texto no da sentido común; hay que aprender del vídeo (JEPA). Dejó Meta en 2025 para demostrarlo.'),
          B.cards([
            { icon: '⚖️', title: 'Amodei', html: 'Optimismo condicional: siglo comprimido si sobrevivimos a la adolescencia.' },
            { icon: '🌅', title: 'Altman', html: 'Abundancia y singularidad suave; despliegue iterativo.' },
            { icon: '🧬', title: 'Hassabis', html: 'La IA como instrumento científico; AGI ~2030; cooperación.' },
            { icon: '🧘', title: 'Liang', html: 'Restricción, apertura, AGI sin prisa comercial.' },
            { icon: '🌍', title: 'LeCun', html: 'Los LLM no bastan; modelos de mundo; riesgos exagerados.' }
          ])
        ],
        quiz: [
          { q: 'El ensayo de Amodei que enumera los riesgos de la IA y propone un plan (enero 2026) se titula…', o: ['Machines of Loving Grace', 'The Adolescence of Technology', 'The Gentle Singularity', 'Situational Awareness'], a: 1, why: 'Machines of Loving Grace (2024) es el optimista; Adolescence (2026), el de los riesgos y el plan.' },
          { q: 'La visión de Altman se resume en…', o: ['abundancia y una singularidad gradual, con despliegue iterativo', 'pausar la IA', 'modelos de mundo', 'código abierto total'], a: 0, why: 'The Intelligence Age y The Gentle Singularity: inteligencia y energía baratas resuelven la mayoría de los problemas.' },
          { q: 'Hassabis define la AGI de forma laxa, como cualquier modelo que pase el test de Turing.', type: 'tf', a: false, why: 'Al contrario: exige igualar todas las capacidades cognitivas humanas. Por eso su plazo (~2030) es más cauto.' },
          { q: '¿Quién dijo que los datos son "el combustible fósil de la IA" y que el preentrenamiento tal como lo conocemos ha tocado techo?', type: 'fill', a: ['Sutskever', 'Ilya Sutskever', 'ilya sutskever', 'Ilya'], why: 'Ilya Sutskever, en NeurIPS 2024. Su apuesta: razonamiento y agentes que aprendan como humanos.' },
          { q: '¿En qué coinciden todos los líderes?', o: ['En que la IA es la tecnología más importante de la historia y su empresa debe estar delante', 'En el plazo de la AGI', 'En abrir los pesos', 'En pausar el desarrollo'], a: 0, why: 'Discrepan en plazo, riesgo y control; coinciden en la importancia y en la necesidad de liderar.' }
        ],
        cards: [
          ['La visión de Dario Amodei', 'Escalado funciona; "IA poderosa" hacia 2026-27; optimismo condicional (Machines of Loving Grace) y plan contra riesgos (Adolescence of Technology): controles de chips, transparencia, interpretabilidad, preparar el empleo.'],
          ['La visión de Sam Altman', 'Abundancia: inteligencia y energía baratas; "singularidad suave" ya en marcha; despliegue iterativo para que la sociedad se adapte; renta básica y transición económica.'],
          ['La visión de Demis Hassabis', 'IA como instrumento científico definitivo (AlphaFold); AGI exigente hacia ~2030; cooperación internacional tipo CERN/AIEA.'],
          ['La visión de Yann LeCun', 'Los LLM no llevan a la inteligencia humana: sin mundo físico ni planificación. Modelos de mundo (JEPA) que aprendan de vídeo. Riesgos existenciales exagerados; abierto sin matices.'],
          ['La visión de Liang Wenfeng', 'Restricción: dejar valor a otros; apertura como cultura; investigar sobre vender; equipos jóvenes chinos; meta AGI sin prisa comercial.']
        ],
        resources: [
          { type: 'article', t: 'Dario Amodei: Machines of Loving Grace', u: 'https://darioamodei.com/machines-of-loving-grace', lang: 'EN', note: 'El ensayo optimista. Una hora de lectura que cambia la perspectiva.' },
          { type: 'article', t: 'Dario Amodei: The Adolescence of Technology', u: 'https://darioamodei.com/essay/the-adolescence-of-technology', lang: 'EN' },
          { type: 'article', t: 'Sam Altman: The Intelligence Age', u: 'https://ia.samaltman.com/', lang: 'EN' },
          { type: 'video', t: 'Ilya Sutskever: charla en NeurIPS 2024 ("el preentrenamiento como lo conocemos terminará")', u: 'https://www.youtube.com/watch?v=1yvBqasHLZs', lang: 'EN', min: 25 },
          { type: 'podcast', t: 'Dwarkesh Podcast: entrevistas largas con Amodei, Sutskever, Zuckerberg, Hassabis', u: 'https://www.dwarkesh.com/', lang: 'EN', note: 'El podcast donde los líderes hablan en profundidad. Empieza por el de Amodei.' },
          { type: 'article', t: 'Leopold Aschenbrenner: Situational Awareness (2024)', u: 'https://situational-awareness.ai/', lang: 'EN', note: 'El ensayo que popularizó la carrera geopolítica por la AGI hacia 2027. Polémico e influyente.' }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'ia-5-7', title: 'La economía de la IA: chips, energía, precios y márgenes', minutes: 16, level: 'avanzado',
        summary: 'La cadena de valor de arriba abajo, por qué Nvidia vale lo que vale, a dónde va el dinero, qué gana un laboratorio con cada token y si esto es una burbuja.',
        body: () => [
          B.lead('Para pensar como un ejecutivo del sector hay que seguir el dinero. La IA es una cadena de valor de cinco eslabones y en cada uno hay un cuello de botella, un dueño y un margen.'),
          B.h('La cadena de valor'),
          B.fig('<svg viewBox="0 0 640 130"><defs><marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="fg-arrowhead"/></marker></defs>' +
            [['Energía', 'GW, redes', 'fg-warn'], ['Chips', 'Nvidia, TSMC, HBM', 'fg-claude'], ['Nubes', 'Azure, AWS, GCP, Oracle', 'fg-box'], ['Modelos', 'Anthropic, OpenAI…', 'fg-brand'], ['Aplicaciones', 'Cursor, Maya, tú', 'fg-ok']].map((s, i) => '<rect x="' + (10 + i * 126) + '" y="30" width="116" height="70" rx="10" class="' + s[2] + '"/><text x="' + (68 + i * 126) + '" y="58" text-anchor="middle">' + s[0] + '</text><text x="' + (68 + i * 126) + '" y="80" text-anchor="middle" class="sm">' + s[1] + '</text>' + (i < 4 ? '<line x1="' + (126 + i * 126) + '" y1="65" x2="' + (136 + i * 126) + '" y2="65" class="fg-arrow"/>' : '')).join('') +
            '</svg>', 'Cinco eslabones. El dinero fluye de derecha a izquierda; hoy el margen se concentra en los chips.'),
          B.h('1. Energía: el cuello de botella nuevo'),
          B.p('Un centro de datos de IA de 1 GW consume como una ciudad de un millón de habitantes y cuesta 30.000-50.000 millones con los chips dentro. En EE. UU. la limitación es la red eléctrica: conseguir conexión puede tardar años. Respuestas: centrales de gas propias (xAI), acuerdos nucleares (Microsoft reabre Three Mile Island; Amazon y Google con reactores modulares), y construir en países con energía barata (Oriente Medio). Predicción del sector: para 2030 la IA podría consumir el 8-12 % de la electricidad de EE. UU.'),
          B.h('2. Chips: por qué Nvidia'),
          B.list([
            '<b>Hardware</b>: Nvidia diseña las GPU (Hopper H100/H200, Blackwell B200/GB200/GB300, Rubin en 2026); <b>TSMC</b> las fabrica en Taiwán (nodos de 4 y 3 nm; nadie más puede); <b>SK Hynix, Samsung y Micron</b> hacen la memoria HBM, escasa y cara.',
            '<b>Software</b>: <b>CUDA</b> (desde 2007) es el foso: todo el código de IA está escrito para ella. Cambiar de proveedor cuesta meses de ingeniería.',
            '<b>Sistemas</b>: Nvidia vende racks completos (NVL72: 72 GPU conectadas con NVLink) y redes (InfiniBand, tras comprar Mellanox). Un rack GB200 cuesta ~3 millones.',
            '<b>Márgenes brutos del 70-75 %</b>: una H100 cuesta fabricar unos 3.000-4.000 dólares y se vende por 25.000-40.000.',
            '<b>Competencia</b>: AMD (MI300X, MI350, MI400; acuerdo con OpenAI de 6 GW), Google TPU (alquiladas a Anthropic), Amazon Trainium (Anthropic), Microsoft Maia, Meta MTIA, OpenAI con Broadcom, y en China Huawei Ascend. Todos quieren reducir la dependencia; ninguno lo ha logrado del todo.'
          ]),
          B.h('3. Nubes: el capex'),
          B.p('Microsoft, Amazon, Google y Meta invertirán en conjunto más de 400.000 millones de dólares en 2026 en centros de datos, la mayor inversión industrial de la historia en tiempos de paz. Oracle, CoreWeave y otros construyen para OpenAI con deuda. El riesgo: si la demanda no crece como se espera, hay sobrecapacidad; si crece, hay escasez. Los inversores vigilan la relación entre capex e ingresos de IA cada trimestre.'),
          B.h('4. Modelos: precios, márgenes y la carrera hacia abajo'),
          B.table(['Modelo (sep 2026)', 'Entrada $/M', 'Salida $/M', 'Caché lectura'], [
            ['Claude Fable 5.1', '10', '50', '0,25'],
            ['Claude Opus 5', '5', '25', '0,50'],
            ['Claude Sonnet 5', '2', '10', '0,20'],
            ['Claude Haiku 4.5', '1', '5', '0,10'],
            ['DeepSeek V4-Pro', '~1,74', '—', '—'],
            ['Batch API (Anthropic)', '−50 %', '−50 %', '—']
          ], 'Los precios de inferencia han caído más de un 90 % por unidad de capacidad desde 2023, y a la vez el gasto total sube porque el uso se multiplica.'),
          B.p('¿Ganan dinero los laboratorios con la inferencia? Sí: se estima que el margen bruto de servir tokens es positivo (50-70 %) gracias al batching y a la caché. Lo que consume las pérdidas es el <b>entrenamiento</b> de la siguiente generación y el crecimiento. Anthropic y OpenAI proyectan beneficios hacia 2027-2029 si el gasto en cómputo se estabiliza; mientras, financian con rondas gigantes. El modelo de negocio es apostar a que cada modelo nuevo se paga con los ingresos del anterior más capital externo.'),
          B.h('5. Aplicaciones: donde se crea valor para el cliente'),
          B.p('El valor final se captura en las aplicaciones: Cursor pasó de 0 a más de 1.000 millones anualizados en tres años; Sierra, Harvey y Glean venden agentes especializados; miles de empresas como la tuya construyen internamente. La regla: <b>el margen de una aplicación es su valor menos el coste de tokens</b>. Maya cuesta unos 30 dólares al mes en tokens de Sonnet 5 a precio de API y sustituye horas de atención humana: ese es el arbitraje que toda la industria persigue. La amenaza para las aplicaciones es que los laboratorios suban de nivel (Claude Code compite con Cursor; Cowork con herramientas de automatización) y la oportunidad es el conocimiento del dominio y los datos propios, que un laboratorio no tiene.'),
          B.h('¿Burbuja?'),
          B.compare('Argumentos de burbuja', ['Capex de cientos de miles de millones frente a ingresos de decenas.', 'Financiación circular: Nvidia invierte en OpenAI, que compra chips a Nvidia; Oracle se endeuda para construir para OpenAI.', 'Valoraciones sin beneficios (SSI 32.000 M$ sin ingresos).', 'Comparaciones con la fibra óptica de 2000: infraestructura útil, inversores arruinados.'],
            'Argumentos en contra', ['Los ingresos crecen más rápido que en cualquier tecnología anterior (Anthropic ×5 en un año; OpenAI a decenas de miles de millones).', 'La demanda de inferencia supera la oferta: hay listas de espera de cómputo.', 'El valor económico medido (GDPval) es real y creciente.', 'Aunque haya corrección financiera, la tecnología queda, como la fibra.']),
          B.key('Pensar como ejecutivo del sector es seguir cinco cifras: gigavatios disponibles, GPU entregadas, capex de las nubes, precio por millón de tokens e ingresos anualizados de los laboratorios. Cuando una se mueve, las demás la siguen.'),
          B.check('¿Dónde se concentra hoy el mayor margen de la cadena de valor de la IA?', ['En las aplicaciones', 'En los chips (Nvidia, márgenes brutos del 70-75 %)', 'En la energía', 'En los modelos'], 1, 'Nvidia captura la mayor parte del beneficio mientras los laboratorios invierten en entrenar y las nubes en construir.'),
          B.cards([
            { icon: '⚡', title: 'Energía', html: 'El cuello de botella: 1 GW = una ciudad. Nuclear y gas vuelven.' },
            { icon: '💎', title: 'Nvidia', html: 'CUDA + TSMC + HBM + sistemas. 70-75 % de margen.' },
            { icon: '🏗️', title: 'Capex', html: '400.000 M$ en 2026 entre cuatro empresas.' },
            { icon: '📉', title: 'Precio por token', html: '−90 % desde 2023; el gasto total sube.' },
            { icon: '🎯', title: 'Aplicaciones', html: 'Valor − coste de tokens. Maya: 30 $/mes.' }
          ])
        ],
        quiz: [
          { q: '¿Cuál es el principal foso competitivo de Nvidia además del hardware?', o: ['Su marca', 'CUDA: el software para el que está escrito casi todo el código de IA', 'Sus tiendas', 'Sus centros de datos'], a: 1, why: 'Cambiar de proveedor obliga a reescribir y optimizar; por eso AMD, TPU y Trainium avanzan despacio.' },
          { q: 'Los laboratorios pierden dinero en cada token que sirven.', type: 'tf', a: false, why: 'El margen bruto de la inferencia se estima positivo (50-70 %). Las pérdidas vienen del entrenamiento de la siguiente generación y del crecimiento.' },
          { q: '¿Qué empresa fabrica físicamente las GPU de Nvidia?', type: 'fill', a: ['TSMC', 'tsmc', 'Taiwan Semiconductor'], why: 'TSMC, en Taiwán. Nadie más domina los nodos de 3-4 nm a escala.' },
          { q: 'El precio por token de la inferencia frontera desde 2023 ha…', o: ['subido un 50 %', 'caído más de un 90 % por unidad de capacidad, mientras el gasto total sube por el mayor uso', 'permanecido igual', 'caído un 10 %'], a: 1, why: 'Eficiencia + competencia. Paradoja de Jevons: más barato → mucho más uso.' },
          { q: '¿Qué proyección del sector se hace sobre el consumo eléctrico de la IA en EE. UU. para 2030?', o: ['<1 %', '8-12 % de la electricidad del país', '50 %', 'No consume electricidad relevante'], a: 1, why: 'Por eso la energía es el cuello de botella y vuelven la nuclear y el gas dedicados.' }
        ],
        cards: [
          ['La cadena de valor de la IA', 'Energía → chips (Nvidia/TSMC/HBM) → nubes (Azure, AWS, GCP, Oracle) → modelos (Anthropic, OpenAI, Google…) → aplicaciones (Cursor, Maya). El margen hoy se concentra en los chips.'],
          ['¿Por qué Nvidia domina?', 'GPU líderes + CUDA (foso de software desde 2007) + sistemas completos (NVL72, InfiniBand) + acceso prioritario a TSMC y HBM. Márgenes brutos del 70-75 %.'],
          ['¿Ganan dinero los laboratorios?', 'La inferencia tiene margen bruto positivo (50-70 %) gracias a batching y caché; las pérdidas vienen de entrenar la siguiente generación. Beneficios proyectados hacia 2027-29.'],
          ['Precios de Claude (sep 2026), $/M tokens entrada/salida', 'Fable 5.1: 10/50 (caché 0,25). Opus 5: 5/25. Sonnet 5: 2/10. Haiku 4.5: 1/5. Batch: −50 %.'],
          ['El debate de la burbuja', 'A favor: capex enorme vs ingresos, financiación circular, valoraciones sin beneficios. En contra: ingresos que crecen más rápido que nunca, demanda de inferencia > oferta, valor económico medible.']
        ],
        resources: [
          { type: 'article', t: 'Epoch AI: datos de hardware, cómputo y costes', u: 'https://epoch.ai/data', lang: 'EN' },
          { type: 'article', t: 'SemiAnalysis (Dylan Patel): análisis de chips y centros de datos', u: 'https://semianalysis.com/', lang: 'EN', note: 'La fuente que leen los ejecutivos para entender la cadena de suministro. Parte gratuita, parte de pago.' },
          { type: 'book', t: 'Chris Miller: Chip War (La guerra de los chips)', u: 'https://www.simonandschuster.com/books/Chip-War/Chris-Miller/9781982172008', lang: 'EN', note: 'La historia de los semiconductores y por qué Taiwán importa. Hay edición en español.' },
          { type: 'article', t: 'Anthropic: precios de la API', u: 'https://platform.claude.com/docs/en/about-claude/pricing', lang: 'EN' },
          { type: 'article', t: 'Stanford AI Index: capítulo de economía', u: 'https://aiindex.stanford.edu/', lang: 'EN' }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'ia-5-8', title: 'Abierto vs cerrado y la geopolítica de la IA', minutes: 13, level: 'avanzado',
        summary: 'Los argumentos de cada bando, los controles de exportación de chips, la carrera EE. UU.-China y qué significa "soberanía de IA" para un país o una empresa.',
        body: () => [
          B.lead('La IA se ha convertido en el terreno central de la competencia entre EE. UU. y China, y el debate abierto/cerrado ya no es técnico: es de seguridad nacional, de poder y de negocio.'),
          B.h('El debate abierto vs cerrado'),
          B.compare('A favor de abrir los pesos', ['Transparencia y auditoría: se puede estudiar el modelo.', 'Innovación distribuida: miles de derivados, investigación académica, países sin laboratorios frontera.', 'Independencia: no depender de un proveedor ni de sus precios o políticas.', 'Seguridad por escrutinio (argumento de LeCun): más ojos encuentran más fallos.', 'Soberanía: correr el modelo en tu territorio con tus datos.'],
            'A favor de mantenerlos cerrados', ['Una vez publicados, no hay marcha atrás: cualquier salvaguarda se elimina con fine-tuning en horas.', 'Capacidades peligrosas (bio, ciber) disponibles para cualquier actor. Mythos Preview es el caso: nadie discute que no debía ser abierto.', 'Los controles de exportación de chips pierden sentido si los modelos entrenados con ellos se regalan.', 'Negocio: el modelo es el activo.', 'Responsabilidad: quién responde si un derivado causa daño.']),
          B.p('Posición de consenso en 2026: los modelos <b>por debajo de la frontera</b> se abren cada vez más (gpt-oss, Gemma, Llama, Qwen, DeepSeek) y los de la <b>frontera</b> se mantienen cerrados, con la excepción de China, que abre casi todo. La brecha abierto/cerrado se estima en 6-12 meses en benchmarks y mayor en agentes largos y fiabilidad.'),
          B.h('Controles de exportación: la palanca de EE. UU.'),
          B.olist([
            '<b>Octubre de 2022</b>: EE. UU. prohíbe vender a China los chips más avanzados (A100/H100). Nvidia crea versiones recortadas (A800/H800).',
            '<b>Octubre de 2023</b>: se cierran los huecos; H800 también prohibida. Nvidia diseña la H20, aún más recortada.',
            '<b>Enero de 2025</b>: la "regla de difusión" de Biden divide el mundo en tres niveles de acceso a chips; la administración Trump la revoca en mayo y negocia país por país (acuerdos con Emiratos y Arabia Saudí para centros de datos gigantes).',
            '<b>2025-2026</b>: idas y vueltas con la H20 (prohibida en abril, permitida con una tasa del 15 % en agosto, rechazada por Pekín que empuja Huawei), y debate sobre permitir versiones de Blackwell. DeepSeek muestra que los controles frenan pero no detienen; Anthropic los defiende públicamente como la medida más eficaz para mantener la ventaja democrática.'
          ]),
          B.h('La respuesta de China'),
          B.list([
            '<b>Huawei Ascend 910B/910C</b> y clústeres CloudMatrix: menos eficientes por chip, compensados con más chips y energía barata. Problemas de software y rendimiento (la prensa reportó dificultades de DeepSeek para entrenar en ellos).',
            '<b>SMIC</b> fabrica a 7 nm sin las máquinas EUV de ASML (prohibidas); avanza más lento y más caro.',
            '<b>Estrategia abierta</b>: Qwen, DeepSeek, Kimi, GLM ganan adopción global y fijan estándares.',
            '<b>Energía</b>: China añade más capacidad eléctrica al año que toda la red de algunos países europeos; su cuello de botella son los chips, no la electricidad, al revés que EE. UU.'
          ]),
          B.h('Soberanía de IA'),
          B.p('Gobiernos y empresas hablan de <b>soberanía</b>: capacidad de correr IA con datos, modelos y cómputo bajo su control. Europa (Mistral, nubes europeas, la "AI Gigafactories" de la UE), Oriente Medio (Emiratos con G42 y Falcon; Arabia Saudí con Humain), India, Japón y Corea invierten en cómputo nacional. Para una empresa como la tuya, soberanía significa una decisión práctica: ¿tus datos de distribuidores pueden ir a una API en EE. UU.? Normalmente sí, con acuerdos de retención cero y cifrado; si no, un modelo abierto en tu servidor (Hetzner con GPU) es la alternativa, más cara de operar.'),
          B.h('Taiwán'),
          B.p('El 90 % de los chips avanzados del mundo se fabrican en TSMC, en una isla que China reclama. Es el mayor riesgo geopolítico de la industria: un bloqueo o un conflicto detendría la IA global durante años. Por eso TSMC construye fábricas en Arizona (con subsidios de la ley CHIPS), Japón y Alemania, aunque los nodos más avanzados siguen en Taiwán.'),
          B.key('La IA es hoy política industrial y de seguridad. Los tres actores que hay que seguir: Washington (controles, subsidios, acuerdos), Pekín (Huawei, apertura, energía) y Taiwán (TSMC). Y una regla para tu empresa: elige proveedores que te permitan cambiar; la geopolítica puede mover precios y disponibilidad de un día para otro.'),
          B.check('¿Por qué los controles de exportación de chips y los modelos de pesos abiertos están en tensión?', ['No lo están', 'Porque si los modelos entrenados con chips restringidos se publican abiertos, cualquier país puede usarlos sin tener los chips', 'Porque los modelos abiertos necesitan más chips', 'Porque China no usa modelos abiertos'], 1, 'Es el argumento central de quienes piden cautela con la apertura en la frontera.'),
          B.cards([
            { icon: '🔓', title: 'Abierto bajo la frontera', html: 'Cerrado en la frontera, salvo China.' },
            { icon: '🚧', title: 'Controles', html: '2022, 2023, 2025: la palanca de EE. UU.; frenan, no detienen.' },
            { icon: '🇨🇳', title: 'Huawei + apertura', html: 'La respuesta china: más chips propios y pesos abiertos.' },
            { icon: '🏝️', title: 'Taiwán', html: '90 % de los chips avanzados. El mayor riesgo.' }
          ])
        ],
        quiz: [
          { q: 'La posición de consenso en 2026 sobre abierto vs cerrado es…', o: ['todo abierto', 'todo cerrado', 'abrir los modelos por debajo de la frontera y mantener cerrados los de la frontera, salvo China que abre casi todo', 'prohibir los modelos abiertos'], a: 2, why: 'gpt-oss, Gemma, Llama por un lado; Fable, GPT-6, Gemini Pro cerrados; DeepSeek y Qwen abiertos en la frontera.' },
          { q: 'Los controles de exportación de chips a China empezaron en…', o: ['2015', 'octubre de 2022', 'enero de 2025', '2026'], a: 1, why: 'Prohibición de A100/H100; después se cerraron huecos en 2023 y se reformuló en 2025.' },
          { q: 'El cuello de botella de China en IA es la electricidad, como en EE. UU.', type: 'tf', a: false, why: 'Al revés: China tiene energía abundante; su límite son los chips avanzados (sin EUV de ASML, Huawei menos eficiente).' },
          { q: '¿Qué empresa fabrica el ~90 % de los chips avanzados del mundo y dónde?', type: 'fill', a: ['TSMC en Taiwán', 'TSMC', 'tsmc', 'TSMC, Taiwán', 'tsmc taiwan'], why: 'TSMC, en Taiwán. El mayor riesgo geopolítico del sector.' },
          { q: 'Para una empresa, "soberanía de IA" significa en la práctica…', o: ['tener un laboratorio propio', 'decidir dónde viven sus datos y modelos: API con retención cero y cifrado, o un modelo abierto en su propio servidor', 'usar solo modelos chinos', 'no usar IA'], a: 1, why: 'Es una decisión de control y coste, no de patriotismo.' }
        ],
        cards: [
          ['Argumentos a favor de abrir los pesos', 'Transparencia y auditoría, innovación distribuida, independencia del proveedor, seguridad por escrutinio, soberanía.'],
          ['Argumentos a favor de mantenerlos cerrados', 'Irreversibilidad (las salvaguardas se quitan con fine-tuning), capacidades peligrosas para cualquier actor, coherencia con los controles de chips, negocio, responsabilidad.'],
          ['Cronología de los controles de exportación', '2022: prohibición A100/H100 → 2023: cierre de huecos (H800) → 2025: regla de difusión revocada, acuerdos país por país, idas y vueltas con H20 → 2026: debate sobre Blackwell recortado.'],
          ['La respuesta china', 'Huawei Ascend y CloudMatrix (más chips, menos eficientes), SMIC a 7 nm sin EUV, pesos abiertos como estrategia (Qwen, DeepSeek), energía abundante.'],
          ['¿Por qué importa Taiwán?', 'TSMC fabrica ~90 % de los chips avanzados. Un conflicto detendría la IA global años. Fábricas en Arizona, Japón y Alemania mitigan poco: lo más avanzado sigue en Taiwán.']
        ],
        resources: [
          { type: 'book', t: 'Chris Miller: Chip War', u: 'https://www.simonandschuster.com/books/Chip-War/Chris-Miller/9781982172008', lang: 'EN' },
          { type: 'article', t: 'Anthropic: postura sobre controles de exportación', u: 'https://www.anthropic.com/news/securing-america-s-compute-advantage-anthropic-s-position-on-the-diffusion-rule', lang: 'EN' },
          { type: 'article', t: 'CSIS: análisis de controles de exportación de chips (Gregory Allen)', u: 'https://www.csis.org/programs/wadhwani-ai-center', lang: 'EN' },
          { type: 'podcast', t: 'ChinaTalk (Jordan Schneider): IA y China', u: 'https://www.chinatalk.media/', lang: 'EN', note: 'El mejor seguimiento del ecosistema chino de IA en inglés.' }
        ]
      }
    ]
  };
})();
