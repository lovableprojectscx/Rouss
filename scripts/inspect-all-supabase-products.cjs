const { createClient } = require('@supabase/supabase-js');
const client = createClient(
  'https://llasbukvdjlvwlgofgke.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsYXNidWt2ZGpsdndsZ29mZ2tlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3MzkyMjUsImV4cCI6MjA5MTMxNTIyNX0.s9Ze3b2u25CJP1psY_ycAdm68RVIX02IR-eQl0_FJTY'
);

async function inspect() {
  const { data, error } = await client
    .from('products')
    .select('id, title, price, image, slug, activo, orden')
    .eq('tenant_id', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11')
    .eq('activo', true)
    .order('orden', { ascending: true });

  if (error) {
    console.error(error);
    return;
  }

  console.log('Total ACTIVE products:', data.length);
  for (let i = 0; i < data.length; i++) {
    const p = data[i];
    console.log((i + 1) + '. [' + p.id + '] "' + p.title + '" | S/ ' + p.price + ' | ' + p.image);
  }
}

inspect();
