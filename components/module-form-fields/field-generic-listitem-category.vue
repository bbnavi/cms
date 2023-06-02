<template>
  <field-generic-listitem>
    <div class="flex items-center justify-between gap-4">
      <form-input-select
        v-model="inputValue"
        :options="selectOptions"
        :include-blank="false"
        class="flex-1"
      />

      <ui-button
        v-if="removable"
        type="button"
        icon-only
        @click="emit('update:entry', null)"
      >
        <ui-icon icon="delete" />
      </ui-button>
    </div>
  </field-generic-listitem>
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
  },
  removable: {
    type: Boolean,
    required: false,
    default: false
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
  get() {
    if (selectOptions.value.length === 1) {
      return selectOptions.value[0].value
    } else {
      return props.entry?.id || ''
    }
  },
  set(value) { emit('update:entry', categories.find(category => category.id === value)) }
})
</script>
