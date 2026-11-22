<script setup lang="ts">
import { GitCommitHorizontal, ShieldCheck, TriangleAlert } from 'lucide-vue-next'
import SectionHead from '@/components/SectionHead.vue'
import { Card } from '@/components/ui/card'

// From CONTRACT.md and docs/principles.md in tollgate-ai/tollgate.
const layers = [
  { icon: ShieldCheck, title: 'Claude Code hooks and policies', text: 'Each AI role gets its own permission rules and a hook that runs before each tool call. A role cannot edit a locked file, the store, or the keys. It cannot push, merge into main, or skip the checks.' },
  { icon: GitCommitHorizontal, title: 'pre-commit', text: 'Before each commit, merge, and push on your machine, pre-commit checks the signed records: the lock, the pass, and for tiers 3 and 4, your approval. A change with no valid pass does not reach main.' },
]
</script>

<template>
  <section id="protect" class="border-t border-line">
    <div class="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-24">
      <SectionHead eyebrow="What protects you" title="Two layers hold the rules. Both run on your machine." tone="github">
        <p>
          The store keeps Tollgate's state on your machine, outside the project, where no AI role can
          write. The gate and the signed records are the real checks. They hold even when a role gets
          past its hook.
        </p>
      </SectionHead>
      <div class="grid gap-4 md:grid-cols-2">
        <Card v-for="(l, i) in layers" :key="l.title" class="flex flex-col gap-2.5 p-6">
          <div class="flex items-center gap-3">
            <div class="flex size-10 items-center justify-center rounded-lg bg-[#0f2417] text-[#7ee787]">
              <component :is="l.icon" class="size-5" aria-hidden="true" />
            </div>
            <span class="font-mono text-xs tracking-[0.14em] text-faint">LAYER {{ i + 1 }}</span>
          </div>
          <h3 class="font-display text-lg font-semibold">{{ l.title }}</h3>
          <p class="text-[15px] leading-relaxed text-muted-foreground">{{ l.text }}</p>
        </Card>
      </div>
      <div class="flex items-start gap-3 rounded-lg border border-[#5a4a1f] bg-[#1c1608] px-5 py-4 text-[15px] leading-relaxed text-body">
        <TriangleAlert class="mt-0.5 size-5 shrink-0 text-gate" aria-hidden="true" />
        <p>
          <strong class="text-foreground">The limit.</strong> These checks stop the AI, not you. A person
          who skips the checks with <code class="font-mono text-foreground">--no-verify</code> can still
          change main.
        </p>
      </div>
    </div>
  </section>
</template>
