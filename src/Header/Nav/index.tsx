'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  // Fallback navigation if no CMS data
  const fallbackNavItems = [
    { link: { url: '/products', label: 'Products' } },
    { link: { url: '/events', label: 'Events' } },
    { link: { url: '/about', label: 'About' } },
    { link: { url: '/contact', label: 'Contact' } },
  ]

  // Filter out Projects from nav items
  const filteredNavItems = navItems.filter(
    (item) => item.link?.url !== '/projects' && item.link?.label !== 'Projects'
  )
  const filteredFallbackNavItems = fallbackNavItems.filter(
    (item) => item.link?.url !== '/projects' && item.link?.label !== 'Projects'
  )

  const itemsToRender = filteredNavItems.length > 0 ? filteredNavItems : filteredFallbackNavItems

  return (
    <nav className="flex flex-col md:flex-row gap-4 md:gap-6 md:items-center" aria-label="Main navigation">
      {itemsToRender.map(({ link }, i) => {
        // Use CMSLink if it's from CMS, otherwise use regular Link
        if (navItems.length > 0) {
          return <CMSLink key={i} {...link} appearance="link" />
        } else {
          return (
            <Link
              key={i}
              href={link?.url || '#'}
              className="text-brand-navy hover:text-brand-bronze transition-colors font-medium text-sm md:text-base px-2 py-1 md:px-3 md:py-2"
            >
              {link?.label || 'Link'}
            </Link>
          )
        }
      })}
    </nav>
  )
}
