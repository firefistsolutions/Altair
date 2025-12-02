/**
 * Script to fix payload_locked_documents_rels table
 * Adds missing columns for new collections (products, projects, events, resources, leads)
 */

import { Client } from 'pg'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Load environment variables
dotenv.config({
  path: path.resolve(dirname, '../../../../.env'),
})

const DATABASE_URI = process.env.DATABASE_URI

if (!DATABASE_URI) {
  console.error('❌ DATABASE_URI not found in environment variables')
  process.exit(1)
}

async function fixLockedDocuments() {
  const client = new Client({
    connectionString: DATABASE_URI,
    ssl: {
      rejectUnauthorized: false,
    },
  })

  try {
    console.log('🔌 Connecting to database...')
    await client.connect()

    // Check if table exists
    const tableCheck = await client.query(`
      SELECT EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'payload_locked_documents_rels'
      )
    `)

    if (!tableCheck.rows[0].exists) {
      console.log('⚠️  Table payload_locked_documents_rels does not exist.')
      console.log('   Payload will create it on next server start.')
      return
    }

    console.log('✅ Found payload_locked_documents_rels table')
    console.log('🔍 Checking for missing columns...')

    // Get existing columns
    const existingColumns = await client.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'payload_locked_documents_rels'
    `)

    const existingColumnNames = existingColumns.rows.map((row) => row.column_name)
    console.log(`   Existing columns: ${existingColumnNames.join(', ')}`)

    // Columns that should exist for new collections
    const requiredColumns = [
      { name: 'products_id', type: 'integer' },
      { name: 'projects_id', type: 'integer' },
      { name: 'events_id', type: 'integer' },
      { name: 'resources_id', type: 'integer' },
      { name: 'leads_id', type: 'integer' },
    ]

    const missingColumns = requiredColumns.filter(
      (col) => !existingColumnNames.includes(col.name),
    )

    if (missingColumns.length === 0) {
      console.log('✅ All required columns already exist!')
      return
    }

    console.log(`⚠️  Found ${missingColumns.length} missing column(s):`)
    missingColumns.forEach((col) => console.log(`   - ${col.name}`))

    console.log('🔧 Adding missing columns...')

    // Add missing columns
    for (const col of missingColumns) {
      try {
        await client.query(`
          ALTER TABLE payload_locked_documents_rels 
          ADD COLUMN IF NOT EXISTS ${col.name} ${col.type}
        `)
        console.log(`   ✅ Added column: ${col.name}`)
      } catch (error: any) {
        console.error(`   ❌ Failed to add column ${col.name}: ${error.message}`)
      }
    }

    console.log('')
    console.log('✅ Successfully updated payload_locked_documents_rels table')
    console.log('📝 Next steps:')
    console.log('   1. Restart your dev server: pnpm dev')
    console.log('   2. The admin panel should load without errors')
  } catch (error: any) {
    console.error('❌ Error fixing locked documents table:')
    console.error(error.message)
    process.exit(1)
  } finally {
    await client.end()
  }
}

fixLockedDocuments()

