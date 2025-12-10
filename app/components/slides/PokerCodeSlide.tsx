'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface SlideProps {
  contentVisible?: boolean
}

export default function PokerCodeSlide({ contentVisible = true }: SlideProps) {
  return (
    <div className="w-full h-full flex flex-col p-[clamp(0.75rem,1.5vw,1.5rem)] overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-[clamp(0.25rem,0.75vw,0.75rem)] flex-shrink-0"
      >
        <span className="text-cyber-orange font-display text-[clamp(0.75rem,1vw,0.875rem)] tracking-widest uppercase">Behind the Scenes</span>
        <h1 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-body font-bold mt-1">
          Cum am creat <span className="text-cyber-orange">Poker Game</span> 🛠️
        </h1>
      </motion.div>

      <AnimatePresence>
        {contentVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex-1 flex gap-[clamp(0.5rem,1vw,1.5rem)] min-h-0 overflow-hidden"
          >
            {/* Left Column: API Calls */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex-1 min-w-0 flex flex-col gap-[clamp(0.5rem,0.75vw,1rem)] overflow-y-auto"
            >
              <h3 className="text-lg font-body font-semibold text-white/80">1️⃣ API Calls cu fetch()</h3>
              
              {/* Shuffle Deck */}
              <div className="diagram-box p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-cyber-green/20 text-cyber-green text-xs font-display rounded">GET</span>
                  <span className="text-white/60 text-sm">Shuffle New Deck</span>
                </div>
                <div className="code-block p-3 text-xs overflow-x-auto">
                  <pre className="text-cyber-cyan">
{`const res = await fetch(
  'https://deckofcardsapi.com/api/deck/new/shuffle/'
);
const data = await res.json();
// data.deck_id = "abc123"`}</pre>
                </div>
              </div>

              {/* Draw Cards */}
              <div className="diagram-box p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-cyber-green/20 text-cyber-green text-xs font-display rounded">GET</span>
                  <span className="text-white/60 text-sm">Draw Cards</span>
                </div>
                <div className="code-block p-3 text-xs overflow-x-auto">
                  <pre className="text-cyber-cyan">
{`const res = await fetch(
  \`https://deckofcardsapi.com/api/deck/
   \${deckId}/draw/?count=5\`
);
const data = await res.json();
// data.cards = [{image, value, suit}, ...]`}</pre>
                </div>
              </div>

              {/* Response Structure */}
              <div className="diagram-box p-4 bg-cyber-purple/5 border-cyber-purple/30">
                <h4 className="text-cyber-purple font-display text-sm mb-2">📦 Response JSON</h4>
                <div className="code-block p-3 text-xs">
                  <pre className="text-white/70">
{`{
  "success": true,
  "deck_id": "abc123",
  "cards": [{
    "code": "KH",
    "image": "https://.../KH.png",
    "value": "KING",
    "suit": "HEARTS"
  }],
  "remaining": 47
}`}</pre>
                </div>
              </div>
            </motion.div>

            {/* Middle Column: State Management */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex-1 min-w-0 flex flex-col gap-[clamp(0.5rem,0.75vw,1rem)] overflow-y-auto"
            >
              <h3 className="text-lg font-body font-semibold text-white/80">2️⃣ React State</h3>
              
              <div className="diagram-box p-4">
                <h4 className="text-cyber-cyan font-display text-sm mb-3">useState Hooks</h4>
                <div className="code-block p-3 text-xs">
                  <pre className="text-cyber-cyan">
{`// ID-ul deck-ului de la API
const [deckId, setDeckId] = useState(null);

// Cărțile din mână
const [cards, setCards] = useState([]);

// Cărți selectate pentru discard
const [selectedCards, setSelectedCards] = 
  useState(new Set());

// Faza jocului
const [gamePhase, setGamePhase] = 
  useState('start'); 
// 'start' | 'drawn' | 'final'`}</pre>
                </div>
              </div>

              <div className="diagram-box p-4">
                <h4 className="text-cyber-green font-display text-sm mb-3">🔄 Game Flow</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 flex items-center justify-center bg-cyber-purple/20 text-cyber-purple rounded-full text-xs">1</span>
                    <span className="text-white/70">start → Deal → <span className="text-cyber-green">fetch shuffle + draw</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 flex items-center justify-center bg-cyber-purple/20 text-cyber-purple rounded-full text-xs">2</span>
                    <span className="text-white/70">drawn → Select cards → <span className="text-cyber-orange">toggle in Set</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 flex items-center justify-center bg-cyber-purple/20 text-cyber-purple rounded-full text-xs">3</span>
                    <span className="text-white/70">Draw → <span className="text-cyber-green">fetch new cards</span> → replace</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 flex items-center justify-center bg-cyber-purple/20 text-cyber-purple rounded-full text-xs">4</span>
                    <span className="text-white/70">final → <span className="text-cyber-pink">evaluateHand()</span> → show rank</span>
                  </div>
                </div>
              </div>

              <div className="diagram-box p-4 bg-cyber-orange/5 border-cyber-orange/30">
                <h4 className="text-cyber-orange font-display text-sm mb-2">💡 Tips</h4>
                <ul className="text-xs text-white/60 space-y-1">
                  <li>• <code className="text-cyber-cyan">Set()</code> pentru selecție - O(1) add/delete</li>
                  <li>• <code className="text-cyber-cyan">async/await</code> pentru fetch curat</li>
                  <li>• State machine simplu cu gamePhase</li>
                </ul>
              </div>
            </motion.div>

            {/* Right Column: Hand Evaluation */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="w-[clamp(16rem,22vw,20rem)] flex-shrink-0 flex flex-col gap-[clamp(0.5rem,0.75vw,1rem)] overflow-y-auto"
            >
              <h3 className="text-lg font-body font-semibold text-white/80">3️⃣ Evaluare Mână</h3>
              
              <div className="diagram-box p-4">
                <h4 className="text-cyber-pink font-display text-sm mb-3">🎯 Logica</h4>
                <div className="code-block p-3 text-xs">
                  <pre className="text-cyber-cyan">
{`function evaluateHand(cards) {
  // 1. Extrage valori & suits
  const values = cards.map(
    c => cardToNumber(c.value)
  ).sort();
  
  const suits = cards.map(c => c.suit);
  
  // 2. Numără duplicatele
  const counts = countValues(values);
  
  // 3. Verifică patterns
  const isFlush = suits.every(
    s => s === suits[0]
  );
  
  const isStraight = isConsecutive(
    values
  );
  
  // 4. Return rank
  if (isFlush && isStraight) 
    return 'Straight Flush';
  if (counts[0] === 4) 
    return 'Four of a Kind';
  // ... etc
}`}</pre>
                </div>
              </div>

              <div className="diagram-box p-4">
                <h4 className="text-white/60 font-display text-sm mb-2">🏆 Hand Rankings</h4>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  {[
                    { rank: 'Royal Flush', emoji: '🏆' },
                    { rank: 'Straight Flush', emoji: '⭐' },
                    { rank: 'Four of a Kind', emoji: '🎰' },
                    { rank: 'Full House', emoji: '🏠' },
                    { rank: 'Flush', emoji: '♠️' },
                    { rank: 'Straight', emoji: '📈' },
                    { rank: 'Three of a Kind', emoji: '🎲' },
                    { rank: 'Two Pair', emoji: '✌️' },
                    { rank: 'One Pair', emoji: '👫' },
                    { rank: 'High Card', emoji: '🃏' },
                  ].map((h, i) => (
                    <div key={h.rank} className="flex items-center gap-1 text-white/50">
                      <span>{h.emoji}</span>
                      <span className={i < 3 ? 'text-cyber-green' : ''}>{h.rank}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="diagram-box p-3 bg-cyber-green/5 border-cyber-green/30">
                <p className="text-xs text-cyber-green">
                  ✨ Toată logica evaluării rulează <strong>client-side</strong> - 
                  API-ul doar servește cărți!
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
