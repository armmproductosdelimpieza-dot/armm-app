const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

// Arreglos globales para almacenar la información en memoria del servidor
let clientesRegistrados = [];
let pedidosRegistrados = [];
let inventario = [
  {
    id: 1,
    nombre: "Detergente Multiusos",
    categoria: "Limpieza General",
    precios: { "1L": 35, "5L": 150, "20L": 550 }
  },
  {
    id: 2,
    nombre: "Cloro Concentrado",
    categoria: "Desinfección",
    precios: { "1L": 20, "5L": 85, "20L": 300 }
  },
  {
    id: 3,
    nombre: "Desengrasante Industrial",
    categoria: "Especializados",
    precios: { "1L": 50, "5L": 220, "20L": 800 }
  }
];

io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id);

  // 1. Enviar datos guardados al conectarse cualquier usuario o admin
  socket.emit('inventario_actualizado', inventario);
  socket.emit('lista_clientes_inicial', clientesRegistrados);
  socket.emit('lista_pedidos_inicial', pedidosRegistrados);

  // 2. Escuchar nuevo registro de usuario
  socket.on('nuevo_registro_cliente', (cliente) => {
    // Si no trae fecha, le asignamos la actual
    if (!cliente.fechaRegistro) {
      cliente.fechaRegistro = new Date().toLocaleDateString('es-MX', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    clientesRegistrados.unshift(cliente); // Guardar en el servidor
    io.emit('cliente_registrado_notificacion', cliente); // Transmitir al admin
  });

  // 3. Escuchar nuevos pedidos
  socket.on('nuevo_pedido', (pedido) => {
    if (!pedido.fecha) {
      pedido.fecha = new Date().toLocaleDateString('es-MX', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    }
    pedidosRegistrados.unshift(pedido); // Guardar pedido en el servidor
    io.emit('pedido_registrado_notificacion', pedido); // Transmitir al admin
  });

  // 4. Escuchar actualización de precios desde el admin
  socket.on('actualizar_precios', (data) => {
    const prod = inventario.find(p => p.id === data.id);
    if (prod) {
      prod.precios = data.precios;
      io.emit('inventario_actualizado', inventario); // Notificar cambios a todos
    }
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor ARMM corriendo en el puerto ${PORT}`);
});
