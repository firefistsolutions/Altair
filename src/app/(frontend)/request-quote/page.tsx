import type { Metadata } from 'next'
import { RequestQuotePage } from '@/components/pages/request-quote/RequestQuotePage'
import { getServerSideURL } from '@/utilities/getURL'

const baseUrl = getServerSideURL()

export const metadata: Metadata = {
  title: 'Request a Quote | Altair Medical System',
  description: 'Request a customized quote for modular operation theatre and medical gas system solutions. Get detailed pricing and project specifications.',
  keywords: [
    'modular OT quote',
    'medical gas system pricing',
    'operation theatre cost',
    'project quote',
    'healthcare infrastructure quote',
  ],
  openGraph: {
    title: 'Request a Quote | Altair Medical System',
    description: 'Request a customized quote for modular operation theatre and medical gas system solutions.',
    type: 'website',
    url: `${baseUrl}/request-quote`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Request a Quote | Altair Medical System',
    description: 'Request a customized quote for modular operation theatre and medical gas system solutions.',
  },
  alternates: {
    canonical: `${baseUrl}/request-quote`,
  },
}

export default function RequestQuote() {
  return <RequestQuotePage />
}

