'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Search, Filter, X, Calendar } from 'lucide-react'
import { SectionContainer } from '@/components/ui/section-container'
import { EventCard } from '@/components/ui/event-card'
import { AltairButton } from '@/components/ui/altair-button'
import { Input } from '@/components/ui/input'
import { AltairBadge } from '@/components/ui/altair-badge'

// Mock events data - will be replaced with CMS data in Phase 6
const allEvents = [
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
    slug: 'medicall-expo-mumbai-2025',
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
    slug: 'india-medtech-expo-2025',
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
    slug: 'medicall-chennai-2025',
  },
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
    slug: 'medicall-kolkata-2025',
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
    slug: 'arab-health-2025',
  },
]

const eventTypes = ['All', 'Trade Show', 'Expo', 'Conference', 'Webinar']
const eventStatuses = ['All', 'Upcoming', 'Past']

export function EventsListingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [selectedEventType, setSelectedEventType] = useState(searchParams.get('type') || 'All')
  const [selectedStatus, setSelectedStatus] = useState(searchParams.get('status') || 'All')
  const [showFilters, setShowFilters] = useState(false)
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery)

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams()
    if (debouncedSearch) params.set('search', debouncedSearch)
    if (selectedEventType !== 'All') params.set('type', selectedEventType)
    if (selectedStatus !== 'All') params.set('status', selectedStatus)

    const newUrl = params.toString() ? `?${params.toString()}` : '/events'
    router.replace(newUrl, { scroll: false })
  }, [debouncedSearch, selectedEventType, selectedStatus, router])

  const filteredEvents = useMemo(() => {
    let filtered = [...allEvents]

    // Search filter
    if (debouncedSearch) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          event.location.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          event.venue.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    }

    // Event type filter
    if (selectedEventType !== 'All') {
      filtered = filtered.filter((event) => event.eventType === selectedEventType)
    }

    // Status filter (simplified - in production, would check dates)
    if (selectedStatus === 'Upcoming') {
      // Filter for future events (simplified logic)
      filtered = filtered.filter((event) => event.id <= 3)
    } else if (selectedStatus === 'Past') {
      filtered = filtered.filter((event) => event.id > 3)
    }

    // Sort: featured first, then by date
    filtered.sort((a, b) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return a.title.localeCompare(b.title)
    })

    return filtered
  }, [debouncedSearch, selectedEventType, selectedStatus])

  const activeFiltersCount =
    (debouncedSearch ? 1 : 0) + (selectedEventType !== 'All' ? 1 : 0) + (selectedStatus !== 'All' ? 1 : 0)

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedEventType('All')
    setSelectedStatus('All')
  }

  return (
    <div className="min-h-screen bg-clinical-white">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-brand-navy text-white">
        <SectionContainer>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Events</h1>
            <p className="text-lg text-white/90 leading-relaxed">
              Join us at leading medical technology exhibitions, trade shows, and conferences. Stay updated with
              upcoming events and view highlights from past exhibitions.
            </p>
          </div>
        </SectionContainer>
      </section>

      {/* Filters and Search Bar */}
      <section className="border-b border-border-gray bg-white relative">
        <SectionContainer>
          <div className="py-4">
            {/* Mobile Filter Toggle */}
            <div className="flex items-center gap-4 mb-4 md:hidden">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-border-gray rounded-md hover:bg-light-gray transition-colors"
                aria-label="Toggle filters"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <AltairBadge variant="bronze" size="sm">
                    {activeFiltersCount}
                  </AltairBadge>
                )}
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-gray" />
              <Input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>

            {/* Filters (Desktop) */}
            <div className="hidden md:flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium text-slate-gray whitespace-nowrap">Event Type:</span>
                <div className="flex gap-2 flex-wrap">
                  {eventTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedEventType(type)}
                      className={`px-3 py-1 rounded-md text-sm transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-brand-bronze ${
                        selectedEventType === type
                          ? 'bg-brand-bronze text-white'
                          : 'bg-light-gray text-brand-navy hover:bg-border-gray'
                      }`}
                      aria-pressed={selectedEventType === type}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium text-slate-gray whitespace-nowrap">Status:</span>
                <div className="flex gap-2 flex-wrap">
                  {eventStatuses.map((status) => (
                    <button
                      key={status}
                      onClick={() => setSelectedStatus(status)}
                      className={`px-3 py-1 rounded-md text-sm transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-brand-bronze ${
                        selectedStatus === status
                          ? 'bg-brand-bronze text-white'
                          : 'bg-light-gray text-brand-navy hover:bg-border-gray'
                      }`}
                      aria-pressed={selectedStatus === status}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {activeFiltersCount > 0 && (
                <AltairButton variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="w-4 h-4 mr-1" />
                  Clear Filters
                </AltairButton>
              )}
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="md:hidden space-y-4 pt-4 border-t border-border-gray">
                <div>
                  <label className="block text-sm font-medium text-slate-gray mb-2">Event Type</label>
                  <div className="flex flex-wrap gap-2">
                    {eventTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedEventType(type)}
                        className={`px-3 py-1 rounded-md text-sm transition-colors ${
                          selectedEventType === type
                            ? 'bg-brand-bronze text-white'
                            : 'bg-light-gray text-brand-navy'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-gray mb-2">Status</label>
                  <div className="flex flex-wrap gap-2">
                    {eventStatuses.map((status) => (
                      <button
                        key={status}
                        onClick={() => setSelectedStatus(status)}
                        className={`px-3 py-1 rounded-md text-sm transition-colors ${
                          selectedStatus === status
                            ? 'bg-brand-bronze text-white'
                            : 'bg-light-gray text-brand-navy'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                {activeFiltersCount > 0 && (
                  <AltairButton variant="outline" size="sm" onClick={clearFilters} className="w-full">
                    <X className="w-4 h-4 mr-1" />
                    Clear Filters
                  </AltairButton>
                )}
              </div>
            )}
          </div>
        </SectionContainer>
      </section>

      {/* Events Grid */}
      <section className="py-12 md:py-16 bg-clinical-white">
        <SectionContainer>
          {filteredEvents.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 text-slate-gray/40">
                <Calendar className="w-16 h-16" aria-hidden="true" />
              </div>
              <p className="text-xl text-slate-gray mb-4">No events found</p>
              <p className="text-slate-gray mb-2">Try adjusting your filters or search query</p>
              {activeFiltersCount > 0 && (
                <AltairButton variant="outline" onClick={clearFilters} className="mt-4">
                  Clear All Filters
                </AltairButton>
              )}
            </div>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-base font-medium text-brand-navy">
                  Showing <span className="text-brand-bronze">{filteredEvents.length}</span> event
                  {filteredEvents.length !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
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
                    registrationLink={`/events/${event.slug}`}
                  />
                ))}
              </div>
            </>
          )}
        </SectionContainer>
      </section>
    </div>
  )
}

