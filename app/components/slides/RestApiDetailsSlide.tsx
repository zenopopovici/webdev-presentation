'use client'

import { motion } from 'framer-motion'

export default function RestApiDetailsSlide() {
  const statusCodes = [
    { code: '2xx', meaning: 'Succes', examples: '200 OK, 201 Creat', color: 'text-cyber-green' },
    { code: '3xx', meaning: 'Redirecționare', examples: '301 Mutat, 304 Nemodificat', color: 'text-cyber-cyan' },
    { code: '4xx', meaning: 'Eroare Client', examples: '400 Cerere Invalidă, 404 Negăsit', color: 'text-cyber-orange' },
    { code: '5xx', meaning: 'Eroare Server', examples: '500 Eroare Internă, 503 Indisponibil', color: 'text-cyber-pink' },
  ]

  return (
    <div className="w-full h-full flex flex-col p-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <span className="text-cyber-purple font-display text-sm tracking-widest uppercase">Principii REST</span>
        <h1 className="text-4xl font-body font-bold mt-2">
          Fără Stare & Bazat pe Resurse
        </h1>
      </motion.div>

      <div className="flex-1 grid grid-cols-2 gap-8">
        {/* Left column: REST constraints */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <div className="diagram-box p-5">
            <h3 className="text-lg font-body font-semibold text-cyber-purple mb-3">🎯 Constrângeri REST</h3>
            <ul className="space-y-2 text-sm">
              {[
                { title: 'Fără Stare', desc: 'Fiecare cerere conține toate informațiile necesare' },
                { title: 'Client-Server', desc: 'Separarea responsabilităților' },
                { title: 'Cacheable', desc: 'Răspunsurile pot fi stocate în cache' },
                { title: 'Interfață Uniformă', desc: 'URL-uri consistente pentru resurse' },
                { title: 'Sistem Stratificat', desc: 'Clientul nu știe dacă e conectat direct' },
              ].map((item, i) => (
                <motion.li
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-start gap-2"
                >
                  <span className="text-cyber-purple">▸</span>
                  <div>
                    <span className="text-white font-medium">{item.title}:</span>
                    <span className="text-white/60 ml-1">{item.desc}</span>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Request structure */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="code-block p-4"
          >
            <div className="text-xs font-display text-white/50 mb-2">Structura Cererii HTTP</div>
            <pre className="text-xs">
              <span className="text-cyber-cyan">GET</span> <span className="text-cyber-green">/api/utilizatori/123</span> <span className="text-white/50">HTTP/1.1</span>{'\n'}
              <span className="text-cyber-purple">Host:</span> api.exemplu.com{'\n'}
              <span className="text-cyber-purple">Authorization:</span> Bearer token123{'\n'}
              <span className="text-cyber-purple">Accept:</span> application/json{'\n'}
              <span className="text-cyber-purple">Content-Type:</span> application/json
            </pre>
          </motion.div>
        </motion.div>

        {/* Right column: Status codes */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-body font-semibold text-white/80 mb-2">📊 Coduri de Status</h3>
          <div className="space-y-3">
            {statusCodes.map((status, i) => (
              <motion.div
                key={status.code}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="diagram-box p-4"
              >
                <div className="flex items-center gap-3">
                  <span className={`text-2xl font-display font-bold ${status.color}`}>
                    {status.code}
                  </span>
                  <div>
                    <div className="text-white font-medium text-sm">{status.meaning}</div>
                    <div className="text-white/50 text-xs">{status.examples}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Common endpoints pattern */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="diagram-box p-4 mt-4"
          >
            <h4 className="text-sm font-body font-semibold text-cyber-cyan mb-3">📁 Pattern URL RESTful</h4>
            <div className="space-y-1 font-display text-xs">
              <div className="flex gap-2">
                <span className="text-cyber-green w-14">GET</span>
                <span className="text-white/60">/utilizatori</span>
                <span className="text-white/30 ml-auto">→ Listează toți</span>
              </div>
              <div className="flex gap-2">
                <span className="text-cyber-green w-14">GET</span>
                <span className="text-white/60">/utilizatori/:id</span>
                <span className="text-white/30 ml-auto">→ Obține unul</span>
              </div>
              <div className="flex gap-2">
                <span className="text-cyber-cyan w-14">POST</span>
                <span className="text-white/60">/utilizatori</span>
                <span className="text-white/30 ml-auto">→ Creează</span>
              </div>
              <div className="flex gap-2">
                <span className="text-cyber-orange w-14">PUT</span>
                <span className="text-white/60">/utilizatori/:id</span>
                <span className="text-white/30 ml-auto">→ Actualizează</span>
              </div>
              <div className="flex gap-2">
                <span className="text-cyber-pink w-14">DELETE</span>
                <span className="text-white/60">/utilizatori/:id</span>
                <span className="text-white/30 ml-auto">→ Șterge</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
