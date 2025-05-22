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
        <h3>${piloto.nombre}</h3>
        <p class="equipo">${piloto.equipo}</p>
        <p class="rol">${piloto.rol}</p>
        <img src="${piloto.imagen}">
      `;

      carrusel.appendChild(card);
    });

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