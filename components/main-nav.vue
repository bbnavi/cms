<template>
  <div class="flex-grow py-8 pr-0 overflow-y-auto xl:pl-8">
    <ul class="space-y-2 main-menu">
      <li>
        <nuxt-link to="/">
          <ui-icon icon="dashboard" />
          {{ $t('dashboard.title') }}
        </nuxt-link>
      </li>

      <li
        v-for="{ label, icon, iconFallback, routeName, params, query } in activeModules"
        :key="label"
      >
        <nuxt-link :to="{ name: routeName, params: params, query: query }">
          <ui-icon :icon="icon" :fallback="iconFallback" />
          <span>
            {{ label }}
          </span>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
const { activeModules } = useUserStore()
</script>

<style lang="scss" scoped>
.main-menu {
  a {
    @apply flex flex-row gap-4 items-center;
    @apply pr-8 py-3;
    @apply text-base font-bold;
  }

  .router-link-active {
    @apply relative;

    &::after {
      @apply absolute right-0 top-0;
      @apply h-full w-1;
      @apply bg-brand rounded;

      content: '';
    }
  }
}
</style>
