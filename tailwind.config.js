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
        brand: '#DA1B1B'
      },

      boxShadow: {
        DEFAULT: '0 2px 5px 0 rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}
