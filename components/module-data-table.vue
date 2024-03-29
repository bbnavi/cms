<template>
  <div v-if="entries.length === 0">
    {{ $t('common.msg.noEntries') }}
  </div>

  <div v-else="entries.length">
    <Vue3EasyDataTable
      :headers="headers"
      :items="items"
      :search-value="searchValue"
    >
      <template #item-name="{ name, id }">
        <nuxt-link :to="{ name: 'module-edit', params: { module: props.module, id: id } }">
          {{ name }}
        </nuxt-link>
      </template>

      <template #item-visible="{ visible }">
        {{ visible }}
      </template>

      <template #item-actions="{ id }">
        <div class="flex items-center gap-2">
          <nuxt-link :to="{ name: 'module-edit', params: { module: props.module, id: id } }">
            <ui-icon icon="edit" />
          </nuxt-link>

          <button>
            <ui-icon icon="delete" />
          </button>
        </div>
      </template>
    </Vue3EasyDataTable>
  </div>
</template>

<script setup>
import { getConfig } from '@/config/module-settings'
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

const { $i18n } = useNuxtApp()

const props = defineProps({
  module: {
    type: String,
    required: true
  },
  searchValue: {
    type: String,
    required: true
  }
})

const moduleConfig = getConfig(props.module)
const headers = [
  { text: $i18n.t('common.dataTable.header.id'), value: "id", sortable: true },
  { text: $i18n.t('common.dataTable.header.name'), value: "name", sortable: true },
  { text: $i18n.t('common.dataTable.header.dataProvider'), value: "dataProvider", sortable: true },
  { text: $i18n.t('common.dataTable.header.createdAt'), value: "createdAt", sortable: true },
  { text: $i18n.t('common.dataTable.header.visible'), value: "visible", sortable: true },
  { text: $i18n.t('common.dataTable.header.actions'), value: "actions" }
]

const module = await import(`@/graphql/queries/modules/${props.module}/index.gql`)
const query = module.default

let entries = reactive([])
const { data } = await useAsyncQuery(query)
entries = data?.value[moduleConfig.graphQL.queryRootIndex] || []

const items = computed(() => {
  return entries.map((entry) => {
    return {
      id: entry.id,
      name: entry.name,
      dataProvider: entry.dataProvider?.name,
      createdAt: entry.createdAt,
      visible: entry.visible
    }
  })
})
</script>
