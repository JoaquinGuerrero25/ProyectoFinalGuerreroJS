function obtenerParametroURL(parametro) {
    const parametrosURL = new URLSearchParams(window.location.search)
    return parametrosURL.get(parametro)
}

function buscarProductoPorId(id, productos) {
    const idBuscado = parseInt(id)

    for (const producto of productos) {
        if (producto.id === idBuscado) {
            return producto
        }
    }
    return null
}

function crearDetalleProducto(producto) {
    const imagenesSecundarias = document.querySelectorAll('.imagenes-secundarias img')
    imagenesSecundarias.forEach((img, index) => {
        if (index < producto.imagen.length) {
            img.style.display = "inline-block"
        } else {
            img.style.display = "none"
        }
    })

    const imagenPrincipal = document.querySelector(".imagen-principal")
    imagenPrincipal.src = producto.imagen[0]

    const nombreCelular = document.querySelector('.nombre-iphone')
    nombreCelular.textContent = producto.nombre

    for (let i = 0 ;i < producto.imagen.length ;i++) {
        imagenesSecundarias[i].src = producto.imagen[i]
    }

    const etiquetasP = document.querySelectorAll(".informacion-celular p")
    etiquetasP[0].innerHTML = `<span class="pantalla-icon"><i class="fa-solid fa-mobile-screen-button"></i></span> Pantalla: ${producto.informacion.pantalla}`
    etiquetasP[1].innerHTML = `<span class="resolucion-icon"><i class="fa-solid fa-image"></i></span> Resolución: ${producto.informacion.resolucion}`
    etiquetasP[2].innerHTML = `<span class="procesador-icon"><i class="fa-solid fa-microchip"></i></span> Procesador: ${producto.informacion.procesador}`
    etiquetasP[3].innerHTML = `<span class="camara-icon"><i class="fa-solid fa-camera"></i></span> Cámara: ${producto.informacion.camara}`
    etiquetasP[4].innerHTML = `<span class="almacenamiento-icon"><i class="fa-solid fa-database"></i></span> Almacenamiento: ${producto.informacion.almacenamiento.join(", ")}`
    etiquetasP[5].innerHTML = `<span class="colores-icon"><i class="fa-solid fa-palette"></i></span> Colores: ${producto.informacion.colores.join(", ")}`

    const seleccionarColor = document.getElementById("seleccionarColor")
    seleccionarColor.innerHTML = ""
    producto.informacion.colores.forEach((color, index) => {
        const option = document.createElement("option")
        option.value = `color${index + 1}`
        option.textContent = color
        seleccionarColor.appendChild(option)
    })

    const seleccionarAlmacenamiento = document.getElementById("seleccionarAlmacenamiento")
    seleccionarAlmacenamiento.innerHTML = ""
    producto.informacion.almacenamiento.forEach((almacenamiento, index) => {
        const option = document.createElement("option")
        option.value = `almacenamiento${index + 1}`
        option.textContent = almacenamiento
        seleccionarAlmacenamiento.appendChild(option)
    })

    seleccionarColor.addEventListener("change", () => mostrarPrecio(producto))
    seleccionarAlmacenamiento.addEventListener("change", () => mostrarPrecio(producto))

    mostrarPrecio(producto)

    const botonComprar = document.getElementById("botonComprar")

    botonComprar.addEventListener("click", () => {
        const selectedAlmacenamientoIndex = seleccionarAlmacenamiento.selectedIndex
        const almacenamiento = producto.informacion.almacenamiento[selectedAlmacenamientoIndex]
        const selectedColorIndex = seleccionarColor.selectedIndex
        const color = producto.informacion.colores[selectedColorIndex]
        const precio = producto.variantes[selectedAlmacenamientoIndex].precio
        
        agregarAlCarrito(producto.nombre, producto.imagen[0], color, almacenamiento, precio)

        Swal.fire({
            icon: 'success',
            title: '¡Producto agregado al carrito!',
            text: `Se ha agregado "${producto.nombre}" al carrito con éxito.`,
            showCancelButton: true,
            confirmButtonText: 'Ir al carrito',
            cancelButtonText: 'Seguir comprando',
        }).then((result) => {
            if (result.isConfirmed) {
               
                window.location.href = 'carrito.html' 
            } else {
            }
        })
    })
    return contenedorDetalle
}

function mostrarPrecio(producto) {
    const selectedColorIndex = document.getElementById("seleccionarColor").selectedIndex
    const selectedAlmacenamientoIndex = document.getElementById("seleccionarAlmacenamiento").selectedIndex
    const precio = producto.variantes[selectedAlmacenamientoIndex].precio
    const almacenamiento = producto.informacion.almacenamiento[selectedAlmacenamientoIndex]
    const color = producto.informacion.colores[selectedColorIndex]
    
    const precioEtiqueta = document.querySelector(".precio")
    precioEtiqueta.textContent = `Precio (${color} / ${almacenamiento}): $${precio}`
}

function actualizarImagenConClick() {
    const imagenesSecundarias = document.querySelectorAll('.imagenes-secundarias img')

    imagenesSecundarias.forEach((imagen, index) => {
        imagen.addEventListener('click', () => {
            const nuevaImagen = imagen.src
            const imagenPrincipal = document.querySelector(".imagen-principal")
            imagenPrincipal.src = nuevaImagen
        })
    })
}

actualizarImagenConClick()

const idParametro = obtenerParametroURL('id')
const idProducto = parseInt(idParametro)

const contenedorDetalle = document.getElementById("contenedorDetalle")
obtenerProductos()
  .then((productos) => {
    const productoEncontrado = buscarProductoPorId(idProducto, productos)
    if (productoEncontrado) {
      crearDetalleProducto(productoEncontrado, contenedorDetalle)
    } else {
      console.log('Producto no encontrado.')
    }
  })
  .catch((error) => {
    console.error('Error al obtener los productos:', error)
  })