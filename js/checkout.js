const carrito = obtenerCarrito()

function calcularTotalCarrito() {
  let total = 0
  carrito.forEach((producto) => {
    total += producto.precio
  })
  return total
}

function mostrarResumenCarrito() {
  const resumenCarritoDiv = document.getElementById("resumenCarrito")
  const totalCarritoDiv = document.getElementById("totalCarrito")

  if (carrito.length === 0) {
    resumenCarritoDiv.innerHTML = "El carrito está vacío."
    totalCarritoDiv.innerHTML = "Total: $0"
  } else {
    resumenCarritoDiv.innerHTML = ""

    carrito.forEach((producto) => {
      const productoDiv = document.createElement("div")
      productoDiv.innerHTML = `
        <h3>${producto.nombre}</h3>
        <p>Almacenamiento: ${producto.almacenamiento}</p>
        <p>Color: ${producto.color}</p>
        <p>Precio: $${producto.precio}</p>
        <hr>
      `
      resumenCarritoDiv.appendChild(productoDiv)
    })

    // Mostrar el precio total del carrito
    const totalCarrito = calcularTotalCarrito()
    totalCarritoDiv.innerHTML = `Total: $${totalCarrito}`
  }
}

function validarYGuardarDatos() {
  const nombre = document.getElementById("nombre").value
  const apellido = document.getElementById("apellido").value
  const email = document.getElementById("email").value
  const direccion = document.getElementById("direccion").value
  const dni = document.getElementById("dni").value
  const tarjeta = document.getElementById("tarjeta").value
  const numeroTarjeta = document.getElementById("numeroTarjeta").value
  const cvv = document.getElementById("cvv").value
  const mesVencimiento = document.getElementById("mesVencimiento").value
  const anioVencimiento = document.getElementById("anioVencimiento").value


  const nombreRegex = /^[A-Za-z ]+$/
  const apellidoRegex = /^[A-Za-z ]+$/
  const numeroTarjetaRegex = /^[0-9]{16}$/
  const cvvRegex = /^[0-9]{3}$/
  const dniRegex = /^[0-9]{8}$/
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!nombreRegex.test(nombre)) {
    Swal.fire("Error", "El nombre solo debe contener letras y espacios.", "error")
    return
  }

  if (!apellidoRegex.test(apellido)) {
    Swal.fire("Error", "El apellido solo debe contener letras y espacios.", "error")
    return
  }

  if (!numeroTarjetaRegex.test(numeroTarjeta)) {
    Swal.fire("Error", "Ingresa un número de tarjeta válido de 16 dígitos.", "error")
    return
  }

  if (!cvvRegex.test(cvv)) {
    Swal.fire("Error", "Ingresa un CVV válido de 3 dígitos.", "error")
    return
  }

  if (!dniRegex.test(dni)) {
    Swal.fire("Error", "Ingresa un DNI válido de 8 dígitos.", "error")
    return
  }

  if (!emailRegex.test(email)) {
    Swal.fire("Error", "Ingresa un correo electrónico válido.", "error")
    return
  }

  if (!direccion) {
    Swal.fire("Error", "Ingresa una dirección válida.", "error")
    return
  }

  if (!mesVencimiento || !anioVencimiento) {
    Swal.fire("Error", "Ingresa una fecha de vencimiento válida.", "error")
    return
  }
  

  if (tarjeta !== "visa" && tarjeta !== "mastercard") {
    Swal.fire("Error", "Selecciona una opción válida para la tarjeta.", "error")
    return
  }


  const ultimosCuatroDigitos = numeroTarjeta.slice(-4)
  const totalCarrito = calcularTotalCarrito()
  const productosEnCarrito = obtenerNombresProductosEnCarrito() 


  Swal.fire({
    title: "Detalles de la Compra",
    html: `
      Nombre: ${nombre} ${apellido}<br>
      Productos: ${productosEnCarrito.join(", ")}<br>
      Método: ${tarjeta}<br>
      Tarjeta: ${ultimosCuatroDigitos}<br>
      Fecha de Vencimiento: ${mesVencimiento}/${anioVencimiento}<br>
      Precio Total: $${totalCarrito}`,
    icon: "success",
    showCancelButton: true,
    confirmButtonText: "Confirmar",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Compra Confirmada",
        text: "Gracias por tu compra. Serás redirigido en unos segundos.",
        icon: "success",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false
      }).then(() => {
        window.location.href = "index.html"
        vaciarCarrito()
      })
    }
  })
}

function obtenerNombresProductosEnCarrito() {
  const nombresProductos = carrito.map(producto => producto.nombre)
  return nombresProductos
}

mostrarResumenCarrito()
