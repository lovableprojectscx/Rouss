const fs = require('fs');
const path = require('path');

const appPath = path.resolve('src/App.jsx');
let content = fs.readFileSync(appPath, 'utf8');

const updatedInitialProducts = `const INITIAL_PRODUCTS = [
  // TANDA 1 (14)
  {
    id: 'ba000001-0000-4000-a000-000000000011',
    title: '12 Girasoles',
    category: 'buchones',
    categories: ['buchones'],
    categoryName: 'Ramos Buchones & Girasoles',
    price: 'S/ 180.00',
    tag: '12 Girasoles',
    image: '/images/products/ramo-buchon-12-girasoles-sol-radiante.webp',
    imageFallback: '/images/products/ramo-buchon-12-girasoles-sol-radiante.jpg',
    description: 'Ramo de 12 girasoles frescos seleccionados con envoltura en papel coreano negro y cinta satinada.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000012',
    title: '50 Rosas y 3 Globos con Helio',
    category: 'buchones',
    categories: ['buchones', 'rosas'],
    categoryName: 'Ramos Buchones & Girasoles',
    price: 'S/ 300.00',
    tag: '50 Rosas + Helio',
    image: '/images/products/ramo-buchon-50-rosas-globos-helio.webp',
    imageFallback: '/images/products/ramo-buchon-50-rosas-globos-helio.jpg',
    description: 'Ramo de 50 rosas rojas acompañado de 3 globos con helio y lazo decorativo.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000013',
    title: '80 Rosas más 6 Girasoles',
    category: 'buchones',
    categories: ['buchones', 'rosas'],
    categoryName: 'Ramos Buchones & Girasoles',
    price: 'S/ 450.00',
    tag: '80 Rosas + 6 Girasoles',
    image: '/images/products/maxi-ramo-buchon-80-rosas-6-girasoles.webp',
    imageFallback: '/images/products/maxi-ramo-buchon-80-rosas-6-girasoles.jpg',
    description: 'Maxi ramo de 80 rosas rojas con 6 girasoles centrales en papel coreano plisado.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000014',
    title: '80 Rosas',
    category: 'buchones',
    categories: ['buchones', 'rosas'],
    categoryName: 'Ramos Buchones & Girasoles',
    price: 'S/ 400.00',
    tag: '80 Rosas',
    image: '/images/products/ramo-buchon-reina-imperial-80-rosas.webp',
    imageFallback: '/images/products/ramo-buchon-reina-imperial-80-rosas.jpg',
    description: 'Ramo buchón de 80 rosas rojas seleccionadas con mariposas doradas decorativas.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000022',
    title: '50 Rosas más Corona',
    category: 'coronas',
    categories: ['coronas', 'buchones'],
    categoryName: 'Cumpleaños & Coronales',
    price: 'S/ 300.00',
    tag: 'Corona 👑',
    image: '/images/products/ramo-buchon-corona-reina-50-rosas.webp',
    imageFallback: '/images/products/ramo-buchon-corona-reina-50-rosas.jpg',
    description: 'Ramo de 50 rosas rojas con corona de cumpleaños dorada y cinta personalizada.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000017',
    title: '50 Rosas con Billetes (Opcional)',
    category: 'buchones',
    categories: ['buchones', 'rosas'],
    categoryName: 'Ramos Buchones & Girasoles',
    price: 'S/ 250.00',
    tag: '50 Rosas',
    image: '/images/products/ramo-buchon-elite-50-rosas.webp',
    imageFallback: '/images/products/ramo-buchon-elite-50-rosas.jpg',
    description: 'Ramo de 50 rosas rojas. Billetes opcionales proporcionados por el cliente (+S/ 10 por colocación).'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000018',
    title: '40 Rosas con Mariposas',
    category: 'buchones',
    categories: ['buchones', 'rosas'],
    categoryName: 'Ramos Buchones & Girasoles',
    price: 'S/ 200.00',
    tag: '40 Rosas',
    image: '/images/products/ramo-buchon-40-rosas-mariposas-oro.webp',
    imageFallback: '/images/products/ramo-buchon-40-rosas-mariposas-oro.jpg',
    description: 'Ramo de 40 rosas rojas decorado con mariposas doradas y envoltura marfil.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000021',
    title: '30 Rosas Ramo',
    category: 'rosas',
    categories: ['rosas', 'buchones'],
    categoryName: 'Rosas Premium',
    price: 'S/ 170.00',
    tag: '30 Rosas',
    image: '/images/products/ramo-buchon-pasion-30-rosas.webp',
    imageFallback: '/images/products/ramo-buchon-pasion-30-rosas.jpg',
    description: 'Ramo de 30 rosas rojas en envoltura negra coreana con lazo satinado.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000019',
    title: '20 Rosas + Peluche + 1 Lirio',
    category: 'combos',
    categories: ['combos', 'pastel'],
    categoryName: 'Detalles & Combos Especiales',
    price: 'S/ 230.00',
    tag: 'Combo Peluche',
    image: '/images/products/combo-ternura-20-rosas-peluche-lirio.webp',
    imageFallback: '/images/products/combo-ternura-20-rosas-peluche-lirio.jpg',
    description: 'Combo especial de 20 rosas rosadas con peluche de oso y 1 lirio oriental.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000020',
    title: '20 Rosas con Esponja Absorbente',
    category: 'rosas',
    categories: ['rosas'],
    categoryName: 'Rosas Premium',
    price: 'S/ 150.00',
    tag: '20 Rosas Hidratadas',
    image: '/images/products/bouquet-conservacion-20-rosas-hidratacion.webp',
    imageFallback: '/images/products/bouquet-conservacion-20-rosas-hidratacion.jpg',
    description: 'Arreglo de 20 rosas rojas con esponja absorbente de agua para máxima conservación.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000016',
    title: '12 Rosas más Astromelias',
    category: 'rosas',
    categories: ['rosas'],
    categoryName: 'Rosas Premium',
    price: 'S/ 160.00',
    tag: '12 Rosas + Astromelias',
    image: '/images/products/bouquet-armonia-12-rosas-astromelias.webp',
    imageFallback: '/images/products/bouquet-armonia-12-rosas-astromelias.jpg',
    description: 'Bouquet de 12 rosas rojas combinadas con astromelias frescas y envoltura marfil.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000023',
    title: '15 Rosas con Esponja Absorbente',
    category: 'rosas',
    categories: ['rosas'],
    categoryName: 'Rosas Premium',
    price: 'S/ 100.00',
    tag: '15 Rosas',
    image: '/images/products/bouquet-esencial-15-rosas-hidratadas.webp',
    imageFallback: '/images/products/bouquet-esencial-15-rosas-hidratadas.jpg',
    description: 'Ramo cónico de 15 rosas rojas con esponja absorbente de agua para mayor frescura.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000015',
    title: '4 Lirios y Papel Coreano',
    category: 'pastel',
    categories: ['pastel'],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 150.00',
    tag: '4 Lirios',
    image: '/images/products/bouquet-imperial-lirios-blancos.webp',
    imageFallback: '/images/products/bouquet-imperial-lirios-blancos.jpg',
    description: 'Bouquet de 4 lirios blancos con abundante papel coreano y follaje fino.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000024',
    title: '3 Lirios más Rosas',
    category: 'pastel',
    categories: ['pastel'],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 160.00',
    tag: '3 Lirios + Rosas',
    image: '/images/products/bouquet-romance-3-lirios-rosas-pastel.webp',
    imageFallback: '/images/products/bouquet-romance-3-lirios-rosas-pastel.jpg',
    description: 'Bouquet de 3 lirios orientales rosados acompañados de rosas en envoltura marfil.'
  },

  // TANDA 2 (15)
  {
    id: 'ba000001-0000-4000-a000-000000000031',
    title: '8 Rosas Cucurucho',
    category: 'rosas',
    categories: ['rosas'],
    categoryName: 'Rosas Premium',
    price: 'S/ 80.00',
    tag: '8 Rosas',
    image: '/images/products/cucurucho-pasion-8-rosas-rojas.webp',
    imageFallback: '/images/products/cucurucho-pasion-8-rosas-rojas.jpg',
    description: 'Cucurucho negro con 8 rosas rojas seleccionadas y detalles en flor blanca.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000032',
    title: '12 Rosas Rosa Pastel',
    category: 'pastel',
    categories: ['pastel', 'rosas'],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 90.00',
    tag: '12 Rosas',
    image: '/images/products/bouquet-delicadeza-12-rosas-rosa-pastel.webp',
    imageFallback: '/images/products/bouquet-delicadeza-12-rosas-rosa-pastel.jpg',
    description: 'Bouquet de 12 rosas en tono rosa pastel con envoltura translúcida y cinta.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000033',
    title: 'Ramo Primavera',
    category: 'combos',
    categories: ['combos', 'pastel'],
    categoryName: 'Detalles & Combos Especiales',
    price: 'S/ 90.00',
    tag: 'Primavera',
    image: '/images/products/bouquet-multicolor-fiesta-primavera.webp',
    imageFallback: '/images/products/bouquet-multicolor-fiesta-primavera.jpg',
    description: 'Ramo primaveral multicolor con rosas, flores variadas y papel de diseñador.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000034',
    title: '4 Rosas más Astromelias',
    category: 'rosas',
    categories: ['rosas'],
    categoryName: 'Rosas Premium',
    price: 'S/ 55.00',
    tag: '4 Rosas',
    image: '/images/products/mini-bouquet-4-rosas-astromelias.webp',
    imageFallback: '/images/products/mini-bouquet-4-rosas-astromelias.jpg',
    description: 'Mini bouquet de 4 rosas rojas con astromelias blancas y cono marfil.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000035',
    title: '5 Rosas más 1 Anturio',
    category: 'pastel',
    categories: ['pastel', 'rosas'],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 85.00',
    tag: '5 Rosas + Anturio',
    image: '/images/products/bouquet-exotico-5-rosas-anturio-rosa.webp',
    imageFallback: '/images/products/bouquet-exotico-5-rosas-anturio-rosa.jpg',
    description: 'Arreglo de 5 rosas pastel con 1 anturio rosado y envoltura suave.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000036',
    title: '20 Rosas más 2 Anturios',
    category: 'rosas',
    categories: ['rosas', 'pastel'],
    categoryName: 'Rosas Premium',
    price: 'S/ 190.00',
    tag: '20 Rosas + 2 Anturios',
    image: '/images/products/bouquet-imperial-20-rosas-doble-anturio.webp',
    imageFallback: '/images/products/bouquet-imperial-20-rosas-doble-anturio.jpg',
    description: 'Ramo de 20 rosas blush con 2 anturios en papel coreano rosado.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000037',
    title: '12 Rosas Rojas',
    category: 'rosas',
    categories: ['rosas'],
    categoryName: 'Rosas Premium',
    price: 'S/ 80.00',
    tag: '12 Rosas',
    image: '/images/products/bouquet-clasico-12-rosas-rojas.webp',
    imageFallback: '/images/products/bouquet-clasico-12-rosas-rojas.jpg',
    description: 'Ramo de 12 rosas rojas envueltas en papel coreano con baby breath.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000038',
    title: '1 Lirio más Astromelias',
    category: 'pastel',
    categories: ['pastel'],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 55.00',
    tag: '1 Lirio',
    image: '/images/products/mini-bouquet-lirio-oriental-astromelias.webp',
    imageFallback: '/images/products/mini-bouquet-lirio-oriental-astromelias.jpg',
    description: 'Mini bouquet de 1 lirio oriental rosado con astromelias amarillas y follaje.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000039',
    title: '8 Claveles Importados',
    category: 'pastel',
    categories: ['pastel'],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 90.00',
    tag: '8 Claveles',
    image: '/images/products/bouquet-distincion-8-claveles-importados.webp',
    imageFallback: '/images/products/bouquet-distincion-8-claveles-importados.jpg',
    description: 'Ramo de 8 claveles importados en papel negro de alta textura con cinta.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000040',
    title: '1 Orquídea más Ruscus y Estrellitas de Belén',
    category: 'propuestas',
    categories: ['propuestas', 'pastel'],
    categoryName: 'Propuestas & Bodas',
    price: 'S/ 150.00',
    tag: 'Orquídea',
    image: '/images/products/ramo-exclusivo-orquidea-real-estrellitas-belen.webp',
    imageFallback: '/images/products/ramo-exclusivo-orquidea-real-estrellitas-belen.jpg',
    description: 'Arreglo exclusivo de 1 vara de orquídea blanca con ruscus y estrellitas de Belén.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000041',
    title: '6 Girasoles más Margaritas',
    category: 'buchones',
    categories: ['buchones'],
    categoryName: 'Ramos Buchones & Girasoles',
    price: 'S/ 80.00',
    tag: '6 Girasoles',
    image: '/images/products/bouquet-radiante-6-girasoles-margaritas.webp',
    imageFallback: '/images/products/bouquet-radiante-6-girasoles-margaritas.jpg',
    description: 'Bouquet de 6 girasoles frescos con margaritas silvestres y envoltura de gala.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000042',
    title: 'Bouquet Silvestre Romance',
    category: 'pastel',
    categories: ['pastel'],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 65.00',
    tag: 'Silvestre',
    image: '/images/products/bouquet-silvestre-romance-pastel.webp',
    imageFallback: '/images/products/bouquet-silvestre-romance-pastel.jpg',
    description: 'Bouquet silvestre de flores variadas en tono pastel con envoltorio decorativo.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000043',
    title: 'Ramo Box Girasoles & Rosas',
    category: 'combos',
    categories: ['combos', 'buchones'],
    categoryName: 'Detalles & Combos Especiales',
    price: 'S/ 100.00',
    tag: 'Ramo Box',
    image: '/images/products/sombrerera-floral-box-girasoles-rosas.webp',
    imageFallback: '/images/products/sombrerera-floral-box-girasoles-rosas.jpg',
    description: 'Arreglo en caja floral con girasoles, rosas rojas y lazo decorativo.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000044',
    title: '1 Lirio más Conejitos',
    category: 'pastel',
    categories: ['pastel'],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 120.00',
    tag: '1 Lirio + Conejitos',
    image: '/images/products/bouquet-dulzura-lirio-rosado-conejitos.webp',
    imageFallback: '/images/products/bouquet-dulzura-lirio-rosado-conejitos.jpg',
    description: 'Bouquet con 1 lirio rosado, conejitos y flores finas en papel marfil.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000045',
    title: '12 Rosas + Corona de Cristal',
    category: 'coronas',
    categories: ['coronas', 'pastel'],
    categoryName: 'Cumpleaños & Coronales',
    price: 'S/ 200.00',
    tag: 'Corona de Cristal',
    image: '/images/products/ramo-princesa-12-rosas-durazno-tiara-cristal.webp',
    imageFallback: '/images/products/ramo-princesa-12-rosas-durazno-tiara-cristal.jpg',
    description: 'Ramo de 12 rosas durazno con tiara/corona de cristal brillante y cinta personalizada.'
  },

  // TANDA 3 (15)
  {
    id: 'ba000001-0000-4000-a000-000000000051',
    title: '2 Gerberas Ramo Princesa',
    category: 'pastel',
    categories: ['pastel'],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 85.00',
    tag: '2 Gerberas',
    image: '/images/products/ramo-princesa-2-gerberas-follaje-rosa.webp',
    imageFallback: '/images/products/ramo-princesa-2-gerberas-follaje-rosa.jpg',
    description: 'Ramo de 2 gerberas rosadas con follaje fino y papel coreano rosa.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000052',
    title: '1 Lirio más 3 Rosas Lilas',
    category: 'pastel',
    categories: ['pastel', 'rosas'],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 55.00',
    tag: '1 Lirio + 3 Rosas',
    image: '/images/products/bouquet-armonia-1-lirio-3-rosas-lilas.webp',
    imageFallback: '/images/products/bouquet-armonia-1-lirio-3-rosas-lilas.jpg',
    description: 'Arreglo de 1 lirio oriental con 3 rosas lilas en envoltura marfil.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000053',
    title: '1 Lirio más 3 Rosas Silvestre',
    category: 'pastel',
    categories: ['pastel', 'rosas'],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 65.00',
    tag: '1 Lirio + 3 Rosas',
    image: '/images/products/bouquet-silvestre-1-lirio-3-rosas.webp',
    imageFallback: '/images/products/bouquet-silvestre-1-lirio-3-rosas.jpg',
    description: 'Bouquet de 1 lirio rosado con 3 rosas y follaje silvestre.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000054',
    title: '2 Lirios',
    category: 'pastel',
    categories: ['pastel'],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 80.00',
    tag: '2 Lirios',
    image: '/images/products/bouquet-duo-imperial-lirios-orientales.webp',
    imageFallback: '/images/products/bouquet-duo-imperial-lirios-orientales.jpg',
    description: 'Bouquet de 2 varas de lirios orientales con gypsophila y envoltura amarilla.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000055',
    title: '6 Rosas + 4 Girasoles',
    category: 'buchones',
    categories: ['buchones', 'rosas'],
    categoryName: 'Ramos Buchones & Girasoles',
    price: 'S/ 90.00',
    tag: '6 Rosas + 4 Girasoles',
    image: '/images/products/bouquet-fusion-6-rosas-4-girasoles.webp',
    imageFallback: '/images/products/bouquet-fusion-6-rosas-4-girasoles.jpg',
    description: 'Combinación de 6 rosas con 4 girasoles y follaje de eucalipto.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000056',
    title: '2 Lirios + 10 Rosas + Claveles',
    category: 'coronas',
    categories: ['coronas', 'pastel'],
    categoryName: 'Cumpleaños & Coronales',
    price: 'S/ 160.00',
    tag: '2 Lirios + 10 Rosas',
    image: '/images/products/estructura-geometrica-2-lirios-10-rosas-claveles.webp',
    imageFallback: '/images/products/estructura-geometrica-2-lirios-10-rosas-claveles.jpg',
    description: 'Estructura geométrica con 2 lirios, 10 rosas y claveles en marco moderno.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000057',
    title: '1 Lirio más 3 Rosas',
    category: 'pastel',
    categories: ['pastel', 'rosas'],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 70.00',
    tag: '1 Lirio + 3 Rosas',
    image: '/images/products/bouquet-ternura-1-lirio-rosado-3-rosas.webp',
    imageFallback: '/images/products/bouquet-ternura-1-lirio-rosado-3-rosas.jpg',
    description: 'Bouquet de 1 lirio rosado con 3 rosas en papel coreano marfil.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000058',
    title: '8 Rosas Elegance',
    category: 'rosas',
    categories: ['rosas', 'pastel'],
    categoryName: 'Rosas Premium',
    price: 'S/ 100.00',
    tag: '8 Rosas',
    image: '/images/products/bouquet-elegance-8-rosas-pastel-perlas.webp',
    imageFallback: '/images/products/bouquet-elegance-8-rosas-pastel-perlas.jpg',
    description: 'Bouquet de 8 rosas en tono pastel con lazo de satén.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000059',
    title: '8 Rosas Rojas',
    category: 'rosas',
    categories: ['rosas'],
    categoryName: 'Rosas Premium',
    price: 'S/ 80.00',
    tag: '8 Rosas',
    image: '/images/products/bouquet-pasion-8-rosas-rojas.webp',
    imageFallback: '/images/products/bouquet-pasion-8-rosas-rojas.jpg',
    description: 'Ramo de 8 rosas rojas en papel coreano negro con cinta.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000060',
    title: '1 Lirio más 3 Rosas',
    category: 'pastel',
    categories: ['pastel', 'rosas'],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 75.00',
    tag: '1 Lirio + 3 Rosas',
    image: '/images/products/bouquet-sublime-1-lirio-oriental-3-rosas.webp',
    imageFallback: '/images/products/bouquet-sublime-1-lirio-oriental-3-rosas.jpg',
    description: 'Bouquet de 1 lirio oriental con 3 rosas en papel coreano.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000061',
    title: '1 Lirio Rústico',
    category: 'pastel',
    categories: ['pastel'],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 60.00',
    tag: '1 Lirio',
    image: '/images/products/bouquet-rustico-chic-1-lirio-follaje.webp',
    imageFallback: '/images/products/bouquet-rustico-chic-1-lirio-follaje.jpg',
    description: 'Arreglo rústico de 1 lirio con follaje verde y papel madera.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000062',
    title: '12 Rosas Blush & Lirios',
    category: 'combos',
    categories: ['combos', 'rosas'],
    categoryName: 'Detalles & Combos Especiales',
    price: 'S/ 180.00',
    tag: '12 Rosas + Lirios',
    image: '/images/products/bouquet-fortuna-12-rosas-blush-lirios.webp',
    imageFallback: '/images/products/bouquet-fortuna-12-rosas-blush-lirios.jpg',
    description: 'Ramo de 12 rosas blush con lirios y envoltura marfil.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000063',
    title: '6 Rosas Azules',
    category: 'rosas',
    categories: ['rosas'],
    categoryName: 'Rosas Premium',
    price: 'S/ 70.00',
    tag: '6 Rosas Azules',
    image: '/images/products/bouquet-royal-6-rosas-azules-detalles-plateados.webp',
    imageFallback: '/images/products/bouquet-royal-6-rosas-azules-detalles-plateados.jpg',
    description: 'Bouquet de 6 rosas azules en papel coreano con detalles plateados.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000064',
    title: '6 Rosas más Astromelias',
    category: 'rosas',
    categories: ['rosas'],
    categoryName: 'Rosas Premium',
    price: 'S/ 65.00',
    tag: '6 Rosas + Astromelias',
    image: '/images/products/bouquet-solar-6-rosas-amarillas-astromelias.webp',
    imageFallback: '/images/products/bouquet-solar-6-rosas-amarillas-astromelias.jpg',
    description: 'Ramo de 6 rosas amarillas con astromelias y papel translúcido.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000065',
    title: '1 Lirio más Astromelias',
    category: 'pastel',
    categories: ['pastel'],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 70.00',
    tag: '1 Lirio + Astromelias',
    image: '/images/products/bouquet-silvestre-1-lirio-rosado-astromelias.webp',
    imageFallback: '/images/products/bouquet-silvestre-1-lirio-rosado-astromelias.jpg',
    description: 'Bouquet de 1 lirio rosado con astromelias y follaje en papel marfil.'
  },

  // TANDA 4 (12 - COLECCIÓN TULIPANES & BOXES)
  {
    id: 'ba000001-0000-4000-a000-000000000071',
    title: '2 Lirios sin Chocolate',
    category: 'pastel',
    categories: ['pastel'],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 90.00',
    tag: '2 Lirios',
    image: '/images/products/bouquet-duo-lirios-orientales-corona-floral.webp',
    imageFallback: '/images/products/bouquet-duo-lirios-orientales-corona-floral.jpg',
    description: 'Arreglo de 2 varas de lirios con follaje y envoltura festiva.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000072',
    title: 'Ramo Box 7 Rosas',
    category: 'combos',
    categories: ['combos', 'rosas'],
    categoryName: 'Detalles & Combos Especiales',
    price: 'S/ 110.00',
    tag: 'Ramo Box',
    image: '/images/products/wood-floral-box-7-rosas-lirios-silvestres.webp',
    imageFallback: '/images/products/wood-floral-box-7-rosas-lirios-silvestres.jpg',
    description: 'Caja floral de madera con 7 rosas rojas y lirio silvestre.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000073',
    title: '12 Tulipanes Rosados',
    category: 'tulipanes',
    categories: ['tulipanes', 'pastel'],
    categoryName: 'Tulipanes',
    price: 'S/ 350.00',
    tag: '12 Tulipanes',
    image: '/images/products/maxi-bouquet-imperial-12-tulipanes-rosa-holandes.webp',
    imageFallback: '/images/products/maxi-bouquet-imperial-12-tulipanes-rosa-holandes.jpg',
    description: 'Ramo de 12 tulipanes frescos en tono rosa suave con papel coreano plisado.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000074',
    title: '6 Tulipanes Rojos',
    category: 'tulipanes',
    categories: ['tulipanes', 'rosas'],
    categoryName: 'Tulipanes',
    price: 'S/ 130.00',
    tag: '6 Tulipanes',
    image: '/images/products/bouquet-alta-costura-6-tulipanes-rojos.webp',
    imageFallback: '/images/products/bouquet-alta-costura-6-tulipanes-rojos.jpg',
    description: 'Ramo alargado de 6 tulipanes rojos frescos en envoltura blanca y lazo de gala.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000075',
    title: '5 Tulipanes Rosados',
    category: 'tulipanes',
    categories: ['tulipanes', 'pastel'],
    categoryName: 'Tulipanes',
    price: 'S/ 160.00',
    tag: '5 Tulipanes',
    image: '/images/products/bouquet-delicadeza-5-tulipanes-rosados.webp',
    imageFallback: '/images/products/bouquet-delicadeza-5-tulipanes-rosados.jpg',
    description: 'Bouquet cónico de 5 tulipanes rosados frescos en papel coreano blanco.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000076',
    title: '3 Tulipanes Amarillos con Margaritas',
    category: 'tulipanes',
    categories: ['tulipanes', 'pastel'],
    categoryName: 'Tulipanes',
    price: 'S/ 85.00',
    tag: '3 Tulipanes',
    image: '/images/products/bouquet-solar-3-tulipanes-amarillos-margaritas.webp',
    imageFallback: '/images/products/bouquet-solar-3-tulipanes-amarillos-margaritas.jpg',
    description: 'Bouquet de 3 tulipanes amarillos con margaritas silvestres y papel de diseñador.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000077',
    title: '6 Tulipanes Rosados',
    category: 'tulipanes',
    categories: ['tulipanes', 'pastel'],
    categoryName: 'Tulipanes',
    price: 'S/ 200.00',
    tag: '6 Tulipanes',
    image: '/images/products/bouquet-black-white-6-tulipanes-rosa-pastel.webp',
    imageFallback: '/images/products/bouquet-black-white-6-tulipanes-rosa-pastel.jpg',
    description: 'Bouquet de 6 tulipanes rosados en papel coreano bicolor negro y blanco.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000078',
    title: '6 Tulipanes Rosados (Gold)',
    category: 'tulipanes',
    categories: ['tulipanes', 'pastel'],
    categoryName: 'Tulipanes',
    price: 'S/ 200.00',
    tag: '6 Tulipanes',
    image: '/images/products/bouquet-gold-chic-6-tulipanes-rosa-pastel.webp',
    imageFallback: '/images/products/bouquet-gold-chic-6-tulipanes-rosa-pastel.jpg',
    description: 'Ramo de 6 tulipanes rosados envuelto en papel dorado champagne y lazo satinado.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000079',
    title: '12 Tulipanes Rojos',
    category: 'tulipanes',
    categories: ['tulipanes', 'rosas'],
    categoryName: 'Tulipanes',
    price: 'S/ 270.00',
    tag: '12 Tulipanes',
    image: '/images/products/maxi-ramo-12-tulipanes-rojos-de-gala.webp',
    imageFallback: '/images/products/maxi-ramo-12-tulipanes-rojos-de-gala.jpg',
    description: 'Ramo de 12 tulipanes rojos con nube de gypsophila en envoltura de alta densidad.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000080',
    title: '10 Tulipanes Bicolores',
    category: 'tulipanes',
    categories: ['tulipanes', 'pastel'],
    categoryName: 'Tulipanes',
    price: 'S/ 280.00',
    tag: '10 Tulipanes',
    image: '/images/products/bouquet-imperial-10-tulipanes-bicolores-rojo-rosa.webp',
    imageFallback: '/images/products/bouquet-imperial-10-tulipanes-bicolores-rojo-rosa.jpg',
    description: 'Ramo de 10 tulipanes en degradé rojo y rosa con lazo de seda en tono plata.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000081',
    title: '3 Tulipanes Blancos',
    category: 'tulipanes',
    categories: ['tulipanes', 'buchones'],
    categoryName: 'Tulipanes',
    price: 'S/ 120.00',
    tag: '3 Tulipanes',
    image: '/images/products/bouquet-primavera-3-tulipanes-blancos-girasoles.webp',
    imageFallback: '/images/products/bouquet-primavera-3-tulipanes-blancos-girasoles.jpg',
    description: 'Fusión de 3 tulipanes blancos puros con margaritas silvestres y envoltura de gala.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000082',
    title: '8 Tulipanes Morados',
    category: 'tulipanes',
    categories: ['tulipanes', 'pastel'],
    categoryName: 'Tulipanes',
    price: 'S/ 200.00',
    tag: '8 Tulipanes',
    image: '/images/products/bouquet-royal-8-tulipanes-purpura-imperial.webp',
    imageFallback: '/images/products/bouquet-royal-8-tulipanes-purpura-imperial.jpg',
    description: 'Ramo de 8 tulipanes morados en envoltura rosa con lazo de satén.'
  }
];`;

const startMarker = 'const INITIAL_PRODUCTS = [';
const endMarker = '];\r\n\r\n// CLIENT GALLERY';
const endMarkerUnix = '];\n\n// CLIENT GALLERY';

let startIndex = content.indexOf(startMarker);
let endIndex = content.indexOf(endMarker);
if (endIndex === -1) {
  endIndex = content.indexOf(endMarkerUnix);
}

if (startIndex !== -1 && endIndex !== -1) {
  content = content.slice(0, startIndex) + updatedInitialProducts + content.slice(endIndex + 2);
  fs.writeFileSync(appPath, content, 'utf8');
  console.log('App.jsx INITIAL_PRODUCTS updated successfully!');
} else {
  console.error('Could not find markers in App.jsx', { startIndex, endIndex });
}
