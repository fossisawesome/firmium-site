<section class="cta-wrap" id="download">
  <div class="container">
    <div class="cta-panel">
      <div class="comet-ring"></div>
      <div class="scanline"></div>
      <h2>Local files or your own server. Own your library.</h2>
      <p>Firmium is a client, not a service — point it at a folder on disk, Navidrome, or any OpenSubsonic server and it's yours, forever.</p>
      <div class="actions">
        <a class="btn btn-primary" href="https://github.com/fossisawesome/firmium/releases/latest" target="_blank" rel="noreferrer">
          Get the latest release
        </a>
        <a class="btn btn-secondary" href="https://github.com/fossisawesome/firmium" target="_blank" rel="noreferrer">
          View source on GitHub
        </a>
      </div>
      <p class="platforms-caption">Linux · Windows · macOS · Android</p>
    </div>
  </div>
</section>

<style>
  .cta-wrap {
    max-width: 1160px;
    margin: 0 auto;
    padding: 40px 48px;
  }

  .cta-panel {
    position: relative;
    background: linear-gradient(135deg, color-mix(in srgb, var(--accent) 10%, var(--bg)), var(--surface));
    border: 1px solid color-mix(in srgb, var(--accent) 25%, transparent);
    border-radius: 20px;
    padding: 64px 48px;
    text-align: center;
    overflow: hidden;
  }

  .comet-ring {
    position: absolute;
    inset: -100%;
    border-radius: 20px;
    padding: 3px;
    background: conic-gradient(
      from 0deg,
      transparent 0%,
      color-mix(in srgb, var(--accent) 15%, transparent) 8%,
      var(--accent) 20%,
      color-mix(in srgb, var(--accent) 70%, white) 24%,
      var(--accent) 28%,
      color-mix(in srgb, var(--accent) 15%, transparent) 40%,
      transparent 55%
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    animation: rotateRing 3s linear infinite;
    pointer-events: none;
  }

  @keyframes rotateRing {
    to { transform: rotate(360deg); }
  }

  .scanline {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--accent), transparent);
    animation: sweepScanline 4s linear infinite;
    pointer-events: none;
  }

  @keyframes sweepScanline {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(600%); }
  }

  h2 {
    font-size: 32px;
    margin: 0 0 12px;
    position: relative;
  }

  p {
    color: var(--muted);
    position: relative;
    max-width: 520px;
    margin: 0 auto;
  }

  .actions {
    display: flex;
    gap: 12px;
    justify-content: center;
    margin: 24px 0 16px;
    position: relative;
  }

  .platforms-caption {
    font-size: 12px;
    position: relative;
  }

  @media (max-width: 700px) {
    .cta-panel {
      padding: 40px 20px;
    }
  }
</style>
