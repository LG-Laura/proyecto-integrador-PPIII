document.addEventListener('DOMContentLoaded', function () {
    const techItems = document.querySelectorAll('.tech-item');
    let currentIndex = 0;

    function showTechItem(index) {
        techItems.forEach((item, i) => {
            item.style.opacity = '0'; // Oculta todos los elementos
            item.style.animation = 'fadeOut 2s forwards'; // Aplica animación de desvanecimiento
        });

        techItems[index].style.opacity = '1'; // Muestra el elemento actual
        techItems[index].style.animation = 'fadeIn 2s forwards'; // Aplica animación de aparición

        // Avanza al siguiente índice
        currentIndex = (index + 1) % techItems.length; // Ciclismo de índice
    }

    setInterval(() => {
        showTechItem(currentIndex);
    }, 4000); // Cambia cada 4 segundos (2s para mostrar + 2s para desvanecer)
});

