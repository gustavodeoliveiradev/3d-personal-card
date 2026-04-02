const parent = document.querySelector('.parent');
const card = document.querySelector('.card');
const viewMoreBtn = document.querySelector('.view-more-button');
const viewMoreIcon = document.querySelector('.view-more-icon');

function handleMove(e) {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const { width, height, left, top } = parent.getBoundingClientRect();

    const mouseX = clientX - left;
    const mouseY = clientY - top;

    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;

    const rotateX = yPct * -30;
    const rotateY = xPct * 30;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    // --- NOVIDADE 1: EDGE LIGHTING ---
    // Calculamos a intensidade total da inclinação
    const intensity = Math.max(Math.abs(xPct), Math.abs(yPct));
    // A borda vai de 0.1 (suave) até 0.6 (brilhante) conforme você inclina
    const borderAlpha = 0.1 + (intensity * 0.5);
    card.style.setProperty('--dynamic-border', `rgba(0, 242, 255, ${borderAlpha})`);

    // --- NOVIDADE 2: PARALLAX INTERNO ---
    // Faz o Título e o Texto flutuarem levemente
    // Eles se movem na mesma direção do mouse (X e Y positivos)
    const title = document.querySelector('.title');
    const text = document.querySelector('.text');

    if (title) title.style.transform = `translate3d(${xPct * 10}px, ${yPct * 10}px, 40px)`;
    if (text) text.style.transform = `translate3d(${xPct * 10}px, ${yPct * 10}px, 30px)`;

    // --- SUA SOMBRA (Mantida como você gosta) ---
    const shadowX = xPct * -35; // Aumentamos um pouco o deslocamento horizontal
    const shadowY = yPct * -35; // Aumentamos um pouco o deslocamento vertical

    // O blur também aumenta na inclinação para dar sensação de altura
    const shadowBlur = 30 + (Math.abs(xPct) + Math.abs(yPct)) * 30;
    // Aplicamos a sombra principal e o brilho sutil
    card.style.boxShadow = `
        ${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0, 0, 0, 0.4),
        0 0 20px rgba(0, 242, 255, 0.05)`;

    // --- GLARE (Mantenha igual) ---
    const px = (mouseX / width) * 100;
    const py = (mouseY / height) * 100;
    card.style.setProperty('--mouse-x', `${px}%`);
    card.style.setProperty('--mouse-y', `${py}%`);
}

function handleLeave() {
    card.classList.remove('scanning'); // Desliga o scanner
    card.style.transform = `rotateX(0deg) rotateY(0deg)`;
    card.style.boxShadow = `0 0 0 transparent`;
    // Reseta a borda para o estado inicial (opacidade baixa)
    card.style.setProperty('--dynamic-border', `rgba(255, 255, 255, 0.1)`);
}

parent.addEventListener('mousemove', handleMove);
parent.addEventListener('mouseleave', handleLeave);

parent.addEventListener('touchmove', (e) => {
    e.preventDefault();
    handleMove(e);
}, { passive: false });

parent.addEventListener('touchend', handleLeave);

parent.addEventListener('mouseenter', () => {
    card.classList.add('scanning');
});

viewMoreBtn.addEventListener('click', () => {
    // 1. Alterna o estado do card
    card.classList.toggle('expanded');
    // 2. Checa o estado para trocar o ícone
    if (card.classList.contains('expanded')) {
        viewMoreIcon.classList.replace('fa-angles-down', 'fa-angles-up');
        viewMoreBtn.textContent = 'View Less'; // Muda o texto também!
    } else {
        viewMoreIcon.classList.replace('fa-angles-up', 'fa-angles-down');
        viewMoreBtn.textContent = 'View More';
    }
});