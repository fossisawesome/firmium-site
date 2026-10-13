<script lang="ts">
  import { fade, scale } from 'svelte/transition'
  import { quintOut } from 'svelte/easing'

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
  <div class="scrim" in:fade={{ duration: 200 }} out:fade={{ duration: 150 }} onclick={(e) => e.target === e.currentTarget && onClose()} role="presentation">
    <div class="dialog" in:scale={{ start: 0.96, duration: 200, easing: quintOut }} role="dialog" aria-modal="true" aria-label="Commit log" tabindex="-1">
      <pre>{commits.join('\n')}</pre>
    </div>
  </div>
{/if}

<style lang="scss">
  .scrim {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .dialog {
    max-width: 480px;
    width: 90%;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 11px;
  }

  pre {
    margin: 0;
    padding: 16px 20px;
    font-size: 12px;
    color: var(--text);
    white-space: pre-wrap;
  }
</style>
