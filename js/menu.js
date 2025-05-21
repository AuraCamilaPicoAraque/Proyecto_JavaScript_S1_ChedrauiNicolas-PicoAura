// Configuración básica del carrusel
document.addEventListener('DOMContentLoaded', function() {
    // 1. Inicializar el carrusel
    const miCarrusel = new Swiper('.swiper-container', {
        // 2. Configuración básica
        loop: true,               // Hace que el carrusel sea infinito
        autoplay: {
            delay: 3000,          // Cambia cada 3 segundos
            disableOnInteraction: false // Sigue funcionando al interactuar
        },
        
        // 3. Opciones de navegación
        pagination: {
            el: '.swiper-pagination', // Muestra los puntos de paginación
            clickable: true            // Permite hacer clic en los puntos
        },
        navigation: {
            nextEl: '.swiper-button-next', // Flecha siguiente
            prevEl: '.swiper-button-prev'  // Flecha anterior
        }
    });
    
    // 4. Opcional: Pausar al pasar el ratón
    const contenedor = document.querySelector('.swiper-container');
    contenedor.addEventListener('mouseenter', () => miCarrusel.autoplay.stop());
    contenedor.addEventListener('mouseleave', () => miCarrusel.autoplay.start());
});