<template>
  <div class="form-field field-generic-list">
    <h3 class="mb-3 text-2xl">
      {{ $t(`${options.listTitle}`) }}
    </h3>

    <div class="space-y-2">
      <component
        v-for="(entry, listIndex) in modelValue"
        :key="listIndex"
        :is="options.listItemComponent"
        :entry="entry"
        :removable="isRemovable"
        @update:entry="(value) => handleInput(listIndex, value)"
      />
    </div>

    <div
      v-if="options.listMaxItems === undefined || modelValue.length < options.listMaxItems"
      class="mt-2"
    >
      <ui-button @click="addEntry">
        {{ $t('common.buttons.addEntry') }}
      </ui-button>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  modelValue: {
    type: Array,
    default: () => [],
  },
  options: {
    type: Object,
    required: true
  },
  moduleName: {
    type: String,
    required: true
  }
})

const isRemovable = computed(() => {
  return props.modelValue.length > props.options.listMinItems || props.options.listMinItems === undefined
})

const handleInput = (listIndex, value) => {
  props.modelValue[listIndex] = value

  if (!value) {
    props.modelValue.splice(listIndex, 1)
  }
}

const addEntry = () => {
  const newEntry = {
    // '__typename': 'Category'
  }

  props.modelValue.push(newEntry)
}
</script>
