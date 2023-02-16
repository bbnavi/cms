/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        brand: '#DA1B1B',

        gray: {
          50: '#F2F2F2',
          100: '#E5E5E5',
          200: '#CCCCCC',
          300: '#B2B2B2',
          400: '#999999',
          500: '#808080',
          600: '#666666',
          700: '#4d4d4d',
          800: '#333333',
          900: '#1a1a1a',
        }
      },

      borderRadius: {
        'lg': '20px',
      },

      boxShadow: {
        DEFAULT: '0 2px 5px 0 rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}
