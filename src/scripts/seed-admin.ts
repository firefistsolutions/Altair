/**
 * Seed Admin User Script
 * 
 * Creates an admin user in the Payload CMS database.
 * 
 * Usage:
 * pnpm seed-admin
 */

import { getPayload } from 'payload'
import configPromise from '../payload.config'

const ADMIN_EMAIL = 'dspatil297@gmail.com'
const ADMIN_PASSWORD = 'Admin@9689'

async function seedAdmin() {
  try {
    console.log('🔐 Seeding admin user...')
    console.log(`📧 Email: ${ADMIN_EMAIL}`)
    console.log('')

    // Get Payload instance
    const payload = await getPayload({ config: configPromise })

    // Check if user already exists
    const existingUsers = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: ADMIN_EMAIL,
        },
      },
      limit: 1,
    })

    if (existingUsers.docs.length > 0) {
      const existingUser = existingUsers.docs[0]
      console.log(`⚠️  User with email "${ADMIN_EMAIL}" already exists!`)
      console.log(`   ID: ${existingUser.id}`)
      console.log('')
      console.log('Updating password...')
      
      // Update the password
      await payload.update({
        collection: 'users',
        id: existingUser.id,
        data: {
          password: ADMIN_PASSWORD,
        },
      })

      console.log('✅ Password updated successfully!')
      console.log('')
      console.log('You can now login with:')
      console.log(`  Email: ${ADMIN_EMAIL}`)
      console.log(`  Password: ${ADMIN_PASSWORD}`)
    } else {
      // Create new admin user
      const newUser = await payload.create({
        collection: 'users',
        data: {
          email: ADMIN_EMAIL,
          password: ADMIN_PASSWORD,
          name: 'Admin User',
        },
      })

      console.log('✅ Admin user created successfully!')
      console.log('')
      console.log('User details:')
      console.log(`  ID: ${newUser.id}`)
      console.log(`  Email: ${newUser.email}`)
      console.log(`  Name: ${newUser.name || 'N/A'}`)
      console.log('')
      console.log('You can now login at http://localhost:3000/admin with:')
      console.log(`  Email: ${ADMIN_EMAIL}`)
      console.log(`  Password: ${ADMIN_PASSWORD}`)
    }

    console.log('')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding admin user:')
    console.error(error)
    process.exit(1)
  }
}

// Run the script
seedAdmin()

