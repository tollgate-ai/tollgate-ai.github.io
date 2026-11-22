<script setup lang="ts">
import CostSection from '@/sections/CostSection.vue'
import HazardsSection from '@/sections/HazardsSection.vue'
import HeroSection from '@/sections/HeroSection.vue'
import HowItWorksSection from '@/sections/HowItWorksSection.vue'
import HowSection from '@/sections/HowSection.vue'
import LanesSection from '@/sections/LanesSection.vue'
import ProtectSection from '@/sections/ProtectSection.vue'
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
    <HowItWorksSection />
    <LanesSection />
    <ProtectSection />
    <CostSection />
    <StartSection />
  </main>
  <SiteFooter />
</template>
