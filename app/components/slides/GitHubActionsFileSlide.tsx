'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface SlideProps {
  contentVisible?: boolean
}

export default function GitHubActionsFileSlide({ contentVisible = true }: SlideProps) {
  const yamlLines = [
    { code: 'name: Pipeline CI/CD', indent: 0, type: 'key-value' },
    { code: '', indent: 0, type: 'empty' },
    { code: 'on:', indent: 0, type: 'key' },
    { code: 'push:', indent: 1, type: 'key' },
    { code: 'branches: [main]', indent: 2, type: 'key-value' },
    { code: 'pull_request:', indent: 1, type: 'key' },
    { code: 'branches: [main]', indent: 2, type: 'key-value' },
    { code: '', indent: 0, type: 'empty' },
    { code: 'jobs:', indent: 0, type: 'key' },
    { code: 'build-and-test:', indent: 1, type: 'key' },
    { code: 'runs-on: ubuntu-latest', indent: 2, type: 'key-value' },
    { code: '', indent: 2, type: 'empty' },
    { code: 'steps:', indent: 2, type: 'key' },
    { code: '- uses: actions/checkout@v4', indent: 3, type: 'action' },
    { code: '', indent: 3, type: 'empty' },
    { code: '- name: Configurare Node.js', indent: 3, type: 'step-name' },
    { code: 'uses: actions/setup-node@v4', indent: 4, type: 'action' },
    { code: 'with:', indent: 4, type: 'key' },
    { code: "node-version: '20'", indent: 5, type: 'key-value' },
    { code: '', indent: 3, type: 'empty' },
    { code: '- name: Instalare dependințe', indent: 3, type: 'step-name' },
    { code: 'run: npm ci', indent: 4, type: 'run' },
    { code: '', indent: 3, type: 'empty' },
    { code: '- name: Rulare teste', indent: 3, type: 'step-name' },
    { code: 'run: npm test', indent: 4, type: 'run' },
    { code: '', indent: 3, type: 'empty' },
    { code: '- name: Build', indent: 3, type: 'step-name' },
    { code: 'run: npm run build', indent: 4, type: 'run' },
  ]

  const getColor = (type: string) => {
    switch (type) {
      case 'key': return 'text-cyber-cyan'
      case 'key-value': return 'text-cyber-green'
      case 'action': return 'text-cyber-purple'
      case 'step-name': return 'text-cyber-orange'
      case 'run': return 'text-cyber-pink'
      default: return 'text-white/60'
    }
  }

  return (
    <div className="w-full h-full flex flex-col p-[clamp(1rem,2vw,2rem)] overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-[clamp(0.5rem,1vw,1rem)] flex-shrink-0"
      >
        <span className="text-cyber-orange font-display text-[clamp(0.75rem,1vw,0.875rem)] tracking-widest uppercase">Exemplu de Cod</span>
        <h1 className="text-[clamp(2rem,4vw,2.5rem)] font-body font-bold mt-2">
          Workflow <span className="text-cyber-orange">GitHub Actions</span> Simplu
        </h1>
      </motion.div>

      <AnimatePresence>
        {contentVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex-1 flex gap-[clamp(1rem,2vw,2rem)] min-h-0 overflow-hidden"
          >
            {/* YAML File */}
            <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex-1 min-w-0 flex flex-col"
        >
          <div className="code-block p-[clamp(1rem,1.5vw,1.5rem)] h-full overflow-auto flex flex-col">
            <div className="flex items-center gap-2 mb-4 flex-shrink-0">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
              <span className="text-white/30 text-[clamp(0.75rem,1vw,0.875rem)] ml-2 font-display">.github/workflows/ci.yml</span>
            </div>
            <pre className="text-[clamp(0.875rem,1.2vw,1rem)] leading-[1.6] flex-1">
              {yamlLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.02 }}
                  style={{ paddingLeft: `${line.indent * 20}px` }}
                  className={`${getColor(line.type)} whitespace-pre`}
                >
                  {line.code || '\u00A0'}
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
          className="w-[clamp(18rem,25vw,20rem)] flex-shrink-0 flex flex-col overflow-hidden"
        >
          <h3 className="text-[clamp(1.125rem,1.5vw,1.25rem)] font-body font-semibold mb-[clamp(0.5rem,1vw,1rem)] text-white/80">Explicații</h3>
          <div className="space-y-[clamp(0.5rem,0.75vw,0.75rem)] flex-1 overflow-y-auto">
            {[
              { key: 'name', desc: 'Numele afișat al workflow-ului', color: 'text-cyber-green' },
              { key: 'on', desc: 'Evenimentele care declanșează workflow-ul', color: 'text-cyber-cyan' },
              { key: 'jobs', desc: 'Definește unul sau mai multe job-uri', color: 'text-cyber-cyan' },
              { key: 'runs-on', desc: 'Mediul runner-ului', color: 'text-cyber-green' },
              { key: 'steps', desc: 'Secvența de task-uri', color: 'text-cyber-cyan' },
              { key: 'uses', desc: 'Folosește o acțiune din marketplace', color: 'text-cyber-purple' },
              { key: 'run', desc: 'Execută comandă shell', color: 'text-cyber-pink' },
            ].map((item, i) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.08 }}
                className="diagram-box p-[clamp(0.5rem,0.75vw,0.75rem)]"
              >
                <span className={`${item.color} font-display font-bold text-[clamp(0.875rem,1.2vw,1rem)]`}>{item.key}:</span>
                <p className="text-white/60 text-[clamp(0.75rem,1vw,0.875rem)] mt-1">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Popular Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-[clamp(0.75rem,1vw,1rem)] diagram-box p-[clamp(0.75rem,1vw,1rem)] flex-shrink-0"
          >
            <h4 className="text-[clamp(0.875rem,1.2vw,1rem)] font-body font-semibold text-cyber-purple mb-[clamp(0.5rem,0.75vw,0.75rem)]">🧩 Acțiuni Populare</h4>
            <div className="space-y-1 text-[clamp(0.75rem,1vw,0.875rem)] font-display">
              <div className="text-white/60">actions/checkout</div>
              <div className="text-white/60">actions/setup-node</div>
              <div className="text-white/60">actions/cache</div>
              <div className="text-white/60">docker/build-push-action</div>
            </div>
          </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
