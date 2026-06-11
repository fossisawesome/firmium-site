<script lang="ts">
  import homepage from '../assets/screenshots/homepage.png'
  import artist from '../assets/screenshots/artist.png'
  import search from '../assets/screenshots/search.png'
  import settings from '../assets/screenshots/settings.png'

  const screenshots = [
    { src: homepage, alt: 'Firmium home view' },
    { src: artist, alt: 'Firmium artist view' },
    { src: search, alt: 'Firmium search view' },
    { src: settings, alt: 'Firmium settings view' },
  ]
</script>

<section class="screenshots">
  <div class="container">
    <h2 class="section-title">See it in action</h2>
    <div class="grid">
      {#each screenshots as shot (shot.alt)}
        <img src={shot.src} alt={shot.alt} loading="lazy" />
      {/each}
    </div>
  </div>
</section>

<style>
  .screenshots {
    padding: 60px 0;
    border-bottom: 1px solid var(--border);
  }

  .grid {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }

  .grid img {
    width: 100%;
    border-radius: 8px;
    border: 1px solid var(--border);
  }
</style>
