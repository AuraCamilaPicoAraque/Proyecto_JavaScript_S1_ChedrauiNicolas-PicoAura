document.addEventListener('DOMContentLoaded', function() {
  const contenedor = document.getElementById('circuitos-container');
  const apiUrl = 'https://681bd7ee6ae7c794cf6ff13d.mockapi.io/ProyectosJavaScript';
  
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const circuito = data.filter(item => item.longitud_km);
      circuito.forEach(circuitos => {
        contenedor.innerHTML += `
          <div class="circuito-card">
            <h3>${circuitos.nombre}</h3>
            <img src="${circuitos.imagen}" alt="${circuitos.nombre}">
            <p>País: ${circuitos.pais}</p>
          </div>
        `;
      });
    })
    .catch(error => {
      contenedor.innerHTML = '<p>Error al cargar los datos</p>';
    });
});
