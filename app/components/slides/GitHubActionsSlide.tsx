'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface SlideProps {
  contentVisible?: boolean
}

export default function GitHubActionsSlide({ contentVisible = true }: SlideProps) {
  return (
    <div className="w-full h-full flex flex-col p-[clamp(0.75rem,1.5vw,1.5rem)] overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-[clamp(0.25rem,0.75vw,0.75rem)] flex-shrink-0"
      >
        <span className="text-cyber-purple font-display text-[clamp(0.75rem,1vw,0.875rem)] tracking-widest uppercase">CI/CD</span>
        <h1 className="text-[clamp(2rem,4vw,3rem)] font-body font-bold mt-1">
          <span className="text-cyber-purple">GitHub Actions</span> 🔄
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
            {/* Workflow diagram */}
            <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex-1 min-w-0 flex items-center justify-center overflow-y-auto"
        >
          <div className="relative w-full max-w-2xl flex flex-col items-center">
            {/* Trigger */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="diagram-box p-[clamp(0.75rem,1vw,1rem)] w-full max-w-[14rem] text-center"
            >
              <span className="text-2xl block mb-2">🎯</span>
              <h4 className="text-cyber-cyan font-display font-semibold text-sm">Declanșator</h4>
              <p className="text-white/50 text-xs">push, pull_request, schedule</p>
            </motion.div>

            {/* Connection line to Workflow */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.5 }}
              className="w-1 h-[clamp(1.5rem,3vw,2.5rem)] bg-gradient-to-b from-cyber-cyan/50 to-cyber-purple/50 my-[clamp(0.5rem,1vw,1rem)]"
            />

            {/* Workflow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="diagram-box p-[clamp(0.75rem,1.5vw,1.5rem)] glow-purple w-full"
            >
              <h4 className="text-cyber-purple font-display font-semibold text-center mb-[clamp(0.5rem,1vw,1rem)]">Workflow</h4>
              
              {/* Jobs */}
              <div className="flex gap-[clamp(0.5rem,1vw,1rem)]">
                {['Build', 'Test', 'Deploy'].map((job, i) => (
                  <motion.div
                    key={job}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.15 }}
                    className="flex-1"
                  >
                    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                      <h5 className="text-white font-display text-xs font-semibold mb-2 text-center">
                        Job: {job}
                      </h5>
                      <div className="space-y-1">
                        {['Pas 1', 'Pas 2', 'Pas 3'].map((step, j) => (
                          <motion.div
                            key={step}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 + i * 0.1 + j * 0.05 }}
                            className="text-[10px] font-display bg-cyber-purple/10 px-2 py-1 rounded text-center text-white/60"
                          >
                            {step}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    {i < 2 && (
                      <div className="text-center text-cyber-green mt-2">→</div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Connection line to Deployed */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 1.2 }}
              className="w-1 h-[clamp(1.5rem,3vw,2.5rem)] bg-gradient-to-b from-cyber-purple/50 to-cyber-green/50 my-[clamp(0.5rem,1vw,1rem)]"
            />

            {/* Result */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              className="diagram-box p-[clamp(0.75rem,1vw,1rem)] w-full max-w-[14rem] glow-green text-center"
            >
              <span className="text-2xl block mb-2">✅</span>
              <h4 className="text-cyber-green font-display font-semibold text-sm">Deployed</h4>
            </motion.div>
          </div>
        </motion.div>

        {/* Key concepts */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="w-[clamp(18rem,25vw,20rem)] flex-shrink-0 flex flex-col overflow-y-auto"
        >
          <h3 className="text-[clamp(1.125rem,1.5vw,1.25rem)] font-body font-semibold mb-[clamp(0.5rem,1vw,1rem)] text-white/80 flex-shrink-0">Concepte Cheie</h3>
          <div className="space-y-[clamp(0.5rem,0.75vw,0.75rem)] flex-1">
            {[
              { term: 'Workflow', desc: 'Proces automat definit în YAML', icon: '📋' },
              { term: 'Job', desc: 'Set de pași rulând pe același runner', icon: '🔧' },
              { term: 'Step', desc: 'Task individual (acțiune sau script)', icon: '📍' },
              { term: 'Runner', desc: 'VM care execută job-urile', icon: '🖥️' },
              { term: 'Action', desc: 'Unitate reutilizabilă (din Marketplace)', icon: '🧩' },
              { term: 'Secret', desc: 'Variabile de mediu criptate', icon: '🔐' },
            ].map((item, i) => (
              <motion.div
                key={item.term}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="diagram-box p-3 flex items-center gap-3"
              >
                <span className="text-xl">{item.icon}</span>
                <div>
                  <div className="text-white font-medium text-sm">{item.term}</div>
                  <div className="text-white/50 text-xs">{item.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* File location hint */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="mt-[clamp(0.75rem,1vw,1rem)] diagram-box p-[clamp(0.75rem,1vw,1rem)] flex-shrink-0"
          >
            <h4 className="text-sm font-body font-semibold text-cyber-orange mb-2">📁 Locația Fișierului</h4>
            <code className="text-xs font-display text-white/60 bg-black/30 px-2 py-1 rounded block">
              .github/workflows/*.yml
            </code>
          </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
