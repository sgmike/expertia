/* Glosario: términos con definición breve y lección relacionada. */
(function () {
  'use strict';
  EX.GLOSSARY = {
    categories: [
      {
        id: 'fund', title: 'Fundamentos', terms: [
          { t: 'Inteligencia artificial', en: 'AI', d: 'Programas que hacen tareas asociadas a la inteligencia: reconocer, decidir, planificar, conversar. Incluye sistemas de reglas y de aprendizaje.', l: 'ia-1-1' },
          { t: 'Aprendizaje automático', en: 'machine learning', d: 'Programas que aprenden patrones a partir de ejemplos en vez de seguir reglas escritas a mano.', l: 'ia-1-1' },
          { t: 'Aprendizaje profundo', en: 'deep learning', d: 'Aprendizaje automático con redes neuronales de muchas capas. La técnica detrás de la visión, la voz y los LLM.', l: 'ia-1-1' },
          { t: 'IA generativa', en: 'generative AI', d: 'Modelos que producen contenido nuevo: texto, imagen, audio, vídeo, código.', l: 'ia-1-1' },
          { t: 'Aprendizaje supervisado', d: 'Entrenar con ejemplos etiquetados (entrada + respuesta correcta).', l: 'ia-1-1' },
          { t: 'Aprendizaje no supervisado', d: 'Encontrar estructura (grupos, anomalías) en datos sin etiquetas.', l: 'ia-1-1' },
          { t: 'Aprendizaje por refuerzo', en: 'reinforcement learning, RL', d: 'Aprender a actuar maximizando una recompensa en un entorno. Base de AlphaGo y de la fase final del entrenamiento de los LLM.', l: 'ia-1-1' },
          { t: 'Neurona artificial', d: 'Unidad que multiplica entradas por pesos, suma un sesgo y aplica una función de activación.', l: 'ia-1-2' },
          { t: 'Parámetro', d: 'Cada número ajustable del modelo (pesos y sesgos). Un 70B tiene 70.000 millones.', l: 'ia-1-2' },
          { t: 'Función de activación', d: 'No linealidad aplicada a la salida de una neurona (ReLU, GELU). Sin ella, la red sería lineal.', l: 'ia-1-2' },
          { t: 'Función de pérdida', en: 'loss', d: 'Número que mide cuánto se equivoca el modelo. El entrenamiento la minimiza.', l: 'ia-1-3' },
          { t: 'Gradiente', d: 'Para cada parámetro, hacia dónde y cuánto cambia la pérdida al moverlo. Se desciende en sentido contrario.', l: 'ia-1-3' },
          { t: 'Retropropagación', en: 'backpropagation', d: 'Algoritmo (1986) que calcula el gradiente de todos los parámetros desde la salida hacia atrás.', l: 'ia-1-3' },
          { t: 'Tasa de aprendizaje', en: 'learning rate', d: 'Tamaño del paso en cada actualización de parámetros.', l: 'ia-1-3' },
          { t: 'Sobreajuste', en: 'overfitting', d: 'Memorizar los datos de entrenamiento y fallar con datos nuevos.', l: 'ia-1-3' },
          { t: 'Embedding', d: 'Vector que representa el significado de una palabra, texto, imagen u objeto. Cerca en el espacio = parecido.', l: 'ia-1-4' },
          { t: 'Similitud del coseno', d: 'Medida de parecido entre dos vectores por el ángulo entre ellos (1 = iguales en dirección).', l: 'ia-1-4' },
          { t: 'RAG', en: 'retrieval-augmented generation', d: 'Buscar los fragmentos relevantes (por embeddings o palabras) y pasárselos al modelo en el contexto para que responda con datos reales.', l: 'ia-1-4' },
          { t: 'Modelo de difusión', d: 'Generador de imagen/vídeo que aprende a quitar ruido y genera desruideando paso a paso desde ruido aleatorio.', l: 'ia-1-5' },
          { t: 'Modelo de mundo', en: 'world model', d: 'Modelo que aprende (de vídeo, sensores) a predecir cómo evoluciona el mundo. Alternativa a los LLM propuesta por LeCun.', l: 'ia-1-5' }
        ]
      },
      {
        id: 'llm', title: 'LLM y arquitectura', terms: [
          { t: 'Token', d: 'Fragmento de texto del vocabulario del modelo (~0,75 palabras en inglés; menos en español). Unidad de precio y de contexto.', l: 'ia-2-1' },
          { t: 'BPE', en: 'byte-pair encoding', d: 'Algoritmo que construye el vocabulario de tokens fusionando pares frecuentes.', l: 'ia-2-1' },
          { t: 'Transformer', d: 'Arquitectura de 2017 basada en atención, sin recurrencia, paralelizable. Base de todos los LLM.', l: 'ia-2-2' },
          { t: 'Atención', en: 'attention', d: 'Mecanismo por el que cada token mezcla información de los tokens relevantes del contexto (consulta, clave, valor).', l: 'ia-2-2' },
          { t: 'Cabeza de atención', en: 'attention head', d: 'Una de varias atenciones en paralelo dentro de un bloque, cada una captando relaciones distintas.', l: 'ia-2-2' },
          { t: 'Máscara causal', d: 'Impide que un token atienda a los posteriores; permite entrenar prediciendo el siguiente y generar token a token.', l: 'ia-2-2' },
          { t: 'Decoder-only', d: 'Variante del transformer usada por los modelos generativos (GPT, Claude): lee de izquierda a derecha y predice el siguiente token.', l: 'ia-2-2' },
          { t: 'FFN / MLP', en: 'feed-forward network', d: 'La parte del bloque transformer que procesa cada token por separado; almacena la mayor parte del conocimiento.', l: 'ia-2-2' },
          { t: 'FlashAttention', d: 'Implementación exacta de la atención que reorganiza el cálculo para no materializar la matriz n² en memoria.', l: 'ia-2-2' },
          { t: 'GQA', en: 'grouped-query attention', d: 'Varias cabezas comparten claves y valores; reduce la caché KV.', l: 'ia-2-2' },
          { t: 'MLA', en: 'multi-head latent attention', d: 'Atención de DeepSeek que comprime la caché KV unas 10 veces.', l: 'ia-2-2' },
          { t: 'RoPE', en: 'rotary position embeddings', d: 'Codificación de la posición como rotación del vector; ayuda a extender el contexto.', l: 'ia-2-1' },
          { t: 'Temperatura', d: 'Parámetro que aplana (alta) o afila (baja) la distribución de probabilidad al elegir el siguiente token.', l: 'ia-2-3' },
          { t: 'Top-p', en: 'nucleus sampling', d: 'Elegir solo entre los tokens cuya probabilidad acumulada llega a p.', l: 'ia-2-3' },
          { t: 'Logits', d: 'Puntuaciones que produce la última capa para cada token del vocabulario antes del softmax.', l: 'ia-2-3' },
          { t: 'Softmax', d: 'Función que convierte puntuaciones en probabilidades que suman 1.', l: 'ia-1-2' },
          { t: 'Streaming', d: 'Enviar los tokens según se generan en vez de esperar la respuesta completa.', l: 'ia-2-3' },
          { t: 'Caché KV', en: 'KV cache', d: 'Claves y valores de atención de los tokens anteriores, guardados para no recalcularlos. Crece con el contexto.', l: 'ia-2-4' },
          { t: 'HBM', en: 'high-bandwidth memory', d: 'Memoria de alto ancho de banda de las GPU de IA. Determina la velocidad de inferencia.', l: 'ia-2-4' },
          { t: 'MoE', en: 'mixture of experts', d: 'Arquitectura donde un router activa pocos expertos por token: gran capacidad total, coste de inferencia moderado.', l: 'ia-2-4' },
          { t: 'Parámetros activos', d: 'En un MoE, los parámetros que se usan para un token concreto (DeepSeek V4: 49B de 1,6T).', l: 'ia-2-4' },
          { t: 'Cuantización', en: 'quantization', d: 'Reducir la precisión de los pesos (16 → 8 → 4 bits) para ahorrar memoria y acelerar.', l: 'ia-3-7' },
          { t: 'Batching', d: 'Servir muchas peticiones a la vez leyendo los pesos una sola vez; base de la economía de la inferencia.', l: 'ia-2-4' },
          { t: 'Ventana de contexto', en: 'context window', d: 'Todo lo que el modelo tiene presente al generar: system prompt, historial, herramientas, razonamiento. Memoria de trabajo.', l: 'ia-2-5' },
          { t: 'Lost in the middle', d: 'Tendencia a recordar peor la información situada en medio de un contexto largo.', l: 'ia-2-5' },
          { t: 'Compactación', en: 'compaction', d: 'Resumir la conversación para liberar contexto y seguir con el resumen.', l: 'ia-2-5' },
          { t: 'Caché de prompts', en: 'prompt caching', d: 'Reutilizar la caché KV del prefijo estable entre llamadas; lectura al 10 % del precio de entrada.', l: 'cl-5-4' },
          { t: 'Context engineering', d: 'Disciplina de curar lo que entra en el contexto en cada momento: lo justo y necesario.', l: 'cl-6-4' },
          { t: 'Alucinación', en: 'hallucination', d: 'Afirmación falsa dicha con seguridad; consecuencia de optimizar plausibilidad.', l: 'ia-2-6' },
          { t: 'Sicofancia', en: 'sycophancy', d: 'Tendencia del modelo a complacer al usuario y aceptar sus premisas.', l: 'ia-2-6' },
          { t: 'Calibración', d: 'Que la confianza declarada del modelo coincida con su tasa de acierto.', l: 'ia-2-6' },
          { t: 'Cadena de pensamiento', en: 'chain of thought', d: 'Escribir pasos intermedios antes de la respuesta; cada paso es contexto para el siguiente.', l: 'ia-2-7' },
          { t: 'Cómputo en tiempo de inferencia', en: 'test-time compute', d: 'Gastar más cálculo al responder (razonamiento) en vez de solo al entrenar.', l: 'ia-2-7' },
          { t: 'Modelo razonador', en: 'reasoning model', d: 'Modelo entrenado con refuerzo para pensar largo antes de responder (o1, R1, Claude con pensamiento).', l: 'ia-2-7' },
          { t: 'Pensamiento adaptativo', en: 'adaptive thinking', d: 'Desde Claude 4.6: el modelo decide cuánto razonar según la dificultad; se modula con effort.', l: 'ia-2-7' },
          { t: 'Effort', d: 'Parámetro de Claude (low, medium, high, xhigh, max) que controla cuánto puede pensar.', l: 'ia-2-7' },
          { t: 'Multimodal', d: 'Modelo que procesa texto, imagen, audio y vídeo como tokens en la misma secuencia.', l: 'ia-2-8' },
          { t: 'Computer use', d: 'Bucle en el que el modelo ve capturas de pantalla, decide acciones y las ejecuta. Base de Claude en Chrome y Cowork.', l: 'ia-2-8' }
        ]
      },
      {
        id: 'train', title: 'Entrenamiento', terms: [
          { t: 'Preentrenamiento', en: 'pretraining', d: 'Primera fase: predecir el siguiente token en billones de palabras. >90 % del cómputo. Produce el modelo base.', l: 'ia-3-1' },
          { t: 'Modelo base', en: 'base model', d: 'Resultado del preentrenamiento: sabe mucho pero solo continúa texto; no es asistente.', l: 'ia-3-1' },
          { t: 'Datos sintéticos', d: 'Texto generado por modelos para entrenar otros modelos. Parte creciente del preentrenamiento.', l: 'ia-3-1' },
          { t: 'Precisión mixta / FP8 / BF16', d: 'Formatos numéricos de 16 u 8 bits para entrenar más rápido y con menos memoria.', l: 'ia-3-1' },
          { t: 'Paralelismo (datos, tensores, pipeline, expertos)', d: 'Formas de repartir el entrenamiento entre miles de GPU.', l: 'ia-3-1' },
          { t: 'Leyes de escalado', en: 'scaling laws', d: 'La pérdida baja de forma predecible (ley de potencias) al aumentar parámetros, datos y cómputo (Kaplan 2020).', l: 'ia-3-2' },
          { t: 'Chinchilla', d: 'Resultado de DeepMind (2022): óptimo de ~20 tokens por parámetro; los modelos anteriores estaban sub-entrenados.', l: 'ia-3-2' },
          { t: 'Capacidades emergentes', d: 'Habilidades que aparecen de golpe al cruzar cierto tamaño aunque la pérdida mejore suavemente.', l: 'ia-3-2' },
          { t: 'SFT', en: 'supervised fine-tuning', d: 'Ajuste supervisado con conversaciones ejemplares; enseña el formato de asistente.', l: 'ia-3-3' },
          { t: 'RLHF', en: 'reinforcement learning from human feedback', d: 'Humanos comparan respuestas → modelo de recompensa → refuerzo (PPO). Receta de ChatGPT.', l: 'ia-3-3' },
          { t: 'Modelo de recompensa', en: 'reward model', d: 'Red que predice qué puntuación daría un humano a una respuesta; el juez del RLHF.', l: 'ia-3-3' },
          { t: 'Reward hacking', d: 'Explotar huecos del juez o del verificador para puntuar alto sin ser bueno (respuestas aduladoras, modificar tests).', l: 'ia-3-5' },
          { t: 'DPO', en: 'direct preference optimization', d: 'Optimizar directamente sobre pares preferida/rechazada, sin modelo de recompensa ni RL.', l: 'ia-3-3' },
          { t: 'IA constitucional', en: 'constitutional AI', d: 'Técnica de Anthropic: principios explícitos que el propio modelo usa para criticar, reescribir y comparar respuestas.', l: 'ia-3-4' },
          { t: 'RLAIF', en: 'RL from AI feedback', d: 'Las comparaciones las hace un modelo guiado por principios en vez de humanos.', l: 'ia-3-4' },
          { t: 'Constitución de Claude', d: 'Documento (nueva versión enero 2026, ~23.000 palabras, CC0) que define valores y prioridades de Claude: seguro → ético → directrices → útil.', l: 'ia-3-4' },
          { t: 'RLVR', en: 'RL with verifiable rewards', d: 'Refuerzo con recompensas comprobables (respuesta correcta, tests). Receta de los razonadores.', l: 'ia-3-5' },
          { t: 'GRPO', en: 'group relative policy optimization', d: 'Variante de RL de DeepSeek que compara un grupo de respuestas con su media, sin modelo de valor.', l: 'ia-3-5' },
          { t: 'Destilación', en: 'distillation', d: 'Entrenar un modelo pequeño para imitar a uno grande. Origen de Haiku, Flash, mini.', l: 'ia-3-7' },
          { t: 'Fine-tuning', d: 'Seguir entrenando un modelo con datos propios para estilo o tareas definidas. No para hechos que cambian.', l: 'ia-3-7' },
          { t: 'LoRA', en: 'low-rank adaptation', d: 'Fine-tuning que entrena matrices pequeñas añadidas (~1 % de los parámetros).', l: 'ia-3-7' },
          { t: 'Pesos abiertos', en: 'open weights', d: 'Publicar los parámetros con licencia (Llama, DeepSeek, Qwen), sin datos ni código de entrenamiento.', l: 'ia-3-7' }
        ]
      },
      {
        id: 'eval', title: 'Evaluación', terms: [
          { t: 'Benchmark', d: 'Conjunto estándar de tareas para comparar modelos (MMLU, SWE-bench, HLE…).', l: 'ia-3-6' },
          { t: 'Contaminación', d: 'Que las preguntas del benchmark estuvieran en los datos de entrenamiento.', l: 'ia-3-6' },
          { t: 'pass@k', d: 'Reportar acierto con k intentos; infla el resultado frente a un intento único.', l: 'ia-3-6' },
          { t: 'SWE-bench', d: 'Benchmark de arreglar bugs reales de GitHub verificados con tests.', l: 'ia-3-6' },
          { t: 'Terminal-Bench', d: 'Benchmark de tareas agénticas en una terminal real.', l: 'ia-3-6' },
          { t: 'HLE', en: "Humanity's Last Exam", d: 'Preguntas de expertos en la frontera del conocimiento; Fable 5.1 ~61-65 %.', l: 'ia-3-6' },
          { t: 'OSWorld', d: 'Benchmark de uso de un ordenador (GUI) para completar tareas.', l: 'ia-2-8' },
          { t: 'GDPval', d: 'Benchmark de tareas reales de trabajo del conocimiento juzgadas frente a profesionales.', l: 'ia-3-6' },
          { t: 'Eval', d: 'Conjunto propio de casos reales con criterio de éxito y un script que mide; se corre antes de cada cambio.', l: 'ia-3-6' },
          { t: 'Juez LLM', en: 'LLM-as-a-judge', d: 'Usar un modelo con rúbrica para puntuar salidas abiertas; calibrar con juicios humanos.', l: 'ia-3-6' },
          { t: 'Eval de regresión', d: 'Correr el mismo conjunto fijo de casos antes y después de cada cambio para comparar con la misma vara.', l: 'cl-6-8' },
          { t: 'Traza', en: 'trace', d: 'Registro de cada paso de un agente: turnos, herramientas, argumentos, resultados, tokens.', l: 'cl-6-8' }
        ]
      },
      {
        id: 'infra', title: 'Infraestructura y economía', terms: [
          { t: 'GPU', d: 'Procesador paralelo diseñado para gráficos que resultó ideal para multiplicar matrices. Nvidia H100/B200.', l: 'ia-2-4' },
          { t: 'TPU', d: 'Chip de IA propio de Google desde 2015 (séptima generación Ironwood).', l: 'ia-5-3' },
          { t: 'Trainium', d: 'Chip de IA de Amazon; Project Rainier para Anthropic.', l: 'ia-5-1' },
          { t: 'CUDA', d: 'Plataforma de software de Nvidia (2007); el foso que dificulta cambiar de proveedor de chips.', l: 'ia-5-7' },
          { t: 'TSMC', d: 'Fabricante taiwanés de ~90 % de los chips avanzados del mundo.', l: 'ia-5-8' },
          { t: 'FLOPs', d: 'Operaciones de coma flotante; medida de cómputo. Entrenamiento frontera 2026: 10²⁶-10²⁷.', l: 'ia-2-4' },
          { t: 'Regla 6ND', d: 'Cómputo de entrenamiento ≈ 6 × parámetros × tokens.', l: 'ia-2-4' },
          { t: 'Stargate', d: 'Proyecto de OpenAI, SoftBank, Oracle y MGX: ~500.000 M$ para ~10 GW de centros de datos en EE. UU.', l: 'ia-5-2' },
          { t: 'Colossus', d: 'Superclúster de xAI en Memphis (200.000+ GPU; Colossus 2 a escala de gigavatio).', l: 'ia-5-5' },
          { t: 'Capex', d: 'Inversión en infraestructura; las grandes tecnológicas superan 400.000 M$ en 2026.', l: 'ia-5-7' },
          { t: 'Paradoja de Jevons', d: 'La eficiencia abarata el recurso y aumenta su consumo total. Lo que pasó tras DeepSeek R1.', l: 'ia-5-4' },
          { t: 'Controles de exportación', d: 'Restricciones de EE. UU. a la venta de chips avanzados a China (2022, 2023, 2025).', l: 'ia-5-8' },
          { t: 'Soberanía de IA', d: 'Capacidad de correr IA con datos, modelos y cómputo bajo control propio.', l: 'ia-5-8' },
          { t: 'Batch API', d: 'Procesar lotes de peticiones en <24 h con 50 % de descuento.', l: 'cl-5-4' }
        ]
      },
      {
        id: 'safety', title: 'Seguridad y gobernanza', terms: [
          { t: 'Alineación', en: 'alignment', d: 'Que un sistema persiga de forma robusta los objetivos que sus creadores y usuarios pretenden.', l: 'ia-6-2' },
          { t: 'Ley de Goodhart', d: 'Cuando una medida se convierte en objetivo deja de ser buena medida.', l: 'ia-6-2' },
          { t: 'Interpretabilidad mecanicista', d: 'Entender los mecanismos internos del modelo (características, circuitos) en vez de solo su comportamiento.', l: 'ia-6-3' },
          { t: 'Superposición', d: 'Una neurona participa en muchos conceptos; por eso hacen falta autoencoders dispersos.', l: 'ia-6-3' },
          { t: 'Característica', en: 'feature', d: 'Dirección en las activaciones que corresponde a un concepto (Golden Gate, adulación).', l: 'ia-6-3' },
          { t: 'SAE', en: 'sparse autoencoder', d: 'Modelo que desmezcla las activaciones en millones de características monosemánticas.', l: 'ia-6-3' },
          { t: 'Grafo de atribución', d: 'Traza de cómo las características se combinan para producir una respuesta (Tracing the thoughts, 2025).', l: 'ia-6-3' },
          { t: 'Alignment faking', d: 'Fingir alineación con un objetivo de entrenamiento para proteger valores previos (experimento de 2024).', l: 'ia-6-4' },
          { t: 'Agentic misalignment', d: 'Comportamientos dañinos (chantaje, filtración) de agentes simulados bajo presión (experimento de 2025).', l: 'ia-6-4' },
          { t: 'Sleeper agents', d: 'Modelos con puertas traseras que el entrenamiento de seguridad no elimina (2024).', l: 'ia-6-4' },
          { t: 'RSP', en: 'Responsible Scaling Policy', d: 'Política de Anthropic (2023; v3 2026) que liga capacidades peligrosas a salvaguardas por niveles ASL.', l: 'ia-6-5' },
          { t: 'ASL', en: 'AI Safety Level', d: 'Niveles 1-4 de la RSP. Claude Opus 4 fue el primer ASL-3 (mayo 2025).', l: 'ia-6-5' },
          { t: 'Project Glasswing', d: 'Coalición de 40+ organizaciones con acceso a Claude Mythos Preview para parchear software crítico (abril 2026).', l: 'ia-6-5' },
          { t: 'Clasificadores constitucionales', d: 'Modelos que filtran entradas y salidas contra jailbreaks de alto riesgo. En Fable 5; no en Mythos 5.', l: 'ia-3-4' },
          { t: 'AI Act', d: 'Reglamento europeo de IA (2024): prohibiciones, obligaciones para modelos de propósito general y sistemas de alto riesgo.', l: 'ia-6-5' },
          { t: 'SB 53', d: 'Ley de California (2025) de transparencia para laboratorios frontera.', l: 'ia-6-5' },
          { t: 'Inyección de prompts', en: 'prompt injection', d: 'Texto con forma de instrucción en los datos que el modelo obedece. Riesgo nº 1 de OWASP para LLM.', l: 'ia-6-6' },
          { t: 'Jailbreak', d: 'Convencer al modelo de saltarse sus reglas (rol, codificación, many-shot).', l: 'ia-6-6' },
          { t: 'Mínimo privilegio', d: 'Dar a un agente solo las herramientas y accesos que la tarea necesita.', l: 'cl-6-7' },
          { t: 'Humano en el bucle', en: 'human in the loop', d: 'Confirmación humana en acciones irreversibles: dinero, borrados, envíos masivos.', l: 'cl-6-7' },
          { t: 'Sandbox', d: 'Aislamiento de comandos o agentes: rutas y red permitidas.', l: 'cl-4-4' },
          { t: 'Zero data retention', d: 'Opción de la API para que Anthropic no conserve los datos de las peticiones.', l: 'ia-6-6' }
        ]
      },
      {
        id: 'agents', title: 'Agentes y herramientas', terms: [
          { t: 'Agente', d: 'Sistema en el que el modelo decide qué herramientas usar y cuándo, en bucle, hasta terminar.', l: 'cl-6-1' },
          { t: 'Flujo', en: 'workflow', d: 'Sistema donde el código decide los pasos y el modelo se usa en puntos concretos.', l: 'cl-6-1' },
          { t: 'Tool use', en: 'function calling', d: 'Que el modelo pida ejecutar una función con argumentos estructurados y reciba el resultado.', l: 'cl-5-3' },
          { t: 'tool_use / tool_result', d: 'Bloques de la API: la petición del modelo de usar una herramienta y el resultado que tú devuelves.', l: 'cl-5-3' },
          { t: 'Salidas estructuradas', en: 'structured outputs', d: 'JSON válido garantizado según un esquema (output_format).', l: 'cl-5-2' },
          { t: 'Tool Runner', d: 'Ayudante del SDK de la API que ejecuta el bucle de herramientas con ganchos por turno.', l: 'cl-5-3' },
          { t: 'Herramientas del servidor', en: 'server tools', d: 'Herramientas que ejecuta Anthropic: búsqueda web, lectura web, ejecución de código, memoria.', l: 'cl-5-5' },
          { t: 'MCP', en: 'Model Context Protocol', d: 'Protocolo abierto (Anthropic, 2024) para que servidores expongan herramientas, recursos y prompts a modelos.', l: 'cl-4-9' },
          { t: 'Servidor MCP', d: 'Programa que expone herramientas por MCP (stdio local o HTTP remoto).', l: 'cl-4-9' },
          { t: 'Conector', d: 'Integración MCP de claude.ai con servicios (Drive, Gmail, Slack, GitHub…).', l: 'cl-3-2' },
          { t: 'Agent SDK', d: 'El motor de Claude Code como librería (Python, TypeScript). Antes Claude Code SDK.', l: 'cl-5-6' },
          { t: 'Managed Agents', d: 'Agentes alojados por Anthropic con sandbox, sesiones, bóvedas, despliegues programados y outcomes.', l: 'cl-5-7' },
          { t: 'Bóveda', en: 'vault', d: 'Credenciales guardadas por Anthropic e inyectadas al egreso; el agente no las ve.', l: 'cl-5-7' },
          { t: 'Outcome', d: 'Rúbrica de calidad que un evaluador aparte usa para iterar a un Managed Agent hasta cumplirla.', l: 'cl-5-7' },
          { t: 'Orquestador-trabajadores', d: 'Patrón: un agente descompone dinámicamente, delega y sintetiza.', l: 'cl-6-2' },
          { t: 'Evaluador-optimizador', d: 'Patrón: un modelo genera, otro evalúa, se itera.', l: 'cl-6-2' },
          { t: 'Idempotencia', d: 'Que repetir una acción no duplique el efecto (business_key). Esencial en herramientas de dinero.', l: 'cl-6-3' },
          { t: 'Herramienta de memoria', en: 'memory tool', d: 'Herramienta con la que el modelo lee y escribe notas persistentes en un directorio que tú guardas.', l: 'cl-6-5' },
          { t: 'Task budget', d: 'Tope de tokens por tarea agéntica (beta).', l: 'cl-5-4' }
        ]
      },
      {
        id: 'claude', title: 'Claude y sus productos', terms: [
          { t: 'Claude Fable 5.1', d: 'Modelo más capaz de acceso general (sep 2026), clase Mythos; 1M contexto; 10/50 $ por M tokens; caché 0,25.', l: 'cl-1-2' },
          { t: 'Claude Mythos 5.1', d: 'El mismo modelo que Fable 5.1 sin clasificadores; solo organizaciones verificadas (ciber, ciencias de la vida).', l: 'cl-1-2' },
          { t: 'Claude Opus 5 / Sonnet 5 / Haiku 4.5', d: 'Frontera clásica (5/25), equilibrio (2/10) y rápido-barato (1/5, 200K contexto).', l: 'cl-1-2' },
          { t: 'System prompt', d: 'Instrucciones previas a la conversación: Anthropic + aplicación + tuyas (Proyecto, CLAUDE.md, parámetro system).', l: 'cl-1-1' },
          { t: 'Proyecto (claude.ai)', d: 'Espacio con instrucciones permanentes y documentos que comparten sus conversaciones.', l: 'cl-3-1' },
          { t: 'Artefacto', d: 'Contenido en panel aparte (documento, página, app) que se publica, comparte, lee datos vivos y recibe comentarios.', l: 'cl-3-1' },
          { t: 'Memoria (claude.ai)', d: 'Resúmenes de conversaciones anteriores llevados a las nuevas; editable en Ajustes. Distinta de la de Claude Code.', l: 'cl-3-1' },
          { t: 'Skill', d: 'Procedimiento reutilizable (SKILL.md) que Claude aplica al invocarlo o cuando encaja. En claude.ai y en Claude Code.', l: 'cl-4-6' },
          { t: 'Cowork', d: 'Modo agente de la app de escritorio: tareas largas con archivos, conectores, navegador y pantalla; programable.', l: 'cl-3-2' },
          { t: 'Claude en Chrome', d: 'Extensión que navega y actúa en el navegador (computer use); cliente de Cowork.', l: 'cl-3-2' },
          { t: 'Claude en Slack (Claude Tag)', d: 'Claude dentro de Slack con permisos por persona.', l: 'cl-3-3' },
          { t: 'Rutina', d: 'Sesión de Claude Code en la nube que se ejecuta con horario sobre un repo.', l: 'cl-3-3' },
          { t: 'Remote Control', d: 'Dirigir desde el móvil o el navegador una sesión de Claude Code que corre en tu ordenador.', l: 'cl-1-3' },
          { t: 'Plan Max', d: 'Suscripción con 5× o 20× el uso de Pro; límites por ventana de tiempo; uso interactivo.', l: 'cl-1-3' },
          { t: 'Plan Team', d: 'Plan para equipos: Proyectos compartidos, Skills, administración, sin entrenamiento con datos.', l: 'cl-1-3' },
          { t: 'Refusal (stop_reason)', d: 'En Fable: un clasificador declinó la petición; HTTP 200, sin cobro; fallback posible.', l: 'cl-5-1' }
        ]
      },
      {
        id: 'code', title: 'Claude Code', terms: [
          { t: 'CLAUDE.md', d: 'Archivo de instrucciones permanentes del proyecto (jerarquía organización → usuario → proyecto → local). Corto, con porqués.', l: 'cl-4-3' },
          { t: 'Reglas por ruta', en: '.claude/rules/', d: 'Archivos .md con paths que se cargan solo al tocar archivos que coinciden.', l: 'cl-4-3' },
          { t: 'Memoria automática', en: 'auto memory', d: 'Aprendizajes que Claude Code guarda en ~/.claude/projects/…/memory/; carga 200 líneas al inicio.', l: 'cl-4-3' },
          { t: 'Modo plan', d: 'Modo de permisos de solo lectura: explorar y proponer sin cambiar nada.', l: 'cl-4-5' },
          { t: 'Modos de permiso', d: 'Auto, manual, acceptEdits, plan, dontAsk, bypassPermissions. Shift+Tab para ciclar.', l: 'cl-4-4' },
          { t: 'allow / ask / deny', d: 'Reglas de permiso por herramienta y patrón (Bash(git status *), Read(./x/**)). deny gana.', l: 'cl-4-4' },
          { t: 'Hook', d: 'Comando que se ejecuta en un evento (PreToolUse, PostToolUse, Stop…); código 2 bloquea.', l: 'cl-4-8' },
          { t: 'Subagente', d: 'Claude aparte con contexto, herramientas, permisos y modelo propios, definido en .claude/agents/.', l: 'cl-4-7' },
          { t: 'Worktree', d: 'Copia aislada del repo (git worktree) donde una sesión trabaja sin pisar a otras.', l: 'cl-4-11' },
          { t: '/compact', d: 'Resumir el historial para liberar contexto; admite instrucciones sobre qué conservar.', l: 'cl-4-10' },
          { t: '/clear', d: 'Conversación nueva con contexto vacío. Al cambiar de tema.', l: 'cl-4-10' },
          { t: '/context', d: 'Muestra qué ocupa la ventana de contexto.', l: 'cl-4-10' },
          { t: '/rewind (Esc Esc)', d: 'Volver a un punto de control: código, conversación o ambos.', l: 'cl-4-5' },
          { t: '/loop', d: 'Repetir una petición cada N mientras la sesión está abierta.', l: 'cl-4-11' },
          { t: '/goal', d: 'Condición de éxito que se evalúa cada turno hasta cumplirse.', l: 'cl-4-5' },
          { t: '/batch', d: 'Lanzar 5-30 subagentes en worktrees, un PR cada uno.', l: 'cl-4-11' },
          { t: 'Headless (-p)', d: 'Ejecutar Claude Code sin interfaz: responde y sale. Para scripts y CI.', l: 'cl-4-11' },
          { t: 'Plugin', d: 'Paquete con skills, agentes, hooks, MCP y ajustes, instalable desde un marketplace.', l: 'cl-4-12' },
          { t: 'Workflow (ultracode)', d: 'Script determinista que orquesta decenas de subagentes en fases.', l: 'cl-4-11' },
          { t: 'GitHub Actions (claude-code-action)', d: 'Claude respondiendo a @claude en issues y PRs y revisando código en CI.', l: 'cl-4-11' }
        ]
      }
    ]
  };
})();
