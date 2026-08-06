/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: '#800020',
          light: '#9B2335',
          deep: '#5C0016',
          soft: '#722F37',
        },
        gold: {
          DEFAULT: '#D4AF37',
          soft: '#C5A059',
          bright: '#E8C766',
          deep: '#A67C1A',
        },
        ivory: {
          DEFAULT: '#FAF9F6',
          warm: '#FFFDD0',
          cream: '#F5EFE0',
        },
        charcoal: '#1C1C1C',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['Cinzel', 'Georgia', 'serif'],
        sans: ['Inter', 'Montserrat', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        gold: '0 0 25px -5px rgba(212, 175, 55, 0.55)',
        'gold-lg': '0 0 45px -8px rgba(212, 175, 55, 0.65)',
      },
      keyframes: {
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%,100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        spinSlow: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        glow: 'glow 3s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        'spin-slow': 'spinSlow 40s linear infinite',
        'fade-up': 'fadeUp 0.7s ease-out both',
      },
    },
  },
  plugins: [],
}
