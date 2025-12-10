'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface SlideProps {
  contentVisible?: boolean
}

export default function RestApiDetailsSlide({ contentVisible = true }: SlideProps) {
  const statusCodes = [
    { code: '2xx', meaning: 'Success', examples: '200 OK, 201 Created', color: 'text-cyber-green' },
    { code: '3xx', meaning: 'Redirect', examples: '301 Moved, 304 Not Modified', color: 'text-cyber-cyan' },
    { code: '4xx', meaning: 'Client Error', examples: '400 Bad Request, 404 Not Found', color: 'text-cyber-orange' },
    { code: '5xx', meaning: 'Server Error', examples: '500 Internal, 503 Unavailable', color: 'text-cyber-pink' },
  ]

  return (
    <div className="w-full h-full flex flex-col p-[clamp(0.75rem,1.5vw,1.5rem)] overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-[clamp(0.5rem,1vw,1rem)] flex-shrink-0"
      >
        <span className="text-cyber-purple font-display text-[clamp(0.75rem,1vw,0.875rem)] tracking-widest uppercase">REST Principles</span>
        <h1 className="text-[clamp(2rem,4vw,3rem)] font-body font-bold mt-1">
          Stateless & Resource-Based
        </h1>
      </motion.div>

      <AnimatePresence>
        {contentVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex-1 grid grid-cols-2 gap-[clamp(1rem,2vw,2rem)] min-h-0 overflow-hidden"
          >
            {/* Left column: REST constraints */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <div className="diagram-box p-5">
                <h3 className="text-lg font-body font-semibold text-cyber-purple mb-3">🎯 REST Constraints</h3>
                <ul className="space-y-2 text-sm">
                  {[
                    { title: 'Stateless', desc: 'Fiecare request conține toate informațiile necesare' },
                    { title: 'Client-Server', desc: 'Separarea responsabilităților' },
                    { title: 'Cacheable', desc: 'Response-urile pot fi cached' },
                    { title: 'Uniform Interface', desc: 'URL-uri consistente pentru resurse' },
                    { title: 'Layered System', desc: 'Clientul nu știe dacă e conectat direct' },
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
                <div className="text-xs font-display text-white/50 mb-2">HTTP Request Structure</div>
                <pre className="text-xs">
                  <span className="text-cyber-cyan">GET</span> <span className="text-cyber-green">/api/users/123</span> <span className="text-white/50">HTTP/1.1</span>{'\n'}
                  <span className="text-cyber-purple">Host:</span> api.example.com{'\n'}
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
              <h3 className="text-lg font-body font-semibold text-white/80 mb-2">📊 Status Codes</h3>
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
                <h4 className="text-sm font-body font-semibold text-cyber-cyan mb-3">📁 RESTful URL Pattern</h4>
                <div className="space-y-1 font-display text-xs">
                  <div className="flex gap-2">
                    <span className="text-cyber-green w-14">GET</span>
                    <span className="text-white/60">/users</span>
                    <span className="text-white/30 ml-auto">→ List all</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-cyber-green w-14">GET</span>
                    <span className="text-white/60">/users/:id</span>
                    <span className="text-white/30 ml-auto">→ Get one</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-cyber-cyan w-14">POST</span>
                    <span className="text-white/60">/users</span>
                    <span className="text-white/30 ml-auto">→ Create</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-cyber-orange w-14">PUT</span>
                    <span className="text-white/60">/users/:id</span>
                    <span className="text-white/30 ml-auto">→ Update</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-cyber-pink w-14">DELETE</span>
                    <span className="text-white/60">/users/:id</span>
                    <span className="text-white/30 ml-auto">→ Remove</span>
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
