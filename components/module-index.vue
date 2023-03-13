<template>
  <div class="flex flex-col justify-between gap-8 mb-8 md:flex-row md:items-center">
    <module-title />

    <div class="flex flex-row items-center gap-2">
      <input
        v-model="searchValue"
        type="search"
        class="h-8 px-2 border rounded outline-none"
      />

      <ui-button
        :to="{ name: params.category_id ? 'category-new' : 'module-new', params }"
        size="sm"
        type="button"
      >
        {{  $t('common.buttons.newEntry') }}
      </ui-button>
    </div>
  </div>

  <main-content-box>
    <module-data-table :search-value="searchValue" />
  </main-content-box>
</template>

<script setup>
const { params } = useRoute()
const searchValue = ref('')
</script>
