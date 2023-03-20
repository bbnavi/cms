<template>
  <div class="form-field field-open-street-map">
    <h3>
      {{ $t('modules.point_of_interest.form.headlines.openStreetMap') }}
    </h3>

    <div class="flex items-start justify-between gap-4">
      <div class="grid flex-1 grid-cols-12 gap-4">
        <div v-if="showField('capacity')" class="col-span-6">
          <form-input-text
            v-model="inputValue.capacity"
            type="number"
            :label="$t('modules.point_of_interest.form.labels.openStreetMap.capacity')"
          />
        </div>
        <div v-if="showField('capacityCharging')" class="col-span-6">
          <form-input-text
            v-model="inputValue.capacityCharging"
            :label="$t('modules.point_of_interest.form.labels.openStreetMap.capacityCharging')"
          />
        </div>
        <div v-if="showField('capacityDisabled')" class="col-span-6">
          <form-input-text
            v-model="inputValue.capacityDisabled"
            :label="$t('modules.point_of_interest.form.labels.openStreetMap.capacityDisabled')"
          />
        </div>
        <div v-if="showField('fee')" class="col-span-6">
          <form-input-select
            v-model="inputValue.fee"
            :label="$t('modules.point_of_interest.form.labels.openStreetMap.fee')"
            :options="optionsYesNo"
          />
        </div>
        <div v-if="showField('lit')" class="col-span-6">
          <form-input-select
            v-model="inputValue.lit"
            :label="$t('modules.point_of_interest.form.labels.openStreetMap.lit')"
            :options="optionsYesNo"
          />
        </div>
        <div v-if="showField('parking')" class="col-span-6">
          <form-input-select
            v-model="inputValue.parking"
            :label="$t('modules.point_of_interest.form.labels.openStreetMap.parking')"
            :options="optionsParking"
          />
        </div>
        <div v-if="showField('shelter')" class="col-span-6">
          <form-input-select
            v-model="inputValue.shelter"
            :label="$t('modules.point_of_interest.form.labels.openStreetMap.shelter')"
            :options="optionsYesNo"
          />
        </div>
        <div v-if="showField('surface')" class="col-span-6">
          <form-input-text
            v-model="inputValue.surface"
            :label="$t('modules.point_of_interest.form.labels.openStreetMap.surface')"
          />
        </div>
        <div v-if="showField('utilization')" class="col-span-6">
          <form-input-text
            v-model="inputValue.utilization"
            :label="$t('modules.point_of_interest.form.labels.openStreetMap.utilization')"
          />
        </div>
        <div v-if="showField('website')" class="col-span-6">
          <form-input-text
            v-model="inputValue.website"
            :label="$t('modules.point_of_interest.form.labels.openStreetMap.website')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import optionsYesNo from '@/data/options-yes-no.json'
import optionsParking from '@/data/options-parking.json'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  modelValue: {
    type: [String, Number, Boolean, Array, Object],
    required: false
  },
  options: {
    type: Object,
    required: true
  },
  moduleName: {
    type: String,
    required: true
  },
  excludeFormFieldAttributes: {
    type: Array,
    default: () => [],
    required: false
  }
})

const showField = (fieldName) => {
  if (props.excludeFormFieldAttributes.length === 0) return true

  return props.excludeFormFieldAttributes.includes(fieldName) === false
}

const inputValue = computed({
  get() { return props.modelValue || props.options?.defaultValue || '' },
  set(value) { emit('update:modelValue', value) }
})
</script>

