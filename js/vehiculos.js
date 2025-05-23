document.addEventListener('DOMContentLoaded', function() {
    const API_URL = 'https://681bd7ee6ae7c794cf6ff13d.mockapi.io/ProyectosJavaScript';
    const vehiclesContainer = document.getElementById('vehicles-container');
    let vehiculos = [];
    
    // Función para mostrar error
    function showError(message) {
        vehiclesContainer.innerHTML = `<div class="error-message">${message}</div>`;
    }
    
    // Función para crear un slide de vehículo
    function createVehicleSlide(vehicle) {
        return `
            <div class="swiper-slide">
                <img src="${vehicle.imagen || 'https://via.placeholder.com/400x250?text=Vehículo+No+Disponible'}" 
                     alt="${vehicle.nombre}" class="vehicle-image">
                <div class="vehicle-details">
                    <h2 class="vehicle-name">${vehicle.nombre || 'Vehículo'}</h2>
                    <div class="vehicle-specs">
                        <div class="spec-item"><strong>Motor:</strong> ${vehicle.motor || 'N/A'}</div>
                        <div class="spec-item"><strong>Potencia:</strong> ${vehicle.potencia || 'N/A'}</div>
                        <div class="spec-item"><strong>Peso:</strong> ${vehicle.peso || 'N/A'} kg</div>
                        <div class="spec-item"><strong>Velocidad Máx:</strong> ${vehicle.velocidadMaxima || 'N/A'} km/h</div>
                    </div>
                    <p><strong>Equipo:</strong> ${vehicle.equipo || 'Sin equipo asignado'}</p>
                    <p><strong>Año:</strong> ${vehicle.anio || 'N/A'}</p>
                </div>
            </div>
        `;
    }
    
    // Función para renderizar el carrusel
    function renderCarrusel() {
        if (vehiculos.length === 0) {
            showError('No hay vehículos disponibles en este momento.');
            return;
        }
        
        vehiclesContainer.innerHTML = '';
        vehiculos.forEach(vehicle => {
            vehiclesContainer.innerHTML += createVehicleSlide(vehicle);
        });
        
        initSwiper();
    }
    
    // Función para inicializar Swiper
    function initSwiper() {
        const miCarrusel = new Swiper('.swiper-container', {
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            effect: 'slide',
            speed: 800,
            grabCursor: true,
            spaceBetween: 20
        });
    }
    
    // Cargar datos de la API
    function loadVehicles() {
        fetch(API_URL)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Error HTTP: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                // Asumiendo que la API devuelve un array donde el primer elemento tiene propiedad 'vehiculos'
                vehiculos = data[0]?.vehiculos || [];
                renderCarrusel();
            })
            .catch(err => {
                console.error('Error al obtener vehículos:', err);
                showError('No se pudo cargar la lista de vehículos. Por favor intenta más tarde.');
            });
    }
    
    // Iniciar la carga de vehículos
    loadVehicles();
});


document.addEventListener('DOMContentLoaded', function () {
  const usuarioDropdown = document.getElementById('usuarioDropdown');
  const dropdownMenu = document.getElementById('dropdownMenu');

  // Mostrar/ocultar menú al hacer clic
  usuarioDropdown.addEventListener('click', function (e) {
    e.stopPropagation();
    dropdownMenu.classList.toggle('show');
  });

  // Ocultar menú al hacer clic fuera
  document.addEventListener('click', function () {
    dropdownMenu.classList.remove('show');
  });
});