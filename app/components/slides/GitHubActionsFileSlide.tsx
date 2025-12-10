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
    <div className="w-full h-full flex flex-col p-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <span className="text-cyber-orange font-display text-sm tracking-widest uppercase">Exemplu de Cod</span>
        <h1 className="text-4xl font-body font-bold mt-2">
          Workflow <span className="text-cyber-orange">GitHub Actions</span> Simplu
        </h1>
      </motion.div>

      <AnimatePresence>
        {contentVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex-1 flex gap-8"
          >
            {/* YAML File */}
            <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex-1"
        >
          <div className="code-block p-6 h-full overflow-auto">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
              <span className="text-white/30 text-xs ml-2 font-display">.github/workflows/ci.yml</span>
            </div>
            <pre className="text-sm leading-5">
              {yamlLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.02 }}
                  style={{ paddingLeft: `${line.indent * 16}px` }}
                  className={getColor(line.type)}
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
          className="w-80"
        >
          <h3 className="text-lg font-body font-semibold mb-4 text-white/80">Explicații</h3>
          <div className="space-y-3">
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
                className="diagram-box p-3"
              >
                <span className={`${item.color} font-display font-bold text-sm`}>{item.key}:</span>
                <p className="text-white/60 text-xs mt-1">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Popular Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-6 diagram-box p-4"
          >
            <h4 className="text-sm font-body font-semibold text-cyber-purple mb-3">🧩 Acțiuni Populare</h4>
            <div className="space-y-1 text-xs font-display">
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
