<script lang="ts">
  let visible = $state(false)

  function onScroll() {
    visible = window.scrollY > 700
  }
</script>

<svelte:window onscroll={onScroll} />

<div class="mini-player" class:visible>
  <div class="container mini-inner">
    <div class="cover"></div>
    <div class="track-info">
      <div class="track-name">Nothing playing — this is a preview</div>
      <div class="progress"><div class="fill"></div></div>
    </div>
    <div class="controls">
      <i class="fa-solid fa-backward-step"></i>
      <i class="fa-solid fa-play"></i>
      <i class="fa-solid fa-forward-step"></i>
    </div>
  </div>
</div>

<style>
  .mini-player {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: color-mix(in srgb, var(--bg) 92%, transparent);
    backdrop-filter: blur(10px);
    border-top: 1px solid var(--border);
    transform: translateY(100%);
    transition: transform 0.3s ease;
    z-index: 40;
  }

  .mini-player.visible {
    transform: translateY(0);
  }

  .mini-inner {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 10px 24px;
  }

  .cover {
    width: 40px;
    height: 40px;
    border-radius: 6px;
    background: var(--surface2);
    flex-shrink: 0;
  }

  .track-info {
    flex: 1;
    min-width: 0;
  }

  .track-name {
    font-size: 13px;
    color: var(--muted);
    margin-bottom: 6px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .progress {
    height: 3px;
    background: var(--border);
    border-radius: 2px;
    overflow: hidden;
  }

  .fill {
    width: 38%;
    height: 100%;
    background: var(--accent);
  }

  .controls {
    display: flex;
    gap: 16px;
    color: var(--text);
    flex-shrink: 0;
  }
</style>
