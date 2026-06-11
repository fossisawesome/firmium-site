<script lang="ts">
  interface Platform {
    name: string
    description: string
  }

  const platforms: Platform[] = [
    {
      name: 'Linux Desktop',
      description: 'Available as .deb, .rpm, and Arch packages.',
    },
    {
      name: 'Windows',
      description: 'Available as an NSIS installer.',
    },
    {
      name: 'Android',
      description: 'Native Kotlin + Jetpack Compose app, available as an APK.',
    },
  ]
</script>

<section class="platforms">
  <div class="container">
    <h2 class="section-title">Available everywhere you listen</h2>
    <div class="grid">
      {#each platforms as platform (platform.name)}
        <div class="card">
          <h3>{platform.name}</h3>
          <p>{platform.description}</p>
        </div>
      {/each}
    </div>
    <div class="cta">
      <a class="btn btn-primary" href="https://github.com/fossisawesome/firmium/releases" target="_blank" rel="noreferrer">
        Get the latest release
      </a>
    </div>
  </div>
</section>

<style>
  .platforms {
    padding: 60px 0;
    border-bottom: 1px solid var(--border);
  }

  .grid {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    max-width: 700px;
    margin: 0 auto;
  }

  .card {
    padding: 24px;
    text-align: center;
  }

  .card h3 {
    margin: 0 0 8px;
    color: var(--text);
  }

  .card p {
    margin: 0;
    color: var(--muted);
    font-size: 14px;
  }

  .cta {
    text-align: center;
    margin-top: 32px;
  }
</style>
