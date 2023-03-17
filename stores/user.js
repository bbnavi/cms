import { defineStore, storeToRefs } from 'pinia'
import { useCategoryStore } from '@/stores/category'
import { getConfig } from '@/config/module-settings'

export const useUserStore = defineStore({
  id: 'user-store',

  state: () => {
    return {
      user: null,
      applications: [],
      roles: [],
      modules: []
    }
  },

  actions: {
    init (value) {
      const categoryStore = useCategoryStore()

      this.user = value.user
      this.applications = value.applications
      this.roles = value.roles
      this.modules = []

      // setup modules
      this.roles && Object.keys(this.roles)
        .filter((key) => this.roles[key] === true)
        .map(role => {
          const moduleName = role.slice(5)
          const moduleIcon = `modules/${moduleName}`
          const moduleConfig = getConfig(moduleName)

          if (!moduleConfig) {
            console.warn('Module settings not found', moduleName)
            return
          }

          this.modules.push({
            name: moduleName,
            icon: moduleIcon,
            iconFallback: moduleIcon,
            label: moduleConfig.name,
            routeName: 'module-index',
            params: {
              module: moduleName
            },
            query: {}
          })

          // module category entries
          this.roles[`${role}_category_ids`] && this.roles[`${role}_category_ids`].map(id => this.modules.push({
            name: `${moduleName}_category_${id}`,
            icon: `modules/${moduleName}_category_${id}`,
            iconFallback: moduleIcon,
            label: categoryStore.getCategoryById(id).name,
            routeName: 'category-index',
            params: {
              module: moduleName,
              category_id: id
            },
            query: {}
          }))
        })
    }
  },

  getters: {
    permission () {
      return this.user.role
    },

    activeModules () {
      return this.modules
    }
  }
})
