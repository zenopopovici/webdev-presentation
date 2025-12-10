'use client'

import { motion } from 'framer-motion'

export default function RestApiSlide() {
  const methods = [
    { method: 'GET', color: 'text-cyber-green', bgColor: 'bg-cyber-green/20', desc: 'Citește date', example: 'GET /users' },
    { method: 'POST', color: 'text-cyber-cyan', bgColor: 'bg-cyber-cyan/20', desc: 'Creează date', example: 'POST /users' },
    { method: 'PUT', color: 'text-cyber-orange', bgColor: 'bg-cyber-orange/20', desc: 'Actualizează (complet)', example: 'PUT /users/1' },
    { method: 'PATCH', color: 'text-cyber-yellow', bgColor: 'bg-cyber-yellow/20', desc: 'Actualizează (parțial)', example: 'PATCH /users/1' },
    { method: 'DELETE', color: 'text-cyber-pink', bgColor: 'bg-cyber-pink/20', desc: 'Șterge date', example: 'DELETE /users/1' },
  ]

  return (
    <div className="w-full h-full flex flex-col p-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <span className="text-cyber-cyan font-display text-sm tracking-widest uppercase">Comunicare</span>
        <h1 className="text-5xl font-body font-bold mt-2">
          Cum funcționează <span className="text-cyber-cyan">REST API</span>
        </h1>
      </motion.div>

      <div className="flex-1 flex gap-12">
        {/* Client-Server Diagram */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex-1 flex flex-col items-center justify-center"
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
              <p className="text-white/50 text-xs mt-1">Aplicație React</p>
            </motion.div>

            {/* Arrows */}
            <div className="flex-1 mx-4 relative h-24">
              <svg className="w-full h-full" viewBox="0 0 200 80">
                {/* Request Arrow */}
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <line x1="10" y1="25" x2="180" y2="25" stroke="#06b6d4" strokeWidth="2" strokeDasharray="8 4" className="data-flow-line" />
                  <polygon points="185,25 175,20 175,30" fill="#06b6d4" />
                  <text x="95" y="18" textAnchor="middle" fill="#06b6d4" fontSize="10" fontFamily="monospace">CERERE</text>
                </motion.g>
                
                {/* Response Arrow */}
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <line x1="190" y1="55" x2="20" y2="55" stroke="#10b981" strokeWidth="2" strokeDasharray="8 4" className="data-flow-line" />
                  <polygon points="15,55 25,50 25,60" fill="#10b981" />
                  <text x="105" y="70" textAnchor="middle" fill="#10b981" fontSize="10" fontFamily="monospace">RĂSPUNS</text>
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
              <p className="text-white/50 text-xs mt-1">REST API</p>
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
              <pre className="text-sm">
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
          className="w-80"
        >
          <h3 className="text-lg font-body font-semibold mb-4 text-white/80">Metode HTTP</h3>
          <div className="space-y-3">
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
                  <p className="text-white/70 text-sm">{m.desc}</p>
                  <code className="text-xs text-white/40">{m.example}</code>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
