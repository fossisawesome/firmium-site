<script lang="ts">
  import { revealOnScroll } from './revealOnScroll'
  import { changelog } from './changelog.svelte'
</script>

{#if changelog.entries.length > 0}
<section class="changelog">
  <div class="container">
    <div class="header reveal" {@attach revealOnScroll()}>
      <div class="eyebrow">CHANGELOG</div>
      <h2>Actively built, in the open</h2>
    </div>
    <div class="list reveal" {@attach revealOnScroll()}>
      {#each changelog.entries as entry}
        <div class="entry">
          <div class="version-row">
            <span class="version">{entry.version}</span>
            {#if entry.tag}<span class="tag">{entry.tag}</span>{/if}
          </div>
          <ul>
            {#each entry.bullets as bullet}
              <li>{bullet}</li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
    <a class="full-link" href="https://github.com/fossisawesome/firmium/blob/main/CHANGELOG.md" target="_blank" rel="noreferrer">
      Full changelog on GitHub →
    </a>
  </div>
</section>
{/if}

<style lang="scss">
  .changelog {
    max-width: 900px;
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

  .list {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid var(--border);
  }

  .entry {
    border-top: 1px solid var(--border);
    padding: 20px 12px;
  }

  .version-row {
    display: flex;
    align-items: baseline;
    gap: 10px;
    margin-bottom: 8px;
  }

  .version {
    font-weight: 700;
    color: var(--accent);
    font-size: 15px;
  }

  .tag {
    color: var(--muted);
    font-size: 13px;
  }

  ul {
    margin: 0;
    padding-left: 18px;
    color: var(--muted);
    font-size: 13.5px;
  }

  .full-link {
    display: block;
    text-align: center;
    margin-top: 32px;
    color: var(--accent);
    font-size: 13px;
  }
</style>
