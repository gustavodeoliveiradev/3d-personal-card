# 3D Cyber-Identity Card 🌌

Projeto de interface de alto impacto visual que explora conceitos avançados de **CSS 3D**, **Glassmorphism** e **UX Dinâmica**. O objetivo foi criar um card de identidade que reage fisicamente à interação do usuário, simulando profundidade e reflexos de luz em tempo real.

## 🚀 Demonstração

✨ **Acesse o projeto online:** [3D Personal Identity Card](https://gustavodeoliveiradev.github.io/3d-personal-card/)

---

## 🛠️ Tecnologias e Conceitos
- **HTML5:** Estrutura semântica com foco em acessibilidade.
- **CSS3 Moderno:** 
  - `Perspective` & `preserve-3d` para profundidade real.
  - `Clip-path` para cortes geométricos futuristas.
  - Custom Properties (Variáveis) para fácil manutenção de temas.
- **Vanilla JavaScript:** Lógica matemática para cálculo de eixos e manipulação de eventos de ponteiro.
- **Glassmorphism:** Efeito de vidro com `backdrop-filter` e bordas orgânicas.

## 🧠 Desafios Técnicos & Soluções (Deep Dive)

### 1. O Problema do "Clique Fantasma" no 3D
**Desafio:** Ao aplicar múltiplas camadas 3D (`glass`, `glare`, `content`), os botões sociais pararam de funcionar porque elementos decorativos transparentes estavam "fisicamente" na frente deles no eixo Z, bloqueando o mouse.
**Solução:** Implementamos uma hierarquia de `pointer-events: none` em camadas decorativas e isolamos o `translate3d` diretamente nos botões, retirando a transformação do container pai para garantir que o navegador priorizasse o clique na camada correta.

### 2. Matemática de Perspectiva
**Desafio:** Criar uma rotação que parecesse natural e não "quebrasse" o card.
**Solução:** Cálculo de percentual relativo ao centro do card:
- $RotateX = (Y_{pct} * -30)$
- $RotateY = (X_{pct} * 30)$
Isso garante que o card se incline "em direção" ao cursor, aumentando a imersão.

### 3. Interação Híbrida (Mouse + Touch)
**Desafio:** O efeito funcionava apenas no Desktop.
**Solução:** Implementação de `touchmove` com `preventDefault` para evitar o scroll da página enquanto o usuário interage com o card no mobile, garantindo paridade de experiência.

## 🎨 Design Decisions
- **Paleta Tech:** Fundo `--bg-dark` com acentos em `Primary Cyan` para simular luz neon.
- **HUD Minimalista:** Substituição de elementos genéricos por um sistema de linhas e hexadecimais sutil (`SYS_ACTIVE // 092`).
- **Feedback Tátil:** Efeito de `scale` e `shadow` dinâmico que acompanha a inclinação do card, reforçando a sensação de objeto físico.

---

### 📈 Evolução do Projeto
- [x] Refatoração para design autoral (Cyberpunk).
- [x] Lógica matemática de rotação 3D.
- [x] Suporte completo a dispositivos Mobile (Touch events).
- [x] Correção de Stacking Context para interatividade dos botões.
- [x] Implementação de Glare Effect (iluminação dinâmica).

---

Estudando para superar meus limites, sempre um commit por vez. ⚡

**Desenvolvido com ☕ por [Gustavo](https://github.com/gustavodeoliveiradev)**