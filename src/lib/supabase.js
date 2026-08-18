import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://llasbukvdjlvwlgofgke.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsYXNidWt2ZGpsdndsZ29mZ2tlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3MzkyMjUsImV4cCI6MjA5MTMxNTIyNX0.s9Ze3b2u25CJP1psY_ycAdm68RVIX02IR-eQl0_FJTY'

export const ROUSS_TENANT_ID = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
export const ROUSS_TENANT_SLUG = 'rouss'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

/**
 * Carga dinámica de datos de Florería Rouss desde Supabase (mypes)
 */
export async function fetchRoussData() {
  try {
    const [productsRes, categoriesRes, settingsRes, testimoniosRes, bannersRes] = await Promise.all([
      supabase
        .from('products')
        .select('*')
        .eq('tenant_id', ROUSS_TENANT_ID)
        .eq('activo', true)
        .order('orden', { ascending: true }),
      supabase
        .from('categories')
        .select('*')
        .eq('tenant_id', ROUSS_TENANT_ID)
        .eq('activo', true)
        .order('orden', { ascending: true }),
      supabase
        .from('tenant_settings')
        .select('*')
        .eq('tenant_id', ROUSS_TENANT_ID)
        .maybeSingle(),
      supabase
        .from('testimonios')
        .select('*')
        .eq('tenant_id', ROUSS_TENANT_ID)
        .eq('activo', true)
        .order('orden', { ascending: true }),
      supabase
        .from('banners')
        .select('*')
        .eq('tenant_id', ROUSS_TENANT_ID)
        .eq('activo', true)
        .order('orden', { ascending: true })
    ])

    return {
      products: productsRes.data && productsRes.data.length > 0 ? productsRes.data : null,
      categories: categoriesRes.data && categoriesRes.data.length > 0 ? categoriesRes.data : null,
      settings: settingsRes.data || null,
      testimonios: testimoniosRes.data && testimoniosRes.data.length > 0 ? testimoniosRes.data : null,
      banners: bannersRes.data && bannersRes.data.length > 0 ? bannersRes.data : null
    }
  } catch (error) {
    console.warn('Usando respaldo local para Florería Rouss:', error)
    return {
      products: null,
      categories: null,
      settings: null,
      testimonios: null,
      banners: null
    }
  }
}

/**
 * Registra una cotización/reserva en Supabase antes de redirigir a WhatsApp
 */
export async function createReservation({ nombre, telefono, ocasion, presupuesto, fechaEntrega, mensaje }) {
  try {
    const trackingCode = `RS-${Math.floor(1000 + Math.random() * 9000)}`
    
    const { data, error } = await supabase
      .from('reservations')
      .insert([
        {
          tenant_id: ROUSS_TENANT_ID,
          name: nombre || 'Cliente Rouss',
          phone: telefono || '',
          notes: `Ocasión: ${ocasion} | Presupuesto: ${presupuesto}`,
          message: mensaje || '',
          delivery_date: fechaEntrega || '',
          tracking_code: trackingCode,
          status: 'pendiente',
          payment_method: 'WhatsApp',
          dedication: mensaje || ''
        }
      ])
      .select()

    if (error) {
      console.warn('Aviso al guardar cotización en Supabase:', error.message)
    }
    return data
  } catch (err) {
    console.warn('Error al guardar reserva:', err)
    return null
  }
}
