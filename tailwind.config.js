/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Light mode pastel palette
        'light-bg': '#FAF6F1',
        'light-text': '#6F4E37',
        'light-text-dark': '#4A3728',
        'light-accent': '#9DC183',
        'light-accent-hover': '#7A9B6E',
        'light-border': '#D4C5B9',
        
        // Dark mode pastel palette
        'dark-bg': '#1E1818',
        'dark-text': '#E9DCC9',
        'dark-text-secondary': 'rgba(233, 220, 201, 0.7)',
        'dark-accent': '#8DAA91',
        'dark-accent-hover': '#A3C4A5',
        'dark-border': 'rgba(212, 197, 185, 0.2)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
