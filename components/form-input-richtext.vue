<template>
  <form-group>
    <form-label>
      <span v-if="label">
        {{ label }}
      </span>

      <client-only>
        <quill-editor
          theme="snow"
          v-model:content="content"
          content-type="html"
        />
      </client-only>
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

const content = computed({
  get() { return props.modelValue },
  set(value) { emit('update:modelValue', value) }
})
</script>
