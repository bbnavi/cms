<template>
  <div>
    <ui-page-title
      :title="$t('account.profile.title')"
      :overline="$t('account.profile.overline')"
    />

    <main-content-box>
      <form @submit.prevent="onSubmit">
        <fieldset>
          <form-input-text
            v-model="form.name"
            :label="$t('account.profile.form.labels.name')"
          >
            <template #description>
              {{ $t('account.profile.form.hints.name') }}
            </template>
          </form-input-text>

          <form-input-text
            v-model="form.description"
            :label="$t('account.profile.form.labels.description')"
          >
            <template #description>
              {{ $t('account.profile.form.hints.description') }}
            </template>
          </form-input-text>

          <form-input-text
            v-model="form.logo.url"
            :label="$t('account.profile.form.labels.logo')"
          >
            <template #description>
              {{ $t('account.profile.form.hints.logo') }}
            </template>
          </form-input-text>

          <form-input-text
            v-model="form.logo.description"
            :label="$t('account.profile.form.labels.logo_description')"
          />
        </fieldset>

        <h2 class="mt-12 mb-2 text-3xl">
          {{ $t('account.profile.form.headlines.address') }}
        </h2>
        <p class="mb-8">
          {{ $t('account.profile.form.sectionHint') }}
        </p>
        <fieldset>
          <div class="grid grid-cols-12 gap-6">
            <div class="col-span-12 md:col-span-6">
              <form-input-text
                v-model="form.address.street"
                :label="$t('account.profile.form.labels.address.street')"
              />
            </div>
            <div class="col-span-12 md:col-span-6">
              <form-input-text
                v-model="form.address.addition"
                :label="$t('account.profile.form.labels.address.addition')"
              />
            </div>
            <div class="col-span-12 md:col-span-6">
              <form-input-text
                v-model="form.address.zip"
                :label="$t('account.profile.form.labels.address.zip')"
              />
            </div>
            <div class="col-span-12 md:col-span-6">
              <form-input-text
                v-model="form.address.city"
                :label="$t('account.profile.form.labels.address.city')"
              />
            </div>
          </div>
        </fieldset>

        <h2 class="mt-12 mb-2 text-3xl">
          {{ $t('account.profile.form.headlines.contact') }}
        </h2>
        <p class="mb-8">
          {{ $t('account.profile.form.sectionHint') }}
        </p>
        <fieldset>
          <div class="grid grid-cols-12 gap-6">
            <div class="col-span-12 md:col-span-6">
              <form-input-text
                v-model="form.contact.first_name"
                :label="$t('account.profile.form.labels.contact.firstName')"
              />
            </div>
            <div class="col-span-12 md:col-span-6">
              <form-input-text
                v-model="form.contact.last_name"
                :label="$t('account.profile.form.labels.contact.lastName')"
              />
            </div>
            <div class="col-span-12 md:col-span-6">
              <form-input-text
                v-model="form.contact.phone"
                :label="$t('account.profile.form.labels.contact.phone')"
              />
            </div>
            <div class="col-span-12 md:col-span-6">
              <form-input-text
                v-model="form.contact.fax"
                :label="$t('account.profile.form.labels.contact.fax')"
              />
            </div>
            <div class="col-span-12">
              <form-input-text
                v-model="form.contact.email"
                :label="$t('account.profile.form.labels.contact.email')"
              />
            </div>
          </div>
        </fieldset>

        <div class="flex gap-4 pt-8 mt-12 border-t">
          <ui-button
            :loading="isLoading"
            type="submit"
          >
            {{ $t('common.buttons.save') }}
          </ui-button>
        </div>
      </form>
    </main-content-box>
  </div>
</template>

<script setup>
const config = useRuntimeConfig()
const { $i18n } = useNuxtApp()
const { data:sessionData } = useSession()
const isLoading = ref(false)
const form = reactive({
  id: '',
  name: '',
  description: '',
  logo: {
    url: '',
    description: ''
  },
  address: {
    street: '',
    addition: '',
    zip: '',
    city: ''
  },
  contact: {
    first_name: '',
    last_name: '',
    phone: '',
    fax: '',
    email: ''
  }
})

const url = config.public.datahubEndpoint + '/data_provider/edit.json'
const authenticationToken = sessionData.value.user.image.authentication_token

const { data, error } = await useFetch(url, { params: { auth_token: authenticationToken }})

if (data) {
  const profileData = data.value

  form.id = profileData.id
  form.name = profileData.name
  form.description = profileData.description
  form.logo.id = profileData.logo.id
  form.logo.url = profileData.logo.url
  form.logo.description = profileData.logo.description
  form.address.id = profileData.address.id
  form.address.street = profileData.address.street
  form.address.addition = profileData.address.addition
  form.address.zip = profileData.address.zip
  form.address.city = profileData.address.city
  form.contact.id = profileData.contact.id
  form.contact.first_name = profileData.contact.first_name
  form.contact.last_name = profileData.contact.last_name
  form.contact.phone = profileData.contact.phone
  form.contact.fax = profileData.contact.fax
  form.contact.email = profileData.contact.email
}

const onSubmit = async () => {
  isLoading.value = true
  const url = config.public.datahubEndpoint + '/data_provider/update.json'

  const response = await useFetch(url, {
    method: 'POST',
    body: {
      data_provider: {
        id: form.id,
        name: form.name,
        description: form.description,
        logo_attributes: {
          id: form.logo.id,
          url: form.logo.url,
          description: form.logo.description
        },
        address_attributes: {
          id: form.address.id,
          street: form.address.street,
          addition: form.address.addition,
          zip: form.address.zip,
          city: form.address.city
        },
        contact_attributes: {
          id: form.contact.id,
          first_name: form.contact.first_name,
          last_name: form.contact.last_name,
          phone: form.contact.phone,
          fax: form.contact.fax,
          email: form.contact.email
        }
      },
      auth_token: authenticationToken
    }
  })

  if (response.error) {
    console.log(response.error)
  }

  isLoading.value = false
}

useHead({
  title: $i18n.t('common.pageTitle.pageAccountProfile')
})
</script>

<style lang="scss" scoped>
</style>
