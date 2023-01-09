import { useUserStore } from '@/stores/user'

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig()
  const { status, data } = useSession()
  const user = useUserStore(nuxtApp.$pinia)

  if (status.value === 'authenticated') {
    const response = await fetch(config.public.userEndpoint, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + data.value.user.image.authentication_token,
      }
    })

    const payload = await response.json()

    user.init(payload)
  }
})
