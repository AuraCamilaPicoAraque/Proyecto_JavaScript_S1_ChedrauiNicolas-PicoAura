const API_URL = 'https://6622ef6727fcd16fa6c8cb3d.mockapi.io/api/v1/circuitos';
const contenedor = document.getElementById("circuitos-container");

// Función para obtener emoji de bandera por país
function obtenerBandera(pais) {
    const banderas = {
        "España": "🇪🇸",
        "Mónaco": "🇲🇨",
        "Canadá": "🇨🇦",
        "Italia": "🇮🇹",
        "Francia": "🇫🇷"
        // Agrega más según tus datos
    };
    return banderas[pais] || "🏁";
}

axios.get(API_URL)
    .then(response => {
        const circuitos = response.data;

        circuitos.forEach(circuito => {
            const card = document.createElement("div");
            card.classList.add("circuito-card");

            card.innerHTML = `
                <h3>${obtenerBandera(circuito.pais)} ${circuito.nombre}</h3>
                <img src="${circuito.imagen}" alt="Circuito ${circuito.nombre}" class="imagen-circuito" />
            `;

            contenedor.appendChild(card);
        });
    })
    .catch(error => {
        console.error("Error al obtener los circuitos:", error);
    });
