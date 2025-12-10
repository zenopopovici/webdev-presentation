'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Slide Components
import TitleSlide from './components/slides/TitleSlide'
import BrowserSlide from './components/slides/BrowserSlide'
import BrowserDetailsSlide from './components/slides/BrowserDetailsSlide'
import JavaScriptSlide from './components/slides/JavaScriptSlide'
import EventLoopSlide from './components/slides/EventLoopSlide'
import RestApiSlide from './components/slides/RestApiSlide'
import RestApiDetailsSlide from './components/slides/RestApiDetailsSlide'
import DockerIntroSlide from './components/slides/DockerIntroSlide'
import DockerHowSlide from './components/slides/DockerHowSlide'
import DockerfileSlide from './components/slides/DockerfileSlide'
import GitHubActionsSlide from './components/slides/GitHubActionsSlide'
import GitHubActionsFileSlide from './components/slides/GitHubActionsFileSlide'
import ThankYouSlide from './components/slides/ThankYouSlide'

const slides = [
  TitleSlide,
  BrowserSlide,
  BrowserDetailsSlide,
  JavaScriptSlide,
  EventLoopSlide,
  RestApiSlide,
  RestApiDetailsSlide,
  DockerIntroSlide,
  DockerHowSlide,
  DockerfileSlide,
  GitHubActionsSlide,
  GitHubActionsFileSlide,
  ThankYouSlide,
]

export default function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0)

  // Sync with presenter view via localStorage
  useEffect(() => {
    const syncFromStorage = () => {
      const stored = localStorage.getItem('currentSlide')
      if (stored) {
        const storedSlide = parseInt(stored)
        if (storedSlide !== currentSlide) {
          setDirection(storedSlide > currentSlide ? 1 : -1)
          setCurrentSlide(storedSlide)
        }
      }
    }

    // Listen for changes from presenter view
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'currentSlide' && e.newValue) {
        const newSlide = parseInt(e.newValue)
        setDirection(newSlide > currentSlide ? 1 : -1)
        setCurrentSlide(newSlide)
      }
    }

    window.addEventListener('storage', handleStorage)
    
    // Poll for same-window updates
    const interval = setInterval(syncFromStorage, 500)

    return () => {
      window.removeEventListener('storage', handleStorage)
      clearInterval(interval)
    }
  }, [currentSlide])

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < slides.length) {
      setDirection(index > currentSlide ? 1 : -1)
      setCurrentSlide(index)
      localStorage.setItem('currentSlide', index.toString())
    }
  }, [currentSlide])

  const nextSlide = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      const newSlide = currentSlide + 1
      setDirection(1)
      setCurrentSlide(newSlide)
      localStorage.setItem('currentSlide', newSlide.toString())
    }
  }, [currentSlide])

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      const newSlide = currentSlide - 1
      setDirection(-1)
      setCurrentSlide(newSlide)
      localStorage.setItem('currentSlide', newSlide.toString())
    }
  }, [currentSlide])

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
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextSlide, prevSlide, goToSlide])

  const CurrentSlideComponent = slides[currentSlide]

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

      {/* Slide Counter */}
      <div className="absolute top-6 right-8 z-50 font-display text-sm text-white/50">
        <span className="text-cyber-purple font-bold">{currentSlide + 1}</span>
        <span className="mx-2">/</span>
        <span>{slides.length}</span>
      </div>

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
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
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
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
            scale: { duration: 0.2 },
          }}
          className="absolute inset-0"
        >
          <CurrentSlideComponent />
        </motion.div>
      </AnimatePresence>

      {/* Keyboard hints */}
      <div className="absolute bottom-8 right-8 z-50 text-xs text-white/30 font-display">
        <span className="px-2 py-1 bg-white/5 rounded mr-2">←</span>
        <span className="px-2 py-1 bg-white/5 rounded mr-2">→</span>
        <span className="text-white/20">navigare</span>
        <span className="mx-2 text-white/10">|</span>
        <span className="px-2 py-1 bg-white/5 rounded mr-1">P</span>
        <span className="text-white/20">prezentator</span>
      </div>
    </div>
  )
}
