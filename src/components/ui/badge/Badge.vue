<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <span :class="cn('inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs tracking-[0.12em] uppercase', props.class)">
    <slot />
  </span>
</template>
