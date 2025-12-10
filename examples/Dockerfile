# ============================================
# Dockerfile pentru aplicație Next.js
# ============================================
# IMPORTANT: Acest Dockerfile folosește "standalone" output mode
# Adaugă în next.config.js:
#   module.exports = { output: 'standalone' }
# ============================================

# ETAPA 1: Dependințe
# Folosim o imagine Node.js Alpine (mai mică și mai rapidă)
FROM node:20-alpine AS deps

# Instalăm libc6-compat pentru compatibilitate
RUN apk add --no-cache libc6-compat

# Setăm directorul de lucru
WORKDIR /app

# Copiem fișierele package pentru a instala dependințele
# (acestea se schimbă rar, deci Docker le va cache-ui)
COPY package.json package-lock.json* ./

# Instalăm dependințele
RUN npm ci


# ============================================
# ETAPA 2: Build
# ============================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copiem dependințele din etapa anterioară
COPY --from=deps /app/node_modules ./node_modules

# Copiem tot codul sursă
COPY . .

# Dezactivăm telemetria Next.js
ENV NEXT_TELEMETRY_DISABLED=1

# Construim aplicația pentru producție
RUN npm run build


# ============================================
# ETAPA 3: Runner (Producție)
# ============================================
FROM node:20-alpine AS runner

WORKDIR /app

# Setăm variabila de mediu pentru producție
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Creăm un user non-root pentru securitate
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiem fișierele necesare pentru rulare
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Copiem build-ul Next.js (standalone mode)
# Asigură-te că ai output: 'standalone' în next.config.js
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Schimbăm la user-ul non-root
USER nextjs

# Expunem portul aplicației
EXPOSE 3000

# Setăm variabila PORT
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Comanda de start
CMD ["node", "server.js"]
