const carrusel = document.getElementById('carrusel-container');
const btnAnterior = document.getElementById('anterior');
const btnSiguiente = document.getElementById('siguiente');

let pilotos = [];
let indiceCentral = 1; // El que está en el centro

function renderCarrusel() {
  // Aplicamos una animación de salida
  carrusel.style.transition = 'transform 0.4s ease';
  carrusel.style.transform = 'translateX(-20px)';

  // Luego de un breve retraso, actualizamos el contenido y volvemos a posición original
  setTimeout(() => {
    carrusel.innerHTML = '';

    const indices = [
      (indiceCentral - 1 + pilotos.length) % pilotos.length,
      indiceCentral,
      (indiceCentral + 1) % pilotos.length
    ];

    indices.forEach((i, idx) => {
      const piloto = pilotos[i];
      const card = document.createElement('div');
      card.className = 'piloto-card';
      if (idx === 1) card.classList.add('activo');

      card.innerHTML = `
        <p class="equipo">${piloto.equipo}</p>
        <div class="lineanombre"></div>
        <h3>${piloto.nombre}</h3>
        <div class="lineapilotos"></div>
        <img class="bandera" src="${piloto.bandera}" />
        <img src="${piloto.imagen}">
      `;
      
      carrusel.appendChild(card);
    });
    
setTimeout(() => {
    document.querySelectorAll(".bandera").forEach(
      bandera => bandera.style.width = "2.5vw"
    );
  }, 10); // Pequeño delay para asegurar que el DOM esté listo

    // Reiniciamos la animación
    carrusel.style.transform = 'translateX(0)';
  }, 100);
}
btnAnterior.addEventListener('click', () => {
  if (pilotos.length === 0) return;
  indiceCentral = (indiceCentral - 1 + pilotos.length) % pilotos.length;
  renderCarrusel();
});

btnSiguiente.addEventListener('click', () => {
  if (pilotos.length === 0) return;
  indiceCentral = (indiceCentral + 1) % pilotos.length;
  renderCarrusel();
});

fetch('https://681bd7ee6ae7c794cf6ff13d.mockapi.io/ProyectosJavaScript')
  .then(res => res.json())
  .then(data => {
    pilotos = data[0].pilotos;
    renderCarrusel();
  })
  .catch(err => {
    console.error('Error al obtener pilotos:', err);
    carrusel.innerHTML = '<p style="color:red;">No se pudo cargar la lista de pilotos.</p>';
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