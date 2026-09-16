/* Manual de Claude · Módulo 7: Maestría: lo que hacen los expertos y tu plan. */
(function () {
  'use strict';
  const B = EX.B;
  EX.MOD = EX.MOD || {};

  EX.MOD['cl-7'] = {
    id: 'cl-7', icon: '🏆', title: 'Maestría: lo que hacen los expertos y tu plan por etapas',
    desc: 'Cómo trabajan con Claude los desarrolladores, analistas, investigadores y directivos que más provecho le sacan; el catálogo de 100 cosas que puedes hacer; los errores que cometen los usuarios avanzados; y tu plan de cuatro etapas con entregables, convertido en checklist. Termina con el examen del maestro.',
    goals: [
      'Reconocer y adoptar los flujos de trabajo de los expertos que aplican a tu caso.',
      'Tener a mano un catálogo de usos para no dejar valor sobre la mesa.',
      'Evitar los errores típicos del usuario avanzado.',
      'Ejecutar tu plan por etapas con resultados visibles en el negocio cada semana.'
    ],
    lessons: [
      /* ------------------------------------------------------------------ */
      {
        id: 'cl-7-1', title: 'Cómo trabajan los expertos con Claude', minutes: 15, level: 'avanzado',
        summary: 'Los flujos de trabajo que distinguen a quienes más provecho sacan: desarrolladores, analistas, investigadores, escritores, operaciones y directivos. Con lo que ya haces marcado y lo que puedes copiar.',
        body: () => [
          B.lead('Los usuarios que más rinden con Claude no saben más prompts: tienen <b>flujos</b>. Estos son los que se repiten entre los mejores equipos, incluidos los de Anthropic, agrupados por perfil.'),
          B.h('Desarrolladores (y directores de producto que construyen con Claude Code)'),
          B.list([
            '✅ <b>Especificar con evidencia</b>: capturas, logs, el caso real. Tu práctica.',
            '✅ <b>Plan antes de código</b>, por fases con luz verde.',
            '⬜ <b>Test primero</b> (TDD): "escribe el test que falla para este bug; luego arréglalo hasta que pase". Verificación incorporada; ideal para las reglas de dinero de Maya.',
            '⬜ <b>Uno escribe, otro revisa</b>: constructor y auditor separados; el auditor con contexto limpio y modelo distinto.',
            '⬜ <b>Sesiones paralelas por dominio en worktrees</b>: ya tienes las sesiones; los worktrees evitan pisarse.',
            '⬜ <b>Revisión automática de PRs</b> con GitHub Actions y el prompt del auditor.',
            '✅ <b>CLAUDE.md y memoria</b>; ⬜ podados y con reglas por carpeta.',
            '⬜ <b>Rituales como Skills</b> (/deploy) y <b>guardas como hooks</b>.',
            '⬜ <b>Bucles de verificación visual</b>: Playwright MCP + "compara con esta maqueta y corrige hasta que coincida".'
          ]),
          B.h('Analistas y finanzas'),
          B.list([
            '⬜ <b>Datos por archivo + ejecución de código</b>: subir el CSV y pedir análisis con cálculos ejecutados, no de memoria; gráficos incluidos.',
            '⬜ <b>Hipótesis verificables</b> antes de conclusiones (prompt de churn, lección 2.5).',
            '⬜ <b>Informes con estructura fija</b> para comparar periodos; Skill compartida.',
            '⬜ <b>Excel con Claude</b>: modelos, fórmulas explicadas, limpieza de datos, dentro de la hoja.',
            '⬜ <b>Segunda opinión adversarial</b> sobre cualquier cifra que vaya a una decisión.'
          ]),
          B.h('Investigadores y estrategas'),
          B.list([
            '⬜ <b>Modo investigación</b> (claude.ai) con fuentes para evaluar proveedores, normativa y competidores; exigir citas y verificarlas.',
            '⬜ <b>Proyecto por tema</b> con los documentos clave; preguntas acumulativas.',
            '⬜ <b>Caso y caso contrario</b> para cada decisión estratégica.',
            '⬜ <b>Digestión semanal</b> con una rutina: "qué cambió y qué afecta a RRB".',
            '⬜ <b>Aprender con ejemplos propios</b>: "explícame X con Maya" (lo que hace este curso).'
          ]),
          B.h('Escritores y marketing'),
          B.list([
            '✅ <b>Guiones y plantillas</b> con reglas de cumplimiento en el prompt.',
            '⬜ <b>Skill de estilo</b>: tono, glosario, qué nunca decir; compartida con el equipo.',
            '⬜ <b>Ejemplos few-shot</b> de piezas aprobadas para fijar la voz.',
            '⬜ <b>Revisión de claims</b> automática con un clasificador antes de publicar.',
            '⬜ <b>Artefactos</b> para maquetas y decisiones visuales.'
          ]),
          B.h('Operaciones y soporte'),
          B.list([
            '✅ <b>Agente de atención</b> con router, tools, plantillas literales, gate de dinero, juez nocturno: Maya es un caso avanzado.',
            '⬜ <b>Eval de regresión</b> con casos reales antes de cada cambio.',
            '⬜ <b>Rutinas de informes</b> que llegan solas.',
            '⬜ <b>Cowork</b> para tareas de oficina repetitivas (hojas, correos, conciliaciones).',
            '⬜ <b>Claude en Slack/Excel</b> para el equipo con permisos por rol.'
          ]),
          B.h('Directivos'),
          B.list([
            '✅ <b>Decidir sobre propuestas con opciones y recomendación</b>, no sobre texto largo.',
            '⬜ <b>Un Proyecto de dirección</b> con las cifras y reglas; preguntas cada mañana.',
            '⬜ <b>El agente de dirección</b> (lección 6.10): la información llega antes de preguntar.',
            '⬜ <b>Manager de carrera / plan de continuidad</b> con Claude como interlocutor: ya lo haces; formalízalo en un Proyecto con revisiones mensuales.',
            '⬜ <b>Las doce preguntas</b> del curso (7.5) ante cualquier propuesta de IA.'
          ]),
          B.h('Lo que los mejores hacen distinto (transversal)'),
          B.olist([
            'Tratan a Claude como un <b>colega senior</b> al que hay que dar contexto, no como un buscador.',
            'Ponen las reglas <b>donde se ejecutan siempre</b> (system prompt, hooks), no en el chat.',
            '<b>Verifican</b> lo que compromete y <b>automatizan</b> la verificación.',
            '<b>Miden</b>: evals, coste por tarea, trazas. Deciden con números.',
            'Convierten lo que repiten en <b>Skills</b>, lo que temen en <b>hooks</b>, lo que esperan en <b>rutinas</b>.',
            'Revisan cada pocos meses qué parte de su plomería ya la ofrece el proveedor.',
            'Mantienen al humano en las decisiones y lo quitan de la ejecución.'
          ]),
          B.key('Haces ya ocho o nueve de estos flujos, sobre todo los de especificar, planear y decidir. Los que faltan son casi todos de <b>sistema</b> (skills, hooks, rutinas, evals, roles): convertir tu buen instinto en algo que funciona sin ti. Ese es el salto de usuario avanzado a maestro.'),
          B.check('¿Qué tienen en común los flujos que le faltan a Miguel?', ['Son de prompting', 'Son de sistema: convertir lo que hace bien a mano en skills, hooks, rutinas, evals y roles que funcionan sin él', 'Requieren programar a mano', 'Son caros'], 1, 'El salto de usuario avanzado a maestro es institucionalizar el instinto.'),
          B.cards([
            { icon: '👨‍💻', title: 'Desarrolladores', html: 'Evidencia, plan, TDD, uno escribe/otro revisa, worktrees, Actions, skills, hooks.' },
            { icon: '📊', title: 'Analistas', html: 'Datos + código, hipótesis verificables, estructura fija, Excel, adversarial.' },
            { icon: '🧭', title: 'Directivos', html: 'Propuestas con recomendación, Proyecto de dirección, agente de dirección, doce preguntas.' },
            { icon: '🧠', title: 'Transversal', html: 'Colega senior, reglas donde se ejecutan, verificar, medir, institucionalizar.' }
          ])
        ],
        quiz: [
          { q: '"Escribe el test que falla para este bug y luego arréglalo hasta que pase" es el flujo de…', o: ['brainstorming', 'desarrollo guiado por tests (TDD) con Claude', 'auditoría', 'documentación'], a: 1, why: 'Verificación incorporada; ideal para reglas de dinero.' },
          { q: 'Los mejores usuarios ponen las reglas…', o: ['en cada mensaje', 'donde se ejecutan siempre: system prompt, CLAUDE.md, hooks', 'en un documento aparte que Claude no ve', 'en la memoria y ya'], a: 1, why: 'Pedir frente a obligar.' },
          { q: 'La mayoría de los flujos que le faltan a Miguel son de prompting.', type: 'tf', a: false, why: 'Son de sistema: skills, hooks, rutinas, evals, roles. Institucionalizar lo que ya hace bien.' },
          { q: 'La regla transversal "convierte lo que repites en ______, lo que temes en hooks, lo que esperas en rutinas" se completa con…', type: 'fill', a: ['skills', 'Skills', 'una skill', 'skill'], why: 'Lo repetido → Skills; lo temido → hooks; lo esperado → rutinas.' }
        ],
        cards: [
          ['Flujos de los desarrolladores expertos con Claude', 'Especificar con evidencia, plan por fases, TDD, uno escribe/otro revisa, worktrees por dominio, revisión automática de PRs, CLAUDE.md podado con reglas por carpeta, rituales como Skills, guardas como hooks, verificación visual con Playwright.'],
          ['Lo que los mejores hacen distinto (transversal)', 'Colega senior con contexto; reglas donde se ejecutan siempre; verificar y automatizar la verificación; medir (evals, coste, trazas); lo repetido → Skills, lo temido → hooks, lo esperado → rutinas; revisar la plomería propia cada pocos meses; humano en decisiones, fuera de la ejecución.']
        ],
        resources: [
          { type: 'article', t: 'Anthropic: How Anthropic teams use Claude Code', u: 'https://www.anthropic.com/news/how-anthropic-teams-use-claude-code', lang: 'EN', note: 'Flujos reales de los equipos de Anthropic: seguridad, datos, producto, marketing, legal.' },
          { type: 'doc', t: 'Claude Code: Common workflows', u: 'https://code.claude.com/docs/en/common-workflows', lang: 'EN' },
          { type: 'video', t: 'Andrej Karpathy: Software Is Changing (Again) (YC, 2025)', u: 'https://www.youtube.com/watch?v=LCEmiRjPEtQ', lang: 'EN', min: 40, note: 'Software 3.0: programar en lenguaje natural, agentes con autonomía ajustable. El marco mental de tu forma de trabajar.' },
          { type: 'article', t: 'Ethan Mollick: One Useful Thing', u: 'https://www.oneusefulthing.org/', lang: 'EN' }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'cl-7-2', title: 'Cien cosas que puedes hacer con Claude (catálogo)', minutes: 12, level: 'básico',
        summary: 'Un catálogo por áreas para no dejar valor sobre la mesa: dirección, finanzas, operaciones, ventas, marketing, producto, tecnología, equipo, legal, aprendizaje y vida personal. Cada una con la superficie recomendada.',
        body: () => [
          B.lead('Cuando una herramienta puede hacer casi todo, el riesgo es usarla solo para lo que ya se te ocurrió. Recorre esta lista una vez al trimestre y marca tres cosas nuevas que probar.'),
          B.h('Dirección y estrategia'),
          B.olist([
            'Informe semanal con estructura fija a partir de la hoja de Drive (Skill + Cowork).',
            'Propuesta A/B/C con recomendación antes de cualquier proyecto (chat, artefacto).',
            'Caso y caso contrario para una decisión difícil (chat, effort alto).',
            'Plan de continuidad del negocio, revisado trimestralmente (Proyecto).',
            'Simulación de escenarios: "si el 20 % de los activos baja de 624 puntos, ¿qué pasa con las regalías?" (código).',
            'Preparar la reunión de líderes: orden del día, cifras, preguntas difíciles esperables (Proyecto Dirección).',
            'Traducir un objetivo anual en OKR trimestrales con métricas medibles.',
            'Evaluar una propuesta de proveedor como auditor externo (prompt 2.5).',
            'Resumen semanal de novedades de IA y competencia orientado a RRB (rutina).',
            'Redactar la carta trimestral a la red con las líneas rojas de cumplimiento.'
          ]),
          B.h('Finanzas y análisis'),
          B.olist([
            'Análisis de churn con hipótesis verificables (CSV + código).',
            'Conciliación de pagos: detectar depósitos huérfanos y duplicados (endpoint de solo lectura + código).',
            'Corte de regalías con cuadre contra pagovta y explicación de anomalías (Skill).',
            'Proyección de flujo de caja con supuestos explícitos (Excel con Claude).',
            'Detectar distribuidores con patrones atípicos (compras justo al umbral, devoluciones) para revisión humana.',
            'Comparar rentabilidad por producto y por centro con gráficos.',
            'Explicar una fórmula o un modelo financiero heredado (Excel).',
            'Preparar la información para el contador con el formato que pide.',
            'Análisis de sensibilidad del plan de compensación (misión REDARE) con código.',
            'Panel personal con datos vivos como artefacto compartido.'
          ]),
          B.h('Operaciones y atención'),
          B.olist([
            'Maya y Max: atención 24/7 con tools, plantillas literales y gate de dinero (Agent SDK).',
            'Auditoría de atención de los últimos N días con lista de clientes atorados (subagente).',
            'Convertir una regla de negocio en fact + código + test (Skill).',
            'Plantillas de WhatsApp que Meta aprueba (Skill).',
            'Conteo de inventario con fotos por QR: lectura de imágenes y cuadre (visión).',
            'Detección de fricción en conversaciones (juez nocturno) y aprendizajes.',
            'Guías de envío y cotizaciones vía tools (Skydropx) con confirmación.',
            'Manual del admin actualizado automáticamente al cambiar una sección (Claude Code + Skill).',
            'Rutina de la mañana: pagos sin vincular y pedidos abiertos (Rutina).',
            'Respuestas a los centros de distribución por Slack con endpoint de solo lectura.'
          ]),
          B.h('Ventas y red'),
          B.olist([
            'Programa de reactivación de inactivos con mensajes en modo propuesta (agente + tu aprobación).',
            'Coach de red: "qué debería hacer este distribuidor para calificar este mes" (tool get_red_accionable).',
            'Argumentarios por objeción, sin claims, con ejemplos aprobados.',
            'Scripts de llamada y de Zoom para inscripciones (Max).',
            'Segmentación de la red por comportamiento (no supervisado con código).',
            'Detección temprana de abandono con alerta al líder.',
            'Resumen de cada Zoom grabado con acuerdos y tareas (transcripción + resumen).',
            'Bonos y rangos explicados en lenguaje claro para la red (Documento maestro).',
            'Calendario de promociones con reglas (envío gratis, umbrales) verificadas contra los facts.',
            'Simulador para el distribuidor: "si inscribes a 3 y compras X, tu regalía sería…" (código, con disclaimers, sin promesas).'
          ]),
          B.h('Marketing y contenido'),
          B.olist([
            'Guiones de 60 s para Flow + ElevenLabs con cumplimiento y frases descartadas (Skill).',
            'Descripciones de producto por canal (tienda, app, redes) con la misma voz.',
            'Calendario editorial mensual con formatos y llamados a la acción.',
            'Revisión de claims de cualquier pieza antes de publicar (clasificador con Haiku).',
            'Adaptar una pieza larga a 5 formatos (post, historia, WhatsApp, correo, guion).',
            'Fichas de producto bilingües si algún día exportas.',
            'Preguntas frecuentes generadas desde las conversaciones reales de Maya (kb_search).',
            'Imágenes y vídeo: Claude escribe los prompts para Flow/Imagen a partir del guion.',
            'Presentación para la convención con Claude en PowerPoint.',
            'Test A/B de mensajes con criterios claros y análisis de resultados.'
          ]),
          B.h('Producto y tecnología'),
          B.olist([
            'Construir funciones del admin, la API y la app por fases con verificación (Claude Code).',
            'Migraciones masivas con /batch y un PR por archivo.',
            'Auditoría de seguridad de las 52 secciones con workflow y verificación cruzada.',
            'Revisión automática de cada PR (GitHub Actions + auditor).',
            'Deploy seguro con /deploy y hooks (respaldo, llaves, stash).',
            'Documentación viva: docs/MAESTRO.md actualizado en cada commit.',
            'Pruebas visuales a 390 px con Playwright MCP.',
            'Servidor MCP rrb-admin de solo lectura para todos los clientes.',
            'Eval de regresión de Maya antes de cada cambio.',
            'Atlas: backtests y análisis con código, sin promesas de rendimiento; MiCA como restricción en el prompt.'
          ]),
          B.h('Equipo y conocimiento'),
          B.olist([
            'Claude para el equipo (Team) con Proyectos por área y Skills compartidas.',
            'Canal de Slack #consultas-rrb con acceso de lectura.',
            'Onboarding de un nuevo empleado: manual, preguntas frecuentes, tutor con el Documento maestro.',
            'Convertir tus decisiones en documentos (Fuente de verdad) que Maya y el equipo comparten.',
            'Actas de reuniones y seguimiento de acuerdos.',
            'Traducir jerga técnica a lenguaje del negocio para Edna y Mónica, y viceversa.',
            'Evaluaciones de desempeño con criterios objetivos y borradores de retroalimentación.',
            'Formación interna estilo Academia para el equipo (como este curso).',
            'Glosario de la empresa mantenido automáticamente.',
            'Plan de sucesión y continuidad documentado y revisado.'
          ]),
          B.h('Legal y cumplimiento'),
          B.olist([
            'Revisión de piezas y respuestas contra COFEPRIS/FTC con clasificador y humano.',
            'Resumen de un contrato con riesgos y cláusulas a negociar (verificar con abogado).',
            'Aviso de privacidad actualizado con el uso de sistemas automatizados.',
            'Checklist de cumplimiento del AI Act si exportas a Europa.',
            'Registro de qué datos ve cada agente (mapa de datos).',
            'Respuestas a requerimientos de autoridades: borrador con las fuentes internas.',
            'Políticas internas de uso de IA para el equipo.',
            'Revisión de términos de proveedores (Meta, MercadoPago, Anthropic) cuando cambian.',
            'Plantillas legales de la red (contratos de distribuidor) explicadas en lenguaje claro.',
            'Detección de secretos en el código antes de cada commit (hook).'
          ]),
          B.h('Aprendizaje y desarrollo personal'),
          B.olist([
            'Este curso, con Claude como tutor que explica con tus ejemplos.',
            'Preparar tu paso a consultor / CTO fraccional: portafolio de casos (RRB, Maya, Academia) redactado.',
            'Construir en público: borradores de artículos a partir de lo que ya hiciste.',
            'Practicar presentaciones: Claude como audiencia difícil que pregunta.',
            'Resúmenes de libros y podcasts orientados a decisiones.',
            'Aprender un tema técnico en 30 minutos con "primera acción" (prompt 2.5).',
            'Revisar tu semana: qué decidiste, qué aprendiste, qué automatizar.',
            'Planificar los 90 días del plan de abundancia con hitos medibles.',
            'Programa Renace / bienestar: guiones y rutinas (sin afirmaciones de salud).',
            'Diario de decisiones con revisión anual: el único método que mejora el criterio.'
          ]),
          B.key('Cien usos, una regla: cada uno tiene una superficie natural (chat, Cowork, Claude Code, SDK, Slack) y un control (lectura/propuesta/confirmación). Marca tres para este trimestre y conviértelos en Skills o rutinas cuando funcionen.'),
          B.check('¿Cuál es la forma recomendada de usar este catálogo?', ['Intentar todo a la vez', 'Revisarlo cada trimestre, elegir tres usos nuevos y convertir en Skills o rutinas los que funcionen', 'Leerlo una vez', 'Delegarlo entero a Claude'], 1, 'Tres por trimestre, institucionalizados. Lo demás es dispersión.'),
          B.cards([
            { icon: '🧭', title: 'Dirección', html: 'Informe fijo, A/B/C, caso contrario, escenarios, continuidad.' },
            { icon: '💰', title: 'Finanzas', html: 'Churn, conciliación, regalías, flujo de caja, anomalías.' },
            { icon: '⚙️', title: 'Operación', html: 'Maya, auditorías, facts, plantillas, inventario, rutinas.' },
            { icon: '📣', title: 'Marketing', html: 'Guiones, descripciones, claims, formatos, presentaciones.' },
            { icon: '👥', title: 'Equipo', html: 'Team, Slack, onboarding, Fuente de verdad, formación.' }
          ])
        ],
        quiz: [
          { q: 'Un simulador de regalías para distribuidores ("si inscribes a 3 y compras X…") debe…', o: ['prometer ingresos para motivar', 'calcular con código, incluir disclaimers y no prometer ingresos', 'no existir', 'usar solo texto'], a: 1, why: 'Cálculo exacto con código; las líneas rojas (sin promesas de ingresos) también aplican a simuladores.' },
          { q: 'La superficie natural para "revisión automática de cada PR" es…', o: ['el chat', 'GitHub Actions con el prompt del auditor', 'Cowork', 'Excel'], a: 1, why: 'Ocurre en el repo, sin que nadie lo pida.' },
          { q: 'Convertir las decisiones en documentos que Maya y el equipo comparten es la idea de…', type: 'fill', a: ['fuente de verdad', 'documento maestro', 'la fuente de verdad', 'el documento maestro', 'fuente de la verdad'], why: 'Documento maestro / Fuente de verdad: reglas oficiales sincronizadas a los facts.' }
        ],
        cards: [
          ['Cómo usar el catálogo de 100 usos', 'Revisarlo cada trimestre; elegir tres usos nuevos; asignar a cada uno su superficie (chat, Cowork, Claude Code, SDK, Slack) y su control (lectura, propuesta, confirmación); convertir en Skill o rutina lo que funcione.']
        ],
        resources: [
          { type: 'article', t: 'Anthropic: casos de clientes (qué construyen las empresas con Claude)', u: 'https://www.anthropic.com/customers', lang: 'EN' },
          { type: 'doc', t: 'Anthropic: Prompt library', u: 'https://platform.claude.com/docs/en/resources/prompt-library/library', lang: 'EN' },
          { type: 'article', t: 'Anthropic Economic Index (en qué se usa Claude realmente)', u: 'https://www.anthropic.com/economic-index', lang: 'EN', note: 'Datos reales de uso por ocupación y tarea. Para saber en qué te adelantas y en qué te quedas atrás.' }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'cl-7-3', title: 'Los errores del usuario avanzado (y cómo evitarlos)', minutes: 11, level: 'intermedio',
        summary: 'Diez errores que cometen quienes ya usan Claude a fondo, con el síntoma, la causa y el arreglo. Algunos ya los has vivido.',
        body: () => [
          B.lead('Los principiantes fallan por no dar contexto. Los avanzados fallan por confiar demasiado en lo que funciona a mano y no convertirlo en sistema. Estos son los diez errores más caros.'),
          B.table(['Error', 'Síntoma', 'Arreglo'], [
            ['<b>1. Reglas en la memoria de una sesión</b>', 'Otra sesión (o la misma tras compactar) no las conoce; el ritual se ejecuta distinto', 'CLAUDE.md / reglas por carpeta para hechos; Skills para rituales; hooks para lo que no puede fallar'],
            ['<b>2. CLAUDE.md gigante</b>', 'Claude ignora reglas enterradas; cada turno cuesta más', 'Podar a <200 líneas; lo voluminoso a rules con paths; /doctor'],
            ['<b>3. Sesiones eternas sin higiene</b>', 'Lentitud, repeticiones, olvidos', '/clear al cambiar de tema; /compact con instrucciones; decisiones a archivos'],
            ['<b>4. Comandos sueltos para rituales críticos</b>', 'Un shell aborta a la mitad y el deploy queda en _pt_', 'Skill con pasos y reporte; hook que exige precondiciones'],
            ['<b>5. Confiar en "debería funcionar"</b>', 'Bugs en producción descubiertos por clientes', 'Evidencia siempre: capturas, tests, datos reales; /goal'],
            ['<b>6. El mismo Claude construye y revisa</b>', 'Revisiones que no encuentran nada', 'Auditor con contexto limpio y modelo distinto'],
            ['<b>7. Secretos donde no deben</b>', 'Una llave casi en el repo (14-sep)', 'Variables de entorno; hook pre-commit; escáner; rotación'],
            ['<b>8. Agentes con más acceso del necesario</b>', 'Riesgo silencioso: si el modelo cae, el daño es real', 'Mínimo privilegio; identidad del usuario servido; lectura y propuesta'],
            ['<b>9. Cambiar prompts o modelos sin eval</b>', '"Creo que mejoró"; regresiones que nadie ve', 'Eval de regresión con casos reales antes de cada cambio'],
            ['<b>10. Construir lo que el proveedor ya ofrece</b>', 'Plomería propia que envejece (memoria, colas, mensajería)', 'Revisar cada seis meses; SDK, MCP, Rutinas, Managed Agents']
          ]),
          B.h('Tres errores más sutiles'),
          B.list([
            '<b>Sicofancia inversa</b>: pedir siempre crítica puede llevar a que Claude invente problemas para complacerte. Pide "si está bien, dilo en una línea".',
            '<b>Sobreautomatizar decisiones</b>: dejar que un agente decida lo que debería decidir una persona (precios, excepciones, despidos). Automatiza la ejecución, no el juicio.',
            '<b>No medir el coste</b>: una suscripción oculta el gasto; cuando pases a API, sin métricas te sorprenderás. Mide desde el primer día.'
          ]),
          B.key('Casi todos los errores del avanzado tienen el mismo arreglo: mover lo que funciona a mano a un lugar donde funcione solo y siempre (archivo, Skill, hook, eval, rutina), con el mínimo acceso y con evidencia. Es el mismo consejo que la lección anterior, visto desde el fallo.'),
          B.check('Has corregido a Claude cinco veces en un mes sobre la misma regla de negocio. ¿Cuál es el error de fondo?', ['Claude es malo recordando', 'La regla vive en el chat o en la memoria de una sesión, no en CLAUDE.md o en una regla por carpeta', 'Falta effort', 'Hay que cambiar de modelo'], 1, 'Error 1: reglas en el sitio equivocado. Muévela a la capa permanente con su porqué.'),
          B.cards([
            { icon: '📍', title: 'Sitio equivocado', html: 'Reglas en el chat, rituales en la memoria, secretos en el código.' },
            { icon: '🧹', title: 'Sin higiene', html: 'CLAUDE.md gigante, sesiones eternas, sin eval.' },
            { icon: '🙈', title: 'Sin evidencia', html: '"Debería funcionar"; el mismo Claude revisa.' },
            { icon: '🔓', title: 'Demasiado acceso', html: 'Agentes que podrían hacer daño si caen.' }
          ])
        ],
        quiz: [
          { q: 'El arreglo común a la mayoría de los errores del usuario avanzado es…', o: ['prompts más largos', 'mover lo que funciona a mano a donde funcione solo y siempre (archivo, Skill, hook, eval, rutina), con mínimo acceso y evidencia', 'un modelo más grande', 'más sesiones'], a: 1, why: 'Institucionalizar el instinto.' },
          { q: 'Pedir crítica siempre puede producir…', type: 'fill', a: ['sicofancia inversa', 'problemas inventados', 'que invente problemas', 'critica inventada', 'crítica inventada'], why: 'Sicofancia inversa: Claude inventa fallos para complacerte. Permite "si está bien, dilo".' },
          { q: 'Automatizar la ejecución de un proceso y automatizar el juicio sobre una excepción son igual de recomendables.', type: 'tf', a: false, why: 'Automatiza la ejecución; el juicio (precios, excepciones, personas) sigue siendo humano.' },
          { q: 'El deploy que quedó a medias como _pt_ (14-sep) fue un caso del error…', o: ['CLAUDE.md gigante', 'comandos sueltos para un ritual crítico, sin Skill ni hook', 'sesiones eternas', 'demasiado acceso'], a: 1, why: 'Un ritual crítico como comandos sueltos que un shell puede abortar. Skill + hook.' }
        ],
        cards: [
          ['Los diez errores del usuario avanzado de Claude', '1 reglas en la memoria de una sesión · 2 CLAUDE.md gigante · 3 sesiones sin higiene · 4 comandos sueltos para rituales · 5 confiar en "debería funcionar" · 6 el mismo Claude construye y revisa · 7 secretos mal puestos · 8 agentes con demasiado acceso · 9 cambios sin eval · 10 construir lo que el proveedor ya ofrece.'],
          ['Tres errores sutiles', 'Sicofancia inversa (pedir siempre crítica → problemas inventados), sobreautomatizar el juicio (automatiza ejecución, no decisiones), no medir el coste desde el primer día.']
        ],
        resources: [
          { type: 'doc', t: 'Claude Code: Best practices (secciones "Avoid" y "Course-correct")', u: 'https://code.claude.com/docs/en/best-practices', lang: 'EN' },
          { type: 'doc', t: 'Claude Code: Troubleshooting', u: 'https://code.claude.com/docs/en/troubleshooting', lang: 'EN' }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'cl-7-4', title: 'Tu plan por etapas: de usuario avanzado a maestro', minutes: 14, level: 'intermedio',
        summary: 'Las cuatro etapas del plan hecho para ti, cada una con entregables concretos, la lección que la cubre, cómo se verifica y qué cambia en el negocio. Úsala como checklist.',
        body: () => [
          B.lead('Este es el plan que la sesión panel escribió para ti, convertido en checklist con la lección de este manual que cubre cada punto y el resultado visible en RRB. Cierra una etapa = un resultado en el negocio.'),
          B.h('Etapa 1 · Orden y velocidad (semanas 1-2)'),
          B.table(['Entregable', 'Lección', 'Verificación', 'Resultado'], [
            ['Higiene de sesiones: /clear al cambiar de tema, /compact con instrucciones, /context al arrancar', '4.10', '/context muestra <15 % en CLAUDE.md; sesiones nombradas', 'Sesiones más rápidas, menos repeticiones'],
            ['Modo plan explícito para lo grande; Ctrl+G para editar el plan', '4.5', 'Próxima función nueva con plan aprobado antes del código', 'Menos retrabajo'],
            ['Permisos preaprobados (allow/ask/deny) y sandbox', '4.4', 'settings.json en el repo; Claude pregunta solo en FTP, push, BD', 'Menos interrupciones'],
            ['CLAUDE.md a ~120 líneas + .claude/rules/ (db, admin, api, whats, mobile)', '4.3 y 2.3', '/doctor sin avisos; reglas cargan solo al tocar su carpeta', 'Claude obedece mejor; miles de tokens menos por turno'],
            ['Skill /deploy con el ritual completo', '4.6', 'Un deploy real con reporte en tabla; probado en admin y API', 'Cualquier sesión despliega igual de seguro']
          ]),
          B.h('Etapa 2 · Delegación con roles (semanas 3-4)'),
          B.table(['Entregable', 'Lección', 'Verificación', 'Resultado'], [
            ['Subagentes auditor (Fable), constructor (Opus), verificador-movil (Sonnet)', '4.7', '"Audítame este diff" produce la tabla por gravedad y veredicto', 'Tu política de modelos, escrita'],
            ['Hooks sin-llaves, respaldo-antes-de-ftp, sin-stash', '4.8', 'Un commit con una llave falsa se bloquea; una subida sin respaldo se bloquea', 'Seguridad que no depende de la memoria'],
            ['MCP: GitHub y Playwright en Claude Code; Drive como conector', '4.9 y 3.2', 'El verificador captura a 390 px vía Playwright; un informe llega a la hoja de Drive', 'Verificación visual automática; reportes donde trabaja el equipo'],
            ['Rutina de la mañana (pagos sin vincular, pedidos abiertos) y corte de regalías días 4/14', '3.3 y 6.10', 'Tres mañanas seguidas con el mensaje a las 7:30; un corte cuadrado con pagovta', 'Claude trabaja mientras no estás']
          ]),
          B.h('Etapa 3 · Automatización y control (semanas 5-8)'),
          B.table(['Entregable', 'Lección', 'Verificación', 'Resultado'], [
            ['Workflow de auditoría de seguridad de las 52 secciones con verificación cruzada; /batch para la limpieza de stock', '4.11 y 6.6', 'Informe con hallazgos verificados; PRs de stock revisables', 'Horas de trabajo en paralelo con un encargo'],
            ['/code-review sistemático antes de cada deploy; revisión adversarial (Fable) en cambios de dinero', '4.2, 4.7, 2.2', 'Ningún deploy de regalías/pagos sin veredicto del auditor', 'Menos incidentes en producción'],
            ['Artefactos con datos vivos: panel personal y tablero de Internet compartidos', '3.1', 'Edna y Mónica abren el artefacto y ven cifras del día', 'Dirección por datos sin abrir el admin'],
            ['Mensajes nativos entre sesiones donde aplique; chat HTTP para Hetzner/nube y arbitraje', '4.11 y 6.6', 'Panel y maya se coordinan; tú lees en el visor', 'Menos plomería propia']
          ]),
          B.h('Etapa 4 · Maestría (mes 3 en adelante)'),
          B.table(['Entregable', 'Lección', 'Verificación', 'Resultado'], [
            ['Maya v2: eval de regresión, clave de API, hooks, sesiones, prompt reestructurado, MCP', '6.9', 'Eval mejora sin regresiones; gasto medido; gate de dinero como hook', 'Maya más fiable y extensible'],
            ['Claude para el equipo: Team + Slack #consultas-rrb + Excel, con permisos por rol', '3.3 y 1.3', 'Edna resuelve una consulta de pedidos sin preguntarte', 'El conocimiento deja de vivir solo en ti'],
            ['Plugin rrb con /deploy, subagentes, hooks y permisos para los cuatro repos', '4.12', '/rrb:deploy funciona en Academia y Atlas', 'Consistencia entre sesiones'],
            ['Medición: /usage, Usage API, coste por tarea; política de modelos con números', '4.10, 7.3 del curso', 'Tabla mensual de gasto por uso y modelo', 'Control de costes con datos'],
            ['Agente de dirección en Managed Agents con memoria y outcomes (si crece)', '6.10 y 5.7', 'Informe diario con outcome cumplido, sin servidor tuyo', 'Cero operación']
          ]),
          B.h('Cómo llevar el plan'),
          B.olist([
            'Una etapa a la vez. Dentro de la etapa, un entregable por sesión de trabajo con Claude Code.',
            'Cada entregable arranca con la lección correspondiente abierta al lado: la mayoría traen el archivo casi listo para pegar.',
            'La verificación es la prueba de que está hecho. Sin verificación no se marca.',
            'Al cerrar una etapa: actualizar el perfil (<code>_maestro_wip/PERFIL…</code>), anotar el resultado en el negocio, y pedir a la sesión panel la siguiente prioridad si algo cambió.',
            'Nada de esto toca producción sin tu luz verde. Los entregables se prueban en local o en modo lectura y se activan cuando tú dices.'
          ]),
          B.key('Cuatro etapas, dieciocho entregables, cada uno con lección, verificación y resultado. Empieza por /deploy y los permisos: son los que devuelven tiempo desde el primer día. Marca en tus notas de esta lección lo que vas cerrando.'),
          B.check('¿Con qué entregable conviene empezar la etapa 1 y por qué?', ['El plugin', 'La Skill /deploy y los permisos preaprobados: devuelven tiempo y seguridad desde el primer día', 'Maya v2', 'Managed Agents'], 1, 'Resultado inmediato, riesgo bajo, y son la base de las etapas siguientes.'),
          B.cards([
            { icon: '1️⃣', title: 'Orden y velocidad', html: 'Higiene, plan, permisos, CLAUDE.md repartido, /deploy.' },
            { icon: '2️⃣', title: 'Roles', html: 'Subagentes, hooks, MCP, rutinas.' },
            { icon: '3️⃣', title: 'Automatización', html: 'Workflows, /batch, code-review, artefactos vivos, mensajería.' },
            { icon: '4️⃣', title: 'Maestría', html: 'Maya v2, Team/Slack, plugin rrb, medición, Managed Agents.' }
          ])
        ],
        quiz: [
          { q: 'La etapa 1 del plan de Miguel incluye…', type: 'multi', o: ['Higiene de sesiones y modo plan', 'Permisos preaprobados y sandbox', 'CLAUDE.md repartido en reglas por carpeta', 'Migrar Maya a Managed Agents'], a: [0, 1, 2], why: 'Y la Skill /deploy. Maya v2 es etapa 4.' },
          { q: 'Un entregable se marca como hecho cuando…', o: ['Claude dice que terminó', 'pasa su verificación concreta (p. ej. un deploy real con reporte; un commit con llave falsa bloqueado)', 'se escribe el archivo', 'pasa una semana'], a: 1, why: 'Sin verificación no se marca. Aprobar viendo.' },
          { q: 'El plugin rrb pertenece a la etapa…', type: 'fill', a: ['4', 'cuatro', 'etapa 4', 'maestría', 'maestria'], why: 'Etapa 4: cuando /deploy, subagentes y hooks ya funcionan en un repo, se empaquetan para los cuatro.' },
          { q: 'Los entregables del plan se activan en producción…', o: ['automáticamente al escribirlos', 'solo cuando Miguel da luz verde, tras probarlos en local o en modo lectura', 'los viernes', 'cuando Claude lo decide'], a: 1, why: 'Nada a producción sin tu sí. También para tu propio plan.' }
        ],
        cards: [
          ['Plan por etapas de Miguel: etapa 1 (semanas 1-2)', 'Higiene de sesiones (/clear, /compact, /context); modo plan explícito; permisos allow/ask/deny y sandbox; CLAUDE.md a ~120 líneas + .claude/rules por carpeta; Skill /deploy con el ritual completo.'],
          ['Plan por etapas: etapa 2 (semanas 3-4)', 'Subagentes auditor (Fable), constructor (Opus), verificador-movil (Sonnet); hooks sin-llaves, respaldo-antes-de-ftp, sin-stash; MCP GitHub y Playwright, Drive como conector; rutina de la mañana y corte de regalías.'],
          ['Plan por etapas: etapas 3 y 4', 'E3 (sem 5-8): workflow de auditoría de 52 secciones, /batch stock, /code-review y revisión adversarial en dinero, artefactos con datos vivos, mensajería nativa + chat HTTP. E4 (mes 3+): Maya v2, Claude para el equipo (Team, Slack, Excel), plugin rrb, medición de costes, agente de dirección en Managed Agents.']
        ],
        resources: [
          { type: 'doc', t: 'Claude Code: Best practices', u: 'https://code.claude.com/docs/en/best-practices', lang: 'EN' },
          { type: 'doc', t: 'Claude Code: mapa de documentación', u: 'https://code.claude.com/docs/en/claude_code_docs_map.md', lang: 'EN' }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'cl-7-5', title: 'El examen del maestro', minutes: 15, level: 'avanzado',
        summary: 'Veinte preguntas que cruzan todo el manual (y algo del curso). Si superas el 85 %, tienes el conocimiento de un usuario experto de Claude. Si no, el cuestionario te dice qué lección repasar.',
        body: () => [
          B.lead('No hay lectura nueva. Haz el cuestionario con calma; cada explicación te dice de qué lección viene. Repite hasta superar el 85 %. Después, empieza la etapa 1.'),
          B.key('Cuando termines: marca esta lección como leída, mira tu progreso y abre la lección 7.4. La maestría no es el examen: es el plan ejecutado.'),
          B.cards([
            { icon: '🎯', title: '85 %', html: 'El umbral del experto.' },
            { icon: '🔁', title: 'Repite', html: 'Las explicaciones señalan la lección a repasar.' },
            { icon: '🚀', title: 'Después', html: 'Etapa 1: /deploy y permisos.' }
          ])
        ],
        quiz: [
          { q: '¿Qué recibe Claude en cada turno de una conversación?', o: ['Solo el último mensaje', 'Todo el contexto: system prompt, herramientas, historial y el mensaje nuevo; no tiene estado propio', 'Un resumen que guarda internamente', 'Solo el CLAUDE.md'], a: 1, why: 'Lección 1.1. Por eso las reglas permanentes van al system prompt y el historial se compacta.' },
          { q: 'El modelo más capaz disponible para todos en septiembre de 2026 y su ID:', o: ['Opus 5, claude-opus-5', 'Fable 5.1, claude-fable-5-1', 'Mythos 5.1, claude-mythos-5-1', 'Sonnet 5, claude-sonnet-5'], a: 1, why: 'Lección 1.2. Mythos 5.1 es el mismo modelo sin clasificadores, solo para organizaciones verificadas.' },
          { q: 'Dos correcciones sobre el mismo error en una conversación indican que debes…', o: ['insistir con mayúsculas', 'resumir lo decidido, /clear y empezar con un prompt mejor', 'cambiar de modelo', 'subir la temperatura'], a: 1, why: 'Lección 2.4. El contexto contaminado cuesta más que reiniciar.' },
          { q: 'Un ritual paso a paso (como el deploy) debe vivir en…', o: ['la memoria automática', 'una Skill', 'el chat', 'CLAUDE.md raíz'], a: 1, why: 'Lecciones 2.3 y 4.6. Procedimiento → Skill; hechos → CLAUDE.md; correcciones → memoria.' },
          { q: 'Para que el esquema de la base de datos cargue solo cuando Claude toca api/ y sql/ usas…', o: ['CLAUDE.md raíz', '.claude/rules/db.md con paths', 'una Skill', 'un hook'], a: 1, why: 'Lección 4.3. Reglas por ruta con frontmatter paths.' },
          { q: 'Un hook PreToolUse que devuelve código 2…', o: ['registra la acción', 'bloquea la herramienta y pasa el mensaje a Claude', 'cierra la sesión', 'no hace nada'], a: 1, why: 'Lección 4.8. Pedir (CLAUDE.md) frente a obligar (hook).' },
          { q: 'El subagente auditor de RRB debería tener…', type: 'multi', o: ['Modelo Fable 5.1', 'permissionMode plan (solo lectura)', 'Un prompt adversarial con veredicto APROBARÍA / NO', 'Permiso para editar y desplegar'], a: [0, 1, 2], why: 'Lección 4.7. Revisor con contexto limpio, otro modelo y sin capacidad de cambiar nada.' },
          { q: 'La regla de permisos para permitir "git status" con cualquier argumento es…', type: 'fill', a: ['Bash(git status *)', 'Bash(git status*)', 'bash(git status *)'], why: 'Lección 4.4. Prefijo con asterisco final; deny gana sobre allow.' },
          { q: 'Para un informe que debe correr cada mañana sin tu Mac encendido usas…', o: ['/loop', 'Rutina de Claude Code en la nube (o Managed Agents programado)', 'tarea programada de Cowork', 'el chat'], a: 1, why: 'Lecciones 3.3 y 4.11. Cowork corre en tu Mac; /loop en la sesión abierta.' },
          { q: 'MCP es…', o: ['un modelo', 'un protocolo abierto para exponer herramientas, recursos y prompts a modelos; los conectores de claude.ai lo usan', 'un plan de pago', 'un hook'], a: 1, why: 'Lección 4.9. Creado por Anthropic en 2024, adoptado por toda la industria.' },
          { q: 'En Fable 5.1, Sonnet 5 y Opus 5, thinking con budget_tokens…', o: ['es la forma recomendada', 'devuelve error 400; se usa type adaptive y effort', 'solo funciona en Python', 'es gratis'], a: 1, why: 'Lección 5.2. Cambio que rompe código antiguo.' },
          { q: 'Para JSON válido garantizado según un esquema usas…', type: 'fill', a: ['salidas estructuradas', 'structured outputs', 'output_format', 'json_schema', 'salida estructurada', 'output_config.format'], why: 'Lección 5.2. El prompt pide; el esquema obliga. strict en herramientas.' },
          { q: 'Cuando el modelo pide una herramienta, quién la ejecuta:', o: ['Anthropic', 'tu código, que valida, ejecuta y devuelve un tool_result', 'el usuario', 'nadie'], a: 1, why: 'Lección 5.3. Salvo las herramientas del servidor (búsqueda web, código).' },
          { q: 'La caché de prompts exige que el prefijo sea…', o: ['parecido', 'idéntico byte a byte; lo variable va después del punto de caché', 'corto', 'en inglés'], a: 1, why: 'Lección 5.4. Tools → system → messages; 10 % del precio (2,5 % en Fable 5.1).' },
          { q: 'El Agent SDK es…', o: ['la Messages API con otro nombre', 'el motor de Claude Code como librería: bucle, herramientas, sesiones, hooks, MCP, subagentes', 'Managed Agents', 'un plugin'], a: 1, why: 'Lección 5.6. Maya corre sobre él; le faltan hooks, sesiones y MCP nativos.' },
          { q: 'La única forma en la que Anthropic hace el bucle y hospeda el agente es…', o: ['Tool Runner', 'Agent SDK', 'Managed Agents', 'bucle manual'], a: 2, why: 'Lección 5.7. Harness y despliegue gestionados; bóvedas, programación, outcomes.' },
          { q: 'Según Building effective agents, la diferencia entre flujo y agente es…', o: ['el tamaño del modelo', 'quién decide los pasos: el código o el modelo', 'el lenguaje', 'el precio'], a: 1, why: 'Lección 6.1. Empieza simple; agente solo para problemas abiertos.' },
          { q: 'La prueba definitiva de que un agente es seguro por diseño:', o: ['usa el modelo más nuevo', 'si el modelo obedeciera a un atacante, no podría hacer nada irreversible ni tocar datos ajenos', 'tiene un system prompt largo', 'usa temperatura 0'], a: 1, why: 'Lección 6.7. Mínimo privilegio, identidad del usuario servido, humano en lo irreversible.' },
          { q: 'La fase 0 de Maya v2 es…', o: ['cambiar el prompt', 'el eval de regresión con línea base', 'migrar a Managed Agents', 'añadir tools'], a: 1, why: 'Lección 6.9. Sin vara no hay medida.' },
          { q: 'Lo que los mejores usuarios hacen distinto se resume en…', o: ['saber más prompts', 'convertir lo que repiten en Skills, lo que temen en hooks, lo que esperan en rutinas; verificar y medir; humano en decisiones', 'usar el modelo más caro', 'no usar el chat'], a: 1, why: 'Lección 7.1. Institucionalizar el instinto: el salto a maestro.' }
        ],
        cards: [
          ['El examen del maestro', 'Veinte preguntas que cruzan el manual: contexto, modelos, prompts, capas de instrucciones, reglas por ruta, hooks, subagentes, permisos, rutinas, MCP, thinking/effort, salidas estructuradas, tool use, caché, Agent SDK, Managed Agents, flujos vs agentes, seguridad, Maya v2, hábitos de los expertos. Umbral: 85 %.']
        ],
        resources: [
          { type: 'doc', t: 'Claude Code: documentación completa', u: 'https://code.claude.com/docs', lang: 'EN' },
          { type: 'doc', t: 'Claude Platform: documentación de la API y agentes', u: 'https://platform.claude.com/docs', lang: 'EN' },
          { type: 'course', t: 'Anthropic Academy: cursos oficiales gratuitos', u: 'https://anthropic.skilljar.com/', lang: 'EN', note: 'Cursos con certificado sobre la API, Claude Code, MCP y agentes. El siguiente paso formal tras Expertia.' }
        ]
      }
    ]
  };
})();
