<template>
  <form-input-select
    v-model="inputValue"
    :label="$t(`modules.${moduleName}.form.labels.${name}`)"
    :options="selectOptions"
  />
</template>

<script setup>
import countryKeys from '@/data/country-keys.json'

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

const selectOptions = computed(() => {
  return countryKeys.map(countryKey => {
    return {
      value: countryKey.id,
      label: `${countryKey.city} ${countryKey.type} (${countryKey.id})`
    }
  })
})

const inputValue = computed({
  get() { return props.modelValue || props.options?.defaultValue || '' },
  set(value) { emit('update:modelValue', value) }
})
</script>

<style lang="scss" scoped>
</style>
