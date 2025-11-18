'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  // Fallback navigation if no CMS data
  const fallbackNavItems = [
    { link: { url: '/products', label: 'Products' } },
    { link: { url: '/projects', label: 'Projects' } },
    { link: { url: '/events', label: 'Events' } },
    { link: { url: '/about', label: 'About' } },
    { link: { url: '/contact', label: 'Contact' } },
  ]

  const itemsToRender = navItems.length > 0 ? navItems : fallbackNavItems

  return (
    <nav className="flex flex-col md:flex-row gap-3 md:items-center" aria-label="Main navigation">
      {itemsToRender.map(({ link }, i) => {
        // Use CMSLink if it's from CMS, otherwise use regular Link
        if (navItems.length > 0) {
          return <CMSLink key={i} {...link} appearance="link" />
        } else {
          return (
            <Link
              key={i}
              href={link?.url || '#'}
              className="text-brand-navy hover:text-brand-bronze transition-colors font-medium text-sm md:text-base"
            >
              {link?.label || 'Link'}
            </Link>
          )
        }
      })}
      <Link
        href="/search"
        className="p-2 rounded-md hover:bg-light-gray focus:outline-none focus:ring-2 focus:ring-brand-bronze transition-colors"
        aria-label="Search"
      >
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 h-5 text-brand-navy" aria-hidden="true" />
      </Link>
    </nav>
  )
}
