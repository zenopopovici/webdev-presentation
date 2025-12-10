'use client'

import { motion } from 'framer-motion'

export default function BrowserSlide() {
  const components = [
    { name: 'Interfața Utilizator', color: 'text-cyber-purple', bgColor: 'bg-cyber-purple/20', icon: '🖥️', desc: 'Bara de adrese, butoane, marcaje' },
    { name: 'Motor Browser', color: 'text-cyber-pink', bgColor: 'bg-cyber-pink/20', icon: '⚙️', desc: 'Coordonează acțiunile între UI și randare' },
    { name: 'Motor de Randare', color: 'text-cyber-cyan', bgColor: 'bg-cyber-cyan/20', icon: '🎨', desc: 'Parsează HTML/CSS, desenează conținutul' },
    { name: 'Rețea', color: 'text-cyber-green', bgColor: 'bg-cyber-green/20', icon: '🌐', desc: 'Cereri HTTP, cache' },
    { name: 'Motor JavaScript', color: 'text-cyber-orange', bgColor: 'bg-cyber-orange/20', icon: '⚡', desc: 'V8, SpiderMonkey, JavaScriptCore' },
    { name: 'Stocare Date', color: 'text-cyber-yellow', bgColor: 'bg-cyber-yellow/20', icon: '💾', desc: 'localStorage, IndexedDB, cookies' },
  ]

  return (
    <div className="w-full h-full flex flex-col p-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <span className="text-cyber-purple font-display text-sm tracking-widest uppercase">Înțelegere</span>
        <h1 className="text-5xl font-body font-bold mt-2">
          Cum funcționează <span className="text-glow-purple text-cyber-purple">Browser-ul</span>
        </h1>
      </motion.div>

      <div className="flex-1 flex items-center justify-center">
        <div className="grid grid-cols-3 gap-6 max-w-6xl">
          {components.map((comp, i) => (
            <motion.div
              key={comp.name}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="diagram-box p-6 hover:scale-105 transition-transform cursor-default"
            >
              <div className="flex items-center gap-4 mb-3">
                <span className="text-3xl">{comp.icon}</span>
                <h3 className={`text-xl font-body font-semibold ${comp.color}`}>
                  {comp.name}
                </h3>
              </div>
              <p className="text-white/60 text-sm font-display">
                {comp.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Connection lines SVG */}
      <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.5" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
