import { NuxtAuthHandler } from '#auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NuxtAuthHandler({
    secret: process.env.NUXT_PUBLIC_AUTH_SECRET,
    pages: {
      signIn: '/login'
    },
    callbacks: {
      async session({ session, token }) {
        // Send properties to the client, like an access_token and user id from a provider.
        // session.accessToken = token.accessToken
        // session.user.id = token.id

        // https://sidebase.io/nuxt-auth/recipes/custom-session-data

        session.user.id = token.sub

        return session
      }
    },
    providers: [
      // @ts-ignore Import is exported on .default during SSR, so we need to call it this way. May be fixed via Vite at some point
      CredentialsProvider.default({
        // The name to display on the sign in form (e.g. 'Sign in with...')
        name: 'Credentials',
        // The credentials is used to generate a suitable form on the sign in page.
        // You can specify whatever fields you are expecting to be submitted.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          email: { label: 'E-Mail', type: 'text', placeholder: '' },
          password: { label: 'Password', type: 'password', placeholder: '' }
        },

        async authorize (credentials) {
          const response = await fetch(process.env.NUXT_PUBLIC_AUTH_ENDPOINT, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              user: {
                email: credentials.email,
                password: credentials.password
              }
            })
          })

          const data = await response.json()
          const application = data.applications[0]

          if (response.status === 200) {
            return Object.assign(data.user, {
              // save authentication payload on the users image property,
              // it is the only property that is not used and valid by next-auth
              // other will be ignored by next-auth and not saved in the session
              image: {
                authentication_token: data.user.authentication_token,
                oauth_client_id: application?.uid,
                oauth_client_secret: application?.secret
              }
            })
          }

          return null
        }
      })
    ]
})

