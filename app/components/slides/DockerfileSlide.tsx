'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface SlideProps {
  contentVisible?: boolean
}

export default function DockerfileSlide({ contentVisible = true }: SlideProps) {
  const lines = [
    { code: '# Folosește imaginea oficială Node.js ca bază', type: 'comment' },
    { code: 'FROM node:20-alpine', type: 'keyword' },
    { code: '', type: 'empty' },
    { code: '# Setează directorul de lucru', type: 'comment' },
    { code: 'WORKDIR /app', type: 'keyword' },
    { code: '', type: 'empty' },
    { code: '# Copiază fișierele package mai întâi (pentru cache)', type: 'comment' },
    { code: 'COPY package*.json ./', type: 'keyword' },
    { code: '', type: 'empty' },
    { code: '# Instalează dependințele', type: 'comment' },
    { code: 'RUN npm ci --only=production', type: 'keyword' },
    { code: '', type: 'empty' },
    { code: '# Copiază codul aplicației', type: 'comment' },
    { code: 'COPY . .', type: 'keyword' },
    { code: '', type: 'empty' },
    { code: '# Expune portul', type: 'comment' },
    { code: 'EXPOSE 3000', type: 'keyword' },
    { code: '', type: 'empty' },
    { code: '# Pornește aplicația', type: 'comment' },
    { code: 'CMD ["npm", "start"]', type: 'keyword' },
  ]

  const explanations = [
    { keyword: 'FROM', desc: 'Imaginea de bază de la care pornești' },
    { keyword: 'WORKDIR', desc: 'Setează directorul curent' },
    { keyword: 'COPY', desc: 'Copiază fișiere de pe host' },
    { keyword: 'RUN', desc: 'Execută comandă (la build)' },
    { keyword: 'EXPOSE', desc: 'Documentează portul folosit' },
    { keyword: 'CMD', desc: 'Comandă implicită (la run)' },
  ]

  return (
    <div className="w-full h-full flex flex-col p-[clamp(0.75rem,1.5vw,1.5rem)] overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-[clamp(0.25rem,0.75vw,0.75rem)] flex-shrink-0"
      >
        <span className="text-cyber-green font-display text-[clamp(0.75rem,1vw,0.875rem)] tracking-widest uppercase">Exemplu de Cod</span>
        <h1 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-body font-bold mt-1">
          <span className="text-cyber-green">Dockerfile</span> Simplu
        </h1>
      </motion.div>

      <AnimatePresence>
        {contentVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex-1 flex gap-[clamp(0.75rem,1.5vw,2rem)] min-h-0 overflow-hidden"
          >
            {/* Dockerfile */}
            <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex-1 min-w-0 flex flex-col"
        >
          <div className="code-block p-[clamp(0.75rem,1.5vw,1.5rem)] h-full overflow-auto flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
              <span className="text-white/30 text-xs ml-2 font-display">Dockerfile</span>
            </div>
            <pre className="text-sm leading-6">
              {lines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.03 }}
                >
                  {line.type === 'comment' && (
                    <span className="text-white/40">{line.code}</span>
                  )}
                  {line.type === 'keyword' && (
                    <span>
                      <span className="text-cyber-cyan">{line.code.split(' ')[0]}</span>
                      <span className="text-cyber-green"> {line.code.split(' ').slice(1).join(' ')}</span>
                    </span>
                  )}
                  {line.type === 'empty' && <span>&nbsp;</span>}
                </motion.div>
              ))}
            </pre>
          </div>
        </motion.div>

        {/* Explanations */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="w-[clamp(16rem,20vw,18rem)] flex-shrink-0 flex flex-col overflow-y-auto"
        >
          <h3 className="text-[clamp(1.125rem,1.5vw,1.25rem)] font-body font-semibold mb-[clamp(0.5rem,1vw,1rem)] text-white/80 flex-shrink-0">Instrucțiuni</h3>
          <div className="space-y-[clamp(0.5rem,0.75vw,0.75rem)] flex-1">
            {explanations.map((item, i) => (
              <motion.div
                key={item.keyword}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="diagram-box p-3"
              >
                <span className="text-cyber-cyan font-display font-bold text-sm">{item.keyword}</span>
                <p className="text-white/60 text-xs mt-1">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Commands */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-[clamp(0.75rem,1vw,1rem)] diagram-box p-[clamp(0.75rem,1vw,1rem)] flex-shrink-0"
          >
            <h4 className="text-sm font-body font-semibold text-cyber-orange mb-3">🚀 Build & Run</h4>
            <div className="space-y-2 font-display text-xs">
              <div className="bg-black/30 p-2 rounded">
                <span className="text-cyber-green">$</span> docker build -t app-mea .
              </div>
              <div className="bg-black/30 p-2 rounded">
                <span className="text-cyber-green">$</span> docker run -p 3000:3000 app-mea
              </div>
            </div>
          </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
