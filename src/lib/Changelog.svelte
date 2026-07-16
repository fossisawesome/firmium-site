<script lang="ts">
  import { revealOnScroll } from './revealOnScroll'
  import { fetchChangelog, FALLBACK_CHANGELOG, type ChangelogEntry } from './changelog'

  let entries = $state<ChangelogEntry[]>(FALLBACK_CHANGELOG)

  $effect(() => {
    fetchChangelog().then((result) => (entries = result))
  })
</script>

<section class="changelog">
  <div class="container">
    <div class="header reveal" use:revealOnScroll>
      <div class="eyebrow">CHANGELOG</div>
      <h2>Actively built, in the open</h2>
    </div>
    <div class="list reveal" use:revealOnScroll>
      {#each entries as entry}
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

<style>
  .changelog {
    max-width: 900px;
    margin: 0 auto;
    padding: 40px 48px;
  }

  .header {
    text-align: center;
    margin-bottom: 32px;
  }

  .reveal {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.6s, transform 0.6s;
  }

  .reveal:global(.show) {
    opacity: 1;
    transform: translateY(0);
  }

  .eyebrow {
    color: var(--accent);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    margin-bottom: 8px;
  }

  h2 {
    font-size: 38px;
    margin: 0;
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
    border-radius: 14px;
    overflow: hidden;
  }

  .entry {
    background: var(--surface);
    padding: 20px 24px;
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
    margin-top: 24px;
    color: var(--accent);
    font-size: 13px;
  }
</style>
