const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Base de datos en memoria
let inventario = [
  { id: 1, nombre: "Cloro Concentrado", categoria: "Desinfección", precios: { "1L": 18, "5L": 75, "20L": 260 } },
  { id: 2, nombre: "Detergente Líquido Multiusos", categoria: "Limpieza General", precios: { "1L": 25, "5L": 110, "20L": 380 } },
  { id: 3, nombre: "Suavizante de Telas", categoria: "Cuidado de Ropa", precios: { "1L": 22, "5L": 95, "20L": 340 } },
  { id: 4, nombre: "Desengrasante Industrial", categoria: "Especializados", precios: { "1L": 35, "5L": 150, "20L": 520 } }
];

let clientes = [];
let pedidos = [];
let solicitudesAyuda = [];
let resenas = [
  { nombre: "María López", comentario: "Excelente calidad en el cloro concentrado, rinde muchísimo.", estrellas: 5, fecha: "10/08/2026" },
  { nombre: "Carlos R.", comentario: "El desengrasante dejó impecable el taller. Muy recomendado ARMM.", estrellas: 5, fecha: "12/08/2026" }
];

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'public', 'admin.html')));

io.on('connection', (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);

  // Enviar datos iniciales
  socket.emit('inventario_actualizado', inventario);
  socket.emit('lista_clientes_inicial', clientes);
  socket.emit('lista_pedidos_inicial', pedidos);
  socket.emit('lista_resenas_inicial', resenas);
  socket.emit('lista_ayuda_inicial', solicitudesAyuda);

  // Agregar Nuevo Producto
  socket.on('agregar_nuevo_producto', (nuevoProducto) => {
    nuevoProducto.id = Date.now();
    inventario.push(nuevoProducto);
    io.emit('inventario_actualizado', inventario);
  });

  // Actualizar Precios
  socket.on('actualizar_precios', (data) => {
    const producto = inventario.find(p => p.id === data.id);
    if (producto) {
      producto.precios = data.precios;
      io.emit('inventario_actualizado', inventario);
    }
  });

  // Registro de Clientes Independiente / Carrito
  socket.on('nuevo_registro_cliente', (cliente) => {
    const existe = clientes.some(c => (cliente.correo && c.correo === cliente.correo) || c.telefono === cliente.telefono);
    if (existe) {
      socket.emit('respuesta_registro', { exito: false, msj: 'El correo o teléfono ya está registrado.' });
    } else {
      clientes.unshift(cliente);
      io.emit('lista_clientes_inicial', clientes);
      socket.emit('respuesta_registro', { exito: true, cliente });
    }
  });

  // Validar Login de Cliente (Correo o Teléfono)
  socket.on('validar_login_cliente', ({ identificador, pass }) => {
    const clienteEncontrado = clientes.find(c => 
      (c.correo === identificador || c.telefono === identificador) && c.password === pass
    );
    if (clienteEncontrado) {
      socket.emit('respuesta_login_cliente', { exito: true, cliente: clienteEncontrado });
    } else {
      socket.emit('respuesta_login_cliente', { exito: false, msj: 'Credenciales incorrectas.' });
    }
  });

  // Recuperar Contraseña / Centro de Ayuda
  socket.on('solicitar_recuperacion', (datos) => {
    // Validar si la información coincide con un cliente existente
    const coincidencia = clientes.find(c => 
      c.nombre.toLowerCase().trim() === datos.nombre.toLowerCase().trim() &&
      c.telefono === datos.telefono &&
      ((!c.correo && !datos.correo) || (c.correo && datos.correo && c.correo.toLowerCase().trim() === datos.correo.toLowerCase().trim()))
    );

    const solicitud = {
      id: 'AYUDA-' + Math.floor(1000 + Math.random() * 9000),
      nombre: datos.nombre,
      telefono: datos.telefono,
      correo: datos.correo || 'No especificado',
      esValido: !!coincidencia,
      passwordActual: coincidencia ? coincidencia.password : 'No coincide con ningún usuario',
      fecha: new Date().toLocaleString('es-MX')
    };

    solicitudesAyuda.unshift(solicitud);
    io.emit('lista_ayuda_inicial', solicitudesAyuda);
    socket.emit('respuesta_recuperacion', { exito: true });
  });

  // Crear Pedido desde la Web Pública
  socket.on('realizar_pedido', (datosPedido) => {
    const numPedido = 'PED-' + Math.floor(100000 + Math.random() * 900000);
    const nuevoPedido = {
      id: numPedido,
      cliente: datosPedido.cliente,
      productos: datosPedido.productos,
      total: datosPedido.total,
      metodoPago: datosPedido.metodoPago,
      estado: 'Leído',
      fechaEstimada: 'Por definir por el administrador',
      fechaRegistro: new Date().toLocaleString('es-MX')
    };

    pedidos.unshift(nuevoPedido);

    // Asegurar que el cliente existe con sus datos completos
    const idx = clientes.findIndex(c => (c.correo && c.correo === datosPedido.cliente.correo) || c.telefono === datosPedido.cliente.telefono);
    if (idx === -1) {
      clientes.unshift(datosPedido.cliente);
    } else {
      clientes[idx] = datosPedido.cliente; // Actualizar datos
    }
    
    io.emit('lista_clientes_inicial', clientes);
    socket.emit('pedido_creado_exito', nuevoPedido);
    io.emit('pedido_registrado_notificacion', nuevoPedido);
    io.emit('lista_pedidos_inicial', pedidos);
  });

  // Actualizar Estado del Pedido
  socket.on('actualizar_estado_pedido', ({ pedidoId, nuevoEstado, fechaEstimada }) => {
    const pedido = pedidos.find(p => p.id === pedidoId);
    if (pedido) {
      pedido.estado = nuevoEstado;
      if (fechaEstimada) pedido.fechaEstimada = fechaEstimada;
      io.emit('pedido_actualizado_estado', pedido);
      io.emit('lista_pedidos_inicial', pedidos);
    }
  });

  // Reseñas
  socket.on('nueva_resena', (datosResena) => {
    const resena = {
      nombre: datosResena.nombre,
      comentario: datosResena.comentario,
      estrellas: parseInt(datosResena.estrellas) || 5,
      fecha: new Date().toLocaleDateString('es-MX')
    };
    resenas.unshift(resena);
    io.emit('lista_resenas_inicial', resenas);
  });

  socket.on('disconnect', () => console.log(`Cliente desconectado: ${socket.id}`));
});

server.listen(PORT, () => console.log(`Servidor ARMM corriendo en http://localhost:${PORT}`));
