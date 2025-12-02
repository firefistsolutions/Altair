'use client'

import { useState } from 'react'
import { SectionContainer } from '@/components/ui/section-container'
import { EventCard } from '@/components/ui/event-card'
import { AltairButton } from '@/components/ui/altair-button'
import Link from 'next/link'
import type { TransformedEvent } from '@/lib/utils/transform-event'

interface EventsSectionProps {
  upcomingEvents?: TransformedEvent[]
  pastEvents?: TransformedEvent[]
}

// Mock events data - fallback if no CMS data
const mockUpcomingEvents: TransformedEvent[] = [
  {
    id: '1',
    title: 'Medicall Expo Mumbai 2025',
    description: 'Join Workspace Metal Solutions at the 44th Medicall Mumbai Edition. Discover advanced Modular Operation Theater Solutions.',
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&h=600&fit=crop&q=80',
    galleryImages: [],
    slug: 'medicall-expo-mumbai-2025',
    eventType: 'Trade Show',
    eventStatus: 'upcoming',
    startDate: new Date('2025-12-12').toISOString(),
    endDate: new Date('2025-12-14').toISOString(),
    dateRange: '12-14 Dec 2025',
    location: 'Mumbai, Maharashtra',
    venue: 'Bombay Exhibition Center',
    featured: true,
  },
]

const mockPastEvents: TransformedEvent[] = [
  {
    id: '2',
    title: 'India MedTech Expo 2025',
    description: 'The nation\'s largest showcase of medical technologies and innovations.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop&q=80',
    galleryImages: [],
    slug: 'india-medtech-expo-2025',
    eventType: 'Expo',
    eventStatus: 'past',
    startDate: new Date('2025-09-04').toISOString(),
    endDate: new Date('2025-09-06').toISOString(),
    dateRange: '04-06 Sept 2025',
    location: 'New Delhi',
    venue: 'Pragati Maidan',
    featured: false,
  },
]

function formatDateRange(startDate: string | Date, endDate: string | Date): string {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate
  
  const startDay = start.getDate()
  const startMonth = start.toLocaleDateString('en-GB', { month: 'short' })
  const endDay = end.getDate()
  const endMonth = end.toLocaleDateString('en-GB', { month: 'short' })
  const endYear = end.getFullYear()
  
  if (startMonth === endMonth && start.getFullYear() === endYear) {
    return `${startDay}-${endDay} ${startMonth} ${endYear}`
  }
  return `${startDay} ${startMonth} - ${endDay} ${endMonth} ${endYear}`
}

export function EventsSection({ 
  upcomingEvents = mockUpcomingEvents, 
  pastEvents = mockPastEvents 
}: EventsSectionProps) {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const events = activeTab === 'upcoming' ? upcomingEvents : pastEvents

  const handleTabChange = (tab: 'upcoming' | 'past') => {
    if (tab === activeTab) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveTab(tab)
      setIsTransitioning(false)
    }, 150)
  }

  return (
    <section className="py-16 md:py-24 bg-brand-navy text-white">
      <SectionContainer>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Events</h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
            Join us at leading medical technology exhibitions and conferences
          </p>
        </div>

        {/* Toggle Tabs */}
        <div className="flex justify-center gap-4 mb-8" role="tablist" aria-label="Event categories">
          <button
            onClick={() => handleTabChange('upcoming')}
            role="tab"
            aria-selected={activeTab === 'upcoming'}
            aria-controls="upcoming-events"
            id="tab-upcoming"
            className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-bronze focus:ring-offset-2 focus:ring-offset-brand-navy ${
              activeTab === 'upcoming'
                ? 'bg-brand-bronze text-white'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            Upcoming Events
          </button>
          <button
            onClick={() => handleTabChange('past')}
            role="tab"
            aria-selected={activeTab === 'past'}
            aria-controls="past-events"
            id="tab-past"
            className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-bronze focus:ring-offset-2 focus:ring-offset-brand-navy ${
              activeTab === 'past'
                ? 'bg-brand-bronze text-white'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            Past Events
          </button>
        </div>

        {/* Events Grid */}
        {events.length === 0 ? (
          <div className="text-center py-12 text-white/60">
            <p>No {activeTab === 'upcoming' ? 'upcoming' : 'past'} events at this time.</p>
          </div>
        ) : (
          <div
            id={activeTab === 'upcoming' ? 'upcoming-events' : 'past-events'}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
            className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 transition-opacity duration-300 ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {events.slice(0, 6).map((event) => (
              <EventCard
                key={event.id}
                image={event.image}
                title={event.title}
                dateRange={formatDateRange(event.startDate, event.endDate)}
                location={event.location}
                venue={event.venue || event.location}
                description={event.description}
                eventType={event.eventType}
                featured={event.featured}
                slug={event.slug}
              />
            ))}
          </div>
        )}

        {/* View All Link */}
        <div className="text-center">
          <AltairButton variant="bronze" size="lg" asChild>
            <Link href="/events">View All Events</Link>
          </AltairButton>
        </div>
      </SectionContainer>
    </section>
  )
}
