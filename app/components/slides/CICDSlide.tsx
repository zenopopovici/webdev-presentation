'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface SlideProps {
  contentVisible?: boolean
}

export default function CICDSlide({ contentVisible = true }: SlideProps) {
  return (
    <div className="w-full h-full flex flex-col p-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <span className="text-cyber-purple font-display text-sm tracking-widest uppercase">Automatizare</span>
        <h1 className="text-5xl font-body font-bold mt-2">
          Ce este <span className="text-cyber-purple">CI/CD</span>? 🔄
        </h1>
      </motion.div>

      <AnimatePresence>
        {contentVisible && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="flex-1 flex gap-12"
            >
              {/* Left: CI */}
              <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex-1"
        >
          <div className="diagram-box p-8 h-full">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl">🔄</span>
              <div>
                <h3 className="text-2xl font-body font-bold text-cyber-cyan">
                  Continuous Integration
                </h3>
                <p className="text-white/50 text-sm">CI</p>
              </div>
            </div>

            <p className="text-white/70 text-sm mb-6 leading-relaxed">
              Integrarea continuă a codului în repository-ul principal, 
              cu <span className="text-cyber-cyan font-semibold">build</span> și <span className="text-cyber-cyan font-semibold">teste automate</span> la fiecare push.
            </p>

            <div className="space-y-3">
              {[
                { icon: '👨‍💻', text: 'Developer face push la cod' },
                { icon: '🔨', text: 'Build automat al aplicației' },
                { icon: '🧪', text: 'Rulare teste automate' },
                { icon: '✅', text: 'Feedback rapid (pass/fail)' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-3 p-3 bg-cyber-cyan/10 rounded-lg border border-cyber-cyan/20"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-white/80 text-sm">{item.text}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-6 p-3 bg-cyber-cyan/5 rounded-lg border border-cyber-cyan/10"
            >
              <p className="text-cyber-cyan text-xs font-display">
                💡 Detectează probleme devreme, când sunt ușor de reparat
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Right: CD */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="flex-1"
        >
          <div className="diagram-box p-8 h-full">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl">🚀</span>
              <div>
                <h3 className="text-2xl font-body font-bold text-cyber-green">
                  Continuous Delivery / Deployment
                </h3>
                <p className="text-white/50 text-sm">CD</p>
              </div>
            </div>

            <p className="text-white/70 text-sm mb-6 leading-relaxed">
              Livrarea continuă a codului în <span className="text-cyber-green font-semibold">producție</span>, 
              automat sau cu un singur click, după ce testele trec.
            </p>

            <div className="space-y-3">
              {[
                { icon: '✅', text: 'Testele CI trec cu succes' },
                { icon: '📦', text: 'Build artifact / Docker image' },
                { icon: '🎯', text: 'Deploy la staging / production' },
                { icon: '🌍', text: 'Aplicația live pentru users' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="flex items-center gap-3 p-3 bg-cyber-green/10 rounded-lg border border-cyber-green/20"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-white/80 text-sm">{item.text}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="mt-6 p-3 bg-cyber-green/5 rounded-lg border border-cyber-green/10"
            >
              <p className="text-cyber-green text-xs font-display">
                💡 Release frecvent = risc mai mic per release
              </p>
            </motion.div>
          </div>
            </motion.div>
          </motion.div>

          {/* Bottom: Pipeline visualization */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-8"
          >
            <div className="diagram-box p-6">
              <h4 className="text-sm font-display text-white/50 mb-4 text-center">CI/CD Pipeline</h4>
              <div className="flex items-center justify-center gap-2">
                {[
                  { label: 'Push', color: 'cyber-purple', icon: '📤' },
                  { label: 'Build', color: 'cyber-cyan', icon: '🔨' },
                  { label: 'Test', color: 'cyber-cyan', icon: '🧪' },
                  { label: 'Package', color: 'cyber-orange', icon: '📦' },
                  { label: 'Deploy', color: 'cyber-green', icon: '🚀' },
                  { label: 'Monitor', color: 'cyber-pink', icon: '📊' },
                ].map((step, i) => (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.4 + i * 0.1 }}
                    className="flex items-center"
                  >
                    <div className={`px-4 py-2 rounded-lg bg-${step.color}/20 border border-${step.color}/30 text-center`}>
                      <div className="text-lg mb-1">{step.icon}</div>
                      <div className={`text-xs font-display text-${step.color}`}>{step.label}</div>
                    </div>
                    {i < 5 && <span className="text-white/30 mx-2">→</span>}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
        )}
      </AnimatePresence>
    </div>
  )
}

