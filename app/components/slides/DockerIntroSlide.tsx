'use client'

import { motion } from 'framer-motion'

export default function DockerIntroSlide() {
  return (
    <div className="w-full h-full flex flex-col p-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <span className="text-cyber-cyan font-display text-sm tracking-widest uppercase">Containere</span>
        <h1 className="text-5xl font-body font-bold mt-2">
          Ce este <span className="text-cyber-cyan">Docker</span>? 🐳
        </h1>
      </motion.div>

      <div className="flex-1 flex gap-12 items-center">
        {/* Traditional vs Containers comparison */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex-1"
        >
          <div className="grid grid-cols-2 gap-8">
            {/* Traditional */}
            <div className="diagram-box p-6">
              <h3 className="text-lg font-body font-semibold text-cyber-pink mb-4">❌ Tradițional</h3>
              <div className="space-y-2">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-cyber-pink/10 p-3 rounded-lg text-center"
                >
                  <span className="text-xs font-display">App 1</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="bg-cyber-pink/10 p-3 rounded-lg text-center"
                >
                  <span className="text-xs font-display">App 2</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="bg-cyber-pink/20 p-3 rounded-lg text-center border border-cyber-pink/30"
                >
                  <span className="text-xs font-display">Dependințe Comune 😰</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="bg-white/5 p-3 rounded-lg text-center"
                >
                  <span className="text-xs font-display">Sistem de Operare</span>
                </motion.div>
              </div>
              <p className="text-white/50 text-xs mt-4 text-center">&quot;Merge pe mașina mea&quot; 🤷</p>
            </div>

            {/* Containers */}
            <div className="diagram-box p-6">
              <h3 className="text-lg font-body font-semibold text-cyber-green mb-4">✅ Containere</h3>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-cyber-green/10 p-3 rounded-lg text-center border border-cyber-green/30"
                  >
                    <span className="text-xs font-display block">App 1</span>
                    <span className="text-[10px] text-white/40">+ deps</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="bg-cyber-cyan/10 p-3 rounded-lg text-center border border-cyber-cyan/30"
                  >
                    <span className="text-xs font-display block">App 2</span>
                    <span className="text-[10px] text-white/40">+ deps</span>
                  </motion.div>
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="bg-cyber-purple/20 p-3 rounded-lg text-center"
                >
                  <span className="text-xs font-display">Docker Engine 🐳</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="bg-white/5 p-3 rounded-lg text-center"
                >
                  <span className="text-xs font-display">Sistem de Operare</span>
                </motion.div>
              </div>
              <p className="text-cyber-green text-xs mt-4 text-center">Izolat & Portabil! 🚀</p>
            </div>
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="w-80"
        >
          <h3 className="text-lg font-body font-semibold mb-4 text-white/80">De ce Docker?</h3>
          <div className="space-y-3">
            {[
              { icon: '📦', title: 'Consistență', desc: 'Același mediu peste tot' },
              { icon: '🚀', title: 'Viteză', desc: 'Pornește containere în secunde' },
              { icon: '🔒', title: 'Izolare', desc: 'Separă aplicații & dependințe' },
              { icon: '📏', title: 'Scalabilitate', desc: 'Scalare orizontală ușoară' },
              { icon: '🔄', title: 'Gata pentru CI/CD', desc: 'Perfect pentru automatizare' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="diagram-box p-3 flex items-center gap-3"
              >
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <div className="text-white font-medium text-sm">{item.title}</div>
                  <div className="text-white/50 text-xs">{item.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
