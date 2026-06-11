<script lang="ts">
  interface Feature {
    title: string
    description: string
  }

  const features: Feature[] = [
    {
      title: 'Native audio engine',
      description: 'Powered by Rodio on Linux and ExoPlayer on Android, not a bundled web view player.',
    },
    {
      title: 'Crossfade',
      description: 'Configurable crossfade between tracks for gapless listening.',
    },
    {
      title: 'Secure credential storage',
      description: 'Credentials are stored in the OS keyring on Linux and Android Keystore on Android.',
    },
    {
      title: 'Lock screen controls',
      description: 'Full Android MediaSession integration with persistent notification controls.',
    },
    {
      title: 'Lyrics & artist bios',
      description: 'Synced and unsynced lyrics, plus artist biographies.',
    },
    {
      title: '18 color themes, plus your own',
      description: 'Pick a look that fits you, or drop in a custom theme of your own.',
    },
    {
      title: 'Per-device volume',
      description: 'Independent volume control for each connected audio device.',
    },
    {
      title: 'Cover art caching',
      description: 'Album art is cached locally so browsing your library stays fast.',
    },
    {
      title: 'Full OpenSubsonic API',
      description: 'Scrobbling, search, and playlist support across the OpenSubsonic API.',
    },
  ]
</script>

<section class="features">
  <div class="container">
    <h2 class="section-title">What Firmium can do</h2>
    <div class="grid">
      {#each features as feature (feature.title)}
        <div class="card">
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .features {
    padding: 60px 0;
    border-bottom: 1px solid var(--border);
  }

  .grid {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  }

  .card {
    padding: 20px;
  }

  .card h3 {
    margin: 0 0 8px;
    font-size: 16px;
    color: var(--text);
  }

  .card p {
    margin: 0;
    color: var(--muted);
    font-size: 14px;
  }
</style>
