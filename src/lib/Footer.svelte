<footer class="footer">
  <div class="container footer-top">
    <div class="mark">
      <svg width="16" height="18" viewBox="0 0 140 155" fill="none">
        <rect x="28" y="15" width="13" height="133" rx="6" fill="var(--muted)" />
        <rect x="45" y="15" width="13" height="133" rx="6" fill="var(--muted)" />
        <rect x="63" y="15" width="10" height="34" rx="5" fill="var(--muted)" />
        <rect x="77" y="15" width="10" height="30" rx="5" fill="var(--muted)" />
        <rect x="91" y="15" width="10" height="26" rx="5" fill="var(--muted)" />
        <rect x="105" y="15" width="10" height="22" rx="5" fill="var(--muted)" />
        <rect x="63" y="80" width="10" height="28" rx="5" fill="var(--muted)" />
        <rect x="77" y="80" width="10" height="24" rx="5" fill="var(--muted)" />
        <rect x="91" y="80" width="10" height="20" rx="5" fill="var(--muted)" />
      </svg>
      <div class="eq-bars">
        {#each Array(4) as _, i}
          <span style="animation-delay: {i * 0.15}s"></span>
        {/each}
      </div>
      <span>Firmium — smooth, fast, simple. Forever.</span>
    </div>
    <div class="links">
      <a href="https://docs.firmium.app" target="_blank" rel="noreferrer">Docs</a>
      <a href="https://github.com/fossisawesome/firmium" target="_blank" rel="noreferrer">GitHub</a>
      <a href="https://discord.gg/bfZ3rpYJXk" target="_blank" rel="noreferrer">Discord</a>
      <a href="https://github.com/fossisawesome/firmium/blob/main/LICENSE" target="_blank" rel="noreferrer">GPL-3.0</a>
    </div>
  </div>
</footer>

<style lang="scss">
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

  .eq-bars {
    display: flex;
    align-items: flex-end;
    gap: 2px;
    height: 12px;
  }

  .eq-bars span {
    width: 3px;
    height: 100%;
    background: var(--accent);
    opacity: 0.7;
    border-radius: 1px;
    transform-origin: bottom;
    animation: eqBar 1.1s ease-in-out infinite;
  }

  @keyframes eqBar {
    0%, 100% { transform: scaleY(0.3); }
    50% { transform: scaleY(1); }
  }

  .links {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 20px;
  }

  .links a {
    color: var(--muted);
    font-size: 13px;
    white-space: nowrap;
  }

  .links a:hover {
    color: var(--accent);
  }
</style>
