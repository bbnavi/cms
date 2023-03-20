<template>
  <form-group>
    <form-label
      :required="required"
    >
      <span v-if="label">
        {{ label }}
      </span>

      <input
        v-model="inputValue"
        :type="type"
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
    required: true
  },
  modelValue: {
    type: [String, Number],
    required: false
  },
  type: {
    type: String,
    default: 'text'
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
