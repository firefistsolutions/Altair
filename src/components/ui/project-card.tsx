'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AltairCard } from './altair-card'
import { AltairButton } from './altair-button'

interface ProjectCardProps {
  image: string
  title: string
  client: string
  metrics: { label: string; value: string }[]
  slug: string
  priority?: boolean
}

export function ProjectCard({
  image,
  title,
  client,
  metrics,
  slug,
  priority = false,
}: ProjectCardProps) {
  return (
    <Link href={`/projects/${slug}`} className="block h-full focus:outline-none focus:ring-2 focus:ring-brand-bronze focus:ring-offset-2 rounded-lg">
      <AltairCard className="group overflow-hidden relative h-full">
        <div className="relative h-64 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={priority}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end pb-4 px-4">
            <AltairButton variant="bronze" size="sm" className="w-full" aria-label={`View case study for ${title}`}>
              View Case Study
            </AltairButton>
          </div>
          {/* Always visible subtle indicator */}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-2 h-2 bg-brand-bronze rounded-full animate-pulse" aria-hidden="true" />
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 text-brand-navy">{title}</h3>
          <p className="text-sm text-slate-gray mb-4">{client}</p>

          <div className="flex gap-4">
            {metrics.slice(0, 2).map((metric, index) => (
              <div key={index}>
                <p className="text-2xl font-bold text-brand-bronze">{metric.value}</p>
                <p className="text-xs text-slate-gray">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </AltairCard>
    </Link>
  )
}

