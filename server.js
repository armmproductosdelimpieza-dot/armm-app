const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Base de datos temporal en memoria
let inventario = [
  {
    id: 1,
    nombre: "Cloro Concentrado",
    categoria: "Desinfección",
    precios: { "1L": 18, "5L": 75, "20L": 260 }
  },
  {
    id: 2,
    nombre: "Detergente Líquido Multiusos",
    categoria: "Limpieza General",
    precios: { "1L": 25, "5L": 110, "20L": 380 }
  },
  {
    id: 3,
    nombre: "Suavizante de Telas",
    categoria: "Cuidado de Ropa",
    precios: { "1L": 22, "5L": 95, "20L": 340 }
  },
  {
    id: 4,
    nombre: "Desengrasante Industrial",
    categoria: "Especializados",
    precios: { "1L": 35, "5L": 150, "20L": 520 }
  }
];

let clientes = [];
let pedidos = [];

// Ruta para la web pública
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta directa para el panel de administración
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Lógica de Socket.io para comunicación en tiempo real
io.on('connection', (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);

  // Enviar el estado actual de datos al conectarse un usuario/admin
  socket.emit('inventario_actualizado', inventario);
  socket.emit('lista_clientes_inicial', clientes);
  socket.emit('lista_pedidos_inicial', pedidos);

  // Evento: Agregar un nuevo producto desde el panel de Admin
  socket.on('agregar_nuevo_producto', (nuevoProducto) => {
    inventario.push(nuevoProducto);
    // Notificar a todos los clientes y admins conectados en tiempo real
    io.emit('inventario_actualizado', inventario);
    console.log('Nuevo producto agregado:', nuevoProducto.nombre);
  });

  // Evento: Actualizar precios de un producto existente
  socket.on('actualizar_precios', (data) => {
    const producto = inventario.find(p => p.id === data.id);
    if (producto) {
      producto.precios = data.precios;
      io.emit('inventario_actualizado', inventario);
      console.log(`Precios actualizados para el producto ID: ${data.id}`);
    }
  });

  // Evento: Registro de cliente desde la web pública
  socket.on('nuevo_registro_cliente', (cliente) => {
    // Evitar duplicados por correo
    const existe = clientes.some(c => c.correo === cliente.correo);
    if (!existe) {
      clientes.unshift(cliente);
    }
    // Emitir a todos los paneles de administración abiertos
    io.emit('cliente_registrado_notificacion', cliente);
    console.log('Nuevo cliente registrado:', cliente.nombre, cliente.apellido);
  });

  // Evento: Registro de un pedido/compra
  socket.on('nuevo_pedido', (pedido) => {
    pedidos.unshift(pedido);
    io.emit('pedido_registrado_notificacion', pedido);
    console.log('Nuevo pedido registrado de:', pedido.cliente);
  });

  socket.on('disconnect', () => {
    console.log(`Cliente desconectado: ${socket.id}`);
  });
});

// Iniciar servidor
server.listen(PORT, () => {
  console.log(`Servidor ARMM ejecutándose en http://localhost:${PORT}`);
  console.log(`Panel de administración disponible en http://localhost:${PORT}/admin`);
});
