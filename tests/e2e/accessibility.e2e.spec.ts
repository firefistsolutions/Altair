import { test, expect } from '@playwright/test'

test.describe('Accessibility Testing', () => {
  test('Homepage accessibility basics', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    // Check for main heading
    const heading = page.locator('h1').first()
    await expect(heading).toBeVisible()
    
    // Check for proper heading hierarchy
    const h1Count = await page.locator('h1').count()
    expect(h1Count).toBeGreaterThan(0)
  })

  test('Products page accessibility basics', async ({ page }) => {
    await page.goto('/products')
    await page.waitForLoadState('networkidle')
    
    // Check for main heading
    const heading = page.locator('h1').first()
    await expect(heading).toBeVisible()
  })

  test('Contact form accessibility', async ({ page }) => {
    await page.goto('/contact')
    await page.waitForLoadState('networkidle')
    
    // Check form labels
    const nameInput = page.locator('input[name="name"]').first()
    if (await nameInput.isVisible()) {
      const id = await nameInput.getAttribute('id')
      if (id) {
        const label = page.locator(`label[for="${id}"]`)
        await expect(label).toBeVisible()
      }
    }
  })

  test('Keyboard navigation works', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    // Tab through interactive elements
    await page.keyboard.press('Tab')
    
    // Check if focus is visible
    const focusedElement = page.locator(':focus')
    await expect(focusedElement).toBeVisible()
    
    // Continue tabbing
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    
    // Focus should move
    const newFocusedElement = page.locator(':focus')
    await expect(newFocusedElement).toBeVisible()
  })

  test('Images have alt text', async ({ page }) => {
    await page.goto('/products')
    await page.waitForLoadState('networkidle')
    
    const images = page.locator('img')
    const imageCount = await images.count()
    
    for (let i = 0; i < Math.min(imageCount, 5); i++) {
      const img = images.nth(i)
      const alt = await img.getAttribute('alt')
      
      // Images should have alt text (empty string is acceptable for decorative images)
      expect(alt).not.toBeNull()
    }
  })
})

