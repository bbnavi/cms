<template>
  <form-input-text
    v-model="inputValue"
    :label="$t(`modules.${moduleName}.form.labels.${name}`)"
    :readonly="options && options.readonly"
    :required="options && options.required"
    type="number"
    step=".000001"
  />
</template>

<script setup>
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  modelValue: {
    type: [String, Number, Boolean, Array, Object],
    required: false
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

const inputValue = computed({
  get() { return props.modelValue || props.options?.defaultValue || '' },
  set(value) { emit('update:modelValue', value) }
})
</script>
