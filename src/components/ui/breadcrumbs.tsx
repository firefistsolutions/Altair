'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/utilities/ui'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav className={cn('flex items-center gap-2 text-sm', className)} aria-label="Breadcrumb">
      <Link
        href="/"
        className="hover:text-brand-bronze transition-colors flex items-center gap-1"
        aria-label="Home"
      >
        <Home className="w-4 h-4" aria-hidden="true" />
        <span className="sr-only md:not-sr-only ml-1">Home</span>
      </Link>
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4 text-slate-gray" aria-hidden="true" />
          {item.href ? (
            <Link
              href={item.href}
              className="text-slate-gray hover:text-brand-bronze transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-brand-navy font-medium" aria-current="page">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  )
}

