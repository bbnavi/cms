<template>
  <div class="flex items-center justify-between mb-8 ">
    <h1 class="text-4xl">
      {{ $t(`modules.${params.module}.title`) }}
    </h1>

    <div class="flex items-center gap-2">
      <input
        v-model="searchValue"
        type="search"
        class="h-8 px-2 border rounded outline-none"
      />

      <ui-button
        :to="{ name: 'module-new', params: { module: params.module } }"
        size="sm"
      >
        {{  $t('common.buttons.newEntry') }}
      </ui-button>
    </div>
  </div>

  <main-content-box>
    <module-data-table
      :module="params.module"
      :search-value="searchValue"
    />
  </main-content-box>
</template>

<script setup>
const { params } = useRoute()
const searchValue = ref('')

definePageMeta({
  name: 'module-index',
})
</script>
