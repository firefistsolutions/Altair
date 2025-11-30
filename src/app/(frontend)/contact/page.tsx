import type { Metadata } from 'next'
import { ContactPage } from '@/components/pages/contact/ContactPage'
import { getServerSideURL } from '@/utilities/getURL'

const baseUrl = getServerSideURL()

export const metadata: Metadata = {
  title: 'Contact Us | Altair Medical System',
  description: 'Get in touch with Altair Medical System for modular operation theatre and medical gas system solutions. Contact us for consultations, site surveys, and project inquiries.',
  keywords: [
    'contact Altair Medical',
    'modular OT consultation',
    'medical gas system inquiry',
    'site survey request',
    'healthcare infrastructure consultation',
  ],
  openGraph: {
    title: 'Contact Us | Altair Medical System',
    description: 'Get in touch with Altair Medical System for modular operation theatre and medical gas system solutions.',
    type: 'website',
    url: `${baseUrl}/contact`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Altair Medical System',
    description: 'Get in touch with Altair Medical System for modular operation theatre and medical gas system solutions.',
  },
  alternates: {
    canonical: `${baseUrl}/contact`,
  },
}

export default function Contact() {
  return <ContactPage />
}

