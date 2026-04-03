# 📇 3D Cyber-Identity Card // HUD Interface

[![Status](https://img.shields.io/badge/Status-Operational-00f2ff?style=for-the-badge)](https://gustavodeoliveiradev.github.io/3d-personal-card/)
[![Dev](https://img.shields.io/badge/Dev-GusDev-black?style=for-the-badge&logo=github)](https://github.com/gustavodeoliveiradev)
[![Version](https://img.shields.io/badge/Version-2.1.0-blueviolet?style=for-the-badge)](CHANGELOG.md)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

> Interface ultra-responsiva de identidade digital combinando **Advanced Glassmorphism**, **renderização 3D em tempo real** e **engenharia de micro-interações**. Desenvolvido como estudo de caso em performance de CSS e arquitetura JavaScript moderna.

[🌐 Demonstração ao Vivo](https://gustavodeoliveiradev.github.io/3d-personal-card/) • [📋 Change Log](CHANGELOG.md) • [🐛 Reportar Issue](../../issues)

---

## ✨ Visão Geral

O **3D Cyber-Identity Card** é uma interface de apresentação pessoal que simula um terminal HUD (Heads-Up Display) de ficção científica. O projeto explora técnicas avançadas de:

- **Renderização 3D via CSS**: Transforms, perspective e preserve-3d
- **Física de interação**: Cálculos trigonométricos para rotação reativa ao cursor
- **Sistemas de partículas visuais**: Scanlines, ruído procedural e glare dinâmico
- **Arquitetura de componentes**: Código modular e performático

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia | Implementação |
|--------|-----------|-------------|
| **Estilização** | CSS3 Custom Properties | Design tokens, temas dinâmicos |
| **Layout** | CSS Grid + Flexbox | Sistema de camadas Z-stack |
| **Efeitos Visuais** | SVG Data URI + CSS Filters | Ruído fractal, backdrop-filter |
| **Interatividade** | Vanilla JS (ES6+ Classes) | HUDCard Controller, RAF optimization |
| **Acessibilidade** | WAI-ARIA | Roles, labels, reduced-motion |

---

## 🏗️ Arquitetura do Sistema

### Hierarquia de Componentes

- **SCENE** (Perspective Container)
  - **HUD-CARD** (Preserve-3D)
    - **SCANLINES LAYER** (Estático, z-index: 1)
    - **SCANNER** (Animado, z-index: 4)
    - **GLASS LAYER** (Blur + Noise, translateZ: 20px)
    - **CONTENT** (Título + Texto com Parallax)
    - **FOOTER** (Social Links + Expand Button)

### Fluxo de Dados

1. **Input**: Mouse/Touch Event capturado pelo container
2. **Processamento**: HUDCard Controller calcula ângulos de rotação
3. **Output**: Atualização CSS (transform, box-shadow, --dynamic-border)
4. **Render**: RequestAnimationFrame sincroniza a 60fps

---

## 🧠 Engenharia de Implementação

### 1. Sistema de Tilt 3D Reativo

**Conceito**: Rotacionar o card em 3D baseado na posição relativa do cursor dentro do container.

**Implementação**:

```javascript
// Normalização da posição do mouse (-0.5 a 0.5)
const xPct = (mouseX / width) - 0.5;
const yPct = (mouseY / height) - 0.5;

// Rotação invertida no eixo X para comportamento natural
const rotateX = yPct * -25; // Max 25deg
const rotateY = xPct * 25;
```

**Otimização**: Uso de `requestAnimationFrame` para sincronizar com o refresh rate do monitor, eliminando repaints desnecessários.

### 2. Edge Lighting Dinâmico

**Problema**: Bordas estáticas quebram a ilusão de profundidade.

**Solução**: Variável CSS `--dynamic-border` atualizada em tempo real baseada na intensidade da rotação:

```javascript
const intensity = Math.max(Math.abs(xPct), Math.abs(yPct));
const borderAlpha = 0.1 + (intensity * 0.5);
card.style.setProperty('--dynamic-border', `rgba(0, 242, 255, ${borderAlpha})`);
```

### 3. Multi-Layer Parallax

**Técnica**: Cada elemento recebe um multiplicador de profundidade via atributo `data-parallax`:

| Elemento | Multiplicador | Deslocamento Máx |
|----------|--------------|------------------|
| Título | 1.2 | 18px |
| Descrição | 0.8 | 12px |
| Botões | 1.0 | 15px |

**Cálculo**:

```javascript
const strength = parseFloat(el.dataset.parallax);
const moveX = xPct * 15 * strength;
const moveY = yPct * 15 * strength;
```

### 4. Procedural Texture Generation

**Ruído Fractal**: Gerado via SVG Data URI embutido, eliminando requests externos:

```css
background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
```

**Performance**: `mix-blend-mode: overlay` com opacity 0.04 para impacto mínimo no compositor.

### 5. Sistema de Scanner Sincronizado

**Animação CSS** do scanner com efeito de energização das scanlines:

```css
/* Scanner se move */
animation: scanner-move 3s ease-in-out infinite;

/* Scanlines brilham quando scanner passa */
.hud-card[data-scanning="true"] .hud-card__scanner {
  opacity: 0.8;
}
```

---

## 📁 Estrutura de Arquivos

```
3d-personal-card/
├── index.html              # Estrutura semântica, ARIA labels
├── styles.css              # Arquitetura CSS: Variables → Components → States
├── scripts.js              # Classe HUDCard, controller principal
├── assets/
│   └── (empty - tudo via CDN/Data URI)
├── .github/
│   └── workflows/          # CI/CD para GitHub Pages
├── CHANGELOG.md            # Histórico de versões
├── LICENSE                 # MIT License
└── README.md               # Este arquivo
```

---

## 🚀 Getting Started

### Pré-requisitos
- Navegador moderno com suporte a CSS3 e ES6+
- Git (para clonagem)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/gustavodeoliveiradev/3d-personal-card.git

# Entre no diretório
cd 3d-personal-card

# Abra no navegador (ou use Live Server)
open index.html
```

### Personalização

Edite as variáveis CSS em `:root` para alterar o tema:

```css
:root {
  --color-primary: #00f2ff;        /* Ciano Cyber */
  --color-primary-rgb: 0, 242, 255;
  --color-text: #a0a0c0;           /* Texto secundário */
  --card-width: 320px;             /* Dimensões */
  --rotate-max: 25deg;             /* Limite de rotação */
}
```

---

## 🎯 Funcionalidades

- [x] **Tilt 3D Reativo**: Rotação suave baseada em posição do cursor
- [x] **Parallax Multi-Camadas**: Elementos flutuantes com profundidade variável
- [x] **Edge Lighting**: Bordas que "acendem" conforme inclinação
- [x] **Scanner HUD**: Animação de escaneamento com sincronização visual
- [x] **Glassmorphism Avançado**: Blur, noise e transparência estratificados
- [x] **Expand UI**: Seção de skills com barras de progresso animadas
- [x] **Touch Support**: Paridade de experiência em dispositivos móveis
- [x] **Acessibilidade**: Suporte a teclado, leitores de tela e `prefers-reduced-motion`

---

## 🗺️ Roadmap

### v2.2.0 (Em Desenvolvimento)
- [ ] **Audio SFX**: Efeitos sonoros sutis na expansão do card
- [ ] **Theme Switcher**: Toggle entre modos Cyber-Cyan e Glitch-Red
- [ ] **Particle System**: Micro-partículas de fundo animadas

### v3.0.0 (Planejado)
- [ ] **WebGL Integration**: Three.js para efeitos de profundidade avançados
- [ ] **Configuração Dinâmica**: Painel de customização em tempo real
- [ ] **Export Card**: Geração de imagem estática do card

---

## 🧪 Performance Metrics

| Métrica | Valor | Status |
|---------|-------|--------|
| First Contentful Paint | < 1.2s | ✅ Excelente |
| Time to Interactive | < 1.5s | ✅ Excelente |
| Cumulative Layout Shift | 0 | ✅ Perfeito |
| Animation Frame Rate | 60fps | ✅ Estável |

**Otimizações aplicadas**:
- Cache de elementos DOM (evita querySelector em loop)
- `requestAnimationFrame` para updates visuais
- `will-change: transform` em camadas animadas
- SVG inline (elimina requests HTTP)
- `passive: true` para eventos de touch

---

## ♿ Acessibilidade

- **ARIA Labels**: Todos os controles interativos identificados
- **Keyboard Navigation**: Tab order lógico, foco visível
- **Reduced Motion**: Respeita `prefers-reduced-motion` desativando animações
- **Screen Reader**: Estrutura semântica com headings hierárquicos

---

## 🤝 Contribuição

Contribuições são bem-vindas! Siga o fluxo:

1. Fork o projeto
2. Crie sua branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add: nova funcionalidade'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

**Padrões de Commit**:
- `Add:` Nova funcionalidade
- `Fix:` Correção de bug
- `Refactor:` Refatoração de código
- `Docs:` Documentação
- `Style:` Formatação, sem mudança de código

---

## 📄 Licença

Distribuído sob licença MIT. Veja [LICENSE](LICENSE) para mais informações.

---

## 🙏 Agradecimentos

- **Comunidade CSS-Tricks** - Técnicas de glassmorphism e 3D transforms
- **Google Fonts** - Tipografia Poppins
- **Font Awesome** - Iconografia
- **Inspiração** - Interfaces de jogos como Cyberpunk 2077 e Watch Dogs

---

> *"Estudando para superar meus limites, sempre um commit por vez."* ⚡

**[Gustavo (GusDev)](https://github.com/gustavodeoliveiradev)** — Software Developer

[![GitHub](https://img.shields.io/badge/GitHub-gustavodeoliveiradev-181717?style=flat-square&logo=github)](https://github.com/gustavodeoliveiradev)
[![Twitter](https://img.shields.io/badge/Twitter-@GuOliverDev-1DA1F2?style=flat-square&logo=twitter)](https://x.com/GuOliverDev)
[![Email](https://img.shields.io/badge/Email-gustavodeoliveira.dev@gmail.com-EA4335?style=flat-square&logo=gmail)](mailto:gustavodeoliveira.dev@gmail.com)
