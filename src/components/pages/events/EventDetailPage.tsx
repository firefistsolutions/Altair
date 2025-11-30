'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Calendar, MapPin, ArrowLeft, ExternalLink } from 'lucide-react'
import { SectionContainer } from '@/components/ui/section-container'
import { AltairButton } from '@/components/ui/altair-button'
import { AltairBadge } from '@/components/ui/altair-badge'

interface EventDetailPageProps {
  event: {
    slug: string
    title: string
    dateRange: string
    startDate: string
    endDate: string
    location: string
    venue: string
    description: string
    content: string
    image: string
    eventType: string
    featured: boolean
    registrationLink?: string
  }
}

// Mock related events - will be replaced with CMS data in Phase 6
const relatedEvents = [
  {
    id: 2,
    title: 'India MedTech Expo 2025',
    dateRange: '04-06 Sept 2025',
    location: 'Bharat Mandapam',
    venue: 'Pragati Maidan, New Delhi',
    description: 'The nation\'s largest showcase of medical technologies and innovations.',
    eventType: 'Expo' as const,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop&q=80',
    slug: 'india-medtech-expo-2025',
  },
  {
    id: 3,
    title: 'Medicall Chennai 2025',
    dateRange: '25-27 Jul 2025',
    location: 'Chennai Trade Center',
    venue: 'Chennai, Tamil Nadu',
    description: 'Join us at the 42nd Medicall Chennai Edition.',
    eventType: 'Trade Show' as const,
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=600&fit=crop&q=80',
    slug: 'medicall-chennai-2025',
  },
]

export function EventDetailPage({ event }: EventDetailPageProps) {
  return (
    <div className="min-h-screen bg-clinical-white">
      <SectionContainer className="pt-6 pb-4">
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-brand-navy hover:text-brand-bronze transition-colors focus:outline-none focus:ring-2 focus:ring-brand-bronze rounded mt-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Events</span>
        </Link>
      </SectionContainer>

      {/* Hero Image */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <SectionContainer className="text-white">
            <div className="flex items-center gap-4 mb-4 flex-wrap">
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <time dateTime={event.startDate}>{event.dateRange}</time>
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                {event.location}
              </span>
            </div>
            <div className="flex items-center gap-3 mb-4">
              {event.featured && <AltairBadge variant="bronze">Featured Event</AltairBadge>}
              <AltairBadge variant="outline" className="bg-white/20 border-white/40 text-white">
                {event.eventType}
              </AltairBadge>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{event.title}</h1>
            <p className="text-lg text-white/90 max-w-3xl leading-relaxed">{event.description}</p>
          </SectionContainer>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-12 md:py-16 bg-clinical-white">
        <SectionContainer>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* Event Info Card */}
              <div className="md:col-span-2">
                <h2 className="text-3xl font-bold text-brand-navy mb-6">Event Details</h2>
                <div
                  className="prose prose-lg max-w-none prose-headings:text-brand-navy prose-headings:font-bold prose-p:text-slate-gray prose-p:leading-relaxed prose-a:text-brand-bronze prose-a:no-underline hover:prose-a:underline prose-ul:text-slate-gray prose-li:text-slate-gray"
                  dangerouslySetInnerHTML={{ __html: event.content }}
                />
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <div className="bg-light-gray rounded-lg p-6">
                  <h3 className="font-semibold text-brand-navy mb-4">Event Information</h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="font-medium text-slate-gray mb-1">Date</p>
                      <p className="text-brand-navy">{event.dateRange}</p>
                    </div>
                    <div>
                      <p className="font-medium text-slate-gray mb-1">Location</p>
                      <p className="text-brand-navy">{event.location}</p>
                      <p className="text-slate-gray">{event.venue}</p>
                    </div>
                    <div>
                      <p className="font-medium text-slate-gray mb-1">Event Type</p>
                      <AltairBadge variant="outline" size="sm">
                        {event.eventType}
                      </AltairBadge>
                    </div>
                  </div>
                </div>

                {event.registrationLink && (
                  <AltairButton variant="bronze" size="lg" className="w-full" asChild>
                    <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">
                      Register Now
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </AltairButton>
                )}

                <AltairButton variant="outline" size="lg" className="w-full" asChild>
                  <Link href="/contact">Contact Us</Link>
                </AltairButton>
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* Related Events */}
      {relatedEvents.length > 0 && (
        <section className="py-12 md:py-16 bg-light-gray">
          <SectionContainer>
            <div className="max-w-7xl">
              <h2 className="text-3xl font-bold text-brand-navy mb-8">Other Events</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedEvents.map((relatedEvent) => (
                  <Link
                    key={relatedEvent.id}
                    href={`/events/${relatedEvent.slug}`}
                    className="block h-full focus:outline-none focus:ring-2 focus:ring-brand-bronze rounded-lg"
                  >
                    <div className="bg-clinical-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={relatedEvent.image}
                          alt={relatedEvent.title}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <Calendar className="w-4 h-4 text-brand-bronze" />
                          <span className="text-sm font-semibold text-brand-bronze">
                            {relatedEvent.dateRange}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-brand-navy hover:text-brand-bronze transition-colors">
                          {relatedEvent.title}
                        </h3>
                        <p className="text-sm text-slate-gray mb-3 line-clamp-2 leading-relaxed">
                          {relatedEvent.description}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-slate-gray mt-auto">
                          <MapPin className="w-3 h-3" />
                          <span>{relatedEvent.location}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </SectionContainer>
        </section>
      )}
    </div>
  )
}

