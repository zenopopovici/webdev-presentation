'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface SlideProps {
  contentVisible?: boolean
}

export default function MemeSlide4({ contentVisible = true }: SlideProps) {
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
            {/* Custom Git Commit Meme */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="diagram-box p-8 bg-gradient-to-br from-cyber-orange/20 to-cyber-pink/20"
            >
              <div className="text-6xl mb-6">📝</div>
              <div className="space-y-3 text-left font-mono text-[clamp(1rem,1.5vw,1.25rem)]">
                <div className="p-3 bg-white/5 rounded border-l-4 border-cyber-green">
                  <span className="text-cyber-green">Day 1:</span>
                  <span className="text-white/70 ml-2">"Initial commit with full documentation"</span>
                </div>
                <div className="p-3 bg-white/5 rounded border-l-4 border-cyber-cyan">
                  <span className="text-cyber-cyan">Day 3:</span>
                  <span className="text-white/70 ml-2">"Add user authentication"</span>
                </div>
                <div className="p-3 bg-white/5 rounded border-l-4 border-cyber-orange">
                  <span className="text-cyber-orange">Day 7:</span>
                  <span className="text-white/70 ml-2">"fix stuff"</span>
                </div>
                <div className="p-3 bg-white/5 rounded border-l-4 border-cyber-pink">
                  <span className="text-cyber-pink">Day 14:</span>
                  <span className="text-white/70 ml-2">"asdfgh"</span>
                </div>
                <div className="p-3 bg-white/5 rounded border-l-4 border-red-500">
                  <span className="text-red-400">Deadline:</span>
                  <span className="text-white/70 ml-2">"final final v2 FINAL (copy)"</span>
                </div>
              </div>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-white/50 text-[clamp(1.25rem,2vw,1.5rem)]"
            >
              Git commit messages be like... 📝
            </motion.p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
