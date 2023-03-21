<template>
  <ui-switch
    :modelValue="active"
    :disabled="disabled"
    :isLoading="isLoading"
    @click="handleClick()"
  />
</template>

<script setup>
import changeVisibilityQuery from '@/graphql/mutations/change-visibility.gql'

const active = ref(false)
const disabled = ref(false)
const isLoading = ref(false)

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  recordType: {
    type: String,
    required: true
  },
  visible: {
    type: Boolean,
    default: false
  }
})

const handleClick = async () => {
  isLoading.value = true

  const variables = reactive({
    id: props.id,
    recordType: props.recordType,
    visible: !active.value
  })

  const { mutate:changeVisibility } = useMutation(changeVisibilityQuery, variables)
  const { data } = await changeVisibility(variables)

  if (data?.changeVisibility?.statusCode === 200) {
    active.value = !active.value
  }

  isLoading.value = false
}

onMounted(() => {
  active.value = props.visible
})
</script>
