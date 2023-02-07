<template>
  <form-group>
    <form-label>
      <span v-if="label">
        {{ label }}
      </span>

      <textarea
        :value="modelValue"
        :readonly="readonly"
        :required="required"
        class="px-4 py-2 text-base border border-black rounded"
        @input="handleInput"
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

const handleInput = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>
