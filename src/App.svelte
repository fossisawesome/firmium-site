<script lang="ts">
  import { onMount } from 'svelte'
  import { initTheme } from './lib/theme.svelte'
  import { loadChangelog, changelog } from './lib/changelog.svelte'
  import { matchesKonami, matchesSubsonic } from './lib/easterEggs'
  import Nav from './lib/Nav.svelte'
  import Hero from './lib/Hero.svelte'
  import HowItWorks from './lib/HowItWorks.svelte'
  import Features from './lib/Features.svelte'
  import Story from './lib/Story.svelte'
  import Gallery from './lib/Gallery.svelte'
  import Platforms from './lib/Platforms.svelte'
  import Comparison from './lib/Comparison.svelte'
  import Themes from './lib/Themes.svelte'
  import Changelog from './lib/Changelog.svelte'
  import Cta from './lib/Cta.svelte'
  import Footer from './lib/Footer.svelte'
  import LogoEasterEgg from './lib/LogoEasterEgg.svelte'

  let logoEggOpen = $state(false)
  let diagOpen = $state(false)
  let konamiActive = $state(false)
  let subsonicFlash = $state(false)

  let keyBuffer: string[] = []
  let letterBuffer = ''
  let diagTimer: ReturnType<typeof setTimeout> | null = null

  function closeTopmost() {
    if (diagOpen) diagOpen = false
    else if (logoEggOpen) logoEggOpen = false
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.ctrlKey || e.metaKey || e.altKey || (e.target as HTMLElement | null)?.closest?.('input, textarea, select, [contenteditable]')) return
    keyBuffer = [...keyBuffer, e.key].slice(-10)
    if (matchesKonami(keyBuffer)) {
      konamiActive = true
      setTimeout(() => (konamiActive = false), 2600)
    }

    if (/^[a-z]$/i.test(e.key)) {
      letterBuffer = (letterBuffer + e.key).slice(-8)
      if (matchesSubsonic(letterBuffer)) {
        subsonicFlash = true
        letterBuffer = ''
        setTimeout(() => (subsonicFlash = false), 900)
      }
    }

    if (e.key === 'Escape') {
      closeTopmost()
    }
  }

  function openDiag() {
    diagOpen = true
    if (diagTimer) clearTimeout(diagTimer)
    diagTimer = setTimeout(() => (diagOpen = false), 4000)
  }

  onMount(() => {
    loadChangelog()
    initTheme()
  })
</script>

<svelte:window onkeydown={onKeydown} />

<div class="crt-overlay"></div>
<div class="crt-vignette"></div>
<div class="crt-boot"></div>

<div class={["page", { degauss: konamiActive }]}>
  <a href="#main-content" class="skip-link">Skip to content</a>

  <Nav version={changelog.version} onLogoEgg={() => (logoEggOpen = true)} />

  <main id="main-content" tabindex="-1">
    <Hero {diagOpen} onOpenDiag={openDiag} />
    <HowItWorks />
    <Story />
    <Features />
    <Gallery />
    <Platforms />
    <Comparison />
    <Themes />
    <Changelog />
    <Cta />
  </main>

  <Footer />
</div>

<LogoEasterEgg open={logoEggOpen} onClose={() => (logoEggOpen = false)} />

{#if konamiActive}
  <div class="konami-card">
    <div class="konami-title">FIRMIUM</div>
    <div class="konami-sub">// DEGAUSSED //</div>
  </div>
{/if}

{#if subsonicFlash}
  <div class="subsonic-flash"></div>
{/if}

<style lang="scss">
  :global(body) {
    scroll-behavior: smooth;
  }

  :global(::selection) {
    background: color-mix(in srgb, var(--accent) 35%, transparent);
    color: var(--text);
  }

  :global(.skip-link) {
    position: absolute;
    left: -9999px;
    top: 0;
    background: var(--accent);
    color: var(--accent-text);
    padding: 10px 16px;
    z-index: 1000;
  }

  :global(.skip-link:focus) {
    left: 8px;
    top: 8px;
  }

  .crt-overlay {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 200;
    background: repeating-linear-gradient(rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 0) 2px, rgba(0, 0, 0, 0.1) 3px);
    mix-blend-mode: multiply;
  }

  .crt-vignette {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 199;
    box-shadow: inset 0 0 180px rgba(0, 0, 0, 0.75);
  }

  .crt-boot {
    position: fixed;
    inset: 0;
    z-index: 400;
    pointer-events: none;
    background: #000;
    animation: crtBoot 1.1s cubic-bezier(0.2, 0.9, 0.3, 1) forwards;
  }

  @keyframes crtBoot {
    0% { transform: scaleY(0.002) scaleX(1); opacity: 1; background: #fff; }
    6% { transform: scaleY(0.002) scaleX(1); opacity: 1; background: #fff; }
    9% { transform: scaleY(0.01) scaleX(1); background: #000; }
    12% { transform: scaleY(1) scaleX(1); opacity: 1; }
    100% { transform: scaleY(1) scaleX(1); opacity: 0; }
  }

  :global(.page.degauss) {
    animation: degauss 0.9s ease;
  }

  @keyframes degauss {
    0% { transform: scale(1) skewX(0); }
    10% { transform: scale(1.02, 0.98) skewX(2deg); }
    20% { transform: scale(0.98, 1.02) skewX(-2deg); }
    30% { transform: scale(1.01, 0.99) skewX(1deg); }
    45% { transform: scale(0.995, 1.005) skewX(-0.5deg); }
    60% { transform: scale(1.002, 0.998); }
    100% { transform: scale(1) skewX(0); }
  }

  .konami-card {
    position: fixed;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 500;
    pointer-events: none;
    animation: fadeHold 2.6s ease forwards;
  }

  @keyframes fadeHold {
    0% { opacity: 0; }
    15% { opacity: 1; }
    85% { opacity: 1; }
    100% { opacity: 0; }
  }

  .konami-title {
    font-size: 52px;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: var(--accent);
    text-shadow: 0 0 30px color-mix(in srgb, var(--accent) 70%, transparent);
  }

  .konami-sub {
    font-size: 13px;
    letter-spacing: 0.2em;
    color: var(--muted);
    margin-top: 8px;
  }

  .subsonic-flash {
    position: fixed;
    inset: 0;
    z-index: 450;
    pointer-events: none;
    background: repeating-linear-gradient(
      0deg,
      color-mix(in srgb, var(--accent) 35%, transparent) 0px,
      color-mix(in srgb, var(--accent) 35%, transparent) 2px,
      transparent 3px,
      transparent 6px
    );
    mix-blend-mode: screen;
    animation: subsonicFade 0.9s ease-out forwards;
  }

  @keyframes subsonicFade {
    0% { opacity: 0; }
    10% { opacity: 1; }
    100% { opacity: 0; }
  }
</style>
