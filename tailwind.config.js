/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        hela: {
          navy:    '#0a0f1e',
          surface: '#111827',
          card:    '#0f172a',
          border:  '#1e293b',
          cyan:    '#06b6d4',
          blue:    '#3b82f6',
          purple:  '#8b5cf6',
          text:    '#e2e8f0',
          muted:   '#64748b',
        },
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(6,182,212,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.03) 1px, transparent 1px)',
        'cyan-glow':    'radial-gradient(ellipse at top, rgba(6,182,212,0.15) 0%, transparent 60%)',
      },
      backgroundSize: {
        'grid': '48px 48px',
      },
      animation: {
        'fade-up': 'fadeUp 0.4s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'card':      '0 0 0 1px rgba(6,182,212,0.1), 0 4px 24px rgba(0,0,0,0.4)',
        'card-hover':'0 0 0 1px rgba(6,182,212,0.4), 0 8px 32px rgba(6,182,212,0.1)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
