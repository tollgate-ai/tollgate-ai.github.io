<script setup lang="ts">
// Two pictures drawn by the diagram skill in tollgate-ai/tollgate: the process
// with its three loops, and the same process with the rules numbered on it. The
// words come from Tollgate's README and CONTRACT.md.
import processRaw from '@diagrams/how-it-works-dark.svg?raw'
import rulesRaw from '@diagrams/how-it-works-rules-dark.svg?raw'
import { nextTick, onMounted, ref, watch } from 'vue'
import SectionHead from '@/components/SectionHead.vue'
import { Card } from '@/components/ui/card'
import { RULE_GROUPS } from '@/content'
import { prepare } from '@/lib/svg'

const processSvg = prepare(processRaw, { prefix: 'process' })

// The rules picture gets a dark overlay with a hole in it. The hole moves to the
// point a callout names. The overlay sits under the callouts, so they stay sharp.
function withSpotlight(raw: string): string {
  let svg = prepare(raw, { prefix: 'rules' })
    .replace(/role="img"/, 'role="group"')
  const [, , w = '0', h = '0'] = svg.match(/viewBox="([^"]*)"/)?.[1].split(/\s+/) ?? []
  const defs = `<radialGradient id="rules-hole"><stop offset="0.6" stop-color="#000"/><stop offset="1" stop-color="#fff"/></radialGradient>`
    + `<mask id="rules-spot" maskUnits="userSpaceOnUse" x="0" y="0" width="${w}" height="${h}">`
    + `<rect width="${w}" height="${h}" fill="#fff"/><circle class="spot-hole" r="80" fill="url(#rules-hole)"/></mask>`
  svg = svg.includes('<defs>') ? svg.replace('<defs>', `<defs>${defs}`) : svg.replace(/(<svg[^>]*>)/, `$1<defs>${defs}</defs>`)
  return svg.replace('<g class="callout"',
    `<rect class="spot-dim" width="${w}" height="${h}" fill="#0b0f15" mask="url(#rules-spot)"/><g class="callout"`)
}
const rulesSvg = withSpotlight(rulesRaw)

const loops = [
  { n: '01', tone: 'text-fail', title: 'The plan loop', text: 'Fresh reviewers read the plan before any code exists. For each problem they find, the builder fixes it, argues against it with evidence, or asks the advisor. This repeats for up to 4 rounds.' },
  { n: '02', tone: 'text-ai', title: 'The build loop', text: 'The gate scores each try on your machine. Below 70%, the builder gets the reasons and tries again from its best try so far. Each try climbs from the best one, not the last one. After 3 tries, the advisor decides.' },
  { n: '03', tone: 'text-github', title: 'The learning loop', text: 'After a task, /tollgate:retro turns at most 3 lessons into tickets: a new test, a new check, a new question for the reviewers, or a stricter rule. The next tasks follow them.' },
]

const view = ref<'process' | 'rules'>('process')
const active = ref<number | null>(null)
const rulesBox = ref<HTMLElement>()
const processBox = ref<HTMLElement>()
let callouts: SVGGElement[] = []
let ready = false

const still = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function pause(box?: HTMLElement) {
  if (still)
    box?.querySelector('svg')?.pauseAnimations()
}

// A transparent box behind each callout, so the gaps between its words count too.
// getBBox needs the picture on screen, so this runs the first time it shows.
function wire() {
  const svg = rulesBox.value?.querySelector('svg')
  if (!svg || ready)
    return
  ready = true
  pause(rulesBox.value)
  callouts = [...svg.querySelectorAll<SVGGElement>('g.callout')]
  for (const g of callouts) {
    const n = Number(g.dataset.n)
    const group = RULE_GROUPS.find(x => x.n === n)
    const box = g.getBBox()
    const hit = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    for (const [k, v] of Object.entries({ x: box.x - 8, y: box.y - 6, width: box.width + 16, height: box.height + 12 }))
      hit.setAttribute(k, String(v))
    hit.setAttribute('fill', 'transparent')
    g.prepend(hit)
    g.setAttribute('tabindex', '0')
    if (group)
      g.setAttribute('aria-label', `Rule group ${n}, ${group.title}: ${group.rules.join(' ')}`)
    g.addEventListener('pointerenter', e => e.pointerType === 'mouse' && (active.value = n))
    g.addEventListener('pointerleave', e => e.pointerType === 'mouse' && (active.value = null))
    g.addEventListener('focus', () => (active.value = n))
    g.addEventListener('blur', () => (active.value = null))
    g.addEventListener('click', (e) => {
      e.stopPropagation()
      active.value = active.value === n ? null : n
    })
  }
  svg.addEventListener('click', () => (active.value = null))
}

watch(active, (n) => {
  const svg = rulesBox.value?.querySelector('svg')
  if (!svg)
    return
  const g = callouts.find(c => Number(c.dataset.n) === n)
  const x = g?.dataset.x
  const y = g?.dataset.y
  const hole = svg.querySelector<SVGCircleElement>('.spot-hole')
  if (hole && x && y)
    hole.style.transform = `translate(${x}px, ${y}px)`
  svg.classList.toggle('has-active', n !== null)
  svg.classList.toggle('has-point', Boolean(x && y))
  for (const c of callouts)
    c.classList.toggle('is-active', c === g)
})

watch(view, async (v) => {
  active.value = null
  if (v === 'rules') {
    await nextTick()
    wire()
  }
})

onMounted(() => pause(processBox.value))
</script>

<template>
  <section id="how-it-works" class="border-t border-line">
    <div class="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-24">
      <SectionHead eyebrow="How it works" title="How it works, and the rules that hold it" tone="gate">
        <p>
          You ask. Tollgate writes a plan and has it checked. The tests are locked, the AI builds,
          and the gate scores each try. Three loops send each problem back to the step that can fix
          it. Code holds every rule, not a prompt.
        </p>
      </SectionHead>

      <div class="flex flex-col gap-4">
        <div class="flex w-fit gap-1 rounded-xl border border-border bg-panel p-1" role="group" aria-label="Show">
          <button
            v-for="v in (['process', 'rules'] as const)" :key="v" type="button" :aria-pressed="view === v"
            :class="['h-11 min-w-11 rounded-lg px-5 text-sm font-medium transition-colors',
                     view === v ? 'bg-primary text-primary-foreground' : 'text-body hover:bg-muted hover:text-foreground']"
            @click="view = v"
          >
            {{ v === 'process' ? 'The process' : 'The rules' }}
          </button>
        </div>

        <div v-show="view === 'process'" class="flex flex-col gap-10">
          <div class="overflow-x-auto rounded-2xl border border-border bg-[#0d1117] p-2">
            <div ref="processBox" class="hero-picture min-w-[720px]" v-html="processSvg" />
          </div>
          <div class="grid gap-4 md:grid-cols-3">
            <Card v-for="loop in loops" :key="loop.n" class="flex flex-col gap-2.5 p-6">
              <span :class="['font-mono text-sm tracking-[0.12em]', loop.tone]">{{ loop.n }}</span>
              <h3 class="font-display text-xl font-semibold">{{ loop.title }}</h3>
              <p class="text-[15px] leading-relaxed text-muted-foreground">{{ loop.text }}</p>
            </Card>
          </div>
        </div>

        <div v-show="view === 'rules'" class="flex flex-col gap-10">
          <div class="overflow-x-auto rounded-2xl border border-border bg-[#0d1117] p-2">
            <div ref="rulesBox" class="rules-picture hero-picture min-w-[960px]" v-html="rulesSvg" />
          </div>
          <p class="-mt-6 text-sm text-muted-foreground">Point at a number, or tab to it, to see where the rule holds.</p>
          <ol class="m-0 grid list-none gap-x-10 gap-y-6 p-0 md:grid-cols-2">
            <li
              v-for="g in RULE_GROUPS" :key="g.n"
              :class="['grid grid-cols-[32px_1fr] gap-3 rounded-lg transition-opacity', active !== null && active !== g.n ? 'opacity-40' : '']"
              @mouseenter="active = g.n" @mouseleave="active = null"
            >
              <span class="flex size-7 items-center justify-center rounded-full bg-muted font-mono text-sm font-bold text-foreground" aria-hidden="true">{{ g.n }}</span>
              <div class="flex flex-col gap-1.5">
                <h3 class="font-display text-lg font-semibold"><span class="sr-only">{{ g.n }}. </span>{{ g.title }}</h3>
                <ul class="m-0 flex list-disc flex-col gap-1 pl-5 text-[15px] leading-relaxed text-muted-foreground marker:text-faint">
                  <li v-for="r in g.rules" :key="r">{{ r }}</li>
                </ul>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.rules-picture .spot-dim { opacity: 0; pointer-events: none; transition: opacity 200ms ease; }
.rules-picture .has-active.has-point .spot-dim { opacity: 0.78; }
.rules-picture .spot-hole { transition: transform 250ms ease; }
.rules-picture .callout { cursor: pointer; outline: none; transition: opacity 200ms ease; }
.rules-picture .has-active .callout:not(.is-active) { opacity: 0.3; }
.rules-picture .callout:focus-visible > rect:first-child { stroke: #d29922; stroke-width: 2; rx: 6; }
@media (prefers-reduced-motion: reduce) {
  .rules-picture .spot-dim, .rules-picture .spot-hole, .rules-picture .callout { transition: none; }
}
</style>
