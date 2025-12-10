'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface SlideProps {
  contentVisible?: boolean
}

export default function SecuritySlide({ contentVisible = true }: SlideProps) {
  const vulnerabilities = [
    {
      name: 'XSS',
      full: 'Cross-Site Scripting',
      icon: '💉',
      color: 'cyber-pink',
      desc: 'Injectare de cod malițios în pagină',
      fix: 'Sanitizează input-ul, folosește CSP',
    },
    {
      name: 'CSRF',
      full: 'Cross-Site Request Forgery',
      icon: '🎭',
      color: 'cyber-orange',
      desc: 'Forțează user-ul să execute acțiuni nedorite',
      fix: 'CSRF tokens, SameSite cookies',
    },
    {
      name: 'SQL Injection',
      full: 'SQL Injection',
      icon: '🗃️',
      color: 'cyber-purple',
      desc: 'Injectare de comenzi SQL malițioase',
      fix: 'Prepared statements, ORM',
    },
  ]

  return (
    <div className="w-full h-full flex flex-col p-[clamp(1rem,2vw,2rem)] overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-[clamp(0.5rem,1vw,1rem)] flex-shrink-0"
      >
        <span className="text-cyber-pink font-display text-[clamp(0.75rem,1vw,0.875rem)] tracking-widest uppercase">Best Practices</span>
        <h1 className="text-[clamp(2rem,4vw,3rem)] font-body font-bold mt-1">
          <span className="text-cyber-pink">Security</span> Basics 🔒
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
            {/* Left: Common Vulnerabilities */}
            <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex-1 min-w-0 flex flex-col overflow-y-auto"
        >
          <h3 className="text-lg font-body font-semibold text-white/80 mb-4">⚠️ Vulnerabilități Comune</h3>
          <div className="space-y-4">
            {vulnerabilities.map((vuln, i) => (
              <motion.div
                key={vuln.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="diagram-box p-4"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{vuln.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-${vuln.color} font-display font-bold`}>{vuln.name}</span>
                      <span className="text-white/40 text-xs">({vuln.full})</span>
                    </div>
                    <p className="text-white/60 text-[clamp(1rem,1.5vw,1.25rem)] mb-2">{vuln.desc}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-cyber-green text-[clamp(0.875rem,1.2vw,1rem)]">✓ Fix:</span>
                      <span className="text-white/70 text-[clamp(0.875rem,1.2vw,1rem)]">{vuln.fix}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CORS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-4 diagram-box p-4"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🌐</span>
              <span className="text-cyber-cyan font-display font-bold">CORS</span>
              <span className="text-white/40 text-xs">(Cross-Origin Resource Sharing)</span>
            </div>
            <p className="text-white/60 text-[clamp(1rem,1.5vw,1.25rem)] mb-2">
              Controlează ce domenii pot accesa API-ul tău
            </p>
            <div className="code-block p-2 text-[clamp(0.875rem,1.2vw,1rem)]">
              <span className="text-cyber-purple">Access-Control-Allow-Origin:</span> <span className="text-cyber-green">https://myapp.com</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right: Best Practices */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="flex-1 flex flex-col gap-[clamp(0.5rem,1vw,1rem)] min-w-0 overflow-y-auto"
        >
          <h3 className="text-[clamp(1.125rem,1.5vw,1.25rem)] font-body font-semibold text-white/80 mb-2 flex-shrink-0">✅ Best Practices</h3>
          
          {/* HTTPS */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="diagram-box p-4"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🔐</span>
              <span className="text-cyber-green font-display font-bold">HTTPS Everywhere</span>
            </div>
            <p className="text-white/60 text-[clamp(1rem,1.5vw,1.25rem)]">
              Criptează comunicația client-server. <span className="text-cyber-green">Obligatoriu</span> în producție!
            </p>
            <div className="mt-2 flex gap-2">
              <span className="px-2 py-1 text-[clamp(0.875rem,1.2vw,1rem)] bg-cyber-green/20 text-cyber-green rounded">Let&apos;s Encrypt</span>
              <span className="px-2 py-1 text-[clamp(0.875rem,1.2vw,1rem)] bg-cyber-green/20 text-cyber-green rounded">Free SSL</span>
            </div>
          </motion.div>

          {/* Environment Variables */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="diagram-box p-4"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🔑</span>
              <span className="text-cyber-orange font-display font-bold">Environment Variables</span>
            </div>
            <p className="text-white/60 text-[clamp(1rem,1.5vw,1.25rem)] mb-2">
              <span className="text-cyber-pink">NICIODATĂ</span> nu pune secrets în cod!
            </p>
            <div className="code-block p-3 text-[clamp(0.875rem,1.2vw,1rem)] space-y-1">
              <div><span className="text-white/40"># .env (în .gitignore!)</span></div>
              <div><span className="text-cyber-purple">DATABASE_URL</span>=<span className="text-cyber-green">&quot;postgres://...&quot;</span></div>
              <div><span className="text-cyber-purple">API_KEY</span>=<span className="text-cyber-green">&quot;sk_live_xxx&quot;</span></div>
              <div><span className="text-cyber-purple">JWT_SECRET</span>=<span className="text-cyber-green">&quot;super_secret&quot;</span></div>
            </div>
          </motion.div>

          {/* Password Hashing */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="diagram-box p-4"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🔒</span>
              <span className="text-cyber-purple font-display font-bold">Password Hashing</span>
            </div>
            <p className="text-white/60 text-[clamp(1rem,1.5vw,1.25rem)] mb-2">
              Nu stoca parole în plain text. Folosește bcrypt sau Argon2.
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="px-2 py-1 text-[clamp(0.875rem,1.2vw,1rem)] bg-cyber-pink/20 text-cyber-pink rounded line-through">MD5 ❌</span>
              <span className="px-2 py-1 text-[clamp(0.875rem,1.2vw,1rem)] bg-cyber-pink/20 text-cyber-pink rounded line-through">SHA1 ❌</span>
              <span className="px-2 py-1 text-[clamp(0.875rem,1.2vw,1rem)] bg-cyber-green/20 text-cyber-green rounded">bcrypt ✓</span>
              <span className="px-2 py-1 text-[clamp(0.875rem,1.2vw,1rem)] bg-cyber-green/20 text-cyber-green rounded">Argon2 ✓</span>
            </div>
          </motion.div>

          {/* Quick Tips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="diagram-box p-4 bg-cyber-cyan/5 border-cyber-cyan/20"
          >
            <h4 className="text-cyber-cyan font-display font-semibold text-sm mb-2">💡 Quick Tips</h4>
            <ul className="space-y-1 text-[clamp(0.875rem,1.2vw,1rem)] text-white/60">
              <li>• Validează input pe <span className="text-cyber-cyan">client ȘI server</span></li>
              <li>• Folosește <span className="text-cyber-cyan">Content Security Policy</span> (CSP)</li>
              <li>• Setează <span className="text-cyber-cyan">HttpOnly</span> și <span className="text-cyber-cyan">Secure</span> pe cookies</li>
              <li>• Actualizează dependințele regulat (<span className="text-cyber-cyan">npm audit</span>)</li>
            </ul>
          </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

