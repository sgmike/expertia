/* Curso de IA · Módulo 4: Historia. */
(function () {
  'use strict';
  const B = EX.B;
  EX.MOD = EX.MOD || {};

  EX.MOD['ia-4'] = {
    id: 'ia-4', icon: '🕰️', title: 'Historia: de la primera neurona a Mythos',
    desc: 'Ochenta años en seis lecciones: las ideas, las personas y los momentos que llevaron de una neurona de papel (1943) a modelos que encuentran vulnerabilidades y diseñan proteínas (2026). Con la línea de tiempo completa en la sección Historia.',
    goals: [
      'Situar cada gran hito (perceptrón, backprop, AlexNet, transformer, GPT-3, ChatGPT, o1, R1, Mythos) en su década y explicar por qué importó.',
      'Entender los dos inviernos de la IA y qué cambió para que el tercer intento funcionara.',
      'Conocer a las personas clave y sus apuestas: Hinton, LeCun, Bengio, Sutskever, Amodei, Altman, Hassabis, Liang.',
      'Leer la carrera 2022-2026 como una secuencia de decisiones estratégicas, no de productos.'
    ],
    lessons: [
      /* ------------------------------------------------------------------ */
      {
        id: 'ia-4-1', title: '1943-1969: la idea de una máquina que aprende', minutes: 12, level: 'básico',
        summary: 'Turing, la neurona de McCulloch y Pitts, Dartmouth, el perceptrón de Rosenblatt y el libro que casi mata las redes neuronales.',
        body: () => [
          B.lead('La IA no empezó con ChatGPT ni con internet. Empezó con una pregunta de posguerra: ¿puede una máquina pensar? Y con una neurona dibujada en papel.'),
          B.h('1943: la neurona de papel'),
          B.p('Warren McCulloch (neurofisiólogo) y Walter Pitts (lógico de 20 años) publican un modelo matemático de la neurona: entradas binarias, un umbral, una salida. Demuestran que redes de esas neuronas pueden calcular cualquier función lógica. Es exactamente la neurona de la lección 1.2, sin aprendizaje: los pesos se fijan a mano.'),
          B.h('1950: Turing pregunta'),
          B.p('Alan Turing publica "Computing Machinery and Intelligence" y propone el <b>juego de imitación</b> (test de Turing): si un juez no distingue por escrito a la máquina de una persona, ¿qué sentido tiene negar que piensa? También anticipa las <i>máquinas que aprenden</i> como niños y el problema de que serán impredecibles. Setenta y cuatro años después, los LLM superan el test en estudios controlados, y la pregunta sigue abierta.'),
          B.h('1956: nace el nombre'),
          B.p('John McCarthy organiza un taller de verano en Dartmouth con Marvin Minsky, Claude Shannon y otros. Acuña "inteligencia artificial" y promete que "un avance significativo puede lograrse si un grupo selecto de científicos trabaja en ello durante un verano". El optimismo será una constante del campo. Dos escuelas se perfilan: la <b>simbólica</b> (programar reglas y lógica) y la <b>conexionista</b> (redes de neuronas que aprenden). La simbólica dominará treinta años.'),
          B.h('1958: el perceptrón aprende'),
          B.p('Frank Rosenblatt, psicólogo en Cornell, construye el <b>perceptrón</b>: una neurona de McCulloch-Pitts cuyos pesos se ajustan solos a partir de ejemplos. Es el primer algoritmo de aprendizaje de una red neuronal, y el ancestro directo del descenso por gradiente. Lo implementa en hardware (la Mark I, con 400 fotocélulas) y reconoce letras. El New York Times anuncia una máquina que "caminará, hablará, verá, escribirá y será consciente de su existencia". La prensa también será una constante.'),
          B.h('1969: el libro que congeló el campo'),
          B.p('Minsky y Seymour Papert publican <i>Perceptrons</i>, demostrando que un perceptrón de una capa no puede aprender funciones simples como XOR. Es cierto y ellos lo saben: con más capas sí se puede, pero nadie sabe entrenar capas ocultas. El efecto es devastador: la financiación de redes neuronales se seca durante casi 15 años. La comunidad apuesta por la IA simbólica.'),
          B.key('La lección estratégica de esta era: la idea correcta (redes que aprenden de ejemplos) existía en 1958. Faltaban tres cosas: un algoritmo para entrenar redes profundas, datos y cómputo. Las tres tardaron medio siglo en llegar, y quienes mantuvieron la apuesta fueron tachados de obstinados.'),
          B.check('¿Qué demostró el libro Perceptrons (1969)?', ['Que las redes neuronales no pueden aprender nada', 'Que un perceptrón de una sola capa no puede aprender funciones como XOR', 'Que los ordenadores nunca pensarán', 'Que la IA simbólica es imposible'], 1, 'Con capas ocultas sí se podía, pero nadie sabía entrenarlas. El resultado fue 15 años de sequía para las redes.'),
          B.cards([
            { icon: '🧠', title: '1943', html: 'McCulloch y Pitts: la neurona lógica.' },
            { icon: '❓', title: '1950', html: 'Turing: ¿puede pensar una máquina?' },
            { icon: '🏷️', title: '1956', html: 'Dartmouth: nace el nombre.' },
            { icon: '📸', title: '1958', html: 'Rosenblatt: el perceptrón aprende.' },
            { icon: '🧊', title: '1969', html: 'Minsky y Papert congelan las redes.' }
          ])
        ],
        quiz: [
          { q: '¿Quién construyó el perceptrón, la primera red neuronal que aprendía de ejemplos?', o: ['Alan Turing', 'Frank Rosenblatt', 'Marvin Minsky', 'John McCarthy'], a: 1, why: 'Rosenblatt, 1958, en Cornell. La Mark I reconocía letras con 400 fotocélulas.' },
          { q: 'El término "inteligencia artificial" se acuñó en…', o: ['1943', '1950', '1956 (Dartmouth)', '1969'], a: 2, why: 'John McCarthy, taller de Dartmouth, 1956.' },
          { q: 'Las dos grandes escuelas de la IA temprana eran la simbólica (reglas y lógica) y la conexionista (redes que aprenden).', type: 'tf', a: true, why: 'La simbólica dominó hasta los años 2000; la conexionista es la que hoy llamamos aprendizaje profundo.' },
          { q: '¿Qué le faltaba a la idea de 1958 para funcionar?', type: 'multi', o: ['Un algoritmo para entrenar capas ocultas', 'Datos a gran escala', 'Cómputo barato', 'Internet para publicar papers'], a: [0, 1, 2], why: 'Backprop (1986), internet y GPU (2000-2012) llegaron décadas después.' }
        ],
        cards: [
          ['¿Qué propuso Turing en 1950?', 'El juego de imitación (test de Turing): si un juez no distingue a la máquina de una persona por escrito, tiene sentido decir que piensa. Anticipó las máquinas que aprenden.'],
          ['¿Qué fue el perceptrón (1958)?', 'La primera neurona artificial que ajustaba sus pesos a partir de ejemplos (Rosenblatt). Ancestro del descenso por gradiente.'],
          ['¿Por qué Perceptrons (1969) congeló las redes neuronales?', 'Demostró que una sola capa no aprende XOR; nadie sabía entrenar capas ocultas. La financiación se fue a la IA simbólica durante ~15 años.']
        ],
        resources: [
          { type: 'article', t: 'Turing (1950): Computing Machinery and Intelligence (texto completo)', u: 'https://academic.oup.com/mind/article/LIX/236/433/986238', lang: 'EN', note: 'Sorprendentemente legible y actual.' },
          { type: 'video', t: 'DotCSV: La historia de la Inteligencia Artificial', u: 'https://www.youtube.com/@DotCSV', lang: 'ES', note: 'Busca en el canal los vídeos de historia; cubren esta época con archivo.' },
          { type: 'book', t: 'Cade Metz: Genius Makers (historia de las personas detrás del deep learning)', u: 'https://www.penguinrandomhouse.com/authors/2183925/cade-metz/', lang: 'EN', note: 'El libro que cuenta a Hinton, LeCun, Bengio y la carrera Google-Facebook-OpenAI. Hay traducción al español.' }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'ia-4-2', title: '1970-2011: inviernos, backprop y la paciencia de tres obstinados', minutes: 14, level: 'básico',
        summary: 'Dos inviernos de la IA, los sistemas expertos, la retropropagación de 1986, las convoluciones de LeCun, Deep Blue y el renacimiento silencioso del deep learning.',
        body: () => [
          B.lead('Entre 1970 y 2011 la IA fue dos veces la próxima gran cosa y dos veces una decepción. Mientras tanto, un puñado de investigadores mantuvo viva la idea de las redes neuronales contra la opinión mayoritaria. Sus nombres están hoy en todos los laboratorios.'),
          B.h('Primer invierno (1974-1980)'),
          B.p('Las promesas de los sesenta no se cumplen. El informe Lighthill (Reino Unido, 1973) y los recortes de DARPA en EE. UU. secan la financiación. La IA se convierte en una palabra que evitar en las solicitudes de becas.'),
          B.h('Los sistemas expertos (1980-1987)'),
          B.p('Vuelve el entusiasmo con los <b>sistemas expertos</b>: programas con miles de reglas "si-entonces" escritas por expertos humanos (MYCIN diagnosticaba infecciones; XCON configuraba ordenadores en DEC y ahorraba millones). Japón lanza el proyecto Quinta Generación. Es IA simbólica pura. Problema: las reglas son frágiles, no aprenden, y mantener 10.000 reglas es una pesadilla. Cuando los PC hacen obsoletas las máquinas Lisp especializadas, el mercado se hunde: <b>segundo invierno (1987-1993)</b>.'),
          B.analogy('Un sistema experto es tu plan de compensación escrito como 10.000 reglas: funciona hasta que aparece un caso que nadie previó, y cada excepción nueva exige tocar las reglas a mano. La promesa del aprendizaje automático es justo lo contrario: dame ejemplos y deduzco la regla.'),
          B.h('1986: la retropropagación'),
          B.p('En medio de la euforia simbólica, David Rumelhart, <b>Geoffrey Hinton</b> y Ronald Williams publican el algoritmo de retropropagación para entrenar redes con capas ocultas (la idea tenía antecedentes desde los setenta, pero este paper la hizo práctica y popular). Es la respuesta a Minsky y Papert con 17 años de retraso: ahora sí se pueden entrenar redes profundas. En teoría. En la práctica los ordenadores de 1986 solo permiten redes diminutas.'),
          B.h('1989-1998: LeCun lee cheques'),
          B.p('<b>Yann LeCun</b>, en los laboratorios Bell, aplica backprop a <b>redes convolucionales</b> (CNN) inspiradas en la corteza visual: neuronas que miran parches pequeños de la imagen y comparten pesos. LeNet reconoce dígitos manuscritos y acaba leyendo el 10-20 % de los cheques de EE. UU. Es el primer deep learning en producción. Casi nadie fuera de ese nicho le presta atención.'),
          B.h('1997: dos hitos en una década escéptica'),
          B.list([
            '<b>Deep Blue</b> (IBM) derrota a Garry Kasparov. Es fuerza bruta simbólica (200 millones de posiciones por segundo), no aprendizaje, pero marca el imaginario público.',
            '<b>LSTM</b> (Hochreiter y Schmidhuber): una red recurrente con "puertas" que recuerda a largo plazo. Será la arquitectura de texto y voz hasta 2017 (Google Translate, Siri).'
          ]),
          B.h('2000-2011: el renacimiento silencioso'),
          B.p('Tres cosas maduran en paralelo. <b>Datos</b>: internet produce texto e imágenes a escala inédita; en 2009 <b>Fei-Fei Li</b> publica ImageNet, 14 millones de imágenes etiquetadas, y lanza una competición anual. <b>Cómputo</b>: las GPU, diseñadas para videojuegos, resultan perfectas para multiplicar matrices; en 2007 Nvidia lanza CUDA. <b>Algoritmos</b>: en 2006 Hinton muestra cómo preentrenar redes profundas capa a capa y acuña "deep learning"; ReLU y el dropout llegan poco después. Hinton, LeCun y <b>Yoshua Bengio</b> (en Montreal) forman, financiados por el instituto canadiense CIFAR, lo que ellos mismos llaman "la conspiración del deep learning". El resto del campo sigue mirando otras técnicas (SVM, boosting).'),
          B.key('Tres personas sostuvieron una idea impopular durante 25 años porque creían en ella. En 2018 recibirían el Premio Turing y en 2024 Hinton el Nobel de Física. La moraleja para un directivo: las tecnologías transformadoras suelen parecer un callejón sin salida justo antes de despegar, y quienes las llevan son a menudo los mismos que fueron ignorados.'),
          B.check('¿Qué permitió por primera vez entrenar redes neuronales con capas ocultas en la práctica?', ['El perceptrón (1958)', 'La retropropagación (Rumelhart, Hinton, Williams, 1986)', 'Deep Blue (1997)', 'ImageNet (2009)'], 1, 'Backprop respondió a Minsky y Papert. Faltaría aún cómputo y datos para que fuera útil a gran escala.'),
          B.cards([
            { icon: '❄️', title: 'Dos inviernos', html: '1974-80 y 1987-93: promesas incumplidas y recortes.' },
            { icon: '📋', title: 'Sistemas expertos', html: 'Miles de reglas a mano. Frágiles, no aprenden.' },
            { icon: '🔁', title: '1986 backprop', html: 'Hinton y colegas: ahora sí se entrenan capas ocultas.' },
            { icon: '🧑‍🔬', title: 'La conspiración', html: 'Hinton, LeCun, Bengio: 25 años a contracorriente.' }
          ])
        ],
        quiz: [
          { q: 'Los sistemas expertos de los años 80 eran…', o: ['redes neuronales profundas', 'programas con miles de reglas "si-entonces" escritas por expertos', 'los primeros LLM', 'algoritmos de refuerzo'], a: 1, why: 'IA simbólica pura. Frágiles y costosos de mantener; su colapso trajo el segundo invierno.' },
          { q: '¿Quiénes son los tres "padres del deep learning" (Turing 2018)?', o: ['Turing, McCarthy y Minsky', 'Hinton, LeCun y Bengio', 'Altman, Amodei y Hassabis', 'Rosenblatt, Pitts y Shannon'], a: 1, why: 'Mantuvieron la apuesta por las redes neuronales durante décadas de escepticismo.' },
          { q: 'Deep Blue venció a Kasparov usando aprendizaje profundo.', type: 'tf', a: false, why: 'Era fuerza bruta y reglas (IA simbólica): 200 millones de posiciones por segundo. Sin aprendizaje.' },
          { q: '¿Qué tres ingredientes maduraron entre 2000 y 2011 para hacer posible el deep learning?', type: 'multi', o: ['Datos masivos (internet, ImageNet)', 'GPU y CUDA', 'Mejoras algorítmicas (preentrenamiento, ReLU, dropout)', 'Los smartphones plegables'], a: [0, 1, 2], why: 'Datos, cómputo y algoritmos: la tríada que se repite en cada salto.' },
          { q: '¿Qué red recurrente de 1997 dominó el procesamiento de texto y voz hasta el transformer?', type: 'fill', a: ['LSTM', 'lstm', 'long short-term memory'], why: 'LSTM (Hochreiter y Schmidhuber). Google Translate y Siri la usaron durante años.' }
        ],
        cards: [
          ['¿Qué fueron los inviernos de la IA?', 'Periodos de recorte de financiación tras promesas incumplidas: 1974-1980 y 1987-1993 (tras el colapso de los sistemas expertos).'],
          ['¿Qué aportó el paper de 1986 de Rumelhart, Hinton y Williams?', 'Hizo práctica y popular la retropropagación para entrenar redes con capas ocultas, respondiendo a la objeción de Perceptrons.'],
          ['¿Qué es una red convolucional (CNN)?', 'Red inspirada en la corteza visual (LeCun, 1989): neuronas que miran parches pequeños y comparten pesos. LeNet leía cheques; AlexNet ganó ImageNet.'],
          ['¿Quiénes formaron la "conspiración del deep learning"?', 'Hinton, LeCun y Bengio, financiados por CIFAR en los 2000, cuando casi nadie creía en las redes neuronales. Turing 2018.']
        ],
        resources: [
          { type: 'video', t: 'Geoffrey Hinton: entrevista tras el Nobel (60 Minutes)', u: 'https://www.youtube.com/watch?v=qrvK_KuIeJk', lang: 'EN', min: 13, note: 'Hinton cuenta la historia y sus preocupaciones actuales.' },
          { type: 'paper', t: 'Rumelhart, Hinton, Williams (1986): Learning representations by back-propagating errors', u: 'https://www.nature.com/articles/323533a0', lang: 'EN' },
          { type: 'article', t: 'Wikipedia: AI winter (historia detallada de los dos inviernos)', u: 'https://en.wikipedia.org/wiki/AI_winter', lang: 'EN' }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'ia-4-3', title: '2012-2016: la revolución del deep learning', minutes: 14, level: 'básico',
        summary: 'AlexNet gana ImageNet, Google compra a Hinton, word2vec, la atención de 2014, la fundación de OpenAI y AlphaGo. Cinco años que convirtieron una idea académica en una carrera industrial.',
        body: () => [
          B.lead('En septiembre de 2012 una red neuronal entrenada en dos GPU de videojuegos en el dormitorio de un estudiante destrozó a todos los sistemas de visión del mundo. Desde entonces, nada ha sido igual.'),
          B.h('2012: AlexNet'),
          B.p('Alex Krizhevsky, <b>Ilya Sutskever</b> y Hinton (Toronto) presentan una CNN profunda de 60 millones de parámetros entrenada con dos GTX 580 durante una semana. En ImageNet obtiene un 15,3 % de error frente al 26,2 % del segundo clasificado. Un salto así no se había visto nunca. En dos años, todos los equipos de la competición usan deep learning, y en 2015 ResNet (Microsoft) supera la precisión humana. Google compra la empresa de Hinton (DNNresearch) por 44 millones; Facebook contrata a LeCun para fundar FAIR (2013). Empieza la guerra por el talento.'),
          B.key('AlexNet demostró la tríada: la idea de 1986 + los datos de ImageNet + el cómputo de las GPU. A partir de aquí, cada avance seguirá la misma receta a mayor escala.'),
          B.h('2013-2014: el lenguaje entra en juego'),
          B.list([
            '<b>Word2vec</b> (Mikolov, Google, 2013): los embeddings de palabras (lección 1.4). Rey − hombre + mujer = reina.',
            '<b>Seq2seq</b> (Sutskever, 2014): dos LSTM, una lee la frase y otra la escribe en otro idioma. Base del Google Translate neuronal de 2016.',
            '<b>Atención</b> (Bahdanau, Cho, Bengio, 2014): en lugar de comprimir toda la frase en un vector, el decodificador "mira" a las palabras relevantes de la entrada. Es el germen del transformer.',
            '<b>GAN</b> (Goodfellow, 2014): dos redes compiten, una genera y otra detecta falsificaciones. Primeras imágenes sintéticas convincentes. Serán superadas por la difusión en 2021.'
          ]),
          B.h('2014: Google compra DeepMind'),
          B.p('<b>Demis Hassabis</b>, Shane Legg y Mustafa Suleyman habían fundado DeepMind en Londres en 2010 con una misión explícita: "resolver la inteligencia y usarla para resolver todo lo demás". En 2013 muestran una red que aprende a jugar videojuegos de Atari a partir de los píxeles con aprendizaje por refuerzo. Google la compra por unos 500 millones de dólares con una condición insólita: un comité de ética.'),
          B.h('2015: nace OpenAI'),
          B.p('En diciembre de 2015, <b>Sam Altman</b>, <b>Elon Musk</b>, <b>Greg Brockman</b>, <b>Ilya Sutskever</b> y otros fundan OpenAI como organización sin ánimo de lucro con 1.000 millones de dólares comprometidos. La razón declarada: contrapesar a Google/DeepMind y asegurar que la IA general beneficie a toda la humanidad, publicando abiertamente. La tensión entre esa misión y las necesidades de capital marcará su historia.'),
          B.h('2016: AlphaGo'),
          B.p('En marzo de 2016, AlphaGo de DeepMind vence 4-1 a Lee Sedol, uno de los mejores jugadores de Go de la historia, en Seúl, ante 200 millones de espectadores. El Go tiene más posiciones que átomos en el universo; se creía a una década de distancia. La jugada 37 de la segunda partida, que ningún humano habría hecho, se convierte en símbolo. Un año después, AlphaZero aprende desde cero sin partidas humanas y también domina ajedrez y shogi. Para muchos gobiernos (sobre todo China, que lo vivió como su "momento Sputnik") y empresas, este es el momento en que la IA pasa de investigación a prioridad estratégica.'),
          B.p('Mientras, el deep learning entra en producción en todas partes: reconocimiento de voz (2012-2015), traducción neuronal (2016), recomendación, fotos. Nvidia, que vendía chips para juegos, se convierte en la empresa de infraestructura de la IA.'),
          B.check('¿Por qué AlexNet (2012) fue un punto de inflexión?', ['Porque fue la primera red neuronal', 'Porque demostró con un salto enorme que redes profundas + datos masivos + GPU superaban a todo lo anterior, desatando la adopción industrial', 'Porque venció al campeón de Go', 'Porque inventó la atención'], 1, 'Redujo el error de ImageNet del 26 % al 15 %. En dos años, todo el campo era deep learning.'),
          B.cards([
            { icon: '🖼️', title: '2012 AlexNet', html: 'Dos GPU, una semana, el campo cambia.' },
            { icon: '🔤', title: '2013-14', html: 'word2vec, seq2seq, atención, GAN.' },
            { icon: '🏢', title: '2014-15', html: 'Google compra DeepMind; nace OpenAI.' },
            { icon: '⚫', title: '2016 AlphaGo', html: 'La IA se vuelve asunto de Estado.' }
          ])
        ],
        quiz: [
          { q: 'AlexNet (2012) se entrenó con…', o: ['un superordenador de IBM', 'dos GPU de videojuegos durante una semana', 'una red de 1.000 servidores', 'un chip especializado de Google'], a: 1, why: 'Dos GTX 580. La lección: el cómputo de consumo bastaba si se usaba bien.' },
          { q: '¿Qué mecanismo introducido en 2014 por Bahdanau, Cho y Bengio fue el germen del transformer?', o: ['Dropout', 'La atención', 'La convolución', 'El perceptrón'], a: 1, why: 'Permitía al decodificador mirar las palabras relevantes de la entrada en vez de comprimir todo en un vector.' },
          { q: 'OpenAI se fundó en 2015 como empresa con ánimo de lucro respaldada por Microsoft.', type: 'tf', a: false, why: 'Se fundó como organización sin ánimo de lucro. Microsoft entró en 2019, tras la creación de la estructura de beneficio limitado.' },
          { q: 'La victoria de AlphaGo sobre Lee Sedol fue en…', type: 'fill', a: ['2016', 'marzo de 2016'], why: 'Marzo de 2016, Seúl, 4-1. Para China fue su "momento Sputnik".' },
          { q: 'DeepMind fue comprada por…', o: ['Microsoft', 'Google (2014)', 'Meta', 'Amazon'], a: 1, why: 'Por unos 500 millones de dólares, con la condición de crear un comité de ética.' }
        ],
        cards: [
          ['¿Qué fue AlexNet y por qué importó?', 'CNN profunda de Krizhevsky, Sutskever y Hinton (2012) que redujo el error de ImageNet del 26 % al 15 % entrenando en dos GPU. Desató la adopción industrial del deep learning.'],
          ['¿Cuándo y quiénes fundaron OpenAI y con qué misión?', 'Diciembre de 2015; Altman, Musk, Brockman, Sutskever y otros; sin ánimo de lucro, para que la IA general beneficie a toda la humanidad y contrapesar a Google.'],
          ['¿Qué fue AlphaGo (2016)?', 'Sistema de DeepMind que venció 4-1 a Lee Sedol en Go, combinando redes neuronales, búsqueda y refuerzo. Convirtió la IA en prioridad estratégica para gobiernos y empresas.'],
          ['¿Qué introdujo el paper de atención de 2014?', 'Que el decodificador de una traducción "mire" a las palabras relevantes de la entrada en lugar de comprimir toda la frase en un vector. Germen del transformer.']
        ],
        resources: [
          { type: 'video', t: 'AlphaGo: el documental completo (DeepMind)', u: 'https://www.youtube.com/watch?v=WXuK6gekU1Y', lang: 'EN', min: 90, note: 'Imprescindible para entender 2016 y el aprendizaje por refuerzo.' },
          { type: 'paper', t: 'Krizhevsky, Sutskever, Hinton (2012): ImageNet Classification with Deep CNNs', u: 'https://papers.nips.cc/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html', lang: 'EN' },
          { type: 'article', t: 'Quanta / Fei-Fei Li: la historia de ImageNet', u: 'https://www.quantamagazine.org/', lang: 'EN', note: 'Busca "ImageNet" en Quanta Magazine; también el libro de Fei-Fei Li "The Worlds I See".' }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'ia-4-4', title: '2017-2020: el transformer y el nacimiento de GPT', minutes: 14, level: 'intermedio',
        summary: 'Attention Is All You Need, BERT contra GPT, la apuesta de OpenAI por escalar, GPT-2 y su liberación escalonada, y GPT-3: el modelo que hizo evidente que algo grande pasaba.',
        body: () => [
          B.lead('Entre 2017 y 2020 se decidió la arquitectura (el transformer), la estrategia (escalar) y el bando ganador (los que apostaron por modelos generativos gigantes). Casi nadie fuera del campo se enteró.'),
          B.h('Junio de 2017: Attention Is All You Need'),
          B.p('Ocho investigadores de Google Brain (Vaswani, Shazeer, Parmar, Uszkoreit, Jones, Gomez, Kaiser, Polosukhin) publican el <b>transformer</b> para traducción automática. Elimina la recurrencia y se queda solo con atención (módulo 2). Entrena más rápido y traduce mejor. Google lo usa en Translate y en la búsqueda. Curiosamente, ninguno de los ocho sigue en Google en 2026: fundaron Character.ai, Cohere, Adept, Inceptive, Essential AI, Sakana… El paper acumula más de 150.000 citas.'),
          B.h('2018: dos caminos'),
          B.compare('BERT (Google, octubre de 2018)', ['Transformer <i>encoder</i>: lee el texto completo en ambas direcciones.', 'Entrenado a rellenar palabras tapadas.', 'Excelente para entender: búsqueda, clasificación. Google lo despliega en el buscador en 2019.', 'No genera texto. Camino "comprensión".'],
            'GPT-1 (OpenAI, junio de 2018)', ['Transformer <i>decoder</i>: lee de izquierda a derecha.', 'Entrenado a predecir la siguiente palabra (Alec Radford, 117 M de parámetros).', 'Genera texto. Se ajusta a tareas con pocos ejemplos.', 'Camino "generación". Parece el menos prometedor. Gana.']),
          B.h('2019: GPT-2 y la primera polémica'),
          B.p('GPT-2 (1.500 millones de parámetros, 40 GB de texto de Reddit) escribe párrafos coherentes sobre cualquier tema. OpenAI decide <b>no publicar el modelo completo</b> de inmediato por miedo al uso para desinformación, y lo libera por etapas durante 2019. Es la primera vez que un laboratorio retiene un modelo por seguridad; muchos lo llaman marketing. El debate abierto/cerrado empieza aquí. Ese mismo año, OpenAI crea una estructura "de beneficio limitado" para captar inversión y Microsoft invierte 1.000 millones. Musk se había ido en 2018.'),
          B.h('Enero de 2020: las leyes de escalado'),
          B.p('El paper de Kaplan (módulo 3) da a OpenAI la convicción de que escalar es una apuesta segura. <b>Dario Amodei</b>, entonces vicepresidente de investigación, es uno de los principales defensores de la "hipótesis del escalado". La decisión es gastar en un modelo 100 veces mayor que GPT-2.'),
          B.h('Mayo de 2020: GPT-3'),
          B.p('175.000 millones de parámetros, 300.000 millones de tokens, unos 4,6 millones de dólares de cómputo (y un solo entrenamiento, con un bug en los datos que ya no podían permitirse arreglar). GPT-3 hace algo nuevo: <b>aprende en contexto</b>. Sin reentrenar, con dos o tres ejemplos en el prompt, traduce, resume, programa, escribe poemas. El paper se titula "Language Models are Few-Shot Learners". Se ofrece por API (no se publican los pesos) y nacen las primeras startups sobre LLM (Jasper, Copy.ai). Para la comunidad de IA es el momento en que el escalado deja de ser una hipótesis.'),
          B.key('GPT-3 mostró que un solo modelo grande podía hacer tareas para las que antes se entrenaba un modelo por tarea. El <i>prompt</i> sustituyó al entrenamiento. Toda la profesión de "usar bien la IA" (la mitad de este curso) nace aquí.'),
          B.h('2020-2021: la salida de Anthropic'),
          B.p('A finales de 2020, Dario Amodei, su hermana Daniela y otros cinco investigadores de OpenAI (Tom Brown, primer autor de GPT-3; Jared Kaplan; Chris Olah, referente de interpretabilidad; Sam McCandlish; Jack Clark) dejan la empresa. Fundan <b>Anthropic</b> en enero de 2021 como corporación de beneficio público, con la tesis de que la seguridad debía ir por delante de la comercialización y que había que estar en la frontera para influir. Su primer producto tardará dos años.'),
          B.check('¿Cuál fue la capacidad nueva que sorprendió en GPT-3?', ['Generar imágenes', 'Aprender en contexto: hacer tareas nuevas con pocos ejemplos en el prompt, sin reentrenar', 'Hablar por voz', 'Navegar por internet'], 1, 'Few-shot learning. El prompt sustituyó al entrenamiento por tarea.'),
          B.cards([
            { icon: '📄', title: '2017', html: 'Transformer: ocho autores de Google, ninguno sigue allí.' },
            { icon: '🔀', title: '2018', html: 'BERT (entender) vs GPT (generar). Gana generar.' },
            { icon: '🔒', title: '2019', html: 'GPT-2 retenido por seguridad; Microsoft invierte.' },
            { icon: '🚀', title: '2020', html: 'GPT-3: 175B, aprende en contexto. Anthropic se separa.' }
          ])
        ],
        quiz: [
          { q: 'El paper del transformer (2017) se publicó originalmente para…', o: ['chatbots', 'traducción automática', 'reconocimiento de imágenes', 'juegos'], a: 1, why: '"Attention Is All You Need" era un paper de traducción de Google Brain.' },
          { q: 'BERT y GPT se diferencian en que…', o: ['BERT es más grande', 'BERT es un encoder bidireccional para entender; GPT es un decoder que predice la siguiente palabra y genera', 'GPT es de Google', 'No hay diferencia'], a: 1, why: 'Dos caminos en 2018. El generativo, que parecía menos prometedor, acabó dominando.' },
          { q: 'OpenAI liberó GPT-2 completo el día de su anuncio.', type: 'tf', a: false, why: 'Lo retuvo y lo liberó por etapas durante 2019 por temor a la desinformación. Primer debate abierto/cerrado.' },
          { q: 'GPT-3 tenía aproximadamente…', o: ['1.500 millones de parámetros', '17.500 millones', '175.000 millones', '1,75 billones'], a: 2, why: '175B, entrenado con 300B tokens, ~4,6 M$ de cómputo.' },
          { q: 'Anthropic fue fundada en 2021 por antiguos investigadores de…', type: 'fill', a: ['OpenAI', 'openai', 'Open AI'], why: 'Dario y Daniela Amodei con otros cinco (Brown, Kaplan, Olah, McCandlish, Clark) dejaron OpenAI a finales de 2020.' }
        ],
        cards: [
          ['¿Qué pasó con los ocho autores del transformer?', 'Ninguno sigue en Google: fundaron Character.ai, Cohere, Adept, Inceptive, Essential AI, Sakana… El paper supera las 150.000 citas.'],
          ['¿Qué fue GPT-2 y qué polémica generó (2019)?', '1,5B parámetros; escribía párrafos coherentes. OpenAI lo liberó por etapas por miedo a la desinformación: primer debate abierto vs cerrado.'],
          ['¿Qué demostró GPT-3 (2020)?', 'Aprendizaje en contexto (few-shot): con pocos ejemplos en el prompt hace tareas nuevas sin reentrenar. 175B parámetros, ofrecido por API.'],
          ['¿Quiénes fundaron Anthropic y cuándo?', 'Enero de 2021: Dario Amodei (CEO), Daniela Amodei (presidenta), Tom Brown, Jared Kaplan, Chris Olah, Sam McCandlish y Jack Clark, tras dejar OpenAI. Corporación de beneficio público.']
        ],
        resources: [
          { type: 'paper', t: 'Brown et al. (2020): Language Models are Few-Shot Learners (GPT-3)', u: 'https://arxiv.org/abs/2005.14165', lang: 'EN' },
          { type: 'article', t: 'Financial Times: los ocho autores del transformer, dónde están', u: 'https://www.ft.com/content/37bb01af-ee46-4483-982f-ef3921436a50', lang: 'EN', note: 'Reportaje visual (puede requerir registro).' },
          { type: 'article', t: 'OpenAI (2019): Better Language Models and Their Implications (GPT-2)', u: 'https://openai.com/index/better-language-models/', lang: 'EN' },
          { type: 'podcast', t: 'Lex Fridman: Dario Amodei (5 horas, 2024)', u: 'https://www.youtube.com/watch?v=ugvHCXCOmm4', lang: 'EN', min: 300, note: 'Amodei cuenta la salida de OpenAI, la hipótesis del escalado y la misión de Anthropic. Con Amanda Askell y Chris Olah.' }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'ia-4-5', title: '2021-2023: ChatGPT y la explosión', minutes: 16, level: 'intermedio',
        summary: 'Codex y Copilot, la difusión, InstructGPT, el 30 de noviembre de 2022, la carrera de 2023 (GPT-4, Claude, Llama, Gemini) y el fin de semana en que OpenAI casi se rompe.',
        body: () => [
          B.lead('GPT-3 impresionó a los expertos. ChatGPT impresionó a tu madre. La diferencia fue el post-entrenamiento y una interfaz de chat, y cambió la economía mundial en cinco días.'),
          B.h('2021: código, imágenes y una empresa nueva'),
          B.list([
            '<b>Codex y GitHub Copilot</b> (junio-octubre): GPT-3 ajustado con código. Los desarrolladores son los primeros en cambiar su forma de trabajar.',
            '<b>DALL·E y CLIP</b> (enero): texto a imagen y alineación imagen-texto. Los modelos de <b>difusión</b> (Stable Diffusion, agosto de 2022; Midjourney) los superan poco después y traen la IA generativa al gran público antes que el texto.',
            '<b>Anthropic</b> se funda (enero) y capta 124 millones; publicará su primer modelo dos años después.',
            '<b>Google</b> presenta LaMDA, un chatbot que no lanza al público por prudencia; en 2022 despedirá a un ingeniero que afirma que es consciente.'
          ]),
          B.h('2022: la receta se completa'),
          B.p('<b>InstructGPT</b> (enero): SFT + RLHF convierten a GPT-3 en un modelo que sigue instrucciones (módulo 3). <b>Chinchilla</b> (marzo) corrige la receta de escalado. <b>PaLM</b> (Google, 540B) y la cadena de pensamiento muestran razonamiento emergente. Anthropic publica la <b>IA constitucional</b> (diciembre). Y el 30 de noviembre OpenAI lanza, casi como experimento, un chat gratuito sobre GPT-3.5 llamado <b>ChatGPT</b>.'),
          B.steps('Los cinco días que lo cambiaron todo', [
            '<b>30 de noviembre de 2022.</b> OpenAI publica ChatGPT como "vista previa de investigación". El equipo espera unos miles de usuarios. Sam Altman tuitea el enlace.',
            '<b>5 de diciembre.</b> Un millón de usuarios. Instagram tardó dos meses y medio; Netflix, tres años y medio. Las capturas de conversaciones inundan Twitter: código, poemas, cartas, exámenes.',
            '<b>Enero de 2023.</b> 100 millones de usuarios mensuales, la adopción más rápida de la historia de una aplicación de consumo. Google declara un "código rojo" interno. Microsoft anuncia una inversión de 10.000 millones en OpenAI.',
            '<b>Febrero de 2023.</b> Microsoft lanza Bing Chat sobre GPT-4 (aún no anunciado); Google anuncia Bard. La carrera es pública.',
            'La lección: la tecnología ya existía desde 2020. Lo que cambió fue hacerla <b>usable</b> (chat, gratis, sin registro complejo) y <b>educada</b> (RLHF). La distribución venció a la capacidad.'
          ]),
          B.h('2023: la carrera'),
          B.table(['Fecha', 'Hito', 'Por qué importó'], [
            ['24 feb', '<b>Llama</b> (Meta) se filtra en internet una semana después de su lanzamiento restringido', 'Nace el ecosistema abierto: en semanas corre en portátiles y aparecen cientos de derivados'],
            ['14 mar', '<b>GPT-4</b> (OpenAI) y <b>Claude</b> (Anthropic), el mismo día', 'GPT-4 supera el examen de abogacía; Claude apuesta por seguridad y contexto largo (100K tokens en mayo)'],
            ['22 mar', 'Carta abierta pidiendo pausar 6 meses el entrenamiento de modelos más potentes que GPT-4', 'Firmada por Musk, Bengio y otros. Nadie pausa, pero la seguridad entra en la agenda política'],
            ['mayo', 'Hinton deja Google para hablar libremente de los riesgos', 'El "padrino" del deep learning se convierte en su principal voz de alarma'],
            ['18 jul', '<b>Llama 2</b>, abierto con licencia comercial', 'Meta apuesta por lo abierto como estrategia; Zuckerberg lo compara con Linux'],
            ['sep', '<b>Mistral 7B</b> (París) y Anthropic publica su <b>Responsible Scaling Policy</b>', 'Europa entra en la carrera; primer marco de niveles de seguridad (ASL)'],
            ['1-2 nov', 'Cumbre de Bletchley Park (Reino Unido) y orden ejecutiva de Biden', 'Primera coordinación internacional sobre seguridad de la IA frontera'],
            ['17-21 nov', 'El consejo de OpenAI despide a Altman; 700 empleados amenazan con irse a Microsoft; Altman vuelve en 5 días', 'Muestra la fragilidad de la gobernanza de la empresa más importante del sector'],
            ['6 dic', '<b>Gemini 1.0</b> (Google DeepMind, fusión de Brain y DeepMind en abril)', 'Google responde con un modelo multimodal nativo'],
            ['dic', '<b>Mixtral 8x7B</b> (Mistral): MoE abierto', 'La arquitectura MoE se populariza fuera de Google']
          ]),
          B.h('La crisis de noviembre de 2023'),
          B.p('El viernes 17 de noviembre el consejo sin ánimo de lucro de OpenAI despide a Altman por "no ser consistentemente sincero". Ilya Sutskever, cofundador y científico jefe, forma parte del consejo que lo decide. En 72 horas: Microsoft ofrece contratar a todo el equipo, más de 700 de los 770 empleados firman una carta exigiendo la vuelta de Altman, Sutskever se arrepiente públicamente, y el martes 21 Altman regresa con un consejo nuevo. Sutskever dejará OpenAI en mayo de 2024 para fundar Safe Superintelligence. El episodio expone la pregunta central de la década: <b>¿quién controla a las organizaciones que construyen la IA más potente?</b>'),
          B.key('2023 fijó el mapa: OpenAI-Microsoft, Google DeepMind, Anthropic (con Amazon y Google como inversores), Meta con lo abierto, y los primeros europeos y chinos. Y fijó los temas: seguridad, abierto vs cerrado, gobernanza. Todo lo que sigue es escalar ese mapa.'),
          B.check('¿Qué hizo diferente a ChatGPT respecto a GPT-3, que ya existía dos años antes?', ['Un modelo 100 veces mayor', 'Post-entrenamiento con RLHF (educado, sigue instrucciones) y una interfaz de chat gratuita y simple', 'Acceso a internet', 'Generación de imágenes'], 1, 'La capacidad base era similar. La usabilidad y la distribución hicieron la diferencia.'),
          B.cards([
            { icon: '💬', title: '30 nov 2022', html: 'ChatGPT: 1 M de usuarios en 5 días, 100 M en 2 meses.' },
            { icon: '🏁', title: '14 mar 2023', html: 'GPT-4 y Claude el mismo día.' },
            { icon: '🦙', title: 'Llama', html: 'La filtración crea el ecosistema abierto.' },
            { icon: '⚡', title: 'Nov 2023', html: 'Altman despedido y repuesto en 5 días.' }
          ])
        ],
        quiz: [
          { q: 'ChatGPT alcanzó 100 millones de usuarios mensuales en…', o: ['una semana', 'unos dos meses (enero de 2023)', 'un año', 'tres años'], a: 1, why: 'La adopción más rápida de una app de consumo hasta entonces.' },
          { q: 'GPT-4 y Claude 1 se lanzaron…', o: ['con un año de diferencia', 'el mismo día: 14 de marzo de 2023', 'Claude primero, en 2022', 'GPT-4 en 2024'], a: 1, why: 'Coincidencia que marcó el inicio de la carrera pública entre OpenAI y Anthropic.' },
          { q: 'La filtración de Llama (febrero de 2023) fue importante porque…', o: ['reveló los datos de entrenamiento de OpenAI', 'puso un modelo potente en manos de cualquiera y creó el ecosistema de modelos abiertos', 'demostró que los modelos no funcionaban', 'llevó a Meta a abandonar la IA'], a: 1, why: 'En semanas corría en portátiles y aparecieron cientos de derivados. Meta abrazó lo abierto con Llama 2.' },
          { q: 'En noviembre de 2023, Sam Altman fue despedido por el consejo de OpenAI y regresó cinco días después.', type: 'tf', a: true, why: 'Con más de 700 empleados amenazando con irse a Microsoft. Sutskever dejó OpenAI en 2024.' },
          { q: '¿Qué política publicó Anthropic en septiembre de 2023 con niveles de seguridad (ASL)?', type: 'fill', a: ['Responsible Scaling Policy', 'RSP', 'rsp', 'política de escalado responsable', 'politica de escalado responsable'], why: 'La Responsible Scaling Policy: el primer marco de niveles de seguridad ligados a capacidades.' }
        ],
        cards: [
          ['¿Por qué ChatGPT explotó cuando GPT-3 ya existía?', 'Porque el RLHF lo hizo educado y capaz de seguir instrucciones, y la interfaz de chat gratuita y simple lo hizo usable por cualquiera. Distribución sobre capacidad.'],
          ['Hitos de 2023', 'Llama filtrado (feb), GPT-4 y Claude (14 mar), carta de pausa (mar), Llama 2 abierto (jul), Mistral y RSP de Anthropic (sep), Bletchley (nov), crisis de OpenAI (nov), Gemini (dic).'],
          ['¿Qué pasó en OpenAI en noviembre de 2023?', 'El consejo despidió a Altman el 17; 700+ empleados amenazaron con irse a Microsoft; Altman regresó el 21 con nuevo consejo. Expuso la pregunta de quién controla a los laboratorios frontera.']
        ],
        resources: [
          { type: 'book', t: 'Karen Hao: Empire of AI (2025), la historia de OpenAI desde dentro', u: 'https://www.penguinrandomhouse.com/books/743569/empire-of-ai-by-karen-hao/', lang: 'EN', note: 'El relato más completo y crítico de OpenAI, incluida la crisis de 2023.' },
          { type: 'book', t: 'Parmy Olson: Supremacy (2024), OpenAI vs DeepMind', u: 'https://www.hachettebookgroup.com/titles/parmy-olson/supremacy/9781250337740/', lang: 'EN', note: 'Premio FT al libro de negocios del año. Altman y Hassabis en paralelo.' },
          { type: 'article', t: 'Anthropic: Introducing Claude (marzo de 2023)', u: 'https://www.anthropic.com/news/introducing-claude', lang: 'EN' },
          { type: 'article', t: 'OpenAI: Introducing ChatGPT (30 nov 2022)', u: 'https://openai.com/index/chatgpt/', lang: 'EN', note: 'El anuncio original. Fíjate en lo modesto que es.' }
        ]
      },
      /* ------------------------------------------------------------------ */
      {
        id: 'ia-4-6', title: '2024-2026: razonadores, agentes y la era Mythos', minutes: 18, level: 'intermedio',
        summary: 'Claude 3 y la multimodalidad, o1 y el razonamiento, el terremoto DeepSeek, los agentes que programan (Claude Code), Claude 4, GPT-5, Gemini 3, y 2026: Glasswing, Mythos, Fable 5.1, GPT-6.',
        body: () => [
          B.lead('Si 2023 fue la carrera por el chat, 2024-2026 es la carrera por el <b>razonamiento</b> y los <b>agentes</b>: modelos que piensan antes de responder y que trabajan solos durante horas. Es la época en la que tú construiste toda tu tecnología con Claude. Esto es lo que pasaba detrás.'),
          B.h('2024: el año de la multimodalidad y del pensamiento'),
          B.table(['Fecha', 'Hito', 'Significado'], [
            ['4 mar', '<b>Claude 3</b> (Haiku, Sonnet, Opus)', 'Anthropic alcanza y supera a GPT-4 por primera vez; visión; tres tamaños para tres precios'],
            ['abr-jul', '<b>Llama 3</b> y <b>Llama 3.1 405B</b>', 'El abierto alcanza a GPT-4. Meta: "el Linux de la IA"'],
            ['13 may', '<b>GPT-4o</b>', 'Audio, visión y texto nativos en tiempo real; voz con emoción'],
            ['20 jun', '<b>Claude 3.5 Sonnet</b> y <i>Artifacts</i>', 'El modelo favorito de los programadores; ventanas de trabajo junto al chat'],
            ['12 sep', '<b>OpenAI o1-preview</b>', 'Primer modelo razonador: piensa antes de responder. Nueva palanca de escalado (módulo 2)'],
            ['22 oct', 'Claude 3.5 Sonnet (nuevo) con <b>computer use</b>', 'Un modelo que maneja un ordenador viendo la pantalla. Empieza la era agéntica'],
            ['dic', 'Premio Nobel de Física a <b>Hinton</b> (y Hopfield) y de Química a <b>Hassabis</b> y Jumper (AlphaFold)', 'La academia reconoce el deep learning al máximo nivel'],
            ['dic', '<b>Gemini 2.0</b>, <b>o3</b> anunciado (ARC-AGI 87 %), <b>DeepSeek V3</b> (671B MoE, ~5,6 M$)', 'Fin de año frenético; China entra en la frontera con costes ridículos']
          ]),
          B.h('Enero de 2025: el terremoto DeepSeek'),
          B.p('El 20 de enero, DeepSeek publica <b>R1</b>: un razonador comparable a o1, con pesos abiertos bajo licencia MIT, un paper que explica la receta (RLVR con GRPO) y una API 27 veces más barata que la de OpenAI. Su app llega al número uno de la App Store en EE. UU. El lunes 27, Nvidia pierde cerca de 600.000 millones de dólares de capitalización en un día, la mayor caída de una empresa en la historia. El mercado teme que la IA barata destruya la demanda de chips. Ocurre lo contrario (paradoja de Jevons): la IA barata multiplica el uso. Pero R1 cambió tres cosas para siempre: el razonamiento dejó de ser un secreto, China demostró estar a meses y no a años, y los controles de exportación de chips pasaron al centro de la geopolítica.'),
          B.h('2025: de asistentes a agentes'),
          B.table(['Fecha', 'Hito', 'Significado'], [
            ['24 feb', '<b>Claude 3.7 Sonnet</b> con pensamiento extendido y <b>Claude Code</b> (vista previa)', 'Nace la herramienta con la que construiste RRB: un agente en la terminal'],
            ['27 feb', '<b>GPT-4.5</b>', 'El último gran modelo "solo escalado"; caro y modesto. Señal de que el preentrenamiento solo ya no basta'],
            ['mar-abr', '<b>Gemini 2.5 Pro</b>, <b>Llama 4</b> (decepciona), <b>o3</b> y <b>o4-mini</b>', 'Google recupera el liderazgo en varios benchmarks; Meta tropieza'],
            ['22 may', '<b>Claude Opus 4</b> y <b>Sonnet 4</b>; Claude Code general; primer modelo bajo <b>ASL-3</b>', 'Agentes que programan durante horas. Anthropic activa protecciones de nivel 3 por riesgo biológico'],
            ['jul', '<b>Grok 4</b> (xAI), <b>Kimi K2</b> (Moonshot, 1T abierto), medallas de oro en la IMO para modelos de OpenAI y DeepMind', 'xAI entra en la frontera; China insiste en lo abierto; matemáticas olímpicas resueltas'],
            ['7 ago', '<b>GPT-5</b>; <b>gpt-oss</b> (primeros pesos abiertos de OpenAI desde GPT-2)', 'Un solo sistema con router entre respuesta rápida y razonamiento. Recepción tibia: el salto es menor que GPT-3→4'],
            ['29 sep', '<b>Claude Sonnet 4.5</b> y el <b>Agent SDK</b>', 'El motor de Claude Code como librería: el camino natural para agentes como Maya'],
            ['oct-nov', '<b>Haiku 4.5</b>, <b>Gemini 3</b> (18 nov), <b>Claude Opus 4.5</b> (24 nov), GPT-5.1', 'Cadencia de semanas entre modelos frontera'],
            ['nov', 'Anthropic revela una campaña de <b>ciberespionaje orquestada por IA</b> (grupo estatal chino usando Claude Code)', 'Primer caso documentado de ataque mayoritariamente autónomo'],
            ['2025', 'Anthropic supera los 5.000 millones de ingresos anualizados; valoración de 183.000 millones (sep); acuerdos de cómputo con Google (hasta 1 M de TPU), Amazon (Rainier) y Microsoft/Nvidia', 'El código y los agentes empresariales son el negocio']
          ]),
          B.h('2026: la frontera se vuelve peligrosa, y se gestiona'),
          B.steps('El año en curso, hito a hito', [
            '<b>21 de enero.</b> Anthropic publica la nueva <b>constitución de Claude</b> (módulo 3). Días después, Dario Amodei publica el ensayo <i>The Adolescence of Technology</i>: la humanidad como adolescente al que le dan las llaves de un superdeportivo.',
            '<b>Febrero.</b> Claude Opus 4.6 y Sonnet 4.6 (pensamiento adaptativo); GPT-5.3-Codex; Anthropic publica la <b>RSP v3</b> con hojas de ruta de seguridad e informes de riesgo públicos. Empieza la aplicación de las obligaciones del AI Act europeo para modelos de propósito general.',
            '<b>Marzo.</b> GPT-5.4. La memoria de Claude llega a todos los usuarios. Claude Cowork (agente de escritorio) y Claude en Chrome se consolidan.',
            '<b>7 de abril: Project Glasswing.</b> Anthropic entrena <b>Claude Mythos Preview</b>, su modelo más potente, y decide <b>no publicarlo</b>: encuentra vulnerabilidades de día cero de forma autónoma en todos los sistemas operativos y navegadores principales (incluida una de 17 años en FreeBSD que explotó sola). Lo ofrece solo a una coalición de más de 40 organizaciones (Apple, Google, Microsoft, Amazon, CrowdStrike, Nvidia, JPMorgan…) para arreglar software crítico antes de que lo usen atacantes. En mayo reporta más de 10.000 vulnerabilidades de severidad alta o crítica encontradas.',
            '<b>8 de abril.</b> Anthropic lanza <b>Claude Managed Agents</b> (agentes alojados). Meta lanza <b>Llama 5</b> junto con <b>Muse Spark</b>, su primer modelo propietario: el campeón de lo abierto se vuelve mixto. Opus 4.7 (abril) y Opus 4.8 (28 de mayo). DeepSeek V4 (24 abr): 1,6T MoE abierto con 1 M de contexto.',
            '<b>Junio-julio.</b> <b>Claude Fable 5</b> y <b>Mythos 5</b> inauguran la clase Mythos por encima de Opus: mismo modelo, Fable con clasificadores de seguridad para todos, Mythos sin ellos para organizaciones verificadas. Sonnet 5 (30 jun) y Opus 5 (24 jul). GPT-5.6 (9 jul). Grok 4.5 (8 jul, 1,5T MoE para agentes). DeepSeek V4-Flash oficial (31 jul).',
            '<b>Agosto-septiembre.</b> Grok 4.6; DeepSeek V4-Pro; Gemini 3.6/3.7/3.8 Flash (Google prioriza eficiencia); <b>Claude Fable 5.1 y Mythos 5.1</b> (2 de septiembre: 52,6 % en Terminal-Bench-Science, caché al 25 % del precio); <b>GPT-6 Astra</b> (3 de septiembre). Grok 5 (6T rumoreados) sigue en entrenamiento. Es hoy.'
          ]),
          B.key('Tres tendencias resumen 2024-2026: (1) el <b>razonamiento</b> como segunda palanca de escalado; (2) los <b>agentes</b> que trabajan horas con herramientas, empezando por el código; (3) la capacidad se ha vuelto lo bastante peligrosa (ciberseguridad, biología) como para que un laboratorio retenga su mejor modelo. La gobernanza dejó de ser teoría.'),
          B.h('Qué significa para ti'),
          B.p('Construiste RRB con Claude 3.7, Claude 4 y Claude 4.5 mientras esta historia ocurría. Cada salto (pensamiento extendido, Claude Code, Agent SDK, memoria, Cowork, Managed Agents) es una herramienta más en tu mesa. El manual de Claude de este curso es, literalmente, el catálogo de lo que estos tres años pusieron a tu alcance.'),
          B.check('¿Por qué Anthropic no publicó Claude Mythos Preview en abril de 2026?', ['Porque no funcionaba', 'Porque encontraba y explotaba vulnerabilidades de día cero de forma autónoma; lo limitó a una coalición defensiva (Project Glasswing)', 'Porque era demasiado caro', 'Porque el gobierno lo prohibió'], 1, 'Primer caso de un laboratorio reteniendo su mejor modelo por capacidad ofensiva. Más de 10.000 vulnerabilidades encontradas en semanas.'),
          B.cards([
            { icon: '🧠', title: 'Sep 2024: o1', html: 'Los modelos empiezan a pensar.' },
            { icon: '🌊', title: 'Ene 2025: R1', html: 'Razonamiento abierto y barato; Nvidia −600.000 M$ en un día.' },
            { icon: '🤖', title: '2025: agentes', html: 'Claude Code, computer use, Agent SDK.' },
            { icon: '🛡️', title: 'Abr 2026: Glasswing', html: 'Mythos retenido; 10.000+ vulnerabilidades arregladas.' },
            { icon: '🚀', title: 'Sep 2026', html: 'Fable 5.1, GPT-6 Astra. Hoy.' }
          ])
        ],
        quiz: [
          { q: '¿Qué tres cosas cambió DeepSeek R1 (enero de 2025)?', type: 'multi', o: ['El razonamiento dejó de ser un secreto de OpenAI', 'China demostró estar a meses, no años, de la frontera', 'Los controles de exportación de chips pasaron al centro geopolítico', 'Nvidia quebró'], a: [0, 1, 2], why: 'Nvidia cayó ~600.000 M$ en un día pero se recuperó: la IA barata aumentó la demanda (paradoja de Jevons).' },
          { q: 'Claude Code se presentó por primera vez…', o: ['en 2023 con Claude 2', 'el 24 de febrero de 2025 junto a Claude 3.7 Sonnet', 'en 2026 con Fable 5', 'nunca, es un producto de terceros'], a: 1, why: 'Vista previa en febrero de 2025; disponibilidad general en mayo con Claude 4.' },
          { q: 'Claude Fable 5 y Claude Mythos 5 son…', o: ['dos modelos de distinto tamaño', 'el mismo modelo: Fable con clasificadores de seguridad para todos, Mythos sin ellos para organizaciones verificadas', 'Fable es de texto y Mythos de imagen', 'modelos de OpenAI'], a: 1, why: 'Clase Mythos por encima de Opus. Mythos solo vía programas de acceso verificado (Glasswing, CVP, LSVP).' },
          { q: 'Meta lanzó en abril de 2026 su primer modelo propietario (Muse Spark) junto a Llama 5.', type: 'tf', a: true, why: 'El campeón de lo abierto adoptó una estrategia mixta tras la reorganización en Meta Superintelligence Labs.' },
          { q: 'El primer modelo de Anthropic desplegado bajo el nivel de seguridad ASL-3 fue…', type: 'fill', a: ['Claude Opus 4', 'Opus 4', 'claude opus 4'], why: 'Claude Opus 4, mayo de 2025, por su capacidad potencial de ayudar en riesgos biológicos.' },
          { q: '¿Qué caída bursátil histórica provocó la salida de DeepSeek R1?', o: ['Apple perdió 100.000 M$', 'Nvidia perdió cerca de 600.000 M$ en un día', 'Microsoft quebró', 'Ninguna'], a: 1, why: 'La mayor pérdida de valor de una empresa en un día. El mercado temió que la IA barata redujera la demanda de chips.' }
        ],
        cards: [
          ['¿Qué pasó el 20-27 de enero de 2025?', 'DeepSeek publicó R1 (razonador abierto, MIT, receta pública, API 27× más barata). Nvidia perdió ~600.000 M$ en un día. El razonamiento dejó de ser un secreto.'],
          ['Hitos agénticos de 2025', 'Claude Code (feb, GA en mayo), computer use maduro, Claude 4 (may), Agent SDK (sep), Opus 4.5 (nov). Los agentes que programan durante horas se vuelven el negocio.'],
          ['¿Qué es Project Glasswing (abril 2026)?', 'Coalición de 40+ organizaciones con acceso exclusivo a Claude Mythos Preview, retenido del público por su capacidad de encontrar y explotar vulnerabilidades. 10.000+ fallos críticos hallados en semanas.'],
          ['Modelos frontera de 2026 (a septiembre)', 'Anthropic: Opus 4.6/4.7/4.8, Fable 5/Mythos 5 (jun), Sonnet 5, Opus 5, Fable 5.1/Mythos 5.1 (sep). OpenAI: GPT-5.3-Codex, 5.4, 5.6, GPT-6 Astra (sep). Google: Gemini 3.x Flash. DeepSeek V4. Grok 4.5/4.6. Llama 5 + Muse Spark.'],
          ['¿Qué distingue a Fable 5 de Mythos 5?', 'Mismo modelo. Fable incluye clasificadores de seguridad y es de acceso general; Mythos no los incluye y solo se ofrece a organizaciones verificadas (ciberseguridad, ciencias de la vida).']
        ],
        resources: [
          { type: 'article', t: 'Anthropic: Project Glasswing, an initial update', u: 'https://www.anthropic.com/research/glasswing-initial-update', lang: 'EN', note: 'Las cifras de vulnerabilidades y cómo funciona la coalición.' },
          { type: 'article', t: 'Anthropic: Introducing Claude Fable 5.1 and Claude Mythos 5.1', u: 'https://www.anthropic.com/claude-fable-and-mythos-5-1', lang: 'EN' },
          { type: 'article', t: 'Dario Amodei: The Adolescence of Technology (enero 2026)', u: 'https://darioamodei.com/essay/the-adolescence-of-technology', lang: 'EN', note: 'El ensayo que enmarca 2026: riesgos concretos y un plan.' },
          { type: 'article', t: 'Anthropic: Disrupting the first reported AI-orchestrated cyber espionage campaign', u: 'https://www.anthropic.com/news/disrupting-AI-espionage', lang: 'EN' },
          { type: 'article', t: 'State of AI Report (anual, Nathan Benaich)', u: 'https://www.stateof.ai/', lang: 'EN', note: 'El resumen anual más citado del sector. Léelo cada octubre.' },
          { type: 'article', t: 'Stanford AI Index (anual)', u: 'https://aiindex.stanford.edu/', lang: 'EN', note: 'Datos: inversión, adopción, regulación, benchmarks. Con gráficos citables.' }
        ]
      }
    ]
  };
})();
