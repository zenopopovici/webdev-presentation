'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

interface SlideProps {
  contentVisible?: boolean
}

export default function EventLoopSlide({ contentVisible = true }: SlideProps) {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % 6)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full h-full flex flex-col p-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <span className="text-cyber-green font-display text-sm tracking-widest uppercase">The Magic</span>
        <h1 className="text-5xl font-body font-bold mt-2">
          The <span className="text-cyber-green">Event Loop</span>
        </h1>
      </motion.div>

      <AnimatePresence>
        {contentVisible && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="flex-1 flex items-center justify-center"
            >
              <div className="relative w-full max-w-5xl h-96">
                {/* Central Event Loop */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring' }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    className="w-full h-full rounded-full border-4 border-dashed border-cyber-green/50 flex items-center justify-center"
                  >
                    <div className="w-28 h-28 rounded-full bg-gradient-to-br from-cyber-green/30 to-cyber-cyan/20 flex items-center justify-center">
                      <span className="text-cyber-green font-display font-bold text-sm text-center">EVENT<br/>LOOP</span>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Call Stack */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className={`absolute left-8 top-8 w-48 diagram-box p-4 transition-all ${activeStep === 0 ? 'glow-cyan' : ''}`}
                >
                  <h4 className="text-cyber-cyan font-display font-semibold text-sm mb-3">📚 Call Stack</h4>
                  <div className="space-y-1">
                    {activeStep === 0 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="px-2 py-1 text-xs bg-cyber-cyan/20 rounded font-display"
                      >
                        handleClick()
                      </motion.div>
                    )}
                    <div className="px-2 py-1 text-xs bg-white/5 rounded font-display text-white/50">
                      empty when idle
                    </div>
                  </div>
                </motion.div>

                {/* Web APIs */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className={`absolute right-8 top-8 w-52 diagram-box p-4 transition-all ${activeStep === 1 || activeStep === 2 ? 'glow-purple' : ''}`}
                >
                  <h4 className="text-cyber-purple font-display font-semibold text-sm mb-3">🌐 Web APIs</h4>
                  <div className="space-y-1 text-xs font-display">
                    <div className="px-2 py-1 bg-cyber-purple/20 rounded flex justify-between">
                      <span>setTimeout</span>
                      {(activeStep === 1 || activeStep === 2) && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-cyber-purple"
                        >
                          ⏳
                        </motion.span>
                      )}
                    </div>
                    <div className="px-2 py-1 bg-cyber-purple/20 rounded">fetch</div>
                    <div className="px-2 py-1 bg-cyber-purple/20 rounded">DOM events</div>
                  </div>
                </motion.div>

                {/* Callback Queue */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className={`absolute left-8 bottom-8 w-48 diagram-box p-4 transition-all ${activeStep === 3 ? 'glow-pink' : ''}`}
                >
                  <h4 className="text-cyber-pink font-display font-semibold text-sm mb-3">📋 Task Queue</h4>
                  <div className="space-y-1">
                    {(activeStep === 3 || activeStep === 4) && (
                      <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="px-2 py-1 text-xs bg-cyber-pink/20 rounded font-display"
                      >
                        callback()
                      </motion.div>
                    )}
                    <div className="px-2 py-1 text-xs bg-white/5 rounded font-display text-white/50">
                      waiting callbacks
                    </div>
                  </div>
                </motion.div>

                {/* Microtask Queue */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="absolute right-8 bottom-8 w-52 diagram-box p-4"
                >
                  <h4 className="text-cyber-orange font-display font-semibold text-sm mb-3">⚡ Microtask Queue</h4>
                  <div className="space-y-1 text-xs font-display">
                    <div className="px-2 py-1 bg-cyber-orange/20 rounded">Promise.then()</div>
                    <div className="px-2 py-1 bg-cyber-orange/20 rounded">queueMicrotask()</div>
                  </div>
                  <p className="text-white/40 text-xs mt-2">Higher priority than tasks</p>
                </motion.div>

                {/* Flow arrows */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
                    </marker>
                  </defs>
                  {/* Animated flow indicator */}
                  <motion.circle
                    r="6"
                    fill="#10b981"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 1, 1, 0],
                      cx: ['15%', '50%', '85%', '50%'],
                      cy: ['20%', '50%', '20%', '80%'],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                </svg>
              </div>
            </motion.div>

            {/* Explanation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-4 text-center"
            >
              <p className="text-white/60 font-display text-sm max-w-2xl mx-auto">
                Event Loop verifică continuu dacă <span className="text-cyber-cyan">Call Stack</span>-ul este gol, 
                apoi procesează <span className="text-cyber-orange">microtasks</span> mai întâi, 
                apoi mută <span className="text-cyber-pink">callbacks</span> din queue în stack.
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
