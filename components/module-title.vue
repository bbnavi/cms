<template>
  <h1 class="text-4xl">
    {{ module.label }}
  </h1>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
const { params } = useRoute()
const { activeModules } = useUserStore()
const module = computed(() => {
  const moduleName = params.category_id ? `${params.module}_category_${params.category_id}` : params.module

  return activeModules.find((module) => module.name === moduleName)
})
</script>

<style lang="scss" scoped>

</style>
