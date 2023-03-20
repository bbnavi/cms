<template>
  <div class="form-field">
    <component
      :is="options.component"
      :name="name"
      :options="options"
      :module-name="moduleName"
      :modelValue="modelValue"
      :exclude-form-field-attributes="excludeFormFieldAttributes"
      @update:modelValue="(value) => emit('update:modelValue', value)"
    />

    <module-form-field-debug
      :name="name"
      :options="options"
      :modelValue="modelValue"
      :excludeFormFieldAttributes="excludeFormFieldAttributes"
    />
  </div>
</template>

<script setup>
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean, Array, Object],
    required: false
  },
  name: {
    type: String,
    required: true
  },
  options: {
    type: Object,
    required: true
  },
  moduleName: {
    type: String,
    required: true
  },
  excludeFormFieldAttributes: {
    type: Array,
    default: () => [],
    required: false
  }
})
</script>

<style lang="scss">
.form-field {
  & + & {
    @apply mt-6;
  }
}
</style>
