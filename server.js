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

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

io.on('connection', (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);

  socket.emit('inventario_actualizado', inventario);
  socket.emit('lista_clientes_inicial', clientes);
  socket.emit('lista_pedidos_inicial', pedidos);

  // Agregar nuevo producto
  socket.on('agregar_nuevo_producto', (nuevoProducto) => {
    inventario.push(nuevoProducto);
    io.emit('inventario_actualizado', inventario);
  });

  // Actualizar precios
  socket.on('actualizar_precios', (data) => {
    const producto = inventario.find(p => p.id === data.id);
    if (producto) {
      producto.precios = data.precios;
      io.emit('inventario_actualizado', inventario);
    }
  });

  // Nuevo registro de cliente
  socket.on('nuevo_registro_cliente', (cliente) => {
    const existe = clientes.some(c => c.correo === cliente.correo);
    if (!existe) {
      clientes.unshift(cliente);
    }
    io.emit('cliente_registrado_notificacion', cliente);
  });

  // Validación de Iniciar Sesión de Cliente
  socket.on('validar_login_cliente', ({ correo, pass }) => {
    const clienteEncontrado = clientes.find(c => c.correo === correo && c.password === pass);
    if (clienteEncontrado) {
      socket.emit('respuesta_login_cliente', { exito: true, cliente: clienteEncontrado });
    } else {
      socket.emit('respuesta_login_cliente', { exito: false });
    }
  });

  // Registro de pedido
  socket.on('nuevo_pedido', (pedido) => {
    pedidos.unshift(pedido);
    io.emit('pedido_registrado_notificacion', pedido);
  });

  socket.on('disconnect', () => {
    console.log(`Cliente desconectado: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`Servidor ARMM ejecutándose en http://localhost:${PORT}`);
});
