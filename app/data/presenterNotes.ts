export interface SlideNote {
  title: string
  icon: string
  notes: string[]
  keyPoints?: string[]
  duration?: string
}

export const presenterNotes: SlideNote[] = [
  // Slide 1: Title
  {
    title: 'Dezvoltare Web - În Profunzime',
    icon: '🚀',
    notes: [
      'Bun venit la cursul de astăzi! Vom explora în profunzime cum funcționează tehnologiile web.',
      'Menționează că aceasta este o continuare a cursurilor despre JavaScript și CSS.',
      'Prezintă pe scurt cele 5 teme principale pe care le vom acoperi.',
      'Întreabă studenții ce experiență au cu aceste tehnologii.',
    ],
    keyPoints: [
      'Browser - motorul din spatele experienței web',
      'JavaScript - cum funcționează în spate',
      'REST API - comunicarea client-server',
      'Docker - containere și deployment',
      'GitHub Actions - automatizare CI/CD',
    ],
    duration: '2 min',
  },

  // Slide 2: Browser
  {
    title: 'Cum funcționează Browser-ul',
    icon: '🌐',
    notes: [
      'Browser-ul este mult mai complex decât pare - este practic un mini sistem de operare.',
      'Explică fiecare componentă și rolul ei specific.',
      'Interfața Utilizator: tot ce vede user-ul (URL bar, butoane, tabs)',
      'Browser Engine: coordonează comunicarea între UI și rendering',
      'Rendering Engine: Blink (Chrome), Gecko (Firefox), WebKit (Safari)',
      'Networking: gestionează toate cererile HTTP/HTTPS',
      'JS Engine: V8 (Chrome/Node), SpiderMonkey (Firefox), JavaScriptCore (Safari)',
      'Data Storage: localStorage, sessionStorage, IndexedDB, cookies',
    ],
    keyPoints: [
      'Chrome folosește V8 și Blink',
      'Firefox folosește SpiderMonkey și Gecko',
      'Safari folosește JavaScriptCore și WebKit',
    ],
    duration: '4 min',
  },

  // Slide 3: URL to Pixels
  {
    title: 'De la URL la Pixeli',
    icon: '🎨',
    notes: [
      'Acesta este procesul complet care se întâmplă când tastezi o adresă în browser.',
      'DNS Lookup: browser-ul întreabă DNS server-ul "care este IP-ul pentru google.com?"',
      'TCP Connection: se stabilește o conexiune sigură (TLS handshake pentru HTTPS)',
      'HTTP Request: browser-ul trimite cererea GET cu headers (User-Agent, Accept, etc.)',
      'Server Response: serverul trimite HTML, apoi CSS și JS',
      'Parsing: HTML devine DOM tree, CSS devine CSSOM',
      'Rendering: DOM + CSSOM = Render Tree → Layout → Paint → Composite',
    ],
    keyPoints: [
      'Critical Rendering Path este esențial pentru performanță',
      'CSS blochează rendering-ul (render-blocking)',
      'JavaScript blochează parsing-ul (parser-blocking)',
      'De aceea punem CSS în <head> și JS la final sau cu async/defer',
    ],
    duration: '5 min',
  },

  // Slide 4: JavaScript
  {
    title: 'Cum funcționează JavaScript',
    icon: '⚡',
    notes: [
      'JavaScript este single-threaded dar non-blocking. Cum e posibil?',
      'Memory Heap: aici sunt stocate toate obiectele, array-urile și funcțiile',
      'Call Stack: structură LIFO care ține evidența execuției',
      'Exemplu practic: când apelezi o funcție, ea se adaugă pe stivă. Când returnează, se scoate.',
      'V8 folosește JIT compilation - combină interpretare cu compilare pentru performanță optimă.',
    ],
    keyPoints: [
      'Single-threaded = o singură operație la un moment dat',
      'Non-blocking = operațiile async nu blochează execuția',
      'Call Stack overflow = "Maximum call stack size exceeded"',
      'JIT = Just-In-Time compilation',
    ],
    duration: '5 min',
  },

  // Slide 5: Event Loop
  {
    title: 'Bucla de Evenimente',
    icon: '🔄',
    notes: [
      'Event Loop este "magia" care face JavaScript să pară asincron.',
      'Când apelezi setTimeout sau fetch, operația merge la Web APIs.',
      'Web APIs sunt implementate de browser, nu de JavaScript!',
      'Când operația se termină, callback-ul merge în Task Queue.',
      'Microtask Queue (Promises) are prioritate mai mare decât Task Queue.',
      'Event Loop: verifică dacă Call Stack e gol → procesează microtasks → procesează tasks.',
      'Demonstrează cu un exemplu: console.log, setTimeout(0), Promise.resolve().then()',
    ],
    keyPoints: [
      'Microtasks se execută înaintea tasks',
      'Promise callbacks sunt microtasks',
      'setTimeout callbacks sunt tasks (macrotasks)',
      'requestAnimationFrame rulează înainte de paint',
    ],
    duration: '6 min',
  },

  // Slide 6: REST API
  {
    title: 'Cum funcționează REST API',
    icon: '🔄',
    notes: [
      'REST = Representational State Transfer - un stil arhitectural pentru API-uri.',
      'Client trimite cereri HTTP, server răspunde cu date (de obicei JSON).',
      'Explică fiecare metodă HTTP și când se folosește.',
      'GET: citire date, nu modifică nimic pe server',
      'POST: creare resurse noi',
      'PUT: actualizare completă a unei resurse',
      'PATCH: actualizare parțială',
      'DELETE: ștergere resurse',
      'Arată exemplul de JSON response - structură tipică cu status și data.',
    ],
    keyPoints: [
      'GET este idempotent și cacheable',
      'POST nu este idempotent',
      'PUT vs PATCH: înlocuire completă vs modificare parțială',
      'DELETE ar trebui să fie idempotent',
    ],
    duration: '5 min',
  },

  // Slide 7: REST Details
  {
    title: 'Principii REST',
    icon: '📋',
    notes: [
      'REST are 6 constrângeri arhitecturale principale.',
      'Stateless: fiecare cerere conține toate informațiile necesare. Serverul nu ține sesiuni.',
      'Client-Server: separarea clară a responsabilităților.',
      'Cacheable: răspunsurile pot fi marcate ca cacheable.',
      'Uniform Interface: URL-uri predictibile și consistente.',
      'Explică codurile de status HTTP și când le întâlnești.',
      'Arată pattern-ul RESTful pentru URL-uri: /users, /users/:id',
    ],
    keyPoints: [
      '2xx = succes, 3xx = redirect, 4xx = eroare client, 5xx = eroare server',
      '200 OK, 201 Created, 204 No Content',
      '400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found',
      '500 Internal Server Error, 503 Service Unavailable',
    ],
    duration: '4 min',
  },

  // Slide 8: Docker Intro
  {
    title: 'Ce este Docker?',
    icon: '🐳',
    notes: [
      'Docker rezolvă problema clasică "Merge pe mașina mea!"',
      'În modul tradițional, aplicațiile împart dependințele sistemului.',
      'Conflicte: App1 are nevoie de Node 14, App2 de Node 18.',
      'Containerele izolează fiecare aplicație cu propriile dependințe.',
      'Containere vs VMs: containerele sunt mult mai ușoare (MB vs GB).',
      'Containerele împart kernel-ul sistemului de operare.',
      'Explică beneficiile: consistență, viteză, izolare, scalabilitate.',
    ],
    keyPoints: [
      'Container ≠ VM: containerele împart OS kernel',
      'Containere pornesc în secunde, VM-uri în minute',
      'Imaginea Docker este read-only, containerul adaugă un layer writable',
      'Docker Engine rulează pe Linux, Mac, Windows',
    ],
    duration: '5 min',
  },

  // Slide 9: Docker How
  {
    title: 'Cum funcționează Docker',
    icon: '📦',
    notes: [
      'Fluxul Docker: Dockerfile → Image → Container → Registry',
      'Dockerfile: fișier text cu instrucțiuni de build',
      'Image: șablon read-only, imutabil',
      'Container: instanță rulabilă a unei imagini',
      'Registry: depozit pentru imagini (Docker Hub, GHCR)',
      'Explică conceptele: Layers, Volumes, Networks, Compose',
      'Layers permit caching eficient la rebuild',
      'Volumes persistă date în afara containerului',
    ],
    keyPoints: [
      'docker build creează imaginea',
      'docker run pornește containerul',
      'docker push urcă imaginea în registry',
      'docker-compose orchestrează multiple containere',
    ],
    duration: '5 min',
  },

  // Slide 10: Dockerfile
  {
    title: 'Dockerfile Simplu',
    icon: '📄',
    notes: [
      'Parcurge fiecare instrucțiune și explică ce face.',
      'FROM: punctul de start - imaginea de bază (node:20-alpine e mică ~50MB)',
      'WORKDIR: setează directorul curent în container',
      'COPY package*.json: copiază doar fișierele package pentru cache eficient',
      'RUN npm ci: instalează dependințele (ci e mai rapid și mai sigur decât install)',
      'COPY . .: copiază restul codului',
      'EXPOSE: documentează portul (nu deschide efectiv portul)',
      'CMD: comanda care rulează când pornește containerul',
    ],
    keyPoints: [
      'Ordinea instrucțiunilor contează pentru caching',
      'Copiază package.json separat pentru a cache-ui npm install',
      'Folosește .dockerignore pentru a exclude node_modules',
      'Multi-stage builds pentru imagini mai mici în producție',
    ],
    duration: '5 min',
  },

  // Slide 11: GitHub Actions
  {
    title: 'GitHub Actions',
    icon: '🔄',
    notes: [
      'GitHub Actions = CI/CD integrat direct în GitHub.',
      'CI = Continuous Integration: build și test automat la fiecare push',
      'CD = Continuous Deployment: deploy automat după teste trecute',
      'Workflow: procesul complet definit în YAML',
      'Job: set de pași care rulează pe același runner',
      'Step: task individual (action sau script shell)',
      'Runner: mașina virtuală care execută job-urile',
      'Actions Marketplace: mii de acțiuni reutilizabile',
    ],
    keyPoints: [
      'Workflow-urile sunt în .github/workflows/',
      'Fișierele sunt YAML (.yml)',
      'Runners: ubuntu-latest, windows-latest, macos-latest',
      'Secrets sunt criptate și accesibile în workflow',
    ],
    duration: '5 min',
  },

  // Slide 12: GitHub Actions File
  {
    title: 'Workflow GitHub Actions',
    icon: '📝',
    notes: [
      'Parcurge fișierul YAML linie cu linie.',
      'name: numele afișat în UI-ul GitHub',
      'on: evenimentele care declanșează workflow-ul',
      'jobs: definește job-urile (pot rula în paralel)',
      'runs-on: specifică runner-ul (ubuntu-latest e cel mai comun)',
      'steps: lista de pași executați secvențial',
      'uses: folosește o acțiune din marketplace',
      'run: execută comenzi shell',
      'Menționează acțiunile populare din marketplace.',
    ],
    keyPoints: [
      'actions/checkout - clonează repo-ul',
      'actions/setup-node - instalează Node.js',
      'actions/cache - cache pentru dependințe',
      'Folosește secrets pentru credențiale sensibile',
    ],
    duration: '5 min',
  },

  // Slide 13: Thank You
  {
    title: 'Mulțumesc!',
    icon: '🎉',
    notes: [
      'Recapitulează rapid cele 5 teme principale.',
      'Încurajează studenții să practice aceste concepte.',
      'Sugerează proiecte practice: build o aplicație full-stack, containerizează-o, adaugă CI/CD.',
      'Menționează resurse suplimentare: MDN, Docker docs, GitHub Actions docs.',
      'Deschide sesiunea de întrebări.',
      'Mulțumește pentru atenție!',
    ],
    keyPoints: [
      'Practica face perfect',
      'Construiește proiecte reale',
      'Contribuie la open source',
      'Învață din greșeli',
    ],
    duration: '3 min',
  },
]

