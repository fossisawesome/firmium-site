<script lang="ts">
  let { open }: { open: boolean } = $props()

  const stats = { fps: 60, decode: '1.2ms', buffer: '4096', format: 'PCM 16-bit/44.1kHz', latency: '18ms' }
</script>

{#if open}
  <div class="hud">
    <div>FPS: {stats.fps}</div>
    <div>Decode: {stats.decode}</div>
    <div>Buffer: {stats.buffer}</div>
    <div>Format: {stats.format}</div>
    <div>Latency: {stats.latency}</div>
  </div>
{/if}

<style>
  .hud {
    position: absolute;
    top: 12px;
    right: 12px;
    background: rgba(0, 0, 0, 0.85);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 10px 14px;
    font-size: 11px;
    color: var(--accent);
    z-index: 20;
    line-height: 1.6;
  }
</style>
