	const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Datos de la empresa con LADA México (521)
const EMPRESA_INFO = {
  nombre: "ARMM",
  eslogan: "PRODUCTOS Y ACCESORIOS DE LIMPIEZA",
  telefono: "3351097726",
  whatsapp: "5213351097726", // Formato internacional correcto para México
  email: "armmproductosdelimpieza@gmail.com",
  ciudad: "Guadalajara",
  zonasEntrega: ["Tonalá", "Guadalajara Centro", "Tlaquepaque", "Zapopan"],
  horario: "8:00 AM - 18:00 PM",
  instagram: "ARMMPDL",
  envioGratisMinimo: 200,
  descuentoRegistro: 0.30
};

let inventario = [
  { id: 1, categoria: "CLOROS", nombre: "Cloro Regular", precios: { "1L": 14, "5L": 70, "20L": 220 } },
  { id: 2, categoria: "CLOROS", nombre: "Cloro Uso Industrial", precios: { "1L": 18, "5L": 90, "20L": 255 } },
  { id: 3, categoria: "PINOS", nombre: "Pino Verde", precios: { "1L": 14, "5L": 75, "20L": 190 } },
  { id: 4, categoria: "JARCERÍA", nombre: "Trapeador Microfibra Española", precios: { "Menudeo": 115, "Mayoreo": 98 } },
  { id: 5, categoria: "JARCERÍA", nombre: "Escoba Veneciana", precios: { "Menudeo": 95.5, "Mayoreo": 85.5 } }
];

app.get('/api/empresa', (req, res) => res.json(EMPRESA_INFO));
app.get('/api/productos', (req, res) => res.json(inventario));

// Agregar o Actualizar Producto
app.post('/api/admin/producto', (req, res) => {
  const { id, nombre, precios, categoria } = req.body;
  const numId = Number(id);
  const index = inventario.findIndex(p => p.id === numId);

  if (index !== -1) {
    inventario[index] = { id: numId, nombre, precios, categoria };
  } else {
    inventario.push({ id: Date.now(), nombre, precios, categoria });
  }

  io.emit('inventario_actualizado', inventario);
  res.json({ status: "ok", inventario });
});

// Eliminar Producto
app.delete('/api/admin/producto/:id', (req, res) => {
  const id = Number(req.params.id);
  inventario = inventario.filter(p => p.id !== id);
  io.emit('inventario_actualizado', inventario);
  res.json({ status: "ok", inventario });
});

io.on('connection', (socket) => {
  socket.emit('inventario_actualizado', inventario);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Servidor ARMM listo en el puerto ${PORT}`));