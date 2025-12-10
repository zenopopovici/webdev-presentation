'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { slides } from './lib/slides'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Check if there's a stored slide from presenter view
    const storedSlide = localStorage.getItem('currentSlide')
    if (storedSlide) {
      const index = parseInt(storedSlide)
      if (index >= 0 && index < slides.length) {
        router.replace(`/slide/${slides[index].slug}`)
        return
      }
    }
    // Default to first slide
    router.replace(`/slide/${slides[0].slug}`)
  }, [router])

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="text-white/50 font-display">Loading presentation...</div>
    </div>
  )
}
