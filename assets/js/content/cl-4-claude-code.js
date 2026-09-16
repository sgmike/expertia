/* Manual de Claude · Módulo 4: Claude Code a fondo. */
(function () {
  'use strict';
  const B = EX.B;
  EX.MOD = EX.MOD || {};
  const ARROW = '<defs><marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="fg-arrowhead"/></marker></defs>';

  EX.MOD['cl-4'] = {
    id: 'cl-4', icon: '⌨️', title: 'Claude Code a fondo: de usuario avanzado a maestro',
    desc: 'La herramienta con la que construiste RRB, completa: cómo funciona, todos los comandos, CLAUDE.md y reglas, permisos y sandbox, modo plan, Skills (/deploy), subagentes con rol, hooks, MCP, contexto y coste, automatización (rutinas, headless, worktrees, workflows), plugins y las buenas prácticas de Anthropic.',
    goals: [
      'Dominar el ciclo explorar → planear → construir → verificar con modo plan y fases.',
      'Repartir tu CLAUDE.md en núcleo + reglas por carpeta y crear la Skill /deploy con el ritual completo.',
      'Definir subagentes con rol y modelo (auditor, constructor, verificador móvil) y hooks que protejan el negocio.',
      'Conectar MCP (GitHub, Drive, Playwright), preaprobar permisos con seguridad y controlar contexto y coste.',
      'Automatizar con /loop, Rutinas, headless, worktrees y workflows, y empaquetar todo en un plugin.'
    ],
    lessons: [
      /* ------------------------------------------------------------------ */
      {
        id: 'cl-4-1', title: 'Cómo funciona Claude Code (y dónde corre)', minutes: 13, level: 'intermedio',
        summary: 'El bucle agente en tu terminal: herramientas, permisos, contexto. Terminal, IDE, escritorio, web con sesiones en la nube, Remote Control y GitHub Actions.',
        body: () => [
          B.lead('Claude Code es Claude con manos: puede leer y editar archivos, ejecutar comandos, buscar en la web y usar herramientas externas, en un bucle que dura hasta que la tarea está hecha. Llevas meses usándolo; esto es lo que pasa por dentro.'),
          B.h('El bucle'),
          B.fig('<svg viewBox="0 0 640 200">' + ARROW +
            '<rect x="20" y="70" width="120" height="60" rx="10" class="fg-claude"/><text x="45" y="105">Tu petición</text>' +
            '<line x1="140" y1="100" x2="190" y2="100" class="fg-arrow"/>' +
            '<rect x="195" y="70" width="130" height="60" rx="10" class="fg-brand"/><text x="215" y="96">Claude piensa</text><text x="205" y="116" class="sm">¿qué herramienta uso?</text>' +
            '<line x1="325" y1="100" x2="375" y2="100" class="fg-arrow"/>' +
            '<rect x="380" y="70" width="130" height="60" rx="10" class="fg-warn"/><text x="395" y="96">Herramienta</text><text x="390" y="116" class="sm">Read, Edit, Bash, MCP…</text>' +
            '<path d="M445,130 L445,165 L260,165 L260,130" class="fg-arrow"/><text x="290" y="185" class="sm">resultado → vuelve a pensar (hasta terminar)</text>' +
            '<line x1="510" y1="100" x2="560" y2="100" class="fg-arrow"/><rect x="565" y="70" width="65" height="60" rx="10" class="fg-ok"/><text x="577" y="105">Listo</text></svg>',
            'Cada vuelta del bucle es un turno del modelo. Una tarea de una hora son cientos de vueltas.'),
          B.p('Las herramientas integradas: <b>Read</b>, <b>Write</b>, <b>Edit</b> (archivos), <b>Bash</b> (comandos), <b>Glob</b> y <b>Grep</b> (buscar), <b>WebSearch</b> y <b>WebFetch</b>, <b>Agent</b> (lanzar subagentes), <b>TodoWrite</b> (lista de tareas), más las que aporten los <b>servidores MCP</b> que conectes (GitHub, Playwright, Drive…). Cada llamada pasa por el <b>sistema de permisos</b>: según el modo, Claude pregunta, actúa solo con lo preaprobado o actúa sin preguntar.'),
          B.h('Qué carga al arrancar'),
          B.p('Al iniciar una sesión, Claude Code monta el contexto: system prompt de la herramienta, tu <b>CLAUDE.md</b> (jerarquía: gestionado por la organización → usuario <code>~/.claude/CLAUDE.md</code> → proyecto <code>./CLAUDE.md</code> → local <code>CLAUDE.local.md</code>), las reglas de <code>.claude/rules/</code> aplicables, la <b>memoria automática</b> (primeras 200 líneas), la descripción de las <b>Skills</b> disponibles, los nombres de las herramientas MCP (los esquemas completos se cargan bajo demanda), y un snapshot del estado de git. Por eso un CLAUDE.md de 677 líneas pesa: va en cada turno.'),
          B.h('Dónde corre'),
          B.table(['Superficie', 'Qué aporta', 'Cuándo'], [
            ['<b>Terminal</b> (<code>claude</code>)', 'Todo el conjunto de funciones; la referencia', 'Trabajo diario; scripts; servidores'],
            ['<b>App de escritorio, pestaña Code</b>', 'Diff visual, varias sesiones en paralelo, gestor de worktrees, vista de agentes en segundo plano', 'Tu centro de mando (lo que usas)'],
            ['<b>VS Code / JetBrains</b>', 'Claude dentro del editor, con el archivo abierto como contexto', 'Si editas a mano a la vez'],
            ['<b>Web: claude.ai/code</b>', 'Sesiones en la <b>nube</b> sobre tus repos de GitHub, sin tu ordenador; <b>Rutinas</b> programadas; abre PRs', 'Tareas largas, programadas, desde el móvil'],
            ['<b>Remote Control</b>', 'Dirigir desde el navegador o el móvil una sesión que corre en tu Mac', 'Dejar algo trabajando y seguirlo desde el teléfono'],
            ['<b>GitHub Actions</b> (<code>anthropics/claude-code-action</code>)', 'Claude responde a @claude en issues y PRs, revisa código, arregla CI', 'Revisiones automáticas en tus cuatro repos'],
            ['<b>Slack</b>', 'Lanzar y seguir sesiones desde Slack', 'Equipo']
          ]),
          B.h('Sesiones: continuar, reanudar, bifurcar'),
          B.p('Cada sesión tiene historial propio. <code>claude --continue</code> (o <code>-c</code>) retoma la última; <code>claude --resume</code> abre un selector; <code>/rename nombre</code> la nombra para encontrarla luego; <code>--fork-session</code> crea una rama de la sesión actual para explorar una alternativa sin perder la principal. Tus sesiones de días con compactaciones son esto: una sesión larga reanudada. La lección 10 explica cuándo conviene cerrarla.'),
          B.h('Instalación y arranque'),
          B.code('bash', '# macOS / Linux\ncurl -fsSL https://claude.ai/install.sh | bash\n# o con Homebrew\nbrew install --cask claude-code\n\ncd /ruta/al/repo\nclaude                      # sesión interactiva\nclaude "arregla el bug del login"   # con petición inicial\nclaude -p "resume este repo"        # modo no interactivo (headless): responde y sale\nclaude --continue           # retomar la última sesión\nclaude --model claude-opus-5        # elegir modelo al arrancar', 'Arranque'),
          B.key('Claude Code = modelo + herramientas + permisos + contexto (CLAUDE.md, reglas, memoria, skills, MCP) en un bucle. Todo lo que viene en este módulo es afinar una de esas cuatro piezas.'),
          B.check('¿Qué se carga en el contexto en cada turno de una sesión de Claude Code?', ['Solo tu último mensaje', 'System prompt, CLAUDE.md y reglas aplicables, memoria automática, descripción de Skills, nombres de herramientas MCP e historial', 'Solo el código del repo', 'Nada, Claude lo recuerda'], 1, 'Por eso el tamaño del CLAUDE.md y el ruido del historial importan tanto.'),
          B.cards([
            { icon: '🔁', title: 'Bucle', html: 'Pensar → herramienta → resultado → pensar. Cientos de vueltas por tarea.' },
            { icon: '🛠️', title: 'Herramientas', html: 'Read/Write/Edit, Bash, Glob/Grep, Web, Agent, MCP.' },
            { icon: '🌐', title: 'Superficies', html: 'Terminal, escritorio, IDE, web (nube + Rutinas), Remote Control, Actions.' },
            { icon: '🧵', title: 'Sesiones', html: '--continue, --resume, /rename, --fork-session.' }
          ])
        ],
        quiz: [
          { q: 'La opción para ejecutar Claude Code sin interfaz interactiva (responde y sale) es…', o: ['--quiet', '-p (print / headless)', '--fast', '--bare'], a: 1, why: '-p "petición". Base de scripts y CI. --bare además omite hooks y CLAUDE.md para arranque rápido.' },
          { q: 'Las sesiones de Claude Code en la nube (claude.ai/code)…', o: ['requieren tu ordenador encendido', 'corren en infraestructura de Anthropic sobre tus repos de GitHub y admiten Rutinas programadas', 'solo sirven para chat', 'no pueden abrir PRs'], a: 1, why: 'Ideales para tareas largas y programadas; se siguen desde el móvil.' },
          { q: 'Los esquemas completos de todas las herramientas MCP se cargan al arrancar.', type: 'tf', a: false, why: 'Se cargan los nombres; los esquemas bajo demanda (tool search), para no llenar el contexto.' },
          { q: 'Para retomar la última sesión desde la terminal usas…', type: 'fill', a: ['claude --continue', '--continue', 'claude -c', '-c', 'continue'], why: 'claude --continue (o -c). --resume abre un selector de sesiones.' }
        ],
        cards: [
          ['¿Cómo funciona Claude Code?', 'Bucle: Claude piensa → llama una herramienta (Read, Edit, Bash, MCP…) → recibe el resultado → vuelve a pensar, hasta terminar. Cada llamada pasa por el sistema de permisos.'],
          ['¿Qué carga Claude Code al arrancar?', 'System prompt, CLAUDE.md (jerarquía organización → usuario → proyecto → local), reglas de .claude/rules aplicables, memoria automática (200 líneas), descripción de Skills, nombres de herramientas MCP, snapshot de git.'],
          ['Superficies de Claude Code', 'Terminal, app de escritorio (pestaña Code), VS Code/JetBrains, web claude.ai/code (sesiones en la nube + Rutinas), Remote Control, GitHub Actions, Slack.'],
          ['Comandos de sesión', 'claude --continue / -c (última), --resume (selector), /rename (nombrar), --fork-session (bifurcar), -p (headless), --model (elegir modelo).']
        ],
        resources: [
          { type: 'doc', t: 'Claude Code: How Claude Code works', u: 'https://code.claude.com/docs/en/how-claude-code-works', lang: 'EN' },
          { type: 'doc', t: 'Claude Code: Quickstart', u: 'https://code.claude.com/docs/en/quickstart', lang: 'EN' },
          { type: 'doc', t: 'Claude Code: Platforms', u: 'https://code.claude.com/docs/en/platforms', lang: 'EN' },
          { type: 'video', t: 'Boris Cherny (creador de Claude Code): Mastering Claude Code in 30 minutes', u: 'https://www.youtube.com/watch?v=6eBSHbLKuN0', lang: 'EN', min: 30, note: 'La charla de referencia. Todo lo que viene en este módulo, en media hora, por quien lo construyó.' },
          { type: 'doc', t: 'Claude Code: mapa completo de la documentación', u: 'https://code.claude.com/docs/en/claude_code_docs_map.md', lang: 'EN' }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'cl-4-2', title: 'Referencia: todos los comandos, atajos y opciones', minutes: 15, level: 'intermedio',
        summary: 'La chuleta completa: comandos de barra, atajos de teclado, prefijos, opciones de la línea de comandos y los ajustes más útiles. Para volver siempre que lo necesites.',
        body: () => [
          B.lead('Esta lección es de consulta. Léela una vez, guárdala (🔖) y vuelve cuando te preguntes "¿cómo se hacía…?". Está organizada por lo que quieres conseguir.'),
          B.h('Comandos de barra dentro de la sesión'),
          B.table(['Comando', 'Qué hace'], [
            ['<code>/help</code>', 'Lista comandos y skills disponibles'],
            ['<code>/clear [nombre]</code>', 'Conversación nueva con contexto vacío (opcionalmente nombrada). Úsalo al cambiar de tema'],
            ['<code>/compact [instrucciones]</code>', 'Resume el historial para liberar contexto; puedes indicar qué conservar: <code>/compact conserva las decisiones de deploy</code>'],
            ['<code>/context</code>', 'Muestra qué ocupa la ventana: system prompt, CLAUDE.md, memoria, skills, MCP, conversación'],
            ['<code>/cost</code> · <code>/usage</code>', 'Tokens y coste de la sesión; límites de la suscripción y cuándo se renuevan'],
            ['<code>/model [nombre]</code>', 'Cambia de modelo en la sesión (Fable, Opus, Sonnet, Haiku)'],
            ['<code>/effort [nivel]</code>', 'Esfuerzo de razonamiento: low, medium, high, xhigh, max'],
            ['<code>/config</code>', 'Ajustes sin editar archivos (tema, modelo por defecto, effort…)'],
            ['<code>/permissions</code>', 'Ver y editar reglas de permiso (permitir/denegar herramientas y comandos)'],
            ['<code>/memory</code>', 'Abrir y editar CLAUDE.md, memoria automática y archivos de memoria por ámbito'],
            ['<code>/init</code>', 'Genera un CLAUDE.md inicial analizando el proyecto (o propone mejoras si existe)'],
            ['<code>/doctor</code>', 'Diagnóstico: configuración, skills y servidores sin usar, CLAUDE.md que podar'],
            ['<code>/rewind</code> (o Esc Esc)', 'Volver a un punto de control: restaurar código, conversación o ambos; o resumir desde ahí'],
            ['<code>/resume</code> · <code>/rename</code>', 'Selector de sesiones; nombrar la actual'],
            ['<code>/agents</code>', 'Listar y gestionar subagentes; lanzar tareas en segundo plano'],
            ['<code>/mcp</code>', 'Estado de servidores MCP, autenticar, reconectar'],
            ['<code>/hooks</code>', 'Ver y configurar hooks'],
            ['<code>/plugin</code>', 'Explorar, instalar, activar y desactivar plugins; pestaña de errores'],
            ['<code>/skills</code> · <code>/nombre-skill [args]</code>', 'Listar skills; invocar una (p. ej. <code>/deploy admin/js/x.js</code>)'],
            ['<code>/loop [intervalo] [petición]</code>', 'Repetir una petición cada N (p. ej. <code>/loop 10m revisa si el deploy responde</code>); sin intervalo, ritmo automático'],
            ['<code>/goal [condición]</code>', 'Fija un objetivo que se evalúa cada turno; Claude sigue hasta cumplirlo'],
            ['<code>/btw pregunta</code>', 'Pregunta al margen que no entra en el historial'],
            ['<code>/export</code>', 'Exportar la conversación'],
            ['<code>/sandbox</code>', 'Gestionar el aislamiento de comandos (sistema de archivos y red)'],
            ['<code>/import [codex|cursor|gemini]</code>', 'Importar configuración de otras herramientas'],
            ['<code>/code-review</code> · <code>/verify</code> · <code>/debug</code> · <code>/run</code>', 'Skills incluidas: revisar cambios, comprobar que funcionan, depurar, lanzar la app'],
            ['<code>/batch instrucción</code>', 'Lanzar de 5 a 30 subagentes en worktrees, cada uno abre un PR (migraciones masivas)'],
            ['<code>/mcp__servidor__prompt</code>', 'Ejecutar un prompt definido por un servidor MCP']
          ]),
          B.h('Atajos y prefijos'),
          B.table(['Tecla / prefijo', 'Efecto'], [
            ['<kbd>Esc</kbd>', 'Detener a Claude a mitad de acción (conserva el contexto)'],
            ['<kbd>Esc</kbd> <kbd>Esc</kbd>', 'Menú de rebobinado (puntos de control por cada mensaje)'],
            ['<kbd>Shift</kbd>+<kbd>Tab</kbd>', 'Ciclar modos de permiso (auto → manual → aceptar ediciones → plan → …)'],
            ['<kbd>Ctrl</kbd>+<kbd>G</kbd>', 'Editar el plan propuesto antes de aprobarlo (modo plan)'],
            ['<kbd>Ctrl</kbd>+<kbd>R</kbd>', 'Buscar en el historial de comandos'],
            ['<kbd>Ctrl</kbd>+<kbd>C</kbd>', 'Interrumpir / salir'],
            ['<code>!comando</code>', 'Ejecutar un comando de shell tú mismo; Claude ve la salida pero no lo ejecuta él'],
            ['<code>@archivo</code>', 'Mencionar un archivo para que Claude lo lea como contexto; <code>@servidor:recurso</code> para un recurso MCP'],
            ['<code>/</code> · <code>?</code> · <kbd>Tab</kbd>', 'Menú de comandos; ayuda; autocompletar'],
            ['Pegar imagen', 'Capturas como contexto (Ctrl/Cmd+V); arrastrar archivos']
          ]),
          B.h('Opciones de la línea de comandos'),
          B.code('bash', 'claude -p "petición"                 # headless: responde y sale\nclaude -p "…" --output-format json   # salida estructurada (o stream-json)\ncat log.txt | claude -p "qué falló"  # la entrada estándar entra como contexto\nclaude --continue | --resume | --fork-session\nclaude --model claude-fable-5-1\nclaude --permission-mode plan         # auto | acceptEdits | plan | dontAsk | bypassPermissions\nclaude --allowedTools "Read,Grep,Bash(git status *)"   # herramientas preaprobadas\nclaude --max-turns 20                 # tope de vueltas del bucle\nclaude --worktree nombre              # trabajar en un worktree aislado de git\nclaude --agent auditor                # usar un subagente como agente principal\nclaude --bare                         # sin hooks, memoria ni CLAUDE.md (CI, arranque rápido)\nclaude mcp add|list|get|remove …      # gestionar servidores MCP\nclaude plugin init|validate|marketplace add …', 'CLI'),
          B.h('Ajustes (settings.json) que conviene conocer'),
          B.p('Precedencia (el de abajo gana): gestionado por la organización → usuario <code>~/.claude/settings.json</code> → proyecto <code>.claude/settings.json</code> (va al repo) → local <code>.claude/settings.local.json</code> (no va al repo).'),
          B.table(['Clave', 'Para qué'], [
            ['<code>model</code>, <code>effortLevel</code>, <code>maxEffortLevel</code>', 'Modelo por defecto y esfuerzo'],
            ['<code>permissions.defaultMode</code>, <code>permissions.allow/deny/ask</code>, <code>permissions.additionalDirectories</code>', 'Modo de permisos, reglas por herramienta y comando, carpetas extra accesibles'],
            ['<code>sandbox.enabled</code>, <code>sandbox.filesystem.*</code>, <code>sandbox.network.allowedDomains</code>', 'Aislamiento de comandos: qué rutas y dominios'],
            ['<code>hooks</code>', 'Eventos y comandos a ejecutar (lección 8)'],
            ['<code>env</code>', 'Variables de entorno para la sesión (p. ej. rutas; nunca secretos en el repo)'],
            ['<code>autoMemoryEnabled</code>, <code>autoCompactEnabled</code>', 'Memoria automática y compactación automática'],
            ['<code>alwaysThinkingEnabled</code>, <code>showThinkingSummaries</code>', 'Pensamiento siempre; mostrar resúmenes del razonamiento'],
            ['<code>statusLine</code>', 'Línea de estado personalizada (rama, modelo, coste)'],
            ['<code>claudeMdExcludes</code>', 'Patrones de CLAUDE.md a ignorar (monorepos)'],
            ['<code>enabledPlugins</code>, <code>disableBundledSkills</code>, <code>skillOverrides</code>', 'Plugins y skills'],
            ['<code>allowedMcpServers</code>, <code>managedMcpServers</code>', 'Qué MCP se pueden añadir; MCP desplegados por la organización'],
            ['<code>attribution.commit</code>, <code>includeCoAuthoredBy</code>', 'Firma en los commits'],
            ['<code>editorMode: "vim"</code>, <code>defaultShell</code>, <code>remoteControlAtStartup</code>', 'Preferencias de edición, shell y Remote Control']
          ]),
          B.tip('Tres ajustes que te darán resultados esta semana: <code>effortLevel: "high"</code> en la sesión panel para lo importante; <code>permissions.allow</code> con tus lecturas y <code>git status/diff/log</code> (lección 4); y <code>statusLine</code> mostrando modelo y coste para decidir con datos.'),
          B.cards([
            { icon: '📇', title: 'Guárdala', html: 'Esta lección es tu chuleta. 🔖 arriba.' },
            { icon: '🧹', title: 'Contexto', html: '/clear, /compact, /context, /cost.' },
            { icon: '🎛️', title: 'Control', html: '/model, /effort, /permissions, Shift+Tab.' },
            { icon: '⏪', title: 'Rebobinar', html: 'Esc Esc o /rewind: código, conversación o ambos.' }
          ])
        ],
        quiz: [
          { q: '¿Qué comando muestra qué ocupa la ventana de contexto?', o: ['/cost', '/context', '/memory', '/doctor'], a: 1, why: '/context desglosa system prompt, CLAUDE.md, memoria, skills, MCP y conversación.' },
          { q: 'Para ejecutar tú un comando de shell y que Claude solo vea la salida, escribes…', o: ['/bash comando', '!comando', '$comando', '@comando'], a: 1, why: 'El prefijo ! ejecuta sin que Claude lo decida; @ menciona archivos.' },
          { q: 'Esc Esc abre el menú de rebobinado a puntos de control anteriores.', type: 'tf', a: true, why: 'Puedes restaurar código, conversación o ambos, o resumir desde ese punto.' },
          { q: 'El archivo de ajustes del proyecto que NO debe ir al repositorio (máquina concreta) es…', type: 'fill', a: ['settings.local.json', '.claude/settings.local.json', 'settings.local'], why: '.claude/settings.local.json; .claude/settings.json sí se comparte en el repo.' },
          { q: '/loop 10m "revisa X" hace que…', o: ['Claude revise X una vez en 10 minutos', 'Claude repita la petición cada 10 minutos mientras la sesión esté abierta', 'la sesión se cierre en 10 minutos', 'se cambie el modelo'], a: 1, why: 'Programación dentro de la sesión. Para correr sin sesión: Rutinas o cron.' }
        ],
        cards: [
          ['Comandos de contexto y coste', '/clear (nueva conversación), /compact [qué conservar], /context (qué ocupa), /cost y /usage (gasto y límites).'],
          ['Comandos de control', '/model, /effort (low→max), /permissions, /config, /memory, /doctor, /rewind (Esc Esc), Shift+Tab (ciclar modos).'],
          ['Prefijos en el prompt', '!comando ejecuta shell tú mismo (Claude ve la salida); @archivo o @servidor:recurso añade contexto; / abre el menú de comandos y skills.'],
          ['Precedencia de settings.json', 'Organización (gestionado) → usuario ~/.claude/settings.json → proyecto .claude/settings.json (repo) → local .claude/settings.local.json (no repo). El más específico gana.']
        ],
        resources: [
          { type: 'doc', t: 'Claude Code: Commands (referencia completa)', u: 'https://code.claude.com/docs/en/commands', lang: 'EN' },
          { type: 'doc', t: 'Claude Code: CLI reference', u: 'https://code.claude.com/docs/en/cli-reference', lang: 'EN' },
          { type: 'doc', t: 'Claude Code: Settings reference', u: 'https://code.claude.com/docs/en/settings-reference', lang: 'EN' },
          { type: 'doc', t: 'Claude Code: Interactive mode (atajos)', u: 'https://code.claude.com/docs/en/interactive-mode', lang: 'EN' }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'cl-4-3', title: 'CLAUDE.md, reglas por carpeta y memoria automática', minutes: 14, level: 'intermedio',
        summary: 'La jerarquía de archivos de memoria, cómo repartir tu CLAUDE.md de 677 líneas, la sintaxis de reglas por ruta e imports, y cómo gestionar la memoria automática.',
        body: () => [
          B.lead('En la lección 2.3 viste el criterio de reparto. Aquí está la mecánica exacta en Claude Code, con tu repositorio como ejemplo.'),
          B.h('Jerarquía de CLAUDE.md'),
          B.table(['Nivel', 'Ruta', 'Uso'], [
            ['Organización', '<code>/Library/Application Support/ClaudeCode/CLAUDE.md</code> (macOS), <code>/etc/claude-code/CLAUDE.md</code> (Linux)', 'Políticas para todos; no se puede excluir'],
            ['Usuario', '<code>~/.claude/CLAUDE.md</code>', 'Tus preferencias en todos los proyectos: "háblame de tú, en español, frases cortas; nunca secretos en el repo"'],
            ['Proyecto', '<code>./CLAUDE.md</code> o <code>./.claude/CLAUDE.md</code>', 'Compartido con el equipo vía git. El núcleo de RRB'],
            ['Local', '<code>./CLAUDE.local.md</code>', 'Específico de tu máquina; en <code>.gitignore</code>'],
            ['Subcarpetas', '<code>admin/CLAUDE.md</code>, <code>api/CLAUDE.md</code>…', 'Se cargan cuando Claude lee archivos de esa carpeta']
          ]),
          B.h('Reglas por ruta: .claude/rules/'),
          B.p('Archivos Markdown con un encabezado que dice a qué rutas aplican. Solo se cargan cuando Claude toca archivos que coinciden. Es la herramienta para tu esquema de base de datos:'),
          B.code('markdown', '---\npaths: ["api/**", "admin/api/**", "sql/**"]\n---\n# Base de datos de la Oficina Virtual\n\n## Reglas que no se negocian\n- `pagovta` es la fuente de verdad de lo pagado. NUNCA sumar `depositos_transaccion` para saber lo cobrado (da duplicados).\n- Lectura por defecto. Escrituras solo por endpoints del admin, nunca SQL directo, salvo que Miguel lo apruebe en el turno.\n\n## Tipos de transacción\n- 7/8: notas pendientes de pago (centro 50 = Internet: web, app, Maya)\n- 10/11: pagadas; `statusentrega` PENDIENTE hasta que hay guía\n\n## Columnas reales (extracto)\n[esquema…]', '.claude/rules/db.md'),
          B.p('Y otros archivos: <code>admin.md</code> (<code>paths: ["admin/**"]</code>: módulos, arquitectura, archivos JS, cómo verificar a tamaño teléfono), <code>api.md</code> (endpoints, flujos de pago y entrega, vouchers, regalías), <code>whats.md</code>, <code>mobile.md</code> (<code>mobile/**</code>: Expo, lo publica Miguel). Los archivos se pueden compartir entre repos con enlaces simbólicos.'),
          B.h('Imports: @archivo'),
          B.p('Dentro de un CLAUDE.md, <code>@ruta/archivo.md</code> incluye el contenido de otro archivo al cargar (hasta 4 niveles). Útil para no duplicar: <code>@docs/apis-externas.md</code>, <code>@_maestro_wip/DECISIONES.md</code>. Los imports fuera del directorio de trabajo piden aprobación la primera vez.'),
          B.h('Tu CLAUDE.md raíz, después del reparto'),
          B.code('markdown', '# Oficina Virtual RRB\nSistema de RRB México (Real Rich Business): admin (admin/), API (api/), web app (web-app/), app móvil Expo (mobile/), primer agente WhatsApp (whats/).\n\n## Cómo trabajamos\n- Español, de tú, frases cortas. Ejemplos con regalías, Maya o el admin.\n- Propuesta corta con opciones y UNA recomendación antes de construir algo grande. Miguel decide en una línea.\n- Fases chicas con luz verde. NADA a producción sin su sí explícito en el turno.\n- Verificar en navegador a 390 px y enseñar captura. Sesión temporal en admin_sessions; borrarla después.\n\n## Reglas duras (por qué: cumplimiento y dinero)\n- Plata 1000 y Acqua 1000 nunca son "plata coloidal". Sin afirmaciones de salud ni promesas de ingresos (COFEPRIS/FTC).\n- Secretos fuera del repo: variables de entorno. Nunca config.php al servidor (tiene constantes que no están en el repo).\n- El servidor es la fuente de verdad: bajar y comparar antes de editar. Deploy solo con /deploy.\n- pagovta = lo pagado. Ver .claude/rules/db.md.\n\n## Comandos\n- Lectura de BD: `node tools/consulta.js "SELECT …"` (solo lectura)\n- Pruebas: `npm test` en whats/; PHP: lint con `php -l`\n- Deploy: skill /deploy (ritual completo)\n\n## Documentos\n@docs/MAESTRO.md\n@_maestro_wip/DECISIONES.md', 'CLAUDE.md raíz (~60 líneas). El resto vive en .claude/rules/ y en Skills.'),
          B.h('Memoria automática'),
          B.p('Claude Code guarda por su cuenta aprendizajes en <code>~/.claude/projects/&lt;proyecto&gt;/memory/MEMORY.md</code> (compartida entre worktrees del mismo repo): tu rol, correcciones, contexto descubierto. Al arrancar carga las primeras 200 líneas (o 25 KB). Se gestiona con <code>/memory</code>; se desactiva con <code>autoMemoryEnabled: false</code>. Tus 32 memorias son esto. Mantenimiento mensual: borrar lo obsoleto, y <b>promover</b> a CLAUDE.md o a una regla lo que se ha convertido en norma (el ritual de deploy vivía ahí: debe ser una Skill).'),
          B.h('Buenas prácticas de contenido'),
          B.compare('Incluye', ['Comandos de build, test y despliegue.', 'Convenciones de código y de commits.', 'Reglas de negocio no deducibles, con su porqué.', 'Cómo verificar (navegador, tamaño, datos reales).', 'Trampas conocidas (archivos que viven solo en el servidor).', 'Etiqueta del repo (qué no tocar, cuándo pedir permiso).'],
            'Excluye', ['Lo que Claude puede leer en el código.', 'Convenciones estándar del lenguaje.', 'Documentación larga de APIs (enlázala).', 'Esquemas completos (a reglas por ruta).', 'Historia de decisiones (a docs/).', 'Instrucciones repetidas o vagas ("sé cuidadoso").']),
          B.key('CLAUDE.md corto y con porqués; reglas por ruta para lo voluminoso; imports para no duplicar; memoria automática revisada y promovida. Con eso, Claude obedece mejor y cada turno cuesta menos. <code>/doctor</code> te dice qué sobra.'),
          B.check('¿Dónde pones el esquema completo de la base de datos para que solo cargue cuando toca?', ['CLAUDE.md raíz', '.claude/rules/db.md con paths de api/, admin/api/ y sql/', 'En la memoria automática', 'En cada mensaje'], 1, 'Reglas por ruta: se cargan solo al tocar archivos que coinciden.'),
          B.cards([
            { icon: '🪜', title: 'Jerarquía', html: 'Organización → usuario → proyecto → local → subcarpetas.' },
            { icon: '📁', title: 'rules/ con paths', html: 'Voluminoso y por área. Solo carga cuando toca.' },
            { icon: '📎', title: '@import', html: 'Incluir docs sin duplicar (4 niveles).' },
            { icon: '🧠', title: 'Memoria automática', html: '200 líneas al inicio. Revisar y promover.' }
          ])
        ],
        quiz: [
          { q: 'El CLAUDE.md que se comparte con el equipo por git es…', o: ['~/.claude/CLAUDE.md', './CLAUDE.md (o ./.claude/CLAUDE.md)', 'CLAUDE.local.md', 'MEMORY.md'], a: 1, why: 'Proyecto. El local (CLAUDE.local.md) va en .gitignore; el de usuario es personal.' },
          { q: 'Un archivo en .claude/rules/ con paths: ["admin/**"] se carga…', o: ['siempre', 'solo cuando Claude toca archivos dentro de admin/', 'nunca', 'solo con /memory'], a: 1, why: 'Reduce el contexto y evita diluir las reglas.' },
          { q: 'La memoria automática se carga completa al arrancar, sin límite.', type: 'tf', a: false, why: 'Las primeras 200 líneas o 25 KB de MEMORY.md. Por eso conviene mantenerla limpia.' },
          { q: 'La sintaxis para incluir otro archivo dentro de CLAUDE.md es…', type: 'fill', a: ['@archivo', '@ruta', '@', '@ruta/archivo.md', 'arroba'], why: '@ruta/archivo.md, hasta 4 niveles; fuera del directorio pide aprobación.' },
          { q: 'Un ritual paso a paso que hoy vive en la memoria automática debería convertirse en…', o: ['una regla por ruta', 'una Skill', 'un import', 'nada'], a: 1, why: 'Procedimiento → Skill. La memoria es para correcciones y aprendizajes.' }
        ],
        cards: [
          ['Jerarquía de CLAUDE.md', 'Organización (gestionado) → usuario ~/.claude/CLAUDE.md → proyecto ./CLAUDE.md (repo) → local CLAUDE.local.md (gitignore) → subcarpetas (bajo demanda).'],
          ['¿Qué son las reglas por ruta (.claude/rules/)?', 'Archivos .md con frontmatter paths: ["glob"] que se cargan solo cuando Claude toca archivos que coinciden. Para esquemas, convenciones por área. Compartibles por enlace simbólico.'],
          ['¿Cómo funciona la memoria automática de Claude Code?', 'Claude guarda aprendizajes en ~/.claude/projects/<proyecto>/memory/MEMORY.md; carga las primeras 200 líneas al inicio; se gestiona con /memory; se desactiva con autoMemoryEnabled: false. Revisar mensualmente y promover lo que es regla.'],
          ['Qué incluir y excluir en CLAUDE.md', 'Incluir: comandos, convenciones, reglas no deducibles con porqué, cómo verificar, trampas. Excluir: lo legible en el código, estándares del lenguaje, docs largas (enlazar), esquemas (a rules), historia (a docs).']
        ],
        resources: [
          { type: 'doc', t: 'Claude Code: Memory (CLAUDE.md, rules, imports, auto memory)', u: 'https://code.claude.com/docs/en/memory', lang: 'EN' },
          { type: 'doc', t: 'Claude Code: Best practices, sección CLAUDE.md', u: 'https://code.claude.com/docs/en/best-practices', lang: 'EN' },
          { type: 'article', t: 'Anthropic Engineering: Claude Code best practices (artículo original)', u: 'https://www.anthropic.com/engineering/claude-code-best-practices', lang: 'EN' }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'cl-4-4', title: 'Permisos, modos y sandbox: velocidad sin miedo', minutes: 14, level: 'intermedio',
        summary: 'Los modos de permiso, la sintaxis de reglas allow/deny/ask, la lista de lo que puedes preaprobar hoy en RRB sin riesgo, y el sandbox de comandos.',
        body: () => [
          B.lead('Cada pregunta de permiso que Claude te hace es una interrupción. Preaprobar lo inocuo y bloquear lo peligroso te devuelve horas y te da más seguridad, no menos. Esta es la configuración para tu repositorio.'),
          B.h('Los modos'),
          B.table(['Modo', 'Comportamiento', 'Cuándo'], [
            ['<b>Auto</b> (por defecto en Pro/Max/Team)', 'Un clasificador revisa cada acción en segundo plano y solo te pregunta ante riesgo (escalada de alcance, infraestructura desconocida, contenido hostil)', 'Trabajo diario en repos de confianza'],
            ['<b>Manual</b>', 'Pregunta antes de cada edición y comando (salvo los preaprobados)', 'Repos nuevos o ajenos; tareas delicadas'],
            ['<b>Aceptar ediciones</b> (acceptEdits)', 'Aprueba cambios de archivos y comandos comunes de sistema de archivos; pregunta el resto', 'Construir dentro del repo'],
            ['<b>Plan</b>', 'Solo lectura: explora y propone, no cambia nada', 'Antes de construir algo grande (siguiente lección)'],
            ['<b>No preguntar</b> (dontAsk)', 'Deniega todo lo no preaprobado, sin preguntar', 'Scripts y CI con lista blanca estricta'],
            ['<b>Sin permisos</b> (bypassPermissions)', 'No comprueba nada', 'Solo dentro de un contenedor aislado sin credenciales de producción']
          ]),
          B.p('Se cambia con <kbd>Shift</kbd>+<kbd>Tab</kbd>, con <code>--permission-mode</code> al arrancar o con <code>permissions.defaultMode</code> en ajustes.'),
          B.h('Reglas: allow, deny, ask'),
          B.p('Las reglas nombran una herramienta y, opcionalmente, un patrón: <code>Bash(comando *)</code> (prefijo), <code>Read(./ruta/**)</code>, <code>Edit(src/**/*.ts)</code>, <code>WebFetch(domain:ejemplo.com)</code>, <code>mcp__servidor__herramienta</code>, <code>Agent(nombre)</code>. <b>deny</b> gana sobre <b>allow</b>; <b>ask</b> fuerza pregunta. Van en <code>permissions</code> de settings.json o se editan con <code>/permissions</code>.'),
          B.ex('Permisos para la Oficina Virtual (según lo que panel pide a diario)', [
            B.code('json', '{\n  "permissions": {\n    "defaultMode": "auto",\n    "allow": [\n      "Read", "Glob", "Grep",\n      "Bash(git status *)", "Bash(git diff *)", "Bash(git log *)", "Bash(git add *)", "Bash(git commit *)",\n      "Bash(node tools/consulta.js *)",\n      "Bash(curl -s https://api.sistemarrb.com/*)",\n      "Bash(php -l *)", "Bash(npm test *)",\n      "Bash(ls *)", "Bash(cat *)", "Bash(diff *)", "Bash(md5 *)", "Bash(md5sum *)"\n    ],\n    "ask": [\n      "Bash(git push *)",\n      "Bash(curl * -T *)", "Bash(curl * -Q *)",\n      "Bash(node tools/escribe.js *)",\n      "Edit(mobile/**)"\n    ],\n    "deny": [\n      "Read(./**/.env*)", "Read(./**/config.php)", "Edit(./**/config.php)",\n      "Bash(rm -rf *)", "Bash(git push --force *)", "Bash(git stash *)",\n      "Bash(mysql *)", "Bash(drop *)"\n    ]\n  }\n}', '.claude/settings.json'),
            B.p('Lectura: <b>allow</b> = lecturas, git local, la consulta de solo lectura, curl GET a producción, lint y tests. <b>ask</b> = todo lo que escribe en el servidor o en git remoto o en la base. <b>deny</b> = secretos, config.php, destructivos, y <code>git stash</code> (se llevó cambios de otra sesión en un worktree compartido). Ajusta los nombres de tus scripts.')
          ]),
          B.warn('<code>--dangerously-skip-permissions</code> (equivalente a bypassPermissions) solo tiene sentido en un contenedor sin acceso a producción ni a credenciales reales: allí Claude puede iterar libre y nada de lo que rompa importa. En tu Mac, con FTP a producción y la base real, nunca.'),
          B.h('Sandbox: aislar los comandos'),
          B.p('El sandbox limita lo que los comandos Bash pueden tocar: rutas de lectura/escritura y dominios de red. Se activa con <code>sandbox.enabled: true</code> y se afina con <code>sandbox.filesystem.denyRead</code>, <code>allowWrite</code>, <code>sandbox.network.allowedDomains</code> (p. ej. solo <code>api.sistemarrb.com</code>, <code>github.com</code>, tu host FTP). Los comandos siguen preguntando permiso según las reglas, pero aunque uno se cuele, no puede salir del cerco. Se gestiona con <code>/sandbox</code>.'),
          B.h('Directorios adicionales y confianza'),
          B.p('Claude solo accede al directorio de trabajo (y a lo que añadas con <code>permissions.additionalDirectories</code> o <code>/add-dir</code>). Al abrir un repo nuevo aparece el <b>diálogo de confianza</b>: hooks y configuración del repo no se ejecutan hasta que confías. Revisa el CLAUDE.md y <code>.claude/</code> de cualquier repo ajeno antes de confiar: pueden contener instrucciones maliciosas.'),
          B.key('Auto para el día a día; allow para lo inocuo que repites; ask para lo que escribe fuera de tu máquina; deny para secretos y destructivos; sandbox como cerco. Resultado: menos preguntas y más seguridad a la vez.'),
          B.check('Quieres que Claude nunca lea ni edite config.php ni ejecute git stash, pero que haga git status sin preguntar. ¿Dónde va cada cosa?', ['Todo en allow', 'config.php y git stash en deny; git status en allow', 'Todo en ask', 'No se puede'], 1, 'deny gana sobre allow. Lo inocuo y frecuente, preaprobado.'),
          B.cards([
            { icon: '🔄', title: 'Modos', html: 'Auto, manual, acceptEdits, plan, dontAsk, bypass. Shift+Tab.' },
            { icon: '📜', title: 'allow / ask / deny', html: 'Bash(prefijo *), Read(ruta/**), Edit(…). deny gana.' },
            { icon: '📦', title: 'Sandbox', html: 'Rutas y dominios permitidos para comandos.' },
            { icon: '🚫', title: 'Nunca en tu Mac', html: 'bypassPermissions con acceso a producción.' }
          ])
        ],
        quiz: [
          { q: 'El modo de permisos que solo lee y propone sin cambiar nada es…', o: ['Auto', 'Plan', 'acceptEdits', 'dontAsk'], a: 1, why: 'Modo plan: explorar y planificar antes de construir.' },
          { q: 'Si una herramienta aparece en allow y en deny…', o: ['gana allow', 'gana deny', 'pregunta', 'error'], a: 1, why: 'deny tiene precedencia. Así proteges secretos aunque haya reglas amplias de lectura.' },
          { q: 'bypassPermissions es adecuado para tu Mac con acceso FTP a producción.', type: 'tf', a: false, why: 'Solo en un contenedor aislado sin credenciales reales. En tu máquina, nunca.' },
          { q: 'La regla para permitir cualquier comando que empiece por "git status" es…', type: 'fill', a: ['Bash(git status *)', 'Bash(git status*)', 'bash(git status *)'], why: 'Bash(prefijo *): el asterisco final indica coincidencia por prefijo.' },
          { q: 'El sandbox de Claude Code sirve para…', o: ['acelerar los comandos', 'limitar qué rutas y dominios pueden tocar los comandos, como cerco adicional a los permisos', 'ocultar el código', 'cambiar de modelo'], a: 1, why: 'Aunque un comando se cuele, no sale del cerco. /sandbox para gestionarlo.' }
        ],
        cards: [
          ['Modos de permiso de Claude Code', 'Auto (clasificador, por defecto en Pro/Max/Team), manual (pregunta todo), acceptEdits (aprueba ediciones), plan (solo lectura), dontAsk (deniega lo no preaprobado), bypassPermissions (sin comprobar; solo en contenedor). Shift+Tab para ciclar.'],
          ['Sintaxis de reglas de permiso', 'Bash(comando *), Read(./ruta/**), Edit(glob), WebFetch(domain:x), mcp__servidor__tool, Agent(nombre). Listas allow, ask y deny en permissions; deny gana. /permissions para editar.'],
          ['Permisos recomendados para RRB', 'allow: lecturas, git local, consulta de solo lectura, curl GET a producción, lint/tests. ask: git push, subir/renombrar por FTP, escrituras en BD, mobile/. deny: .env, config.php, rm -rf, push --force, git stash, mysql directo.'],
          ['¿Qué es el sandbox de Claude Code?', 'Aislamiento de comandos Bash: rutas de lectura/escritura y dominios de red permitidos (sandbox.enabled, filesystem.*, network.allowedDomains). Cerco adicional a los permisos; /sandbox para gestionarlo.']
        ],
        resources: [
          { type: 'doc', t: 'Claude Code: Permissions', u: 'https://code.claude.com/docs/en/permissions', lang: 'EN' },
          { type: 'doc', t: 'Claude Code: Permission modes', u: 'https://code.claude.com/docs/en/permission-modes', lang: 'EN' },
          { type: 'doc', t: 'Claude Code: Sandboxing', u: 'https://code.claude.com/docs/en/sandboxing', lang: 'EN' },
          { type: 'doc', t: 'Claude Code: Security guidance', u: 'https://code.claude.com/docs/en/security-guidance', lang: 'EN' }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'cl-4-5', title: 'Modo plan y el ciclo explorar → planear → construir → verificar', minutes: 13, level: 'intermedio',
        summary: 'El flujo que Anthropic recomienda para cualquier cambio no trivial, con puntos de control y verificación real. Es tu "primero la propuesta" y tus "fases con luz verde", formalizados.',
        body: () => [
          B.lead('La capa móvil salió en fases 0→3 en dos días porque, sin saberlo, seguiste el ciclo que Anthropic recomienda. Aquí está con nombre, para que lo repitas a propósito en cada cambio grande.'),
          B.h('El ciclo'),
          B.steps('Explorar → Planear → Construir → Verificar → Confirmar', [
            '<b>Explorar</b> (modo plan, <kbd>Shift</kbd>+<kbd>Tab</kbd> hasta "plan"). Claude lee lo que haga falta sin cambiar nada: "Lee admin/js/pedidos.js y api/pedidos.php, y las reglas de db.md; todavía no propongas nada". Pídele que use subagentes para explorar si hay mucho que leer: así el contexto principal queda limpio.',
            '<b>Planear</b>. "Ahora propón un plan con opciones A/B y tu recomendación, por fases, con qué verificaremos en cada fase". Claude presenta el plan; con <kbd>Ctrl</kbd>+<kbd>G</kbd> puedes editarlo antes de aprobar. Aquí decides tú: es la propuesta corta que te gusta. Si el plan es grande, pide que lo guarde en <code>_maestro_wip/PLAN-x.md</code> para sobrevivir a compactaciones.',
            '<b>Construir</b> (sales del modo plan). Fase 1 y solo fase 1. Claude implementa. Si se desvía, <kbd>Esc</kbd> y corrige; si se desvía dos veces, <kbd>Esc</kbd> <kbd>Esc</kbd> al punto de control y reformula.',
            '<b>Verificar</b>. Dale siempre un medio de comprobación: tests, lint, la app abierta a 390 px, una consulta a datos reales, una captura antes/después. "Ábrelo en el navegador a tamaño teléfono, recorre las 5 pantallas y mándame las capturas". Sin verificación, es una demo.',
            '<b>Confirmar</b>. Tú ves las capturas, dices "todo me está gustando, vamos a la siguiente", y se hace el commit con mensaje en español que dice qué cambió para el usuario. Fase siguiente. Al terminar, <code>/deploy</code>.'
          ]),
          B.key('Cada fase es un punto de control con tu luz verde. Nunca "hazlo todo y avísame": el coste de corregir crece con cada paso que se construye sobre un supuesto malo. Y nunca construir sin haber leído primero: el 80 % de los errores de Claude en código vienen de no haber explorado lo suficiente.'),
          B.h('Modo plan: qué hace exactamente'),
          B.p('En modo plan Claude solo puede leer (Read, Glob, Grep, WebSearch, subagentes de exploración). No edita ni ejecuta comandos que cambien estado. Al terminar de investigar propone un plan; puedes aprobarlo, editarlo o pedir otro enfoque. Es la forma más barata de evitar retrabajo y de forzar la separación entre diagnóstico y fix que ya practicas. Puedes arrancar directamente en plan: <code>claude --permission-mode plan</code>.'),
          B.h('/goal: que no se rinda'),
          B.p('Para tareas con un criterio de éxito claro (todos los tests pasan, la página responde 200, el eval supera el 95 %), <code>/goal "condición"</code> hace que un evaluador separado compruebe cada turno si se ha cumplido y Claude siga trabajando hasta lograrlo. Es la versión de Claude Code de tus rituales de verificación. Y para corregir un rumbo sin perder el trabajo: <code>/rewind</code> permite restaurar solo el código, solo la conversación, o ambos.'),
          B.h('Verificación que cuenta'),
          B.table(['Tipo de cambio', 'Verificación mínima'], [
            ['Interfaz (admin, web app, móvil)', 'Navegador a 390 px y a escritorio; capturas de cada pantalla tocada; comprobar que nada se corta'],
            ['Endpoint PHP', '<code>php -l</code>; llamada real al endpoint <code>_pt_</code> con datos de prueba; comparar respuesta con la anterior'],
            ['Regla de dinero (regalías, pagos)', 'Casos de prueba con bordes; cuadre contra pagovta; revisión adversarial con Fable antes de desplegar'],
            ['Maya (tools, facts)', '<code>npm test</code>; reproducir la conversación fallida; eval de regresión si existe'],
            ['Consulta SQL nueva', 'Ejecutar en solo lectura con LIMIT; comparar con una cifra conocida']
          ]),
          B.ex('El ciclo aplicado a "programa de reactivación"', [
            B.olist([
              'Plan: "Lee cómo se calculan los activos (puntos por mes), la tabla de distribuidores y el módulo de campañas. No propongas nada". Claude lee con subagentes.',
              'Plan: "Propón A/B/C para detectar inactivos de 60/90/120 días y notificarlos por Maya; recomendación; fases; verificación por fase". Editas el plan (Ctrl+G): quitas la opción que manda mensajes sin tu aprobación.',
              'Construir fase 1: consulta de inactivos + pantalla en el admin. Verificar: capturas a 390 px, cifra de inactivos comparada con una consulta manual.',
              'Luz verde. Fase 2: plantilla de Meta y tool de Maya en modo propuesta (te enseña la lista antes de enviar). Verificar con 3 números de prueba tuyos.',
              'Luz verde. /deploy. Commit por fase. Documento en _maestro_wip con la decisión.'
            ])
          ]),
          B.check('Claude propone un plan de 6 fases para un cambio grande. ¿Qué haces?', ['Aprobar y pedir que lo haga todo', 'Editarlo si hace falta (Ctrl+G), aprobar, y construir solo la fase 1 con su verificación antes de seguir', 'Rechazarlo por largo', 'Pedir que lo haga sin plan'], 1, 'Fases con luz verde. El coste de corregir crece con cada paso sobre un supuesto malo.'),
          B.cards([
            { icon: '🔍', title: 'Explorar', html: 'Modo plan: leer sin cambiar. Subagentes para lo voluminoso.' },
            { icon: '🗺️', title: 'Planear', html: 'A/B con recomendación, por fases, con verificación. Ctrl+G para editar.' },
            { icon: '🔨', title: 'Construir', html: 'Una fase. Esc para corregir; Esc Esc para rebobinar.' },
            { icon: '✅', title: 'Verificar', html: 'Tests, 390 px, datos reales, capturas. /goal para insistir.' }
          ])
        ],
        quiz: [
          { q: 'En modo plan, Claude…', o: ['edita archivos con cuidado', 'solo lee y propone; no cambia nada', 'ejecuta comandos sin preguntar', 'no puede usar subagentes'], a: 1, why: 'Read, Glob, Grep, Web y exploración. Ideal para separar diagnóstico de fix.' },
          { q: 'Ctrl+G en modo plan sirve para…', o: ['salir', 'editar el plan propuesto antes de aprobarlo', 'cambiar de modelo', 'compactar'], a: 1, why: 'Tú ajustas el plan (quitas, cambias, añades) y luego se construye lo acordado.' },
          { q: '"Hazlo todo y avísame cuando termines" es una buena práctica para cambios grandes.', type: 'tf', a: false, why: 'Fases con luz verde y verificación por fase. El coste de corregir crece con cada paso sobre un supuesto malo.' },
          { q: 'El comando que fija una condición de éxito que se evalúa cada turno hasta cumplirse es…', type: 'fill', a: ['/goal', 'goal'], why: '/goal "condición". Un evaluador separado comprueba y Claude sigue hasta lograrlo.' },
          { q: 'La verificación mínima para un cambio de interfaz del admin es…', o: ['leer el código', 'abrirlo en el navegador a 390 px y a escritorio y mandar capturas de las pantallas tocadas', 'preguntar a Claude si funciona', 'desplegar y esperar quejas'], a: 1, why: 'Aprobar viendo. Es tu regla y la de Anthropic.' }
        ],
        cards: [
          ['El ciclo recomendado en Claude Code', 'Explorar (modo plan, solo lectura) → Planear (opciones + recomendación, por fases, con verificación; Ctrl+G para editar) → Construir una fase → Verificar (tests, 390 px, datos reales, capturas) → Confirmar (luz verde, commit) → siguiente fase.'],
          ['¿Qué es el modo plan?', 'Modo de permisos de solo lectura: Claude explora (Read, Grep, Web, subagentes) y propone un plan sin cambiar nada. Shift+Tab hasta "plan" o claude --permission-mode plan.'],
          ['/goal y /rewind', '/goal "condición": un evaluador comprueba cada turno y Claude sigue hasta cumplirla. /rewind (Esc Esc): restaurar código, conversación o ambos a un punto de control.'],
          ['Verificación mínima por tipo de cambio', 'Interfaz: navegador 390 px + capturas. PHP: php -l + llamada real al _pt_. Dinero: casos borde + cuadre + revisión adversarial. Maya: npm test + reproducir el caso. SQL: solo lectura con LIMIT y cifra conocida.']
        ],
        resources: [
          { type: 'doc', t: 'Claude Code: Best practices (Explore, plan, code, commit)', u: 'https://code.claude.com/docs/en/best-practices', lang: 'EN' },
          { type: 'doc', t: 'Claude Code: Goal (/goal)', u: 'https://code.claude.com/docs/en/goal', lang: 'EN' },
          { type: 'doc', t: 'Claude Code: Checkpointing y /rewind', u: 'https://code.claude.com/docs/en/checkpointing', lang: 'EN' },
          { type: 'video', t: 'Anthropic: Claude Code, plan mode y flujos de trabajo (canal oficial)', u: 'https://www.youtube.com/@anthropic-ai', lang: 'EN', note: 'Busca en el canal los vídeos de Claude Code: hay demostraciones cortas de plan mode, subagentes y hooks.' }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'cl-4-6', title: 'Skills: tus procedimientos como comandos (/deploy completa)', minutes: 17, level: 'avanzado',
        summary: 'Qué es una Skill, su formato, cómo se invoca, argumentos e inyección de comandos, y la Skill /deploy con el ritual completo de RRB paso a paso, lista para crear.',
        body: () => [
          B.lead('El ritual de deploy vive hoy en la memoria de una sesión. Si esa sesión se reinicia o abres otra, se pierde o se ejecuta distinto. Una Skill lo convierte en un comando que cualquier sesión ejecuta igual: es el primer resultado de tu etapa 1.'),
          B.h('Qué es una Skill'),
          B.p('Una carpeta <code>.claude/skills/&lt;nombre&gt;/</code> con un archivo <code>SKILL.md</code>: encabezado YAML + instrucciones en Markdown, y opcionalmente scripts y archivos de apoyo. Claude la invoca cuando tú escribes <code>/nombre</code> o cuando su descripción encaja con la tarea (salvo que lo desactives). A diferencia del CLAUDE.md, <b>solo entra en el contexto cuando se usa</b>: puedes tener veinte Skills sin pagar contexto por ellas.'),
          B.code('markdown', '---\nname: deploy\ndescription: Despliega un archivo del admin, la API o la web app al servidor con el ritual seguro de RRB (bajar, comparar, respaldar, _pt_, verificar, renombrar, md5). Usar SIEMPRE para subir al servidor.\ndisable-model-invocation: true\nallowed-tools: ["Read", "Bash(curl *)", "Bash(diff *)", "Bash(cp *)", "Bash(md5 *)", "Bash(md5sum *)", "Bash(git *)", "Bash(mkdir *)"]\narguments: ["ruta"]\n---\n# /deploy $ruta\n\nDespliegue seguro de `$ruta` (ruta relativa en el repo, p. ej. `admin/js/pedidos.js` o `api/purchases/new.php`).\nCredenciales: SOLO desde variables de entorno `$FTP_HOST`, `$FTP_USER`, `$FTP_PASS`. Nunca las escribas, imprimas ni guardes.\nSi `$ruta` es `config.php` o contiene `.env`: DETENTE y avisa. Nunca se despliegan.\n\n## Contexto del servidor\n- admin/ y api/ viven en `public_html/app-api/` (mismo hosting compartido). web-app/ vive en la raíz `public_html/`.\n- La ruta remota = prefijo según carpeta + ruta relativa. Los comandos `-Q` (RNFR/RNTO/DELE) necesitan ruta ABSOLUTA del servidor.\n- El servidor es la fuente de verdad: a veces va por delante del repo.\n\n## Pasos (no te saltes ninguno; si uno falla, detente y reporta)\n1. **Bajar** la versión del servidor: `curl --ftp-pasv -u "$FTP_USER:$FTP_PASS" "ftp://$FTP_HOST/<remota>" -o /tmp/<nombre>.server`\n2. **Comparar**: `diff /tmp/<nombre>.server <ruta local>`. Si el servidor tiene cambios que el repo no tiene, PARA y muéstramelos: primero se sincroniza al repo, luego se despliega.\n3. **Respaldar**: `mkdir -p _respaldos_servidor/$(date +%F)-<tema>/` y copiar ahí la versión del servidor. El respaldo va al repo.\n4. **Subir como paralelo**: `curl --ftp-pasv -u … -T <ruta local> "ftp://$FTP_HOST/<remota con sufijo _pt_ antes de la extensión>"`\n5. **Verificar por HTTP** el archivo `_pt_`: estáticos → código 200 (`curl -s -o /dev/null -w "%{http_code}"`); PHP → llamada real al endpoint `_pt_` con datos de prueba y respuesta distinta de 500. Muéstrame la salida.\n6. **Renombrar sin caída**: `-Q "RNFR <remota>" -Q "RNTO <remota_OLD>"` y después `-Q "RNFR <remota_pt_>" -Q "RNTO <remota>"`.\n7. **Comprobar md5**: bajar de nuevo y comparar `md5` con el local. Si coincide, `-Q "DELE <remota_OLD>"`. Si no, restaurar el `_OLD` y avisar.\n8. **Romper caché** si es estático: actualizar `?v=<fecha>` en el index.html correspondiente y subirlo con el mismo ritual (pasos 1-7 abreviados).\n9. **Commit** en español describiendo qué cambia para el usuario. No hagas push salvo que Miguel lo pida.\n\n## Reporte final (siempre)\nTabla: archivo · respaldo · http `_pt_` · md5 ok · caché. Y una línea: "listo" o "detenido en el paso N porque…".\n\n## Contexto dinámico\nEstado de git ahora mismo:\n!`git status --short`', '.claude/skills/deploy/SKILL.md'),
          B.h('Anatomía del encabezado'),
          B.table(['Campo', 'Qué hace'], [
            ['<code>name</code>', 'Nombre de invocación (<code>/deploy</code>); si falta, el de la carpeta'],
            ['<code>description</code>', 'Cómo sabe Claude cuándo aplica. Sé concreto: es lo que decide la invocación automática'],
            ['<code>disable-model-invocation: true</code>', 'Solo tú la invocas; Claude no la lanza por su cuenta (adecuado para deploy)'],
            ['<code>user-invocable: false</code>', 'Lo contrario: solo Claude, oculta del menú (para conocimiento de apoyo)'],
            ['<code>allowed-tools</code>', 'Herramientas preaprobadas mientras corre la Skill'],
            ['<code>arguments</code>', 'Nombres de parámetros; se usan como <code>$ruta</code>, <code>$1</code>, <code>$ARGUMENTS</code>'],
            ['<code>context: fork</code>', 'Ejecutar en un subagente con contexto propio (para Skills que leen mucho)'],
            ['<code>!`comando`</code> en el cuerpo', 'Inyecta la salida de un comando de shell en el texto de la Skill antes de que Claude la lea']
          ]),
          B.h('Otras Skills para RRB'),
          B.list([
            '<code>/auditoria-atencion [días]</code>: lanza un subagente que lee las conversaciones de Maya de los últimos N días y devuelve tabla de clientes atorados (teléfono, causa, acción). Con <code>context: fork</code>.',
            '<code>/corte-regalias</code>: consulta de solo lectura de regs2 por pagar, agrupada por persona, con el desfase de un mes, cuadre con pagovta y tabla para tu aprobación.',
            '<code>/verifica-movil [url]</code>: abre el admin a 390 px, recorre las secciones indicadas y adjunta capturas.',
            '<code>/regla-a-fact "regla"</code>: convierte una regla en fact + cambio de tool + casos de prueba (lección 2.5).',
            '<code>/sincroniza-servidor [ruta]</code>: baja del servidor, compara y propone el commit de sincronización (el paso 2 de /deploy como comando propio).'
          ]),
          B.h('Skills vs comandos antiguos vs CLAUDE.md'),
          B.p('Los "comandos personalizados" de <code>.claude/commands/*.md</code> siguen funcionando pero las Skills los sustituyen (más capacidades: archivos de apoyo, herramientas, fork). La diferencia con CLAUDE.md: <b>CLAUDE.md</b> son hechos que aplican siempre; una <b>Skill</b> es un procedimiento que se invoca. Las Skills de un <b>plugin</b> se invocan como <code>/plugin:skill</code>.'),
          B.key('Un ritual que vive en la memoria se ejecuta distinto cada vez. Un ritual que vive en una Skill se ejecuta igual en cualquier sesión, con las herramientas justas y un reporte fijo. /deploy es la Skill número uno de RRB; las demás siguen el mismo molde.'),
          B.check('¿Por qué /deploy lleva disable-model-invocation: true?', ['Para que sea más rápida', 'Para que solo tú la lances: desplegar nunca debe ocurrir por iniciativa de Claude', 'Porque no tiene argumentos', 'Porque usa curl'], 1, 'Nada a producción sin tu luz verde, también a nivel de herramienta.'),
          B.cards([
            { icon: '📂', title: 'SKILL.md', html: '.claude/skills/nombre/SKILL.md: YAML + Markdown + apoyo.' },
            { icon: '🎯', title: 'description decide', html: 'Invocación automática por descripción; disable-model-invocation para lo delicado.' },
            { icon: '🚀', title: '/deploy', html: 'Bajar, comparar, respaldar, _pt_, verificar, renombrar, md5, caché, commit.' },
            { icon: '🧬', title: 'Molde', html: '/auditoria-atencion, /corte-regalias, /verifica-movil, /regla-a-fact.' }
          ])
        ],
        quiz: [
          { q: 'Una Skill se diferencia de CLAUDE.md en que…', o: ['es más larga', 'solo entra en el contexto cuando se invoca o aplica; CLAUDE.md va siempre', 'no puede usar herramientas', 'es de solo lectura'], a: 1, why: 'Puedes tener muchas Skills sin pagar contexto por ellas.' },
          { q: 'En la Skill /deploy, si el servidor tiene cambios que el repo no tiene, el procedimiento indica…', o: ['sobrescribir el servidor', 'parar, mostrar el diff y sincronizar primero al repo', 'ignorarlo', 'borrar el respaldo'], a: 1, why: 'El servidor es la fuente de verdad: varios archivos han vivido solo allí.' },
          { q: 'Las credenciales FTP deben ir escritas en el SKILL.md para que Claude las tenga a mano.', type: 'tf', a: false, why: 'Nunca. Variables de entorno; la Skill las referencia ($FTP_USER) sin imprimirlas.' },
          { q: 'El campo del encabezado que impide que Claude lance la Skill por su cuenta es…', type: 'fill', a: ['disable-model-invocation', 'disable-model-invocation: true'], why: 'disable-model-invocation: true. Solo tú la invocas.' },
          { q: 'Para que una Skill que lee muchos archivos no ensucie tu contexto principal, usas…', o: ['user-invocable: false', 'context: fork', 'allowed-tools', 'arguments'], a: 1, why: 'Se ejecuta en un subagente con contexto propio y devuelve solo el resultado.' }
        ],
        cards: [
          ['¿Qué es una Skill de Claude Code?', 'Carpeta .claude/skills/<nombre>/ con SKILL.md (YAML + Markdown) y archivos de apoyo. Se invoca con /nombre o automáticamente por descripción. Solo entra en el contexto cuando se usa.'],
          ['Campos del encabezado de una Skill', 'name, description (decide invocación automática), disable-model-invocation, user-invocable, allowed-tools, arguments ($1, $ARGUMENTS), context: fork; y !`comando` para inyectar salida de shell.'],
          ['Los 9 pasos de /deploy (RRB)', '1 bajar del servidor · 2 diff (si el servidor va delante, parar y sincronizar) · 3 respaldo por fecha/tema · 4 subir como _pt_ · 5 verificar HTTP (200 o ≠500 con llamada real) · 6 RNFR/RNTO sin caída · 7 md5 y DELE del _OLD · 8 ?v= para caché · 9 commit en español. Reporte en tabla.'],
          ['Skills candidatas para RRB', '/deploy, /auditoria-atencion (fork), /corte-regalias, /verifica-movil, /regla-a-fact, /sincroniza-servidor.']
        ],
        resources: [
          { type: 'doc', t: 'Claude Code: Skills', u: 'https://code.claude.com/docs/en/skills', lang: 'EN' },
          { type: 'article', t: 'Anthropic Engineering: Equipping agents for the real world with Agent Skills', u: 'https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills', lang: 'EN' },
          { type: 'repo', t: 'anthropics/skills: Skills de ejemplo de Anthropic', u: 'https://github.com/anthropics/skills', lang: 'EN' }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'cl-4-7', title: 'Subagentes con rol: auditor, constructor y verificador', minutes: 15, level: 'avanzado',
        summary: 'Cómo definir subagentes con su propio modelo, herramientas, permisos y contexto; cuándo delegar; los tres subagentes de RRB listos para crear; y los agentes integrados.',
        body: () => [
          B.lead('Tu política de modelos (Fable audita, Opus construye, Sonnet verifica) vive en tu cabeza. Los subagentes la convierten en archivos: cada rol con su modelo, sus herramientas y su prompt, y Claude delega solo.'),
          B.h('Qué es un subagente'),
          B.p('Un Claude aparte con <b>contexto propio</b> (limpio), su system prompt, sus herramientas permitidas y su modelo, al que el Claude principal delega una tarea y del que recibe solo el resultado. Ventajas: (1) el contexto principal no se llena con 40 archivos leídos ni con logs; (2) puede correr en paralelo con otros; (3) puede tener otro modelo y permisos más estrictos; (4) un revisor con contexto limpio no está sesgado por lo que acaba de construir.'),
          B.h('Definición'),
          B.p('Archivos Markdown en <code>.claude/agents/&lt;nombre&gt;.md</code> (proyecto) o <code>~/.claude/agents/</code> (usuario):'),
          B.code('markdown', '---\nname: auditor\ndescription: Revisor adversarial de seguridad, dinero y cumplimiento. Úsalo antes de cualquier deploy que toque pagos, regalías, permisos o datos de distribuidores, y cuando Miguel pida "audítame" o "revísame a fondo".\nmodel: claude-fable-5-1\ntools: Read, Grep, Glob, Bash\ndisallowedTools: Edit, Write\npermissionMode: plan\nmaxTurns: 40\n---\nEres un auditor externo que cobra por cada fallo real que encuentra. No construyes ni corriges: encuentras y priorizas.\n\nRevisa el cambio indicado (diff, archivos o módulo) buscando, en este orden:\n1. Dinero: cálculos de regalías, pagos, vouchers; uso de pagovta como fuente de verdad; redondeos; idempotencia.\n2. Seguridad: inyección SQL, autorización por rol (solo admins cambian cuentas), secretos en código, endpoints sin auth.\n3. Cumplimiento: textos con afirmaciones de salud o de ingresos; "plata coloidal".\n4. Regresiones: qué otros módulos usan lo que cambió (grep) y podrían romperse.\n\nFormato de salida: tabla con columnas Gravedad (alta/media/baja) · Archivo:línea · Problema · Cómo comprobarlo · Fix sugerido. Máximo 10 filas, ordenadas por gravedad. Al final una línea: "APROBARÍA / NO APROBARÍA el deploy" y por qué. Sin cumplidos.', '.claude/agents/auditor.md'),
          B.code('markdown', '---\nname: constructor\ndescription: Implementa funciones y cambios en el admin, la API y la web app siguiendo el plan aprobado, por fases, con verificación. Úsalo para construir una vez que Miguel aprobó el plan.\nmodel: claude-opus-5\ntools: Read, Edit, Write, Bash, Grep, Glob\npermissionMode: acceptEdits\nskills: verifica-movil\n---\nConstruyes exactamente la fase indicada del plan aprobado, nada más. Antes de editar un archivo que pueda vivir en el servidor, comprueba con git y con las notas si el servidor va por delante. Al terminar la fase: php -l en PHP, pruebas si existen, y verificación en navegador a 390 px con capturas. Commit en español que diga qué cambia para el usuario. No despliegues: eso es /deploy y lo lanza Miguel.', '.claude/agents/constructor.md'),
          B.code('markdown', '---\nname: verificador-movil\ndescription: Abre el admin o la web app a tamaño teléfono, recorre las pantallas indicadas, mide que nada se corte ni se amontone y adjunta capturas. Úsalo tras cualquier cambio de interfaz.\nmodel: claude-sonnet-5\ntools: Read, Bash, Grep\npermissionMode: plan\nmaxTurns: 25\n---\nUsa la sesión temporal de admin_sessions indicada (bórrala al final). Para cada pantalla: captura a 390×844 y a 1280 de ancho; comprueba scroll horizontal, textos cortados, botones fuera de pantalla, tablas convertidas en tarjetas. Devuelve una tabla Pantalla · OK/Problema · Captura, y una lista de problemas con la causa probable (selector CSS o componente). No corrijas nada.', '.claude/agents/verificador-movil.md'),
          B.h('Cómo se usan'),
          B.list([
            'En lenguaje natural: "Usa el auditor para revisar el diff de la rama antes del deploy". Claude delega según la <code>description</code>.',
            'Con mención explícita: <code>@"auditor (agent)" revisa api/regalias.php</code>, que garantiza la delegación.',
            'Como agente principal de una sesión: <code>claude --agent auditor</code> o <code>"agent": "auditor"</code> en ajustes.',
            'En paralelo y en segundo plano: "Lanza el verificador en segundo plano mientras seguimos". <code>/agents</code> lista y gestiona.',
            'Se pueden <b>reanudar</b> (cada subagente devuelve un identificador) y <b>enviar mensajes</b> entre agentes.'
          ]),
          B.h('Campos disponibles'),
          B.table(['Campo', 'Uso'], [
            ['<code>name</code>, <code>description</code>', 'Identificador y cuándo delegar (obligatorios)'],
            ['<code>model</code>', 'sonnet, opus, haiku o ID completo'],
            ['<code>tools</code> / <code>disallowedTools</code>', 'Lista blanca o negra de herramientas'],
            ['<code>permissionMode</code>', 'plan para revisores; acceptEdits para constructores'],
            ['<code>maxTurns</code>', 'Tope de vueltas'],
            ['<code>skills</code>', 'Skills precargadas'],
            ['<code>mcpServers</code>', 'Servidores MCP disponibles para ese agente'],
            ['<code>memory</code>', 'Memoria propia persistente (user/project/local), separada de la principal'],
            ['<code>isolation: worktree</code>', 'Trabajar en una copia aislada del repo (git worktree)'],
            ['<code>omitClaudeMd</code>', 'No cargar el CLAUDE.md (para agentes muy acotados)']
          ]),
          B.h('Agentes integrados'),
          B.p('<b>Explore</b> (búsqueda rápida de solo lectura por el código), <b>Plan</b> (investigación para el modo plan) y <b>general-purpose</b> (tareas complejas con lectura y acción). Claude los usa por su cuenta; puedes pedirlos: "explora con subagentes cómo se calcula el rango".'),
          B.h('Cuándo delegar (y cuándo no)'),
          B.compare('Delega cuando', ['La tarea genera mucho ruido (leer 40 archivos, correr tests con logs largos).', 'Quieres un revisor con contexto limpio y otro modelo.', 'Hay varias tareas independientes que pueden ir en paralelo (auditar 52 secciones).', 'La tarea necesita permisos distintos (solo lectura).'],
            'No delegues cuando', ['La tarea depende de matices de la conversación actual (el subagente no la ve).', 'Es rápida y pequeña: el traspaso cuesta más que hacerlo.', 'Necesitas ver el proceso, no solo el resultado.']),
          B.key('Tres archivos convierten tu política en sistema: auditor (Fable, solo lectura, adversarial), constructor (Opus, por fases, con verificación) y verificador móvil (Sonnet, capturas). A partir de ahí, "audítame esto" hace lo correcto en cualquier sesión.'),
          B.check('¿Por qué el auditor debe tener contexto propio y no ser la misma sesión que construyó?', ['Para gastar menos', 'Porque un revisor con contexto limpio no está sesgado por lo que acaba de construir y encuentra más; además puede usar otro modelo y solo lectura', 'Porque Claude no puede revisar', 'Por costumbre'], 1, 'Es el patrón "uno escribe, otro revisa" con distinto modelo y permisos.'),
          B.cards([
            { icon: '🧑‍⚖️', title: 'Auditor', html: 'Fable 5.1, solo lectura, adversarial, tabla por gravedad, APROBARÍA / NO.' },
            { icon: '👷', title: 'Constructor', html: 'Opus 5, acceptEdits, una fase, verificación, commit. Nunca despliega.' },
            { icon: '📱', title: 'Verificador móvil', html: 'Sonnet 5, 390 px + escritorio, capturas, causa probable.' },
            { icon: '📂', title: '.claude/agents/', html: 'name, description, model, tools, permissionMode, maxTurns, skills, memory, isolation.' }
          ])
        ],
        quiz: [
          { q: 'La principal ventaja de un subagente para tareas de lectura masiva es…', o: ['que es más rápido', 'que sus lecturas no entran en tu contexto principal: devuelve solo la conclusión', 'que no cuesta tokens', 'que usa otra cuenta'], a: 1, why: 'Contexto principal limpio; además puede ir en paralelo y con otro modelo.' },
          { q: 'El campo que fija el modelo de un subagente es…', type: 'fill', a: ['model', 'model:'], why: 'model: sonnet | opus | haiku | ID completo (claude-fable-5-1).' },
          { q: 'Un subagente ve toda la conversación principal.', type: 'tf', a: false, why: 'Recibe la tarea que Claude le delega y su propio contexto. Por eso conviene delegar tareas autocontenidas.' },
          { q: 'Para garantizar que Claude use un subagente concreto escribes…', o: ['su nombre en mayúsculas', '@"nombre (agent)" seguido de la tarea', '/agent nombre', 'nada, es automático siempre'], a: 1, why: 'La mención explícita garantiza la delegación; la description permite la automática.' },
          { q: 'Los agentes integrados de Claude Code son…', type: 'multi', o: ['Explore', 'Plan', 'general-purpose', 'auditor'], a: [0, 1, 2], why: 'auditor es uno que defines tú.' }
        ],
        cards: [
          ['¿Qué es un subagente de Claude Code?', 'Un Claude aparte con contexto propio, system prompt, herramientas, permisos y modelo, al que el principal delega una tarea y recibe solo el resultado. Se define en .claude/agents/<nombre>.md.'],
          ['Los tres subagentes de RRB', 'auditor (Fable 5.1, solo lectura, permissionMode plan, adversarial: dinero, seguridad, cumplimiento, regresiones; veredicto APROBARÍA/NO) · constructor (Opus 5, acceptEdits, una fase, verificación, commit; nunca despliega) · verificador-movil (Sonnet 5, capturas 390 px y escritorio, causa probable).'],
          ['Campos de un subagente', 'name, description, model, tools/disallowedTools, permissionMode, maxTurns, skills, mcpServers, memory, isolation: worktree, omitClaudeMd.'],
          ['Cuándo delegar a un subagente', 'Tareas ruidosas (leer mucho, logs), revisión con contexto limpio y otro modelo, tareas paralelas independientes, permisos distintos. No: tareas que dependen de la conversación actual o muy pequeñas.']
        ],
        resources: [
          { type: 'doc', t: 'Claude Code: Subagents', u: 'https://code.claude.com/docs/en/sub-agents', lang: 'EN' },
          { type: 'article', t: 'Anthropic Engineering: How we built our multi-agent research system', u: 'https://www.anthropic.com/engineering/multi-agent-research-system', lang: 'EN', note: 'Cómo Anthropic usa orquestador + subagentes en su propio producto de investigación.' },
          { type: 'doc', t: 'Claude Code: Best practices, "Use subagents"', u: 'https://code.claude.com/docs/en/best-practices', lang: 'EN' }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'cl-4-8', title: 'Hooks: guardas automáticas que no dependen de que Claude se acuerde', minutes: 15, level: 'avanzado',
        summary: 'Qué son los hooks, todos los eventos, el contrato de entrada/salida, y los tres hooks de RRB nacidos de incidentes reales: bloqueo de llaves en commits, respaldo obligatorio antes de FTP y prohibición de git stash sin nombre.',
        body: () => [
          B.lead('Una regla en CLAUDE.md es una petición; un hook es una ley. Se ejecuta siempre, en un evento concreto, y puede bloquear la acción. Los dos incidentes del 14 de septiembre (una llave casi en el repo; un deploy a medias) se evitan con hooks.'),
          B.h('Qué es un hook'),
          B.p('Un comando de shell (o un script) que Claude Code ejecuta automáticamente cuando ocurre un <b>evento</b>: antes de usar una herramienta, después, al enviar un prompt, al terminar un turno, al compactar… El hook recibe los datos del evento en JSON por la entrada estándar y responde con su código de salida (0 = seguir; <b>2 = bloquear</b>) y, opcionalmente, con texto que llega a Claude como contexto adicional.'),
          B.h('Todos los eventos'),
          B.table(['Evento', 'Cuándo', 'Uso típico'], [
            ['<code>SessionStart</code> / <code>SessionEnd</code>', 'Al iniciar y al cerrar la sesión', 'Cargar variables, comprobar entorno, registrar'],
            ['<code>UserPromptSubmit</code>', 'Al enviar tu mensaje, antes de que Claude lo procese', 'Añadir contexto, bloquear peticiones prohibidas'],
            ['<code>PreToolUse</code>', 'Antes de ejecutar una herramienta (con su nombre y parámetros)', '<b>Bloquear</b> acciones peligrosas; exigir precondiciones'],
            ['<code>PostToolUse</code>', 'Después de una herramienta (con su resultado)', 'Formatear código, correr lint, auditar, avisar'],
            ['<code>PermissionRequest</code>', 'Cuando Claude pediría permiso', 'Aprobar o denegar automáticamente según reglas propias'],
            ['<code>Notification</code>', 'Cuando Claude quiere avisarte', 'Notificación de escritorio, mensaje a WhatsApp'],
            ['<code>Stop</code> / <code>SubagentStop</code>', 'Al terminar un turno / un subagente', 'Exigir que corran los tests antes de dar por terminado (código 2 bloquea el fin; hasta 8 intentos)'],
            ['<code>PreCompact</code>', 'Antes de compactar', 'Guardar decisiones en un archivo para que sobrevivan'],
            ['<code>WorktreeCreate</code> / <code>WorktreeRemove</code>', 'Al crear/quitar worktrees', 'Configurar entornos aislados'],
            ['<code>Elicitation</code>', 'Cuando un servidor MCP pide información', 'Responder automáticamente']
          ]),
          B.h('Formato'),
          B.p('En <code>settings.json</code> (o <code>.claude/settings.json</code> del proyecto), bajo <code>hooks</code>, con un <code>matcher</code> por herramienta o patrón y una lista de comandos. Los hooks reciben JSON como <code>{"tool_name":"Bash","tool_input":{"command":"…"},"cwd":"…"}</code>.'),
          B.ex('Hook 1: nunca una llave en un commit (incidente del 14-sep)', [
            B.code('json', '{\n  "hooks": {\n    "PreToolUse": [\n      {\n        "matcher": "Bash",\n        "hooks": [{ "type": "command", "command": "bash .claude/hooks/sin-llaves.sh" }]\n      }\n    ]\n  }\n}', '.claude/settings.json'),
            B.code('bash', '#!/usr/bin/env bash\n# Bloquea "git commit" o "git add" si lo que se va a commitear contiene patrones de llaves.\nINPUT=$(cat)\nCMD=$(echo "$INPUT" | jq -r \'.tool_input.command // ""\')\ncase "$CMD" in\n  *"git commit"*|*"git add"*)\n    PATRON=\'(xkeysib-[A-Za-z0-9]+|sk-ant-[A-Za-z0-9_-]+|sk_(live|test)_[A-Za-z0-9]+|AKIA[0-9A-Z]{16}|[A-Fa-f0-9]{40,})\'\n    if git diff --cached -U0 2>/dev/null | grep -Eq "$PATRON" || git diff -U0 2>/dev/null | grep -Eq "$PATRON"; then\n      echo "BLOQUEADO: hay un patrón de llave o token en los cambios. Muévelo a variables de entorno y vuelve a intentarlo." >&2\n      exit 2\n    fi\n    ;;\nesac\nexit 0', '.claude/hooks/sin-llaves.sh'),
            B.p('Salida 2 = Claude no puede ejecutar el commit y recibe el mensaje. Complementa (no sustituye) el escáner de secretos de GitHub.')
          ]),
          B.ex('Hook 2: nada sube por FTP sin respaldo del día (deploy a medias del 14-sep)', [
            B.code('bash', '#!/usr/bin/env bash\n# Si el comando sube por FTP (-T) o renombra (-Q RNTO), exige que exista un respaldo de hoy para ese archivo.\nINPUT=$(cat)\nCMD=$(echo "$INPUT" | jq -r \'.tool_input.command // ""\')\nif echo "$CMD" | grep -Eq \'curl .*(-T |-Q "RNTO)\'; then\n  ARCHIVO=$(echo "$CMD" | grep -oE \'(-T [^ ]+|RNTO [^" ]+)\' | awk \'{print $2}\' | xargs -n1 basename | sed \'s/_pt_//; s/_OLD//\' | head -1)\n  HOY=$(date +%F)\n  if ! ls _respaldos_servidor/${HOY}-*/"$ARCHIVO" >/dev/null 2>&1; then\n    echo "BLOQUEADO: no hay respaldo de hoy para $ARCHIVO en _respaldos_servidor/${HOY}-*/. Usa /deploy, que respalda antes de subir." >&2\n    exit 2\n  fi\nfi\nexit 0', '.claude/hooks/respaldo-antes-de-ftp.sh'),
            B.p('Así, aunque una sesión nueva no conozca el ritual, no puede saltárselo. Y el ritual completo vive en /deploy como un solo procedimiento, no en comandos sueltos que un shell puede abortar a la mitad.')
          ]),
          B.ex('Hook 3: git stash prohibido en worktrees compartidos', [
            B.code('bash', '#!/usr/bin/env bash\nINPUT=$(cat)\nCMD=$(echo "$INPUT" | jq -r \'.tool_input.command // ""\')\nif echo "$CMD" | grep -Eq \'^\\s*git stash( |$)\' && ! echo "$CMD" | grep -q \'push -m\'; then\n  echo "BLOQUEADO: git stash sin nombre puede llevarse cambios de otra sesión. Usa \'git stash push -m \\"motivo\\"\' o haz commit en una rama." >&2\n  exit 2\nfi\nexit 0', '.claude/hooks/sin-stash.sh')
          ]),
          B.h('Otros hooks útiles'),
          B.list([
            '<b>PostToolUse en Edit|Write</b> de archivos PHP: <code>php -l</code> automático; si falla, el error vuelve a Claude como contexto.',
            '<b>Notification</b>: mandar un mensaje a tu WhatsApp (vía el endpoint que ya usa Maya) cuando una tarea larga termina o pide permiso.',
            '<b>Stop</b>: si hay tests en el módulo tocado, exigir que se hayan ejecutado antes de dar por terminado.',
            '<b>PreCompact</b>: volcar las decisiones del día a <code>_maestro_wip/DECISIONES.md</code> para que sobrevivan al resumen.',
            '<b>UserPromptSubmit</b>: si el mensaje menciona "producción" o "deploy", inyectar el recordatorio de las reglas.'
          ]),
          B.warn('Los hooks se ejecutan con tus permisos de usuario. Revisa los de cualquier repositorio ajeno antes de confiar en él (diálogo de confianza), y mantén los tuyos en <code>.claude/hooks/</code> versionados. <code>/hooks</code> muestra los activos; <code>disableAllHooks</code> los apaga si algo va mal.'),
          B.key('CLAUDE.md pide; el hook obliga. Tres scripts de veinte líneas convierten tus reglas más caras (secretos, respaldo, stash) en leyes que ninguna sesión puede saltarse, se acuerde o no.'),
          B.check('Un hook devuelve código de salida 2 en PreToolUse. ¿Qué pasa?', ['Nada', 'La herramienta no se ejecuta y Claude recibe el mensaje de error como contexto', 'Claude se cierra', 'Se ejecuta con aviso'], 1, 'Código 2 = bloquear. Es la diferencia entre pedir y obligar.'),
          B.cards([
            { icon: '⚖️', title: 'Hook = ley', html: 'Comando en un evento; salida 2 bloquea.' },
            { icon: '🗓️', title: 'Eventos', html: 'SessionStart, UserPromptSubmit, PreToolUse, PostToolUse, PermissionRequest, Notification, Stop, PreCompact…' },
            { icon: '🔑', title: 'sin-llaves', html: 'Bloquea commits con patrones de tokens.' },
            { icon: '💾', title: 'respaldo-antes-de-ftp', html: 'Sin respaldo de hoy, no hay subida.' }
          ])
        ],
        quiz: [
          { q: '¿Qué evento usarías para bloquear una acción antes de que ocurra?', o: ['PostToolUse', 'PreToolUse', 'Notification', 'SessionEnd'], a: 1, why: 'PreToolUse recibe nombre y parámetros de la herramienta; salida 2 bloquea.' },
          { q: 'Un hook en Stop que devuelve 2…', o: ['borra la sesión', 'impide que Claude dé por terminado el turno hasta cumplir la condición (hasta 8 intentos)', 'cambia de modelo', 'no hace nada'], a: 1, why: 'Útil para exigir tests antes de terminar.' },
          { q: 'Los hooks del repositorio se ejecutan automáticamente aunque no hayas confiado en el repo.', type: 'tf', a: false, why: 'El diálogo de confianza los retiene hasta que confías. Revísalos en repos ajenos.' },
          { q: 'El evento que permite guardar decisiones antes de que se resuma la conversación es…', type: 'fill', a: ['PreCompact', 'precompact', 'Pre Compact'], why: 'PreCompact: vuelca lo importante a un archivo antes de compactar.' },
          { q: 'La diferencia entre una regla en CLAUDE.md y un hook es que…', o: ['no hay diferencia', 'la regla es una instrucción que Claude puede olvidar o interpretar; el hook se ejecuta siempre y puede bloquear', 'el hook es más barato', 'la regla es obligatoria y el hook opcional'], a: 1, why: 'Pedir frente a obligar.' }
        ],
        cards: [
          ['¿Qué es un hook de Claude Code?', 'Un comando que se ejecuta automáticamente en un evento (PreToolUse, PostToolUse, UserPromptSubmit, Stop, PreCompact…). Recibe JSON por stdin; código de salida 0 sigue, 2 bloquea; su salida puede llegar a Claude como contexto.'],
          ['Eventos de hooks', 'SessionStart/End, UserPromptSubmit, PreToolUse, PostToolUse, PermissionRequest, Notification, Stop, SubagentStop, PreCompact, WorktreeCreate/Remove, Elicitation.'],
          ['Los tres hooks de RRB', 'sin-llaves (PreToolUse Bash: bloquea git commit/add si el diff contiene patrones de tokens) · respaldo-antes-de-ftp (bloquea curl -T / RNTO sin respaldo de hoy) · sin-stash (bloquea git stash sin nombre en worktrees compartidos).'],
          ['Hooks útiles adicionales', 'php -l tras editar PHP (PostToolUse); aviso a WhatsApp al terminar (Notification); exigir tests antes de terminar (Stop); volcar decisiones a un archivo (PreCompact); recordar reglas al mencionar producción (UserPromptSubmit).']
        ],
        resources: [
          { type: 'doc', t: 'Claude Code: Hooks guide', u: 'https://code.claude.com/docs/en/hooks-guide', lang: 'EN' },
          { type: 'doc', t: 'Claude Code: Hooks reference (eventos y JSON)', u: 'https://code.claude.com/docs/en/hooks', lang: 'EN' },
          { type: 'tool', t: 'GitHub secret scanning y gitleaks (escáner de secretos)', u: 'https://github.com/gitleaks/gitleaks', lang: 'EN', note: 'Complemento al hook: escanea el historial completo del repo.' }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'cl-4-9', title: 'MCP: conectar Claude Code a GitHub, Drive, Playwright y tus propias herramientas', minutes: 14, level: 'avanzado',
        summary: 'Qué es el Model Context Protocol, cómo añadir servidores (stdio y HTTP), ámbitos, autenticación, recursos y prompts, límites, y los servidores que más te sirven.',
        body: () => [
          B.lead('MCP es el enchufe universal: un protocolo abierto (creado por Anthropic en noviembre de 2024, adoptado por OpenAI, Google y Microsoft) para que cualquier herramienta exponga funciones que un modelo puede usar. Los conectores de claude.ai son MCP; en Claude Code lo configuras tú.'),
          B.h('Conceptos'),
          B.terms([
            ['Servidor MCP', 'Un programa que expone <b>herramientas</b> (funciones con parámetros), <b>recursos</b> (datos consultables) y <b>prompts</b> (plantillas). Puede correr local (stdio) o remoto (HTTP).'],
            ['Cliente MCP', 'Claude Code, claude.ai, Cursor, VS Code…: quien descubre las herramientas y las ofrece al modelo.'],
            ['Transporte', '<b>stdio</b>: el servidor es un proceso local (npx, python). <b>HTTP</b> (streamable): un servicio remoto, con OAuth o token.'],
            ['Ámbito', '<b>local</b> (este proyecto, solo tú; en <code>~/.claude.json</code>), <b>project</b> (archivo <code>.mcp.json</code> en el repo, compartido), <b>user</b> (todos tus proyectos).']
          ]),
          B.h('Añadir servidores'),
          B.code('bash', '# Remoto (HTTP), p. ej. GitHub oficial\nclaude mcp add --transport http github https://api.githubcopilot.com/mcp/\n\n# Local (stdio), p. ej. Playwright para navegar y capturar\nclaude mcp add playwright -- npx -y @playwright/mcp@latest\n\n# Con ámbito de proyecto (queda en .mcp.json, compartido en el repo)\nclaude mcp add --scope project --transport http drive https://mcp.example.com/drive\n\n# Con cabecera de token (el token desde una variable, nunca escrito)\nclaude mcp add --transport http mi-api https://mcp.mi-servidor.com --header "Authorization: Bearer $MI_TOKEN"\n\nclaude mcp list        # estado: ✔ conectado, ✘ error, ! necesita autenticación\nclaude mcp get github  # detalles\nclaude mcp remove x', 'CLI'),
          B.code('json', '{\n  "mcpServers": {\n    "github": { "type": "http", "url": "https://api.githubcopilot.com/mcp/" },\n    "playwright": { "type": "stdio", "command": "npx", "args": ["-y", "@playwright/mcp@latest"] },\n    "rrb-admin": {\n      "type": "http",\n      "url": "https://api.sistemarrb.com/mcp",\n      "headers": { "Authorization": "Bearer ${RRB_MCP_TOKEN}" }\n    }\n  }\n}', '.mcp.json (ámbito de proyecto)'),
          B.p('Los servidores con OAuth se autentican desde la sesión con <code>/mcp</code> → seleccionar → Authenticate (abre el navegador). Las variables como <code>${RRB_MCP_TOKEN}</code> se expanden desde tu entorno: el token no está en el repo.'),
          B.h('Usar lo que exponen'),
          B.list([
            '<b>Herramientas</b>: Claude las ve como <code>mcp__servidor__herramienta</code> y las usa cuando toca. Puedes permitirlas o denegarlas en <code>permissions</code> con ese nombre.',
            '<b>Recursos</b>: <code>@github:issue/123</code> o <code>@drive:hoja-inventario</code> en tu mensaje añade ese recurso al contexto.',
            '<b>Prompts</b>: un servidor puede definir plantillas que aparecen como <code>/mcp__servidor__nombre</code>.'
          ]),
          B.h('Límites y rendimiento'),
          B.p('Cada herramienta MCP añade su esquema al contexto. Con muchos servidores eso pesa; por eso Claude Code carga por defecto solo los nombres y trae los esquemas bajo demanda (<i>tool search</i>; <code>ENABLE_TOOL_SEARCH=auto|false</code> para cambiarlo). Las salidas grandes de una herramienta se recortan. Regla: conecta lo que uses; <code>/doctor</code> te dirá qué servidores no has usado.'),
          B.h('Los servidores que te sirven'),
          B.table(['Servidor', 'Qué te da', 'Para qué'], [
            ['<b>GitHub</b>', 'Issues, PRs, revisiones, Actions, contenido de repos', 'Revisar PRs de tus cuatro repos desde una sesión; que el auditor lea el diff de un PR'],
            ['<b>Playwright</b>', 'Navegar, hacer clic, capturar pantalla', 'El verificador móvil: abrir el admin a 390 px y capturar. Base de tus pruebas visuales'],
            ['<b>Google Drive / Sheets</b>', 'Leer y escribir hojas y documentos', 'Que los reportes salgan a la hoja de Edna y Mónica'],
            ['<b>Sentry / logs</b>', 'Errores en producción', 'Diagnóstico de errores de la API sin copiar logs a mano'],
            ['<b>Context7 / documentación</b>', 'Docs actualizadas de librerías', 'Que Claude consulte la API de MercadoPago o Skydropx real, no de memoria'],
            ['<b>Tu propio servidor MCP</b> (<code>rrb-admin</code>)', 'Las herramientas de Maya y del admin expuestas por MCP (solo lectura primero)', 'Que panel, el asistente de dirección y Claude.ai consulten pedidos, pagos y regalías sin duplicar código. Es lo que maya propuso: un MCP sobre sus 62 tools']
          ]),
          B.ex('Tu servidor MCP de RRB, en pocas líneas (concepto)', [
            B.p('Maya ya define sus herramientas con esquemas JSON. Un servidor MCP en Node (SDK oficial <code>@modelcontextprotocol/sdk</code>) que registre un subconjunto de <b>solo lectura</b> (<code>get_orden_detalle</code>, <code>rastrear_pedido</code>, <code>get_ganancias</code>, <code>pagos_sin_vincular</code>) autenticado con un token por usuario, servido por HTTP en Hetzner. Lo añades a Claude Code con <code>claude mcp add</code> y, más adelante, como conector en claude.ai para el equipo. Un solo código, tres clientes. Las escrituras siguen fuera hasta que decidas lo contrario, y con confirmación.')
          ]),
          B.warn('Un servidor MCP es código que corre con acceso a tus datos. Instala solo servidores de fuentes de confianza (el directorio oficial, los de los propios servicios), revisa qué herramientas exponen, y recuerda que sus resultados pueden traer inyecciones (un issue de GitHub con instrucciones ocultas). Permisos mínimos y confirmación en escrituras.'),
          B.key('MCP convierte cualquier servicio en herramientas para Claude. Tres servidores (GitHub, Playwright, Drive) resuelven la mayoría de tus casos; un servidor propio de solo lectura sobre las tools de Maya une a Claude Code, claude.ai y el equipo sin duplicar código.'),
          B.check('Quieres que el token de tu servidor MCP no quede en el repositorio aunque .mcp.json sí se comparta. ¿Cómo?', ['Escribirlo en el JSON', 'Referenciarlo como ${RRB_MCP_TOKEN} y definirlo en el entorno de cada máquina', 'Mandarlo por el chat entre sesiones', 'No usar token'], 1, 'Las variables se expanden desde el entorno; el repo no ve el valor.'),
          B.cards([
            { icon: '🔌', title: 'MCP', html: 'Protocolo abierto: herramientas, recursos y prompts para cualquier modelo.' },
            { icon: '⌨️', title: 'claude mcp add', html: 'stdio (local) o http (remoto); ámbitos local/project/user; OAuth con /mcp.' },
            { icon: '📄', title: '.mcp.json', html: 'Compartido en el repo; tokens como ${VARIABLE}.' },
            { icon: '🏢', title: 'rrb-admin', html: 'Tu servidor de solo lectura sobre las tools de Maya: un código, tres clientes.' }
          ])
        ],
        quiz: [
          { q: 'MCP es…', o: ['un modelo de Anthropic', 'un protocolo abierto para que herramientas externas expongan funciones, recursos y prompts a modelos de IA', 'un plan de pago', 'un tipo de hook'], a: 1, why: 'Creado por Anthropic en 2024 y adoptado por toda la industria. Los conectores de claude.ai son MCP.' },
          { q: 'El archivo de configuración MCP que se comparte en el repositorio es…', type: 'fill', a: ['.mcp.json', 'mcp.json'], why: '.mcp.json, ámbito project. Los tokens se referencian como ${VARIABLE}.' },
          { q: 'Claude Code carga al arrancar el esquema completo de todas las herramientas de todos los servidores MCP.', type: 'tf', a: false, why: 'Carga los nombres y trae esquemas bajo demanda (tool search) para ahorrar contexto.' },
          { q: 'Para añadir al contexto un recurso de un servidor MCP escribes…', o: ['#servidor/recurso', '@servidor:recurso', '/servidor recurso', 'mcp://servidor'], a: 1, why: 'Igual que @archivo, pero con el servidor.' },
          { q: 'Un servidor MCP propio sobre las tools de Maya debería empezar exponiendo…', o: ['todo, incluidas escrituras', 'solo herramientas de lectura, con token por usuario', 'nada', 'solo el system prompt'], a: 1, why: 'Mínimo privilegio; escrituras solo cuando lo decidas y con confirmación.' }
        ],
        cards: [
          ['¿Qué es MCP?', 'Model Context Protocol: estándar abierto (Anthropic, nov 2024) para que servidores expongan herramientas, recursos y prompts a clientes como Claude Code, claude.ai, Cursor. Transportes stdio (local) y HTTP (remoto).'],
          ['Cómo añadir un servidor MCP en Claude Code', 'claude mcp add [--transport http] nombre url | claude mcp add nombre -- comando args (stdio). Ámbitos: local (~/.claude.json), project (.mcp.json en el repo), user. OAuth con /mcp → Authenticate. Tokens como ${VAR}.'],
          ['Servidores MCP útiles para RRB', 'GitHub (PRs, issues, Actions), Playwright (navegar y capturar: verificador móvil), Google Drive/Sheets (reportes al equipo), Sentry/logs, docs de librerías, y un servidor propio rrb-admin de solo lectura sobre las tools de Maya.'],
          ['Seguridad con MCP', 'Solo servidores de confianza; revisar herramientas expuestas; permisos mínimos (mcp__servidor__tool en allow/deny); confirmación en escrituras; recordar que los resultados pueden traer inyecciones.']
        ],
        resources: [
          { type: 'doc', t: 'Claude Code: MCP', u: 'https://code.claude.com/docs/en/mcp', lang: 'EN' },
          { type: 'doc', t: 'Model Context Protocol: sitio oficial y especificación', u: 'https://modelcontextprotocol.io/', lang: 'EN' },
          { type: 'repo', t: 'Servidores MCP de referencia y directorio', u: 'https://github.com/modelcontextprotocol/servers', lang: 'EN' },
          { type: 'repo', t: 'Playwright MCP (navegación y capturas)', u: 'https://github.com/microsoft/playwright-mcp', lang: 'EN' },
          { type: 'doc', t: 'MCP: construir un servidor (SDK TypeScript)', u: 'https://modelcontextprotocol.io/docs/develop/build-server', lang: 'EN' }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'cl-4-10', title: 'Contexto y coste: sesiones largas sin degradarse', minutes: 13, level: 'intermedio',
        summary: 'Higiene de sesiones (/clear, /compact, /context), qué sobrevive a la compactación, effort y modelo por tarea, caché automática, límites de la suscripción y cómo medir.',
        body: () => [
          B.lead('Tus sesiones duran días con compactaciones. Es válido, pero cada compactación pierde detalle y cada turno arrastra ruido. Estas prácticas mantienen la sesión rápida, barata y fiel, y son la etapa 1 de tu plan.'),
          B.h('Higiene de sesión'),
          B.table(['Situación', 'Acción'], [
            ['Cambias de tema (de pedidos a la Academia)', '<code>/clear</code> (o sesión nueva). Contexto ajeno = ruido y coste'],
            ['La sesión se pone lenta o repite cosas', '<code>/context</code> para ver qué pesa; luego <code>/compact conserva decisiones y archivos tocados</code>'],
            ['Antes de compactar', 'Pide que anote decisiones en <code>_maestro_wip/</code> (o un hook PreCompact lo hace solo)'],
            ['Tarea con mucha lectura (auditar 52 secciones)', 'Subagentes: sus lecturas no entran en tu contexto'],
            ['Un comando devolvería miles de líneas', 'Acotar: <code>| tail -50</code>, <code>| grep</code>, o "resume el resultado en 5 líneas"'],
            ['Segunda corrección sobre lo mismo', 'Resumen + <code>/clear</code> + prompt mejor (lección 2.4)'],
            ['Quieres saber cuánto llevas', '<code>/cost</code> · <code>/usage</code> (límites de Max y renovación)']
          ]),
          B.h('Qué sobrevive a la compactación'),
          B.p('Al compactar (manual o automática cuando el contexto se llena), Claude resume la conversación conservando peticiones clave, decisiones, errores y diffs importantes. <b>Siempre</b> se mantienen: system prompt, CLAUDE.md y reglas, memoria automática; se releen los archivos modificados recientemente; las Skills invocadas se reinyectan (recortadas). <b>Se pierde</b> el detalle de lo que no se resumió. De ahí la regla: lo que importa, a un archivo.'),
          B.h('Effort y modelo por tarea'),
          B.p('<code>/effort low</code> para lo mecánico (CSS, textos, consultas simples); <code>medium</code> para construir; <code>high</code> o <code>max</code> para auditar, depurar algo difícil o decidir arquitectura. Y <code>/model</code> para cambiar de Sonnet a Opus o Fable dentro de la misma sesión cuando la tarea lo pide. Los subagentes con rol lo hacen automático. Con la suscripción Max, el gasto se mide en uso de la ventana, no en dólares: los modelos grandes consumen más deprisa el límite; <code>/usage</code> lo muestra.'),
          B.h('Caché'),
          B.p('Claude Code aplica caché de prompts automáticamente: el system prompt, CLAUDE.md y el historial estable se reutilizan entre turnos. Por eso una sesión larga no cuesta lo que parece por turno. Lo que rompe la caché: cambiar el CLAUDE.md a mitad de sesión, cambiar de modelo, o pausas largas (la caché expira en minutos; una hora en algunos casos). No es motivo para no hacerlo, pero explica picos.'),
          B.h('Medir para decidir'),
          B.list([
            '<code>/cost</code> al final de una tarea: cuánto costó (estimación) y con qué modelo.',
            '<code>/usage</code>: consumo de la suscripción y cuándo se renueva la ventana.',
            'Con salida <code>--output-format json</code> en headless: <code>total_cost_usd</code> y desglose por modelo, para scripts.',
            'Si Maya pasa a API: la <b>Usage and Cost API</b> de Anthropic da el gasto real por clave y modelo.',
            '<code>statusLine</code> con modelo y coste de la sesión para tenerlo siempre a la vista.'
          ]),
          B.ex('Tu sesión panel, con higiene', [
            B.olist([
              'Al empezar el día: <code>/context</code>. Si el CLAUDE.md pesa más del 15 % del contexto, es hora del reparto en reglas (lección 3).',
              'Una sesión por dominio; dentro, <code>/clear</code> al cambiar de tema grande. Nombrarlas: <code>/rename panel-pedidos-sep</code>.',
              'Effort medium por defecto; <code>/effort high</code> antes de "revísame a fondo"; volver a medium después.',
              'Antes de compactar (o al ver que se acerca): "anota en _maestro_wip/DECISIONES.md lo decidido hoy".',
              'Lecturas masivas y auditorías: subagentes. Comandos ruidosos: acotados.',
              'Fin del día: <code>/cost</code>; anotar si algo se disparó y por qué.'
            ])
          ]),
          B.key('Contexto limpio = respuestas mejores y más baratas. /clear al cambiar de tema, /compact con instrucciones antes de que duela, subagentes para lo voluminoso, effort y modelo según la tarea, y todo lo importante en archivos.'),
          B.check('La sesión va lenta y Claude repite cosas que ya hizo. ¿Primer paso?', ['Cambiar a Fable', '/context para ver qué pesa; anotar decisiones; /compact con instrucciones o /clear si cambias de tema', 'Escribir más despacio', 'Reinstalar'], 1, 'Diagnóstico, persistencia de lo importante y limpieza. Un modelo mayor no arregla el ruido.'),
          B.cards([
            { icon: '🧹', title: '/clear al cambiar de tema', html: 'Contexto ajeno = ruido y coste.' },
            { icon: '🗜️', title: '/compact con instrucciones', html: 'Antes: decisiones a un archivo (o hook PreCompact).' },
            { icon: '🎚️', title: 'effort y modelo por tarea', html: 'low mecánico · medium construir · high auditar.' },
            { icon: '📏', title: 'Medir', html: '/context, /cost, /usage, statusLine.' }
          ])
        ],
        quiz: [
          { q: '¿Qué se conserva siempre tras una compactación?', type: 'multi', o: ['System prompt, CLAUDE.md y reglas', 'Memoria automática', 'Todo el detalle de la conversación', 'Archivos modificados recientemente (se releen)'], a: [0, 1, 3], why: 'El detalle no resumido se pierde: lo importante va a archivos.' },
          { q: 'La acción correcta al cambiar de un tema grande a otro sin relación es…', type: 'fill', a: ['/clear', 'clear', 'sesión nueva', 'sesion nueva'], why: '/clear o sesión nueva: el contexto del tema anterior es ruido.' },
          { q: 'Cambiar el CLAUDE.md a mitad de sesión no afecta a la caché de prompts.', type: 'tf', a: false, why: 'Rompe el prefijo cacheado; el siguiente turno cuesta más. No es grave, pero explica picos.' },
          { q: 'Para auditar 52 secciones sin llenar el contexto principal usas…', o: ['un solo turno largo', 'subagentes (sus lecturas no entran en tu contexto)', 'effort max', 'copiar y pegar'], a: 1, why: 'Delegación con contexto propio. Además pueden ir en paralelo.' }
        ],
        cards: [
          ['Higiene de sesión en Claude Code', '/clear al cambiar de tema; /context para ver qué pesa; /compact con instrucciones antes de que duela (decisiones a un archivo antes); subagentes para lecturas masivas; acotar salidas de comandos; /cost y /usage para medir.'],
          ['¿Qué sobrevive a la compactación?', 'Siempre: system prompt, CLAUDE.md y reglas, memoria automática; se releen archivos recientes; las Skills invocadas se reinyectan recortadas. Se pierde el detalle no resumido.'],
          ['Effort y modelo por tarea en Claude Code', '/effort low (mecánico), medium (construir), high/max (auditar, depurar difícil, arquitectura). /model para cambiar de Sonnet a Opus/Fable en la misma sesión. Los subagentes con rol lo automatizan.']
        ],
        resources: [
          { type: 'doc', t: 'Claude Code: Context window (cómo se llena y cómo compacta)', u: 'https://code.claude.com/docs/en/context-window', lang: 'EN' },
          { type: 'doc', t: 'Claude Code: Costs (medir y reducir)', u: 'https://code.claude.com/docs/en/costs', lang: 'EN' },
          { type: 'doc', t: 'Claude Code: Status line', u: 'https://code.claude.com/docs/en/statusline', lang: 'EN' }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'cl-4-11', title: 'Automatizar: /loop, Rutinas, headless, worktrees, /batch, equipos de agentes y mensajes entre sesiones', minutes: 16, level: 'avanzado',
        summary: 'Todas las formas de que Claude Code trabaje solo o en paralelo: programación dentro y fuera de la sesión, modo headless para scripts y CI, GitHub Actions, worktrees, /batch, agent teams, workflows y mensajería entre sesiones (frente a tu chat HTTP).',
        body: () => [
          B.lead('Aquí está la etapa 3 de tu plan: horas de trabajo en paralelo con un solo encargo, y Claude trabajando mientras no estás. Son ocho mecanismos; conviene saber cuál usar para qué.'),
          B.h('1. /loop: repetir dentro de la sesión'),
          B.p('<code>/loop 10m revisa si https://…/x_pt_.js responde 200 y avísame</code> repite la petición cada 10 minutos mientras la sesión está abierta; sin intervalo, Claude decide el ritmo según lo que espera. Para vigilar un deploy, un CI o una cola mientras trabajas. Se detiene al cerrar la sesión.'),
          B.h('2. Rutinas en la nube y tareas programadas'),
          B.p('Desde claude.ai/code: una <b>Rutina</b> es una sesión en la nube que se ejecuta con un horario (cron) sobre un repo de GitHub, con tus instrucciones, y puede abrir PRs, llamar a APIs o enviarte resultados. Corre en infraestructura de Anthropic: tu Mac apagado. Es la herramienta para el resumen diario de pagos y el corte de regalías (lección 3.3). La app de escritorio tiene <b>tareas programadas</b> equivalentes que corren en tu máquina.'),
          B.h('3. Headless: Claude Code en scripts'),
          B.code('bash', '# Un solo comando, salida estructurada\nclaude -p "Lee api/purchases/new.php y lista los endpoints externos que llama" --output-format json --allowedTools "Read,Grep"\n\n# Entrada por tubería\ntail -200 /var/log/api-error.log | claude -p "Agrupa los errores por causa y propón el fix del más frecuente"\n\n# En un bucle de shell: migración masiva\nfor f in admin/js/*.js; do\n  claude -p "Revisa $f: si usa fetch sin manejo de error, corrígelo. Solo ese archivo." --permission-mode acceptEdits --max-turns 6\ndone\n\n# Arranque mínimo para CI\nclaude -p "…" --bare --allowedTools "Read,Grep"', 'Headless'),
          B.p('<code>-p</code> ejecuta y sale; <code>--output-format json</code> devuelve resultado, coste y metadatos; <code>stream-json</code> emite eventos en tiempo real; <code>--max-turns</code> acota; <code>--bare</code> omite hooks, memoria y CLAUDE.md para arranques rápidos en CI. Es la base de tus workers si algún día quieres que un cron llame a Claude Code en vez de al SDK.'),
          B.h('4. GitHub Actions'),
          B.p('<code>anthropics/claude-code-action</code>: Claude responde a menciones <code>@claude</code> en issues y PRs, revisa código, implementa cambios y arregla CI, con tu clave de API en los secretos del repo. Para tus cuatro repos: revisión automática de cada PR con el prompt del auditor (solo comenta, no fusiona). Se pueden programar con cron de Actions.'),
          B.h('5. Worktrees: varias sesiones sin pisarse'),
          B.p('<code>claude --worktree feature-x</code> crea una copia aislada del repo (git worktree en <code>.claude/worktrees/feature-x</code>) y trabaja ahí. Varias sesiones en varios worktrees no se pisan los archivos; al terminar, se fusiona. La app de escritorio tiene gestor visual de worktrees. Es la solución de fondo al incidente del <code>git stash</code>: cada sesión en su copia. Un subagente también puede pedir <code>isolation: worktree</code>.'),
          B.h('6. /batch: de 5 a 30 agentes, cada uno con su PR'),
          B.p('<code>/batch [instrucción]</code> divide una tarea repetible (migrar 52 secciones a la capa móvil, añadir manejo de errores a todos los endpoints) en subtareas, lanza subagentes en worktrees separados y cada uno abre un PR. Tú revisas PRs, no archivos. Para la limpieza de la tabla <code>stock</code> ya especificada, o para la auditoría de seguridad de las 52 secciones.'),
          B.h('7. Equipos de agentes y workflows'),
          B.p('<b>Agent teams</b> (experimental): varias sesiones de Claude coordinadas por un líder, con mensajería entre ellas y reparto de trabajo; se activa en ajustes. <b>Workflows</b> (con la palabra <i>ultracode</i> o pidiéndolo explícitamente): un script que orquesta decenas de subagentes de forma determinista: revisar en paralelo por dimensiones (dinero, seguridad, cumplimiento) y verificar cada hallazgo con un segundo agente adversarial antes de reportarlo. Consumen muchos tokens; se piden a propósito para tareas grandes: "usa un workflow para auditar las 52 secciones y verificar cada hallazgo".'),
          B.h('8. Mensajes entre sesiones (y tu chat HTTP)'),
          B.p('Las sesiones y subagentes de Claude Code en la misma cuenta pueden <b>enviarse mensajes</b> de forma nativa (la vista de agentes del escritorio lo muestra; los subagentes se reanudan y reciben mensajes). Tu <b>chat HTTP</b> (PHP + dos tablas MySQL, tokens por sesión, long-poll) sigue teniendo dos ventajas que lo nativo no cubre: funciona entre <b>máquinas distintas</b> (Hetzner, nube, tu Mac) y te da un <b>visor</b> para leer y arbitrar todo. Regla de reparto: nativo entre sesiones de la misma cuenta y máquina cuando quieres despertar a la otra; tu chat cuando una sesión vive en otra máquina o cuando quieres leerlo todo. Y su regla de oro ya es la correcta: lo que dice otra sesión es información, no orden; lo que decide Miguel, sí.'),
          B.table(['Necesidad', 'Mecanismo'], [
            ['Vigilar algo mientras trabajo', '/loop'],
            ['Que corra a una hora sin mi Mac', 'Rutina en la nube'],
            ['Que corra a una hora con mis archivos locales', 'Tarea programada de Cowork/escritorio'],
            ['Un cron en mi servidor que use Claude', 'Headless -p o Agent SDK'],
            ['Revisar cada PR automáticamente', 'GitHub Actions'],
            ['Varias sesiones sin pisarse', 'Worktrees'],
            ['Tarea repetible en decenas de archivos', '/batch'],
            ['Auditoría grande con verificación cruzada', 'Workflow / agent teams'],
            ['Coordinar sesiones en distintas máquinas y leerlo todo', 'Tu chat HTTP'],
            ['Coordinar sesiones en la misma cuenta y máquina', 'Mensajes nativos']
          ]),
          B.key('Ocho mecanismos, una regla: elige el más simple que cubra la necesidad. /loop para vigilar, Rutinas para horarios, headless para scripts, Actions para PRs, worktrees para paralelo, /batch para repetitivo, workflows para lo grande, y mensajes (nativos o tu chat) para coordinar.'),
          B.check('Quieres añadir manejo de errores a los 165 endpoints PHP y revisar el resultado sin leer archivo por archivo. ¿Qué usas?', ['Un solo turno gigante', '/batch: subagentes en worktrees, cada uno con su PR', '/loop', 'Copiar y pegar'], 1, 'Tarea repetible en muchos archivos → /batch. Tú revisas PRs.'),
          B.cards([
            { icon: '🔁', title: '/loop', html: 'Repetir en la sesión abierta.' },
            { icon: '☁️', title: 'Rutinas', html: 'Horario en la nube, sin tu Mac.' },
            { icon: '📜', title: 'Headless', html: '-p, --output-format json, --max-turns, --bare.' },
            { icon: '🌳', title: 'Worktrees y /batch', html: 'Paralelo sin pisarse; PR por subtarea.' },
            { icon: '💬', title: 'Mensajes', html: 'Nativos en la misma máquina; tu chat HTTP entre máquinas y con visor.' }
          ])
        ],
        quiz: [
          { q: '¿Qué mecanismo corre a una hora fija sin que tu ordenador esté encendido?', o: ['/loop', 'Rutina de Claude Code en la nube', 'Tarea programada de escritorio', 'Worktree'], a: 1, why: 'Infraestructura de Anthropic sobre tu repo de GitHub.' },
          { q: 'La opción de Claude Code para scripts que devuelve resultado y coste en JSON es…', type: 'fill', a: ['--output-format json', 'output-format json', '--output-format', 'json'], why: '-p "…" --output-format json (o stream-json para eventos en tiempo real).' },
          { q: '/batch lanza subagentes en worktrees separados y cada uno abre un PR.', type: 'tf', a: true, why: 'De 5 a 30 subtareas. Ideal para cambios repetibles en muchos archivos.' },
          { q: 'Tu chat HTTP entre sesiones sigue siendo la mejor opción cuando…', o: ['todas las sesiones están en tu Mac', 'una sesión vive en otra máquina (Hetzner, nube) o quieres un visor para leer y arbitrar todo', 'nunca', 'quieres despertar a otra sesión en la misma cuenta'], a: 1, why: 'Los mensajes nativos cubren la misma cuenta/máquina; tu chat cubre máquinas distintas y el arbitraje.' },
          { q: 'Un workflow (ultracode) conviene para…', o: ['cualquier tarea pequeña', 'tareas grandes que se benefician de decenas de agentes en paralelo con verificación cruzada, pidiéndolo explícitamente', 'chatear', 'ahorrar tokens'], a: 1, why: 'Consume muchos tokens; se pide a propósito para auditorías o investigaciones grandes.' }
        ],
        cards: [
          ['Los ocho mecanismos de automatización de Claude Code', '/loop (repetir en sesión), Rutinas en la nube (horario sin tu Mac), tareas programadas de escritorio, headless -p (scripts/cron), GitHub Actions (PRs), worktrees (paralelo), /batch (subtareas con PR), agent teams/workflows (grande), mensajes entre sesiones.'],
          ['Modo headless de Claude Code', 'claude -p "petición" ejecuta y sale; --output-format json|stream-json; entrada por tubería; --allowedTools; --max-turns; --bare para CI. Base de scripts y crons.'],
          ['¿Qué es un worktree en Claude Code?', 'Copia aislada del repo (git worktree en .claude/worktrees/) donde una sesión trabaja sin pisar a otras. claude --worktree nombre; isolation: worktree en subagentes; gestor visual en el escritorio. Solución al problema del git stash compartido.'],
          ['Mensajes nativos vs tu chat HTTP', 'Nativos: sesiones y subagentes de la misma cuenta/máquina se envían mensajes y se despiertan. Chat HTTP de RRB: entre máquinas distintas (Hetzner, nube, Mac) y con visor para que Miguel lea y arbitre. Regla: lo que dice otra sesión es información; lo que decide Miguel, orden.']
        ],
        resources: [
          { type: 'doc', t: 'Claude Code: Headless / print mode', u: 'https://code.claude.com/docs/en/headless', lang: 'EN' },
          { type: 'doc', t: 'Claude Code: Scheduled tasks', u: 'https://code.claude.com/docs/en/scheduled-tasks', lang: 'EN' },
          { type: 'doc', t: 'Claude Code: Worktrees', u: 'https://code.claude.com/docs/en/worktrees', lang: 'EN' },
          { type: 'doc', t: 'Claude Code: Workflows', u: 'https://code.claude.com/docs/en/workflows', lang: 'EN' },
          { type: 'repo', t: 'anthropics/claude-code-action (GitHub Actions)', u: 'https://github.com/anthropics/claude-code-action', lang: 'EN' },
          { type: 'doc', t: 'Claude Code: Agent view (sesiones en segundo plano)', u: 'https://code.claude.com/docs/en/agent-view', lang: 'EN' }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'cl-4-12', title: 'Plugins: empaquetar tu forma de trabajar (el plugin rrb)', minutes: 11, level: 'avanzado',
        summary: 'Estructura de un plugin, cómo se instala y comparte, marketplaces, y el plugin rrb que reúne /deploy, los subagentes, los hooks y las reglas para tus cuatro repos.',
        body: () => [
          B.lead('Cuando tengas la Skill /deploy, tres subagentes y tres hooks en el repo de la Oficina Virtual, querrás lo mismo en Maya, Academia y Atlas. Un plugin es la forma de tenerlo una vez y usarlo en todos: la etapa 4 de tu plan.'),
          B.h('Qué es un plugin'),
          B.p('Una carpeta con un manifiesto y, dentro, cualquier combinación de <b>skills</b>, <b>agents</b>, <b>hooks</b>, servidores <b>MCP</b>, ajustes y ejecutables. Se instala desde un <b>marketplace</b> (un repositorio de GitHub con un <code>marketplace.json</code>) o desde una carpeta local, y se activa o desactiva por proyecto. Anthropic mantiene un marketplace oficial y uno comunitario.'),
          B.code('text', 'rrb-plugin/\n├── .claude-plugin/\n│   └── plugin.json          # nombre, descripción, versión, autor\n├── skills/\n│   ├── deploy/SKILL.md\n│   ├── auditoria-atencion/SKILL.md\n│   ├── corte-regalias/SKILL.md\n│   └── verifica-movil/SKILL.md\n├── agents/\n│   ├── auditor.md\n│   ├── constructor.md\n│   └── verificador-movil.md\n├── hooks/\n│   └── hooks.json           # sin-llaves, respaldo-antes-de-ftp, sin-stash\n├── bin/\n│   ├── sin-llaves.sh\n│   ├── respaldo-antes-de-ftp.sh\n│   └── sin-stash.sh\n├── .mcp.json                # rrb-admin (solo lectura), playwright\n└── settings.json            # permisos allow/ask/deny recomendados', 'Estructura del plugin rrb'),
          B.code('json', '{\n  "name": "rrb",\n  "description": "Forma de trabajar de RRB México: deploy seguro, auditor, constructor, verificador móvil, hooks de seguridad y permisos.",\n  "version": "1.0.0",\n  "author": { "name": "Miguel Espinosa" },\n  "license": "UNLICENSED"\n}', '.claude-plugin/plugin.json'),
          B.h('Instalar, probar, compartir'),
          B.code('bash', 'claude plugin init rrb                       # esqueleto\nclaude plugin validate ./rrb-plugin           # comprobar antes de usar\nclaude --plugin-dir ./rrb-plugin              # probarlo en una sesión\n# Publicar: repo privado de GitHub con marketplace.json\nclaude plugin marketplace add sgmike/rrb-plugins\n/plugin                                       # instalar "rrb" desde el marketplace, activar por proyecto', 'CLI'),
          B.p('Las Skills de un plugin se invocan con espacio de nombres: <code>/rrb:deploy</code>, <code>/rrb:auditoria-atencion</code>. Los hooks y agentes se cargan al activarlo. Actualizas el plugin en un sitio y los cuatro repos lo reciben.'),
          B.h('Qué va en el plugin y qué en cada repo'),
          B.compare('Plugin rrb (común)', ['Ritual de deploy (parametrizado por rutas remotas por repo).', 'Subagentes con rol y modelo.', 'Hooks de seguridad.', 'Permisos base.', 'Skill de estilo (tuteo, español, líneas rojas).'],
            'Cada repo (específico)', ['CLAUDE.md corto con lo propio.', '.claude/rules/ con esquema y convenciones de ese repo.', 'Variables de entorno de ese servidor.', 'Tests y comandos propios.']),
          B.key('Un plugin convierte tu forma de trabajar en algo instalable: la misma seguridad y los mismos roles en Oficina Virtual, Maya, Academia y Atlas, actualizados desde un solo lugar. Es la consistencia entre sesiones que hoy depende de la memoria de cada una.'),
          B.check('¿Cómo se invoca la Skill deploy si viene del plugin rrb?', ['/deploy', '/rrb:deploy', 'deploy()', '@deploy'], 1, 'Espacio de nombres plugin:skill para evitar conflictos.'),
          B.cards([
            { icon: '📦', title: 'Plugin', html: 'skills + agents + hooks + MCP + settings en una carpeta con manifiesto.' },
            { icon: '🏪', title: 'Marketplace', html: 'Repo de GitHub con marketplace.json; oficial, comunitario o privado.' },
            { icon: '🧪', title: 'Probar', html: 'claude plugin validate; --plugin-dir.' },
            { icon: '🔁', title: 'Un sitio, cuatro repos', html: 'Actualizar el plugin actualiza todo.' }
          ])
        ],
        quiz: [
          { q: 'Un plugin de Claude Code puede contener…', type: 'multi', o: ['Skills', 'Subagentes', 'Hooks', 'Servidores MCP y ajustes'], a: [0, 1, 2, 3], why: 'Todo lo que define una forma de trabajar, instalable y versionado.' },
          { q: 'El archivo de manifiesto de un plugin está en…', type: 'fill', a: ['.claude-plugin/plugin.json', 'plugin.json'], why: '.claude-plugin/plugin.json con nombre, descripción, versión y autor.' },
          { q: 'Para probar un plugin local sin publicarlo usas…', o: ['/plugin install', 'claude --plugin-dir ./ruta', 'git push', 'claude mcp add'], a: 1, why: 'Y claude plugin validate para comprobarlo antes.' },
          { q: 'El CLAUDE.md específico de cada repo debe ir dentro del plugin.', type: 'tf', a: false, why: 'El plugin lleva lo común (deploy, roles, hooks, permisos); cada repo conserva su CLAUDE.md corto y sus reglas propias.' }
        ],
        cards: [
          ['¿Qué es un plugin de Claude Code?', 'Carpeta con .claude-plugin/plugin.json y skills/, agents/, hooks/, .mcp.json, settings.json, bin/. Se instala desde un marketplace (repo con marketplace.json) o con --plugin-dir; se activa por proyecto; skills como /plugin:skill.'],
          ['El plugin rrb', 'Común a los cuatro repos: /deploy parametrizado, auditor/constructor/verificador-movil, hooks sin-llaves/respaldo-antes-de-ftp/sin-stash, permisos base, skill de estilo. Cada repo mantiene su CLAUDE.md y sus rules.'],
          ['Comandos de plugins', 'claude plugin init nombre; claude plugin validate ruta; claude --plugin-dir ruta; claude plugin marketplace add owner/repo; /plugin para instalar, activar, ver errores.']
        ],
        resources: [
          { type: 'doc', t: 'Claude Code: Plugins', u: 'https://code.claude.com/docs/en/plugins', lang: 'EN' },
          { type: 'doc', t: 'Claude Code: Plugin marketplaces', u: 'https://code.claude.com/docs/en/plugin-marketplaces', lang: 'EN' },
          { type: 'repo', t: 'anthropics/claude-plugins-official', u: 'https://github.com/anthropics/claude-plugins-official', lang: 'EN' }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'cl-4-13', title: 'Las buenas prácticas de Anthropic, en una lista', minutes: 10, level: 'intermedio',
        summary: 'La guía oficial de Claude Code condensada en un checklist de 20 puntos, marcando cuáles ya haces y cuáles son tu siguiente paso.',
        body: () => [
          B.lead('Anthropic publica una guía de buenas prácticas escrita por el equipo de Claude Code. Esta es su versión en checklist, con tu estado real a septiembre de 2026.'),
          B.h('Contexto y memoria'),
          B.list([
            '✅ <b>Un CLAUDE.md en el repo</b> con comandos, convenciones y reglas. (Lo tienes; falta podarlo y repartirlo.)',
            '⬜ <b>Menos de 200 líneas</b>; lo voluminoso a <code>.claude/rules/</code>; <code>/doctor</code> para podar.',
            '✅ <b>Memoria automática</b> revisada. (La usas; falta la revisión mensual.)',
            '⬜ <b>/clear entre tareas</b> sin relación; <b>/compact con instrucciones</b> antes de que duela.',
            '⬜ <b>Lo importante a archivos</b> (<code>_maestro_wip</code>, <code>docs/</code>) antes de compactar.'
          ]),
          B.h('Flujo de trabajo'),
          B.list([
            '✅ <b>Propuesta antes de construir</b>; fases chicas con luz verde. (Es tu forma de trabajar.)',
            '⬜ <b>Modo plan explícito</b> (Shift+Tab) para explorar sin cambiar; Ctrl+G para editar el plan.',
            '✅ <b>Capturas como especificación</b> y verificación visual a tamaño teléfono.',
            '✅ <b>Verificación real</b> (tests, navegador, datos) antes de aprobar. (Aprobar viendo.)',
            '⬜ <b>Corregir pronto</b>: una corrección, luego rebobinar (Esc Esc) y reformular; dos correcciones = /clear.',
            '⬜ <b>Nombrar sesiones</b> (<code>/rename</code>) y bifurcar (<code>--fork-session</code>) para explorar alternativas.'
          ]),
          B.h('Delegación y roles'),
          B.list([
            '✅ <b>Un modelo por tipo de tarea</b>. (Tu política.)',
            '⬜ <b>Subagentes con rol</b> escritos: auditor, constructor, verificador.',
            '⬜ <b>Uno escribe, otro revisa</b> con contexto limpio y modelo distinto.',
            '✅ <b>Auditorías periódicas con agente aparte</b>. (Ya lo haces con Maya.)',
            '⬜ <b>Subagentes para lecturas masivas</b> y tareas paralelas.'
          ]),
          B.h('Seguridad y automatización'),
          B.list([
            '⬜ <b>Permisos preaprobados</b> para lo inocuo; deny para secretos y destructivos; sandbox.',
            '⬜ <b>Hooks</b> para lo que no puede depender de la memoria (llaves, respaldo, stash).',
            '⬜ <b>Skills</b> para rituales (/deploy) en vez de comandos sueltos.',
            '⬜ <b>Rutinas</b> para lo que debe ocurrir sin ti.',
            '⬜ <b>Worktrees</b> para sesiones paralelas; <b>/batch</b> para lo repetible; <b>Actions</b> para PRs.',
            '⬜ <b>Plugin</b> para llevar todo a los cuatro repos.'
          ]),
          B.key('Ocho de veinte ya los haces sin haberlos leído: tu instinto era bueno. Los doce restantes son exactamente las etapas 1 a 4 de tu plan, y cada uno tiene su lección en este módulo. Vuelve a esta lista cada mes y marca.'),
          B.check('¿Cuál de estas prácticas es la que Anthropic más repite para evitar retrabajo?', ['Usar el modelo más grande siempre', 'Explorar y planear antes de construir, con verificación real en cada fase', 'Escribir prompts muy largos', 'Desactivar los permisos'], 1, 'Explore → plan → code → verify. Es tu "primero la propuesta" con nombre oficial.'),
          B.cards([
            { icon: '✅', title: 'Ya haces 8/20', html: 'Propuesta, fases, capturas, verificación, política de modelos, auditorías, CLAUDE.md, memoria.' },
            { icon: '⬜', title: 'Siguientes 12', html: 'Podar CLAUDE.md, plan mode, /clear, subagentes, permisos, hooks, skills, rutinas, worktrees, batch, plugin.' },
            { icon: '📆', title: 'Mensual', html: 'Vuelve y marca.' }
          ])
        ],
        quiz: [
          { q: '¿Cuántas de las 20 prácticas hace ya Miguel según el checklist?', o: ['Ninguna', 'Unas 8', 'Todas', '15'], a: 1, why: 'Propuesta, fases, capturas, verificación, política de modelos, auditorías, CLAUDE.md y memoria.' },
          { q: 'El patrón "uno escribe, otro revisa" exige…', o: ['la misma sesión', 'un revisor con contexto limpio, idealmente otro modelo', 'un humano siempre', 'dos ordenadores'], a: 1, why: 'Encuentra más y no está sesgado por lo que acaba de construir.' },
          { q: 'La guía de buenas prácticas de Claude Code está escrita por…', type: 'fill', a: ['Anthropic', 'el equipo de Claude Code', 'anthropic', 'Boris Cherny'], why: 'Anthropic, el equipo de Claude Code. Está en code.claude.com/docs/en/best-practices.' }
        ],
        cards: [
          ['Checklist de buenas prácticas de Claude Code (Anthropic)', 'Contexto: CLAUDE.md corto + rules, memoria revisada, /clear y /compact, lo importante a archivos. Flujo: propuesta y fases, modo plan, capturas, verificación real, corregir pronto, nombrar sesiones. Roles: modelo por tarea, subagentes con rol, uno escribe/otro revisa, auditorías. Seguridad: permisos, hooks, skills, rutinas, worktrees, batch, plugin.']
        ],
        resources: [
          { type: 'doc', t: 'Claude Code: Best practices (la guía oficial)', u: 'https://code.claude.com/docs/en/best-practices', lang: 'EN' },
          { type: 'article', t: 'Anthropic Engineering: Claude Code best practices', u: 'https://www.anthropic.com/engineering/claude-code-best-practices', lang: 'EN' },
          { type: 'video', t: 'Boris Cherny: Mastering Claude Code in 30 minutes', u: 'https://www.youtube.com/watch?v=6eBSHbLKuN0', lang: 'EN', min: 30 }
        ]
      }
    ]
  };
})();
