/* Pista 2: Manual maestro de Claude. Ensambla los módulos en orden. */
(function () {
  'use strict';
  EX.track({
    id: 'claude', route: 'manual', icon: '🪶',
    title: 'Manual maestro de Claude',
    desc: 'Cómo funciona Claude exactamente, cómo pedirle las cosas para que salgan a la primera, todo lo que puede hacer en claude.ai, Claude Code, la API y los agentes autónomos, y lo que hacen los expertos. Con tus proyectos (RRB, Maya, Academia, Atlas) como ejemplos y tu plan por etapas al final.',
    intro: 'Siete módulos. Los dos primeros afinan lo que ya haces; del tercero al sexto están todas las herramientas (las que usas y las que te faltan); el séptimo es tu plan y el examen. Cada lección con cuestionario, tarjetas y referencias oficiales.',
    modules: ['cl-1', 'cl-2', 'cl-3', 'cl-4', 'cl-5', 'cl-6', 'cl-7'].map(id => EX.MOD[id])
  });
})();
