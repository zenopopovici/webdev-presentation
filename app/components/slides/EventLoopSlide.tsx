'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

interface SlideProps {
  contentVisible?: boolean
}

// Step descriptions for the event loop animation
const STEPS = [
  { description: "1️⃣ handleClick() se execută pe Call Stack" },
  { description: "2️⃣ setTimeout() trimite callback-ul la Web APIs" },
  { description: "3️⃣ Timer-ul se termină, callback → Task Queue" },
  { description: "4️⃣ Promise.then() adaugă microtask în Microtask Queue" },
  { description: "5️⃣ Event Loop: Microtasks au PRIORITATE!" },
  { description: "6️⃣ Microtask-ul se execută pe Call Stack" },
  { description: "7️⃣ Event Loop: Acum procesăm Task Queue" },
  { description: "8️⃣ Callback-ul se execută pe Call Stack" },
]

export default function EventLoopSlide({ contentVisible = true }: SlideProps) {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % 8)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full h-full flex flex-col p-[clamp(0.75rem,1.5vw,1.5rem)] overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-[clamp(0.5rem,1vw,1rem)] flex-shrink-0"
      >
        <span className="text-cyber-green font-display text-[clamp(0.75rem,1vw,0.875rem)] tracking-widest uppercase">The Magic</span>
        <h1 className="text-[clamp(2rem,4vw,3rem)] font-body font-bold mt-1">
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
              className="flex-1 flex items-center justify-center min-h-0 overflow-auto"
            >
              <div className="relative w-full max-w-7xl h-[clamp(28rem,60vh,40rem)]">
                {/* Grid layout for proper centering */}
                <div className="absolute inset-0 grid grid-rows-[1fr_auto_1fr] grid-cols-2 gap-x-[clamp(1rem,2vw,2rem)] gap-y-[clamp(2rem,4vw,3rem)] p-[clamp(0.5rem,1vw,1rem)]">
                  {/* Top row - Call Stack & Web APIs */}
                  <div className="row-start-1 col-span-1 flex flex-col min-h-0 items-start">
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className={`h-full w-[clamp(16rem,24vw,20rem)] diagram-box p-[clamp(0.75rem,1vw,1rem)] transition-all overflow-y-auto ${[0, 1, 5, 7].includes(activeStep) ? 'glow-cyan' : ''}`}
                    >
                      <h4 className="text-cyber-cyan font-display font-semibold text-sm mb-3">📚 Call Stack</h4>
                      <div className="space-y-1">
                        <AnimatePresence mode="wait">
                          {/* Step 0-1: handleClick() running */}
                          {(activeStep === 0 || activeStep === 1) && (
                            <motion.div
                              key="handleClick"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="px-2 py-1 text-xs bg-cyber-cyan/20 rounded font-display"
                            >
                              handleClick()
                            </motion.div>
                          )}
                          {/* Step 5: Microtask executing */}
                          {activeStep === 5 && (
                            <motion.div
                              key="microtask"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="px-2 py-1 text-xs bg-cyber-orange/30 rounded font-display border border-cyber-orange/50"
                            >
                              promiseHandler()
                            </motion.div>
                          )}
                          {/* Step 7: Callback executing */}
                          {activeStep === 7 && (
                            <motion.div
                              key="callback"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="px-2 py-1 text-xs bg-cyber-pink/30 rounded font-display border border-cyber-pink/50"
                            >
                              timerCallback()
                            </motion.div>
                          )}
                        </AnimatePresence>
                        {![0, 1, 5, 7].includes(activeStep) && (
                          <div className="px-2 py-1 text-xs bg-white/5 rounded font-display text-white/50">
                            empty (idle)
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </div>
                  <div className="row-start-1 col-span-1 flex flex-col min-h-0 items-end">
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className={`h-full w-[clamp(16rem,24vw,20rem)] diagram-box p-[clamp(0.75rem,1vw,1rem)] transition-all overflow-y-auto ${activeStep === 1 ? 'glow-purple' : ''}`}
                    >
                      <h4 className="text-cyber-purple font-display font-semibold text-sm mb-3">🌐 Web APIs</h4>
                      <div className="space-y-1 text-xs font-display">
                        <div className={`px-2 py-1 rounded flex justify-between items-center ${activeStep === 1 ? 'bg-cyber-purple/40 border border-cyber-purple/60' : 'bg-cyber-purple/20'}`}>
                          <span>setTimeout(cb, 1000)</span>
                          {activeStep === 1 && (
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: [1, 0.5, 1] }}
                              transition={{ duration: 0.5, repeat: Infinity }}
                              className="text-cyber-purple"
                            >
                              ⏳
                            </motion.span>
                          )}
                        </div>
                        <div className="px-2 py-1 bg-cyber-purple/20 rounded text-white/50">fetch()</div>
                        <div className="px-2 py-1 bg-cyber-purple/20 rounded text-white/50">DOM events</div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Middle row - Event Loop (centered) */}
                  <div className="row-start-2 col-span-2 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: 'spring' }}
                      className={`w-[clamp(8rem,12vw,10rem)] h-[clamp(8rem,12vw,10rem)] z-10 flex-shrink-0 rounded-full ${[4, 6].includes(activeStep) ? 'glow-green' : ''}`}
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                        className={`w-full h-full rounded-full border-4 border-dashed flex items-center justify-center ${[4, 6].includes(activeStep) ? 'border-cyber-green' : 'border-cyber-green/50'}`}
                      >
                        <div className="w-[clamp(6rem,9vw,7rem)] h-[clamp(6rem,9vw,7rem)] rounded-full bg-gradient-to-br from-cyber-green/30 to-cyber-cyan/20 flex items-center justify-center flex-col">
                          <span className="text-cyber-green font-display font-bold text-[clamp(0.65rem,0.9vw,0.75rem)] text-center">EVENT<br/>LOOP</span>
                          {[4, 6].includes(activeStep) && (
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-[0.6rem] text-white/70 mt-1"
                            >
                              🔍 checking...
                            </motion.span>
                          )}
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Bottom row - Task Queue & Microtask Queue */}
                  <div className="row-start-3 col-span-1 flex flex-col min-h-0 items-start">
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className={`h-full w-[clamp(16rem,24vw,20rem)] diagram-box p-[clamp(0.75rem,1vw,1rem)] transition-all overflow-y-auto ${[2, 6].includes(activeStep) ? 'glow-pink' : ''}`}
                    >
                      <h4 className="text-cyber-pink font-display font-semibold text-sm mb-3">📋 Task Queue (Macrotasks)</h4>
                      <div className="space-y-1">
                        <AnimatePresence>
                          {/* Step 2-6: Callback waiting in queue */}
                          {activeStep >= 2 && activeStep <= 6 && (
                            <motion.div
                              key="timer-callback"
                              initial={{ x: 50, opacity: 0 }}
                              animate={{ 
                                x: 0, 
                                opacity: 1,
                                scale: activeStep === 6 ? [1, 1.05, 1] : 1
                              }}
                              exit={{ x: -50, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className={`px-2 py-1 text-xs rounded font-display ${activeStep === 6 ? 'bg-cyber-pink/40 border border-cyber-pink' : 'bg-cyber-pink/20'}`}
                            >
                              timerCallback() {activeStep >= 4 && activeStep <= 5 && <span className="text-white/50">⏸️ waiting...</span>}
                            </motion.div>
                          )}
                        </AnimatePresence>
                        {activeStep < 2 || activeStep > 6 ? (
                          <div className="px-2 py-1 text-xs bg-white/5 rounded font-display text-white/50">
                            empty
                          </div>
                        ) : null}
                      </div>
                    </motion.div>
                  </div>
                  <div className="row-start-3 col-span-1 flex flex-col min-h-0 items-end">
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className={`h-full w-[clamp(16rem,24vw,20rem)] diagram-box p-[clamp(0.75rem,1vw,1rem)] overflow-y-auto transition-all ${[3, 4].includes(activeStep) ? 'glow-orange' : ''}`}
                    >
                      <h4 className="text-cyber-orange font-display font-semibold text-sm mb-3">⚡ Microtask Queue</h4>
                      <div className="space-y-1 text-xs font-display">
                        <AnimatePresence>
                          {/* Step 3-4: Promise callback in microtask queue */}
                          {(activeStep === 3 || activeStep === 4) && (
                            <motion.div
                              key="promise-handler"
                              initial={{ x: 50, opacity: 0 }}
                              animate={{ 
                                x: 0, 
                                opacity: 1,
                                scale: activeStep === 4 ? [1, 1.1, 1] : 1
                              }}
                              exit={{ x: -50, opacity: 0 }}
                              className={`px-2 py-1 rounded ${activeStep === 4 ? 'bg-cyber-orange/40 border border-cyber-orange' : 'bg-cyber-orange/20'}`}
                            >
                              promiseHandler() {activeStep === 4 && <span>🚀</span>}
                            </motion.div>
                          )}
                        </AnimatePresence>
                        {activeStep < 3 || activeStep > 4 ? (
                          <div className="px-2 py-1 bg-white/5 rounded text-white/50">empty</div>
                        ) : null}
                      </div>
                      <p className={`text-xs mt-2 ${activeStep === 4 ? 'text-cyber-orange font-bold' : 'text-white/40'}`}>
                        ⚡ Higher priority than tasks!
                      </p>
                    </motion.div>
                  </div>
                </div>

                {/* Flow arrows - synced with activeStep */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#10b981" />
                    </marker>
                  </defs>
                  {/* Animated dot that follows the event loop flow */}
                  <AnimatePresence mode="wait">
                    {/* Step 1: Call Stack → Web APIs */}
                    {activeStep === 1 && (
                      <motion.circle
                        key="step1"
                        r="8"
                        fill="#a855f7"
                        initial={{ cx: '20%', cy: '20%', opacity: 0 }}
                        animate={{ cx: '80%', cy: '20%', opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: 'easeInOut' }}
                      />
                    )}
                    {/* Step 2: Web APIs → Task Queue */}
                    {activeStep === 2 && (
                      <motion.circle
                        key="step2"
                        r="8"
                        fill="#ec4899"
                        initial={{ cx: '80%', cy: '20%', opacity: 0 }}
                        animate={{ cx: '20%', cy: '80%', opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: 'easeInOut' }}
                      />
                    )}
                    {/* Step 3: Promise → Microtask Queue */}
                    {activeStep === 3 && (
                      <motion.circle
                        key="step3"
                        r="8"
                        fill="#f97316"
                        initial={{ cx: '50%', cy: '20%', opacity: 0 }}
                        animate={{ cx: '80%', cy: '80%', opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: 'easeInOut' }}
                      />
                    )}
                    {/* Step 4-5: Microtask Queue → Event Loop → Call Stack */}
                    {activeStep === 4 && (
                      <motion.circle
                        key="step4"
                        r="8"
                        fill="#f97316"
                        initial={{ cx: '80%', cy: '80%', opacity: 0 }}
                        animate={{ cx: '50%', cy: '50%', opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: 'easeInOut' }}
                      />
                    )}
                    {activeStep === 5 && (
                      <motion.circle
                        key="step5"
                        r="8"
                        fill="#f97316"
                        initial={{ cx: '50%', cy: '50%', opacity: 0 }}
                        animate={{ cx: '20%', cy: '20%', opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: 'easeInOut' }}
                      />
                    )}
                    {/* Step 6-7: Task Queue → Event Loop → Call Stack */}
                    {activeStep === 6 && (
                      <motion.circle
                        key="step6"
                        r="8"
                        fill="#ec4899"
                        initial={{ cx: '20%', cy: '80%', opacity: 0 }}
                        animate={{ cx: '50%', cy: '50%', opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: 'easeInOut' }}
                      />
                    )}
                    {activeStep === 7 && (
                      <motion.circle
                        key="step7"
                        r="8"
                        fill="#ec4899"
                        initial={{ cx: '50%', cy: '50%', opacity: 0 }}
                        animate={{ cx: '20%', cy: '20%', opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: 'easeInOut' }}
                      />
                    )}
                  </AnimatePresence>
                </svg>
              </div>
            </motion.div>

            {/* Current Step Explanation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-[clamp(0.5rem,1vw,1rem)] text-center flex-shrink-0"
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-white font-display text-base max-w-3xl mx-auto bg-white/5 px-4 py-2 rounded-lg"
                >
                  {STEPS[activeStep].description}
                </motion.p>
              </AnimatePresence>
              <p className="text-white/40 font-display text-xs mt-2">
                Microtasks (<span className="text-cyber-orange">Promise.then</span>) au prioritate față de Tasks (<span className="text-cyber-pink">setTimeout</span>)
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
