const URL = 'https://64ce62110c01d81da3eec3c6.mockapi.io/iPhone';
const arrayProductos = [];

function obtenerProductos() {
    return fetch(URL)
        .then((response) => {
            if (!response.ok) {
                throw new Error('No se pudo obtener los productos.');
            }
            return response.json();
        })
        .then((data) => {
            arrayProductos.push(...data);
            return arrayProductos; // Retornar los productos cargados
        })
        .catch((error) => {
            throw error;
        });
}

function retornarError() {
    const cardErrorHTML = `<div class="card-error">
                              <h2>Tenemos un problema para cargar los productos</h2>
                              <h3>Vuelve a intentar en unos minutos...</h3>
                            </div>`;

    const contenedor = document.getElementById("contenedorError");
    contenedor.innerHTML = cardErrorHTML;
}

function mostrarProductos(productos) {
    const contenedorProductos = document.getElementById("contenedorProductos");

    productos.forEach((producto) => {
        const cardHTML = crearCard(producto);
        contenedorProductos.appendChild(cardHTML);
    });
}

function crearCard(producto) {
    const card = document.createElement("div");
    card.classList.add("card");

    const nombre = producto.nombre;
    const imagenSrc = producto.imagen[0];
    const celularIndex = producto.id;

    const nombreText = document.createElement("h3");
    nombreText.textContent = nombre;
    card.appendChild(nombreText);

    const imagen = document.createElement("img");
    imagen.src = imagenSrc;
    card.appendChild(imagen);

    const botonInfo = document.createElement("a");
    botonInfo.textContent = "Más información";
    botonInfo.href = `detalle.html?id=${celularIndex}`;
    card.appendChild(botonInfo);

    return card;
}

// Llamar a la función para cargar los productos desde MockAPI
obtenerProductos()
    .then((productos) => {
        // Una vez que los productos se han cargado, llamar a la función para mostrarlos
        mostrarProductos(productos);
    })
    .catch((error) => {
        // En caso de error al cargar los productos, mostrar el mensaje de error
        retornarError();
        console.error('Error al cargar los productos:', error);
    });




  
  
  
  
  