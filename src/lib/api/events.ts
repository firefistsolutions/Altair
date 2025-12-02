import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import type { Event } from '@/payload-types'

export interface EventFilters {
  eventType?: string
  eventStatus?: 'upcoming' | 'past' | 'cancelled'
  featured?: boolean
  limit?: number
  page?: number
  sort?: string
}

export interface EventsResponse {
  docs: Event[]
  totalDocs: number
  limit: number
  totalPages: number
  page?: number
  hasNextPage: boolean
  hasPrevPage: boolean
  nextPage?: number | null
  prevPage?: number | null
}

/**
 * Get all events with optional filters
 */
export async function getEvents(filters: EventFilters = {}): Promise<EventsResponse> {
  const payload = await getPayload({ config: configPromise })

  const {
    eventType,
    eventStatus,
    featured,
    limit = 12,
    page = 1,
    sort = '-startDate',
  } = filters

  const where: {
    _status: { equals: 'published' }
    eventType?: { equals: string }
    eventStatus?: { equals: 'upcoming' | 'past' | 'cancelled' }
    featured?: { equals: boolean }
  } = {
    _status: {
      equals: 'published',
    },
  }

  if (eventType) {
    where.eventType = {
      equals: eventType,
    }
  }

  if (eventStatus) {
    where.eventStatus = {
      equals: eventStatus,
    }
  }

  if (featured !== undefined) {
    where.featured = {
      equals: featured,
    }
  }

  const result = await payload.find({
    collection: 'events',
    where,
    limit,
    page,
    sort,
    depth: 2, // Populate relations (images, etc.)
  })

  return result as EventsResponse
}

/**
 * Get upcoming events
 */
export async function getUpcomingEvents(limit?: number): Promise<Event[]> {
  const now = new Date()
  
  const result = await getEvents({
    eventStatus: 'upcoming',
    limit: limit || 10,
    sort: 'startDate', // Ascending - earliest first
  })

  // Additional client-side filter to ensure startDate is in the future
  return result.docs.filter((event) => {
    if (!event.startDate) return false
    const startDate = typeof event.startDate === 'string' 
      ? new Date(event.startDate) 
      : event.startDate
    return startDate >= now
  })
}

/**
 * Get past events
 */
export async function getPastEvents(limit?: number): Promise<Event[]> {
  const now = new Date()
  
  const result = await getEvents({
    eventStatus: 'past',
    limit: limit || 10,
    sort: '-startDate', // Descending - most recent first
  })

  // Additional client-side filter to ensure startDate is in the past
  return result.docs.filter((event) => {
    if (!event.startDate) return false
    const startDate = typeof event.startDate === 'string' 
      ? new Date(event.startDate) 
      : event.startDate
    return startDate < now
  })
}

/**
 * Get featured upcoming event
 */
export async function getFeaturedEvent(): Promise<Event | null> {
  const result = await getEvents({
    eventStatus: 'upcoming',
    featured: true,
    limit: 1,
    sort: 'startDate',
  })

  return result.docs[0] || null
}

/**
 * Get a single event by slug
 */
export async function getEventBySlug(slug: string): Promise<Event | null> {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'events',
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        {
          _status: {
            equals: 'published',
          },
        },
      ],
    },
    limit: 1,
    depth: 2,
  })

  return result.docs[0] || null
}

/**
 * Get events by type
 */
export async function getEventsByType(eventType: string, limit?: number): Promise<Event[]> {
  const result = await getEvents({
    eventType,
    limit: limit || 10,
    sort: '-startDate',
  })

  return result.docs
}

/**
 * Get all event types
 */
export async function getEventTypes(): Promise<string[]> {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'events',
    where: {
      _status: {
        equals: 'published',
      },
    },
    limit: 1000,
    depth: 0,
  })

  const types = new Set<string>()
  result.docs.forEach((event) => {
    if (event.eventType && typeof event.eventType === 'string') {
      types.add(event.eventType)
    }
  })

  return Array.from(types).sort()
}

