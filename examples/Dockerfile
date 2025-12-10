# ============================================
# Dockerfile pentru Poker Game (Next.js)
# ============================================
# 
# Build: docker build -t poker-game .
# Run:   docker run -p 3000:3000 poker-game
#
# IMPORTANT: Acest Dockerfile folosește "standalone" output mode
# Asigură-te că ai în next.config.js:
#   module.exports = { output: 'standalone' }
# ============================================

# ETAPA 1: Dependințe
FROM node:20-alpine AS deps

# Instalăm libc6-compat pentru compatibilitate Alpine
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copiem package files pentru cache eficient
COPY package.json package-lock.json* ./

# Instalăm dependințele
# Folosim npm install dacă nu există package-lock.json
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi


# ============================================
# ETAPA 2: Build
# ============================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copiem dependințele din etapa anterioară
COPY --from=deps /app/node_modules ./node_modules

# Copiem codul sursă
COPY . .

# Dezactivăm telemetria Next.js
ENV NEXT_TELEMETRY_DISABLED=1

# Build pentru producție
RUN npm run build


# ============================================
# ETAPA 3: Runner (Producție)
# ============================================
FROM node:20-alpine AS runner

WORKDIR /app

# Setări producție
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Creăm user non-root pentru securitate
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiem fișierele necesare
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Copiem standalone build
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Schimbăm la user non-root
USER nextjs

# Port și hostname
EXPOSE 3030
ENV PORT=3030
ENV HOSTNAME="0.0.0.0"

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3030', (r) => process.exit(r.statusCode === 200 ? 0 : 1))"

# Start server
CMD ["node", "server.js"]
