<script setup lang="ts">
// The whole process, with its three loops, drawn by the diagram skill in
// tollgate-ai/tollgate. The words for each loop come from Tollgate's README.
import picture from '@diagrams/how-it-works-dark.svg?raw'
import SectionHead from '@/components/SectionHead.vue'
import { Card } from '@/components/ui/card'
import { prepare } from '@/lib/svg'

const process = prepare(picture, { prefix: 'loops' })

const loops = [
  { n: '01', tone: 'text-fail', title: 'The plan loop', text: 'Reviewers read the plan before any code exists. For each problem they find, the builder fixes it, argues against it, or asks the advisor. This repeats for up to 4 rounds.' },
  { n: '02', tone: 'text-ai', title: 'The build loop', text: 'When the gate or a reviewer finds a problem, the builder gets the problem and the output of each failed check. It tries again from its best try. It stops when the change passes, or when a stop rule sends the ticket to the advisor.' },
  { n: '03', tone: 'text-github', title: 'The learning loop', text: 'After a task, /tollgate:retro turns at most 3 lessons into tickets: a new test, a new check, a new question for the reviewers, or a stricter rule. The next tasks follow them.' },
]
</script>

<template>
  <section id="loops" class="border-t border-line">
    <div class="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-24">
      <SectionHead eyebrow="The whole process" title="When something fails, it goes back to the step that can fix it." tone="gate">
        <p>
          You ask. Tollgate writes a plan and has it checked. The tests are locked, the AI builds, and
          the gate checks the result. Three loops send each problem back: to the plan, to the build,
          or to the rules for the next task.
        </p>
      </SectionHead>
      <div class="overflow-x-auto rounded-2xl border border-border bg-[#0d1117] p-2">
        <div class="hero-picture min-w-[720px]" v-html="process" />
      </div>
      <div class="grid gap-4 md:grid-cols-3">
        <Card v-for="loop in loops" :key="loop.n" class="flex flex-col gap-2.5 p-6">
          <span :class="['font-mono text-sm tracking-[0.12em]', loop.tone]">{{ loop.n }}</span>
          <h3 class="font-display text-xl font-semibold">{{ loop.title }}</h3>
          <p class="text-[15px] leading-relaxed text-muted-foreground">{{ loop.text }}</p>
        </Card>
      </div>
    </div>
  </section>
</template>
