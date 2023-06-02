<template>
  <div class="form-field field-open-street-map">
    <h3>
      {{ $t('modules.point_of_interest.form.headlines.openStreetMap') }}
    </h3>
    <p
      v-if="$t('modules.point_of_interest.form.descriptions.openStreetMap')"
      class="mb-8 -mt-2 font-light opacity-50"
    >
      {{ $t('modules.point_of_interest.form.descriptions.openStreetMap') }}
    </p>

    <div class="flex items-start justify-between gap-4">
      <div class="grid flex-1 grid-cols-12 gap-4">
        <div v-if="showField('capacity')" class="col-span-6">
          <form-input-text
            v-model="inputValue.capacity"
            type="number"
            :label="$t('modules.point_of_interest.form.labels.openStreetMap.capacity')"
          >
            <template #description>
              Möglicher Wert: Zahl <a target="_blank" href="https://wiki.openstreetmap.org/wiki/DE:Key:capacity">https://wiki.openstreetmap.org/wiki/DE:Key:capacity</a>
            </template>
          </form-input-text>
        </div>
        <div v-if="showField('capacityCharging')" class="col-span-6">
          <form-input-text
            v-model="inputValue.capacityCharging"
            :label="$t('modules.point_of_interest.form.labels.openStreetMap.capacityCharging')"
          >
            <template #description>
              Möglicher Wert: yes|no|Zahl <a target="_blank" href="https://wiki.openstreetmap.org/wiki/DE:Key:capacity:charging">https://wiki.openstreetmap.org/wiki/DE:Key:capacity:charging</a>
            </template>
          </form-input-text>
        </div>
        <div v-if="showField('capacityDisabled')" class="col-span-6">
          <form-input-text
            v-model="inputValue.capacityDisabled"
            :label="$t('modules.point_of_interest.form.labels.openStreetMap.capacityDisabled')"
          >
            <template #description>
              Möglicher Wert: yes|no|Zahl <a target="_blank" href="https://wiki.openstreetmap.org/wiki/DE:Key:capacity:disabled">https://wiki.openstreetmap.org/wiki/DE:Key:capacity:disabled</a>
            </template>
          </form-input-text>
        </div>
        <div v-if="showField('fee')" class="col-span-6">
          <form-input-select
            v-model="inputValue.fee"
            :label="$t('modules.point_of_interest.form.labels.openStreetMap.fee')"
            :options="optionsYesNo"
          >
            <template #description>
              Möglicher Wert: yes|no <a target="_blank" href="https://wiki.openstreetmap.org/wiki/DE:Key:fee">https://wiki.openstreetmap.org/wiki/DE:Key:fee</a>
            </template>
          </form-input-select>
        </div>
        <div v-if="showField('lit')" class="col-span-6">
          <form-input-select
            v-model="inputValue.lit"
            :label="$t('modules.point_of_interest.form.labels.openStreetMap.lit')"
            :options="optionsYesNo"
          >
            <template #description>
              Möglicher Wert: yes|no <a target="_blank" href="https://wiki.openstreetmap.org/wiki/DE:Key:lit">https://wiki.openstreetmap.org/wiki/DE:Key:lit</a>
            </template>
          </form-input-select>
        </div>
        <div v-if="showField('parking')" class="col-span-6">
          <form-input-select
            v-model="inputValue.parking"
            :label="$t('modules.point_of_interest.form.labels.openStreetMap.parking')"
            :options="optionsParking"
          >
            <template #description>
              Möglicher Wert: Beschreibung <a target="_blank" href="https://wiki.openstreetmap.org/wiki/DE:Key:parking">https://wiki.openstreetmap.org/wiki/DE:Key:parking</a>
            </template>
          </form-input-select>
        </div>
        <div v-if="showField('shelter')" class="col-span-6">
          <form-input-select
            v-model="inputValue.shelter"
            :label="$t('modules.point_of_interest.form.labels.openStreetMap.shelter')"
            :options="optionsYesNo"
          >
            <template #description>
              Möglicher Wert: yes|no <a target="_blank" href="https://wiki.openstreetmap.org/wiki/DE:Key:shelter">https://wiki.openstreetmap.org/wiki/DE:Key:shelter</a>
            </template>
          </form-input-select>
        </div>
        <div v-if="showField('surface')" class="col-span-6">
          <form-input-text
            v-model="inputValue.surface"
            :label="$t('modules.point_of_interest.form.labels.openStreetMap.surface')"
          >
            <template #description>
              Möglicher Wert: Beschreibung <a target="_blank" href="https://wiki.openstreetmap.org/wiki/DE:Key:surface">https://wiki.openstreetmap.org/wiki/DE:Key:surface</a>
            </template>
          </form-input-text>
        </div>
        <div v-if="showField('utilization')" class="col-span-6">
          <form-input-text
            v-model="inputValue.utilization"
            :label="$t('modules.point_of_interest.form.labels.openStreetMap.utilization')"
          >
            <template #description>
              Möglicher Wert: Beschreibung, "häufig bereits morgens überlastet"; "nur selten ausgelastet" <a target="_blank" href="https://wiki.openstreetmap.org/wiki/DE:Key:utilization">https://wiki.openstreetmap.org/wiki/DE:Key:utilization</a>
            </template>
          </form-input-text>
        </div>
        <div v-if="showField('website')" class="col-span-6">
          <form-input-text
            v-model="inputValue.website"
            :label="$t('modules.point_of_interest.form.labels.openStreetMap.website')"
          >
            <template #description>
              Möglicher Wert: Beschreibung <a target="_blank" href="https://wiki.openstreetmap.org/wiki/DE:Key:website">https://wiki.openstreetmap.org/wiki/DE:Key:website</a>
            </template>
          </form-input-text>
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

