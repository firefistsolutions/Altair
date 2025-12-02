import type { Metadata } from 'next'
import { Suspense } from 'react'
import { EventsListingPage } from '@/components/pages/events/EventsListingPage'
import { getServerSideURL } from '@/utilities/getURL'
import { getEvents, getEventTypes } from '@/lib/api/events'
import { generateItemListSchema } from '@/utilities/seo'
import { Loader2 } from 'lucide-react'

export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidate every hour

const baseUrl = getServerSideURL()

export const metadata: Metadata = {
  title: 'Events | Altair Medical System',
  description: 'Join us at leading medical technology exhibitions, trade shows, and conferences. Stay updated with upcoming events and view highlights from past exhibitions.',
  keywords: [
    'medical equipment exhibitions',
    'healthcare trade shows',
    'medical technology conferences',
    'Medicall Expo',
    'India MedTech Expo',
    'medical equipment events',
  ],
  openGraph: {
    title: 'Events | Altair Medical System',
    description: 'Join us at leading medical technology exhibitions, trade shows, and conferences.',
    type: 'website',
    url: `${baseUrl}/events`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Events | Altair Medical System',
    description: 'Join us at leading medical technology exhibitions, trade shows, and conferences.',
  },
  alternates: {
    canonical: `${baseUrl}/events`,
  },
}

function EventsLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-brand-bronze" />
    </div>
  )
}

export default async function EventsPage() {
  // Fetch events and types for schema
  const [eventsResult, eventTypes] = await Promise.all([
    getEvents({ limit: 100 }), // Get all for schema
    getEventTypes(),
  ])

  const listSchema = generateItemListSchema(
    eventsResult.docs.map((e) => ({
      name: e.title || '',
      url: `/events/${e.slug || ''}`,
    })),
    'Altair Medical System Events'
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }}
      />
      <Suspense fallback={<EventsLoading />}>
        <EventsListingPage initialEvents={eventsResult.docs} initialEventTypes={eventTypes} />
      </Suspense>
    </>
  )
}
