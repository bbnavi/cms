<template>
  <form-group>
    <label class="flex items-center gap-2">
      <input
        :value="inputValue"
        :readonly="readonly"
        :required="required"
        :checked="checked"
        type="checkbox"
        class="w-4 h-4 border-black rounded"
        @change="handleChange"
      />

      <span>
        {{ label }}
      </span>
    </label>
  </form-group>
</template>

<script setup>
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    required: false,
  },
  inputValue : {
    type: [String, Number, Boolean],
    required: false,
    default: true
  },
  label: {
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

const checked = computed(() => {
  return props.modelValue === props.inputValue
})

const handleChange = (event) => {
  const uncheckedValue = typeof props.inputValue === 'boolean' ? false : null

  emit('update:modelValue', event.target.checked ? props.inputValue : uncheckedValue)
}
</script>
