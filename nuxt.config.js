// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      graphQlAuthEndpoint: process.env.NUXT_PUBLIC_GRAPHQL_AUTH_ENDPOINT,
      graphQlClientId: process.env.NUXT_PUBLIC_GRAPHQL_CLIENT_ID,
      graphQlClientSecret: process.env.NUXT_PUBLIC_GRAPHQL_CLIENT_SECRET
    }
  },

  css: [
    '~/assets/css/main.css'
  ],

  modules: [
    '@nuxtjs/apollo',
    '@pinia/nuxt',
    'nuxt-icons'
  ],

  apollo: {
    clients: {
      default: {
        httpEndpoint: process.env.NUXT_PUBLIC_GRAPHQL_ENDPOINT
      }
    }
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    }
  }
})
