<template>
  <div class="flex items-start justify-between gap-4 p-4 border">
    <div class="grid flex-1 grid-cols-12 gap-4">
      <div class="col-span-6">
        <form-input-text
          v-model="entry.addition"
          :label="$t('modules.point_of_interest.form.labels.addition')"
        />
      </div>
      <div class="col-span-6">
        <form-input-text
          v-model="entry.street"
          :label="$t('modules.point_of_interest.form.labels.street')"
        />
      </div>
      <div class="col-span-6">
        <form-input-text
          v-model="entry.zip"
          :label="$t('modules.point_of_interest.form.labels.zip')"
        />
      </div>
      <div class="col-span-6">
        <form-input-text
          v-model="entry.city"
          :label="$t('modules.point_of_interest.form.labels.city')"
        />
      </div>

      <div v-if="entry.geoLocation" class="col-span-6">
        <form-input-text
          v-model="entry.geoLocation.latitude"
          :label="$t('modules.point_of_interest.form.labels.latitude')"
          type="number"
        />
        <form-input-text
          v-model="entry.geoLocation.longitude"
          :label="$t('modules.point_of_interest.form.labels.longitude')"
          type="number"
        />
      </div>
      <div v-if="entry.geoLocation" class="col-span-6">
        <form-input-location
          v-model:latitute="entry.geoLocation.latitude"
          v-model:longitude="entry.geoLocation.longitude"
          class="w-full aspect-video"
        />
      </div>
    </div>

    <ui-button
      v-if="removable"
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
