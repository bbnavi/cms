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

      <template #pagination="{ prevPage, nextPage, isFirstPage, isLastPage }">
        <button :disabled="isFirstPage" @click="prevPage">
          <ui-icon icon="arrow-left" />
        </button>

        <button :disabled="isLastPage" @click="nextPage">
          <ui-icon icon="arrow-right" />
        </button>
      </template>
    </Vue3EasyDataTable>
  </div>
</template>

<script setup>
import { getConfig } from '@/config/module-settings'
import Vue3EasyDataTable from 'vue3-easy-data-table';
//import 'vue3-easy-data-table/dist/style.css';

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

<style lang="scss">
//@import '../assets/css/modules/vue3-easy-data-table';

.vue3-easy-data-table {
  table {
    @apply w-full;
    @apply border-t border-gray-800;
    @apply text-sm;
  }

  // TABLE: Header
  .vue3-easy-data-table__header {
    th {
      @apply px-2 py-4 text-start;
      @apply border-b border-gray-800;
    }
  }

  // TABLE: Content
  .vue3-easy-data-table__body {
    td {
      @apply px-2 py-4 text-start min-h-[40px] leading-[1.35];
      @apply border-b;
    }
  }

  // TABLE: Pagination
  .vue3-easy-data-table__footer {
    @apply flex flex-row py-6;
    @apply text-sm;

    .pagination__items-index {
      @apply mr-auto;

      order: -1;
    }
  }
}

</style>