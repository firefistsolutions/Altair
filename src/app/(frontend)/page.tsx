import type { Metadata } from 'next'
import { HeroSection } from '@/components/sections/HeroSection'
import { TrustSignalsBar } from '@/components/sections/TrustSignalsBar'
import { WhatWeDoSection } from '@/components/sections/WhatWeDoSection'
import { WhyAltairSection } from '@/components/sections/WhyAltairSection'
import { ProductsCarousel } from '@/components/sections/ProductsCarousel'
import { EventsSection } from '@/components/sections/EventsSection'
import { ComplianceBlock } from '@/components/sections/ComplianceBlock'
import { FooterCTASection } from '@/components/sections/FooterCTASection'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { getServerSideURL } from '@/utilities/getURL'
import { getFeaturedProducts } from '@/lib/api/products'
import { getUpcomingEvents, getPastEvents } from '@/lib/api/events'
import { transformProduct } from '@/lib/utils/transform-product'
import { transformEvent } from '@/lib/utils/transform-event'

export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidate every hour

const baseUrl = getServerSideURL()

export const metadata: Metadata = {
  title: 'Altair Medical System | Modular Operation Theatres & Medical Gas Systems',
  description: 'Design to Perform. Build to Last. Expert engineering and installation of modular operation theatres and medical gas pipeline systems. HTM & ASTM compliant solutions across India.',
  keywords: [
    'modular operation theatre',
    'medical gas systems',
    'surgical pendant',
    'bed-head unit',
    'HTM-02-01 compliant',
    'ASTM certified',
    'medical gas pipeline',
    'operation theater installation',
    'India',
  ],
  openGraph: {
    title: 'Altair Medical System | Modular Operation Theatres & Medical Gas Systems',
    description: 'Design to Perform. Build to Last. Expert engineering and installation of modular operation theatres and medical gas pipeline systems.',
    type: 'website',
    locale: 'en_IN',
    url: baseUrl,
    siteName: 'Altair Medical System',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Altair Medical System | Modular Operation Theatres & Medical Gas Systems',
    description: 'Design to Perform. Build to Last. Expert engineering and installation of modular operation theatres and medical gas pipeline systems.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: baseUrl,
  },
}

export default async function HomePage() {
  // Fetch featured content for homepage sections
  const [featuredProducts, upcomingEvents, pastEvents] = await Promise.all([
    getFeaturedProducts(8), // Get 8 featured products for carousel
    getUpcomingEvents(6), // Get 6 upcoming events
    getPastEvents(6), // Get 6 past events
  ])

  // Transform data for components
  const transformedProducts = featuredProducts.map(transformProduct)
  const transformedUpcomingEvents = upcomingEvents.map(transformEvent)
  const transformedPastEvents = pastEvents.map(transformEvent)

  return (
    <>
      <ErrorBoundary>
        <HeroSection />
      </ErrorBoundary>
      <ErrorBoundary>
        <TrustSignalsBar />
      </ErrorBoundary>
      <ErrorBoundary>
        <WhatWeDoSection />
      </ErrorBoundary>
      <ErrorBoundary>
        <WhyAltairSection />
      </ErrorBoundary>
      <ErrorBoundary>
        <ProductsCarousel products={transformedProducts} />
      </ErrorBoundary>
      <ErrorBoundary>
        <EventsSection 
          upcomingEvents={transformedUpcomingEvents} 
          pastEvents={transformedPastEvents} 
        />
      </ErrorBoundary>
      <ErrorBoundary>
        <ComplianceBlock />
      </ErrorBoundary>
      <ErrorBoundary>
        <FooterCTASection />
      </ErrorBoundary>
    </>
  )
}
