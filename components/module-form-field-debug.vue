<template>
  <div v-if="isDevelopment">
    <div class="flex justify-end">
      <button
        type="button"
        class="flex items-center gap-1 py-2 text-sm"
        @click="showDebugInformation = !showDebugInformation"
      >
        <ui-icon icon="info" />
        <span>Debug Information</span>
        <strong>{{ options.component }}</strong>
      </button>
    </div>
    <div
      v-show="showDebugInformation"
      class="p-4 mb-20 overflow-x-auto text-xs rounded bg-slate-100"
    >
      <pre>name: {{ name }}</pre>
      <pre>component: {{ options.component }}</pre>
      <pre>modelValue: {{ modelValue }}</pre>
      <pre>options: {{ options }}</pre>
      <pre>excludeFormFieldAttributes: {{ excludeFormFieldAttributes }}</pre>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  options: {
    type: Object,
    required: true
  },
  modelValue: {
    type: [String, Number, Boolean, Array, Object],
    required: false
  },
  excludeFormFieldAttributes: {
    type: Object,
    required: false
  }
})

const isDevelopment = process.env.NODE_ENV === 'development'
const showDebugInformation = ref(false)
</script>
