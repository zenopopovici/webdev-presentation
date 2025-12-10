'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface SlideProps {
  contentVisible?: boolean
}

export default function RestApiSlide({ contentVisible = true }: SlideProps) {
  const methods = [
    { method: 'GET', color: 'text-cyber-green', bgColor: 'bg-cyber-green/20', desc: 'Citește date', example: 'GET /users' },
    { method: 'POST', color: 'text-cyber-cyan', bgColor: 'bg-cyber-cyan/20', desc: 'Creează date', example: 'POST /users' },
    { method: 'PUT', color: 'text-cyber-orange', bgColor: 'bg-cyber-orange/20', desc: 'Actualizează (complet)', example: 'PUT /users/1' },
    { method: 'PATCH', color: 'text-cyber-yellow', bgColor: 'bg-cyber-yellow/20', desc: 'Actualizează (parțial)', example: 'PATCH /users/1' },
    { method: 'DELETE', color: 'text-cyber-pink', bgColor: 'bg-cyber-pink/20', desc: 'Șterge date', example: 'DELETE /users/1' },
  ]

  return (
    <div className="w-full h-full flex flex-col p-[clamp(1rem,2vw,2rem)] overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-[clamp(0.5rem,1vw,1rem)] flex-shrink-0"
      >
        <span className="text-cyber-cyan font-display text-[clamp(0.75rem,1vw,0.875rem)] tracking-widest uppercase">Comunicare</span>
        <h1 className="text-[clamp(2rem,4vw,3rem)] font-body font-bold mt-1">
          Cum funcționează <span className="text-cyber-cyan">REST API</span>
        </h1>
      </motion.div>

      <AnimatePresence>
        {contentVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex-1 flex gap-[clamp(1rem,2vw,3rem)] min-h-0 overflow-hidden"
          >
            {/* Client-Server Diagram */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex-1 min-w-0 flex flex-col items-center justify-center overflow-y-auto"
            >
              <div className="relative w-full flex items-center justify-between px-8">
                {/* Client */}
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: 'spring' }}
                  className="diagram-box p-6 w-40 text-center"
                >
                  <span className="text-4xl block mb-2">💻</span>
                  <h4 className="text-cyber-purple font-body font-semibold">Client</h4>
                  <p className="text-white/50 text-[clamp(0.875rem,1.2vw,1rem)] mt-1">Aplicație React</p>
                </motion.div>

                {/* Arrows */}
                <div className="flex-1 mx-[clamp(1rem,3vw,2rem)] relative h-24 min-w-[200px]">
                  <svg className="w-full h-full" viewBox="0 0 400 80" preserveAspectRatio="none">
                    {/* Request Arrow */}
                    <motion.g
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <line x1="10" y1="25" x2="380" y2="25" stroke="#06b6d4" strokeWidth="2" strokeDasharray="8 4" className="data-flow-line" />
                      <polygon points="385,25 375,20 375,30" fill="#06b6d4" />
                      <text x="195" y="18" textAnchor="middle" fill="#06b6d4" fontSize="10" fontFamily="monospace">CERERE</text>
                    </motion.g>
                    
                    {/* Response Arrow */}
                    <motion.g
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      <line x1="390" y1="55" x2="20" y2="55" stroke="#10b981" strokeWidth="2" strokeDasharray="8 4" className="data-flow-line" />
                      <polygon points="15,55 25,50 25,60" fill="#10b981" />
                      <text x="205" y="70" textAnchor="middle" fill="#10b981" fontSize="10" fontFamily="monospace">RĂSPUNS</text>
                    </motion.g>
                  </svg>
                </div>

                {/* Server */}
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                  className="diagram-box p-6 w-40 text-center"
                >
                  <span className="text-4xl block mb-2">🖥️</span>
                  <h4 className="text-cyber-green font-body font-semibold">Server</h4>
                  <p className="text-white/50 text-[clamp(0.875rem,1.2vw,1rem)] mt-1">REST API</p>
                </motion.div>
              </div>

              {/* JSON Example */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="mt-8 w-full max-w-md"
              >
                <div className="code-block p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    <span className="text-white/30 text-xs ml-2">răspuns.json</span>
                  </div>
                  <pre className="text-[clamp(0.875rem,1.3vw,1rem)]">
                    <code>
                      <span className="text-white/50">{'{'}</span>{'\n'}
                      <span className="text-cyber-purple">  &quot;status&quot;</span>: <span className="text-cyber-green">200</span>,{'\n'}
                      <span className="text-cyber-purple">  &quot;date&quot;</span>: {'{'}{'\n'}
                      <span className="text-cyber-purple">    &quot;id&quot;</span>: <span className="text-cyber-green">1</span>,{'\n'}
                      <span className="text-cyber-purple">    &quot;nume&quot;</span>: <span className="text-cyber-orange">&quot;Ion Popescu&quot;</span>{'\n'}
                      {'  }'}{'\n'}
                      <span className="text-white/50">{'}'}</span>
                    </code>
                  </pre>
                </div>
              </motion.div>
            </motion.div>

            {/* HTTP Methods */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="w-[clamp(18rem,25vw,20rem)] flex-shrink-0 flex flex-col overflow-y-auto"
            >
              <h3 className="text-[clamp(1.125rem,1.5vw,1.25rem)] font-body font-semibold mb-[clamp(0.5rem,1vw,1rem)] text-white/80 flex-shrink-0">Metode HTTP</h3>
              <div className="space-y-[clamp(0.5rem,0.75vw,0.75rem)]">
                {methods.map((m, i) => (
                  <motion.div
                    key={m.method}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="diagram-box p-3 flex items-center gap-3"
                  >
                    <span className={`px-3 py-1 rounded font-display font-bold text-sm ${m.bgColor} ${m.color}`}>
                      {m.method}
                    </span>
                    <div className="flex-1">
                      <p className="text-white/70 text-[clamp(1rem,1.5vw,1.25rem)]">{m.desc}</p>
                      <code className="text-[clamp(0.875rem,1.2vw,1rem)] text-white/40">{m.example}</code>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
