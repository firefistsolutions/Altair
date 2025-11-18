'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    setIsMobileMenuOpen(false) // Close mobile menu on route change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <header
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border-gray"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="container py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center" aria-label="Altair Medical System Home">
          <Logo loading="eager" priority="high" className="w-20 md:w-[100px]" />
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <HeaderNav data={data} />
          <Link
            href="/request-quote"
            className="px-5 py-2.5 bg-brand-bronze text-white rounded-md font-semibold hover:bg-brand-bronze/90 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-bronze focus:ring-offset-2 ml-2"
          >
            Get Quote
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-md hover:bg-light-gray focus:outline-none focus:ring-2 focus:ring-brand-bronze"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" aria-hidden="true" />
          ) : (
            <Menu className="w-6 h-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border-gray bg-white animate-in slide-in-from-top-2 duration-300">
          <nav className="container py-4 flex flex-col gap-4">
            <HeaderNav data={data} />
            <Link
              href="/request-quote"
              className="px-4 py-2 bg-brand-bronze text-white rounded-md font-semibold hover:bg-brand-bronze/90 transition-colors text-center focus:outline-none focus:ring-2 focus:ring-brand-bronze focus:ring-offset-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
