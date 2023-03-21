<template>
  <button
    :disabled="props.disabled || props.isLoading"
    :class="{ 'opacity-40': props.disabled, 'relative h-8 w-8 items-center justify-center flex': true }"
    @click="emit('update:modelValue', !props.modelValue)"
  >
    <ui-icon v-show="!props.isLoading && props.modelValue === true" icon="switch-true" />
    <ui-icon v-show="!props.isLoading && props.modelValue === false" icon="switch-false" />
    <ui-spinner v-show="isLoading" />
  </button>
</template>

<script setup>
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})
</script>
