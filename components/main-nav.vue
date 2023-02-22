<template>
  <div class="flex-grow py-8 pr-0 overflow-y-auto xl:pl-8">
    <ul class="space-y-2 main-menu">
      <li>
        <nuxt-link to="/">
          <ui-icon icon="dashboard" />
          {{ $t('dashboard.title') }}
        </nuxt-link>
      </li>

      <li>
        <nuxt-link to="/a">
          <ui-icon icon="disabled" />
          Baustellen
        </nuxt-link>
      </li>

      <li>
        <nuxt-link to="/b">
          <ui-icon icon="coworking" />
          Coworking
        </nuxt-link>
      </li>

      <li>
        <nuxt-link to="/c">
          <ui-icon icon="bicycle" />
          Fahrräder
        </nuxt-link>
      </li>
      
      <li>
        <nuxt-link to="/d">
          <ui-icon icon="car-pin-location" />
          Mitfahrpunkte
        </nuxt-link>
      </li>
      
      <li>
        <nuxt-link to="/e">
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
