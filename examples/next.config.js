/** @type {import('next').NextConfig} */
const nextConfig = {
  // IMPORTANT: Necesar pentru Docker standalone build
  output: 'standalone',
  
  // Permite încărcarea imaginilor de la deckofcardsapi.com
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'deckofcardsapi.com',
        pathname: '/static/img/**',
      },
    ],
  },
  
  // Dezactivează telemetria
  telemetry: false,
}

module.exports = nextConfig
