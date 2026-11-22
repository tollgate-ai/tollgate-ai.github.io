<script setup lang="ts">
import { AlignLeft, FlaskConicalOff, Ghost, SquareStop } from 'lucide-vue-next'
import SectionHead from '@/components/SectionHead.vue'
import { Card } from '@/components/ui/card'

const hazards = [
  { icon: Ghost, title: 'It invents things', text: 'A function, a file, or a fact that does not exist.' },
  { icon: AlignLeft, title: 'It pads its work', text: 'Extra code and words that nobody asked for.' },
  { icon: SquareStop, title: 'It stops early', text: 'It says done before the work is done.' },
  { icon: FlaskConicalOff, title: 'It weakens a test', text: 'It edits the test until the test passes.' },
]
</script>

<template>
  <section class="border-t border-line">
    <div class="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-24">
      <SectionHead eyebrow="The problem" title="Telling the AI not to does not stop these. Locked tests do." tone="fail">
        <p>
          An AI can ignore a written rule. When it reviews its own work, it defends it. So Tollgate
          locks the tests before the AI writes any code. Then a program with no AI checks each try.
        </p>
      </SectionHead>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card v-for="h in hazards" :key="h.title" class="flex flex-col gap-2.5 p-6">
          <div class="flex size-10 items-center justify-center rounded-lg bg-[#2a1216] text-[#ff7b72]">
            <component :is="h.icon" class="size-5" aria-hidden="true" />
          </div>
          <h3 class="font-display text-lg font-semibold">{{ h.title }}</h3>
          <p class="text-[15px] leading-relaxed text-muted-foreground">{{ h.text }}</p>
        </Card>
      </div>
    </div>
  </section>
</template>
