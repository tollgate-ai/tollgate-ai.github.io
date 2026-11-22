<script setup lang="ts">
import SectionHead from '@/components/SectionHead.vue'
import { Card } from '@/components/ui/card'

// The default stop rules, from docs/principles.md. Each one is a setting under "stop".
const numbers = [
  { value: '3', text: 'tries a ticket, then the advisor decides', accent: false },
  { value: '30 min', text: 'at most, for one try', accent: false },
  { value: '10 USD', text: 'at most, for one ticket', accent: true },
  { value: '60 USD', text: 'at most, for one task', accent: true },
]
</script>

<template>
  <section id="cost" class="border-t border-line bg-panel">
    <div class="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 lg:grid-cols-2">
      <SectionHead eyebrow="Cost" title="Tollgate costs more than Claude Code alone. The stop rules cap it." tone="github">
        <p>
          Each ticket runs several AI roles: a test writer, a builder, and reviewers. So it costs more
          and takes longer. Tollgate has no measured cost numbers yet.
        </p>
        <p>
          Use it when an AI writes most of each change, and the change must be right. For a quick
          change where a mistake is cheap, use Claude Code alone. It is faster and cheaper.
        </p>
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
