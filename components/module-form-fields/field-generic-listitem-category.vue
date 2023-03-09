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
import { storeToRefs } from 'pinia'
import { useCategoryStore } from '@/stores/category'

const { params } = useRoute()

const emit = defineEmits(['update:entry'])

const props = defineProps({
  entry: {
    type: Object,
    required: true
  }
})

const categoryStore = useCategoryStore()
await categoryStore.fetchScoped(params.category_id)
const { scopedEntries } = storeToRefs(categoryStore)
const categories = scopedEntries.value || []

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
