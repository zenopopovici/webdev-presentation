'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { slides, getSlideBySlug } from '@/app/lib/slides'

export default function SlidePage() {
  const router = useRouter()
  const params = useParams()
  const slug = params.slug as string
  
  const [direction, setDirection] = useState(0)
  const [contentVisible, setContentVisible] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)

  // Find current slide
  const slideData = getSlideBySlug(slug)
  const currentSlide = slideData?.index ?? 0
  const CurrentSlideComponent = slideData?.slide.component

  // Redirect to first slide if invalid slug
  useEffect(() => {
    if (!slideData) {
      router.replace(`/slide/${slides[0].slug}`)
    }
  }, [slideData, router])

  // Sync with localStorage for presenter view
  useEffect(() => {
    localStorage.setItem('currentSlide', currentSlide.toString())
  }, [currentSlide])

  useEffect(() => {
    localStorage.setItem('contentVisible', contentVisible.toString())
  }, [contentVisible])

  // Listen for presenter view changes
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'currentSlide' && e.newValue) {
        const newSlide = parseInt(e.newValue)
        if (newSlide !== currentSlide && slides[newSlide]) {
          setDirection(newSlide > currentSlide ? 1 : -1)
          setIsNavigating(true)
          router.push(`/slide/${slides[newSlide].slug}`)
        }
      }
      if (e.key === 'contentVisible' && e.newValue) {
        setContentVisible(e.newValue === 'true')
      }
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [currentSlide, router])

  // Reset navigation state after route change
  useEffect(() => {
    setIsNavigating(false)
  }, [slug])

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < slides.length) {
      setDirection(index > currentSlide ? 1 : -1)
      setContentVisible(false)
      setIsNavigating(true)
      localStorage.setItem('currentSlide', index.toString())
      localStorage.setItem('contentVisible', 'false')
      router.push(`/slide/${slides[index].slug}`)
    }
  }, [currentSlide, router])

  const revealContent = useCallback(() => {
    setContentVisible(true)
    localStorage.setItem('contentVisible', 'true')
  }, [])

  const nextSlide = useCallback(() => {
    if (!contentVisible) {
      revealContent()
      return
    }
    if (currentSlide < slides.length - 1) {
      goToSlide(currentSlide + 1)
    }
  }, [currentSlide, contentVisible, revealContent, goToSlide])

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1)
    }
  }, [currentSlide, goToSlide])

  const openPresenterView = () => {
    window.open('/presenter', 'presenter', 'width=1200,height=800')
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
        case 'Enter':
          e.preventDefault()
          nextSlide()
          break
        case 'ArrowLeft':
        case 'Backspace':
          e.preventDefault()
          prevSlide()
          break
        case 'Home':
          e.preventDefault()
          goToSlide(0)
          break
        case 'End':
          e.preventDefault()
          goToSlide(slides.length - 1)
          break
        case 'p':
        case 'P':
          e.preventDefault()
          openPresenterView()
          break
        case 'g':
        case 'G':
          e.preventDefault()
          const input = prompt(`Go to slide (1-${slides.length}):`)
          if (input) {
            const num = parseInt(input)
            if (num >= 1 && num <= slides.length) {
              goToSlide(num - 1)
            }
          }
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextSlide, prevSlide, goToSlide])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
  }

  if (!CurrentSlideComponent) {
    return null
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-50">
        <motion.div
          className="h-full progress-bar"
          initial={{ width: 0 }}
          animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Slide Counter - Clickable */}
      <button
        onClick={() => {
          const input = prompt(`Go to slide (1-${slides.length}):`)
          if (input) {
            const num = parseInt(input)
            if (num >= 1 && num <= slides.length) {
              goToSlide(num - 1)
            }
          }
        }}
        className="absolute top-6 right-8 z-50 font-display text-sm text-white/50 hover:text-white/80 transition-colors cursor-pointer"
        title="Click to go to slide (or press G)"
      >
        <span className="text-cyber-purple font-bold">{currentSlide + 1}</span>
        <span className="mx-2">/</span>
        <span>{slides.length}</span>
      </button>

      {/* Presenter View Button */}
      <button
        onClick={openPresenterView}
        className="absolute top-6 left-8 z-50 px-3 py-1 text-xs font-display text-white/50 hover:text-white/80 bg-white/5 hover:bg-white/10 rounded transition-all"
        title="Apasă P pentru Modul Prezentator"
      >
        🎤 Prezentator
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.slug}
            onClick={() => goToSlide(index)}
            title={`${index + 1}. ${slide.name}`}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-cyber-purple w-8 glow-purple'
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        disabled={currentSlide === 0}
        className={`absolute left-8 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full transition-all duration-300 ${
          currentSlide === 0
            ? 'opacity-20 cursor-not-allowed'
            : 'opacity-60 hover:opacity-100 hover:bg-white/10'
        }`}
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        disabled={currentSlide === slides.length - 1}
        className={`absolute right-8 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full transition-all duration-300 ${
          currentSlide === slides.length - 1
            ? 'opacity-20 cursor-not-allowed'
            : 'opacity-60 hover:opacity-100 hover:bg-white/10'
        }`}
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slides */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={slug}
          custom={direction}
          variants={slideVariants}
          initial={isNavigating ? "enter" : false}
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
            scale: { duration: 0.2 },
          }}
          className="absolute inset-0"
        >
          <CurrentSlideComponent contentVisible={contentVisible} />
        </motion.div>
      </AnimatePresence>

      {/* Keyboard hints */}
      <div className="absolute bottom-8 right-8 z-50 text-xs text-white/30 font-display">
        <span className="px-2 py-1 bg-white/5 rounded mr-2">←</span>
        <span className="px-2 py-1 bg-white/5 rounded mr-2">→</span>
        <span className="text-white/20">{contentVisible ? 'navigare' : 'arată conținut'}</span>
        <span className="mx-2 text-white/10">|</span>
        <span className="px-2 py-1 bg-white/5 rounded mr-1">G</span>
        <span className="text-white/20">go to</span>
        <span className="mx-2 text-white/10">|</span>
        <span className="px-2 py-1 bg-white/5 rounded mr-1">P</span>
        <span className="text-white/20">prezentator</span>
      </div>
    </div>
  )
}
