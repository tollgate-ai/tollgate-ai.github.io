<script setup lang="ts">
import GithubMark from '@/components/GithubMark.vue'
import TollgateLogo from '@/components/TollgateLogo.vue'
import { Button } from '@/components/ui/button'
import { REPO } from '@/content'

const links = [
  { href: '#how-it-works', text: 'How it works' },
  { href: '#lanes', text: 'Tiers' },
  { href: '#cost', text: 'Cost' },
  { href: '#start', text: 'Start' },
]
</script>

<template>
  <header class="sticky top-0 z-20 border-b border-line bg-background/85 backdrop-blur-md">
    <nav class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-3" aria-label="Main">
      <a href="#top" class="flex items-center gap-2.5 text-foreground no-underline hover:text-foreground">
        <TollgateLogo class="size-7" />
        <span class="font-display text-[19px] font-bold">Tollgate</span>
      </a>
      <div class="flex flex-wrap items-center gap-1">
        <a v-for="l in links" :key="l.href" :href="l.href" class="hidden rounded-md px-3 py-3 text-sm text-body no-underline hover:text-foreground sm:inline">{{ l.text }}</a>
        <Button as="a" :href="REPO" variant="outline" size="sm" class="ml-1.5 no-underline">
          <GithubMark />GitHub
        </Button>
      </div>
    </nav>
  </header>
</template>
