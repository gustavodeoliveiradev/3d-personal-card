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

    // Aplica no card (que tem clip-path e overflow hidden)
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    const shadowX = xPct * -30;
    const shadowY = yPct * -30;

    card.style.boxShadow = `
    ${shadowX}px ${shadowY}px 50px rgba(0, 0, 0, 0.5),
    0 0 20px rgba(0, 242, 255, 0.1)`;

    const px = (mouseX / width) * 100;
    const py = (mouseY / height) * 100;

    card.style.setProperty('--mouse-x', `${px}%`);
    card.style.setProperty('--mouse-y', `${py}%`);
}

function handleLeave() {
    card.style.transform = `rotateX(0deg) rotateY(0deg)`;
    card.style.boxShadow = `0 0 0 transparent`;
}

parent.addEventListener('mousemove', handleMove);
parent.addEventListener('mouseleave', handleLeave);

parent.addEventListener('touchmove', (e) => {
    e.preventDefault();
    handleMove(e);
}, { passive: false });

parent.addEventListener('touchend', handleLeave);