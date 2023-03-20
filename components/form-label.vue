<template>
  <label :class="itemClasses">
    <slot />
  </label>
</template>

<script setup>
const props = defineProps({
  required: {
    type: Boolean,
    default: false
  }
})

const itemClasses = computed(() => {
  return {
    'form-label': true,
    'form-label--required': props.required
  }
})
</script>

<style lang="scss">
.form-label {
  @apply flex flex-col;
  @apply text-gray-600;

  &--required > span::after {
    content: '*';
  }

  > span {
    @apply text-sm mb-[6px];
  }
}
</style>
