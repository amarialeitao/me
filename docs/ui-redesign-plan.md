# Plano de Redesign — UI Refresh do Portfólio

**Baseado em:** `docs/ui-audit.md` (aprovado em 2026-07-07)
**Escopo:** exclusivamente visual. Nenhuma rota, estado, lógica de negócio ou estrutura de dados (`src/i18n/*.json`) é alterada por este plano. Componentes React Bits são usados apenas como **camada de apresentação** (animação de entrada, texto, hover, contador, fundo decorativo) — nunca substituem a lógica de estado existente (carrossel de certificações, modal, expand/collapse de projetos, troca de idioma/tema).

---

## 1. Direção visual

Hoje o site fala a língua de "landing page de vendas SaaS": badges com sparkles, orbs gradientes, timeline com setas, barra de progresso de idioma. A direção nova fala a língua de **produto de engenharia** — o registro visual de Linear, Vercel, GitHub e Raycast: fundo quase monocromático, uma única cor de assinatura, tipografia fazendo o trabalho de hierarquia (não gradientes), motion contido e funcional, e um motivo gráfico *autoral* em vez de decoração genérica de Tailwind.

**Três princípios norteiam cada decisão abaixo:**

1. **Um acento, não nove.** Uma cor de assinatura + neutros fazem mais por identidade do que uma paleta arco-íris.
2. **Hierarquia por tipografia e densidade, não por repetição do mesmo card.** Projetos e Experiência (o que um recrutador mais precisa avaliar) recebem tratamento visualmente mais forte que Idiomas ou Artigos.
3. **Motivo autoral ligado à profissão real.** Em vez de ícone-em-caixinha genérico, um sistema de "eyebrow" numerado em mono-space (`01 · Sobre`, `02 · Habilidades`...) — evoca changelog/código-fonte, é a assinatura visual do site, e finalmente dá uso real à fonte JetBrains Mono que já está carregada e não é usada.

---

## 2. Identidade

- **Nome do sistema interno:** "Terminal Editorial" — tipografia editorial (grandes blocos de texto, muito espaço em branco) cruzada com pequenos acentos de interface de terminal/código (mono-space, `//`, numeração, `$`).
- **Assinatura visual central:** eyebrow mono-space numerado acima de cada título de seção, substituindo o par "ícone Lucide colorido + título" usado hoje em todas as 7 seções.
  - Antes: `🎯 Sobre Mim` (ícone em caixinha âmbar)
  - Depois: `01 · SOBRE` em `JetBrains Mono`, `text-xs`, `tracking-[0.2em]`, cor de acento, seguido do título em `Outfit` grande e neutro.
- **Logo:** mantém o monograma "ML." (não é lógica, é marca — decisão sua se quer redesenhar; sugiro apenas ajustar o peso tipográfico e remover o ponto âmbar, substituindo por um caractere `_` piscante sutil em mono-space, referência direta a cursor de terminal — reforça identidade dev sem precisar de um logotipo desenhado).
- **Favicon:** o arquivo atual está vazio (0 bytes, achado da auditoria). Proponho gerar um favicon simples baseado no monograma "ML." sobre fundo escuro, coerente com a nova paleta.

---

## 3. Nova paleta

Substitui o par "Midnight & Amber" (item mais citado na auditoria como clichê de template) por uma paleta neutra + um único acento de assinatura, com o verde-esmeralda mantido, mas **rebaixado a uso semântico estrito** (só para indicar resultado/impacto positivo — reforça a narrativa de métricas, não decoração).

### Neutros — `graphite` (substitui `midnight`)

| Token | Hex | Uso |
|---|---|---|
| graphite-50 | `#FAFAFA` | fundo modo claro |
| graphite-100 | `#F2F2F3` | fundo alternado modo claro |
| graphite-200 | `#E4E4E7` | bordas modo claro |
| graphite-400 | `#A1A1AA` | texto terciário |
| graphite-500 | `#71717A` | texto secundário |
| graphite-700 | `#3F3F46` | texto secundário modo escuro |
| graphite-800 | `#27272A` | cards modo escuro |
| graphite-900 | `#18181B` | fundo alternado modo escuro |
| graphite-950 | `#0A0A0B` | fundo modo escuro |

### Acento de assinatura — `signal` (substitui `amber` como cor primária)

| Token | Hex | Uso |
|---|---|---|
| signal-400 | `#7C82FF` | hover/estado ativo (modo escuro) |
| signal-500 | `#5B5FEF` | cor de assinatura — CTAs, links, eyebrow, foco |
| signal-600 | `#4547D1` | hover (modo claro) |

Azul-violeta elétrico: comunica tecnologia/IA/automação sem cair no roxo-genérico-de-startup-de-IA nem no azul-genérico-de-corporativo. Único acento cromático forte do site.

### Semântico — `positive` (era o `emerald` decorativo, agora com função exclusiva)

| Token | Hex | Uso |
|---|---|---|
| positive-500 | `#10B981` | **apenas** em métricas de impacto quantificado ("+25%", "90% cobertura") — nunca decorativo |

Todas as outras cores hoje usadas em `Education.tsx` (blue, cyan, violet, orange, rose, pink, slate, indigo) saem do sistema. Categorias/tags passam a usar neutro (`graphite`) com o acento `signal` reservado para o item em destaque/hover — a diversidade de cor que hoje comunica "sorteio de paleta Tailwind" dá lugar a hierarquia por peso tipográfico e espaçamento.

### Modo claro

Fundo `graphite-50`, texto `graphite-900`, cards `#FFFFFF` com borda `graphite-200` — sem gradientes de fundo coloridos (`from-white via-midnight-50/50 to-white`) — fundo sólido, mudança de tom só entre seções pares/ímpares via `graphite-50` ↔ `#FFFFFF`, não gradiente.

---

## 4. Tipografia

| Papel | Fonte | Motivo |
|---|---|---|
| Display (H1/H2 grandes) | **Outfit** (mantida) | já é uma boa geométrica moderna; o problema não é a fonte, é o uso sem escala definida |
| Corpo / UI | **Inter** (substitui Source Sans 3) | é a fonte que Linear, Vercel, GitHub e Raycast usam para UI — altamente legível em telas, neutra, "padrão de indústria" para este exato registro visual. Troca de baixo risco (só CSS/`next/font`), sem impacto em lógica |
| Mono (eyebrows, datas, tags de tecnologia, números) | **JetBrains Mono** (mantida, agora **usada**) | já carregada e ociosa hoje — vira o elemento de assinatura do site |

### Escala tipográfica (substitui os 5 breakpoints ad hoc do H1 atual)

Escala modular única aplicada via `theme.fontSize` do Tailwind (token, não classe por classe):

```
xs   12px / 16px
sm   14px / 20px
base 16px / 24px
lg   18px / 28px
xl   20px / 28px
2xl  24px / 32px
3xl  30px / 38px
4xl  38px / 46px
5xl  48px / 56px   ← H1 mobile
6xl  60px / 66px   ← H1 desktop (único salto, não 5)
```

H1 do Hero passa de `text-4xl sm:5xl md:6xl lg:7xl xl:8xl` (5 breakpoints) para `text-5xl md:text-6xl` (1 salto) — mais previsível, mais "desenhado".

Pesos: `font-light` (300) para taglines longas, `font-semibold` (600) para títulos de seção, `font-bold` (700) reservado a números/métricas — cria contraste editorial hoje ausente (tudo é `font-bold` ou `font-medium`).

---

## 5. Componentes React Bits selecionados

Cada componente abaixo resolve um problema específico identificado na auditoria — nenhum é decorativo por si só. Todos entram como **wrapper de apresentação** ao redor do conteúdo/lógica já existente.

| Componente | Onde | Resolve (ref. auditoria) | Por que este e não outro |
|---|---|---|---|
| **SplitText** | Nome + título no Hero (entrada única, ao carregar) | §4 "densidade de animação no Hero" — substitui os 7 elementos com delay em cascata por **uma** entrada de texto coesa | Reforça a mensagem central (o nome) sem multiplicar pontos de movimento na tela |
| **CountUp** | Números de impacto nos cards de Projetos e nos highlights de Experiência ("25%", "90%", "35%") | Funcional, não decorativo: dá peso às métricas que são o maior diferencial do conteúdo | Alternativa a texto estático — comunica "estes números são o produto", coerente com o pedido de "produto cuidadosamente projetado" |
| **ScrollReveal** | Eyebrow + título de cada seção, ao entrar no viewport (uma vez, sutil, sem bounce) | §4/§7 "seções se misturam sem ritmo" | Dá pontuação de leitura entre seções sem repetir a cascata de `animate-slide-up` que hoje se aplica a tudo |
| **LogoLoop** | Nova faixa "Stack" logo abaixo do Hero — ícones de Python, React, Docker, n8n, PostgreSQL etc. em loop horizontal discreto, monocromático | Resolve diretamente o gap de posicionamento apontado na auditoria (§3): o texto atual não comunica Python/IA/Agentes/n8n; uma faixa de stack visual comunica isso instantaneamente sem exigir reescrever nenhuma string de conteúdo | Elemento novo (não substitui nada existente), puramente aditivo e de baixíssimo risco |
| **Magnet** | Botão primário do Hero e CTA final de Contato | §5 "botões com hierarquia básica" | Microinteração sutil (atração magnética ao cursor) em vez de mais uma sombra colorida — é o tipo de detalhe "sente-se cuidado" que Raycast/Linear usam em CTAs |
| **DotGrid** | Fundo do Hero, opacidade muito baixa, substitui `bg-grid-pattern` + os dois "orbs" blur coloridos | §2 "grid-pattern e orbs repetidos em 4+ seções" — fica restrito a **uma única seção** (Hero), removido de todas as outras | Textura sutil e neutra (pontos, não blobs coloridos) — não compete com o texto, reforça o motivo "grid/código" sem depender de gradiente âmbar/índigo |

**Não usados de propósito:** qualquer fundo animado pesado (Aurora, Plasma, Particles, Galaxy, Threads etc.) — a instrução do projeto pede "elegante e discreto"; esses efeitos, por mais impressionantes, competem com o conteúdo e reintroduziriam o mesmo problema de "efeito por efeito" identificado na auditoria, só que mais caro em performance.

---

## 6. Animações e microinterações

| Interação | Comportamento atual | Novo comportamento |
|---|---|---|
| Entrada do Hero | 7 elementos com delay 0.1s→0.7s (cascata) | 1 entrada de texto (`SplitText`) + fade simples do resto (200ms, sem delay escalonado) |
| Cards ao hover | translate-y + shadow colorida + overlay de gradiente (idêntico em 7 seções) | borda muda de `graphite-200` → `signal-500` + elevação sutil (`shadow-md` neutro); **sem** overlay de gradiente colorido |
| Entrada de seção ao rolar | nenhuma (conteúdo simplesmente aparece) | `ScrollReveal` no eyebrow + título apenas (fade + 8px de deslocamento, 1x, sem repetir a cada card) |
| Botão primário | `hover:-translate-y-0.5` + sombra âmbar | `Magnet` (atração sutil ao cursor) + mudança de tom de fundo, sem sombra colorida |
| Métricas/números | texto estático | `CountUp` ao entrar no viewport |
| `prefers-reduced-motion` | já respeitado globalmente em `globals.css` | mantido — todos os componentes React Bits aceitam desabilitar animação; será conectado à mesma media query |

Regra geral: **cada elemento da página anima no máximo uma vez, na entrada.** Hover reage, mas não há mais "tudo pulsando/flutuando" (o `animate-float` dos ícones flutuantes do About, o `animate-pulse-slow` dos orbs) — removidos.

---

## 7. Design system (tokens)

### Espaçamento (substitui o padding uniforme `py-16 sm:py-24 md:py-32` em todas as seções)

| Nível | Uso | Valor (mobile → desktop) |
|---|---|---|
| Seção primária (Hero, Projetos, Experiência) | conteúdo de maior peso para o recrutador | `py-20 → py-36` |
| Seção secundária (Sobre, Habilidades, Educação, Depoimentos) | `py-16 → py-28` |
| Seção de apoio (Idiomas, Artigos) | `py-12 → py-20` |

Cria ritmo de leitura — seções que importam mais "respiram" mais.

### Raio de borda
Unificado em 2 níveis apenas: `rounded-lg` (8px, inputs/badges) e `rounded-2xl` (16px, cards) — hoje há `rounded-md/lg/xl/2xl/3xl` misturados sem critério.

### Sombra
1 nível neutro (`shadow-sm` padrão, `shadow-md` no hover) — remove as ~9 variações de `shadow-{cor}-500/{opacidade}` espalhadas pelo código.

### Grid/gap
`gap-6` como padrão único entre cards (hoje varia entre `gap-4`, `gap-6`, `gap-8`, `gap-12` sem lógica aparente).

---

## 8. Wireframes (ASCII)

### Header

```
┌──────────────────────────────────────────────────────────────┐
│  ML_              Sobre  Skills  Exp.  Projetos  Contato   🌐 ☾ │
└──────────────────────────────────────────────────────────────┘
```
Mais fino que hoje, sem pill de idioma com fundo — vira texto simples com dropdown.

### Hero

```
┌──────────────────────────────────────────────────────────────┐
│                     (DotGrid, opacidade 4%)                    │
│                        00 · PORTFOLIO                          │
│                                                                  │
│                     Maria Leitão                                │
│              Tech Lead & Full Stack Engineer                    │
│                                                                  │
│   Python · IA & Agentes · Automações · React · Docker           │
│                                                                  │
│         [ Vamos conversar ]   [ Ver projetos → ]                │
│                                                                  │
│   ──── LogoLoop: Python  React  Docker  n8n  PostgreSQL ────    │
└──────────────────────────────────────────────────────────────┘
```

### Seção padrão (Sobre / Skills / Educação)

```
   01 · SOBRE
   ─────────────────────────────────────
   Título da seção em Outfit, grande

   [ conteúdo em 1–2 colunas, sem card genérico repetido ]
```

### Experiência (substitui zigue-zague por lista vertical única)

```
   03 · EXPERIÊNCIA
   ─────────────────────────────────────
   │
   ●  Tech Lead                              Dez 2025 — Presente
   │  Instituto Semear · Remoto
   │  Lidero a conexão estratégica entre o Board e a engenharia...
   │  ↳ 25% melhoria de eficiência · 3 decisões estratégicas
   │
   ●  Scrum Master                           Dez 2024 — Presente
   │  Instituto Semear · Remoto
   │  ...
```
Uma coluna, rail à esquerda com linha fina + marcador — sem alternância esquerda/direita, sem seta de balão.

### Projetos

```
   04 · PROJETOS
   ─────────────────────────────────────
   ┌────────────────────────────────────┐
   │ Avaliação de Infraestrutura Cloud   │  ← card com mais peso visual
   │ Instituto Semear · Abr 2025          │    (maior padding, número
   │                                       │     CountUp em destaque)
   │ 25% de redução em custos  [CountUp] │
   │ Cloud · Análise de Requisitos        │
   │ Ver detalhes ⌄                       │
   └────────────────────────────────────┘
```

---

## 9. Ordem sugerida de implementação (Fase 3)

Cada item é implementado e aprovado individualmente, conforme processo definido no projeto:

1. Fundações: tokens Tailwind (paleta `graphite`/`signal`, escala tipográfica, fontes Inter/Outfit/JetBrains Mono), sem tocar componentes ainda.
2. Header + Footer (menor superfície, valida o novo sistema).
3. Hero (DotGrid, SplitText, LogoLoop, Magnet no CTA).
4. Sobre + Habilidades (eyebrow numerado, remoção de ícone-em-caixinha).
5. Experiência (lista vertical única, remoção do zigue-zague).
6. Projetos (card com mais peso, CountUp nas métricas).
7. Educação/Certificações, Depoimentos, Idiomas, Artigos (aplicar os mesmos tokens; remover barra de progresso e ícone de aspas).
8. Contato + revisão final de consistência entre seções.

---

**Próximo passo:** aguardando sua aprovação para iniciar a Fase 3, item 1 (fundações de design system no `tailwind.config.ts` e `globals.css`).
