document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.tech-carousel');
  const totalWidth = carousel.scrollWidth;
  
  // Cuando la animación completa el ciclo, restablecemos la posición del carrusel.
  carousel.addEventListener('animationiteration', () => {
    carousel.style.transform = 'translateX(0)'; // Reinicia el scroll
  });
});

