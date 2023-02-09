<template>
  <div class="flex items-center justify-between gap-4 p-4 border">
    <form-input-select
      v-model="inputValue"
      :options="selectOptions"
      class="flex-1"
    />

    <ui-button @click="emit('update:entry', null)">
      {{ $t('common.buttons.remove') }}
    </ui-button>
  </div>
</template>

<script setup>
import categoriesQuery from '@/graphql/queries/categories.gql'
import categoriesForScopeQuery from '@/graphql/queries/categoriesForScope.gql'

const emit = defineEmits(['update:entry'])

const props = defineProps({
  entry: {
    type: Object,
    required: true
  }
})

// load categories
let categories = reactive([])
const scopeId = null
const query = scopeId ? categoriesForScopeQuery : categoriesQuery
const { data } = await useAsyncQuery(query, { category_id: scopeId })
categories = await data?.value?.categories

const selectOptions = computed(() => {
  return categories.map(category => {
    return {
      value: category.id,
      label: category.name
    }
  })
})

const inputValue = computed({
  get() { return props.entry?.id || '' },
  set(value) { emit('update:entry', categories.find(category => category.id === value)) }
})
</script>
