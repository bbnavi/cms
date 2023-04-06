<template>
  <form @submit.prevent="submitForm">
    <module-form-field
      v-for="(options, name) in formFields"
      :key="name"
      :name="name"
      :options="options"
      :module-name="props.moduleName"
      :modelValue="entry[name]"
      :exclude-form-field-attributes="excludeFormFieldAttributes[name]"
      @update:modelValue="(value) => handleInput({ name, value })"
    />

    <div class="flex gap-4 pt-8 mt-12 border-t">
      <ui-button
        :to="{ name: 'module-index', params: { module: props.moduleName }}"
        type="button"
        action="secondary"
      >
        {{ $t('common.buttons.cancel') }}
      </ui-button>
      <ui-button
        :loading="isLoading"
        type="submit"
      >
        {{ isNew ? $t('common.buttons.createEntry') : $t('common.buttons.updateEntry') }}
      </ui-button>
    </div>
  </form>
</template>

<script setup>
import { getConfig, transformPayload } from '@/config/module-settings'
import { performUploads } from '@/utils/minio'

const props = defineProps({
  moduleName: {
    type: String,
    required: true
  }
})

const { params } = useRoute()
const router = useRouter()
const { data:sessionData } = useSession()
const runtimeConfig = useRuntimeConfig()
const moduleConfig = getConfig(props.moduleName)
const formFields = moduleConfig.formFields
const isNew = params.id === undefined
const isLoading = ref(false)


// form config
let excludeFormFields = []
let excludeFormFieldAttributes = {}
if (params.category_id) {
  const formConfigUrl = `${runtimeConfig.datahubEndpoint}/cms/form_configs/${props.moduleName}/${params.category_id}/fields.json`
  const formConfigResponse = await fetch(formConfigUrl, {
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' + sessionData.value.user.image.authentication_token }
  })
  const formConfigData = await formConfigResponse.json()
  excludeFormFields = formConfigData.exclude_form_fields.map(str => {
    return str.split('_').map((word, index) => index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)).join('')
  })

  excludeFormFieldAttributes = formConfigData.exclude_form_field_attributes
  excludeFormFields.forEach((fieldName) => {
    delete formFields[fieldName]
  })
}

let entry = reactive({})
if(params.id) {
  // fetch entry
  const module = await import(`@/graphql/queries/modules/${props.moduleName}/entry.gql`)
  const query = module.default
  const { data } = await useAsyncQuery(query, { id: params.id})

  entry = data?.value[moduleConfig.graphQL.queryRootEntry] || []

  for (const [name, options] of Object.entries(formFields)) {
    // entry[name] = entry[name] || (options.defaultValue === undefined ? '' : options.defaultValue)
    entry[name] = entry[name] || options.defaultValue || ''
  }

  entry.forceCreate = false
} else {
  delete formFields.id

  // create new entry
  for (const [name, options] of Object.entries(formFields)) {
    entry[name] = options.defaultValue === undefined ? '' : options.defaultValue
  }

  entry.forceCreate = true
}

const handleInput = (inputValue) => {
  entry[inputValue.name] = inputValue.value
}

const submitForm = async () => {
  isLoading.value = true
  const module = await import(`@/graphql/mutations/${props.moduleName}.gql`)
  const mutation = module.default
  const { mutate } = useMutation(mutation, entry)

  const userSessionData = sessionData.value?.user.image
  const minioConfig = userSessionData?.minio

  // upload files
  await performUploads(minioConfig, entry)

  const mutationPayload = transformPayload(props.moduleName, entry)

  // submit form
  const { data } = await mutate(mutationPayload)

  isLoading.value = false
  router.push({ name: 'module-index', params: { module: props.moduleName } })
}
</script>

<style lang="scss" scoped>
</style>
