<script setup lang="ts">
import { Lock } from 'lucide-vue-next'
import picture from '@diagrams/how-it-works-dark.svg?raw'
import SectionHead from '@/components/SectionHead.vue'
import { prepare } from '@/lib/svg'

// The whole process, with its three loops, drawn in tollgate-ai/tollgate.
const process = prepare(picture, { prefix: 'how' })

const steps = [
  { n: '01', tone: 'text-you', title: 'You ask', text: 'In plain words. Tollgate writes a plan, and other AIs check it. Then Tollgate cuts it into small tickets.' },
  { n: '02', tone: 'text-github', title: 'Tests are locked', text: 'A separate AI writes one test for each must-have item. GitHub locks the tests before any code exists.' },
  { n: '03', tone: 'text-ai', title: 'The AI builds', text: 'It tries until the locked tests pass. It keeps its best try. It stops after 3 tries, or when the same failure comes twice.' },
  { n: '04', tone: 'text-gate', title: 'The gate checks', text: 'The gate is a program with no AI in it. It checks the ticket, the plan, the locked files, the tier, and the tests. When the AI is stuck, a second AI or you decides what to do.' },
  { n: '05', tone: 'text-github', title: 'GitHub runs it again', text: 'The tests run again, with the test setup from your main branch. An AI reviews the riskier changes. Then the change is merged.' },
]
</script>

<template>
  <section id="how" class="border-t border-line bg-panel">
    <div class="mx-auto grid max-w-6xl items-start gap-14 px-6 py-24 lg:grid-cols-2">
      <div class="flex flex-col gap-5 lg:sticky lg:top-24">
        <SectionHead eyebrow="How it works" title="Tests first, then the code." tone="ai">
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
    <div class="mx-auto max-w-6xl px-6 pb-24">
      <div class="overflow-x-auto rounded-2xl border border-border bg-[#0d1117] p-2">
        <div class="hero-picture min-w-[720px]" v-html="process" />
      </div>
    </div>
  </section>
</template>
