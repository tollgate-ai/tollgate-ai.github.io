<script setup lang="ts">
import { Check, Copy } from 'lucide-vue-next'
import { ref } from 'vue'
import SectionHead from '@/components/SectionHead.vue'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { COMMANDS, INSTALL, NEEDS } from '@/content'

const copied = ref(false)
async function copy() {
  try {
    await navigator.clipboard.writeText(INSTALL.join('\n'))
    copied.value = true
    setTimeout(() => (copied.value = false), 1800)
  }
  catch {
    copied.value = false
  }
}
</script>

<template>
  <section id="start" class="border-t border-line">
    <div class="mx-auto grid max-w-6xl items-start gap-12 px-6 py-24 lg:grid-cols-2">
      <div class="flex min-w-0 flex-col gap-5">
        <SectionHead eyebrow="Start" title="Type three lines in Claude Code." tone="you" />
        <Card class="overflow-hidden bg-[#070a0f]">
          <div class="flex items-center justify-between border-b border-line px-3.5 py-2.5">
            <div class="flex gap-1.5" aria-hidden="true">
              <span v-for="i in 3" :key="i" class="size-2.5 rounded-full bg-[#30363d]" />
            </div>
            <Button variant="outline" size="sm" :aria-label="copied ? 'Copied' : 'Copy the commands'" @click="copy">
              <component :is="copied ? Check : Copy" />{{ copied ? 'Copied' : 'Copy' }}
            </Button>
          </div>
          <pre class="m-0 overflow-x-auto p-5 font-mono text-[15px] leading-loose text-body"><template v-for="(line, i) in INSTALL" :key="line"><span class="text-github">&gt;</span> {{ line }}<template v-if="i < INSTALL.length - 1">{{ '\n' }}</template></template></pre>
        </Card>
        <div class="flex flex-col gap-2.5 text-[15px] leading-relaxed text-muted-foreground">
          <p>You need:</p>
          <ul class="m-0 flex list-none flex-wrap gap-2 p-0">
            <li v-for="n in NEEDS" :key="n" class="rounded-full border border-border bg-card px-3 py-1 text-[13px] text-body">{{ n }}</li>
          </ul>
          <p>
            Run <code class="font-mono text-body">/tollgate:init</code> inside your project. Everything runs
            on your machine. You add no repository secrets, and nothing in Tollgate uses GitHub.
          </p>
        </div>
      </div>
      <Card class="min-w-0 overflow-hidden">
        <h3 class="px-5 py-4 font-mono text-xs font-normal tracking-[0.14em] text-muted-foreground">WHAT YOU TYPE</h3>
        <dl class="m-0">
          <div v-for="[cmd, text] in COMMANDS" :key="cmd" class="grid gap-1 border-t border-line px-5 py-3.5 sm:grid-cols-[200px_1fr] sm:gap-4">
            <dt><code class="font-mono text-sm text-link">{{ cmd }}</code></dt>
            <dd class="m-0 text-[15px] leading-normal text-body">{{ text }}</dd>
          </div>
        </dl>
      </Card>
    </div>
  </section>
</template>
