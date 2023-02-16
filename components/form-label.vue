<template>
  <label class="form-label">
    <slot />
  </label>
</template>

<script setup>
</script>

<style lang="scss">
.form-label {
  @apply flex flex-col;
  @apply text-gray-600;

  > span {
    @apply text-sm mb-[6px];
  }
}
</style>
