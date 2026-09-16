/* Biblioteca de recursos: curados + los de cada lección (sin duplicar por URL). */
(function () {
  'use strict';
  const topics = [
    { id: 'empezar', title: 'Para empezar (lo imprescindible)' },
    { id: 'fundamentos', title: 'Fundamentos y redes neuronales' },
    { id: 'llm', title: 'LLM: tokens, transformers, razonamiento' },
    { id: 'entrenamiento', title: 'Entrenamiento y evaluación' },
    { id: 'historia', title: 'Historia y panorama' },
    { id: 'lideres', title: 'Los líderes en sus palabras' },
    { id: 'economia', title: 'Economía, chips y geopolítica' },
    { id: 'seguridad', title: 'Seguridad, alineación y gobernanza' },
    { id: 'claude', title: 'Claude: modelos y productos' },
    { id: 'prompting', title: 'Prompting' },
    { id: 'claudecode', title: 'Claude Code' },
    { id: 'api', title: 'API, Agent SDK y Managed Agents' },
    { id: 'agentes', title: 'Agentes y MCP' },
    { id: 'aldia', title: 'Para mantenerse al día' },
    { id: 'es', title: 'En español' }
  ];

  const curated = [
    // empezar
    { topic: 'empezar', type: 'video', t: 'Andrej Karpathy: Deep Dive into LLMs like ChatGPT', u: 'https://www.youtube.com/watch?v=7xTGNNLPyMI', lang: 'EN', min: 210, must: true, note: 'Del preentrenamiento al RLHF, para no técnicos. Con subtítulos en español. Si solo ves un vídeo, que sea este.' },
    { topic: 'empezar', type: 'video', t: '3Blue1Brown: serie sobre redes neuronales y transformers', u: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi', lang: 'EN', must: true, note: 'Siete vídeos que explican visualmente neuronas, gradiente, atención y LLM.' },
    { topic: 'empezar', type: 'article', t: 'Anthropic: Building effective agents', u: 'https://www.anthropic.com/research/building-effective-agents', lang: 'EN', min: 20, must: true, note: 'El artículo más citado sobre agentes. Base del módulo 6 del manual.' },
    { topic: 'empezar', type: 'doc', t: 'Claude Code: Best practices', u: 'https://code.claude.com/docs/en/best-practices', lang: 'EN', must: true, note: 'La guía oficial. Vuelve a ella cada mes.' },
    { topic: 'empezar', type: 'video', t: 'Boris Cherny: Mastering Claude Code in 30 minutes', u: 'https://www.youtube.com/watch?v=6eBSHbLKuN0', lang: 'EN', min: 30, must: true, note: 'Por el creador de Claude Code.' },
    { topic: 'empezar', type: 'article', t: 'Dario Amodei: Machines of Loving Grace', u: 'https://darioamodei.com/machines-of-loving-grace', lang: 'EN', must: true, note: 'La visión optimista del CEO de Anthropic. Una hora que cambia la perspectiva.' },
    { topic: 'empezar', type: 'article', t: 'Anthropic: Claude\'s new constitution', u: 'https://www.anthropic.com/news/claude-new-constitution', lang: 'EN', must: true, note: 'Cómo se comporta Claude y por qué, por escrito.' },
    // fundamentos
    { topic: 'fundamentos', type: 'tool', t: 'TensorFlow Playground', u: 'https://playground.tensorflow.org/', lang: 'EN', note: 'Entrena una red en el navegador y mira qué aprende cada capa.' },
    { topic: 'fundamentos', type: 'book', t: 'Michael Nielsen: Neural Networks and Deep Learning', u: 'http://neuralnetworksanddeeplearning.com/', lang: 'EN', note: 'Libro online gratuito; el capítulo 1 basta para el módulo 1.' },
    { topic: 'fundamentos', type: 'course', t: 'Google: Machine Learning Crash Course', u: 'https://developers.google.com/machine-learning/crash-course', lang: 'EN' },
    { topic: 'fundamentos', type: 'course', t: 'DeepLearning.AI: cursos cortos (incluidos varios con Anthropic)', u: 'https://www.deeplearning.ai/short-courses/', lang: 'EN' },
    { topic: 'fundamentos', type: 'article', t: 'Jay Alammar: The Illustrated Word2vec', u: 'https://jalammar.github.io/illustrated-word2vec/', lang: 'EN' },
    // llm
    { topic: 'llm', type: 'article', t: 'Jay Alammar: The Illustrated Transformer', u: 'https://jalammar.github.io/illustrated-transformer/', lang: 'EN', must: true },
    { topic: 'llm', type: 'paper', t: 'Vaswani et al. (2017): Attention Is All You Need', u: 'https://arxiv.org/abs/1706.03762', lang: 'EN' },
    { topic: 'llm', type: 'video', t: 'Karpathy: Let\'s build GPT from scratch', u: 'https://www.youtube.com/watch?v=kCc8FmEb1nY', lang: 'EN', min: 117 },
    { topic: 'llm', type: 'video', t: 'Karpathy: Let\'s build the GPT Tokenizer', u: 'https://www.youtube.com/watch?v=zduSFxRajkE', lang: 'EN', min: 130 },
    { topic: 'llm', type: 'tool', t: 'Tiktokenizer', u: 'https://tiktokenizer.vercel.app/', lang: 'EN', note: 'Mira cómo se tokeniza tu texto en español y en inglés.' },
    { topic: 'llm', type: 'paper', t: 'DeepSeek-R1: Incentivizing Reasoning Capability via RL', u: 'https://arxiv.org/abs/2501.12948', lang: 'EN', must: true, note: 'El paper que abrió el razonamiento. Secciones 2.2 y 2.3.' },
    { topic: 'llm', type: 'article', t: 'Anthropic: Effective context engineering for AI agents', u: 'https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents', lang: 'EN', must: true },
    { topic: 'llm', type: 'book', t: 'Jay Alammar y Maarten Grootendorst: Hands-On Large Language Models', u: 'https://www.oreilly.com/library/view/hands-on-large-language/9781098150952/', lang: 'EN', note: 'El libro visual sobre LLM. Hay edición en español.' },
    // entrenamiento
    { topic: 'entrenamiento', type: 'article', t: 'Hugging Face: Illustrating RLHF', u: 'https://huggingface.co/blog/rlhf', lang: 'EN' },
    { topic: 'entrenamiento', type: 'book', t: 'Nathan Lambert: RLHF Book (online, gratuito)', u: 'https://rlhfbook.com/', lang: 'EN', note: 'Post-entrenamiento explicado por un experto; se actualiza.' },
    { topic: 'entrenamiento', type: 'paper', t: 'Bai et al. (2022): Constitutional AI', u: 'https://arxiv.org/abs/2212.08073', lang: 'EN' },
    { topic: 'entrenamiento', type: 'paper', t: 'Hoffmann et al. (2022): Chinchilla', u: 'https://arxiv.org/abs/2203.15556', lang: 'EN' },
    { topic: 'entrenamiento', type: 'article', t: 'Hugging Face: The Ultra-Scale Playbook', u: 'https://huggingface.co/spaces/nanotron/ultrascale-playbook', lang: 'EN', note: 'Cómo se entrena en miles de GPU.' },
    { topic: 'entrenamiento', type: 'article', t: 'Epoch AI: Benchmarking Hub', u: 'https://epoch.ai/benchmarks', lang: 'EN', note: 'Evaluaciones independientes en igualdad de condiciones.' },
    { topic: 'entrenamiento', type: 'article', t: 'Hamel Husain: Your AI product needs evals', u: 'https://hamel.dev/blog/posts/evals/', lang: 'EN', must: true },
    { topic: 'entrenamiento', type: 'tool', t: 'Ollama: correr modelos abiertos en tu Mac', u: 'https://ollama.com/', lang: 'EN' },
    // historia
    { topic: 'historia', type: 'video', t: 'AlphaGo: el documental', u: 'https://www.youtube.com/watch?v=WXuK6gekU1Y', lang: 'EN', min: 90, must: true },
    { topic: 'historia', type: 'book', t: 'Cade Metz: Genius Makers', u: 'https://www.penguinrandomhouse.com/authors/2183925/cade-metz/', lang: 'EN', note: 'Hinton, LeCun, Bengio y la carrera. Hay traducción al español.' },
    { topic: 'historia', type: 'book', t: 'Karen Hao: Empire of AI', u: 'https://www.penguinrandomhouse.com/books/743569/empire-of-ai-by-karen-hao/', lang: 'EN', note: 'OpenAI desde dentro.' },
    { topic: 'historia', type: 'book', t: 'Parmy Olson: Supremacy', u: 'https://www.hachettebookgroup.com/titles/parmy-olson/supremacy/9781250337740/', lang: 'EN', note: 'OpenAI frente a DeepMind.' },
    { topic: 'historia', type: 'article', t: 'State of AI Report (anual)', u: 'https://www.stateof.ai/', lang: 'EN', must: true },
    { topic: 'historia', type: 'article', t: 'Stanford AI Index (anual)', u: 'https://aiindex.stanford.edu/', lang: 'EN', must: true },
    // lideres
    { topic: 'lideres', type: 'article', t: 'Dario Amodei: The Adolescence of Technology', u: 'https://darioamodei.com/essay/the-adolescence-of-technology', lang: 'EN', must: true },
    { topic: 'lideres', type: 'article', t: 'Dario Amodei: The Urgency of Interpretability', u: 'https://www.darioamodei.com/post/the-urgency-of-interpretability', lang: 'EN' },
    { topic: 'lideres', type: 'article', t: 'Sam Altman: The Gentle Singularity', u: 'https://blog.samaltman.com/the-gentle-singularity', lang: 'EN' },
    { topic: 'lideres', type: 'article', t: 'Sam Altman: The Intelligence Age', u: 'https://ia.samaltman.com/', lang: 'EN' },
    { topic: 'lideres', type: 'podcast', t: 'Lex Fridman: Dario Amodei, Amanda Askell y Chris Olah', u: 'https://www.youtube.com/watch?v=ugvHCXCOmm4', lang: 'EN', min: 300, must: true },
    { topic: 'lideres', type: 'podcast', t: 'Dwarkesh Podcast', u: 'https://www.dwarkesh.com/', lang: 'EN', note: 'Entrevistas largas con Amodei, Sutskever, Zuckerberg, Hassabis.' },
    { topic: 'lideres', type: 'video', t: 'Ilya Sutskever en NeurIPS 2024', u: 'https://www.youtube.com/watch?v=1yvBqasHLZs', lang: 'EN', min: 25 },
    { topic: 'lideres', type: 'article', t: 'Fred Gao: las declaraciones de Liang Wenfeng (DeepSeek)', u: 'https://www.fredgao.com/p/deepseeks-liang-wenfeng-breaks-his', lang: 'EN' },
    { topic: 'lideres', type: 'article', t: 'Mark Zuckerberg: Open Source AI Is the Path Forward (2024)', u: 'https://about.fb.com/news/2024/07/open-source-ai-is-the-path-forward/', lang: 'EN' },
    { topic: 'lideres', type: 'article', t: 'Leopold Aschenbrenner: Situational Awareness', u: 'https://situational-awareness.ai/', lang: 'EN' },
    { topic: 'lideres', type: 'article', t: 'AI 2027 (escenario)', u: 'https://ai-2027.com/', lang: 'EN' },
    // economia
    { topic: 'economia', type: 'article', t: 'Epoch AI', u: 'https://epoch.ai/', lang: 'EN', must: true, note: 'Datos de cómputo, costes, tendencias.' },
    { topic: 'economia', type: 'article', t: 'SemiAnalysis', u: 'https://semianalysis.com/', lang: 'EN', note: 'Chips y centros de datos.' },
    { topic: 'economia', type: 'book', t: 'Chris Miller: Chip War (La guerra de los chips)', u: 'https://www.simonandschuster.com/books/Chip-War/Chris-Miller/9781982172008', lang: 'EN', must: true, note: 'Hay edición en español.' },
    { topic: 'economia', type: 'article', t: 'Artificial Analysis: comparativas de precio, velocidad y calidad', u: 'https://artificialanalysis.ai/', lang: 'EN' },
    { topic: 'economia', type: 'article', t: 'Anthropic Economic Index', u: 'https://www.anthropic.com/economic-index', lang: 'EN' },
    { topic: 'economia', type: 'podcast', t: 'ChinaTalk', u: 'https://www.chinatalk.media/', lang: 'EN' },
    { topic: 'economia', type: 'doc', t: 'Anthropic: precios de la API', u: 'https://platform.claude.com/docs/en/about-claude/pricing', lang: 'EN' },
    // seguridad
    { topic: 'seguridad', type: 'article', t: 'Anthropic: Core Views on AI Safety', u: 'https://www.anthropic.com/news/core-views-on-ai-safety', lang: 'EN', must: true },
    { topic: 'seguridad', type: 'article', t: 'Anthropic: Tracing the thoughts of a large language model', u: 'https://www.anthropic.com/research/tracing-thoughts-language-model', lang: 'EN', must: true },
    { topic: 'seguridad', type: 'article', t: 'Anthropic: Alignment faking', u: 'https://www.anthropic.com/research/alignment-faking', lang: 'EN' },
    { topic: 'seguridad', type: 'article', t: 'Anthropic: Agentic misalignment', u: 'https://www.anthropic.com/research/agentic-misalignment', lang: 'EN' },
    { topic: 'seguridad', type: 'article', t: 'Anthropic: Responsible Scaling Policy', u: 'https://www.anthropic.com/responsible-scaling-policy', lang: 'EN' },
    { topic: 'seguridad', type: 'article', t: 'Anthropic: Project Glasswing', u: 'https://www.anthropic.com/glasswing', lang: 'EN' },
    { topic: 'seguridad', type: 'article', t: 'Alignment Science Blog (Anthropic)', u: 'https://alignment.anthropic.com/', lang: 'EN' },
    { topic: 'seguridad', type: 'article', t: 'Transformer Circuits Thread', u: 'https://transformer-circuits.pub/', lang: 'EN' },
    { topic: 'seguridad', type: 'article', t: 'International AI Safety Report', u: 'https://internationalaisafetyreport.org/', lang: 'EN' },
    { topic: 'seguridad', type: 'article', t: 'OWASP Top 10 for LLM Applications', u: 'https://genai.owasp.org/llm-top-10/', lang: 'EN', must: true },
    { topic: 'seguridad', type: 'article', t: 'Simon Willison: prompt injection (serie)', u: 'https://simonwillison.net/series/prompt-injection/', lang: 'EN' },
    { topic: 'seguridad', type: 'article', t: 'Comisión Europea: el AI Act', u: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai', lang: 'EN', note: 'También en español en el mismo portal.' },
    { topic: 'seguridad', type: 'book', t: 'Brian Christian: The Alignment Problem', u: 'https://brianchristian.org/the-alignment-problem/', lang: 'EN', note: 'Hay edición en español.' },
    // claude
    { topic: 'claude', type: 'doc', t: 'Anthropic: Models overview', u: 'https://platform.claude.com/docs/en/models/overview', lang: 'EN', must: true },
    { topic: 'claude', type: 'article', t: 'Anthropic: Introducing Claude Fable 5.1 and Mythos 5.1', u: 'https://www.anthropic.com/claude-fable-and-mythos-5-1', lang: 'EN' },
    { topic: 'claude', type: 'doc', t: 'Anthropic: system prompts publicados de Claude.ai', u: 'https://platform.claude.com/docs/en/release-notes/system-prompts', lang: 'EN' },
    { topic: 'claude', type: 'article', t: 'Anthropic: Claude Cowork', u: 'https://claude.com/cowork', lang: 'EN' },
    { topic: 'claude', type: 'article', t: 'Anthropic: Skills', u: 'https://www.anthropic.com/news/skills', lang: 'EN' },
    { topic: 'claude', type: 'article', t: 'Anthropic: How Anthropic teams use Claude Code', u: 'https://www.anthropic.com/news/how-anthropic-teams-use-claude-code', lang: 'EN', must: true },
    { topic: 'claude', type: 'article', t: 'Anthropic: planes y precios', u: 'https://www.anthropic.com/pricing', lang: 'EN' },
    { topic: 'claude', type: 'article', t: 'Anthropic Trust Center', u: 'https://trust.anthropic.com/', lang: 'EN' },
    // prompting
    { topic: 'prompting', type: 'doc', t: 'Anthropic: Prompt engineering overview', u: 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview', lang: 'EN', must: true },
    { topic: 'prompting', type: 'course', t: 'Anthropic: Prompt engineering interactive tutorial', u: 'https://github.com/anthropics/prompt-eng-interactive-tutorial', lang: 'EN' },
    { topic: 'prompting', type: 'doc', t: 'Anthropic: Prompt library', u: 'https://platform.claude.com/docs/en/resources/prompt-library/library', lang: 'EN' },
    { topic: 'prompting', type: 'doc', t: 'Anthropic: Prompting Claude Fable 5', u: 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5', lang: 'EN' },
    { topic: 'prompting', type: 'doc', t: 'Anthropic: Reduce hallucinations', u: 'https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations', lang: 'EN' },
    // claudecode
    { topic: 'claudecode', type: 'doc', t: 'Claude Code: documentación', u: 'https://code.claude.com/docs', lang: 'EN', must: true },
    { topic: 'claudecode', type: 'doc', t: 'Claude Code: mapa de la documentación', u: 'https://code.claude.com/docs/en/claude_code_docs_map.md', lang: 'EN' },
    { topic: 'claudecode', type: 'doc', t: 'Claude Code: Memory (CLAUDE.md, rules, auto memory)', u: 'https://code.claude.com/docs/en/memory', lang: 'EN', must: true },
    { topic: 'claudecode', type: 'doc', t: 'Claude Code: Skills', u: 'https://code.claude.com/docs/en/skills', lang: 'EN', must: true },
    { topic: 'claudecode', type: 'doc', t: 'Claude Code: Subagents', u: 'https://code.claude.com/docs/en/sub-agents', lang: 'EN', must: true },
    { topic: 'claudecode', type: 'doc', t: 'Claude Code: Hooks guide', u: 'https://code.claude.com/docs/en/hooks-guide', lang: 'EN', must: true },
    { topic: 'claudecode', type: 'doc', t: 'Claude Code: MCP', u: 'https://code.claude.com/docs/en/mcp', lang: 'EN', must: true },
    { topic: 'claudecode', type: 'doc', t: 'Claude Code: Permissions y Sandboxing', u: 'https://code.claude.com/docs/en/permissions', lang: 'EN' },
    { topic: 'claudecode', type: 'doc', t: 'Claude Code: Headless', u: 'https://code.claude.com/docs/en/headless', lang: 'EN' },
    { topic: 'claudecode', type: 'doc', t: 'Claude Code: Plugins', u: 'https://code.claude.com/docs/en/plugins', lang: 'EN' },
    { topic: 'claudecode', type: 'doc', t: 'Claude Code: Changelog', u: 'https://code.claude.com/docs/en/changelog', lang: 'EN' },
    { topic: 'claudecode', type: 'article', t: 'Anthropic Engineering: Claude Code best practices', u: 'https://www.anthropic.com/engineering/claude-code-best-practices', lang: 'EN' },
    { topic: 'claudecode', type: 'repo', t: 'anthropics/claude-code-action (GitHub Actions)', u: 'https://github.com/anthropics/claude-code-action', lang: 'EN' },
    { topic: 'claudecode', type: 'video', t: 'Canal oficial de Anthropic en YouTube', u: 'https://www.youtube.com/@anthropic-ai', lang: 'EN' },
    // api
    { topic: 'api', type: 'doc', t: 'Claude Platform: documentación', u: 'https://platform.claude.com/docs', lang: 'EN', must: true },
    { topic: 'api', type: 'doc', t: 'Anthropic: Messages API', u: 'https://platform.claude.com/docs/en/api/messages', lang: 'EN' },
    { topic: 'api', type: 'doc', t: 'Anthropic: Tool use overview', u: 'https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview', lang: 'EN', must: true },
    { topic: 'api', type: 'doc', t: 'Anthropic: Prompt caching', u: 'https://platform.claude.com/docs/en/build-with-claude/prompt-caching', lang: 'EN', must: true },
    { topic: 'api', type: 'doc', t: 'Anthropic: Structured outputs', u: 'https://platform.claude.com/docs/en/build-with-claude/structured-outputs', lang: 'EN' },
    { topic: 'api', type: 'doc', t: 'Anthropic: Agent SDK overview', u: 'https://platform.claude.com/docs/en/agent-sdk/overview', lang: 'EN', must: true },
    { topic: 'api', type: 'doc', t: 'Anthropic: Managed Agents overview', u: 'https://platform.claude.com/docs/en/managed-agents/overview', lang: 'EN' },
    { topic: 'api', type: 'repo', t: 'Anthropic Cookbook', u: 'https://github.com/anthropics/anthropic-cookbook', lang: 'EN', must: true },
    { topic: 'api', type: 'course', t: 'Anthropic Academy (cursos oficiales)', u: 'https://anthropic.skilljar.com/', lang: 'EN', must: true },
    { topic: 'api', type: 'doc', t: 'Anthropic: Usage and Cost Admin API', u: 'https://platform.claude.com/docs/en/build-with-claude/usage-cost-api', lang: 'EN' },
    // agentes
    { topic: 'agentes', type: 'article', t: 'Anthropic Engineering: Writing effective tools for agents', u: 'https://www.anthropic.com/engineering/writing-tools-for-agents', lang: 'EN', must: true },
    { topic: 'agentes', type: 'article', t: 'Anthropic Engineering: How we built our multi-agent research system', u: 'https://www.anthropic.com/engineering/multi-agent-research-system', lang: 'EN', must: true },
    { topic: 'agentes', type: 'article', t: 'Anthropic Engineering: Building agents with the Claude Agent SDK', u: 'https://www.anthropic.com/engineering/building-agents-with-the-claude-agent-sdk', lang: 'EN' },
    { topic: 'agentes', type: 'article', t: 'Anthropic Engineering: Demystifying evals for AI agents', u: 'https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents', lang: 'EN' },
    { topic: 'agentes', type: 'doc', t: 'Model Context Protocol: sitio oficial', u: 'https://modelcontextprotocol.io/', lang: 'EN', must: true },
    { topic: 'agentes', type: 'repo', t: 'Servidores MCP de referencia', u: 'https://github.com/modelcontextprotocol/servers', lang: 'EN' },
    { topic: 'agentes', type: 'repo', t: 'Playwright MCP', u: 'https://github.com/microsoft/playwright-mcp', lang: 'EN' },
    { topic: 'agentes', type: 'article', t: 'OpenAI: A practical guide to building agents (PDF)', u: 'https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf', lang: 'EN' },
    { topic: 'agentes', type: 'article', t: 'Simon Willison: The lethal trifecta for AI agents', u: 'https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/', lang: 'EN' },
    { topic: 'agentes', type: 'tool', t: 'Langfuse (trazas y evals)', u: 'https://langfuse.com/', lang: 'EN' },
    { topic: 'agentes', type: 'book', t: 'Chip Huyen: AI Engineering', u: 'https://www.oreilly.com/library/view/ai-engineering/9781098166298/', lang: 'EN', must: true },
    // aldia
    { topic: 'aldia', type: 'article', t: 'Anthropic: noticias', u: 'https://www.anthropic.com/news', lang: 'EN', must: true },
    { topic: 'aldia', type: 'article', t: 'Anthropic Engineering Blog', u: 'https://www.anthropic.com/engineering', lang: 'EN', must: true },
    { topic: 'aldia', type: 'article', t: 'Ethan Mollick: One Useful Thing', u: 'https://www.oneusefulthing.org/', lang: 'EN', must: true },
    { topic: 'aldia', type: 'article', t: 'Simon Willison\'s Weblog', u: 'https://simonwillison.net/', lang: 'EN' },
    { topic: 'aldia', type: 'article', t: 'Zvi Mowshowitz: Don\'t Worry About the Vase', u: 'https://thezvi.substack.com/', lang: 'EN' },
    { topic: 'aldia', type: 'article', t: 'Nathan Lambert: Interconnects', u: 'https://www.interconnects.ai/', lang: 'EN' },
    { topic: 'aldia', type: 'podcast', t: 'Latent Space', u: 'https://www.latent.space/', lang: 'EN' },
    { topic: 'aldia', type: 'podcast', t: 'Hard Fork (NYT)', u: 'https://www.nytimes.com/column/hard-fork', lang: 'EN' },
    { topic: 'aldia', type: 'article', t: 'OpenAI: noticias', u: 'https://openai.com/news/', lang: 'EN' },
    { topic: 'aldia', type: 'article', t: 'Google DeepMind: blog', u: 'https://deepmind.google/discover/blog/', lang: 'EN' },
    { topic: 'aldia', type: 'article', t: 'DeepSeek: noticias de la API', u: 'https://api-docs.deepseek.com/news/', lang: 'EN' },
    // es
    { topic: 'es', type: 'video', t: 'DotCSV (Carlos Santana): canal de IA en español', u: 'https://www.youtube.com/@DotCSV', lang: 'ES', must: true, note: 'Redes neuronales, transformers, noticias. La mejor puerta de entrada en español.' },
    { topic: 'es', type: 'video', t: 'DotCSV: ¿Qué es una Red Neuronal? Parte 1', u: 'https://www.youtube.com/watch?v=MRIv2IwFTPg', lang: 'ES', min: 17 },
    { topic: 'es', type: 'article', t: 'Xataka: sección de inteligencia artificial', u: 'https://www.xataka.com/tag/inteligencia-artificial', lang: 'ES' },
    { topic: 'es', type: 'article', t: 'Hipertextual: IA', u: 'https://hipertextual.com/categoria/inteligencia-artificial', lang: 'ES' },
    { topic: 'es', type: 'book', t: 'Ethan Mollick: Co-inteligencia (edición en español)', u: 'https://www.penguinrandomhouse.com/books/741805/co-intelligence-by-ethan-mollick/', lang: 'ES', note: 'Busca la edición en español de Co-Intelligence.' },
    { topic: 'es', type: 'article', t: 'Anthropic: documentación de la API en español (llms.txt y docs traducidas)', u: 'https://platform.claude.com/docs/es', lang: 'ES', note: 'Parte de la documentación de Anthropic está traducida; si una página no existe en español, cambia /es por /en.' }
  ];

  // Mapa módulo → tema para los recursos de las lecciones
  const MOD_TOPIC = {
    'ia-1': 'fundamentos', 'ia-2': 'llm', 'ia-3': 'entrenamiento', 'ia-4': 'historia', 'ia-5': 'economia', 'ia-6': 'seguridad', 'ia-7': 'aldia',
    'cl-1': 'claude', 'cl-2': 'prompting', 'cl-3': 'claude', 'cl-4': 'claudecode', 'cl-5': 'api', 'cl-6': 'agentes', 'cl-7': 'claude'
  };
  const seen = new Set(curated.map(r => r.u.replace(/\/$/, '')));
  const items = curated.slice();
  for (const l of EX.allLessons()) {
    const topic = MOD_TOPIC[l.module] || 'aldia';
    for (const r of (l.resources || [])) {
      const key = r.u.replace(/\/$/, '');
      if (seen.has(key)) continue;
      seen.add(key);
      items.push({ topic: r.lang === 'ES' ? 'es' : topic, type: r.type || 'article', t: r.t, u: r.u, lang: r.lang, min: r.min, note: r.note, lesson: l.id });
    }
  }
  EX.RESOURCES = { topics, items };
})();
