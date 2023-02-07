<template>
  <div class="form-group">
    <slot />
  </div>
</template>

<script setup>
</script>

<style lang="scss">
.form-group {
  & + & {
    @apply mt-6;
  }
}
</style>
