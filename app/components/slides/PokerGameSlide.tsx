'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SlideProps {
  contentVisible?: boolean
}

interface Card {
  code: string
  image: string
  value: string
  suit: string
}

interface DeckResponse {
  success: boolean
  deck_id: string
  remaining: number
}

interface DrawResponse {
  success: boolean
  deck_id: string
  cards: Card[]
  remaining: number
}

export default function PokerGameSlide({ contentVisible = true }: SlideProps) {
  const [deckId, setDeckId] = useState<string | null>(null)
  const [cards, setCards] = useState<Card[]>([])
  const [selectedCards, setSelectedCards] = useState<Set<number>>(new Set())
  const [loading, setLoading] = useState(false)
  const [gamePhase, setGamePhase] = useState<'start' | 'drawn' | 'final'>('start')
  const [remaining, setRemaining] = useState(52)
  const [handRank, setHandRank] = useState<string>('')

  // Evaluate poker hand
  const evaluateHand = useCallback((hand: Card[]): string => {
    if (hand.length !== 5) return ''

    const values = hand.map(c => {
      if (c.value === 'ACE') return 14
      if (c.value === 'KING') return 13
      if (c.value === 'QUEEN') return 12
      if (c.value === 'JACK') return 11
      return parseInt(c.value) || 10
    }).sort((a, b) => a - b)

    const suits = hand.map(c => c.suit)
    const valueCounts: Record<number, number> = {}
    values.forEach(v => { valueCounts[v] = (valueCounts[v] || 0) + 1 })
    const counts = Object.values(valueCounts).sort((a, b) => b - a)

    const isFlush = suits.every(s => s === suits[0])
    const isStraight = values.every((v, i) => i === 0 || v === values[i - 1] + 1) ||
      (values.join(',') === '2,3,4,5,14') // Ace-low straight

    if (isFlush && isStraight && values[4] === 14 && values[0] === 10) return '🏆 ROYAL FLUSH!'
    if (isFlush && isStraight) return '⭐ Straight Flush!'
    if (counts[0] === 4) return '🎰 Four of a Kind!'
    if (counts[0] === 3 && counts[1] === 2) return '🏠 Full House!'
    if (isFlush) return '♠️ Flush!'
    if (isStraight) return '📈 Straight!'
    if (counts[0] === 3) return '🎲 Three of a Kind!'
    if (counts[0] === 2 && counts[1] === 2) return '✌️ Two Pair!'
    if (counts[0] === 2) return '👫 One Pair'
    return '🃏 High Card'
  }, [])

  // Start new game - shuffle deck and draw 5 cards
  const startNewGame = useCallback(async () => {
    setLoading(true)
    setSelectedCards(new Set())
    setHandRank('')
    
    try {
      // Shuffle new deck
      const shuffleRes = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      const shuffleData: DeckResponse = await shuffleRes.json()
      
      if (shuffleData.success) {
        setDeckId(shuffleData.deck_id)
        
        // Draw 5 cards
        const drawRes = await fetch(`https://deckofcardsapi.com/api/deck/${shuffleData.deck_id}/draw/?count=5`)
        const drawData: DrawResponse = await drawRes.json()
        
        if (drawData.success) {
          setCards(drawData.cards)
          setRemaining(drawData.remaining)
          setGamePhase('drawn')
        }
      }
    } catch (error) {
      console.error('Error starting game:', error)
    }
    
    setLoading(false)
  }, [])

  // Toggle card selection for discard
  const toggleCardSelection = useCallback((index: number) => {
    if (gamePhase !== 'drawn') return
    
    setSelectedCards(prev => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }, [gamePhase])

  // Discard selected cards and draw new ones
  const discardAndDraw = useCallback(async () => {
    if (!deckId || selectedCards.size === 0) {
      // No cards to discard, just evaluate
      setHandRank(evaluateHand(cards))
      setGamePhase('final')
      return
    }
    
    setLoading(true)
    
    try {
      // Draw new cards for the discarded ones
      const drawRes = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${selectedCards.size}`)
      const drawData: DrawResponse = await drawRes.json()
      
      if (drawData.success) {
        // Replace selected cards with new ones
        const newCards = [...cards]
        let newCardIndex = 0
        selectedCards.forEach(index => {
          newCards[index] = drawData.cards[newCardIndex++]
        })
        
        setCards(newCards)
        setRemaining(drawData.remaining)
        setSelectedCards(new Set())
        setHandRank(evaluateHand(newCards))
        setGamePhase('final')
      }
    } catch (error) {
      console.error('Error drawing cards:', error)
    }
    
    setLoading(false)
  }, [deckId, selectedCards, cards, evaluateHand])

  // Hold all cards (no discard)
  const holdAll = useCallback(() => {
    setHandRank(evaluateHand(cards))
    setGamePhase('final')
  }, [cards, evaluateHand])

  return (
    <div className="w-full h-full flex flex-col p-[clamp(0.75rem,1.5vw,1.5rem)] overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-[clamp(0.5rem,1vw,1rem)] flex-shrink-0"
      >
        <span className="text-cyber-green font-display text-[clamp(0.75rem,1vw,0.875rem)] tracking-widest uppercase">Live Demo</span>
        <h1 className="text-[clamp(2rem,4vw,3rem)] font-body font-bold mt-1">
          🃏 <span className="text-cyber-green">Poker</span> Game - API în Acțiune
        </h1>
        <p className="text-white/50 text-[clamp(0.75rem,1vw,0.875rem)] mt-1">
          Folosind <code className="text-cyber-cyan">deckofcardsapi.com</code> - un API REST real
        </p>
      </motion.div>

      <AnimatePresence>
        {contentVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex-1 flex flex-col min-h-0 overflow-hidden"
          >
            {/* Game Area */}
            <div className="flex-1 flex flex-col items-center justify-center min-h-0 overflow-auto">
              {/* Cards Display */}
              <div className="flex gap-4 mb-8">
                {gamePhase === 'start' ? (
                  // Show card backs
                  Array(5).fill(null).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, rotateY: 180 }}
                      animate={{ opacity: 1, rotateY: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="w-28 h-40 rounded-lg bg-gradient-to-br from-cyber-purple/30 to-cyber-pink/30 border-2 border-white/20 flex items-center justify-center"
                    >
                      <span className="text-4xl opacity-30">🂠</span>
                    </motion.div>
                  ))
                ) : (
                  // Show actual cards
                  cards.map((card, i) => (
                    <motion.button
                      key={card.code}
                      initial={{ opacity: 0, rotateY: 180, y: 50 }}
                      animate={{ 
                        opacity: 1, 
                        rotateY: 0, 
                        y: selectedCards.has(i) ? -20 : 0,
                        scale: selectedCards.has(i) ? 1.05 : 1
                      }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => toggleCardSelection(i)}
                      disabled={gamePhase === 'final'}
                      className={`relative w-28 h-40 rounded-lg overflow-hidden transition-all ${
                        gamePhase === 'drawn' ? 'cursor-pointer hover:shadow-lg hover:shadow-cyber-cyan/30' : ''
                      } ${selectedCards.has(i) ? 'ring-2 ring-cyber-pink shadow-lg shadow-cyber-pink/30' : ''}`}
                    >
                      <img 
                        src={card.image} 
                        alt={`${card.value} of ${card.suit}`}
                        className="w-full h-full object-cover"
                      />
                      {selectedCards.has(i) && gamePhase === 'drawn' && (
                        <div className="absolute top-1 right-1 bg-cyber-pink text-white text-xs px-2 py-1 rounded">
                          DISCARD
                        </div>
                      )}
                    </motion.button>
                  ))
                )}
              </div>

              {/* Hand Rank Display */}
              {handRank && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 text-3xl font-display font-bold text-cyber-green"
                >
                  {handRank}
                </motion.div>
              )}

              {/* Instructions */}
              {gamePhase === 'drawn' && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-white/60 text-sm mb-4"
                >
                  Click pe cărți pentru a le selecta pentru discard, apoi apasă &quot;Draw&quot;
                </motion.p>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4">
                {gamePhase === 'start' && (
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={startNewGame}
                    disabled={loading}
                    className="px-8 py-3 bg-gradient-to-r from-cyber-green to-cyber-cyan text-black font-display font-bold rounded-lg disabled:opacity-50"
                  >
                    {loading ? '🔄 Se încarcă...' : '🎴 Deal Cards'}
                  </motion.button>
                )}

                {gamePhase === 'drawn' && (
                  <>
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={holdAll}
                      disabled={loading}
                      className="px-6 py-3 bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/50 font-display font-bold rounded-lg disabled:opacity-50"
                    >
                      ✋ Hold All
                    </motion.button>
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={discardAndDraw}
                      disabled={loading}
                      className="px-6 py-3 bg-gradient-to-r from-cyber-pink to-cyber-purple text-white font-display font-bold rounded-lg disabled:opacity-50"
                    >
                      {loading ? '🔄...' : `🔄 Draw ${selectedCards.size > 0 ? `(${selectedCards.size})` : ''}`}
                    </motion.button>
                  </>
                )}

                {gamePhase === 'final' && (
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={startNewGame}
                    disabled={loading}
                    className="px-8 py-3 bg-gradient-to-r from-cyber-purple to-cyber-pink text-white font-display font-bold rounded-lg disabled:opacity-50"
                  >
                    {loading ? '🔄 Se încarcă...' : '🔄 New Game'}
                  </motion.button>
                )}
              </div>
            </div>

            {/* API Info Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 p-4 bg-black/30 rounded-lg border border-white/10"
            >
              <div className="flex items-center justify-between text-xs font-display">
                <div className="flex items-center gap-6">
                  <span className="text-white/40">
                    API: <span className="text-cyber-cyan">deckofcardsapi.com</span>
                  </span>
                  {deckId && (
                    <span className="text-white/40">
                      Deck ID: <span className="text-cyber-purple">{deckId}</span>
                    </span>
                  )}
                  <span className="text-white/40">
                    Remaining: <span className="text-cyber-green">{remaining}</span>
                  </span>
                </div>
                <div className="text-white/30">
                  GET /api/deck/new/shuffle → GET /api/deck/{'{id}'}/draw
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
