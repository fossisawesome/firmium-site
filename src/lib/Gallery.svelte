<script lang="ts">
  import { revealOnScroll } from './revealOnScroll'
  import WindowChrome from './WindowChrome.svelte'
  import homepage from '../assets/screenshots/homepage.png'
  import artist from '../assets/screenshots/artist.png'
  import search from '../assets/screenshots/search.png'

  const items = [
    { label: 'Home', img: homepage, title: 'Home', desc: 'Recently played, recently played artists, and random picks by genre.' },
    { label: 'Artist', img: artist, title: 'Artist pages', desc: "Discography, biography, and a one-tap play of an artist's top tracks." },
    { label: 'Search', img: search, title: 'Search', desc: 'Fast full-library search across songs, albums, and artists.' },
  ]
</script>

<section class="gallery">
  <div class="container">
    <div class="header reveal" use:revealOnScroll>
      <div class="eyebrow">GALLERY</div>
      <h2>A closer look</h2>
    </div>
    <div class="grid reveal" use:revealOnScroll>
      {#each items as item}
        <div class="card">
          <WindowChrome label={item.label} size="small">
            <img src={item.img} alt={item.title} class="shot" />
          </WindowChrome>
          <h3>{item.title}</h3>
          <p>{item.desc}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .gallery {
    max-width: 1160px;
    margin: 0 auto;
    padding: 40px 48px;
  }

  .header {
    text-align: center;
    margin-bottom: 48px;
  }

  .reveal {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.6s, transform 0.6s;
  }

  .reveal:global(.show) {
    opacity: 1;
    transform: translateY(0);
  }

  .eyebrow {
    color: var(--accent);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    margin-bottom: 8px;
  }

  h2 {
    font-size: 38px;
    margin: 0;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }

  .card {
    transition: transform 0.2s;
  }

  .card:hover {
    transform: translateY(-4px);
  }

  .card :global(.window) {
    border-color: var(--border);
    transition: border-color 0.2s;
  }

  .card:hover :global(.window) {
    border-color: color-mix(in srgb, var(--accent) 40%, transparent);
  }

  .shot {
    width: 100%;
    height: 260px;
    object-fit: cover;
    object-position: top;
    display: block;
    transition: transform 0.3s;
  }

  .card:hover .shot {
    transform: scale(1.05);
  }

  .card h3 {
    font-size: 16px;
    margin: 16px 0 6px;
  }

  .card p {
    font-size: 13.5px;
    color: var(--muted);
    margin: 0;
  }

  @media (max-width: 900px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
</style>
