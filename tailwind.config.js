/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      'light-gray': '#b5b5b5',
      yellow: '#ffd93f',
      'light-brown': '#aa5c3d',
      magenta: '#e23d69',
      purple: '#5c2e78',
      black: '#000000',
      orange: '#eb8a60',
      brown: '#8a3622',
      'light-blue': '#44aacc',
      green: '#0c7e45',
      blue: '#2234d1',
      gray: '#5e606e',
    },
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {},
      fontFamily: {
        dogicapixel: ['dogicapixel', 'sans-serif'],
        dogicapixelbold: ['dogicapixelbold', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
