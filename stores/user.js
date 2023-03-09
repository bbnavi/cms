import { defineStore, storeToRefs } from 'pinia'
import { useCategoryStore } from '@/stores/category'
import { getConfig } from '@/config/module-settings'

export const useUserStore = defineStore({
  id: 'user-store',

  state: () => {
    return {
      user: null,
      applications: [],
      roles: []
    }
  },

  actions: {
    init (value) {
      this.user = value.user
      this.applications = value.applications
      this.roles = value.roles
    }
  },

  getters: {
    permission () {
      return this.user.role
    },

    activeModules () {
      const categoryStore = useCategoryStore()

      let modules = []

      this.roles && Object.keys(this.roles)
        .filter((key) => this.roles[key] === true)
        .map(role => {
          const moduleName = role.slice(5)
          const moduleIcon = `modules/${moduleName}`
          const moduleConfig = getConfig(moduleName)

          modules.push({
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
          this.roles[`${role}_category_ids`] && this.roles[`${role}_category_ids`].map(id => modules.push({
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

      return modules
    }
  }
})
