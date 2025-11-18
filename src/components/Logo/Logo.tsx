import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { className } = props

  // Use text-based logo for now (can be replaced with image logo when available)
  return (
    <div className={clsx('flex items-center', className)}>
      <span className="text-xl md:text-2xl font-bold text-brand-navy whitespace-nowrap">
        <span className="text-brand-bronze">Altair</span> Medical
      </span>
    </div>
  )
}
