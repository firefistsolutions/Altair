'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Search, Filter, X, Loader2, ChevronLeft, ChevronRight } from 'lucide-react'
import { SectionContainer } from '@/components/ui/section-container'
import { ProductCard } from '@/components/ui/product-card'
import { AltairButton } from '@/components/ui/altair-button'
import { Input } from '@/components/ui/input'
import { AltairBadge } from '@/components/ui/altair-badge'
import type { Product } from '@/payload-types'
import { transformProduct } from '@/lib/utils/transform-product'

interface ProductsListingPageProps {
  initialProducts?: Product[]
  initialCategories?: string[]
}

const mockProducts = [
  {
    id: 1,
    title: 'Modular Operation Theater',
    description: 'Precision-engineered modular OT with seamless panels, touchless systems, and premium lighting.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop&q=80',
    specs: ['HTM-02-01', 'Seamless Panels', 'Touchless Systems'],
    slug: 'modular-operation-theater',
    category: 'Operation Theatres',
    featured: true,
  },
  {
    id: 2,
    title: 'Surgical Pendant',
    description: 'Advanced surgical pendant with medical gas outlets and electrical services.',
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&h=600&fit=crop&q=80',
    specs: ['CE Certified', 'Gas Outlets', 'Electrical'],
    slug: 'surgical-pendant',
    category: 'Critical Care',
    featured: false,
  },
  {
    id: 3,
    title: 'Bed-Head Unit',
    description: 'Comprehensive bed-head unit for critical care with integrated medical gas and electrical services.',
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=600&fit=crop&q=80',
    specs: ['Oxygen Cleaning', 'Color-Coded', 'ISO 13485'],
    slug: 'bed-head-unit',
    category: 'Critical Care',
    featured: false,
  },
  {
    id: 4,
    title: 'Medical Gas Manifold',
    description: 'Central medical gas manifold system with alarm panels and zone valve boxes.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop&q=80',
    specs: ['Central System', 'Alarm Panels', 'Zone Valves'],
    slug: 'medical-gas-manifold',
    category: 'Medical Gas Systems',
    featured: false,
  },
  {
    id: 5,
    title: 'Medical Gas Outlets',
    description: 'DIN/BS/ISO compliant medical gas outlets with color-coded identification.',
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&h=600&fit=crop&q=80',
    specs: ['DIN Compliant', 'BS Standard', 'ISO Certified'],
    slug: 'medical-gas-outlets',
    category: 'Medical Gas Systems',
    featured: false,
  },
  {
    id: 6,
    title: 'Zone Valve Box',
    description: 'Medical gas zone valve boxes for safe isolation and control of gas supply.',
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=600&fit=crop&q=80',
    specs: ['Safety Valves', 'Color-Coded', 'HTM Compliant'],
    slug: 'zone-valve-box',
    category: 'Medical Gas Systems',
    featured: false,
  },
]

const sortOptions = [
  { value: 'name', label: 'Name (A-Z)' },
  { value: 'featured', label: 'Featured First' },
  { value: 'category', label: 'Category' },
]

export function ProductsListingPage({ 
  initialProducts = [], 
  initialCategories = [] 
}: ProductsListingPageProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All')
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(searchParams.get('featured') === 'true')
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'featured')
  const [showFilters, setShowFilters] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
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
    if (showFeaturedOnly) params.set('featured', 'true')
    if (sortBy !== 'featured') params.set('sort', sortBy)

    const newUrl = params.toString() ? `?${params.toString()}` : '/products'
    router.replace(newUrl, { scroll: false })
  }, [debouncedSearch, selectedCategory, showFeaturedOnly, sortBy, router])

  // Transform CMS products to component format
  const transformedProducts = useMemo(() => {
    if (initialProducts.length > 0) {
      return initialProducts.map(transformProduct)
    }
    // Fallback to mock data if no CMS data
    return mockProducts
  }, [initialProducts])

  // Build categories list
  const categories = useMemo(() => {
    const cats = ['All', ...initialCategories]
    return cats.length > 1 ? cats : ['All', 'Operation Theatres', 'Critical Care', 'Medical Gas Systems']
  }, [initialCategories])

  const filteredProducts = useMemo(() => {
    let filtered = [...transformedProducts]

    // Search filter
    if (debouncedSearch) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          product.description.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          product.category.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    }

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Featured filter
    if (showFeaturedOnly) {
      filtered = filtered.filter((product) => product.featured)
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.title.localeCompare(b.title)
        case 'featured':
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return a.title.localeCompare(b.title)
        case 'category':
          return a.category.localeCompare(b.category)
        default:
          return 0
      }
    })

    return filtered
  }, [debouncedSearch, selectedCategory, showFeaturedOnly, sortBy, transformedProducts])

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage)

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearch, selectedCategory, showFeaturedOnly, sortBy])

  // Loading state for search debounce
  useEffect(() => {
    if (searchQuery !== debouncedSearch) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }, [searchQuery, debouncedSearch])

  const activeFiltersCount =
    (debouncedSearch ? 1 : 0) + (selectedCategory !== 'All' ? 1 : 0) + (showFeaturedOnly ? 1 : 0)

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('All')
    setShowFeaturedOnly(false)
    setSortBy('featured')
  }

  return (
    <div className="min-h-screen bg-clinical-white">
      {/* Hero Section */}
      <section className="bg-brand-navy text-white py-12 md:py-16">
        <SectionContainer>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Product Range</h1>
            <p className="text-lg text-white/90 leading-relaxed">
              Comprehensive solutions for modern healthcare infrastructure. All products comply with
              HTM-02-01 and ASTM standards.
            </p>
          </div>
        </SectionContainer>
      </section>

      {/* Filters and Search Bar */}
      <section className="border-b border-border-gray bg-white relative">
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
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>

            {/* Filters (Desktop) */}
            <div className="hidden md:flex flex-wrap items-center gap-4">
              {/* Category Filter */}
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

              {/* Featured Toggle */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showFeaturedOnly}
                  onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                  className="w-4 h-4 text-brand-bronze rounded focus:ring-brand-bronze"
                />
                <span className="text-sm text-slate-gray">Featured Only</span>
              </label>

              {/* Sort */}
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm font-medium text-slate-gray whitespace-nowrap">Sort:</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-1 pr-8 border border-border-gray rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-bronze appearance-none"
                    aria-label="Sort products"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-slate-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
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

                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showFeaturedOnly}
                      onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                      className="w-4 h-4 text-brand-bronze rounded"
                    />
                    <span className="text-sm text-slate-gray">Featured Only</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-gray mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-border-gray rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-bronze"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
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

      {/* Products Grid */}
      <section className="py-12 md:py-16 bg-clinical-white">
        <SectionContainer>
          {isLoading ? (
            <div className="text-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-brand-bronze mx-auto mb-4" />
              <p className="text-slate-gray">Loading products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 text-slate-gray/40">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-xl text-slate-gray mb-4">No products found</p>
              <p className="text-slate-gray mb-2">Try adjusting your filters or search query</p>
              <p className="text-sm text-slate-gray/80 mb-6">
                Suggestions: Try different keywords, clear filters, or browse all categories
              </p>
              {activeFiltersCount > 0 && (
                <AltairButton variant="outline" onClick={clearFilters}>
                  Clear All Filters
                </AltairButton>
              )}
            </div>
          ) : (
            <>
              <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <p className="text-base font-medium text-brand-navy">
                    Showing <span className="text-brand-bronze">
                      {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredProducts.length)}
                    </span> of <span className="text-brand-bronze">{filteredProducts.length}</span> product{filteredProducts.length !== 1 ? 's' : ''}
                  </p>
                  {totalPages > 1 && (
                    <p className="text-sm text-slate-gray mt-1">
                      Page {currentPage} of {totalPages}
                    </p>
                  )}
                </div>
                {activeFiltersCount > 0 && (
                  <AltairButton variant="ghost" size="sm" onClick={clearFilters}>
                    <X className="w-4 h-4 mr-1" />
                    Clear Filters
                  </AltairButton>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} {...product} category={product.category} />
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
                    <ChevronLeft className="w-4 h-4" />
                  </AltairButton>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                      // Show first page, last page, current page, and pages around current
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
                          <span key={page} className="px-2 text-slate-gray" title={`Pages ${currentPage - 1 > 2 ? `${currentPage - 1}` : ''} to ${currentPage + 1 < totalPages - 1 ? `${currentPage + 1}` : ''}`}>
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
                    <ChevronRight className="w-4 h-4" />
                  </AltairButton>
                </div>
              )}
            </>
          )}
        </SectionContainer>
      </section>
    </div>
  )
}

