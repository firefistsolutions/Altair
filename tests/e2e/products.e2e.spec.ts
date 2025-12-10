import { test, expect } from '@playwright/test'

test.describe('Products Pages Testing', () => {
  test('Products listing page loads', async ({ page }) => {
    await page.goto('/products')
    await page.waitForLoadState('networkidle')
    
    // Check page title
    await expect(page).toHaveTitle(/Products/i)
    
    // Check for product cards or list
    const productCards = page.locator('[data-testid="product-card"], .product-card, article').first()
    await expect(productCards).toBeVisible({ timeout: 10000 })
  })

  test('Product detail page loads', async ({ page }) => {
    // First go to products listing
    await page.goto('/products')
    await page.waitForLoadState('networkidle')
    
    // Find first product link
    const productLink = page.locator('a[href^="/products/"]').first()
    
    if (await productLink.isVisible()) {
      const href = await productLink.getAttribute('href')
      await productLink.click()
      
      // Wait for product page to load
      await page.waitForLoadState('networkidle')
      
      // Check product title is visible
      const productTitle = page.locator('h1').first()
      await expect(productTitle).toBeVisible()
      
      // Check description is visible (not JSON)
      const description = page.locator('section, .prose, [class*="description"]').first()
      await expect(description).toBeVisible()
      
      // Verify description is not raw JSON
      const pageContent = await page.textContent('body')
      expect(pageContent).not.toContain('{"root":')
    }
  })

  test('Product images load', async ({ page }) => {
    await page.goto('/products')
    await page.waitForLoadState('networkidle')
    
    // Find product images
    const images = page.locator('img[src*="product"], img[alt*="product" i]')
    const imageCount = await images.count()
    
    if (imageCount > 0) {
      // Check first image loads
      const firstImage = images.first()
      await expect(firstImage).toBeVisible()
      
      // Check image has src
      const src = await firstImage.getAttribute('src')
      expect(src).toBeTruthy()
    }
  })

  test('Request Quote button works', async ({ page }) => {
    await page.goto('/products')
    await page.waitForLoadState('networkidle')
    
    // Find first product link
    const productLink = page.locator('a[href^="/products/"]').first()
    
    if (await productLink.isVisible()) {
      await productLink.click()
      await page.waitForLoadState('networkidle')
      
      // Find Request Quote button
      const quoteButton = page.locator('a[href*="quote"], button:has-text("Quote")').first()
      
      if (await quoteButton.isVisible()) {
        await quoteButton.click()
        await page.waitForLoadState('networkidle')
        await expect(page).toHaveURL(/quote/)
      }
    }
  })
})




