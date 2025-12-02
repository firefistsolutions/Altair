import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Validation schema for newsletter subscription
const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Validate form data
    const validationResult = newsletterSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          errors: validationResult.error.issues,
        },
        { status: 400 }
      )
    }

    const data = validationResult.data
    const payload = await getPayload({ config: configPromise })

    // Check if email already exists in leads
    const existingLeads = await payload.find({
      collection: 'leads',
      where: {
        and: [
          {
            email: {
              equals: data.email,
            },
          },
          {
            source: {
              equals: 'newsletter',
            },
          },
        ],
      },
      limit: 1,
    })

    if (existingLeads.docs.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'This email is already subscribed to our newsletter',
        },
        { status: 409 } // Conflict
      )
    }

    // Save to Leads collection
    const lead = await payload.create({
      collection: 'leads',
      data: {
        name: data.name || data.email.split('@')[0], // Use email prefix if name not provided
        email: data.email,
        phone: '',
        company: '',
        message: 'Newsletter subscription',
        source: 'newsletter',
        status: 'new',
        metadata: {
          subscribedAt: new Date().toISOString(),
        },
      },
    })

    // Send confirmation email (if Resend is configured)
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend')
        const resend = new Resend(process.env.RESEND_API_KEY)

        const fromEmail = process.env.FROM_EMAIL || 'noreply@altairmedical.com'

        await resend.emails.send({
          from: fromEmail,
          to: data.email,
          subject: 'Welcome to Altair Medical System Newsletter!',
          html: `
            <h2>Thank you for subscribing!</h2>
            <p>Dear ${data.name || 'Subscriber'},</p>
            <p>You have successfully subscribed to the Altair Medical System newsletter.</p>
            <p>You will now receive updates about:</p>
            <ul>
              <li>New product launches and innovations</li>
              <li>Upcoming trade shows and events</li>
              <li>Industry news and insights</li>
              <li>Case studies and success stories</li>
              <li>Technical resources and documentation</li>
            </ul>
            <p>We're excited to keep you informed about the latest developments in healthcare infrastructure solutions.</p>
            <hr>
            <p><strong>Altair Medical System Pvt. Ltd.</strong></p>
            <p>Plot No. B-437, Bhamashah Industrial Area<br>
            Kaladwas, Rajasthan 313002, India</p>
            <p>Email: marketing@altairmedical.com<br>
            Phone: +91 92518 59361</p>
            <hr>
            <p><small>If you did not subscribe to this newsletter, please ignore this email.</small></p>
          `,
        })
      } catch (emailError: any) {
        // Log email error but don't fail the request
        console.error('Email notification failed:', emailError.message)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter!',
      leadId: lead.id,
    })
  } catch (error: any) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to subscribe. Please try again later.',
        message: error.message,
      },
      { status: 500 }
    )
  }
}

