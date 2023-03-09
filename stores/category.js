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
      const categoriesResult = await data?.value?.categories
      const categories = categoriesResult.length ? categoriesResult : [this.getCategoryById(scopeId)]

      return categories
    },

    async init (scopeId = null) {
      this.entries = await this.fetch(scopeId)
    },

    async fetchScoped (scopeId = null) {
      this.scopedEntries = await this.fetch(scopeId)
    },

    getCategoryById (categoryId) {
      return this.entries.find((category) => category.id === categoryId)
    }
  }
})
