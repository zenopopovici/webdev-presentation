'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Import presenter notes and slides config
import { presenterNotes } from '../data/presenterNotes'
import { slides } from '../lib/slides'

export default function PresenterView() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [contentVisible, setContentVisible] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(true)
  const [showSlideMenu, setShowSlideMenu] = useState(false)
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
          setShowSlideMenu(true)
          break
        case 'Escape':
          e.preventDefault()
          setShowSlideMenu(false)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextSlide, prevSlide, goToSlide, totalSlides, showSlideMenu])

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
    <div className="h-screen bg-gray-900 text-white p-2 flex flex-col overflow-hidden">
      {/* Header - compact */}
      <div className="flex items-center justify-between pb-2 border-b border-white/10 flex-shrink-0">
        <h1 className="text-sm font-bold text-cyber-purple">🎤 Presenter</h1>
        <div className="flex items-center gap-3">
          {/* Timer */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="px-1.5 py-0.5 rounded bg-white/10 hover:bg-white/20 text-xs"
            >
              {isTimerRunning ? '⏸️' : '▶️'}
            </button>
            <button
              onClick={() => setElapsedTime(0)}
              className="px-1.5 py-0.5 rounded bg-white/10 hover:bg-white/20 text-xs"
            >
              🔄
            </button>
            <span className="text-lg font-mono text-cyber-cyan">
              {formatTime(elapsedTime)}
            </span>
          </div>
          
          {/* Slide counter & content status */}
          <div className="text-xs flex items-center gap-2">
            <span className={`px-1.5 py-0.5 rounded ${contentVisible ? 'bg-cyber-green/20 text-cyber-green' : 'bg-cyber-orange/20 text-cyber-orange'}`}>
              {contentVisible ? '✓ Vizibil' : '⏳ → conținut'}
            </span>
            <button
              onClick={() => setShowSlideMenu(true)}
              className="hover:text-white/80 transition-colors flex items-center gap-1"
              title="Click to go to slide (or press G)"
            >
              <span className="text-cyber-purple font-bold">{currentSlide + 1}</span>
              <span className="text-white/50">/{totalSlides}</span>
              <span className="text-white/30 ml-1">📋</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content - 3 columns */}
      <div className="flex-1 flex gap-2 mt-2 min-h-0">
        {/* Left column: Vertical slides map */}
        <div className="w-16 flex-shrink-0 bg-black/50 rounded p-1 border border-white/10 overflow-y-auto">
          <div className="flex flex-col gap-1">
            {slides.map((slide, i) => {
              const notes = presenterNotes[i] || { icon: '📄', title: slide.name }
              return (
                <button
                  key={slide.slug}
                  onClick={() => goToSlide(i)}
                  title={`${i + 1}. ${slide.name}`}
                  className={`p-1 rounded text-center transition-all ${
                    i === currentSlide
                      ? 'bg-cyber-purple/40 border border-cyber-purple'
                      : i === currentSlide + 1
                      ? 'bg-cyber-green/20 border border-cyber-green/50'
                      : 'bg-white/5 hover:bg-white/10 border border-transparent'
                  }`}
                >
                  <div className="text-sm">{notes.icon}</div>
                  <div className="text-[8px] text-white/50">{i + 1}</div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Middle column: Current + Next previews */}
        <div className="w-48 flex-shrink-0 flex flex-col gap-2">
          {/* Current slide */}
          <div className="bg-black/50 rounded p-2 border border-cyber-purple/30">
            <h3 className="text-[10px] text-cyber-purple mb-1 font-semibold">📽️ CURENT</h3>
            <div className="bg-gray-800 rounded p-2 flex items-center justify-center h-20">
              <div className="text-center">
                <div className="text-2xl">{currentNotes?.icon}</div>
                <h2 className="text-xs font-bold leading-tight">{currentNotes?.title}</h2>
              </div>
            </div>
          </div>

          {/* Next slide */}
          <div className="bg-black/50 rounded p-2 border border-cyber-green/30">
            <h3 className="text-[10px] text-cyber-green mb-1 font-semibold">⏭️ NEXT</h3>
            {currentSlide < totalSlides - 1 ? (
              <div className="bg-gray-800 rounded p-2 flex items-center justify-center opacity-70 h-20">
                <div className="text-center">
                  <div className="text-2xl">{nextNotes?.icon}</div>
                  <h2 className="text-xs leading-tight">{nextNotes?.title}</h2>
                </div>
              </div>
            ) : (
              <div className="bg-gray-800 rounded p-2 flex items-center justify-center text-gray-500 text-xs h-20">
                Ultimul slide
              </div>
            )}
          </div>
        </div>

        {/* Right column: Notes (larger, scrollable) */}
        <div className="flex-1 bg-black/50 rounded-lg p-3 border border-cyber-cyan/30 flex flex-col min-h-0">
          {/* Header with title and duration */}
          <div className="flex items-center justify-between mb-3 flex-shrink-0 border-b border-white/10 pb-2">
            <h3 className="text-sm text-cyber-cyan font-semibold flex items-center gap-2">
              <span className="text-lg">{currentNotes?.icon}</span>
              <span>{currentNotes?.title}</span>
            </h3>
            {currentNotes?.duration && (
              <span className="text-xs bg-cyber-purple/20 text-cyber-purple px-2 py-0.5 rounded">
                ⏱️ {currentNotes.duration}
              </span>
            )}
          </div>
          
          <div className="space-y-2 overflow-y-auto flex-1 pr-1">
            {/* Notes - main talking points */}
            <div className="space-y-1.5">
              <h4 className="text-[10px] text-white/40 uppercase tracking-wider">📝 Ce să spui:</h4>
              {currentNotes?.notes.map((note, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 p-2 bg-white/5 rounded border-l-2 border-cyber-green/50"
                >
                  <span className="text-cyber-green text-xs font-bold flex-shrink-0 w-4">{i + 1}.</span>
                  <p className="text-gray-200 text-sm leading-relaxed">{note}</p>
                </div>
              ))}
            </div>
            
            {/* Key points / Abbreviations */}
            {currentNotes?.keyPoints && currentNotes.keyPoints.length > 0 && (
              <div className="mt-3 pt-3 border-t border-white/10">
                <h4 className="text-[10px] text-white/40 uppercase tracking-wider mb-2">💡 Prescurtări & Puncte cheie:</h4>
                <div className="grid grid-cols-2 gap-1.5">
                  {currentNotes.keyPoints.map((point, i) => (
                    <div
                      key={i}
                      className="text-xs text-gray-300 flex items-start gap-2 p-1.5 bg-cyber-orange/10 rounded border border-cyber-orange/20"
                    >
                      <span className="text-cyber-orange flex-shrink-0">→</span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

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
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed top-4 left-1/2 -translate-x-1/2 w-[500px] max-h-[85vh] z-[101] bg-gray-800 border border-cyber-cyan/30 rounded-lg overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <h2 className="text-lg font-bold text-cyber-cyan">📋 Selectează Slide</h2>
                <button
                  onClick={() => setShowSlideMenu(false)}
                  className="text-white/50 hover:text-white transition-colors text-xl"
                >
                  ×
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-2">
                <div className="grid grid-cols-1 gap-1">
                  {slides.map((slide, index) => {
                    const notes = presenterNotes[index] || { icon: '📄', title: slide.name }
                    return (
                      <button
                        key={slide.slug}
                        onClick={() => {
                          goToSlide(index)
                          setShowSlideMenu(false)
                        }}
                        className={`p-2 rounded text-left transition-all flex items-center gap-3 ${
                          index === currentSlide
                            ? 'bg-cyber-purple/30 border border-cyber-purple'
                            : 'bg-white/5 hover:bg-white/10 border border-transparent'
                        }`}
                      >
                        <span className={`text-sm font-bold w-6 ${
                          index === currentSlide ? 'text-cyber-purple' : 'text-white/50'
                        }`}>
                          {index + 1}
                        </span>
                        <span className="text-lg">{notes.icon}</span>
                        <span className="flex-1 text-white/90 text-sm">
                          {slide.name}
                        </span>
                        {index === currentSlide && (
                          <span className="text-cyber-purple">●</span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
