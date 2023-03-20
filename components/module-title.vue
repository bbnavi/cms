<template>
  <div class="mb-8">
    <div>
      {{ $t(`common.moduleAction.${moduleAction}`) }}
    </div>
    <h1 class="text-4xl">
      {{ module.label }}
    </h1>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
const { params, name:routeName } = useRoute()
const { $i18n } = useNuxtApp()
const { activeModules } = useUserStore()

let [moduleType, moduleAction] = routeName.split('-')
const moduleName = params.category_id ? `${params.module}_category_${params.category_id}` : params.module
const module = activeModules.find((module) => module.name === moduleName)
const pageTitle = computed(() => {
  if ([ 'category', 'module' ].includes(moduleType)) {
    return [
      $i18n.t(`common.moduleAction.${moduleAction}`),
      module.label
    ].join(' - ')
  }

  return null
})

useHead({
  title: pageTitle
})
</script>
