const { createClient } = require('@supabase/supabase-js');
const client = createClient(
  'https://llasbukvdjlvwlgofgke.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsYXNidWt2ZGpsdndsZ29mZ2tlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3MzkyMjUsImV4cCI6MjA5MTMxNTIyNX0.s9Ze3b2u25CJP1psY_ycAdm68RVIX02IR-eQl0_FJTY'
);

const TENANT_ID = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';

async function fixProducts() {
  console.log('--- 1. Eliminating 5 old placeholder products ---');
  const oldPlaceholderIds = [
    'ba000001-0000-4000-a000-000000000001',
    'ba000001-0000-4000-a000-000000000002',
    'ba000001-0000-4000-a000-000000000003',
    'ba000001-0000-4000-a000-000000000004',
    'ba000001-0000-4000-a000-000000000005'
  ];

  const { error: delError } = await client
    .from('products')
    .delete()
    .eq('tenant_id', TENANT_ID)
    .in('id', oldPlaceholderIds);

  if (delError) {
    console.error('Delete error:', delError);
  } else {
    console.log('✓ Successfully deleted 5 old template placeholder products.');
  }

  console.log('\n--- 2. Updating titles & cleaning "Imperial" in Supabase ---');
  const updates = [
    {
      id: 'ba000001-0000-4000-a000-000000000022',
      title: '50 Rosas más Corona',
      price: 300,
      precio_base: 300,
      badge: 'Corona 👑',
      slug: '50-rosas-mas-corona'
    },
    {
      id: 'ba000001-0000-4000-a000-000000000021',
      title: '30 Rosas Ramo',
      price: 170,
      precio_base: 170,
      badge: '30 Rosas',
      slug: '30-rosas-ramo'
    },
    {
      id: 'ba000001-0000-4000-a000-000000000012',
      title: 'Ramo Buchón 50 Rosas & Globos de Helio',
      price: 300,
      precio_base: 300,
      badge: '50 Rosas + Helio',
      slug: 'ramo-buchon-50-rosas-globos-helio'
    },
    {
      id: 'ba000001-0000-4000-a000-000000000014',
      title: 'Ramo Buchón 80 Rosas',
      price: 400,
      precio_base: 400,
      badge: '80 Rosas',
      slug: 'ramo-buchon-80-rosas'
    },
    {
      id: 'ba000001-0000-4000-a000-000000000015',
      title: 'Bouquet de Lirios Blancos',
      price: 150,
      precio_base: 150,
      badge: 'Lirios Blancos',
      slug: 'bouquet-lirios-blancos'
    },
    {
      id: 'ba000001-0000-4000-a000-000000000036',
      title: 'Bouquet 20 Rosas & Doble Anturio',
      price: 190,
      precio_base: 190,
      badge: '20 Rosas',
      slug: 'bouquet-20-rosas-doble-anturio'
    },
    {
      id: 'ba000001-0000-4000-a000-000000000054',
      title: 'Bouquet Dúo de Lirios Orientales',
      price: 80,
      precio_base: 80,
      badge: 'Lirios Orientales',
      slug: 'bouquet-duo-lirios-orientales'
    },
    {
      id: 'ba000001-0000-4000-a000-000000000073',
      title: 'Maxi Bouquet 12 Tulipanes Rosados',
      price: 350,
      precio_base: 350,
      badge: '12 Tulipanes',
      slug: 'maxi-bouquet-12-tulipanes-rosados'
    },
    {
      id: 'ba000001-0000-4000-a000-000000000080',
      title: 'Bouquet 10 Tulipanes Bicolores Rojo & Rosa',
      price: 280,
      precio_base: 280,
      badge: '10 Tulipanes',
      slug: 'bouquet-10-tulipanes-bicolores'
    },
    {
      id: 'ba000001-0000-4000-a000-000000000082',
      title: 'Bouquet 8 Tulipanes Púrpura',
      price: 200,
      precio_base: 200,
      badge: '8 Tulipanes',
      slug: 'bouquet-8-tulipanes-purpura'
    }
  ];

  for (const u of updates) {
    const { error: upError } = await client
      .from('products')
      .update({
        title: u.title,
        price: u.price,
        precio_base: u.precio_base,
        badge: u.badge,
        slug: u.slug
      })
      .eq('id', u.id)
      .eq('tenant_id', TENANT_ID);

    if (upError) {
      console.error(`Error updating product ${u.id}:`, upError);
    } else {
      console.log(`✓ Updated [${u.id}] -> "${u.title}" (S/ ${u.price})`);
    }
  }

  console.log('\n--- 3. Verifying updated catalog in Supabase ---');
  const { data: finalProducts } = await client
    .from('products')
    .select('id, title, price, image')
    .eq('tenant_id', TENANT_ID)
    .order('orden', { ascending: true });

  console.log(`Total active products in Supabase: ${finalProducts.length}`);
  finalProducts.forEach((p, idx) => {
    console.log(`${idx + 1}. "${p.title}" | S/ ${p.price}`);
  });
}

fixProducts();
