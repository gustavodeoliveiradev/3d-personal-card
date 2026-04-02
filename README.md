# 📇 3D Cyber-Identity Card // HUD Interface 🌌

![Status](https://img.shields.io/badge/Status-Operational-00f2ff?style=for-the-badge)
![Dev](https://img.shields.io/badge/Dev-GusDev-black?style=for-the-badge&logo=github)
![Version](https://img.shields.io/badge/Version-2.1.0-blueviolet?style=for-the-badge)

Projeto de interface ultra-responsiva focado em **Advanced Glassmorphism** e **audiovisual interactivity**. Desenvolvido por **Gustavo (GusDev)** como uma exploração profunda de manipulação de DOM e renderização visual via CSS3.

## 🚀 Demonstração Direta
✨ **Acesse o terminal online:** [3D Personal Identity Card](https://gustavodeoliveiradev.github.io/3d-personal-card/)

---

## 🛠️ Stack Tecnológica de Elite
* **CSS3 Next-Gen:** Uso intensivo de *Custom Properties*, *Grid Layout* e *Animation Chaining*.
* **Glassmorphism 2.0:** Camadas de desfoque seletivo com sistema de **Edge Lighting** reativo.
* **HUD Engine:** Implementação de *Scanlines* dinâmicas e ruído fractal (fractal noise) via Data URI SVG.
* **Vanilla JavaScript (ES6+):** Lógica matemática para rotação 3D, cálculos de profundidade (Parallax) e estados de UI contextual.

---

## 🧠 Engenharia do Projeto (Deep Dive)

### 1. Sistema de Iluminação Reativa (Edge Lighting)
**Desafio:** O card perdia o realismo nas extremidades durante a rotação.
**Solução:** Implementamos uma variável CSS `--dynamic-border` controlada via JavaScript. Ao calcular o `Math.abs()` da inclinação, a borda "acende" em neon ciano proporcionalmente ao ângulo, simulando o comportamento físico da luz em bordas de vidro.

### 2. Multi-Layer Parallax & Z-Stacking
**Desafio:** Elementos movendo-se em bloco único quebravam a percepção de profundidade.
**Solução:** Aplicamos multiplicadores de deslocamento independentes. O título (`Gustavo // Dev`) flutua com `15px`, enquanto o corpo do texto utiliza `10px`, criando uma sensação real de camadas flutuantes em alturas distintas no eixo Z.

### 3. Texturização Digital (CRT & Scanlines)
**Desafio:** Dar uma estética de "terminal antigo" sem comprometer a legibilidade.
**Solução:** Camadas de pseudo-elementos (`::before` e `::after`) renderizam *scanlines* de 1px e um ruído estático sutil. A animação de *scan* foi sincronizada para "energizar" as linhas à medida que a barra de luz percorre o card.

---

## 🕹️ Funcionalidades Implementadas
- [x] **Parallax 3D:** Interação fluida baseada na posição do mouse/touch.
- [x] **Dynamic Scanline:** Barra de escaneamento com brilho sincronizado.
- [x] **System Skills // Level:** Barras de progresso neon com preenchimento animado.
- [x] **Contextual UI:** O ícone de expansão altera direção e texto dinamicamente.
- [x] **Mobile First:** Suporte completo a eventos de `touchmove` para paridade de experiência.

## 📅 Roadmap de Evolução
- [ ] **Refatoração Estrutural:** Organização modular do CSS e JS (Scheduled for tomorrow).
- [ ] **SFX Interface:** Adição de efeitos sonoros sutis para expansão do card.
- [ ] **Theme Switcher:** Alternância entre perfis "Cyber-Cyan" e "Glitch-Red".

---

> "Estudando para superar meus limites, sempre um commit por vez." ⚡ — *Inspirado no Mindset Gohan.*

**Desenvolvido por [Gustavo (GusDev)](https://github.com/gustavodeoliveiradev)**