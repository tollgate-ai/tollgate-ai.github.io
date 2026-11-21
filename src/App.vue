<script setup lang="ts">
import CostSection from '@/sections/CostSection.vue'
import HazardsSection from '@/sections/HazardsSection.vue'
import HeroSection from '@/sections/HeroSection.vue'
import HowSection from '@/sections/HowSection.vue'
import LanesSection from '@/sections/LanesSection.vue'
import SiteFooter from '@/sections/SiteFooter.vue'
import SiteHeader from '@/sections/SiteHeader.vue'
import StartSection from '@/sections/StartSection.vue'
</script>

<template>
  <SiteHeader />
  <main>
    <HeroSection />
    <HazardsSection />
    <HowSection />
    <LanesSection />
    <CostSection />
    <StartSection />
  </main>
  <SiteFooter />
</template>
