<template>
  <div class="form-field field-custom-contact">
    <h3>
      {{ $t('modules.point_of_interest.form.headlines.contact') }}
    </h3>

    <div class="flex items-start justify-between gap-4">
      <div class="grid flex-1 grid-cols-12 gap-4">
        <div class="col-span-6">
          <form-input-text
            v-model="modelValue.firstName"
            :label="$t('modules.point_of_interest.form.labels.contact.firstName')"
          />
        </div>
        <div class="col-span-6">
          <form-input-text
            v-model="modelValue.lastName"
            :label="$t('modules.point_of_interest.form.labels.contact.lastName')"
          />
        </div>
        <div class="col-span-12">
          <form-input-text
            v-model="modelValue.email"
            :label="$t('modules.point_of_interest.form.labels.contact.email')"
            type="email"
          />
        </div>
        <div class="col-span-6">
          <form-input-text
            v-model="modelValue.phone"
            :label="$t('modules.point_of_interest.form.labels.contact.phone')"
          />
        </div>
        <div class="col-span-6">
          <form-input-text
            v-model="modelValue.fax"
            :label="$t('modules.point_of_interest.form.labels.contact.fax')"
          />
        </div>
      </div>
    </div>

    <div
      v-for="webUrl in modelValue.webUrls"
      :key="webUrl.url"
      class="grid flex-1 grid-cols-12 gap-4 mt-6"
    >
      <div class="col-span-6">
        <form-input-text
          v-model="webUrl.url"
          :label="$t('modules.point_of_interest.form.labels.webUrl.url')"
        />
      </div>
      <div class="col-span-6">
        <form-input-text
          v-model="webUrl.description"
          :label="$t('modules.point_of_interest.form.labels.webUrl.description')"
        />
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
</script>
