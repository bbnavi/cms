<template>
  <div class="mt-10 form-field field-generic-list">
    <div class="flex items-center justify-between">
      <h3>
        {{ $t(`${options.listTitle}`) }}
      </h3>
    </div>

    <div class="space-y-3">
      <component
        v-for="(entry, listIndex) in modelValue"
        :key="listIndex"
        :is="options.listItemComponent"
        :entry="entry"
        :removable="isRemovable"
        :exclude-form-field-attributes="excludeFormFieldAttributes"
        @update:entry="(value) => handleInput(listIndex, value)"
      />
    </div>

    <div
      v-show="modelValue.length === 0"
      class="flex flex-col items-center justify-center"
    >
      <p class="pb-6 text-center text-gray-400">
        {{ $t('common.msg.noEntries') }}
      </p>

      <ui-button
        v-if="options.listMaxItems === undefined || modelValue.length < options.listMaxItems"
        type="button"
        action="secondary"
        @click="addEntry"
      >
        <ui-icon icon="plus" />
        <span>
          {{ $t('common.buttons.addEntry') }}
        </span>
      </ui-button>
    </div>

    <div
      v-show="modelValue.length > 0"
      class="mt-4"
    >
      <ui-button
        v-if="options.listMaxItems === undefined || modelValue.length < options.listMaxItems"
        type="button"
        action="secondary"
        @click="addEntry"
      >
        <ui-icon icon="plus" />
        <span>
          {{ $t('common.buttons.addEntry') }}
        </span>
      </ui-button>
    </div>
  </div>
</template>

<script setup>
import InputProxyClass from '@/graphql/inputs/InputProxyClass'

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
  },
  excludeFormFieldAttributes: {
    type: Object,
    required: false
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
  const defaultValue = new InputProxyClass(props.options.inputType, {})

  props.modelValue.push(defaultValue)
}
</script>
