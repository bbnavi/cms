<template>
  <module-title />

  <main-content-box>
    <module-form :moduleName="params.module" />
  </main-content-box>
</template>

<script setup>
const { params } = useRoute()

definePageMeta({
  name: 'category-edit',
})
</script>
