<template>
  <div class="flex items-center justify-between">
    <h1 class="mb-8 text-4xl">
      {{ $t(`modules.${params.module}.title`) }}
    </h1>

    <ui-button
      :to="{ name: 'module-new', params: { module: params.module } }"
      size="sm"
    >
      {{  $t('common.buttons.newEntry') }}
    </ui-button>
  </div>
</template>

<script setup>
const { params } = useRoute()

definePageMeta({
  name: 'module-index',
})
</script>
