<template>
  <field-generic-listitem>
    <div class="flex items-start justify-between gap-4">
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

        <div
          v-if="showField('geoLocation') && entry.geoLocation"
          class="grid grid-cols-12 col-span-12 gap-8 mt-8"
        >
          <div class="col-span-6">
            <p>
              Helfen Sie uns, den Standort so präzise, wie möglich anzugeben.
            </p>

            <ul class="mt-2 mb-8 ml-8 text-sm list-decimal">
              <li>Zoomen Sie in der Karte an den gewünschten Standort.</li>
              <li>Setzen Sie per Klick in die Karte eine Standortmarkierung.</li>
              <li>Falls Sie die Eingabe korrigieren wollen, klicken sie an eine neue Position oder löschen Sie die Geo-Koordinaten aus den Eingabefeldern.</li>
              <li>Breitengrad und Längengrad sollte nur Zahlen mit Dezimalpunkt enthalten</li>
            </ul>

            <form-input-text
              v-model="entry.geoLocation.latitude"
              :label="$t('modules.point_of_interest.form.labels.latitude')"
              onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode == 46 || event.charCode == 0"
            />
            <form-input-text
              v-model="entry.geoLocation.longitude"
              :label="$t('modules.point_of_interest.form.labels.longitude')"
              onkeypress="return (event.charCode >= 48 && event.charCode <= 57) || event.charCode == 46 || event.charCode == 0"
            />
          </div>
          <div class="col-span-6">
            <div class="relative w-full h-96">
              <form-input-location
                v-model:latitute="entry.geoLocation.latitude"
                v-model:longitude="entry.geoLocation.longitude"
              />
            </div>
          </div>
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
  </field-generic-listitem>
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
</script>
