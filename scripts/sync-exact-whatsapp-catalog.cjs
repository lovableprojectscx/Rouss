const { createClient } = require('@supabase/supabase-js');
const client = createClient(
  'https://llasbukvdjlvwlgofgke.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsYXNidWt2ZGpsdndsZ29mZ2tlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3MzkyMjUsImV4cCI6MjA5MTMxNTIyNX0.s9Ze3b2u25CJP1psY_ycAdm68RVIX02IR-eQl0_FJTY'
);

const TENANT_ID = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';

// Exact WhatsApp Catalog Mappings strictly extracted from client screenshots
const EXACT_WHATSAPP_PRODUCTS = [
  // Tanda 1 (14)
  {
    id: 'ba000001-0000-4000-a000-000000000011',
    title: '12 Girasoles',
    price: 180,
    badge: '12 Girasoles',
    description: 'Ramo de 12 girasoles frescos seleccionados con envoltura en papel coreano negro y cinta satinada.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000012',
    title: '50 Rosas y 3 Globos con Helio',
    price: 300,
    badge: '50 Rosas + Helio',
    description: 'Ramo de 50 rosas rojas acompañado de 3 globos con helio y lazo decorativo.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000013',
    title: '80 Rosas más 6 Girasoles',
    price: 450,
    badge: '80 Rosas + 6 Girasoles',
    description: 'Maxi ramo de 80 rosas rojas con 6 girasoles centrales en papel coreano plisado.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000014',
    title: '80 Rosas',
    price: 400,
    badge: '80 Rosas',
    description: 'Ramo buchón de 80 rosas rojas seleccionadas con mariposas doradas decorativas.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000015',
    title: '4 Lirios y Papel Coreano',
    price: 150,
    badge: '4 Lirios',
    description: 'Bouquet de 4 lirios blancos con abundante papel coreano y follaje fino.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000016',
    title: '12 Rosas más Astromelias',
    price: 160,
    badge: '12 Rosas + Astromelias',
    description: 'Bouquet de 12 rosas rojas combinadas con astromelias frescas y envoltura marfil.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000017',
    title: '50 Rosas con Billetes (Opcional)',
    price: 250,
    badge: '50 Rosas',
    description: 'Ramo de 50 rosas rojas. Billetes opcionales proporcionados por el cliente (+S/ 10 por colocación).'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000018',
    title: '40 Rosas con Mariposas',
    price: 200,
    badge: '40 Rosas',
    description: 'Ramo de 40 rosas rojas decorado con mariposas doradas y envoltura marfil.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000019',
    title: '20 Rosas + Peluche + 1 Lirio',
    price: 230,
    badge: 'Combo Peluche',
    description: 'Combo especial de 20 rosas rosadas con peluche de oso y 1 lirio oriental.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000020',
    title: '20 Rosas con Esponja Absorbente',
    price: 150,
    badge: '20 Rosas Hidratadas',
    description: 'Arreglo de 20 rosas rojas con esponja absorbente de agua para máxima conservación.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000021',
    title: '30 Rosas Ramo',
    price: 170,
    badge: '30 Rosas',
    description: 'Ramo de 30 rosas rojas en envoltura negra coreana con lazo satinado.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000022',
    title: '50 Rosas más Corona',
    price: 300,
    badge: 'Corona 👑',
    description: 'Ramo de 50 rosas rojas con corona de cumpleaños dorada y cinta personalizada.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000023',
    title: '15 Rosas con Esponja Absorbente',
    price: 100,
    badge: '15 Rosas',
    description: 'Ramo cónico de 15 rosas rojas con esponja absorbente de agua para mayor frescura.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000024',
    title: '3 Lirios más Rosas',
    price: 160,
    badge: '3 Lirios + Rosas',
    description: 'Bouquet de 3 lirios orientales rosados acompañados de rosas en envoltura marfil.'
  },

  // Tanda 2 (15)
  {
    id: 'ba000001-0000-4000-a000-000000000031',
    title: '8 Rosas Cucurucho',
    price: 80,
    badge: '8 Rosas',
    description: 'Cucurucho negro con 8 rosas rojas seleccionadas y detalles en flor blanca.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000032',
    title: '12 Rosas Rosa Pastel',
    price: 90,
    badge: '12 Rosas',
    description: 'Bouquet de 12 rosas en tono rosa pastel con envoltura translúcida y cinta.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000033',
    title: 'Ramo Primavera',
    price: 90,
    badge: 'Primavera',
    description: 'Ramo primaveral multicolor con rosas, flores variadas y papel de diseñador.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000034',
    title: '4 Rosas más Astromelias',
    price: 55,
    badge: '4 Rosas',
    description: 'Mini bouquet de 4 rosas rojas con astromelias blancas y cono marfil.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000035',
    title: '5 Rosas más 1 Anturio',
    price: 85,
    badge: '5 Rosas + Anturio',
    description: 'Arreglo de 5 rosas pastel con 1 anturio rosado y envoltura suave.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000036',
    title: '20 Rosas más 2 Anturios',
    price: 190,
    badge: '20 Rosas + 2 Anturios',
    description: 'Ramo de 20 rosas blush con 2 anturios en papel coreano rosado.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000037',
    title: '12 Rosas Rojas',
    price: 80,
    badge: '12 Rosas',
    description: 'Ramo de 12 rosas rojas envueltas en papel coreano con baby breath.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000038',
    title: '1 Lirio más Astromelias',
    price: 55,
    badge: '1 Lirio',
    description: 'Mini bouquet de 1 lirio oriental rosado con astromelias amarillas y follaje.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000039',
    title: '8 Claveles Importados',
    price: 90,
    badge: '8 Claveles',
    description: 'Ramo de 8 claveles importados en papel negro de alta textura con cinta.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000040',
    title: '1 Orquídea más Ruscus y Estrellitas de Belén',
    price: 150,
    badge: 'Orquídea',
    description: 'Arreglo exclusivo de 1 vara de orquídea blanca con ruscus y estrellitas de Belén.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000041',
    title: '6 Girasoles más Margaritas',
    price: 80,
    badge: '6 Girasoles',
    description: 'Bouquet de 6 girasoles frescos con margaritas silvestres y envoltura de gala.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000042',
    title: 'Bouquet Silvestre Romance',
    price: 65,
    badge: 'Silvestre',
    description: 'Bouquet silvestre de flores variadas en tono pastel con envoltorio decorativo.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000043',
    title: 'Ramo Box Girasoles & Rosas',
    price: 100,
    badge: 'Ramo Box',
    description: 'Arreglo en caja floral con girasoles, rosas rojas y lazo decorativo.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000044',
    title: '1 Lirio más Conejitos',
    price: 120,
    badge: '1 Lirio + Conejitos',
    description: 'Bouquet con 1 lirio rosado, conejitos y flores finas en papel marfil.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000045',
    title: '12 Rosas + Corona de Cristal',
    price: 200,
    badge: 'Corona de Cristal',
    description: 'Ramo de 12 rosas durazno con tiara/corona de cristal brillante y cinta personalizada.'
  },

  // Tanda 3 (15)
  {
    id: 'ba000001-0000-4000-a000-000000000051',
    title: '2 Gerberas Ramo Princesa',
    price: 85,
    badge: '2 Gerberas',
    description: 'Ramo de 2 gerberas rosadas con follaje fino y papel coreano rosa.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000052',
    title: '1 Lirio más 3 Rosas Lilas',
    price: 55,
    badge: '1 Lirio + 3 Rosas',
    description: 'Arreglo de 1 lirio oriental con 3 rosas lilas en envoltura marfil.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000053',
    title: '1 Lirio más 3 Rosas Silvestre',
    price: 65,
    badge: '1 Lirio + 3 Rosas',
    description: 'Bouquet de 1 lirio rosado con 3 rosas y follaje silvestre.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000054',
    title: '2 Lirios',
    price: 80,
    badge: '2 Lirios',
    description: 'Bouquet de 2 varas de lirios orientales con gypsophila y envoltura amarilla.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000055',
    title: '6 Rosas + 4 Girasoles',
    price: 90,
    badge: '6 Rosas + 4 Girasoles',
    description: 'Combinación de 6 rosas con 4 girasoles y follaje de eucalipto.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000056',
    title: '2 Lirios + 10 Rosas + Claveles',
    price: 160,
    badge: '2 Lirios + 10 Rosas',
    description: 'Estructura geométrica con 2 lirios, 10 rosas y claveles en marco moderno.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000057',
    title: '1 Lirio más 3 Rosas',
    price: 70,
    badge: '1 Lirio + 3 Rosas',
    description: 'Bouquet de 1 lirio rosado con 3 rosas en papel coreano marfil.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000058',
    title: '8 Rosas Elegance',
    price: 100,
    badge: '8 Rosas',
    description: 'Bouquet de 8 rosas en tono pastel con lazo de satén.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000059',
    title: '8 Rosas Rojas',
    price: 80,
    badge: '8 Rosas',
    description: 'Ramo de 8 rosas rojas en papel coreano negro con cinta.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000060',
    title: '1 Lirio más 3 Rosas',
    price: 75,
    badge: '1 Lirio + 3 Rosas',
    description: 'Bouquet de 1 lirio oriental con 3 rosas en papel coreano.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000061',
    title: '1 Lirio Rústico',
    price: 60,
    badge: '1 Lirio',
    description: 'Arreglo rústico de 1 lirio con follaje verde y papel madera.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000062',
    title: '12 Rosas Blush & Lirios',
    price: 180,
    badge: '12 Rosas + Lirios',
    description: 'Ramo de 12 rosas blush con lirios y envoltura marfil.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000063',
    title: '6 Rosas Azules',
    price: 70,
    badge: '6 Rosas Azules',
    description: 'Bouquet de 6 rosas azules en papel coreano con detalles plateados.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000064',
    title: '6 Rosas más Astromelias',
    price: 65,
    badge: '6 Rosas + Astromelias',
    description: 'Ramo de 6 rosas amarillas con astromelias y papel translúcido.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000065',
    title: '1 Lirio más Astromelias',
    price: 70,
    badge: '1 Lirio + Astromelias',
    description: 'Bouquet de 1 lirio rosado con astromelias y follaje en papel marfil.'
  },

  // Tanda 4: Cajas, Lirios y Tulipanes (12)
  {
    id: 'ba000001-0000-4000-a000-000000000071',
    title: '2 Lirios sin Chocolate',
    price: 90,
    badge: '2 Lirios',
    description: 'Arreglo de 2 varas de lirios con follaje y envoltura festiva.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000072',
    title: 'Ramo Box 7 Rosas',
    price: 110,
    badge: 'Ramo Box',
    description: 'Caja floral de madera con 7 rosas rojas y lirio silvestre.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000073',
    title: '12 Tulipanes Rosados',
    price: 350,
    badge: '12 Tulipanes',
    description: 'Ramo de 12 tulipanes frescos en tono rosa suave con papel coreano plisado.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000074',
    title: '6 Tulipanes Rojos',
    price: 130, // ¡Corregido exactamente a 130 según chat WhatsApp!
    badge: '6 Tulipanes',
    description: 'Ramo alargado de 6 tulipanes rojos frescos en envoltura blanca y lazo de gala.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000075',
    title: '5 Tulipanes Rosados',
    price: 160,
    badge: '5 Tulipanes',
    description: 'Bouquet cónico de 5 tulipanes rosados frescos en papel coreano blanco.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000076',
    title: '3 Tulipanes Amarillos con Margaritas',
    price: 85,
    badge: '3 Tulipanes',
    description: 'Bouquet de 3 tulipanes amarillos con margaritas silvestres y papel de diseñador.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000077',
    title: '6 Tulipanes Rosados',
    price: 200,
    badge: '6 Tulipanes',
    description: 'Bouquet de 6 tulipanes rosados en papel coreano bicolor negro y blanco.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000078',
    title: '6 Tulipanes Rosados (Gold)',
    price: 200,
    badge: '6 Tulipanes',
    description: 'Ramo de 6 tulipanes rosados envuelto en papel dorado champagne y lazo satinado.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000079',
    title: '12 Tulipanes Rojos',
    price: 270,
    badge: '12 Tulipanes',
    description: 'Ramo de 12 tulipanes rojos con nube de gypsophila en envoltura de alta densidad.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000080',
    title: '10 Tulipanes Bicolores',
    price: 280,
    badge: '10 Tulipanes',
    description: 'Ramo de 10 tulipanes en degradé rojo y rosa con lazo de seda en tono plata.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000081',
    title: '3 Tulipanes Blancos',
    price: 120,
    badge: '3 Tulipanes',
    description: 'Fusión de 3 tulipanes blancos puros con margaritas silvestres y envoltura de gala.'
  },
  {
    id: 'ba000001-0000-4000-a000-000000000082',
    title: '8 Tulipanes Morados',
    price: 200,
    badge: '8 Tulipanes',
    description: 'Ramo de 8 tulipanes morados en envoltura rosa con lazo de satén.'
  }
];

async function syncCatalog() {
  console.log(`Starting exact WhatsApp synchronization for ${EXACT_WHATSAPP_PRODUCTS.length} products...`);
  
  for (const item of EXACT_WHATSAPP_PRODUCTS) {
    const { error } = await client
      .from('products')
      .update({
        title: item.title,
        price: item.price,
        precio_base: item.price,
        badge: item.badge,
        description: item.description
      })
      .eq('id', item.id)
      .eq('tenant_id', TENANT_ID);

    if (error) {
      console.error(`Error updating product ${item.id}:`, error);
    } else {
      console.log(`✓ [${item.id}] -> "${item.title}" (S/ ${item.price})`);
    }
  }

  console.log('\n--- Sync Complete ---');
}

syncCatalog();
