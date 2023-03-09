<template>
  <h2 class="mb-8 text-3xl">
    {{ isNew ? $t('common.headlines.newEntry') : $t('common.headlines.editEntry') }}
  </h2>

  <module-form-field
    v-for="(options, name) in formFields"
    :key="name"
    :name="name"
    :options="options"
    :module-name="props.moduleName"
    :modelValue="entry[name]"
    @update:modelValue="(value) => handleInput({ name, value })"
  />

  <div class="flex gap-6 mt-12">
    <ui-button
      :to="{ name: 'module-index', params: { module: props.moduleName }}"
      action="secondary"
    >
      {{ $t('common.buttons.cancel') }}
    </ui-button>
    <ui-button
      :loading="isLoading"
      @click="submitForm"
    >
      {{ isNew ? $t('common.buttons.createEntry') : $t('common.buttons.updateEntry') }}
    </ui-button>
  </div>

  <div class="hidden overflow-auto">
    <pre class="p-4 mb-8 bg-gray-100">{{ formFields }}</pre>
    <pre class="p-4 bg-gray-100">{{ entry }}</pre>
  </div>
</template>

<script setup>
import { getConfig } from '@/config/module-settings'
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
const moduleConfig = getConfig(props.moduleName)
const formFields = moduleConfig.formFields
const isNew = params.id === undefined
const isLoading = ref(false)

let entry = reactive({})
if(params.id) {
  // fetch entry
  const module = await import(`@/graphql/queries/modules/${props.moduleName}/entry.gql`)
  const query = module.default
  const { data } = await useAsyncQuery(query, { id: params.id})

  entry = data?.value[moduleConfig.graphQL.queryRootEntry] || []

  for (const [name, options] of Object.entries(formFields)) {
    entry[name] = entry[name] || options.defaultValue || ''
  }

  entry.forceCreate = false
} else {
  delete formFields.id

  // create new entry
  for (const [name, options] of Object.entries(formFields)) {
    entry[name] = options.defaultValue || ''
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

  // submit form
  const { data } = await mutate(entry)

  isLoading.value = false
  router.push({ name: 'module-index', params: { module: props.moduleName } })
}
</script>

<style lang="scss" scoped>
</style>
