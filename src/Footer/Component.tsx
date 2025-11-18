import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto border-t border-border bg-brand-navy text-white">
      <div className="container py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <Link className="flex items-center mb-4" href="/">
              <Logo variant="light" className="w-20 md:w-[100px]" />
            </Link>
            <p className="text-sm text-white/80 mb-2">
              Modular Operation Theatres & Medical Gas Systems
            </p>
            <p className="text-sm text-brand-bronze font-semibold">
              Design to Perform. Build to Last...
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/products" className="text-white/80 hover:text-white hover:underline text-sm transition-colors">
                All Products
              </Link>
              <Link href="/products/modular-ot" className="text-white/80 hover:text-white hover:underline text-sm transition-colors">
                Modular OT
              </Link>
              <Link href="/products/medical-gas" className="text-white/80 hover:text-white hover:underline text-sm transition-colors">
                Medical Gas Systems
              </Link>
            </nav>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/resources" className="text-white/80 hover:text-white hover:underline text-sm transition-colors">
                Resources
              </Link>
              <Link href="/blog" className="text-white/80 hover:text-white hover:underline text-sm transition-colors">
                Blog
              </Link>
              <Link href="/events" className="text-white/80 hover:text-white hover:underline text-sm transition-colors">
                Events
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="flex flex-col gap-2 text-sm text-white/80">
              <p>Plot No. B-437, Bhamashah Industrial Area</p>
              <p>Kaladwas, Rajasthan 313002</p>
              <p className="mt-2">
                <a href="mailto:marketing@altairmedical.com" className="hover:text-white">
                  marketing@altairmedical.com
                </a>
              </p>
              <p>
                <a href="tel:+919251859361" className="hover:text-white">
                  +91 92518 59361
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} Altair Medical System Pvt. Ltd. All products comply with HTM & ASTM standards.
          </p>
          <div className="flex items-center gap-4">
            <ThemeSelector />
            <nav className="flex gap-4" aria-label="Footer navigation">
              {navItems.length > 0 ? (
                navItems.map(({ link }, i) => {
                  // Fallback to regular Link if CMSLink fails or link is invalid
                  if (!link || !link.url) {
                    return null
                  }
                  try {
                    return <CMSLink className="text-white/60 hover:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-bronze rounded" key={i} {...link} />
                  } catch {
                    return (
                      <Link
                        href={link.url}
                        className="text-white/60 hover:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-bronze rounded"
                        key={i}
                      >
                        {link.label || 'Link'}
                      </Link>
                    )
                  }
                })
              ) : (
                // Fallback navigation if no CMS data
                <>
                  <Link href="/privacy" className="text-white/60 hover:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-bronze rounded">
                    Privacy
                  </Link>
                  <Link href="/terms" className="text-white/60 hover:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-bronze rounded">
                    Terms
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
