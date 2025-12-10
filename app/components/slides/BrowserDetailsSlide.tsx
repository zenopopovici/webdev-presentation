'use client'

import { motion } from 'framer-motion'

export default function BrowserDetailsSlide() {
  const steps = [
    { step: '1', title: 'Căutare DNS', desc: 'Rezolvă domeniul în adresă IP', icon: '🔍' },
    { step: '2', title: 'Conexiune TCP', desc: 'Stabilește conexiunea securizată', icon: '🤝' },
    { step: '3', title: 'Cerere HTTP', desc: 'Trimite cererea GET/POST', icon: '📤' },
    { step: '4', title: 'Răspuns Server', desc: 'Primește HTML, CSS, JS', icon: '📥' },
    { step: '5', title: 'Parsare', desc: 'Arborele DOM + CSSOM', icon: '🏗️' },
    { step: '6', title: 'Randare', desc: 'Layout → Paint → Composite', icon: '🎨' },
  ]

  return (
    <div className="w-full h-full flex flex-col p-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <span className="text-cyber-cyan font-display text-sm tracking-widest uppercase">Călătoria</span>
        <h1 className="text-5xl font-body font-bold mt-2">
          De la <span className="text-cyber-cyan">URL</span> la <span className="text-cyber-pink">Pixeli</span>
        </h1>
      </motion.div>

      <div className="flex-1 flex items-center">
        <div className="w-full">
          {/* Flow diagram */}
          <div className="relative flex items-center justify-between px-8">
            {/* Animated connection line */}
            <svg className="absolute top-1/2 left-0 right-0 h-2 -translate-y-1/2 z-0" preserveAspectRatio="none">
              <motion.line
                x1="5%"
                y1="50%"
                x2="95%"
                y2="50%"
                stroke="url(#flowGradient)"
                strokeWidth="2"
                strokeDasharray="8 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.5 }}
                className="data-flow-line"
              />
              <defs>
                <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="50%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>

            {steps.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.15 }}
                className="relative z-10 flex flex-col items-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyber-purple/20 to-cyber-cyan/20 border border-white/20 flex items-center justify-center text-3xl mb-4 backdrop-blur-sm"
                >
                  {item.icon}
                </motion.div>
                <div className="text-center">
                  <span className="text-cyber-purple font-display text-xs block mb-1">
                    PASUL {item.step}
                  </span>
                  <h3 className="text-white font-body font-semibold text-sm mb-1">
                    {item.title}
                  </h3>
                  <p className="text-white/50 text-xs font-display max-w-24">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Render Pipeline Detail */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="mt-16 mx-auto max-w-4xl"
          >
            <div className="diagram-box p-6">
              <h3 className="text-lg font-body font-semibold text-cyber-pink mb-4">
                🎨 Calea Critică de Randare
              </h3>
              <div className="flex items-center justify-between gap-4">
                {['HTML → DOM', 'CSS → CSSOM', 'DOM + CSSOM → Arbore Randare', 'Layout', 'Paint', 'Composite'].map((step, i) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8 + i * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-xs font-display text-white/70 px-3 py-2 bg-white/5 rounded-lg">
                      {step}
                    </span>
                    {i < 5 && <span className="text-cyber-cyan">→</span>}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
