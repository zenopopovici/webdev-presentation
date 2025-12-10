'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

// Import presenter notes and slides config
import { presenterNotes } from '../data/presenterNotes'
import { slides } from '../lib/slides'

export default function PresenterView() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [contentVisible, setContentVisible] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(true)
  const totalSlides = slides.length

  // Sync with main presentation via localStorage
  useEffect(() => {
    const syncState = () => {
      const storedSlide = localStorage.getItem('currentSlide')
      const storedContentVisible = localStorage.getItem('contentVisible')
      if (storedSlide) {
        setCurrentSlide(parseInt(storedSlide))
      }
      if (storedContentVisible !== null) {
        setContentVisible(storedContentVisible === 'true')
      }
    }

    // Initial sync
    syncState()

    // Listen for changes
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'currentSlide') {
        setCurrentSlide(parseInt(e.newValue || '0'))
        setContentVisible(false)
      }
      if (e.key === 'contentVisible') {
        setContentVisible(e.newValue === 'true')
      }
    }

    window.addEventListener('storage', handleStorage)
    
    // Poll for changes (for same-window updates)
    const interval = setInterval(syncState, 500)

    return () => {
      window.removeEventListener('storage', handleStorage)
      clearInterval(interval)
    }
  }, [])

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerRunning) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const revealContent = useCallback(() => {
    setContentVisible(true)
    localStorage.setItem('contentVisible', 'true')
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'contentVisible',
      newValue: 'true'
    }))
  }, [])

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlide(index)
      setContentVisible(false)
      localStorage.setItem('currentSlide', index.toString())
      localStorage.setItem('contentVisible', 'false')
      // Dispatch event for same-window sync
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'currentSlide',
        newValue: index.toString()
      }))
    }
  }, [totalSlides])

  const nextSlide = useCallback(() => {
    // First press reveals content, second press goes to next slide
    if (!contentVisible) {
      revealContent()
      return
    }
    goToSlide(currentSlide + 1)
  }, [contentVisible, currentSlide, goToSlide, revealContent])

  const prevSlide = useCallback(() => {
    goToSlide(currentSlide - 1)
  }, [currentSlide, goToSlide])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault()
          nextSlide()
          break
        case 'ArrowLeft':
          e.preventDefault()
          prevSlide()
          break
        case 'g':
        case 'G':
          e.preventDefault()
          const input = prompt(`Go to slide (1-${totalSlides}):`)
          if (input) {
            const num = parseInt(input)
            if (num >= 1 && num <= totalSlides) {
              goToSlide(num - 1)
            }
          }
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextSlide, prevSlide, goToSlide, totalSlides])

  // Get notes with fallback for slides that don't have notes yet
  const currentNotes = presenterNotes[currentSlide] || {
    title: slides[currentSlide]?.name || `Slide ${currentSlide + 1}`,
    icon: '📄',
    notes: ['No presenter notes available for this slide.'],
    keyPoints: []
  }
  const nextNotes = presenterNotes[currentSlide + 1] || {
    title: slides[currentSlide + 1]?.name || `Slide ${currentSlide + 2}`,
    icon: '📄',
    notes: []
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sticky top-0 bg-gray-900 z-10 pb-2 border-b border-white/10">
        <h1 className="text-xl font-bold text-cyber-purple">
          🎤 Presenter Mode
        </h1>
        <div className="flex items-center gap-4">
          {/* Timer */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-xs"
            >
              {isTimerRunning ? '⏸️' : '▶️'}
            </button>
            <button
              onClick={() => setElapsedTime(0)}
              className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-xs"
            >
              🔄
            </button>
            <span className="text-2xl font-mono text-cyber-cyan">
              {formatTime(elapsedTime)}
            </span>
          </div>
          
          {/* Slide counter & content status */}
          <div className="text-sm flex items-center gap-3">
            <span className={`px-2 py-1 rounded text-xs ${contentVisible ? 'bg-cyber-green/20 text-cyber-green' : 'bg-cyber-orange/20 text-cyber-orange'}`}>
              {contentVisible ? '✓ Conținut vizibil' : '⏳ Apasă → pentru conținut'}
            </span>
            <button
              onClick={() => {
                const input = prompt(`Go to slide (1-${totalSlides}):`)
                if (input) {
                  const num = parseInt(input)
                  if (num >= 1 && num <= totalSlides) {
                    goToSlide(num - 1)
                  }
                }
              }}
              className="hover:text-white/80 transition-colors"
              title="Click to go to slide (or press G)"
            >
              <span className="text-cyber-purple font-bold">{currentSlide + 1}</span>
              <span className="text-white/50"> / {totalSlides}</span>
            </button>
            {currentNotes?.duration && (
              <span className="text-white/30 ml-2">({currentNotes.duration})</span>
            )}
          </div>
        </div>
      </div>

      {/* Current slide URL info */}
      <div className="mb-4 p-2 bg-black/30 rounded border border-white/10">
        <span className="text-xs text-white/40">URL: </span>
        <code className="text-xs text-cyber-cyan">/slide/{slides[currentSlide]?.slug}</code>
      </div>

      {/* Main content - 3 columns */}
      <div className="grid grid-cols-12 gap-4">
        {/* Left column: Slide previews (smaller) */}
        <div className="col-span-3 space-y-3">
          {/* Current slide mini preview */}
          <div className="bg-black/50 rounded-lg p-3 border border-cyber-purple/30">
            <h3 className="text-xs text-cyber-purple mb-2 font-semibold">📽️ CURENT</h3>
            <div className="bg-gray-800 rounded p-3 aspect-video flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl mb-1">{currentNotes?.icon}</div>
                <h2 className="text-xs font-bold leading-tight">{currentNotes?.title}</h2>
              </div>
            </div>
          </div>

          {/* Next slide preview */}
          <div className="bg-black/50 rounded-lg p-3 border border-cyber-green/30">
            <h3 className="text-xs text-cyber-green mb-2 font-semibold">⏭️ URMĂTOR</h3>
            {currentSlide < totalSlides - 1 ? (
              <div className="bg-gray-800 rounded p-3 aspect-video flex items-center justify-center opacity-70">
                <div className="text-center">
                  <div className="text-xl mb-1">{nextNotes?.icon}</div>
                  <h2 className="text-xs leading-tight">{nextNotes?.title}</h2>
                </div>
              </div>
            ) : (
              <div className="bg-gray-800 rounded p-3 aspect-video flex items-center justify-center text-gray-500 text-xs">
                Ultimul slide
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`flex-1 py-2 rounded-lg font-semibold text-sm transition-all ${
                currentSlide === 0
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-cyber-purple/20 hover:bg-cyber-purple/30 text-cyber-purple border border-cyber-purple/50'
              }`}
            >
              ←
            </button>
            <button
              onClick={nextSlide}
              disabled={currentSlide === totalSlides - 1 && contentVisible}
              className={`flex-1 py-2 rounded-lg font-semibold text-sm transition-all ${
                currentSlide === totalSlides - 1 && contentVisible
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-cyber-green/20 hover:bg-cyber-green/30 text-cyber-green border border-cyber-green/50'
              }`}
            >
              →
            </button>
          </div>

          {/* Slide thumbnails */}
          <div className="bg-black/50 rounded-lg p-3 border border-white/10">
            <h3 className="text-xs text-white/50 mb-2 font-semibold">📋 SLIDE-URI</h3>
            <div className="grid grid-cols-3 gap-1 max-h-48 overflow-y-auto">
              {slides.map((slide, i) => {
                const notes = presenterNotes[i] || { icon: '📄', title: slide.name }
                return (
                  <button
                    key={slide.slug}
                    onClick={() => goToSlide(i)}
                    title={`${i + 1}. ${slide.name}`}
                    className={`p-1 rounded text-center transition-all ${
                      i === currentSlide
                        ? 'bg-cyber-purple/30 border border-cyber-purple'
                        : 'bg-white/5 hover:bg-white/10 border border-transparent'
                    }`}
                  >
                    <div className="text-sm">{notes.icon}</div>
                    <div className="text-[8px] text-white/40">{i + 1}</div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Middle + Right columns: Notes (larger, scrollable) */}
        <div className="col-span-9 bg-black/50 rounded-lg p-4 border border-cyber-cyan/30">
          <h3 className="text-sm text-cyber-cyan mb-3 font-semibold sticky top-0 bg-black/80 py-2 -mt-2 -mx-4 px-4 backdrop-blur">
            📝 NOTE PREZENTATOR - {currentNotes?.title}
          </h3>
          
          <div className="space-y-3 max-h-[calc(100vh-280px)] overflow-y-auto pr-2">
            {/* Notes */}
            {currentNotes?.notes.map((note, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3 p-3 bg-white/5 rounded-lg"
              >
                <span className="text-cyber-green text-lg flex-shrink-0">▸</span>
                <p className="text-gray-200 text-sm leading-relaxed">{note}</p>
              </motion.div>
            ))}
            
            {/* Key points */}
            {currentNotes?.keyPoints && currentNotes.keyPoints.length > 0 && (
              <div className="mt-4 pt-4 border-t border-white/10">
                <h4 className="text-sm text-cyber-orange mb-3 font-semibold">💡 PUNCTE CHEIE / PRESCURTĂRI</h4>
                <div className="grid grid-cols-2 gap-2">
                  {currentNotes.keyPoints.map((point, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                      className="text-sm text-gray-300 flex items-start gap-2 p-2 bg-cyber-orange/10 rounded"
                    >
                      <span className="text-cyber-orange flex-shrink-0">•</span>
                      <span>{point}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 text-center text-xs text-white/30 sticky bottom-0 bg-gray-900 py-2">
        <span className="px-2 py-1 bg-white/5 rounded mr-1">←</span>
        <span className="px-2 py-1 bg-white/5 rounded mr-2">→</span>
        navigare
        <span className="mx-2">•</span>
        <span className="px-2 py-1 bg-white/5 rounded mr-1">G</span>
        go to slide
        <span className="mx-2">•</span>
        Scroll pentru mai multe note
      </div>
    </div>
  )
}
