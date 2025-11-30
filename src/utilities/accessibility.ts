/**
 * Accessibility utilities for WCAG 2.1 AA compliance
 */

/**
 * Generate a unique ID for ARIA attributes
 */
export function generateAriaId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`
}

/**
 * Check if element should be focusable
 */
export function shouldBeFocusable(element: HTMLElement): boolean {
  const tagName = element.tagName.toLowerCase()
  const interactiveElements = ['a', 'button', 'input', 'select', 'textarea', 'details', 'summary']
  
  if (interactiveElements.includes(tagName)) {
    return true
  }
  
  // Check for tabindex
  const tabIndex = element.getAttribute('tabindex')
  if (tabIndex !== null && tabIndex !== '-1') {
    return true
  }
  
  return false
}

/**
 * Get accessible name for an element
 */
export function getAccessibleName(element: HTMLElement): string {
  // Check aria-label first
  const ariaLabel = element.getAttribute('aria-label')
  if (ariaLabel) return ariaLabel
  
  // Check aria-labelledby
  const ariaLabelledBy = element.getAttribute('aria-labelledby')
  if (ariaLabelledBy) {
    const labelElement = document.getElementById(ariaLabelledBy)
    if (labelElement) return labelElement.textContent || ''
  }
  
  // Check for associated label
  if (element.id) {
    const label = document.querySelector(`label[for="${element.id}"]`)
    if (label) return label.textContent || ''
  }
  
  // Check for text content
  const textContent = element.textContent?.trim()
  if (textContent) return textContent
  
  // Check for alt text (images)
  if (element.tagName.toLowerCase() === 'img') {
    const alt = (element as HTMLImageElement).alt
    if (alt) return alt
  }
  
  return ''
}

/**
 * Validate heading hierarchy
 */
export function validateHeadingHierarchy(headings: HTMLHeadingElement[]): boolean {
  let previousLevel = 0
  
  for (const heading of headings) {
    const level = parseInt(heading.tagName.charAt(1))
    
    // First heading should be h1
    if (previousLevel === 0 && level !== 1) {
      return false
    }
    
    // Should not skip levels (e.g., h1 to h3)
    if (level > previousLevel + 1) {
      return false
    }
    
    previousLevel = level
  }
  
  return true
}

/**
 * Get color contrast ratio between two colors
 * Returns ratio (e.g., 4.5 for WCAG AA)
 */
export function getContrastRatio(color1: string, color2: string): number {
  // Simplified contrast calculation
  // In production, use a proper color contrast library
  const luminance1 = getLuminance(color1)
  const luminance2 = getLuminance(color2)
  
  const lighter = Math.max(luminance1, luminance2)
  const darker = Math.min(luminance1, luminance2)
  
  return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Get relative luminance of a color
 */
function getLuminance(_color: string): number {
  // Simplified - in production, use proper color parsing
  // This is a placeholder
  return 0.5
}

/**
 * Check if color combination meets WCAG AA standards
 * Normal text: 4.5:1, Large text: 3:1
 */
export function meetsWCAGAA(foreground: string, background: string, isLargeText = false): boolean {
  const ratio = getContrastRatio(foreground, background)
  const requiredRatio = isLargeText ? 3 : 4.5
  return ratio >= requiredRatio
}

