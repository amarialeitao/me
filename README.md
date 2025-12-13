# Maria Leitão - Landing Page Portfolio

Uma landing page moderna, profissional e responsiva para showcase de habilidades profissionais.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)

## ✨ Features

- 🌙 **Dark/Light Mode** - Toggle persistente com localStorage
- 🌍 **Multi-idioma (i18n)** - Português, Inglês e Espanhol
- 📱 **Responsivo** - Mobile-first design
- ⚡ **Performance** - Otimizado para Core Web Vitals
- ♿ **Acessibilidade** - Semântica HTML e ARIA labels
- 🎨 **Design Moderno** - Gradientes, animações e glassmorphism

## 🚀 Quick Start

### Pré-requisitos

- Node.js 18+ 
- npm, yarn ou pnpm

### Instalação

```bash
# Clonar/acessar o projeto
cd landing-page

# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

### Build para Produção

```bash
npm run build
npm run start
```

## 📁 Estrutura do Projeto

```
landing-page/
├── src/
│   ├── app/
│   │   ├── globals.css      # Estilos globais + Tailwind
│   │   ├── layout.tsx       # Layout raiz + SEO
│   │   └── page.tsx         # Página principal
│   ├── components/
│   │   ├── Header.tsx       # Navegação + Toggle tema/idioma
│   │   ├── Hero.tsx         # Seção principal
│   │   ├── About.tsx        # Sobre mim
│   │   ├── Skills.tsx       # Habilidades técnicas
│   │   ├── Experience.tsx   # Experiência profissional
│   │   ├── Education.tsx    # Formação e certificações
│   │   ├── Languages.tsx    # Idiomas
│   │   ├── Testimonials.tsx # Recomendações
│   │   ├── Contact.tsx      # Contato
│   │   └── Footer.tsx       # Rodapé
│   ├── contexts/
│   │   ├── ThemeContext.tsx    # Contexto dark/light mode
│   │   └── LanguageContext.tsx # Contexto i18n
│   └── i18n/
│       ├── index.ts         # Configuração i18n
│       ├── pt.json          # Traduções Português
│       ├── en.json          # Traduções Inglês
│       └── es.json          # Traduções Espanhol
├── public/                   # Assets estáticos
├── tailwind.config.ts       # Configuração Tailwind
├── next.config.js           # Configuração Next.js
└── package.json
```

## 🎨 Personalização

### Cores

Edite `tailwind.config.ts` para alterar a paleta:

```typescript
colors: {
  midnight: { ... },  // Cor base (dark theme)
  amber: { ... },     // Cor de destaque
}
```

### Conteúdo

Edite os arquivos JSON em `src/i18n/` para atualizar textos:

- `pt.json` - Português
- `en.json` - Inglês  
- `es.json` - Espanhol

### Imagens

Adicione suas imagens em `public/`:

- `og-image.png` - Open Graph (1200x630)
- `favicon.ico` - Favicon
- `apple-touch-icon.png` - iOS icon

## 🚀 Deploy

### Vercel (Recomendado)

1. Push para GitHub
2. Conecte no [Vercel](https://vercel.com)
3. Deploy automático

```bash
# Ou via CLI
npm i -g vercel
vercel
```

### Outras Plataformas

```bash
npm run build
# Sirva a pasta .next ou exporte como estático
```

## 🔮 Melhorias Futuras

### Animações Avançadas
- [ ] Framer Motion para transições de página
- [ ] Scroll-triggered animations
- [ ] Cursor personalizado
- [ ] Parallax effects

### Analytics & SEO
- [ ] Google Analytics 4
- [ ] Structured Data (JSON-LD)
- [ ] Sitemap.xml dinâmico
- [ ] robots.txt otimizado

### Features Adicionais
- [ ] Blog integrado (MDX)
- [ ] Seção de projetos com modal
- [ ] Formulário de contato funcional
- [ ] Download de CV em PDF
- [ ] Modo "terminal" easter egg

### Integrações
- [ ] CMS headless (Contentful/Sanity)
- [ ] Calendly embed para agendamentos
- [ ] LinkedIn API para atualização automática
- [ ] GitHub API para mostrar projetos

### Performance
- [ ] Image optimization com next/image
- [ ] Font subsetting
- [ ] Critical CSS extraction
- [ ] Service Worker para PWA

## 📄 Licença

MIT © Maria Leitão

---

Desenvolvido com ❤️ usando Next.js, TypeScript e Tailwind CSS

