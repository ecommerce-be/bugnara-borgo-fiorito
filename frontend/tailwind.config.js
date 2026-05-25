/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // "Carta e Pietra" palette: warm Abruzzese stone meets paper, leaves, and antique rose
        ink:    { DEFAULT: '#2b2620', soft: '#4a4138', faint: '#7a6e62' },
        paper:  { DEFAULT: '#f6efe2', soft: '#fbf6ec', deep: '#ede2cc' },
        stone:  { DEFAULT: '#d9cdb8', soft: '#e8dfca', deep: '#bfae93' },
        leaf:   { DEFAULT: '#4a6741', soft: '#6a8761', deep: '#324628' },
        bloom:  { DEFAULT: '#c87f6f', soft: '#dba194', deep: '#a55a4a' },
        gold:   { DEFAULT: '#b08a4a', soft: '#caa874', deep: '#8a6a33' },
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        serif:   ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans:    ['"Inter"', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Editorial type scale — clamps for fluid responsive sizing
        'display-xl': ['clamp(3.5rem, 8vw, 7rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.5rem, 5vw, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(2rem, 3.5vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'eyebrow':    ['0.75rem', { lineHeight: '1', letterSpacing: '0.2em' }],
      },
      letterSpacing: {
        'eyebrow': '0.2em',
      },
      boxShadow: {
        // Subtle "paper" shadows, never plasticky
        'paper': '0 1px 2px rgba(43, 38, 32, 0.04), 0 8px 24px -8px rgba(43, 38, 32, 0.08)',
        'paper-lg': '0 2px 4px rgba(43, 38, 32, 0.05), 0 24px 48px -16px rgba(43, 38, 32, 0.12)',
      },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fade-in 1.2s ease-out both',
      },
    },
  },
  plugins: [],
};
