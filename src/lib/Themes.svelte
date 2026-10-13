<script lang="ts">
  import { THEMES, themeState, switchTheme } from './theme.svelte'
  import { revealOnScroll } from './revealOnScroll'
</script>

<section class="themes">
  <div class="container">
    <div class="header reveal" {@attach revealOnScroll()}>
      <div class="eyebrow">THEMES</div>
      <h2>Make it yours</h2>
      <p class="subhead">20 built-in color themes, ported straight from the app. Click one — this whole site re-themes live.</p>
    </div>
    <div class="grid reveal" {@attach revealOnScroll()}>
      {#each THEMES as t}
        <button class={["card", { active: themeState.id === t.id }]}
          onclick={() => switchTheme(t.id)}>
          <div class="row">
            <span class="name">{t.name}</span>
            {#if themeState.id === t.id}<span class="active-dot"></span>{/if}
          </div>
          <div class="swatches">
            <span class="swatch" style="background: {t.bg}"></span>
            <span class="swatch" style="background: {t.surface}"></span>
            <span class="swatch" style="background: {t.accent}"></span>
            <span class="swatch" style="background: {t.text}"></span>
          </div>
        </button>
      {/each}
    </div>
  </div>
</section>

<style lang="scss">
  .themes {
    max-width: 1160px;
    margin: 0 auto;
    padding: 96px 48px;
  }

  .header {
    text-align: center;
    margin-bottom: 56px;
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

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 12px;
  }

  .card {
    background: var(--surface);
    border: 2px solid var(--border);
    border-radius: 10px;
    padding: 14px;
    text-align: left;
    cursor: pointer;
    font-family: var(--font);
    transition: transform 0.2s var(--ease-out), border-color 0.15s;
  }

  .card:active {
    transform: scale(0.97);
  }

  .card.active {
    border-color: var(--accent);
    transform: translateY(-2px);
  }

  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .name {
    font-size: 13px;
    font-weight: 700;
    color: var(--text);
  }

  .active-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--accent);
  }

  .swatches {
    display: flex;
    gap: 4px;
  }

  .swatch {
    width: 16px;
    height: 16px;
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-sizing: border-box;
  }
</style>
