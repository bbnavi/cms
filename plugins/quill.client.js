import { defineNuxtPlugin } from "#app";

import { Quill, QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const Block = Quill.import('blots/block')
Block.tagName = 'DIV'
Quill.register(Block, true)

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.component('QuillEditor', QuillEditor);
})
