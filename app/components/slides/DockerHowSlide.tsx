'use client'

import { motion } from 'framer-motion'

export default function DockerHowSlide() {
  return (
    <div className="w-full h-full flex flex-col p-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <span className="text-cyber-purple font-display text-sm tracking-widest uppercase">Arhitectură</span>
        <h1 className="text-4xl font-body font-bold mt-2">
          Cum funcționează <span className="text-cyber-purple">Docker</span>
        </h1>
      </motion.div>

      <div className="flex-1 flex flex-col">
        {/* Docker workflow diagram */}
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-8 w-full max-w-5xl">
            {/* Dockerfile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="diagram-box p-6 w-44 text-center"
            >
              <span className="text-4xl block mb-3">📄</span>
              <h4 className="text-cyber-cyan font-display font-semibold text-sm">Dockerfile</h4>
              <p className="text-white/50 text-xs mt-1">Instrucțiuni de build</p>
            </motion.div>

            {/* Arrow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-center"
            >
              <span className="text-white/30 text-xs font-display mb-1">docker build</span>
              <span className="text-cyber-purple text-2xl">→</span>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="diagram-box p-6 w-44 text-center glow-purple"
            >
              <span className="text-4xl block mb-3">📀</span>
              <h4 className="text-cyber-purple font-display font-semibold text-sm">Imagine</h4>
              <p className="text-white/50 text-xs mt-1">Șablon imutabil</p>
            </motion.div>

            {/* Arrow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col items-center"
            >
              <span className="text-white/30 text-xs font-display mb-1">docker run</span>
              <span className="text-cyber-green text-2xl">→</span>
            </motion.div>

            {/* Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="diagram-box p-6 w-44 text-center glow-green"
            >
              <span className="text-4xl block mb-3">📦</span>
              <h4 className="text-cyber-green font-display font-semibold text-sm">Container</h4>
              <p className="text-white/50 text-xs mt-1">Instanță rulând</p>
            </motion.div>

            {/* Arrow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col items-center"
            >
              <span className="text-white/30 text-xs font-display mb-1">docker push</span>
              <span className="text-cyber-cyan text-2xl">↔</span>
            </motion.div>

            {/* Registry */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 }}
              className="diagram-box p-6 w-44 text-center"
            >
              <span className="text-4xl block mb-3">☁️</span>
              <h4 className="text-cyber-orange font-display font-semibold text-sm">Registry</h4>
              <p className="text-white/50 text-xs mt-1">Docker Hub / GHCR</p>
            </motion.div>
          </div>
        </div>

        {/* Key concepts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="grid grid-cols-4 gap-4 mt-8"
        >
          {[
            { term: 'Layer', desc: 'Fiecare instrucțiune creează un layer cacheable' },
            { term: 'Volume', desc: 'Persistă datele în afara ciclului de viață' },
            { term: 'Rețea', desc: 'Containerele comunică prin rețele virtuale' },
            { term: 'Compose', desc: 'Orchestrare multi-container (docker-compose)' },
          ].map((item, i) => (
            <motion.div
              key={item.term}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + i * 0.1 }}
              className="diagram-box p-4"
            >
              <h4 className="text-cyber-cyan font-display font-semibold text-sm mb-1">{item.term}</h4>
              <p className="text-white/50 text-xs">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
