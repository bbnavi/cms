<template>
  <h1 class="mb-8 text-4xl">
    {{ $t('dashboard.title') }}
  </h1>

  <ul class="grid grid-cols-1 gap-8 md:grid-cols-2">
    <li
      v-for="{ label, routeName, params, query, icon, iconFallback } in activeModules"
      :key="label"
      class="flex items-center justify-between card"
    >
      <nuxt-link
        :to="{ name: routeName, params: params, query: query }"
        class="flex items-center justify-center gap-3 text-lg font-bold"
      >
        <ui-icon :icon="icon" :fallback="iconFallback" />
        <span>{{ label }}</span>
      </nuxt-link>

      <ui-button
        :to="{ name: params.category_id ? 'category-new' : 'module-new', params }"
        type="button"
        rounded
      >
        <ui-icon icon="plus" />
      </ui-button>
    </li>
  </ul>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
const { activeModules } = useUserStore()
const { $i18n } = useNuxtApp()

useHead({
  title: $i18n.t('common.pageTitle.pageDashboard')
})
</script>

<style lang="scss">
.card {
  @apply flex flex-row py-8 px-6;
  @apply bg-white rounded-lg shadow;
}
</style>
