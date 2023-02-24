// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig = (envVars) =>{
  return {
    runtimeConfig: {
      public: {
        authEndpoint: envVars.NUXT_PUBLIC_AUTH_ENDPOINT,
        userEndpoint: envVars.NUXT_PUBLIC_USER_ENDPOINT,
        authOrigin: envVars.NUXT_PUBLIC_AUTH_ORIGIN,
        graphQlAuthEndpoint: envVars.NUXT_PUBLIC_GRAPHQL_AUTH_ENDPOINT
      }
    },

    css: [
      '~/assets/css/tailwind.css',
      '~/assets/css/main.css'
    ],

    components: {
      "dirs": [
        {
          "path": "~/components/module-form-fields",
          "global": true
        },
        "~/components"
      ]
    },

    modules: [
      '@sidebase/nuxt-auth',
      '@nuxtjs/apollo',
      '@pinia/nuxt',
      '@nuxtjs/i18n',
      'nuxt-icons'
    ],

    auth: {
      origin: envVars.NUXT_PUBLIC_AUTH_ORIGIN
    },

    apollo: {
      clients: {
        default: {
          httpEndpoint: envVars.NUXT_PUBLIC_GRAPHQL_ENDPOINT
        }
      }
    },

    i18n: {
      locales: [
        {
          code: 'de',
          file: 'de-DE.json'
        }
      ],
      lazy: true,
      langDir: 'lang',
      defaultLocale: 'de'
    },

    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      }
    }
  }
}
