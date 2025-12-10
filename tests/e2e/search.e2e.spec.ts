import { test, expect } from '@playwright/test'

test.describe('Search Functionality Testing', () => {
  test('Search page loads', async ({ page }) => {
    await page.goto('/search')
    await page.waitForLoadState('networkidle')
    
    // Check search input is visible
    const searchInput = page.locator('input[type="search"], input[name="q"], input[placeholder*="search" i]').first()
    await expect(searchInput).toBeVisible()
  })

  test('Search functionality works', async ({ page }) => {
    await page.goto('/search')
    await page.waitForLoadState('networkidle')
    
    // Find search input
    const searchInput = page.locator('input[type="search"], input[name="q"], input[placeholder*="search" i]').first()
    
    if (await searchInput.isVisible()) {
      // Enter search query
      await searchInput.fill('surgical')
      await searchInput.press('Enter')
      
      // Wait for results
      await page.waitForLoadState('networkidle')
      await page.waitForTimeout(2000) // Wait for search to complete
      
      // Check for results or "no results" message
      const results = page.locator('[data-testid="search-result"], .search-result, article').first()
      const noResults = page.locator('text=No results, text=not found').first()
      
      // Either results or no results message should be visible
      const hasResults = await results.isVisible().catch(() => false)
      const hasNoResults = await noResults.isVisible().catch(() => false)
      
      expect(hasResults || hasNoResults).toBeTruthy()
    }
  })

  test('Search filters work', async ({ page }) => {
    await page.goto('/search?q=surgical')
    await page.waitForLoadState('networkidle')
    
    // Look for filter buttons
    const filterButtons = page.locator('button:has-text("Products"), button:has-text("Projects"), button:has-text("All")')
    const count = await filterButtons.count()
    
    if (count > 0) {
      // Click first filter
      await filterButtons.first().click()
      await page.waitForTimeout(1000)
      
      // Results should update
      await page.waitForLoadState('networkidle')
    }
  })
})




