'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface SlideProps {
  contentVisible?: boolean
}

export default function TitleSlide({ contentVisible = true }: SlideProps) {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 })

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight })
  }, [])

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-[clamp(1rem,3vw,4rem)]">
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

      {/* All content loads at once - no contentVisible conditional */}
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
          className="mb-[clamp(1rem,2vw,2rem)]"
        >
          <span className="text-[clamp(3rem,6vw,6rem)]">💡</span>
        </motion.div>

        <h1 className="text-[clamp(3rem,8vw,7rem)] font-body font-bold mb-[clamp(1rem,1.5vw,1.5rem)] bg-gradient-to-r from-cyber-purple via-cyber-pink to-cyber-cyan bg-clip-text text-transparent">
          Web Development
        </h1>
        <h2 className="text-[clamp(2rem,5vw,5rem)] font-body font-light text-white/90 mb-[clamp(1rem,2vw,2rem)]">
          Tips & Tricks
        </h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-[clamp(0.5rem,1vw,1rem)] mt-[clamp(2rem,3vw,3rem)]"
        >
          {['Browser', 'JavaScript', 'REST API', 'Docker', 'GitHub Actions'].map((topic, i) => (
            <motion.span
              key={topic}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              className="px-[clamp(1rem,2vw,1.5rem)] py-[clamp(0.5rem,1vw,0.75rem)] rounded-full border border-cyber-purple/50 text-cyber-purple font-display text-[clamp(0.875rem,1.5vw,1.125rem)]"
            >
              {topic}
            </motion.span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-[clamp(2rem,4vw,4rem)] text-white/50 font-display text-[clamp(0.75rem,1vw,0.875rem)]"
        >
          Apasă <span className="text-cyber-cyan">→</span> sau <span className="text-cyber-cyan">Space</span> pentru a continua
        </motion.p>

        {/* Keyboard hints */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-[clamp(1.5rem,3vw,3rem)] text-[clamp(0.7rem,0.9vw,0.8rem)] text-white/30 font-display"
        >
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <span className="px-2 py-1 bg-white/5 rounded">← →</span>
            <span className="text-white/20">navigare</span>
            <span className="text-white/10">|</span>
            <span className="px-2 py-1 bg-white/5 rounded">G</span>
            <span className="text-white/20">go to slide</span>
            <span className="text-white/10">|</span>
            <span className="px-2 py-1 bg-cyber-green/20 rounded text-cyber-green">P</span>
            <span className="text-cyber-green/50">presenter mode</span>
            <span className="text-white/10">|</span>
            <span className="px-2 py-1 bg-white/5 rounded">Space</span>
            <span className="text-white/20">arată conținut</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
