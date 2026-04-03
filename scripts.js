/**
 * HUD Card 3D - Controller
 * Performance otimizada: RAF, cache de DOM, throttling implícito
 */

class HUDCard {
  constructor() {
    // Cache de elementos (evita querySelector a cada frame)
    this.elements = {
      scene: document.querySelector('.scene'),
      card: document.getElementById('hudCard'),
      expandBtn: document.getElementById('expandBtn'),
      parallaxElements: document.querySelectorAll('[data-parallax]')
    };

    // Estado
    this.state = {
      isExpanded: false,
      isHovering: false,
      rafId: null,
      bounds: null
    };

    // Configurações
    this.config = {
      rotateMax: 25,
      parallaxStrength: 15,
      glareSize: 60
    };

    this.init();
  }

  init() {
    this.bindEvents();
    this.updateBounds();
    
    // Recalcula bounds no resize (com debounce simples)
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => this.updateBounds(), 250);
    });
  }

  updateBounds() {
    this.state.bounds = this.elements.scene.getBoundingClientRect();
  }

  bindEvents() {
    const { scene, card, expandBtn } = this.elements;

    // Mouse events
    scene.addEventListener('mouseenter', () => this.onMouseEnter());
    scene.addEventListener('mousemove', (e) => this.onMouseMove(e));
    scene.addEventListener('mouseleave', () => this.onMouseLeave());

    // Touch events (otimizados)
    scene.addEventListener('touchstart', (e) => {
      this.onMouseEnter();
      this.onMouseMove(e.touches[0]);
    }, { passive: true });

    scene.addEventListener('touchmove', (e) => {
      e.preventDefault(); // Previne scroll enquanto interage com o card
      this.onMouseMove(e.touches[0]);
    }, { passive: false });

    scene.addEventListener('touchend', () => this.onMouseLeave());

    // Expand button
    expandBtn.addEventListener('click', () => this.toggleExpand());

    // Keyboard accessibility
    expandBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.toggleExpand();
      }
    });
  }

  onMouseEnter() {
    this.state.isHovering = true;
    this.elements.card.setAttribute('data-scanning', 'true');
    this.updateBounds(); // Garante bounds atualizados
  }

  onMouseMove(e) {
    if (!this.state.isHovering || !this.state.bounds) return;

    // Usa RAF para sincronizar com o refresh rate da tela
    if (this.state.rafId) return;
    
    this.state.rafId = requestAnimationFrame(() => {
      this.handleTilt(e);
      this.state.rafId = null;
    });
  }

  handleTilt(e) {
    const { card, parallaxElements } = this.elements;
    const { bounds } = this.state;
    const { rotateMax, parallaxStrength } = this.config;

    // Calcula posição relativa do mouse
    const mouseX = e.clientX - bounds.left;
    const mouseY = e.clientY - bounds.top;

    // Normaliza (-0.5 a 0.5)
    const xPct = (mouseX / bounds.width) - 0.5;
    const yPct = (mouseY / bounds.height) - 0.5;

    // Rotação 3D (invertido para efeito natural)
    const rotateX = yPct * -rotateMax;
    const rotateY = xPct * rotateMax;

    // Intensidade para efeitos dinâmicos
    const intensity = Math.max(Math.abs(xPct), Math.abs(yPct));
    const borderAlpha = 0.1 + (intensity * 0.5);

    // Aplica transformações
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    card.style.setProperty('--dynamic-border', `rgba(0, 242, 255, ${borderAlpha})`);
    
    // Sombra dinâmica
    const shadowX = xPct * -30;
    const shadowY = yPct * -30;
    const shadowBlur = 30 + (intensity * 40);
    card.style.boxShadow = `
      ${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0, 0, 0, 0.5),
      0 0 30px rgba(0, 242, 255, ${0.05 + intensity * 0.1})
    `;

    // Glare position
    const glareX = (mouseX / bounds.width) * 100;
    const glareY = (mouseY / bounds.height) * 100;
    card.style.setProperty('--mouse-x', `${glareX}%`);
    card.style.setProperty('--mouse-y', `${glareY}%`);

    // Parallax em elementos internos (título, texto)
    parallaxElements.forEach(el => {
      const strength = parseFloat(el.dataset.parallax) || 1;
      const moveX = xPct * parallaxStrength * strength;
      const moveY = yPct * parallaxStrength * strength;
      const z = el.classList.contains('hud-card__title') ? 40 : 30;
      el.style.transform = `translate3d(${moveX}px, ${moveY}px, ${z}px)`;
    });
  }

  onMouseLeave() {
    this.state.isHovering = false;
    this.elements.card.setAttribute('data-scanning', 'false');
    
    // Reset suave
    this.elements.card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    this.elements.card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    this.elements.card.style.setProperty('--dynamic-border', 'rgba(255, 255, 255, 0.1)');

    // Reset parallax
    this.elements.parallaxElements.forEach(el => {
      const z = el.classList.contains('hud-card__title') ? 40 : 30;
      el.style.transform = `translate3d(0, 0, ${z}px)`;
    });
  }

  toggleExpand() {
    const { card, expandBtn } = this.elements;
    const icon = expandBtn.querySelector('.expand-btn__icon');
    const text = expandBtn.querySelector('.expand-btn__text');
    const extraContent = document.getElementById('extraContent');

    this.state.isExpanded = !this.state.isExpanded;

    if (this.state.isExpanded) {
      card.classList.add('hud-card--expanded');
      expandBtn.setAttribute('aria-expanded', 'true');
      extraContent.setAttribute('aria-hidden', 'false');
      text.textContent = 'View Less';
      icon.classList.replace('fa-angles-down', 'fa-angles-up');
    } else {
      card.classList.remove('hud-card--expanded');
      expandBtn.setAttribute('aria-expanded', 'false');
      extraContent.setAttribute('aria-hidden', 'true');
      text.textContent = 'View More';
      icon.classList.replace('fa-angles-up', 'fa-angles-down');
    }
  }
}

// Inicializa quando DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new HUDCard());
} else {
  new HUDCard();
}