<template>
  <div>
    <div class="flex items-center justify-between gap-4 mb-8">
      <input
        v-model="searchValue"
        :placeholder="$t('common.placeholder.search')"
        type="search"
        class="px-3 py-2 border rounded outline-none w-72"
      />

      <ui-button
        :to="{ name: params.category_id ? 'category-new' : 'module-new', params }"
        type="button"
      >
        <ui-icon icon="plus" />
        <span>{{  $t('common.buttons.newEntry') }}</span>
      </ui-button>
    </div>

    <Vue3EasyDataTable
      ref="dataTable"
      :headers="headers"
      :items="items"
      :search-value="searchValue"
      :empty-message="$t('common.msg.noEntries')"
      :rows-per-page-message="$t('common.msg.rowsPerPage')"
      :rows-of-page-separatorMessage="$t('common.msg.rowsOfPageSeparator')"
      :hide-footer="clientItemsLength === 0"
    >
      <template #item-name="{ name, id }">
        <nuxt-link :to="{ name: categoryId ? 'category-edit' : 'module-edit', params: { module: moduleName, category_id: categoryId, id: id } }">
          {{ name }}
        </nuxt-link>
      </template>

      <template #item-visible="{ id, visible }">
        <module-entry-toggle-visibility
          :id="id"
          :recordType="moduleConfig.recordType"
          :visible="visible"
        />
      </template>

      <template #item-createdAt="{ createdAt }">
        <span class="whitespace-nowrap">
          {{ $dayjs(createdAt, 'YYYY-MM-DD HH:mm:ss').format('DD.MM.YYYY - HH:mm') }}
        </span>
      </template>

      <template #item-actions="{ id }">
        <div class="flex items-center gap-2">
          <nuxt-link :to="{ name: categoryId ? 'category-edit' : 'module-edit', params: { module: moduleName, category_id: categoryId, id: id } }">
            <ui-icon icon="edit" />
          </nuxt-link>

          <button>
            <ui-icon icon="delete" />
          </button>
        </div>
      </template>

      <template #pagination="{ prevPage, nextPage, isFirstPage, isLastPage }">
        <div class="flex gap-1 ml-6">
          <button :disabled="isFirstPage" class="disabled:text-gray-200" @click="prevPage">
            <ui-icon icon="arrow-left" />
          </button>

          <button :disabled="isLastPage" class="disabled:text-gray-200" @click="nextPage">
            <ui-icon icon="arrow-right" />
          </button>
        </div>
      </template>
    </Vue3EasyDataTable>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useCategoryStore } from '@/stores/category'
import { getConfig } from '@/config/module-settings'
import Vue3EasyDataTable from 'vue3-easy-data-table';

const { params } = useRoute()
const { $i18n } = useNuxtApp()

const dataTable = ref()
const searchValue = ref('')
const categoryId = params.category_id
const moduleName = params.module
const moduleConfig = getConfig(moduleName)
const headers = [
  { text: $i18n.t('common.dataTable.header.id'), value: "id", sortable: true },
  { text: $i18n.t('common.dataTable.header.name'), value: "name", sortable: true },
  { text: $i18n.t('common.dataTable.header.dataProvider'), value: "dataProvider", sortable: true },
  { text: $i18n.t('common.dataTable.header.createdAt'), value: "createdAt", sortable: true },
  { text: $i18n.t('common.dataTable.header.visible'), value: "visible", sortable: true },
  { text: $i18n.t('common.dataTable.header.actions'), value: "actions" }
]

const categoryStore = useCategoryStore()
await categoryStore.fetchScoped(categoryId)
const { scopedEntries } = storeToRefs(categoryStore)
const categoryIds = scopedEntries.value.map(category => category.id)

const filename = categoryId ? 'category' : 'index'
const module = await import(`@/graphql/queries/modules/${moduleName}/${filename}.gql`)
const query = module.default

let entries = reactive([])
const { data } = await useAsyncQuery(query, { categoryIds })
entries = data?.value[moduleConfig.graphQL.queryRootIndex] || []
const clientItemsLength = computed(() => dataTable.value?.clientItemsLength)

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
  position: relative;
  box-sizing: border-box;

  table {
    @apply w-full;
    @apply border-t border-gray-800;
    @apply text-sm;
  }

  // TABLE: Main
  .vue3-easy-data-table__main {
    width: 100%;
    overflow: auto;

    &::-webkit-scrollbar-track {
      border-radius: 10px;
      background-color: #fff;
    }

    &::-webkit-scrollbar {
      width: 7px;
      height: 7px;
      background-color: #fff;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: #c1c1c1;
    }

    &::-webkit-scrollbar-corner {
      background-color: #fff;
    }
  }

  // TABLE: Header
  .vue3-easy-data-table__header {
    th {
      @apply px-2 py-4 text-start;
      @apply border-b border-gray-800;

      .header {
        @apply flex items-center;
      }

      &.sortable {
        cursor: pointer;

        .sortType-icon {
          @apply h-4 w-4 ml-1;
          @apply bg-no-repeat bg-center;

          background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTggMTBMMTIgMTRMMTYgMTAiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTggMTBMMTIgMTRMMTYgMTAiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjIiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==);
          background-size: 24px auto;
        }

        &.none {
          &:hover {
            .sortType-icon {
              @apply opacity-100;
            }
          }
          .sortType-icon {
            @apply opacity-0;
            @apply transition-colors duration-500 ease-in-out;
          }
        }

        &.desc {
          .sortType-icon {
            @apply rotate-180;
          }
        }
      }
    }
  }

  .vue3-easy-data-table__message {
    @apply flex flex-col items-center justify-center;
    @apply h-full py-20;
    @apply text-gray-500;
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

.easy-data-table__rows-selector {
  display: inline-block;
  min-width: 45px;
  position: relative;
  margin: 0px 10px;
  width: auto;

  .rows-input__wrapper {
    height: 20px;
    border-bottom: 1px solid #212121;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 5px;
    cursor: pointer;

    .triangle {
      display: inline-block;
      vertical-align: middle;
      width: 0px;
      height: 0px;
      border-top: solid 6px #212121;
      border-left: solid 6px transparent;
      border-right: solid 6px transparent;
    }
  }
  ul.select-items {
    &.show {
      display: block;
    }

    &.inside {
      bottom: 0px;
      top: auto;
    }

    position: absolute;
    top: 20px;
    left: 0px;
    width: 100%;
    display: none;
    margin: 0px;
    padding: 0px;
    text-align: left;
    list-style-type: none;
    box-shadow: 0 5px 5px -3px rgb(0 0 0 / 20%), 0 8px 10px 1px rgb(0 0 0 / 14%), 0 3px 14px 2px rgb(0 0 0 / 12%);
    z-index: auto;

    li {
      cursor: pointer;
      padding: 5px;
      background-color: #fff;

      &.selected {
        @apply text-brand;
      }
    }
  }
}

</style>
