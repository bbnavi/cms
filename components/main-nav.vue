<template>
  <div class="flex-grow p-8 pr-0 overflow-y-auto">
    <ul class="space-y-2 main-menu">
      <li class="active">
        <nuxt-link to="/">
          <ui-icon icon="dashboard" />
          {{ $t('dashboard.title') }}
        </nuxt-link>
      </li>

      <li>
        <nuxt-link to="/">
          <ui-icon icon="disabled" />
          Baustellen
        </nuxt-link>
      </li>

      <li>
        <nuxt-link to="/">
          <ui-icon icon="coworking" />
          Coworking
        </nuxt-link>
      </li>

      <li>
        <nuxt-link to="/">
          <ui-icon icon="bicycle" />
          Fahrräder
        </nuxt-link>
      </li>
      
      <li>
        <nuxt-link to="/">
          <ui-icon icon="car-pin-location" />
          Mitfahrpunkte
        </nuxt-link>
      </li>
      
      <li>
        <nuxt-link to="/">
          <ui-icon icon="places" />
          Orte
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.main-menu {
  a {
    @apply flex flex-row gap-4 items-center;
    @apply pr-8 py-3;
    @apply text-base font-bold;
  }

  .active {
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
