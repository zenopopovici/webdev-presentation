# 💡 Web Development - Tips & Tricks

O prezentare interactivă pentru studenți despre conceptele fundamentale ale dezvoltării web moderne.

## 📋 Cuprins

| # | Topic | Descriere |
|---|-------|-----------|
| 1 | 🌐 **Browser** | Cum funcționează un browser - componentele și arhitectura |
| 2 | 🎨 **URL to Pixels** | Procesul complet: DNS → TCP → TLS → HTTP → DOM → Render |
| 3 | ⚡ **JavaScript** | V8 Engine, Memory Heap, Call Stack, JIT Compilation |
| 4 | 🔄 **Event Loop** | Single-threaded magic: Web APIs, Task Queue, Microtasks |
| 5 | 📡 **REST API** | HTTP methods, Status codes, JSON, Client-Server |
| 6 | 📋 **REST Principles** | Stateless, Cacheable, Uniform Interface |
| 7 | 🃏 **Poker Game Demo** | Live demo folosind [deckofcardsapi.com](https://deckofcardsapi.com/) |
| 8 | 🛠️ **Poker Code** | Behind the scenes - cum am construit jocul |
| 9 | 🔒 **Security** | XSS, CSRF, SQL Injection, CORS, HTTPS, Hashing |
| 10 | 🐳 **Docker Intro** | Containers vs VMs, Images, problema "works on my machine" |
| 11 | 📦 **Docker How** | Dockerfile, Layers, Volumes, Registry |
| 12 | 📄 **Dockerfile** | Exemplu practic cu Next.js |
| 13 | 🔄 **CI/CD** | Continuous Integration & Continuous Deployment |
| 14 | 🚀 **GitHub Actions** | Workflows, Jobs, Steps, Runners |
| 15 | 📝 **Actions File** | Exemplu YAML complet comentat |
| 16 | 🎉 **Thank You** | Recap & next steps |

## 🚀 Quick Start

```bash
# Instalare
cd teaching-presentation
npm install

# Development
npm run dev

# Deschide http://localhost:3001
```

## ⌨️ Keyboard Shortcuts

| Key | Acțiune |
|-----|---------|
| `→` / `Space` / `Enter` | Următorul pas / slide |
| `←` / `Backspace` | Slide-ul anterior |
| `Home` | Primul slide |
| `End` | Ultimul slide |
| `G` | Go to slide (introduce numărul) |
| `P` | Deschide Presenter Mode |

## 🎤 Presenter Mode

Apasă `P` sau click pe "🎤 Prezentator" pentru:

- Note detaliate pentru fiecare slide
- Preview slide curent + următor
- Timer pentru prezentare
- Navigare rapidă între slide-uri

## 📁 Structura Proiectului

```
teaching-presentation/
├── app/
│   ├── components/slides/    # Toate slide-urile
│   ├── data/presenterNotes.ts # Note pentru prezentator
│   ├── lib/slides.ts         # Configurația slide-urilor
│   ├── presenter/            # Presenter view
│   └── slide/[slug]/         # Dynamic routing
├── examples/                  # Exemple complete
│   ├── app/                  # Poker Game Next.js app
│   ├── Dockerfile            # Docker multi-stage build
│   ├── docker-compose.yml    # Easy deployment
│   └── .github/workflows/    # CI/CD pipeline
└── README.md
```

## 🃏 Poker Game Demo

Un joc funcțional de 5-Card Draw Poker care demonstrează:

- REST API calls cu `fetch()`
- React state management
- Async/await pattern

```bash
# Rulează cu Docker
cd examples
docker compose up -d
# Deschide http://localhost:3030
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI**: React 18 + Tailwind CSS
- **Animații**: Framer Motion
- **Deployment**: Docker + GitHub Actions

## 📚 Resurse Adiționale

- [MDN Web Docs](https://developer.mozilla.org/)
- [Docker Documentation](https://docs.docker.com/)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Deck of Cards API](https://deckofcardsapi.com/)

---

## 📧 Contact

**Zeno Graffino**

- 📧 Email: [zeno@graffino.com](mailto:zeno@graffino.com)
- 📱 Telefon: 0744 684 804

---

*Built with ❤️ for teaching web development*
