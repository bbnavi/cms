// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      authEndpoint: process.env.NUXT_PUBLIC_AUTH_ENDPOINT,
      userEndpoint: process.env.NUXT_PUBLIC_USER_ENDPOINT,
      authOrigin: process.env.NUXT_PUBLIC_AUTH_ORIGIN,
      graphQlAuthEndpoint: process.env.NUXT_PUBLIC_GRAPHQL_AUTH_ENDPOINT
    }
  },

  css: [
    '~/assets/css/tailwind.css',
    '~/assets/css/main.css'
  ],

  modules: [
    '@sidebase/nuxt-auth',
    '@nuxtjs/apollo',
    '@pinia/nuxt',
    'nuxt-icons'
  ],

  auth: {
    origin: process.env.NUXT_PUBLIC_AUTH_ORIGIN
  },

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
