<script lang="ts">
  import logo from '../assets/logo.svg'
</script>

<section class="hero">
  <div class="container hero-inner">
    <img src={logo} alt="Firmium logo" class="hero-logo" />
    <h1>
      A native music client for
      <span class="gradient-text">OpenSubsonic</span>
    </h1>
    <p class="tagline">
      Smooth, fast, simple, forever. Stream your library from Navidrome or
      any OpenSubsonic-compatible server, on Linux, Windows, or Android.
    </p>
    <div class="hero-actions">
      <a class="btn btn-primary" href="https://github.com/fossisawesome/firmium/releases" target="_blank" rel="noreferrer">
        Download
      </a>
      <a class="btn btn-secondary" href="https://github.com/fossisawesome/firmium" target="_blank" rel="noreferrer">
        View on GitHub
      </a>
      <a class="btn btn-secondary" href="https://fossisawesome.github.io/firmium-docs/" target="_blank" rel="noreferrer">
        Read the Docs
      </a>
    </div>
  </div>
</section>

<style>
  .hero {
    padding: 80px 0 60px;
    text-align: center;
    border-bottom: 1px solid var(--border);
  }

  .hero-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .hero-logo {
    width: 96px;
    height: 96px;
    margin-bottom: 24px;
  }

  h1 {
    font-size: 40px;
    line-height: 1.3;
    margin: 0 0 20px;
    max-width: 700px;
  }

  .tagline {
    color: var(--muted);
    font-size: 17px;
    max-width: 620px;
    margin: 0 0 32px;
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    justify-content: center;
  }

  @media (max-width: 600px) {
    .hero {
      padding: 56px 0 40px;
    }

    h1 {
      font-size: 28px;
    }
  }
</style>
