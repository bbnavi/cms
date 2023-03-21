<template>
  <form-group>
    <form-label>
      <span v-if="label">
        {{ label }}
      </span>

      <input
        :required="required"
        type="file"
        class="px-2 py-1.5 text-base border border-gray-200 rounded bg-white"
        multiple="false"
        @change="handleInput"
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
    type: Object,
    required: false
  },
  required: {
    type: Boolean,
    default: false
  }
})

const handleInput = (event) => {
  emit('update:modelValue', event)
}
</script>
