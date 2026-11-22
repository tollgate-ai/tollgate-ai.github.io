<script setup lang="ts">
import { Lock } from 'lucide-vue-next'
import SectionHead from '@/components/SectionHead.vue'

const steps = [
  { n: '01', tone: 'text-you', title: 'You ask', text: 'In plain words. Tollgate writes a plan, and other AIs check it. Then Tollgate cuts it into small tickets.' },
  { n: '02', tone: 'text-github', title: 'Tests are locked', text: 'A separate AI writes one test for each must-have item. The store locks the tests and signs the lock before any code exists.' },
  { n: '03', tone: 'text-ai', title: 'The AI builds', text: 'It builds in a container, on a copy of your project, with no git credentials. Each try starts from its best try so far. After 3 tries, or the same failure twice, the advisor decides.' },
  { n: '04', tone: 'text-gate', title: 'The gate scores each try', text: 'The gate is a program with no AI in it. It checks the ticket, the locked files, the tier, and the tests, and gives the try a score. 70% passes. A try that passes becomes a ready change.' },
  { n: '05', tone: 'text-you', title: 'The change is merged', text: 'With auto_merge on, the store merges tiers 1 and 2 itself. You merge tiers 3 and 4 with /tollgate:merge, and sign the approval with your SSH key.' },
]
</script>

<template>
  <section id="steps" class="border-t border-line bg-panel">
    <div class="mx-auto grid max-w-6xl items-start gap-14 px-6 py-24 lg:grid-cols-2">
      <div class="flex flex-col gap-5 lg:sticky lg:top-24">
        <SectionHead eyebrow="The steps" title="Tests first, then the code." tone="ai">
          <p>
            It works like an exam. The questions are sealed before the student starts. The student
            can take the exam again, but cannot change the questions or mark the paper.
          </p>
        </SectionHead>
        <div class="flex items-center gap-2.5 rounded-lg border border-border bg-card px-4 py-3.5 text-sm text-body">
          <Lock class="size-5 shrink-0 text-[#7ee787]" aria-hidden="true" />
          Locked tests cannot be edited, skipped, or removed.
        </div>
      </div>
      <ol class="m-0 list-none p-0">
        <li v-for="s in steps" :key="s.n" class="grid grid-cols-[64px_1fr] gap-5 border-t border-line py-6">
          <span :class="['pt-1 font-mono text-sm tracking-[0.12em]', s.tone]">{{ s.n }}</span>
          <div class="flex flex-col gap-1.5">
            <h3 class="font-display text-[22px] font-semibold">{{ s.title }}</h3>
            <p class="max-w-xl leading-relaxed text-muted-foreground">{{ s.text }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>
