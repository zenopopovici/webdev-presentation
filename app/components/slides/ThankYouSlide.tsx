'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface SlideProps {
  contentVisible?: boolean
}

export default function ThankYouSlide({ contentVisible = true }: SlideProps) {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 })

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight })
  }, [])

  const topics = [
    { icon: '🌐', name: 'Browser', color: 'text-cyber-purple' },
    { icon: '⚡', name: 'JavaScript', color: 'text-cyber-orange' },
    { icon: '🔄', name: 'REST API', color: 'text-cyber-cyan' },
    { icon: '🐳', name: 'Docker', color: 'text-cyber-green' },
    { icon: '🚀', name: 'GitHub Actions', color: 'text-cyber-pink' },
  ]

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-[clamp(1rem,3vw,4rem)]">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: ['#a855f7', '#ec4899', '#06b6d4', '#10b981', '#f97316'][i % 5],
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: (i % 5) * 0.4,
            }}
          />
        ))}
      </div>

      <AnimatePresence>
        {contentVisible ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center relative z-10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="text-8xl mb-8"
            >
              🎉
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-6xl font-body font-bold mb-4 bg-gradient-to-r from-cyber-purple via-cyber-pink to-cyber-cyan bg-clip-text text-transparent"
            >
              Mulțumesc!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-[clamp(1rem,2vw,1.25rem)] text-white/60 mb-[clamp(2rem,3vw,3rem)]"
            >
              Ați învățat fundamentele despre
            </motion.p>

              {/* Topics recap */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.6 }}
                className="flex justify-center gap-6 mb-12"
              >
                {topics.map((topic, i) => (
                  <motion.div
                    key={topic.name}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.1, type: 'spring' }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="diagram-box p-4 text-center cursor-default"
                  >
                    <span className="text-2xl block mb-2">{topic.icon}</span>
                    <span className={`${topic.color} font-display text-[clamp(0.75rem,1.2vw,0.875rem)] font-semibold`}>
                      {topic.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Contact & QR Code */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 1.5 }}
                className="mt-12 flex items-center justify-center gap-12"
              >
                {/* QR Code */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.7, type: 'spring' }}
                  className="diagram-box p-4"
                >
                  <div className="bg-white p-3 rounded-lg inline-block">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent('https://github.com/zenopopovici/webdev-presentation')}`}
                      alt="QR Code to GitHub repository"
                      className="w-40 h-40"
                    />
                  </div>
                  <p className="text-xs text-center text-white/60 mt-3 font-display">
                    Scan pentru cod complet
                  </p>
                </motion.div>

                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.8 }}
                  className="diagram-box p-6"
                >
                  <h3 className="text-[clamp(1rem,1.5vw,1.125rem)] font-body font-semibold text-cyber-cyan mb-[clamp(0.5rem,1vw,1rem)]">
                    📧 Contact
                  </h3>
                  <div className="space-y-3 text-[clamp(0.75rem,1vw,0.875rem)]">
                    <div className="flex items-center gap-3">
                      <span className="text-[clamp(1.25rem,2.5vw,2rem)]">📧</span>
                      <a
                        href="mailto:zeno@graffino.com"
                        className="text-cyber-green hover:text-cyber-cyan transition-colors font-display"
                      >
                        zeno@graffino.com
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[clamp(1.25rem,2.5vw,2rem)]">🔗</span>
                      <a
                        href="https://github.com/zenopopovici/webdev-presentation"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyber-purple hover:text-cyber-pink transition-colors font-display"
                      >
                        github.com/zenopopovici/webdev-presentation
                      </a>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="mt-[clamp(1rem,2vw,2rem)] text-white/30 font-display text-[clamp(0.75rem,1vw,0.875rem)]"
            >
              Întrebări? 🙋‍♂️
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center relative z-10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="text-8xl mb-8"
            >
              🎉
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-6xl font-body font-bold mb-4 bg-gradient-to-r from-cyber-purple via-cyber-pink to-cyber-cyan bg-clip-text text-transparent"
            >
              Mulțumesc!
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
