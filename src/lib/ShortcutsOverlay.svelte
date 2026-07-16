<script lang="ts">
  let { open, onClose }: { open: boolean; onClose: () => void } = $props()
</script>

{#if open}
  <div class="scrim" onclick={onClose} onkeydown={(e) => e.key === 'Escape' && onClose()} role="button" tabindex="-1">
    <div class="panel" onclick={(e) => e.stopPropagation()} onkeydown={(e) => e.stopPropagation()} role="dialog" tabindex="-1">
      <h3>Keyboard shortcuts</h3>
      <dl>
        <dt>Space</dt><dd>Play / Pause</dd>
        <dt>Esc</dt><dd>Close overlay</dd>
      </dl>
      <p class="cli">firmium play-pause · next · prev · volume &lt;0-100&gt; · shuffle-toggle</p>
    </div>
  </div>
{/if}

<style>
  .scrim {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .panel {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 11px;
    padding: 24px 28px;
    text-align: left;
    max-width: 360px;
  }

  h3 {
    margin: 0 0 16px;
  }

  dl {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 6px 16px;
    margin: 0 0 16px;
  }

  dt {
    color: var(--accent);
    font-weight: 700;
  }

  dd {
    margin: 0;
    color: var(--muted);
  }

  .cli {
    font-size: 12px;
    color: var(--muted);
    margin: 0;
  }
</style>
