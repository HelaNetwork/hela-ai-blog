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
          bg:      '#080810',
          panel:   '#0f0f1c',
          card:    '#13131f',
          border:  '#252540',
          border2: '#1e1e35',
          accent:  '#C6F135',
          pink:    '#ff3c6f',
          yellow:  '#ffe94d',
          cyan:    '#3cf0ff',
          text:    '#c8c8e8',
          dim:     '#5a5a7a',
          dim2:    '#3a3a58',
        },
      },
      fontFamily: {
        pixel:   ['"Press Start 2P"', 'monospace'],
        vt:      ['"VT323"', 'monospace'],
        sans:    ['"VT323"', 'monospace'],
        display: ['"Press Start 2P"', 'monospace'],
        mono:    ['"VT323"', 'monospace'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
