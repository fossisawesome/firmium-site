<script lang="ts">
  const year = new Date().getFullYear()
</script>

<footer class="footer">
  <div class="container footer-inner">
    <p>Firmium is free software, licensed under GPL-3.0.</p>
    <nav class="links">
      <a href="https://github.com/fossisawesome/firmium" target="_blank" rel="noreferrer">GitHub</a>
      <a href="https://docs.firmium.app" target="_blank" rel="noreferrer">Docs</a>
      <a href="https://github.com/fossisawesome/firmium/blob/main/LICENSE" target="_blank" rel="noreferrer">License</a>
    </nav>
    <p class="copyright">© {year} Firmium contributors</p>
  </div>
</footer>

<style>
  .footer {
    margin-top: auto;
    padding: 32px 0;
    text-align: center;
    color: var(--muted);
    font-size: 14px;
  }

  .footer-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  .links {
    display: flex;
    gap: 16px;
  }

  .copyright {
    margin: 0;
  }
</style>
