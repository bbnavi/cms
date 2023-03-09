import { useUserStore } from '@/stores/user'

export default defineNuxtPlugin(() => {
  addRouteMiddleware('authorization', async (to, _from) => {
    const { params } = useRoute()
    const { status, signOut } = useSession()
    const { activeModules } = useUserStore()
    const moduleNames = [...new Set(activeModules.map(module => module.name))]

    if (status.value === 'authenticated' && !activeModules) {
      signOut()
    }

    if (status.value === 'authenticated' && params.module && !moduleNames.includes(params.module)) {
      return navigateTo(`/?error=unauthorized`)
    }
  }, { global: true })
})
