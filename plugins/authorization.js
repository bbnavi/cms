import { useUserStore } from '@/stores/user'

export default defineNuxtPlugin(() => {
  addRouteMiddleware('authorization', async (to, _from) => {
    const { params } = useRoute()
    const { status, signOut } = useSession()
    const { activeModules } = useUserStore()

    if (status.value === 'authenticated' && !activeModules) {
      signOut()
    }

    if (status.value === 'authenticated' && params.module && !activeModules.includes(params.module)) {
      return navigateTo(`/?error=unauthorized`)
    }
  }, { global: true })
})
