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

  > span {
    @apply text-sm mb-1;
  }
}
</style>
