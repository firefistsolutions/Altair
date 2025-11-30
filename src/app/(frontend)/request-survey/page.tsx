import type { Metadata } from 'next'
import { RequestSurveyPage } from '@/components/pages/request-survey/RequestSurveyPage'
import { getServerSideURL } from '@/utilities/getURL'

const baseUrl = getServerSideURL()

export const metadata: Metadata = {
  title: 'Request a Site Survey | Altair Medical System',
  description: 'Schedule a site survey for your modular operation theatre or medical gas system project. Our experts will visit your facility and provide recommendations.',
  keywords: [
    'site survey',
    'operation theatre survey',
    'medical gas system inspection',
    'facility assessment',
    'project consultation',
  ],
  openGraph: {
    title: 'Request a Site Survey | Altair Medical System',
    description: 'Schedule a site survey for your modular operation theatre or medical gas system project.',
    type: 'website',
    url: `${baseUrl}/request-survey`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Request a Site Survey | Altair Medical System',
    description: 'Schedule a site survey for your modular operation theatre or medical gas system project.',
  },
  alternates: {
    canonical: `${baseUrl}/request-survey`,
  },
}

export default function RequestSurvey() {
  return <RequestSurveyPage />
}

