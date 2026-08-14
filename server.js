const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Endpoint para proveer la clave de PayPal al frontend sin exponerla estáticamente
app.get('/api/paypal-client-id', (req, res) => {
  res.json({ clientId: 'AfHg7MYVTPbX95NGAVgpJ' });
});

let productos = [
  { id: 1, nombre: "Jabón Multiusos", categoria: "Limpieza General", precios: { "1 Litro": 25, "Galón 4L": 90, "Porrón 20L": 400 } },
  { id: 2, nombre: "Cloro Concentrado", categoria: "Desinfectantes", precios: { "1 Litro": 15, "Galón 4L": 50, "Porrón 20L": 220 } },
  { id: 3, nombre: "Desengrasante Industrial", categoria: "Especializados", precios: { "1 Litro": 45, "Galón 4L": 160, "Porrón 20L": 750 } }
];

let clientesRegistrados = [];

io.on('connection', (socket) => {
  socket.emit('inventario_actualizado', productos);
  socket.emit('lista_clientes', clientesRegistrados);

  socket.on('nuevo_cliente_registrado', (cliente) => {
    clientesRegistrados.push(cliente);
    io.emit('lista_clientes', clientesRegistrados);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor ARMM corriendo en el puerto ${PORT}`);
});
