// Mostrar alerta cuando se envía el formulario de contacto
document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.querySelector(".formulario-contacto");
  
    if (formulario) {
      formulario.addEventListener("submit", function (e) {
        e.preventDefault();
  
        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const mensaje = document.getElementById("mensaje").value.trim();
  
        if (nombre === "" || correo === "" || mensaje === "") {
          alert("Por favor, completa todos los campos.");
        } else {
          alert("¡Mensaje enviado correctamente!");
          formulario.reset();
        }
      });
    }
  });
  
  // Botón de scroll hacia arriba
  const scrollBtn = document.createElement("button");
  scrollBtn.innerText = "↑";
  scrollBtn.classList.add("scroll-top");
  document.body.appendChild(scrollBtn);
  
  scrollBtn.style.display = "none";
  
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
  
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollBtn.style.display = "block";
    } else {
      scrollBtn.style.display = "none";
    }
  });
  // ==========================
// FUNCIONES DEL CARRITO
// ==========================

// Escuchar clicks en botones "Agregar al carrito"
document.addEventListener("DOMContentLoaded", function () {
    const botonesAgregar = document.querySelectorAll(".btn-agregar");
  
    botonesAgregar.forEach((boton) => {
      boton.addEventListener("click", (e) => {
        e.preventDefault();
  
        const id = boton.getAttribute("data-id");
        const nombre = boton.getAttribute("data-nombre");
        const precio = parseFloat(boton.getAttribute("data-precio"));
  
        agregarProductoAlCarrito({ id, nombre, precio, cantidad: 1 });
      });
    });
  
    // Si estamos en carrito.html, mostrar los productos
    if (document.getElementById("carrito-body")) {
      mostrarProductosEnCarrito();
    }
  });
  
  // Función para obtener productos del LocalStorage
  function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
  }
  
  // Función para guardar productos en LocalStorage
  function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
  
  // Agregar producto al carrito
  function agregarProductoAlCarrito(producto) {
    let carrito = obtenerCarrito();
  
    const existente = carrito.find((item) => item.id === producto.id);
    if (existente) {
      existente.cantidad += 1;
    } else {
      carrito.push(producto);
    }
  
    guardarCarrito(carrito);
    alert("¡Producto agregado al carrito!");
  }
  
  // Mostrar productos en la tabla del carrito
  function mostrarProductosEnCarrito() {
    const carrito = obtenerCarrito();
    const tbody = document.getElementById("carrito-body");
    const totalSpan = document.getElementById("total");
  
    tbody.innerHTML = "";
    let total = 0;
  
    carrito.forEach((producto, index) => {
      const fila = document.createElement("tr");
  
      const subtotal = producto.precio * producto.cantidad;
      total += subtotal;
  
      fila.innerHTML = `
        <td data-label="Producto">${producto.nombre}</td>
        <td data-label="Precio">$${producto.precio.toFixed(2)}</td>
        <td data-label="Cantidad">${producto.cantidad}</td>
        <td data-label="Total">$${subtotal.toFixed(2)}</td>
        <td data-label="Eliminar">
          <button onclick="eliminarProducto(${index})" class="btn-eliminar">🗑️</button>
        </td>
      `;
  
      tbody.appendChild(fila);
    });
  
    totalSpan.textContent = total.toFixed(2);
  }
  
  
  // Eliminar producto individual del carrito
  function eliminarProducto(index) {
    let carrito = obtenerCarrito();
    carrito.splice(index, 1);
    guardarCarrito(carrito);
    mostrarProductosEnCarrito();
  }
  
  // Vaciar todo el carrito
  document.addEventListener("DOMContentLoaded", function () {
    const btnVaciar = document.getElementById("vaciar-carrito");
    if (btnVaciar) {
      btnVaciar.addEventListener("click", () => {
        if (confirm("¿Seguro que deseas vaciar el carrito?")) {
          localStorage.removeItem("carrito");
          mostrarProductosEnCarrito();
        }
      });
    }
  });
  
  