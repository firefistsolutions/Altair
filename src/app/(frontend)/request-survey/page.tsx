import type { Metadata } from 'next'
import { RequestSurveyPage } from '@/components/pages/request-survey/RequestSurveyPage'

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
  },
}

export default function RequestSurvey() {
  return <RequestSurveyPage />
}

