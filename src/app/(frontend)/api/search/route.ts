import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { z } from 'zod'
import { logger } from '@/lib/logger'

const searchSchema = z.object({
  query: z.string().min(1, 'Search query is required'),
  type: z.enum(['all', 'products', 'events', 'posts', 'resources']).optional(),
  limit: z.number().int().min(1).max(50).optional().default(20),
  page: z.number().int().min(1).optional().default(1),
})

export async function GET(req: NextRequest) {
  const payload = await getPayload({ config: configPromise })

  try {
    const searchParams = req.nextUrl.searchParams
    const query = searchParams.get('q') || searchParams.get('query') || ''
    const type = (searchParams.get('type') || 'all') as 'all' | 'products' | 'events' | 'posts' | 'resources'
    const limit = parseInt(searchParams.get('limit') || '20', 10)
    const page = parseInt(searchParams.get('page') || '1', 10)

    const validated = searchSchema.parse({
      query,
      type,
      limit,
      page,
    })

    const searchQuery = validated.query.toLowerCase().trim()
    
    interface SearchResultItem {
      id: string | number
      title: string
      slug: string
      description?: string
      image?: string | { url?: string | null } | null
      category?: string
      [key: string]: unknown
    }
    
    const results: {
      products: SearchResultItem[]
      events: SearchResultItem[]
      posts: SearchResultItem[]
      resources: SearchResultItem[]
    } = {
      products: [],
      events: [],
      posts: [],
      resources: [],
    }

    // Search Products
    if (validated.type === 'all' || validated.type === 'products') {
      const products = await payload.find({
        collection: 'products',
        where: {
          and: [
            {
              _status: {
                equals: 'published',
              },
            },
            {
              or: [
                {
                  title: {
                    contains: searchQuery,
                  },
                },
                {
                  description: {
                    contains: searchQuery,
                  },
                },
                {
                  category: {
                    contains: searchQuery,
                  },
                },
              ],
            },
          ],
        },
        limit: validated.limit,
        page: validated.page,
        depth: 1,
      })
      results.products = products.docs.map((product) => {
        // Extract description from RichText or use empty string
        let description = ''
        if (typeof product.description === 'string') {
          description = product.description
        } else if (typeof product.description === 'object' && product.description !== null) {
          description = JSON.stringify(product.description)
        }
        
        return {
          id: product.id,
          type: 'product',
          title: product.title || '',
          description: description.substring(0, 200), // Limit length
          slug: product.slug || '',
          image: typeof product.image === 'object' && product.image !== null 
            ? { url: product.image.url || null }
            : null,
          category: typeof product.category === 'string' ? product.category : '',
        }
      })
    }

    // Search Events
    if (validated.type === 'all' || validated.type === 'events') {
      const events = await payload.find({
        collection: 'events',
        where: {
          and: [
            {
              _status: {
                equals: 'published',
              },
            },
            {
              or: [
                {
                  title: {
                    contains: searchQuery,
                  },
                },
                {
                  location: {
                    contains: searchQuery,
                  },
                },
                {
                  venue: {
                    contains: searchQuery,
                  },
                },
              ],
            },
          ],
        },
        limit: validated.limit,
        page: validated.page,
        depth: 1,
      })
      results.events = events.docs.map((event) => ({
        id: event.id,
        type: 'event',
        title: event.title,
        description: '',
        slug: event.slug,
        image: typeof event.featuredImage === 'object' && event.featuredImage !== null
          ? { url: event.featuredImage.url || null }
          : typeof event.featuredImage === 'number'
          ? null
          : null,
        location: event.location,
        startDate: event.startDate,
        eventType: event.eventType,
      }))
    }

    // Search Posts
    if (validated.type === 'all' || validated.type === 'posts') {
      const posts = await payload.find({
        collection: 'posts',
        where: {
          and: [
            {
              _status: {
                equals: 'published',
              },
            },
            {
              or: [
                {
                  title: {
                    contains: searchQuery,
                  },
                },
                {
                  description: {
                    contains: searchQuery,
                  },
                },
              ],
            },
          ],
        },
        limit: validated.limit,
        page: validated.page,
        depth: 1,
      })
      results.posts = posts.docs.map((post) => ({
        id: post.id,
        type: 'post',
        title: post.title,
        description: typeof post.content === 'object' ? JSON.stringify(post.content).substring(0, 200) : '',
        slug: post.slug,
        image: typeof post.heroImage === 'object' && post.heroImage !== null
          ? { url: post.heroImage.url || null }
          : null,
        publishedAt: post.publishedAt,
      }))
    }

    // Search Resources
    if (validated.type === 'all' || validated.type === 'resources') {
      const resources = await payload.find({
        collection: 'resources',
        where: {
          and: [
            {
              _status: {
                equals: 'published',
              },
            },
            {
              or: [
                {
                  title: {
                    contains: searchQuery,
                  },
                },
                {
                  description: {
                    contains: searchQuery,
                  },
                },
              ],
            },
          ],
        },
        limit: validated.limit,
        page: validated.page,
        depth: 1,
      })
      results.resources = resources.docs.map((resource) => ({
        id: resource.id,
        type: 'resource',
        title: resource.title,
        description: resource.description || undefined,
        slug: resource.slug,
        image: typeof resource.thumbnail === 'object' && resource.thumbnail !== null
          ? { url: resource.thumbnail.url || null }
          : typeof resource.thumbnail === 'number'
          ? null
          : null,
        category: resource.category,
      }))
    }

    // Calculate totals
    const totalResults =
      results.products.length +
      results.events.length +
      results.posts.length +
      results.resources.length

    return NextResponse.json({
      query: validated.query,
      type: validated.type,
      results,
      totalResults,
      limit: validated.limit,
      page: validated.page,
    })
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues, message: 'Validation failed' }, { status: 400 })
    }
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    logger.error('Search API error:', errorMessage)
    return NextResponse.json(
      { 
        error: 'Internal Server Error', 
        message: process.env.NODE_ENV === 'development' ? errorMessage : undefined 
      }, 
      { status: 500 }
    )
  }
}

