'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/utilities/ui'

/**
 * Skip to main content link for keyboard navigation
 * WCAG 2.1 AA compliant - allows users to skip repetitive navigation
 */
export function SkipLink() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Show skip link when Tab is pressed (first keyboard interaction)
      if (e.key === 'Tab' && !isVisible) {
        setIsVisible(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isVisible])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const main = document.querySelector('main')
    if (main) {
      main.focus()
      main.scrollIntoView({ behavior: 'smooth', block: 'start' })
      // Ensure main is focusable
      if (!main.hasAttribute('tabIndex')) {
        main.setAttribute('tabIndex', '-1')
      }
    }
  }

  return (
    <a
      href="#main-content"
      onClick={handleClick}
      className={cn(
        'absolute left-4 top-4 z-50 bg-brand-bronze text-white px-4 py-2 rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-bronze focus:ring-offset-2',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
      )}
      aria-label="Skip to main content"
    >
      Skip to main content
    </a>
  )
}

