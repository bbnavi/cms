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

    <pre>{{ form }}</pre>
  </div>
</template>

<script setup>
const form = reactive({
  title: '',
  description: '',
  body: '<p>Hallo Welt!</p>',
  category: 'Germany',
  active: null,
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
