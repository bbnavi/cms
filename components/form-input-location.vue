<template>
  <l-map
    ref="map"
    :zoom="12"
    v-model:center="coordinates"
  >
    <l-tile-layer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      layer-type="base"
      name="OpenStreetMap"
    />

    <l-marker
      v-model:lat-lng="coordinates"
      draggable
    />
  </l-map>
</template>

<script setup>
import "leaflet/dist/leaflet.css"
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet"

const emit = defineEmits(['update:latitute', 'update:longitude'])

const props = defineProps({
  latitute: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  }
})

const coordinates = computed({
  get: () => [props.latitute, props.longitude],
  set: (value) => {
    emit('update:latitute', value.lat)
    emit('update:longitude', value.lng)
  }
})
</script>
