/**
 * Seed Posts Script
 * 
 * Seeds blog posts from JSON file into Payload CMS database.
 * 
 * Usage:
 * pnpm seed-posts
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

interface PostData {
  title: string
  slug: string
  categories?: string[]
  content: any
  meta?: {
    title?: string
    description?: string
  }
}

async function seedPosts() {
  try {
    console.log('📦 Seeding blog posts from JSON file...')
    console.log('')

    const payload = await getPayload({ config: configPromise })

    const postsFilePath = path.join(__dirname, '../endpoints/seed/posts.json')
    if (!fs.existsSync(postsFilePath)) {
      console.error(`❌ Posts JSON file not found at: ${postsFilePath}`)
      process.exit(1)
    }

    const postsData: PostData[] = JSON.parse(
      fs.readFileSync(postsFilePath, 'utf-8')
    )

    console.log(`📄 Found ${postsData.length} posts to seed`)
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
      console.log('⚠️  No images found. Posts will be created without images.')
      console.log('   Please upload post images to Media collection and update posts in admin panel.')
      console.log('')
    }

    const createdPosts = []
    for (let i = 0; i < postsData.length; i++) {
      const postData = postsData[i]
      
      console.log(`[${i + 1}/${postsData.length}] Creating: ${postData.title}`)

      const existing = await payload.find({
        collection: 'posts',
        where: {
          slug: {
            equals: postData.slug,
          },
        },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        console.log(`   ⚠️  Post with slug "${postData.slug}" already exists. Skipping...`)
        continue
      }

      const postPayload: any = {
        title: postData.title,
        slug: postData.slug,
        content: postData.content,
        categories: postData.categories || [],
        _status: 'published',
        publishedAt: new Date().toISOString(),
      }

      if (imageId) {
        postPayload.meta = {
          ...postData.meta,
          image: imageId,
        }
      } else if (postData.meta) {
        postPayload.meta = postData.meta
      }

      if (postData.meta && !imageId) {
        postPayload.meta = {
          title: postData.meta.title || postData.title,
          description: postData.meta.description || `${postData.title} - Blog post by Altair Medical System.`,
        }
      }

      try {
        const post = await payload.create({
          collection: 'posts',
          data: postPayload,
          context: {
            disableRevalidate: true,
          },
        })

        createdPosts.push(post)
        console.log(`   ✅ Created: ${post.title} (ID: ${post.id})`)
      } catch (error: any) {
        console.error(`   ❌ Error creating post: ${error.message}`)
      }
    }

    console.log('')
    console.log('✅ Post seeding completed!')
    console.log(`   Created: ${createdPosts.length} posts`)
    console.log('')

    process.exit(0)
  } catch (error: any) {
    console.error('❌ Error seeding posts:')
    console.error(error.message)
    process.exit(1)
  }
}

seedPosts()





