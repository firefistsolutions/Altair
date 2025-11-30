import type { Metadata } from 'next'
import { Suspense } from 'react'
import { BlogListingPage } from '@/components/pages/blog/BlogListingPage'
import { getServerSideURL } from '@/utilities/getURL'

const baseUrl = getServerSideURL()

export const metadata: Metadata = {
  title: 'Blog | Altair Medical System',
  description: 'Stay updated with the latest news, events, trade shows, and technical insights about modular operation theatres and medical gas systems.',
  keywords: [
    'medical equipment news',
    'operation theatre updates',
    'medical gas system blog',
    'healthcare technology',
    'medical equipment trade shows',
    'hospital infrastructure',
  ],
  openGraph: {
    title: 'Blog | Altair Medical System',
    description: 'Stay updated with the latest news, events, and technical insights about modular operation theatres and medical gas systems.',
    type: 'website',
    url: `${baseUrl}/blog`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Altair Medical System',
    description: 'Stay updated with the latest news, events, and technical insights about modular operation theatres and medical gas systems.',
  },
  alternates: {
    canonical: `${baseUrl}/blog`,
  },
}

export default function Blog() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-clinical-white flex items-center justify-center">Loading...</div>}>
      <BlogListingPage />
    </Suspense>
  )
}

