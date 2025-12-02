import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import type { Resource } from '@/payload-types'

export interface ResourceFilters {
  category?: string
  featured?: boolean
  limit?: number
  page?: number
  sort?: string
}

export interface ResourcesResponse {
  docs: Resource[]
  totalDocs: number
  limit: number
  totalPages: number
  page?: number
  hasNextPage: boolean
  hasPrevPage: boolean
  nextPage?: number | null
  prevPage?: number | null
}

/**
 * Get all resources with optional filters
 */
export async function getResources(filters: ResourceFilters = {}): Promise<ResourcesResponse> {
  const payload = await getPayload({ config: configPromise })

  const {
    category,
    featured,
    limit = 12,
    page = 1,
    sort = '-publishedAt',
  } = filters

  const where: {
    _status: { equals: 'published' }
    category?: { equals: string }
    featured?: { equals: boolean }
  } = {
    _status: {
      equals: 'published',
    },
  }

  if (category) {
    where.category = {
      equals: category,
    }
  }

  if (featured !== undefined) {
    where.featured = {
      equals: featured,
    }
  }

  const result = await payload.find({
    collection: 'resources',
    where,
    limit,
    page,
    sort,
    depth: 2, // Populate relations (file, thumbnail, etc.)
  })

  return result as ResourcesResponse
}

/**
 * Get a single resource by slug
 */
export async function getResourceBySlug(slug: string): Promise<Resource | null> {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'resources',
    where: {
      and: [
        {
          slug: {
            equals: slug,
          },
        },
        {
          _status: {
            equals: 'published',
          },
        },
      ],
    },
    limit: 1,
    depth: 2,
  })

  return result.docs[0] || null
}

/**
 * Get resources by category
 */
export async function getResourcesByCategory(
  category: string,
  limit?: number
): Promise<Resource[]> {
  const result = await getResources({
    category,
    limit: limit || 10,
    sort: '-publishedAt',
  })

  return result.docs
}

/**
 * Get featured resources
 */
export async function getFeaturedResources(limit: number = 4): Promise<Resource[]> {
  const result = await getResources({
    featured: true,
    limit,
    sort: '-publishedAt',
  })

  return result.docs
}

/**
 * Get all resource categories
 */
export async function getResourceCategories(): Promise<string[]> {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'resources',
    where: {
      _status: {
        equals: 'published',
      },
    },
    limit: 1000,
    depth: 0,
  })

  const categories = new Set<string>()
  result.docs.forEach((resource) => {
    if (resource.category && typeof resource.category === 'string') {
      categories.add(resource.category)
    }
  })

  return Array.from(categories).sort()
}

