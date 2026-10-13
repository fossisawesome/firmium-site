<script lang="ts">
  import DiagnosticsHud from './DiagnosticsHud.svelte'
  import { fetchStarCount } from './github'
  import homepage from '../assets/screenshots/homepage.png'

  let { diagOpen, onOpenDiag }: { diagOpen: boolean; onOpenDiag: () => void } = $props()

  let stars = $state<number | null>(null)
  let pressTimer: ReturnType<typeof setTimeout> | null = null

  $effect(() => {
    fetchStarCount().then((count) => (stars = count))
  })

  function onContextMenu(e: MouseEvent) {
    e.preventDefault()
    onOpenDiag()
  }

  function onPointerDown() {
    pressTimer = setTimeout(onOpenDiag, 550)
  }

  function onPointerUp() {
    if (pressTimer) clearTimeout(pressTimer)
  }
</script>

<section class="hero">
  <div class="container hero-inner">
    <div class="hero-copy">
    <h1 class="flicker">
      Your library.<br />
      Every device.<br />
      <span class="accent-glow">Forever.</span>
    </h1>
    <p class="subhead">
      A fast, native music client for the files on your device or a self-hosted server. Gapless playback, real
      equalizer, synced lyrics, and a queue that follows you — desktop, Android, watch, and car.
    </p>
    <div class="hero-actions">
      <a class="btn btn-primary" href="#download">
        Download Firmium
      </a>
      <a class="learn" href="https://docs.firmium.app" target="_blank" rel="noreferrer">
        Read the docs &rsaquo;
      </a>
    </div>
    <p class="muted-line">
      Plays straight from local storage or any Navidrome / OpenSubsonic-compatible server · no account, no cloud lock-in
    </p>
    <a class="star-link" href="https://github.com/fossisawesome/firmium" target="_blank" rel="noreferrer">
      Star on GitHub
      {#if stars !== null}<span class="star-count">★ {stars}</span>{/if}
    </a>
    </div>
    <div
      class="hero-window-wrap"
      role="group"
      oncontextmenu={onContextMenu}
      onpointerdown={onPointerDown}
      onpointerup={onPointerUp}
      onpointerleave={onPointerUp}
    >
      <div class="hero-glow"></div>
      <img src={homepage} alt="Firmium home screen" class="hero-screenshot" />
      <DiagnosticsHud open={diagOpen} />
      <div class="visualizer">
        {#each Array(6) as _, i}
          <span class="vbar" style="animation-duration: {0.6 + i * 0.1}s; animation-delay: {i * 0.05}s"></span>
        {/each}
      </div>
    </div>
  </div>
</section>

<style lang="scss">
  .hero {
    max-width: 1240px;
    margin: 0 auto;
    padding: 96px 48px 64px;
    text-align: center;
  }

  h1 {
    font-size: clamp(40px, 8.4vw, 96px);
    line-height: 1.02;
    font-weight: 700;
    letter-spacing: -0.04em;
    margin: 0 0 28px;
    animation: flicker 6s infinite;
  }

  .accent-glow {
    color: var(--accent);
    text-shadow: 0 0 24px color-mix(in srgb, var(--accent) 60%, transparent);
  }

  .subhead {
    color: var(--muted);
    font-size: clamp(16px, 2.2vw, 20px);
    line-height: 1.55;
    max-width: 640px;
    margin: 0 auto 36px;
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px 28px;
    align-items: center;
    justify-content: center;
    margin-bottom: 28px;
  }

  .btn {
    border-radius: 999px;
    padding: 12px 26px;
    transition: transform 0.2s var(--ease-out), box-shadow 0.2s var(--ease-out), background var(--timing), border-color var(--timing);
  }

  .learn {
    color: var(--accent);
    font-size: 16px;
    padding: 12px 0;
  }

  @media (hover: hover) {
    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px color-mix(in srgb, var(--accent) 35%, transparent);
    }
  }

  .btn:active {
    transform: scale(0.97);
    box-shadow: none;
  }

  .muted-line {
    color: var(--muted);
    font-size: 13px;
    margin: 0 0 8px;
  }

  .star-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: var(--muted);
    font-size: 13px;
  }

  .star-link:hover {
    color: var(--accent);
  }

  .star-count {
    color: var(--accent);
  }

  .hero-window-wrap {
    position: relative;
    max-width: 1040px;
    margin: 72px auto 0;
  }

  .hero-glow {
    position: absolute;
    inset: -40px;
    background: radial-gradient(ellipse at center, color-mix(in srgb, var(--accent) 20%, transparent), transparent 70%);
    z-index: -1;
  }

  .hero-screenshot {
    width: 100%;
    display: block;
    border: 1px solid var(--border);
    border-radius: 14px;
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.65);
    animation: floatUp 6s ease-in-out infinite;
  }

  .visualizer {
    position: absolute;
    bottom: -14px;
    right: -14px;
    display: flex;
    align-items: flex-end;
    gap: 3px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 8px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
  }

  .vbar {
    width: 3px;
    height: 16px;
    background: var(--accent);
    border-radius: 2px;
    transform-origin: bottom;
    animation: vbarPulse ease-in-out infinite;
  }

  @keyframes vbarPulse {
    0%, 100% { transform: scaleY(0.25); }
    50% { transform: scaleY(1); }
  }

  @media (max-width: 700px) {
    .hero {
      padding: 64px 20px 40px;
    }

    .hero-window-wrap {
      margin-top: 48px;
    }

    .visualizer {
      right: 0;
    }
  }
</style>
