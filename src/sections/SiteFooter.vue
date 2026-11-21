<script setup lang="ts">
import { blob, REPO } from '@/content'
</script>

<template>
  <footer class="border-t border-line">
    <div class="mx-auto flex max-w-6xl flex-wrap justify-between gap-4 px-6 py-9 text-sm text-muted-foreground">
      <span>Tollgate · Apache 2.0 · by Mohamed Rekiba</span>
      <span class="flex flex-wrap gap-5">
        <a :href="REPO">GitHub</a>
        <a :href="blob('docs/plan.md')">The plan</a>
        <a :href="blob('docs/decisions.md')">Decisions</a>
      </span>
    </div>
  </footer>
</template>
