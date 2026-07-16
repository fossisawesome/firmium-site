<script lang="ts">
  import logo from '../assets/logo.svg'

  let { version, onLogoEgg }: { version: string; onLogoEgg: () => void } = $props()

  let clickTimes: number[] = []

  function onLogoClick(e: MouseEvent) {
    const now = Date.now()
    clickTimes = [...clickTimes, now].filter((t) => now - t < 1800)
    if (clickTimes.length >= 5) {
      clickTimes = []
      e.preventDefault()
      onLogoEgg()
    }
  }
</script>

<header class="nav">
  <div class="container nav-inner">
    <a href="/" class="brand" onclick={onLogoClick}>
      <img src={logo} alt="Firmium logo" class="brand-logo" />
      <span class="brand-name">Firmium</span>
    </a>
    <div class="right">
      <span class="version-pill">{version}</span>
      <a class="btn btn-primary nav-cta" href="https://github.com/fossisawesome/firmium/releases" target="_blank" rel="noreferrer">
        Download
      </a>
    </div>
  </div>
</header>

<style>
  .nav {
    position: sticky;
    top: 0;
    z-index: 50;
    background: color-mix(in srgb, var(--bg) 85%, transparent);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--border);
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
    gap: 10px;
    color: var(--text);
  }

  .brand-logo {
    width: 24px;
    height: 24px;
  }

  .brand-name {
    font-size: 19px;
    font-weight: 700;
    background: linear-gradient(180deg, #e8c97e 40%, #863bff 100%);
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
    color: #151109 !important;
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
