<template>
  <div class="flex items-start justify-between gap-4 p-4 border">
    <div class="grid flex-1 grid-cols-12 gap-4">
      <div
        v-show="!sourceUrl"
        class="col-span-12"
      >
        <form-input-file
          v-model="uploadData"
          :label="$t('modules.point_of_interest.form.labels.mediaContent.file')"
        />
      </div>
      <div class="col-span-12">
        <form-input-text
          v-model="sourceUrl"
          :label="$t('modules.point_of_interest.form.labels.mediaContent.sourceUrl')"
          :readonly="!!uploadData"
        />
      </div>
      <div class="col-span-12">
        <form-input-text
          v-model="entry.captionText"
          :label="$t('modules.point_of_interest.form.labels.mediaContent.captionText')"
          required
        />
      </div>
      <div class="col-span-6">
        <form-input-select
          v-model="entry.contentType"
          :label="$t('modules.point_of_interest.form.labels.mediaContent.contentType')"
          :options="contentTypes"
        />
      </div>
      <div class="col-span-6">
        <form-input-text
          v-model="entry.copyright"
          :label="$t('modules.point_of_interest.form.labels.mediaContent.copyright')"
          required
        />
      </div>
    </div>

    <ui-button
      v-if="removable"
      @click="emit('update:entry', null)"
    >
      {{ $t('common.buttons.remove') }}
    </ui-button>
  </div>
</template>

<script setup>
import { nanoid } from 'nanoid'
import contentTypes from '@/data/content-types.json'

const { data:sessionData } = useSession()

const emit = defineEmits(['update:entry'])

const props = defineProps({
  entry: {
    type: Object,
    required: true
  },
  removable: {
    type: Boolean,
    required: false,
    default: false
  }
})

const sourceUrl = computed({
  get() { return props.entry.sourceUrl },
  set(value) { props.entry.sourceUrl = value }
})

const uploadData = computed({
  get() {
    return props.entry.uploadData
  },
  set(event) {
    const userSessionData = sessionData.value?.user.image
    const minioData = userSessionData?.minio

    const file = event.target.files[0]
    const key = ['cms', nanoid(), file.name].join('/')
    const publicURL = `${minioData.endpoint}/${minioData.bucket}/${key}`

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      props.entry.sourceUrl = publicURL
      props.entry.uploadData = {
        key,
        publicURL,
        dataURL: reader.result
      }
    }
  }
})
</script>
