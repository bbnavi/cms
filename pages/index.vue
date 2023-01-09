<template>
  <h1 class="mb-8 text-4xl">Points Of Interest</h1>

  <ul>
    <li
      v-for="entry in pointsOfInterest"
      :key="entry.id"
    >
      {{ entry.name }}
    </li>
  </ul>
</template>

<script setup>
import query from '@/graphql/queries/pointsOfInterest.gql'

let pointsOfInterest = reactive([])

const { data } = await useAsyncQuery(query)
pointsOfInterest = data.value?.pointsOfInterest
</script>

<style lang="scss">
</style>
