<template>
    <span
        v-html="svg"
        class="block w-6 h-6"
    />
</template>

<script lang="ts" setup>
    import { computed } from 'vue';

    const props = defineProps({
        icon: {
            type: String,
            required: true,
        },
        src: {
            type: String,
            default: '',
        },
        fallback: {
            type: String,
            default: 'disabled',
        },
    });

    const path = props.src ? props.src : '';
    const file = `${path}${props.icon}`;
    const modules = import.meta.glob('/assets/icons/**/*.svg', {
        as: 'raw',
        eager: true
    });

    const svg = computed(() => {
        return modules['/assets/icons/' + file + '.svg'] ?? modules['/assets/icons/' + props.fallback + '.svg'];
    });
</script>
