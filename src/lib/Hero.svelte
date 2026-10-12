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
      <a class="btn btn-secondary" href="https://docs.firmium.app" target="_blank" rel="noreferrer">
        Read the docs
      </a>
    </div>
    <p class="muted-line">
      Plays straight from local storage or any Navidrome / OpenSubsonic-compatible server · no account, no cloud lock-in
    </p>
    <a class="star-link" href="https://github.com/fossisawesome/firmium" target="_blank" rel="noreferrer">
      Star on GitHub
      {#if stars !== null}<span class="star-count">★ {stars}</span>{/if}
    </a>
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

<style>
  .hero {
    max-width: 1160px;
    margin: 0 auto;
    padding: 96px 48px 64px;
    text-align: center;
  }

  h1 {
    font-size: 64px;
    line-height: 1.05;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin: 0 0 20px;
    animation: flicker 6s infinite;
  }

  .accent-glow {
    color: var(--accent);
    text-shadow: 0 0 24px color-mix(in srgb, var(--accent) 60%, transparent);
  }

  .subhead {
    color: var(--muted);
    font-size: 19px;
    max-width: 600px;
    margin: 0 auto 32px;
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    justify-content: center;
    margin-bottom: 20px;
  }

  .btn {
    transition: transform 0.15s, box-shadow 0.15s;
  }

  .btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px color-mix(in srgb, var(--accent) 35%, transparent);
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
    margin-bottom: 48px;
  }

  .star-link:hover {
    color: var(--accent);
  }

  .star-count {
    color: var(--accent);
  }

  .hero-window-wrap {
    position: relative;
    max-width: 920px;
    margin: 0 auto;
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
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
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
    height: 12px;
    background: var(--accent);
    border-radius: 2px;
    animation: vbarPulse ease-in-out infinite;
  }

  @keyframes vbarPulse {
    0%, 100% { height: 4px; }
    50% { height: 16px; }
  }

  @media (max-width: 700px) {
    .hero {
      padding: 56px 20px 40px;
    }

    h1 {
      font-size: 40px;
    }
  }
</style>
