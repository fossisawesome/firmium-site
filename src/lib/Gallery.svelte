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
    <div class="header reveal" use:revealOnScroll>
      <div class="eyebrow">GALLERY</div>
      <h2>Every screen, considered</h2>
    </div>
    <div class="grid reveal" use:revealOnScroll>
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

    .shot {
      height: auto;
    }
  }
</style>
