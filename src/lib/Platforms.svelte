<script lang="ts">
  import { revealOnScroll } from './revealOnScroll'

  const platforms = [
    { label: 'Linux' },
    { label: 'Windows' },
    { label: 'macOS' },
    { label: 'Android' },
    { label: 'Android Auto' },
    { label: 'Wear OS' },
    { label: 'Android TV' },
    { label: 'Terminal' },
  ]

  let cliHover = $state(false)
</script>

<section class="platforms">
  <div class="container">
    <div class="header reveal" use:revealOnScroll>
      <div class="eyebrow">PLATFORMS</div>
      <h2>Everywhere you listen</h2>
      <p class="subhead">One login, one library, synced across all of it.</p>
    </div>
    <div class="badges reveal" use:revealOnScroll>
      {#each platforms as p}
        <div
          class="badge"
          class:has-tooltip={p.label === 'Terminal'}
          role="group"
          onmouseenter={() => p.label === 'Terminal' && (cliHover = true)}
          onmouseleave={() => p.label === 'Terminal' && (cliHover = false)}
        >
          <span>{p.label}</span>
          {#if p.label === 'Terminal' && cliHover}
            <div class="tooltip">
              <div>$ firmium --now-playing▮</div>
              <div class="dim">nothing queued — point me at a server</div>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .platforms {
    max-width: 1160px;
    margin: 0 auto;
    padding: 40px 48px;
  }

  .header {
    text-align: center;
    margin-bottom: 40px;
  }

  h2 {
    font-size: 38px;
    margin: 0 0 8px;
  }

  .subhead {
    color: var(--muted);
    margin: 0;
  }

  .badges {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    justify-content: center;
  }

  .badge {
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 12px 20px;
    transition: border-color 0.15s, transform 0.15s;
  }

  .badge:hover {
    border-color: var(--accent);
    transform: translateY(-2px);
  }

  .tooltip {
    position: absolute;
    top: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 10px 12px;
    font-size: 11px;
    white-space: nowrap;
    z-index: 5;
  }

  .tooltip .dim {
    color: var(--muted);
    margin-top: 2px;
  }
</style>
