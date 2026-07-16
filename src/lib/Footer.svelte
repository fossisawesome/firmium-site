<script lang="ts">
  const version = 'v8.1.0'
</script>

<footer class="footer">
  <div class="container footer-top">
    <div class="mark">
      <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
        <rect x="0" y="5" width="3" height="9" fill="var(--accent)" />
        <rect x="5" y="2" width="3" height="12" fill="var(--accent)" />
        <rect x="10" y="6" width="3" height="8" fill="var(--accent)" />
        <rect x="15" y="0" width="3" height="14" fill="var(--accent)" />
      </svg>
      <span>Firmium — smooth, fast, simple. Forever.</span>
    </div>
    <div class="links">
      <a href="https://docs.firmium.app" target="_blank" rel="noreferrer">Docs</a>
      <a href="https://github.com/fossisawesome/firmium" target="_blank" rel="noreferrer">GitHub</a>
      <a href="https://discord.gg/bfZ3rpYJXk" target="_blank" rel="noreferrer">Discord</a>
      <a href="https://github.com/fossisawesome/firmium/blob/main/LICENSE" target="_blank" rel="noreferrer">GPL-3.0</a>
    </div>
  </div>
  <div class="version-line">Currently {version}</div>
</footer>

<style>
  .footer {
    border-top: 1px solid var(--border);
    padding: 32px 48px 60px;
    margin-top: auto;
  }

  .footer-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
  }

  .mark {
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--muted);
    font-size: 13px;
  }

  .links {
    display: flex;
    gap: 20px;
  }

  .links a {
    color: var(--muted);
    font-size: 13px;
  }

  .links a:hover {
    color: var(--accent);
  }

  .version-line {
    text-align: center;
    color: var(--muted);
    font-size: 12px;
    margin-top: 24px;
  }
</style>
