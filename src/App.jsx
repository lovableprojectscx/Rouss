import React, { useState, useEffect, useRef } from 'react'
import { 
  CrownPremiumIcon,
  FlowerSparkleIcon,
  HeartMinimalIcon,
  ArrowRightGoldIcon,
  SearchMinimalIcon,
  CloseMinimalIcon,
  InstagramGoldIcon,
  FacebookGoldIcon,
  MapPinGoldIcon,
  PhoneGoldIcon,
  WhatsAppGoldIcon,
  ShareMinimalIcon,
  CheckMinimalIcon
} from './components/PremiumIcons'
import { fetchRoussData, createReservation } from './lib/supabase'

// 56 Official Products from Florería Rouss Owner (Tanda 1 + Tanda 2 + Tanda 3 + Tanda 4)
const INITIAL_PRODUCTS = [
  // TANDA 1 (14)
  {
    id: 'ba000001-0000-4000-a000-000000000011',
    title: 'Ramo Buchón "Sol Radiante" (12 Girasoles)',
    category: 'buchones',
    categories: ['buchones'],
    categoryName: 'Ramos Buchones & Girasoles',
    price: 'S/ 180.00',
    tag: 'Más Vendido',
    image: '/images/products/ramo-buchon-12-girasoles-sol-radiante.webp',
    imageFallback: '/images/products/ramo-buchon-12-girasoles-sol-radiante.jpg',
    description: 'Espectacular bouquet buchón de 12 girasoles frescos seleccionados de tallo largo, envueltos en papel coreano negro de alta costura con cinta satinada y dedicatoria personalizada.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000012',
    title: 'Ramo Buchón Imperial 50 Rosas & Trío de Helio',
    category: 'buchones',
    categories: ['buchones', 'rosas'],
    categoryName: 'Ramos Buchones & Girasoles',
    price: 'S/ 300.00',
    tag: 'Edición Especial',
    image: '/images/products/ramo-buchon-50-rosas-globos-helio.webp',
    imageFallback: '/images/products/ramo-buchon-50-rosas-globos-helio.jpg',
    description: 'Imponente ramo buchón compuesto por 50 rosas rojas de exportación en cúpula perfecta, acompañado por tres globos metalizados con helio premium y lazo de gala.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000013',
    title: 'Maxi Ramo Buchón 80 Rosas & 6 Girasoles',
    category: 'buchones',
    categories: ['buchones', 'rosas'],
    categoryName: 'Ramos Buchones & Girasoles',
    price: 'S/ 450.00',
    tag: 'Formato Maxi',
    image: '/images/products/maxi-ramo-buchon-80-rosas-6-girasoles.webp',
    imageFallback: '/images/products/maxi-ramo-buchon-80-rosas-6-girasoles.jpg',
    description: 'Creación monumental de alta floristería que fusiona 80 rosas rojas aterciopeladas con 6 radiantes girasoles centrales en envoltura coreana plisada de máxima elegancia.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000014',
    title: 'Ramo Buchón "Reina Imperial" (80 Rosas)',
    category: 'buchones',
    categories: ['buchones', 'rosas'],
    categoryName: 'Ramos Buchones & Girasoles',
    price: 'S/ 400.00',
    tag: 'Alta Gama',
    image: '/images/products/ramo-buchon-reina-imperial-80-rosas.webp',
    imageFallback: '/images/products/ramo-buchon-reina-imperial-80-rosas.jpg',
    description: 'Majestuoso arreglo buchón de 80 rosas rojas premium en estructura esférica perfecta, decorado con delicadas mariposas doradas y fina envoltura en tono blanco marfil.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000022',
    title: 'Ramo Buchón "Corona de Reina" (50 Rosas)',
    category: 'coronas',
    categories: ['coronas', 'buchones'],
    categoryName: 'Cumpleaños & Coronales',
    price: 'S/ 300.00',
    tag: 'Corona Imperial',
    image: '/images/products/ramo-buchon-corona-reina-50-rosas.webp',
    imageFallback: '/images/products/ramo-buchon-corona-reina-50-rosas.jpg',
    description: 'Ramo buchón de 50 rosas rojas seleccionadas con tiara imperial dorada de cristal brillante, cinta personalizada y acabado de alta gama.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000017',
    title: 'Ramo Buchón Élite 50 Rosas',
    category: 'buchones',
    categories: ['buchones', 'rosas'],
    categoryName: 'Ramos Buchones & Girasoles',
    price: 'S/ 250.00',
    tag: 'Personalizable',
    image: '/images/products/ramo-buchon-elite-50-rosas.webp',
    imageFallback: '/images/products/ramo-buchon-elite-50-rosas.jpg',
    description: 'Distinguido ramo esférico de 50 rosas selectas en armoniosa combinación de tonalidades, diseñado para celebraciones de alto impacto (personalización de billetes opcional).'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000018',
    title: 'Ramo Buchón 40 Rosas & Mariposas de Oro',
    category: 'buchones',
    categories: ['buchones', 'rosas'],
    categoryName: 'Ramos Buchones & Girasoles',
    price: 'S/ 200.00',
    tag: 'Detalle Dorado',
    image: '/images/products/ramo-buchon-40-rosas-mariposas-oro.webp',
    imageFallback: '/images/products/ramo-buchon-40-rosas-mariposas-oro.jpg',
    description: 'Exclusivo bouquet de 40 rosas rojas de invernadero con detalles de mariposas troqueladas en pan de oro y envoltura de seda blanca.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000021',
    title: 'Ramo Buchón Pasión 30 Rosas',
    category: 'rosas',
    categories: ['rosas', 'buchones'],
    categoryName: 'Rosas Premium',
    price: 'S/ 170.00',
    tag: 'Pasión Rouss',
    image: '/images/products/ramo-buchon-pasion-30-rosas.webp',
    imageFallback: '/images/products/ramo-buchon-pasion-30-rosas.jpg',
    description: 'Clásico y apasionado arreglo de 30 rosas rojas frescas con follaje fino, envuelto en papel negro de alta densidad y lazo satinado.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000019',
    title: 'Combo Ternura 20 Rosas, Peluche & Lirio',
    category: 'combos',
    categories: ['combos', 'pastel'],
    categoryName: 'Detalles & Combos Especiales',
    price: 'S/ 230.00',
    tag: 'Combo Exclusivo',
    image: '/images/products/combo-ternura-20-rosas-peluche-lirio.webp',
    imageFallback: '/images/products/combo-ternura-20-rosas-peluche-lirio.jpg',
    description: 'Exquisito arreglo en tonalidades pastel con 20 rosas frescas, un lirio aromático y un tierno oso de peluche de colección en envoltura lila.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000020',
    title: 'Bouquet Conservación 20 Rosas & Hidratación',
    category: 'rosas',
    categories: ['rosas'],
    categoryName: 'Rosas Premium',
    price: 'S/ 150.00',
    tag: 'Larga Duración',
    image: '/images/products/bouquet-conservacion-20-rosas-hidratacion.webp',
    imageFallback: '/images/products/bouquet-conservacion-20-rosas-hidratacion.jpg',
    description: 'Arreglo de 20 rosas rojas con tecnología de esponja floral hidratante en la base para prolongar la vida y frescura de cada pétalo.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000016',
    title: 'Bouquet Armonía 12 Rosas & Astromelias',
    category: 'rosas',
    categories: ['rosas'],
    categoryName: 'Rosas Premium',
    price: 'S/ 160.00',
    tag: 'Diseño Fresco',
    image: '/images/products/bouquet-armonia-12-rosas-astromelias.webp',
    imageFallback: '/images/products/bouquet-armonia-12-rosas-astromelias.jpg',
    description: 'Combinación fresca y vibrante de 12 rosas rojas selectas enmarcada por un delicado contorno de astromelias y follaje silvestre.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000023',
    title: 'Bouquet Esencial 15 Rosas Hidratadas',
    category: 'rosas',
    categories: ['rosas'],
    categoryName: 'Rosas Premium',
    price: 'S/ 100.00',
    tag: 'Detalle Ideal',
    image: '/images/products/bouquet-esencial-15-rosas-hidratadas.webp',
    imageFallback: '/images/products/bouquet-esencial-15-rosas-hidratadas.jpg',
    description: 'Detalle compacto y distinguido de 15 rosas rojas con base de agua absorbente que garantiza frescura continua en todo momento.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000015',
    title: 'Bouquet Imperial de Lirios Blancos',
    category: 'pastel',
    categories: ['pastel'],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 150.00',
    tag: 'Fragancia Sublime',
    image: '/images/products/bouquet-imperial-lirios-blancos.webp',
    imageFallback: '/images/products/bouquet-imperial-lirios-blancos.jpg',
    description: 'Elegante bouquet de 4 varas de lirios orientales blancos de intenso aroma, acompañados de follaje fino y envoltura estructural en papel coreano.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000024',
    title: 'Bouquet Romance 3 Lirios & Rosas Pastel',
    category: 'pastel',
    categories: ['pastel'],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 160.00',
    tag: 'Romance Soft',
    image: '/images/products/bouquet-romance-3-lirios-rosas-pastel.webp',
    imageFallback: '/images/products/bouquet-romance-3-lirios-rosas-pastel.jpg',
    description: 'Romántica sinfonía floral compuesta por 3 lirios orientales rosados y rosas en tonos suaves, envueltas en pliegues de papel de seda marfil.'
  },

  // TANDA 2 (15)
  {
    id: 'ba000001-0000-4000-a000-000000000031',
    title: 'Cucurucho Pasión 8 Rosas Rojas',
    category: 'rosas',
    categories: ['rosas'],
    categoryName: 'Rosas Premium',
    price: 'S/ 80.00',
    tag: 'Económico & Chic',
    image: '/images/products/cucurucho-pasion-8-rosas-rojas.webp',
    imageFallback: '/images/products/cucurucho-pasion-8-rosas-rojas.jpg',
    description: 'Delicado y moderno cucurucho en tono negro de alta costura con 8 rosas rojas selectas y detalles en baby breath.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000032',
    title: 'Bouquet Delicadeza 12 Rosas Rosa Pastel',
    category: 'pastel',
    categories: ['pastel', 'rosas'],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 90.00',
    tag: 'Delicadeza Soft',
    image: '/images/products/bouquet-delicadeza-12-rosas-rosa-pastel.webp',
    imageFallback: '/images/products/bouquet-delicadeza-12-rosas-rosa-pastel.jpg',
    description: 'Encantador bouquet de 12 rosas en tono rosa pastel envuelto en papel coreano translúcido con cinta satinada.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000033',
    title: 'Bouquet Multicolor Fiesta de Primavera',
    category: 'combos',
    categories: ['combos', 'pastel'],
    categoryName: 'Detalles & Combos Especiales',
    price: 'S/ 90.00',
    tag: 'Primavera Rouss',
    image: '/images/products/bouquet-multicolor-fiesta-primavera.webp',
    imageFallback: '/images/products/bouquet-multicolor-fiesta-primavera.jpg',
    description: 'Vibrante arreglo floral primaveral con rosas, margaritas, follaje verde y flores variadas en papel coreano de diseñador.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000034',
    title: 'Mini Bouquet 4 Rosas & Astromelias',
    category: 'rosas',
    categories: ['rosas'],
    categoryName: 'Rosas Premium',
    price: 'S/ 55.00',
    tag: 'Detalle Accesible',
    image: '/images/products/mini-bouquet-4-rosas-astromelias.webp',
    imageFallback: '/images/products/mini-bouquet-4-rosas-astromelias.jpg',
    description: 'Exquisito arreglo compacto de 4 rosas rojas seleccionadas rodeadas por astromelias blancas y envoltura cónica marfil.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000035',
    title: 'Bouquet Exótico 5 Rosas & Anturio Rosa',
    category: 'pastel',
    categories: ['pastel', 'rosas'],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 85.00',
    tag: 'Flor Exótica',
    image: '/images/products/bouquet-exotico-5-rosas-anturio-rosa.webp',
    imageFallback: '/images/products/bouquet-exotico-5-rosas-anturio-rosa.jpg',
    description: 'Sofisticada combinación de 5 rosas pastel con 1 anturio exótico rosado y follaje fino en envoltura de alta costura.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000036',
    title: 'Bouquet Imperial 20 Rosas & Doble Anturio',
    category: 'rosas',
    categories: ['rosas', 'pastel'],
    categoryName: 'Rosas Premium',
    price: 'S/ 190.00',
    tag: 'Diseño Exclusivo',
    image: '/images/products/bouquet-imperial-20-rosas-doble-anturio.webp',
    imageFallback: '/images/products/bouquet-imperial-20-rosas-doble-anturio.jpg',
    description: 'Lujoso arreglo esférico de 20 rosas en tonalidades blush/durazno acompañadas de 2 majestuosos anturios en papel coreano rosado.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000037',
    title: 'Bouquet Clásico 12 Rosas Rojas',
    category: 'rosas',
    categories: ['rosas'],
    categoryName: 'Rosas Premium',
    price: 'S/ 80.00',
    tag: 'Clásico Atemporal',
    image: '/images/products/bouquet-clasico-12-rosas-rojas.webp',
    imageFallback: '/images/products/bouquet-clasico-12-rosas-rojas.jpg',
    description: 'Clásico y elegante arreglo de 12 rosas rojas de invernadero con corona de gypsophila blanca y cono marfil.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000038',
    title: 'Mini Bouquet Lirio Oriental & Astromelias',
    category: 'pastel',
    categories: ['pastel'],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 55.00',
    tag: 'Aroma Dulce',
    image: '/images/products/mini-bouquet-lirio-oriental-astromelias.webp',
    imageFallback: '/images/products/mini-bouquet-lirio-oriental-astromelias.jpg',
    description: 'Luminoso bouquet que destaca 1 lirio oriental rosado perfumado enmarcado en alegres astromelias multicolores.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000039',
    title: 'Bouquet Distinción 8 Claveles Importados',
    category: 'pastel',
    categories: ['pastel'],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 90.00',
    tag: 'Importado Especial',
    image: '/images/products/bouquet-distincion-8-claveles-importados.webp',
    imageFallback: '/images/products/bouquet-distincion-8-claveles-importados.jpg',
    description: 'Fino ramo elaborado con 8 claveles importados de pétalos veteados en matices frambuesa y blanco, con envoltura de diseño oscuro.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000040',
    title: 'Ramo Exclusivo Orquídea Real & Estrellitas de Belén',
    category: 'propuestas',
    categories: ['propuestas', 'pastel'],
    categoryName: 'Propuestas & Bodas',
    price: 'S/ 150.00',
    tag: 'Alta Costura',
    image: '/images/products/ramo-exclusivo-orquidea-real-estrellitas-belen.webp',
    imageFallback: '/images/products/ramo-exclusivo-orquidea-real-estrellitas-belen.jpg',
    description: 'Creación de alta floristería con vara de orquídea blanca de lujo, estrellitas de Belén y hojas de ruscus en envoltura de seda blanca.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000041',
    title: 'Bouquet Radiante 6 Girasoles & Margaritas',
    category: 'buchones',
    categories: ['buchones'],
    categoryName: 'Ramos Buchones & Girasoles',
    price: 'S/ 80.00',
    tag: 'Energía Solar',
    image: '/images/products/bouquet-radiante-6-girasoles-margaritas.webp',
    imageFallback: '/images/products/bouquet-radiante-6-girasoles-margaritas.jpg',
    description: 'Radiante arreglo circular de 6 girasoles de exportación acompañados de margaritas silvestres y envoltura en tono rosa pastel.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000042',
    title: 'Bouquet Silvestre Romance Pastel',
    category: 'pastel',
    categories: ['pastel'],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 65.00',
    tag: 'Ternura Floral',
    image: '/images/products/bouquet-silvestre-romance-pastel.webp',
    imageFallback: '/images/products/bouquet-silvestre-romance-pastel.jpg',
    description: 'Tierno bouquet alargado con flores silvestres y rosas en tonos suaves, atado con cinta dorada y papel coreano translúcido.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000043',
    title: 'Sombrerera Floral Box Girasoles & Rosas',
    category: 'combos',
    categories: ['combos', 'buchones'],
    categoryName: 'Detalles & Combos Especiales',
    price: 'S/ 100.00',
    tag: 'Floral Box',
    image: '/images/products/sombrerera-floral-box-girasoles-rosas.webp',
    imageFallback: '/images/products/sombrerera-floral-box-girasoles-rosas.jpg',
    description: 'Elegante sombrerera rígida con composición circular de girasoles brillantes, rosas rojas intensas y margaritas frescas.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000044',
    title: 'Bouquet Dulzura Lirio Rosado & Conejitos',
    category: 'pastel',
    categories: ['pastel'],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 120.00',
    tag: 'Dulzura Pastel',
    image: '/images/products/bouquet-dulzura-lirio-rosado-conejitos.webp',
    imageFallback: '/images/products/bouquet-dulzura-lirio-rosado-conejitos.jpg',
    description: 'Armoniosa composición de 1 lirio oriental rosa, conejitos (antirrinos) blancos y flores complementarias en papel coreano de seda.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000045',
    title: 'Ramo Princesa 12 Rosas Durazno & Tiara de Cristal',
    category: 'coronas',
    categories: ['coronas', 'pastel'],
    categoryName: 'Cumpleaños & Coronales',
    price: 'S/ 200.00',
    tag: 'Tiara de Cristal',
    image: '/images/products/ramo-princesa-12-rosas-durazno-tiara-cristal.webp',
    imageFallback: '/images/products/ramo-princesa-12-rosas-durazno-tiara-cristal.jpg',
    description: 'Distinguido bouquet de 12 rosas en tono durazno/pastel coronado con una tiara de cristal brillante y envoltura de alta costura.'
  },

  // TANDA 3 (15)
  {
    id: 'ba000001-0000-4000-a000-000000000051',
    title: 'Ramo Princesa 2 Gerberas & Follaje Rosa',
    category: 'pastel',
    categories: ['pastel'],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 85.00',
    tag: 'Princesa Chic',
    image: '/images/products/ramo-princesa-2-gerberas-follaje-rosa.webp',
    imageFallback: '/images/products/ramo-princesa-2-gerberas-follaje-rosa.jpg',
    description: 'Delicado y femenino bouquet en tonos rosa pastel con 2 gerberas centrales, flores complementarias y envoltura de alta costura con lazo satinado.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000052',
    title: 'Bouquet Armonía 1 Lirio & 3 Rosas Lilas',
    category: 'pastel',
    categories: ['pastel', 'rosas'],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 55.00',
    tag: 'Detalle Romántico',
    image: '/images/products/bouquet-armonia-1-lirio-3-rosas-lilas.webp',
    imageFallback: '/images/products/bouquet-armonia-1-lirio-3-rosas-lilas.jpg',
    description: 'Romántico ramo con 1 lirio oriental aromático y 3 rosas selectas en elegante papel coreano en tonos lila y morado suave.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000053',
    title: 'Bouquet Silvestre 1 Lirio & 3 Rosas',
    category: 'pastel',
    categories: ['pastel', 'rosas'],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 65.00',
    tag: 'Frescura Silvestre',
    image: '/images/products/bouquet-silvestre-1-lirio-3-rosas.webp',
    imageFallback: '/images/products/bouquet-silvestre-1-lirio-3-rosas.jpg',
    description: 'Fresca composición floral con 1 lirio oriental rosado, 3 rosas y follaje silvestre en envoltura marfil.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000054',
    title: 'Bouquet Dúo Imperial de Lirios Orientales',
    category: 'pastel',
    categories: ['pastel'],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 80.00',
    tag: 'Aroma Intenso',
    image: '/images/products/bouquet-duo-imperial-lirios-orientales.webp',
    imageFallback: '/images/products/bouquet-duo-imperial-lirios-orientales.jpg',
    description: 'Elegante bouquet protagonizado por 2 varas de lirios orientales abiertos con fina lluvia de gypsophila y envoltura amarilla pastel.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000055',
    title: 'Bouquet Fusión 6 Rosas & 4 Girasoles',
    category: 'buchones',
    categories: ['buchones', 'rosas'],
    categoryName: 'Ramos Buchones & Girasoles',
    price: 'S/ 90.00',
    tag: 'Fusión Radiante',
    image: '/images/products/bouquet-fusion-6-rosas-4-girasoles.webp',
    imageFallback: '/images/products/bouquet-fusion-6-rosas-4-girasoles.jpg',
    description: 'Combinación equilibrada de 6 rosas y 4 radiantes girasoles con follaje de eucalipto en papel coreano blanco y lazo de gala.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000056',
    title: 'Estructura Geométrica 2 Lirios, 10 Rosas & Claveles',
    category: 'coronas',
    categories: ['coronas', 'pastel'],
    categoryName: 'Cumpleaños & Coronales',
    price: 'S/ 160.00',
    tag: 'Diseño Geométrico',
    image: '/images/products/estructura-geometrica-2-lirios-10-rosas-claveles.webp',
    imageFallback: '/images/products/estructura-geometrica-2-lirios-10-rosas-claveles.jpg',
    description: 'Innovador diseño de autor montado en marco geométrico con 2 lirios rosados, 10 rosas seleccionadas y claveles finos.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000057',
    title: 'Bouquet Ternura 1 Lirio Rosado & 3 Rosas',
    category: 'pastel',
    categories: ['pastel', 'rosas'],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 70.00',
    tag: 'Ternura Soft',
    image: '/images/products/bouquet-ternura-1-lirio-rosado-3-rosas.webp',
    imageFallback: '/images/products/bouquet-ternura-1-lirio-rosado-3-rosas.jpg',
    description: 'Exquisito bouquet con 1 lirio oriental perfumado, 3 rosas en tono suave y detalles de gypsophila en papel coreano rosado.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000058',
    title: 'Bouquet Elegance 8 Rosas Pastel & Perlas',
    category: 'rosas',
    categories: ['rosas', 'pastel'],
    categoryName: 'Rosas Premium',
    price: 'S/ 100.00',
    tag: 'Elegance Rouss',
    image: '/images/products/bouquet-elegance-8-rosas-pastel-perlas.webp',
    imageFallback: '/images/products/bouquet-elegance-8-rosas-pastel-perlas.jpg',
    description: 'Arreglo de 8 rosas seleccionadas en tonalidades marfil y blush con baby breath fino y cinta de seda.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000059',
    title: 'Bouquet Pasión 8 Rosas Rojas',
    category: 'rosas',
    categories: ['rosas'],
    categoryName: 'Rosas Premium',
    price: 'S/ 80.00',
    tag: 'Pasión Clásica',
    image: '/images/products/bouquet-pasion-8-rosas-rojas.webp',
    imageFallback: '/images/products/bouquet-pasion-8-rosas-rojas.jpg',
    description: 'Clásico ramo cónico con 8 rosas rojas aterciopeladas de exportación en envoltura blanca de alta densidad.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000060',
    title: 'Bouquet Sublime 1 Lirio Oriental & 3 Rosas',
    category: 'pastel',
    categories: ['pastel', 'rosas'],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 75.00',
    tag: 'Fragancia Pura',
    image: '/images/products/bouquet-sublime-1-lirio-oriental-3-rosas.webp',
    imageFallback: '/images/products/bouquet-sublime-1-lirio-oriental-3-rosas.jpg',
    description: 'Arreglo delicado de 1 lirio rosado con 3 rosas de tallo largo y papel plisado en tonos lila y rosa.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000061',
    title: 'Bouquet Rústico Chic 1 Lirio & Follaje',
    category: 'pastel',
    categories: ['pastel'],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 60.00',
    tag: 'Estilo Rústico',
    image: '/images/products/bouquet-rustico-chic-1-lirio-follaje.webp',
    imageFallback: '/images/products/bouquet-rustico-chic-1-lirio-follaje.jpg',
    description: 'Encantador arreglo individual de 1 lirio oriental con astromelias en envoltura natural tipo kraft de alta calidad.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000062',
    title: 'Bouquet Fortuna 12 Rosas Blush & Lirios',
    category: 'combos',
    categories: ['combos', 'rosas'],
    categoryName: 'Detalles & Combos Especiales',
    price: 'S/ 180.00',
    tag: 'Personalizable',
    image: '/images/products/bouquet-fortuna-12-rosas-blush-lirios.webp',
    imageFallback: '/images/products/bouquet-fortuna-12-rosas-blush-lirios.jpg',
    description: 'Espectacular bouquet de 12 rosas blush y lirios aromáticos con opción de personalización decorativa con billetes u ornamentos de lujo.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000063',
    title: 'Bouquet Royal 6 Rosas Azules & Detalles Plateados',
    category: 'rosas',
    categories: ['rosas'],
    categoryName: 'Rosas Premium',
    price: 'S/ 70.00',
    tag: 'Azul Royal',
    image: '/images/products/bouquet-royal-6-rosas-azules-detalles-plateados.webp',
    imageFallback: '/images/products/bouquet-royal-6-rosas-azules-detalles-plateados.jpg',
    description: 'Exclusivo bouquet con 6 rosas teñidas en tono azul rey, mariposas decorativas y envoltura de gala blanca.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000064',
    title: 'Bouquet Solar 6 Rosas Amarillas & Astromelias',
    category: 'rosas',
    categories: ['rosas'],
    categoryName: 'Rosas Premium',
    price: 'S/ 65.00',
    tag: 'Color & Luz',
    image: '/images/products/bouquet-solar-6-rosas-amarillas-astromelias.webp',
    imageFallback: '/images/products/bouquet-solar-6-rosas-amarillas-astromelias.jpg',
    description: 'Luminoso bouquet redondo compuesto por 6 rosas amarillas rodeadas de astromelias blancas y follaje fino.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000065',
    title: 'Bouquet Silvestre 1 Lirio Rosado & Astromelias',
    category: 'pastel',
    categories: ['pastel'],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 70.00',
    tag: 'Astromelias Silvestres',
    image: '/images/products/bouquet-silvestre-1-lirio-rosado-astromelias.webp',
    imageFallback: '/images/products/bouquet-silvestre-1-lirio-rosado-astromelias.jpg',
    description: 'Sinfonía floral de 1 lirio oriental rosado complementado con astromelias multicolores en papel coreano rosa.'
  },

  // TANDA 4 (12 - COLECCIÓN TULIPANES & BOXES)
  {
    id: 'ba000001-0000-4000-a000-000000000071',
    title: 'Bouquet Dúo Lirios Orientales & Corona Floral',
    category: 'pastel',
    categories: ['pastel'],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 90.00',
    tag: 'Dúo Aromático',
    image: '/images/products/bouquet-duo-lirios-orientales-corona-floral.webp',
    imageFallback: '/images/products/bouquet-duo-lirios-orientales-corona-floral.jpg',
    description: 'Espectacular bouquet de 2 lirios orientales abiertos en plenitud rodeados de una corona de flores y envoltura roja con lazo de gala.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000072',
    title: 'Wood Floral Box 7 Rosas & Lirios Silvestres',
    category: 'combos',
    categories: ['combos', 'rosas'],
    categoryName: 'Detalles & Combos Especiales',
    price: 'S/ 110.00',
    tag: 'Floral Box Wood',
    image: '/images/products/wood-floral-box-7-rosas-lirios-silvestres.webp',
    imageFallback: '/images/products/wood-floral-box-7-rosas-lirios-silvestres.jpg',
    description: 'Arreglo de autor en caja floral de madera rústica con 7 rosas rojas selectas, lirio silvestre y cinta decorativa de alta costura.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000073',
    title: 'Maxi Bouquet Imperial 12 Tulipanes Rosa',
    category: 'tulipanes',
    categories: ['tulipanes', 'pastel'],
    categoryName: 'Tulipanes',
    price: 'S/ 350.00',
    tag: 'Tulipán Imperial',
    image: '/images/products/maxi-bouquet-imperial-12-tulipanes-rosa-holandes.webp',
    imageFallback: '/images/products/maxi-bouquet-imperial-12-tulipanes-rosa-holandes.jpg',
    description: 'Lujoso bouquet de 12 tulipanes frescos en tonalidad rosa suave, cuidadosamente envueltos en papel coreano plisado y cinta con sello de autor Rouss.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000074',
    title: 'Bouquet Alta Costura 6 Tulipanes Rojos',
    category: 'tulipanes',
    categories: ['tulipanes', 'rosas'],
    categoryName: 'Tulipanes',
    price: 'S/ 190.00',
    tag: 'Tulipán Pasión',
    image: '/images/products/bouquet-alta-costura-6-tulipanes-rojos.webp',
    imageFallback: '/images/products/bouquet-alta-costura-6-tulipanes-rojos.jpg',
    description: 'Elegante ramo alargado con 6 tulipanes rojos de exportación en envoltura de seda blanca y lazo de gala.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000075',
    title: 'Bouquet Delicadeza 5 Tulipanes Rosados',
    category: 'tulipanes',
    categories: ['tulipanes', 'pastel'],
    categoryName: 'Tulipanes',
    price: 'S/ 160.00',
    tag: 'Tulipán Soft',
    image: '/images/products/bouquet-delicadeza-5-tulipanes-rosados.webp',
    imageFallback: '/images/products/bouquet-delicadeza-5-tulipanes-rosados.jpg',
    description: 'Exquisito bouquet cónico de 5 tulipanes rosados frescos en papel coreano blanco perlado.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000076',
    title: 'Bouquet Solar 3 Tulipanes Amarillos & Margaritas',
    category: 'tulipanes',
    categories: ['tulipanes', 'pastel'],
    categoryName: 'Tulipanes',
    price: 'S/ 85.00',
    tag: 'Tulipán Solar',
    image: '/images/products/bouquet-solar-3-tulipanes-amarillos-margaritas.webp',
    imageFallback: '/images/products/bouquet-solar-3-tulipanes-amarillos-margaritas.jpg',
    description: 'Luminoso bouquet que combina 3 tulipanes amarillos intensos con margaritas silvestres y envoltura de diseñador.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000077',
    title: 'Bouquet Black & White 6 Tulipanes Rosa Pastel',
    category: 'tulipanes',
    categories: ['tulipanes', 'pastel'],
    categoryName: 'Tulipanes',
    price: 'S/ 200.00',
    tag: 'Tulipán Black & White',
    image: '/images/products/bouquet-black-white-6-tulipanes-rosa-pastel.webp',
    imageFallback: '/images/products/bouquet-black-white-6-tulipanes-rosa-pastel.jpg',
    description: 'Moderno y contrastado diseño de 6 tulipanes rosados envueltos en papel coreano bicolor negro y blanco con dedicatoria.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000078',
    title: 'Bouquet Gold Chic 6 Tulipanes Rosa Pastel',
    category: 'tulipanes',
    categories: ['tulipanes', 'pastel'],
    categoryName: 'Tulipanes',
    price: 'S/ 200.00',
    tag: 'Tulipán Gold',
    image: '/images/products/bouquet-gold-chic-6-tulipanes-rosa-pastel.webp',
    imageFallback: '/images/products/bouquet-gold-chic-6-tulipanes-rosa-pastel.jpg',
    description: 'Distinguido ramo de 6 tulipanes rosados envuelto en papel dorado champagne de alta textura y lazo satinado.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000079',
    title: 'Maxi Ramo 12 Tulipanes Rojos de Gala',
    category: 'tulipanes',
    categories: ['tulipanes', 'rosas'],
    categoryName: 'Tulipanes',
    price: 'S/ 270.00',
    tag: 'Tulipán Gala',
    image: '/images/products/maxi-ramo-12-tulipanes-rojos-de-gala.webp',
    imageFallback: '/images/products/maxi-ramo-12-tulipanes-rojos-de-gala.jpg',
    description: 'Monumental arreglo de 12 tulipanes rojos vivos con delicada nube de gypsophila en envoltura de alta densidad.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000080',
    title: 'Bouquet Imperial 10 Tulipanes Bicolores Rojo & Rosa',
    category: 'tulipanes',
    categories: ['tulipanes', 'pastel'],
    categoryName: 'Tulipanes',
    price: 'S/ 280.00',
    tag: 'Tulipán Bicolor',
    image: '/images/products/bouquet-imperial-10-tulipanes-bicolores-rojo-rosa.webp',
    imageFallback: '/images/products/bouquet-imperial-10-tulipanes-bicolores-rojo-rosa.jpg',
    description: 'Exclusivo arreglo esférico de 10 tulipanes en degradé rojo y rosa con fino lazo de seda en tono plata.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000081',
    title: 'Bouquet Primavera 3 Tulipanes Blancos & Girasoles',
    category: 'tulipanes',
    categories: ['tulipanes', 'buchones'],
    categoryName: 'Tulipanes',
    price: 'S/ 120.00',
    tag: 'Tulipán & Girasol',
    image: '/images/products/bouquet-primavera-3-tulipanes-blancos-girasoles.webp',
    imageFallback: '/images/products/bouquet-primavera-3-tulipanes-blancos-girasoles.jpg',
    description: 'Fresca fusión de 3 tulipanes blancos puros con girasol y margaritas silvestres en envoltura de alta costura.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000082',
    title: 'Bouquet Royal 8 Tulipanes Púrpura Imperial',
    category: 'tulipanes',
    categories: ['tulipanes', 'pastel'],
    categoryName: 'Tulipanes',
    price: 'S/ 200.00',
    tag: 'Tulipán Púrpura',
    image: '/images/products/bouquet-royal-8-tulipanes-purpura-imperial.webp',
    imageFallback: '/images/products/bouquet-royal-8-tulipanes-purpura-imperial.jpg',
    description: 'Raro y sofisticado bouquet con 8 tulipanes morados en envoltura rosa con lazo de satén.'
  }
];

// CLIENT GALLERY (WebP optimized)
const INITIAL_CLIENT_GALLERY = [
  {
    id: 'fa000001-0000-4000-a000-000000000001',
    image: '/images/client-4.webp',
    imageFallback: '/images/client-4.jpg',
    title: 'Momentos de Alegría Rouss',
    quote: '"Donde florece el amor, la sonrisa ilumina cada instante."',
    arrangement: 'Combo Girasoles & Oso'
  },
  {
    id: 'fa000001-0000-4000-a000-000000000002',
    image: '/images/client-1.webp',
    imageFallback: '/images/client-1.jpg',
    title: 'Entregas Románticas Inolvidables',
    quote: '"Expresando los sentimientos más profundos con la elegancia de nuestras rosas de autor."',
    arrangement: 'Maxi Ramo de Rosas'
  },
  {
    id: 'fa000001-0000-4000-a000-000000000003',
    image: '/images/client-2.webp',
    imageFallback: '/images/client-2.jpg',
    title: 'Detalles Exclusivos & Únicos',
    quote: '"Arreglos de alta costura diseñados para celebrar momentos inolvidables."',
    arrangement: 'Rosas Azules Royal'
  },
  {
    id: 'fa000001-0000-4000-a000-000000000004',
    image: '/images/client-3.webp',
    imageFallback: '/images/client-3.jpg',
    title: 'Sonrisas & Flores de Autor',
    quote: '"El regalo perfecto para llenar de luz y calidez el día de alguien especial."',
    arrangement: 'Bouquet Radiante de Girasoles'
  }
];

const CATEGORY_NAMES_MAP = {
  'tulipanes': 'Tulipanes',
  'buchones': 'Ramos Buchones & Girasoles',
  'coronas': 'Cumpleaños & Coronas',
  'rosas': 'Rosas Premium',
  'pastel': 'Lirios & Gerberas',
  'combos': 'Combos & Cajas Florales',
  'propuestas': 'Propuestas & Bodas'
};

const CATEGORIES_TABS = [
  { id: 'todos', label: 'Todos los Arreglos' },
  { id: 'tulipanes', label: 'Tulipanes' },
  { id: 'buchones', label: 'Ramos Buchones' },
  { id: 'coronas', label: 'Cumpleaños & Coronas' },
  { id: 'rosas', label: 'Rosas' },
  { id: 'pastel', label: 'Lirios & Gerberas' },
  { id: 'combos', label: 'Combos & Cajas' },
  { id: 'propuestas', label: 'Propuestas' }
];

// Helper to get slug for URL sharing
function getProductSlug(product) {
  if (product.slug) return product.slug;
  if (product.image) {
    const filename = product.image.split('/').pop().replace(/\.(webp|jpg|jpeg|png)$/, '');
    if (filename) return filename;
  }
  return product.id;
}

export default function App() {
  // Dynamic State synchronized with Supabase
  const [productsList, setProductsList] = useState(INITIAL_PRODUCTS);
  const [galleryList, setGalleryList] = useState(INITIAL_CLIENT_GALLERY);
  const [toastMessage, setToastMessage] = useState('');
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [heroBanner, setHeroBanner] = useState({
    imagen: '/images/banner.webp',
    imagenFallback: '/images/banner.png',
    subtitulo: '"Cada pétalo cuenta una historia inolvidable" · Explora la Colección Imperial',
    link: '/catalogo'
  });

  // Page state initialized from URL path / hash
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const params = new URLSearchParams(window.location.search);
      if (path.includes('catalogo') || hash.includes('catalogo') || params.has('producto')) {
        return 'catalogo';
      }
    }
    return 'inicio';
  });

  const [activeCategory, setActiveCategory] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Auto-open product modal if URL has ?producto=slug
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const productSlug = params.get('producto');
    if (productSlug && productsList.length > 0) {
      const found = productsList.find(p => getProductSlug(p) === productSlug || p.id === productSlug || p.slug === productSlug);
      if (found) {
        setSelectedItem(found);
        setCurrentPage('catalogo');
      }
    }
  }, [productsList]);

  // Form State
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    ocasion: 'Tulipanes Holandeses de Lujo',
    presupuesto: 'S/ 85 - S/ 200',
    fechaEntrega: '',
    mensaje: ''
  });

  const sliderRef = useRef(null);

  const scrollSlider = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Fetch real-time data from Supabase 'mypes' database
  useEffect(() => {
    let isMounted = true;
    async function loadSupabaseData() {
      const data = await fetchRoussData();
      if (!isMounted) return;

      // Update Banner from Supabase
      if (data.banners && data.banners.length > 0) {
        const primaryBanner = data.banners[0];
        setHeroBanner({
          imagen: primaryBanner.imagen || '/images/banner.png',
          subtitulo: primaryBanner.subtitulo || '"Cada pétalo cuenta una historia inolvidable" · Explora la Colección Imperial',
          link: primaryBanner.link || '/catalogo'
        });
      }

      // Update Products from Supabase
      if (data.products && data.products.length > 0) {
        const mappedProducts = data.products.map(p => {
          const catArray = Array.isArray(p.category) && p.category.length > 0 ? p.category : [p.slug || 'rosas'];
          const primaryCat = catArray[0];
          return {
            id: p.id,
            title: p.title,
            category: primaryCat,
            categories: catArray,
            categoryName: CATEGORY_NAMES_MAP[primaryCat] || 'Colección Rouss',
            price: `S/ ${parseFloat(p.price || p.precio_base || 0).toFixed(2)}`,
            tag: p.badge || 'Exclusivo',
            image: p.image || '/images/products/ramo-buchon-12-girasoles-sol-radiante.webp',
            imageFallback: p.image ? p.image.replace('.webp', '.jpg') : '/images/product-red-roses.jpg',
            description: p.description || p.descripcion_corta || ''
          };
        });
        setProductsList(mappedProducts);
      }

      // Update Testimonios / Moments from Supabase
      if (data.testimonios && data.testimonios.length > 0) {
        const mappedTestimonios = data.testimonios.map(t => ({
          id: t.id,
          image: t.imagen || '/images/client-1.jpg',
          title: t.nombre || 'Momento Rouss',
          quote: t.texto || '',
          arrangement: t.ocasion || 'Arreglo de Autor'
        }));
        setGalleryList(mappedTestimonios);
      }
    }

    loadSupabaseData();
    return () => { isMounted = false; };
  }, []);

  // Switch page and update browser address bar URL cleanly (/catalogo) with optional category filter
  const navigateToPage = (page, category = 'todos') => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    setSelectedItem(null);
    if (category) {
      setActiveCategory(category);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (page === 'catalogo') {
      const url = category && category !== 'todos' ? `/catalogo?categoria=${category}` : '/catalogo';
      window.history.pushState({ page: 'catalogo', category }, '', url);
    } else {
      window.history.pushState({ page: 'inicio' }, '', '/');
    }
  };

  // Open & Close Modal with URL synchronization
  const openProductModal = (product) => {
    setSelectedItem(product);
    const slug = getProductSlug(product);
    window.history.pushState({ page: 'catalogo', producto: slug }, '', `/catalogo?producto=${slug}`);
  };

  const closeProductModal = () => {
    setSelectedItem(null);
    if (currentPage === 'catalogo') {
      window.history.pushState({ page: 'catalogo' }, '', '/catalogo');
    } else {
      window.history.pushState({ page: 'inicio' }, '', '/');
    }
  };

  // Share Product via Web Share API or Clipboard Fallback
  const handleShareProduct = async (product, e) => {
    if (e) e.stopPropagation();
    const slug = getProductSlug(product);
    const shareUrl = `${window.location.origin}/catalogo?producto=${slug}`;
    const shareTitle = `${product.title} | Florería Rouss`;
    const shareText = `Mira este hermoso arreglo de Florería Rouss: ${product.title} (${product.price})`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl
        });
        return;
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.log('Share canceled or failed:', err);
        }
      }
    }

    // Fallback: Copy to Clipboard
    try {
      await navigator.clipboard.writeText(shareUrl);
      setToastMessage('¡Enlace del arreglo copiado al portapapeles!');
      setTimeout(() => setToastMessage(''), 3000);
    } catch (err) {
      setToastMessage('Enlace: ' + shareUrl);
      setTimeout(() => setToastMessage(''), 4000);
    }
  };

  // Sync browser back/forward buttons (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const params = new URLSearchParams(window.location.search);
      const productSlug = params.get('producto');
      const catParam = params.get('categoria');

      if (catParam) {
        setActiveCategory(catParam);
      }

      if (productSlug && productsList.length > 0) {
        const found = productsList.find(p => getProductSlug(p) === productSlug || p.id === productSlug || p.slug === productSlug);
        if (found) {
          setSelectedItem(found);
          setCurrentPage('catalogo');
          return;
        }
      } else {
        setSelectedItem(null);
      }

      if (path.includes('catalogo') || hash.includes('catalogo')) {
        setCurrentPage('catalogo');
      } else {
        setCurrentPage('inicio');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [productsList]);

  // Filter products by search text and category (supports array category matching)
  const filteredProducts = productsList.filter(p => {
    const productCategories = p.categories || [p.category];
    const matchesCategory = activeCategory === 'todos' || 
                            p.category === activeCategory || 
                            productCategories.includes(activeCategory);
                            
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // WhatsApp Handlers (+51 941 493 471)
  const handleWhatsAppOrder = (productName) => {
    const message = encodeURIComponent(`Hola Florería Rouss, me gustaría solicitar información y disponibilidad de: *${productName}*.`);
    window.open(`https://wa.me/51941493471?text=${message}`, '_blank');
  };

  // Direct WhatsApp Form Submit (Sin almacenamiento externo)
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { nombre, telefono, ocasion, presupuesto, fechaEntrega, mensaje } = formData;

    const messageText = `Hola Florería Rouss, solicito una cotización personalizada:
*Nombre*: ${nombre || 'No especificado'}
*Teléfono*: ${telefono || 'No especificado'}
*Ocasión*: ${ocasion}
*Presupuesto*: ${presupuesto}
*Fecha de Entrega*: ${fechaEntrega || 'Por coordinar'}
*Detalles / Dedicatoria*: ${mensaje || 'Sin mensaje especificado'}`;

    window.open(`https://wa.me/51941493471?text=${encodeURIComponent(messageText)}`, '_blank');
  };

  return (
    <div className="site-wrapper">

      {/* TOP INFINITE AUTO-SCROLLING TICKER MARQUEE */}
      <div className="top-promo-bar-wrapper">
        <div className="top-promo-ticker">
          <div className="promo-ticker-track">
            <div className="promo-item">
              <span>Envíos a todo Lima (tarifa según distancia)</span>
            </div>
            <span className="promo-divider">|</span>
            <div className="promo-item">
              <span>+1000 Pedidos Seguros Entregados</span>
            </div>
            <span className="promo-divider">|</span>
            <div className="promo-item">
              <span>3 Años de Trayectoria en Alta Floristería</span>
            </div>
            <span className="promo-divider">|</span>
            <div className="promo-item">
              <span>WhatsApp Directo: <strong>+51 941 493 471</strong></span>
            </div>
            <span className="promo-divider">|</span>
            <div className="promo-item">
              <span>Chorrillos, Lima - Av. Alameda Sur con Av. Los Incas</span>
            </div>
            <span className="promo-divider">|</span>

            {/* Loop Duplicate Track */}
            <div className="promo-item">
              <span>Envíos a todo Lima (tarifa según distancia)</span>
            </div>
            <span className="promo-divider">|</span>
            <div className="promo-item">
              <span>+1000 Pedidos Seguros Entregados</span>
            </div>
            <span className="promo-divider">|</span>
            <div className="promo-item">
              <span>3 Años de Trayectoria en Alta Floristería</span>
            </div>
            <span className="promo-divider">|</span>
            <div className="promo-item">
              <span>WhatsApp Directo: <strong>+51 941 493 471</strong></span>
            </div>
            <span className="promo-divider">|</span>
            <div className="promo-item">
              <span>Chorrillos, Lima - Av. Alameda Sur con Av. Los Incas</span>
            </div>
            <span className="promo-divider">|</span>
          </div>
        </div>
      </div>
      
      {/* 1. HEADER & NAVIGATION */}
      <header className="site-header">
        <div className="container header-container">
          <div className="logo-link" onClick={() => navigateToPage('inicio')}>
            <picture>
              <source srcSet="/images/logo-header.webp" type="image/webp" />
              <img 
                src="/images/logo-header.png" 
                alt="Florería Rouss Logo" 
                className="logo-img" 
                width="190"
                height="55"
              />
            </picture>
          </div>

          {/* Desktop Navigation */}
          <nav className="nav-wrapper">
            <ul className="nav-menu">
              <li>
                <button 
                  className={`nav-button ${currentPage === 'inicio' ? 'active' : ''}`}
                  onClick={() => navigateToPage('inicio')}
                >
                  Inicio
                </button>
              </li>
              <li>
                <button 
                  className={`nav-button ${currentPage === 'catalogo' ? 'active' : ''}`}
                  onClick={() => navigateToPage('catalogo')}
                >
                  Catálogo Exclusivo
                </button>
              </li>
              {currentPage === 'inicio' && (
                <>
                  <li><a href="#clientes" className="nav-button">Galería Rouss</a></li>
                  <li><a href="#cotizacion" className="nav-button">Cotizar a Medida</a></li>
                  <li><a href="#nosotros" className="nav-button">Sobre Rouss</a></li>
                </>
              )}
            </ul>
          </nav>

          <div className="header-actions">
            <a 
              href="https://www.instagram.com/rouss8439/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="header-social-link desktop-only"
              title="Seguir en Instagram @rouss8439"
            >
              <InstagramGoldIcon size={18} color="#C59B27" />
            </a>

            <a 
              href="https://www.facebook.com/rouss.floristeria.2025" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="header-social-link desktop-only"
              title="Seguir en Facebook Florería Rouss"
            >
              <FacebookGoldIcon size={18} color="#C59B27" />
            </a>

            <button 
              onClick={() => handleWhatsAppOrder('Consulta General')} 
              className="btn-whatsapp-solid header-wa-btn"
              title="Pedir por WhatsApp"
            >
              <WhatsAppGoldIcon size={18} color="#FFFFFF" />
              <span className="wa-btn-text">Pedir por WhatsApp</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button 
              className="mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              title="Menú de Navegación"
            >
              {mobileMenuOpen ? <CloseMinimalIcon size={22} /> : '☰'}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER NAVIGATION MENU */}
      <div className={`mobile-drawer-overlay ${mobileMenuOpen ? 'open' : ''}`}>
        <button 
          className="mobile-drawer-link"
          onClick={() => navigateToPage('inicio')}
        >
          Inicio
        </button>
        <button 
          className="mobile-drawer-link"
          onClick={() => navigateToPage('catalogo')}
        >
          Catálogo Exclusivo
        </button>
        {currentPage === 'inicio' && (
          <>
            <a href="#clientes" className="mobile-drawer-link" onClick={() => setMobileMenuOpen(false)}>Galería Rouss</a>
            <a href="#cotizacion" className="mobile-drawer-link" onClick={() => setMobileMenuOpen(false)}>Cotizar a Medida</a>
            <a href="#nosotros" className="mobile-drawer-link" onClick={() => setMobileMenuOpen(false)}>Sobre Rouss</a>
          </>
        )}

        {/* Social Links Row in Drawer */}
        <div className="mobile-drawer-social-row">
          <a 
            href="https://www.instagram.com/rouss8439/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="drawer-social-pill"
          >
            <InstagramGoldIcon size={16} color="#C59B27" />
            <span>Instagram</span>
          </a>
          <a 
            href="https://www.facebook.com/rouss.floristeria.2025" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="drawer-social-pill"
          >
            <FacebookGoldIcon size={16} color="#C59B27" />
            <span>Facebook</span>
          </a>
        </div>

        <button 
          onClick={() => { handleWhatsAppOrder('Consulta General'); setMobileMenuOpen(false); }} 
          className="btn-whatsapp-solid"
          style={{ width: '100%', borderRadius: 'var(--radius-full)', marginTop: '0.75rem', padding: '0.85rem' }}
        >
          <WhatsAppGoldIcon size={20} color="#FFFFFF" />
          <span style={{ display: 'inline', fontWeight: 600 }}>WhatsApp Directo (+51 941 493 471)</span>
        </button>
      </div>

      {/* RENDER PAGE: INICIO VS DEDICATED CATALOG PAGE */}
      {currentPage === 'inicio' ? (
        <main>
          {/* SEMANTIC H1 FOR GOOGLE SEO & ACCESSIBILITY */}
          <h1 className="sr-only">Florería Rouss — Ramos Buchones, Tulipanes Holandeses y Arreglos Florales en Lima con Delivery</h1>

          {/* FULL-WIDTH HERO BANNER - DYNAMIC FROM SUPABASE */}
          <section className="hero-banner-section-full">
            <div 
              className="hero-banner-full-card"
              onClick={() => navigateToPage('catalogo')}
              role="button"
              tabIndex={0}
              title="Explorar Colección de Productos"
              onKeyDown={(e) => e.key === 'Enter' && navigateToPage('catalogo')}
            >
              <picture>
                <source srcSet="/images/banner.webp" type="image/webp" />
                <img 
                  src={heroBanner.imagenFallback || heroBanner.imagen} 
                  alt="Florería Rouss Banner Full Width" 
                  className="hero-banner-full-img"
                  fetchpriority="high"
                  decoding="async"
                />
              </picture>
            </div>

            {/* CLEAN POETIC BANNER BAR - DYNAMIC FROM SUPABASE */}
            <div 
              className="banner-hint-bar" 
              onClick={() => navigateToPage('catalogo')}
              title="Explorar la Colección Imperial Rouss"
            >
              <span>{heroBanner.subtitulo}</span>
            </div>
          </section>

          {/* SECTION 2: FEATURES WITH DIRECT CATEGORY FILTER BUTTONS & BOTANICAL DESIGN */}
          <section className="features-section">
            {/* FLOATING BOTANICAL VECTOR ACCENTS */}
            <svg className="features-deco-petal petal-top-left" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M50 10 C30 30, 20 60, 50 90 C80 60, 70 30, 50 10 Z" />
              <path d="M50 10 L50 90" strokeDasharray="3 3" />
              <path d="M50 35 C40 45, 40 55, 50 65" />
              <path d="M50 35 C60 45, 60 55, 50 65" />
            </svg>

            <svg className="features-deco-petal petal-bottom-right" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
              <circle cx="50" cy="50" r="35" strokeDasharray="2 4" />
              <path d="M50 15 C35 35, 35 65, 50 85 C65 65, 65 35, 50 15 Z" />
              <path d="M15 50 C35 35, 65 35, 85 50 C65 65, 35 65, 15 50 Z" />
            </svg>

            <div className="container">
              <div className="section-header-centered">
                <span className="section-tag">
                  <FlowerSparkleIcon size={14} color="#C59B27" /> Especialidades de Temporada
                </span>
                <h2>Alta Floristería & Diseños de Autor</h2>
                <p>
                  Arreglos exclusivos elaborados a mano con flores frescas seleccionadas del día y envolturas de alta costura.
                </p>
              </div>

              <div className="features-grid">
                
                {/* 1. TULIPANES */}
                <div 
                  className="feature-card-image"
                  onClick={() => navigateToPage('catalogo', 'tulipanes')}
                  title="Ver Colección de Tulipanes"
                >
                  <picture>
                    <source srcSet="/images/products/maxi-bouquet-imperial-12-tulipanes-rosa-holandes.webp" type="image/webp" />
                    <img 
                      src="/images/products/maxi-bouquet-imperial-12-tulipanes-rosa-holandes.jpg" 
                      alt="Tulipanes de Lujo" 
                      className="feature-img-thumb"
                      loading="lazy"
                    />
                  </picture>
                  <h3 className="feature-title">Tulipanes</h3>
                  <p className="feature-desc">Arreglos exclusivos de tulipanes frescos en tonalidades rosa, rojo, amarillo, morado y blanco.</p>
                  <button 
                    className="btn-feature-link"
                    onClick={(e) => { e.stopPropagation(); navigateToPage('catalogo', 'tulipanes'); }}
                  >
                    <span>Ver Tulipanes</span>
                    <ArrowRightGoldIcon size={14} color="#96761A" />
                  </button>
                </div>

                {/* 2. RAMOS BUCHONES */}
                <div 
                  className="feature-card-image"
                  onClick={() => navigateToPage('catalogo', 'buchones')}
                  title="Ver Colección de Ramos Buchones & Girasoles"
                >
                  <picture>
                    <source srcSet="/images/products/ramo-buchon-12-girasoles-sol-radiante.webp" type="image/webp" />
                    <img 
                      src="/images/products/ramo-buchon-12-girasoles-sol-radiante.jpg" 
                      alt="Ramos Buchones de Lujo" 
                      className="feature-img-thumb"
                      loading="lazy"
                    />
                  </picture>
                  <h3 className="feature-title">Ramos Buchones de Lujo</h3>
                  <p className="feature-desc">Creaciones monumentales desde 12 hasta 80 rosas y girasoles con envoltura coreana de alta costura.</p>
                  <button 
                    className="btn-feature-link"
                    onClick={(e) => { e.stopPropagation(); navigateToPage('catalogo', 'buchones'); }}
                  >
                    <span>Ver Ramos Buchones</span>
                    <ArrowRightGoldIcon size={14} color="#96761A" />
                  </button>
                </div>

                {/* 3. DISENOS DE AUTOR */}
                <div 
                  className="feature-card-image"
                  onClick={() => navigateToPage('catalogo', 'coronas')}
                  title="Ver Diseños de Autor & Coronas"
                >
                  <picture>
                    <source srcSet="/images/products/ramo-princesa-12-rosas-durazno-tiara-cristal.webp" type="image/webp" />
                    <img 
                      src="/images/products/ramo-princesa-12-rosas-durazno-tiara-cristal.jpg" 
                      alt="Diseños de Autor Únicos" 
                      className="feature-img-thumb"
                      loading="lazy"
                    />
                  </picture>
                  <h3 className="feature-title">Diseños de Autor Únicos</h3>
                  <p className="feature-desc">Creaciones exclusivas firmadas por Jharol Baldeón con tiaras imperiales, gerberas y cajas florales.</p>
                  <button 
                    className="btn-feature-link"
                    onClick={(e) => { e.stopPropagation(); navigateToPage('catalogo', 'coronas'); }}
                  >
                    <span>Ver Diseños de Autor</span>
                    <ArrowRightGoldIcon size={14} color="#96761A" />
                  </button>
                </div>

              </div>
            </div>
          </section>

          {/* SECTION 3: DRAMATIC DARK FLORAL BACKGROUND EFFECT */}
          <section className="catalog-callout-bg-img">
            <div className="container">
              <div className="catalog-callout-content">
                <span className="section-tag" style={{ background: 'rgba(197, 155, 39, 0.25)', color: '#D4AF37', border: '1px solid #D4AF37', marginBottom: '1rem' }}>
                  Colección Rouss
                </span>
                <h2>Alta Floristería a tu Alcance</h2>
                <p>
                  Explora nuestra colección de {productsList.length} arreglos exclusivos, tulipanes frescos, ramos buchones y coronas de autor.
                </p>
                
                <button 
                  onClick={() => navigateToPage('catalogo')} 
                  className="btn-solid-gold"
                >
                  <span>Ver Catálogo Completo ({productsList.length} Arreglos)</span>
                  <ArrowRightGoldIcon size={18} color="#121110" />
                </button>
              </div>
            </div>
          </section>

          {/* SECTION 4: GALERÍA ROUSS */}
          <section id="clientes" className="clients-section">
            <div className="container">
              <div className="text-center">
                <span className="section-tag">
                  <HeartMinimalIcon size={14} color="#C59B27" /> Momentos & Frases
                </span>
                <h2 className="section-title">Galería de Momentos Rouss</h2>
                <p className="section-subtitle">
                  Expresiones de amor y alegría plasmadas en nuestros arreglos florales de autor.
                </p>
              </div>

              <div className="slider-container-mobile">
                <button 
                  className="slider-arrow-btn slider-arrow-left"
                  onClick={() => scrollSlider('left')}
                  title="Anterior"
                >
                  ‹
                </button>

                <div className="slider-wrapper-flex" ref={sliderRef}>
                  {galleryList.map((item) => (
                    <div key={item.id} className="slider-item-card">
                      <div 
                        className="client-card-solid"
                        onClick={() => setSelectedItem(item)}
                        title="Haz clic para ampliar la foto"
                      >
                        <div className="client-img-wrapper">
                          <picture>
                            <source srcSet={item.image.endsWith('.webp') ? item.image : item.image.replace(/\.(jpg|png)$/, '.webp')} type="image/webp" />
                            <img 
                              src={item.imageFallback || item.image} 
                              alt={item.title} 
                              className="client-img" 
                              loading="lazy"
                              decoding="async"
                            />
                          </picture>
                          <div className="client-card-overlay-solid">
                            <span className="client-tag">{item.arrangement}</span>
                            <p className="client-quote">{item.quote}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  className="slider-arrow-btn slider-arrow-right"
                  onClick={() => scrollSlider('right')}
                  title="Siguiente"
                >
                  ›
                </button>
              </div>

            </div>
          </section>

          {/* SECTION 5: PROFESSIONAL QUOTE FORM */}
          <section id="cotizacion" className="custom-quote-section">
            <div className="container">
              <div className="text-center" style={{ marginBottom: '1.5rem' }}>
                <span className="section-tag">
                  <CrownPremiumIcon size={14} color="#C59B27" /> Cotización Exclusiva
                </span>
                <h2 className="section-title">Diseña tu Arreglo a la Medida</h2>
                <p className="section-subtitle">
                  Completa este sencillo formulario para recibir una propuesta personalizada directa a tu WhatsApp por <strong>Jharol Baldeón</strong>.
                </p>
              </div>

              <div className="quote-form-card">
                <form onSubmit={handleFormSubmit}>
                  <div className="form-grid-2col">
                    
                    <div className="form-group">
                      <label className="form-label">Nombre Completo *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Ej. Luciana García" 
                        value={formData.nombre}
                        onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Teléfono / WhatsApp *</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="Ej. +51 987 654 321" 
                        value={formData.telefono}
                        onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Tipo de Arreglo u Ocasión</label>
                      <select 
                        value={formData.ocasion}
                        onChange={(e) => setFormData({...formData, ocasion: e.target.value})}
                        className="form-select"
                      >
                        <option value="Tulipanes Selectos">Tulipanes Selectos</option>
                        <option value="Ramo Buchón de Rosas & Girasoles">Ramo Buchón de Rosas & Girasoles</option>
                        <option value="Cumpleaños con Tiara de Cristal">Cumpleaños con Tiara de Cristal</option>
                        <option value="Wood Floral Box o Sombrerera">Wood Floral Box o Sombrerera</option>
                        <option value="Cucurucho o Mini Bouquet Accesible">Cucurucho o Mini Bouquet Accesible</option>
                        <option value="Propuesta de Matrimonio">Propuesta de Matrimonio</option>
                        <option value="Aniversario Romántico">Aniversario Romántico</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Presupuesto Estimado</label>
                      <select 
                        value={formData.presupuesto}
                        onChange={(e) => setFormData({...formData, presupuesto: e.target.value})}
                        className="form-select"
                      >
                        <option value="S/ 55 - S/ 100 (Detalle Accesible)">S/ 55 - S/ 100 (Detalle Accesible)</option>
                        <option value="S/ 100 - S/ 200 (Tulipanes & Rosas)">S/ 100 - S/ 200 (Tulipanes & Rosas)</option>
                        <option value="S/ 200 - S/ 350 (Tulipanes Imperial / Buchón)">S/ 200 - S/ 350 (Tulipanes Imperial / Buchón)</option>
                        <option value="S/ 350 - S/ 450+ (Formato Maxi Monumental)">S/ 350 - S/ 450+ (Formato Maxi Monumental)</option>
                      </select>
                    </div>

                    <div className="form-group full-width">
                      <label className="form-label">Fecha Deseada de Entrega</label>
                      <input 
                        type="date" 
                        value={formData.fechaEntrega}
                        onChange={(e) => setFormData({...formData, fechaEntrega: e.target.value})}
                        className="form-input"
                      />
                    </div>

                    <div className="form-group full-width">
                      <label className="form-label">Mensaje / Dedicatoria / Detalles Especiales</label>
                      <textarea 
                        rows="3"
                        placeholder="Escribe aquí si deseas incluir una frase especial en la cinta satinada, globos de helio o una nota personalizada..." 
                        value={formData.mensaje}
                        onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
                        className="form-textarea"
                      ></textarea>
                    </div>

                  </div>

                  <button type="submit" className="btn-submit-form">
                    <WhatsAppGoldIcon size={20} color="#FFFFFF" />
                    <span>Enviar Solicitud por WhatsApp</span>
                  </button>

                  <p className="privacy-notice-text">
                    🔒 Tu solicitud se envía directamente a nuestro WhatsApp oficial sin almacenar datos en servidores de terceros. <button type="button" className="privacy-link-btn" onClick={() => setShowPrivacyModal(true)}>Ver Políticas de Privacidad</button>.
                  </p>
                </form>
              </div>

            </div>
          </section>

          {/* SOBRE FLORERIA ROUSS */}
          <section id="nosotros" className="about-section">
            <div className="container">
              <div className="about-grid">
                <div className="about-showcase-frame">
                  <picture>
                    <source srcSet="/images/products/ramo-buchon-corona-reina-50-rosas.webp" type="image/webp" />
                    <img 
                      src="/images/products/ramo-buchon-corona-reina-50-rosas.jpg" 
                      alt="Ramo Buchón Corona Imperial Rouss by Jharol Baldeón" 
                      className="about-img"
                    />
                  </picture>
                </div>

                <div className="about-text">
                  <span className="section-tag">
                    <CrownPremiumIcon size={14} color="#C59B27" /> Marca de Autor
                  </span>
                  <h2>Elegancia & Sofisticación en Cada Pétalo</h2>
                  <p>
                    <strong>Florería Rouss by Jharol Baldeón</strong> cuenta con 3 años de trayectoria en el rubro de alta floristería en Lima, especializada en ramos buchones, tulipanes frescos, rosas de exportación y coronas de autor con tiaras imperiales.
                  </p>
                  <p>
                    Ubicados en Chorrillos (Av. Alameda Sur cruce con Av. Los Incas), realizamos envíos seguros y garantizados a todo Lima Metropolitana con más de 1,000 entregas exitosas.
                  </p>

                  <div className="about-stats">
                    <div className="stat-item">
                      <span className="stat-number">3 Años</span>
                      <span className="stat-label">En el Rubro</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">+1000</span>
                      <span className="stat-label">Pedidos Seguros</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">Todo Lima</span>
                      <span className="stat-label">Zonas de Delivery</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      ) : (
        /* DEDICATED EXCLUSIVE CATALOG PAGE (WITH NO HORIZONTAL SCROLL) */
        <div className="catalog-page-wrapper">
          <div className="container">
            
            <div className="catalog-header-minimal">
              <span className="section-tag">
                <FlowerSparkleIcon size={14} color="#C59B27" /> Catálogo Oficial
              </span>
              <h1>Colección Exclusiva Rouss</h1>
              <p>
                Explora nuestra variedad de ramos buchones, rosas, tulipanes, girasoles y detalles florales elaborados con flores frescas seleccionadas. Pide tu diseño favorito directamente vía WhatsApp.
              </p>
            </div>

            {/* SEARCH & CATEGORY SELECT BAR */}
            <div className="catalog-bar-minimal">
              <div className="catalog-bar-top">
                <div className="search-input-wrapper">
                  <SearchMinimalIcon size={18} color="#C59B27" />
                  <input 
                    type="text" 
                    placeholder="Buscar arreglo (ej. Tulipanes, Buchón, Gerberas, Box, Lirios)..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer' }} title="Limpiar búsqueda">
                      <CloseMinimalIcon size={16} color="#8C857B" />
                    </button>
                  )}
                </div>
                <div className="catalog-count-badge">
                  <span>{filteredProducts.length} {filteredProducts.length === 1 ? 'arreglo' : 'arreglos'}</span>
                </div>
              </div>

              {/* Desktop Filter Pills */}
              <div className="catalog-filter-pills desktop-pills-flex">
                {CATEGORIES_TABS.map(cat => (
                  <button 
                    key={cat.id}
                    className={`pill-btn ${activeCategory === cat.id ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat.id)}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Mobile Category Dropdown Selector */}
              <div className="mobile-category-selector-wrapper">
                <select 
                  value={activeCategory} 
                  onChange={(e) => setActiveCategory(e.target.value)}
                  className="mobile-category-select"
                >
                  <option value="todos">Todos los Arreglos ({productsList.length})</option>
                  <option value="tulipanes">Tulipanes</option>
                  <option value="buchones">Ramos Buchones & Girasoles</option>
                  <option value="coronas">Cumpleaños & Coronas</option>
                  <option value="rosas">Rosas</option>
                  <option value="pastel">Lirios & Gerberas</option>
                  <option value="combos">Combos & Cajas</option>
                  <option value="propuestas">Propuestas</option>
                </select>
              </div>

            </div>

            {/* PRODUCTS GRID */}
            <div className="products-grid-minimal">
              {filteredProducts.map((product) => (
                <div key={product.id} className="product-card-minimal">
                  <div className="product-img-wrapper" onClick={() => openProductModal(product)}>
                    <picture>
                      {product.image && product.image.endsWith('.webp') && (
                        <source srcSet={product.image} type="image/webp" />
                      )}
                      <img 
                        src={product.imageFallback || product.image} 
                        alt={product.title} 
                        className="product-img" 
                        loading="lazy"
                      />
                    </picture>
                    <span className="product-badge">{product.tag || 'Exclusivo'}</span>
                  </div>
                  
                  <div className="product-content">
                    <span className="product-category">
                      {product.categoryName || CATEGORY_NAMES_MAP[product.category] || 'Arreglo de Autor'}
                    </span>
                    <h3 className="product-title" onClick={() => openProductModal(product)} style={{ cursor: 'pointer' }}>
                      {product.title}
                    </h3>
                    <p className="product-desc">
                      {product.description}
                    </p>
                    
                    <div className="product-footer">
                      <div className="product-price">
                        <span className="price-value">{product.price}</span>
                      </div>
                    </div>

                    <div className="product-card-actions">
                      <button 
                        onClick={() => handleWhatsAppOrder(product.title, product.price)}
                        className="btn-order-wa-solid"
                        style={{ flexGrow: 1 }}
                      >
                        <WhatsAppGoldIcon size={18} color="#FFFFFF" />
                        <span>Pedir por WhatsApp</span>
                      </button>
                      <button 
                        onClick={(e) => handleShareProduct(product, e)}
                        className="btn-card-share"
                        title="Compartir este arreglo"
                      >
                        <ShareMinimalIcon size={18} color="#C59B27" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="empty-catalog-state">
                <p>No encontramos arreglos con el término "{searchQuery}".</p>
                <button 
                  onClick={() => { setSearchQuery(''); setActiveCategory('todos'); }}
                  className="btn-solid-gold"
                  style={{ marginTop: '1rem', padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}
                >
                  Ver Todos los Arreglos
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <img src="/images/logo-footer.png" alt="Rouss Logo" className="footer-logo" />
              <p className="footer-desc">
                Florería Rouss - Especialistas en ramos buchones, tulipanes, rosas de exportación y flores premium. Diseños de autor para momentos inolvidables en Lima.
              </p>
            </div>

            <div>
              <h4 className="footer-title">Navegación</h4>
              <ul className="footer-links">
                <li>
                  <button onClick={() => navigateToPage('inicio')}>Inicio</button>
                </li>
                <li>
                  <button onClick={() => navigateToPage('catalogo')}>Catálogo Exclusivo</button>
                </li>
                {currentPage === 'inicio' && (
                  <>
                    <li><a href="#clientes">Galería Rouss</a></li>
                    <li><a href="#cotizacion">Cotizar a Medida</a></li>
                    <li><a href="#nosotros">Nosotros</a></li>
                  </>
                )}
              </ul>
            </div>

            <div>
              <h4 className="footer-title">Colecciones</h4>
              <ul className="footer-links">
                <li>
                  <button onClick={() => { navigateToPage('catalogo', 'tulipanes'); }}>
                    Tulipanes
                  </button>
                </li>
                <li>
                  <button onClick={() => { navigateToPage('catalogo', 'buchones'); }}>
                    Ramos Buchones
                  </button>
                </li>
                <li>
                  <button onClick={() => { navigateToPage('catalogo', 'coronas'); }}>
                    Cumpleaños & Coronas
                  </button>
                </li>
                <li>
                  <button onClick={() => { navigateToPage('catalogo', 'rosas'); }}>
                    Rosas Premium
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="footer-title">Atención Directa</h4>
              <div className="contact-info">
                <a 
                  href="https://wa.me/51941493471?text=Hola%20Florer%C3%ADa%20Rouss,%20deseo%20consultar%20por%20sus%20arreglos" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="contact-item contact-link"
                  title="Contactar al WhatsApp Oficial"
                >
                  <PhoneGoldIcon size={18} color="#C59B27" />
                  <span>+51 941 493 471 (WhatsApp Oficial)</span>
                </a>

                <a 
                  href="https://www.instagram.com/rouss8439/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="contact-item contact-link"
                  title="Visitar Instagram @rouss8439"
                >
                  <InstagramGoldIcon size={18} color="#C59B27" />
                  <span>@rouss8439 (Instagram)</span>
                </a>

                <a 
                  href="https://www.facebook.com/rouss.floristeria.2025" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="contact-item contact-link"
                  title="Visitar Facebook Florería Rouss"
                >
                  <FacebookGoldIcon size={18} color="#C59B27" />
                  <span>Florería Rouss (Facebook)</span>
                </a>

                <div className="contact-item">
                  <MapPinGoldIcon size={18} color="#C59B27" />
                  <span>Av. Alameda Sur cruce con Av. Los Incas, Chorrillos, Lima</span>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Florería Rouss · 3 Años en el Rubro · +1000 Pedidos Seguros. Envíos a todo Lima.</p>
            <div className="footer-legal-links">
              <button type="button" onClick={() => setShowPrivacyModal(true)}>Políticas de Privacidad (Ley N° 29733)</button>
              <span style={{ color: '#57534E' }}>·</span>
              <button type="button" onClick={() => setShowPrivacyModal(true)}>Términos del Servicio & Envíos</button>
            </div>
            <p style={{ marginTop: '0.5rem', color: '#8C857B', fontSize: '0.8rem' }}>Rouss By Jharol Baldeón · Chorrillos, Lima</p>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP BUTTON */}
      <a 
        href="https://wa.me/51941493471?text=Hola%20Florer%C3%ADa%20Rouss,%20deseo%20consultar%20por%20sus%20arreglos%20florales" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="floating-wa-btn"
        title="Consultar por WhatsApp con Florería Rouss"
      >
        <WhatsAppGoldIcon size={30} color="#FFFFFF" />
      </a>

      {/* LIGHTBOX MODAL */}
      {selectedItem && (
        <div className="modal-backdrop" onClick={closeProductModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeProductModal}>
              <CloseMinimalIcon size={18} color="#FFFFFF" />
            </button>
            
            <div className="modal-img-wrapper">
              <picture>
                {selectedItem.image && selectedItem.image.endsWith('.webp') && (
                  <source srcSet={selectedItem.image} type="image/webp" />
                )}
                <img src={selectedItem.imageFallback || selectedItem.image} alt={selectedItem.title} className="modal-img" />
              </picture>
            </div>

            <div className="modal-info">
              <span className="section-tag" style={{ marginBottom: '0.85rem' }}>
                <FlowerSparkleIcon size={14} color="#C59B27" /> {selectedItem.categoryName || 'Detalle Exclusivo'}
              </span>
              
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', lineHeight: 1.25 }}>
                {selectedItem.title}
              </h3>
              
              {selectedItem.quote ? (
                <p style={{ fontStyle: 'italic', fontSize: '1.05rem', color: '#57534E', marginBottom: '1.25rem' }}>
                  {selectedItem.quote}
                </p>
              ) : (
                <>
                  <p style={{ color: '#57534E', marginBottom: '0.85rem', fontSize: '0.9rem', lineHeight: 1.5 }}>
                    {selectedItem.description}
                  </p>
                  <p style={{ fontSize: '1.4rem', fontWeight: 700, color: '#96761A', marginBottom: '1.25rem' }}>
                    {selectedItem.price}
                  </p>
                </>
              )}

              <div className="modal-actions-grid">
                <button 
                  onClick={() => handleWhatsAppOrder(selectedItem.title)} 
                  className="btn-whatsapp-solid"
                  style={{ padding: '0.8rem 1.5rem', fontSize: '0.9rem', width: '100%', justifyContent: 'center' }}
                >
                  <WhatsAppGoldIcon size={20} color="#FFFFFF" />
                  <span style={{ display: 'inline' }}>Pedir este arreglo por WhatsApp</span>
                </button>

                {!selectedItem.quote && (
                  <button 
                    onClick={(e) => handleShareProduct(selectedItem, e)} 
                    className="btn-share-outline"
                  >
                    <ShareMinimalIcon size={18} color="#8A6D1C" />
                    <span>Compartir este Arreglo / Copiar Enlace</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="share-toast">
          <CheckMinimalIcon size={18} color="#D4AF37" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* PRIVACY POLICY & TERMS MODAL (LEY N° 29733 PERÚ) */}
      {showPrivacyModal && (
        <div className="legal-modal-backdrop" onClick={() => setShowPrivacyModal(false)}>
          <div className="legal-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowPrivacyModal(false)} title="Cerrar ventana">
              <CloseMinimalIcon size={18} color="#FFFFFF" />
            </button>

            <div className="legal-modal-header">
              <span className="section-tag">
                <CrownPremiumIcon size={14} color="#C59B27" /> Transparencia & Seguridad
              </span>
              <h3 className="legal-modal-title">Políticas de Privacidad y Términos de Servicio</h3>
              <p style={{ fontSize: '0.8rem', color: '#8C857B', marginTop: '0.25rem' }}>
                Última actualización: Agosto 2026 · Florería Rouss By Jharol Baldeón (Lima, Perú)
              </p>
            </div>

            <div className="legal-modal-body">
              <h4>1. Identidad y Compromiso con la Privacidad</h4>
              <p>
                <strong>Florería Rouss by Jharol Baldeón</strong>, con sede en Av. Alameda Sur cruce con Av. Los Incas, Chorrillos, Lima - Perú, se encuentra comprometida con la protección de la privacidad y los derechos de sus clientes en estricto cumplimiento de la <strong>Ley N° 29733 (Ley de Protección de Datos Personales de la República del Perú)</strong> y su Reglamento (D.S. 003-2013-JUS).
              </p>

              <h4>2. Finalidad y Uso del Formulario</h4>
              <p>
                El formulario de cotización y los botones de pedido de este sitio web tienen el único propósito de facilitar la comunicación directa y personalizada entre el cliente y nuestro equipo de atención:
              </p>
              <ul>
                <li><strong>Envío directo a WhatsApp</strong>: Los datos ingresados (nombre, teléfono, tipo de arreglo, ocasión, fecha y mensaje para la dedicatoria) se redactan exclusivamente en un mensaje de chat cifrado de WhatsApp dirigido al número oficial <strong>+51 941 493 471</strong>.</li>
                <li><strong>Sin almacenamiento invasivo</strong>: No almacenamos datos sensibles en bases de datos públicas ni compartimos información con anunciantes externos.</li>
              </ul>

              <h4>3. Confidencialidad de las Dedicatorias y Mensajes</h4>
              <p>
                Entendemos que los arreglos florales representan sentimientos íntimos. Todas las cartas, dedicatorias, cintas personalizadas y detalles de destinatarios son tratados con absoluta confidencialidad por el florista y el personal de entrega.
              </p>

              <h4>4. Cobertura y Políticas de Envíos en Lima</h4>
              <p>
                Realizamos entregas a domicilio en todos los distritos de Lima Metropolitana y Callao. El costo de delivery se calcula de manera transparente acorde a la distancia desde nuestra sede en Chorrillos. Toda entrega es coordinada previamente vía WhatsApp con el comprador o destinatario.
              </p>

              <h4>5. Derechos ARCO (Acceso, Rectificación, Cancelación y Oposición)</h4>
              <p>
                Cualquier cliente puede ejercer sus derechos de consulta, rectificación o eliminación de sus datos de contacto comunicándose directamente a nuestro WhatsApp oficial <strong>+51 941 493 471</strong> o por nuestras redes sociales verificadas <strong>@rouss8439</strong>.
              </p>

              <h4>6. Aceptación de los Términos</h4>
              <p>
                Al utilizar nuestro catálogo web y pulsar sobre los botones de pedido o cotización por WhatsApp, el usuario manifiesta su conformidad libre y voluntaria con estas políticas.
              </p>

              <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                <button 
                  type="button" 
                  className="btn-solid-gold"
                  style={{ padding: '0.65rem 2rem', fontSize: '0.9rem' }}
                  onClick={() => setShowPrivacyModal(false)}
                >
                  Entendido y Conforme
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}
