<template>
  <div class="ui-spinner">
    <svg :class="svgClass" viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="20" fill="none" stroke-width="4" />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'UiSpinner',

  props: {
    size: {
      type: String,
      default: 'sm',
      validator: (value) => ['sm', 'md', 'lg', 'xl', 'xxl'].includes(value),
    }
  },

  computed: {
    svgClass () {
      return {
        'h-4 w-4': this.size === 'sm',
        'h-6 w-6': this.size === 'md',
        'h-8 w-8': this.size === 'lg',
        'h-12 w-12': this.size === 'xl',
        'h-16 w-16': this.size === 'xxl'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.ui-spinner {
  @apply absolute inset-0 flex items-center justify-center;

  svg {
    animation: rotate 2s linear infinite;

    & circle {
      stroke: currentColor;
      stroke-linecap: round;
      animation: dash 1.5s ease-in-out infinite;
    }
  }
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}
</style>
