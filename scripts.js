const parent = document.querySelector('.parent');
const card = document.querySelector('.card');

// Função mestre para calcular a rotação
function handleMove(e) {
    // Detecta se é touch ou mouse para pegar as coordenadas certas
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const { width, height, left, top } = parent.getBoundingClientRect();

    const mouseX = clientX - left;
    const mouseY = clientY - top;

    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;

    // Multiplicamos por 30 para o ângulo de inclinação
    const rotateX = yPct * -30; 
    const rotateY = xPct * 30;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}

// Função para resetar a posição
function handleLeave() {
    card.style.transform = `rotateX(0deg) rotateY(0deg)`;
}

// Ouvintes para Mouse
parent.addEventListener('mousemove', handleMove);
parent.addEventListener('mouseleave', handleLeave);

// Ouvintes para Touch (Celular)
parent.addEventListener('touchmove', (e) => {
    // Impede o scroll da página enquanto arrasta o dedo no card
    e.preventDefault(); 
    handleMove(e);
}, { passive: false });

parent.addEventListener('touchend', handleLeave);