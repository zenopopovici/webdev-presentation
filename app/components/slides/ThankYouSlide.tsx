'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function ThankYouSlide() {
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
    <div className="w-full h-full flex flex-col items-center justify-center p-16">
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

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
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
          className="text-xl text-white/60 mb-12"
        >
          Ați învățat fundamentele despre
        </motion.p>

        {/* Topics recap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
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
              <span className={`${topic.color} font-display text-sm font-semibold`}>
                {topic.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Next steps */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="diagram-box p-6 max-w-lg mx-auto"
        >
          <h3 className="text-lg font-body font-semibold text-cyber-cyan mb-4">
            📚 Ce urmează?
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <span className="text-cyber-green">▸</span>
              <span>Construiește o aplicație full-stack</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-cyber-green">▸</span>
              <span>Deploy cu Docker</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-cyber-green">▸</span>
              <span>Configurează pipeline CI/CD</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-cyber-green">▸</span>
              <span>Practică, practică, practică!</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-12 text-white/30 font-display text-sm"
        >
          Întrebări? 🙋‍♂️
        </motion.div>
      </motion.div>
    </div>
  )
}
