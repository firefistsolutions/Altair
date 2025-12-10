/**
 * Seed Events Script
 * 
 * Seeds events from JSON file into Payload CMS database.
 * 
 * Usage:
 * pnpm seed-events
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

interface EventData {
  title: string
  slug: string
  eventType: string
  startDate: string
  endDate: string
  location: string
  venue?: string
  venueAddress?: string
  description: any
  eventStatus: string
  registrationLink?: string
  featured?: boolean
  meta?: {
    title?: string
    description?: string
  }
}

async function seedEvents() {
  try {
    console.log('📦 Seeding events from JSON file...')
    console.log('')

    const payload = await getPayload({ config: configPromise })

    const eventsFilePath = path.join(__dirname, '../endpoints/seed/events.json')
    if (!fs.existsSync(eventsFilePath)) {
      console.error(`❌ Events JSON file not found at: ${eventsFilePath}`)
      process.exit(1)
    }

    const eventsData: EventData[] = JSON.parse(
      fs.readFileSync(eventsFilePath, 'utf-8')
    )

    console.log(`📄 Found ${eventsData.length} events to seed`)
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
      console.log('⚠️  No images found. Events will be created without images.')
      console.log('   Please upload event images to Media collection and update events in admin panel.')
      console.log('')
    }

    const createdEvents = []
    for (let i = 0; i < eventsData.length; i++) {
      const eventData = eventsData[i]
      
      console.log(`[${i + 1}/${eventsData.length}] Creating: ${eventData.title}`)

      const existing = await payload.find({
        collection: 'events',
        where: {
          slug: {
            equals: eventData.slug,
          },
        },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        console.log(`   ⚠️  Event with slug "${eventData.slug}" already exists. Skipping...`)
        continue
      }

      const eventPayload: any = {
        title: eventData.title,
        slug: eventData.slug,
        eventType: eventData.eventType,
        startDate: eventData.startDate,
        endDate: eventData.endDate,
        location: eventData.location,
        venue: eventData.venue || null,
        venueAddress: eventData.venueAddress || null,
        description: eventData.description,
        eventStatus: eventData.eventStatus,
        registrationLink: eventData.registrationLink || null,
        featured: eventData.featured || false,
        _status: 'published',
        publishedAt: new Date().toISOString(),
      }

      if (imageId) {
        eventPayload.featuredImage = imageId
      }

      if (eventData.meta) {
        eventPayload.meta = {
          title: eventData.meta.title || eventData.title,
          description: eventData.meta.description || `${eventData.title} - Event by Altair Medical System.`,
        }
      }

      try {
        const event = await payload.create({
          collection: 'events',
          data: eventPayload,
          context: {
            disableRevalidate: true,
          },
        })

        createdEvents.push(event)
        console.log(`   ✅ Created: ${event.title} (ID: ${event.id})`)
      } catch (error: any) {
        console.error(`   ❌ Error creating event: ${error.message}`)
      }
    }

    console.log('')
    console.log('✅ Event seeding completed!')
    console.log(`   Created: ${createdEvents.length} events`)
    console.log('')

    process.exit(0)
  } catch (error: any) {
    console.error('❌ Error seeding events:')
    console.error(error.message)
    process.exit(1)
  }
}

seedEvents()





