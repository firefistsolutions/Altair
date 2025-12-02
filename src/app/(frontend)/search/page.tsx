import type { Metadata } from 'next'
import { Suspense } from 'react'
import { SearchResultsPage } from '@/components/pages/search/SearchResultsPage'
import { getServerSideURL } from '@/utilities/getURL'
import { Loader2 } from 'lucide-react'

export const dynamic = 'force-dynamic' // Search is dynamic

const baseUrl = getServerSideURL()

export const metadata: Metadata = {
  title: 'Search | Altair Medical System',
  description: 'Search our products, projects, events, blog posts, and resources.',
  openGraph: {
    title: 'Search | Altair Medical System',
    description: 'Search our products, projects, events, blog posts, and resources.',
    type: 'website',
    url: `${baseUrl}/search`,
  },
  alternates: {
    canonical: `${baseUrl}/search`,
  },
}

type Args = {
  searchParams: Promise<{
    q?: string
    query?: string
    type?: string
    page?: string
  }>
}

function SearchLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-brand-bronze" />
    </div>
  )
}

export default async function SearchPage({ searchParams: searchParamsPromise }: Args) {
  const params = await searchParamsPromise
  const query = params.q || params.query || ''
  const type = params.type || 'all'
  const page = parseInt(params.page || '1', 10)

  return (
    <Suspense fallback={<SearchLoading />}>
      <SearchResultsPage initialQuery={query} initialType={type} _initialPage={page} />
    </Suspense>
  )
}
