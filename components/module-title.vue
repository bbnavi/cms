<template>
  <div class="mb-8">
    <nuxt-link :to="{ name: moduleIndexRouteName, params: moduleIndexParams }">
      {{ module.label }}
    </nuxt-link>
    <h1 class="text-4xl">
      {{ $t(`common.moduleAction.${moduleAction}`) }}
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
const moduleIndexRouteName = `${moduleType}-index`
const moduleIndexParams = Object.fromEntries(Object.entries(params).filter(([key]) => key !== 'id'))
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
