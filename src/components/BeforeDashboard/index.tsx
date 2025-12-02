import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'

import { SeedButton } from './SeedButton'
import './index.scss'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>Welcome to Altair Medical System CMS</h4>
      </Banner>
      <p style={{ marginBottom: '1rem', color: '#6B7280' }}>
        Manage your website content, products, projects, and events from this dashboard.
      </p>
      Here&apos;s what you can do:
      <ul className={`${baseClass}__instructions`}>
        <li>
          <strong>Products:</strong> Add and manage modular operation theatres, surgical pendants, bed-head units, and medical gas systems.
        </li>
        <li>
          <strong>Projects:</strong> Showcase completed installations and case studies.
        </li>
        <li>
          <strong>Events:</strong> Manage trade shows, expos, and conferences.
        </li>
        <li>
          <strong>Blog:</strong> Create posts and news articles.
        </li>
        <li>
          <strong>Resources:</strong> Upload technical documents, datasheets, and compliance certificates.
        </li>
        <li>
          <strong>Leads:</strong> View and manage form submissions from contact, quote, and survey forms.
        </li>
      </ul>
      <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#6B7280' }}>
        <a href="/" target="_blank" rel="noopener noreferrer" style={{ color: '#163852' }}>
          Visit your website
        </a>
        {' to see your changes live.'}
      </p>
    </div>
  )
}

export default BeforeDashboard
