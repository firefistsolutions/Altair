import type { Metadata } from 'next'
import { RequestQuotePage } from '@/components/pages/request-quote/RequestQuotePage'

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
  },
}

export default function RequestQuote() {
  return <RequestQuotePage />
}

