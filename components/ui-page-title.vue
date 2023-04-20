<template>
  <div class="mb-8">
    <nuxt-link
      v-if="props.overlineTo"
      :to="props.overlineTo"
    >
      {{ props.overline }}
    </nuxt-link>
    <span v-else="props.overline">
      {{ props.overline }}
    </span>
    <h1 class="text-4xl">
      {{ props.title }}
    </h1>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  overline: {
    type: String,
    required: false
  },
  overlineTo: {
    type: [String, Object],
    required: false
  }
})
</script>

<style lang="scss" scoped>

</style>
