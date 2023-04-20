<template>
  <ui-page-title
    :title="$t(`common.moduleAction.${moduleAction}`)"
    :overline="module.label"
    :overline-to="{ name: moduleIndexRouteName, params: moduleIndexParams }"
  />
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
