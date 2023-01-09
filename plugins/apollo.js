export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const { data } = useSession()

  nuxtApp.hook('apollo:auth', async ({ client, token }) => {
    const response = await fetch(config.public.graphQlAuthEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        grant_type: 'client_credentials',
        client_id: data.value.user.image.oauth_client_id,
        client_secret: data.value.user.image.oauth_client_secret
      })
    })

    const jsonResponse = await response.json()
    const { access_token } = jsonResponse

    // apply apollo client token
    token.value = access_token
  })
})
