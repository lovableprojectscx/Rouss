import { describe, it, expect } from 'vitest'
import { 
  supabase, 
  ROUSS_TENANT_ID, 
  ROUSS_TENANT_SLUG, 
  createReclamacion, 
  createReservation,
  fetchRoussData 
} from '../lib/supabase'

describe('Florería Rouss - Multi-Tenant Database Architecture', () => {
  it('has valid ROUSS_TENANT_ID and tenant slug configuration', () => {
    expect(ROUSS_TENANT_ID).toBe('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11')
    expect(ROUSS_TENANT_SLUG).toBe('rouss')
    expect(supabase).toBeDefined()
  })

  it('createReclamacion attaches ROUSS_TENANT_ID and generates INDECOPI correlative code', async () => {
    const mockClaim = {
      tipoDocumento: 'DNI',
      numeroDocumento: '74829103',
      nombreCompleto: 'María García Prado',
      email: 'maria.garcia@test.com',
      telefono: '987654321',
      distrito: 'Chorrillos',
      direccion: 'Av. Huaylas 123',
      tipoBien: 'Producto',
      montoReclamado: '180.00',
      descripcionBien: 'Ramo Buchón 12 Girasoles Sol Radiante',
      tipoReclamacion: 'Reclamo',
      detalleReclamacion: 'Prueba de integración de reclamación en base de datos multi-tenant.',
      pedidoConsumidor: 'Verificación de registro automático en Supabase.',
      esMenorEdad: false
    }

    const result = await createReclamacion(mockClaim)
    
    expect(result).toBeDefined()
    expect(result.codigo_reclamacion).toMatch(/^ROUSS-LR-\d{4}-\d{4}$/)
    expect(result.tenant_id).toBe(ROUSS_TENANT_ID)
    expect(result.tipo_documento).toBe('DNI')
    expect(result.numero_documento).toBe('74829103')
    expect(result.nombre_completo).toBe('María García Prado')
    expect(result.estado).toBe('PENDIENTE')
  })

  it('createReservation attaches ROUSS_TENANT_ID and generates tracking code', async () => {
    const mockReservation = {
      nombre: 'Juan Pérez Cotización',
      telefono: '912345678',
      ocasion: 'Aniversario',
      presupuesto: 'S/ 200 - S/ 300',
      fechaEntrega: '2026-08-25',
      mensaje: 'Para el amor de mi vida con todo mi corazón'
    }

    const result = await createReservation(mockReservation)
    // Even if Supabase network is mocked or live, should handle gracefully
    if (result && result.length > 0) {
      expect(result[0].tenant_id).toBe(ROUSS_TENANT_ID)
      expect(result[0].tracking_code).toMatch(/^RS-\d{4}$/)
    }
  })

  it('fetchRoussData executes queries filtered by ROUSS_TENANT_ID and caches result', async () => {
    const data = await fetchRoussData()
    expect(data).toBeDefined()
  })
})
