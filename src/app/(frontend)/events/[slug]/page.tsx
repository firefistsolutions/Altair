import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { EventDetailPage } from '@/components/pages/events/EventDetailPage'
import { generateEventSchema } from '@/utilities/seo'
import { getServerSideURL } from '@/utilities/getURL'

// Mock event data - will be replaced with CMS data in Phase 6
const events = [
  {
    slug: 'medicall-expo-mumbai-2025',
    title: 'Medicall Expo Mumbai 2025',
    dateRange: '12-14 Dec 2025',
    startDate: '2025-12-12',
    endDate: '2025-12-14',
    location: 'Bombay Exhibition Center',
    venue: 'Mumbai, Maharashtra',
    description:
      'Join Workspace Metal Solutions at the 44th Medicall Mumbai Edition. Discover advanced Modular Operation Theater Solutions.',
    content: `
      <p>We're excited to participate in the 44th Medicall Mumbai Edition, one of India's premier medical equipment exhibitions.</p>
      
      <h2>What to Expect</h2>
      <p>Visit our booth to see live demonstrations of our latest modular operation theatre solutions, including:</p>
      <ul>
        <li>Touchless sensor systems</li>
        <li>Seamless panel technology</li>
        <li>Advanced lighting solutions</li>
        <li>Medical gas pipeline systems</li>
      </ul>
      
      <h2>Meet Our Team</h2>
      <p>Our expert team will be available to discuss your healthcare infrastructure needs and provide customized solutions.</p>
      
      <h2>Location & Timing</h2>
      <p>The event will be held at Bombay Exhibition Center, Mumbai, from December 12-14, 2025. We look forward to meeting you there!</p>
    `,
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=1200&h=600&fit=crop&q=80',
    eventType: 'Trade Show',
    featured: true,
    registrationLink: 'https://example.com/register',
  },
]

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const event = events.find((e) => e.slug === slug)

  if (!event) {
    return {
      title: 'Event Not Found | Altair Medical System',
    }
  }

  const baseUrl = getServerSideURL()

  return {
    title: `${event.title} | Altair Medical System Events`,
    description: event.description,
    keywords: [event.eventType, event.location, 'medical expo', 'trade show', 'healthcare exhibition'],
    openGraph: {
      title: `${event.title} | Altair Medical System Events`,
      description: event.description,
      images: [event.image],
      type: 'website',
      url: `${baseUrl}/events/${event.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${event.title} | Altair Medical System Events`,
      description: event.description,
      images: [event.image],
    },
    alternates: {
      canonical: `${baseUrl}/events/${event.slug}`,
    },
  }
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const event = events.find((e) => e.slug === slug)

  if (!event) {
    notFound()
  }

  const eventSchema = generateEventSchema({
    title: event.title,
    description: event.description,
    image: event.image,
    slug: event.slug,
    startDate: event.startDate,
    endDate: event.endDate,
    location: event.venue,
    venue: event.location,
    eventType: event.eventType,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <EventDetailPage event={event} />
    </>
  )
}

