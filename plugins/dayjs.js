import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

export default defineNuxtPlugin((nuxtApp) => {
  dayjs.extend(customParseFormat)

  nuxtApp.provide('dayjs', dayjs)
})
