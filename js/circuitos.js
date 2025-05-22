const apiURL = "https://681bd7ee6ae7c794cf6ff13d.mockapi.io/ProyectosJavaScript";

let circuitos = [];
let indiceCentral = 0;

const carrusel = document.getElementById("carrusel-circuitos-container");
const btnAnterior = document.getElementById("circuito-anterior");
const btnSiguiente = document.getElementById("circuito-siguiente");

axios.get(apiURL)
  .then(response => {
    // Accede al array de circuitos dentro del primer objeto del array
    circuitos = response.data[0].circuitos;
    renderCarrusel();
  })
  .catch(error => {
    console.error("Error al obtener circuitos:", error);
  });

function renderCarrusel() {
  carrusel.innerHTML = "";

  const total = circuitos.length;

  if (total === 0) {
    carrusel.innerHTML = "<p>No hay circuitos para mostrar.</p>";
    return;
  }

  const prev = (indiceCentral - 1 + total) % total;
  const next = (indiceCentral + 1) % total;

  // Mostramos siempre 3 tarjetas: anterior, actual, siguiente
  const visibles = [prev, indiceCentral, next];

  visibles.forEach((i) => {
    const circuito = circuitos[i];
    const card = document.createElement("div");
    card.classList.add("circuito-card");

    if (i === indiceCentral) {
      card.classList.add("activa"); // Cambiado para que coincida con el CSS
    }

    card.innerHTML = `
      <h3><img src="${circuito.bandera}" style="width:30px; vertical-align: middle; margin-right: 8px;">${circuito.nombre}</h3>
      <img src="${circuito.imagen}" alt="${circuito.nombre}" />
    `;

    carrusel.appendChild(card);
  });
}

btnAnterior.addEventListener("click", () => {
  indiceCentral = (indiceCentral - 1 + circuitos.length) % circuitos.length;
  renderCarrusel();
});

btnSiguiente.addEventListener("click", () => {
  indiceCentral = (indiceCentral + 1) % circuitos.length;
  renderCarrusel();
});
