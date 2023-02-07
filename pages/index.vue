<template>
  <h1 class="mb-8 text-4xl">
    {{ $t('dashboard.title') }}
  </h1>

  <ul>
    <li
      v-for="moduleName in activeModules"
      :key="moduleName"
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
