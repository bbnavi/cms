<template>
  <h1 class="mb-8 text-4xl">
    Styleguide
  </h1>

  <div>
    <form-input-text
      v-model="form.title"
      label="Titel"
    />

    <form-input-textarea
      v-model="form.description"
      label="Beschreibung"
    />

    <form-input-richtext
      v-model="form.body"
      label="Body"
    />

    <form-input-select
      v-model="form.category"
      label="Kategorie"
      :options="selectOptions"
    />

    <form-input-checkbox
      v-model="form.active"
      label="Aktiv"
    />

    <form-group>
      <div class="grid grid-cols-12 gap-8">
        <div class="col-span-6">
          <form-input-text
            v-model="form.latitude"
            label="Latitude"
          />

          <form-input-text
            v-model="form.longitude"
            label="Longitude"
          />
        </div>
        <div class="col-span-6">
          <form-input-location
            v-model:latitute="form.latitude"
            v-model:longitude="form.longitude"
            class="w-full aspect-video"
          />
        </div>
      </div>
    </form-group>

    <div class="text-black bg-green-200">
      <ui-switch v-model="form.active" />
    </div>

    <div class="space-y-3">
      <div class="flex gap-2">
        <ui-button action="primary">Primary</ui-button>
        <ui-button action="primary" disabled="true">Primary Disabled</ui-button>
      </div>
      <div class="flex gap-2">
        <ui-button action="secondary">Secondary</ui-button>
        <ui-button action="secondary" disabled="true">Secondary</ui-button>
      </div>
      <div class="flex gap-2">
        <ui-button action="primary-outline">Primary Outline</ui-button>
        <ui-button action="primary-outline" disabled="true">Primary Outline Disabled</ui-button>
      </div>
      <div class="flex gap-2">
        <ui-button action="secondary-outline">Secondary</ui-button>
        <ui-button action="secondary-outline" disabled="true">Secondary Disabled</ui-button>
      </div>
      <div class="flex gap-2">
        <ui-button action="tertiary">Tertiary</ui-button>
        <ui-button action="tertiary" disabled="true">Tertiary</ui-button>
      </div>
    </div>

    <pre>{{ form }}</pre>
  </div>
</template>

<script setup>
const form = reactive({
  title: '',
  description: '',
  body: '<p>Hallo Welt!</p>',
  category: 'Germany',
  active: false,
  latitude: 51.165691,
  longitude: 10.451526
})

const selectOptions = [
  { value: 'United States', label: 'United States' },
  { value: 'Canada', label: 'Canada' },
  { value: 'Mexico', label: 'Mexico' },
  { value: 'Germany', label: 'Germany' },
]
</script>
