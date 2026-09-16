/* Pista 1: Curso de IA. Ensambla los módulos en orden. */
(function () {
  'use strict';
  EX.track({
    id: 'ia', route: 'curso', icon: '🧠',
    title: 'Curso de IA: de cero a experto',
    desc: 'Cómo funciona la inteligencia artificial de verdad: neuronas, transformers, entrenamiento, historia, laboratorios, economía y seguridad. El conocimiento con el que razonan los ejecutivos de Anthropic, OpenAI, Google DeepMind o DeepSeek.',
    intro: 'Siete módulos en orden. Cada lección termina con un cuestionario y alimenta las tarjetas de memoria. Las analogías usan tu negocio (regalías, Maya, el admin) porque así se recuerda.',
    modules: ['ia-1', 'ia-2', 'ia-3', 'ia-4', 'ia-5', 'ia-6', 'ia-7'].map(id => EX.MOD[id])
  });
})();
