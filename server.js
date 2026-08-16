/* ==========================================================================
   SISTEMA INTEGRAL ARMM LIMPIEZA - SCRIPT COMPLETO
   ========================================================================== */

// --- BASE DE DATOS INICIAL DE PRODUCTOS ---
const productosIniciales = [
  {
    id: 1,
    nombre: "CLORO",
    categoria: "CLOROS",
    modo: "litros",
    precios: { l1: 14, l5: 65, l20: 240 },
    imagen: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500"
  },
  {
    id: 2,
    nombre: "CLORO USO INDUSTRIAL",
    categoria: "CLOROS",
    modo: "litros",
    precios: { l1: 18, l5: 85, l20: 320 },
    imagen: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500"
  },
  {
    id: 3,
    nombre: "PINO (VERDE)",
    categoria: "PINOL",
    modo: "litros",
    precios: { l1: 14, l5: 65, l20: 240 },
    imagen: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=500"
  },
  {
    id: 4,
    nombre: "DETERPINO",
    categoria: "DETERGENTES",
    modo: "litros",
    precios: { l1: 33, l5: 155, l20: 580 },
    imagen: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=500"
  },
  {
    id: 5,
    nombre: "TRAPEADOR MICROFIBRA ESPAÑOLA",
    categoria: "JARCERÍA",
    modo: "piezas",
    precios: { menudeo: 115, mayoreo: 95 },
    imagen: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500"
  }
];

// Variables de Estado
let productos = JSON.parse(localStorage.getItem('armm_productos')) || productosIniciales;
let carrito = JSON.parse(localStorage.getItem('armm_carrito')) || [];
let cuponDescuento = 0;
let categoriaActual = 'TODOS';

/* ==========================================================================
   1. INICIALIZACIÓN
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  // Guardar catálogo inicial si no existe
  if (!localStorage.getItem('armm_productos')) {
    guardarEnLocalStorage('armm_productos', productos);
  }

  // Vista de Tienda Pública
  if (document.getElementById('grid-productos')) {
    renderizarProductos(productos);
    actualizarCarritoUI();
  }

  // Vista de Panel Administrativo
  if (window.location.pathname.includes("admin.html")) {
    const modalPass = document.getElementById("modal-pass-admin");
    if (modalPass) modalPass.style.display = "flex";
  }

  // Escuchar cambios de almacenamiento en tiempo real entre pestañas/páginas
  window.addEventListener('storage', (e) => {
    if (e.key === 'armm_productos') {
      productos = JSON.parse(e.newValue) || [];
      if (document.getElementById('grid-productos')) renderizarProductos(productos);
      if (document.getElementById('lista-inventario-admin')) cargarInventarioAdmin();
    }
  });
});

/* ==========================================================================
   2. ACCESO AL PANEL DE ADMINISTRACIÓN (CLAVE: ARMM123)
   ========================================================================== */
function validarClaveAdmin() {
  const inputPass = document.getElementById("input-admin-pass").value;
  const errorMsg = document.getElementById("admin-pass-error");

  if (inputPass === "ARMM123") {
    document.getElementById("modal-pass-admin").style.display = "none";
    document.getElementById("admin-content").style.display = "block";
    cargarInventarioAdmin();
  } else {
    errorMsg.innerText = "Contraseña incorrecta. Inténtalo de nuevo.";
  }
}

/* ==========================================================================
   3. CATÁLOGO Y RENDERIZADO (TIENDA PÚBLICA)
   ========================================================================== */
function renderizarProductos(lista) {
  const grid = document.getElementById('grid-productos');
  if (!grid) return;
  grid.innerHTML = '';

  lista.forEach(prod => {
    const card = document.createElement('div');
    card.className = 'product-card';

    let selectorOpciones = '';
    if (prod.modo === 'litros') {
      selectorOpciones = `
        <select id="select-precio-${prod.id}">
          <option value="l1">1L - $${prod.precios.l1}</option>
          <option value="l5">5L - $${prod.precios.l5}</option>
          <option value="l20">Porrón 20L - $${prod.precios.l20}</option>
        </select>
      `;
    } else {
      selectorOpciones = `
        <select id="select-precio-${prod.id}">
          <option value="menudeo">Menudeo - $${prod.precios.menudeo}</option>
          <option value="mayoreo">Mayoreo - $${prod.precios.mayoreo}</option>
        </select>
      `;
    }

    const precioInicial = prod.modo === 'litros' ? prod.precios.l1 : prod.precios.menudeo;

    card.innerHTML = `
      <div class="card-badge">${prod.categoria}</div>
      <img src="${prod.imagen}" alt="${prod.nombre}">
      <div class="card-body">
        <h4>${prod.nombre}</h4>
        <label>Presentación:</label>
        ${selectorOpciones}
        <div class="card-price">$<span id="price-display-${prod.id}">${precioInicial}</span></div>
        <button class="btn-add-cart" onclick="agregarAlCarrito(${prod.id})">
          <i class="fas fa-cart-plus"></i> Agregar al Carrito
        </button>
      </div>
    `;

    grid.appendChild(card);

    // Escuchador para cambiar el precio en pantalla al cambiar presentación
    const select = document.getElementById(`select-precio-${prod.id}`);
    if (select) {
      select.addEventListener('change', (e) => {
        const opcion = e.target.value;
        document.getElementById(`price-display-${prod.id}`).innerText = prod.precios[opcion];
      });
    }
  });
}

function filtrarCategoria(cat) {
  categoriaActual = cat;
  document.querySelectorAll('.btn-cat').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  if (cat === 'TODOS') {
    renderizarProductos(productos);
  } else {
    const filtrados = productos.filter(p => p.categoria.toUpperCase() === cat.toUpperCase());
    renderizarProductos(filtrados);
  }
}

function filtrarProductos() {
  const query = document.getElementById('input-buscar').value.toLowerCase();
  const filtrados = productos.filter(p => 
    p.nombre.toLowerCase().includes(query) || 
    p.categoria.toLowerCase().includes(query)
  );
  renderizarProductos(filtrados);
}

/* ==========================================================================
   4. CARRITO DE COMPRAS
   ========================================================================== */
function toggleCarrito() {
  const menu = document.getElementById('menu-carrito');
  if (menu) menu.classList.toggle('active');
}

function agregarAlCarrito(idProducto) {
  const prod = productos.find(p => p.id === idProducto);
  const select = document.getElementById(`select-precio-${idProducto}`);
  const opcionClave = select.value;
  const precioUnitario = prod.precios[opcionClave];

  let etiquetaPresentacion = opcionClave.toUpperCase();
  if (opcionClave === 'l1') etiquetaPresentacion = '1 Litro';
  if (opcionClave === 'l5') etiquetaPresentacion = '5 Litros';
  if (opcionClave === 'l20') etiquetaPresentacion = 'Porrón 20L';

  const itemExistente = carrito.find(item => item.id === idProducto && item.presentacion === etiquetaPresentacion);

  if (itemExistente) {
    itemExistente.cantidad++;
  } else {
    carrito.push({
      id: prod.id,
      nombre: prod.nombre,
      presentacion: etiquetaPresentacion,
      precio: precioUnitario,
      cantidad: 1
    });
  }

  guardarEnLocalStorage('armm_carrito', carrito);
  actualizarCarritoUI();
  toggleCarrito();
}

function actualizarCarritoUI() {
  const contenedorItems = document.getElementById('items-carrito');
  const countBadge = document.getElementById('cart-count');
  if (!contenedorItems) return;

  contenedorItems.innerHTML = '';
  let subtotal = 0;
  let totalItems = 0;

  carrito.forEach((item, index) => {
    subtotal += item.precio * item.cantidad;
    totalItems += item.cantidad;

    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <div>
        <strong>${item.nombre}</strong> <br>
        <small>${item.presentacion} - $${item.precio} x ${item.cantidad}</small>
      </div>
      <div>
        <button onclick="cambiarCantidadCart(${index}, -1)">-</button>
        <button onclick="cambiarCantidadCart(${index}, 1)">+</button>
        <button onclick="eliminarItemCart(${index})"><i class="fas fa-trash"></i></button>
      </div>
    `;
    contenedorItems.appendChild(div);
  });

  if (countBadge) countBadge.innerText = totalItems;

  const descuentoTotal = subtotal * cuponDescuento;
  const total = subtotal - descuentoTotal;

  document.getElementById('subtotal-precio').innerText = subtotal.toFixed(2);
  document.getElementById('descuento-precio').innerText = descuentoTotal.toFixed(2);
  document.getElementById('total-precio').innerText = total.toFixed(2);
}

function cambiarCantidadCart(index, cambio) {
  carrito[index].cantidad += cambio;
  if (carrito[index].cantidad <= 0) {
    carrito.splice(index, 1);
  }
  guardarEnLocalStorage('armm_carrito', carrito);
  actualizarCarritoUI();
}

function eliminarItemCart(index) {
  carrito.splice(index, 1);
  guardarEnLocalStorage('armm_carrito', carrito);
  actualizarCarritoUI();
}

function aplicarCuponCliente() {
  const cupon = document.getElementById('input-cupon-cliente').value.toUpperCase().trim();
  const msg = document.getElementById('mensaje-cupon');

  if (cupon === 'ARMM10') {
    cuponDescuento = 0.10;
    msg.innerText = "¡Cupón del 10% aplicado!";
    msg.style.color = "#00ff88";
  } else {
    cuponDescuento = 0;
    msg.innerText = "Cupón inválido";
    msg.style.color = "#ff4d4d";
  }
  actualizarCarritoUI();
}

function realizarPedidoSPEI() {
  if (carrito.length === 0) {
    alert("El carrito está vacío");
    return;
  }
  alert("¡Pedido realizado con éxito! Realiza tu transferencia a BBVA con los datos indicados.");
  carrito = [];
  guardarEnLocalStorage('armm_carrito', carrito);
  actualizarCarritoUI();
  toggleCarrito();
}

/* ==========================================================================
   5. MENÚS DESPLEGABLES Y AUTENTICACIÓN USUARIOS
   ========================================================================== */
function toggleMenuLogin() {
  const m = document.getElementById('menu-login');
  if (m) m.classList.toggle('active');
}

function toggleMenuRegistro() {
  const m = document.getElementById('menu-registro');
  if (m) m.classList.toggle('active');
}

function toggleVerPassword(inputId, icono) {
  const input = document.getElementById(inputId);
  if (input.type === "password") {
    input.type = "text";
    icono.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    input.type = "password";
    icono.classList.replace("fa-eye-slash", "fa-eye");
  }
}

function procesarInicioSesion(e) {
  e.preventDefault();
  const id = document.getElementById('login-identificador').value;
  document.getElementById('auth-buttons').style.display = 'none';
  document.getElementById('user-profile').style.display = 'block';
  document.getElementById('user-display-name').innerText = id;
  toggleMenuLogin();
}

function guardarRegistro(e) {
  e.preventDefault();
  alert("Registro completado. Ya puedes iniciar sesión.");
  toggleMenuRegistro();
}

/* ==========================================================================
   6. GESTIÓN DE INVENTARIO (PANEL ADMIN.HTML)
   ========================================================================== */
function cargarInventarioAdmin() {
  const listaContenedor = document.getElementById('lista-inventario-admin');
  const statCount = document.getElementById('stat-productos-count');
  if (!listaContenedor) return;

  listaContenedor.innerHTML = '';
  if (statCount) statCount.innerText = productos.length;

  productos.forEach(p => {
    const item = document.createElement('div');
    item.className = 'admin-inventory-item';
    
    let infoPrecio = p.modo === 'litros' 
      ? `1L: $${p.precios.l1} | 5L: $${p.precios.l5} | 20L: $${p.precios.l20}`
      : `Menudeo: $${p.precios.menudeo} | Mayoreo: $${p.precios.mayoreo}`;

    item.innerHTML = `
      <div>
        <strong>${p.nombre}</strong> <small>(${p.categoria})</small>
        <p>${infoPrecio}</p>
      </div>
      <div>
        <button onclick="eliminarProductoAdmin(${p.id})"><i class="fas fa-trash"></i></button>
      </div>
    `;
    listaContenedor.appendChild(item);
  });
}

function guardarProductoAdmin(e) {
  e.preventDefault();
  const nombre = document.getElementById('admin-prod-nombre').value;
  const categoria = document.getElementById('admin-prod-categoria').value;
  const modo = document.getElementById('admin-prod-modo').value;

  const precio1l = parseFloat(document.getElementById('admin-precio-1l').value) || 0;
  const precio5l = parseFloat(document.getElementById('admin-precio-5l').value) || 0;
  const precio20l = parseFloat(document.getElementById('admin-precio-20l').value) || 0;

  const nuevoProducto = {
    id: Date.now(),
    nombre: nombre.toUpperCase(),
    categoria: categoria,
    modo: modo,
    precios: modo === 'litros' 
      ? { l1: precio1l, l5: precio5l, l20: precio20l }
      : { menudeo: precio1l, mayoreo: precio5l },
    imagen: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500"
  };

  productos.push(nuevoProducto);
  guardarEnLocalStorage('armm_productos', productos);
  cargarInventarioAdmin();
  document.getElementById('form-producto-admin').reset();
  alert("Producto registrado correctamente");
}

function eliminarProductoAdmin(id) {
  if (confirm("¿Estás seguro de eliminar este producto del inventario?")) {
    productos = productos.filter(p => p.id !== id);
    guardarEnLocalStorage('armm_productos', productos);
    cargarInventarioAdmin();
  }
}

function filtrarProductosAdmin() {
  const query = document.getElementById('input-buscar-admin').value.toLowerCase();
  const items = document.querySelectorAll('.admin-inventory-item');
  items.forEach(item => {
    const text = item.innerText.toLowerCase();
    item.style.display = text.includes(query) ? 'flex' : 'none';
  });
}

/* ==========================================================================
   7. FUNCION DE APOYO
   ========================================================================== */
function guardarEnLocalStorage(clave, datos) {
  localStorage.setItem(clave, JSON.stringify(datos));
}
