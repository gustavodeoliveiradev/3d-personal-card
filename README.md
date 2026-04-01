# 3D Cyber-Identity Card 🌌

Projeto de interface de alto impacto visual que explora conceitos avançados de **CSS 3D**, **Glassmorphism** e **UX Dinâmica**. O objetivo foi criar um card de identidade que reage fisicamente à interação do usuário, simulando profundidade e reflexos de luz em tempo real.

## 🚀 Demonstração

✨ **Acesse o projeto online:** [3D Personal Identity Card](https://gustavodeoliveiradev.github.io/3d-personal-card/)

---

## 🛠️ Tecnologias e Conceitos
- **HTML5:** Estrutura semântica com foco em acessibilidade.
- **CSS3 Moderno:** - `Perspective` & `preserve-3d` para profundidade real.
  - `Clip-path` para cortes geométricos futuristas.
  - Custom Properties (Variáveis) para manipulação dinâmica de iluminação.
- **Vanilla JavaScript:** Lógica matemática para cálculo de eixos e manipulação de estados via CSS Variables.
- **Glassmorphism:** Efeito de vidro com `backdrop-filter` e bordas orgânicas.

## 🧠 Desafios Técnicos & Soluções (Deep Dive)

### 1. O Problema do "Clique Fantasma" no 3D
**Desafio:** Elementos decorativos transparentes bloqueavam a interação com os botões sociais no eixo Z.
**Solução:** Implementação de `pointer-events: none` em camadas visuais e isolamento do `translate3d` nos botões para garantir prioridade de clique no DOM.

### 2. Edge Lighting Dinâmico (Iluminação de Borda)
**Desafio:** O card parecia "morto" nas extremidades durante a inclinação.
**Solução:** Criamos uma variável CSS `--dynamic-border` controlada por `Math.abs()` no JS. Isso permite que a borda "acenda" em neon ciano proporcionalmente à intensidade da inclinação, simulando reflexo de luz física nas bordas do vidro.

### 3. Parallax de Camadas Internas
**Desafio:** Elementos internos (texto e título) movendo-se em bloco único quebravam a ilusão de profundidade.
**Solução:** Aplicação de multiplicadores de deslocamento diferentes para cada elemento no JS. O título flutua com `15px` de deslocamento enquanto o texto utiliza `10px`, criando uma sensação real de camadas flutuantes em alturas distintas.

### 4. Interação Híbrida (Mouse + Touch)
**Desafio:** Garantir a paridade de experiência entre Desktop e Mobile.
**Solução:** Implementação de `touchmove` com cálculo de coordenadas baseado em `touches[0]`, permitindo que o efeito de luz e inclinação funcione perfeitamente com o deslizar do dedo.

## 🎨 Design Decisions
- **Paleta Tech:** Fundo `--bg-dark` com acentos em `Primary Cyan` para simular luz neon.
- **Feedback Tátil:** Reset suave de estados na função `handleLeave`, garantindo que o card retorne à neutralidade visual após a interação.

---

### 📈 Evolução do Projeto
- [x] Refatoração para design autoral (Cyberpunk).
- [x] Lógica matemática de rotação 3D.
- [x] Suporte completo a dispositivos Mobile (Touch events).
- [x] Correção de Stacking Context para interatividade dos botões.
- [x] Implementação de Glare Effect (iluminação dinâmica).
- [x] **Edge Lighting System (Iluminação de borda reativa).**
- [x] **Multi-layer Parallax (Profundidade de elementos internos).**

---

Estudando para superar meus limites, sempre um commit por vez. ⚡

**Desenvolvido com ☕ por [Gustavo](https://github.com/gustavodeoliveiradev)**