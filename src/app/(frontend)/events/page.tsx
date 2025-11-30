import type { Metadata } from 'next'
import { Suspense } from 'react'
import { EventsListingPage } from '@/components/pages/events/EventsListingPage'
import { getServerSideURL } from '@/utilities/getURL'

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

export default function Events() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-clinical-white flex items-center justify-center">Loading...</div>}>
      <EventsListingPage />
    </Suspense>
  )
}

