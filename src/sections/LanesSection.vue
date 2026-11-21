<script setup lang="ts">
import { Check, User, Zap } from 'lucide-vue-next'
import SectionHead from '@/components/SectionHead.vue'

// What each tier passes, from docs/plan.md: tier 1 needs no plan, the change
// review starts at tier 2, the security and GitHub reviews at tier 3, and at
// tier 4 the reviews are advice. The driver merges tier 1 and 2 by itself.
const lanes = [
  { n: 1, color: '#3fb950', title: 'Small and safe', sub: 'A few files and a few lines.',
    checks: ['Locked tests', 'The gate'], you: false },
  { n: 2, color: '#4493f8', title: 'Ordinary change', sub: 'Most changes.',
    checks: ['A plan', 'Locked tests', 'The gate', 'Change review'], you: false },
  { n: 3, color: '#d29922', title: 'Risky paths', sub: 'The files you mark as risky.',
    checks: ['A plan', 'Locked tests', 'The gate', 'Change and security review', 'AI review on GitHub'], you: true },
  { n: 4, color: '#f85149', title: 'Test setup and workflows', sub: 'The files that run the checks.',
    checks: ['A plan', 'Locked tests', 'The gate', 'Every review, as advice to you', 'AI review on GitHub'], you: true },
]
</script>

<template>
  <section id="lanes" class="border-t border-line">
    <div class="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-24">
      <div class="flex flex-wrap items-end justify-between gap-8">
        <SectionHead eyebrow="Four tiers" title="The riskier the change, the more checks it gets." tone="gate">
          <p>
            Tollgate gives each change a tier from the files it touches. You choose which files are
            risky. Every change passes the locked tests and the gate. Tiers 3 and 4 add reviews, and
            you merge them.
          </p>
        </SectionHead>
        <div class="flex flex-wrap gap-5 text-sm text-muted-foreground">
          <span class="inline-flex items-center gap-2"><Zap class="size-4 text-body" aria-hidden="true" />Tollgate merges it</span>
          <span class="inline-flex items-center gap-2"><User class="size-4 text-body" aria-hidden="true" />You merge it</span>
        </div>
      </div>

      <div class="overflow-hidden rounded-2xl border border-border bg-panel">
        <div class="hidden grid-cols-[230px_minmax(0,1fr)_190px] gap-7 px-7 py-3.5 font-mono text-[11px] tracking-[0.14em] text-faint md:grid">
          <span>TIER</span><span>WHAT EVERY CHANGE IN IT PASSES</span><span class="justify-self-end">WHO MERGES</span>
        </div>
        <div v-for="l in lanes" :key="l.n" class="grid items-center gap-4 border-t border-line px-7 py-6 md:grid-cols-[230px_minmax(0,1fr)_190px] md:gap-7">
          <div class="flex items-center gap-4">
            <div class="flex size-14 shrink-0 flex-col items-center justify-center rounded-xl border-2 bg-background" :style="{ borderColor: l.color }">
              <span class="font-mono text-[9px] tracking-[0.14em]" :style="{ color: l.color }">TIER</span>
              <span class="font-display text-2xl leading-none font-bold">{{ l.n }}</span>
            </div>
            <div>
              <h3 class="font-display text-lg font-semibold">{{ l.title }}</h3>
              <p class="text-sm text-muted-foreground">{{ l.sub }}</p>
            </div>
          </div>

          <div class="flex min-w-0 flex-col gap-3.5">
            <div class="relative mt-6 h-11 rounded-lg bg-[#121822] md:mt-0">
              <div class="absolute inset-x-3 top-1/2 h-0.5 -translate-y-1/2 bg-[repeating-linear-gradient(90deg,#3d4757_0_16px,transparent_16px_30px)]" aria-hidden="true" />
              <template v-if="l.you">
                <div class="absolute -top-1.5 -bottom-1.5 left-[76%] w-[3px] rounded-sm" :style="{ background: l.color }" aria-hidden="true" />
                <span class="absolute -top-7 left-[calc(76%-24px)] rounded border bg-background px-1.5 py-0.5 font-mono text-[10px] tracking-[0.14em]" :style="{ color: l.color, borderColor: l.color }" aria-hidden="true">YOU</span>
              </template>
              <div class="absolute inset-0 overflow-hidden rounded-lg">
                <svg :class="['absolute top-1/2 -mt-[13px]', `car-${l.n}`]" width="44" height="26" viewBox="0 0 44 26" aria-hidden="true">
                  <rect x="2" y="3" width="36" height="20" rx="6" :fill="l.color" />
                  <rect x="22" y="6" width="10" height="14" rx="3" fill="#0b0f15" fill-opacity="0.55" />
                  <rect x="38" y="6" width="4" height="4" rx="1" fill="#fff6c8" />
                  <rect x="38" y="16" width="4" height="4" rx="1" fill="#fff6c8" />
                </svg>
              </div>
            </div>
            <ul class="m-0 flex list-none flex-wrap gap-2 p-0" :aria-label="`What tier ${l.n} passes`">
              <li v-for="c in l.checks" :key="c" class="inline-flex items-center gap-1.5 rounded-full border border-border bg-background py-1 pr-3 pl-2 text-[13px] text-body">
                <Check class="size-3.5" :style="{ color: l.color }" aria-hidden="true" />{{ c }}
              </li>
            </ul>
          </div>

          <div class="flex items-center gap-2.5 justify-self-start rounded-lg border bg-background px-3.5 py-2.5 md:justify-self-end" :style="{ borderColor: l.color }">
            <component :is="l.you ? User : Zap" class="size-4" :style="{ color: l.color }" aria-hidden="true" />
            <span class="text-sm font-semibold">{{ l.you ? 'Waits for you' : 'Merges itself' }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
