/**
 * Script to fix enum conflict for events_status
 * This drops the existing enum and lets Payload recreate it with correct values
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

async function fixEnumConflict() {
  const client = new Client({
    connectionString: DATABASE_URI,
    ssl: {
      rejectUnauthorized: false,
    },
  })

  try {
    console.log('🔌 Connecting to database...')
    await client.connect()

    console.log('🔍 Checking for existing enum_events_status...')
    const enumCheck = await client.query(`
      SELECT EXISTS (
        SELECT 1 FROM pg_type WHERE typname = 'enum_events_status'
      )
    `)

    if (!enumCheck.rows[0].exists) {
      console.log('✅ No conflicting enum found. Schema should be clean.')
      return
    }

    console.log('⚠️  Found existing enum_events_status')
    console.log('🗑️  Dropping enum_events_status (CASCADE will drop dependent objects)...')

    // Drop the enum with CASCADE to remove dependent constraints
    await client.query('DROP TYPE IF EXISTS enum_events_status CASCADE')

    console.log('✅ Successfully dropped enum_events_status')
    console.log('')
    console.log('📝 Next steps:')
    console.log('   1. Restart your dev server: pnpm dev')
    console.log('   2. Payload will automatically recreate the enum with correct values')
    console.log('   3. The admin panel should load without errors')
  } catch (error: any) {
    console.error('❌ Error fixing enum conflict:')
    console.error(error.message)
    if (error.code === '42P07') {
      console.error('   Note: This might mean the enum is already dropped')
    }
    process.exit(1)
  } finally {
    await client.end()
  }
}

fixEnumConflict()

