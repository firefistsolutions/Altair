import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ResourcesPage } from '@/components/pages/resources/ResourcesPage'
import { getServerSideURL } from '@/utilities/getURL'

const baseUrl = getServerSideURL()

export const metadata: Metadata = {
  title: 'Resources | Altair Medical System',
  description: 'Download technical documents, compliance certificates, datasheets, installation guides, and other resources for modular operation theatres and medical gas systems.',
  keywords: [
    'medical equipment resources',
    'operation theatre documentation',
    'medical gas system guides',
    'HTM compliance documents',
    'ASTM certificates',
    'technical datasheets',
    'installation guides',
  ],
  openGraph: {
    title: 'Resources | Altair Medical System',
    description: 'Download technical documents, compliance certificates, and resources for modular operation theatres and medical gas systems.',
    type: 'website',
    url: `${baseUrl}/resources`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resources | Altair Medical System',
    description: 'Download technical documents, compliance certificates, and resources for modular operation theatres and medical gas systems.',
  },
  alternates: {
    canonical: `${baseUrl}/resources`,
  },
}

export default function Resources() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-clinical-white flex items-center justify-center">Loading...</div>}>
      <ResourcesPage />
    </Suspense>
  )
}

