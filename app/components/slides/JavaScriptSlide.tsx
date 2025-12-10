'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface SlideProps {
  contentVisible?: boolean
}

export default function JavaScriptSlide({ contentVisible = true }: SlideProps) {
  return (
    <div className="w-full h-full flex flex-col p-[clamp(0.75rem,1.5vw,1.5rem)] overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-[clamp(0.25rem,0.75vw,0.75rem)] flex-shrink-0"
      >
        <span className="text-cyber-orange font-display text-[clamp(0.75rem,1vw,0.875rem)] tracking-widest uppercase">În Profunzime</span>
        <h1 className="text-[clamp(2rem,4vw,3rem)] font-body font-bold mt-1">
          Cum funcționează <span className="text-cyber-orange text-glow-purple">JavaScript</span>
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
            {/* Left: JS Engine diagram */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex-1 min-w-0 flex flex-col"
            >
              <div className="diagram-box p-[clamp(1rem,1.5vw,2rem)] h-full overflow-auto flex flex-col">
                <h3 className="text-xl font-body font-semibold text-cyber-orange mb-6 flex items-center gap-3">
                  <span className="text-2xl">⚡</span> JavaScript Engine (V8)
                </h3>

                <div className="space-y-4">
                  {/* Memory Heap */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="p-4 rounded-xl bg-gradient-to-r from-cyber-purple/20 to-transparent border border-cyber-purple/30"
                  >
                    <h4 className="text-cyber-purple font-display font-semibold mb-2">📦 Memory Heap</h4>
                    <p className="text-white/60 text-[clamp(1rem,1.5vw,1.25rem)]">Memorie nestructurată pentru obiecte, funcții, variabile</p>
                    <div className="mt-3 flex gap-2 flex-wrap">
                      {['Objects', 'Arrays', 'Functions'].map(item => (
                        <span key={item} className="px-2 py-1 text-[clamp(0.75rem,1vw,0.875rem)] bg-cyber-purple/20 rounded text-cyber-purple">
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Call Stack */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="p-4 rounded-xl bg-gradient-to-r from-cyber-cyan/20 to-transparent border border-cyber-cyan/30"
                  >
                    <h4 className="text-cyber-cyan font-display font-semibold mb-2">📚 Call Stack</h4>
                    <p className="text-white/60 text-[clamp(1rem,1.5vw,1.25rem)]">Structură LIFO care urmărește contextul de execuție</p>
                    <div className="mt-3 space-y-1">
                      {['main()', 'handleClick()', 'fetchData()', 'processResponse()'].reverse().map((fn, i) => (
                        <motion.div
                          key={fn}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.9 + i * 0.1 }}
                          className="px-3 py-1 text-[clamp(0.875rem,1.2vw,1rem)] font-display bg-cyber-cyan/10 border border-cyber-cyan/20 rounded"
                        >
                          {fn}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Right: Single-threaded explanation */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex-1 flex flex-col gap-[clamp(0.75rem,1vw,1.5rem)] min-w-0 overflow-y-auto"
            >
              <div className="diagram-box p-[clamp(0.75rem,1vw,1.5rem)] flex-shrink-0">
                <h3 className="text-lg font-body font-semibold text-cyber-pink mb-4">
                  🧵 Single-Threaded
                </h3>
                <p className="text-white/70 text-[clamp(1rem,1.5vw,1.25rem)] leading-relaxed">
                  JavaScript execută <span className="text-cyber-pink font-semibold">o singură operație la un moment dat</span>. 
                  Call Stack-ul poate face doar un singur lucru odată.
                </p>
              </div>

              <div className="diagram-box p-6">
                <h3 className="text-lg font-body font-semibold text-cyber-green mb-4">
                  🔄 Non-Blocking
                </h3>
                <p className="text-white/70 text-[clamp(1rem,1.5vw,1.25rem)] leading-relaxed">
                  Operațiile async (network, timers) sunt gestionate de <span className="text-cyber-green font-semibold">Web APIs</span>, 
                  nu de main thread.
                </p>
              </div>

              <div className="diagram-box p-[clamp(0.75rem,1vw,1.5rem)] flex-shrink-0">
                <h3 className="text-lg font-body font-semibold text-cyber-yellow mb-4">
                  🏭 Compilation
                </h3>
                <div className="space-y-3 text-[clamp(1rem,1.5vw,1.25rem)]">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 flex items-center justify-center bg-cyber-yellow/20 rounded text-cyber-yellow text-[clamp(1rem,1.2vw,1.125rem)]">1</span>
                    <span className="text-white/70">Parser → Abstract Syntax Tree (AST)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 flex items-center justify-center bg-cyber-yellow/20 rounded text-cyber-yellow text-[clamp(1rem,1.2vw,1.125rem)]">2</span>
                    <span className="text-white/70">Interpreter → Bytecode</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 flex items-center justify-center bg-cyber-yellow/20 rounded text-cyber-yellow text-[clamp(1rem,1.2vw,1.125rem)]">3</span>
                    <span className="text-white/70">JIT Compiler → Optimized Machine Code</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
