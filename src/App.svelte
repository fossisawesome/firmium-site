<script lang="ts">
  import Header from './lib/Header.svelte'
  import Hero from './lib/Hero.svelte'
  import Features from './lib/Features.svelte'
  import Screenshots from './lib/Screenshots.svelte'
  import Platforms from './lib/Platforms.svelte'
  import Footer from './lib/Footer.svelte'
</script>

<a href="#main-content" class="skip-link">Skip to content</a>

<Header />
<main id="main-content" tabindex="-1">
  <Hero />
  <Features />
  <Screenshots />
  <Platforms />
</main>
<Footer />
