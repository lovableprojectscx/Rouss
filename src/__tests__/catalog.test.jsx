import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from '../App'

describe('Florería Rouss - Catálogo & Componentes', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    window.location.hash = ''
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

    expect(screen.getByText('Colección Imperial Rouss')).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Buscar arreglo/i)).toBeInTheDocument()
  })

  it('displays official WhatsApp products from Tanda 1, Tanda 2, and Tanda 3 with exact prices', async () => {
    render(<App />)
    const catalogBtns = screen.getAllByRole('button', { name: 'Catálogo Exclusivo' })
    fireEvent.click(catalogBtns[0])

    // Tanda 1 Products
    expect(screen.getByText(/Ramo Buchón "Sol Radiante"/i)).toBeInTheDocument()
    expect(screen.getAllByText('S/ 180.00').length).toBeGreaterThanOrEqual(1)

    // Tanda 2 Products
    expect(screen.getByText(/Cucurucho Pasión 8 Rosas Rojas/i)).toBeInTheDocument()
    expect(screen.getAllByText('S/ 80.00').length).toBeGreaterThanOrEqual(1)

    // Tanda 3 Products
    expect(screen.getByText(/Ramo Princesa 2 Gerberas & Follaje Rosa/i)).toBeInTheDocument()
    expect(screen.getAllByText('S/ 85.00').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByText(/Estructura Geométrica 2 Lirios, 10 Rosas & Claveles/i)).toBeInTheDocument()
    expect(screen.getAllByText('S/ 160.00').length).toBeGreaterThanOrEqual(1)
  })

  it('filters products accurately when typing in search input for Tanda 3 items', async () => {
    render(<App />)
    const catalogBtns = screen.getAllByRole('button', { name: 'Catálogo Exclusivo' })
    fireEvent.click(catalogBtns[0])

    const searchInput = screen.getByPlaceholderText(/Buscar arreglo/i)
    fireEvent.change(searchInput, { target: { value: 'Gerberas' } })

    expect(screen.getByText(/Ramo Princesa 2 Gerberas & Follaje Rosa/i)).toBeInTheDocument()
  })

  it('opens WhatsApp with official number +51 921 585 977 when clicking order button', async () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => {})
    render(<App />)
    const catalogBtns = screen.getAllByRole('button', { name: 'Catálogo Exclusivo' })
    fireEvent.click(catalogBtns[0])

    const orderButtons = screen.getAllByRole('button', { name: /Pedir por WhatsApp/i })
    fireEvent.click(orderButtons[0])

    expect(openSpy).toHaveBeenCalled()
    const callUrl = openSpy.mock.calls[0][0]
    expect(callUrl).toContain('51921585977')
    expect(callUrl).toContain('wa.me')
  })

  it('opens product modal when clicking on a product card', async () => {
    render(<App />)
    const catalogBtns = screen.getAllByRole('button', { name: 'Catálogo Exclusivo' })
    fireEvent.click(catalogBtns[0])

    const productImg = screen.getByAltText(/Ramo Buchón "Sol Radiante"/i)
    fireEvent.click(productImg)

    expect(screen.getAllByText(/Ramos Buchones & Girasoles/i).length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText(/Espectacular bouquet buchón de 12 girasoles/i).length).toBeGreaterThanOrEqual(1)
  })
})
