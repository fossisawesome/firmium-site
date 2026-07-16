<script lang="ts">
  import type { Snippet } from 'svelte'

  let { label, size = 'large', children }: { label: string; size?: 'large' | 'small'; children?: Snippet } = $props()

  type WinState = 'normal' | 'min' | 'max' | 'closed'
  let winState = $state<WinState>('normal')
  let closing = $state(false)

  function close() {
    closing = true
    setTimeout(() => {
      closing = false
      winState = 'closed'
    }, 220)
  }

  function reopen() {
    winState = 'normal'
  }

  function toggleMin() {
    winState = winState === 'min' ? 'normal' : 'min'
  }

  function toggleMax() {
    winState = winState === 'max' ? 'normal' : 'max'
  }
</script>

{#if winState === 'closed'}
  <div class="window closed-placeholder {size}">
    <button class="reopen-btn" onclick={reopen}>Reopen {label}</button>
  </div>
{:else}
  <div class="window {size} {winState === 'max' ? 'max' : ''}" class:closing>
    {#if closing}<div class="power-off-flash"></div>{/if}
    <div class="titlebar">
      <span class="dot dot-red" onclick={close} onkeydown={(e) => e.key === 'Enter' && close()} role="button" tabindex="0" aria-label="Close"></span>
      <span class="dot dot-gold" onclick={toggleMin} onkeydown={(e) => e.key === 'Enter' && toggleMin()} role="button" tabindex="0" aria-label="Minimize"></span>
      <span class="dot dot-green" onclick={toggleMax} onkeydown={(e) => e.key === 'Enter' && toggleMax()} role="button" tabindex="0" aria-label="Maximize"></span>
      <span class="titlebar-label">{label}</span>
    </div>
    {#if winState !== 'min'}
      <div class="body">
        {@render children?.()}
      </div>
    {/if}
  </div>
{/if}

<style>
  .window {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 11px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
    transition: all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
    position: relative;
  }

  .window.large {
    border-radius: 14px;
  }

  .window.max {
    position: fixed;
    inset: 5vh 6vw;
    z-index: 300;
  }

  .window.closing {
    transform: scale(0.9);
    opacity: 0;
  }

  .power-off-flash {
    position: absolute;
    inset: 0;
    background: #fff;
    z-index: 10;
    animation: powerOff 0.22s ease forwards;
  }

  @keyframes powerOff {
    0% { opacity: 1; }
    100% { opacity: 0; }
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
    cursor: pointer;
    display: inline-block;
  }

  .small .dot {
    width: 8px;
    height: 8px;
  }

  .dot-red { background: #ff5f57; }
  .dot-gold { background: #febc2e; }
  .dot-green { background: #28c840; }

  .titlebar-label {
    margin-left: 8px;
    font-size: 12px;
    color: var(--muted);
  }

  .body {
    transition: height 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.35s;
  }

  .closed-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }

  .reopen-btn {
    background: var(--surface);
    border: 1px solid var(--border);
    color: var(--muted);
    padding: 8px 14px;
    border-radius: 6px;
    cursor: pointer;
    font-family: var(--font);
    font-size: 12px;
  }
</style>
