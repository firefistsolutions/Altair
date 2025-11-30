'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Search, Filter, X, Calendar, User, ArrowRight, FileText } from 'lucide-react'
import { SectionContainer } from '@/components/ui/section-container'
import { AltairCard } from '@/components/ui/altair-card'
import { AltairButton } from '@/components/ui/altair-button'
import { AltairBadge } from '@/components/ui/altair-badge'
import { Input } from '@/components/ui/input'

// Mock blog posts data - will be replaced with CMS data in Phase 6
const allPosts = [
  {
    id: 1,
    title: 'Advancements in Modular Operation Theatre Design',
    excerpt:
      'Exploring the latest innovations in modular OT design, including touchless systems, advanced lighting, and seamless panel technology.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop&q=80',
    category: 'Technical',
    author: 'Altair Medical Team',
    date: '2024-12-15',
    slug: 'advancements-modular-ot-design',
    featured: true,
  },
  {
    id: 2,
    title: 'Medicall Expo Mumbai 2025 - Highlights',
    excerpt:
      'Recap of our participation at the 44th Medicall Mumbai Edition, showcasing our latest modular OT solutions and meeting healthcare professionals.',
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&h=600&fit=crop&q=80',
    category: 'Events',
    author: 'Marketing Team',
    date: '2024-12-10',
    slug: 'medicall-expo-mumbai-2025',
    featured: false,
  },
  {
    id: 3,
    title: 'Understanding HTM-02-01 Compliance',
    excerpt:
      'A comprehensive guide to HTM-02-01 compliance requirements for medical gas systems and operation theatres in healthcare facilities.',
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=600&fit=crop&q=80',
    category: 'Technical',
    author: 'Technical Team',
    date: '2024-12-05',
    slug: 'understanding-htm-compliance',
    featured: false,
  },
  {
    id: 4,
    title: 'Oxygen Cleaning: Best Practices for Medical Gas Pipelines',
    excerpt:
      'Learn about the critical importance of oxygen cleaning in medical gas systems and the best practices we follow at Altair Medical.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop&q=80',
    category: 'Technical',
    author: 'Technical Team',
    date: '2024-11-28',
    slug: 'oxygen-cleaning-best-practices',
    featured: false,
  },
  {
    id: 5,
    title: 'Successful Installation at Government Medical College, Jalgaon',
    excerpt:
      'Case study of our rapid 5-day installation of 5 modular operation theatres at GMCH Jalgaon, showcasing our efficiency and expertise.',
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&h=600&fit=crop&q=80',
    category: 'News',
    author: 'Project Team',
    date: '2024-11-20',
    slug: 'gmch-jalgaon-installation',
    featured: false,
  },
  {
    id: 6,
    title: 'India MedTech Expo 2025 - Join Us',
    excerpt:
      'We\'re excited to announce our participation at India MedTech Expo 2025. Visit our booth to see our latest innovations in healthcare infrastructure.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop&q=80',
    category: 'Events',
    author: 'Marketing Team',
    date: '2024-11-15',
    slug: 'india-medtech-expo-2025',
    featured: false,
  },
]

const categories = ['All', 'Technical', 'Events', 'News', 'Trade Shows']

export function BlogListingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All')
  const [showFilters, setShowFilters] = useState(false)
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams()
    if (debouncedSearch) params.set('search', debouncedSearch)
    if (selectedCategory !== 'All') params.set('category', selectedCategory)
    if (currentPage > 1) params.set('page', currentPage.toString())

    const newUrl = params.toString() ? `?${params.toString()}` : '/blog'
    router.replace(newUrl, { scroll: false })
  }, [debouncedSearch, selectedCategory, currentPage, router])

  const filteredPosts = useMemo(() => {
    let filtered = [...allPosts]

    // Search filter
    if (debouncedSearch) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          post.category.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    }

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((post) => post.category === selectedCategory)
    }

    // Sort: featured first, then by date (newest first)
    filtered.sort((a, b) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })

    return filtered
  }, [debouncedSearch, selectedCategory])

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + itemsPerPage)
  const featuredPost = filteredPosts.find((post) => post.featured)
  const regularPosts = paginatedPosts.filter((post) => !post.featured || currentPage > 1)

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearch, selectedCategory])

  const activeFiltersCount = (debouncedSearch ? 1 : 0) + (selectedCategory !== 'All' ? 1 : 0)

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('All')
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  return (
    <div className="min-h-screen bg-clinical-white">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-brand-navy text-white">
        <SectionContainer>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
            <p className="text-lg text-white/90 leading-relaxed">
              Stay updated with the latest news, events, trade shows, and technical insights about modular
              operation theatres and medical gas systems.
            </p>
          </div>
        </SectionContainer>
      </section>

      {/* Filters and Search Bar */}
      <section className="border-b border-border-gray bg-white sticky top-[73px] md:top-24 z-30">
        <SectionContainer>
          <div className="py-4">
            {/* Mobile Filter Toggle */}
            <div className="flex items-center gap-4 mb-4 md:hidden">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-border-gray rounded-md hover:bg-light-gray transition-colors"
                aria-label="Toggle filters"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <AltairBadge variant="bronze" size="sm">
                    {activeFiltersCount}
                  </AltairBadge>
                )}
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-gray" />
              <Input
                type="text"
                placeholder="Search blog posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>

            {/* Filters (Desktop) */}
            <div className="hidden md:flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium text-slate-gray whitespace-nowrap">Category:</span>
                <div className="flex gap-2 flex-wrap">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1 rounded-md text-sm transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-brand-bronze ${
                        selectedCategory === category
                          ? 'bg-brand-bronze text-white'
                          : 'bg-light-gray text-brand-navy hover:bg-border-gray'
                      }`}
                      aria-pressed={selectedCategory === category}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {activeFiltersCount > 0 && (
                <AltairButton variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="w-4 h-4 mr-1" />
                  Clear Filters
                </AltairButton>
              )}
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="md:hidden space-y-4 pt-4 border-t border-border-gray">
                <div>
                  <label className="block text-sm font-medium text-slate-gray mb-2">Category</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-1 rounded-md text-sm transition-colors ${
                          selectedCategory === category
                            ? 'bg-brand-bronze text-white'
                            : 'bg-light-gray text-brand-navy'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {activeFiltersCount > 0 && (
                  <AltairButton variant="outline" size="sm" onClick={clearFilters} className="w-full">
                    <X className="w-4 h-4 mr-1" />
                    Clear Filters
                  </AltairButton>
                )}
              </div>
            )}
          </div>
        </SectionContainer>
      </section>

      {/* Blog Posts */}
      <section className="py-12 md:py-16 bg-clinical-white">
        <SectionContainer>
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 text-slate-gray/40">
                <FileText className="w-16 h-16" aria-hidden="true" />
              </div>
              <p className="text-xl text-slate-gray mb-4">No blog posts found</p>
              <p className="text-slate-gray mb-2">Try adjusting your filters or search query</p>
              {activeFiltersCount > 0 && (
                <AltairButton variant="outline" onClick={clearFilters} className="mt-4">
                  Clear All Filters
                </AltairButton>
              )}
            </div>
          ) : (
            <>
              {/* Featured Post (only on first page) */}
              {featuredPost && currentPage === 1 && (
                <div className="mb-12">
                  <AltairCard className="overflow-hidden p-0">
                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="block group focus:outline-none focus:ring-2 focus:ring-brand-bronze rounded-lg"
                    >
                      <div className="grid md:grid-cols-2 gap-0">
                        <div className="relative aspect-[4/3] md:aspect-auto md:h-full min-h-[300px]">
                          <Image
                            src={featuredPost.image}
                            alt={featuredPost.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                          />
                          <div className="absolute top-4 left-4 z-10">
                            <AltairBadge variant="bronze">Featured</AltairBadge>
                          </div>
                        </div>
                        <div className="p-8 md:p-12 flex flex-col justify-center">
                          <div className="flex items-center gap-4 mb-4 text-sm text-slate-gray">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatDate(featuredPost.date)}
                            </span>
                            <span className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {featuredPost.author}
                            </span>
                          </div>
                          <AltairBadge variant="outline" size="sm" className="mb-4 w-fit">
                            {featuredPost.category}
                          </AltairBadge>
                          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-navy group-hover:text-brand-bronze transition-colors">
                            {featuredPost.title}
                          </h2>
                          <p className="text-slate-gray mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                          <AltairButton variant="bronze" size="lg" className="w-fit">
                            Read More
                            <ArrowRight className="w-4 h-4" />
                          </AltairButton>
                        </div>
                      </div>
                    </Link>
                  </AltairCard>
                </div>
              )}

              {/* Regular Posts Grid */}
              {regularPosts.length > 0 && (
                <>
                  <div className="mb-6">
                    <p className="text-base font-medium text-brand-navy">
                      {featuredPost && currentPage === 1 ? 'More Posts' : 'Blog Posts'}
                      {totalPages > 1 && (
                        <span className="text-slate-gray">
                          {' '}
                          - Page {currentPage} of {totalPages}
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {regularPosts.map((post) => (
                      <Link
                        key={post.id}
                        href={`/blog/${post.slug}`}
                        className="block h-full focus:outline-none focus:ring-2 focus:ring-brand-bronze rounded-lg"
                      >
                        <AltairCard className="group overflow-hidden h-full flex flex-col">
                          <div className="relative aspect-[4/3] overflow-hidden flex-shrink-0">
                            <Image
                              src={post.image}
                              alt={post.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                            <div className="absolute top-4 right-4 z-10">
                              <AltairBadge variant="outline" size="sm" className="bg-white/95 backdrop-blur-sm">
                                {post.category}
                              </AltairBadge>
                            </div>
                          </div>
                          <div className="p-6 flex flex-col flex-1">
                            <div className="flex items-center gap-3 mb-3 text-xs text-slate-gray">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {formatDate(post.date)}
                              </span>
                              <span className="flex items-center gap-1">
                                <User className="w-3 h-3" />
                                {post.author}
                              </span>
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-brand-navy group-hover:text-brand-bronze transition-colors">
                              {post.title}
                            </h3>
                            <p className="text-sm text-slate-gray mb-4 line-clamp-3 leading-relaxed flex-1">
                              {post.excerpt}
                            </p>
                            <AltairButton variant="ghost" size="sm" className="w-fit mt-auto">
                              Read More
                              <ArrowRight className="w-4 h-4" />
                            </AltairButton>
                          </div>
                        </AltairCard>
                      </Link>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-12 flex items-center justify-center gap-2">
                      <AltairButton
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        aria-label="Previous page"
                      >
                        Previous
                      </AltairButton>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                          if (
                            page === 1 ||
                            page === totalPages ||
                            (page >= currentPage - 1 && page <= currentPage + 1)
                          ) {
                            return (
                              <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                                  currentPage === page
                                    ? 'bg-brand-bronze text-white'
                                    : 'bg-light-gray text-brand-navy hover:bg-border-gray'
                                }`}
                                aria-label={`Go to page ${page}`}
                                aria-current={currentPage === page ? 'page' : undefined}
                              >
                                {page}
                              </button>
                            )
                          } else if (page === currentPage - 2 || page === currentPage + 2) {
                            return (
                              <span key={page} className="px-2 text-slate-gray">
                                ...
                              </span>
                            )
                          }
                          return null
                        })}
                      </div>
                      <AltairButton
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        aria-label="Next page"
                      >
                        Next
                      </AltairButton>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </SectionContainer>
      </section>
    </div>
  )
}

