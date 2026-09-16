/* Manual de Claude · Módulo 3: Claude.ai como profesional. */
(function () {
  'use strict';
  const B = EX.B;
  EX.MOD = EX.MOD || {};

  EX.MOD['cl-3'] = {
    id: 'cl-3', icon: '💬', title: 'Claude.ai como profesional: Proyectos, Cowork, conectores y rutinas',
    desc: 'Todo lo que la app de Claude puede hacer por un director general más allá del chat: Proyectos y memoria, artefactos, Skills, conectores, Cowork, Chrome, Slack, Excel y tareas programadas. Y cómo dárselo a tu equipo.',
    goals: [
      'Organizar tu trabajo en Proyectos con instrucciones y documentos, y usar la memoria a tu favor.',
      'Crear artefactos y Skills, y conectar Claude a Drive, Gmail, Calendar, Slack, Notion y GitHub.',
      'Delegar tareas completas a Cowork y a Claude en Chrome, con tareas programadas.',
      'Diseñar cómo usará Claude tu equipo (Team, Slack, Excel) con permisos por rol.'
    ],
    lessons: [
      /* ------------------------------------------------------------------ */
      {
        id: 'cl-3-1', title: 'Proyectos, memoria y artefactos', minutes: 13, level: 'básico',
        summary: 'Cómo organizar tu uso del chat para que Claude tenga siempre el contexto correcto: un Proyecto por área, memoria editable y artefactos que se publican y comparten.',
        body: () => [
          B.lead('Usas artefactos y la memoria; los Proyectos son la pieza que organiza todo. Un Proyecto por área de tu vida profesional hace que cada conversación empiece sabiendo dónde está.'),
          B.h('Proyectos: un contexto por área'),
          B.p('Un <b>Proyecto</b> reúne conversaciones que comparten <b>instrucciones</b> (tu CLAUDE.md del chat) y <b>documentos</b> de referencia (PDF, hojas, textos) que Claude puede consultar. Todo lo que hables dentro hereda ese contexto. Los Proyectos recomendados para ti:'),
          B.table(['Proyecto', 'Instrucciones (resumen)', 'Documentos'], [
            ['<b>RRB · Dirección</b>', 'Quién eres, cifras clave del negocio, reglas de cumplimiento, formato de informes (estructura fija), tono directo', 'Plan de compensación, documento maestro exportado, últimos informes'],
            ['<b>RRB · Producto y contenido</b>', 'Líneas rojas de claims, tono de marca, formato de guiones y plantillas', 'Fichas de los 8 productos, ejemplos de guiones aprobados'],
            ['<b>Maya</b> (dirección, no código)', 'Qué es Maya, sus reglas, qué preguntas hacer al diagnosticar', 'Manual de facts, taxonomía de causas'],
            ['<b>Atlas</b>', 'Contexto del motor, marco legal MiCA, cero promesas de rendimiento', 'Retrospectivas, especificaciones'],
            ['<b>Carrera y aprendizaje</b>', 'Plan a 90 días, rol de manager de carrera, este curso', 'Perfil, notas de Expertia']
          ]),
          B.tip('Las instrucciones del Proyecto, cortas: quién, qué negocio, qué reglas, qué formato. Los documentos: lo que cambia poco. Lo que cambia cada semana (cifras) lo pegas en el mensaje. Cuando algo del Proyecto se vuelve regla de código, promuévelo al CLAUDE.md del repo.'),
          B.h('Memoria: qué recuerda y cómo controlarla'),
          B.p('Desde marzo de 2026 la <b>memoria</b> está disponible para todos: Claude resume tus conversaciones anteriores y lleva esos resúmenes a las nuevas (dentro y fuera de Proyectos, según configuración). Puedes verla y editarla en Ajustes → Capacidades → Memoria, borrar entradas y desactivarla. Buenas prácticas:'),
          B.list([
            'Revísala una vez al mes: borra lo obsoleto ("estamos en fase 2 de la capa móvil") y corrige lo erróneo.',
            'Si quieres que recuerde algo, dilo explícitamente: "recuerda que a partir de ahora los informes van en formato X".',
            'Para temas sensibles o de terceros, usa un chat sin memoria (incógnito) o desactívala en ese Proyecto.',
            'La memoria de claude.ai y la memoria automática de Claude Code son <b>sistemas distintos</b>: la del chat no llega a la terminal ni al revés (salvo lo que tú copies a CLAUDE.md o a un documento).'
          ]),
          B.h('Artefactos: de respuesta a herramienta'),
          B.p('Un <b>artefacto</b> es un contenido que Claude crea en un panel aparte: documento, tabla, diagrama, presentación, página web interactiva o pequeña aplicación. En 2026 los artefactos <b>se publican</b> en una URL privada por defecto, se pueden compartir con el equipo, pueden <b>leer datos en vivo</b> (una API tuya), <b>recordar lo que la gente hace</b> en ellos y recibir <b>comentarios</b> que Claude lee. Tu panel personal (BTC/ETH + ventas + regalías) y el tablero de Internet son candidatos naturales: artefactos con datos vivos, compartibles con Edna y Mónica.'),
          B.ex('Un artefacto útil en cinco minutos', [
            B.p('"Hazme un artefacto con la tabla de opciones de la propuesta de reactivación (A/B/C), con una maqueta simple de la pantalla y un botón para que yo marque la opción elegida y deje un comentario". Claude produce una página; la publicas; la abres desde el teléfono; eliges B; Claude lo lee en la siguiente conversación. Decidir sobre una maqueta en vez de sobre un párrafo es tu forma de decidir.')
          ]),
          B.h('Archivos, voz y búsqueda'),
          B.list([
            '<b>Archivos</b>: PDF (con imágenes), Excel/CSV, Word, imágenes, código. Claude los lee, analiza y puede crear <b>archivos nuevos</b> (Excel con fórmulas, Word, PowerPoint, PDF) en la conversación.',
            '<b>Dictado</b>: la forma más rápida de darle contexto largo desde el teléfono; los dedazos desaparecen. Modo voz para conversar.',
            '<b>Búsqueda web</b> con citas, y modo <b>investigación</b> para informes largos con fuentes: úsalo para evaluar proveedores, normativa o competidores.'
          ]),
          B.key('Proyectos = contexto permanente por área. Memoria = continuidad entre conversaciones, revisable. Artefactos = resultados que viven, se comparten y reciben datos y comentarios. Con eso, el chat deja de ser una hoja en blanco cada vez.'),
          B.check('¿Dónde deben vivir las reglas de cumplimiento de claims para que apliquen a todas tus conversaciones de contenido?', ['En cada mensaje', 'En las instrucciones del Proyecto "Producto y contenido"', 'En la memoria, esperando que la recuerde', 'En un artefacto'], 1, 'Instrucciones del Proyecto: el system prompt del chat. Se aplican a todas las conversaciones del Proyecto.'),
          B.cards([
            { icon: '📁', title: 'Proyectos', html: 'Instrucciones + documentos por área. Tu CLAUDE.md del chat.' },
            { icon: '🧠', title: 'Memoria', html: 'Revisable en Ajustes; distinta de la de Claude Code.' },
            { icon: '🧩', title: 'Artefactos', html: 'Se publican, comparten, leen datos vivos, reciben comentarios.' },
            { icon: '🎙️', title: 'Dictado', html: 'Contexto largo desde el teléfono sin dedazos.' }
          ])
        ],
        quiz: [
          { q: 'Un Proyecto en claude.ai reúne…', o: ['solo conversaciones', 'conversaciones que comparten instrucciones permanentes y documentos de referencia', 'archivos de código', 'contactos'], a: 1, why: 'El contexto permanente por área. Uno por área de tu negocio.' },
          { q: 'La memoria de claude.ai y la memoria automática de Claude Code…', o: ['son el mismo sistema', 'son sistemas distintos que no se comunican salvo lo que copies a mano', 'se sincronizan cada noche', 'no existen'], a: 1, why: 'Lo que quieras en ambos lados va a CLAUDE.md o a un documento.' },
          { q: 'Los artefactos de 2026 pueden leer datos en vivo de una API tuya y recibir comentarios que Claude lee.', type: 'tf', a: true, why: 'Se publican en URL privada, se comparten y pueden guardar estado. Ideal para el panel personal y el tablero de Internet.' },
          { q: '¿Qué debe ir en el mensaje y no en el Proyecto?', o: ['Las reglas de cumplimiento', 'Lo que cambia cada semana: las cifras del día, el caso concreto', 'El plan de compensación', 'El tono de marca'], a: 1, why: 'El Proyecto guarda lo estable; el mensaje, lo de hoy.' }
        ],
        cards: [
          ['¿Qué es un Proyecto en claude.ai y cómo usarlo?', 'Espacio con instrucciones permanentes y documentos que comparten todas sus conversaciones. Uno por área (Dirección, Producto, Maya, Atlas, Carrera). Instrucciones cortas; documentos estables; lo de hoy en el mensaje.'],
          ['¿Cómo funciona la memoria de claude.ai?', 'Resume conversaciones anteriores y las lleva a las nuevas. Editable en Ajustes → Capacidades → Memoria. Revisar mensualmente. Distinta de la memoria de Claude Code.'],
          ['¿Qué puede hacer un artefacto en 2026?', 'Documentos, tablas, diagramas, páginas y apps; se publican en URL privada, se comparten, leen datos en vivo, guardan lo que hace la gente y reciben comentarios que Claude lee.']
        ],
        resources: [
          { type: 'doc', t: 'Claude.ai: Proyectos', u: 'https://support.claude.com/en/articles/9517075-what-are-projects', lang: 'EN' },
          { type: 'doc', t: 'Claude.ai: Memoria', u: 'https://www.anthropic.com/news/memory', lang: 'EN' },
          { type: 'doc', t: 'Claude Code: Artifacts (publicar y compartir)', u: 'https://code.claude.com/docs/en/artifacts', lang: 'EN' },
          { type: 'article', t: 'Anthropic: crear archivos (Excel, Word, PowerPoint, PDF) con Claude', u: 'https://www.anthropic.com/news/create-files', lang: 'EN' }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'cl-3-2', title: 'Conectores, Skills y Cowork', minutes: 15, level: 'intermedio',
        summary: 'Conectar Claude a Drive, Gmail, Calendar, Slack, Notion y GitHub; crear Skills reutilizables; y delegar tareas completas de oficina al modo Cowork del escritorio.',
        body: () => [
          B.lead('Aquí está el salto del chat al agente de oficina: Claude que lee tu Drive, manda correos, abre hojas de cálculo y trabaja mientras haces otra cosa.'),
          B.h('Conectores (MCP): Claude con acceso a tus herramientas'),
          B.p('Los <b>conectores</b> son integraciones basadas en el protocolo MCP (módulo 6) que dan a Claude herramientas para leer y actuar en servicios: Google Drive, Gmail, Calendar, Slack, Notion, GitHub, Microsoft 365, Linear, Asana, Canva, Stripe y más de 38 en 2026. Se activan en Ajustes → Conectores, con autorización OAuth (tú das permiso, puedes revocarlo) y funcionan en web, escritorio, móvil y Chrome.'),
          B.table(['Conector', 'Para qué te sirve'], [
            ['<b>Google Drive / Sheets</b>', 'Que los informes salgan directamente a la hoja que ya usan Edna y Mónica; leer hojas de inventario de los centros'],
            ['<b>Gmail</b>', 'Resumir el correo del día, redactar respuestas a proveedores, buscar el hilo con la paquetería'],
            ['<b>Calendar</b>', 'Preparar la semana, agendar los Zooms de la Academia con hora (adiós al [HORA])'],
            ['<b>Slack</b>', 'Si el equipo usa Slack: leer y publicar en canales; también vía Claude Tag'],
            ['<b>GitHub</b>', 'Ver PRs y revisiones de tus cuatro repos desde el chat; complementa a Claude Code'],
            ['<b>Notion / Docs</b>', 'Si documentas ahí: base de conocimiento consultable']
          ]),
          B.warn('Cada conector es acceso. Da solo los que necesites, revisa los permisos concedidos y recuerda la lección de inyección de prompts (curso 6.6): un correo o un documento pueden contener instrucciones maliciosas. Claude pide confirmación en acciones sensibles (enviar, borrar, pagar); no la desactives.'),
          B.h('Skills: tus procedimientos, reutilizables'),
          B.p('Una <b>Skill</b> es un conjunto de instrucciones (y opcionalmente archivos y scripts) que Claude aplica cuando la tarea encaja o cuando la invocas. Es la misma idea que las Skills de Claude Code (módulo 4), disponible en la app. Anthropic ofrece Skills prediseñadas (crear Excel con fórmulas, presentaciones, documentos con formato) y tú puedes crear las tuyas. Candidatas para RRB:'),
          B.list([
            '<b>Informe semanal RRB</b>: la estructura fija del prompt de la lección 2.5, con las fuentes (hoja de Drive) y el formato.',
            '<b>Guion de vídeo con cumplimiento</b>: las líneas rojas, el formato de tabla, la lista de frases descartadas.',
            '<b>Plantilla WhatsApp para Meta</b>: reglas de categoría, variables, longitud.',
            '<b>Evaluación de proveedor</b>: el prompt del auditor externo.',
            '<b>Estilo RRB</b>: tono, glosario (CD, OV, voucher, Tránsito/Ruta), qué nunca decir.'
          ]),
          B.p('Las Skills se comparten con el equipo en un plan Team: así Edna produce el informe con la misma estructura que tú, sin conocer el prompt.'),
          B.h('Cowork: el agente de oficina'),
          B.p('<b>Cowork</b> es el modo agente de la app de escritorio (desde enero de 2026): le das una tarea larga y trabaja en segundo plano con acceso a las carpetas locales que autorices, a los conectores y, si hace falta, al navegador (Claude en Chrome) o a la pantalla. Su estrategia es fija: primero <b>conectores</b> (rápidos y fiables), luego <b>navegador</b> si no hay conector, y por último <b>control de pantalla</b>. Puedes ver lo que hace, interrumpir y corregir.'),
          B.steps('Una tarea de Cowork de principio a fin', [
            'Le pides: "Con la hoja de inventario de los 23 centros (Drive) y la exportación de ventas de septiembre (carpeta Descargas), prepárame un Excel con el stock en días por producto y centro, marca en rojo los que bajan de 15 días, y un resumen de tres líneas para mandar a los centros por correo".',
            'Cowork abre la hoja por el conector de Drive, lee el CSV local, calcula (con código, no de memoria) y crea el Excel con fórmulas y formato condicional.',
            'Redacta el resumen y prepara el correo en Gmail, <b>sin enviarlo</b>: te lo muestra para aprobar.',
            'Lo revisas en el teléfono, ajustas una línea, apruebas. Se envía. Todo quedó en tu Drive.',
            'Si lo quieres cada lunes a las 7:00, lo conviertes en <b>tarea programada</b> (siguiente lección) y solo te llega para aprobar.'
          ]),
          B.h('Claude en Chrome dentro de Cowork'),
          B.p('La extensión de Chrome es ahora un cliente de Cowork: comparte sesiones, Skills y conectores con el escritorio, web y móvil. Sirve para lo que no tiene API: el portal de la paquetería, un banco, un formulario de gobierno. Navega, lee, rellena y pide confirmación antes de pagar o enviar. Es computer use (curso 2.8) en tu navegador, con tus sesiones iniciadas.'),
          B.key('Conectores dan acceso; Skills dan procedimiento; Cowork ejecuta tareas largas con ambos. La combinación convierte el chat en un asistente de oficina que trabaja mientras tú diriges. Empieza por un conector (Drive) y una Skill (informe semanal).'),
          B.check('Quieres que el informe semanal salga siempre igual y que Edna pueda producirlo. ¿Qué usas?', ['Un prompt que le pasas por WhatsApp cada semana', 'Una Skill "Informe semanal RRB" compartida en el plan Team, con el conector de Drive para leer la hoja', 'Un artefacto', 'La memoria'], 1, 'Skill = procedimiento reutilizable y compartible; conector = acceso a la fuente.'),
          B.cards([
            { icon: '🔌', title: 'Conectores', html: 'Drive, Gmail, Calendar, Slack, GitHub, Notion… vía MCP con OAuth.' },
            { icon: '🧾', title: 'Skills', html: 'Procedimientos reutilizables y compartibles con el equipo.' },
            { icon: '🖥️', title: 'Cowork', html: 'Tareas largas: conectores → navegador → pantalla. Con aprobación.' },
            { icon: '🌐', title: 'Chrome', html: 'Portales sin API, con tus sesiones y confirmación.' }
          ])
        ],
        quiz: [
          { q: 'Los conectores de Claude.ai se basan en…', o: ['correo electrónico', 'el protocolo MCP con autorización OAuth', 'macros de Excel', 'un plugin de Chrome'], a: 1, why: 'Más de 38 servicios en 2026; permisos revocables; funcionan en web, escritorio, móvil y Chrome.' },
          { q: 'El orden de estrategia de Cowork para completar una tarea es…', o: ['pantalla → navegador → conectores', 'conectores → navegador (Chrome) → control de pantalla', 'solo navegador', 'al azar'], a: 1, why: 'Lo más fiable y rápido primero.' },
          { q: 'Una Skill es un prompt que solo funciona una vez.', type: 'tf', a: false, why: 'Es un procedimiento reutilizable que Claude aplica cuando encaja o cuando lo invocas, compartible con el equipo.' },
          { q: 'Antes de enviar un correo redactado por Cowork, lo correcto es…', o: ['dejar que lo envíe solo', 'que te lo muestre para aprobar', 'imprimirlo', 'reenviarlo a Claude Code'], a: 1, why: 'Acciones irreversibles con confirmación humana. No desactives esa protección.' }
        ],
        cards: [
          ['¿Qué son los conectores de Claude.ai?', 'Integraciones MCP con OAuth que dan a Claude herramientas para leer y actuar en Drive, Gmail, Calendar, Slack, GitHub, Notion, Microsoft 365 y 38+ servicios. Dar solo los necesarios; confirmación en acciones sensibles.'],
          ['¿Qué es una Skill en Claude.ai?', 'Instrucciones (y archivos/scripts) que Claude aplica cuando la tarea encaja o al invocarla. Reutilizable y compartible en Team. Candidatas RRB: informe semanal, guion con cumplimiento, plantilla Meta, evaluación de proveedor.'],
          ['¿Qué es Cowork y cómo trabaja?', 'Modo agente de la app de escritorio (2026) para tareas largas con carpetas locales, conectores, navegador y pantalla. Estrategia: conectores → Chrome → pantalla. Se puede observar, interrumpir y programar.']
        ],
        resources: [
          { type: 'doc', t: 'Claude.ai: Conectores y MCP (centro de ayuda)', u: 'https://support.claude.com/en/articles/11175166-getting-started-with-custom-connectors-using-remote-mcp', lang: 'EN' },
          { type: 'article', t: 'Anthropic: Skills en Claude', u: 'https://www.anthropic.com/news/skills', lang: 'EN' },
          { type: 'article', t: 'Anthropic: Claude Cowork', u: 'https://claude.com/cowork', lang: 'EN' },
          { type: 'article', t: 'Anthropic: Claude for Chrome', u: 'https://www.anthropic.com/news/claude-for-chrome', lang: 'EN' }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'cl-3-3', title: 'Rutinas programadas, Slack y Excel: Claude trabaja cuando tú no', minutes: 12, level: 'intermedio',
        summary: 'Tareas programadas en escritorio y en la nube, Claude en Slack para el equipo, Claude en Excel y PowerPoint, y el resumen de pagos que te llega solo cada mañana.',
        body: () => [
          B.lead('"Que Claude trabaje mientras yo no estoy" es la etapa 2 de tu plan. En 2026 hay tres formas de programar a Claude sin escribir código, y una con código para lo que toca tu sistema.'),
          B.h('Las cuatro formas de programar a Claude'),
          B.table(['Forma', 'Dónde corre', 'Para qué', 'Ejemplo'], [
            ['<b>Tareas programadas de Cowork</b>', 'Tu Mac (debe estar encendido)', 'Tareas de oficina con tus archivos y conectores', 'Lunes 7:00: informe semanal desde la hoja de Drive, borrador de correo para aprobar'],
            ['<b>Rutinas de Claude Code en la nube</b>', 'Infraestructura de Anthropic (claude.ai/code)', 'Tareas sobre tus repos y APIs, sin tu ordenador', 'Cada día 4 y 14 a las 8:00: corte de regalías por pagar llamando al endpoint del panel personal y resumen por WhatsApp'],
            ['<b>/loop en una sesión de Claude Code</b>', 'Tu sesión abierta', 'Repetir una comprobación mientras trabajas', '/loop 10m "revisa si el deploy _pt_ ya responde 200 y avísame"'],
            ['<b>Cron + Agent SDK / API</b>', 'Tu servidor (Hetzner)', 'Procesos de producción con acceso directo a la base de datos', 'Los workers de Maya: matcher de pagos cada 10 min, juez nocturno a las 3:15']
          ]),
          B.key('Regla de reparto: si toca <b>tu ordenador o tus archivos</b>, Cowork. Si toca <b>repos y APIs</b> y quieres que corra sin tu Mac, Rutina en la nube. Si es <b>producción con base de datos</b>, worker en el servidor. /loop es para la sesión en curso.'),
          B.ex('La rutina de la mañana: pagos sin vincular y pedidos abiertos', [
            B.p('Objetivo (de tu etapa 2): cada día a las 7:30 recibir un resumen de pagos sin vincular y pedidos abiertos sin pedirlo.'),
            B.olist([
              'Fuente: el endpoint <code>panel-personal.php</code> ya arma ventas, regalías, transacciones por centro y pendientes de Maya. Si hace falta, se añade un endpoint de solo lectura que devuelva <code>pagos_recibidos</code> con <code>status=0</code> y las notas 7/8 y 10/11 pendientes con su antigüedad.',
              'Rutina en Claude Code (nube) con acceso al repo y una variable de entorno con un token de solo lectura (nunca en el prompt ni en el repo). Prompt: "Llama al endpoint, calcula: pagos sin vincular (nº, importe total, los 3 más antiguos con folio y días), pedidos abiertos por estado, comparación con ayer. Resume en 8 líneas. Si algo supera [umbral], márcalo con ⚠️. Envía el resumen por [canal]".',
              'Canal: WhatsApp a tu número vía la plantilla que ya usa el digest nocturno de Maya, o correo, o un artefacto que se actualiza.',
              'Prueba manual dos días; ajusta umbrales; activa el horario. A partir de ahí, solo lees.'
            ]),
            B.p('Coste: unos céntimos al día. Valor: ver cada mañana lo que antes descubrías cuando un distribuidor se quejaba.')
          ]),
          B.h('Claude en Slack: el conocimiento sale de tu cabeza'),
          B.p('<b>Claude en Slack</b> (Claude Tag) permite que el equipo pregunte a Claude en un canal o por mensaje directo, con acceso a los Proyectos y conectores que autorices y con permisos por persona. Es la respuesta a tu prioridad número uno del plan de continuidad: que Edna, Mónica y los centros puedan consultar pedidos, reglas y reportes sin depender de ti. Empieza con un canal <code>#consultas-rrb</code> conectado al Proyecto de Dirección (documentos de reglas) y a un endpoint de solo lectura; sin acceso a nada que escriba.'),
          B.h('Claude en Excel y PowerPoint'),
          B.p('Complementos que ponen a Claude dentro de la hoja o la presentación: explica fórmulas, construye modelos, limpia datos, genera diapositivas a partir de un documento. Para los centros que viven en Excel, es la forma menos disruptiva de darles IA: no cambian de herramienta. Y para ti, convertir el informe de dirección en una presentación para la reunión de líderes es un mensaje.'),
          B.h('Diseñar el acceso del equipo'),
          B.table(['Persona / rol', 'Superficie', 'Acceso', 'Nunca'], [
            ['Tú (dirección)', 'Todo: escritorio, Code, Cowork, Chrome, API', 'Total', '—'],
            ['Edna, Mónica (operación)', 'Team: chat con Proyectos compartidos + Slack + Excel', 'Documentos de reglas, informes, endpoint de solo lectura, Skills de informes', 'Escribir en la base, desplegar, secretos'],
            ['Centros de distribución', 'Slack (canal) o WhatsApp vía Maya/Max', 'Consultas de pedidos y reglas', 'Datos de otros centros, regalías individuales'],
            ['Distribuidores', 'Maya', 'Lo suyo, verificado por identidad', 'Nada del admin']
          ]),
          B.warn('Nada de esto envía nada a producción sin ti. Las rutinas y los agentes del equipo trabajan en <b>modo lectura y propuesta</b>: leen, calculan, redactan, avisan. Escribir (liquidar un pago, cambiar una cuenta) sigue pasando por tus flujos con confirmación. Es la frontera que da confianza a todos, como ya ocurre con el endpoint de diagnóstico de solo lectura de Maya.'),
          B.check('Quieres el corte de regalías por pagar cada día 4 y 14 sin que tu Mac esté encendido. ¿Qué forma de programación usas?', ['Tarea programada de Cowork', 'Rutina de Claude Code en la nube que llama a un endpoint de solo lectura', '/loop', 'Recordatorio en el móvil'], 1, 'Toca repos/APIs y debe correr sin tu ordenador: Rutina en la nube. Si tocara producción con escritura, sería un worker en el servidor con tu confirmación.'),
          B.cards([
            { icon: '⏰', title: 'Cuatro formas', html: 'Cowork (tu Mac), Rutinas nube (repos/APIs), /loop (sesión), cron+SDK (producción).' },
            { icon: '☀️', title: 'Rutina de la mañana', html: 'Pagos sin vincular + pedidos abiertos → 8 líneas por WhatsApp.' },
            { icon: '💼', title: 'Slack para el equipo', html: 'Canal con Proyecto y endpoint de solo lectura.' },
            { icon: '🔒', title: 'Lectura y propuesta', html: 'Escribir en producción sigue pasando por ti.' }
          ])
        ],
        quiz: [
          { q: 'Una tarea programada de Cowork requiere…', o: ['nada especial', 'que tu ordenador esté encendido a esa hora', 'un servidor Hetzner', 'una clave de API'], a: 1, why: 'Corre en tu Mac. Para correr sin él: Rutinas de Claude Code en la nube.' },
          { q: 'Para los workers de Maya que tocan la base de datos de producción cada 10 minutos, la forma correcta es…', o: ['Cowork', 'Rutina en la nube', 'cron en el servidor con Agent SDK/API o código puro', '/loop'], a: 2, why: 'Producción con acceso directo a la base: en tu servidor, con tus controles.' },
          { q: 'Claude en Slack permite dar permisos distintos por persona.', type: 'tf', a: true, why: 'Es la vía para que el equipo consulte sin depender de ti, con acceso solo a lo que autorices.' },
          { q: 'El principio que rige las rutinas y agentes del equipo respecto a producción es…', type: 'fill', a: ['lectura y propuesta', 'modo lectura', 'solo lectura', 'lectura', 'leer y proponer', 'solo lectura y propuesta'], why: 'Leen, calculan, redactan, avisan. Escribir pasa por tus flujos con confirmación.' }
        ],
        cards: [
          ['Las cuatro formas de programar a Claude', 'Tareas programadas de Cowork (tu Mac, oficina); Rutinas de Claude Code en la nube (repos/APIs sin tu ordenador); /loop (repetir en la sesión abierta); cron + Agent SDK/API en tu servidor (producción).'],
          ['La rutina de la mañana de RRB', 'Cada día 7:30: llamar a un endpoint de solo lectura (pagos_recibidos status=0, notas 7/8 y 10/11 pendientes), calcular totales y antigüedad, comparar con ayer, resumir en 8 líneas con ⚠️ por umbral, enviar por WhatsApp.'],
          ['Diseño de acceso del equipo a Claude', 'Dirección: todo. Operación: Team + Slack + Excel con documentos, informes y endpoint de solo lectura. Centros: canal de Slack o Maya/Max. Distribuidores: Maya. Nadie escribe en producción sin confirmación.']
        ],
        resources: [
          { type: 'doc', t: 'Claude Code: Scheduled tasks y Routines (nube)', u: 'https://code.claude.com/docs/en/scheduled-tasks', lang: 'EN' },
          { type: 'doc', t: 'Claude Code: Claude Code on the web', u: 'https://code.claude.com/docs/en/claude-code-on-the-web', lang: 'EN' },
          { type: 'article', t: 'Anthropic: Claude en Slack', u: 'https://www.anthropic.com/claude-in-slack', lang: 'EN' },
          { type: 'article', t: 'Anthropic: Claude for Excel', u: 'https://claude.com/claude-for-excel', lang: 'EN' }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'cl-3-4', title: 'Una semana tipo de un director general con Claude', minutes: 11, level: 'básico',
        summary: 'Cómo encajan todas las piezas en tu agenda real: qué superficie, qué Proyecto y qué rutina para cada momento de la semana.',
        body: () => [
          B.lead('Las herramientas solo valen si entran en la rutina. Esta es una semana tipo construida sobre lo que ya haces, con las piezas nuevas en su sitio.'),
          B.h('Cada mañana (10 minutos, en el teléfono)'),
          B.list([
            '<b>7:30</b>: llega la rutina de pagos sin vincular y pedidos abiertos. La lees; si hay ⚠️, dictas a Maya-sesión: "el folio [copiado] lleva 3 días sin vincular, revísame la causa".',
            'El <b>digest nocturno</b> de Maya (juez de calidad, aprendizajes, clientes atorados) ya te llega; ahora lo comentas con una decisión en una línea si hace falta.',
            'Remote Control: si dejaste una sesión de Claude Code trabajando de noche, miras el resultado desde el móvil.'
          ]),
          B.h('Lunes: dirección'),
          B.list([
            'Cowork o Skill <b>Informe semanal RRB</b> desde la hoja de Drive: cifras, causas, una decisión. Lo revisas, decides, lo compartes con Edna y Mónica como artefacto o a la hoja.',
            'Proyecto <b>Dirección</b>: "Con este informe y el de la semana pasada, ¿qué tendencia me estoy perdiendo?".',
            'Rutina de <b>novedades de IA</b> (curso 7.6): cinco líneas de lo que cambió y qué afecta a RRB.'
          ]),
          B.h('Martes a jueves: construir y operar'),
          B.list([
            'Sesiones de <b>Claude Code</b> por dominio (panel, maya, academia, atlas), cada una con su CLAUDE.md corto y reglas por carpeta. Modo plan para lo grande; fases con tu luz verde; <code>/deploy</code> para subir.',
            'Subagentes con rol: el <b>auditor</b> revisa lo que el <b>constructor</b> hizo; el <b>verificador móvil</b> te manda capturas. Tú apruebas viendo.',
            'Chat entre sesiones (nativo o tu chat HTTP) para coordinar; tú arbitras.',
            'Cualquier duda técnica: Proyecto <b>Carrera y aprendizaje</b>: "explícame X con Maya como ejemplo".'
          ]),
          B.h('Viernes: revisar y aprender'),
          B.list([
            'Auditoría con agente aparte: "revísame la atención de Maya de los últimos 7 días" → lista de clientes atorados y bugs. Decides qué entra la semana que viene.',
            '<code>/memory</code> y CLAUDE.md: 10 minutos para borrar lo obsoleto y promover lo que se volvió regla.',
            'Este curso: una lección y las tarjetas del día. Anotas en <code>_maestro_wip</code> lo que vas a probar.'
          ]),
          B.h('Días 4 y 14: dinero'),
          B.list([
            'Rutina de <b>corte de regalías por pagar</b> (regs2 status=0, apagar>0, por persona, con el desfase de un mes): te llega el consolidado; lo cuadras con pagovta; apruebas el depósito en tu flujo. Claude propone, tú pagas.',
            'Antes de tocar regalías o pagos en código: <b>revisión adversarial con Fable</b> (ultrareview) y despliegue por fases.'
          ]),
          B.h('Mensual'),
          B.list([
            'Revisar el gasto (<code>/usage</code>, métricas de API si Maya ya va por API) y ajustar la política de modelos con números.',
            'Revisar qué parte de tu stack ya la ofrece Anthropic nativa (chat entre sesiones, memoria, workers).',
            'Actualizar el perfil y el plan por etapas (módulo 7). Cerrar una etapa = un resultado visible en el negocio.'
          ]),
          B.key('La semana tipo tiene tres principios: la información llega sola (rutinas), tú decides en una línea (propuestas, tablas, capturas) y nada toca producción sin tu sí. Cada herramienta del manual está ahí para uno de los tres.'),
          B.check('¿Qué principio ordena toda la semana tipo?', ['Usar el mayor número de herramientas posible', 'La información llega sola, tú decides en una línea y nada toca producción sin tu aprobación', 'Programar todo lo posible', 'Delegar las decisiones a Claude'], 1, 'Rutinas para informar, propuestas para decidir, luz verde para actuar.'),
          B.cards([
            { icon: '☀️', title: 'Mañana', html: 'Rutina de pagos + digest de Maya; decisiones en una línea desde el móvil.' },
            { icon: '📊', title: 'Lunes', html: 'Informe semanal (Skill/Cowork) y novedades de IA.' },
            { icon: '🔧', title: 'Mar-Jue', html: 'Claude Code por dominio, plan, fases, /deploy, subagentes.' },
            { icon: '🔎', title: 'Viernes', html: 'Auditoría de Maya, memoria, una lección de Expertia.' }
          ])
        ],
        quiz: [
          { q: 'En la semana tipo, ¿cuándo se usa el modo plan de Claude Code?', o: ['Nunca', 'Antes de construir algo grande, para aprobar el plan antes del código', 'Solo los viernes', 'Para escribir correos'], a: 1, why: 'Menos retrabajo: la práctica de "propuesta antes de construir" aplicada al código.' },
          { q: 'Antes de tocar código de regalías o pagos, la semana tipo recomienda…', o: ['desplegar rápido', 'revisión adversarial con Fable y despliegue por fases', 'avisar a los distribuidores', 'usar Haiku'], a: 1, why: 'Cambios de dinero: el coste de un error supera con mucho el de la revisión.' },
          { q: 'La revisión mensual incluye comprobar qué parte de tu stack ya la ofrece Anthropic de forma nativa.', type: 'tf', a: true, why: 'Chat entre sesiones, memoria, workers: lo que construiste puede haberse vuelto configuración.' }
        ],
        cards: [
          ['Los tres principios de la semana tipo con Claude', 'La información llega sola (rutinas), tú decides en una línea (propuestas, tablas, capturas), y nada toca producción sin tu aprobación.'],
          ['Semana tipo: qué día qué', 'Mañanas: rutina de pagos y digest de Maya. Lunes: informe semanal y novedades de IA. Mar-Jue: Claude Code por dominio con plan, fases, /deploy y subagentes. Viernes: auditoría de Maya, memoria, una lección. Días 4 y 14: corte de regalías con revisión adversarial.']
        ],
        resources: [
          { type: 'article', t: 'Ethan Mollick: One Useful Thing (cómo integran la IA los directivos)', u: 'https://www.oneusefulthing.org/', lang: 'EN' },
          { type: 'doc', t: 'Claude Code: Best practices', u: 'https://code.claude.com/docs/en/best-practices', lang: 'EN' }
        ]
      }
    ]
  };
})();
