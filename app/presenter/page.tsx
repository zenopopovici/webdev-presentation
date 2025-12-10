'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

// Import presenter notes
import { presenterNotes } from '../data/presenterNotes'

export default function PresenterView() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(true)
  const totalSlides = 13

  // Sync with main presentation via localStorage
  useEffect(() => {
    const syncSlide = () => {
      const stored = localStorage.getItem('currentSlide')
      if (stored) {
        setCurrentSlide(parseInt(stored))
      }
    }

    // Initial sync
    syncSlide()

    // Listen for changes
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'currentSlide') {
        setCurrentSlide(parseInt(e.newValue || '0'))
      }
    }

    window.addEventListener('storage', handleStorage)
    
    // Poll for changes (for same-window updates)
    const interval = setInterval(syncSlide, 500)

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

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlide(index)
      localStorage.setItem('currentSlide', index.toString())
      // Dispatch event for same-window sync
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'currentSlide',
        newValue: index.toString()
      }))
    }
  }, [])

  const nextSlide = () => goToSlide(currentSlide + 1)
  const prevSlide = () => goToSlide(currentSlide - 1)

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
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentSlide])

  const currentNotes = presenterNotes[currentSlide]
  const nextNotes = presenterNotes[currentSlide + 1]

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-cyber-purple">
          🎤 Modul Prezentator
        </h1>
        <div className="flex items-center gap-6">
          {/* Timer */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-sm"
            >
              {isTimerRunning ? '⏸️ Pauză' : '▶️ Start'}
            </button>
            <button
              onClick={() => setElapsedTime(0)}
              className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-sm"
            >
              🔄 Reset
            </button>
            <span className="text-3xl font-mono text-cyber-cyan">
              {formatTime(elapsedTime)}
            </span>
          </div>
          
          {/* Slide counter */}
          <div className="text-lg">
            Slide <span className="text-cyber-purple font-bold">{currentSlide + 1}</span> / {totalSlides}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 h-[calc(100vh-140px)]">
        {/* Left: Current slide preview + notes */}
        <div className="flex flex-col gap-4">
          {/* Current slide mini preview */}
          <div className="bg-black/50 rounded-xl p-4 border border-cyber-purple/30">
            <h3 className="text-sm text-cyber-purple mb-2 font-semibold">📽️ SLIDE CURENT</h3>
            <div className="bg-gray-800 rounded-lg p-4 aspect-video flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">{currentNotes?.icon}</div>
                <h2 className="text-xl font-bold">{currentNotes?.title}</h2>
              </div>
            </div>
          </div>

          {/* Notes for current slide */}
          <div className="flex-1 bg-black/50 rounded-xl p-4 border border-cyber-cyan/30 overflow-auto">
            <h3 className="text-sm text-cyber-cyan mb-3 font-semibold">📝 NOTE PREZENTATOR</h3>
            <div className="space-y-4">
              {currentNotes?.notes.map((note, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-cyber-green text-lg">▸</span>
                  <p className="text-gray-200 leading-relaxed">{note}</p>
                </motion.div>
              ))}
            </div>
            
            {/* Key points */}
            {currentNotes?.keyPoints && (
              <div className="mt-6 pt-4 border-t border-white/10">
                <h4 className="text-sm text-cyber-orange mb-2 font-semibold">💡 PUNCTE CHEIE</h4>
                <ul className="space-y-2">
                  {currentNotes.keyPoints.map((point, i) => (
                    <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                      <span className="text-cyber-orange">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Right: Next slide preview + navigation */}
        <div className="flex flex-col gap-4">
          {/* Next slide preview */}
          <div className="bg-black/50 rounded-xl p-4 border border-cyber-green/30">
            <h3 className="text-sm text-cyber-green mb-2 font-semibold">⏭️ SLIDE URMĂTOR</h3>
            {currentSlide < totalSlides - 1 ? (
              <div className="bg-gray-800 rounded-lg p-4 aspect-video flex items-center justify-center">
                <div className="text-center opacity-70">
                  <div className="text-3xl mb-2">{nextNotes?.icon}</div>
                  <h2 className="text-lg">{nextNotes?.title}</h2>
                </div>
              </div>
            ) : (
              <div className="bg-gray-800 rounded-lg p-4 aspect-video flex items-center justify-center text-gray-500">
                <p>Ultimul slide</p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex gap-4">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`flex-1 py-4 rounded-xl font-semibold text-lg transition-all ${
                currentSlide === 0
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-cyber-purple/20 hover:bg-cyber-purple/30 text-cyber-purple border border-cyber-purple/50'
              }`}
            >
              ← Înapoi
            </button>
            <button
              onClick={nextSlide}
              disabled={currentSlide === totalSlides - 1}
              className={`flex-1 py-4 rounded-xl font-semibold text-lg transition-all ${
                currentSlide === totalSlides - 1
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-cyber-green/20 hover:bg-cyber-green/30 text-cyber-green border border-cyber-green/50'
              }`}
            >
              Următorul →
            </button>
          </div>

          {/* Slide thumbnails */}
          <div className="flex-1 bg-black/50 rounded-xl p-4 border border-white/10 overflow-auto">
            <h3 className="text-sm text-white/50 mb-3 font-semibold">📋 TOATE SLIDE-URILE</h3>
            <div className="grid grid-cols-4 gap-2">
              {presenterNotes.map((slide, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`p-2 rounded-lg text-center transition-all ${
                    i === currentSlide
                      ? 'bg-cyber-purple/30 border-2 border-cyber-purple'
                      : 'bg-white/5 hover:bg-white/10 border border-transparent'
                  }`}
                >
                  <div className="text-lg mb-1">{slide.icon}</div>
                  <div className="text-[10px] text-white/60 truncate">{slide.title}</div>
                  <div className="text-[10px] text-white/30">{i + 1}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 text-center text-sm text-white/30">
        Folosește <span className="text-cyber-cyan">←</span> <span className="text-cyber-cyan">→</span> sau <span className="text-cyber-cyan">Space</span> pentru navigare
        &nbsp;•&nbsp;
        Deschide <span className="text-cyber-purple">/presenter</span> pe un ecran separat
      </div>
    </div>
  )
}

