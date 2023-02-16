<template>
  <h1 class="mb-8 text-4xl">
    {{ $t(`modules.${params.module}.title`) }}
  </h1>

  <main-content-box>
    <module-form :moduleName="params.module" />
  </main-content-box>
</template>

<script setup>
const { params } = useRoute()

definePageMeta({
  name: 'module-edit',
})
</script>
