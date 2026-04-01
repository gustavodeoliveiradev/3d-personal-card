const parent = document.querySelector('.parent');
const card = document.querySelector('.card');

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
    const shadowX = xPct * -30;
    const shadowY = yPct * -30;
    card.style.boxShadow = `
        ${shadowX}px ${shadowY}px 50px rgba(0, 0, 0, 0.5),
        0 0 20px rgba(0, 242, 255, 0.1)`;

    // --- GLARE (Mantenha igual) ---
    const px = (mouseX / width) * 100;
    const py = (mouseY / height) * 100;
    card.style.setProperty('--mouse-x', `${px}%`);
    card.style.setProperty('--mouse-y', `${py}%`);
}

function handleLeave() {
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