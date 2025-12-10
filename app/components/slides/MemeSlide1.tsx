'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface SlideProps {
  contentVisible?: boolean
}

export default function MemeSlide1({ contentVisible = true }: SlideProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 relative overflow-hidden bg-black">
      <AnimatePresence>
        {contentVisible ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            {/* Custom Docker Meme */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="diagram-box p-8 bg-gradient-to-br from-cyber-green/20 to-cyber-cyan/20"
            >
              <div className="text-6xl mb-6">🐳</div>
              <div className="space-y-4">
                <div className="p-4 bg-white/10 rounded-lg">
                  <p className="text-white/80 text-[clamp(1.25rem,2vw,1.5rem)] mb-2">Fără Docker:</p>
                  <p className="text-cyber-pink text-[clamp(1.5rem,2.5vw,2rem)] font-display">"Works on my machine!" 🤷‍♂️</p>
                  <p className="text-white/40 text-[clamp(1rem,1.5vw,1.25rem)] mt-2">Node 14 vs Node 18 conflicts</p>
                </div>
                <div className="text-center text-4xl">↓</div>
                <div className="p-4 bg-white/10 rounded-lg">
                  <p className="text-white/80 text-[clamp(1.25rem,2vw,1.5rem)] mb-2">Cu Docker:</p>
                  <p className="text-cyber-green text-[clamp(1.5rem,2.5vw,2rem)] font-display">"Works everywhere!" ✅</p>
                  <p className="text-white/40 text-[clamp(1rem,1.5vw,1.25rem)] mt-2">Same environment, every time</p>
                </div>
              </div>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-white/50 text-[clamp(1.25rem,2vw,1.5rem)]"
            >
              De aceea avem nevoie de <span className="text-cyber-green font-bold">Docker</span> 🐳
            </motion.p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
