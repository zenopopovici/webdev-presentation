# 🃏 Poker Game

Un joc simplu de **5-Card Draw Poker** construit cu:

- ⚛️ **Next.js 14** (React)
- 🎴 **Deck of Cards API** ([deckofcardsapi.com](https://deckofcardsapi.com/))
- 🎨 **Tailwind CSS**
- 🐳 **Docker** pentru deployment

## 🚀 Quick Start

### Local Development

```bash
# Instalează dependințele
npm install

# Pornește dev server
npm run dev

# Deschide http://localhost:3030
```

### Docker

```bash
# Build și run cu Docker Compose
docker compose up -d

# Sau manual
docker build -t poker-game .
docker run -p 3000:3000 poker-game
```

## 🎮 Cum să joci

1. **Deal Cards** - Primești 5 cărți random
2. **Select to Discard** - Click pe cărțile pe care vrei să le schimbi
3. **Draw** - Primești cărți noi pentru cele selectate
4. **See Your Hand** - Află ce mână ai obținut!

## 🏆 Hand Rankings

| Rank | Mână | Descriere |
|------|------|-----------|
| 1 | 🏆 Royal Flush | A-K-Q-J-10 aceeași culoare |
| 2 | ⭐ Straight Flush | 5 consecutive aceeași culoare |
| 3 | 🎰 Four of a Kind | 4 cărți identice |
| 4 | 🏠 Full House | 3 + 2 identice |
| 5 | ♠️ Flush | 5 aceeași culoare |
| 6 | 📈 Straight | 5 consecutive |
| 7 | 🎲 Three of a Kind | 3 identice |
| 8 | ✌️ Two Pair | 2 perechi |
| 9 | 👫 One Pair | 1 pereche |
| 10 | 🃏 High Card | Nimic |

## 📡 API Endpoints folosite

```bash
# Shuffle new deck
GET https://deckofcardsapi.com/api/deck/new/shuffle/

# Draw cards
GET https://deckofcardsapi.com/api/deck/{deck_id}/draw/?count=5
```

## 🐳 Deploy cu GitHub Actions

Workflow-ul CI/CD:

1. **Test** - Rulează linting și teste
2. **Build** - Construiește aplicația
3. **Docker** - Push imagine la GitHub Container Registry
4. **Deploy** - (opțional) SSH deploy la server

```bash
# Pull imaginea de pe GHCR
docker pull ghcr.io/USERNAME/poker-game:latest
```

## 📁 Structura Proiectului

```
examples/
├── app/
│   ├── components/
│   │   └── PokerGame.tsx    # Componenta jocului
│   ├── globals.css          # Tailwind CSS
│   ├── layout.tsx           # Layout principal
│   └── page.tsx             # Pagina principală
├── .github/
│   └── workflows/
│       └── ci.yml           # GitHub Actions
├── Dockerfile               # Multi-stage Docker build
├── docker-compose.yml       # Docker Compose config
├── next.config.js           # Next.js config (standalone)
├── package.json             # Dependencies
├── tailwind.config.js       # Tailwind config
└── README.md                # Acest fișier
```

## 📚 Resurse

- [Deck of Cards API](https://deckofcardsapi.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Docker Documentation](https://docs.docker.com/)
- [GitHub Actions](https://docs.github.com/en/actions)

---

Made with ❤️ for teaching purposes
