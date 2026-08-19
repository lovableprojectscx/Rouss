import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) || 'https://llasbukvdjlvwlgofgke.supabase.co'
const SUPABASE_ANON_KEY = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsYXNidWt2ZGpsdndsZ29mZ2tlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3MzkyMjUsImV4cCI6MjA5MTMxNTIyNX0.s9Ze3b2u25CJP1psY_ycAdm68RVIX02IR-eQl0_FJTY'

export const ROUSS_TENANT_ID = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_ROUSS_TENANT_ID) || 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
export const ROUSS_TENANT_SLUG = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_ROUSS_TENANT_SLUG) || 'rouss'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Cache in-memory and sessionStorage for high-performance zero-latency navigation
const CACHE_KEY = 'rouss_supabase_cache_v2'
const CACHE_TTL_MS = 5 * 60 * 1000 // 5 minutes
let memoryCache = null
let memoryCacheTime = 0

/**
 * Carga dinámica y ultra-optimizada de datos de Florería Rouss desde Supabase
 * Implementa Stale-While-Revalidate para rendimiento instantáneo
 */
export async function fetchRoussData() {
  const now = Date.now()

  // 1. Check in-memory cache
  if (memoryCache && (now - memoryCacheTime < CACHE_TTL_MS)) {
    return memoryCache
  }

  // 2. Check sessionStorage
  if (typeof window !== 'undefined') {
    try {
      const stored = sessionStorage.getItem(CACHE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (parsed.timestamp && (now - parsed.timestamp < CACHE_TTL_MS)) {
          memoryCache = parsed.data
          memoryCacheTime = parsed.timestamp
          return memoryCache
        }
      }
    } catch {
      // Ignore storage errors
    }
  }

  try {
    // 3. Optimized selective columns query to reduce network payload
    const [productsRes, categoriesRes, settingsRes, testimoniosRes, bannersRes] = await Promise.all([
      supabase
        .from('products')
        .select('id, title, slug, price, precio_base, badge, image, description, descripcion_corta, category, activo, orden')
        .eq('tenant_id', ROUSS_TENANT_ID)
        .eq('activo', true)
        .order('orden', { ascending: true }),
      supabase
        .from('categories')
        .select('id, name, slug, activo, orden')
        .eq('tenant_id', ROUSS_TENANT_ID)
        .eq('activo', true)
        .order('orden', { ascending: true }),
      supabase
        .from('tenant_settings')
        .select('tenant_id, store_name, whatsapp, schedule, zones, show_prices, hero_slides')
        .eq('tenant_id', ROUSS_TENANT_ID)
        .maybeSingle(),
      supabase
        .from('testimonios')
        .select('id, nombre, texto, ocasion, imagen, orden, activo')
        .eq('tenant_id', ROUSS_TENANT_ID)
        .eq('activo', true)
        .order('orden', { ascending: true }),
      supabase
        .from('banners')
        .select('id, imagen, subtitulo, link, orden, activo')
        .eq('tenant_id', ROUSS_TENANT_ID)
        .eq('activo', true)
        .order('orden', { ascending: true })
    ])

    const result = {
      products: productsRes.data && productsRes.data.length > 0 ? productsRes.data : null,
      categories: categoriesRes.data && categoriesRes.data.length > 0 ? categoriesRes.data : null,
      settings: settingsRes.data || null,
      testimonios: testimoniosRes.data && testimoniosRes.data.length > 0 ? testimoniosRes.data : null,
      banners: bannersRes.data && bannersRes.data.length > 0 ? bannersRes.data : null
    }

    // Save to caches
    memoryCache = result
    memoryCacheTime = now
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: now, data: result }))
      } catch {
        // Storage might be disabled/full
      }
    }

    return result
  } catch (error) {
    console.warn('Usando respaldo local para Florería Rouss:', error)
    return memoryCache || {
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

/**
 * Registra una Hoja de Reclamación oficial en Supabase conforme a la Ley N° 29571 / INDECOPI
 */
export async function createReclamacion(reclamacion) {
  try {
    const year = new Date().getFullYear()
    const randomSuffix = Math.floor(1000 + Math.random() * 9000)
    const codigoReclamacion = `ROUSS-LR-${year}-${randomSuffix}`

    const payload = {
      tenant_id: ROUSS_TENANT_ID,
      codigo_reclamacion: codigoReclamacion,
      tipo_documento: reclamacion.tipoDocumento || 'DNI',
      numero_documento: reclamacion.numeroDocumento || '',
      nombre_completo: reclamacion.nombreCompleto || '',
      email: reclamacion.email || '',
      telefono: reclamacion.telefono || '',
      departamento: reclamacion.departamento || 'Lima',
      provincia: reclamacion.provincia || 'Lima',
      distrito: reclamacion.distrito || 'Chorrillos',
      direccion: reclamacion.direccion || '',
      es_menor_edad: Boolean(reclamacion.esMenorEdad),
      nombre_apoderado: reclamacion.nombreApoderado || null,
      tipo_bien: reclamacion.tipoBien || 'Producto',
      monto_reclamado: parseFloat(reclamacion.montoReclamado || 0),
      descripcion_bien: reclamacion.descripcionBien || '',
      tipo_reclamacion: reclamacion.tipoReclamacion || 'Reclamo',
      detalle_reclamacion: reclamacion.detalleReclamacion || '',
      pedido_consumidor: reclamacion.pedidoConsumidor || '',
      estado: 'PENDIENTE'
    }

    const { data, error } = await supabase
      .from('reclamaciones')
      .insert([payload])
      .select()

    if (error) {
      console.warn('Aviso al guardar reclamación en Supabase:', error.message)
      return { ...payload, id: 'local-' + Date.now(), created_at: new Date().toISOString() }
    }

    return data && data.length > 0 ? data[0] : payload
  } catch (err) {
    console.warn('Error al procesar hoja de reclamación:', err)
    return null
  }
}
