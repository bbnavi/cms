import getNuxtConfig from '../nuxt.config.js'
// Import and Set Nuxt.js options
const config = getNuxtConfig(process.env)
const nuxt = new Nuxt(config)
