'use client'

import Image, { ImageProps } from 'next/image'
import { useState } from 'react'
import { cn } from '@/utilities/ui'

interface LazyImageProps extends Omit<ImageProps, 'loading'> {
  fallback?: string
  className?: string
}

/**
 * Optimized lazy-loading image component
 * Only loads when in viewport or when priority is set
 */
export function LazyImage({ src, alt, priority = false, className, fallback, ...props }: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {isLoading && !priority && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" aria-hidden="true" />
      )}
      <Image
        src={hasError && fallback ? fallback : src}
        alt={alt}
        loading={priority ? undefined : 'lazy'}
        priority={priority}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          if (fallback) {
            setHasError(true)
            setIsLoading(false)
          }
        }}
        className={cn(
          'transition-opacity duration-300',
          isLoading && !priority ? 'opacity-0' : 'opacity-100',
          className
        )}
        {...props}
      />
    </div>
  )
}

