<template>
  <h1 class="mb-8 text-4xl">
    {{ $t('dashboard.title') }}
  </h1>

  <ul class="grid grid-cols-1 gap-8 md:grid-cols-2">
    <li
      v-for="{ key, label, routeName, params, query, icon, iconFallback } in activeModules"
      :key="label"
      class="flex items-center justify-between card"
    >
      <nuxt-link
        :to="{ name: routeName, params: params, query: query }"
        class="flex items-center justify-center gap-3"
      >
        <ui-icon :icon="icon" :fallback="iconFallback" />
        <div>
          <div class="text-lg font-bold">{{ label }}</div>
          <div class="text-sm">{{ $t('common.entriesCount', { count: getModuleCount(routeName, key, params) }) }}</div>
        </div>
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
import dashboardQuery from '@/graphql/queries/dashboard.gql'
import { useUserStore } from '@/stores/user'
const { activeModules } = useUserStore()
const { $i18n } = useNuxtApp()

const { data } = await useAsyncQuery(dashboardQuery)
const dashboardData = data?.value?.dashboard

const getModuleCount = (routeName, key, params) => {
  if (routeName === 'module-index') {
    return dashboardData?.[key]?.total_count
  } else if (routeName === 'category-index') {
    return dashboardData?.[key].find((entry) => entry.category_id === params.category_id)?.total_count
  }

  return 0
}

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
