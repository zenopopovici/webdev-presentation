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
    title: 'Web Development - Tips & Tricks',
    icon: '💡',
    notes: [
      'Bun venit la cursul de astăzi! Vom explora tips & tricks esențiale pentru dezvoltarea web.',
      'Menționează că aceasta este o continuare a cursurilor despre JavaScript și CSS.',
      'Prezintă pe scurt cele 5 teme principale pe care le vom acoperi.',
      'Întreabă studenții ce experiență au cu aceste tehnologii.',
    ],
    keyPoints: [
      'Browser - motorul din spatele experienței web',
      'JavaScript - cum funcționează în spate',
      'REST API - comunicarea client-server',
      'Docker - containers și deployment',
      'GitHub Actions - automatizare CI/CD',
    ],
    duration: '2 min',
  },

  // Slide 2: Meme Intro
  {
    title: 'You Little Rebel',
    icon: '😎',
    notes: [
      'Slide de relaxare și umor pentru a crea o atmosferă prietenoasă.',
      'Perfect moment pentru a sparge gheața și a face studenții să se simtă confortabil.',
      'Nu trebuie să explici prea mult - lasă meme-ul să vorbească de la sine!',
    ],
    keyPoints: [
      'Break the ice',
      'Create friendly atmosphere',
      'Keep it light',
    ],
    duration: '30 sec',
  },

  // Slide 3: Browser
  {
    title: 'Cum funcționează Browser-ul',
    icon: '🌐',
    notes: [
      'Browser-ul este mult mai complex decât pare - este practic un mini sistem de operare.',
      'Explică fiecare componentă și rolul ei specific.',
      'User Interface: tot ce vede user-ul (URL bar, butoane, tabs)',
      'Browser Engine: coordonează comunicarea între UI și rendering',
      'Rendering Engine: Blink (Chrome), Gecko (Firefox), WebKit (Safari)',
      'Networking: gestionează toate request-urile HTTP/HTTPS',
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

  // Slide 4: URL to Pixels
  {
    title: 'De la URL la Pixels',
    icon: '🎨',
    notes: [
      'Acesta este procesul complet care se întâmplă când tastezi o adresă în browser.',
      'DNS = Domain Name System: "agenda telefonică" a internetului. Traduce google.com → 142.250.185.78 (IP address).',
      'TCP = Transmission Control Protocol: protocol care asigură livrarea sigură a datelor. Se face un "handshake" înainte de transfer.',
      'TLS = Transport Layer Security: criptare pentru HTTPS. Înlocuiește vechiul SSL.',
      'HTTP Request: browser-ul trimite request-ul GET cu headers (User-Agent, Accept, etc.)',
      'HTML devine DOM = Document Object Model: reprezentarea paginii ca arbore de noduri.',
      'CSS devine CSSOM = CSS Object Model: similar cu DOM, dar pentru stiluri.',
      'Rendering: DOM + CSSOM = Render Tree → Layout (poziții) → Paint (pixeli) → Composite (straturi).',
    ],
    keyPoints: [
      'DNS = Domain Name System',
      'TCP = Transmission Control Protocol',
      'TLS = Transport Layer Security (înlocuiește SSL)',
      'DOM = Document Object Model',
      'CSSOM = CSS Object Model',
    ],
    duration: '5 min',
  },

  // Slide 5: JavaScript
  {
    title: 'Cum funcționează JavaScript',
    icon: '⚡',
    notes: [
      'JavaScript este single-threaded dar non-blocking. Cum e posibil? Prin Event Loop!',
      'Memory Heap: zona de memorie nestructurată unde sunt stocate objects, arrays și functions.',
      'Call Stack: structură LIFO (Last In, First Out) care ține evidența execuției - ce funcție rulează acum.',
      'Exemplu practic: când apelezi o funcție, ea se adaugă pe stack (push). Când returnează, se scoate (pop).',
      'V8 (motorul Chrome/Node) folosește JIT = Just-In-Time compilation - combină interpretare cu compilare pentru performanță optimă.',
      'AST = Abstract Syntax Tree: reprezentarea codului ca arbore, folosită de parser.',
    ],
    keyPoints: [
      'LIFO = Last In, First Out',
      'JIT = Just-In-Time compilation',
      'AST = Abstract Syntax Tree',
      'V8 = motorul JavaScript din Chrome și Node.js',
    ],
    duration: '5 min',
  },

  // Slide 6: Event Loop
  {
    title: 'Event Loop',
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

  // Slide 7: REST API
  {
    title: 'Cum funcționează REST API',
    icon: '🔄',
    notes: [
      'REST = Representational State Transfer - un stil arhitectural pentru API-uri, inventat de Roy Fielding în 2000.',
      'API = Application Programming Interface - interfața prin care aplicațiile comunică între ele.',
      'Client trimite HTTP requests, server răspunde cu data (de obicei JSON = JavaScript Object Notation).',
      'HTTP = HyperText Transfer Protocol - protocolul de comunicare pe web.',
      'GET: citire data, nu modifică nimic pe server (safe & idempotent)',
      'POST: creare resurse noi (nu e idempotent - fiecare request creează o resursă nouă)',
      'PUT: update complet al unei resurse (idempotent)',
      'PATCH: update parțial al unei resurse',
      'DELETE: ștergere resurse (idempotent)',
    ],
    keyPoints: [
      'REST = Representational State Transfer',
      'API = Application Programming Interface',
      'JSON = JavaScript Object Notation',
      'HTTP = HyperText Transfer Protocol',
      'Idempotent = același rezultat la multiple requests identice',
    ],
    duration: '5 min',
  },

  // Slide 8: REST Details
  {
    title: 'REST Principles',
    icon: '📋',
    notes: [
      'REST are 6 constraints arhitecturale principale.',
      'Stateless: fiecare request conține toate informațiile necesare. Serverul nu ține sessions.',
      'Client-Server: separarea clară a responsabilităților.',
      'Cacheable: response-urile pot fi marcate ca cacheable.',
      'Uniform Interface: URL-uri predictibile și consistente.',
      'Explică status codes HTTP și când le întâlnești.',
      'Arată pattern-ul RESTful pentru URL-uri: /users, /users/:id',
    ],
    keyPoints: [
      '2xx = success, 3xx = redirect, 4xx = client error, 5xx = server error',
      '200 OK, 201 Created, 204 No Content',
      '400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found',
      '500 Internal Server Error, 503 Service Unavailable',
    ],
    duration: '4 min',
  },

  // Slide 9: Meme - API/HTTP related
  {
    title: 'API Meme',
    icon: '😅',
    notes: [
      'Moment de umor după explicațiile despre REST API.',
      'Perfect pentru a face pauză și a permite studenților să proceseze informațiile.',
      'Tranziție către demo-ul live cu Poker Game.',
    ],
    keyPoints: [
      'Relatable content',
      'Break between topics',
      'Keep engagement high',
    ],
    duration: '30 sec',
  },

  // Slide 10: Poker Game Demo
  {
    title: 'Poker Game - API în Acțiune',
    icon: '🃏',
    notes: [
      'Acesta este un demo LIVE care folosește un API REST real - deckofcardsapi.com.',
      'Arată cum funcționează în practică conceptele despre care am vorbit.',
      'API-ul este gratuit, public, și perfect pentru învățare - nu necesită autentificare.',
      'Flow-ul jocului: 1) GET /new/shuffle - creează un deck nou shuffled, returnează deck_id.',
      '2) GET /deck/{id}/draw/?count=5 - extrage 5 cărți din deck, returnează imaginile și datele.',
      'Explică response-ul JSON: fiecare carte are code (ex: "KH"), image URL, value, suit.',
      'Demonstrează: click pe "Deal Cards", apoi selectează cărți pentru discard, apoi "Draw".',
      'Observați cum deck_id persistă între requests - serverul ține evidența deck-ului nostru.',
      'Remaining arată câte cărți mai sunt - API-ul menține state pe server (stateful pentru deck).',
      'Evaluarea mâinii se face client-side - demonstrează separarea responsabilităților.',
    ],
    keyPoints: [
      'API-ul păstrează state-ul deck-ului pe server',
      'Fiecare request include deck_id pentru a identifica sesiunea',
      'Response în JSON cu imagini PNG/SVG pentru cărți',
      'Perfect pentru practică: gratuit, simplu, documentat',
    ],
    duration: '5 min',
  },

  // Slide 11: Poker Code Explanation
  {
    title: 'Cum am creat Poker Game',
    icon: '🛠️',
    notes: [
      'Acum să vedem cum funcționează codul din spatele jocului.',
      'PARTEA 1 - API Calls: folosim fetch() nativ din JavaScript, nu avem nevoie de axios sau alte librării.',
      'Primul call: GET /new/shuffle/ - creează un deck nou și îl amestecă. Returnează deck_id unic.',
      'Al doilea call: GET /deck/{id}/draw/?count=5 - extrage cărți. Folosim template literals pentru a insera deck_id.',
      'async/await face codul mult mai ușor de citit decât .then() chains.',
      'PARTEA 2 - State Management: folosim mai multe useState hooks pentru diferite aspecte ale jocului.',
      'Set() pentru selectedCards - permite add/delete în O(1), perfect pentru toggle selecție.',
      'gamePhase ca state machine simplu: start → drawn → final. Controlează ce butoane și acțiuni sunt disponibile.',
      'PARTEA 3 - Evaluare: logica rulează client-side. API-ul nu știe nimic despre poker!',
      'Convertim valorile în numere (A=14, K=13, etc.), sortăm, și verificăm patterns.',
      'isFlush: toate suits identice. isStraight: valori consecutive.',
      'counts array: câte cărți de fiecare valoare (pentru pairs, three of a kind, etc.)',
    ],
    keyPoints: [
      'fetch() + async/await = modern și curat',
      'Set() pentru selecții multiple eficiente',
      'State machine simplu cu string literal type',
      'Separare: API servește data, client procesează logica',
    ],
    duration: '6 min',
  },

  // Slide 12: Meme - Password Security
  {
    title: 'Password Security Meme',
    icon: '🔐',
    notes: [
      'Moment de umor înainte de secțiunea de Security.',
      'Perfect pentru a introduce subiectul cu o notă ușoară.',
      'Poți menționa că vom vedea cum să facem security corect în slide-urile următoare.',
    ],
    keyPoints: [
      'Light introduction to security',
      'Relatable humor',
      'Transition to serious topic',
    ],
    duration: '30 sec',
  },

  // Slide 13: Security Basics
  {
    title: 'Security Basics',
    icon: '🔒',
    notes: [
      'Securitatea nu e opțională - trebuie gândită de la început, nu adăugată la final.',
      'XSS = Cross-Site Scripting: atacatorul injectează JavaScript malițios în pagina ta, care se execută în browser-ul victimei. Fix: sanitizează input-ul (escape HTML), folosește CSP (Content Security Policy).',
      'CSRF = Cross-Site Request Forgery: atacatorul păcălește user-ul autentificat să execute acțiuni nedorite (ex: transfer bani). Fix: CSRF tokens (token unic per formular), SameSite cookies.',
      'SQL Injection: atacatorul trimite input care modifică query-ul SQL (ex: \' OR 1=1 --). Fix: prepared statements (parameterized queries), ORM-uri care escapează automat.',
      'CORS = Cross-Origin Resource Sharing: browser-ul blochează requests între domenii diferite. Serverul trebuie să seteze header-ul Access-Control-Allow-Origin.',
      'HTTPS = HTTP Secure: criptează comunicația client-server cu TLS/SSL. Obligatoriu în producție! Let\'s Encrypt oferă certificate SSL gratuite.',
      'Environment variables: NICIODATĂ nu pune API keys, passwords sau secrets în cod! Folosește fișiere .env care sunt în .gitignore.',
      'Password hashing: bcrypt și Argon2 sunt algoritmi lenți intenționat (greu de spart). MD5 și SHA1 sunt prea rapide și vulnerabile la brute-force.',
    ],
    keyPoints: [
      'XSS = Cross-Site Scripting',
      'CSRF = Cross-Site Request Forgery',
      'CORS = Cross-Origin Resource Sharing',
      'CSP = Content Security Policy',
      'HTTPS = HTTP Secure (TLS/SSL)',
    ],
    duration: '6 min',
  },

  // Slide 14: Meme - Docker/Containers
  {
    title: 'Docker Meme',
    icon: '🐳',
    notes: [
      'Perfect moment pentru a introduce Docker!',
      'Meme-ul ilustrează exact problema pe care Docker o rezolvă.',
      'Tranziție naturală către explicația despre containers.',
    ],
    keyPoints: [
      'Perfect segue to Docker',
      'Real-world problem',
      'Sets up Docker solution',
    ],
    duration: '30 sec',
  },

  // Slide 15: Docker Intro
  {
    title: 'Ce este Docker?',
    icon: '🐳',
    notes: [
      'Docker rezolvă problema clasică "Works on my machine!" - aplicația rulează identic pe orice mașină.',
      'În modul tradițional, aplicațiile share-uiesc dependințele sistemului → conflicte inevitabile.',
      'Exemplu conflict: App1 are nevoie de Node 14, App2 de Node 18. Fără Docker, nu pot rula pe aceeași mașină.',
      'Container = proces izolat cu propriile dependințe, fără overhead-ul unei VM complete.',
      'VM = Virtual Machine: emulează un întreg computer cu propriul OS. Containers share-uiesc kernel-ul host-ului.',
      'Image = template read-only cu tot ce trebuie: OS minimal, runtime, dependințe, cod.',
      'Container = instanță running a unei imagini, cu un layer writable deasupra.',
    ],
    keyPoints: [
      'VM = Virtual Machine (mașină virtuală completă)',
      'OS = Operating System (sistem de operare)',
      'Image = șablon read-only pentru containers',
      'Container = instanță running a unei imagini',
    ],
    duration: '5 min',
  },

  // Slide 16: Docker How
  {
    title: 'Cum funcționează Docker',
    icon: '📦',
    notes: [
      'Flow-ul Docker: Dockerfile → Image → Container → Registry.',
      'Dockerfile = fișier text cu instrucțiuni de build, similar cu o rețetă.',
      'Image = template read-only, immutable. Fiecare instrucțiune din Dockerfile creează un layer.',
      'Container = instanță running a unei imagini. Adaugă un layer writable deasupra.',
      'Registry = repository pentru images. Docker Hub e public, GHCR = GitHub Container Registry.',
      'Layer = strat în imagine. Layers sunt cached → rebuild rapid dacă nu s-a schimbat nimic.',
      'Volume = storage persistent în afara container-ului. Datele supraviețuiesc restart-ului.',
      'docker-compose = tool pentru orchestrarea mai multor containers (ex: app + database + redis).',
    ],
    keyPoints: [
      'GHCR = GitHub Container Registry',
      'Layer = strat cached în imagine',
      'Volume = storage persistent extern',
      'Compose = orchestrare multi-container',
    ],
    duration: '5 min',
  },

  // Slide 17: Dockerfile
  {
    title: 'Dockerfile Simplu',
    icon: '📄',
    notes: [
      'Parcurge fiecare instrucțiune și explică ce face.',
      'FROM: punctul de start - base image (node:20-alpine e mică ~50MB)',
      'WORKDIR: setează current directory în container',
      'COPY package*.json: copiază doar package files pentru cache eficient',
      'RUN npm ci: instalează dependințele (ci e mai rapid și mai sigur decât install)',
      'COPY . .: copiază restul codului',
      'EXPOSE: documentează portul (nu deschide efectiv portul)',
      'CMD: comanda care rulează când pornește container-ul',
    ],
    keyPoints: [
      'Ordinea instrucțiunilor contează pentru caching',
      'Copiază package.json separat pentru a cache-ui npm install',
      'Folosește .dockerignore pentru a exclude node_modules',
      'Multi-stage builds pentru imagini mai mici în producție',
    ],
    duration: '5 min',
  },

  // Slide 18: Meme - Git Commits
  {
    title: 'Git Commit Messages Meme',
    icon: '📝',
    notes: [
      'Moment de umor despre commit messages înainte de CI/CD.',
      'Perfect pentru a menționa importanța commit messages clare în CI/CD pipelines.',
      'Studenții vor recunoaște acest pattern din experiența lor.',
    ],
    keyPoints: [
      'Relatable developer humor',
      'Transition to CI/CD',
      'Importance of good commits',
    ],
    duration: '30 sec',
  },

  // Slide 19: CI/CD
  {
    title: 'Ce este CI/CD?',
    icon: '🔄',
    notes: [
      'CI/CD este practica de automatizare a întregului proces de la cod la producție.',
      'CI = Continuous Integration: developerii integrează codul frecvent (de mai multe ori pe zi), cu build și teste automate la fiecare push.',
      'CD = Continuous Delivery: codul este întotdeauna gata de deploy, dar deploy-ul în producție e manual (un click).',
      'CD = Continuous Deployment: deploy automat în producție după ce testele trec - fără intervenție umană.',
      'Înainte de CI/CD: "merge hell" (conflicte mari la merge), bugs descoperite târziu, deploy-uri stresante și rare.',
      'Cu CI/CD: feedback rapid (în minute), bugs detectate devreme, deploy-uri frecvente și sigure.',
      'Pipeline tipic: Push → Build → Test → Package → Deploy → Monitor.',
    ],
    keyPoints: [
      'CI = Continuous Integration',
      'CD = Continuous Delivery sau Continuous Deployment',
      'Pipeline = secvența automată de pași',
      'Fail fast = detectează probleme cât mai devreme',
    ],
    duration: '4 min',
  },

  // Slide 20: GitHub Actions Intro
  {
    title: 'GitHub Actions',
    icon: '🔄',
    notes: [
      'GitHub Actions = platformă de CI/CD integrată direct în GitHub, gratuită pentru repo-uri publice.',
      'Workflow = procesul complet de automatizare, definit într-un fișier YAML (Yet Another Markup Language).',
      'Job = set de steps care rulează pe același runner (mașină virtuală). Jobs pot rula în paralel.',
      'Step = task individual - poate fi o action din marketplace sau un shell script.',
      'Runner = VM (Virtual Machine) care execută jobs. GitHub oferă runners gratuite: Ubuntu, Windows, macOS.',
      'Action = unitate de cod reutilizabilă din Actions Marketplace (ex: actions/checkout, actions/setup-node).',
      'Secrets = variabile criptate pentru credentials sensibile (API keys, tokens).',
    ],
    keyPoints: [
      'YAML = Yet Another Markup Language',
      'VM = Virtual Machine (mașină virtuală)',
      'Runner = mașina care execută workflow-ul',
      'Marketplace = repository de actions reutilizabile',
    ],
    duration: '5 min',
  },

  // Slide 21: GitHub Actions File
  {
    title: 'GitHub Actions Workflow',
    icon: '📝',
    notes: [
      'Parcurge fișierul YAML linie cu linie.',
      'name: numele afișat în GitHub UI',
      'on: events care trigger-uiesc workflow-ul',
      'jobs: definește jobs (pot rula în paralel)',
      'runs-on: specifică runner-ul (ubuntu-latest e cel mai comun)',
      'steps: lista de steps executați secvențial',
      'uses: folosește o action din marketplace',
      'run: execută shell commands',
      'Menționează popular actions din marketplace.',
    ],
    keyPoints: [
      'actions/checkout - clonează repo-ul',
      'actions/setup-node - instalează Node.js',
      'actions/cache - cache pentru dependencies',
      'Folosește secrets pentru sensitive credentials',
    ],
    duration: '5 min',
  },

  // Slide 22: Thank You
  {
    title: 'Mulțumesc!',
    icon: '🎉',
    notes: [
      'Recapitulează rapid cele 5 teme principale.',
      'Arată QR code-ul către repository-ul GitHub - studenții pot accesa codul complet.',
      'Menționează că toate exemplele sunt disponibile în folderul /examples.',
      'Încurajează studenții să practice aceste concepte.',
      'Sugerează proiecte practice: build o aplicație full-stack, containerize-o, adaugă CI/CD.',
      'Menționează resurse suplimentare: MDN, Docker docs, GitHub Actions docs.',
      'Deschide sesiunea de întrebări - email disponibil pentru întrebări ulterioare.',
      'Mulțumește pentru atenție!',
    ],
    keyPoints: [
      'Practice makes perfect',
      'Build real projects',
      'Contribute to open source',
      'Learn from mistakes',
      'GitHub repo: github.com/zenopopovici/webdev-presentation',
      'Contact: zeno@graffino.com',
    ],
    duration: '3 min',
  },
]
