<script lang="ts">
  import WindowChrome from './WindowChrome.svelte'
  import { fetchStarCount } from './github'
  import homepage from '../assets/screenshots/homepage.png'

  let stars = $state<number | null>(null)

  $effect(() => {
    fetchStarCount().then((count) => (stars = count))
  })
</script>

<section class="hero">
  <div class="container hero-inner">
    <div class="badge">
      <span class="pulse-dot"></span>
      OPEN SOURCE · GPL-3.0 · LOCAL FILES + SUBSONIC
    </div>
    <h1 class="flicker">
      Your library.<br />
      Every device.<br />
      <span class="accent-glow">Forever.</span>
    </h1>
    <p class="subhead">
      Smooth, fast, simple. Stream your library from Navidrome or any
      OpenSubsonic-compatible server, or play straight from local files.
    </p>
    <div class="hero-actions">
      <a class="btn btn-primary" href="https://github.com/fossisawesome/firmium/releases" target="_blank" rel="noreferrer">
        Download Firmium
      </a>
      <a class="btn btn-secondary" href="https://docs.firmium.app" target="_blank" rel="noreferrer">
        Read the docs
      </a>
    </div>
    <p class="muted-line">
      Plays straight from local storage or any Navidrome / OpenSubsonic-compatible server · no account, no cloud lock-in
    </p>
    {#if stars !== null}
      <a class="star-link" href="https://github.com/fossisawesome/firmium" target="_blank" rel="noreferrer">
        Star on GitHub ★{stars}
      </a>
    {/if}
    <div class="hero-window-wrap">
      <div class="hero-glow"></div>
      <WindowChrome label="Firmium — Home" size="large">
        <img src={homepage} alt="Firmium home screen" class="hero-screenshot" />
      </WindowChrome>
      <div class="visualizer">
        {#each Array(6) as _, i}
          <span class="vbar" style="animation-duration: {0.6 + i * 0.1}s; animation-delay: {i * 0.05}s"></span>
        {/each}
      </div>
    </div>
    <p class="shortcut-hint">Press <kbd>?</kbd> for keyboard shortcuts</p>
  </div>
</section>

<style>
  .hero {
    max-width: 1160px;
    margin: 0 auto;
    padding: 96px 48px 64px;
    text-align: center;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--accent-dim);
    border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
    color: var(--accent);
    font-size: 12px;
    padding: 6px 14px;
    border-radius: 20px;
    margin-bottom: 24px;
  }

  .pulse-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--accent);
    animation: pulseDot 1.8s ease-in-out infinite;
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
    display: inline-block;
    color: var(--muted);
    font-size: 13px;
    margin-bottom: 48px;
  }

  .star-link:hover {
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

  .hero-window-wrap :global(.window) {
    animation: floatUp 6s ease-in-out infinite;
  }

  .hero-screenshot {
    width: 100%;
    display: block;
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

  .shortcut-hint {
    color: var(--muted);
    font-size: 11px;
    margin-top: 28px;
  }

  kbd {
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 1px 5px;
    font-family: var(--font);
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
