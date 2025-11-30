import type { Metadata } from 'next'
import { AboutPage } from '@/components/pages/about/AboutPage'
import { getServerSideURL } from '@/utilities/getURL'

const baseUrl = getServerSideURL()

export const metadata: Metadata = {
  title: 'About Us | Altair Medical System',
  description: 'Learn about Altair Medical System - Expert engineering and installation of modular operation theatres and medical gas systems across India. Design to Perform. Build to Last.',
  keywords: [
    'Altair Medical System',
    'modular operation theatre manufacturer',
    'medical gas systems India',
    'healthcare infrastructure',
    'HTM compliant',
    'ASTM certified',
  ],
  openGraph: {
    title: 'About Us | Altair Medical System',
    description: 'Expert engineering and installation of modular operation theatres and medical gas systems across India.',
    type: 'website',
    url: `${baseUrl}/about`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | Altair Medical System',
    description: 'Expert engineering and installation of modular operation theatres and medical gas systems across India.',
  },
  alternates: {
    canonical: `${baseUrl}/about`,
  },
}

export default function About() {
  return <AboutPage />
}

