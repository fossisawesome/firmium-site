<script lang="ts">
  let { open }: { open: boolean } = $props()
</script>

{#if open}
  <div class="panel">
    <div class="title">KEYBOARD SHORTCUTS</div>
    <dl>
      <div><kbd>Esc</kbd> Close overlay</div>
    </dl>
    <p class="cli">Or drive it headless: firmium play-pause · next · prev · volume &lt;0-100&gt; · shuffle-toggle</p>
    <p class="hint">Press ? or Esc to close</p>
  </div>
{/if}

<style>
  .panel {
    position: absolute;
    inset: 0;
    z-index: 70;
    background: rgba(0, 0, 0, 0.82);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: left;
  }

  .title {
    color: var(--accent);
    font-weight: 700;
    letter-spacing: 0.05em;
    margin-bottom: 10px;
    font-size: 13px;
  }

  dl {
    margin: 0 0 10px;
    font-size: 13px;
    color: var(--text);
    line-height: 1.9;
  }

  dl div {
    display: block;
  }

  kbd {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 2px 8px;
    font-family: var(--font);
    margin-right: 6px;
  }

  .cli {
    color: var(--muted);
    font-size: 12px;
    max-width: 340px;
    margin: 10px 0 0;
  }

  .hint {
    color: var(--muted);
    font-size: 11px;
    margin: 10px 0 0;
  }
</style>
