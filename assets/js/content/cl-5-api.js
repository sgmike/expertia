/* Manual de Claude · Módulo 5: La API, el Agent SDK y Managed Agents. */
(function () {
  'use strict';
  const B = EX.B;
  EX.MOD = EX.MOD || {};

  EX.MOD['cl-5'] = {
    id: 'cl-5', icon: '🔌', title: 'La API, el Agent SDK y Managed Agents',
    desc: 'Cómo se habla con Claude desde código: la Messages API, sus parámetros, herramientas, streaming, caché, lotes, archivos, salidas estructuradas, herramientas del servidor; el Agent SDK que mueve a Maya; Managed Agents; y cómo controlar coste y uso. Para decidir bien con quien lo programa (Claude).',
    goals: [
      'Leer y entender una llamada a la Messages API y sus parámetros clave (modelo, thinking, effort, herramientas).',
      'Saber qué ofrece cada capa: API directa, Tool Runner, Agent SDK, Managed Agents, y cuándo usar cada una.',
      'Aplicar caché, lotes, salidas estructuradas y herramientas del servidor para bajar coste y subir fiabilidad.',
      'Entender el Agent SDK tal como lo usa Maya y qué le añadirías.'
    ],
    lessons: [
      /* ------------------------------------------------------------------ */
      {
        id: 'cl-5-1', title: 'La Messages API en veinte minutos', minutes: 15, level: 'intermedio',
        summary: 'La llamada básica, roles, system prompt, respuesta, tokens y errores. Con Python, TypeScript y curl. No hace falta programar: hace falta leerlo.',
        body: () => [
          B.lead('Todo lo que Claude hace (claude.ai, Claude Code, Maya) pasa por una misma puerta: la <b>Messages API</b>. Entenderla te permite dirigir a quien programa y detectar cuando algo está mal diseñado.'),
          B.h('La llamada mínima'),
          B.code('python', 'import anthropic\n\nclient = anthropic.Anthropic()  # lee ANTHROPIC_API_KEY del entorno\n\nrespuesta = client.messages.create(\n    model="claude-sonnet-5",\n    max_tokens=1024,\n    system="Eres Maya, asistente de RRB México. Responde en español, breve y cercana. Nunca hagas afirmaciones de salud.",\n    messages=[\n        {"role": "user", "content": "hola ya pague mi pedido 8821 cuando llega?"}\n    ],\n)\nprint(respuesta.content[0].text)\nprint(respuesta.usage)  # input_tokens, output_tokens, cache_read_input_tokens…', 'Python (SDK oficial anthropic)'),
          B.code('typescript', 'import Anthropic from "@anthropic-ai/sdk";\nconst client = new Anthropic();\n\nconst respuesta = await client.messages.create({\n  model: "claude-sonnet-5",\n  max_tokens: 1024,\n  system: "Eres Maya, asistente de RRB México…",\n  messages: [{ role: "user", content: "hola ya pague mi pedido 8821 cuando llega?" }],\n});\nconsole.log(respuesta.content[0].type === "text" ? respuesta.content[0].text : respuesta.content);', 'TypeScript / Node (lo que usa Maya)'),
          B.code('bash', 'curl https://api.anthropic.com/v1/messages \\\n  -H "x-api-key: $ANTHROPIC_API_KEY" \\\n  -H "anthropic-version: 2023-06-01" \\\n  -H "content-type: application/json" \\\n  -d \'{\n    "model": "claude-sonnet-5",\n    "max_tokens": 1024,\n    "system": "Eres Maya…",\n    "messages": [{"role": "user", "content": "hola ya pague mi pedido 8821 cuando llega?"}]\n  }\'', 'curl (para probar desde la terminal)'),
          B.h('Las piezas'),
          B.terms([
            ['<code>model</code>', 'El ID del modelo (lección 1.2). Fija la versión; no uses alias "latest" en producción.'],
            ['<code>max_tokens</code>', 'Tope de tokens de salida (incluye el pensamiento). Si se alcanza, <code>stop_reason: "max_tokens"</code> y la respuesta queda cortada.'],
            ['<code>system</code>', 'El system prompt: identidad, reglas, herramientas y cuándo usarlas. Lo estable primero (caché).'],
            ['<code>messages</code>', 'La conversación: lista alternada de <code>user</code> y <code>assistant</code>. Sin estado en el servidor: tú envías el historial completo cada vez (o usas sesiones del SDK / Managed Agents).'],
            ['<code>content</code>', 'Puede ser texto o una lista de bloques: texto, imagen (base64 o URL), documento (PDF), llamada a herramienta, resultado de herramienta, pensamiento.'],
            ['Respuesta', '<code>content</code> (bloques), <code>stop_reason</code> (<code>end_turn</code>, <code>tool_use</code>, <code>max_tokens</code>, <code>refusal</code>), <code>usage</code> (tokens de entrada, salida, caché).']
          ]),
          B.h('Imágenes y documentos'),
          B.code('python', 'messages=[{\n  "role": "user",\n  "content": [\n    {"type": "image", "source": {"type": "base64", "media_type": "image/jpeg", "data": comprobante_b64}},\n    {"type": "text", "text": "Extrae: banco, importe, fecha, referencia y nombre del ordenante. Si algo no se lee, di \\"ilegible\\"."}\n  ]\n}]', 'Un comprobante SPEI como imagen (lo que hace confirmar_pago_comprobante)'),
          B.h('Errores y límites'),
          B.table(['Código', 'Significado', 'Qué hacer'], [
            ['400', 'Petición mal formada (parámetro inválido, p. ej. budget_tokens en Fable)', 'Corregir; leer el mensaje'],
            ['401 / 403', 'Clave inválida o sin permiso', 'Revisar la clave y su alcance'],
            ['429', 'Límite de tasa (peticiones o tokens por minuto)', 'Reintentar con espera exponencial; el SDK lo hace solo; subir de nivel de uso'],
            ['500 / 529', 'Error del servidor / sobrecarga', 'Reintentar; failover a otro modelo si es crítico (como Maya con DeepSeek)'],
            ['<code>stop_reason: refusal</code>', 'Un clasificador de Fable declinó la petición (HTTP 200)', 'No se cobra; reintentar en otro modelo (fallback) si procede']
          ]),
          B.p('Los SDK oficiales (Python, TypeScript, Java, Go, Ruby, C#, PHP) reintentan solos los 429 y 5xx, gestionan streaming y tipos. Para PHP existe SDK oficial: si algún día la API del admin llama a Claude directamente, no hace falta Node en medio.'),
          B.key('Una llamada = modelo + system + mensajes → bloques de contenido + motivo de parada + uso. Sin estado: el historial lo mandas tú. Todo lo demás (herramientas, caché, streaming) son parámetros sobre esta base.'),
          B.check('Maya recibe una respuesta con stop_reason "max_tokens". ¿Qué pasó?', ['El usuario escribió demasiado', 'La respuesta se cortó al alcanzar el tope de tokens de salida; hay que subir max_tokens o pedir respuestas más cortas', 'Un error de red', 'El modelo se negó'], 1, 'Cuenta también los tokens de pensamiento. Si el corte es frecuente, revisa el tope.'),
          B.cards([
            { icon: '📨', title: 'messages.create', html: 'model + max_tokens + system + messages.' },
            { icon: '🧱', title: 'Bloques', html: 'Texto, imagen, documento, tool_use, tool_result, thinking.' },
            { icon: '🛑', title: 'stop_reason', html: 'end_turn, tool_use, max_tokens, refusal.' },
            { icon: '🔁', title: 'Sin estado', html: 'El historial lo mandas tú en cada llamada.' }
          ])
        ],
        quiz: [
          { q: 'En la Messages API, el system prompt va en…', o: ['el primer mensaje user', 'el parámetro system', 'la URL', 'una cabecera HTTP'], a: 1, why: 'Parámetro system, separado de messages. Lo estable primero para aprovechar la caché.' },
          { q: 'La API guarda el historial de la conversación en el servidor entre llamadas.', type: 'tf', a: false, why: 'Sin estado: envías el historial completo cada vez (o usas sesiones del Agent SDK / Managed Agents).' },
          { q: 'Un stop_reason "refusal" en Fable 5 significa…', o: ['error 500', 'que un clasificador declinó la petición; HTTP 200, no se cobra, se puede reintentar en otro modelo', 'que faltan tokens', 'que la clave expiró'], a: 1, why: 'Fable incluye clasificadores; existe fallback del lado del servidor.' },
          { q: 'El código HTTP de límite de tasa que el SDK reintenta automáticamente es…', type: 'fill', a: ['429'], why: '429: demasiadas peticiones o tokens por minuto. Reintento con espera exponencial.' },
          { q: 'Para enviar un comprobante como imagen, el bloque de contenido es de tipo…', o: ['text', 'image (base64 o URL)', 'file', 'photo'], a: 1, why: 'Bloque image con source base64 o URL, seguido de un bloque de texto con la instrucción.' }
        ],
        cards: [
          ['Anatomía de una llamada a la Messages API', 'model (ID fijo), max_tokens (tope de salida incl. pensamiento), system (prompt estable), messages (user/assistant alternados, contenido en bloques). Respuesta: content (bloques), stop_reason, usage.'],
          ['Valores de stop_reason', 'end_turn (terminó), tool_use (quiere usar una herramienta), max_tokens (cortado por el tope), refusal (clasificador de Fable declinó; HTTP 200, sin cobro).'],
          ['Errores comunes de la API', '400 petición inválida; 401/403 clave; 429 límite de tasa (reintento exponencial automático en el SDK); 500/529 servidor/sobrecarga (reintentar, failover).'],
          ['SDK oficiales de Anthropic', 'Python, TypeScript, Java (y Kotlin/Scala), Go, Ruby, C#, PHP. Reintentan 429/5xx, gestionan streaming y tipos.']
        ],
        resources: [
          { type: 'doc', t: 'Anthropic: Messages API reference', u: 'https://platform.claude.com/docs/en/api/messages', lang: 'EN' },
          { type: 'doc', t: 'Anthropic: Get started (primera llamada)', u: 'https://platform.claude.com/docs/en/get-started', lang: 'EN' },
          { type: 'doc', t: 'Anthropic: SDK y librerías cliente', u: 'https://platform.claude.com/docs/en/api/client-sdks', lang: 'EN' },
          { type: 'repo', t: 'Anthropic Cookbook (recetas en Python y TS)', u: 'https://github.com/anthropics/anthropic-cookbook', lang: 'EN', note: 'Decenas de cuadernos: visión, herramientas, RAG, agentes, evals.' }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'cl-5-2', title: 'Parámetros que importan: thinking, effort, temperatura y salidas estructuradas', minutes: 13, level: 'intermedio',
        summary: 'Pensamiento adaptativo, effort, temperatura, stop sequences, streaming y cómo forzar JSON válido con salidas estructuradas. Y los cambios recientes que rompen código antiguo.',
        body: () => [
          B.lead('Cuatro parámetros deciden la calidad, el coste y la fiabilidad de una llamada. Y varios han cambiado en 2025-2026: código escrito para Claude 3.x puede fallar en Fable.'),
          B.h('Pensamiento adaptativo y effort'),
          B.code('python', 'respuesta = client.messages.create(\n    model="claude-opus-5",\n    max_tokens=8000,\n    thinking={"type": "adaptive"},              # el modelo decide cuánto pensar\n    output_config={"effort": "high"},           # low | medium | high | xhigh | max\n    system=…, messages=…,\n)\n# En Fable 5.x el pensamiento está siempre activo; thinking.type "disabled" no se admite.\n# El razonamiento en bruto no se devuelve; con thinking.display="summarized" llega un resumen.', 'Thinking y effort'),
          B.warn('Cambio que rompe código: <code>thinking: {"type": "enabled", "budget_tokens": N}</code> era la forma en Claude 3.7-4.5. En 4.6 está obsoleta y en Fable 5/5.1, Sonnet 5, Opus 5 y 4.7/4.8 <b>devuelve error 400</b>. Usa <code>{"type": "adaptive"}</code> y controla el gasto con <code>effort</code>. Si Maya migra de modelo, este es el primer parámetro a revisar.'),
          B.h('Temperatura y muestreo'),
          B.p('<code>temperature</code> (0 a 1): baja para extracción y clasificación, alta para ideas (curso 2.3). En modelos razonadores conviene dejar el valor por defecto cuando el pensamiento está activo. <code>stop_sequences</code>: cadenas que cortan la generación (útil para formatos). <code>top_p</code> y <code>top_k</code> existen pero rara vez hacen falta.'),
          B.h('Streaming'),
          B.p('Con <code>stream=True</code> la respuesta llega en eventos según se genera. Imprescindible para respuestas largas (evita tiempos de espera) y para mostrar texto en tiempo real. Los SDK ofrecen ayudantes: <code>client.messages.stream(...)</code> con <code>.get_final_message()</code> si solo quieres el resultado completo.'),
          B.h('Salidas estructuradas: JSON garantizado'),
          B.p('Cuando necesitas datos (los campos de un comprobante, la clasificación de un mensaje), pedir "responde en JSON" no garantiza nada. Las <b>salidas estructuradas</b> obligan al modelo a producir JSON válido según un esquema:'),
          B.code('python', 'from pydantic import BaseModel\n\nclass Comprobante(BaseModel):\n    banco: str\n    importe_mxn: float\n    fecha: str            # YYYY-MM-DD\n    referencia: str | None\n    ordenante: str | None\n    legible: bool\n\nrespuesta = client.messages.parse(       # ayudante del SDK que aplica el esquema y devuelve el objeto\n    model="claude-sonnet-5",\n    max_tokens=1024,\n    messages=[{"role": "user", "content": [imagen_bloque, {"type": "text", "text": "Extrae los datos del comprobante."}]}],\n    output_format=Comprobante,\n)\ndatos = respuesta.parsed_output          # instancia de Comprobante, validada\n# En la API cruda: output_config={"format": {"type": "json_schema", "schema": {...}}}', 'Salidas estructuradas (Python)'),
          B.p('Lo mismo para herramientas: con <code>strict: true</code> en la definición de una herramienta, los argumentos que el modelo genera cumplen el esquema exacto. Para Maya, donde una tool recibe importes y folios, es la diferencia entre "casi siempre bien" y "siempre bien formado".'),
          B.h('Otros cambios recientes a tener en cuenta'),
          B.list([
            'El <b>prefill</b> (empezar tú la respuesta del asistente para forzar formato) ya no se admite en 4.6+; usa salidas estructuradas.',
            'Herramientas del servidor renovadas: <code>web_search_20260209</code>, <code>web_fetch_20260209</code>, <code>code_execution_20260521</code> (lección 5.5).',
            'Files API y Skills salieron de beta: <code>client.files</code>, <code>client.skills</code> sin cabecera beta.',
            'Fable 5.x: clasificadores que pueden devolver <code>refusal</code>; parámetro <code>fallbacks</code> para reintentar en otro modelo del lado del servidor.',
            'Compactación del lado del servidor y edición de contexto (limpiar resultados de herramientas viejos) para conversaciones largas.'
          ]),
          B.key('Para código nuevo: <code>thinking adaptive</code> + <code>effort</code>, temperatura baja para datos, streaming para largo, y salidas estructuradas para todo lo que se parsea. Para código viejo (Maya nació en 2026, pero revisa): quitar <code>budget_tokens</code> y prefills al migrar.'),
          B.check('Quieres extraer los campos de un comprobante y meterlos en la base de datos sin errores de formato. ¿Qué usas?', ['Pedir "responde en JSON" en el prompt', 'Salidas estructuradas con un esquema (output_format / json_schema) y temperatura baja', 'Effort max', 'Streaming'], 1, 'JSON válido garantizado según el esquema. El prompt solo pide; el esquema obliga.'),
          B.cards([
            { icon: '🧠', title: 'thinking adaptive', html: 'El modelo decide cuánto pensar; effort controla el gasto. budget_tokens = error 400 en modelos nuevos.' },
            { icon: '🌡️', title: 'temperature', html: 'Baja para datos; por defecto con pensamiento.' },
            { icon: '🌊', title: 'stream', html: 'Para respuestas largas y tiempo real.' },
            { icon: '📐', title: 'Salidas estructuradas', html: 'JSON válido por esquema; strict en herramientas.' }
          ])
        ],
        quiz: [
          { q: 'La forma correcta de activar el pensamiento en Fable 5.1, Opus 5 y Sonnet 5 es…', o: ['thinking: {type: "enabled", budget_tokens: 5000}', 'thinking: {type: "adaptive"} y controlar con output_config.effort', 'thinking: true', 'No se puede'], a: 1, why: 'budget_tokens devuelve 400 en estos modelos. Effort: low a max.' },
          { q: 'Para garantizar JSON válido según un esquema usas…', type: 'fill', a: ['salidas estructuradas', 'structured outputs', 'output_format', 'json_schema', 'output_config.format', 'salida estructurada'], why: 'Salidas estructuradas (output_format en el SDK; output_config.format en la API). Y strict: true en herramientas.' },
          { q: 'El prefill de la respuesta del asistente sigue siendo la forma recomendada de forzar formato en 2026.', type: 'tf', a: false, why: 'No se admite en 4.6+; usa salidas estructuradas.' },
          { q: 'El streaming es imprescindible cuando…', o: ['la respuesta es corta', 'la respuesta es larga o quieres mostrar texto en tiempo real (evita tiempos de espera)', 'usas Haiku', 'no usas herramientas'], a: 1, why: 'client.messages.stream(...) con get_final_message() si solo quieres el final.' }
        ],
        cards: [
          ['Pensamiento y effort en la API (2026)', 'thinking: {type: "adaptive"} (budget_tokens da 400 en Fable 5.x, Sonnet 5, Opus 5, 4.7/4.8); output_config: {effort: low|medium|high|xhigh|max}. En Fable el pensamiento siempre está activo y el razonamiento en bruto no se devuelve.'],
          ['Salidas estructuradas', 'output_format (SDK, con Pydantic/Zod) u output_config.format json_schema: JSON válido garantizado. strict: true en herramientas para argumentos exactos. Sustituye al prefill (no admitido en 4.6+).'],
          ['Cambios recientes que rompen código antiguo', 'budget_tokens → adaptive; prefill eliminado; herramientas del servidor renovadas (web_search_20260209…); Files y Skills fuera de beta; refusal y fallbacks en Fable; compactación y edición de contexto del lado del servidor.']
        ],
        resources: [
          { type: 'doc', t: 'Anthropic: Extended thinking / adaptive thinking', u: 'https://platform.claude.com/docs/en/build-with-claude/thinking', lang: 'EN' },
          { type: 'doc', t: 'Anthropic: Effort', u: 'https://platform.claude.com/docs/en/build-with-claude/effort', lang: 'EN' },
          { type: 'doc', t: 'Anthropic: Structured outputs', u: 'https://platform.claude.com/docs/en/build-with-claude/structured-outputs', lang: 'EN' },
          { type: 'doc', t: 'Anthropic: Streaming', u: 'https://platform.claude.com/docs/en/build-with-claude/streaming', lang: 'EN' },
          { type: 'doc', t: 'Anthropic: Migration guide (Fable 5)', u: 'https://platform.claude.com/docs/en/models/fable-5/migration-guide', lang: 'EN' }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'cl-5-3', title: 'Herramientas (tool use) y el bucle del agente', minutes: 16, level: 'avanzado',
        summary: 'Cómo se define una herramienta, cómo el modelo la pide, cómo devuelves el resultado, y el bucle completo. Manual, con el Tool Runner del SDK, y lo que hace Maya.',
        body: () => [
          B.lead('Las herramientas son lo que convierte a Claude en agente: en vez de solo texto, puede pedir "llama a <code>get_orden_detalle</code> con folio 8821". Tú ejecutas la función y le devuelves el resultado. Así funciona Maya con sus 62 tools.'),
          B.h('Definir una herramienta'),
          B.code('python', 'tools = [{\n    "name": "get_orden_detalle",\n    "description": "Devuelve el estado, los productos, el importe y la guía de un pedido de RRB a partir de su folio. Úsala cuando el distribuidor pregunte por un pedido concreto. No sirve para pedidos de otras personas.",\n    "input_schema": {\n        "type": "object",\n        "properties": {\n            "folio": {"type": "integer", "description": "Número de pedido, p. ej. 8821"}\n        },\n        "required": ["folio"]\n    },\n    "strict": True\n}]', 'Definición (JSON Schema)'),
          B.p('La <b>descripción</b> es lo más importante: es lo que el modelo lee para decidir cuándo usarla y cuándo no. Una buena descripción dice qué hace, cuándo usarla, cuándo no, y qué devuelve. Anthropic tiene una guía entera sobre escribir herramientas (lección 6.4).'),
          B.h('El bucle, a mano'),
          B.steps('Una vuelta completa', [
            'Llamas a <code>messages.create</code> con <code>tools=[…]</code> y el mensaje del usuario ("¿cuándo llega mi pedido 8821?").',
            'El modelo responde con <code>stop_reason: "tool_use"</code> y un bloque <code>tool_use</code>: <code>{"id": "toolu_01…", "name": "get_orden_detalle", "input": {"folio": 8821}}</code>. No ha respondido al usuario todavía.',
            'Tu código ejecuta la función real (consulta a la API PHP del admin con el JWT del distribuidor) y obtiene el resultado.',
            'Añades al historial el mensaje del asistente (con el bloque tool_use) y un mensaje <code>user</code> con un bloque <code>tool_result</code>: <code>{"type": "tool_result", "tool_use_id": "toolu_01…", "content": "{estado: enviado, guía: …}"}</code>.',
            'Vuelves a llamar a <code>messages.create</code> con el historial ampliado. El modelo lee el resultado y responde al usuario ("Tu pedido 8821 salió ayer con la guía…"), con <code>stop_reason: "end_turn"</code>. Si necesitara otra herramienta, repetiría desde el paso 2.'
          ]),
          B.code('python', 'messages = [{"role": "user", "content": pregunta}]\nwhile True:\n    r = client.messages.create(model="claude-sonnet-5", max_tokens=2048, system=SYSTEM, tools=tools, messages=messages)\n    messages.append({"role": "assistant", "content": r.content})\n    if r.stop_reason != "tool_use":\n        break                                  # end_turn, max_tokens o refusal: salir\n    resultados = []\n    for bloque in r.content:\n        if bloque.type == "tool_use":\n            salida = ejecutar(bloque.name, bloque.input)    # tu función real, con validación y permisos\n            resultados.append({"type": "tool_result", "tool_use_id": bloque.id, "content": salida})\n    messages.append({"role": "user", "content": resultados})\ntexto_final = "".join(b.text for b in r.content if b.type == "text")', 'El bucle manual (esqueleto)'),
          B.h('El Tool Runner: el bucle hecho por el SDK'),
          B.code('python', 'from anthropic import Anthropic, beta_tool\n\n@beta_tool\ndef get_orden_detalle(folio: int) -> str:\n    """Devuelve estado, productos, importe y guía de un pedido de RRB por folio."""\n    return api_admin.orden(folio)   # tu función real\n\nclient = Anthropic()\nrunner = client.beta.messages.tool_runner(\n    model="claude-sonnet-5", max_tokens=2048, system=SYSTEM,\n    tools=[get_orden_detalle],\n    messages=[{"role": "user", "content": pregunta}],\n)\nfor mensaje in runner:              # cada iteración es una vuelta del bucle; aquí puedes auditar o vetar\n    pass\nprint(runner.until_done().content)', 'Tool Runner (Python; en TS: betaZodTool + toolRunner)'),
          B.p('El Tool Runner ejecuta el bucle por ti y expone ganchos por turno: registrar, aprobar o vetar una llamada (dinero fuera de reglas), modificar resultados, reintentar. Es el punto medio entre el bucle manual y el Agent SDK.'),
          B.h('Qué hace Maya, en estos términos'),
          B.list([
            'Usa el <b>Agent SDK</b> (siguiente nivel: lección 5.6) como motor de un turno, con <code>maxTurns: 8</code> y 90 s de tiempo máximo: es este bucle, con tope.',
            'Sus tools se definen con esquema JSON + validación Zod (<code>defineTool</code>), filtradas por persona (Maya/Max).',
            'Regla <code>respuesta_plantilla</code>: si una tool devuelve ese campo, el texto sale literal, sin que el modelo lo reformule. Es un <b>resultado de herramienta que sustituye a la generación</b>: la defensa perfecta para lo que compromete (dinero, políticas).',
            '<b>Gate de confirmación de dinero</b> antes de tools que mueven dinero: el humano en el bucle. Con hooks del SDK esto sería <code>PreToolUse</code> declarativo en vez de lógica en el prompt.',
            'El 63 % de los turnos no llega al modelo: el <b>router determinístico</b> resuelve intents con reglas. Coste cero, cero alucinación.'
          ]),
          B.h('Buenas prácticas de herramientas'),
          B.list([
            '<b>Pocas y claras</b> mejor que muchas y parecidas; nombres que dicen lo que hacen; descripciones con cuándo sí y cuándo no.',
            '<b>Valida siempre</b> los argumentos en tu código (el modelo puede equivocarse); <code>strict</code> ayuda pero no sustituye la validación de negocio.',
            '<b>Resultados concisos</b>: devuelve lo que el modelo necesita, no la fila entera con 40 columnas. Ahorra contexto y errores.',
            '<b>Errores útiles</b>: si la tool falla, devuelve un mensaje que el modelo pueda usar ("folio no encontrado; pide al usuario que lo verifique"), no un stack trace.',
            '<b>Idempotencia</b> en lo que escribe (business_key), <b>topes</b> y <b>confirmación</b> en dinero. Maya ya lo hace.',
            '<b>Paralelismo</b>: el modelo puede pedir varias tools en un turno; ejecútalas en paralelo si son independientes.'
          ]),
          B.key('El bucle es simple: el modelo pide, tú ejecutas, le devuelves, él sigue. Toda la seguridad está en tu lado del bucle: qué herramientas existen, cómo validas, qué confirmas, qué sale literal. Maya es un ejemplo de libro.'),
          B.check('El modelo pide get_orden_detalle con folio 8821. ¿Quién ejecuta la consulta real?', ['Anthropic, en su servidor', 'Tu código: el modelo solo pide; tú ejecutas, validas y devuelves el resultado', 'El usuario', 'Nadie, el modelo la inventa'], 1, 'Las herramientas cliente se ejecutan en tu lado. Solo las herramientas del servidor (búsqueda web, ejecución de código) las ejecuta Anthropic.'),
          B.cards([
            { icon: '🧰', title: 'Definir', html: 'name + description (la clave) + input_schema + strict.' },
            { icon: '🔁', title: 'Bucle', html: 'tool_use → ejecutas → tool_result → sigue hasta end_turn.' },
            { icon: '🏃', title: 'Tool Runner', html: 'El SDK hace el bucle; ganchos por turno para vetar y auditar.' },
            { icon: '💬', title: 'Maya', html: 'Router 63 %, tools con Zod, respuesta_plantilla literal, gate de dinero.' }
          ])
        ],
        quiz: [
          { q: 'Cuando el modelo quiere usar una herramienta, la respuesta trae stop_reason…', o: ['end_turn', 'tool_use', 'max_tokens', 'refusal'], a: 1, why: 'Con un bloque tool_use (id, name, input). Tú ejecutas y devuelves un tool_result con ese id.' },
          { q: 'La parte más importante de la definición de una herramienta es…', o: ['el nombre', 'la descripción: qué hace, cuándo usarla, cuándo no', 'el tipo de retorno', 'el orden en la lista'], a: 1, why: 'Es lo que el modelo lee para decidir.' },
          { q: 'La regla respuesta_plantilla de Maya hace que el texto de una herramienta salga literal sin que el modelo lo reformule.', type: 'tf', a: true, why: 'Un resultado de herramienta que sustituye a la generación: ideal para dinero y políticas.' },
          { q: 'El bloque que envías al modelo con el resultado de una herramienta es de tipo…', type: 'fill', a: ['tool_result', 'tool result'], why: 'tool_result con el tool_use_id correspondiente, dentro de un mensaje user.' },
          { q: 'El Tool Runner del SDK…', o: ['sustituye al modelo', 'ejecuta el bucle de herramientas por ti y ofrece ganchos por turno para aprobar, vetar o auditar', 'solo funciona en Python', 'es lo mismo que Managed Agents'], a: 1, why: 'Punto medio entre el bucle manual y el Agent SDK.' }
        ],
        cards: [
          ['¿Cómo se define una herramienta para Claude?', 'JSON: name, description (qué hace, cuándo sí, cuándo no, qué devuelve), input_schema (JSON Schema), strict: true opcional. La descripción decide el uso.'],
          ['El bucle de herramientas', '1) messages.create con tools → 2) stop_reason tool_use con bloque {id, name, input} → 3) tu código ejecuta y valida → 4) añades tool_result con el id → 5) nueva llamada; repetir hasta end_turn.'],
          ['Tool Runner vs bucle manual vs Agent SDK', 'Manual: tú escribes el while. Tool Runner (client.beta.messages.tool_runner, @beta_tool / betaZodTool): el SDK hace el bucle con ganchos por turno. Agent SDK: el motor de Claude Code con herramientas integradas, sesiones, hooks, MCP.'],
          ['Buenas prácticas de herramientas', 'Pocas y claras; descripciones con cuándo sí/no; validar argumentos; resultados concisos; errores útiles para el modelo; idempotencia y confirmación en dinero; ejecutar en paralelo las independientes.']
        ],
        resources: [
          { type: 'doc', t: 'Anthropic: Tool use overview', u: 'https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview', lang: 'EN' },
          { type: 'doc', t: 'Anthropic: Tool Runner (SDK)', u: 'https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-runner', lang: 'EN' },
          { type: 'article', t: 'Anthropic Engineering: Writing effective tools for agents', u: 'https://www.anthropic.com/engineering/writing-tools-for-agents', lang: 'EN' },
          { type: 'repo', t: 'Cookbook: tool use (ejemplos)', u: 'https://github.com/anthropics/anthropic-cookbook/tree/main/tool_use', lang: 'EN' }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'cl-5-4', title: 'Caché, lotes, archivos y conversaciones largas', minutes: 12, level: 'intermedio',
        summary: 'Las cuatro funciones que bajan el coste y hacen posibles los agentes largos: caché de prompts, Batch API, Files API, y compactación y edición de contexto del lado del servidor.',
        body: () => [
          B.lead('Maya manda un system prompt de 1.200 líneas en cada turno. Sin caché costaría tres veces más. Estas cuatro funciones son las que separan un prototipo de un sistema que se paga solo.'),
          B.h('Caché de prompts'),
          B.p('Marca con <code>cache_control</code> el final del prefijo estable (system prompt, herramientas, documentos fijos). La primera llamada escribe la caché (cuesta un 25 % más); las siguientes que compartan ese prefijo <b>exacto</b> la leen al 10 % del precio (Fable 5.1: 2,5 %). Dura 5 minutos por defecto (renovables con cada uso) o una hora con <code>ttl: "1h"</code>.'),
          B.code('python', 'system=[\n  {"type": "text", "text": PERSONA_MAYA},                       # ~1.200 líneas, estable\n  {"type": "text", "text": FACTS_VIGENTES, "cache_control": {"type": "ephemeral"}},   # cambia cada 3 min como mucho\n],\ntools=TOOLS,   # las herramientas también forman parte del prefijo cacheado\nmessages=[…]   # lo variable, al final', 'Orden para la caché'),
          B.list([
            'Orden: herramientas → system → mensajes. Lo estable primero; el punto de caché al final de lo estable.',
            'Cualquier cambio <b>antes</b> del punto de caché la invalida (un espacio en el system prompt, una herramienta nueva).',
            'Hasta 4 puntos de caché por petición; mínimo ~1.024 tokens para que aplique.',
            '<code>usage.cache_read_input_tokens</code> te dice si está funcionando. Si es cero en el segundo turno, algo cambia antes del punto.'
          ]),
          B.h('Batch API: la mitad de precio'),
          B.p('Para trabajos que no necesitan respuesta inmediata: envías hasta 100.000 peticiones en un lote, se procesan en menos de 24 horas (normalmente en minutos u horas) con <b>50 % de descuento</b> en entrada y salida, combinable con la caché. Para RRB: el juez nocturno de Maya (100 % de las sesiones), clasificar históricos, generar los 356 guiones de audio, evaluar un eval completo. Nunca para Maya en vivo.'),
          B.h('Files API'),
          B.p('Sube un archivo una vez (PDF, imagen, CSV, hasta 500 MB) y referéncialo por <code>file_id</code> en tantas llamadas como quieras, sin reenviar bytes. Ya está fuera de beta (<code>client.files.upload</code>). Útil para el Documento maestro como PDF, catálogos, plantillas. Los archivos que Claude genera con la herramienta de ejecución de código también se descargan por aquí.'),
          B.h('Conversaciones largas: compactación y edición de contexto'),
          B.list([
            '<b>Compactación del lado del servidor</b>: la API puede resumir la conversación automáticamente cuando se acerca al límite, devolviéndote el resumen para seguir. Lo que Claude Code hace con <code>/compact</code>, disponible para tu agente.',
            '<b>Edición de contexto</b>: limpiar automáticamente los resultados de herramientas antiguos (que ya no aportan) para liberar espacio sin perder las decisiones. Para un checkout largo de Maya con muchas llamadas a tools.',
            '<b>Herramienta de memoria</b>: el modelo lee y escribe notas en un directorio que tú guardas; memoria entre sesiones sin que tú diseñes el formato (lección 6.5).'
          ]),
          B.table(['Función', 'Ahorro / beneficio', 'Uso en RRB'], [
            ['Caché de prompts', '90 % en el prefijo repetido (97,5 % en Fable 5.1)', 'System prompt y tools de Maya; CLAUDE.md en Claude Code (automático)'],
            ['Batch API', '50 % en todo', 'Juez nocturno, clasificación masiva, guiones, evals'],
            ['Files API', 'No reenviar archivos; referencias estables', 'Documento maestro, catálogos, comprobantes ya subidos'],
            ['Compactación / edición de contexto', 'Conversaciones largas sin desbordar ni pagar por ruido', 'Checkouts largos; agentes de horas'],
            ['Task budgets (beta)', 'Tope de tokens por tarea agéntica', 'Que un agente no se dispare']
          ]),
          B.key('Caché para lo repetido, Batch para lo que puede esperar, Files para lo que se reutiliza, compactación para lo largo. Con los cuatro, un agente en producción cuesta una fracción y aguanta conversaciones de horas.'),
          B.check('El segundo turno de Maya muestra cache_read_input_tokens = 0. ¿Causa más probable?', ['La caché no existe', 'Algo cambia antes del punto de caché en cada llamada (p. ej. la fecha en el system prompt o el orden de las tools)', 'El modelo no admite caché', 'El usuario escribió poco'], 1, 'El prefijo debe ser idéntico byte a byte. Lo variable, después del punto de caché.'),
          B.cards([
            { icon: '💾', title: 'Caché', html: 'Estable primero; cache_control al final de lo estable; 5 min o 1 h.' },
            { icon: '📦', title: 'Batch', html: '−50 %; <24 h; para lo que puede esperar.' },
            { icon: '📎', title: 'Files', html: 'Subir una vez, referenciar por file_id.' },
            { icon: '🗜️', title: 'Compactar', html: 'Resumen y limpieza de tool results del lado del servidor.' }
          ])
        ],
        quiz: [
          { q: 'Para que la caché de prompts funcione, el contenido antes del punto de caché debe ser…', o: ['parecido', 'idéntico byte a byte entre llamadas', 'corto', 'en inglés'], a: 1, why: 'Una fecha o un espacio distinto la invalidan. Lo variable va después.' },
          { q: 'La Batch API ofrece…', o: ['respuestas más rápidas', '50 % de descuento para trabajos procesados en menos de 24 h', 'modelos exclusivos', 'más contexto'], a: 1, why: 'Para jueces nocturnos, clasificaciones masivas y evals. Nunca para conversaciones en vivo.' },
          { q: 'La caché de prompts dura por defecto…', type: 'fill', a: ['5 minutos', '5 min', 'cinco minutos', '5'], why: '5 minutos renovables con cada uso; 1 hora con ttl: "1h".' },
          { q: 'La edición de contexto del lado del servidor sirve para…', o: ['editar el system prompt', 'limpiar automáticamente resultados de herramientas antiguos y liberar contexto en conversaciones largas', 'cambiar de modelo', 'borrar la caché'], a: 1, why: 'Para agentes con muchas llamadas a tools, como un checkout largo de Maya.' }
        ],
        cards: [
          ['Caché de prompts: reglas', 'Orden tools → system → messages; cache_control al final de lo estable; prefijo idéntico byte a byte; hasta 4 puntos; mínimo ~1.024 tokens; 5 min (o 1 h con ttl); lectura al 10 % del precio (2,5 % en Fable 5.1); escritura +25 %. Comprobar usage.cache_read_input_tokens.'],
          ['Batch API', 'Hasta 100.000 peticiones por lote, procesadas en <24 h, 50 % de descuento combinable con caché. Para jueces nocturnos, clasificación masiva, guiones, evals. No para tiempo real.'],
          ['Files API y conversaciones largas', 'Files: subir una vez (hasta 500 MB) y referenciar por file_id; fuera de beta. Compactación del lado del servidor (resumen automático), edición de contexto (limpiar tool results viejos), herramienta de memoria y task budgets para agentes largos.']
        ],
        resources: [
          { type: 'doc', t: 'Anthropic: Prompt caching', u: 'https://platform.claude.com/docs/en/build-with-claude/prompt-caching', lang: 'EN' },
          { type: 'doc', t: 'Anthropic: Batch processing', u: 'https://platform.claude.com/docs/en/build-with-claude/batch-processing', lang: 'EN' },
          { type: 'doc', t: 'Anthropic: Files API', u: 'https://platform.claude.com/docs/en/build-with-claude/files', lang: 'EN' },
          { type: 'doc', t: 'Anthropic: Compaction', u: 'https://platform.claude.com/docs/en/build-with-claude/compaction', lang: 'EN' },
          { type: 'doc', t: 'Anthropic: Context editing', u: 'https://platform.claude.com/docs/en/build-with-claude/context-editing', lang: 'EN' }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'cl-5-5', title: 'Herramientas del servidor: búsqueda web, código, memoria y MCP desde la API', minutes: 12, level: 'intermedio',
        summary: 'Herramientas que ejecuta Anthropic por ti: búsqueda y lectura web, ejecución de código en sandbox, memoria, búsqueda de herramientas, y el conector MCP para usar servidores remotos sin escribir el bucle.',
        body: () => [
          B.lead('Hay herramientas que no tienes que implementar: las ejecuta Anthropic en su servidor y el resultado vuelve dentro de la misma respuesta. Para un agente propio, ahorran semanas.'),
          B.table(['Herramienta', 'Tipo (versión 2026)', 'Qué hace', 'Uso en RRB'], [
            ['<b>Búsqueda web</b>', '<code>web_search_20260209</code>', 'Busca en internet y devuelve resultados con citas; filtrado dinámico por dominio', 'Que el asistente de dirección consulte normativa COFEPRIS actual o precios de competidores'],
            ['<b>Lectura web</b>', '<code>web_fetch_20260209</code>', 'Descarga y lee una URL (página o PDF)', 'Leer la ficha de un proveedor o una resolución publicada'],
            ['<b>Ejecución de código</b>', '<code>code_execution_20260521</code>', 'Ejecuta Python en un sandbox: cálculos, gráficos, análisis de CSV, generación de archivos', 'Analizar la exportación de churn y devolver el gráfico; cuadrar regalías con código, no de memoria'],
            ['<b>Memoria</b>', '<code>memory</code>', 'El modelo lee/escribe archivos de memoria en un directorio que tú persistes', 'Que Maya recuerde preferencias de un distribuidor entre sesiones'],
            ['<b>Búsqueda de herramientas</b>', 'tool search', 'Con cientos de tools, el modelo busca la que necesita en vez de cargar todas', 'Las 62 tools de Maya sin pagar contexto por todas'],
            ['<b>Conector MCP</b>', 'mcp_servers en la petición', 'La API llama a servidores MCP remotos por ti dentro del bucle', 'Usar tu servidor rrb-admin o GitHub desde un agente sin escribir la integración'],
            ['<b>Llamada programática de herramientas</b>', 'programmatic tool calling', 'El modelo escribe código que llama a tus herramientas en bucle sin volver al modelo en cada paso', 'Procesar 200 pedidos con una tool sin 200 turnos']
          ]),
          B.code('python', 'r = client.messages.create(\n    model="claude-opus-5", max_tokens=4000,\n    tools=[\n        {"type": "web_search_20260209", "name": "web_search", "max_uses": 5},\n        {"type": "code_execution_20260521", "name": "code_execution"},\n    ],\n    messages=[{"role": "user", "content": "Busca la normativa vigente de COFEPRIS sobre publicidad de suplementos alimenticios (2026), resume los 5 puntos que afectan a claims, y genera una tabla CSV con ejemplos de frases permitidas y prohibidas."}],\n)', 'Búsqueda web + ejecución de código en una llamada'),
          B.p('Las herramientas del servidor se cobran aparte (por búsqueda, por hora de sandbox) además de los tokens. Y su resultado entra en el contexto como cualquier otro: úsalas con <code>max_uses</code> y filtros de dominio.'),
          B.h('El conector MCP desde la API'),
          B.code('python', 'r = client.beta.messages.create(\n    model="claude-sonnet-5", max_tokens=2000,\n    betas=["mcp-client-2025-04-04"],\n    mcp_servers=[{"type": "url", "url": "https://api.sistemarrb.com/mcp", "name": "rrb-admin",\n                  "authorization_token": TOKEN_DESDE_ENTORNO}],\n    messages=[{"role": "user", "content": "¿Cuántos pagos sin vincular hay hoy y cuáles son los tres más antiguos?"}],\n)', 'La API llama a tu servidor MCP por ti'),
          B.key('Búsqueda, lectura web, código y memoria las ejecuta Anthropic; el conector MCP te ahorra integrar servidores remotos. Un agente de dirección con estas cinco herramientas se construye en una tarde: el trabajo está en el system prompt y en los permisos, no en la plomería.'),
          B.check('Quieres que un agente cuadre las regalías del mes con cálculos exactos sobre un CSV. ¿Qué herramienta del servidor?', ['Búsqueda web', 'Ejecución de código (Python en sandbox)', 'Memoria', 'Lectura web'], 1, 'Los cálculos exactos se hacen con código, no de memoria. El sandbox devuelve resultados y archivos.'),
          B.cards([
            { icon: '🔎', title: 'web_search / web_fetch', html: 'Con citas y filtros de dominio; versiones 20260209.' },
            { icon: '🐍', title: 'code_execution', html: 'Python en sandbox: análisis, gráficos, archivos.' },
            { icon: '🧠', title: 'memory', html: 'Notas persistentes que el modelo gestiona.' },
            { icon: '🔌', title: 'MCP connector', html: 'Servidores remotos dentro del bucle, sin integración propia.' }
          ])
        ],
        quiz: [
          { q: 'Las herramientas del servidor se diferencian de las herramientas cliente en que…', o: ['son más lentas', 'las ejecuta Anthropic y el resultado vuelve en la misma respuesta, sin que tú implementes nada', 'son gratis', 'no entran en el contexto'], a: 1, why: 'Búsqueda web, lectura web, ejecución de código, memoria. Se cobran aparte de los tokens.' },
          { q: 'La herramienta para que el modelo haga cálculos exactos sobre datos es…', type: 'fill', a: ['ejecución de código', 'code execution', 'code_execution', 'ejecucion de codigo', 'código'], why: 'code_execution: Python en sandbox. Nunca cálculos de memoria para dinero.' },
          { q: 'El conector MCP de la API permite usar servidores MCP remotos sin escribir el bucle de herramientas.', type: 'tf', a: true, why: 'mcp_servers en la petición; la API llama al servidor por ti.' },
          { q: 'Con cientos de herramientas disponibles, la función que evita cargar todas en el contexto es…', o: ['strict', 'la búsqueda de herramientas (tool search)', 'la caché', 'el streaming'], a: 1, why: 'El modelo busca la herramienta que necesita. Claude Code lo hace por defecto con MCP.' }
        ],
        cards: [
          ['Herramientas del servidor de la API de Claude (2026)', 'web_search_20260209 (búsqueda con citas y filtros), web_fetch_20260209 (leer URL/PDF), code_execution_20260521 (Python en sandbox), memory (notas persistentes), tool search (buscar entre cientos de tools), programmatic tool calling. Se cobran aparte de los tokens.'],
          ['¿Qué es el conector MCP de la API?', 'Parámetro mcp_servers en la petición: la API llama a servidores MCP remotos (tu rrb-admin, GitHub) dentro del bucle, sin que escribas la integración. Beta mcp-client.']
        ],
        resources: [
          { type: 'doc', t: 'Anthropic: Web search tool', u: 'https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool', lang: 'EN' },
          { type: 'doc', t: 'Anthropic: Code execution tool', u: 'https://platform.claude.com/docs/en/agents-and-tools/tool-use/code-execution-tool', lang: 'EN' },
          { type: 'doc', t: 'Anthropic: Memory tool', u: 'https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool', lang: 'EN' },
          { type: 'doc', t: 'Anthropic: MCP connector', u: 'https://platform.claude.com/docs/en/agents-and-tools/mcp-connector', lang: 'EN' },
          { type: 'doc', t: 'Anthropic: Programmatic tool calling', u: 'https://platform.claude.com/docs/en/agents-and-tools/tool-use/programmatic-tool-calling', lang: 'EN' }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'cl-5-6', title: 'El Agent SDK: el motor de Claude Code como librería (lo que mueve a Maya)', minutes: 16, level: 'avanzado',
        summary: 'Qué es el Agent SDK, cómo se usa en Python y TypeScript, sus opciones (herramientas, permisos, system prompt, MCP, hooks, subagentes, sesiones), herramientas propias en proceso, y qué le añadiría a Maya.',
        body: () => [
          B.lead('El Agent SDK (antes "Claude Code SDK", renombrado en septiembre de 2025) es el mismo motor que corre Claude Code, como librería para tus programas. Maya lo usa desde 2026 como motor de un turno. Aquí está lo que ofrece y lo que aún no aprovechas.'),
          B.h('Qué te da frente a la API directa'),
          B.list([
            'El <b>bucle de agente</b> hecho, con herramientas integradas (Read, Write, Edit, Bash, Glob, Grep, WebSearch, WebFetch) que puedes activar o no.',
            '<b>Herramientas propias</b> en proceso (sin servidor MCP aparte), con esquema y validación.',
            '<b>Sesiones</b> con historial gestionado (reanudar, bifurcar), <b>compactación</b> automática y gestión de contexto.',
            '<b>Hooks</b> (PreToolUse, PostToolUse, Stop…) declarativos: vetar dinero fuera de reglas sin depender del prompt.',
            '<b>Subagentes</b> definidos en código; <b>MCP</b> (stdio y HTTP) con una línea; <b>permisos</b> y modos como en Claude Code; carga opcional de CLAUDE.md y settings.',
            'Streaming de mensajes, coste por llamada, y el mismo comportamiento probado que usan millones de sesiones de Claude Code.'
          ]),
          B.h('Python'),
          B.code('python', 'import anyio\nfrom claude_agent_sdk import query, ClaudeAgentOptions, AssistantMessage, TextBlock, tool, create_sdk_mcp_server\n\n@tool("get_orden_detalle", "Estado, productos, importe y guía de un pedido de RRB por folio.", {"folio": int})\nasync def get_orden_detalle(args):\n    datos = await api_admin.orden(args["folio"])          # tu función real (API PHP, JWT del distribuidor)\n    return {"content": [{"type": "text", "text": datos}]}\n\nrrb = create_sdk_mcp_server(name="rrb", version="1.0.0", tools=[get_orden_detalle])\n\nopts = ClaudeAgentOptions(\n    model="claude-sonnet-5",\n    system_prompt=PERSONA_MAYA + "\\n\\n" + facts_vigentes(),\n    mcp_servers={"rrb": rrb},\n    allowed_tools=["mcp__rrb__get_orden_detalle"],       # solo tus tools; sin Bash ni archivos\n    permission_mode="dontAsk",                           # producción: nada fuera de la lista\n    max_turns=8,\n    hooks={"PreToolUse": [vetar_dinero_fuera_de_reglas]},  # gate de dinero declarativo\n)\n\nasync def turno(pregunta):\n    async for m in query(prompt=pregunta, options=opts):\n        if isinstance(m, AssistantMessage):\n            for b in m.content:\n                if isinstance(b, TextBlock):\n                    yield b.text\n\nanyio.run(lambda: consumir(turno("¿cuándo llega mi pedido 8821?")))', 'Agent SDK (Python) con una tool propia'),
          B.h('TypeScript (lo que usa Maya)'),
          B.code('typescript', 'import { query, tool, createSdkMcpServer } from "@anthropic-ai/claude-agent-sdk";\nimport { z } from "zod";\n\nconst getOrdenDetalle = tool(\n  "get_orden_detalle",\n  "Estado, productos, importe y guía de un pedido de RRB por folio.",\n  { folio: z.number().int() },\n  async ({ folio }) => ({ content: [{ type: "text", text: await apiAdmin.orden(folio) }] })\n);\nconst rrb = createSdkMcpServer({ name: "rrb", version: "1.0.0", tools: [getOrdenDetalle] });\n\nfor await (const msg of query({\n  prompt: mensajeDelDistribuidor,\n  options: {\n    model: "claude-sonnet-5",\n    systemPrompt: persona + "\\n\\n" + factsVigentes(),\n    mcpServers: { rrb },\n    allowedTools: ["mcp__rrb__get_orden_detalle"],\n    permissionMode: "dontAsk",\n    maxTurns: 8,\n    hooks: { PreToolUse: [{ hooks: [vetarDineroFueraDeReglas] }] },\n  },\n})) {\n  if (msg.type === "assistant") { /* texto o tool_use */ }\n  if (msg.type === "result") { console.log(msg.result, msg.total_cost_usd); }\n}', 'Agent SDK (TypeScript)'),
          B.h('Opciones que importan'),
          B.table(['Opción', 'Para qué'], [
            ['<code>allowed_tools</code> / <code>disallowed_tools</code>', 'Lista blanca de herramientas. En producción: solo las tuyas'],
            ['<code>permission_mode</code>', '<code>dontAsk</code> en servidores (deniega lo no listado); <code>acceptEdits</code> para agentes de código'],
            ['<code>system_prompt</code>', 'Tu persona y reglas (o extender el prompt por defecto de Claude Code)'],
            ['<code>mcp_servers</code>', 'Servidores propios en proceso o externos (stdio/HTTP)'],
            ['<code>hooks</code>', 'PreToolUse (vetar/aprobar), PostToolUse (auditar), Stop, etc.'],
            ['<code>agents</code>', 'Subagentes con nombre, descripción, herramientas y modelo'],
            ['<code>max_turns</code>, <code>max_budget</code>', 'Topes de vueltas y de gasto'],
            ['<code>resume</code> / <code>continue_conversation</code>', 'Sesiones: retomar por id'],
            ['<code>setting_sources</code>, <code>cwd</code>', 'Cargar CLAUDE.md/settings del proyecto; directorio de trabajo'],
            ['<code>ClaudeSDKClient</code>', 'Cliente con conversación persistente e interrupciones, para hilos largos (checkout)']
          ]),
          B.h('Lo que Maya ya hace y lo que le añadiría el SDK'),
          B.compare('Ya hace (y no debe cambiar)', ['Router determinístico primero (63 % sin LLM).', '<code>respuesta_plantilla</code> literal.', 'Idempotencia por business_key en todo lo que toca dinero.', 'Tools de solo lectura sobre la BD; escrituras por la API del admin.', 'Persona por proceso (Maya/Max).', 'Failover a otro proveedor si el SDK falla.'],
            'Añadiría', ['<b>Hooks PreToolUse</b> para vetar dinero fuera de reglas y <b>PostToolUse</b> para auditar, declarativos en vez de lógica en el prompt.', '<b>Sesiones nativas</b> (ClaudeSDKClient / resume) para hilos largos de checkout, en vez de los últimos 6 mensajes + snapshot.', '<b>Compactación</b> del SDK en conversaciones largas.', '<b>MCP</b>: exponer las 62 tools como servidor para panel, el asistente de dirección y claude.ai sin duplicar código.', '<b>Subagentes</b> para el juez nocturno (un juez por sesión, en paralelo, con Haiku).', '<b>Clave de API</b> en vez de OAuth de la suscripción, por términos, continuidad, cero retención y métricas (Usage API).']),
          B.warn('Autenticación: el Agent SDK está documentado para funcionar con una clave de API (o Bedrock/Vertex/Foundry). Usar la sesión OAuth de una suscripción Max para un agente de producción que atiende a terceros conviene revisarlo contra los términos vigentes de Anthropic antes de seguir creciendo. A precio de API, agosto habría costado unos 30-35 $ con Sonnet 5 y caché.'),
          B.key('El Agent SDK es Claude Code sin terminal: bucle, herramientas, sesiones, hooks, MCP y subagentes en tu código. Maya ya está encima; el salto es usar sus hooks, sesiones y MCP en vez de reimplementarlos, y pasar a clave de API.'),
          B.check('¿Qué mecanismo del SDK sustituiría con ventaja el "gate de confirmación de dinero" que hoy vive en la lógica de Maya?', ['Un system prompt más largo', 'Un hook PreToolUse que vete o exija confirmación antes de cualquier tool que mueva dinero', 'Bajar la temperatura', 'Más max_turns'], 1, 'Declarativo, se ejecuta siempre y no depende de que el modelo lo recuerde.'),
          B.cards([
            { icon: '🧩', title: 'Agent SDK', html: 'El motor de Claude Code como librería (Python, TS). Antes "Claude Code SDK".' },
            { icon: '🔧', title: 'Tools propias', html: '@tool / tool() + create_sdk_mcp_server: en proceso, con esquema.' },
            { icon: '🪝', title: 'Hooks y sesiones', html: 'PreToolUse para dinero; resume/ClaudeSDKClient para hilos largos.' },
            { icon: '🔑', title: 'Clave de API', html: 'La vía documentada para producción.' }
          ])
        ],
        quiz: [
          { q: 'El Agent SDK es…', o: ['otro nombre de la Messages API', 'el motor de Claude Code (bucle, herramientas, sesiones, hooks, MCP, subagentes) como librería para tus programas', 'un plan de suscripción', 'un servidor MCP'], a: 1, why: 'Renombrado desde "Claude Code SDK" en septiembre de 2025. Python y TypeScript.' },
          { q: 'Para definir una herramienta propia en el SDK de Python usas…', type: 'fill', a: ['@tool', 'tool', 'el decorador @tool', 'create_sdk_mcp_server', '@tool y create_sdk_mcp_server'], why: '@tool(nombre, descripción, esquema) y create_sdk_mcp_server para agruparlas; luego mcp_servers y allowed_tools.' },
          { q: 'En un agente de producción como Maya, el permission_mode adecuado es…', o: ['bypassPermissions', 'dontAsk con allowed_tools solo de tus herramientas', 'plan', 'acceptEdits'], a: 1, why: 'Nada fuera de la lista, sin preguntar (no hay humano delante).' },
          { q: 'El Agent SDK incluye herramientas integradas (Read, Bash, WebSearch…) que puedes desactivar.', type: 'tf', a: true, why: 'Para Maya se desactivan todas salvo las tuyas.' },
          { q: 'La opción del SDK para retomar una conversación anterior por identificador es…', o: ['restart', 'resume', 'reload', 'replay'], a: 1, why: 'resume (y continue_conversation); ClaudeSDKClient para hilos largos con interrupciones.' }
        ],
        cards: [
          ['¿Qué es el Agent SDK?', 'El motor de Claude Code como librería (claude-agent-sdk en Python; @anthropic-ai/claude-agent-sdk en TS): bucle de agente, herramientas integradas, tools propias en proceso, sesiones, compactación, hooks, subagentes, MCP y permisos. Antes "Claude Code SDK" (renombrado sep 2025).'],
          ['Opciones clave del Agent SDK', 'allowed_tools/disallowed_tools, permission_mode (dontAsk en producción), system_prompt, mcp_servers, hooks, agents, max_turns/max_budget, resume, setting_sources, cwd; ClaudeSDKClient para conversaciones persistentes.'],
          ['Qué añadiría el SDK a Maya', 'Hooks PreToolUse/PostToolUse para dinero y auditoría; sesiones nativas para checkouts largos; compactación; exponer las tools por MCP a otros clientes; subagentes para el juez nocturno; clave de API en vez de OAuth de suscripción.'],
          ['Lo que Maya no debe cambiar', 'Router determinístico primero (63 % sin LLM), respuesta_plantilla literal, idempotencia por business_key, lectura directa de BD y escrituras solo por la API del admin, personas separadas Maya/Max, failover.']
        ],
        resources: [
          { type: 'doc', t: 'Anthropic: Agent SDK overview', u: 'https://platform.claude.com/docs/en/agent-sdk/overview', lang: 'EN' },
          { type: 'doc', t: 'Agent SDK: Python', u: 'https://platform.claude.com/docs/en/agent-sdk/python', lang: 'EN' },
          { type: 'doc', t: 'Agent SDK: TypeScript', u: 'https://platform.claude.com/docs/en/agent-sdk/typescript', lang: 'EN' },
          { type: 'doc', t: 'Agent SDK: custom tools (in-process MCP)', u: 'https://platform.claude.com/docs/en/agent-sdk/custom-tools', lang: 'EN' },
          { type: 'doc', t: 'Agent SDK: hooks', u: 'https://platform.claude.com/docs/en/agent-sdk/hooks', lang: 'EN' },
          { type: 'article', t: 'Anthropic Engineering: Building agents with the Claude Agent SDK', u: 'https://www.anthropic.com/engineering/building-agents-with-the-claude-agent-sdk', lang: 'EN' }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'cl-5-7', title: 'Managed Agents, control de coste y las cuatro formas de construir un agente', minutes: 13, level: 'avanzado',
        summary: 'Agentes alojados por Anthropic (agentes, sesiones, entornos, bóvedas, despliegues programados, outcomes), cuándo usarlos frente al SDK, y cómo medir y limitar el gasto de la API.',
        body: () => [
          B.lead('Hay cuatro formas de construir un agente con Claude, y se diferencian en dos preguntas: quién hace el bucle y quién hospeda. Managed Agents es la única en la que Anthropic hace las dos cosas.'),
          B.h('Las cuatro formas'),
          B.table(['Forma', 'Tú escribes', 'Quién hace el bucle', 'Quién hospeda', 'Cuándo'], [
            ['<b>Bucle manual</b> (API)', 'El while completo', 'Tú', 'Tú', 'Control total; sin dependencias beta'],
            ['<b>Tool Runner</b> (SDK de la API)', 'Solo las funciones', 'El SDK (con ganchos)', 'Tú', 'Agente con tus herramientas sin escribir el bucle'],
            ['<b>Agent SDK</b>', 'Prompt + opciones + tools', 'El motor de Claude Code', 'Tú (Hetzner)', 'Maya: agente integrado en tu sistema con herramientas de código/archivos si hace falta'],
            ['<b>Managed Agents</b> (API, beta)', 'Configuración del agente + tus tools', 'Anthropic', 'Anthropic (sandbox por sesión)', 'Agentes de trabajo interno, programados, con memoria y calidad garantizada, sin operar servidores']
          ]),
          B.h('Managed Agents: los conceptos'),
          B.terms([
            ['Agente', 'Configuración persistente y versionada: modelo, system prompt, herramientas, Skills, MCP. Las sesiones fijan una versión.'],
            ['Sesión', 'Una conversación con estado en el servidor, con un contenedor propio (archivos, bash, ejecución de código). Se sigue por un flujo de eventos (SSE).'],
            ['Entorno', 'La imagen del contenedor: paquetes, herramientas, red permitida.'],
            ['Bóveda (vault)', 'Credenciales guardadas por Anthropic que se inyectan al salir hacia un servicio; el agente nunca las ve. Sustituye a tener secretos en tu sandbox.'],
            ['Despliegue programado', 'El agente se ejecuta con un horario (cron) sin que tú programes nada: "cada noche a las 3:15".'],
            ['Outcomes', 'Defines un criterio de calidad (rúbrica) y un evaluador aparte itera al agente hasta que lo cumple: "hasta que esté bien".'],
            ['Herramientas tuyas', 'El agente puede pedir herramientas que ejecutas tú (como en la API) además de las del sandbox.']
          ]),
          B.ex('Un Managed Agent para RRB: el analista nocturno', [
            B.p('Agente "analista-rrb" con Opus 5, system prompt de dirección, acceso por MCP (bóveda con el token) a tu servidor <code>rrb-admin</code> de solo lectura y ejecución de código. Despliegue programado a las 6:00. Tarea: descargar pagos sin vincular, pedidos abiertos, ventas del día anterior; calcular con código; comparar con la semana; redactar 8 líneas; entregar por tu canal. Outcome: "el informe cita cifras exactas, compara con el periodo anterior y contiene una acción concreta". Sin servidor tuyo, sin cron, sin secretos en el sandbox. Es la rutina de la mañana (lección 3.3) construida con la API en vez de con Claude Code.')
          ]),
          B.h('Cuándo SDK y cuándo Managed'),
          B.compare('Agent SDK en tu servidor', ['Necesita acceso directo a tu base de datos y a tu red interna (Maya).', 'Latencia de segundos frente a un usuario.', 'Quieres control total del runtime y del coste.', 'Ya tienes la operación (Hetzner, cron, logs).'],
            'Managed Agents', ['Trabajo interno de horas, programado, sin usuario esperando.', 'No quieres operar contenedores ni crons.', 'Quieres memoria, sesiones largas y outcomes sin construirlos.', 'Las credenciales en bóveda te simplifican la seguridad.']),
          B.h('Medir y limitar el gasto'),
          B.list([
            '<b>Claves con alcance</b>: una clave por agente/uso (Maya, analista, evals) para atribuir gasto.',
            '<b>Usage and Cost Admin API</b>: gasto real por clave, modelo y día; conéctalo a tu panel personal.',
            '<b>Límites de gasto</b> en la consola por organización y alertas por umbral.',
            '<b>Task budgets</b> (beta): tope de tokens por tarea agéntica; el modelo se administra.',
            '<b>Effort y modelo</b> por tarea; <b>Batch</b> para lo diferible; <b>caché</b> siempre.',
            '<b>Métricas propias</b>: tokens, latencia y coste por turno en tu tabla (Maya ya lo guarda en <code>maya_conversaciones</code>).'
          ]),
          B.key('Cuatro formas: manual, Tool Runner, Agent SDK, Managed Agents. Maya es Agent SDK en tu servidor y debe seguir así. El analista de dirección y las rutinas de informes son candidatos a Managed Agents: cero operación. En todos los casos: claves por uso, Usage API y límites.'),
          B.check('¿Qué forma de construir un agente conviene para un informe nocturno programado que no necesita acceso directo a tu base de datos ni un usuario esperando?', ['Bucle manual', 'Agent SDK en Hetzner', 'Managed Agents con despliegue programado y bóveda para el token del MCP', 'Claude en Chrome'], 2, 'Sin servidor, sin cron, sin secretos en el sandbox, con outcome de calidad.'),
          B.cards([
            { icon: '4️⃣', title: 'Cuatro formas', html: 'Manual · Tool Runner · Agent SDK · Managed Agents. Quién hace el bucle, quién hospeda.' },
            { icon: '☁️', title: 'Managed Agents', html: 'Agente, sesión, entorno, bóveda, despliegue programado, outcomes.' },
            { icon: '🏠', title: 'Maya = SDK en tu servidor', html: 'BD directa, latencia, control.' },
            { icon: '📊', title: 'Medir', html: 'Claves por uso, Usage API, límites, task budgets.' }
          ])
        ],
        quiz: [
          { q: 'La única forma en la que Anthropic hace el bucle y hospeda el agente es…', o: ['Tool Runner', 'Agent SDK', 'Managed Agents', 'bucle manual'], a: 2, why: 'Harness y despliegue gestionados; el resto lo hospedas tú.' },
          { q: 'Una bóveda (vault) de Managed Agents sirve para…', o: ['guardar conversaciones', 'guardar credenciales que se inyectan al salir hacia un servicio sin que el agente las vea', 'almacenar modelos', 'cifrar el system prompt'], a: 1, why: 'Los secretos nunca están en el sandbox.' },
          { q: 'Un "outcome" en Managed Agents es…', type: 'fill', a: ['un criterio de calidad', 'una rúbrica', 'criterio de calidad', 'rubrica', 'rúbrica', 'un objetivo de calidad'], why: 'Una rúbrica que un evaluador aparte usa para iterar al agente hasta cumplirla.' },
          { q: 'Maya debería migrar a Managed Agents porque es más moderno.', type: 'tf', a: false, why: 'Maya necesita acceso directo a la BD, latencia de segundos y control; el Agent SDK en tu servidor es la forma correcta. Managed encaja con el analista nocturno y los informes.' },
          { q: 'Para atribuir el gasto de la API por agente conviene…', o: ['una sola clave para todo', 'una clave por uso y la Usage and Cost Admin API', 'no medir', 'usar solo Haiku'], a: 1, why: 'Atribución, límites por clave y alertas.' }
        ],
        cards: [
          ['Las cuatro formas de construir un agente con Claude', 'Bucle manual (tú todo), Tool Runner (el SDK hace el bucle, tú hospedas), Agent SDK (motor de Claude Code, tú hospedas: Maya), Managed Agents (Anthropic hace el bucle y hospeda el sandbox: informes programados).'],
          ['Conceptos de Managed Agents', 'Agente (config versionada), sesión (estado + contenedor propio, eventos SSE), entorno (imagen), bóveda (credenciales inyectadas al egreso), despliegue programado (cron gestionado), outcomes (rúbrica evaluada hasta cumplirse), herramientas tuyas.'],
          ['Cómo medir y limitar el gasto de la API', 'Una clave por uso; Usage and Cost Admin API por clave/modelo/día; límites y alertas en la consola; task budgets por tarea; effort y modelo por tarea; Batch para lo diferible; caché siempre; métricas propias por turno.']
        ],
        resources: [
          { type: 'doc', t: 'Anthropic: Managed Agents overview', u: 'https://platform.claude.com/docs/en/managed-agents/overview', lang: 'EN' },
          { type: 'article', t: 'SiliconANGLE: Anthropic lanza Claude Managed Agents (abril 2026)', u: 'https://siliconangle.com/2026/04/08/anthropic-launches-claude-managed-agents-speed-ai-agent-development/', lang: 'EN' },
          { type: 'doc', t: 'Anthropic: Usage and Cost Admin API', u: 'https://platform.claude.com/docs/en/build-with-claude/usage-cost-api', lang: 'EN' },
          { type: 'doc', t: 'Anthropic: Task budgets', u: 'https://platform.claude.com/docs/en/build-with-claude/task-budgets', lang: 'EN' }
        ]
      }
    ]
  };
})();
