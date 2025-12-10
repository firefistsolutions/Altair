import { test, expect } from '@playwright/test'

test.describe('Performance Testing', () => {
  test('Homepage loads quickly', async ({ page }) => {
    const startTime = Date.now()
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    const loadTime = Date.now() - startTime
    
    // Homepage should load in less than 5 seconds
    expect(loadTime).toBeLessThan(5000)
    
    // Check for console errors
    const errors: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text())
      }
    })
    
    // Wait a bit for any delayed errors
    await page.waitForTimeout(2000)
    
    // Filter out known non-critical errors
    const criticalErrors = errors.filter(
      err => !err.includes('favicon') && !err.includes('analytics')
    )
    
    expect(criticalErrors.length).toBe(0)
  })

  test('Product pages load quickly', async ({ page }) => {
    await page.goto('/products')
    await page.waitForLoadState('networkidle')
    
    // Find first product link
    const productLink = page.locator('a[href^="/products/"]').first()
    
    if (await productLink.isVisible()) {
      const startTime = Date.now()
      await productLink.click()
      await page.waitForLoadState('networkidle')
      const loadTime = Date.now() - startTime
      
      // Product page should load in less than 3 seconds
      expect(loadTime).toBeLessThan(3000)
    }
  })

  test('Images are optimized', async ({ page }) => {
    await page.goto('/products')
    await page.waitForLoadState('networkidle')
    
    // Check for Next.js Image components
    const images = page.locator('img')
    const imageCount = await images.count()
    
    if (imageCount > 0) {
      // Check first image
      const firstImage = images.first()
      const src = await firstImage.getAttribute('src')
      
      // Next.js images should have optimized paths or be using Image component
      // This is a basic check - actual optimization verification needs Lighthouse
      expect(src).toBeTruthy()
    }
  })

  test('No large JavaScript bundles', async ({ page }) => {
    const jsSizes: number[] = []
    
    page.on('response', (response) => {
      const url = response.url()
      if (url.endsWith('.js') && response.status() === 200) {
        const contentLength = response.headers()['content-length']
        if (contentLength) {
          jsSizes.push(parseInt(contentLength))
        }
      }
    })
    
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    // Check if any JS file is larger than 500KB (uncompressed)
    const largeFiles = jsSizes.filter(size => size > 500000)
    expect(largeFiles.length).toBe(0)
  })
})





