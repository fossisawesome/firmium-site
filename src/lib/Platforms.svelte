<script lang="ts">
  import { fade, scale } from 'svelte/transition'
  import { quintOut } from 'svelte/easing'
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
    <div class="header reveal" {@attach revealOnScroll()}>
      <div class="eyebrow">PLATFORMS</div>
      <h2>Everywhere you listen</h2>
      <p class="subhead">One login, one library, synced across all of it.</p>
    </div>
    <div class="badges reveal" {@attach revealOnScroll()}>
      {#each platforms as p, i}
        <div class={["badge", { 'has-tooltip': p.label === 'Terminal' }]}
          role="group"
          onmouseenter={() => p.label === 'Terminal' && (cliHover = true)}
          onmouseleave={() => p.label === 'Terminal' && (cliHover = false)}>
          <span class="num">{String(i + 1).padStart(2, '0')}</span>
          <span>{p.label}</span>
          {#if p.label === 'Terminal' && cliHover}
            <div class="tooltip" in:scale={{ start: 0.97, duration: 125, easing: quintOut }} out:fade={{ duration: 100 }}>
              <div>$ firmium --now-playing▮</div>
              <div class="dim">nothing queued — point me at a server</div>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>

<style lang="scss">
  .platforms {
    max-width: 1160px;
    margin: 0 auto;
    padding: 96px 48px;
  }

  .header {
    text-align: center;
    margin-bottom: 64px;
  }

  h2 {
    font-size: clamp(32px, 5.6vw, 60px);
    line-height: 1.05;
    letter-spacing: -0.04em;
    margin: 0;
  }

  .subhead {
    color: var(--muted);
    max-width: 560px;
    margin: 12px auto 0;
    font-size: 18px;
  }

  .badges {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    max-width: 920px;
    margin: 0 auto;
    border-bottom: 1px solid var(--border);
  }

  .badge {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 14px;
    border-top: 1px solid var(--border);
    padding: 20px 16px 24px;
    font-weight: 700;
    font-size: 17px;
    transition: background 0.2s, box-shadow 0.2s;
  }

  .num {
    color: var(--accent);
    font-size: 13px;
    font-weight: 400;
  }

  @media (hover: hover) {
    .badge:hover {
      background: var(--surface);
      box-shadow: inset 0 2px 0 var(--accent);
    }
  }

  @media (max-width: 700px) {
    .platforms {
      padding: 40px 20px;
    }

    .badges {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }


  .tooltip {
    position: absolute;
    top: calc(100% + 8px);
    left: 50%;
    translate: -50% 0;
    transform-origin: top center;
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
