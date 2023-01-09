export default defineNuxtPlugin(() => {
  addRouteMiddleware('authentication', async (to, _from) => {
    const { status } = useSession()

    if (to.meta.auth !== false && status.value === 'unauthenticated') {
      return navigateTo(`/login?callbackUrl=${to.path}`)
    }
  }, { global: true })
})
