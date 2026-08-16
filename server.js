// ==========================================
// 1. LISTA COMPLETA DE PRODUCTOS
// ==========================================
const productos = [
  // CLOROS
  { id: 1, categoria: "CLOROS", nombre: "CLORO", p20L: 220, p5L: 70, p1L: 14 },
  { id: 2, categoria: "CLOROS", nombre: "CLORO USO INDUSTRIAL", p20L: 255, p5L: 90, p1L: 18 },
  { id: 3, categoria: "CLOROS", nombre: "PASTILLAS DE CLORO (1KG)", p20L: 120, p5L: 0, p1L: 10 },

  // PINOL
  { id: 4, categoria: "PINOL", nombre: "PINO (VERDE)", p20L: 190, p5L: 75, p1L: 14 },
  { id: 5, categoria: "PINOL", nombre: "PINOL C/EXCEDENTE", p20L: 290, p5L: 110, p1L: 22 },
  { id: 6, categoria: "PINOL", nombre: "PINO EXTRA", p20L: 370, p5L: 115, p1L: 26 },
  { id: 7, categoria: "PINOL", nombre: "PINOL AROMAS", p20L: 160, p5L: 65, p1L: 16 },
  { id: 8, categoria: "PINOL", nombre: "PINOL AROMAS PLUS", p20L: 310, p5L: 95, p1L: 22 },

  // BASES
  { id: 9, categoria: "BASES", nombre: "CLORO USO INDUSTRIAL (BASE)", p20L: 195, p5L: 0, p1L: 0 },
  { id: 10, categoria: "BASES", nombre: "CLORO (BASE)", p20L: 155, p5L: 0, p1L: 0 },
  { id: 11, categoria: "BASES", nombre: "MULTIUSOS AROMA PERFUME", p20L: 180, p5L: 0, p1L: 0 },
  { id: 12, categoria: "BASES", nombre: "MULTIUSOS DOBLE AROMA", p20L: 260, p5L: 0, p1L: 0 },
  { id: 13, categoria: "BASES", nombre: "MULTIUSOS PERFUME DOBLE AROMA", p20L: 320, p5L: 0, p1L: 0 },
  { id: 14, categoria: "BASES", nombre: "AJAX EXPEL", p20L: 290, p5L: 0, p1L: 0 },
  { id: 15, categoria: "BASES", nombre: "AJAX BICARBONATO", p20L: 250, p5L: 0, p1L: 0 },
  { id: 16, categoria: "BASES", nombre: "AJAX BICARBONATO DOBLE AROMA", p20L: 330, p5L: 0, p1L: 0 },
  { id: 17, categoria: "BASES", nombre: "BASE FABULOSO", p20L: 160, p5L: 0, p1L: 0 },

  // DETERGENTES Y AUTOMOTRIZ
  { id: 18, categoria: "DETERGENTES", nombre: "MAS COLOR", p20L: 295, p5L: 140, p1L: 28 },
  { id: 19, categoria: "DETERGENTES", nombre: "+ BEBE", p20L: 295, p5L: 140, p1L: 28 },
  { id: 20, categoria: "DETERGENTES", nombre: "+ VINAGRE", p20L: 295, p5L: 140, p1L: 28 },
  { id: 21, categoria: "DETERGENTES", nombre: "+ NEGRO", p20L: 295, p5L: 140, p1L: 28 },
  { id: 22, categoria: "AUTOMOTRIZ", nombre: "SHAMPOO CARROS ESPECIAL (ALTA ESPUMA)", p20L: 350, p5L: 150, p1L: 28 },
  { id: 23, categoria: "LIMPIEZA", nombre: "LIMPIA VIDRIOS", p20L: 430, p5L: 190, p1L: 38 },
  { id: 24, categoria: "AROMAS", nombre: "AROMATIZANTE", p20L: 640, p5L: 380, p1L: 85 },
  { id: 25, categoria: "AUTOMOTRIZ", nombre: "GEL PARA LLANTAS", p20L: 530, p5L: 290, p1L: 65 },
  { id: 26, categoria: "AUTOMOTRIZ", nombre: "ABRILLANTADOR LLANTAS", p20L: 450, p5L: 140, p1L: 35 },
  { id: 27, categoria: "AUTOMOTRIZ", nombre: "ALMOROL GEL", p20L: 750, p5L: 340, p1L: 75 },
  { id: 28, categoria: "AUTOMOTRIZ", nombre: "ALMOROL LIQUIDO", p20L: 730, p5L: 320, p1L: 80 },
  { id: 29, categoria: "AUTOMOTRIZ", nombre: "ALTO BRILLO", p20L: 1450, p5L: 345, p1L: 75 },

  // LIMPIEZA PROFUNDA
  { id: 30, categoria: "LIMPIEZA PROFUNDA", nombre: "DETERGRASS", p20L: 410, p5L: 180, p1L: 38 },
  { id: 31, categoria: "LIMPIEZA PROFUNDA", nombre: "DETERGRASS C/VINAGRE", p20L: 410, p5L: 180, p1L: 38 },
  { id: 32, categoria: "LIMPIEZA PROFUNDA", nombre: "PODER VINAGRE", p20L: 290, p5L: 110, p1L: 22 },
  { id: 33, categoria: "LIMPIEZA PROFUNDA", nombre: "DESENGRAZANTE", p20L: 380, p5L: 105, p1L: 25 },
  { id: 34, categoria: "LIMPIEZA PROFUNDA", nombre: "DESENGRAZANTE PLUS", p20L: 450, p5L: 200, p1L: 40 },
  { id: 35, categoria: "LIMPIEZA PROFUNDA", nombre: "DESENGRAZANTE AZUL", p20L: 300, p5L: 115, p1L: 23 },
  { id: 36, categoria: "LIMPIEZA PROFUNDA", nombre: "QUITACOCHAMBRE", p20L: 490, p5L: 150, p1L: 30 },
  { id: 37, categoria: "LIMPIEZA PROFUNDA", nombre: "SARRICIDA", p20L: 345, p5L: 150, p1L: 30 },
  { id: 38, categoria: "LIMPIEZA PROFUNDA", nombre: "SARRIGEL", p20L: 410, p5L: 185, p1L: 37 },
  { id: 39, categoria: "LIMPIEZA PROFUNDA", nombre: "LIMPIA ACERO", p20L: 620, p5L: 260, p1L: 52 },
  { id: 40, categoria: "LIMPIEZA PROFUNDA", nombre: "LIMPIA ACERO GRADO ALIMENTICIO", p20L: 920, p5L: 325, p1L: 65 },

  // JARCERÍA
  { id: 41, categoria: "JARCERÍA", nombre: "CAJA HIGIENICO DALIA 180", mayoreo: 490, menudeo: 0 },
  { id: 42, categoria: "JARCERÍA", nombre: "CAJA TOALLA EN ROLLO CAFÉ K160", mayoreo: 410, menudeo: 0 },
  { id: 43, categoria: "JARCERÍA", nombre: "CAJA TOALLA EN ROLLO BLANCA TR160", mayoreo: 540, menudeo: 0 },
  { id: 44, categoria: "JARCERÍA", nombre: "TOALLA INTERDOBLADA DALITAS Tl19800", mayoreo: 319, menudeo: 0 },
  { id: 45, categoria: "JARCERÍA", nombre: "TRAPEADOR MICROFIBRA ESPAÑOLA", mayoreo: 98, menudeo: 115 },
  { id: 46, categoria: "JARCERÍA", nombre: "TRAPEADOR MICROFIBRA PAÑO MEDIANO", mayoreo: 78, menudeo: 84 },
  { id: 47, categoria: "JARCERÍA", nombre: "ESCOBA VENECIANA", mayoreo: 85.5, menudeo: 95.5 },
  { id: 48, categoria: "JARCERÍA", nombre: "ESCOBA ARANDAS MEDIANA Y CORTA", mayoreo: 55, menudeo: 65 },
  { id: 49, categoria: "JARCERÍA", nombre: "ESCOBA ARANDAS 7 HILOS", mayoreo: 88.55, menudeo: 98 },
  { id: 50, categoria: "JARCERÍA", nombre: "RECOGEDOR", mayoreo: 55, menudeo: 60 },
  { id: 51, categoria: "JARCERÍA", nombre: "CEPILLO TIPO PLANCHA", mayoreo: 25, menudeo: 29 },
  { id: 52, categoria: "JARCERÍA", nombre: "ESCOBA PARA CARRO", mayoreo: 40, menudeo: 45 },
  { id: 53, categoria: "JARCERÍA", nombre: "ESCOBETILLA REDONDA", mayoreo: 21, menudeo: 23 },
  { id: 54, categoria: "JARCERÍA", nombre: "CEPILLO CON TAZÓN PARA BAÑO", mayoreo: 39.5, menudeo: 49.5 }
];

// Variables Globales
let cupones = JSON.parse(localStorage.getItem("cuponesRegistrados")) || [];
let cuponAplicado = null;

// ==========================================
// 2. ACCESO ADMIN
// ==========================================
function verificarAccesoAdmin() {
  const pass = prompt("Ingrese la contraseña del Admin:");
  if (pass === "ARMM2026") {
    document.getElementById("admin-content").style.display = "block";
    cargarUsuariosAdmin();
    renderTablaCupones();
    renderProductos(productos, "grid-productos-admin");
    verificarSesion();
  } else {
    alert("Contraseña incorrecta.");
    window.location.href = "index.html";
  }
}

// ==========================================
// 3. CONTROL DE MENÚS DESPLEGABLES Y VER PASS
// ==========================================
function toggleMenuRegistro() {
  const menuRegistro = document.getElementById("menu-registro");
  const menuLogin = document.getElementById("menu-login");
  const menuCarrito = document.getElementById("menu-carrito");

  if (menuLogin) menuLogin.classList.remove("active");
  if (menuCarrito) menuCarrito.classList.remove("active");
  
  menuRegistro.classList.toggle("active");
}

function toggleMenuLogin() {
  const menuRegistro = document.getElementById("menu-registro");
  const menuLogin = document.getElementById("menu-login");
  const menuCarrito = document.getElementById("menu-carrito");

  if (menuRegistro) menuRegistro.classList.remove("active");
  if (menuCarrito) menuCarrito.classList.remove("active");

  menuLogin.classList.toggle("active");
}

function toggleCarrito() {
  const menuRegistro = document.getElementById("menu-registro");
  const menuLogin = document.getElementById("menu-login");
  const menuCarrito = document.getElementById("menu-carrito");

  if (menuRegistro) menuRegistro.classList.remove("active");
  if (menuLogin) menuLogin.classList.remove("active");

  menuCarrito.classList.toggle("active");
  renderCarrito();
}

function toggleVerPassword(inputId, icon) {
  const input = document.getElementById(inputId);
  if (input.type === "password") {
    input.type = "text";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    input.type = "password";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }
}

// ==========================================
// 4. REGISTRO E INICIO DE SESIÓN
// ==========================================
function guardarRegistro(e) {
  e.preventDefault();

  const pass = document.getElementById("reg-pass").value;
  const confirmPass = document.getElementById("reg-confirm-pass").value;

  if (pass !== confirmPass) {
    alert("Las contraseñas no coinciden.");
    return;
  }

  const nuevoUsuario = {
    nombre: document.getElementById("reg-nombre").value,
    apellido: document.getElementById("reg-apellido").value,
    telefono: document.getElementById("reg-telefono").value,
    correo: document.getElementById("reg-correo").value,
    password: pass
  };

  let usuarios = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];
  
  const existe = usuarios.some(u => u.correo === nuevoUsuario.correo || u.telefono === nuevoUsuario.telefono);
  if (existe) {
    alert("El correo o teléfono ya está registrado.");
    return;
  }

  usuarios.push(nuevoUsuario);
  localStorage.setItem("usuariosRegistrados", JSON.stringify(usuarios));

  iniciarSesionExitoso(nuevoUsuario);
  toggleMenuRegistro();
  document.getElementById("form-registro").reset();
  
  if (document.getElementById("tabla-usuarios-body")) {
    cargarUsuariosAdmin();
  }
}

function procesarInicioSesion(e) {
  e.preventDefault();
  const identificador = document.getElementById("login-identificador").value.trim();
  const pass = document.getElementById("login-pass").value;

  let usuarios = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];
  
  const usuario = usuarios.find(u => 
    (u.correo === identificador || u.telefono === identificador) && u.password === pass
  );

  if (usuario) {
    iniciarSesionExitoso(usuario);
    toggleMenuLogin();
    document.getElementById("form-login").reset();
  } else {
    alert("Datos incorrectos o usuario no registrado.");
  }
}

function iniciarSesionExitoso(usuario) {
  localStorage.setItem("usuarioActivo", JSON.stringify(usuario));

  const authButtons = document.getElementById("auth-buttons");
  if (authButtons) authButtons.style.display = "none";

  const userProfile = document.getElementById("user-profile");
  const userName = document.getElementById("user-display-name");
  
  if (userProfile && userName) {
    userName.textContent = `${usuario.nombre} ${usuario.apellido}`;
    userProfile.style.display = "flex";
  }
}

function verificarSesion() {
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
  if (usuarioActivo) {
    iniciarSesionExitoso(usuarioActivo);
  }
}

function cargarUsuariosAdmin() {
  const tbody = document.getElementById("tabla-usuarios-body");
  if (!tbody) return;

  let usuarios = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];
  tbody.innerHTML = "";

  usuarios.forEach(u => {
    tbody.innerHTML += `
      <tr>
        <td>${u.nombre}</td>
        <td>${u.apellido}</td>
        <td>${u.telefono}</td>
        <td>${u.correo}</td>
      </tr>
    `;
  });
}

// ==========================================
// 5. CUPONES DE DESCUENTO
// ==========================================
function crearCupon(e) {
  e.preventDefault();
  const codigo = document.getElementById("cupon-codigo").value.toUpperCase().trim();
  const porcentaje = parseFloat(document.getElementById("cupon-porcentaje").value);

  const nuevoCupon = { codigo, porcentaje };
  cupones.push(nuevoCupon);
  localStorage.setItem("cuponesRegistrados", JSON.stringify(cupones));
  
  renderTablaCupones();
  document.getElementById("form-crear-cupon").reset();
}

function renderTablaCupones() {
  const tbody = document.getElementById("tabla-cupones-body");
  if (!tbody) return;
  tbody.innerHTML = "";

  cupones.forEach((c, index) => {
    tbody.innerHTML += `
      <tr>
        <td>${c.codigo}</td>
        <td>${c.porcentaje}%</td>
        <td><button class="btn-nav" style="background:#e53e3e;border:none;" onclick="eliminarCupon(${index})">Eliminar</button></td>
      </tr>
    `;
  });
}

function eliminarCupon(index) {
  cupones.splice(index, 1);
  localStorage.setItem("cuponesRegistrados", JSON.stringify(cupones));
  renderTablaCupones();
}

function aplicarCuponCliente() {
  const input = document.getElementById("input-cupon-cliente").value.toUpperCase().trim();
  const cuponEncontrado = cupones.find(c => c.codigo === input);

  if (cuponEncontrado) {
    cuponAplicado = cuponEncontrado;
    document.getElementById("mensaje-cupon").innerText = `¡Cupón ${cuponEncontrado.codigo} aplicado (${cuponEncontrado.porcentaje}% OFF)!`;
  } else {
    cuponAplicado = null;
    document.getElementById("mensaje-cupon").innerText = "Cupón no válido o expirado.";
  }
  actualizarTotalesCarrito();
}

// ==========================================
// 6. CARRITO (Sin desplazamiento automático al agregar)
// ==========================================
function agregarAlCarrito(idProducto, tamano, precio) {
  const prod = productos.find(p => p.id === idProducto);
  
  const item = {
    id: prod.id,
    nombre: prod.nombre,
    tamano: tamano,
    precio: precio,
    cantidad: 1
  };

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  
  const existe = carrito.find(i => i.id === item.id && i.tamano === item.tamano);
  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push(item);
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContadorCarrito();
  // El menú permanece cerrado hasta presionar el botón del carrito
}

function renderCarrito() {
  const container = document.getElementById("items-carrito");
  if (!container) return;

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  container.innerHTML = "";

  if (carrito.length === 0) {
    container.innerHTML = "<p>El carrito está vacío.</p>";
  } else {
    carrito.forEach((item, index) => {
      container.innerHTML += `
        <div class="cart-item">
          <div>
            <strong>${item.nombre}</strong><br>
            <small>Tapa/Medida: ${item.tamano}</small><br>
            <span>$${item.precio} x ${item.cantidad}</span>
          </div>
          <button onclick="eliminarDelCarrito(${index})" style="background:none;border:none;color:#e53e3e;cursor:pointer;"><i class="fas fa-trash"></i></button>
        </div>
      `;
    });
  }
  actualizarTotalesCarrito();
}

function eliminarDelCarrito(index) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderCarrito();
  actualizarContadorCarrito();
}

function actualizarContadorCarrito() {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const count = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const countElem = document.getElementById("cart-count");
  if (countElem) countElem.innerText = count;
}

function actualizarTotalesCarrito() {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  let subtotal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  let descuento = 0;

  if (cuponAplicado) {
    descuento = subtotal * (cuponAplicado.porcentaje / 100);
  }

  let total = subtotal - descuento;

  if (document.getElementById("subtotal-precio")) document.getElementById("subtotal-precio").innerText = subtotal.toFixed(2);
  if (document.getElementById("descuento-precio")) document.getElementById("descuento-precio").innerText = descuento.toFixed(2);
  if (document.getElementById("total-precio")) document.getElementById("total-precio").innerText = total.toFixed(2);
}

// ==========================================
// 7. RENDERIZADO Y FILTRADO DE PRODUCTOS
// ==========================================
function renderProductos(lista, targetId = "grid-productos") {
  const container = document.getElementById(targetId);
  if (!container) return;
  container.innerHTML = "";

  lista.forEach(p => {
    let preciosHTML = "";

    if (p.categoria === "JARCERÍA") {
      if (p.mayoreo) preciosHTML += `<div class="price-row"><span>Mayoreo:</span><strong>$${p.mayoreo}</strong></div>`;
      if (p.menudeo) preciosHTML += `<div class="price-row"><span>Menudeo:</span><strong>$${p.menudeo}</strong></div>`;
    } else {
      if (p.p20L) preciosHTML += `<div class="price-row"><span>20 Litros:</span><strong>$${p.p20L}</strong> <button onclick="agregarAlCarrito(${p.id}, '20L', ${p.p20L})">+</button></div>`;
      if (p.p5L) preciosHTML += `<div class="price-row"><span>5 Litros:</span><strong>$${p.p5L}</strong> <button onclick="agregarAlCarrito(${p.id}, '5L', ${p.p5L})">+</button></div>`;
      if (p.p1L) preciosHTML += `<div class="price-row"><span>1 Litro:</span><strong>$${p.p1L}</strong> <button onclick="agregarAlCarrito(${p.id}, '1L', ${p.p1L})">+</button></div>`;
    }

    container.innerHTML += `
      <div class="product-card">
        <div>
          <span class="category-tag">${p.categoria}</span>
          <h4>${p.nombre}</h4>
        </div>
        <div class="price-list">
          ${preciosHTML}
        </div>
      </div>
    `;
  });
}

function filtrarCategoria(cat) {
  document.querySelectorAll(".btn-cat").forEach(btn => btn.classList.remove("active"));
  event.target.classList.add("active");

  if (cat === "TODOS") {
    renderProductos(productos);
  } else {
    const filtrados = productos.filter(p => p.categoria === cat);
    renderProductos(filtrados);
  }
}

function filtrarProductos() {
  const texto = document.getElementById("input-buscar").value.toLowerCase();
  const filtrados = productos.filter(p => p.nombre.toLowerCase().includes(texto) || p.categoria.toLowerCase().includes(texto));
  renderProductos(filtrados);
}

function filtrarProductosAdmin() {
  const texto = document.getElementById("input-buscar-admin").value.toLowerCase();
  const filtrados = productos.filter(p => p.nombre.toLowerCase().includes(texto) || p.categoria.toLowerCase().includes(texto));
  renderProductos(filtrados, "grid-productos-admin");
}

// Carga Inicial
document.addEventListener("DOMContentLoaded", function() {
  if (document.getElementById("grid-productos")) {
    renderProductos(productos);
    verificarSesion();
    actualizarContadorCarrito();
  }
});
