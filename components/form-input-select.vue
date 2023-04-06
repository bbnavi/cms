<template>
  <form-group>
    <form-label>
      <span v-if="label">
        {{ label }}
      </span>

      <select
        :readonly="readonly"
        :required="required"
        class="block px-4 py-2 text-base font-normal border border-gray-200 rounded appearance-none"
        @change="handleInput"
      >
        <option value="" />

        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          :selected="option.value === modelValue"
        >
          {{ option.label }}
        </option>
      </select>

      <div v-if="!!slots.description" class="mt-1 text-xs opacity-50">
        <slot name="description" />
      </div>
    </form-label>
  </form-group>
</template>

<script setup>
const slots = useSlots()
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  label: {
    type: String,
    required: false
  },
  modelValue: {
    type: String,
    required: false
  },
  options: {
    type: Array,
    required: true
  },
  readonly: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
})

const handleInput = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>
