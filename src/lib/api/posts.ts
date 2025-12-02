import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import type { Post } from '@/payload-types'

export interface PostFilters {
  category?: string | number
  featured?: boolean
  limit?: number
  page?: number
  sort?: string
}

export interface PostsResponse {
  docs: Post[]
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
 * Get all blog posts with optional filters
 */
export async function getPosts(filters: PostFilters = {}): Promise<PostsResponse> {
  const payload = await getPayload({ config: configPromise })

  const {
    category,
    featured,
    limit = 12,
    page = 1,
    sort = '-publishedAt',
  } = filters

  const where: any = {
    _status: {
      equals: 'published',
    },
  }

  if (category) {
    where.categories = {
      contains: category,
    }
  }

  if (featured !== undefined) {
    where.featured = {
      equals: featured,
    }
  }

  const result = await payload.find({
    collection: 'posts',
    where,
    limit,
    page,
    sort,
    depth: 2, // Populate relations (categories, authors, etc.)
  })

  return result as PostsResponse
}

/**
 * Get a single post by slug
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
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
 * Get posts by category
 */
export async function getPostsByCategory(
  categorySlug: string,
  limit?: number
): Promise<Post[]> {
  const payload = await getPayload({ config: configPromise })

  // First, get the category by slug
  const categoryResult = await payload.find({
    collection: 'categories',
    where: {
      slug: {
        equals: categorySlug,
      },
    },
    limit: 1,
  })

  if (categoryResult.docs.length === 0) {
    return []
  }

  const category = categoryResult.docs[0]

  // Then get posts with this category
  const result = await getPosts({
    category: category.id,
    limit: limit || 10,
  })

  return result.docs
}

/**
 * Get featured posts
 */
export async function getFeaturedPosts(limit: number = 3): Promise<Post[]> {
  const result = await getPosts({
    featured: true,
    limit,
    sort: '-publishedAt',
  })

  return result.docs
}

