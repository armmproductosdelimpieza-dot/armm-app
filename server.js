const productos = [
  // CLOROS
  { id: 1, categoria: "CLOROS", nombre: "CLORO", p20L: 220, p5L: 70, p1L: 14 },
  { id: 2, categoria: "CLOROS", nombre: "CLORO USO INDUSTRIAL", p20L: 255, p5L: 90, p1L: 18 },
  { id: 3, categoria: "CLOROS", nombre: "PASTILLAS DE CLORO (1KG)", p20L: 120, p5L: 0, p1L: 10 },

  // PINOL
  { id: 4, categoria: "PINOL", nombre: "PINO (VERDE)", p20L: 190, p5L: 75, p1L: 14 },
  { id: 5, categoria: "PINOL", nombre: "PINOL C/EXCEDENTE", p20L: 290, p5L: 110, p1L: 22 },
  { id: 6, categoria: "PINOL", nombre: "PINO EXTRA", p20L: 370, p5L: 115, p1L: 26 },
  { id: 7, categoria: "PINOL", nombre: "PINOL AROMAS", p20L: 160, p5L: 65, p1L: 16 },
  { id: 8, categoria: "PINOL", nombre: "PINOL AROMAS PLUS", p20L: 310, p5L: 95, p1L: 22 },

  // BASES
  { id: 9, categoria: "BASES", nombre: "CLORO USO INDUSTRIAL (BASE)", p20L: 195, p5L: 0, p1L: 0 },
  { id: 10, categoria: "BASES", nombre: "CLORO (BASE)", p20L: 155, p5L: 0, p1L: 0 },
  { id: 11, categoria: "BASES", nombre: "MULTIUSOS AROMA PERFUME", p20L: 180, p5L: 0, p1L: 0 },
  { id: 12, categoria: "BASES", nombre: "MULTIUSOS DOBLE AROMA", p20L: 260, p5L: 0, p1L: 0 },
  { id: 13, categoria: "BASES", nombre: "MULTIUSOS PERFUME DOBLE AROMA", p20L: 320, p5L: 0, p1L: 0 },
  { id: 14, categoria: "BASES", nombre: "AJAX EXPEL", p20L: 290, p5L: 0, p1L: 0 },
  { id: 15, categoria: "BASES", nombre: "AJAX BICARBONATO", p20L: 250, p5L: 0, p1L: 0 },
  { id: 16, categoria: "BASES", nombre: "AJAX BICARBONATO DOBLE AROMA", p20L: 330, p5L: 0, p1L: 0 },
  { id: 17, categoria: "BASES", nombre: "BASE FABULOSO", p20L: 160, p5L: 0, p1L: 0 },

  // DETERGENTES Y DIVERSOS
  { id: 18, categoria: "DETERGENTES", nombre: "MAS COLOR", p20L: 295, p5L: 140, p1L: 28 },
  { id: 19, categoria: "DETERGENTES", nombre: "+ BEBE", p20L: 295, p5L: 140, p1L: 28 },
  { id: 20, categoria: "DETERGENTES", nombre: "+ VINAGRE", p20L: 295, p5L: 140, p1L: 28 },
  { id: 21, categoria: "DETERGENTES", nombre: "+ NEGRO", p20L: 295, p5L: 140, p1L: 28 },
  { id: 22, categoria: "AUTOMOTRIZ", nombre: "SHAMPOO CARROS ESPECIAL (ALTA ESPUMA)", p20L: 350, p5L: 150, p1L: 28 },
  { id: 23, categoria: "LIMPIEZA", nombre: "LIMPIA VIDRIOS", p20L: 430, p5L: 190, p1L: 38 },
  { id: 24, categoria: "AROMAS", nombre: "AROMATIZANTE", p20L: 640, p5L: 380, p1L: 85 },
  { id: 25, categoria: "AUTOMOTRIZ", nombre: "GEL PARA LLANTAS", p20L: 530, p5L: 290, p1L: 65 },
  { id: 26, categoria: "AUTOMOTRIZ", nombre: "ABRILLANTADOR LLANTAS", p20L: 450, p5L: 140, p1L: 35 },
  { id: 27, categoria: "AUTOMOTRIZ", nombre: "ALMOROL GEL", p20L: 750, p5L: 340, p1L: 75 },
  { id: 28, categoria: "AUTOMOTRIZ", nombre: "ALMOROL LIQUIDO", p20L: 730, p5L: 320, p1L: 80 },
  { id: 29, categoria: "AUTOMOTRIZ", nombre: "ALTO BRILLO", p20L: 1450, p5L: 345, p1L: 75 },

  // LIMPIEZA PROFUNDA
  { id: 30, categoria: "LIMPIEZA PROFUNDA", nombre: "DETERGRASS", p20L: 410, p5L: 180, p1L: 38 },
  { id: 31, categoria: "LIMPIEZA PROFUNDA", nombre: "DETERGRASS C/VINAGRE", p20L: 410, p5L: 180, p1L: 38 },
  { id: 32, categoria: "LIMPIEZA PROFUNDA", nombre: "PODER VINAGRE", p20L: 290, p5L: 110, p1L: 22 },
  { id: 33, categoria: "LIMPIEZA PROFUNDA", nombre: "DESENGRAZANTE", p20L: 380, p5L: 105, p1L: 25 },
  { id: 34, categoria: "LIMPIEZA PROFUNDA", nombre: "DESENGRAZANTE PLUS", p20L: 450, p5L: 200, p1L: 40 },
  { id: 35, categoria: "LIMPIEZA PROFUNDA", nombre: "DESENGRAZANTE AZUL", p20L: 300, p5L: 115, p1L: 23 },
  { id: 36, categoria: "LIMPIEZA PROFUNDA", nombre: "QUITACOCHAMBRE", p20L: 490, p5L: 150, p1L: 30 },
  { id: 37, categoria: "LIMPIEZA PROFUNDA", nombre: "SARRICIDA", p20L: 345, p5L: 150, p1L: 30 },
  { id: 38, categoria: "LIMPIEZA PROFUNDA", nombre: "SARRIGEL", p20L: 410, p5L: 185, p1L: 37 },
  { id: 39, categoria: "LIMPIEZA PROFUNDA", nombre: "LIMPIA ACERO", p20L: 620, p5L: 260, p1L: 52 },
  { id: 40, categoria: "LIMPIEZA PROFUNDA", nombre: "LIMPIA ACERO GRADO ALIMENTICIO", p20L: 920, p5L: 325, p1L: 65 },

  // JARCERÍA
  { id: 41, categoria: "JARCERÍA", nombre: "CAJA HIGIENICO DALIA 180", mayoreo: 490, menudeo: 0 },
  { id: 42, categoria: "JARCERÍA", nombre: "CAJA TOALLA EN ROLLO CAFÉ K160", mayoreo: 410, menudeo: 0 },
  { id: 43, categoria: "JARCERÍA", nombre: "CAJA TOALLA EN ROLLO BLANCA TR160", mayoreo: 540, menudeo: 0 },
  { id: 44, categoria: "JARCERÍA", nombre: "TOALLA INTERDOBLADA DALITAS Tl19800", mayoreo: 319, menudeo: 0 },
  { id: 45, categoria: "JARCERÍA", nombre: "TRAPEADOR MICROFIBRA ESPAÑOLA", mayoreo: 98, menudeo: 115 },
  { id: 46, categoria: "JARCERÍA", nombre: "TRAPEADOR MICROFIBRA PAÑO MEDIANO", mayoreo: 78, menudeo: 84 },
  { id: 47, categoria: "JARCERÍA", nombre: "ESCOBA VENECIANA", mayoreo: 85.5, menudeo: 95.5 },
  { id: 48, categoria: "JARCERÍA", nombre: "ESCOBA ARANDAS MEDIANA Y CORTA", mayoreo: 55, menudeo: 65 },
  { id: 49, categoria: "JARCERÍA", nombre: "ESCOBA ARANDAS 7 HILOS", mayoreo: 88.55, menudeo: 98 },
  { id: 50, categoria: "JARCERÍA", nombre: "RECOGEDOR", mayoreo: 55, menudeo: 60 },
  { id: 51, categoria: "JARCERÍA", nombre: "CEPILLO TIPO PLANCHA", mayoreo: 25, menudeo: 29 },
  { id: 52, categoria: "JARCERÍA", nombre: "ESCOBA PARA CARRO", mayoreo: 40, menudeo: 45 },
  { id: 53, categoria: "JARCERÍA", nombre: "ESCOBETILLA REDONDA", mayoreo: 21, menudeo: 23 },
  { id: 54, categoria: "JARCERÍA", nombre: "CEPILLO CON TAZÓN PARA BAÑO", mayoreo: 39.5, menudeo: 49.5 }
];
