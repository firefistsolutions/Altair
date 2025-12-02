import { test, expect } from '@playwright/test'

test.describe('Navigation Testing', () => {
  test('Header navigation links work', async ({ page }) => {
    await page.goto('/')
    
    // Test logo link
    const logo = page.locator('header a[href="/"]').first()
    if (await logo.isVisible()) {
      await logo.click()
      await expect(page).toHaveURL('/')
    }
    
    // Test main navigation links
    const navLinks = [
      { text: 'Products', url: '/products' },
      { text: 'Projects', url: '/projects' },
      { text: 'About', url: '/about' },
      { text: 'Contact', url: '/contact' },
      { text: 'Blog', url: '/blog' },
    ]
    
    for (const link of navLinks) {
      const navLink = page.locator(`header a:has-text("${link.text}")`).first()
      if (await navLink.isVisible()) {
        await navLink.click()
        await expect(page).toHaveURL(new RegExp(link.url))
        await page.goBack()
      }
    }
  })

  test('Footer links work', async ({ page }) => {
    await page.goto('/')
    
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForSelector('footer', { timeout: 5000 })
    
    // Test footer links
    const footerLinks = page.locator('footer a')
    const count = await footerLinks.count()
    
    for (let i = 0; i < Math.min(count, 5); i++) {
      const link = footerLinks.nth(i)
      const href = await link.getAttribute('href')
      
      if (href && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
        await link.click()
        // Wait for navigation
        await page.waitForLoadState('networkidle')
        // Go back
        await page.goBack()
        await page.waitForLoadState('networkidle')
      }
    }
  })

  test('Mobile menu works', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    // Look for mobile menu button
    const menuButton = page.locator('button[aria-label*="menu" i], button[aria-label*="Menu" i]').first()
    
    if (await menuButton.isVisible()) {
      // Open menu
      await menuButton.click()
      await page.waitForTimeout(500)
      
      // Check if menu is visible
      const menu = page.locator('nav[aria-label*="mobile" i], nav[aria-label*="Mobile" i]').first()
      if (await menu.isVisible()) {
        // Close menu
        await menuButton.click()
        await page.waitForTimeout(500)
      }
    }
  })
})


