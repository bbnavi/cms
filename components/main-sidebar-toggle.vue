<template>
  <button
    @click="handleClick"
    class="focus:outline-none"
  >
    <span class="sr-only">
      Menu
    </span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      aria-hidden="true"
    >
      <g stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" transform="translate(0.5 0.5)" stroke="currentColor">
        <g :class="svgIconClass">
          <line fill="none" x1="2" x2="30" y1="9" y2="9" />
          <line fill="none" x1="30" x2="2" y1="23" y2="23" />
          <line fill="none" x1="30" x2="2" y1="16" y2="16" />
          <line fill="none" x1="30" x2="2" y1="16" y2="16" />
        </g>
      </g>
    </svg>
  </button>
</template>

<script setup>
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const svgIconClass = computed(() => {
  return {
    'js-nc-int-icon nc-int-menu-to-close': true,
    'nc-int-icon-state-b': props.modelValue
  }
})

const handleClick = () => {
  emit('update:modelValue', !props.modelValue)
}

watchEffect(() => {
  if (process.client) {
    document.body.classList.toggle('noscroll', props.modelValue)
  }
})

</script>

<style scoped>
  .nc-int-menu-to-close {
    --transition-duration:.5s
  }

  .nc-int-menu-to-close :nth-child(1),
  .nc-int-menu-to-close :nth-child(2) {
    transition:opacity 0s calc(var(--transition-duration)/2), transform calc(var(--transition-duration)/2) calc(var(--transition-duration)/2) cubic-bezier(.86,0,.07,1)
  }

  .nc-int-menu-to-close :nth-child(1) {
    transform-origin:16px 9px
  }

  .nc-int-menu-to-close :nth-child(2) {
    transform-origin:16px 23px
  }

  .nc-int-menu-to-close :nth-child(3),
  .nc-int-menu-to-close :nth-child(4) {
    opacity: 1;
    transform-origin: 50% 50%;
    transition: transform calc(var(--transition-duration)/2) cubic-bezier(.86,0,.07,1),opacity 0s calc(var(--transition-duration)/2)
  }

  .nc-int-menu-to-close.nc-int-icon-state-b :nth-child(1),
  .nc-int-menu-to-close.nc-int-icon-state-b :nth-child(2) {
    transition:transform calc(var(--transition-duration)/2) cubic-bezier(.86,0,.07,1),opacity 0s calc(var(--transition-duration)/2);opacity:0
  }

  .nc-int-menu-to-close.nc-int-icon-state-b :nth-child(1) {
    transform:translateY(7px)
  }

  .nc-int-menu-to-close.nc-int-icon-state-b :nth-child(2) {
    transform:translateY(-7px)
  }

  .nc-int-menu-to-close.nc-int-icon-state-b :nth-child(3),
  .nc-int-menu-to-close.nc-int-icon-state-b :nth-child(4) {
    opacity:1;transition:opacity 0s calc(var(--transition-duration)/2),transform calc(var(--transition-duration)/2) calc(var(--transition-duration)/2) cubic-bezier(.86,0,.07,1)
  }

  .nc-int-menu-to-close.nc-int-icon-state-b :nth-child(3) {
    transform:rotate(45deg)
  }

  .nc-int-menu-to-close.nc-int-icon-state-b :nth-child(4) {
    transform:rotate(-45deg)
  }
</style>
