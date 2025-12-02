import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { z } from 'zod'

const searchSchema = z.object({
  query: z.string().min(1, 'Search query is required'),
  type: z.enum(['all', 'products', 'projects', 'events', 'posts', 'resources']).optional(),
  limit: z.number().int().min(1).max(50).optional().default(20),
  page: z.number().int().min(1).optional().default(1),
})

export async function GET(req: NextRequest) {
  const payload = await getPayload({ config: configPromise })

  try {
    const searchParams = req.nextUrl.searchParams
    const query = searchParams.get('q') || searchParams.get('query') || ''
    const type = (searchParams.get('type') || 'all') as 'all' | 'products' | 'projects' | 'events' | 'posts' | 'resources'
    const limit = parseInt(searchParams.get('limit') || '20', 10)
    const page = parseInt(searchParams.get('page') || '1', 10)

    const validated = searchSchema.parse({
      query,
      type,
      limit,
      page,
    })

    const searchQuery = validated.query.toLowerCase().trim()
    const results: {
      products: any[]
      projects: any[]
      events: any[]
      posts: any[]
      resources: any[]
    } = {
      products: [],
      projects: [],
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
          image: typeof product.image === 'object' && product.image !== null ? product.image : null,
          category: typeof product.category === 'string' ? product.category : '',
        }
      })
    }

    // Search Projects
    if (validated.type === 'all' || validated.type === 'projects') {
      const projects = await payload.find({
        collection: 'projects',
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
                  client: {
                    contains: searchQuery,
                  },
                },
                {
                  location: {
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
      results.projects = projects.docs.map((project) => {
        // Extract description from RichText or use empty string
        let description = ''
        if (typeof project.description === 'string') {
          description = project.description
        } else if (typeof project.description === 'object' && project.description !== null) {
          description = JSON.stringify(project.description)
        }
        
        return {
          id: project.id,
          type: 'project',
          title: project.title || '',
          description: description.substring(0, 200), // Limit length
          slug: project.slug || '',
          image: typeof project.image === 'object' && project.image !== null ? project.image : null,
          client: typeof project.client === 'string' ? project.client : '',
          location: typeof project.location === 'string' ? project.location : '',
          year: project.year || 0,
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
        image: event.featuredImage,
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
        image: typeof post.heroImage === 'object' && post.heroImage !== null ? post.heroImage : null,
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
        description: resource.description,
        slug: resource.slug,
        image: resource.thumbnail,
        category: resource.category,
      }))
    }

    // Calculate totals
    const totalResults =
      results.products.length +
      results.projects.length +
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
  } catch (error: any) {
    console.error('Search API error:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues, message: 'Validation failed' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal Server Error', message: error.message }, { status: 500 })
  }
}

