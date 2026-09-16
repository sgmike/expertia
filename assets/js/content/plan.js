/* Plan de 8 semanas: lecciones por semana y práctica real con Claude. */
(function () {
  'use strict';
  const ids = (prefix, from, to) => { const out = []; for (let i = from; i <= to; i++) out.push(prefix + '-' + i); return out; };
  EX.PLAN = [
    {
      title: 'Fundamentos y el interior de un LLM (I)',
      goal: 'Entender qué es aprender para una máquina, qué es un transformer y por qué los modelos cuentan en tokens. Dos lecciones al día entre semana.',
      lessons: [...ids('ia-1', 1, 5), 'ia-2-1', 'ia-2-2', 'ia-2-3'],
      practice: 'Abre Claude Code y ejecuta <code>/context</code> en tu sesión panel. Anota cuánto ocupa el CLAUDE.md. Pega un párrafo en español y otro en inglés en Tiktokenizer y compara tokens.'
    },
    {
      title: 'El interior de un LLM (II) y cómo se entrena',
      goal: 'Memoria y cómputo, contexto, alucinaciones, razonamiento, multimodalidad; y las tres fases del entrenamiento.',
      lessons: ['ia-2-4', 'ia-2-5', 'ia-2-6', 'ia-2-7', 'ia-2-8', 'ia-3-1', 'ia-3-2', 'ia-3-3'],
      practice: 'Pide a Claude que estime el coste mensual de Maya con los precios de la API (prompt "Estimar el coste de un agente"). Guarda la tabla en _maestro_wip.'
    },
    {
      title: 'Entrenamiento (II) e historia',
      goal: 'IA constitucional, razonadores, benchmarks, pesos abiertos; y ochenta años de historia en seis lecciones.',
      lessons: ['ia-3-4', 'ia-3-5', 'ia-3-6', 'ia-3-7', 'ia-4-1', 'ia-4-2', 'ia-4-3', 'ia-4-4', 'ia-4-5', 'ia-4-6'],
      practice: 'Lee la constitución de Claude (al menos la introducción y las prioridades). Pregúntale a Claude cómo aplica dos de esos principios a Maya.'
    },
    {
      title: 'El panorama y la seguridad',
      goal: 'Laboratorios, líderes, economía, geopolítica; riesgos, alineación, interpretabilidad, gobernanza y seguridad práctica.',
      lessons: [...ids('ia-5', 1, 8), ...ids('ia-6', 1, 6)],
      practice: 'Aplica la prueba del "modelo obediente" a Maya: pide a la sesión maya la tabla Herramienta · Peor uso · Daño · Mitigación (prompt de la biblioteca).'
    },
    {
      title: 'Pensar como ejecutivo y conocer a Claude',
      goal: 'Evaluar modelos, stack, costes, legal, las doce preguntas; y las bases del manual: cómo piensa Claude, modelos, superficies, límites, el arte de pedir.',
      lessons: [...ids('ia-7', 1, 7), ...ids('cl-1', 1, 4), ...ids('cl-2', 1, 5)],
      practice: 'Etapa 1 del plan: higiene de sesiones (/clear, /compact con instrucciones) y modo plan explícito en la siguiente función nueva. Crea el Proyecto "RRB · Dirección" en claude.ai con sus instrucciones.'
    },
    {
      title: 'Claude.ai a fondo y Claude Code (I)',
      goal: 'Proyectos, conectores, Skills, Cowork, rutinas; y Claude Code: funcionamiento, comandos, CLAUDE.md, permisos, modo plan, Skills, subagentes.',
      lessons: [...ids('cl-3', 1, 4), ...ids('cl-4', 1, 7)],
      practice: 'Etapa 1: crea la Skill /deploy con el ritual completo y los permisos allow/ask/deny en .claude/settings.json. Reparte el CLAUDE.md en reglas por carpeta. Un deploy real con reporte.'
    },
    {
      title: 'Claude Code (II), API y agentes',
      goal: 'Hooks, MCP, contexto y coste, automatización, plugins, buenas prácticas; la API y el Agent SDK; agentes: patrones, herramientas, memoria, multiagente, seguridad, evals.',
      lessons: [...ids('cl-4', 8, 13), ...ids('cl-5', 1, 7), ...ids('cl-6', 1, 8)],
      practice: 'Etapa 2: crea los subagentes auditor, constructor y verificador-movil y los tres hooks. Conecta Playwright MCP. Programa la rutina de la mañana (pagos sin vincular).'
    },
    {
      title: 'Casos completos, maestría y plan',
      goal: 'Maya v2 y el agente de dirección; lo que hacen los expertos, el catálogo, los errores, tu plan por etapas y el examen del maestro.',
      lessons: ['cl-6-9', 'cl-6-10', ...ids('cl-7', 1, 5)],
      practice: 'Decide A o B para Maya v2 y mándaselo a la sesión maya con la fase 0 (eval de regresión). Haz el examen del maestro hasta superar el 85 %. Actualiza tu perfil en _maestro_wip.'
    }
  ];
})();
