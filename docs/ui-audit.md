# Auditoria de UI/UX — Portfólio Maria Leitão

**Data:** 2026-07-07
**Site avaliado:** https://marialuizaleitao.github.io/me/
**Método:** leitura integral do conteúdo renderizado do site publicado (HTML/texto extraído via fetch) + análise linha a linha de todo o código-fonte (`src/components`, `src/app`, `src/i18n`, `tailwind.config.ts`, `globals.css`).

> **Nota sobre metodologia:** a extensão de navegador usada para captura visual (screenshots) não conseguiu se conectar nesta sessão. A auditoria abaixo foi construída a partir do conteúdo textual completo e fielmente renderizado da versão publicada (idêntico ao que um visitante vê, extraído diretamente do HTML gerado) combinado com a leitura completa de todas as classes Tailwind (cores, tipografia, espaçamento, animações) de cada componente — o que permite avaliar layout, hierarquia, paleta e padrões visuais com alta precisão, ainda que sem uma captura de tela pixel a pixel. Nenhuma alteração de código foi feita nesta fase.

---

## 1. Pontos fortes

O projeto tem uma base sólida e vários acertos que devem ser preservados no refresh:

- **Conteúdo rico e bem estruturado.** Experiência, projetos, certificações, artigos e recomendações estão todos presentes e organizados em seções lógicas, com métricas quantificadas (ex: "25% de redução em custos", "90% de cobertura de testes"). Isso é raro e valioso — a maioria dos portfólios não tem esse nível de prova social e resultado mensurável.
- **Internacionalização real.** PT/EN/ES via `LanguageContext`, com troca de idioma persistida — funcionalidade que agrega credibilidade internacional.
- **Dark mode bem implementado.** Detecção de preferência do sistema, persistência em `localStorage`, toggle acessível (`aria-label` dinâmico).
- **Cuidados de acessibilidade já presentes.** `:focus-visible` customizado, `prefers-reduced-motion` respeitado, touch targets mínimos de 44px em mobile, `aria-label` em botões de ícone, modais com `role="dialog"` e `aria-modal`.
- **Responsividade tecnicamente robusta.** Breakpoints consistentes (`sm/md/lg/xl`), `overflow-x: hidden` para evitar scroll horizontal, elementos decorativos ocultados em telas pequenas.
- **Modal de certificações com preview de imagem** — funcionalidade de detalhe bem pensada, incomum em portfólios simples.
- **Carrossel de certificações** com setas, indicadores de estado (disabled) e fade nas bordas — atenção a detalhes de interação.
- **Estrutura de componentes limpa.** Cada seção é um componente isolado, com tipos TypeScript para os dados (`Position`, `Project`, `Testimonial`, `Certification`) — base de código saudável para receber um refresh visual sem riscos.

---

## 2. O que faz o site parecer um template genérico de IA

Esta é a raiz do problema relatado. Os padrões abaixo, quando somados, são o que mais sinaliza "gerado rapidamente com um template" em vez de "desenhado com intenção":

1. **O mesmo componente de card é reciclado literalmente em todas as 7 seções de conteúdo** (About, Skills, Experience, Projects, Testimonials, Education, Articles): fundo branco/`midnight-800`, `rounded-xl sm:rounded-2xl`, borda `midnight-200`, `hover:shadow-xl`, overlay de gradiente que aparece no hover, borda que muda de cor no hover. Não há nenhuma variação de tratamento entre uma seção e outra — a página inteira parece "carimbada" com o mesmo componente genérico, sem hierarquia entre o que é mais e menos importante.
2. **"Gradient orbs" decorativos (`blur-3xl`, `bg-amber-400/20`, `bg-indigo-400/20`) atrás de quase toda seção** (Hero, Projects, Testimonials, Contact, Articles). Esse efeito — dois blobs coloridos borrados atrás do conteúdo — é hoje um dos clichês mais reconhecíveis de landing pages SaaS geradas rapidamente com Tailwind/IA. Usado uma vez, é elegante; repetido em cinco seções diferentes, vira ruído e denuncia o padrão.
3. **`bg-grid-pattern` (grid de pontos SVG) reaproveitado em Hero, Skills, Education e Projects** — mesma textura de fundo, mesma opacidade, sem propósito diferenciado por seção.
4. **Ícone Lucide dentro de badge quadrado colorido (`w-10 h-10 bg-color-100 rounded-xl flex items-center justify-center`)** repetido dezenas de vezes (About, Skills, Education, Testimonials) — é o "ícone-em-caixinha" mais usado em templates de componentes prontos (shadcn/Tailwind UI clones).
5. **Texto com gradiente (`bg-clip-text`) no sobrenome do Hero** — outro clichê extremamente comum em heros de template, hoje datado.
6. **Badge pill com ícone de "sparkles" acima do título do Hero** ("✨ Tech Lead @ Instituto Semear") — padrão-assinatura de gerador de landing page.
7. **Timeline vertical com linha gradiente, bolinha e cards alternados esquerda/direita com "seta" apontando para a linha** — um dos formatos de "experiência profissional" mais reciclados em portfólios prontos; força um zigue-zague de leitura pouco natural para quem está escaneando rapidamente (recrutador).
8. **Barra de progresso (%) para nível de idioma** ("Fluente" = barra 100% cheia) — cliché de currículo genérico; nível de idioma não é uma métrica quantificável e esse componente é hoje visto como sinal de portfólio "de template".
9. **Ícone de aspas rotacionado no canto do card de depoimento** — outro elemento-clichê de landing page de vendas, não de portfólio técnico.
10. **Paleta de 9+ cores de destaque diferentes** (âmbar, índigo, esmeralda, violeta, azul, rosa, ciano, slate, laranja) distribuídas sem critério entre seções — em vez de reforçar uma identidade única, o resultado parece um "sampler" de cores do Tailwind, sinal claro de que as cores foram escolhidas card a card, não a partir de um sistema de marca.

Nenhum desses elementos é "errado" isoladamente — o problema é a repetição indiscriminada do mesmo vocabulário visual sem curadoria, o que é exatamente o padrão de saída de um LLM gerando componente por componente sem uma direção de design unificadora.

---

## 3. Inconsistências

- **Fonte monoespaçada declarada e não utilizada.** `JetBrains Mono` é importado no Google Fonts e configurado em `tailwind.config.ts` (`font-mono`), mas nenhum componente lido usa `font-mono` — para um portfólio de desenvolvedora, é uma oportunidade desperdiçada de reforçar identidade técnica (ex: datas, tags de skill, badges de tecnologia).
- **Favicon vazio.** `public/favicon.svg` tem **0 bytes**. Na prática, o site publicado não exibe favicon algum (ou exibe o ícone padrão do navegador) — é o tipo de detalhe que um Tech Lead avaliando o portfólio percebe imediatamente na aba do navegador.
- **Domínio de metadados divergente do domínio publicado.** `layout.tsx` define `metadataBase` e Open Graph apontando para `https://marialeitao.dev`, mas o site está publicado em `marialuizaleitao.github.io/me`. Isso pode quebrar preview de link (og:image) ao compartilhar a URL real no LinkedIn/WhatsApp.
- **Posicionamento do conteúdo diverge do posicionamento pedido para o refresh.** O texto atual (hero, about, skills) enfatiza fortemente "Business Analyst", Scrum Master, BPMN, Power BI, gestão de stakeholders — enquanto a área de atuação que você descreveu para este projeto é Full Stack + Python + IA + Agentes de IA + n8n + React + Docker + Arquitetura. Isso é conteúdo (fora do escopo desta reforma visual, que é só estética), mas registro aqui porque afeta diretamente a "primeira impressão" que um recrutador técnico terá — vale uma decisão consciente sua sobre se/quando atualizar as strings em `src/i18n/*.json` à parte deste UI refresh.
- **Formato de imagem dos certificados em `.jfif`.** Funciona no navegador, mas é um formato incomum/pouco profissional (associado a downloads do Bing Images) — deveria idealmente ser `.jpg`/`.webp`.
- **Arquivo `src/i18n/en_backup.json`** parece ser um resíduo de edição esquecido no repositório (não é importado em nenhum lugar verificado) — não afeta o site, mas é ruído no projeto.

---

## 4. Problemas de UX

- **Zigue-zague na timeline de experiência (desktop).** Alternar cards à esquerda/direita obriga o olhar a cruzar o eixo central a cada item — mais lento de escanear do que uma lista vertical única, que é como recrutadores realmente leem (de cima para baixo, rápido).
- **Densidade de animação no Hero.** Sete elementos com `animate-slide-up`/`animate-fade-in` em cascata (delays de 0.1s a 0.7s) atrasam a percepção de "site pronto" a cada carregamento — pequeno, mas se soma à sensação de "efeito por efeito" em vez de confiança editorial.
- **CTA duplo genérico no Hero** ("Vamos Trabalhar Juntos" / "Ver Meus Resultados") em tom de landing page comercial — não erra, mas não é a forma como um Tech Lead sênior normalmente se apresenta (mais direto, mais técnico, menos "copy de vendas").
- **Duplicação de marcação HTML entre mobile e desktop no componente de Experiência.** `Experience.tsx` renderiza o card de cada posição duas vezes no DOM (uma versão `hidden lg:grid` para desktop, outra `lg:hidden` para mobile) em vez de um único layout responsivo. Visualmente não há bug (CSS esconde corretamente a versão não usada), mas duplica todo o texto no HTML da página — desnecessário e tecnicamente evitável com um layout responsivo único.
- **Botão "Ver todos" das certificações não é óbvio como botão** — mesmo peso visual de um link secundário, pouco destaque para uma ação que abre um modal com todo o histórico.
- **Seletor de idioma mostra apenas emoji de bandeira no desktop**, sem o código do idioma (PT/EN/ES) — bandeiras são ambíguas (bandeira do Brasil não necessariamente comunica "Português" para todos os públicos) e têm baixo contraste como alvo de clique.

## 5. Problemas de UI

- **Falta de hierarquia entre seções.** Todas as 8 seções de conteúdo usam o mesmo padding vertical (`py-16 sm:py-24 md:py-32`), o mesmo tratamento de fundo (gradiente sutil claro) e os mesmos cards — nada sinaliza visualmente "esta seção é mais importante" (ex: Projetos e Experiência, que deveriam ter mais peso para um recrutador, têm o mesmo tratamento visual que Idiomas ou Artigos).
- **Paleta de cor dispersa.** Nove tons de destaque diferentes competem por atenção (ver seção 2, item 10) — falta uma cor de assinatura clara acompanhada de neutros, no estilo Linear/Stripe/Vercel.
- **Logo/monograma "ML."** é apenas texto — não há nenhuma marca gráfica própria, o que reforça a sensação de "projeto sem identidade visual desenhada".
- **Botões primário e secundário do Hero usam a mesma forma e tamanho**, diferenciados só pela cor de fundo — funciona, mas é o tratamento mais básico possível de hierarquia de botões.
- **Sombras coloridas (`shadow-amber-500/25`, `shadow-indigo-500/10` etc.) usadas de forma extensiva** — efeito bonito com moderação, mas aplicado em quase todo elemento interativo, perde impacto.

## 6. Problemas de tipografia

- **Escala tipográfica não sistemática.** O H1 do Hero usa cinco tamanhos diferentes por breakpoint (`text-4xl sm:5xl md:6xl lg:7xl xl:8xl`) e esse padrão de "um tamanho por breakpoint" se repete em quase todo texto do site — é sinal de ajuste manual caso a caso, não de uma escala tipográfica modular definida uma vez e reaproveitada.
- **Peso tipográfico pouco expressivo.** `font-display` (Outfit) é usado quase só para títulos de seção em `font-bold`; não há uso de pesos extremos (300/800) para criar contraste editorial — a tipografia hoje comunica "aplicativo", não "produto de marca pessoal".
- **JetBrains Mono carregado mas nunca usado** (ver seção 3) — perde a chance de dar uma "assinatura de dev" a datas, tags de tecnologia e labels.
- **Uso de itálico no subtítulo do Hero** (`<span className="italic">`) sem motivo tipográfico aparente — itálico em fonte sans-serif geral tende a parecer descuidado, não editorial.

## 7. Problemas de espaçamento

- **Padding vertical idêntico em todas as seções principais** (`py-16 sm:py-24 md:py-32`) — sem variação de ritmo entre seções curtas (Idiomas) e longas (Educação/Certificações), o que faz a rolagem parecer monótona.
- **Gaps de grid inconsistentes entre seções semelhantes**: `gap-4 sm:gap-6` em Skills/Testimonials/Articles vs. `gap-8 lg:gap-12` em About — sem um token de espaçamento único, cada seção "inventa" o próprio ritmo.
- **Muitos ajustes finos por breakpoint** (`mb-3 sm:mb-4`, `mb-6 sm:mb-8`, `mb-8 sm:mb-10`) sugerem que o espaçamento foi resolvido pixel a pixel em cada componente, em vez de vir de uma escala de espaçamento consistente (comum em Tailwind quando não se define uma escala customizada no `theme.spacing`).

## 8. Problemas de responsividade

Tecnicamente é a área mais madura do projeto — vale reforçar isso na resposta ao usuário. Ainda assim:

- **Duplicação de DOM mobile/desktop no componente de Experiência** (detalhado na seção 4) é also um problema de responsividade por abordagem: usa duas árvores de markup condicionadas por `hidden`/`lg:hidden` em vez de um layout fluido único.
- **Textos truncados agressivamente em telas pequenas** (`line-clamp-6 sm:line-clamp-none` em depoimentos, `line-clamp-2`/`line-clamp-3` em artigos) sem nenhuma forma de "ver mais" no card truncado — em mobile, o usuário nunca lê o depoimento completo sem abrir outro lugar.
- **Onze componentes usam blur/orbs decorativos ocultos apenas em mobile** (`hidden sm:block`/`hidden md:block`) — o efeito visual do desktop desaparece completamente no mobile, criando duas experiências de marca bem diferentes entre breakpoints.

## 9. Componentes pouco modernos

- Timeline com linha vertical + bolinha + seta de balão (padrão "currículo online" datado).
- Barra de progresso percentual para proficiência de idioma.
- Cards de depoimento com ícone de aspas rotacionado no canto.
- Badge/pill com ícone no Hero.
- Carrossel de certificações com setas quadradas simples (sem indicador de posição/paginação, sem swipe nativo destacado).
- Modal padrão Tailwind (`bg-black/50 backdrop-blur-sm` + `rounded-2xl`) sem nenhum refinamento de entrada/saída além de opacidade.

---

## 10. Oportunidades de melhoria e referências visuais

| Área | Oportunidade | Referência visual |
|---|---|---|
| Paleta de cor | Reduzir para 1 cor de assinatura + neutros (grafite/branco/preto), usando cor secundária só como acento raro (ex: um "verde terminal" ou "azul elétrico" ligado a código) | Linear (roxo único sobre neutros), Vercel (preto/branco quase monocromático) |
| Hero | Substituir badge+gradiente+orbs por composição tipográfica forte, com peso e contraste tipográfico fazendo o trabalho visual (menos decoração, mais tipografia) | Raycast, Stripe (heroes tipográficos, poucos efeitos) |
| Cards | Criar 2–3 variações de card (não 1 componente genérico repetido 7x) para dar hierarquia entre seções críticas (Projetos/Experiência) e seções de apoio (Idiomas/Artigos) | GitHub profile/readme cards, Notion (hierarquia por densidade, não por cor) |
| Timeline de experiência | Substituir zigue-zague por lista vertical única, com tipografia como hierarquia (cargo em destaque, empresa/período discretos) | Linear changelog, Stripe "Docs updates" |
| Tipografia | Definir escala modular única (ex: 12/14/16/20/28/40/56/72) e usar `font-mono` para datas/tags técnicas | GitHub (mono para código/branches), Vercel |
| Idiomas | Trocar barra de progresso por texto simples com badge discreto de nível | Linear/Notion (texto > barra decorativa) |
| Depoimentos | Remover ícone de aspas decorativo; usar tipografia (aspas tipográficas grandes e discretas) e foto/avatar real se disponível | Stripe customer quotes |
| Fundo/textura | Usar grid-pattern e orbs em no máximo 1 seção (Hero), removendo dos demais | Vercel homepage (textura só no hero) |
| Identidade técnica | Reforçar stack real (Python/IA/Agentes/n8n/React/Docker) como elemento visual recorrente discreto (ex: tag mono no header de seções técnicas) | GitHub topics/tags |

---

## 11. Resumo executivo

O site funciona bem tecnicamente e tem conteúdo de altíssima qualidade — isso é a parte mais difícil e já está resolvida. O que hoje "denuncia template" não é falta de esforço, é o excesso de padrões genéricos de Tailwind/componentes prontos aplicados sem curadoria: mesmo card repetido 7 vezes, paleta com 9 cores, orbs e grids decorativos em quase toda seção, timeline datada e barra de progresso de idioma. Um refresh visual que (1) reduz a paleta a uma assinatura clara, (2) diferencia o tratamento visual por seção conforme sua importância, (3) usa tipografia com mais intenção (incluindo a fonte mono já disponível) e (4) remove os componentes mais datados (timeline zigue-zague, barra de progresso, ícone de aspas) resolve a maior parte da percepção de "gerado por IA" sem tocar em nenhuma lógica, rota ou funcionalidade.

---

**Próximo passo:** aguardando sua aprovação para avançar à Fase 2 (`docs/ui-redesign-plan.md`) com direção visual, paleta, tipografia, componentes React Bits e design system detalhado.
