<script setup lang="ts">
import { ArrowRight, BookOpen } from 'lucide-vue-next'
// The README banner, drawn by the diagram skill in tollgate-ai/tollgate. The hero
// shows its scene: the AI's room, the gate with its fail loop, and main.
import banner from '@diagrams/hero-dark.svg?raw'
import TollgateLogo from '@/components/TollgateLogo.vue'
import { Button } from '@/components/ui/button'
import { blob } from '@/content'
import { prepare } from '@/lib/svg'

const scene = prepare(banner, {
  prefix: 'hero',
  viewBox: '560 48 640 488',
  textFrom: 560,
  drop: [/<rect width="1200" height="600" fill="#0d1117"\/>/, /<rect x="20\.5" y="20\.5"[^>]*\/>/],
})

const steps = ['You ask', 'Tests locked', 'AI builds', 'Gate passes', 'Merged']
const checkpoint = 'Gate passes'
</script>

<template>
  <section id="top" class="blueprint relative overflow-hidden">
    <div class="mx-auto grid max-w-6xl items-center gap-10 px-6 pt-16 pb-12 lg:grid-cols-[1.2fr_1fr] lg:pt-20">
      <div class="flex flex-col gap-7">
        <div class="flex items-center gap-4">
          <TollgateLogo class="size-14 shrink-0" />
          <div class="flex flex-col gap-1">
            <span class="font-mono text-[26px] font-bold tracking-[0.18em]">TOLLGATE</span>
            <span class="font-mono text-xs tracking-[0.18em] text-muted-foreground">A PLUGIN FOR CLAUDE CODE</span>
          </div>
        </div>
        <h1 class="font-display text-[clamp(34px,3.7vw,50px)] leading-[1.05] font-bold tracking-[-0.03em]">
          Let AI write your code.<br><span class="text-gate">Merge only what works.</span>
        </h1>
        <p class="max-w-xl text-lg leading-relaxed text-muted-foreground">
          Tollgate is a plugin for Claude Code that runs on your machine. Before the AI writes any
          code, Tollgate writes tests for what you asked for and locks them. The AI cannot change
          them. A gate with no AI scores each try, and 70% passes. Only then does the change reach
          your main branch.
        </p>
        <ol class="m-0 flex list-none flex-wrap items-center gap-1 p-0 font-mono text-[11px] tracking-[0.1em]" aria-label="What happens to a change">
          <template v-for="(step, i) in steps" :key="step">
            <li :class="['rounded-md border px-2.5 py-2', step === checkpoint ? 'border-gate text-gate' : 'border-border text-body']">{{ step.toUpperCase() }}</li>
            <li v-if="i < steps.length - 1" class="text-faint" aria-hidden="true">›</li>
          </template>
        </ol>
        <div class="flex flex-wrap gap-3">
          <Button as="a" href="#start" size="lg" class="no-underline hover:text-primary-foreground">
            Get started<ArrowRight />
          </Button>
          <Button as="a" :href="blob('docs/plan.md')" variant="outline" size="lg" class="no-underline hover:text-foreground">
            <BookOpen />Read the plan
          </Button>
        </div>
      </div>
      <div class="hero-picture" v-html="scene" />
    </div>
  </section>
</template>
