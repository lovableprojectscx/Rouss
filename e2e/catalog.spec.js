import { test, expect } from '@playwright/test'

test.describe('Florería Rouss - E2E Tests', () => {
  test('Home Page loads, displays banner and navigates to catalog', async ({ page }) => {
    await page.goto('/')

    // Verify Title and Meta
    await expect(page).toHaveTitle(/Florería Rouss/i)

    // Verify presence of header logo
    const logo = page.locator('img[alt="Florería Rouss Logo"]')
    await expect(logo).toBeVisible()

    // Click on Hero Banner to navigate to catalog
    const banner = page.locator('.hero-banner-full-card')
    await banner.click()

    // Verify URL and Catalog Header
    await expect(page).toHaveURL(/.*catalogo/)
    const catalogHeading = page.locator('h1', { hasText: 'Colección Exclusiva Rouss' })
    await expect(catalogHeading).toBeVisible()
  })

  test('Catalog displays WhatsApp products and allows search filtering', async ({ page }) => {
    await page.goto('/catalogo')

    // Verify search input
    const searchInput = page.locator('input.search-input')
    await expect(searchInput).toBeVisible()

    // Verify product card for Ramos Buchones
    const buchonCard = page.locator('.product-card-minimal', { hasText: 'Ramo Buchón "Sol Radiante"' })
    await expect(buchonCard).toBeVisible()
    await expect(buchonCard).toContainText('S/ 180.00')

    // Search for "Helio"
    await searchInput.fill('Helio')
    const helioCard = page.locator('.product-card-minimal', { hasText: 'Trío de Helio' })
    await expect(helioCard).toBeVisible()
  })

  test('Product Lightbox Modal opens with image and details', async ({ page }) => {
    await page.goto('/catalogo')

    const firstProductImg = page.locator('.product-card-minimal .product-img').first()
    await firstProductImg.click()

    // Verify Modal is visible
    const modal = page.locator('.modal-content')
    await expect(modal).toBeVisible()

    // Verify close button closes modal
    const closeBtn = page.locator('.modal-close-btn')
    await closeBtn.click()
    await expect(modal).not.toBeVisible()
  })

  test('Catalog deep links directly to category via URL query parameter', async ({ page }) => {
    await page.goto('/catalogo?categoria=rosas')

    // Verify URL
    await expect(page).toHaveURL(/.*categoria=rosas/)

    // Verify products displayed include roses
    const roseProduct = page.locator('.product-card-minimal', { hasText: 'Cucurucho Pasión 8 Rosas Rojas' })
    await expect(roseProduct).toBeVisible()
  })

  test('Libro de Reclamaciones modal opens from footer and displays INDECOPI form', async ({ page }) => {
    await page.goto('/')

    // Click footer claims button
    const claimsBtn = page.locator('button.footer-claims-btn')
    await claimsBtn.scrollIntoViewIfNeeded()
    await claimsBtn.click()

    // Verify modal is visible
    const modal = page.locator('.claims-modal-card')
    await expect(modal).toBeVisible()
    await expect(modal).toContainText('Libro de Reclamaciones Virtual')
    await expect(modal).toContainText('Identificación del Consumidor Reclamante')

    // Close modal
    const closeBtn = page.locator('.claims-close-btn')
    await closeBtn.click()
    await expect(modal).not.toBeVisible()
  })

  test('Libro de Reclamaciones completes full lifecycle submission and generates correlative code', async ({ page }) => {
    await page.goto('/')

    // Open claims modal
    const claimsBtn = page.locator('button.footer-claims-btn')
    await claimsBtn.scrollIntoViewIfNeeded()
    await claimsBtn.click()

    const modal = page.locator('.claims-modal-card')
    await expect(modal).toBeVisible()

    // Fill consumer details
    await page.locator('input[name="numeroDocumento"]').fill('72849105')
    await page.locator('input[name="nombreCompleto"]').fill('Carlos Huamán Quispe')
    await page.locator('input[name="email"]').fill('carlos.huaman@gmail.com')
    await page.locator('input[name="telefono"]').fill('998877665')
    await page.locator('input[name="distrito"]').fill('Chorrillos')
    await page.locator('input[name="direccion"]').fill('Av. Los Próceres 450')

    // Fill claim details
    await page.locator('input[name="montoReclamado"]').fill('220.00')
    await page.locator('input[name="descripcionBien"]').fill('Ramo Buchón 24 Rosas Rojas Corona Princesa')
    await page.locator('textarea[name="detalleReclamacion"]').fill('El arreglo llegó con dos horas de retraso sobre la hora solicitada.')
    await page.locator('textarea[name="pedidoConsumidor"]').fill('Solicito una compensación o descuento en mi siguiente pedido.')

    // Check legal checkboxes
    await page.locator('input[name="aceptaDeclaracion"]').check()
    await page.locator('input[name="aceptaDatosPersonales"]').check()

    // Submit form
    const submitBtn = page.locator('button.btn-submit-claim')
    await submitBtn.click()

    // Verify success confirmation card
    const successCard = page.locator('.claims-success-card')
    await expect(successCard).toBeVisible()
    await expect(successCard).toContainText('¡Hoja de Reclamación Registrada Exitosamente!')

    // Verify generated correlative code
    const codeValue = page.locator('.code-value')
    await expect(codeValue).toBeVisible()
    await expect(codeValue).toContainText('ROUSS-LR-')

    // Verify download PDF and WhatsApp buttons
    const downloadPdfBtn = page.locator('.btn-download-pdf')
    await expect(downloadPdfBtn).toBeVisible()

    const waBtn = page.locator('.btn-wa-claim-confirm')
    await expect(waBtn).toBeVisible()
  })
})
