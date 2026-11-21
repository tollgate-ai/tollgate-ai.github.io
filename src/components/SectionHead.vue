<script setup lang="ts">
defineProps<{ eyebrow: string, title: string, tone: 'you' | 'ai' | 'github' | 'gate' | 'fail' }>()

const tones = {
  you: 'text-you', ai: 'text-ai', github: 'text-github', gate: 'text-gate', fail: 'text-fail',
} as const
</script>

<template>
  <div class="flex max-w-3xl flex-col gap-3.5">
    <span :class="['font-mono text-xs tracking-[0.16em] uppercase', tones[tone]]">{{ eyebrow }}</span>
    <h2 class="font-display text-[clamp(30px,4vw,46px)] leading-[1.1] font-semibold tracking-tight">{{ title }}</h2>
    <div class="flex flex-col gap-3 text-[17px] leading-relaxed text-muted-foreground">
      <slot />
    </div>
  </div>
</template>
