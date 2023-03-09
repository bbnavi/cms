import { useCategoryStore } from '@/stores/category'

export default defineNuxtPlugin(async (nuxtApp) => {
  const categoryStore = useCategoryStore(nuxtApp.$pinia)

  await categoryStore.init()
})


