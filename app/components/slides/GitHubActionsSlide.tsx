'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface SlideProps {
  contentVisible?: boolean
}

export default function GitHubActionsSlide({ contentVisible = true }: SlideProps) {
  return (
    <div className="w-full h-full flex flex-col p-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <span className="text-cyber-purple font-display text-sm tracking-widest uppercase">CI/CD</span>
        <h1 className="text-5xl font-body font-bold mt-2">
          <span className="text-cyber-purple">GitHub Actions</span> 🔄
        </h1>
      </motion.div>

      <AnimatePresence>
        {contentVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex-1 flex gap-12"
          >
            {/* Workflow diagram */}
            <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex-1 flex items-center justify-center"
        >
          <div className="relative">
            {/* Trigger */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="diagram-box p-4 w-48 text-center mb-4"
            >
              <span className="text-2xl block mb-2">🎯</span>
              <h4 className="text-cyber-cyan font-display font-semibold text-sm">Declanșator</h4>
              <p className="text-white/50 text-xs">push, pull_request, schedule</p>
            </motion.div>

            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.5 }}
              className="w-0.5 h-8 bg-cyber-purple/50 mx-auto"
            />

            {/* Workflow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="diagram-box p-6 glow-purple"
            >
              <h4 className="text-cyber-purple font-display font-semibold text-center mb-4">Workflow</h4>
              
              {/* Jobs */}
              <div className="flex gap-4">
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

            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 1.2 }}
              className="w-0.5 h-8 bg-cyber-green/50 mx-auto"
            />

            {/* Result */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              className="diagram-box p-4 w-48 text-center mx-auto glow-green"
            >
              <span className="text-2xl block mb-2">✅</span>
              <h4 className="text-cyber-green font-display font-semibold text-sm">Deployat!</h4>
            </motion.div>
          </div>
        </motion.div>

        {/* Key concepts */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="w-80"
        >
          <h3 className="text-lg font-body font-semibold mb-4 text-white/80">Concepte Cheie</h3>
          <div className="space-y-3">
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
            className="mt-6 diagram-box p-4"
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
