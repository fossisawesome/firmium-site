<script lang="ts">
  let { version, onLogoEgg }: { version: string; onLogoEgg: () => void } = $props()

  let clickTimes: number[] = []

  function onLogoClick(e: MouseEvent) {
    e.preventDefault()
    window.scrollTo({ top: 0 })
    const now = Date.now()
    clickTimes = [...clickTimes, now].filter((t) => now - t < 1800)
    if (clickTimes.length >= 5) {
      clickTimes = []
      onLogoEgg()
    }
  }
</script>

<header class="nav">
  <div class="container nav-inner">
    <a href="/" class="brand" onclick={onLogoClick}>
      <span class="brand-name">Firmium</span>
    </a>
    <div class="right">
      {#if version}<span class="version-pill">{version}</span>{/if}
      <a class="btn btn-primary nav-cta" href="#download">
        Download
      </a>
    </div>
  </div>
</header>

<style lang="scss">
  .nav {
    position: sticky;
    top: 0;
    z-index: 50;
    background: color-mix(in srgb, var(--bg) 72%, transparent);
    backdrop-filter: blur(20px) saturate(160%);
    border-bottom: 1px solid var(--border);
    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.04) inset;

    @media (prefers-reduced-transparency: reduce) {
      background: var(--bg);
    }
    padding: 18px 48px;
  }

  .nav-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .brand {
    display: flex;
    align-items: center;
    color: var(--text);
  }

  .brand-name {
    font-size: 19px;
    font-weight: 700;
    background: linear-gradient(180deg, var(--accent) 40%, var(--text) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .right {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .version-pill {
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 3px 7px;
    font-size: 11px;
    color: var(--muted);
  }

  .nav-cta {
    background: var(--accent);
    color: var(--accent-text) !important;
    font-weight: 700;
    padding: 9px 18px;
    border-radius: 6px;
    font-size: 13px;
  }

  @media (max-width: 700px) {
    .nav {
      padding: 14px 20px;
    }
  }
</style>
