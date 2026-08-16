// 1. LISTA COMPLETA DE PRODUCTOS IMPORTADOS (TODAS LAS CATEGORÍAS)
const listaCompletaProductos = [
  // CLOROS
  { id: 1, categoria: "CLOROS", producto: "CLORO", p20L: 220, p5L: 70, p1L: 14 },
  { id: 2, categoria: "CLOROS", producto: "CLORO USO INDUSTRIAL", p20L: 255, p5L: 90, p1L: 18 },
  { id: 3, categoria: "CLOROS", producto: "PASTILLAS DE CLORO (1KG)", p20L: 120, p5L: "Sueltas", p1L: "4X10" },

  // PINOL
  { id: 4, categoria: "PINOL", producto: "PINO (VERDE)", p20L: 190, p5L: 75, p1L: 14 },
  { id: 5, categoria: "PINOL", producto: "PINOL C/EXCEDENTE", p20L: 290, p5L: 110, p1L: 22 },
  { id: 6, categoria: "PINOL", producto: "PINO EXTRA", p20L: 370, p5L: 115, p1L: 26 },
  { id: 7, categoria: "PINOL", producto: "PINOL AROMAS", p20L: 160, p5L: 65, p1L: 16 },
  { id: 8, categoria: "PINOL", producto: "PINOL AROMAS PLUS", p20L: 310, p5L: 95, p1L: 22 },

  // BASES
  { id: 9, categoria: "BASES", producto: "CLORO USO INDUSTRIAL BASE", p20L: 195, p5L: "N/A", p1L: "N/A" },
  { id: 10, categoria: "BASES", producto: "CLORO BASE", p20L: 155, p5L: "N/A", p1L: "N/A" },
  { id: 11, categoria: "BASES", producto: "MULTIUSOS AROMA PERFUME", p20L: 180, p5L: "N/A", p1L: "N/A" },
  { id: 12, categoria: "BASES", producto: "MULTIUSOS DOBLE AROMA", p20L: 260, p5L: "N/A", p1L: "N/A" },
  { id: 13, categoria: "BASES", producto: "MULTIUSOS PERFUME DOBLE AROMA", p20L: 320, p5L: "N/A", p1L: "N/A" },
  { id: 14, categoria: "BASES", producto: "AJAX EXPEL", p20L: 290, p5L: "N/A", p1L: "N/A" },
  { id: 15, categoria: "BASES", producto: "AJAX BICARBONATO", p20L: 250, p5L: "N/A", p1L: "N/A" },
  { id: 16, categoria: "BASES", producto: "AJAX BICARBONATO DOBLE AROMA", p20L: 330, p5L: "N/A", p1L: "N/A" },
  { id: 17, categoria: "BASES", producto: "BASE FABULOSO", p20L: 160, p5L: "N/A", p1L: "N/A" },
  { id: 18, categoria: "BASES", producto: "MAS COLOR", p20L: 295, p5L: 140, p1L: 28 },
  { id: 19, categoria: "BASES", producto: "+ BEBE", p20L: 295, p5L: 140, p1L: 28 },
  { id: 20, categoria: "BASES", producto: "+ VINAGRE", p20L: 295, p5L: 140, p1L: 28 },
  { id: 21, categoria: "BASES", producto: "+ NEGRO", p20L: 295, p5L: 140, p1L: 28 },

  // LIMPIEZA PROFUNDA
  { id: 22, categoria: "LIMPIEZA PROFUNDA", producto: "SHAMPOO CARROS ESPECIAL", p20L: 350, p5L: 150, p1L: 28 },
  { id: 23, categoria: "LIMPIEZA PROFUNDA", producto: "LIMPIA VIDRIOS", p20L: 430, p5L: 190, p1L: 38 },
  { id: 24, categoria: "LIMPIEZA PROFUNDA", producto: "AROMATIZANTE", p20L: 640, p5L: 380, p1L: 85 },
  { id: 25, categoria: "LIMPIEZA PROFUNDA", producto: "GEL PARA LLANTAS", p20L: 530, p5L: 290, p1L: 65 },
  { id: 26, categoria: "LIMPIEZA PROFUNDA", producto: "ABRILLANTADOR LLANTAS", p20L: 450, p5L: 140, p1L: 35 },
  { id: 27, categoria: "LIMPIEZA PROFUNDA", producto: "ALMOROL GEL", p20L: 750, p5L: 340, p1L: 75 },
  { id: 28, categoria: "LIMPIEZA PROFUNDA", producto: "ALMOROL LIQUIDO", p20L: 730, p5L: 320, p1L: 80 },
  { id: 29, categoria: "LIMPIEZA PROFUNDA", producto: "ALTO BRILLO", p20L: 1450, p5L: 345, p1L: 75 },
  { id: 30, categoria: "LIMPIEZA PROFUNDA", producto: "DETERGRASS", p20L: 410, p5L: 180, p1L: 38 },
  { id: 31, categoria: "LIMPIEZA PROFUNDA", producto: "DETERGRASS C/VINAGRE", p20L: 410, p5L: 180, p1L: 38 },
  { id: 32, categoria: "LIMPIEZA PROFUNDA", producto: "PODER VINAGRE", p20L: 290, p5L: 110, p1L: 22 },
  { id: 33, categoria: "LIMPIEZA PROFUNDA", producto: "DESENGRAZANTE", p20L: 380, p5L: 105, p1L: 25 },
  { id: 34, categoria: "LIMPIEZA PROFUNDA", producto: "DESENGRAZANTE PLUS", p20L: 450, p5L: 200, p1L: 40 },
  { id: 35, categoria: "LIMPIEZA PROFUNDA", producto: "DESENGRAZANTE AZUL", p20L: 300, p5L: 115, p1L: 23 },
  { id: 36, categoria: "LIMPIEZA PROFUNDA", producto: "QUITACOCHAMBRE", p20L: 490, p5L: 150, p1L: 30 },
  { id: 37, categoria: "LIMPIEZA PROFUNDA", producto: "SARRICIDA", p20L: 345, p5L: 150, p1L: 30 },
  { id: 38, categoria: "LIMPIEZA PROFUNDA", producto: "SARRIGEL", p20L: 410, p5L: 185, p1L: 37 },
  { id: 39, categoria: "LIMPIEZA PROFUNDA", producto: "LIMPIA ACERO", p20L: 620, p5L: 260, p1L: 52 },
  { id: 40, categoria: "LIMPIEZA PROFUNDA", producto: "LIMPIA ACERO GRADO ALIMENTICIO", p20L: 920, p5L: 325, p1L: 65 },

  // JARCERÍA
  { id: 41, categoria: "JARCERÍA", producto: "CAJA HIGIENICO DALIA 180", p20L: "$490 (Mayoreo)", p5L: "N/A", p1L: "N/A" },
  { id: 42, categoria: "JARCERÍA", producto: "CAJA TOALLA EN ROLLO CAFÉ K160", p20L: "$410 (Mayoreo)", p5L: "N/A", p1L: "N/A" },
  { id: 43, categoria: "JARCERÍA", producto: "CAJA TOALLA EN ROLLO BLANCA TR160", p20L: "$540 (Mayoreo)", p5L: "N/A", p1L: "N/A" },
  { id: 44, categoria: "JARCERÍA", producto: "TOALLA INTERDOBLADA DALITAS Tl19800", p20L: "$319 (Mayoreo)", p5L: "N/A", p1L: "N/A" },
  { id: 45, categoria: "JARCERÍA", producto: "TRAPEADOR MICROFIBRA ESPAÑOLA", p20L: "$98 (Mayoreo)", p5L: "$115 (Menudeo)", p1L: "N/A" },
  { id: 46, categoria: "JARCERÍA", producto: "ESCOBA VENECIANA", p20L: "$85.5 (Mayoreo)", p5L: "$95.5 (Menudeo)", p1L: "N/A" },
  { id: 47, categoria: "JARCERÍA", producto: "ESCOBA ARANDAS MEDIANA Y CORTA", p20L: "$55 (Mayoreo)", p5L: "$65 (Menudeo)", p1L: "N/A" },
  { id: 48, categoria: "JARCERÍA", producto: "RECOGEDOR", p20L: "$55 (Mayoreo)", p5L: "$60 (Menudeo)", p1L: "N/A" },
  { id: 49, categoria: "JARCERÍA", producto: "CEPILLO TIPO PLANCHA", p20L: "$25 (Mayoreo)", p5L: "$29 (Menudeo)", p1L: "N/A" },
  { id: 50, categoria: "JARCERÍA", producto: "CUADRITELA GDE", p20L: "$14 (Mayoreo)", p5L: "$16 (Menudeo)", p1L: "N/A" }
];

let carrito = [];

// 2. VALIDACIÓN DE ENTRADA ADMIN (ARMM2026)
function verificarAccesoAdmin() {
  const clave = prompt("Ingrese la contraseña de Admin para ingresar:");
  if (clave === "ARMM2026") {
    cargarProductosTabla();
    actualizarTablaUsuarios();
    verificarSesionActiva();
  } else {
    alert("Contraseña incorrecta. Acceso denegado.");
    window.location.reload();
  }
}

// 3. RENDERIZADO COMPLETO DE PRODUCTOS EN LA TABLA
function cargarProductosTabla() {
  const bodyTabla = document.getElementById("tabla-productos-body");
  if (!bodyTabla) return;

  bodyTabla.innerHTML = "";

  listaCompletaProductos.forEach(p => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${p.id}</td>
      <td>${p.categoria}</td>
      <td><strong>${p.producto}</strong></td>
      <td>${typeof p.p20L === 'number' ? '$' + p.p20L : p.p20L}</td>
      <td>${typeof p.p5L === 'number' ? '$' + p.p5L : p.p5L}</td>
      <td>${typeof p.p1L === 'number' ? '$' + p.p1L : p.p1L}</td>
      <td>
        <button class="btn-add" onclick="agregarAlCarrito(${p.id})">Agregar</button>
      </td>
    `;
    bodyTabla.appendChild(fila);
  });
}

// 4. DESPLIEGUE DEL MENÚ LATERAL (LOGIN / REGISTRO)
function abrirMenuAuth(modo) {
  const menu = document.getElementById("menu-registro");
  const titulo = document.getElementById("menu-titulo");
  const formRegistro = document.getElementById("form-registro");
  const formLogin = document.getElementById("form-login");

  if (modo === 'login') {
    titulo.textContent = "Iniciar Sesión";
    formRegistro.style.display = "none";
    formLogin.style.display = "block";
  } else {
    titulo.textContent = "Registro de Usuario";
    formRegistro.style.display = "block";
    formLogin.style.display = "none";
  }

  menu.classList.add("active");
}

function cerrarMenuAuth() {
  document.getElementById("menu-registro").classList.remove("active");
}

// 5. ÍCONO DE OJO PARA VER/OCULTAR CONTRASEÑA
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

// 6. PROCESO DE REGISTRO
function procesarRegistro(e) {
  e.preventDefault();

  const pass = document.getElementById("reg-pass").value;
  const confirmPass = document.getElementById("reg-confirm-pass").value;

  if (pass !== confirmPass) {
    alert("Las contraseñas no coinciden. Por favor verifica.");
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
  actualizarTablaUsuarios();

  document.getElementById("form-registro").reset();
  cerrarMenuAuth();
}

// 7. PROCESO DE LOGIN (CORREO O TELÉFONO)
function procesarLogin(e) {
  e.preventDefault();

  const id = document.getElementById("login-identificador").value;
  const pass = document.getElementById("login-pass").value;

  let usuarios = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];

  const usuario = usuarios.find(u => (u.correo === id || u.telefono === id) && u.password === pass);

  if (usuario) {
    iniciarSesionExitoso(usuario);
    document.getElementById("form-login").reset();
    cerrarMenuAuth();
  } else {
    alert("Correo/Teléfono o contraseña incorrectos.");
  }
}

// 8. AUTENTICACIÓN EXITOSA Y MANTENER SESIÓN
function iniciarSesionExitoso(usuario) {
  localStorage.setItem("usuarioActivo", JSON.stringify(usuario));

  document.getElementById("auth-buttons").style.display = "none";
  document.getElementById("user-display-name").textContent = `${usuario.nombre} ${usuario.apellido}`;
  document.getElementById("user-profile").style.display = "flex";
}

function cerrarSesion() {
  localStorage.removeItem("usuarioActivo");
  document.getElementById("auth-buttons").style.display = "flex";
  document.getElementById("user-profile").style.display = "none";
}

function verificarSesionActiva() {
  const activo = JSON.parse(localStorage.getItem("usuarioActivo"));
  if (activo) iniciarSesionExitoso(activo);
}

// 9. ACTUALIZAR TABLA DE USUARIOS REGISTRADOS EN EL PANEL ADMIN
function actualizarTablaUsuarios() {
  const body = document.getElementById("tabla-usuarios-body");
  if (!body) return;

  let usuarios = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];
  body.innerHTML = "";

  usuarios.forEach(u => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${u.nombre}</td>
      <td>${u.apellido}</td>
      <td>${u.telefono}</td>
      <td>${u.correo}</td>
    `;
    body.appendChild(tr);
  });
}

// 10. CARRITO DE COMPRAS (SOLO ABRE AL HACER CLIC EN SU BOTÓN)
function toggleCarrito() {
  document.getElementById("panel-carrito").classList.toggle("active");
}

function agregarAlCarrito(id) {
  const p = listaCompletaProductos.find(prod => prod.id === id);
  if (!p) return;

  carrito.push(p);
  document.getElementById("cart-count").textContent = carrito.length;

  // NOTA: NO se abre el carrito automáticamente, solo suma la cantidad
  alert(`Producto "${p.producto}" agregado al carrito.`);
}

function procesarPedido() {
  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }
  alert("Pedido procesado con éxito.");
  carrito = [];
  document.getElementById("cart-count").textContent = "0";
  toggleCarrito();
}

// INICIALIZACIÓN
document.addEventListener("DOMContentLoaded", () => {
  verificarAccesoAdmin();
});
