/* Curso de IA · Módulo 1: Fundamentos. */
(function () {
  'use strict';
  const B = EX.B;
  EX.MOD = EX.MOD || {};

  const ARROW = '<defs><marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="fg-arrowhead"/></marker></defs>';

  EX.MOD['ia-1'] = {
    id: 'ia-1', icon: '🧠', title: 'Fundamentos: qué es la inteligencia artificial',
    desc: 'Las ideas base que sostienen todo lo demás: qué es aprender para una máquina, qué es una red neuronal y cómo se entrena. Sin fórmulas innecesarias, con ejemplos de tu negocio.',
    goals: [
      'Distinguir IA, aprendizaje automático, aprendizaje profundo e IA generativa, y saber en cuál cae cada herramienta que usas.',
      'Explicar con tus palabras qué es una neurona artificial, qué son los parámetros de un modelo y por qué "entrenar" es ajustar números.',
      'Entender la idea de gradiente: cómo un modelo mejora un poquito en cada paso.',
      'Saber qué es un embedding y por qué es la pieza que permite a Claude "entender" el significado.'
    ],
    lessons: [
      /* ------------------------------------------------------------------ */
      {
        id: 'ia-1-1', title: 'Qué es (y qué no es) la inteligencia artificial', minutes: 14, level: 'básico',
        summary: 'Un mapa de términos para no volver a confundir IA, machine learning, deep learning y IA generativa.',
        body: () => [
          B.lead('"Inteligencia artificial" es una palabra paraguas. Debajo hay técnicas muy distintas, y casi todo lo que hoy llamamos IA es una sola familia: el <b>aprendizaje profundo</b>. Empecemos por ordenar el mapa.'),
          B.h('Cuatro círculos, uno dentro de otro'),
          B.fig('<svg viewBox="0 0 640 300">' + ARROW +
            '<ellipse cx="320" cy="150" rx="300" ry="135" class="fg-box"/><text x="60" y="60">Inteligencia artificial</text>' +
            '<ellipse cx="350" cy="160" rx="230" ry="105" class="fg-brand"/><text x="170" y="95">Aprendizaje automático (ML)</text>' +
            '<ellipse cx="380" cy="170" rx="160" ry="75" class="fg-ok"/><text x="275" y="130">Aprendizaje profundo (DL)</text>' +
            '<ellipse cx="410" cy="180" rx="95" ry="45" class="fg-claude"/><text x="345" y="176">IA generativa</text><text x="365" y="196" class="sm">LLM: Claude, GPT…</text>' +
            '<text x="40" y="270" class="sm">Sistemas expertos, reglas, búsqueda: IA sin aprendizaje</text><text x="150" y="245" class="sm">Árboles de decisión, regresión</text></svg>',
            'Cada círculo es un subconjunto del anterior. Los LLM (Claude, GPT, Gemini) están en el centro.'),
          B.terms([
            ['Inteligencia artificial (IA)', 'Cualquier programa que haga tareas que asociamos con inteligencia: reconocer, decidir, planificar, conversar. Incluye sistemas de <i>reglas escritas a mano</i>, como el que calcula tus regalías: 10 % en el nivel 1, 17 % en los niveles 2 a 4. Eso es lógica, no aprendizaje.'],
            ['Aprendizaje automático (machine learning)', 'Programas que <b>aprenden de ejemplos</b> en vez de seguir reglas escritas por una persona. Tú das datos y la respuesta correcta; el sistema encuentra el patrón. El <i>matcher</i> de pagos de Maya podría aprender qué depósitos corresponden a qué pedido viendo miles de casos resueltos.'],
            ['Aprendizaje profundo (deep learning)', 'Aprendizaje automático con <b>redes neuronales de muchas capas</b>. Es la técnica que despegó en 2012 y la que está detrás de la visión por computadora, la voz, la traducción y los LLM.'],
            ['IA generativa', 'Modelos profundos que <b>producen contenido nuevo</b>: texto, imágenes, audio, vídeo, código. Claude, ChatGPT, Gemini, los vídeos de Google Flow o las voces de ElevenLabs.']
          ]),
          B.key('Cuando alguien dice "la IA hizo X", pregúntate: ¿es un sistema de reglas, un modelo que clasifica, o un modelo que genera? La respuesta cambia lo que puedes esperar de él, cuánto cuesta y en qué se equivoca.'),
          B.h('Tres formas de aprender'),
          B.p('Casi todo el aprendizaje automático cae en tres modos. Los tres aparecen en el entrenamiento de un LLM, así que conviene tenerlos claros desde ahora.'),
          B.table(['Modo', 'Qué le das al modelo', 'Qué aprende', 'Ejemplo en RRB'], [
            ['<b>Supervisado</b>', 'Ejemplos con su respuesta correcta (etiqueta)', 'A predecir la etiqueta de casos nuevos', 'Miles de depósitos ya conciliados → predecir a qué pedido pertenece un depósito nuevo'],
            ['<b>No supervisado</b>', 'Datos sin etiquetas', 'Estructura oculta: grupos, patrones, anomalías', 'Agrupar a tus 630 distribuidores activos por comportamiento de compra sin decirle qué grupos buscar'],
            ['<b>Por refuerzo</b>', 'Un entorno y una <i>recompensa</i> (puntos por hacerlo bien)', 'Una política: qué acción tomar en cada situación para maximizar la recompensa', 'Maya recibe +1 cuando cierra un pedido sin errores y −1 cuando el cliente pide hablar con un humano']
          ]),
          B.note('Los LLM se entrenan primero de forma <b>autosupervisada</b> (predecir la siguiente palabra de textos reales: la "etiqueta" sale del propio texto) y después con <b>refuerzo</b> a partir de preferencias humanas y de recompensas verificables. Lo verás en detalle en el módulo 3.'),
          B.h('IA estrecha, IA general y lo que hay en medio'),
          B.p('Durante décadas la distinción era simple: <b>IA estrecha</b> (hace una sola cosa: jugar ajedrez, detectar spam) frente a <b>IA general</b> (AGI: hace cualquier tarea intelectual que haga una persona). Los LLM rompieron esa frontera. Un solo modelo redacta un contrato, depura PHP, analiza una tabla de churn y escribe un guion de vídeo. No es AGI, pero ya no es estrecha.'),
          B.p('Por eso los líderes de los laboratorios evitan la palabra AGI y hablan de otra cosa: Dario Amodei (Anthropic) usa "<b>IA poderosa</b>": un sistema más capaz que un premio Nobel en la mayoría de campos, que trabaja de forma autónoma durante días y que se puede ejecutar en millones de copias. Sam Altman (OpenAI) habla de "superinteligencia" y de una "singularidad suave". Demis Hassabis (Google DeepMind) mantiene la palabra AGI pero la define como igualar <i>todas</i> las capacidades cognitivas humanas. Volverás a esto en el módulo 5.'),
          B.analogy('Piensa en tu red de distribuidores. Un sistema de reglas es el plan de compensación: está escrito y siempre da el mismo resultado. Un modelo de aprendizaje automático es un líder con experiencia: nadie le escribió las reglas para detectar quién va a desertar, pero después de ver a miles de personas <i>lo nota</i>. Un LLM es ese líder si además pudiera leer, escribir y programar en cualquier tema. Y, como el líder, a veces se equivoca con total seguridad.'),
          B.h('Qué NO es la IA actual'),
          B.list([
            '<b>No es una base de datos.</b> Un LLM no "guarda" tus documentos: ha comprimido patrones estadísticos de billones de palabras en números. Recuerda ideas, no archivos. Por eso necesita que le pases el Documento maestro en el contexto.',
            '<b>No es un motor de reglas.</b> No puedes esperar que aplique el 17 % exacto siempre por sí solo; para lo exacto, que llame a una herramienta (una función, una consulta SQL).',
            '<b>No es consciente ni tiene intenciones</b> en el sentido humano, aunque la propia Anthropic reconoce en la constitución de Claude que la cuestión de su estatus moral está abierta. Hablaremos de ello en el módulo 6.',
            '<b>No es determinista</b> por defecto: la misma pregunta puede dar respuestas distintas. Eso es una característica (creatividad) y un riesgo (inconsistencia) que se gestiona.'
          ]),
          B.check('Tu sistema calcula regalías con porcentajes fijos por nivel. ¿Qué es eso?', ['Aprendizaje automático supervisado', 'IA basada en reglas (sin aprendizaje)', 'IA generativa', 'Aprendizaje por refuerzo'], 1, 'Nadie le dio ejemplos para que aprendiera: las reglas están escritas. Es lógica programada. Sería aprendizaje automático si el sistema hubiera <i>deducido</i> los porcentajes a partir de datos.'),
          B.h('Por qué esto importa para ti'),
          B.p('Cuando evalúes una herramienta o una propuesta de un proveedor, este mapa te da las tres preguntas correctas: <b>¿qué aprende y de qué datos?</b>, <b>¿qué genera y cómo se verifica?</b> y <b>¿qué parte sigue siendo reglas?</b> Un vendedor que no sepa responderlas está vendiendo humo.'),
          B.cards([
            { icon: '🗺️', title: 'IA ⊃ ML ⊃ DL ⊃ generativa', html: 'Cuatro círculos concéntricos. Los LLM están en el centro.' },
            { icon: '📚', title: 'Aprender = ver ejemplos', html: 'Supervisado (con respuesta), no supervisado (sin ella), refuerzo (con recompensa).' },
            { icon: '🎯', title: 'Reglas para lo exacto', html: 'El modelo entiende y decide; el cálculo exacto lo hace una herramienta.' }
          ])
        ],
        quiz: [
          { q: '¿Cuál de estas afirmaciones describe mejor el aprendizaje automático?', o: ['Un programa que sigue reglas escritas por un experto', 'Un programa que aprende patrones a partir de ejemplos', 'Cualquier programa que responda preguntas', 'Un robot con sensores'], a: 1, why: 'La diferencia clave con la programación clásica es que el comportamiento se aprende de datos, no se escribe a mano.' },
          { q: 'Los LLM como Claude pertenecen a…', type: 'multi', o: ['Inteligencia artificial', 'Aprendizaje automático', 'Aprendizaje profundo', 'IA generativa', 'Sistemas de reglas'], a: [0, 1, 2, 3], why: 'Un LLM es un modelo generativo de aprendizaje profundo, que es aprendizaje automático, que es IA. No es un sistema de reglas.' },
          { q: 'Entrenar un modelo para conciliar depósitos con pedidos a partir de miles de casos ya resueltos es aprendizaje…', o: ['no supervisado', 'por refuerzo', 'supervisado', 'autosupervisado'], a: 2, why: 'Cada ejemplo trae su respuesta correcta (a qué pedido corresponde). Eso es supervisión.' },
          { q: 'Un LLM guarda tus documentos tal cual y los consulta cuando responde.', type: 'tf', a: false, why: 'No. Comprime patrones en sus parámetros. Para que use tu documento, hay que dárselo en el contexto de la conversación o con una herramienta de búsqueda.' },
          { q: 'La primera fase de entrenamiento de un LLM (predecir la siguiente palabra en textos reales) se considera…', o: ['supervisada clásica, con etiquetas humanas', 'autosupervisada: la etiqueta sale del propio texto', 'por refuerzo', 'no supervisada pura, sin objetivo'], a: 1, why: 'El texto mismo proporciona la respuesta correcta (la palabra siguiente), sin que nadie etiquete nada a mano.' },
          { q: '¿Qué término usa Dario Amodei en lugar de AGI?', type: 'fill', a: ['IA poderosa', 'ia poderosa', 'powerful AI', 'inteligencia artificial poderosa'], why: '"IA poderosa" (powerful AI): un sistema más capaz que un Nobel en la mayoría de campos, autónomo durante días y ejecutable en millones de copias.' }
        ],
        cards: [
          ['¿Qué relación hay entre IA, ML, DL e IA generativa?', 'Círculos concéntricos: la IA generativa (LLM) es un tipo de aprendizaje profundo, que es un tipo de aprendizaje automático, que es un tipo de IA.'],
          ['Los tres modos de aprendizaje automático', 'Supervisado (ejemplos con respuesta), no supervisado (datos sin etiqueta: grupos, anomalías) y por refuerzo (recompensas por actuar bien).'],
          ['¿Un LLM es una base de datos?', 'No. Comprime patrones estadísticos en sus parámetros; no almacena documentos. Para datos exactos hay que pasárselos en el contexto o darle herramientas.'],
          ['¿Qué es un sistema de reglas y por qué no es aprendizaje?', 'Lógica escrita por personas (como el cálculo de regalías por nivel). Siempre da el mismo resultado y no mejora con datos.']
        ],
        resources: [
          { type: 'video', t: 'DotCSV: canal en español sobre IA (empieza por la lista "Aprendiendo IA")', u: 'https://www.youtube.com/@DotCSV', lang: 'ES', note: 'Carlos Santana explica redes neuronales, transformers y noticias con rigor y humor. El mejor punto de entrada en español.' },
          { type: 'video', t: 'Andrej Karpathy: Deep Dive into LLMs like ChatGPT', u: 'https://www.youtube.com/watch?v=7xTGNNLPyMI', lang: 'EN', min: 210, note: 'Tres horas y media que valen un máster. Del preentrenamiento al RLHF, para no técnicos. Activa subtítulos en español.' },
          { type: 'course', t: 'Google: Machine Learning Crash Course', u: 'https://developers.google.com/machine-learning/crash-course', lang: 'EN', note: 'Gratis, visual, con ejercicios. Buen complemento para los conceptos de este módulo.' },
          { type: 'article', t: 'Dario Amodei: Machines of Loving Grace (ensayo)', u: 'https://darioamodei.com/machines-of-loving-grace', lang: 'EN', note: 'Aquí define "IA poderosa" y describe qué podría hacer en biología, economía y gobierno.' }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'ia-1-2', title: 'La neurona artificial y las redes', minutes: 16, level: 'básico',
        summary: 'Qué hace exactamente una neurona artificial, qué son los "parámetros" y por qué apilar capas da lugar a algo tan capaz.',
        body: () => [
          B.lead('Cuando lees que un modelo tiene "1,6 billones de parámetros", esos parámetros son números concretos con un papel muy simple. Vamos a ver uno.'),
          B.h('Una neurona en tres pasos'),
          B.p('Una neurona artificial recibe varios números de entrada, los <b>multiplica</b> cada uno por un peso, <b>suma</b> todo (más un número extra llamado sesgo) y pasa el resultado por una <b>función de activación</b> que decide cuánto "se enciende".'),
          B.fig('<svg viewBox="0 0 640 260">' + ARROW +
            '<circle cx="70" cy="60" r="22" class="fg-box"/><text x="62" y="65">x₁</text>' +
            '<circle cx="70" cy="130" r="22" class="fg-box"/><text x="62" y="135">x₂</text>' +
            '<circle cx="70" cy="200" r="22" class="fg-box"/><text x="62" y="205">x₃</text>' +
            '<line x1="92" y1="60" x2="300" y2="120" class="fg-arrow"/><text x="170" y="75" class="sm">× w₁</text>' +
            '<line x1="92" y1="130" x2="300" y2="130" class="fg-arrow"/><text x="170" y="122" class="sm">× w₂</text>' +
            '<line x1="92" y1="200" x2="300" y2="140" class="fg-arrow"/><text x="170" y="185" class="sm">× w₃</text>' +
            '<rect x="305" y="95" width="120" height="70" rx="12" class="fg-brand"/><text x="322" y="123">Σ + sesgo</text><text x="330" y="148" class="sm">suma ponderada</text>' +
            '<line x1="425" y1="130" x2="470" y2="130" class="fg-arrow"/>' +
            '<rect x="475" y="95" width="100" height="70" rx="12" class="fg-ok"/><text x="490" y="123">activación</text><text x="497" y="148" class="sm">p. ej. ReLU</text>' +
            '<line x1="575" y1="130" x2="620" y2="130" class="fg-arrow"/><text x="600" y="120" class="sm">salida</text></svg>',
            'Entradas × pesos → suma → activación → salida. Los pesos (w) y el sesgo son los parámetros que se aprenden.'),
          B.ex('Una neurona que decide si un depósito "huele" a pago de pedido', [
            B.p('Entradas: x₁ = el importe coincide con algún pedido abierto (1 sí, 0 no); x₂ = llegó en las 48 h siguientes al pedido (1/0); x₃ = el nombre del ordenante se parece al del distribuidor (0 a 1).'),
            B.p('Pesos aprendidos: w₁ = 2,0 · w₂ = 0,8 · w₃ = 1,5 · sesgo = −2,5.'),
            B.p('Caso: importe coincide (1), llegó a tiempo (1), nombre parecido al 60 % (0,6).<br>Suma = 1·2,0 + 1·0,8 + 0,6·1,5 − 2,5 = 2,0 + 0,8 + 0,9 − 2,5 = <b>1,2</b>.<br>Activación ReLU (deja pasar lo positivo, corta lo negativo): salida = 1,2 → se enciende: "probable pago".'),
            B.p('Si el importe no coincidiera (x₁ = 0): suma = 0 + 0,8 + 0,9 − 2,5 = −0,8 → ReLU → 0. La neurona no se enciende. Fíjate en que el peso mayor (w₁) hace que el importe pese más que las otras señales. <b>Eso es lo que se aprende: cuánto importa cada cosa.</b>')
          ]),
          B.key('<b>Parámetro</b> = cualquier número del modelo que se ajusta durante el entrenamiento (pesos y sesgos). Entrenar es encontrar los valores de esos números que hacen que las salidas sean correctas. Un modelo con 70.000 millones de parámetros tiene 70.000 millones de perillas.'),
          B.h('Por qué la función de activación es imprescindible'),
          B.p('Si solo multiplicaras y sumaras, por muchas capas que apiles el resultado seguiría siendo una simple combinación lineal: una recta. El mundo no es una recta. La activación introduce una <b>no linealidad</b> (un codo, un umbral) y eso, repetido en millones de neuronas, permite aproximar cualquier función razonable. Es un teorema: el <i>teorema de aproximación universal</i>.'),
          B.deep('Las activaciones que verás nombradas', [
            B.list([
              '<b>Sigmoide</b> (años 80-2000): aplasta cualquier número entre 0 y 1. Se usaba como "probabilidad". Problema: en redes profundas el gradiente se desvanece.',
              '<b>ReLU</b> (2010 en adelante): max(0, x). Trivial de calcular, hizo posibles las redes profundas. Es la activación de AlexNet (2012).',
              '<b>GELU / SwiGLU</b>: versiones suavizadas de ReLU que usan los transformers modernos (GPT, Llama, Claude usa variantes propias no publicadas).',
              '<b>Softmax</b>: no es una activación de neurona sino de la capa final: convierte una lista de puntuaciones en probabilidades que suman 1. Es la que produce "la probabilidad de la siguiente palabra".'
            ])
          ]),
          B.h('De la neurona a la red'),
          B.p('Una <b>capa</b> es un grupo de neuronas que reciben las mismas entradas. Una <b>red</b> es una secuencia de capas: la salida de una es la entrada de la siguiente. Las primeras capas detectan cosas simples; las siguientes combinan lo simple en cosas complejas.'),
          B.steps('Cómo una red de visión reconoce un producto en una foto de inventario', [
            'La <b>capa 1</b> recibe los píxeles. Sus neuronas se han especializado en detectar bordes: cambios bruscos de claro a oscuro en distintas direcciones.',
            'La <b>capa 2</b> combina bordes en formas: esquinas, curvas, líneas paralelas. Aún no sabe qué es nada.',
            'La <b>capa 3</b> junta formas en partes: una tapa redonda, una etiqueta rectangular, un código QR.',
            'La <b>capa 4</b> combina partes en objetos: "frasco con etiqueta azul y tapa blanca". Y la capa final asigna probabilidades: Acqua 1000 92 %, Plata 1000 6 %, otro 2 %.',
            'Nadie programó "busca la tapa blanca". Esas especializaciones <b>emergieron</b> durante el entrenamiento porque ayudaban a reducir el error. Eso es el aprendizaje profundo.'
          ]),
          B.analogy('Una red de distribuidores también tiene capas: los líderes de nivel 1 conocen a su gente, los de nivel 4 ven patrones de zonas enteras, y tú ves el país. Cada nivel resume lo de abajo y aporta una visión más abstracta. La diferencia es que en la red neuronal los "pesos" de cada relación se ajustan solos.'),
          B.h('Cuántos parámetros hay ahí'),
          B.p('Cada conexión entre una neurona y otra es un peso. Si una capa tiene 4.096 neuronas y la siguiente otras 4.096, hay 4.096 × 4.096 ≈ <b>16,8 millones</b> de pesos solo en esa unión. Un LLM tiene decenas de capas y varias uniones de ese tamaño por capa: por eso se llega a miles de millones. Guárdate esta idea para la lección sobre memoria: cada parámetro ocupa espacio.'),
          B.check('¿Qué es un parámetro de un modelo?', ['Una instrucción del programador', 'Un número (peso o sesgo) que se ajusta durante el entrenamiento', 'Un dato de entrada', 'La cantidad de capas'], 1, 'Los parámetros son las perillas que el entrenamiento gira. Las capas o el tamaño son <i>hiperparámetros</i>: decisiones de diseño previas.'),
          B.cards([
            { icon: '⚙️', title: 'Neurona = multiplicar, sumar, activar', html: 'Entradas por pesos, más sesgo, pasado por una no linealidad.' },
            { icon: '🎛️', title: 'Parámetros = perillas', html: 'Pesos y sesgos. Entrenar es girarlas hasta que las respuestas sean buenas.' },
            { icon: '🏗️', title: 'Capas = niveles de abstracción', html: 'Bordes → formas → partes → objetos. Emergen solos.' }
          ])
        ],
        quiz: [
          { q: 'Una neurona artificial con entradas (1, 0, 1), pesos (0,5; 2; −1) y sesgo 0,2. ¿Cuál es la suma ponderada antes de la activación?', o: ['1,7', '−0,3', '0,7', '2,7'], a: 1, why: '1·0,5 + 0·2 + 1·(−1) + 0,2 = 0,5 − 1 + 0,2 = −0,3. Con ReLU, la salida sería 0.' },
          { q: '¿Para qué sirve la función de activación?', o: ['Para hacer el cálculo más rápido', 'Para introducir no linealidad y permitir aproximar funciones complejas', 'Para normalizar los datos de entrada', 'Para reducir el número de parámetros'], a: 1, why: 'Sin activación, apilar capas equivale a una sola transformación lineal. La activación es lo que da poder expresivo a la red.' },
          { q: 'Si una capa de 1.000 neuronas se conecta con otra de 1.000, ¿cuántos pesos hay en esa conexión?', o: ['2.000', '1.000', '1.000.000', '10.000'], a: 2, why: 'Cada neurona de la primera capa se conecta con cada una de la segunda: 1.000 × 1.000 = un millón de pesos.' },
          { q: 'En una red de visión, las primeras capas detectan objetos completos y las últimas detectan bordes.', type: 'tf', a: false, why: 'Es al revés: las primeras capas detectan lo simple (bordes) y las últimas combinan lo simple en objetos.' },
          { q: 'El número de capas de una red es…', o: ['un parámetro que se aprende', 'un hiperparámetro que decide el diseñador', 'siempre 12', 'el tamaño del contexto'], a: 1, why: 'La arquitectura (capas, neuronas por capa) se decide antes de entrenar. Los parámetros son los pesos que se aprenden dentro de esa arquitectura.' },
          { q: 'La función que convierte puntuaciones en probabilidades que suman 1 en la capa final se llama…', type: 'fill', a: ['softmax'], why: 'Softmax. Es la que produce la distribución de probabilidad sobre la siguiente palabra en un LLM.' }
        ],
        cards: [
          ['¿Qué hace una neurona artificial?', 'Multiplica cada entrada por un peso, suma todo más un sesgo y pasa el resultado por una función de activación no lineal.'],
          ['¿Qué es un parámetro?', 'Un peso o un sesgo: un número del modelo que se ajusta durante el entrenamiento. Un modelo de 70B tiene 70.000 millones.'],
          ['¿Por qué hace falta la función de activación?', 'Introduce no linealidad. Sin ella, muchas capas equivalen a una sola transformación lineal y la red no podría aprender relaciones complejas.'],
          ['¿Qué es el teorema de aproximación universal?', 'Una red con suficientes neuronas y activaciones no lineales puede aproximar cualquier función continua razonable.'],
          ['ReLU', 'max(0, x): la activación que hizo prácticas las redes profundas a partir de 2012. Los transformers modernos usan variantes suavizadas (GELU, SwiGLU).']
        ],
        resources: [
          { type: 'video', t: '3Blue1Brown: But what is a neural network?', u: 'https://www.youtube.com/watch?v=aircAruvnKk', lang: 'EN', min: 19, note: 'La mejor explicación visual que existe de neuronas, pesos y capas. Subtítulos en español disponibles.' },
          { type: 'video', t: 'DotCSV: ¿Qué es una Red Neuronal? Parte 1: La Neurona', u: 'https://www.youtube.com/watch?v=MRIv2IwFTPg', lang: 'ES', min: 17, note: 'Serie de cuatro vídeos en español que cubre justo esta lección y la siguiente.' },
          { type: 'tool', t: 'TensorFlow Playground: entrena una red en el navegador', u: 'https://playground.tensorflow.org/', lang: 'EN', note: 'Juega con capas y neuronas y mira cómo cambia lo que la red aprende. Diez minutos que fijan la intuición.' },
          { type: 'book', t: 'Michael Nielsen: Neural Networks and Deep Learning (libro online gratuito)', u: 'http://neuralnetworksanddeeplearning.com/', lang: 'EN', note: 'Para quien quiera la matemática con calma. El capítulo 1 es suficiente para este módulo.' }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'ia-1-3', title: 'Cómo aprende una red: error, gradiente y retropropagación', minutes: 18, level: 'básico',
        summary: 'El mecanismo que hace posible todo: medir cuánto se equivoca el modelo y mover cada parámetro un poquito en la dirección que reduce el error.',
        body: () => [
          B.lead('Ya sabes que entrenar es "girar perillas". La pregunta es: ¿hacia dónde y cuánto? La respuesta cabe en tres palabras que vas a oír siempre: <b>pérdida, gradiente y retropropagación</b>.'),
          B.h('1. Medir el error: la función de pérdida'),
          B.p('Antes de mejorar hay que medir. La <b>función de pérdida</b> (<i>loss</i>) es un número que dice cuánto se aleja la predicción del modelo de la respuesta correcta. Pérdida alta = mal; pérdida cero = perfecto. Para un LLM la pérdida es, en esencia, "cuánta probabilidad le diste a la palabra que realmente venía después". Si el texto real decía "regalías" y el modelo le daba 2 %, la pérdida es alta.'),
          B.h('2. Saber hacia dónde mover cada perilla: el gradiente'),
          B.p('El <b>gradiente</b> responde, para cada parámetro, a la pregunta: "si subo este número un poquito, ¿la pérdida sube o baja, y cuánto?". Es una derivada, pero la intuición es lo que importa: es una flecha que apunta a la <i>subida más rápida</i> del error. Como queremos bajar, nos movemos en dirección contraria. De ahí el nombre: <b>descenso por gradiente</b>.'),
          B.analogy('Estás en una montaña con niebla total y quieres llegar al valle. No ves nada, pero notas con los pies hacia dónde baja el suelo. Das un paso en esa dirección, vuelves a sentir, otro paso. Eso es descender por gradiente. El tamaño del paso es la <b>tasa de aprendizaje</b> (<i>learning rate</i>): pasos muy grandes y te saltas el valle; muy pequeños y tardas una eternidad.'),
          B.fig('<svg viewBox="0 0 640 240">' + ARROW +
            '<path d="M20,60 C120,40 180,200 320,190 C420,185 470,60 620,80" class="fg-line" stroke-width="3"/>' +
            '<text x="30" y="40" class="sm">pérdida alta</text><text x="330" y="225" class="sm">mínimo (pérdida baja)</text>' +
            '<circle cx="110" cy="75" r="9" class="fg-claude"/><text x="80" y="110" class="sm">inicio</text>' +
            '<line x1="122" y1="85" x2="170" y2="130" class="fg-arrow"/><line x1="182" y1="145" x2="230" y2="178" class="fg-arrow"/><line x1="245" y1="185" x2="295" y2="190" class="fg-arrow"/>' +
            '<circle cx="315" cy="190" r="9" class="fg-ok"/></svg>',
            'Cada flecha es un paso de descenso por gradiente. El modelo baja por la curva de pérdida hasta el mínimo.'),
          B.h('3. Repartir la culpa: retropropagación'),
          B.p('Una red tiene millones de parámetros repartidos en capas. Cuando la salida final está mal, ¿qué culpa tiene cada peso de la capa 3? La <b>retropropagación</b> (<i>backpropagation</i>, 1986) es el algoritmo que calcula el gradiente de <i>todos</i> los parámetros a la vez, empezando por la salida y yendo hacia atrás capa por capa mediante la regla de la cadena. Es lo que hace que entrenar redes profundas sea computacionalmente posible.'),
          B.steps('Un paso de entrenamiento, de principio a fin', [
            '<b>Adelante (forward).</b> Entra un ejemplo (un texto). La red calcula capa por capa y produce una predicción: probabilidades para la siguiente palabra.',
            '<b>Pérdida.</b> Se compara la predicción con la palabra real. Sale un número: la pérdida. Digamos 3,2.',
            '<b>Atrás (backward).</b> La retropropagación recorre la red al revés y calcula, para cada uno de los millones de parámetros, cuánto contribuyó al error y en qué dirección.',
            '<b>Actualización.</b> Cada parámetro se mueve un poquito en la dirección que reduce la pérdida: nuevo peso = peso − tasa de aprendizaje × gradiente. Los optimizadores modernos (Adam, AdamW) ajustan el tamaño del paso por parámetro.',
            '<b>Repetir</b> con el siguiente lote (<i>batch</i>) de ejemplos. Un LLM grande repite esto millones de veces sobre billones de palabras. Cuando se ha pasado por todos los datos una vez, se dice que se completó una <i>época</i>.'
          ]),
          B.key('Toda la magia del aprendizaje profundo es este bucle: predecir, medir el error, calcular gradientes, ajustar. Repetido a escala industrial. No hay nada más "mágico" dentro, y eso es lo asombroso.'),
          B.h('Los dos enemigos: no aprender y aprender de memoria'),
          B.compare('Subajuste (underfitting)', ['El modelo es demasiado simple o se entrenó poco.', 'Falla tanto en los datos de entrenamiento como en los nuevos.', 'Solución: más capacidad, más entrenamiento, mejores datos.'],
            'Sobreajuste (overfitting)', ['El modelo memoriza los ejemplos en vez de captar el patrón.', 'Brillante con los datos de entrenamiento, malo con datos nuevos.', 'Solución: más datos, regularización, parar a tiempo, evaluar siempre con datos que no vio.']),
          B.p('Por eso todo entrenamiento serio separa los datos en <b>entrenamiento</b>, <b>validación</b> (para decidir cuándo parar y comparar diseños) y <b>prueba</b> (para medir el resultado final con datos jamás vistos). Si un proveedor te presume una precisión del 99 %, pregunta: ¿medida en qué datos?'),
          B.analogy('Un distribuidor que memoriza el guion de venta palabra por palabra queda perfecto en el ensayo y se bloquea ante la primera pregunta imprevista: sobreajuste. El que entiende el producto improvisa bien: generalización. Lo que quieres de un modelo es generalización.'),
          B.deep('Por qué los LLM "generalizan" tanto sin sobreajustar', [
            B.p('Con billones de palabras de entrenamiento y una sola pasada (o menos) por los datos, el modelo no tiene oportunidad de memorizar casi nada palabra por palabra; se ve obligado a comprimir regularidades. Aun así, memoriza fragmentos muy repetidos (citas famosas, código común, licencias) y eso plantea problemas de derechos de autor y de privacidad que verás en el módulo 6. Y existe un fenómeno curioso, el <i>grokking</i>: modelos que, tras memorizar, de repente "entienden" la regla general si se sigue entrenando.')
          ]),
          B.check('Si la tasa de aprendizaje es demasiado alta, ¿qué pasa?', ['El modelo aprende más rápido y mejor', 'Los pasos son tan grandes que el modelo se pasa el mínimo y puede volverse inestable', 'El modelo se sobreajusta', 'No pasa nada, es un parámetro cosmético'], 1, 'Pasos grandes saltan de un lado al otro del valle e incluso divergen. Por eso se usan tasas que bajan a lo largo del entrenamiento (<i>schedules</i>).'),
          B.cards([
            { icon: '📏', title: 'Pérdida', html: 'El número que mide cuánto se equivoca el modelo. Entrenar es minimizarlo.' },
            { icon: '🧭', title: 'Gradiente', html: 'Para cada parámetro, hacia dónde y cuánto mover para reducir la pérdida.' },
            { icon: '🔁', title: 'Retropropagación', html: 'El algoritmo que calcula todos los gradientes a la vez, de la salida hacia atrás.' },
            { icon: '🧠', title: 'Generalizar > memorizar', html: 'Evalúa siempre con datos que el modelo no vio.' }
          ])
        ],
        quiz: [
          { q: '¿Qué mide la función de pérdida?', o: ['El tiempo de entrenamiento', 'Cuánto se aleja la predicción del modelo de la respuesta correcta', 'El número de parámetros', 'La velocidad de la GPU'], a: 1, why: 'Es la medida del error. Todo el entrenamiento consiste en reducir ese número.' },
          { q: 'El descenso por gradiente mueve los parámetros…', o: ['en la dirección del gradiente (subida del error)', 'en dirección contraria al gradiente (bajada del error)', 'al azar', 'solo en la última capa'], a: 1, why: 'El gradiente apunta hacia donde el error crece más rápido; se avanza en sentido opuesto.' },
          { q: '¿Qué hace la retropropagación?', o: ['Genera texto hacia atrás', 'Calcula el gradiente de todos los parámetros propagando el error desde la salida hacia las capas anteriores', 'Borra los ejemplos ya vistos', 'Aumenta el tamaño del modelo'], a: 1, why: 'Es la aplicación eficiente de la regla de la cadena que hace posible entrenar redes profundas.' },
          { q: 'Un modelo que acierta el 99 % en los datos de entrenamiento y el 60 % en datos nuevos sufre…', type: 'fill', a: ['sobreajuste', 'overfitting', 'sobre-ajuste', 'sobreentrenamiento'], why: 'Sobreajuste (overfitting): memorizó en vez de generalizar. Por eso se evalúa siempre con datos no vistos.' },
          { q: 'Una época de entrenamiento es…', o: ['un paso de actualización', 'una pasada completa por todos los datos de entrenamiento', 'el tiempo que tarda una GPU en calentarse', 'una capa de la red'], a: 1, why: 'Los LLM grandes suelen entrenarse alrededor de una época o menos: tienen tantos datos que no necesitan repetirlos.' },
          { q: 'La tasa de aprendizaje (learning rate) controla el tamaño del paso en cada actualización.', type: 'tf', a: true, why: 'Correcto. Demasiado grande: inestable; demasiado pequeña: lentísimo. Suele reducirse a lo largo del entrenamiento.' }
        ],
        cards: [
          ['¿Qué es la función de pérdida?', 'Un número que mide cuánto se equivoca el modelo respecto a la respuesta correcta. El entrenamiento la minimiza.'],
          ['¿Qué es el gradiente y qué es el descenso por gradiente?', 'El gradiente dice, para cada parámetro, hacia dónde y cuánto cambia la pérdida. Descender por gradiente es mover los parámetros en sentido contrario, un poquito cada vez.'],
          ['¿Qué es la retropropagación?', 'El algoritmo (1986) que calcula el gradiente de todos los parámetros a la vez, de la salida hacia atrás, con la regla de la cadena.'],
          ['Sobreajuste vs subajuste', 'Sobreajuste: memoriza y falla con datos nuevos. Subajuste: ni siquiera aprende los datos de entrenamiento. Se detectan con un conjunto de validación.'],
          ['¿Qué es la tasa de aprendizaje?', 'El tamaño del paso en cada actualización. Grande: inestable. Pequeña: lento. Se suele reducir durante el entrenamiento.']
        ],
        resources: [
          { type: 'video', t: '3Blue1Brown: Gradient descent, how neural networks learn', u: 'https://www.youtube.com/watch?v=IHZwWFHWa-w', lang: 'EN', min: 21, note: 'Segundo vídeo de la serie. Ver también el tercero, sobre retropropagación.' },
          { type: 'video', t: '3Blue1Brown: What is backpropagation really doing?', u: 'https://www.youtube.com/watch?v=Ilg3gGewQ5U', lang: 'EN', min: 14 },
          { type: 'video', t: 'Andrej Karpathy: The spelled-out intro to neural networks and backpropagation (micrograd)', u: 'https://www.youtube.com/watch?v=VMj-3S1tku0', lang: 'EN', min: 145, note: 'Construye la retropropagación desde cero en Python. Solo si quieres ver el código; no es necesario.' },
          { type: 'course', t: 'DeepLearning.AI: cursos cortos gratuitos', u: 'https://www.deeplearning.ai/short-courses/', lang: 'EN', note: 'De Andrew Ng. Hay cursos de una hora sobre casi cualquier tema de este curso, incluidos varios con Anthropic.' }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'ia-1-4', title: 'Datos, representaciones y embeddings', minutes: 15, level: 'básico',
        summary: 'Cómo se convierte una palabra, una imagen o un cliente en números que capturan su significado, y por qué eso es la base de la búsqueda semántica y de Claude.',
        body: () => [
          B.lead('Las redes solo procesan números. El truco que hizo posible la IA moderna es convertir cualquier cosa (palabras, fotos, productos, personas) en <b>vectores</b> cuyos números capturan el significado. Se llaman <b>embeddings</b>.'),
          B.h('Un vector es una lista de números que describe algo'),
          B.p('Imagina que describes a cada distribuidor con tres números: compras mensuales, antigüedad en meses, tamaño de su red. Cada distribuidor es un punto en un espacio de tres dimensiones. Dos distribuidores parecidos están <b>cerca</b>; dos muy distintos, lejos. Ya tienes una representación vectorial. Un embedding hace lo mismo, pero con cientos o miles de dimensiones que el modelo <b>aprende solo</b>, sin que nadie decida qué mide cada una.'),
          B.h('Embeddings de palabras: el hallazgo de 2013'),
          B.p('Word2vec (Google, 2013) entrenó una red pequeña con una tarea sencilla: predecir una palabra a partir de sus vecinas. El subproducto fue espectacular: los vectores resultantes capturaban relaciones de significado. La operación famosa:'),
          B.code('text', 'vector("rey") − vector("hombre") + vector("mujer") ≈ vector("reina")\nvector("Madrid") − vector("España") + vector("México") ≈ vector("Ciudad de México")', 'Aritmética con significados'),
          B.p('Nadie programó eso. Emergió porque, para predecir bien las palabras vecinas, la red necesitaba organizar el espacio de forma que las palabras con usos parecidos quedaran cerca y las relaciones consistentes fueran desplazamientos consistentes.'),
          B.fig('<svg viewBox="0 0 640 260">' + ARROW +
            '<rect x="10" y="10" width="620" height="240" rx="14" class="fg-box"/>' +
            '<circle cx="150" cy="80" r="6" class="fg-brand"/><text x="160" y="76">rey</text>' +
            '<circle cx="150" cy="190" r="6" class="fg-brand"/><text x="160" y="186">hombre</text>' +
            '<circle cx="330" cy="70" r="6" class="fg-claude"/><text x="340" y="66">reina</text>' +
            '<circle cx="330" cy="180" r="6" class="fg-claude"/><text x="340" y="176">mujer</text>' +
            '<line x1="150" y1="184" x2="150" y2="90" class="fg-arrow"/><line x1="330" y1="174" x2="330" y2="80" class="fg-arrow"/>' +
            '<text x="80" y="140" class="sm">"realeza"</text><text x="380" y="130" class="sm">misma flecha</text>' +
            '<circle cx="520" cy="200" r="6" class="fg-ok"/><text x="530" y="196">regalías</text>' +
            '<circle cx="560" cy="170" r="6" class="fg-ok"/><text x="570" y="166">bono</text>' +
            '<circle cx="500" cy="60" r="6" class="fg-warn"/><text x="510" y="56">suplemento</text>' +
            '<text x="440" y="235" class="sm">palabras de significado cercano quedan cerca</text></svg>',
            'Una proyección en 2D de un espacio de embeddings. Las relaciones se convierten en direcciones.'),
          B.h('Embeddings hoy: la pieza que usa todo el mundo'),
          B.p('Los LLM convierten cada token en un embedding en su primera capa, y las capas siguientes lo van <b>refinando con el contexto</b>: el vector de "banco" en "me siento en el banco" acaba lejos del de "banco" en "el banco rechazó el pago". Además, existen modelos de embeddings independientes (Voyage, de Anthropic; text-embedding de OpenAI; Gemini Embedding) que convierten un texto entero en un vector para buscar por significado.'),
          B.ex('Búsqueda semántica para el Documento maestro de RRB', [
            B.olist([
              'Partes el Documento maestro en fragmentos (las 29 secciones, o párrafos).',
              'Calculas el embedding de cada fragmento y lo guardas en una base de datos vectorial (o en una tabla con una columna de vectores: MySQL 9 y PostgreSQL con pgvector lo permiten).',
              'Cuando un distribuidor le escribe a Maya "¿cuándo me pagan lo del mes pasado?", calculas el embedding de la pregunta y buscas los fragmentos <b>más cercanos</b>: aparecerá la sección de regalías ("se pagan los días 5 y 15") aunque la pregunta no contenga la palabra "regalías".',
              'Le pasas esos fragmentos a Claude junto con la pregunta. Claude responde con la regla oficial. Eso es <b>RAG</b> (generación aumentada con recuperación) y lo verás a fondo en la lección sobre contexto.'
            ]),
            B.p('La ventaja frente a buscar por palabra clave: entiende sinónimos, errores de tipeo y formas distintas de preguntar lo mismo, que es exactamente como escriben tus distribuidores por WhatsApp.')
          ]),
          B.h('Similitud: cómo se mide "cerca"'),
          B.p('La medida habitual es la <b>similitud del coseno</b>: el ángulo entre dos vectores. 1 significa "misma dirección" (mismo significado), 0 "nada que ver", −1 "opuestos". No importa la longitud del texto, solo la dirección. Cuando un proveedor hable de "umbral de similitud 0,8", se refiere a esto.'),
          B.h('No solo palabras'),
          B.list([
            '<b>Imágenes</b>: CLIP (OpenAI, 2021) puso imágenes y textos en el <i>mismo</i> espacio, de modo que la foto de un frasco y la frase "frasco de suplemento" quedan cerca. Es la base de los generadores de imágenes y de que Claude "vea" tus capturas.',
            '<b>Productos, usuarios, canciones</b>: los sistemas de recomendación (Netflix, Spotify, Amazon) son embeddings de personas y artículos en un mismo espacio; te recomiendan lo que está cerca de ti.',
            '<b>Código, moléculas, proteínas</b>: AlphaFold y los modelos de diseño de proteínas que usa Fable 5.1 trabajan sobre embeddings de secuencias biológicas.'
          ]),
          B.key('Un embedding es "significado convertido en geometría". Cerca = parecido. Es la razón por la que puedes buscar sin palabras exactas, comparar documentos y por la que un LLM puede razonar sobre conceptos y no solo sobre letras.'),
          B.check('¿Qué mide la similitud del coseno entre dos embeddings?', ['La diferencia de longitud de los textos', 'El ángulo entre los vectores: cuánto se parecen en significado', 'El número de palabras en común', 'La fecha de los documentos'], 1, 'Solo la dirección importa. Dos textos de distinta longitud pero mismo tema tienen coseno alto.'),
          B.cards([
            { icon: '📐', title: 'Embedding', html: 'Un vector de cientos o miles de números que captura el significado de algo.' },
            { icon: '🧲', title: 'Cerca = parecido', html: 'La similitud del coseno mide el ángulo entre vectores.' },
            { icon: '🔎', title: 'RAG', html: 'Buscar fragmentos por significado y pasárselos al modelo para que responda con datos reales.' }
          ])
        ],
        quiz: [
          { q: '¿Qué es un embedding?', o: ['Una base de datos de palabras', 'Un vector de números que representa el significado de un texto, imagen u objeto', 'La última capa de la red', 'Un tipo de función de activación'], a: 1, why: 'Es una representación numérica aprendida en la que la cercanía geométrica equivale a parecido semántico.' },
          { q: 'La operación rey − hombre + mujer ≈ reina demuestra que…', o: ['el modelo memorizó la frase', 'las relaciones de significado se convierten en direcciones consistentes en el espacio vectorial', 'los embeddings son aleatorios', 'las palabras tienen género gramatical'], a: 1, why: 'El modelo nunca vio esa ecuación; la geometría emergió del entrenamiento para predecir palabras vecinas.' },
          { q: 'Para buscar por significado en el Documento maestro y pasar los fragmentos a Claude, el patrón se llama…', type: 'fill', a: ['RAG', 'rag', 'generación aumentada con recuperación', 'retrieval augmented generation', 'generacion aumentada con recuperacion'], why: 'RAG: Retrieval-Augmented Generation. Recuperar lo relevante y dárselo al modelo en el contexto.' },
          { q: 'La similitud del coseno depende sobre todo de la longitud de los textos comparados.', type: 'tf', a: false, why: 'Depende del ángulo entre vectores, no de su longitud. Por eso un párrafo y una frase sobre el mismo tema pueden tener alta similitud.' },
          { q: 'CLIP (2021) fue importante porque…', o: ['fue el primer LLM', 'puso imágenes y textos en el mismo espacio de embeddings', 'inventó la retropropagación', 'redujo el coste de las GPU'], a: 1, why: 'Alinear imagen y texto en un mismo espacio es la base de los modelos multimodales y de los generadores de imágenes.' }
        ],
        cards: [
          ['¿Qué es un embedding?', 'Un vector (lista de números) aprendido que representa el significado de una palabra, texto, imagen u objeto. Cerca en el espacio = parecido en significado.'],
          ['¿Qué es la similitud del coseno?', 'El coseno del ángulo entre dos vectores: 1 = mismo significado, 0 = sin relación. No depende de la longitud del texto.'],
          ['¿Qué es RAG?', 'Retrieval-Augmented Generation: buscar los fragmentos relevantes (por embeddings) y pasárselos al modelo en el contexto para que responda con datos reales.'],
          ['¿Qué demostró word2vec (2013)?', 'Que entrenar a predecir palabras vecinas produce vectores donde las relaciones semánticas son direcciones: rey − hombre + mujer ≈ reina.']
        ],
        resources: [
          { type: 'article', t: 'Jay Alammar: The Illustrated Word2vec', u: 'https://jalammar.github.io/illustrated-word2vec/', lang: 'EN', note: 'Ilustraciones claras. El mismo autor tiene "The Illustrated Transformer", que usarás en el módulo 2.' },
          { type: 'video', t: '3Blue1Brown: Transformers (how LLMs work) explained visually', u: 'https://www.youtube.com/watch?v=wjZofJX0v4M', lang: 'EN', min: 27, note: 'La primera mitad explica embeddings con animaciones inmejorables.' },
          { type: 'doc', t: 'Anthropic: Embeddings (guía con Voyage AI)', u: 'https://platform.claude.com/docs/en/build-with-claude/embeddings', lang: 'EN', note: 'Cómo generar embeddings para buscar en tus documentos y combinarlos con Claude.' },
          { type: 'tool', t: 'Embedding Projector de TensorFlow', u: 'https://projector.tensorflow.org/', lang: 'EN', note: 'Explora en 3D un espacio de embeddings real. Busca una palabra y mira sus vecinas.' }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'ia-1-5', title: 'El zoo de modelos: qué hay además de los LLM', minutes: 14, level: 'básico',
        summary: 'Visión, difusión, voz, recomendación, refuerzo y modelos de mundo: qué familia hay detrás de cada herramienta que usas y cómo se relacionan con Claude.',
        body: () => [
          B.lead('Los LLM se llevan los titulares, pero cuando generas una voz con ElevenLabs o un vídeo con Google Flow estás usando otras familias de modelos. Conocerlas te permite entender qué puede fallar y qué está a la vuelta de la esquina.'),
          B.h('Mapa rápido por tipo de dato'),
          B.table(['Familia', 'Qué hace', 'Arquitectura típica', 'Ejemplos que conoces'], [
            ['<b>Visión (clasificación, detección)</b>', 'Reconocer qué hay en una imagen, dónde', 'Redes convolucionales (CNN) → hoy transformers de visión (ViT)', 'Lectura de fotos de inventario por QR; detección de rostros en el KYC de Maya'],
            ['<b>Generación de imagen y vídeo</b>', 'Crear imágenes y vídeo a partir de texto', 'Modelos de <b>difusión</b> (y transformers de difusión, DiT)', 'Google Flow/Veo, Sora (OpenAI), Midjourney, Stable Diffusion, Imagen'],
            ['<b>Voz</b>', 'Texto a voz (TTS), voz a texto (ASR)', 'Transformers + difusión/flow para audio; Whisper para transcripción', 'ElevenLabs (tus 356 guiones), Whisper, el modo voz de Claude y ChatGPT'],
            ['<b>Recomendación</b>', 'Predecir qué te va a interesar', 'Embeddings de usuarios e ítems + redes', 'Netflix, Spotify, TikTok, Amazon; "productos que también compran" en tu tienda pública'],
            ['<b>Refuerzo (agentes de decisión)</b>', 'Aprender a actuar en un entorno', 'Redes + búsqueda + recompensa (AlphaGo, AlphaZero)', 'Juegos, robótica, control de centros de datos; y la fase de RL de los LLM razonadores'],
            ['<b>Ciencia</b>', 'Predecir estructuras, diseñar moléculas, resolver ecuaciones', 'Transformers y difusión especializados', 'AlphaFold (Nobel 2024), diseño de proteínas con Fable 5.1, predicción del tiempo (GraphCast)']
          ]),
          B.h('Difusión: crear a partir del ruido'),
          B.p('Los generadores de imagen no dibujan trazo a trazo. Un modelo de <b>difusión</b> aprende a <i>quitar ruido</i>: durante el entrenamiento se toma una imagen real, se le añade ruido poco a poco hasta que es estática pura, y la red aprende a revertir cada paso. Para generar, se parte de ruido aleatorio y se "desruidea" 20 a 50 veces guiado por el texto que escribiste. El vídeo funciona igual, con el tiempo como una dimensión más; por eso es tan caro.'),
          B.steps('Cómo Flow genera un plano de tu vídeo de Plata 1000', [
            'Tu texto ("frasco azul sobre mármol blanco, luz de mañana, cámara lenta") se convierte en embeddings con un modelo de lenguaje.',
            'Se genera un bloque de ruido aleatorio con la forma del vídeo (alto × ancho × fotogramas), normalmente en un espacio comprimido (latente) para que quepa en memoria.',
            'La red de difusión mira el ruido y el texto y predice "qué parte de esto es ruido". Se resta un poco. Aparecen formas vagas.',
            'Se repite decenas de veces. Cada paso concreta más: el frasco, el mármol, el movimiento de cámara. El texto guía cada paso.',
            'Un decodificador convierte el resultado latente en píxeles reales. Un modelo de audio puede añadir sonido sincronizado (Veo 3 lo hace).'
          ]),
          B.warn('Los modelos de difusión no "saben" que un frasco tiene una sola tapa o que una mano tiene cinco dedos: aprenden estadísticas visuales. Por eso el texto en las imágenes sale mal y los objetos a veces se funden. Los modelos de 2025-2026 lo han mejorado mucho, pero sigue siendo su punto débil. Revisa siempre las etiquetas de producto en un vídeo generado.'),
          B.h('Voz: por qué ElevenLabs suena humano'),
          B.p('Los sistemas de TTS modernos son generativos: predicen el audio (en forma de tokens acústicos o de espectrogramas) a partir del texto y de una muestra de voz de referencia, con transformers y técnicas de difusión. Por eso pueden clonar una voz con segundos de audio, cambiar la emoción y hablar en decenas de idiomas. Lo inverso, la transcripción (Whisper, 2022), es un transformer que convierte audio en texto y es la base del dictado de Claude.'),
          B.h('Refuerzo: aprender haciendo'),
          B.p('AlphaGo (2016) venció al campeón mundial de Go combinando redes neuronales con búsqueda y aprendizaje por refuerzo: jugaba contra sí mismo millones de veces y ajustaba su política según ganara o perdiera. AlphaZero (2017) hizo lo mismo sin conocer ninguna partida humana. La lección que los laboratorios extrajeron: <b>cuando existe una señal clara de éxito, el refuerzo puede superar a los humanos</b>. Esa idea vuelve en 2024-2025 con los modelos razonadores: matemáticas y código tienen respuestas verificables, así que se puede entrenar con refuerzo a escala. Lo verás en el módulo 3.'),
          B.h('Modelos de mundo: la apuesta alternativa'),
          B.p('Yann LeCun (padre de las redes convolucionales, Turing 2018) sostiene que los LLM no llevan a la inteligencia general porque predecir texto no enseña cómo funciona el mundo físico. Propone <b>modelos de mundo</b> que aprendan de vídeo a predecir qué pasará (JEPA). En 2025 dejó Meta para fundar su propia empresa con esa tesis. Google DeepMind explora la misma dirección con Genie 3, que genera mundos interactivos. Es el debate de arquitectura más importante que hay ahora mismo, y conviene tener las dos posturas.'),
          B.key('Casi todo converge en una arquitectura: el <b>transformer</b>. Texto, imagen, audio, proteínas. Y la tendencia es a modelos <b>multimodales</b> que hacen todo en uno (Gemini, GPT-5, Claude con visión). Por eso el módulo 2 se dedica entero al transformer.'),
          B.check('¿Cómo genera una imagen un modelo de difusión?', ['Dibujando trazo a trazo como una persona', 'Buscando la imagen más parecida en internet', 'Partiendo de ruido aleatorio y quitándolo paso a paso guiado por el texto', 'Copiando fragmentos de fotos de entrenamiento'], 2, 'Aprendió a revertir el proceso de añadir ruido. Generar es desruidear decenas de veces con el texto como guía.'),
          B.cards([
            { icon: '🖼️', title: 'Difusión', html: 'Imagen y vídeo: del ruido a la imagen, paso a paso.' },
            { icon: '🎙️', title: 'Voz generativa', html: 'TTS que clona voces con segundos de audio; Whisper para transcribir.' },
            { icon: '🎮', title: 'Refuerzo', html: 'Aprender por recompensa. De AlphaGo a los modelos razonadores.' },
            { icon: '🌍', title: 'Modelos de mundo', html: 'La apuesta de LeCun: aprender del vídeo cómo funciona el mundo.' }
          ])
        ],
        quiz: [
          { q: 'Google Flow / Veo generan vídeo con modelos de…', o: ['reglas', 'difusión', 'recomendación', 'regresión lineal'], a: 1, why: 'Los generadores de imagen y vídeo actuales son modelos de difusión (a menudo con arquitectura transformer, DiT).' },
          { q: '¿Por qué los generadores de imagen escriben mal el texto de una etiqueta?', o: ['Porque no tienen internet', 'Porque aprenden estadísticas visuales, no reglas sobre letras ni objetos', 'Porque la resolución es baja', 'Porque usan CNN antiguas'], a: 1, why: 'No razonan sobre la estructura del texto; reproducen patrones visuales. Ha mejorado, pero hay que revisar siempre.' },
          { q: 'AlphaZero aprendió a jugar sin ver ninguna partida humana, solo jugando contra sí mismo con recompensas.', type: 'tf', a: true, why: 'Es el ejemplo canónico de aprendizaje por refuerzo con una señal clara de éxito (ganar o perder).' },
          { q: '¿Qué propone Yann LeCun como alternativa a los LLM para llegar a la inteligencia general?', o: ['Modelos más grandes', 'Modelos de mundo que aprenden del vídeo a predecir qué pasará', 'Volver a los sistemas expertos', 'Redes convolucionales'], a: 1, why: 'Su tesis: predecir texto no enseña física ni causalidad; hay que aprender del mundo (JEPA).' },
          { q: '¿Qué familia de modelos hay detrás de "productos que también compran" en una tienda?', type: 'fill', a: ['recomendación', 'recomendacion', 'sistemas de recomendación', 'recomendadores', 'sistema de recomendacion'], why: 'Sistemas de recomendación: embeddings de usuarios y productos en un mismo espacio.' }
        ],
        cards: [
          ['¿Cómo funciona un modelo de difusión?', 'Aprende a quitar ruido. Para generar, parte de ruido aleatorio y lo elimina en decenas de pasos guiado por el texto. Así funcionan Veo, Sora, Midjourney.'],
          ['¿Qué es Whisper?', 'El modelo de transcripción de voz a texto de OpenAI (2022), un transformer. Base del dictado en muchas apps.'],
          ['¿Qué demostró AlphaGo/AlphaZero?', 'Que con una señal de éxito clara, el aprendizaje por refuerzo puede superar a los humanos jugando contra sí mismo. La idea vuelve en los LLM razonadores.'],
          ['¿Qué es un modelo de mundo (LeCun)?', 'Un modelo que aprende de vídeo a predecir cómo evoluciona el mundo, como alternativa a predecir texto. Ejemplos: JEPA, Genie 3.']
        ],
        resources: [
          { type: 'video', t: 'Computerphile: How AI Image Generators Work (Stable Diffusion)', u: 'https://www.youtube.com/watch?v=1CIpzeNxIhU', lang: 'EN', min: 17 },
          { type: 'video', t: 'DeepMind: AlphaGo, el documental', u: 'https://www.youtube.com/watch?v=WXuK6gekU1Y', lang: 'EN', min: 90, note: 'Gratis en YouTube. La mejor forma de entender el refuerzo y de sentir lo que fue 2016. Subtítulos en español.' },
          { type: 'article', t: 'Google DeepMind: Genie 3, un modelo de mundo interactivo', u: 'https://deepmind.google/discover/blog/genie-3-a-new-frontier-for-world-models/', lang: 'EN' },
          { type: 'article', t: 'Yann LeCun: A Path Towards Autonomous Machine Intelligence (JEPA)', u: 'https://openreview.net/pdf?id=BZ5a1r-kVsf', lang: 'EN', note: 'El manifiesto de LeCun. Denso; basta con la introducción para captar la tesis.' }
        ]
      }
    ]
  };
})();
