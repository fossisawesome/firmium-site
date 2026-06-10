<script lang="ts">
  import logo from '../assets/logo.svg'
</script>

<header class="header">
  <div class="container header-inner">
    <a href="/" class="brand">
      <img src={logo} alt="Firmium logo" class="brand-logo" />
      <span class="brand-name">Firmium</span>
    </a>
    <nav class="nav">
      <a href="https://fossisawesome.github.io/firmium-docs/" target="_blank" rel="noreferrer">Docs</a>
      <a href="https://github.com/fossisawesome/firmium" target="_blank" rel="noreferrer">GitHub</a>
      <a href="https://github.com/fossisawesome/firmium/releases" target="_blank" rel="noreferrer" class="btn btn-primary nav-cta">Download</a>
    </nav>
  </div>
</header>

<style>
  .header {
    position: sticky;
    top: 0;
    z-index: 10;
    background: rgba(15, 15, 15, 0.85);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid var(--border);
  }

  .header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--text);
  }

  .brand:hover {
    text-decoration: none;
  }

  .brand-logo {
    width: 28px;
    height: 28px;
  }

  .brand-name {
    font-weight: bold;
    font-size: 18px;
    letter-spacing: 0.5px;
  }

  .nav {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .nav a {
    color: var(--text);
  }

  .nav a:hover {
    color: var(--accent);
  }

  .nav-cta {
    color: #1a1408 !important;
    padding: 8px 16px;
    font-size: 14px;
  }

  .nav-cta:hover {
    color: #1a1408 !important;
  }

  @media (max-width: 600px) {
    .nav {
      gap: 12px;
      font-size: 14px;
    }

    .brand-name {
      font-size: 16px;
    }
  }
</style>
