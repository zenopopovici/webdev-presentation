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
  const [showSlideMenu, setShowSlideMenu] = useState(false)

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showSlideMenu) {
        if (e.key === 'Escape') {
          e.preventDefault()
          setShowSlideMenu(false)
        }
        return
      }

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
        case 'g':
        case 'G':
          e.preventDefault()
          setShowSlideMenu(true)
          break
        case 'p':
        case 'P':
          e.preventDefault()
          window.open('/presenter', '_blank')
          break
        case 'Escape':
          e.preventDefault()
          setShowSlideMenu(false)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextSlide, prevSlide, goToSlide, showSlideMenu])

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

      {/* Home Button, Hamburger Menu & Slide Counter */}
      <div className="absolute top-6 right-8 z-50 flex items-center gap-3">
        <button
          onClick={() => goToSlide(0)}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
          title="Go to first slide (Home)"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </button>
        <button
          onClick={() => setShowSlideMenu(true)}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
          title="Open slides menu (or press G)"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <button
          onClick={() => setShowSlideMenu(true)}
          className="font-display text-sm text-white/50 hover:text-white/80 transition-colors cursor-pointer"
          title="Click to go to slide (or press G)"
        >
          <span className="text-cyber-purple font-bold">{currentSlide + 1}</span>
          <span className="mx-2">/</span>
          <span>{slides.length}</span>
        </button>
      </div>

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

      {/* Slide Menu Modal */}
      <AnimatePresence>
        {showSlideMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSlideMenu(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="fixed top-16 right-8 w-[clamp(20rem,35vw,28rem)] max-h-[80vh] z-[101] diagram-box overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h2 className="text-2xl font-body font-bold text-cyber-cyan">Selectează Slide</h2>
                <button
                  onClick={() => setShowSlideMenu(false)}
                  className="text-white/50 hover:text-white transition-colors text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <div className="grid grid-cols-1 gap-2">
                  {slides.map((slide, index) => (
                    <button
                      key={slide.slug}
                      onClick={() => {
                        goToSlide(index)
                        setShowSlideMenu(false)
                      }}
                      className={`p-4 rounded-lg text-left transition-all ${
                        index === currentSlide
                          ? 'bg-cyber-purple/30 border-2 border-cyber-purple'
                          : 'bg-white/5 hover:bg-white/10 border-2 border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className={`text-lg font-bold ${
                          index === currentSlide ? 'text-cyber-purple' : 'text-white/50'
                        }`}>
                          {index + 1}
                        </span>
                        <span className="flex-1 text-white/90 font-display text-lg">
                          {slide.name}
                        </span>
                        {index === currentSlide && (
                          <span className="text-cyber-purple">●</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
