'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface SlideProps {
  contentVisible?: boolean
}

export default function MemeSlide2({ contentVisible = true }: SlideProps) {
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
            {/* Custom REST API Meme */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="diagram-box p-8 bg-gradient-to-br from-cyber-purple/20 to-cyber-cyan/20"
            >
              <div className="text-6xl mb-6">😅</div>
              <div className="space-y-4 text-left">
                <div className="p-4 bg-white/10 rounded-lg">
                  <p className="text-white/80 text-[clamp(1.25rem,2vw,1.5rem)] mb-2">Developer:</p>
                  <p className="text-cyber-green text-[clamp(1.5rem,2.5vw,2rem)] font-display">"API-ul returnează JSON perfect!"</p>
                </div>
                <div className="text-center text-4xl">↓</div>
                <div className="p-4 bg-white/10 rounded-lg">
                  <p className="text-white/80 text-[clamp(1.25rem,2vw,1.5rem)] mb-2">Reality:</p>
                    <code className="text-cyber-pink text-[clamp(1rem,1.5vw,1.25rem)] font-mono block">
                      {`{ "error": "undefined", "data": null }`}
                    </code>
                </div>
              </div>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-white/50 text-[clamp(1.25rem,2vw,1.5rem)]"
            >
              Perfect moment pentru un demo live! 🎮
            </motion.p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
