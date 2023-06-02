<template>
  <div class="form-field field-operation-company">
    <h3>
      {{ $t('modules.point_of_interest.form.headlines.operatingCompany') }}
    </h3>
    <p
      v-if="$t('modules.point_of_interest.form.descriptions.operatingCompany')"
      class="mb-8 -mt-2 font-light opacity-50"
    >
      {{ $t('modules.point_of_interest.form.descriptions.operatingCompany') }}
    </p>

    <div class="flex items-start justify-between gap-4">
      <div class="grid flex-1 grid-cols-12 gap-4">
        <div class="col-span-12">
          <form-input-text
            v-model="inputValue.name"
            :label="$t('modules.point_of_interest.form.labels.operatingCompany.name')"
            required
          />
        </div>

        <div class="col-span-6">
          <form-input-text
            v-model="inputValue.contact.firstName"
            :label="$t('modules.point_of_interest.form.labels.operatingCompany.firstName')"
          />
        </div>
        <div class="col-span-6">
          <form-input-text
            v-model="inputValue.contact.lastName"
            :label="$t('modules.point_of_interest.form.labels.operatingCompany.lastName')"
          />
        </div>
        <div class="col-span-12">
          <form-input-text
            v-model="inputValue.contact.email"
            :label="$t('modules.point_of_interest.form.labels.operatingCompany.email')"
            type="email"
          />
        </div>
        <div class="col-span-6">
          <form-input-text
            v-model="inputValue.contact.phone"
            :label="$t('modules.point_of_interest.form.labels.operatingCompany.phone')"
          />
        </div>
        <div class="col-span-6">
          <form-input-text
            v-model="inputValue.contact.fax"
            :label="$t('modules.point_of_interest.form.labels.operatingCompany.fax')"
          />
        </div>

        <div class="col-span-6">
          <form-input-text
            v-model="inputValue.contact.webUrls.url"
            :label="$t('modules.point_of_interest.form.labels.webUrl.url')"
          />
        </div>
        <div class="col-span-6">
          <form-input-text
            v-model="inputValue.contact.webUrls.description"
            :label="$t('modules.point_of_interest.form.labels.webUrl.description')"
          />
        </div>

        <div class="col-span-6">
        <form-input-text
          v-model="inputValue.address.addition"
          :label="$t('modules.point_of_interest.form.labels.addition')"
        />
      </div>
      <div class="col-span-6">
        <form-input-text
          v-model="inputValue.address.street"
          :label="$t('modules.point_of_interest.form.labels.street')"
        />
      </div>
      <div class="col-span-6">
        <form-input-text
          v-model="inputValue.address.zip"
          :label="$t('modules.point_of_interest.form.labels.zip')"
        />
      </div>
      <div class="col-span-6">
        <form-input-text
          v-model="inputValue.address.city"
          :label="$t('modules.point_of_interest.form.labels.city')"
        />
      </div>

      <div v-if="inputValue.address.geoLocation" class="col-span-6">
        <form-input-text
          v-model="inputValue.address.geoLocation.latitude"
          :label="$t('modules.point_of_interest.form.labels.latitude')"
          type="string"
        />
        <form-input-text
          v-model="inputValue.address.geoLocation.longitude"
          :label="$t('modules.point_of_interest.form.labels.longitude')"
          type="string"
        />
      </div>
      <div v-if="inputValue.address.geoLocation" class="col-span-6">
        <div class="relative w-full aspect-video">
          <form-input-location
            v-model:latitute="inputValue.address.geoLocation.latitude"
            v-model:longitude="inputValue.address.geoLocation.longitude"
          />
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup>
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
  }
})

const inputValue = computed({
  get() { return props.modelValue || props.options?.defaultValue || '' },
  set(value) { emit('update:modelValue', value) }
})
</script>
