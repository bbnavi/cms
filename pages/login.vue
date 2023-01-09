<template>
  <div class="flex items-center justify-center">
    <form @submit.prevent="onSubmit" class="flex flex-col w-1/4 gap-4 mt-20">
      <div>
        <label for="email" class="block mb-1 text-sm">
          E-Mail
        </label>
        <input
          id="email"
          type="email"
          v-model="email"
          class="w-full p-2 border"
          autocomplete="email"
        />
      </div>

      <div>
        <label for="password" class="block mb-1 text-sm">
          Passwort
        </label>
        <input
          id="password"
          type="password"
          v-model="password"
          class="w-full p-2 border"
          autocomplete="current-password"
        />
      </div>

      <button type="submit" class="w-full px-4 py-2 text-white bg-black">
        Login
      </button>
    </form>
  </div>
</template>

<script setup>
definePageMeta({ auth: false })

const { signIn } = useSession()
const email = ref('')
const password = ref('')

const onSubmit = async () => {
  const { query } = useRoute()
  const callbackUrl = query.callbackUrl || '/'

  await signIn("credentials", {
    email: email.value,
    password: password.value,
    redirect: true,
    callbackUrl
  })
}
</script>

<style lang="scss" scoped>
</style>
