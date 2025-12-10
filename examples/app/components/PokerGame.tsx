'use client'

import { useState, useCallback } from 'react'

// ===========================================
// TIPURI TypeScript
// ===========================================

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

// ===========================================
// COMPONENTA POKER GAME
// ===========================================

export default function PokerGame() {
  const [deckId, setDeckId] = useState<string | null>(null)
  const [cards, setCards] = useState<Card[]>([])
  const [selectedCards, setSelectedCards] = useState<Set<number>>(new Set())
  const [loading, setLoading] = useState(false)
  const [gamePhase, setGamePhase] = useState<'start' | 'drawn' | 'final'>('start')
  const [remaining, setRemaining] = useState(52)
  const [handRank, setHandRank] = useState<string>('')

  // Evaluare mână poker
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
      (values.join(',') === '2,3,4,5,14')

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

  // Start joc nou
  const startNewGame = useCallback(async () => {
    setLoading(true)
    setSelectedCards(new Set())
    setHandRank('')
    
    try {
      const shuffleRes = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      const shuffleData: DeckResponse = await shuffleRes.json()
      
      if (shuffleData.success) {
        setDeckId(shuffleData.deck_id)
        
        const drawRes = await fetch(`https://deckofcardsapi.com/api/deck/${shuffleData.deck_id}/draw/?count=5`)
        const drawData: DrawResponse = await drawRes.json()
        
        if (drawData.success) {
          setCards(drawData.cards)
          setRemaining(drawData.remaining)
          setGamePhase('drawn')
        }
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Eroare la conectare. Verifică conexiunea la internet.')
    }
    
    setLoading(false)
  }, [])

  // Toggle selecție carte
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

  // Discard și draw
  const discardAndDraw = useCallback(async () => {
    if (!deckId || selectedCards.size === 0) {
      setHandRank(evaluateHand(cards))
      setGamePhase('final')
      return
    }
    
    setLoading(true)
    
    try {
      const drawRes = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${selectedCards.size}`)
      const drawData: DrawResponse = await drawRes.json()
      
      if (drawData.success) {
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
      console.error('Error:', error)
    }
    
    setLoading(false)
  }, [deckId, selectedCards, cards, evaluateHand])

  // Hold all
  const holdAll = useCallback(() => {
    setHandRank(evaluateHand(cards))
    setGamePhase('final')
  }, [cards, evaluateHand])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-green-800 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">🃏 5-Card Draw Poker</h1>
          <p className="text-green-200 text-sm">
            Folosind{' '}
            <a href="https://deckofcardsapi.com/" target="_blank" rel="noopener noreferrer" className="underline">
              deckofcardsapi.com
            </a>
          </p>
        </div>

        {/* Game Area */}
        <div className="bg-green-800/50 rounded-2xl p-8 border-4 border-yellow-600/30">
          {/* Cards */}
          <div className="flex justify-center gap-4 mb-8">
            {gamePhase === 'start' ? (
              Array(5).fill(null).map((_, i) => (
                <div key={i} className="w-24 h-36 rounded-lg bg-blue-900 border-2 border-blue-700 flex items-center justify-center shadow-lg">
                  <span className="text-4xl opacity-50">🂠</span>
                </div>
              ))
            ) : (
              cards.map((card, i) => (
                <button
                  key={card.code}
                  onClick={() => toggleCardSelection(i)}
                  disabled={gamePhase === 'final'}
                  className={`relative w-24 h-36 rounded-lg overflow-hidden shadow-lg transition-all duration-200 transform
                    ${gamePhase === 'drawn' ? 'cursor-pointer hover:scale-105' : ''}
                    ${selectedCards.has(i) ? 'ring-4 ring-red-500 -translate-y-4' : ''}`}
                >
                  <img src={card.image} alt={`${card.value} of ${card.suit}`} className="w-full h-full object-cover" />
                  {selectedCards.has(i) && gamePhase === 'drawn' && (
                    <div className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded font-bold">
                      DISCARD
                    </div>
                  )}
                </button>
              ))
            )}
          </div>

          {/* Hand Rank */}
          {handRank && (
            <div className="text-center mb-6">
              <span className="text-3xl font-bold text-yellow-400 bg-black/30 px-6 py-2 rounded-full">
                {handRank}
              </span>
            </div>
          )}

          {/* Instructions */}
          {gamePhase === 'drawn' && (
            <p className="text-center text-green-200 text-sm mb-4">
              Click pe cărți pentru a le selecta pentru discard, apoi apasă &quot;Draw&quot;
            </p>
          )}

          {/* Buttons */}
          <div className="flex justify-center gap-4">
            {gamePhase === 'start' && (
              <button
                onClick={startNewGame}
                disabled={loading}
                className="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg text-lg disabled:opacity-50 transition-colors"
              >
                {loading ? '🔄 Se încarcă...' : '🎴 Deal Cards'}
              </button>
            )}

            {gamePhase === 'drawn' && (
              <>
                <button onClick={holdAll} disabled={loading} className="px-6 py-3 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-lg disabled:opacity-50 transition-colors">
                  ✋ Hold All
                </button>
                <button onClick={discardAndDraw} disabled={loading} className="px-6 py-3 bg-red-500 hover:bg-red-400 text-white font-bold rounded-lg disabled:opacity-50 transition-colors">
                  {loading ? '🔄...' : `🔄 Draw ${selectedCards.size > 0 ? `(${selectedCards.size})` : ''}`}
                </button>
              </>
            )}

            {gamePhase === 'final' && (
              <button
                onClick={startNewGame}
                disabled={loading}
                className="px-8 py-3 bg-purple-500 hover:bg-purple-400 text-white font-bold rounded-lg text-lg disabled:opacity-50 transition-colors"
              >
                {loading ? '🔄 Se încarcă...' : '🔄 New Game'}
              </button>
            )}
          </div>
        </div>

        {/* API Info */}
        <div className="mt-6 p-4 bg-black/30 rounded-lg text-sm text-green-200">
          <div className="flex justify-between items-center">
            <div className="flex gap-6">
              <span>API: <code className="text-cyan-400">deckofcardsapi.com</code></span>
              {deckId && <span>Deck ID: <code className="text-purple-400">{deckId}</code></span>}
              <span>Remaining: <code className="text-green-400">{remaining}</code></span>
            </div>
          </div>
        </div>

        {/* Hand Rankings */}
        <div className="mt-6 p-4 bg-black/20 rounded-lg">
          <h3 className="text-white font-bold mb-2">🏆 Hand Rankings</h3>
          <div className="grid grid-cols-5 gap-2 text-xs text-green-200">
            <span>🏆 Royal Flush</span>
            <span>⭐ Straight Flush</span>
            <span>🎰 Four of a Kind</span>
            <span>🏠 Full House</span>
            <span>♠️ Flush</span>
            <span>📈 Straight</span>
            <span>🎲 Three of a Kind</span>
            <span>✌️ Two Pair</span>
            <span>👫 One Pair</span>
            <span>🃏 High Card</span>
          </div>
        </div>
      </div>
    </div>
  )
}
