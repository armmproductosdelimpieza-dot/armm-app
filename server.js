// Arreglo completo con la totalidad de los productos de tu lista
const listaCompletaProductos = [
  // CLOROS
  { id: 1, categoria: "CLOROS", producto: "CLORO", p20L: 220, p5L: 70, p1L: 14 },
  { id: 2, categoria: "CLOROS", producto: "CLORO USO INDUSTRIAL", p20L: 255, p5L: 90, p1L: 18 },
  { id: 3, categoria: "CLOROS", producto: "PASTILLAS DE CLORO (1KG)", p20L: 120, p5L: 0, p1L: 0 },
  
  // PINOL
  { id: 4, categoria: "PINOL", producto: "PINO (VERDE)", p20L: 190, p5L: 75, p1L: 14 },
  { id: 5, categoria: "PINOL", producto: "PINOL C/EXCEDENTE", p20L: 290, p5L: 110, p1L: 22 },
  { id: 6, categoria: "PINOL", producto: "PINO EXTRA", p20L: 370, p5L: 115, p1L: 26 },
  { id: 7, categoria: "PINOL", producto: "PINOL AROMAS", p20L: 160, p5L: 65, p1L: 16 },
  { id: 8, categoria: "PINOL", producto: "PINOL AROMAS PLUS", p20L: 310, p5L: 95, p1L: 22 },

  // BASES
  { id: 9, categoria: "BASES", producto: "BASE CLORO USO INDUSTRIAL", p20L: 195, p5L: 0, p1L: 0 },
  { id: 10, categoria: "BASES", producto: "BASE CLORO", p20L: 155, p5L: 0, p1L: 0 },
  { id: 11, categoria: "BASES", producto: "MULTIUSOS AROMA PERFUME", p20L: 180, p5L: 0, p1L: 0 },
  { id: 12, categoria: "BASES", producto: "MULTIUSOS DOBLE AROMA", p20L: 260, p5L: 0, p1L: 0 },
  { id: 13, categoria: "BASES", producto: "MULTIUSOS PERFUME DOBLE AROMA", p20L: 320, p5L: 0, p1L: 0 },
  { id: 14, categoria: "BASES", producto: "AJAX EXPEL", p20L: 290, p5L: 0, p1L: 0 },
  { id: 15, categoria: "BASES", producto: "AJAX BICARBONATO", p20L: 250, p5L: 0, p1L: 0 },
  { id: 16, categoria: "BASES", producto: "AJAX BICARBONATO DOBLE AROMA", p20L: 330, p5L: 0, p1L: 0 },
  { id: 17, categoria: "BASES", producto: "BASE FABULOSO", p20L: 160, p5L: 0, p1L: 0 },
  { id: 18, categoria: "BASES", producto: "MAS COLOR", p20L: 295, p5L: 140, p1L: 28 },
  { id: 19, categoria: "BASES", producto: "+ BEBE", p20L: 295, p5L: 140, p1L: 28 },
  { id: 20, categoria: "BASES", producto: "+ VINAGRE", p20L: 295, p5L: 140, p1L: 28 },
  { id: 21, categoria: "BASES", producto: "+ NEGRO", p20L: 295, p5L: 140, p1L: 28 },

  // LIMPIEZA PROFUNDA Y ESPECIALES
  { id: 22, categoria: "LIMPIEZA PROFUNDA", producto: "SHAMPOO CARROS ESPECIAL", p20L: 350, p5L: 150, p1L: 28 },
  { id: 23, categoria: "LIMPIEZA PROFUNDA", producto: "LIMPIA VIDRIOS", p20L: 430, p5L: 190, p1L: 38 },
  { id: 24, categoria: "LIMPIEZA PROFUNDA", producto: "AROMATIZANTE", p20L: 640, p5L: 380, p1L: 85 },
  { id: 25, categoria: "LIMPIEZA PROFUNDA", producto: "GEL PARA LLANTAS", p20L: 530, p5L: 290, p1L: 65 },
  { id: 26, categoria: "LIMPIEZA PROFUNDA", producto: "ABRILLANTADOR LLANTAS", p20L: 450, p5L: 140, p1L: 35 },
  { id: 27, categoria: "LIMPIEZA PROFUNDA", producto: "ALMOROL GEL", p20L: 750, p5L: 340, p1L: 75 },
  { id: 28, categoria: "LIMPIEZA PROFUNDA", producto: "ALMOROL LIQUIDO", p20L: 730, p5L: 320, p1L: 80 },
  { id: 29, categoria: "LIMPIEZA PROFUNDA", producto: "ALTO BRILLO", p20L: 1450, p5L: 345, p1L: 75 },
  { id: 30, categoria: "LIMPIEZA PROFUNDA", producto: "DETERGRASS", p20L: 410, p5L: 180, p1L: 38 },
  { id: 31, categoria: "LIMPIEZA PROFUNDA", producto: "DETERGRASS C/VINAGRE", p20L: 410, p5L: 180, p1L: 38 },
  { id: 32, categoria: "LIMPIEZA PROFUNDA", producto: "PODER VINAGRE", p20L: 290, p5L: 110, p1L: 22 },
  { id: 33, categoria: "LIMPIEZA PROFUNDA", producto: "DESENGRAZANTE", p20L: 380, p5L: 105, p1L: 25 },
  { id: 34, categoria: "LIMPIEZA PROFUNDA", producto: "DESENGRAZANTE PLUS", p20L: 450, p5L: 200, p1L: 40 },
  { id: 35, categoria: "LIMPIEZA PROFUNDA", producto: "DESENGRAZANTE AZUL", p20L: 300, p5L: 115, p1L: 23 },
  { id: 36, categoria: "LIMPIEZA PROFUNDA", producto: "QUITACOCHAMBRE", p20L: 490, p5L: 150, p1L: 30 },
  { id: 37, categoria: "LIMPIEZA PROFUNDA", producto: "SARRICIDA", p20L: 345, p5L: 150, p1L: 30 },
  { id: 38, categoria: "LIMPIEZA PROFUNDA", producto: "SARRIGEL", p20L: 410, p5L: 185, p1L: 37 },
  { id: 39, categoria: "LIMPIEZA PROFUNDA", producto: "LIMPIA ACERO", p20L: 620, p5L: 260, p1L: 52 },
  { id: 40, categoria: "LIMPIEZA PROFUNDA", producto: "LIMPIA ACERO GRADO ALIMENTICIO", p20L: 920, p5L: 325, p1L: 65 },

  // JARCERÍA
  { id: 41, categoria: "JARCERÍA", producto: "CAJA HIGIENICO DALIA 180", mayoreo: 490, menudeo: 0 },
  { id: 42, categoria: "JARCERÍA", producto: "CAJA TOALLA EN ROLLO CAFÉ K160", mayoreo: 410, menudeo: 0 },
  { id: 43, categoria: "JARCERÍA", producto: "CAJA TOALLA EN ROLLO BLANCA TR160", mayoreo: 540, menudeo: 0 },
  { id: 44, categoria: "JARCERÍA", producto: "TOALLA INTERDOBLADA DALITAS Tl19800", mayoreo: 319, menudeo: 0 },
  { id: 45, categoria: "JARCERÍA", producto: "TRAPEADOR MICROFIBRA ESPAÑOLA", mayoreo: 98, menudeo: 115 },
  { id: 46, categoria: "JARCERÍA", producto: "TRAPEADOR MICROFIBRA PAÑO MEDIANO", mayoreo: 78, menudeo: 84 },
  { id: 47, categoria: "JARCERÍA", producto: "ESCOBA VENECIANA", mayoreo: 85.5, menudeo: 95.5 },
  { id: 48, categoria: "JARCERÍA", producto: "ESCOBA ARANDAS MEDIANA Y CORTA", mayoreo: 55, menudeo: 65 },
  { id: 49, categoria: "JARCERÍA", producto: "ESCOBA ARANDAS 7 HILOS", mayoreo: 88.55, menudeo: 98 },
  { id: 50, categoria: "JARCERÍA", producto: "RECOGEDOR", mayoreo: 55, menudeo: 60 },
  { id: 51, categoria: "JARCERÍA", producto: "CEPILLO TIPO PLANCHA", mayoreo: 25, menudeo: 29 },
  { id: 52, categoria: "JARCERÍA", producto: "ESCOBA PARA CARRO", mayoreo: 40, menudeo: 45 },
  { id: 53, categoria: "JARCERÍA", producto: "ESCOBETILLA REDONDA", mayoreo: 21, menudeo: 23 },
  { id: 54, categoria: "JARCERÍA", producto: "CEPILLO CON TAZÓN PARA BAÑO", mayoreo: 39.5, menudeo: 49.5 },
  { id: 55, categoria: "JARCERÍA", producto: "PAQ. 10 PZ. SCOTT SHOPP", mayoreo: 572, menudeo: 68 },
  { id: 56, categoria: "JARCERÍA", producto: "PAQ. 36 PZ. MICROFIBRA KIRLAND", mayoreo: 514, menudeo: 25 },
  { id: 57, categoria: "JARCERÍA", producto: "CAJA PASTILLA WIESE DE OLOR", mayoreo: 490, menudeo: 22 },
  { id: 58, categoria: "JARCERÍA", producto: "CAJA 14 PZ. PASTILLA WIESE AZUL", mayoreo: 164, menudeo: 22 },
  { id: 59, categoria: "JARCERÍA", producto: "PAQ. 10 PZ. GUANTE DE LÁTEX", mayoreo: 176, menudeo: 24 },
  { id: 60, categoria: "JARCERÍA", producto: "TIRA 6 PZ. SCOTCH BRITE VERDE CON AMARILLO", mayoreo: 108, menudeo: 22 },
  { id: 61, categoria: "JARCERÍA", producto: "CUADRITELA GDE", mayoreo: 14, menudeo: 16 },
  { id: 62, categoria: "JARCERÍA", producto: "CUADRITELA CHICA", mayoreo: 11, menudeo: 15 }
];

// Función para renderizar la lista completa en la tabla/panel
function renderizarProductosAdmin() {
  const contenedor = document.getElementById("tabla-productos-body");
  if (!contenedor) return;

  contenedor.innerHTML = ""; // Limpiar productos viejos/limitados

  listaCompletaProductos.forEach(item => {
    const fila = document.createElement("tr");
    
    // Si el producto tiene precios por volumen (20L, 5L, 1L)
    if (item.p20L !== undefined) {
      fila.innerHTML = `
        <td>${item.id}</td>
        <td>${item.categoria}</td>
        <td>${item.producto}</td>
        <td>$${item.p20L}</td>
        <td>${item.p5L ? '$' + item.p5L : 'N/A'}</td>
        <td>${item.p1L ? '$' + item.p1L : 'N/A'}</td>
        <td>
          <button class="btn-edit" onclick="editarProducto(${item.id})">Editar</button>
        </td>
      `;
    } else { // Si es Jarcería (Mayoreo/Menudeo)
      fila.innerHTML = `
        <td>${item.id}</td>
        <td>${item.categoria}</td>
        <td>${item.producto}</td>
        <td>Mayoreo: $${item.mayoreo}</td>
        <td colspan="2">Menudeo: ${item.menudeo ? '$' + item.menudeo : 'N/A'}</td>
        <td>
          <button class="btn-edit" onclick="editarProducto(${item.id})">Editar</button>
        </td>
      `;
    }
    contenedor.appendChild(fila);
  });
}

// Llamar la función al cargar el DOM
document.addEventListener("DOMContentLoaded", renderizarProductosAdmin);
