import { defineStore } from 'pinia'
import categoriesQuery from '@/graphql/queries/categories.gql'
import categoriesForScopeQuery from '@/graphql/queries/categoriesForScope.gql'

export const useCategoryStore = defineStore({
  id: 'category-store',

  state: () => {
    return {
      entries: [],
      scopedEntries: []
    }
  },

  actions: {
    async fetch (scopeId = null) {
      const query = scopeId ? categoriesForScopeQuery : categoriesQuery
      const { data } = await useAsyncQuery(query, { category_id: scopeId })
      const categories = await data?.value?.categories

      return categories || []
    },

    async init () {
      this.entries = await this.fetch()
    },

    async fetchScoped (scopeId = null) {
      const entries = await this.fetch(scopeId)

      this.scopedEntries = entries.length ? entries : [this.getCategoryById(scopeId)]
    },

    getCategoryById (categoryId) {
      return this.entries.find((category) => category.id === categoryId)
    }
  }
})
