/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './posts/**/*.{md,mdx}',
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
      // Custom prose theme to match the website colour palette
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.light-text'),
            '--tw-prose-headings': theme('colors.light-text-dark'),
            '--tw-prose-lead': theme('colors.light-text'),
            '--tw-prose-links': theme('colors.light-accent-hover'),
            '--tw-prose-bold': theme('colors.light-text-dark'),
            '--tw-prose-counters': theme('colors.light-text'),
            '--tw-prose-bullets': theme('colors.light-accent'),
            '--tw-prose-hr': theme('colors.light-border'),
            '--tw-prose-quotes': theme('colors.light-text-dark'),
            '--tw-prose-quote-borders': theme('colors.light-accent'),
            '--tw-prose-captions': theme('colors.light-text'),
            '--tw-prose-code': theme('colors.light-accent-hover'),
            '--tw-prose-pre-code': theme('colors.light-text'),
            '--tw-prose-pre-bg': theme('colors.light-border'),
            '--tw-prose-th-borders': theme('colors.light-border'),
            '--tw-prose-td-borders': theme('colors.light-border'),
            // Dark mode vars (paired with the `invert` variant below)
            '--tw-prose-invert-body': theme('colors.dark-text'),
            '--tw-prose-invert-headings': theme('colors.dark-text'),
            '--tw-prose-invert-lead': theme('colors.dark-text'),
            '--tw-prose-invert-links': theme('colors.dark-accent-hover'),
            '--tw-prose-invert-bold': theme('colors.dark-text'),
            '--tw-prose-invert-counters': theme('colors.dark-text'),
            '--tw-prose-invert-bullets': theme('colors.dark-accent'),
            '--tw-prose-invert-hr': theme('colors.dark-border'),
            '--tw-prose-invert-quotes': theme('colors.dark-text'),
            '--tw-prose-invert-quote-borders': theme('colors.dark-accent'),
            '--tw-prose-invert-captions': theme('colors.dark-text'),
            '--tw-prose-invert-code': theme('colors.dark-accent'),
            '--tw-prose-invert-pre-code': theme('colors.dark-text'),
            '--tw-prose-invert-pre-bg': '#2a2020',
            '--tw-prose-invert-th-borders': theme('colors.dark-border'),
            '--tw-prose-invert-td-borders': theme('colors.dark-border'),
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
