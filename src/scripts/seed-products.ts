/**
 * Seed Products Script
 * 
 * Seeds products from JSON file into Payload CMS database.
 * 
 * Usage:
 * pnpm seed-products
 * 
 * Make sure to:
 * 1. Update products.json with actual product data from PDF
 * 2. Upload product images to Media collection first (or use placeholder)
 * 3. Run this script to seed products
 */

import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Load environment variables FIRST, before importing anything that uses them
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Try multiple paths for .env file (from script location: src/scripts/)
const envPaths = [
  path.resolve(__dirname, '../../.env'),           // altair/.env
  path.resolve(__dirname, '../../.env.local'),    // altair/.env.local
  path.resolve(__dirname, '../../../.env'),        // root/.env
  path.resolve(__dirname, '../../../.env.local'), // root/.env.local
  path.resolve(__dirname, '../../test.env'),      // altair/test.env
]

let envLoaded = false
for (const envPath of envPaths) {
  try {
    if (fs.existsSync(envPath)) {
      const result = dotenv.config({ path: envPath })
      if (!result.error && process.env.PAYLOAD_SECRET) {
        console.log(`✅ Loaded environment variables from: ${envPath}`)
        envLoaded = true
        break
      }
    }
    } catch {
      // Continue to next path
    }
}

// Also try loading from default location (current working directory)
if (!envLoaded) {
  const result = dotenv.config()
  if (!result.error && process.env.PAYLOAD_SECRET) {
    console.log('✅ Loaded environment variables from default location')
    envLoaded = true
  }
}

// Verify PAYLOAD_SECRET is set
if (!process.env.PAYLOAD_SECRET) {
  console.error('❌ PAYLOAD_SECRET is not set in environment variables!')
  console.error('')
  console.error('   Tried loading from:')
  envPaths.forEach(p => {
    const exists = fs.existsSync(p) ? '✓' : '✗'
    console.error(`   ${exists} ${p}`)
  })
  console.error('')
  console.error('   Please ensure your .env file contains:')
  console.error('   PAYLOAD_SECRET=your-secret-key-here')
  console.error('')
  console.error('   Or set it as an environment variable before running the script.')
  process.exit(1)
}

interface ProductData {
  title: string
  slug: string
  category: string
  description: any // RichText format
  specs?: Array<{ label: string; value: string }>
  keyFeatures?: Array<{ feature: string }>
  featured?: boolean
  meta?: {
    title?: string
    description?: string
  }
}

async function seedProducts() {
  try {
    console.log('📦 Seeding products from JSON file...')
    console.log('')

    // Import Payload and config AFTER environment variables are loaded
    const { getPayload } = await import('payload')
    const configPromise = (await import('../payload.config')).default

    // Get Payload instance
    const payload = await getPayload({ config: configPromise })

    // Read products JSON file
    const productsFilePath = path.join(__dirname, '../endpoints/seed/products.json')
    if (!fs.existsSync(productsFilePath)) {
      console.error(`❌ Products JSON file not found at: ${productsFilePath}`)
      console.log('   Please create products.json file with product data.')
      process.exit(1)
    }

    const productsData: ProductData[] = JSON.parse(
      fs.readFileSync(productsFilePath, 'utf-8')
    )

    console.log(`📄 Found ${productsData.length} products to seed`)
    console.log('')

    // Get or find any image to use as placeholder
    const placeholderImage = await payload.find({
      collection: 'media',
      where: {
        filename: {
          equals: 'placeholder-product.jpg',
        },
      },
      limit: 1,
    })

    let imageId: string | number | null = null

    if (placeholderImage.docs.length === 0) {
      // Try to find any image in the media collection
      const anyImage = await payload.find({
        collection: 'media',
        limit: 1,
      })
      
      if (anyImage.docs.length > 0) {
        imageId = anyImage.docs[0].id
        console.log(`⚠️  No placeholder image found. Using existing image: ${imageId}`)
        console.log('   Please upload product images to Media collection and update products in admin panel')
        console.log('')
      } else {
        console.log('⚠️  No images found in Media collection.')
        console.log('   Products require an image. Please upload at least one image to Media collection first.')
        console.log('   Then run this script again, or create products manually in the admin panel.')
        console.log('')
        console.log('   The products.json file is ready with all product data.')
        console.log('   You can:')
        console.log('   1. Upload images to Media collection in admin panel')
        console.log('   2. Run this script again to seed products')
        console.log('   3. Or create products manually in admin panel using the JSON data')
        console.log('')
        process.exit(1)
      }
    } else {
      imageId = placeholderImage.docs[0].id
      console.log(`✅ Using placeholder image: ${imageId}`)
      console.log('')
    }

    // Seed each product
    const createdProducts = []
    for (let i = 0; i < productsData.length; i++) {
      const productData = productsData[i]
      
      console.log(`[${i + 1}/${productsData.length}] Creating: ${productData.title}`)

      // Check if product already exists
      const existing = await payload.find({
        collection: 'products',
        where: {
          slug: {
            equals: productData.slug,
          },
        },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        console.log(`   ⚠️  Product with slug "${productData.slug}" already exists. Skipping...`)
        continue
      }

      // Prepare product data
      const productPayload: any = {
        title: productData.title,
        slug: productData.slug,
        category: productData.category,
        description: productData.description || {
          root: {
            children: [
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: `${productData.title} - Premium medical equipment from Altair Medical System.`,
                    type: 'text',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                type: 'paragraph',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'root',
            version: 1,
          },
        },
        specs: productData.specs || [],
        keyFeatures: productData.keyFeatures || [],
        featured: productData.featured || false,
        _status: 'published',
        publishedAt: new Date().toISOString(),
      }

      // Add image if available
      if (imageId) {
        productPayload.image = imageId
      }

      // Add meta fields
      if (productData.meta) {
        productPayload.meta = {
          title: productData.meta.title || productData.title,
          description: productData.meta.description || `${productData.title} from Altair Medical System.`,
        }
      }

      // Create product
      try {
        const product = await payload.create({
          collection: 'products',
          data: productPayload,
          context: {
            disableRevalidate: true,
          },
        })

        createdProducts.push(product)
        console.log(`   ✅ Created: ${product.title} (ID: ${product.id})`)
      } catch (error: any) {
        console.error(`   ❌ Error creating product: ${error.message}`)
        if (error.data) {
          console.error(`   Details:`, JSON.stringify(error.data, null, 2))
        }
      }
    }

    console.log('')
    console.log('✅ Product seeding completed!')
    console.log(`   Created: ${createdProducts.length} products`)
    console.log(`   Skipped: ${productsData.length - createdProducts.length} products (already exist)`)
    console.log('')
    console.log('📝 Next steps:')
    console.log('   1. Go to Admin Panel → Products')
    console.log('   2. Edit each product to add:')
    console.log('      - Product images (upload to Media first)')
    console.log('      - Additional gallery images')
    console.log('      - Datasheet PDF (if available)')
    console.log('   3. Review and update descriptions, specs, and features')
    console.log('')

    process.exit(0)
  } catch (error: any) {
    console.error('❌ Error seeding products:')
    console.error(error.message)
    if (error.stack) {
      console.error(error.stack)
    }
    process.exit(1)
  }
}

seedProducts()

