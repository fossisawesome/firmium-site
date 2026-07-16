<script lang="ts">
  let { open, onClose }: { open: boolean; onClose: () => void } = $props()

  const commits = [
    'a3f21c8 fix: make it go fast again',
    '9b7e0d1 chore: bribe the CRT flicker into looking intentional',
    '1c4f882 feat: add fifth click, for legal reasons',
    'e02aa77 fix: fix the fix from the previous fix',
    '77d1103 refactor: rename bug to feature',
    '0f00f00 initial commit',
  ]
</script>

{#if open}
  <div class="scrim" onclick={onClose} onkeydown={(e) => e.key === 'Escape' && onClose()} role="button" tabindex="-1">
    <div class="window" onclick={(e) => e.stopPropagation()} onkeydown={(e) => e.stopPropagation()} role="dialog" tabindex="-1">
      <div class="titlebar">
        <span class="dot dot-red" onclick={onClose} onkeydown={(e) => e.key === 'Enter' && onClose()} role="button" tabindex="0" aria-label="Close"></span>
        <span class="dot dot-gold"></span>
        <span class="dot dot-green"></span>
        <span class="titlebar-label">git log --oneline -6</span>
      </div>
      <pre>{commits.join('\n')}</pre>
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

  .window {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 11px;
    overflow: hidden;
    max-width: 480px;
    width: 90%;
  }

  .titlebar {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    background: var(--surface2);
    border-bottom: 1px solid var(--border);
  }

  .dot {
    width: 11px;
    height: 11px;
    border-radius: 50%;
  }

  .dot-red { background: #ff5f57; cursor: pointer; }
  .dot-gold { background: #febc2e; }
  .dot-green { background: #28c840; }

  .titlebar-label {
    margin-left: 8px;
    font-size: 12px;
    color: var(--muted);
  }

  pre {
    margin: 0;
    padding: 16px 20px;
    font-size: 12px;
    color: var(--text);
    white-space: pre-wrap;
  }
</style>
