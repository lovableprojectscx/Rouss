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
  CheckMinimalIcon,
  FloralCornerVine,
  FloatingPetalsLayer,
  FloralDivider,
  BookClaimsGoldIcon
} from './components/PremiumIcons'
import { fetchRoussData, createReservation } from './lib/supabase'
import LibroReclamacionesModal from './components/LibroReclamacionesModal'

// 56 Official Products from Florería Rouss Owner (Tanda 1 + Tanda 2 + Tanda 3 + Tanda 4)
const INITIAL_PRODUCTS = [
  {
    id: 'ba000001-0000-4000-a000-000000000001',
    title: '12 Girasoles',
    category: 'buchones',
    categories: ["buchones"],
    categoryName: 'Ramos Buchones & Girasoles',
    price: 'S/ 180.00',
    tag: '12 Girasoles',
    image: '/images/products/12-girasoles.webp',
    imageFallback: '/images/products/12-girasoles.jpg',
    description: 'Ramo de 12 girasoles frescos seleccionados en papel coreano negro con cinta satinada.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000002',
    title: '50 Rosas y 3 Globos con Helio',
    category: 'buchones',
    categories: ["buchones","rosas"],
    categoryName: 'Ramos Buchones & Girasoles',
    price: 'S/ 300.00',
    tag: '50 Rosas + Helio',
    image: '/images/products/50-rosas-y-3-globos-con-helio.webp',
    imageFallback: '/images/products/50-rosas-y-3-globos-con-helio.jpg',
    description: 'Ramo de 50 rosas rojas acompañado de 3 globos con helio y lazo decorativo.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000003',
    title: '80 Rosas más 6 Girasoles',
    category: 'buchones',
    categories: ["buchones","rosas"],
    categoryName: 'Ramos Buchones & Girasoles',
    price: 'S/ 450.00',
    tag: '80 Rosas + 6 Girasoles',
    image: '/images/products/80-rosas-mas-6-girasoles.webp',
    imageFallback: '/images/products/80-rosas-mas-6-girasoles.jpg',
    description: 'Maxi ramo de 80 rosas rojas con 6 girasoles centrales en papel coreano plisado.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000004',
    title: '80 Rosas',
    category: 'buchones',
    categories: ["buchones","rosas"],
    categoryName: 'Ramos Buchones & Girasoles',
    price: 'S/ 400.00',
    tag: '80 Rosas',
    image: '/images/products/80-rosas.webp',
    imageFallback: '/images/products/80-rosas.jpg',
    description: 'Ramo buchón de 80 rosas rojas seleccionadas con mariposas doradas decorativas.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000005',
    title: '50 Rosas + Corona',
    category: 'coronas',
    categories: ["coronas","buchones"],
    categoryName: 'Cumpleaños & Coronales',
    price: 'S/ 300.00',
    tag: 'Princesa 👑',
    image: '/images/products/50-rosas-mas-corona.webp',
    imageFallback: '/images/products/50-rosas-mas-corona.jpg',
    description: 'Ramo de 50 rosas rojas con corona dorada y cinta personalizada.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000006',
    title: '50 Rosas con Billetes (Opcional)',
    category: 'buchones',
    categories: ["buchones","rosas"],
    categoryName: 'Ramos Buchones & Girasoles',
    price: 'S/ 250.00',
    tag: '50 Rosas',
    image: '/images/products/50-rosas-billetes-opcional.webp',
    imageFallback: '/images/products/50-rosas-billetes-opcional.jpg',
    description: 'Ramo de 50 rosas rojas. Billetes opcionales proporcionados por el cliente (+S/ 10 por colocación).'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000007',
    title: '40 Rosas',
    category: 'buchones',
    categories: ["buchones","rosas"],
    categoryName: 'Ramos Buchones & Girasoles',
    price: 'S/ 200.00',
    tag: '40 Rosas',
    image: '/images/products/40-rosas.webp',
    imageFallback: '/images/products/40-rosas.jpg',
    description: 'Ramo de 40 rosas rojas decorado con mariposas doradas y envoltura marfil.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000008',
    title: '30 Rosas Ramo',
    category: 'rosas',
    categories: ["rosas","buchones"],
    categoryName: 'Rosas Premium',
    price: 'S/ 170.00',
    tag: '30 Rosas',
    image: '/images/products/30-rosas-ramo.webp',
    imageFallback: '/images/products/30-rosas-ramo.jpg',
    description: 'Ramo de 30 rosas rojas en envoltura negra coreana con lazo satinado.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000009',
    title: '20 Rosas + Peluche + 1 Lirio',
    category: 'combos',
    categories: ["combos","pastel"],
    categoryName: 'Detalles & Combos Especiales',
    price: 'S/ 200.00',
    tag: '20 Rosas + Peluche',
    image: '/images/products/20-rosas-peluche-1-lirio.webp',
    imageFallback: '/images/products/20-rosas-peluche-1-lirio.jpg',
    description: 'Combo especial de 20 rosas rosadas con peluche y 1 lirio oriental.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000010',
    title: '20 Rosas con Esponja Absorbente',
    category: 'rosas',
    categories: ["rosas"],
    categoryName: 'Rosas Premium',
    price: 'S/ 150.00',
    tag: '20 Rosas Hidratadas',
    image: '/images/products/20-rosas-con-esponja-absorbente.webp',
    imageFallback: '/images/products/20-rosas-con-esponja-absorbente.jpg',
    description: 'Arreglo de 20 rosas rojas con esponja absorbente de agua para máxima conservación.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000011',
    title: '12 Rosas más Astromelias',
    category: 'rosas',
    categories: ["rosas"],
    categoryName: 'Rosas Premium',
    price: 'S/ 160.00',
    tag: '12 Rosas + Astromelias',
    image: '/images/products/12-rosas-mas-astromelias.webp',
    imageFallback: '/images/products/12-rosas-mas-astromelias.jpg',
    description: 'Bouquet de 12 rosas rojas combinadas con astromelias frescas y envoltura marfil.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000012',
    title: '15 Rosas con Esponja Absorbente',
    category: 'rosas',
    categories: ["rosas"],
    categoryName: 'Rosas Premium',
    price: 'S/ 150.00',
    tag: '15 Rosas',
    image: '/images/products/15-rosas-con-esponja-absorbente.webp',
    imageFallback: '/images/products/15-rosas-con-esponja-absorbente.jpg',
    description: 'Elegante ramo cónico de 15 rosas rojas con esponja absorbente en papel coreano negro.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000013',
    title: '4 Lirios y Papel Coreano',
    category: 'pastel',
    categories: ["pastel"],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 150.00',
    tag: '4 Lirios',
    image: '/images/products/4-lirios-y-papel-coreano.webp',
    imageFallback: '/images/products/4-lirios-y-papel-coreano.jpg',
    description: 'Bouquet de 4 lirios blancos con abundante papel coreano y follaje fino.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000014',
    title: '3 Lirios más Rosas',
    category: 'pastel',
    categories: ["pastel"],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 200.00',
    tag: '3 Lirios + Rosas',
    image: '/images/products/3-lirios-mas-rosas.webp',
    imageFallback: '/images/products/3-lirios-mas-rosas.jpg',
    description: 'Bouquet de 3 lirios orientales rosados acompañados de rosas en envoltura marfil.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000015',
    title: '8 Rosas Escarchadas',
    category: 'rosas',
    categories: ["rosas"],
    categoryName: 'Rosas Premium',
    price: 'S/ 80.00',
    tag: '8 Rosas',
    image: '/images/products/8-rosas-escarchadas.webp',
    imageFallback: '/images/products/8-rosas-escarchadas.jpg',
    description: 'Ramo cucurucho con 8 rosas rojas escarchadas en papel coreano negro.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000016',
    title: '4 Rosas más Astromelias',
    category: 'rosas',
    categories: ["rosas"],
    categoryName: 'Rosas Premium',
    price: 'S/ 55.00',
    tag: '4 Rosas',
    image: '/images/products/4-rosas-mas-astromelias.webp',
    imageFallback: '/images/products/4-rosas-mas-astromelias.jpg',
    description: 'Delicado ramo cónico de 4 rosas rojas con astromelias frescas.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000017',
    title: '12 Rosas + Astromelias + Corona',
    category: 'coronas',
    categories: ["coronas","rosas"],
    categoryName: 'Cumpleaños & Coronales',
    price: 'S/ 200.00',
    tag: 'Corona 👑',
    image: '/images/products/12-rosas-astromelias-corona.webp',
    imageFallback: '/images/products/12-rosas-astromelias-corona.jpg',
    description: 'Ramo de 12 rosas con astromelias y corona dorada de cumpleaños.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000018',
    title: '12 Rosas Clásicas',
    category: 'rosas',
    categories: ["rosas"],
    categoryName: 'Rosas Premium',
    price: 'S/ 80.00',
    tag: '12 Rosas',
    image: '/images/products/12-rosas-clasicas-80.webp',
    imageFallback: '/images/products/12-rosas-clasicas-80.jpg',
    description: 'Ramo tradicional de 12 rosas rojas seleccionadas con follaje verde.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000019',
    title: '12 Rosas Ramo',
    category: 'rosas',
    categories: ["rosas"],
    categoryName: 'Rosas Premium',
    price: 'S/ 90.00',
    tag: '12 Rosas Gala',
    image: '/images/products/12-rosas-ramo-90.webp',
    imageFallback: '/images/products/12-rosas-ramo-90.jpg',
    description: 'Ramo de 12 rosas rojas en envoltura de alta densidad con lazo de satén.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000020',
    title: '8 Claveles Importados',
    category: 'pastel',
    categories: ["pastel"],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 90.00',
    tag: 'Claveles',
    image: '/images/products/8-claveles-importados.webp',
    imageFallback: '/images/products/8-claveles-importados.jpg',
    description: 'Bouquet de 8 claveles importados en tonos pastel con envoltura marfil.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000021',
    title: '20 Rosas más 2 Anturios',
    category: 'rosas',
    categories: ["rosas","buchones"],
    categoryName: 'Rosas Premium',
    price: 'S/ 190.00',
    tag: '20 Rosas + Anturios',
    image: '/images/products/20-rosas-mas-2-anturios.webp',
    imageFallback: '/images/products/20-rosas-mas-2-anturios.jpg',
    description: 'Arreglo exclusivo de 20 rosas rojas con 2 anturios exóticos de alta floristería.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000022',
    title: '5 Rosas más 1 Anturio',
    category: 'rosas',
    categories: ["rosas"],
    categoryName: 'Rosas Premium',
    price: 'S/ 85.00',
    tag: '5 Rosas + Anturio',
    image: '/images/products/5-rosas-mas-1-anturio.webp',
    imageFallback: '/images/products/5-rosas-mas-1-anturio.jpg',
    description: 'Arreglo moderno de 5 rosas rojas acompañadas de 1 anturio brillante.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000023',
    title: '1 Lirio más Astromelias',
    category: 'pastel',
    categories: ["pastel"],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 55.00',
    tag: '1 Lirio',
    image: '/images/products/1-lirio-mas-astromelias.webp',
    imageFallback: '/images/products/1-lirio-mas-astromelias.jpg',
    description: 'Bouquet delicado con 1 lirio oriental rosado y astromelias.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000024',
    title: '1 Lirio más Conejitos',
    category: 'pastel',
    categories: ["pastel"],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 120.00',
    tag: 'Lirio & Conejitos',
    image: '/images/products/1-lirio-mas-conejitos.webp',
    imageFallback: '/images/products/1-lirio-mas-conejitos.jpg',
    description: 'Arreglo fino de 1 lirio aromático acompañado de flores conejito (antirrhinum).'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000025',
    title: '1 Orquídea con Ruscus y Estrellitas',
    category: 'pastel',
    categories: ["pastel"],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 150.00',
    tag: 'Orquídea',
    image: '/images/products/1-orquidea-ruscus-estrellitas-belen.webp',
    imageFallback: '/images/products/1-orquidea-ruscus-estrellitas-belen.jpg',
    description: 'Arreglo exclusivo de 1 vara de orquídea blanca con ruscus y estrellitas de Belén.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000026',
    title: '1 Lirio más Hortensias y Claveles',
    category: 'pastel',
    categories: ["pastel"],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 65.00',
    tag: '1 Lirio + Flores',
    image: '/images/products/6-girasoles-mas-margaritas.webp',
    imageFallback: '/images/products/6-girasoles-mas-margaritas.jpg',
    description: 'Arreglo floral con 1 lirio aromático acompañado de hortensias y claveles frescos.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000027',
    title: 'Bouquet Silvestre',
    category: 'pastel',
    categories: ["pastel"],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 65.00',
    tag: 'Silvestre',
    image: '/images/products/bouquet-silvestre-65.webp',
    imageFallback: '/images/products/bouquet-silvestre-65.jpg',
    description: 'Bouquet silvestre de flores variadas en tono pastel con envoltorio decorativo.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000028',
    title: 'Ramo Box',
    category: 'combos',
    categories: ["combos","rosas"],
    categoryName: 'Detalles & Combos Especiales',
    price: 'S/ 100.00',
    tag: 'Box Sombrerero',
    image: '/images/products/ramo-box-100.webp',
    imageFallback: '/images/products/ramo-box-100.jpg',
    description: 'Sombrerero floral cilíndrico con flores mixtas y rosas de exportación.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000029',
    title: 'Ramo Primavera',
    category: 'pastel',
    categories: ["pastel"],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 90.00',
    tag: 'Primavera',
    image: '/images/products/ramo-primavera-90.webp',
    imageFallback: '/images/products/ramo-primavera-90.jpg',
    description: 'Arreglo primaveral con rosas en tono pastel y flores de estación.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000030',
    title: '2 Gerberas Ramo Princesa',
    category: 'pastel',
    categories: ["pastel"],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 85.00',
    tag: 'Gerberas',
    image: '/images/products/2-gerberas-ramo-princesa.webp',
    imageFallback: '/images/products/2-gerberas-ramo-princesa.jpg',
    description: 'Bouquet con 2 gerberas rosadas, flores de acompañamiento y corona princesa.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000031',
    title: '1 Lirio más 3 Rositas',
    category: 'pastel',
    categories: ["pastel","rosas"],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 65.00',
    tag: '1 Lirio + 3 Rosas',
    image: '/images/products/1-lirio-mas-3-rositas-65.webp',
    imageFallback: '/images/products/1-lirio-mas-3-rositas-65.jpg',
    description: 'Bouquet con 1 lirio aromático y 3 rosas rojas en envoltura marrón kraft.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000032',
    title: '1 Lirio más 3 Rosas',
    category: 'pastel',
    categories: ["pastel","rosas"],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 70.00',
    tag: '1 Lirio + 3 Rosas',
    image: '/images/products/1-lirio-mas-3-rosas-70.webp',
    imageFallback: '/images/products/1-lirio-mas-3-rosas-70.jpg',
    description: 'Bouquet de 1 lirio rosado con 3 rosas rojas y papel coreano marfil.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000033',
    title: '1 Lirio más 3 Rosas Especial',
    category: 'pastel',
    categories: ["pastel","rosas"],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 75.00',
    tag: '1 Lirio + 3 Rosas',
    image: '/images/products/1-lirio-mas-3-rosas-75.webp',
    imageFallback: '/images/products/1-lirio-mas-3-rosas-75.jpg',
    description: 'Arreglo con 1 lirio blanco y 3 rosas rojas en papel negro mate.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000034',
    title: '1 Lirio más 3 Rosas Mini',
    category: 'pastel',
    categories: ["pastel","rosas"],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 55.00',
    tag: '1 Lirio + 3 Rosas',
    image: '/images/products/1-lirio-mas-3-rosas-55.webp',
    imageFallback: '/images/products/1-lirio-mas-3-rosas-55.jpg',
    description: 'Detalle floral con 1 lirio y 3 rosas rojas en presentación compacta.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000035',
    title: '1 Lirio',
    category: 'pastel',
    categories: ["pastel"],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 60.00',
    tag: '1 Lirio',
    image: '/images/products/1-lirio-60.webp',
    imageFallback: '/images/products/1-lirio-60.jpg',
    description: 'Ramo individual de 1 lirio oriental rosado con gypsophila y follaje.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000036',
    title: '1 Lirio con Astromelias y Mirra',
    category: 'pastel',
    categories: ["pastel"],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 60.00',
    tag: '1 Lirio + Astromelias',
    image: '/images/products/1-lirio-astromelias-mirra.webp',
    imageFallback: '/images/products/1-lirio-astromelias-mirra.jpg',
    description: 'Arreglo aromático de 1 lirio con astromelias y ramas de mirra.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000037',
    title: '2 Lirios',
    category: 'pastel',
    categories: ["pastel"],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 80.00',
    tag: '2 Lirios',
    image: '/images/products/2-lirios-80.webp',
    imageFallback: '/images/products/2-lirios-80.jpg',
    description: 'Bouquet de 2 lirios orientales con envoltura marfil y lazo dorado.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000038',
    title: '2 Lirios + 10 Rosas + Claveles',
    category: 'pastel',
    categories: ["pastel","rosas"],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 160.00',
    tag: 'Mix Premium',
    image: '/images/products/2-lirios-10-rosas-claveles.webp',
    imageFallback: '/images/products/2-lirios-10-rosas-claveles.jpg',
    description: 'Arreglo combinado de 2 lirios, 10 rosas y claveles en tonos pasteles.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000039',
    title: '6 Rosas + 4 Girasoles',
    category: 'buchones',
    categories: ["buchones","rosas"],
    categoryName: 'Ramos Buchones & Girasoles',
    price: 'S/ 80.00',
    tag: 'Rosas + Girasoles',
    image: '/images/products/6-rosas-4-girasoles.webp',
    imageFallback: '/images/products/6-rosas-4-girasoles.jpg',
    description: 'Combinación radiante de 6 rosas rojas con 4 girasoles frescos.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000040',
    title: '6 Rosas más Astromelias',
    category: 'rosas',
    categories: ["rosas"],
    categoryName: 'Rosas Premium',
    price: 'S/ 65.00',
    tag: '6 Rosas',
    image: '/images/products/6-rosas-mas-astromelias.webp',
    imageFallback: '/images/products/6-rosas-mas-astromelias.jpg',
    description: 'Ramo de 6 rosas rojas con astromelias en envoltura negra coreana.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000041',
    title: '8 Rosas Clásicas',
    category: 'rosas',
    categories: ["rosas"],
    categoryName: 'Rosas Premium',
    price: 'S/ 70.00',
    tag: '8 Rosas',
    image: '/images/products/8-rosas-70.webp',
    imageFallback: '/images/products/8-rosas-70.jpg',
    description: 'Ramo tradicional de 8 rosas rojas frescas con envoltura marfil.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000042',
    title: '8 Rosas Selección',
    category: 'rosas',
    categories: ["rosas"],
    categoryName: 'Rosas Premium',
    price: 'S/ 100.00',
    tag: '8 Rosas Gala',
    image: '/images/products/8-rosas-100.webp',
    imageFallback: '/images/products/8-rosas-100.jpg',
    description: 'Ramo de 8 rosas seleccionadas de exportación con lazo satinado.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000043',
    title: '1 Lirio + 6 Rosas',
    category: 'pastel',
    categories: ["pastel","rosas"],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 80.00',
    tag: '1 Lirio + 6 Rosas',
    image: '/images/products/1-lirio-mas-6-rosas.webp',
    imageFallback: '/images/products/1-lirio-mas-6-rosas.jpg',
    description: 'Arreglo floral con 1 lirio aromático y 6 rosas rojas seleccionadas en envoltura de autor.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000044',
    title: 'Ramo Especial Primavera',
    category: 'pastel',
    categories: ["pastel"],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 80.00',
    tag: 'Primavera',
    image: '/images/products/ramo-especial-primavera-80.webp',
    imageFallback: '/images/products/ramo-especial-primavera-80.jpg',
    description: 'Bouquet primaveral con rosas, lirios y follaje fino en tono pastel.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000045',
    title: '12 Tulipanes Rosados',
    category: 'tulipanes',
    categories: ["tulipanes","pastel"],
    categoryName: 'Tulipanes',
    price: 'S/ 350.00',
    tag: '12 Tulipanes 🌷',
    image: '/images/products/12-tulipanes-rosados.webp',
    imageFallback: '/images/products/12-tulipanes-rosados.jpg',
    description: 'Exclusivo ramo buchón de 12 tulipanes holandeses rosados en papel coreano marfil.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000046',
    title: '8 Tulipanes Morados',
    category: 'tulipanes',
    categories: ["tulipanes"],
    categoryName: 'Tulipanes',
    price: 'S/ 200.00',
    tag: '8 Tulipanes',
    image: '/images/products/8-tulipanes-morados.webp',
    imageFallback: '/images/products/8-tulipanes-morados.jpg',
    description: 'Ramo de 8 tulipanes morados con corona dorada y envoltura de alta densidad.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000047',
    title: '6 Tulipanes Rosados con Lluvia',
    category: 'tulipanes',
    categories: ["tulipanes","pastel"],
    categoryName: 'Tulipanes',
    price: 'S/ 200.00',
    tag: '6 Tulipanes',
    image: '/images/products/6-tulipanes-rosados-con-lluvia.webp',
    imageFallback: '/images/products/6-tulipanes-rosados-con-lluvia.jpg',
    description: 'Ramo de 6 tulipanes rosados acompañados de lluvia de gypsophila y corona.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000048',
    title: '6 Tulipanes Rosados',
    category: 'tulipanes',
    categories: ["tulipanes","pastel"],
    categoryName: 'Tulipanes',
    price: 'S/ 200.00',
    tag: '6 Tulipanes',
    image: '/images/products/6-tulipanes-rosados-200.webp',
    imageFallback: '/images/products/6-tulipanes-rosados-200.jpg',
    description: 'Bouquet de 6 tulipanes rosados en papel coreano negro con cinta satinada.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000049',
    title: '6 Tulipanes Rojos',
    category: 'tulipanes',
    categories: ["tulipanes","rosas"],
    categoryName: 'Tulipanes',
    price: 'S/ 130.00',
    tag: '6 Tulipanes',
    image: '/images/products/6-tulipanes-rojos-130.webp',
    imageFallback: '/images/products/6-tulipanes-rojos-130.jpg',
    description: 'Bouquet elegante de 6 tulipanes rojos con envoltura marfil.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000050',
    title: '5 Tulipanes Rosados',
    category: 'tulipanes',
    categories: ["tulipanes","pastel"],
    categoryName: 'Tulipanes',
    price: 'S/ 160.00',
    tag: '5 Tulipanes',
    image: '/images/products/5-tulipanes-rosados.webp',
    imageFallback: '/images/products/5-tulipanes-rosados.jpg',
    description: 'Arreglo cónico con 5 tulipanes rosados y lazo satinado.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000051',
    title: '4 Tulipanes Rosados más 2 Blancos',
    category: 'tulipanes',
    categories: ["tulipanes","pastel"],
    categoryName: 'Tulipanes',
    price: 'S/ 200.00',
    tag: '6 Tulipanes Bicolor',
    image: '/images/products/4-tulipanes-rosados-2-blancos.webp',
    imageFallback: '/images/products/4-tulipanes-rosados-2-blancos.jpg',
    description: 'Combinación de 4 tulipanes rosados con 2 tulipanes blancos y follaje fino.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000052',
    title: '3 Tulipanes Blancos',
    category: 'tulipanes',
    categories: ["tulipanes","pastel"],
    categoryName: 'Tulipanes',
    price: 'S/ 120.00',
    tag: '3 Tulipanes',
    image: '/images/products/3-tulipanes-blancos.webp',
    imageFallback: '/images/products/3-tulipanes-blancos.jpg',
    description: 'Bouquet delicado de 3 tulipanes blancos con papel coreano marfil.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000053',
    title: '3 Tulipanes Amarillos con Margaritas',
    category: 'tulipanes',
    categories: ["tulipanes","buchones"],
    categoryName: 'Tulipanes',
    price: 'S/ 85.00',
    tag: '3 Tulipanes',
    image: '/images/products/3-tulipanes-amarillos-margaritas.webp',
    imageFallback: '/images/products/3-tulipanes-amarillos-margaritas.jpg',
    description: 'Arreglo alegre de 3 tulipanes amarillos con margaritas silvestres.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000054',
    title: '12 Tulipanes Rojos',
    category: 'tulipanes',
    categories: ["tulipanes","rosas"],
    categoryName: 'Tulipanes',
    price: 'S/ 300.00',
    tag: '12 Tulipanes',
    image: '/images/products/12-tulipanes-rojos.webp',
    imageFallback: '/images/products/12-tulipanes-rojos.jpg',
    description: 'Ramo de 12 tulipanes rojos con nube de gypsophila en envoltura de alta densidad.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000055',
    title: '10 Tulipanes Rojos Gala',
    category: 'tulipanes',
    categories: ["tulipanes","rosas"],
    categoryName: 'Tulipanes',
    price: 'S/ 280.00',
    tag: '10 Tulipanes',
    image: '/images/products/10-tulipanes-rojos-gala.webp',
    imageFallback: '/images/products/10-tulipanes-rojos-gala.jpg',
    description: 'Arreglo de 10 tulipanes rojos intensos en presentación de gala.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000056',
    title: '2 Lirios',
    category: 'pastel',
    categories: ["pastel"],
    categoryName: 'Delicadeza Pastel & Lirios',
    price: 'S/ 90.00',
    tag: '2 Lirios',
    image: '/images/products/2-lirios-sin-chocolate.webp',
    imageFallback: '/images/products/2-lirios-sin-chocolate.jpg',
    description: 'Bouquet de 2 lirios aromáticos con envoltura de autor.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000057',
    title: 'Ramo Box 7 Rosas',
    category: 'combos',
    categories: ["combos","rosas"],
    categoryName: 'Detalles & Combos Especiales',
    price: 'S/ 110.00',
    tag: 'Box 7 Rosas',
    image: '/images/products/ramo-box-7-rosas.webp',
    imageFallback: '/images/products/ramo-box-7-rosas.jpg',
    description: 'Caja sombrerero con 7 rosas rojas seleccionadas y follaje decorativo.'
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

const VALID_CATEGORIES = ['todos', 'tulipanes', 'buchones', 'coronas', 'rosas', 'pastel', 'combos', 'propuestas', 'tematicos'];

// Sanitiza y limpia cualquier parámetro de categoría contra caracteres especiales (ej: rosas>, rosas/, rosa)
export function sanitizeCategory(cat) {
  if (!cat || typeof cat !== 'string') return 'todos';
  const cleaned = cat.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '');
  if (!cleaned) return 'todos';
  if (VALID_CATEGORIES.includes(cleaned)) return cleaned;
  const found = VALID_CATEGORIES.find(c => c.startsWith(cleaned) || cleaned.startsWith(c));
  return found || 'todos';
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
    subtitulo: '"Cada pétalo cuenta una historia inolvidable" · Explora el Catálogo Exclusivo',
    link: '/catalogo'
  });

  // Page state initialized from URL path / hash / search params
  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const params = new URLSearchParams(window.location.search);
      if (path.includes('catalogo') || hash.includes('catalogo') || params.has('producto') || params.has('categoria') || params.has('cat')) {
        return 'catalogo';
      }
    }
    return 'inicio';
  });

  const [activeCategory, setActiveCategory] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const rawCat = params.get('categoria') || params.get('cat') || params.get('category');
      if (rawCat) {
        return sanitizeCategory(rawCat);
      }
    }
    return 'todos';
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showClaimsModal, setShowClaimsModal] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const params = new URLSearchParams(window.location.search);
      return path.includes('reclamacion') || hash.includes('reclamacion') || params.has('reclamo') || params.has('reclamaciones');
    }
    return false;
  });

  // Synchronize browser history and auto-open product modal or filter by category
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const params = new URLSearchParams(window.location.search);

      if (path.includes('reclamacion') || hash.includes('reclamacion') || params.has('reclamo') || params.has('reclamaciones')) {
        setShowClaimsModal(true);
      } else {
        setShowClaimsModal(false);
      }

      if (path.includes('catalogo') || hash.includes('catalogo') || params.has('producto') || params.has('categoria') || params.has('cat')) {
        setCurrentPage('catalogo');
      } else {
        setCurrentPage('inicio');
      }

      const rawCatParam = params.get('categoria') || params.get('cat') || params.get('category');
      if (rawCatParam) {
        setActiveCategory(sanitizeCategory(rawCatParam));
      } else {
        setActiveCategory('todos');
      }

      const productSlug = params.get('producto');
      if (productSlug && productsList.length > 0) {
        const found = productsList.find(p => getProductSlug(p) === productSlug || p.id === productSlug || p.slug === productSlug);
        if (found) setSelectedItem(found);
      } else {
        setSelectedItem(null);
      }
    };

    window.addEventListener('popstate', handlePopState);

    // Initial check for ?producto=slug
    const params = new URLSearchParams(window.location.search);
    const productSlug = params.get('producto');
    if (productSlug && productsList.length > 0) {
      const found = productsList.find(p => getProductSlug(p) === productSlug || p.id === productSlug || p.slug === productSlug);
      if (found) {
        setSelectedItem(found);
        setCurrentPage('catalogo');
      }
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, [productsList]);

  // Form State
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    ocasion: 'Tulipanes Selectos',
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
          subtitulo: primaryBanner.subtitulo || '"Cada pétalo cuenta una historia inolvidable" · Explora el Catálogo Exclusivo',
          link: primaryBanner.link || '/catalogo'
        });
      }

      // Update Products directly from Supabase (100% Real-time dynamic database)
      if (Array.isArray(data.products)) {
        const mappedProducts = data.products.map(p => {
          const catArray = Array.isArray(p.category) && p.category.length > 0 
            ? p.category 
            : (p.slug ? [p.slug] : ['rosas']);
          const primaryCat = catArray[0];
          return {
            id: p.id,
            title: p.title || 'Arreglo Floral',
            category: primaryCat,
            categories: catArray,
            categoryName: CATEGORY_NAMES_MAP[primaryCat] || 'Colección Rouss',
            price: `S/ ${parseFloat(p.price || p.precio_base || 0).toFixed(2)}`,
            tag: p.badge || 'Exclusivo',
            image: p.image || '/images/product-red-roses.jpg',
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

  // Change category filter and update browser URL (?categoria=rosas)
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    if (currentPage === 'catalogo') {
      const url = category && category !== 'todos' ? `/catalogo?categoria=${encodeURIComponent(category)}` : '/catalogo';
      window.history.pushState({ page: 'catalogo', categoria: category }, '', url);
    }
  };

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
      const url = category && category !== 'todos' ? `/catalogo?categoria=${encodeURIComponent(category)}` : '/catalogo';
      window.history.pushState({ page: 'catalogo', categoria: category }, '', url);
    } else {
      window.history.pushState({ page: 'inicio' }, '', '/');
    }
  };

  // Open & Close Modal with URL synchronization
  const openProductModal = (product) => {
    setSelectedItem(product);
    const slug = getProductSlug(product);
    const catQuery = activeCategory && activeCategory !== 'todos' ? `&categoria=${encodeURIComponent(activeCategory)}` : '';
    window.history.pushState({ page: 'catalogo', producto: slug, categoria: activeCategory }, '', `/catalogo?producto=${slug}${catQuery}`);
  };

  const closeProductModal = () => {
    setSelectedItem(null);
    if (currentPage === 'catalogo') {
      const url = activeCategory && activeCategory !== 'todos' ? `/catalogo?categoria=${encodeURIComponent(activeCategory)}` : '/catalogo';
      window.history.pushState({ page: 'catalogo', categoria: activeCategory }, '', url);
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

  // Filter products by search text and category (supports array category matching)
  const filteredProducts = productsList.filter(p => {
    const productCategories = (p.categories && Array.isArray(p.categories)) ? p.categories : [p.category];
    const cleanActive = sanitizeCategory(activeCategory);
    const matchesCategory = cleanActive === 'todos' || 
                            p.category === cleanActive || 
                            productCategories.some(c => c && c.toLowerCase() === cleanActive);
                            
    const matchesSearch = !searchQuery.trim() || 
                          p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));
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
                  <li><a href="#cobertura" className="nav-button">Zonas de Delivery</a></li>
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
            <a href="#cobertura" className="mobile-drawer-link" onClick={() => setMobileMenuOpen(false)}>Zonas de Delivery</a>
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
          <h1 className="sr-only">Florería Rouss — Ramos Buchones, Tulipanes y Arreglos Florales en Lima con Delivery</h1>

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
                  width="1200"
                  height="600"
                  fetchpriority="high"
                  decoding="async"
                />
              </picture>
            </div>

            {/* CLEAN POETIC BANNER BAR - DYNAMIC FROM SUPABASE */}
            <div 
              className="banner-hint-bar" 
              onClick={() => navigateToPage('catalogo')}
              title="Explorar el Catálogo Exclusivo Rouss"
            >
              <span>{heroBanner.subtitulo}</span>
            </div>
          </section>

          {/* SECTION 2: FEATURES WITH DIRECT CATEGORY FILTER BUTTONS & BOTANICAL DESIGN */}
          <section className="features-section">
            {/* LUXURY BOTANICAL VINES & FLOATING PETALS (0 KB SVG) */}
            <FloralCornerVine position="top-left" />
            <FloralCornerVine position="top-right" />
            <FloatingPetalsLayer />

            <div className="container">
              <div className="section-header-centered">
                <span className="section-tag">
                  <FlowerSparkleIcon size={14} color="#C59B27" /> Especialidades de Temporada
                </span>
                <h2>Alta Floristería & Diseños de Autor</h2>
                <p>
                  Arreglos exclusivos elaborados a mano con flores frescas seleccionadas del día y envolturas de alta costura.
                </p>
                <FloralDivider />
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
                      width="280"
                      height="280"
                      loading="lazy"
                      decoding="async"
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
                      width="280"
                      height="280"
                      loading="lazy"
                      decoding="async"
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
                      width="280"
                      height="280"
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                  <h3 className="feature-title">Diseños de Autor Únicos</h3>
                  <p className="feature-desc">Creaciones exclusivas firmadas por Jharol Baldeón con tiaras de cristal, gerberas y cajas florales.</p>
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
                  Explora nuestra exclusiva colección de diseños de autor, tulipanes frescos, ramos buchones y coronas de reina.
                </p>
                
                <button 
                  onClick={() => navigateToPage('catalogo')} 
                  className="btn-solid-gold"
                >
                  <span>Explorar Catálogo Exclusivo</span>
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
                              width="320"
                              height="400"
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
                      <label htmlFor="quote-nombre" className="form-label">Nombre Completo *</label>
                      <input 
                        id="quote-nombre"
                        name="nombre"
                        type="text" 
                        required
                        placeholder="Ej. Luciana García" 
                        value={formData.nombre}
                        onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                        className="form-input"
                        aria-label="Nombre Completo"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="quote-telefono" className="form-label">Teléfono / WhatsApp *</label>
                      <input 
                        id="quote-telefono"
                        name="telefono"
                        type="tel" 
                        required
                        placeholder="Ej. +51 987 654 321" 
                        value={formData.telefono}
                        onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                        className="form-input"
                        aria-label="Teléfono o WhatsApp"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="quote-ocasion" className="form-label">Tipo de Arreglo u Ocasión</label>
                      <select 
                        id="quote-ocasion"
                        name="ocasion"
                        value={formData.ocasion}
                        onChange={(e) => setFormData({...formData, ocasion: e.target.value})}
                        className="form-select"
                        aria-label="Tipo de Arreglo u Ocasión"
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
                      <label htmlFor="quote-presupuesto" className="form-label">Presupuesto Estimado</label>
                      <select 
                        id="quote-presupuesto"
                        name="presupuesto"
                        value={formData.presupuesto}
                        onChange={(e) => setFormData({...formData, presupuesto: e.target.value})}
                        className="form-select"
                        aria-label="Presupuesto Estimado"
                      >
                        <option value="S/ 55 - S/ 100 (Detalle Accesible)">S/ 55 - S/ 100 (Detalle Accesible)</option>
                        <option value="S/ 100 - S/ 200 (Tulipanes & Rosas)">S/ 100 - S/ 200 (Tulipanes & Rosas)</option>
                        <option value="S/ 200 - S/ 350 (Tulipanes / Ramos Buchones)">S/ 200 - S/ 350 (Tulipanes / Ramos Buchones)</option>
                        <option value="S/ 350 - S/ 450+ (Formato Maxi Monumental)">S/ 350 - S/ 450+ (Formato Maxi Monumental)</option>
                      </select>
                    </div>

                    <div className="form-group full-width">
                      <label htmlFor="quote-fecha-entrega" className="form-label">Fecha Deseada de Entrega</label>
                      <input 
                        id="quote-fecha-entrega"
                        name="fechaEntrega"
                        type="date" 
                        value={formData.fechaEntrega}
                        onChange={(e) => setFormData({...formData, fechaEntrega: e.target.value})}
                        className="form-input"
                        aria-label="Fecha Deseada de Entrega"
                      />
                    </div>

                    <div className="form-group full-width">
                      <label htmlFor="quote-mensaje" className="form-label">Mensaje / Dedicatoria / Detalles Especiales</label>
                      <textarea 
                        id="quote-mensaje"
                        name="mensaje"
                        rows="3"
                        placeholder="Escribe aquí si deseas incluir una frase especial en la cinta satinada, globos de helio o una nota personalizada..." 
                        value={formData.mensaje}
                        onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
                        className="form-textarea"
                        aria-label="Mensaje o dedicatoria personalizada"
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
            <FloralCornerVine position="bottom-right" />
            <FloatingPetalsLayer />

            <div className="container">
              <div className="about-grid">
                <div className="about-showcase-frame">
                  <picture>
                    <source srcSet="/images/products/50-rosas-mas-corona.webp" type="image/webp" />
                    <img 
                      src="/images/products/50-rosas-mas-corona.jpg" 
                      alt="50 Rosas + Corona Florería Rouss by Jharol Baldeón" 
                      className="about-img"
                      width="480"
                      height="600"
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                </div>

                <div className="about-text">
                  <span className="section-tag">
                    <CrownPremiumIcon size={14} color="#C59B27" /> Marca de Autor
                  </span>
                  <h2>Elegancia & Sofisticación en Cada Pétalo</h2>
                  <p>
                    <strong>Florería Rouss by Jharol Baldeón</strong> cuenta con 3 años de trayectoria en el rubro de alta floristería en Lima, especializada en ramos buchones, tulipanes frescos, rosas y coronas de autor con tiaras de cristal.
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

          {/* SECTION 6: LOCAL DELIVERY COVERAGE IN LIMA & SEDE CHORRILLOS */}
          <section id="cobertura" className="delivery-coverage-section">
            <div className="container">
              <div className="text-center" style={{ marginBottom: '2.5rem' }}>
                <span className="section-tag">
                  <MapPinGoldIcon size={14} color="#735308" /> Cobertura & Entregas
                </span>
                <h2 className="section-title">Delivery de Flores en Todo Lima</h2>
                <p className="section-subtitle">
                  Taller y boutique con sede en <strong>Chorrillos</strong> (Av. Alameda Sur cruce con Av. Los Incas). Envíos puntuales el mismo día con chofer exclusivo y cuidado de alta costura floral.
                </p>
              </div>

              <div className="coverage-zones-grid">
                <div className="zone-card">
                  <div className="zone-badge">Sede Sur · Entrega Express</div>
                  <h3 className="zone-title">Chorrillos, Surco & Barranco</h3>
                  <p className="zone-desc">Salidas directas y entregas ágiles desde nuestro taller principal:</p>
                  <ul className="zone-districts-list">
                    <li>🌸 <strong>Chorrillos</strong> (Cedros de Villa, Huertos, La Encantada, Matellini)</li>
                    <li>🌸 <strong>Santiago de Surco</strong> (Chacarilla, Monterrico, Casuarinas, Higuereta)</li>
                    <li>🌸 <strong>Barranco</strong>, San Juan de Miraflores & Villa El Salvador</li>
                  </ul>
                </div>

                <div className="zone-card featured-zone">
                  <div className="zone-badge gold">Lima Moderna & Centro</div>
                  <h3 className="zone-title">Miraflores, San Isidro & San Borja</h3>
                  <p className="zone-desc">Envíos programados para aniversarios, oficinas y ocasiones de autor:</p>
                  <ul className="zone-districts-list">
                    <li>🌹 <strong>Miraflores</strong> & <strong>San Isidro</strong> (Zona Financiera y Residencial)</li>
                    <li>🌹 <strong>San Borja</strong>, Surquillo & Magdalena del Mar</li>
                    <li>🌹 <strong>Jesús María</strong>, Lince, Pueblo Libre, San Miguel & Cercado</li>
                  </ul>
                </div>

                <div className="zone-card">
                  <div className="zone-badge">Lima Este, Norte & Callao</div>
                  <h3 className="zone-title">La Molina, Ate & Callao</h3>
                  <p className="zone-desc">Cobertura garantizada con transporte seguro para ramos monumentales:</p>
                  <ul className="zone-districts-list">
                    <li>🌷 <strong>La Molina</strong> (La Planicie, Rinconada, Camacho)</li>
                    <li>🌷 <strong>Ate</strong>, Santa Anita, Los Olivos & San Martín de Porres</li>
                    <li>🌷 <strong>Bellavista</strong>, La Perla, La Punta & Callao</li>
                  </ul>
                </div>
              </div>

              <div className="delivery-perks-bar">
                <div className="perk-item">
                  <span className="perk-icon">🚗</span>
                  <div>
                    <strong>Transporte Protegido</strong>
                    <p>Base fija antivuelco para preservar coronas, tiaras y envoltorios intactos.</p>
                  </div>
                </div>
                <div className="perk-item">
                  <span className="perk-icon">📸</span>
                  <div>
                    <strong>Confirmación con Foto & Video</strong>
                    <p>Te mostramos el arreglo terminado por WhatsApp antes de enviarlo.</p>
                  </div>
                </div>
                <div className="perk-item">
                  <span className="perk-icon">⏱️</span>
                  <div>
                    <strong>Entregas de Lunes a Domingo</strong>
                    <p>Horario continuo de 8:00 AM a 10:00 PM con chofer particular.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      ) : (
        /* DEDICATED EXCLUSIVE CATALOG PAGE (WITH NO HORIZONTAL SCROLL) */
        <div className="catalog-page-wrapper">
          <FloralCornerVine position="top-left" />
          <FloralCornerVine position="top-right" />
          <FloatingPetalsLayer />

          <div className="container">
            
            <div className="catalog-header-minimal">
              <span className="section-tag">
                <FlowerSparkleIcon size={14} color="#C59B27" /> Catálogo Oficial
              </span>
              <h1>Colección Exclusiva Rouss</h1>
              <p>
                Explora nuestra variedad de ramos buchones, rosas, tulipanes, girasoles y detalles florales elaborados con flores frescas seleccionadas. Pide tu diseño favorito directamente vía WhatsApp.
              </p>
              <FloralDivider />
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
                    onClick={() => handleCategoryChange(cat.id)}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Mobile Category Dropdown Selector */}
              <div className="mobile-category-selector-wrapper">
                <select 
                  value={activeCategory} 
                  onChange={(e) => handleCategoryChange(e.target.value)}
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
              <div className="empty-catalog-state" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                {searchQuery ? (
                  <>
                    <p>No encontramos arreglos con el término "{searchQuery}".</p>
                    <button 
                      onClick={() => { setSearchQuery(''); setActiveCategory('todos'); }}
                      className="btn-solid-gold"
                      style={{ marginTop: '1rem', padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}
                    >
                      Ver Todos los Arreglos
                    </button>
                  </>
                ) : (
                  <p style={{ color: '#666', fontStyle: 'italic' }}>Catálogo en actualización. Pronto nuevos arreglos florales disponibles.</p>
                )}
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
              <picture>
                <source srcSet="/images/logo-footer.webp" type="image/webp" />
                <img 
                  src="/images/logo-footer.png" 
                  alt="Florería Rouss Logo" 
                  className="footer-logo" 
                  width="52" 
                  height="52" 
                  loading="lazy" 
                  decoding="async" 
                />
              </picture>
              <p className="footer-desc">
                Florería Rouss - Especialistas en ramos buchones, tulipanes, rosas de exportación y flores premium. Diseños de autor para momentos inolvidables en Lima.
              </p>
            </div>

            <div>
              <h3 className="footer-title">Navegación</h3>
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
              <h3 className="footer-title">Colecciones</h3>
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
              <h3 className="footer-title">Atención Directa</h3>
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

            <div style={{ marginTop: '0.85rem' }}>
              <button 
                type="button" 
                className="footer-claims-btn"
                onClick={() => setShowClaimsModal(true)}
                title="Libro de Reclamaciones Virtual - Conforme a Ley N° 29571 e INDECOPI"
              >
                <BookClaimsGoldIcon size={18} color="#C59B27" />
                <span>Libro de Reclamaciones Virtual (INDECOPI)</span>
              </button>
            </div>

            <p style={{ marginTop: '0.65rem', color: '#8C857B', fontSize: '0.8rem' }}>Rouss By Jharol Baldeón · Chorrillos, Lima</p>
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

      {/* LIBRO DE RECLAMACIONES VIRTUAL (LEY N° 29571 / INDECOPI) */}
      <LibroReclamacionesModal 
        isOpen={showClaimsModal} 
        onClose={() => setShowClaimsModal(false)} 
      />

    </div>
  )
}
