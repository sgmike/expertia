/* Manual de Claude · Módulo 1: Conocer a Claude. */
(function () {
  'use strict';
  const B = EX.B;
  EX.MOD = EX.MOD || {};
  const ARROW = '<defs><marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="fg-arrowhead"/></marker></defs>';

  EX.MOD['cl-1'] = {
    id: 'cl-1', icon: '🪶', title: 'Conocer a Claude',
    desc: 'Cómo piensa Claude exactamente (qué ve, qué no, cómo decide), la familia de modelos de 2026 y cuál usar para qué, dónde vive (web, escritorio, móvil, Cowork, Chrome, Code, API, Slack) y qué puede y no puede hacer.',
    goals: [
      'Explicar qué recibe Claude en cada turno y por qué eso determina su respuesta.',
      'Elegir modelo y nivel de esfuerzo con criterio para cada tarea de tu día.',
      'Saber qué superficie de Claude conviene para cada uso: chat, Cowork, Code, API, equipo.',
      'Reconocer los límites honestos de Claude y cuándo verificar.'
    ],
    lessons: [
      /* ------------------------------------------------------------------ */
      {
        id: 'cl-1-1', title: 'Cómo piensa Claude: lo que ve en cada turno', minutes: 14, level: 'intermedio',
        summary: 'System prompt, contexto, herramientas, pensamiento y constitución: las cinco cosas que determinan cada respuesta. Si entiendes esto, entiendes por qué a veces "no se acuerda" y por qué otras veces acierta a la primera.',
        body: () => [
          B.lead('Llevas cinco meses trabajando con Claude a diario. Esta lección te muestra qué pasa exactamente cuando pulsas Enter, para que cada decisión que tomes al pedirle algo tenga fundamento.'),
          B.h('Qué recibe Claude en cada turno'),
          B.p('Claude no tiene memoria entre turnos ni "estado": en cada mensaje recibe <b>toda</b> la conversación de nuevo y genera la siguiente respuesta. Lo que recibe, en orden:'),
          B.fig('<svg viewBox="0 0 640 330">' + ARROW +
            [['1. System prompt', 'Instrucciones de Anthropic + de la app (Claude Code, Cowork) + tuyas (Proyecto, CLAUDE.md, reglas)', 'fg-brand'], ['2. Herramientas disponibles', 'Nombre, descripción y parámetros de cada herramienta: leer archivo, ejecutar comando, buscar web, MCP…', 'fg-warn'], ['3. Historial', 'Tus mensajes, sus respuestas, los archivos que leyó, los resultados de comandos, sus llamadas a herramientas', 'fg-ok'], ['4. Tu mensaje nuevo', 'Texto, capturas, archivos adjuntos', 'fg-claude'], ['5. Su pensamiento', 'Razonamiento interno (adaptativo) antes de escribir; no lo ves en bruto', 'fg-box']].map((s, i) => '<rect x="20" y="' + (10 + i * 62) + '" width="600" height="52" rx="10" class="' + s[2] + '"/><text x="34" y="' + (32 + i * 62) + '" font-weight="700">' + s[0] + '</text><text x="34" y="' + (50 + i * 62) + '" class="sm">' + s[1] + '</text>').join('') +
            '</svg>', 'Todo esto es la ventana de contexto (curso, lección 2.5). Lo que no está aquí, Claude no lo sabe.'),
          B.key('Consecuencia número uno: <b>la mayoría de los "errores de Claude" son omisiones de contexto</b>. Si no le diste la regla, la captura o el archivo, no lo sabe. Por eso "caso real + teléfono + qué debe pasar" funciona y "mejora el flujo de pagos" no: el primero le da el contexto; el segundo le obliga a adivinarlo.'),
          B.h('El system prompt: quién manda'),
          B.p('El <b>system prompt</b> son las instrucciones que van antes de la conversación. Tiene capas: Anthropic define el comportamiento base (fecha, capacidades, normas); la aplicación añade las suyas (Claude Code le explica sus herramientas y cómo trabajar en un repositorio); y tú añades las tuyas: en claude.ai, las instrucciones del <b>Proyecto</b>; en Claude Code, el <b>CLAUDE.md</b>, las reglas de <code>.claude/rules/</code> y la memoria automática; en la API, el parámetro <code>system</code>. Cuanto más arriba y más claro, más peso. Tus cinco reglas repetidas (nada a producción sin luz verde, el servidor es la verdad, secretos fuera del repo, sin claims de salud, pagovta como fuente de lo pagado) deberían vivir en el system prompt, no en tu memoria ni en la de Claude.'),
          B.h('Las herramientas: cómo actúa'),
          B.p('Claude decide por sí mismo cuándo usar una herramienta: si necesita leer un archivo, emite una llamada estructurada (<code>Read</code> con la ruta), la aplicación la ejecuta y le devuelve el resultado, y Claude sigue. Ese bucle (pensar → llamar herramienta → leer resultado → pensar) es lo que convierte a Claude en agente, y lo verás a fondo en el módulo 6. Lo importante ahora: cada resultado de herramienta <b>entra en el contexto</b>. Un comando que devuelve 50.000 líneas de log las mete todas. Por eso conviene pedir salidas acotadas (<code>| tail -50</code>) o delegar en un subagente.'),
          B.h('El pensamiento: cuánto razona'),
          B.p('Desde Claude 4.6 el pensamiento es <b>adaptativo</b>: Claude decide cuánto razonar según la dificultad. Tú lo modulas con el <b>esfuerzo</b> (effort: low, medium, high, xhigh, max). En Claude Code se cambia con <code>/effort</code> o en ajustes (<code>effortLevel</code>); en la API, con <code>output_config.effort</code>. En Fable 5 y 5.1 el pensamiento siempre está activo y el razonamiento en bruto no se muestra (solo un resumen si lo pides). Regla práctica: tu política de modelos ya lo intuye; effort alto para auditar y decidir, bajo para lo mecánico.'),
          B.h('La constitución: cómo decide qué hacer'),
          B.p('Claude está entrenado con una constitución (curso, lección 3.4) que fija prioridades: seguro → ético → directrices de Anthropic → útil, y un carácter: honesto, directo, curioso, cálido. Esto explica comportamientos que a veces sorprenden:'),
          B.list([
            'Te dice que algo está mal si se lo pides "sin complacencia": va a favor de su entrenamiento.',
            'Pide confirmación antes de acciones destructivas o irreversibles aunque no se lo hayas exigido.',
            'Rechaza redactar afirmaciones de salud o promesas de ingresos engañosas: tus líneas rojas coinciden con las suyas, y por eso se cumplen con fiabilidad.',
            'Puede negarse a algo legítimo por exceso de prudencia; explicar el contexto suele resolverlo (valora tu autonomía).'
          ]),
          B.h('Lo que Claude NO tiene'),
          B.list([
            '<b>Memoria persistente propia</b>: la memoria de claude.ai y la memoria automática de Claude Code son archivos que se le inyectan en el system prompt; él no "recuerda" nada por sí mismo.',
            '<b>Acceso a internet</b> salvo que tenga la herramienta de búsqueda activada.',
            '<b>Conocimiento posterior a su fecha de corte</b>: pregúntale cuál es antes de confiar en algo reciente.',
            '<b>Conocimiento de tu sistema</b> más allá de lo que hay en el contexto: por eso el CLAUDE.md con el esquema de la base de datos fue tan útil, y por eso conviene que sea eficiente (módulo 4).'
          ]),
          B.ex('Un turno real, desmontado', [
            B.p('Le escribes en la sesión panel: <i>"la tabla de pedidos se corta en el teléfono, mira"</i> con una captura.'),
            B.olist([
              'System prompt: Anthropic + Claude Code + tu CLAUDE.md (677 líneas) + memoria automática (regla: "verificar a tamaño teléfono") + reglas.',
              'Herramientas: Read, Edit, Bash, Grep, navegador…',
              'Historial: los últimos días de trabajo (o su resumen tras compactar).',
              'Tu mensaje: el texto + ~1.500 tokens de la captura.',
              'Pensamiento: identifica el módulo por la captura, recuerda la regla de verificar en móvil, planea: buscar el CSS de la tabla, proponer tarjetas, verificar con captura.',
              'Acciones: Grep del archivo, Read, Edit, abrir el navegador a 390 px, captura, y te la enseña. Cada paso entra en el contexto.'
            ]),
            B.p('Nada de esto es magia: es contexto bien puesto + herramientas + un modelo que planifica. Cuando algo falla, revisa qué faltaba en los pasos 1 a 4.')
          ]),
          B.check('Claude parece haber "olvidado" una regla que le diste hace tres días en la misma sesión. ¿Causa más probable?', ['Un bug de Anthropic', 'La conversación se compactó y la regla quedó fuera del resumen; no estaba en CLAUDE.md ni en memoria', 'Claude decidió ignorarla', 'La regla era demasiado corta'], 1, 'Las reglas permanentes van en el system prompt (CLAUDE.md, reglas, memoria), no en el historial, que se resume.'),
          B.cards([
            { icon: '📥', title: 'Cada turno, todo de nuevo', html: 'System prompt + herramientas + historial + tu mensaje. Sin estado propio.' },
            { icon: '📌', title: 'Reglas al system prompt', html: 'Lo permanente va en CLAUDE.md/Proyecto, no en el chat.' },
            { icon: '🧠', title: 'Effort', html: 'Alto para auditar y decidir; bajo para lo mecánico.' },
            { icon: '📜', title: 'Constitución', html: 'Seguro → ético → directrices → útil. Honesto por diseño.' }
          ])
        ],
        quiz: [
          { q: '¿Qué recibe Claude en cada turno?', o: ['Solo tu último mensaje', 'Toda la conversación: system prompt, herramientas, historial y tu mensaje nuevo', 'Un resumen que él guarda internamente', 'Solo el CLAUDE.md'], a: 1, why: 'No tiene estado propio. Todo lo relevante debe estar en el contexto en ese turno.' },
          { q: 'Dónde deben vivir tus cinco reglas repetidas para que Claude las respete siempre:', o: ['En tus mensajes, repetidas cada día', 'En el system prompt: CLAUDE.md, reglas por carpeta o instrucciones del Proyecto', 'En un correo', 'En la memoria de Claude, que las guarda solo'], a: 1, why: 'El historial se compacta y se pierde; el system prompt se envía siempre.' },
          { q: 'En Fable 5.1 puedes desactivar el pensamiento para ahorrar.', type: 'tf', a: false, why: 'El pensamiento adaptativo está siempre activo en Fable 5/5.1; se modula con effort.' },
          { q: 'Un comando que devuelve 50.000 líneas de log…', o: ['no afecta a nada', 'mete esas 50.000 líneas en el contexto y lo degrada; conviene acotar la salida o delegar en un subagente', 'se guarda en disco automáticamente', 'hace que Claude sea más listo'], a: 1, why: 'Cada resultado de herramienta entra en la ventana de contexto.' },
          { q: 'El parámetro que modula cuánto razona Claude se llama…', type: 'fill', a: ['effort', 'esfuerzo', 'effort level', 'effortLevel'], why: 'Effort: low, medium, high, xhigh, max. En Claude Code, /effort o effortLevel en ajustes.' }
        ],
        cards: [
          ['¿Qué recibe Claude en cada turno?', 'System prompt (Anthropic + app + tuyo), herramientas disponibles, historial completo (mensajes, archivos, resultados) y tu mensaje nuevo. Sin memoria ni estado propios.'],
          ['¿Dónde deben ir las reglas permanentes?', 'En el system prompt: instrucciones del Proyecto (claude.ai), CLAUDE.md y .claude/rules (Claude Code), parámetro system (API). El historial se compacta.'],
          ['¿Qué es el effort y cómo se cambia?', 'El nivel de esfuerzo de razonamiento: low, medium, high, xhigh, max. /effort o effortLevel en Claude Code; output_config.effort en la API.'],
          ['¿Por qué Claude respeta tus líneas rojas con fiabilidad?', 'Porque coinciden con su constitución (no ayudar a engañar, honestidad). Lo que va a favor de su entrenamiento se cumple mejor.']
        ],
        resources: [
          { type: 'doc', t: 'Claude Code: How Claude Code works', u: 'https://code.claude.com/docs/en/how-claude-code-works', lang: 'EN', note: 'El bucle, las herramientas y el contexto explicados por Anthropic.' },
          { type: 'doc', t: 'Claude Code: la ventana de contexto (visualización)', u: 'https://code.claude.com/docs/en/context-window', lang: 'EN' },
          { type: 'article', t: 'Anthropic: Claude\'s new constitution', u: 'https://www.anthropic.com/news/claude-new-constitution', lang: 'EN' },
          { type: 'doc', t: 'Anthropic: System prompts de Claude.ai publicados', u: 'https://platform.claude.com/docs/en/release-notes/system-prompts', lang: 'EN', note: 'Anthropic publica los system prompts de sus apps. Léelos: verás exactamente qué instrucciones recibe Claude antes que las tuyas.' }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'cl-1-2', title: 'La familia de modelos 2026 y cuál usar para qué', minutes: 12, level: 'intermedio',
        summary: 'Fable 5.1, Opus 5, Sonnet 5, Haiku 4.5 (y Mythos): capacidades, precios, contexto y una política de uso escrita para tu día a día.',
        body: () => [
          B.lead('Ya tienes una política: Fable para decidir y auditar, Opus para construir, Sonnet para lo mecánico. Aquí está la tabla que la sustenta y los matices que la mejoran.'),
          B.h('Los modelos disponibles (septiembre de 2026)'),
          B.table(['Modelo', 'ID en la API', 'Para qué destaca', 'Contexto / salida', 'Precio entrada / salida ($/M)'], [
            ['<b>Claude Fable 5.1</b>', '<code>claude-fable-5-1</code>', 'Lo más capaz disponible: razonamiento profundo, agentes de horas, código difícil, ciencia. Clasificadores de seguridad incluidos', '1M / 128K', '10 / 50 (caché 0,25)'],
            ['<b>Claude Mythos 5.1</b>', '<code>claude-mythos-5-1</code>', 'El mismo modelo sin clasificadores; solo organizaciones verificadas (ciber, ciencias de la vida)', '1M / 128K', '10 / 50'],
            ['<b>Claude Opus 5</b>', '<code>claude-opus-5</code>', 'Frontera "clásica": construir sistemas, razonamiento complejo, agentes largos. La mejor relación capacidad/precio para construir', '1M / 128K', '5 / 25'],
            ['<b>Claude Sonnet 5</b>', '<code>claude-sonnet-5</code>', 'Velocidad e inteligencia equilibradas: producción (Maya), código diario, análisis', '1M / 128K', '2 / 10'],
            ['<b>Claude Haiku 4.5</b>', '<code>claude-haiku-4-5</code>', 'Rápido y barato: clasificar, extraer, enrutar, subagentes de lectura, jueces simples', '200K / 64K', '1 / 5'],
            ['Opus 4.8 / 4.7 / 4.6, Sonnet 4.6', 'legado', 'Siguen disponibles; migrar cuando el eval lo confirme', '1M', 'variable']
          ], 'Todos con visión, herramientas, salidas estructuradas, caché y batch (−50 %). Fable/Mythos 5.x: pensamiento siempre activo.'),
          B.h('Tu política, afinada'),
          B.table(['Tarea', 'Modelo', 'Effort', 'Por qué'], [
            ['Auditar seguridad, dinero, decisiones de arquitectura, "encuéntrame lo que no vio nadie"', '<b>Fable 5.1</b>', 'high / max', 'Ya encontró fugas que Sonnet no vio. El coste de un error supera con mucho los tokens'],
            ['Construir funciones nuevas, refactorizar, tareas de horas en Claude Code', '<b>Opus 5</b>', 'medium / high', 'Frontera a la mitad de precio que Fable; fiable en agentes largos'],
            ['Cambios mecánicos, CSS, textos, consultas SQL sencillas, Maya en producción', '<b>Sonnet 5</b>', 'low / medium', 'Rápido, barato, muy capaz; 97 % de exactitud en herramientas en tu eval'],
            ['Clasificar mensajes, extraer campos de comprobantes, juez de calidad masivo, subagentes que solo leen', '<b>Haiku 4.5</b>', 'low', 'Un quinto del precio de Sonnet; suficiente para lo acotado'],
            ['Propuestas y documentos para decidir (A/B/C)', '<b>Opus 5</b> o <b>Fable 5.1</b>', 'high', 'Quieres las opciones bien pensadas, no rápidas'],
            ['Revisión adversarial de lo que construyó otro modelo', '<b>Fable 5.1</b> (distinto del constructor)', 'high', 'Un revisor distinto encuentra más; es el patrón "uno escribe, otro revisa"']
          ]),
          B.tip('En Claude Code cambias de modelo con <code>/model</code> en cualquier momento de la sesión, y puedes fijar un modelo distinto por <b>subagente</b> (módulo 4): el auditor en Fable, el constructor en Opus, el verificador móvil en Sonnet. Así tu política deja de estar en tu cabeza y queda escrita.'),
          B.h('Cómo elegir cuando dudas'),
          B.olist([
            '¿El error costaría dinero o reputación? → sube de modelo o de effort.',
            '¿Es repetitivo y acotado? → baja de modelo; considera que ni haga falta modelo (reglas).',
            '¿Necesitas que trabaje solo durante una hora? → Opus 5 o Fable 5.1; los pequeños pierden el hilo en tareas largas.',
            '¿Tienes un eval? → deja que decida el eval (curso, lección 7.1).'
          ]),
          B.h('Cosas que cambian entre generaciones'),
          B.list([
            'La <b>fecha de corte</b> de conocimiento: pregúntala.',
            'El <b>comportamiento con prompts antiguos</b>: instrucciones escritas para modelos de 2024 ("piensa paso a paso", "eres un experto en…") sobran o estorban en 2026; los modelos actuales razonan solos y siguen instrucciones complejas. Revisa tus system prompts al migrar (Anthropic ofrece una guía de auditoría de prompts).',
            'Fable 5.x puede <b>rechazar</b> peticiones que sus clasificadores consideren de riesgo (stop_reason "refusal" en la API) y existe un mecanismo de <i>fallback</i> a otro modelo. Para tu uso normal no lo notarás.'
          ]),
          B.check('Vas a pedir una revisión de seguridad de los 165 endpoints antes de un deploy grande. ¿Qué eliges?', ['Haiku 4.5 con effort low, para que sea rápido', 'Fable 5.1 con effort alto, idealmente como subagente auditor distinto del que construyó', 'Sonnet 5 porque es el de producción', 'El que esté seleccionado'], 1, 'El coste de un fallo de seguridad supera con mucho los tokens; un revisor distinto encuentra más.'),
          B.cards([
            { icon: '🏆', title: 'Fable 5.1', html: 'Decidir, auditar, lo difícil. 10/50. Pensamiento siempre activo.' },
            { icon: '🏗️', title: 'Opus 5', html: 'Construir. 5/25. Frontera a mitad de precio.' },
            { icon: '⚡', title: 'Sonnet 5', html: 'Producción y lo diario. 2/10.' },
            { icon: '🪶', title: 'Haiku 4.5', html: 'Clasificar, extraer, subagentes. 1/5.' }
          ])
        ],
        quiz: [
          { q: 'El ID de API del modelo más capaz disponible para todos en septiembre de 2026 es…', o: ['claude-opus-5', 'claude-fable-5-1', 'claude-mythos-5-1', 'claude-sonnet-5'], a: 1, why: 'Fable 5.1. Mythos 5.1 es el mismo modelo sin clasificadores, solo para organizaciones verificadas.' },
          { q: 'Para Maya en producción (WhatsApp, latencia importa, miles de turnos), el modelo adecuado es…', o: ['Fable 5.1', 'Sonnet 5', 'Mythos 5.1', 'Opus 4.6'], a: 1, why: 'Equilibrio de velocidad, coste y capacidad; 97 % de exactitud en herramientas en el eval.' },
          { q: 'Haiku 4.5 tiene ventana de contexto de 1 millón de tokens.', type: 'tf', a: false, why: 'Haiku 4.5: 200K. Fable 5.1, Opus 5 y Sonnet 5: 1M.' },
          { q: 'El patrón "uno escribe, otro revisa" recomienda…', o: ['el mismo modelo para escribir y revisar', 'un modelo distinto (y más capaz) para revisar lo que otro construyó', 'no revisar', 'revisar solo con humanos'], a: 1, why: 'Un revisor distinto tiene otro punto de vista y encuentra más errores.' },
          { q: 'El precio de lectura de caché de Fable 5.1 es de ______ $ por millón de tokens.', type: 'fill', a: ['0,25', '0.25', '0,25 $', '0.25$', 'veinticinco centavos'], why: '0,25 $/M (el 2,5 % del precio de entrada normal), tras la rebaja del 75 % de septiembre de 2026.' }
        ],
        cards: [
          ['Modelos Claude disponibles (sep 2026) y precios $/M entrada/salida', 'Fable 5.1: 10/50 (caché 0,25) · Mythos 5.1: mismo, sin clasificadores, acceso verificado · Opus 5: 5/25 · Sonnet 5: 2/10 · Haiku 4.5: 1/5 (200K contexto; los demás 1M).'],
          ['Política de modelos recomendada', 'Fable 5.1 (effort alto) para auditar y decidir · Opus 5 para construir · Sonnet 5 para producción y lo diario · Haiku 4.5 para clasificar, extraer y subagentes de lectura.'],
          ['¿Qué revisar al migrar de modelo?', 'Fecha de corte, prompts escritos para modelos antiguos (sobran "piensa paso a paso", roles genéricos), posibles rechazos de clasificadores en Fable, y volver a correr tu eval.']
        ],
        resources: [
          { type: 'doc', t: 'Anthropic: Models overview (tabla oficial de modelos, precios y límites)', u: 'https://platform.claude.com/docs/en/models/overview', lang: 'EN' },
          { type: 'doc', t: 'Anthropic: What\'s new in Claude Fable 5.1', u: 'https://platform.claude.com/docs/en/models/fable-5-1/whats-new-fable-5-1', lang: 'EN' },
          { type: 'doc', t: 'Anthropic: Choosing the right model', u: 'https://platform.claude.com/docs/en/about-claude/models/choosing-a-model', lang: 'EN' },
          { type: 'doc', t: 'Anthropic: Prompting Claude Fable 5', u: 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5', lang: 'EN', note: 'Diferencias de prompting específicas de la clase Mythos.' }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'cl-1-3', title: 'Dónde vive Claude: superficies y planes', minutes: 13, level: 'básico',
        summary: 'Web, escritorio (Chat, Cowork, Code), móvil, Chrome, Slack, Excel, Claude Code en terminal/IDE/web, API y Agent SDK, Managed Agents. Qué usar para cada cosa y qué plan conviene a cada persona de tu equipo.',
        body: () => [
          B.lead('Claude es un solo modelo con muchas puertas. Elegir la puerta correcta para cada tarea es la mitad de sacarle provecho.'),
          B.h('Mapa de superficies'),
          B.table(['Superficie', 'Qué es', 'Para qué te sirve'], [
            ['<b>Claude.ai web y móvil</b>', 'Chat con archivos, imágenes, voz, búsqueda web, Proyectos, memoria, artefactos, conectores, Skills', 'Pensar, redactar, analizar, decidir. Desde el teléfono en viajes'],
            ['<b>App de escritorio</b> (Mac/Windows)', 'Tres pestañas: <b>Chat</b>, <b>Cowork</b> (agente que usa tus archivos y apps) y <b>Code</b> (Claude Code con interfaz visual)', 'Tu centro de mando: la pestaña Code es donde vives'],
            ['<b>Cowork</b>', 'Modo agente de escritorio: tareas largas con acceso a carpetas locales, conectores (Drive, Gmail, Slack, Notion…), navegador vía Chrome y, si hace falta, control de pantalla. Tareas programadas', 'Automatizar trabajo de oficina: informes, correos, hojas de cálculo, investigación'],
            ['<b>Claude en Chrome</b>', 'Extensión que navega, lee y rellena formularios; ahora un cliente de Cowork con sesiones, skills y conectores compartidos', 'Portales sin API (paqueterías, bancos, gobierno) con confirmación en acciones sensibles'],
            ['<b>Claude en Slack</b> (Claude Tag) y <b>Excel/PowerPoint</b>', 'Claude dentro de las herramientas del equipo', 'Que Edna, Mónica y los centros pregunten sin salir de donde trabajan'],
            ['<b>Claude Code</b>', 'Agente de programación y automatización: terminal, extensiones VS Code/JetBrains, pestaña Code del escritorio, versión web (claude.ai/code) con sesiones en la nube y Rutinas, Remote Control desde el móvil, GitHub Actions', 'Construir y operar tus sistemas. Módulo 4 entero'],
            ['<b>API</b> (Messages) y <b>Agent SDK</b>', 'El modelo y el motor de Claude Code como librería (Python/TypeScript)', 'Maya y Max, informes automáticos, cualquier agente propio. Módulos 5 y 6'],
            ['<b>Managed Agents</b>', 'Agentes alojados por Anthropic con sandbox, sesiones, memoria, programación y outcomes', 'Agentes de trabajo interno sin operar servidores'],
            ['<b>Bedrock / Vertex / Azure Foundry</b>', 'Claude dentro de las nubes de Amazon, Google y Microsoft', 'Si un cliente o regulación exige que los datos no salgan de una nube concreta']
          ]),
          B.h('Qué puerta para qué tarea'),
          B.compare('Usa el chat (web/escritorio/móvil) cuando…', ['Piensas, redactas, analizas un dato o una captura.', 'Quieres una propuesta A/B/C antes de construir.', 'Estás en el teléfono.', 'El resultado es texto, un documento o un artefacto.'],
            'Usa Claude Code cuando…', ['El resultado es código, configuración o un cambio en un sistema.', 'Hay que leer muchos archivos, ejecutar comandos, verificar en navegador.', 'La tarea dura más de unos minutos y tiene pasos.', 'Quieres que quede en git.']),
          B.compare('Usa Cowork / Chrome cuando…', ['La tarea es de oficina: hoja de cálculo, correos, informes, investigación con fuentes.', 'Hay que operar un portal web sin API.', 'Quieres programarla (cada lunes a las 7).'],
            'Usa la API / SDK cuando…', ['Otra persona (un distribuidor, un cliente) interactúa con Claude sin saberlo: Maya.', 'El proceso corre solo en un servidor: workers, informes, integraciones.', 'Necesitas control de coste, retención y métricas.']),
          B.h('Planes y a quién le conviene cada uno'),
          B.table(['Plan', 'Para quién', 'Notas'], [
            ['<b>Free</b>', 'Probar', 'Límites bajos; sin Claude Code útil'],
            ['<b>Pro</b> (~20 $/mes)', 'Un profesional que usa el chat a diario y algo de Claude Code', 'Proyectos, memoria, conectores, Claude Code con límites de uso'],
            ['<b>Max</b> (5× o 20× el uso de Pro, ~100/200 $/mes)', 'Tú: Claude Code intensivo, varias sesiones, modelos grandes', 'Es tu plan actual. Los límites se renuevan por ventanas de horas; <code>/usage</code> los muestra'],
            ['<b>Team</b> (por usuario)', 'Edna, Mónica, los centros: chat con Proyectos compartidos, Skills de la empresa, sin entrenamiento con los datos, administración', 'La vía correcta para "Claude para el equipo" (tu prioridad de continuidad)'],
            ['<b>Enterprise</b>', 'Empresas grandes: SSO, controles, límites de contexto ampliados', 'No lo necesitas aún'],
            ['<b>API</b> (pago por token)', 'Maya, agentes, informes automáticos', 'Sin límites de plan; cero retención disponible; métricas de uso; la vía documentada para el Agent SDK en producción']
          ]),
          B.warn('Suscripción y API son mundos separados: la suscripción Max cubre tu uso interactivo (chat, Cowork, Claude Code) con límites por ventana de tiempo; la API se paga por token y es la vía pensada para agentes en producción. Hoy Maya corre sobre tu Max mediante el Agent SDK: conviene revisar los términos vigentes y presupuestar la API (~30-40 $/mes a su volumen) para tener continuidad, cero retención y métricas.'),
          B.h('Todo se sincroniza'),
          B.p('Desde 2026, conversaciones, Skills, conectores y memoria siguen tu cuenta en web, escritorio, móvil y Chrome. Empiezas una investigación en el teléfono en un viaje, la sigues en el escritorio y Cowork la convierte en informe. Las sesiones de Claude Code en la nube (claude.ai/code) se controlan desde el móvil con Remote Control y se pueden despertar con Rutinas programadas.'),
          B.check('Necesitas generar cada día un resumen de pagos sin vincular y que te llegue por WhatsApp sin que nadie lo pida. ¿Qué superficie?', ['El chat web, cada mañana a mano', 'API/SDK en un worker del servidor, o una Rutina programada de Claude Code con acceso a la API del admin', 'Claude en Chrome', 'Excel'], 1, 'Es un proceso que corre solo: API/worker o Rutina programada. El chat es para pensar, no para procesos.'),
          B.cards([
            { icon: '💬', title: 'Chat', html: 'Pensar, redactar, decidir. Web, escritorio, móvil.' },
            { icon: '🖥️', title: 'Cowork / Chrome', html: 'Trabajo de oficina y portales web, programable.' },
            { icon: '⌨️', title: 'Claude Code', html: 'Construir y operar sistemas. Terminal, IDE, escritorio, web.' },
            { icon: '🔌', title: 'API / SDK', html: 'Agentes para otros (Maya), procesos que corren solos.' }
          ])
        ],
        quiz: [
          { q: 'La pestaña de la app de escritorio donde vive Claude Code se llama…', o: ['Chat', 'Cowork', 'Code', 'Terminal'], a: 2, why: 'Tres pestañas: Chat, Cowork y Code.' },
          { q: 'Cowork es…', o: ['un chat más rápido', 'el modo agente de escritorio que usa tus archivos, conectores, el navegador y la pantalla para completar tareas de oficina, con tareas programables', 'un editor de código', 'un plan de pago'], a: 1, why: 'Intenta primero conectores, luego el navegador (Chrome), luego la pantalla.' },
          { q: 'Para que el equipo no técnico use Claude con las reglas del negocio y sin que se entrene con los datos, el plan adecuado es…', type: 'fill', a: ['Team', 'team', 'Claude Team', 'plan Team'], why: 'Team: Proyectos compartidos, Skills de empresa, administración, sin entrenamiento con datos.' },
          { q: 'La suscripción Max y la API son lo mismo, facturado de dos formas.', type: 'tf', a: false, why: 'Max: uso interactivo con límites por ventana. API: pago por token, pensada para agentes en producción, con cero retención y métricas.' },
          { q: 'Remote Control sirve para…', o: ['controlar el aire acondicionado', 'dirigir desde el móvil o el navegador una sesión de Claude Code que corre en tu ordenador o en la nube', 'apagar el servidor', 'cambiar de modelo'], a: 1, why: 'Sesiones de Claude Code controlables desde el teléfono.' }
        ],
        cards: [
          ['Superficies de Claude (2026)', 'Claude.ai web/móvil; app de escritorio (Chat, Cowork, Code); Claude en Chrome; Slack; Excel/PowerPoint; Claude Code (terminal, IDE, escritorio, web con Rutinas, Remote Control, GitHub Actions); API y Agent SDK; Managed Agents; Bedrock/Vertex/Azure.'],
          ['¿Qué puerta para qué tarea?', 'Chat: pensar, redactar, decidir. Claude Code: código y sistemas. Cowork/Chrome: oficina y portales, programable. API/SDK: agentes para terceros y procesos que corren solos.'],
          ['Planes de Claude', 'Free (probar), Pro (~20 $), Max 5×/20× (~100/200 $; el de Miguel), Team (equipo, sin entrenamiento, administración), Enterprise, API (pago por token, agentes en producción).']
        ],
        resources: [
          { type: 'doc', t: 'Claude Code: Platforms (dónde corre Claude Code)', u: 'https://code.claude.com/docs/en/platforms', lang: 'EN' },
          { type: 'article', t: 'Anthropic: Claude Cowork', u: 'https://claude.com/cowork', lang: 'EN' },
          { type: 'article', t: 'Anthropic: planes y precios de Claude', u: 'https://www.anthropic.com/pricing', lang: 'EN' },
          { type: 'doc', t: 'Claude Code: Claude Code on the web (sesiones en la nube y Rutinas)', u: 'https://code.claude.com/docs/en/claude-code-on-the-web', lang: 'EN' }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'cl-1-4', title: 'Qué puede y qué no puede hacer Claude (sin humo)', minutes: 11, level: 'básico',
        summary: 'Una lista honesta de fortalezas y límites, y las señales que te dicen cuándo verificar antes de actuar.',
        body: () => [
          B.lead('Un maestro de una herramienta conoce sus límites mejor que sus virtudes. Esto es lo que Claude hace excepcionalmente bien, lo que hace regular y lo que no debes pedirle sin red.'),
          B.h('Lo que hace excepcionalmente bien'),
          B.list([
            '<b>Código y sistemas</b>: leer un repositorio entero, diagnosticar un bug a partir de un síntoma y una captura, implementar una función con tests, refactorizar, escribir SQL. Es su punto más fuerte y por lo que construiste 165 endpoints sin programar.',
            '<b>Análisis con contexto</b>: un CSV de churn, una tabla de regalías, un contrato, un informe de un proveedor. Encuentra patrones, anomalías y omisiones, y las explica.',
            '<b>Redacción en cualquier registro</b>: propuestas, manuales, guiones, correos difíciles, plantillas de WhatsApp. En español impecable.',
            '<b>Trabajo largo y autónomo</b> con herramientas: horas construyendo o auditando, con verificación propia (navegador, tests) si se lo pides.',
            '<b>Enseñar</b>: explicarte cualquier concepto al nivel que pidas, con ejemplos de tu negocio. Este curso es la prueba.',
            '<b>Ver</b>: capturas, diagramas, comprobantes, PDF. Una captura vale más que tres párrafos.',
            '<b>Ser honesto</b> cuando se lo pides: crítica sin complacencia, riesgos, lo que no sabe.'
          ]),
          B.h('Lo que hace regular (verifica)'),
          B.list([
            '<b>Datos concretos de memoria</b>: fechas, cifras, nombres, artículos de ley, referencias. Puede inventar con seguridad. Pídele que busque o dale la fuente.',
            '<b>Aritmética larga y conteos</b> sin herramientas: que use código para calcular.',
            '<b>Novedades posteriores a su fecha de corte</b>: sin búsqueda web no las conoce.',
            '<b>Consistencia total</b> en procesos repetidos: dos ejecuciones pueden variar. Para producción, formato fijo y validación (salidas estructuradas).',
            '<b>Tareas muy largas sin puntos de control</b>: puede desviarse. Divide en fases con tu luz verde (como la capa móvil: fases 0 a 3).',
            '<b>Decir "no sé" espontáneamente</b>: mejora si le das permiso explícito.'
          ]),
          B.h('Lo que no debes pedirle sin red'),
          B.list([
            'Decisiones irreversibles solas: pagar, borrar en producción, enviar a miles de personas. Que proponga; tú apruebas.',
            'Afirmaciones legales, médicas o financieras sin verificación en fuente.',
            'Que "recuerde" algo que no está en el contexto o en memoria.',
            'Que garantice que un código es seguro sin tests, revisión adversarial y despliegue por fases.',
            'Que juzgue su propia obra: pide un segundo modelo o una segunda sesión para revisar.'
          ]),
          B.h('Señales para desconfiar'),
          B.table(['Señal', 'Qué hacer'], [
            ['Cita una cifra, fecha o norma sin que le dieras la fuente', 'Pide la fuente o que busque; verifica'],
            ['Dice "debería funcionar" o "en principio"', 'Pide que lo pruebe y te enseñe la evidencia (captura, salida de test)'],
            ['La respuesta es larga y genérica ante una pregunta concreta', 'Faltó contexto: dale el caso real, el archivo o la captura'],
            ['Está de acuerdo con todo lo que dices', 'Pide crítica explícita: "dime tres cosas que están mal"'],
            ['Cambia de opinión al insistir sin argumentos nuevos', 'Sicofancia: pregunta cuál es su posición real y por qué'],
            ['Propone algo que toca producción, dinero o datos', 'Frena: revisa, prueba en un entorno seguro, aprueba en fases']
          ]),
          B.key('Claude es un colega brillante, incansable y honesto que a veces recuerda mal un dato y que no sabe lo que no le cuentas. Trátalo así: contexto completo, verificación de lo que compromete, y tu criterio en las decisiones. Con esa disciplina, no hay techo.'),
          B.check('Claude te da la fecha exacta de una resolución de COFEPRIS sin que le pasaras el documento. ¿Qué haces?', ['La usas: Claude es fiable', 'Le pides la fuente o que la busque en la web, y la verificas antes de usarla', 'Le pides que la repita', 'Cambias de modelo'], 1, 'Datos concretos de memoria son la zona de riesgo. Fuente y verificación.'),
          B.cards([
            { icon: '💪', title: 'Fuerte', html: 'Código, análisis con contexto, redacción, trabajo largo con herramientas, ver capturas, enseñar.' },
            { icon: '⚠️', title: 'Verifica', html: 'Datos de memoria, aritmética, novedades, consistencia.' },
            { icon: '🛑', title: 'Sin red, no', html: 'Irreversibles, legal/médico/financiero, juzgar su propia obra.' }
          ])
        ],
        quiz: [
          { q: '¿Cuál es el punto más fuerte de Claude?', o: ['Recordar fechas históricas', 'Código y sistemas: leer repos, diagnosticar, implementar, verificar', 'Generar imágenes', 'Predecir el futuro'], a: 1, why: 'Es por lo que Anthropic optimiza y por lo que construiste RRB sin programar.' },
          { q: 'Ante "debería funcionar", lo correcto es…', o: ['confiar', 'pedir que lo pruebe y enseñe la evidencia (captura, salida de test)', 'desplegar y ver', 'cambiar de tema'], a: 1, why: 'Aprobar viendo, no leyendo. Tu regla, y la correcta.' },
          { q: 'Claude puede juzgar de forma fiable la calidad de su propio código en la misma sesión.', type: 'tf', a: false, why: 'Mejor un segundo modelo o una segunda sesión con contexto limpio: encuentra más y no está sesgado.' },
          { q: 'Si Claude está de acuerdo con todo lo que dices, probablemente…', type: 'fill', a: ['sicofancia', 'es sicofancia', 'complacencia', 'te está complaciendo', 'adulación', 'adulacion'], why: 'Sicofancia. Pide crítica explícita: "dime tres cosas que están mal".' }
        ],
        cards: [
          ['Fortalezas de Claude', 'Código y sistemas, análisis con contexto, redacción en cualquier registro, trabajo largo con herramientas, visión de capturas/PDF, enseñar, honestidad cuando se pide.'],
          ['Qué verificar siempre en Claude', 'Datos concretos de memoria (fechas, cifras, normas), aritmética sin herramientas, novedades posteriores al corte, consistencia en procesos repetidos.'],
          ['Señales para desconfiar de una respuesta', 'Cifras sin fuente, "debería funcionar", respuesta genérica ante pregunta concreta, acuerdo total, cambio de opinión sin argumentos, propuestas que tocan producción o dinero.']
        ],
        resources: [
          { type: 'doc', t: 'Anthropic: Reduce hallucinations', u: 'https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations', lang: 'EN' },
          { type: 'article', t: 'Anthropic: Claude\'s character (honestidad y sicofancia)', u: 'https://www.anthropic.com/research/claude-character', lang: 'EN' },
          { type: 'doc', t: 'Claude Code: Best practices (sección de verificación)', u: 'https://code.claude.com/docs/en/best-practices', lang: 'EN' }
        ]
      }
    ]
  };
})();
