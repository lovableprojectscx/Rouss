import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from '../App'

describe('Florería Rouss - Catálogo & Componentes', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    window.location.hash = ''
    window.history.pushState({}, '', '/')
  })

  it('renders home page and header correctly', () => {
    render(<App />)
    expect(screen.getByAltText('Florería Rouss Logo')).toBeInTheDocument()
    expect(screen.getAllByText('Catálogo Exclusivo')[0]).toBeInTheDocument()
  })

  it('navigates to catalog page when clicking catalog nav button', async () => {
    render(<App />)
    const catalogBtns = screen.getAllByRole('button', { name: 'Catálogo Exclusivo' })
    fireEvent.click(catalogBtns[0])

    expect(screen.getByText('Colección Exclusiva Rouss')).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Buscar arreglo/i)).toBeInTheDocument()
  })

  it('displays official WhatsApp products from all tandas including Tulipanes with exact prices', async () => {
    render(<App />)
    const catalogBtns = screen.getAllByRole('button', { name: 'Catálogo Exclusivo' })
    fireEvent.click(catalogBtns[0])

    // Tanda 1
    expect(screen.getByText(/Ramo Buchón "Sol Radiante"/i)).toBeInTheDocument()
    expect(screen.getAllByText('S/ 180.00').length).toBeGreaterThanOrEqual(1)

    // Tanda 2
    expect(screen.getByText(/Cucurucho Pasión 8 Rosas Rojas/i)).toBeInTheDocument()
    expect(screen.getAllByText('S/ 80.00').length).toBeGreaterThanOrEqual(1)

    // Tanda 3
    expect(screen.getByText(/Ramo Princesa 2 Gerberas & Follaje Rosa/i)).toBeInTheDocument()
    expect(screen.getAllByText('S/ 85.00').length).toBeGreaterThanOrEqual(1)

    // Tanda 4 (Tulipanes)
    expect(screen.getByText(/Maxi Bouquet Imperial 12 Tulipanes Rosa/i)).toBeInTheDocument()
    expect(screen.getAllByText('S/ 350.00').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText(/Bouquet Alta Costura 6 Tulipanes Rojos/i)).toBeInTheDocument()
    expect(screen.getAllByText('S/ 190.00').length).toBeGreaterThanOrEqual(1)
  })

  it('filters products accurately when typing in search input for Tulipanes', async () => {
    render(<App />)
    const catalogBtns = screen.getAllByRole('button', { name: 'Catálogo Exclusivo' })
    fireEvent.click(catalogBtns[0])

    const searchInput = screen.getByPlaceholderText(/Buscar arreglo/i)
    fireEvent.change(searchInput, { target: { value: 'Tulipanes' } })

    expect(screen.getByText(/Maxi Bouquet Imperial 12 Tulipanes Rosa/i)).toBeInTheDocument()
  })

  it('opens WhatsApp with official number +51 941 493 471 when clicking order button', async () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => {})
    render(<App />)
    const catalogBtns = screen.getAllByRole('button', { name: 'Catálogo Exclusivo' })
    fireEvent.click(catalogBtns[0])

    const orderButtons = screen.getAllByRole('button', { name: /Pedir por WhatsApp/i })
    fireEvent.click(orderButtons[0])

    expect(openSpy).toHaveBeenCalled()
    const callUrl = openSpy.mock.calls[0][0]
    expect(callUrl).toContain('51941493471')
    expect(callUrl).toContain('wa.me')
  })

  it('opens product modal and allows sharing product link', async () => {
    render(<App />)
    const catalogBtns = screen.getAllByRole('button', { name: 'Catálogo Exclusivo' })
    fireEvent.click(catalogBtns[0])

    const productImg = screen.getByAltText(/Ramo Buchón "Sol Radiante"/i)
    fireEvent.click(productImg)

    expect(screen.getAllByText(/Ramos Buchones & Girasoles/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByRole('button', { name: /Compartir/i }).length).toBeGreaterThanOrEqual(1)
  })

  it('navigates to catalog with pre-selected category filter when clicking on feature card buttons', async () => {
    render(<App />)
    const tulipanesBtn = screen.getByRole('button', { name: /Ver Tulipanes/i })
    fireEvent.click(tulipanesBtn)

    expect(screen.getByText('Colección Exclusiva Rouss')).toBeInTheDocument()
    expect(screen.getByText(/Maxi Bouquet Imperial 12 Tulipanes Rosa/i)).toBeInTheDocument()
    expect(window.location.search).toContain('categoria=tulipanes')
  })

  it('updates browser URL to /catalogo?categoria=rosas when clicking Rosas filter pill', async () => {
    render(<App />)
    const catalogBtns = screen.getAllByRole('button', { name: 'Catálogo Exclusivo' })
    fireEvent.click(catalogBtns[0])

    const rosasPill = screen.getByRole('button', { name: 'Rosas' })
    fireEvent.click(rosasPill)

    expect(window.location.search).toContain('categoria=rosas')
  })

  it('opens Libro de Reclamaciones Virtual modal from footer with INDECOPI legal form', async () => {
    render(<App />)
    const claimsBtns = screen.getAllByRole('button', { name: /Libro de Reclamaciones/i })
    fireEvent.click(claimsBtns[0])

    expect(screen.getAllByText(/Libro de Reclamaciones Virtual/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/Ley N° 29571/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText(/Identificación del Consumidor Reclamante/i)).toBeInTheDocument()
    expect(screen.getByText(/Identificación del Bien Contratado/i)).toBeInTheDocument()
    expect(screen.getByText(/Detalle de la Reclamación y Pedido/i)).toBeInTheDocument()
  })

  it('sanitizeCategory cleans malformed category URLs with brackets or punctuation', async () => {
    const { sanitizeCategory } = await import('../App')
    expect(sanitizeCategory('rosas>')).toBe('rosas')
    expect(sanitizeCategory('tulipanes/')).toBe('tulipanes')
    expect(sanitizeCategory('buchon')).toBe('buchones')
    expect(sanitizeCategory('rosa')).toBe('rosas')
    expect(sanitizeCategory('invalido123')).toBe('todos')
    expect(sanitizeCategory(null)).toBe('todos')
  })
})
