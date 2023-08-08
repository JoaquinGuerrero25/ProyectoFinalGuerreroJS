function agregarAlCarrito(nombre, imagenSrc, color, almacenamiento, precio) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || []
    const productoSeleccionado = {
        nombre,
        imagenSrc,
        color,
        almacenamiento,
        precio,
    }
    carrito.push(productoSeleccionado)
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

function mostrarProductoEnCarrito(index) {
    const carrito = obtenerCarrito()
    const producto = carrito[index]

    const carritoContainer = document.getElementById("carritoContainer")

    const productoDiv = document.createElement("div")
    productoDiv.className = "carrito-item"

    const imagen = document.createElement("img")
    imagen.src = producto.imagenSrc
    productoDiv.appendChild(imagen)

    const nombreText = document.createElement("h3")
    nombreText.textContent = producto.nombre
    productoDiv.appendChild(nombreText)

    const almacenamientoText = document.createElement("p")
    almacenamientoText.textContent = `Almacenamiento: ${producto.almacenamiento}`
    productoDiv.appendChild(almacenamientoText)

    const colorText = document.createElement("p")
    colorText.textContent = `Color: ${producto.color}`
    productoDiv.appendChild(colorText)

    const precioText = document.createElement("p")
    precioText.textContent = `Precio: $${producto.precio}`
    productoDiv.appendChild(precioText)

    const botonEliminar = document.createElement("button")
    botonEliminar.textContent = "Eliminar"
    botonEliminar.addEventListener("click", () => {
        Swal.fire({
            icon: 'question',
            title: '¿Estás seguro?',
            text: `¿Deseas eliminar "${producto.nombre}" del carrito?`,
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarDelCarrito(index)
                // Mostrar SweetAlert de éxito después de eliminar el producto
                Swal.fire({
                    icon: 'success',
                    title: '¡Producto eliminado!',
                    text: `Se ha eliminado "${producto.nombre}" del carrito con éxito.`,
                    timer: 2000,
                    timerProgressBar: true,
                })
            }
        })
    })

    productoDiv.appendChild(botonEliminar)
    carritoContainer.appendChild(productoDiv)
}
  

function mostrarCarrito() {
    const carrito = obtenerCarrito()
    const cartContainer = document.getElementById("carritoContainer")
    const mensajeCarritoVacio = document.getElementById("mensajeCarritoVacio")
    const totalContainer = document.getElementById("totalContainer")
    let total = 0

    if (carrito.length === 0) {
        mensajeCarritoVacio.textContent = "No hay productos en el carrito."
        cartContainer.innerHTML = ""
        const botonContainer = document.getElementById("botonContainer")
        botonContainer.innerHTML = "" // Eliminar el botón de comprar si no hay productos en el carrito
    } else {
        mensajeCarritoVacio.textContent = ""
        cartContainer.innerHTML = ""
        carrito.forEach((producto, index) => {
            mostrarProductoEnCarrito(index)
            total += producto.precio
        })
    }

    totalContainer.innerHTML = `Total: $${total}`
}

function eliminarDelCarrito(index) {
    const carrito = obtenerCarrito()
    carrito.splice(index, 1)
    localStorage.setItem("carrito", JSON.stringify(carrito))
    mostrarCarrito()
}

function comprarCarrito() {
    const carrito = obtenerCarrito()

    if (carrito.length === 0) {
        alert("El carrito está vacío. Agrega productos antes de comprar.")
    } else {
        vaciarCarrito()
        window.location.href = 'checkout.html'
    }
}

function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || []
}

function vaciarCarrito() {
    localStorage.removeItem("carrito")
}

function crearBotonComprarCarrito() {
    const carrito = obtenerCarrito()
    const botonComprarCarrito = document.createElement("button")
    botonComprarCarrito.textContent = "Comprar carrito"
    botonComprarCarrito.id = "botonComprarCarrito"


    if (carrito.length === 0) {
        botonComprarCarrito.addEventListener("click", () => {
            Swal.fire({
                icon: 'info',
                title: 'El carrito está vacío',
                text: 'Agrega productos al carrito antes de comprar.',
            })
        })
    } else {
        botonComprarCarrito.addEventListener("click", () => {
            Swal.fire({
                icon: 'success',
                title: '¡Compra realizada!',
                html: `
                    Gracias por tu compra. Estás siendo redirigido al proceso de checkout.<br>
                    Por favor, ingresa tus datos personales y de pago para completar la compra.`,
                timer: 3000,
                timerProgressBar: true,
            }).then(() => {
                window.location.href = 'checkout.html'
            })
        })
    }

    const botonContainer = document.getElementById("botonContainer")
    botonContainer.appendChild(botonComprarCarrito)
}


crearBotonComprarCarrito()
mostrarCarrito()