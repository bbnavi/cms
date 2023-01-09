import { defineStore } from 'pinia'

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
      return Object.keys(this.roles).filter((key) => this.roles[key] === true)
    }
  }
})
