'use client'

import { useState } from 'react'
import { SectionContainer } from '@/components/ui/section-container'
import { EventCard } from '@/components/ui/event-card'
import { AltairButton } from '@/components/ui/altair-button'
import Link from 'next/link'

// Mock events data - will be replaced with CMS data in Phase 6
const upcomingEvents = [
  {
    id: 1,
    title: 'Medicall Expo Mumbai 2025',
    dateRange: '12-14 Dec 2025',
    location: 'Bombay Exhibition Center',
    venue: 'Mumbai, Maharashtra',
    description: 'Join Workspace Metal Solutions at the 44th Medicall Mumbai Edition. Discover advanced Modular Operation Theater Solutions.',
    eventType: 'Trade Show' as const,
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&h=600&fit=crop&q=80',
    featured: true,
  },
  {
    id: 2,
    title: 'India MedTech Expo 2025',
    dateRange: '04-06 Sept 2025',
    location: 'Bharat Mandapam',
    venue: 'Pragati Maidan, New Delhi',
    description: 'The nation\'s largest showcase of medical technologies and innovations.',
    eventType: 'Expo' as const,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop&q=80',
    featured: false,
  },
  {
    id: 3,
    title: 'Medicall Chennai 2025',
    dateRange: '25-27 Jul 2025',
    location: 'Chennai Trade Center',
    venue: 'Chennai, Tamil Nadu',
    description: 'Join us at the 42nd Medicall Chennai Edition. Discover advanced Modular Operation Theater Solutions.',
    eventType: 'Trade Show' as const,
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=600&fit=crop&q=80',
    featured: false,
  },
]

const pastEvents = [
  {
    id: 4,
    title: 'Medicall Kolkata 2025',
    dateRange: '15-17 Feb 2025',
    location: 'Biswa Bangla Mela Prangan',
    venue: 'Kolkata, West Bengal',
    description: 'Redefining Healthcare Spaces at the 40th Medicall Kolkata Edition.',
    eventType: 'Trade Show' as const,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop&q=80',
    featured: false,
  },
  {
    id: 5,
    title: 'Arab Health 2025',
    dateRange: '27-30 Jan 2025',
    location: 'Dubai World Trade Centre',
    venue: 'Dubai, UAE',
    description: 'Showcasing Healthcare Innovations at Arab Health 2025.',
    eventType: 'Expo' as const,
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&h=600&fit=crop&q=80',
    featured: false,
  },
]

export function EventsSection() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming')
  const events = activeTab === 'upcoming' ? upcomingEvents : pastEvents

  return (
    <section className="py-16 md:py-24 bg-brand-navy text-white">
      <SectionContainer>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Events</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Join us at leading medical technology exhibitions and conferences
          </p>
        </div>

        {/* Toggle Tabs */}
        <div className="flex justify-center gap-4 mb-8" role="tablist" aria-label="Event categories">
          <button
            onClick={() => setActiveTab('upcoming')}
            role="tab"
            aria-selected={activeTab === 'upcoming'}
            aria-controls="upcoming-events"
            id="tab-upcoming"
            className={`px-6 py-2 rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-brand-bronze focus:ring-offset-2 focus:ring-offset-brand-navy ${
              activeTab === 'upcoming'
                ? 'bg-brand-bronze text-white'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            Upcoming Events
          </button>
          <button
            onClick={() => setActiveTab('past')}
            role="tab"
            aria-selected={activeTab === 'past'}
            aria-controls="past-events"
            id="tab-past"
            className={`px-6 py-2 rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-brand-bronze focus:ring-offset-2 focus:ring-offset-brand-navy ${
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
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          >
            {events.map((event) => (
              <EventCard
                key={event.id}
                image={event.image}
                title={event.title}
                dateRange={event.dateRange}
                location={event.location}
                venue={event.venue}
                description={event.description}
                eventType={event.eventType}
                featured={event.featured}
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

