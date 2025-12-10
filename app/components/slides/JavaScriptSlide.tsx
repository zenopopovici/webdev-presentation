'use client'

import { motion } from 'framer-motion'

export default function JavaScriptSlide() {
  return (
    <div className="w-full h-full flex flex-col p-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <span className="text-cyber-orange font-display text-sm tracking-widest uppercase">În Profunzime</span>
        <h1 className="text-5xl font-body font-bold mt-2">
          Cum funcționează <span className="text-cyber-orange text-glow-purple">JavaScript</span>
        </h1>
      </motion.div>

      <div className="flex-1 flex gap-12">
        {/* Left: JS Engine diagram */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex-1"
        >
          <div className="diagram-box p-8 h-full">
            <h3 className="text-xl font-body font-semibold text-cyber-orange mb-6 flex items-center gap-3">
              <span className="text-2xl">⚡</span> Motorul JavaScript (V8)
            </h3>

            <div className="space-y-4">
              {/* Memory Heap */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="p-4 rounded-xl bg-gradient-to-r from-cyber-purple/20 to-transparent border border-cyber-purple/30"
              >
                <h4 className="text-cyber-purple font-display font-semibold mb-2">📦 Heap de Memorie</h4>
                <p className="text-white/60 text-sm">Memorie nestructurată pentru obiecte, funcții, variabile</p>
                <div className="mt-3 flex gap-2 flex-wrap">
                  {['Obiecte', 'Array-uri', 'Funcții'].map(item => (
                    <span key={item} className="px-2 py-1 text-xs bg-cyber-purple/20 rounded text-cyber-purple">
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
                <h4 className="text-cyber-cyan font-display font-semibold mb-2">📚 Stiva de Apeluri</h4>
                <p className="text-white/60 text-sm">Structură LIFO care urmărește contextul de execuție</p>
                <div className="mt-3 space-y-1">
                  {['main()', 'handleClick()', 'fetchData()', 'processResponse()'].reverse().map((fn, i) => (
                    <motion.div
                      key={fn}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + i * 0.1 }}
                      className="px-3 py-1 text-xs font-display bg-cyber-cyan/10 border border-cyber-cyan/20 rounded"
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
          className="flex-1 flex flex-col gap-6"
        >
          <div className="diagram-box p-6">
            <h3 className="text-lg font-body font-semibold text-cyber-pink mb-4">
              🧵 Single-Threaded
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              JavaScript execută <span className="text-cyber-pink font-semibold">o singură operație la un moment dat</span>. 
              Stiva de apeluri poate face doar un singur lucru odată.
            </p>
          </div>

          <div className="diagram-box p-6">
            <h3 className="text-lg font-body font-semibold text-cyber-green mb-4">
              🔄 Non-Blocant
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Operațiile asincrone (rețea, timere) sunt gestionate de <span className="text-cyber-green font-semibold">Web APIs</span>, 
              nu de thread-ul principal.
            </p>
          </div>

          <div className="diagram-box p-6 flex-1">
            <h3 className="text-lg font-body font-semibold text-cyber-yellow mb-4">
              🏭 Compilare
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center bg-cyber-yellow/20 rounded text-cyber-yellow">1</span>
                <span className="text-white/70">Parser → Arbore Sintactic Abstract (AST)</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center bg-cyber-yellow/20 rounded text-cyber-yellow">2</span>
                <span className="text-white/70">Interpretor → Bytecode</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center bg-cyber-yellow/20 rounded text-cyber-yellow">3</span>
                <span className="text-white/70">Compilator JIT → Cod Mașină Optimizat</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
