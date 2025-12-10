'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function TitleSlide() {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 })

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight })
  }, [])

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-16">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-cyber-purple/30"
            initial={{
              x: Math.random() * dimensions.width,
              y: Math.random() * dimensions.height,
            }}
            animate={{
              y: [null, Math.random() * -200],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center relative z-10"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="text-6xl">🚀</span>
        </motion.div>

        <h1 className="text-7xl font-body font-bold mb-6 bg-gradient-to-r from-cyber-purple via-cyber-pink to-cyber-cyan bg-clip-text text-transparent">
          Dezvoltare Web
        </h1>
        <h2 className="text-5xl font-body font-light text-white/90 mb-8">
          În Profunzime
        </h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-4 mt-12"
        >
          {['Browser', 'JavaScript', 'REST API', 'Docker', 'GitHub Actions'].map((topic, i) => (
            <motion.span
              key={topic}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              className="px-6 py-3 rounded-full border border-cyber-purple/50 text-cyber-purple font-display text-lg"
            >
              {topic}
            </motion.span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 text-white/50 font-display text-sm"
        >
          Apasă <span className="text-cyber-cyan">→</span> sau <span className="text-cyber-cyan">Space</span> pentru a continua
        </motion.p>
      </motion.div>
    </div>
  )
}
