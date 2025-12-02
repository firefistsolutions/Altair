import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { slugField } from 'payload'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Events: CollectionConfig<'events'> = {
  slug: 'events',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    featuredImage: true,
    eventStatus: true,
  },
  admin: {
    defaultColumns: ['title', 'eventType', 'startDate', 'eventStatus', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'events',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'events',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Event Details',
          fields: [
            {
              name: 'eventType',
              type: 'select',
              required: true,
              options: [
                { label: 'Trade Show', value: 'trade-show' },
                { label: 'Expo', value: 'expo' },
                { label: 'Conference', value: 'conference' },
                { label: 'Webinar', value: 'webinar' },
                { label: 'Workshop', value: 'workshop' },
              ],
              admin: {
                description: 'Type of event',
              },
            },
            {
              name: 'startDate',
              type: 'date',
              required: true,
              admin: {
                date: {
                  pickerAppearance: 'dayAndTime',
                },
                description: 'Event start date and time',
              },
            },
            {
              name: 'endDate',
              type: 'date',
              required: true,
              admin: {
                date: {
                  pickerAppearance: 'dayAndTime',
                },
                description: 'Event end date and time',
              },
            },
            {
              name: 'location',
              type: 'text',
              required: true,
              admin: {
                description: 'City or general location (e.g., "Mumbai", "New Delhi")',
              },
            },
            {
              name: 'venue',
              type: 'text',
              admin: {
                description: 'Venue name (e.g., "Bombay Exhibition Centre")',
              },
            },
            {
              name: 'venueAddress',
              type: 'textarea',
              admin: {
                description: 'Full venue address',
              },
            },
            {
              name: 'description',
              type: 'richText',
              admin: {
                description: 'Event description and details',
              },
            },
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description: 'Main event image displayed on listings and detail pages',
              },
            },
            {
              name: 'gallery',
              type: 'array',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'caption',
                  type: 'text',
                },
              ],
              admin: {
                description: 'Additional images for event gallery',
              },
            },
            {
              name: 'registrationLink',
              type: 'text',
              admin: {
                description: 'URL for event registration (if applicable)',
              },
            },
            {
              name: 'eventStatus',
              type: 'select',
              required: true,
              defaultValue: 'upcoming',
              options: [
                { label: 'Upcoming', value: 'upcoming' },
                { label: 'Past', value: 'past' },
                { label: 'Cancelled', value: 'cancelled' },
              ],
              admin: {
                description: 'Event status (upcoming, past, or cancelled)',
              },
            },
            {
              name: 'featured',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Feature this event on the homepage',
              },
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
  hooks: {
    beforeChange: [populatePublishedAt],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
    },
    maxPerDoc: 50,
  },
}

