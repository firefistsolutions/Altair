'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, Loader2, Package, Building2, Calendar, FileText, BookOpen, X } from 'lucide-react'
import { SectionContainer } from '@/components/ui/section-container'
import { AltairCard } from '@/components/ui/altair-card'
import { AltairButton } from '@/components/ui/altair-button'
import { AltairBadge } from '@/components/ui/altair-badge'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import Image from 'next/image'
import { getClientSideURL } from '@/utilities/getURL'

interface SearchResult {
  id: string | number
  type: 'product' | 'project' | 'event' | 'post' | 'resource'
  title: string
  description?: string
  slug: string
  image?: any
  category?: string
  client?: string
  location?: string
  year?: number
  startDate?: string | Date
  eventType?: string
  publishedAt?: string | Date
}

interface SearchResultsPageProps {
  initialQuery?: string
  initialType?: string
  initialPage?: number
}

const typeLabels = {
  all: 'All Results',
  products: 'Products',
  projects: 'Projects',
  events: 'Events',
  posts: 'Blog Posts',
  resources: 'Resources',
}

const typeIcons = {
  product: Package,
  project: Building2,
  event: Calendar,
  post: FileText,
  resource: BookOpen,
}

const typeColors = {
  product: 'bronze',
  project: 'default',
  event: 'outline',
  post: 'default',
  resource: 'outline',
} as const

function getMediaUrl(media: any): string {
  if (!media) return 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop&q=80'
  if (typeof media === 'string') return media
  if (media.url) {
    const baseUrl = getClientSideURL()
    if (media.url.startsWith('http://') || media.url.startsWith('https://')) {
      return media.url
    }
    return `${baseUrl}${media.url}`
  }
  return 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop&q=80'
}

function getResultUrl(result: SearchResult): string {
  const basePaths = {
    product: '/products',
    project: '/projects',
    event: '/events',
    post: '/posts',
    resource: '/resources',
  }
  return `${basePaths[result.type]}/${result.slug}`
}

export function SearchResultsPage({ initialQuery = '', initialType = 'all', initialPage = 1 }: SearchResultsPageProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [selectedType, setSelectedType] = useState(initialType)
  const [results, setResults] = useState<{
    products: SearchResult[]
    projects: SearchResult[]
    events: SearchResult[]
    posts: SearchResult[]
    resources: SearchResult[]
  }>({
    products: [],
    projects: [],
    events: [],
    posts: [],
    resources: [],
  })
  const [isLoading, setIsLoading] = useState(false)
  const [totalResults, setTotalResults] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const allResults = useMemo(() => {
    return [
      ...results.products,
      ...results.projects,
      ...results.events,
      ...results.posts,
      ...results.resources,
    ]
  }, [results])

  useEffect(() => {
    const query = searchParams.get('q') || searchParams.get('query') || ''
    const type = searchParams.get('type') || 'all'
    setSearchQuery(query)
    setSelectedType(type)
  }, [searchParams])

  useEffect(() => {
    if (searchQuery.trim()) {
      performSearch(searchQuery, selectedType)
    } else {
      setResults({ products: [], projects: [], events: [], posts: [], resources: [] })
      setTotalResults(0)
    }
  }, [searchQuery, selectedType])

  const performSearch = async (query: string, type: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams({
        q: query,
        type,
        limit: '20',
        page: '1',
      })

      const response = await fetch(`/api/search?${params.toString()}`)
      if (!response.ok) {
        throw new Error('Search failed')
      }

      const data = await response.json()
      setResults(data.results)
      setTotalResults(data.totalResults)
    } catch (err: any) {
      console.error('Search error:', err)
      setError(err.message || 'An error occurred while searching')
      setResults({ products: [], projects: [], events: [], posts: [], resources: [] })
      setTotalResults(0)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchQuery.trim()) {
      params.set('q', searchQuery.trim())
      if (selectedType !== 'all') {
        params.set('type', selectedType)
      }
      router.push(`/search?${params.toString()}`)
    }
  }

  const handleTypeChange = (type: string) => {
    setSelectedType(type)
    const params = new URLSearchParams()
    if (searchQuery.trim()) {
      params.set('q', searchQuery.trim())
      if (type !== 'all') {
        params.set('type', type)
      }
      router.push(`/search?${params.toString()}`)
    }
  }

  return (
    <div className="min-h-screen bg-clinical-white">
      {/* Hero Section */}
      <section className="bg-brand-navy text-white py-12 md:py-16">
        <SectionContainer>
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Search</h1>
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-gray" />
              <Input
                type="text"
                placeholder="Search products, projects, events, blog posts, and resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg bg-white text-brand-navy"
              />
              <AltairButton
                type="submit"
                variant="bronze"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Search'}
              </AltairButton>
            </form>
          </div>
        </SectionContainer>
      </section>

      {/* Filters */}
      {searchQuery && (
        <section className="border-b border-border-gray bg-white">
          <SectionContainer>
            <div className="py-4 flex items-center gap-4 flex-wrap">
              <span className="text-sm font-medium text-slate-gray">Filter by type:</span>
              {Object.entries(typeLabels).map(([value, label]) => (
                <button
                  key={value}
                  onClick={() => handleTypeChange(value)}
                  className={`px-4 py-2 rounded-md text-sm transition-colors ${
                    selectedType === value
                      ? 'bg-brand-bronze text-white'
                      : 'bg-light-gray text-brand-navy hover:bg-border-gray'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </SectionContainer>
        </section>
      )}

      {/* Results */}
      <section className="py-12 md:py-16">
        <SectionContainer>
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-brand-bronze" />
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-600 mb-4">{error}</p>
              <AltairButton variant="outline" onClick={() => performSearch(searchQuery, selectedType)}>
                Try Again
              </AltairButton>
            </div>
          ) : searchQuery && totalResults === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-gray text-lg mb-4">No results found for &quot;{searchQuery}&quot;</p>
              <p className="text-slate-gray">Try different keywords or check your spelling.</p>
            </div>
          ) : searchQuery && totalResults > 0 ? (
            <>
              <div className="mb-8">
                <p className="text-slate-gray">
                  Found <strong>{totalResults}</strong> result{totalResults !== 1 ? 's' : ''} for &quot;
                  {searchQuery}&quot;
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allResults.map((result) => {
                  const Icon = typeIcons[result.type]
                  const imageUrl = getMediaUrl(result.image)

                  return (
                    <Link key={`${result.type}-${result.id}`} href={getResultUrl(result)}>
                      <AltairCard className="h-full hover:shadow-lg transition-shadow group">
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={imageUrl}
                            alt={result.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            quality={85}
                          />
                          <div className="absolute top-4 right-4">
                            <AltairBadge variant={typeColors[result.type]} size="sm">
                              <Icon className="w-3 h-3 mr-1" />
                              {typeLabels[result.type as keyof typeof typeLabels] || result.type}
                            </AltairBadge>
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-semibold mb-2 text-brand-navy group-hover:text-brand-bronze transition-colors">
                            {result.title}
                          </h3>
                          {result.description && (
                            <p className="text-sm text-slate-gray line-clamp-2 mb-4">{result.description}</p>
                          )}
                          <div className="flex flex-wrap gap-2">
                            {result.category && (
                              <AltairBadge variant="outline" size="sm">
                                {result.category}
                              </AltairBadge>
                            )}
                            {result.location && (
                              <AltairBadge variant="outline" size="sm">
                                {result.location}
                              </AltairBadge>
                            )}
                            {result.year && (
                              <AltairBadge variant="outline" size="sm">
                                {result.year}
                              </AltairBadge>
                            )}
                          </div>
                        </div>
                      </AltairCard>
                    </Link>
                  )
                })}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-slate-gray text-lg">Enter a search query to find products, projects, events, and more.</p>
            </div>
          )}
        </SectionContainer>
      </section>
    </div>
  )
}

