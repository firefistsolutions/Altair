import type { Metadata } from 'next'
import { HeroSection } from '@/components/sections/HeroSection'
import { TrustSignalsBar } from '@/components/sections/TrustSignalsBar'
import { WhatWeDoSection } from '@/components/sections/WhatWeDoSection'
import { WhyAltairSection } from '@/components/sections/WhyAltairSection'
import { ProductsCarousel } from '@/components/sections/ProductsCarousel'
import { FeaturedProjectsSection } from '@/components/sections/FeaturedProjectsSection'
import { EventsSection } from '@/components/sections/EventsSection'
import { ComplianceBlock } from '@/components/sections/ComplianceBlock'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { FooterCTASection } from '@/components/sections/FooterCTASection'
import { ErrorBoundary } from '@/components/ErrorBoundary'

import { getServerSideURL } from '@/utilities/getURL'

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

export default function HomePage() {
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
        <ProductsCarousel />
      </ErrorBoundary>
      <ErrorBoundary>
        <FeaturedProjectsSection />
      </ErrorBoundary>
      <ErrorBoundary>
        <EventsSection />
      </ErrorBoundary>
      <ErrorBoundary>
        <ComplianceBlock />
      </ErrorBoundary>
      <ErrorBoundary>
        <TestimonialsSection />
      </ErrorBoundary>
      <ErrorBoundary>
        <FooterCTASection />
      </ErrorBoundary>
    </>
  )
}
