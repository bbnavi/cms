<template>
  <h1 class="mb-8 text-4xl">
    {{ $t(`modules.${params.module}.title`) }}
  </h1>

  <div>
    NEW ENTRY
  </div>
</template>

<script setup>
const { params } = useRoute()

definePageMeta({
  name: 'module-new',
})
</script>
