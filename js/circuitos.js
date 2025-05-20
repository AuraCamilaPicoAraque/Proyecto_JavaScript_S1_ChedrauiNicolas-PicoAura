async function cargarCircuitos() {
    try {
      const respuesta = await fetch('https://681bd7ee6ae7c794cf6ff13d.mockapi.io/ProyectosJavaScript');
      const datos = await respuesta.json();
  
      const contenedor = document.getElementById('circuitos-container');
  
      datos.forEach(circuito => {
        const divCircuito = document.createElement('div');
        divCircuito.classList.add('circuito');
  
        const imagen = document.createElement('img');
        imagen.src = circuito.imagen; // asegúrate que el campo en la API sea 'imagen'
        imagen.alt = `Mapa del circuito de ${circuito.nombre}`;
  
        const infoDiv = document.createElement('div');
        infoDiv.classList.add('info');
  
        const nombre = document.createElement('h2');
        nombre.textContent = circuito.nombre;
  
        const pais = document.createElement('p');
        pais.textContent = `País: ${circuito.pais}`;
  
        const nombreCircuito = document.createElement('p');
        nombreCircuito.textContent = `Circuito: ${circuito.circuito}`;
  
        infoDiv.appendChild(nombre);
        infoDiv.appendChild(pais);
        infoDiv.appendChild(nombreCircuito);
  
        divCircuito.appendChild(imagen);
        divCircuito.appendChild(infoDiv);
  
        contenedor.appendChild(divCircuito);
      });
  
    } catch (error) {
      console.error('Error al cargar los circuitos:', error);
    }
  }
  
  window.addEventListener('DOMContentLoaded', cargarCircuitos);
  