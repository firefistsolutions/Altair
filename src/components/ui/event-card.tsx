'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Calendar, MapPin } from 'lucide-react'
import { AltairCard } from './altair-card'
import { AltairBadge } from './altair-badge'
import { AltairButton } from './altair-button'
import { cn } from '@/utilities/ui'

interface EventCardProps {
  image: string
  title: string
  dateRange: string
  location: string
  venue?: string
  description?: string
  eventType: 'Trade Show' | 'Expo' | 'Conference' | 'Webinar' | string
  registrationLink?: string
  featured?: boolean
  slug?: string
  className?: string
}

export function EventCard({
  image,
  title,
  dateRange,
  location,
  venue,
  description,
  eventType,
  registrationLink,
  featured = false,
  slug,
  className,
}: EventCardProps) {
  return (
    <AltairCard
      className={cn(
        'overflow-hidden group',
        featured && 'md:col-span-2 lg:col-span-2',
        className
      )}
    >
      <div className="relative h-48 md:h-64 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes={featured ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
          loading="lazy"
          quality={85}
        />
        <div className="absolute top-4 right-4 z-10">
          <AltairBadge variant="bronze">{eventType}</AltairBadge>
        </div>
        {featured && (
          <div className="absolute top-4 left-4 z-10">
            <AltairBadge variant="gold">Featured Event</AltairBadge>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-4 h-4 text-brand-bronze flex-shrink-0" aria-hidden="true" />
          <time className="text-sm font-semibold text-brand-bronze" dateTime={dateRange}>
            {dateRange}
          </time>
        </div>

        <h3 className="text-xl font-bold text-brand-navy mb-2">{title}</h3>

        <div className="flex items-start gap-2 mb-3 text-slate-gray">
          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium">{location}</p>
            {venue && <p className="text-xs text-slate-gray/80">{venue}</p>}
          </div>
        </div>

        {description && (
          <p className="text-sm text-slate-gray mb-4 line-clamp-2">
            {description}
          </p>
        )}

        {registrationLink ? (
          <AltairButton variant="bronze" size="sm" asChild className="w-full" aria-label={`Register for ${title}`}>
            <a href={registrationLink} target="_blank" rel="noopener noreferrer">Register Now</a>
          </AltairButton>
        ) : (
          <AltairButton variant="outline-bronze" size="sm" asChild className="w-full" aria-label={`Learn more about ${title}`}>
            <Link href={slug ? `/events/${slug}` : `/events/${title.toLowerCase().replace(/\s+/g, '-')}`}>
              Learn More
            </Link>
          </AltairButton>
        )}
      </div>
    </AltairCard>
  )
}

