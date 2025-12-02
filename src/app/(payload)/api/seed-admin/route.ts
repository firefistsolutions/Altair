import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { NextResponse } from 'next/server'

const ADMIN_EMAIL = 'dspatil297@gmail.com'
const ADMIN_PASSWORD = 'Admin@9689'

export async function POST() {
  try {
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
      
      // Update the password
      await payload.update({
        collection: 'users',
        id: existingUser.id,
        data: {
          password: ADMIN_PASSWORD,
        },
      })

      return NextResponse.json({
        success: true,
        message: 'Admin user password updated',
        user: {
          id: existingUser.id,
          email: existingUser.email,
        },
      })
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

      return NextResponse.json({
        success: true,
        message: 'Admin user created successfully',
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
        },
      })
    }
  } catch (error: any) {
    console.error('Error seeding admin user:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to seed admin user',
      },
      { status: 500 }
    )
  }
}

