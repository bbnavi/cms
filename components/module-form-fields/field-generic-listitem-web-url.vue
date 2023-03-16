<template>
  <div class="flex items-start justify-between gap-4 p-4 border">
    <div class="grid flex-1 grid-cols-12 gap-4">
      <div class="col-span-6">
        <form-input-text
          v-model="entry.url"
          :label="$t('modules.point_of_interest.form.labels.webUrl.url')"
          required
        />
      </div>
      <div class="col-span-6">
        <form-input-text
          v-model="entry.description"
          :label="$t('modules.point_of_interest.form.labels.webUrl.description')"
          required
        />
      </div>
    </div>

    <ui-button
      v-if="removable"
      type="button"
      @click="removeEntry"
    >
      {{ $t('common.buttons.remove') }}
    </ui-button>
  </div>
</template>

<script setup>
const emit = defineEmits(['update:entry'])

const props = defineProps({
  entry: {
    type: Object,
    required: true
  },
  removable: {
    type: Boolean,
    required: false,
    default: false
  }
})

const removeEntry = () => {
  emit('update:entry', null)
}
</script>
