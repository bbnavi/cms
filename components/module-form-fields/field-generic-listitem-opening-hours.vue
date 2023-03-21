<template>
  <div class="flex items-start justify-between gap-4 p-4 border">
    <div class="grid flex-1 grid-cols-12 gap-4">
      <div class="col-span-3">
        <form-input-text
          v-model="entry.dateFrom"
          :required="true"
          :label="$t('modules.point_of_interest.form.labels.openingHours.startDate')"
          type="date"
        />
      </div>
      <div class="col-span-3">
        <form-input-text
          v-model="entry.timeFrom"
          :required="true"
          :label="$t('modules.point_of_interest.form.labels.openingHours.startTime')"
          type="time"
        />
      </div>
      <div class="col-span-3">
        <form-input-text
          v-model="entry.dateTo"
          :label="$t('modules.point_of_interest.form.labels.openingHours.endDate')"
          type="date"
        />
      </div>
      <div class="col-span-3">
        <form-input-text
          v-model="entry.timeTo"
          :label="$t('modules.point_of_interest.form.labels.openingHours.endTime')"
          type="time"
        />
      </div>
      <div class="col-span-6">
        <form-input-text
          v-model="entry.description"
          :label="$t('modules.point_of_interest.form.labels.openingHours.description')"
        />
      </div>

      <div class="col-span-6">
        <form-input-select
          v-model="entry.weekday"
          :label="$t('modules.point_of_interest.form.labels.openingHours.weekday')"
          :options="weekdays"
        />
      </div>

      <div class="col-span-6">
        <form-input-checkbox
          v-model="entry.open"
          :label="$t('modules.point_of_interest.form.labels.openingHours.open')"
        />
      </div>
    </div>

    <ui-button
      v-if="removable"
      type="button"
      icon-only
      @click="emit('update:entry', null)"
    >
      <ui-icon icon="delete" />
    </ui-button>
  </div>
</template>

<script setup>
import weekdays from '@/data/weekdays.json'

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
</script>
