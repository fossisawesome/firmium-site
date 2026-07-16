<script lang="ts">
  import { revealOnScroll } from './revealOnScroll'

  const features = [
    { glyph: '~', title: 'Gapless & crossfade', desc: 'Next track preloads silently. Configurable 1–12s crossfade with linear or logarithmic curve.' },
    { glyph: '≡', title: '10-band equalizer', desc: 'Graphic and parametric modes, saveable profiles, assigned per output device.' },
    { glyph: '♪', title: 'Synced lyrics', desc: 'LRC line highlighting with word-by-word karaoke fill, tinted to the cover art.' },
    { glyph: '▶', title: 'Radio & smart mixes', desc: 'Start Radio from any track, album, or artist. Build a mix by BPM energy and genre.' },
    { glyph: '◎', title: 'GPU visualizer', desc: 'Bars, Lines, and Scope modes with bloom, trails, and colors pulled from the art.' },
    { glyph: '↻', title: 'Cross-device queue sync', desc: 'Pause on your phone, pick up the exact same queue on desktop or the watch.' },
    { glyph: '⤓', title: 'Local + offline library', desc: 'Point it at a folder on disk, or download tracks from your server; local copies play automatically when present.' },
    { glyph: '▤', title: 'Recap & stats', desc: 'Swipeable cards of top tracks, artists, streaks, and discoveries — exportable as CSV or JSON.' },
  ]
</script>

<section class="features">
  <div class="container">
    <div class="header reveal" use:revealOnScroll>
      <div class="eyebrow">FEATURES</div>
      <h2>Everything you need, nothing you don't</h2>
      <p class="subhead">A full-featured client without the bloat.</p>
    </div>
    <div class="grid stagger reveal" use:revealOnScroll>
      {#each features as f, i}
        <div class="card" style="transition-delay: {0.03 + i * 0.05}s">
          <div class="icon">{f.glyph}</div>
          <h3>{f.title}</h3>
          <p>{f.desc}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .features {
    max-width: 1160px;
    margin: 0 auto;
    padding: 100px 48px 40px;
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
    margin: 0 0 8px;
  }

  .subhead {
    color: var(--muted);
    margin: 0;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    background: var(--border);
    border-radius: 14px;
    overflow: hidden;
  }

  .card {
    background: var(--surface);
    padding: 28px 24px;
    transition: background 0.2s, box-shadow 0.2s;
  }

  .card:hover {
    background: var(--surface2);
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--accent) 40%, transparent);
  }

  .icon {
    width: 38px;
    height: 38px;
    border-radius: 8px;
    background: var(--accent-dim);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    color: var(--accent);
    margin-bottom: 16px;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .card:hover .icon {
    transform: scale(1.15) rotate(-4deg);
    box-shadow: 0 0 16px color-mix(in srgb, var(--accent) 50%, transparent);
  }

  h3 {
    font-size: 16px;
    font-weight: 700;
    margin: 0 0 8px;
  }

  .card p {
    font-size: 13.5px;
    color: var(--muted);
    margin: 0;
  }

  @media (max-width: 900px) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 700px) {
    .features {
      padding: 60px 20px 20px;
    }

    .grid {
      grid-template-columns: 1fr;
    }
  }
</style>
