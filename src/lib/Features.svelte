<script lang="ts">
  import { revealOnScroll } from './revealOnScroll'

  const features = [
    { title: 'Gapless & crossfade', desc: 'Next track preloads silently. Configurable 1–12s crossfade with linear or logarithmic curve.' },
    { title: '10-band equalizer', desc: 'Graphic and parametric modes, saveable profiles, assigned per output device.' },
    { title: 'Synced lyrics', desc: 'LRC line highlighting with word-by-word karaoke fill, tinted to the cover art.' },
    { title: 'Radio & smart mixes', desc: 'Start Radio from any track, album, or artist. Build a mix by BPM energy and genre.' },
    { title: 'Podcasts', desc: 'Subscribe by RSS feed and play episodes in the same player, resuming where you left off.' },
    { title: 'Cross-device queue sync', desc: 'Pause on your phone, pick up the exact same queue on desktop or the watch.' },
    { title: 'Local + offline library', desc: 'Point it at a folder on disk, or download tracks from your server; local copies play automatically when present.' },
    { title: 'Play history', desc: 'Every finished track is logged on your device, exportable as CSV or JSON.' },
  ]
</script>

<section class="features">
  <div class="container">
    <div class="header reveal" {@attach revealOnScroll()}>
      <div class="eyebrow">FEATURES</div>
      <h2>Gapless. Actually.</h2>
      <p class="subhead">Every feature below runs the same on desktop and Android — sync stays in lockstep.</p>
    </div>
    <ol class="list stagger reveal" {@attach revealOnScroll()}>
      {#each features as f, i}
        <li class="row" style="--i: {i}">
          <span class="num">{String(i + 1).padStart(2, '0')}</span>
          <h3>{f.title}</h3>
          <p>{f.desc}</p>
        </li>
      {/each}
    </ol>
  </div>
</section>

<style lang="scss">
  .features {
    max-width: 1160px;
    margin: 0 auto;
    padding: 112px 48px 48px;
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

  .subhead {
    color: var(--muted);
    max-width: 560px;
    margin: 12px auto 0;
    font-size: 18px;
  }

  .list {
    list-style: none;
    max-width: 920px;
    margin: 0 auto;
    padding: 0;
    border-bottom: 1px solid var(--border);
  }

  .row {
    display: grid;
    grid-template-columns: 56px minmax(0, 1fr) minmax(0, 1.4fr);
    gap: 24px;
    align-items: baseline;
    padding: 28px 16px;
    border-top: 1px solid var(--border);
    transition: background 0.2s, box-shadow 0.2s;
  }

  @media (hover: hover) {
    .row:hover {
      background: var(--surface);
      box-shadow: inset 2px 0 0 var(--accent);
    }
  }

  /* one-shot entrance; keyframes (not transition-delay) so hover stays instant */
  .list:global(.show) .row {
    animation: rowIn 350ms var(--ease-out) backwards;
    animation-delay: calc(min(var(--i), 7) * 40ms);
  }

  @keyframes rowIn {
    from { opacity: 0; transform: translateY(12px); }
  }

  .num {
    font-size: 13px;
    color: var(--accent);
  }

  h3 {
    font-size: 22px;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin: 0;
  }

  .row p {
    font-size: 13.5px;
    color: var(--muted);
    margin: 0;
  }

  @media (max-width: 700px) {
    .features {
      padding: 60px 20px 20px;
    }

    .row {
      grid-template-columns: 40px minmax(0, 1fr);
      row-gap: 6px;
    }

    .row p {
      grid-column: 2;
    }
  }
</style>
