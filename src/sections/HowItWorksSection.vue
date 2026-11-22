<script setup lang="ts">
// One picture, drawn by the diagram skill in tollgate-ai/tollgate: the process
// with its three loops, and the number of each rule on the part where it holds.
// The words come from Tollgate's README and docs/principles.md.
import raw from '@diagrams/how-it-works-dark.svg?raw'
import { onMounted, ref, watch } from 'vue'
import SectionHead from '@/components/SectionHead.vue'
import { Card } from '@/components/ui/card'
import { RULE_GROUPS } from '@/content'
import { prepare } from '@/lib/svg'

// A dark overlay with a hole in it. The hole moves to the pin of the active rule.
// The overlay sits under the pins and their labels, so they stay sharp.
function withSpotlight(text: string): string {
  let svg = prepare(text, { prefix: 'how' }).replace(/role="img"/, 'role="group"')
  const [, , w = '0', h = '0'] = svg.match(/viewBox="([^"]*)"/)?.[1].split(/\s+/) ?? []
  const defs = `<radialGradient id="how-hole"><stop offset="0.6" stop-color="#000"/><stop offset="1" stop-color="#fff"/></radialGradient>`
    + `<mask id="how-spot" maskUnits="userSpaceOnUse" x="0" y="0" width="${w}" height="${h}">`
    + `<rect width="${w}" height="${h}" fill="#fff"/><circle class="spot-hole" r="90" fill="url(#how-hole)"/></mask>`
  svg = svg.includes('<defs>') ? svg.replace('<defs>', `<defs>${defs}`) : svg.replace(/(<svg[^>]*>)/, `$1<defs>${defs}</defs>`)
  // Above the arrow tags and the note, below the labels of the parts.
  return svg.replace(/<g class="pin" data-n="(?!8")/,
    `<rect class="spot-dim" width="${w}" height="${h}" fill="#0b0f15" mask="url(#how-spot)"/>$&`)
}
const picture = withSpotlight(raw)

const loops = [
  { n: '01', tone: 'text-fail', title: 'The plan loop', text: 'Fresh reviewers read the plan before any code exists. For each problem they find, the builder fixes it, argues against it with evidence, or asks the advisor. This repeats for up to 4 rounds.' },
  { n: '02', tone: 'text-ai', title: 'The build loop', text: 'The gate scores each try on your machine. Below 70%, the builder gets the reasons and tries again from its best try so far. Each try climbs from the best one, not the last one. After 3 tries, the advisor decides.' },
  { n: '03', tone: 'text-github', title: 'The learning loop', text: 'After a task, /tollgate:retro turns at most 3 lessons into tickets: a new test, a new check, a new question for the reviewers, or a stricter rule. The next tasks follow them.' },
]

const active = ref<number | null>(null)
const box = ref<HTMLElement>()
let pins: SVGGElement[] = []

// A transparent box behind each numbered label, so the gaps between its words count too.
onMounted(() => {
  const svg = box.value?.querySelector('svg')
  if (!svg)
    return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    svg.pauseAnimations()
  pins = [...svg.querySelectorAll<SVGGElement>('g.pin')].filter(g => g.dataset.n)
  for (const g of pins) {
    const n = Number(g.dataset.n)
    const group = RULE_GROUPS.find(x => x.n === n)
    const b = g.getBBox()
    const hit = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    for (const [k, v] of Object.entries({ x: b.x - 8, y: b.y - 6, width: b.width + 16, height: b.height + 12 }))
      hit.setAttribute(k, String(v))
    hit.setAttribute('fill', 'transparent')
    g.prepend(hit)
    g.setAttribute('tabindex', '0')
    if (group)
      g.setAttribute('aria-label', `Rule ${n}, ${group.title}: ${group.rules.join(' ')}`)
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
})

watch(active, (n) => {
  const svg = box.value?.querySelector('svg')
  if (!svg)
    return
  const g = pins.find(p => Number(p.dataset.n) === n)
  const ring = g?.querySelector('ellipse')
  const hole = svg.querySelector<SVGCircleElement>('.spot-hole')
  if (hole && ring)
    hole.style.transform = `translate(${ring.getAttribute('cx')}px, ${ring.getAttribute('cy')}px)`
  svg.classList.toggle('has-active', n !== null)
  svg.classList.toggle('has-point', Boolean(ring))
  for (const p of pins)
    p.classList.toggle('is-active', p === g)
})
</script>

<template>
  <section id="how-it-works" class="border-t border-line">
    <div class="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-24">
      <SectionHead eyebrow="How it works" title="How it works, and the rules that hold it" tone="gate">
        <p>
          You ask. Tollgate writes a plan and has it checked. The tests are locked, the AI builds,
          and the gate scores each try. Each number on the picture marks the part where that rule
          holds. Code holds every rule, not a prompt.
        </p>
      </SectionHead>

      <div class="flex flex-col gap-4">
        <div class="overflow-x-auto rounded-2xl border border-border bg-[#0d1117] p-2">
          <div ref="box" class="how-picture hero-picture min-w-[880px]" v-html="picture" />
        </div>
        <p class="text-sm text-muted-foreground">Point at a rule or a number, or tab to it, to see where the rule holds.</p>
      </div>

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

<style>
.how-picture .spot-dim { opacity: 0; pointer-events: none; transition: opacity 200ms ease; }
.how-picture .has-active.has-point .spot-dim { opacity: 0.72; }
.how-picture .spot-hole { transition: transform 250ms ease; }
.how-picture .pin[data-n]:not([data-n=""]) { cursor: pointer; outline: none; transition: opacity 200ms ease; }
.how-picture .has-active .pin:not(.is-active) { opacity: 0.3; }
.how-picture .pin:focus-visible > rect:first-child { stroke: #d29922; stroke-width: 2; rx: 6; }
@media (prefers-reduced-motion: reduce) {
  .how-picture .spot-dim, .how-picture .spot-hole, .how-picture .pin { transition: none; }
}
</style>
