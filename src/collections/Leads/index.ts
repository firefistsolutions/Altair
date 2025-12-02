import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'

export const Leads: CollectionConfig<'leads'> = {
  slug: 'leads',
  access: {
    create: () => true, // Allow public form submissions
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email', 'source', 'status', 'createdAt'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'company',
      type: 'text',
    },
    {
      name: 'message',
      type: 'textarea',
    },
    {
      name: 'source',
      type: 'select',
      required: true,
      defaultValue: 'contact',
      options: [
        { label: 'Contact Form', value: 'contact' },
        { label: 'Quote Request', value: 'quote' },
        { label: 'Survey Request', value: 'survey' },
        { label: 'Newsletter', value: 'newsletter' },
      ],
    },
    {
      name: 'metadata',
      type: 'json',
      admin: {
        description: 'Additional form data (product interest, file uploads, etc.)',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Qualified', value: 'qualified' },
        { label: 'Converted', value: 'converted' },
        { label: 'Closed', value: 'closed' },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Internal notes about this lead',
      },
    },
  ],
  timestamps: true,
}

