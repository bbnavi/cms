<template>
  <h1 class="mb-8 text-4xl">
    {{ $t('dashboard.title') }}
  </h1>

  <ul class="grid grid-cols-1 gap-8 md:grid-cols-2">
    <li
      v-for="moduleName in activeModules"
      :key="moduleName"
      class="card"
    >
      <nuxt-link :to="{ name: 'module-index', params: { module: moduleName }}">
        {{ $t(`modules.${moduleName}.title`) }}
      </nuxt-link>
    </li>
  </ul>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
const { activeModules } = useUserStore()
</script>

<style lang="scss">
.card {
  @apply flex flex-row py-10 px-6;
  @apply bg-white rounded-lg shadow;
}
</style>
