/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef7ee',
          100: '#fdedd6',
          200: '#fad7ac',
          300: '#f6ba77',
          400: '#f1933e',
          500: '#ed7519',
          600: '#de5a0f',
          700: '#b8430f',
          800: '#933514',
          900: '#762e14',
        },
        furniture: {
          brown: '#8B4513',
          beige: '#F5F5DC',
          cream: '#FFFDD0',
          wood: '#DEB887',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 