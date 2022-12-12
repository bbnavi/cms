export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  nuxtApp.hook('apollo:auth', async ({ client, token }) => {
    const response = await fetch(config.public.graphQlAuthEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        grant_type: 'client_credentials',
        client_id: config.public.graphQlClientId,
        client_secret: config.public.graphQlClientSecret
      })
    })

    const jsonResponse = await response.json()
    const { access_token } = jsonResponse

    // apply apollo client token
    token.value = access_token
  })
})
