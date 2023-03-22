<template>
  <NuxtLoadingIndicator
    color="#000"
  />

  <main-sidebar />

  <div class="container mx-auto">
    <div class="flex-grow px-4 py-8 xl:px-8">
      <slot />
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss">
</style>
