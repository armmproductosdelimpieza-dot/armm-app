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
  { id: 1, nombre: "Cloro Concentrado", categoria: "Desinfección", precios: { "1L": 18, "5L": 75, "20L": 260 } },
  { id: 2, nombre: "Detergente Líquido Multiusos", categoria: "Limpieza General", precios: { "1L": 25, "5L": 110, "20L": 380 } },
  { id: 3, nombre: "Suavizante de Telas", categoria: "Cuidado de Ropa", precios: { "1L": 22, "5L": 95, "20L": 340 } },
  { id: 4, nombre: "Desengrasante Industrial", categoria: "Especializados", precios: { "1L": 35, "5L": 150, "20L": 520 } }
];

let clientes = [];
let pedidos = [];

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'public', 'admin.html')));

io.on('connection', (socket) => {
  // Enviar estado inicial
  socket.emit('inventario_actualizado', inventario);
  socket.emit('lista_pedidos_inicial', pedidos);

  // Registro/Login
  socket.on('validar_login_cliente', ({ correo, pass }) => {
    const clienteEncontrado = clientes.find(c => c.correo === correo && c.password === pass);
    if (clienteEncontrado) {
      socket.emit('respuesta_login_cliente', { exito: true, cliente: clienteEncontrado });
    } else {
      socket.emit('respuesta_login_cliente', { exito: false });
    }
  });

  // Procesar Pedido (Sin WhatsApp, directo al servidor)
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

    // Si el cliente no existe en el registro general, se guarda
    const existeCliente = clientes.some(c => c.correo === datosPedido.cliente.correo);
    if (!existeCliente) {
      clientes.unshift(datosPedido.cliente);
    }

    // Confirmación individual al cliente
    socket.emit('pedido_creado_exito', nuevoPedido);

    // Actualización global
    io.emit('lista_pedidos_inicial', pedidos);
  });

  // Actualizar Estado desde la Web de Admin
  socket.on('actualizar_estado_pedido', ({ pedidoId, nuevoEstado, fechaEstimada }) => {
    const pedido = pedidos.find(p => p.id === pedidoId);
    if (pedido) {
      pedido.estado = nuevoEstado;
      if (fechaEstimada) pedido.fechaEstimada = fechaEstimada;
      io.emit('pedido_actualizado_estado', pedido);
      io.emit('lista_pedidos_inicial', pedidos);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Servidor ARMM corriendo en http://localhost:${PORT}`);
});
