import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import type { Project } from '@/payload-types'

export interface ProjectFilters {
  hospitalType?: string
  year?: number
  featured?: boolean
  limit?: number
  page?: number
  sort?: string
}

export interface ProjectsResponse {
  docs: Project[]
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
 * Get all projects with optional filters
 */
export async function getProjects(filters: ProjectFilters = {}): Promise<ProjectsResponse> {
  const payload = await getPayload({ config: configPromise })

  const {
    hospitalType,
    year,
    featured,
    limit = 12,
    page = 1,
    sort = '-year',
  } = filters

  const where: any = {
    _status: {
      equals: 'published',
    },
  }

  if (hospitalType) {
    where.hospitalType = {
      equals: hospitalType,
    }
  }

  if (year) {
    where.year = {
      equals: year,
    }
  }

  if (featured !== undefined) {
    where.featured = {
      equals: featured,
    }
  }

  const result = await payload.find({
    collection: 'projects',
    where,
    limit,
    page,
    sort,
    depth: 2, // Populate relations (images, etc.)
  })

  return result as ProjectsResponse
}

/**
 * Get a single project by slug
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'projects',
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
 * Get featured projects
 */
export async function getFeaturedProjects(limit: number = 3): Promise<Project[]> {
  const result = await getProjects({
    featured: true,
    limit,
    sort: '-year',
  })

  return result.docs
}

/**
 * Get all project years
 */
export async function getProjectYears(): Promise<number[]> {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'projects',
    where: {
      _status: {
        equals: 'published',
      },
    },
    limit: 1000,
    depth: 0,
  })

  const years = new Set<number>()
  result.docs.forEach((project) => {
    if (project.year && typeof project.year === 'number') {
      years.add(project.year)
    }
  })

  return Array.from(years).sort((a, b) => b - a) // Descending order
}

