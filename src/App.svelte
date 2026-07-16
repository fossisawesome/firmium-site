<script lang="ts">
  import { onMount } from 'svelte'
  import { initTheme } from './lib/theme'
  import { matchesKonami, matchesSubsonic } from './lib/easterEggs'
  import Nav from './lib/Nav.svelte'
  import Hero from './lib/Hero.svelte'
  import HowItWorks from './lib/HowItWorks.svelte'
  import Features from './lib/Features.svelte'
  import Gallery from './lib/Gallery.svelte'
  import Platforms from './lib/Platforms.svelte'
  import Comparison from './lib/Comparison.svelte'
  import Themes from './lib/Themes.svelte'
  import Changelog from './lib/Changelog.svelte'
  import Cta from './lib/Cta.svelte'
  import Footer from './lib/Footer.svelte'
  import MiniPlayer from './lib/MiniPlayer.svelte'
  import ShortcutsOverlay from './lib/ShortcutsOverlay.svelte'
  import DiagnosticsHud from './lib/DiagnosticsHud.svelte'
  import LogoEasterEgg from './lib/LogoEasterEgg.svelte'

  const VERSION = 'v8.1.0'

  let shortcutsOpen = $state(false)
  let logoEggOpen = $state(false)
  let diagOpen = $state(false)
  let konamiActive = $state(false)
  let subsonicFlash = $state(false)

  let keyBuffer: string[] = []
  let charBuffer = ''
  let pressTimer: ReturnType<typeof setTimeout> | null = null

  function closeTopmost() {
    if (shortcutsOpen) shortcutsOpen = false
    else if (diagOpen) diagOpen = false
    else if (logoEggOpen) logoEggOpen = false
  }

  function onKeydown(e: KeyboardEvent) {
    keyBuffer = [...keyBuffer, e.key].slice(-10)
    if (matchesKonami(keyBuffer)) {
      konamiActive = true
      setTimeout(() => (konamiActive = false), 2600)
    }

    if (e.key.length === 1) {
      charBuffer = (charBuffer + e.key).slice(-16)
      if (matchesSubsonic(charBuffer)) {
        subsonicFlash = true
        charBuffer = ''
        setTimeout(() => (subsonicFlash = false), 900)
      }
    }

    if (e.key === '?') {
      shortcutsOpen = !shortcutsOpen
    }

    if (e.key === 'Escape') {
      closeTopmost()
    }
  }

  function onHeroContextMenu(e: MouseEvent) {
    e.preventDefault()
    diagOpen = true
    setTimeout(() => (diagOpen = false), 4000)
  }

  function onHeroPointerDown() {
    pressTimer = setTimeout(() => {
      diagOpen = true
      setTimeout(() => (diagOpen = false), 4000)
    }, 550)
  }

  function onHeroPointerUp() {
    if (pressTimer) clearTimeout(pressTimer)
  }

  onMount(() => {
    initTheme()
  })
</script>

<svelte:window onkeydown={onKeydown} />

<a href="#main-content" class="skip-link">Skip to content</a>

<Nav version={VERSION} onLogoEgg={() => (logoEggOpen = true)} />

<main
  id="main-content"
  tabindex="-1"
  class:degauss={konamiActive}
  oncontextmenu={onHeroContextMenu}
  onpointerdown={onHeroPointerDown}
  onpointerup={onHeroPointerUp}
  onpointerleave={onHeroPointerUp}
>
  <Hero />
  <DiagnosticsHud open={diagOpen} />
  <HowItWorks />
  <Features />
  <Gallery />
  <Platforms />
  <Comparison />
  <Themes />
  <Changelog />
  <Cta />
</main>

<Footer />
<MiniPlayer />

<ShortcutsOverlay open={shortcutsOpen} onClose={() => (shortcutsOpen = false)} />
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

<style>
  :global(.skip-link) {
    position: absolute;
    left: -9999px;
    top: 0;
    background: var(--accent);
    color: #151109;
    padding: 10px 16px;
    z-index: 1000;
  }

  :global(.skip-link:focus) {
    left: 8px;
    top: 8px;
  }

  :global(main.degauss) {
    animation: degauss 0.9s ease;
  }

  @keyframes degauss {
    0% { transform: skew(0deg) scale(1); }
    20% { transform: skew(-2deg) scale(1.01); }
    40% { transform: skew(2deg) scale(0.99); }
    60% { transform: skew(-1deg) scale(1.005); }
    80% { transform: skew(1deg) scale(0.998); }
    100% { transform: skew(0deg) scale(1); }
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
    font-size: 48px;
    font-weight: 700;
    color: var(--accent);
  }

  .konami-sub {
    font-size: 16px;
    color: var(--muted);
    margin-top: 8px;
  }

  .subsonic-flash {
    position: fixed;
    inset: 0;
    z-index: 500;
    pointer-events: none;
    background: repeating-linear-gradient(
      0deg,
      color-mix(in srgb, var(--accent) 40%, transparent) 0px,
      transparent 2px,
      transparent 4px
    );
    mix-blend-mode: screen;
    animation: subsonicFade 0.9s ease forwards;
  }

  @keyframes subsonicFade {
    0% { opacity: 0; }
    30% { opacity: 1; }
    100% { opacity: 0; }
  }
</style>
