<script lang="ts">
  import { revealOnScroll } from './revealOnScroll'
  import homepage from '../assets/screenshots/homepage.png'
  import artist from '../assets/screenshots/artist.png'
  import search from '../assets/screenshots/search.png'

  const items = [
    { img: homepage, title: 'Home', desc: 'Recently played, recently played artists, and random picks by genre.' },
    { img: artist, title: 'Artist pages', desc: "Discography, biography, and a one-tap play of an artist's top tracks." },
    { img: search, title: 'Search', desc: 'Fast full-library search across songs, albums, and artists.' },
  ]
</script>

<section class="gallery">
  <div class="container">
    <div class="header reveal" {@attach revealOnScroll()}>
      <div class="eyebrow">GALLERY</div>
      <h2>What it looks like</h2>
    </div>
    <div class="grid reveal" {@attach revealOnScroll()}>
      {#each items as item}
        <div class="card">
          <div class="frame">
            <img src={item.img} alt={item.title} class="shot" />
          </div>
          <h3>{item.title}</h3>
          <p>{item.desc}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<style lang="scss">
  .gallery {
    max-width: 1160px;
    margin: 0 auto;
    padding: 96px 48px 48px;
  }

  .header {
    text-align: center;
    margin-bottom: 64px;
  }

  h2 {
    font-size: clamp(32px, 5.6vw, 60px);
    line-height: 1.05;
    letter-spacing: -0.04em;
    margin: 0;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }

  .card {
    transition: transform 0.3s var(--ease-out);
  }

  @media (hover: hover) {
    .card:hover {
      transform: translateY(-4px);
    }
  }

  .frame {
    border: 1px solid var(--border);
    border-radius: 11px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
    transition: border-color 0.2s;
  }

  .card:hover .frame {
    border-color: color-mix(in srgb, var(--accent) 40%, transparent);
  }

  .shot {
    width: 100%;
    aspect-ratio: 842 / 517;
    object-fit: cover;
    display: block;
    transition: transform 0.5s var(--ease-out);
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
