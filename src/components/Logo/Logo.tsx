import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  variant?: 'light' | 'dark' | 'auto'
}

export const Logo = (props: Props) => {
  const { className, variant = 'auto', loading = 'lazy', priority = 'low' } = props

  // Determine if we should use light variant (for dark backgrounds)
  const useLightVariant = variant === 'light' || (variant === 'auto' && className?.includes('text-white'))

  // Use favicon as logo
  return (
    <div className={clsx('flex items-center', className)}>
      <Image
        src="/favicon.svg"
        alt="Altair Medical System"
        width={100}
        height={100}
        loading={loading}
        priority={priority === 'high'}
        className={clsx(
          'object-contain',
          // Default width if not specified in className
          !className?.includes('w-') && 'w-[100px]',
          useLightVariant && 'brightness-0 invert'
        )}
      />
    </div>
  )
}
