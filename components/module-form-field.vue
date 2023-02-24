<template>
  <div class="form-field">
    <component
      :is="options.component"
      :name="name"
      :options="options"
      :module-name="moduleName"
      :modelValue="modelValue"
      @update:modelValue="(value) => emit('update:modelValue', value)"
    />

    <div class="p-4 mb-20 overflow-x-auto bg-slate-100">
      <pre>name: {{ name }}</pre>
      <pre>modelValue: {{ modelValue }}</pre>
      <pre>options: {{ options }}</pre>
    </div>
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
