import { test, expect } from '@playwright/test'

test.describe('Form Testing', () => {
  test.beforeEach(async ({ page }) => {
    // Wait for page to be fully loaded
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('Contact form submission', async ({ page }) => {
    await page.goto('/contact')
    
    // Fill out the form
    await page.fill('input[name="name"]', 'Test User')
    await page.fill('input[name="email"]', 'test@example.com')
    await page.fill('input[name="phone"]', '1234567890')
    await page.fill('input[name="subject"]', 'Test Subject')
    await page.fill('textarea[name="message"]', 'This is a test message for the contact form.')
    
    // Submit the form
    await page.click('button[type="submit"]')
    
    // Wait for success message
    await expect(page.locator('text=Thank you')).toBeVisible({ timeout: 10000 })
  })

  test('Contact form validation', async ({ page }) => {
    await page.goto('/contact')
    
    // Try to submit empty form
    await page.click('button[type="submit"]')
    
    // Check for validation errors
    await expect(page.locator('text=required')).toBeVisible()
  })

  test('Quote request form submission', async ({ page }) => {
    await page.goto('/request-quote')
    
    // Fill out the form
    await page.fill('input[name="name"]', 'Test User')
    await page.fill('input[name="email"]', 'test@example.com')
    await page.fill('input[name="phone"]', '1234567890')
    await page.fill('input[name="organization"]', 'Test Organization')
    await page.fill('textarea[name="projectDetails"]', 'Test project details')
    
    // Submit the form
    await page.click('button[type="submit"]')
    
    // Wait for success message
    await expect(page.locator('text=Thank you')).toBeVisible({ timeout: 10000 })
  })

  test('Survey request form submission', async ({ page }) => {
    await page.goto('/request-survey')
    
    // Fill out the form
    await page.fill('input[name="name"]', 'Test User')
    await page.fill('input[name="email"]', 'test@example.com')
    await page.fill('input[name="phone"]', '1234567890')
    await page.fill('input[name="organization"]', 'Test Organization')
    await page.fill('input[name="location"]', 'Test Location')
    
    // Select a future date (tomorrow)
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const dateString = tomorrow.toISOString().split('T')[0]
    await page.fill('input[type="date"]', dateString)
    
    await page.fill('textarea[name="projectDetails"]', 'Test project details')
    
    // Submit the form
    await page.click('button[type="submit"]')
    
    // Wait for success message
    await expect(page.locator('text=Thank you')).toBeVisible({ timeout: 10000 })
  })

  test('Newsletter subscription', async ({ page }) => {
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    
    // Wait for footer to be visible
    await page.waitForSelector('footer', { timeout: 5000 })
    
    // Find newsletter form in footer
    const newsletterInput = page.locator('footer input[type="email"]').first()
    
    if (await newsletterInput.isVisible()) {
      await newsletterInput.fill('test@example.com')
      
      // Find and click subscribe button
      const subscribeButton = page.locator('footer button[type="submit"]').first()
      if (await subscribeButton.isVisible()) {
        await subscribeButton.click()
        
        // Wait for success message
        await expect(page.locator('text=subscribed')).toBeVisible({ timeout: 10000 })
      }
    }
  })
})


