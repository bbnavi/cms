<template>
  <form-group>
    <form-label>
      <span v-if="label">
        {{ label }}
      </span>

      <textarea
        v-model="inputValue"
        :readonly="readonly"
        :required="required"
        class="px-4 py-2 text-base border border-gray-200 rounded"
      />
    </form-label>
  </form-group>
</template>

<script setup>
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  label: {
    type: String,
    required: false
  },
  modelValue: {
    type: String,
    required: true
  },
  readonly: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  }
})

const inputValue = computed({
  get() { return props.modelValue },
  set(value) { emit('update:modelValue', value) }
})
</script>
