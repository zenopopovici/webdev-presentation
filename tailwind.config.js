/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['JetBrains Mono', 'monospace'],
        body: ['Outfit', 'sans-serif'],
      },
      colors: {
        cyber: {
          dark: '#0a0a0f',
          darker: '#050508',
          purple: '#a855f7',
          pink: '#ec4899',
          cyan: '#06b6d4',
          green: '#10b981',
          orange: '#f97316',
          yellow: '#eab308',
        }
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'data-flow': 'data-flow 2s linear infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: 0.6 },
          '50%': { opacity: 1 },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'data-flow': {
          '0%': { strokeDashoffset: 24 },
          '100%': { strokeDashoffset: 0 },
        }
      }
    },
  },
  plugins: [],
}

