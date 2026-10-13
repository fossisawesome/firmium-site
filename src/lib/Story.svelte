<script lang="ts">
  import { onMount, tick } from 'svelte'
  import AdStage from './AdStage.svelte'
  import home from '../assets/screenshots/android-home.webp'
  import library from '../assets/screenshots/android-library.webp'
  import artist from '../assets/screenshots/android-artist.webp'
  import player from '../assets/screenshots/android-player.webp'
  import themesImg from '../assets/screenshots/android-themes.webp'

  const DURATION = 27.6

  const phones = [
    { img: home, label: 'Home', desc: 'Recently played, your artists and random picks.' },
    { img: library, label: 'Library', desc: 'Filter by genre or decade, sorted your way.' },
    { img: artist, label: 'Artists', desc: 'Play all, shuffle, or start a radio.' },
    { img: player, label: 'Now playing', desc: 'Format, bitrate and the queue at a glance.' },
    { img: themesImg, label: 'Appearance', desc: 'Pick a color theme and it applies live.' },
  ]

  let root: HTMLElement
  let track: HTMLElement
  let frame: HTMLDivElement
  let ad = $state<ReturnType<typeof AdStage> | null>(null)
  let variant = $state<'landscape' | 'portrait'>(window.matchMedia('(max-aspect-ratio: 1/1)').matches ? 'portrait' : 'landscape')
  let scale = $state(0.5)
  let tx = $state(0)
  let ty = $state(0)

  onMount(() => {
    const cl = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x))
    const eo = (x: number) => 1 - Math.pow(1 - cl(x), 3)

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const filmLayer = root.querySelector('.layer-film') as HTMLElement
    const phoneLayer = root.querySelector('.layer-phones') as HTMLElement
    const hint = root.querySelector('.hint') as HTMLElement
    const wraps = [...root.querySelectorAll('.px-wrap')] as HTMLElement[]
    const nameEl = root.querySelector('.cf-name') as HTMLElement
    const descEl = root.querySelector('.cf-desc') as HTMLElement
    const dotEls = [...root.querySelectorAll('.cf-dot')] as HTMLElement[]
    const capEl = root.querySelector('.cf-cap') as HTMLElement

    const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)

    // scroll progress 0..1 over the pinned track
    const FILM_END = 0.66 // ad timeline scrubs 0..FILM_END, outro holds until HOLD_END
    const HOLD_END = 0.72
    const FADE_END = 0.77
    const ENTER = 0.73
    const CF_START = 0.78 // Cover Flow starts moving
    const CF_END = 0.95

    // Cover Flow: focus f is a float index; neighbours angle away and recede
    let shown = -1
    const setFocus = (f: number, enter: number) => {
      const wpx = wraps[0].offsetWidth
      wraps.forEach((w, i) => {
        const d = i - f
        const ad = Math.abs(d)
        const a = cl(d, -1, 1)
        const x = Math.sign(d) * (Math.min(ad, 1) * 0.9 + Math.max(ad - 1, 0) * 0.38) * wpx
        const z = -Math.min(ad, 1) * 140 - Math.max(ad - 1, 0) * 40
        w.style.transform = `translateX(${x}px) translateY(${(1 - enter) * 110}px) translateZ(${z}px) rotateY(${-a * 58}deg) scale(${1 - Math.min(ad, 1) * 0.1})`
        w.style.opacity = String(enter * (1 - Math.min(ad, 3) * 0.2))
        w.style.zIndex = String(10 - Math.round(ad))
      })
      const idx = Math.round(f)
      dotEls.forEach((d, i) => d.classList.toggle('on', i === idx))
      capEl.style.opacity = String(enter)
      if (idx !== shown) {
        shown = idx
        nameEl.textContent = phones[idx].label
        descEl.textContent = phones[idx].desc
        capEl.classList.remove('swap')
        void capEl.offsetWidth
        capEl.classList.add('swap')
      }
    }

    const applyPhones = (p: number) => {
      const enter = ease(cl((p - ENTER) / 0.05))
      setFocus(cl((p - CF_START) / (CF_END - CF_START)) * (wraps.length - 1), enter)
    }

    const apply = (p: number) => {
      ad?.render(0.3 + cl(p / FILM_END) * (DURATION - 0.3))
      const out = cl((p - HOLD_END) / (FADE_END - HOLD_END))
      filmLayer.style.opacity = String(1 - out)
      filmLayer.style.transform = `translateY(${-out * 30}px) scale(${1 - out * 0.06})`
      filmLayer.style.visibility = out >= 1 ? 'hidden' : 'visible'
      const pin = cl((p - ENTER) / 0.03)
      phoneLayer.style.opacity = String(pin)
      phoneLayer.style.visibility = pin <= 0 ? 'hidden' : 'visible'
      hint.style.opacity = String(1 - cl(p / 0.03))
      applyPhones(p)
    }

    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        const total = track.offsetHeight - window.innerHeight
        apply(cl(-track.getBoundingClientRect().top / total))
      })
    }

    const fit = () => {
      const w = frame.clientWidth
      const h = frame.clientHeight
      const sw = variant === 'portrait' ? 1080 : 1920
      const sh = variant === 'portrait' ? 1920 : 1080
      scale = Math.min(w / sw, h / sh)
      tx = (w - sw * scale) / 2
      ty = (h - sh * scale) / 2
    }
    const ro = new ResizeObserver(fit)
    ro.observe(frame)
    fit()

    // portrait screens get the 9:16 cut
    const mq = window.matchMedia('(max-aspect-ratio: 1/1)')
    const onOrientation = async () => {
      variant = mq.matches ? 'portrait' : 'landscape'
      await tick()
      fit()
      if (reduced) ad?.render(5.2)
      else onScroll()
    }
    mq.addEventListener('change', onOrientation)

    // phone width from the room the Cover Flow row has (body is 2.168 x its width tall)
    const cfEl = root.querySelector('.cf') as HTMLElement
    const fitPhones = () => {
      const r = cfEl.getBoundingClientRect()
      const byWidth = r.width * (r.width < 700 ? 0.4 : 0.26)
      const byHeight = reduced ? Infinity : (r.height * 0.9) / 2.168
      cfEl.style.setProperty('--w', Math.round(Math.max(116, Math.min(byWidth, byHeight, 340))) + 'px')
      if (reduced) setFocus(2, 1)
      else onScroll()
    }
    const ro2 = new ResizeObserver(fitPhones)
    ro2.observe(cfEl)
    fitPhones()

    document.fonts.ready.then(() => {
      if (reduced) {
        ad?.render(5.2) // still of the servers scene
        setFocus(2, 1)
      } else {
        onScroll()
      }
    })

    if (!reduced) {
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onScroll)
    }

    return () => {
      ro.disconnect()
      mq.removeEventListener('change', onOrientation)
      ro2.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  })
</script>

<section class="story" bind:this={root}>
  <div class="track" bind:this={track}>
    <div class="sticky">
      <div class="layer layer-film">
        <div class="frame" bind:this={frame} role="img" aria-label="A 28 second animated tour of Firmium: servers, library, radio, lossless playback, themes and platforms.">
          {#key variant}
            <AdStage bind:this={ad} {variant} {scale} {tx} {ty} />
          {/key}
        </div>
        <div class="hint" aria-hidden="true">Scroll to play</div>
      </div>

      <div class="layer layer-phones">
        <div class="head">
          <div class="eyebrow">ANDROID</div>
          <h2>Now in your pocket</h2>
        </div>
        <div class="cf">
          {#each phones as p}
            <figure class="px-wrap">
              <div class="px">
                <div class="face front">
                  <div class="screen"><img src={p.img} alt="{p.label} screen on Android" loading="lazy" /></div>
                </div>
              </div>
            </figure>
          {/each}
        </div>
        <div class="cf-cap" aria-live="polite">
          <div class="cf-name"></div>
          <div class="cf-desc"></div>
          <div class="cf-dots" aria-hidden="true">
            {#each phones as _}<i class="cf-dot"></i>{/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style lang="scss">
  .track {
    height: 650vh;
  }

  .sticky {
    position: sticky;
    top: 0;
    height: 100vh;
    height: 100svh;
    overflow: hidden;
  }

  .layer {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 88px 20px 24px;
  }

  .layer-phones {
    opacity: 0;
    visibility: hidden;
    padding-bottom: 80px; /* clear the fixed mini player */
  }

  .head {
    text-align: center;
    margin-bottom: 20px;
  }

  h2 {
    font-size: clamp(26px, 4.4vw, 48px);
    line-height: 1.05;
    letter-spacing: -0.04em;
    margin: 0;
  }

  .hint {
    position: absolute;
    bottom: 28px;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 5;
    font-size: 12px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted);
  }

  /* the film is full screen: a 1920x1080 stage, scaled to fit, on the site's own dotted ground */
  .layer-film {
    padding: 0;
    background-color: #0f0f0f;
    background-image: radial-gradient(rgba(255, 255, 255, 0.05) 1.5px, transparent 1.6px);
    background-size: 44px 44px;
  }

  .frame {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }

  /* Cover Flow: phones sit in one row, the focused one faces front */
  .cf {
    --w: 160px; /* set from the available space in script */
    position: relative;
    flex: 1;
    min-height: 0;
    width: 100%;
    perspective: 1600px;
  }

  .px-wrap {
    position: absolute;
    left: 50%;
    top: 50%;
    width: var(--w);
    height: calc(var(--w) * 2.168);
    margin: calc(var(--w) * -1.084) 0 0 calc(var(--w) * -0.5);
    opacity: 0;
    will-change: transform, opacity;
    -webkit-box-reflect: below 6px linear-gradient(transparent 72%, rgba(255, 255, 255, 0.14));
  }

  .px {
    width: 100%;
    height: 100%;
  }

  .face {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: calc(var(--w) * 0.14);
    padding: calc(var(--w) * 0.024);
    background: #16181b;
    box-shadow: inset 0 0 0 calc(var(--w) * 0.008) #3b3e45, 0 30px 60px rgba(0, 0, 0, 0.5);
  }

  .face::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(115deg, rgba(255, 255, 255, 0.1), transparent 38%);
    pointer-events: none;
    z-index: 2;
  }

  .face::after {
    content: '';
    position: absolute;
    top: 22%;
    right: -2px;
    width: 3px;
    height: 9%;
    border-radius: 2px;
    background: #2b2e33;
  }

  .screen {
    width: 100%;
    height: 100%;
    border-radius: calc(var(--w) * 0.116);
    overflow: hidden;
    background: #000;
  }

  .screen img {
    width: 100%;
    height: 100%;
    object-fit: fill; /* screen box is the screenshot's own 898:2000 ratio */
    display: block;
  }

  .cf-cap {
    position: relative;
    z-index: 20; /* above the phones' reflections */
    text-align: center;
    padding-top: 8px;
    opacity: 0;
  }

  .cf-name {
    font-size: clamp(20px, 3vw, 28px);
    font-weight: 700;
    letter-spacing: -0.03em;
  }

  .cf-desc {
    margin-top: 6px;
    font-size: 14px;
    color: var(--muted);
  }

  .cf-cap:global(.swap) .cf-name,
  .cf-cap:global(.swap) .cf-desc {
    animation: capIn 0.35s var(--ease-out);
  }

  @keyframes capIn {
    from { opacity: 0; transform: translateY(6px); }
  }

  .cf-dots {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 14px;
  }

  .cf-dot {
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--border);
    transition: background 0.2s, transform 0.2s var(--ease-out);
  }

  .cf-dot:global(.on) {
    background: var(--accent);
    transform: scale(1.4);
  }

  @media (max-width: 700px) {
    .layer {
      padding: 80px 16px 16px;
    }

    .layer-phones {
      padding-bottom: 80px;
    }

    .layer-film {
      padding: 0;
    }


  }

  @media (prefers-reduced-motion: reduce) {
    .track {
      height: auto;
    }

    .sticky {
      position: static;
      height: auto;
      overflow: visible;
    }

    .layer {
      position: static;
      padding: 64px 20px 24px;
    }

    .layer-phones {
      opacity: 1;
      visibility: visible;
    }

    .layer-film {
      padding: 0;
    }

    .frame {
      position: relative;
      inset: auto;
      width: 100%;
      aspect-ratio: 16 / 9;
    }

    .cf {
      flex: none;
      height: calc(var(--w) * 2.4);
    }

    .hint {
      display: none;
    }
  }
</style>
