<template>
  <div class="py-4 mb-8 bg-gray-300">
    <div class="container flex items-center justify-between mx-auto">
      <div class="flex items-center gap-4">
        <nuxt-link to="/">Home</nuxt-link>
      </div>

      <div class="flex items-center justify-between gap-4">
        <nuxt-link
          v-if="status === 'unauthenticated'"
          to="/login"
        >
          Login
        </nuxt-link>

        <div v-if="status === 'authenticated'" class="flex gap-4">
          <div>
            {{ data.user.email }}
          </div>
          <button @click="signOut">
            Logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { data, status, signOut } = useSession()
</script>

<style lang="scss" scoped>
</style>
