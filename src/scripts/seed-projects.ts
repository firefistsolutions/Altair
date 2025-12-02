/**
 * Seed Projects Script
 * 
 * Seeds projects from JSON file into Payload CMS database.
 * 
 * Usage:
 * pnpm seed-projects
 */

import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Load environment variables FIRST
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const envPaths = [
  path.resolve(__dirname, '../../.env'),
  path.resolve(__dirname, '../../.env.local'),
  path.resolve(__dirname, '../../../.env'),
  path.resolve(__dirname, '../../../.env.local'),
]

for (const envPath of envPaths) {
  try {
    if (fs.existsSync(envPath)) {
      const result = dotenv.config({ path: envPath })
      if (!result.error && process.env.PAYLOAD_SECRET) {
        console.log(`✅ Loaded environment variables from: ${envPath}`)
        break
      }
    }
  } catch {
    // Continue to next path
  }
}

if (!process.env.PAYLOAD_SECRET) {
  dotenv.config()
}

if (!process.env.PAYLOAD_SECRET) {
  console.error('❌ PAYLOAD_SECRET is not set!')
  process.exit(1)
}

// Import Payload and config AFTER environment variables are loaded
const { getPayload } = await import('payload')
const configPromise = (await import('../payload.config')).default

interface ProjectData {
  title: string
  slug: string
  client: string
  location: string
  year: number
  hospitalType: string
  description: any
  metrics?: Array<{ label: string; value: string }>
  featured?: boolean
  meta?: {
    title?: string
    description?: string
  }
}

async function seedProjects() {
  try {
    console.log('📦 Seeding projects from JSON file...')
    console.log('')

    const payload = await getPayload({ config: configPromise })

    const projectsFilePath = path.join(__dirname, '../endpoints/seed/projects.json')
    if (!fs.existsSync(projectsFilePath)) {
      console.error(`❌ Projects JSON file not found at: ${projectsFilePath}`)
      process.exit(1)
    }

    const projectsData: ProjectData[] = JSON.parse(
      fs.readFileSync(projectsFilePath, 'utf-8')
    )

    console.log(`📄 Found ${projectsData.length} projects to seed`)
    console.log('')

    // Get or find any image to use as placeholder
    const placeholderImage = await payload.find({
      collection: 'media',
      limit: 1,
    })

    let imageId: string | number | null = null

    if (placeholderImage.docs.length > 0) {
      imageId = placeholderImage.docs[0].id
      console.log(`✅ Using placeholder image: ${imageId}`)
      console.log('')
    } else {
      console.log('⚠️  No images found. Projects will be created without images.')
      console.log('   Please upload project images to Media collection and update projects in admin panel.')
      console.log('')
    }

    const createdProjects = []
    for (let i = 0; i < projectsData.length; i++) {
      const projectData = projectsData[i]
      
      console.log(`[${i + 1}/${projectsData.length}] Creating: ${projectData.title}`)

      const existing = await payload.find({
        collection: 'projects',
        where: {
          slug: {
            equals: projectData.slug,
          },
        },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        console.log(`   ⚠️  Project with slug "${projectData.slug}" already exists. Skipping...`)
        continue
      }

      const projectPayload: any = {
        title: projectData.title,
        slug: projectData.slug,
        client: projectData.client,
        location: projectData.location,
        year: projectData.year,
        hospitalType: projectData.hospitalType,
        description: projectData.description,
        metrics: projectData.metrics || [],
        featured: projectData.featured || false,
        _status: 'published',
        publishedAt: new Date().toISOString(),
      }

      if (imageId) {
        projectPayload.image = imageId
      }

      if (projectData.meta) {
        projectPayload.meta = {
          title: projectData.meta.title || projectData.title,
          description: projectData.meta.description || `${projectData.title} - Project by Altair Medical System.`,
        }
      }

      try {
        const project = await payload.create({
          collection: 'projects',
          data: projectPayload,
          context: {
            disableRevalidate: true,
          },
        })

        createdProjects.push(project)
        console.log(`   ✅ Created: ${project.title} (ID: ${project.id})`)
      } catch (error: any) {
        console.error(`   ❌ Error creating project: ${error.message}`)
      }
    }

    console.log('')
    console.log('✅ Project seeding completed!')
    console.log(`   Created: ${createdProjects.length} projects`)
    console.log('')

    process.exit(0)
  } catch (error: any) {
    console.error('❌ Error seeding projects:')
    console.error(error.message)
    process.exit(1)
  }
}

seedProjects()


