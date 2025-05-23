const apiURL = "https://681bd7ee6ae7c794cf6ff13d.mockapi.io/ProyectosJavaScript";

let circuitos = [];
let indiceCentral = 0;
let circuitoSeleccionado = null;

// Elementos del DOM
const carrusel = document.getElementById("carrusel-circuitos-container");
const btnAnterior = document.getElementById("circuito-anterior");
const btnSiguiente = document.getElementById("circuito-siguiente");
const btnAgregar = document.querySelector('.btn_agregar');

// Elementos del modal (según tu HTML)
const modalAgregar = document.getElementById('modal-agregar');
const btnCerrarModal = document.querySelector('.cerrar-modal');
const btnCancelar = document.querySelector('.btn-cancelar');
const btnAceptar = document.querySelector('.btn-aceptar');
const formularioAgregar = document.getElementById('formulario-agregar');

// Cargar circuitos iniciales
cargarCircuitos();

function cargarCircuitos() {
  axios.get(apiURL)
    .then(response => {
      circuitos = response.data[0].circuitos;
      renderCarrusel();
    })
    .catch(error => {
      console.error("Error al obtener circuitos:", error);
    });
}

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
      card.classList.add("activa");
    }

    card.innerHTML = `
      <h3>${circuito.nombre}</h3>
      <img src="${circuito.imagen}" alt="${circuito.nombre}" />
    `;

    // Agregar evento click para mostrar detalles/editar
    card.addEventListener('click', () => {
      circuitoSeleccionado = circuito;
      abrirModalEdicion();
    });

    carrusel.appendChild(card);
  });
}

// Abrir modal para edición
function abrirModalEdicion() {
  // Llenar el formulario con los datos del circuito seleccionado
  document.getElementById('nombre-circuito').value = circuitoSeleccionado.nombre;
  document.getElementById('imagen-circuito').value = circuitoSeleccionado.imagen;
  document.getElementById('bandera-circuito').value = circuitoSeleccionado.bandera || '';
  document.getElementById('pais-circuito').value = circuitoSeleccionado.pais || '';
  document.getElementById('longitud-circuito').value = circuitoSeleccionado.longitud_km || '';
  document.getElementById('vueltas-circuito').value = circuitoSeleccionado.vueltas || '';
  document.getElementById('descripcion-circuito').value = circuitoSeleccionado.descripcion || '';

  // Cambiar el título del modal
  document.querySelector('#modal-agregar h2').textContent = 'Editar Circuito';

  // Mostrar botón de eliminar (lo creamos dinámicamente si no existe)
  if (!document.querySelector('.btn-eliminar')) {
    const btnEliminar = document.createElement('button');
    btnEliminar.type = 'button';
    btnEliminar.className = 'btn-eliminar';
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.onclick = eliminarCircuito;

    const botonesModal = document.querySelector('.botones-modal');
    botonesModal.insertBefore(btnEliminar, botonesModal.firstChild);
  }

  modalAgregar.style.display = 'block';
}

// Función para guardar (crear o actualizar)
async function guardarCircuito() {
  const datosCircuito = {
    nombre: document.getElementById('nombre-circuito').value,
    imagen: document.getElementById('imagen-circuito').value,
    bandera: document.getElementById('bandera-circuito').value,
    pais: document.getElementById('pais-circuito').value,
    longitud: document.getElementById('longitud-circuito').value,
    vueltas: document.getElementById('vueltas-circuito').value,
    descripcion: document.getElementById('descripcion-circuito').value
  };

  try {
    btnAceptar.textContent = 'Guardando...';
    btnAceptar.disabled = true;

    // Obtener datos actuales de la API
    const response = await axios.get(apiURL);
    const data = response.data[0];

    if (circuitoSeleccionado) {
      // Actualizar circuito existente
      const index = data.circuitos.findIndex(c => c.id === circuitoSeleccionado.id);
      if (index !== -1) {
        data.circuitos[index] = { ...circuitoSeleccionado, ...datosCircuito };
      }
    } else {
      // Crear nuevo circuito
      const nuevoId = data.circuitos.length > 0 ?
        Math.max(...data.circuitos.map(c => parseInt(c.id))) + 1 : 1;

      data.circuitos.push({
        id: nuevoId.toString(),
        ...datosCircuito
      });
    }

    // Guardar en la API
    await axios.put(`${apiURL}/1`, data);

    // Actualizar lista local y renderizar
    circuitos = data.circuitos;
    indiceCentral = circuitos.length - 1; // Mover al nuevo/actualizado circuito
    renderCarrusel();
    cerrarModal();

  } catch (error) {
    console.error('Error al guardar circuito:', error);
    alert('Error al guardar. Intenta nuevamente.');
  } finally {
    btnAceptar.textContent = 'Aceptar';
    btnAceptar.disabled = false;
  }
}

// Función para eliminar circuito
async function eliminarCircuito() {
  if (!circuitoSeleccionado || !confirm('¿Estás seguro de eliminar este circuito?')) return;

  try {
    const response = await axios.get(apiURL);
    const data = response.data[0];

    // Filtrar el circuito a eliminar
    data.circuitos = data.circuitos.filter(c => c.id !== circuitoSeleccionado.id);

    // Actualizar en la API
    await axios.put(`${apiURL}/1`, data);

    // Actualizar lista local
    circuitos = data.circuitos;
    if (indiceCentral >= circuitos.length) indiceCentral = Math.max(0, circuitos.length - 1);

    renderCarrusel();
    cerrarModal();

  } catch (error) {
    console.error('Error al eliminar circuito:', error);
    alert('Error al eliminar. Intenta nuevamente.');
  }
}

// Función para cerrar el modal
function cerrarModal() {
  modalAgregar.style.display = 'none';
  formularioAgregar.reset();
  circuitoSeleccionado = null;

  // Restaurar título del modal
  document.querySelector('#modal-agregar h2').textContent = 'Agregar Nuevo Circuito';

  // Eliminar botón de eliminar si existe
  const btnEliminar = document.querySelector('.btn-eliminar');
  if (btnEliminar) {
    btnEliminar.remove();
  }
}

// Event Listeners
btnAnterior.addEventListener("click", () => {
  indiceCentral = (indiceCentral - 1 + circuitos.length) % circuitos.length;
  renderCarrusel();
});

btnSiguiente.addEventListener("click", () => {
  indiceCentral = (indiceCentral + 1) % circuitos.length;
  renderCarrusel();
});

// Modal events
btnAgregar.addEventListener('click', () => {
  circuitoSeleccionado = null;
  modalAgregar.style.display = 'block';
});

btnCerrarModal.addEventListener('click', cerrarModal);
btnCancelar.addEventListener('click', cerrarModal);

// Cerrar modal al hacer click fuera
window.addEventListener('click', (e) => {
  if (e.target === modalAgregar) {
    cerrarModal();
  }
});

// Manejar envío del formulario
formularioAgregar.addEventListener('submit', (e) => {
  e.preventDefault();
  guardarCircuito();
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