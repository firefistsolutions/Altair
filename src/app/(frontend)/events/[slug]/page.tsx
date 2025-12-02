import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { EventDetailPage } from '@/components/pages/events/EventDetailPage'
import { generateEventSchema } from '@/utilities/seo'
import { getServerSideURL } from '@/utilities/getURL'
import { getEventBySlug, getEvents } from '@/lib/api/events'
import { transformEvent } from '@/lib/utils/transform-event'

export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidate every hour

export async function generateStaticParams() {
  const events = await getEvents({ limit: 1000 })
  return events.docs.map((event) => ({
    slug: event.slug || '',
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const event = await getEventBySlug(slug)

  if (!event) {
    return {
      title: 'Event Not Found | Altair Medical System',
    }
  }

  const baseUrl = getServerSideURL()
  const transformed = transformEvent(event)

  return {
    title: `${event.title} | Altair Medical System Events`,
    description: '', // Events use richText description, extract if needed
    keywords: [
      typeof event.eventType === 'string' ? event.eventType : '',
      event.location || '',
      'medical expo',
      'trade show',
      'healthcare exhibition',
    ],
    openGraph: {
      title: `${event.title} | Altair Medical System Events`,
      description: event.title || '',
      images: [transformed.image],
      type: 'website',
      url: `${baseUrl}/events/${event.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${event.title} | Altair Medical System Events`,
      description: event.title || '',
      images: [transformed.image],
    },
    alternates: {
      canonical: `${baseUrl}/events/${event.slug}`,
    },
  }
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const event = await getEventBySlug(slug)

  if (!event) {
    notFound()
  }

  const transformed = transformEvent(event)

  // Get related events (same type, excluding current)
  const relatedEventsResult = await getEvents({
    eventType: typeof event.eventType === 'string' ? event.eventType : undefined,
    limit: 4,
  })
  const relatedEvents = relatedEventsResult.docs
    .filter((e) => e.id !== event.id)
    .slice(0, 3)
    .map(transformEvent)

  const startDate = event.startDate 
    ? (typeof event.startDate === 'string' ? new Date(event.startDate) : event.startDate)
    : null
  const endDate = event.endDate 
    ? (typeof event.endDate === 'string' ? new Date(event.endDate) : event.endDate)
    : null
    
  const startDateStr = startDate ? startDate.toISOString().split('T')[0] : ''
  const endDateStr = endDate ? endDate.toISOString().split('T')[0] : ''

  const descriptionText = typeof transformed.description === 'string' 
    ? transformed.description 
    : transformed.title

  const eventSchema = generateEventSchema({
    title: transformed.title,
    description: descriptionText,
    image: transformed.image,
    slug: transformed.slug,
    startDate: startDateStr,
    endDate: endDateStr,
    location: transformed.location,
    venue: transformed.venue || transformed.location,
    eventType: transformed.eventType,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <EventDetailPage 
        event={{
          ...transformed,
          dateRange: startDateStr && endDateStr 
            ? `${new Date(startDateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} - ${new Date(endDateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`
            : '',
          startDate: startDateStr,
          endDate: endDateStr,
          content: typeof event.description === 'object' ? JSON.stringify(event.description) : '',
          description: descriptionText,
        }} 
        relatedEvents={relatedEvents} 
      />
    </>
  )
}
