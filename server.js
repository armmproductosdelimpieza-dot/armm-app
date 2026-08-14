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

  // Agregar Nuevo Producto
  socket.on('agregar_nuevo_producto', (nuevoProducto) => {
    nuevoProducto.id = Date.now();
    inventario.push(nuevoProducto);
    io.emit('inventario_actualizado', inventario);
  });

  // Actualizar Precios de Productos
  socket.on('actualizar_precios', (data) => {
    const producto = inventario.find(p => p.id === data.id);
    if (producto) {
      producto.precios = data.precios;
      io.emit('inventario_actualizado', inventario);
    }
  });

  // Registro de Clientes
  socket.on('nuevo_registro_cliente', (cliente) => {
    const existe = clientes.some(c => c.correo === cliente.correo);
    if (!existe) clientes.unshift(cliente);
    io.emit('cliente_registrado_notificacion', cliente);
    io.emit('lista_clientes_inicial', clientes);
  });

  // Validar Login de Cliente
  socket.on('validar_login_cliente', ({ correo, pass }) => {
    const clienteEncontrado = clientes.find(c => c.correo === correo && c.password === pass);
    if (clienteEncontrado) {
      socket.emit('respuesta_login_cliente', { exito: true, cliente: clienteEncontrado });
    } else {
      socket.emit('respuesta_login_cliente', { exito: false });
    }
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

    // Guardar cliente en la lista global si no existía
    const existeCliente = clientes.some(c => c.correo === datosPedido.cliente.correo);
    if (!existeCliente) {
      clientes.unshift(datosPedido.cliente);
      io.emit('lista_clientes_inicial', clientes);
    }

    socket.emit('pedido_creado_exito', nuevoPedido);
    io.emit('pedido_registrado_notificacion', nuevoPedido);
    io.emit('lista_pedidos_inicial', pedidos);
  });

  // Actualizar Estado del Pedido desde el Admin
  socket.on('actualizar_estado_pedido', ({ pedidoId, nuevoEstado, fechaEstimada }) => {
    const pedido = pedidos.find(p => p.id === pedidoId);
    if (pedido) {
      pedido.estado = nuevoEstado;
      if (fechaEstimada) pedido.fechaEstimada = fechaEstimada;
      io.emit('pedido_actualizado_estado', pedido);
      io.emit('lista_pedidos_inicial', pedidos);
    }
  });

  // Publicar Reseñas / Comentarios
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

server.listen(PORT, () => {
  console.log(`Servidor ARMM corriendo en http://localhost:${PORT}`);
});
