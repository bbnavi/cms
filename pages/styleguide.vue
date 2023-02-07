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

    <pre>{{ form }}</pre>
  </div>
</template>

<script setup>
const form = reactive({
  title: '',
  description: '',
  body: '<p>Hallo Welt!</p>',
  category: 'Germany',
  active: null
})

const selectOptions = [
  { value: 'United States', label: 'United States' },
  { value: 'Canada', label: 'Canada' },
  { value: 'Mexico', label: 'Mexico' },
  { value: 'Germany', label: 'Germany' },
]
</script>
