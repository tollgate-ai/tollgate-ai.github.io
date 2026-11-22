<script setup lang="ts">
import SectionHead from '@/components/SectionHead.vue'
import { Card } from '@/components/ui/card'
import { blob } from '@/content'

// From the comparison in docs/experiments/e310/results.md, as the README states it.
const numbers = [
  { value: '0.7 USD', text: 'about, per ticket', accent: false },
  { value: '3 min', text: 'about, per ticket', accent: false },
  { value: '10×', text: 'the AI cost of Claude Code alone', accent: true },
  { value: '2–4×', text: 'the time of Claude Code alone', accent: true },
]
</script>

<template>
  <section id="cost" class="border-t border-line bg-panel">
    <div class="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 lg:grid-cols-2">
      <SectionHead eyebrow="Cost" title="Tollgate costs more than Claude Code alone. Here is how much." tone="github">
        <p>
          On ten small tickets, every change Tollgate made ready passed its checks. We do not know yet
          whether it also needs fewer fixes after the merge. That is still being measured.
        </p>
        <p>
          Use it when an AI writes most of each change, and the change must be right. For a quick
          change where a mistake is cheap, use Claude Code alone. It is faster and cheaper.
        </p>
        <a :href="blob('docs/experiments/e310/results.md')" class="text-[15px]">See the comparison</a>
      </SectionHead>
      <div class="grid grid-cols-2 gap-3.5">
        <Card v-for="x in numbers" :key="x.value + x.text" class="p-6">
          <div :class="['font-display text-[clamp(32px,4vw,44px)] font-bold', x.accent ? 'text-gate' : '']">{{ x.value }}</div>
          <div class="mt-1.5 text-sm text-muted-foreground">{{ x.text }}</div>
        </Card>
      </div>
    </div>
  </section>
</template>
