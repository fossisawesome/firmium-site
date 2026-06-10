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
      description: 'Smooth, configurable crossfade between tracks for gapless listening.',
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
      description: 'Synced and unsynced lyrics, plus Wikipedia artist biographies.',
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
      description: 'Scrobbling, search, and playlist support for Navidrome and other OpenSubsonic servers.',
    },
  ]
</script>

<section class="features">
  <div class="container">
    <h2>What Firmium can do</h2>
    <div class="grid">
      {#each features as feature}
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

  h2 {
    text-align: center;
    font-size: 28px;
    margin: 0 0 36px;
    color: var(--accent);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 16px;
  }

  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 8px;
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
