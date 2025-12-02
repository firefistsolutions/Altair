import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import type { Product } from '@/payload-types'

export interface ProductFilters {
  category?: string
  featured?: boolean
  limit?: number
  page?: number
  sort?: string
}

export interface ProductsResponse {
  docs: Product[]
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
 * Get all products with optional filters
 */
export async function getProducts(filters: ProductFilters = {}): Promise<ProductsResponse> {
  const payload = await getPayload({ config: configPromise })

  const {
    category,
    featured,
    limit = 12,
    page = 1,
    sort = '-createdAt',
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
    collection: 'products',
    where,
    limit,
    page,
    sort,
    depth: 2, // Populate relations (images, etc.)
  })

  return result as ProductsResponse
}

/**
 * Get a single product by slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'products',
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
 * Get featured products
 */
export async function getFeaturedProducts(limit: number = 4): Promise<Product[]> {
  const result = await getProducts({
    featured: true,
    limit,
    sort: '-createdAt',
  })

  return result.docs
}

/**
 * Get all product categories
 */
export async function getProductCategories(): Promise<string[]> {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'products',
    where: {
      _status: {
        equals: 'published',
      },
    },
    limit: 1000, // Get all to extract unique categories
    depth: 0,
  })

  const categories = new Set<string>()
  result.docs.forEach((product) => {
    if (product.category && typeof product.category === 'string') {
      categories.add(product.category)
    }
  })

  return Array.from(categories).sort()
}

