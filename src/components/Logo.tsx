'use client'

import React from 'react'
import Image from 'next/image'

interface LogoProps {
  className?: string
  size?: 'small' | 'medium' | 'large'
}

export default function Logo({ className = '', size = 'medium' }: LogoProps) {
  const sizeClasses = {
    small: 'h-12',
    medium: 'h-16',
    large: 'h-20'
  }

  return (
    <div className={`${className}`}>
      <Image
        src="/elia_logo.png.webp"
        alt="ELIA Life Technologies Logo"
        width={300}
        height={90}
        className={`${sizeClasses[size]} w-auto`}
        priority
        unoptimized
      />
    </div>
  )
}