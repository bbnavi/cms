<template>
  <component
    :is="componentType"
    :to="to"
    :target="target"
    :class="buttonClass"
    @click="handleClick"
  >
    <ui-spinner v-if="loading" />
    <slot />
  </component>
</template>

<script>
import UiSpinner from './ui-spinner.vue'

export default {
  name: 'UiButton',

  components: {
    UiSpinner
  },

  props: {
    to: {
      type: [String, Object],
      default: null,
    },
    target: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['sm', 'md', 'lg'].includes(value),
    },
    action: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'tertiary'].includes(value),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    iconOnly: {
      type: Boolean,
      default: false,
    }
  },

  computed: {
    isButton () {
      return !this.to
    },

    componentType () {
      if (this.isButton) {
        return 'button';
      }

      return resolveComponent('NuxtLink');
    },

    buttonClass() {
      return {
        'ui-button': true,
        [`ui-button--${this.size}`]: true,
        [`ui-button--${this.action}`]: true,
        'ui-button--rounded': this.rounded,
        'ui-button--icon-only': this.iconOnly,
        'disabled': this.disabled,
        'loading': this.loading
      }
    },
  },

  methods: {
    handleClick(event) {
      if (this.disabled || this.loading) {
        event.preventDefault()
        return
      }
    }
  }
}
</script>

<style lang="scss">
.ui-button {
  @apply inline-flex items-center justify-center gap-1.5 relative cursor-pointer flex-shrink-0 rounded-lg;
  @apply uppercase font-medium whitespace-nowrap;
  @apply transition-colors duration-200 ease-in-out;

  &.disabled {
    @apply cursor-not-allowed text-opacity-30;
  }

  &.loading {
    @apply text-transparent;
  }

  .ui-spinner {
    @apply text-white;
  }

  &--primary {
    @apply bg-brand border border-brand text-white;

    &:hover:not(.disabled, .loading) {
      @apply bg-white border-brand text-brand;
    }
  }

  &--secondary {
    @apply bg-white border border-brand text-brand;

    &:hover:not(.disabled, .loading) {
      @apply bg-brand border-brand text-white;
    }
  }

  &--tertiary {
    @apply bg-transparent text-black border border-black;

    &:hover:not(.disabled, .loading) {
      @apply bg-gray-100;
    }
  }

  &--sm {
    @apply text-xs px-5 h-8;
  }

  &--md {
    @apply text-sm px-6 h-10;
  }

  &--lg {
    @apply text-sm px-8 h-12;
  }

  &--no-padding {
    @apply px-0;
  }

  &--rounded {
    @apply p-0 aspect-square overflow-hidden;
  }

  &--icon-only {
    @apply rounded-full p-0 aspect-square overflow-hidden;
  }
}
</style>
