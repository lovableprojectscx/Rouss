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
})
