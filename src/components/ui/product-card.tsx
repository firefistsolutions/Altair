'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AltairCard } from './altair-card'
import { AltairBadge } from './altair-badge'
import { AltairButton } from './altair-button'
import { Download } from 'lucide-react'

interface ProductCardProps {
  image: string
  title: string
  description: string
  specs: string[]
  slug: string
  category?: string
  featured?: boolean
  datasheetUrl?: string
  priority?: boolean
}

export function ProductCard({
  image,
  title,
  description,
  specs,
  slug,
  category,
  featured = false,
  datasheetUrl,
}: ProductCardProps) {
  return (
    <AltairCard className="group overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow" aria-label={`Product: ${title}`}>
      <div className="relative aspect-[4/3] overflow-hidden flex-shrink-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          priority={priority}
        />
        <div className="absolute top-4 right-4 flex flex-wrap gap-2 items-start justify-end max-w-[60%]">
          {featured && <AltairBadge variant="bronze" size="sm">Featured</AltairBadge>}
          {category && (
            <AltairBadge variant="outline" size="sm" className="bg-white/90">
              {category}
            </AltairBadge>
          )}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-semibold mb-2 text-brand-navy">{title}</h3>
        <p className="text-sm text-slate-gray mb-4 line-clamp-2 min-h-[2.5rem]">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4 min-h-[1.75rem]">
          {specs.slice(0, 3).map((spec, index) => (
            <AltairBadge key={index} variant="outline" size="sm">
              {spec}
            </AltairBadge>
          ))}
        </div>

        <div className="flex gap-3 mt-auto">
          <AltairButton variant="default" size="sm" asChild className="flex-1 min-w-0">
            <Link href={`/products/${slug}`} className="truncate">
              <span className="hidden sm:inline">View Details</span>
              <span className="sm:hidden">Details</span>
            </Link>
          </AltairButton>
          {datasheetUrl && (
            <AltairButton variant="outline" size="icon" asChild className="flex-shrink-0">
              <Link href={datasheetUrl} target="_blank" aria-label="Download datasheet">
                <Download className="w-4 h-4" />
              </Link>
            </AltairButton>
          )}
        </div>
      </div>
    </AltairCard>
  )
}

