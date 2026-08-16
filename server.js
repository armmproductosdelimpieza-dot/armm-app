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

// Base de datos de productos precargada desde el Excel
let inventario = [
  { "id": 1, "nombre": "CLORO", "categoria": "Cloros", "saleMode": "litros", "precios": { "1L": 14, "5L": 70, "20L": 220 } },
  { "id": 2, "nombre": "CLORO USO INDUSTRIAL", "categoria": "Cloros", "saleMode": "litros", "precios": { "1L": 18, "5L": 90, "20L": 255 } },
  { "id": 3, "nombre": "PASTILLAS DE CLORO", "categoria": "Cloros", "saleMode": "litros", "precios": { "1L": "4X10", "5L": "Sueltas:", "20L": 120 } },
  { "id": 4, "nombre": "PINO (VERDE)", "categoria": "Pinol", "saleMode": "litros", "precios": { "1L": 14, "5L": 75, "20L": 190 } },
  { "id": 5, "nombre": "PINOL C/EXCEDENTE", "categoria": "Pinol", "saleMode": "litros", "precios": { "1L": 22, "5L": 110, "20L": 290 } },
  { "id": 6, "nombre": "PINO EXTRA", "categoria": "Pinol", "saleMode": "litros", "precios": { "1L": 26, "5L": 115, "20L": 370 } },
  { "id": 7, "nombre": "PINOL AROMAS", "categoria": "Pinol", "saleMode": "litros", "precios": { "1L": 16, "5L": 65, "20L": 160 } },
  { "id": 8, "nombre": "PINOL AROMAS PLUS", "categoria": "Pinol", "saleMode": "litros", "precios": { "1L": 22, "5L": 95, "20L": 310 } },
  { "id": 9, "nombre": "CLORO USO INDUSTRIAL", "categoria": "Bases", "saleMode": "litros", "precios": { "20L": 195 } },
  { "id": 10, "nombre": "CLORO", "categoria": "Bases", "saleMode": "litros", "precios": { "20L": 155 } },
  { "id": 11, "nombre": "MULTIUSOS AROMA PERFUME", "categoria": "Bases", "saleMode": "litros", "precios": { "20L": 180 } },
  { "id": 12, "nombre": "MULTIUSOS DOBLE AROMA", "categoria": "Bases", "saleMode": "litros", "precios": { "20L": 260 } },
  { "id": 13, "nombre": "MULTIUSOS PERFUME DOBLE AROMA", "categoria": "Bases", "saleMode": "litros", "precios": { "20L": 320 } },
  { "id": 14, "nombre": "AJAX EXPEL", "categoria": "Bases", "saleMode": "litros", "precios": { "20L": 290 } },
  { "id": 15, "nombre": "AJAX BICARBONATO", "categoria": "Bases", "saleMode": "litros", "precios": { "20L": 250 } },
  { "id": 16, "nombre": "AJAX BICARBONATO DOBLE AROMA", "categoria": "Bases", "saleMode": "litros", "precios": { "20L": 330 } },
  { "id": 17, "nombre": "BASE FABULOSO", "categoria": "Bases", "saleMode": "litros", "precios": { "20L": 160 } },
  { "id": 18, "nombre": "MAS COLOR", "categoria": "Bases", "saleMode": "litros", "precios": { "1L": 28, "5L": 140, "20L": 295 } },
  { "id": 19, "nombre": "+ BEBE", "categoria": "Bases", "saleMode": "litros", "precios": { "1L": 28, "5L": 140, "20L": 295 } },
  { "id": 20, "nombre": "+ VINAGRE", "categoria": "Bases", "saleMode": "litros", "precios": { "1L": 28, "5L": 140, "20L": 295 } },
  { "id": 21, "nombre": "+ NEGRO", "categoria": "Bases", "saleMode": "litros", "precios": { "1L": 28, "5L": 140, "20L": 295 } },
  { "id": 22, "nombre": "+ LIRIO", "categoria": "Bases", "saleMode": "litros", "precios": { "1L": 28, "5L": 140, "20L": 295 } },
  { "id": 23, "nombre": "+ ROSITA", "categoria": "Bases", "saleMode": "litros", "precios": { "1L": 28, "5L": 140, "20L": 295 } },
  { "id": 24, "nombre": "+ ZOTE", "categoria": "Bases", "saleMode": "litros", "precios": { "1L": 28, "5L": 140, "20L": 295 } },
  { "id": 25, "nombre": "+ AMONIA", "categoria": "Bases", "saleMode": "litros", "precios": { "1L": 28, "5L": 140, "20L": 295 } },
  { "id": 26, "nombre": "+ PERSIL", "categoria": "Bases", "saleMode": "litros", "precios": { "1L": 28, "5L": 140, "20L": 295 } },
  { "id": 27, "nombre": "ARIEL", "categoria": "Bases", "saleMode": "litros", "precios": { "1L": 28, "5L": 140, "20L": 295 } },
  { "id": 28, "nombre": "ARIEL OXI", "categoria": "Bases", "saleMode": "litros", "precios": { "1L": 28, "5L": 140, "20L": 360 } },
  { "id": 29, "nombre": "ARIEL C/SUAVIZANTE DAUWNY", "categoria": "Bases", "saleMode": "litros", "precios": { "1L": 28, "5L": 140, "20L": 360 } },
  { "id": 30, "nombre": "LAVAPINO", "categoria": "Detergentes", "saleMode": "litros", "precios": { "1L": 28, "5L": 140, "20L": 360 } },
  { "id": 31, "nombre": "DETERPINO", "categoria": "Detergentes", "saleMode": "litros", "precios": { "1L": 33, "5L": 170, "20L": 560 } },
  { "id": 32, "nombre": "JABON ROMA BICARBONATO", "categoria": "Detergentes", "saleMode": "litros", "precios": { "1L": 24, "5L": 105, "20L": 290 } },
  { "id": 33, "nombre": "JABON ROMA BICARBONATO C/EXCEDENTE", "categoria": "Detergentes", "saleMode": "litros", "precios": { "1L": 28, "5L": 140, "20L": 320 } },
  { "id": 34, "nombre": "DETERCLORO", "categoria": "Detergentes", "saleMode": "litros", "precios": { "1L": 28, "5L": 140, "20L": 280 } },
  { "id": 35, "nombre": "VANISCH ROSA", "categoria": "Vanish", "saleMode": "litros", "precios": { "1L": 20, "5L": 100, "20L": 295 } },
  { "id": 36, "nombre": "VANISCH BCO.", "categoria": "Vanish", "saleMode": "litros", "precios": { "1L": 29, "5L": 150, "20L": 320 } },
  { "id": 37, "nombre": "VANISCH GEL", "categoria": "Vanish", "saleMode": "litros", "precios": { "1L": 29, "5L": 150, "20L": 320 } },
  { "id": 38, "nombre": "SUAVIZANTE DE ROPA NORMAL", "categoria": "Suavizantes", "saleMode": "litros", "precios": { "1L": 24, "5L": 120, "20L": 295 } },
  { "id": 39, "nombre": "SUAVIZANTE DE ROPA DOBLE AROMA", "categoria": "Suavizantes", "saleMode": "litros", "precios": { "1L": 22, "5L": 105, "20L": 360 } },
  { "id": 40, "nombre": "JABON PARA MANOS", "categoria": "Lavamanos", "saleMode": "litros", "precios": { "1L": 26, "5L": 130, "20L": 340 } },
  { "id": 41, "nombre": "JABON P/MANOS C/EXCEDENTE", "categoria": "Lavamanos", "saleMode": "litros", "precios": { "1L": 28, "5L": 140, "20L": 330 } },
  { "id": 42, "nombre": "LAVATRASTES", "categoria": "Lavatrastes", "saleMode": "litros", "precios": { "1L": 29, "5L": 145, "20L": 495 } },
  { "id": 43, "nombre": "SHAMPOO C/CERA", "categoria": "Carros", "saleMode": "litros", "precios": { "1L": 24, "5L": 120, "20L": 330 } },
  { "id": 44, "nombre": "SHAMPOO CARROS ESPECIAL (ALTA ESPUMA)", "categoria": "Carros", "saleMode": "litros", "precios": { "1L": 28, "5L": 150, "20L": 350 } },
  { "id": 45, "nombre": "LIMPIA VIDRIOS", "categoria": "Carros", "saleMode": "litros", "precios": { "1L": 38, "5L": 190, "20L": 430 } },
  { "id": 46, "nombre": "AROMATIZANTE", "categoria": "Carros", "saleMode": "litros", "precios": { "1L": 85, "5L": 380, "20L": 640 } },
  { "id": 47, "nombre": "GEL PARA LLANTAS", "categoria": "Carros", "saleMode": "litros", "precios": { "1L": 65, "5L": 290, "20L": 530 } },
  { "id": 48, "nombre": "ABRILLANTADOR LLANTAS", "categoria": "Carros", "saleMode": "litros", "precios": { "1L": 35, "5L": 140, "20L": 450 } },
  { "id": 49, "nombre": "ALMOROL GEL", "categoria": "Carros", "saleMode": "litros", "precios": { "1L": 75, "5L": 340, "20L": 750 } },
  { "id": 50, "nombre": "ALMOROL LIQUIDO", "categoria": "Carros", "saleMode": "litros", "precios": { "1L": 80, "5L": 320, "20L": 730 } },
  { "id": 51, "nombre": "ALTO BRILLO", "categoria": "Carros", "saleMode": "litros", "precios": { "1L": 75, "5L": 345, "20L": 1450 } },
  { "id": 52, "nombre": "DETERGRASS", "categoria": "Limpieza Prufunda", "saleMode": "litros", "precios": { "1L": 38, "5L": 180, "20L": 410 } },
  { "id": 53, "nombre": "DTERGRASS C/VINAGRE", "categoria": "Limpieza Prufunda", "saleMode": "litros", "precios": { "1L": 38, "5L": 180, "20L": 410 } },
  { "id": 54, "nombre": "PODER VINAGRE", "categoria": "Limpieza Prufunda", "saleMode": "litros", "precios": { "1L": 22, "5L": 110, "20L": 290 } },
  { "id": 55, "nombre": "DESENGRAZANTE", "categoria": "Limpieza Prufunda", "saleMode": "litros", "precios": { "1L": 25, "5L": 105, "20L": 380 } },
  { "id": 56, "nombre": "DESENFRAZANTE PLUS", "categoria": "Limpieza Prufunda", "saleMode": "litros", "precios": { "1L": 40, "5L": 200, "20L": 450 } },
  { "id": 57, "nombre": "DESENGRAZANTE AZUL", "categoria": "Limpieza Prufunda", "saleMode": "litros", "precios": { "1L": 23, "5L": 115, "20L": 300 } },
  { "id": 58, "nombre": "QUITACOCHAMBRE", "categoria": "Limpieza Prufunda", "saleMode": "litros", "precios": { "1L": 30, "5L": 150, "20L": 490 } },
  { "id": 59, "nombre": "SARRICIDA", "categoria": "Limpieza Prufunda", "saleMode": "litros", "precios": { "1L": 30, "5L": 150, "20L": 345 } },
  { "id": 60, "nombre": "SARRIGEL", "categoria": "Limpieza Prufunda", "saleMode": "litros", "precios": { "1L": 37, "5L": 185, "20L": 410 } },
  { "id": 61, "nombre": "LIMPIA ACERO", "categoria": "Limpieza Prufunda", "saleMode": "litros", "precios": { "1L": 52, "5L": 260, "20L": 620 } },
  { "id": 62, "nombre": "LIMPIA ACERO GRADO ALIMENTICIO", "categoria": "Limpieza Prufunda", "saleMode": "litros", "precios": { "1L": 65, "5L": 325, "20L": 920 } },
  { "id": 63, "nombre": "REPELENTE CITRONELA", "categoria": "Repelentes Y Control", "saleMode": "litros", "precios": { "1L": 52, "5L": 125, "20L": 470 } },
  { "id": 64, "nombre": "REPELENTE SANCUDOS (TIPO OFF)", "categoria": "Repelentes Y Control", "saleMode": "litros", "precios": { "1L": 95, "5L": 470, "20L": 1330 } },
  { "id": 65, "nombre": "ESPANTA MOSCAS", "categoria": "Repelentes Y Control", "saleMode": "litros", "precios": { "1L": 42, "5L": 120, "20L": 450 } },
  { "id": 66, "nombre": "SANITIZANTE", "categoria": "Repelentes Y Control", "saleMode": "litros", "precios": { "1L": 42, "5L": 115, "20L": 410 } },
  { "id": 67, "nombre": "GERMICIDA", "categoria": "Repelentes Y Control", "saleMode": "litros", "precios": { "1L": 50, "5L": 250, "20L": 500 } },
  { "id": 68, "nombre": "GEL ANTIBACTERIAL", "categoria": "Repelentes Y Control", "saleMode": "litros", "precios": { "1L": 65, "5L": 270, "20L": 820 } },
  { "id": 69, "nombre": "VENENO (CHINCHES, GARRAPATAS, PULGAS)", "categoria": "Repelentes Y Control", "saleMode": "litros", "precios": { "1L": 85, "5L": 365 } },
  { "id": 70, "nombre": "VENENO CUCARACHAS", "categoria": "Repelentes Y Control", "saleMode": "litros", "precios": { "1L": 85, "5L": 395 } },
  { "id": 71, "nombre": "SHAMPOO CREOLINA", "categoria": "Cuidado Personal", "saleMode": "litros", "precios": { "1L": 45, "5L": 225, "20L": 470 } },
  { "id": 72, "nombre": "SHAMPOO PARA MANOS", "categoria": "Cuidado Personal", "saleMode": "litros", "precios": { "1L": 25, "5L": 125, "20L": 460 } },

  // JARCILLERÍA Y ACCESORIOS
  { "id": 73, "nombre": "CAJA HIGIENICO DALIA 180", "categoria": "Jarcería", "saleMode": "mayoreo_menudeo", "precios": { "Mayoreo": 490 } },
  { "id": 74, "nombre": "CAJA TOALLA EN ROLLO CAFÉ K160", "categoria": "Jarcería", "saleMode": "mayoreo_menudeo", "precios": { "Mayoreo": 410 } },
  { "id": 75, "nombre": "CAJA TOALLA EN ROLLO BLANCA TR160", "categoria": "Jarcería", "saleMode": "mayoreo_menudeo", "precios": { "Mayoreo": 540 } },
  { "id": 76, "nombre": "TOALLA INTERDOBLADA DALITAS Tl19800", "categoria": "Jarcería", "saleMode": "mayoreo_menudeo", "precios": { "Mayoreo": 319 } },
  { "id": 77, "nombre": "TRAPEADOR MICROFIBRA ESPAÑOLA", "categoria": "Jarcería", "saleMode": "mayoreo_menudeo", "precios": { "Menudeo": 115, "Mayoreo": 98 } },
  { "id": 78, "nombre": "TRAPEADOR MICROFIBRA PAÑO MEDIANO", "categoria": "Jarcería", "saleMode": "mayoreo_menudeo", "precios": { "Menudeo": 84, "Mayoreo": 78 } },
  { "id": 79, "nombre": "ESCOBA VENECIANA", "categoria": "Jarcería", "saleMode": "mayoreo_menudeo", "precios": { "Menudeo": 95.5, "Mayoreo": 85.5 } },
  { "id": 80, "nombre": "ESCOBA ARANDAS MEDIANA Y CORTA", "categoria": "Jarcería", "saleMode": "mayoreo_menudeo", "precios": { "Menudeo": 65, "Mayoreo": 55 } },
  { "id": 81, "nombre": "ESCOBA ARANDAS 7 HILOS", "categoria": "Jarcería", "saleMode": "mayoreo_menudeo", "precios": { "Menudeo": 98, "Mayoreo": 88.55 } },
  { "id": 82, "nombre": "RECOGEDOR", "categoria": "Jarcería", "saleMode": "mayoreo_menudeo", "precios": { "Menudeo": 60, "Mayoreo": 55 } },
  { "id": 83, "nombre": "CEPILLO TIPO PLANCHA", "categoria": "Jarcería", "saleMode": "mayoreo_menudeo", "precios": { "Menudeo": 29, "Mayoreo": 25 } },
  { "id": 84, "nombre": "ESCOBA PARA CARRO", "categoria": "Jarcería", "saleMode": "mayoreo_menudeo", "precios": { "Menudeo": 45, "Mayoreo": 40 } },
  { "id": 85, "nombre": "ESCOBETILLA REDONDA", "categoria": "Jarcería", "saleMode": "mayoreo_menudeo", "precios": { "Menudeo": 23, "Mayoreo": 21 } },
  { "id": 86, "nombre": "CEPILLO CON TAZÓN PARA BAÑO", "categoria": "Jarcería", "saleMode": "mayoreo_menudeo", "precios": { "Menudeo": 49.5, "Mayoreo": 39.5 } },
  { "id": 87, "nombre": "PAQ. 10 PZ. SCOTT SHOPP", "categoria": "Jarcería", "saleMode": "mayoreo_menudeo", "precios": { "Menudeo": 68, "Mayoreo": 572 } },
  { "id": 88, "nombre": "PAQ. 36 PZ. MICROFIBRA KIRLAND", "categoria": "Jarcería", "saleMode": "mayoreo_menudeo", "precios": { "Menudeo": 25, "Mayoreo": 514 } },
  { "id": 89, "nombre": "CAJA PASTILLA WIESE DE OLOR", "categoria": "Jarcería", "saleMode": "mayoreo_menudeo", "precios": { "Menudeo": 22, "Mayoreo": 490 } },
  { "id": 90, "nombre": "CAJA 14 PZ. PASTILLA WIESE AZUL", "categoria": "Jarcería", "saleMode": "mayoreo_menudeo", "precios": { "Menudeo": 22, "Mayoreo": 164 } },
  { "id": 91, "nombre": "PAQ. 10 PZ. GUANTE DE LÁTEX", "categoria": "Jarcería", "saleMode": "mayoreo_menudeo", "precios": { "Menudeo": 24, "Mayoreo": 176 } },
  { "id": 92, "nombre": "TIRA 6 PZ. SCOTCH BRITE VERDE CON AMARILLO", "categoria": "Jarcería", "saleMode": "mayoreo_menudeo", "precios": { "Menudeo": 22, "Mayoreo": 108 } },
  { "id": 93, "nombre": "CUADRITELA GDE", "categoria": "Jarcería", "saleMode": "mayoreo_menudeo", "precios": { "Menudeo": 16, "Mayoreo": 14 } },
  { "id": 94, "nombre": "CUADRITELA CHICA", "categoria": "Jarcería", "saleMode": "mayoreo_menudeo", "precios": { "Menudeo": 15, "Mayoreo": 11 } },
  { "id": 95, "nombre": "ESPONJA GRIS", "categoria": "Jarcería", "saleMode": "mayoreo_menudeo", "precios": { "Menudeo": 15, "Mayoreo": 10 } },
  { "id": 96, "nombre": "EMBUDO GRANDE DE PLÁSTICO", "categoria": "Jarcería", "saleMode": "mayoreo_menudeo", "precios": { "Menudeo": 31, "Mayoreo": 28 } },
  { "id": 97, "nombre": "EMBUDO CHICO DE PLÁSTICO", "categoria": "Jarcería", "saleMode": "mayoreo_menudeo", "precios": { "Menudeo": 22, "Mayoreo": 19 } },
  { "id": 98, "nombre": "FIBRA METÁLICA JUMBO", "categoria": "Jarcería", "saleMode": "mayoreo_menudeo", "precios": { "Menudeo": 22, "Mayoreo": 17 } },
  { "id": 99, "nombre": "CAJA 10KG JABÓN ROMA EN POLVO", "categoria": "Jarcería", "saleMode": "mayoreo_menudeo", "precios": { "Menudeo": 52, "Mayoreo": 453 } },
  { "id": 100, "nombre": "ENVASE ALCOHOLERO ROSCA 38", "categoria": "Envases", "saleMode": "mayoreo_menudeo", "precios": { "Menudeo": 6.9, "Mayoreo": 4.9 } },
  { "id": 101, "nombre": "ENVASE POLIETILENO TIPO ALCOHOLERO ROSCA 28", "categoria": "Envases", "saleMode": "mayoreo_menudeo", "precios": { "Menudeo": 6.8, "Mayoreo": 4.8 } },
  { "id": 102, "nombre": "ENVASE POLIETILENO ANILLADO", "categoria": "Envases", "saleMode": "mayoreo_menudeo", "precios": { "Menudeo": 6.4, "Mayoreo": 3.4 } },
  { "id": 103, "nombre": "ENVASE POLIETILENO 2L", "categoria": "Envases", "saleMode": "mayoreo_menudeo", "precios": { "Menudeo": 8.5, "Mayoreo": 5.5 } },
  { "id": 104, "nombre": "ENVASE POLIETILENO 5L", "categoria": "Envases", "saleMode": "mayoreo_menudeo", "precios": { "Menudeo": 20, "Mayoreo": 15 } },
  { "id": 105, "nombre": "ENVASE 20 L", "categoria": "Envases", "saleMode": "mayoreo_menudeo", "precios": { "Menudeo": 30, "Mayoreo": 28 } },
  { "id": 106, "nombre": "ENVASE PET 120 ML CON ROCEADOR", "categoria": "Envases", "saleMode": "mayoreo_menudeo", "precios": { "Menudeo": 10, "Mayoreo": 6.9 } },
  { "id": 107, "nombre": "ENVASE 500 ML CON ATOMIZADOR", "categoria": "Envases", "saleMode": "mayoreo_menudeo", "precios": { "Menudeo": 20, "Mayoreo": 15 } },
  { "id": 108, "nombre": "ENVASE 1L CON ATOMIZADOR", "categoria": "Envases", "saleMode": "mayoreo_menudeo", "precios": { "Menudeo": 22, "Mayoreo": 16 } },
  { "id": 109, "nombre": "ENVASE 1L CON ATOMIZADOR CANION", "categoria": "Envases", "saleMode": "mayoreo_menudeo", "precios": { "Menudeo": 32, "Mayoreo": 26.9 } },
  { "id": 110, "nombre": "ATOMIZADOR", "categoria": "Envases", "saleMode": "mayoreo_menudeo", "precios": { "Menudeo": 18, "Mayoreo": 11.3 } },
  { "id": 111, "nombre": "ATOMIZADOR CANION", "categoria": "Envases", "saleMode": "mayoreo_menudeo", "precios": { "Menudeo": 28, "Mayoreo": 22.5 } },
  { "id": 112, "nombre": "BOLSA CAMISETA NEGRA GDE.", "categoria": "Bolsas", "saleMode": "mayoreo_menudeo", "precios": { "Menudeo": 62, "Mayoreo": 52 } },
  { "id": 113, "nombre": "BOLSA NEGRA 70X90", "categoria": "Bolsas", "saleMode": "mayoreo_menudeo", "precios": { "Menudeo": 62, "Mayoreo": 52 } },
  { "id": 114, "nombre": "BOLSA NEGRA 60X90", "categoria": "Bolsas", "saleMode": "mayoreo_menudeo", "precios": { "Menudeo": 62, "Mayoreo": 52 } },
  { "id": 115, "nombre": "BOLSA JUMBO", "categoria": "Bolsas", "saleMode": "mayoreo_menudeo", "precios": { "Menudeo": 62, "Mayoreo": 52 } },
  { "id": 116, "nombre": "GUANTE DE MICROFIBRA", "categoria": "Jarcería", "saleMode": "mayoreo_menudeo", "precios": { "Menudeo": 56, "Mayoreo": 48 } }
];

let clientes = [];
let pedidos = [];
let solicitudesAyuda = [];

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'public', 'admin.html')));

io.on('connection', (socket) => {
  console.log(`Cliente conectado: ${socket.id}`);

  // Emitir catálogo completo a la conexión
  socket.emit('inventario_actualizado', inventario);

  // Agregar o Editar Producto
  socket.on('agregar_o_editar_producto', (prod) => {
    if (prod.id) {
      const idx = inventario.findIndex(p => p.id === parseInt(prod.id));
      if (idx !== -1) {
        inventario[idx] = { ...inventario[idx], ...prod, id: parseInt(prod.id) };
      }
    } else {
      prod.id = Date.now();
      inventario.push(prod);
    }
    io.emit('inventario_actualizado', inventario);
  });

  // Eliminar Producto
  socket.on('eliminar_producto', (id) => {
    inventario = inventario.filter(p => p.id !== parseInt(id));
    io.emit('inventario_actualizado', inventario);
  });

  socket.on('disconnect', () => console.log(`Desconectado: ${socket.id}`));
});

server.listen(PORT, () => console.log(`Servidor ARMM en ejecución en puerto ${PORT}`));
