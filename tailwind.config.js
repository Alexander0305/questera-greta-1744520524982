/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  important: true,
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00f7ff',
          dark: '#00c4cc',
          light: '#5cffff',
        },
        secondary: {
          DEFAULT: '#ff4081',
          dark: '#c60055',
          light: '#ff79b0',
        },
        background: {
          DEFAULT: '#0a192f',
          paper: '#112240',
        },
      },
      fontFamily: {
        sans: ['Rajdhani', 'Roboto', 'system-ui', 'sans-serif'],
      },
      animation: {
        'gradient': 'gradient 3s ease infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}