<template>
  <h1 class="mb-8 text-4xl">
    {{ $t('dashboard.title') }}
  </h1>

  <ul class="grid grid-cols-1 gap-8 md:grid-cols-2">
    <li
      v-for="{ label, routeName, params, query } in activeModules"
      :key="label"
      class="card"
    >
      <nuxt-link :to="{ name: routeName, params: params, query: query }">
        {{ label }}
      </nuxt-link>
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
  @apply flex flex-row py-10 px-6;
  @apply bg-white rounded-lg shadow;
}
</style>
