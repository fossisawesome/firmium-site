<script lang="ts">
  import { onMount } from 'svelte'
  import home from '../assets/screenshots/android-home.webp'
  import library from '../assets/screenshots/android-library.webp'
  import artist from '../assets/screenshots/android-artist.webp'
  import player from '../assets/screenshots/android-player.webp'
  import themesImg from '../assets/screenshots/android-themes.webp'

  // One timeline, two layouts: 16:9 for wide screens, 9:16 for portrait ones.
  let { variant, scale, tx, ty }: { variant: 'landscape' | 'portrait'; scale: number; tx: number; ty: number } = $props()

  // the parent re-mounts this component when the variant changes, so it never changes here
  // svelte-ignore state_referenced_locally
  const portrait = variant === 'portrait'
  const W = portrait ? 1080 : 1920

  let stage: HTMLDivElement
  let renderFn: ((t: number) => void) | null = null

  export function render(t: number) {
    renderFn?.(t)
  }

  onMount(() => {
    const el = (id: string) => stage.querySelector('#' + id) as HTMLElement
    const cl = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x))
    const eo = (x: number) => 1 - Math.pow(1 - cl(x), 3)
    const eb = (x: number) => {
      x = cl(x)
      const c1 = 1.70158
      const c3 = c1 + 1
      return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2)
    }
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    const hex = (h: string) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]
    const mix = (a: number[], b: number[], t: number) => a.map((v, k) => Math.round(lerp(v, b[k], t)))

    const rise = (e: HTMLElement, lt: number, start: number, _dur = 0.15, dy = 36) => {
      const p = eo((lt - start) / 0.15)
      e.style.opacity = String(p)
      e.style.transform = `translateY(${(1 - p) * dy}px)`
    }
    const pop = (e: HTMLElement, lt: number, start: number) => {
      const p = eb((lt - start) / 0.15)
      e.style.opacity = String(cl((lt - start) / 0.1))
      e.style.transform = `scale(${0.6 + 0.4 * p})`
    }
    const phone = (e: HTMLElement, lt: number, side: number, dur = 1.1) => {
      const p = eo(lt / dur)
      const bob = Math.sin(lt * 1.5) * 9
      const ry = portrait ? -side * (18 - 10 * p) + Math.sin(lt * 0.9) * 2 : -side * (24 - 14 * p) + Math.sin(lt * 0.9) * 2.5
      e.style.opacity = String(cl(lt / 0.5))
      e.style.transform = `translateY(${(1 - p) * (portrait ? 340 : 300) + bob}px) perspective(1800px) rotateY(${ry}deg) rotateX(${3 + Math.sin(lt * 0.7) * 1}deg)`
    }

    // logo mark, built from bars so it can animate in
    const LOGO = [[28, 15, 13, 133, 6], [45, 15, 13, 133, 6], [63, 15, 10, 34, 5], [77, 15, 10, 30, 5], [91, 15, 10, 26, 5], [105, 15, 10, 22, 5], [63, 80, 10, 28, 5], [77, 80, 10, 24, 5], [91, 80, 10, 20, 5]]
    const logo = (id: string, host: HTMLElement) => {
      host.innerHTML =
        `<svg viewBox="0 0 140 155" width="100%" height="100%" aria-hidden="true"><defs><linearGradient id="${id}" x1="70" y1="15" x2="70" y2="148" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#e8c97e"/><stop offset="40%" stop-color="#e8c97e"/><stop offset="100%" stop-color="#863bff"/></linearGradient></defs>` +
        LOGO.map((r) => `<rect x="${r[0]}" y="${r[1]}" width="${r[2]}" height="${r[3]}" rx="${r[4]}" fill="url(#${id})"/>`).join('') +
        `</svg>`
      return [...host.querySelectorAll('rect')] as SVGElement[]
    }
    // size the logo to the height of the letter "i" so it reads as the F of Firmium
    const fitGlyph = (host: HTMLElement) => {
      const par = host.parentElement as HTMLElement
      const cs = getComputedStyle(par)
      const fs = parseFloat(cs.fontSize)
      const ctx = document.createElement('canvas').getContext('2d') as CanvasRenderingContext2D
      ctx.font = `${cs.fontWeight} ${fs}px ${cs.fontFamily}`
      const A = ctx.measureText('i').actualBoundingBoxAscent
      const H = (A * 155) / 133
      const W = (H * 140) / 155
      const ls = parseFloat(cs.letterSpacing) || 0
      const adv = 0.6 * fs + ls + 0.02 * fs
      const ml = -0.1625 * W
      const mr = adv - W - ml
      Object.assign(host.style, { height: H + 'px', width: W + 'px', margin: `0 ${mr}px ${-(7 / 155) * H}px ${ml}px` })
    }
    const logoA = logo('lgA', el('logoA'))
    const logoH = logo('lgH', el('logoH'))
    const logoIn = (rects: SVGElement[], lt: number, start: number) =>
      rects.forEach((r, i) => {
        const p = eb((lt - start - i * 0.07) / 0.15)
        r.style.opacity = String(cl((lt - start - i * 0.07) / 0.1))
        r.style.transform = `scale(${0.2 + 0.8 * p})`
      })

    // theme names, accent, row y within the app's appearance screen
    const themes: [string, string, number][] = [['Ayu Dark', '#ffb454', 1447], ['Dracula', '#bd93f9', 679], ['Tokyo Night', '#9ece6a', 775], ['Gruvbox', '#b8bb26', 1159], ['Nord', '#a3be8c', 1255], ["Synthwave '84", '#ff7edb', 1351], ['Firmium', '#e8c97e', 583]]
    const dots = el('fDots')
    themes.forEach((t) => {
      const d = document.createElement('i')
      d.style.cssText = `display:block;width:34px;height:34px;border-radius:50%;background:${t[1]};opacity:.3`
      dots.appendChild(d)
    })
    const rowTop = (y: number) => (portrait ? 12 + y * (460 / 1008) - 21 : 10 + y * 0.39683 - 18)

    const plats = ['Linux', 'Windows', 'macOS', 'Android', 'Android Auto', 'Wear OS', 'Android TV']
    const gP = el('gPills')
    const pills = plats.map((n) => {
      const d = document.createElement('div')
      d.className = 'pill'
      d.textContent = n
      gP.appendChild(d)
      return d
    })
    const layoutPills = () => {
      const rows = portrait ? [[0, 1, 2], [3, 4], [5, 6]] : [[0, 1, 2], [3, 4, 5, 6]]
      const gap = portrait ? 30 : 36
      const top0 = portrait ? 660 : 450
      const step = portrait ? 146 : 150
      rows.forEach((r, ri) => {
        const widths = r.map((i) => pills[i].offsetWidth)
        const total = widths.reduce((a, b) => a + b, 0) + gap * (r.length - 1)
        let x = (W - total) / 2
        r.forEach((i, k) => {
          pills[i].style.left = x + 'px'
          pills[i].style.top = top0 + ri * step + 'px'
          x += widths[k] + gap
        })
      })
    }

    const scenes = [
      { el: el('sA'), s: 0, e: 3.6 },
      { el: el('sB'), s: 3.2, e: 7.9 },
      { el: el('sC'), s: 7.5, e: 11.1 },
      { el: el('sD'), s: 10.7, e: 14.3 },
      { el: el('sE'), s: 13.9, e: 17.7 },
      { el: el('sF'), s: 17.3, e: 21.5 },
      { el: el('sG'), s: 21.1, e: 24.4 },
      { el: el('sH'), s: 24.0, e: 27.6, last: true },
    ]
    const FAD = 0.15
    const ORANGE = hex('#e8c97e')
    const STEP = 0.5
    const T0 = 0.8
    const themeState = (lt: number) => {
      const tt = lt - T0
      if (tt < 0) return { col: ORANGE, prev: 0, cur: 0, fr: 1 }
      const k = Math.floor(tt / STEP)
      const fr = eo((tt - k * STEP) / 0.15)
      const cur = Math.min(themes.length - 1, k + 1)
      const prev = Math.min(themes.length - 1, k)
      return { col: mix(hex(themes[prev][1]), hex(themes[cur][1]), fr), prev, cur, fr }
    }

    const fnsLand: ((lt: number) => void)[] = [
      (lt) => {
        const n = Math.floor(cl((lt - 0.9) / 0.7) * 6)
        const w = 'irmium'
        const vis = lt < 0.9 ? 0 : 1
        el('wmtxt').innerHTML = w.slice(0, n) + `<span class="acc" style="display:inline-block;width:0;overflow:visible;opacity:${vis && (Math.floor(lt * 2.5) % 2 == 0 || lt < 1.8) ? 1 : 0}">▌</span><span style="visibility:hidden">${w.slice(n)}</span>`
        logoIn(logoA, lt, 0.1)
        rise(el('tag'), lt, 2.0, 0.7)
      },
      (lt) => {
        rise(el('bH'), lt, 0.15); rise(el('bS'), lt, 0.7)
        for (let i = 0; i < 4; i++) {
          const p = eb((lt - 1.3 - i * 0.22) / 0.15)
          const c = el('bc' + i)
          c.style.opacity = String(cl((lt - 1.3 - i * 0.22) / 0.1))
          c.style.transform = `scale(${0.6 + 0.4 * p})`
          c.style.transformOrigin = portrait ? 'center' : 'left center'
        }
        phone(el('pB'), lt, 1)
      },
      (lt) => { phone(el('pC'), lt, -1); rise(el('cH'), lt, 0.4); rise(el('cS'), lt, 0.9); rise(el('cc0'), lt, 1.4); rise(el('cc1'), lt, 1.65) },
      (lt) => { rise(el('dH'), lt, 0.15); rise(el('dS'), lt, 0.7); rise(el('dc0'), lt, 1.3); rise(el('dc1'), lt, 1.5); rise(el('dc2'), lt, 1.7); phone(el('pD'), lt, 1) },
      (lt) => { phone(el('pE'), lt, -1); rise(el('eH'), lt, 0.4); rise(el('eS'), lt, 0.9); rise(el('ec0'), lt, 1.4); rise(el('ec1'), lt, 1.6); rise(el('ec2'), lt, 1.8) },
      (lt) => {
        rise(el('fH'), lt, 0.15); rise(el('fS'), lt, 0.65); phone(el('pF'), lt, 1)
        const st = themeState(lt)
        const shown = st.fr > 0.5 ? st.cur : st.prev
        el('fName').textContent = themes[shown][0]
        rise(el('fName'), lt, T0, 0.15, 20)
        ;[...dots.children].forEach((d, i) => {
          ;(d as HTMLElement).style.opacity = i == shown ? '1' : '.3'
          ;(d as HTMLElement).style.transform = i == shown ? 'scale(1.35)' : 'scale(1)'
        })
        const y = lerp(rowTop(themes[st.prev][2]), rowTop(themes[st.cur][2]), st.fr)
        el('hlRow').style.top = y + 'px'
        el('hlRow').style.opacity = String(cl((lt - T0) / 0.1))
      },
      (lt) => {
        rise(el('gH'), lt, 0.1)
        pills.forEach((p, i) => {
          const q = eb((lt - 0.7 - i * 0.18) / 0.55)
          p.style.opacity = String(cl((lt - 0.7 - i * 0.18) / 0.2))
          p.style.transform = `scale(${0.4 + 0.6 * q})`
          if (i >= 3) p.style.borderColor = getComputedStyle(stage).getPropertyValue('--acc')
        })
      },
      (lt) => { logoIn(logoH, lt, 0.1); rise(el('hWt'), lt, 0.5, 0.8, 40); rise(el('hT'), lt, 1.3); rise(el('hU'), lt, 1.9); rise(el('hG'), lt, 2.3) },
    ]

    const fnsPort: ((lt: number) => void)[] = [
      (lt) => {
        const n = Math.floor(cl((lt - 0.9) / 0.7) * 6)
        const w = 'irmium'
        const vis = lt < 0.9 ? 0 : 1
        el('wmtxt').innerHTML = w.slice(0, n) + `<span class="acc" style="display:inline-block;width:0;overflow:visible;opacity:${vis && (Math.floor(lt * 2.5) % 2 == 0 || lt < 1.8) ? 1 : 0}">▌</span><span style="visibility:hidden">${w.slice(n)}</span>`
        logoIn(logoA, lt, 0.1)
        el('wm').style.transform = `translateX(${373 * (1 - eo((lt - 0.9) / 0.8))}px)`
        rise(el('tag'), lt, 2.0, 0.7)
      },
      (lt) => {
        rise(el('bH'), lt, 0.15); rise(el('bS'), lt, 0.7)
        for (let i = 0; i < 4; i++) pop(el('bc' + i), lt, 1.3 + i * 0.22)
        phone(el('pB'), lt, 1)
      },
      (lt) => { phone(el('pC'), lt, -1); rise(el('cH'), lt, 0.3); rise(el('cS'), lt, 0.8); pop(el('cc0'), lt, 1.3); pop(el('cc1'), lt, 1.55) },
      (lt) => { rise(el('dH'), lt, 0.15); rise(el('dS'), lt, 0.7); pop(el('dc0'), lt, 1.3); pop(el('dc1'), lt, 1.5); pop(el('dc2'), lt, 1.7); phone(el('pD'), lt, 1) },
      (lt) => { phone(el('pE'), lt, -1); rise(el('eH'), lt, 0.3); rise(el('eS'), lt, 0.8); pop(el('ec0'), lt, 1.3); pop(el('ec1'), lt, 1.5); pop(el('ec2'), lt, 1.7) },
      (lt) => {
        rise(el('fH'), lt, 0.15); rise(el('fS'), lt, 0.65); phone(el('pF'), lt, 1)
        const st = themeState(lt)
        const shown = st.fr > 0.5 ? st.cur : st.prev
        el('fName').textContent = themes[shown][0]
        rise(el('fName'), lt, T0, 0.15, 20); rise(el('fDots'), lt, 0.5, 0.15, 20)
        ;[...dots.children].forEach((d, i) => {
          ;(d as HTMLElement).style.opacity = i == shown ? '1' : '.3'
          ;(d as HTMLElement).style.transform = i == shown ? 'scale(1.35)' : 'scale(1)'
        })
        const y = lerp(rowTop(themes[st.prev][2]), rowTop(themes[st.cur][2]), st.fr)
        el('hlRow').style.top = y + 'px'
        el('hlRow').style.opacity = String(cl((lt - T0) / 0.1))
      },
      fnsLand[6],
      fnsLand[7],
    ]
    const fns = portrait ? fnsPort : fnsLand

    let laidOut = false
    const render = (t: number) => {
      if (!laidOut) { layoutPills(); fitGlyph(el('logoA')); fitGlyph(el('logoH')); laidOut = true }
      scenes.forEach((sc, i) => {
        const lt = t - sc.s
        let o = 0
        if (t >= sc.s && t <= sc.e) o = cl(lt / FAD) * (sc.last ? 1 : cl((sc.e - t) / FAD))
        sc.el.style.opacity = String(o)
        sc.el.style.display = o > 0 ? 'block' : 'none'
        if (o > 0) fns[i](lt)
      })
      // accent is the app's orange except while the themes scene cycles
      const F = scenes[5]
      let col = ORANGE
      if (t >= F.s && t <= F.e) {
        col = themeState(t - F.s).col
        if (t > F.e - FAD) col = mix(col, ORANGE, 1 - cl((F.e - t) / FAD))
      }
      stage.style.setProperty('--acc', `rgb(${col[0]},${col[1]},${col[2]})`)
    }

    renderFn = render
  })
</script>

<div class="ad-stage" class:portrait class:landscape={!portrait} bind:this={stage} style="transform: translate({tx}px, {ty}px) scale({scale})">
  {#if portrait}
    <div class="scene" id="sA">
      <div id="wm" class="abs" style="left:0;right:0;top:780px;text-align:center;font-size:220px;font-weight:700;letter-spacing:-8px;color:#f0f0f0;line-height:1.1;white-space:nowrap"><span class="fglyph" id="logoA"></span><span id="wmtxt"></span></div>
      <div id="tag" class="abs" style="left:0;right:0;top:1070px;text-align:center;font-size:42px;color:#888">Smooth, fast, simple.<br /><span class="acc">Forever.</span></div>
    </div>

    <div class="scene" id="sB">
      <div class="t">
        <div id="bH" class="h">Bring your<br />own server.</div>
        <div id="bS" class="sub">Works with any <span class="acc">OpenSubsonic</span><br />or <span class="acc">Subsonic</span> server.</div>
        <div class="chips">
          <div class="chip" id="bc0">Navidrome</div><div class="chip" id="bc1">OpenSubsonic</div>
          <div class="chip" id="bc2">Subsonic</div><div class="chip hl" id="bc3">+ Local files</div>
        </div>
      </div>
      <div class="phone" id="pB"><img src={home} alt="" /></div>
    </div>

    <div class="scene" id="sC">
      <div class="t">
        <div id="cH" class="h">Your whole<br />library.</div>
        <div id="cS" class="sub">Browse it. Download it.<br />Play it offline.</div>
        <div class="chips"><div class="chip hl" id="cc0">↓ Offline library</div><div class="chip" id="cc1">Cross-device queue sync</div></div>
      </div>
      <div class="phone" id="pC"><img src={library} alt="" /></div>
    </div>

    <div class="scene" id="sD">
      <div class="t">
        <div id="dH" class="h">Radio from<br />any artist.</div>
        <div id="dS" class="sub">Start a radio from any track,<br />album or artist. Mix by BPM<br />and genre.</div>
        <div class="chips"><div class="chip hl" id="dc0">Smart radio</div><div class="chip" id="dc1">Last.fm</div><div class="chip" id="dc2">ListenBrainz</div></div>
      </div>
      <div class="phone" id="pD"><img src={artist} alt="" /></div>
    </div>

    <div class="scene" id="sE">
      <div class="t">
        <div id="eH" class="h">Lossless.<br />Gapless.</div>
        <div id="eS" class="sub">FLAC, crossfade, ReplayGain,<br />bit-perfect output on desktop.</div>
        <div class="chips"><div class="chip" id="ec0">10-band EQ</div><div class="chip" id="ec1">Synced lyrics</div><div class="chip hl" id="ec2">Crossfade</div></div>
      </div>
      <div class="phone" id="pE"><img src={player} alt="" /></div>
    </div>

    <div class="scene" id="sF">
      <div class="t">
        <div id="fH" class="h">18+ themes.</div>
        <div id="fS" class="sub">Gruvbox, Dracula, Nord,<br />Tokyo Night, Catppuccin…<br />or write your own in TOML.</div>
        <div id="fName" class="acc" style="margin-top:34px;font-size:60px;font-weight:700;letter-spacing:-2px;height:72px"></div>
        <div id="fDots" style="display:flex;gap:18px;margin-top:14px"></div>
      </div>
      <div class="phone" id="pF"><img src={themesImg} alt="" /><div id="hlRow" style="position:absolute;left:36px;width:412px;height:42px;border-radius:9px;border:2px solid var(--acc);background:color-mix(in srgb,var(--acc) 15%,transparent)"></div></div>
    </div>

    <div class="scene" id="sG">
      <div id="gH" class="h abs" style="left:0;right:0;top:280px;text-align:center;font-size:110px">Everywhere<br />you listen.</div>
      <div id="gPills"></div>
    </div>

    <div class="scene" id="sH">
      <div id="hW" class="abs" style="left:0;right:0;top:640px;text-align:center;font-size:190px;font-weight:700;letter-spacing:-7px;color:#f0f0f0;line-height:1.1;white-space:nowrap"><span class="fglyph" id="logoH"></span><span id="hWt" style="display:inline-block">irmium</span></div>
      <div id="hT" class="abs" style="left:0;right:0;top:910px;text-align:center;font-size:42px;color:#888">Free. Open source. <span class="acc">GPL-3.0.</span></div>
      <div id="hU" class="abs acc" style="left:0;right:0;top:1040px;text-align:center;font-size:84px;font-weight:700">firmium.app</div>
      <div id="hG" class="abs" style="left:0;right:0;top:1170px;text-align:center;font-size:30px;color:#888">github.com/fossisawesome/firmium</div>
    </div>
  {:else}
      <div class="scene" id="sA">
        <div id="wm" class="abs" style="left:0;right:0;top:350px;text-align:center;font-size:230px;font-weight:700;letter-spacing:-8px;color:#f0f0f0;line-height:1.1;white-space:nowrap"><span class="fglyph" id="logoA"></span><span id="wmtxt"></span></div>
        <div id="tag" class="abs" style="left:0;right:0;top:680px;text-align:center;font-size:48px;color:#888">Smooth, fast, simple. <span class="acc">Forever.</span></div>
      </div>

      <div class="scene" id="sB">
        <div id="bH" class="h" style="left:140px;top:170px">Bring your<br />own server.</div>
        <div id="bS" class="sub" style="left:144px;top:420px">Works with any <span class="acc">OpenSubsonic</span><br />or <span class="acc">Subsonic</span> server.</div>
        <div class="chip" id="bc0" style="left:144px;top:640px">Navidrome</div>
        <div class="chip" id="bc1" style="left:370px;top:640px">OpenSubsonic</div>
        <div class="chip" id="bc2" style="left:144px;top:730px">Subsonic</div>
        <div class="chip hl" id="bc3" style="left:350px;top:730px">+ Local files</div>
        <div class="phone" id="pB" style="left:1180px;top:85px"><img src={home} alt="" /></div>
      </div>

      <div class="scene" id="sC">
        <div class="phone" id="pC" style="left:260px;top:85px"><img src={library} alt="" /></div>
        <div id="cH" class="h" style="left:880px;top:230px">Your whole<br />library.</div>
        <div id="cS" class="sub" style="left:884px;top:480px">Browse it. Download it.<br />Play it offline.</div>
        <div class="chip hl" id="cc0" style="left:884px;top:690px">↓ Offline library</div>
        <div class="chip" id="cc1" style="left:884px;top:780px">Cross-device queue sync</div>
      </div>

      <div class="scene" id="sD">
        <div id="dH" class="h" style="left:140px;top:210px">Radio from<br />any artist.</div>
        <div id="dS" class="sub" style="left:144px;top:460px">Start a radio from any track,<br />album or artist. Mix by BPM<br />and genre.</div>
        <div class="chip hl" id="dc0" style="left:144px;top:730px">Smart radio</div>
        <div class="chip" id="dc1" style="left:400px;top:730px">Last.fm</div>
        <div class="chip" id="dc2" style="left:580px;top:730px">ListenBrainz</div>
        <div class="phone" id="pD" style="left:1180px;top:85px"><img src={artist} alt="" /></div>
      </div>

      <div class="scene" id="sE">
        <div class="phone" id="pE" style="left:260px;top:85px"><img src={player} alt="" /></div>
        <div id="eH" class="h" style="left:880px;top:230px">Lossless.<br />Gapless.</div>
        <div id="eS" class="sub" style="left:884px;top:480px">FLAC, crossfade, ReplayGain,<br />bit-perfect output on desktop.</div>
        <div class="chip" id="ec0" style="left:884px;top:670px">10-band EQ</div>
        <div class="chip" id="ec1" style="left:1130px;top:670px">Synced lyrics</div>
        <div class="chip hl" id="ec2" style="left:1410px;top:670px">Crossfade</div>
      </div>

      <div class="scene" id="sF">
        <div id="fH" class="h" style="left:140px;top:200px">18+ themes.</div>
        <div id="fS" class="sub" style="left:144px;top:330px">Gruvbox, Dracula, Nord,<br />Tokyo Night, Catppuccin…<br />or write your own in TOML.</div>
        <div id="fName" class="abs acc" style="left:144px;top:660px;font-size:64px;font-weight:700;letter-spacing:-2px"></div>
        <div id="fDots" class="abs" style="left:144px;top:780px;display:flex;gap:18px"></div>
        <div class="phone" id="pF" style="left:1180px;top:85px"><img src={themesImg} alt="" /><div id="hlRow" style="position:absolute;left:30px;width:360px;height:37px;border-radius:8px;border:2px solid var(--acc);background:color-mix(in srgb,var(--acc) 15%,transparent)"></div></div>
      </div>

      <div class="scene" id="sG">
        <div id="gH" class="h" style="left:0;right:0;top:130px;text-align:center;font-size:104px">Everywhere you listen.</div>
        <div id="gPills"></div>
      </div>

      <div class="scene" id="sH">
        <div id="hW" class="abs" style="left:0;right:0;top:250px;text-align:center;font-size:200px;font-weight:700;letter-spacing:-7px;color:#f0f0f0;line-height:1.1;white-space:nowrap"><span class="fglyph" id="logoH"></span><span id="hWt" style="display:inline-block">irmium</span></div>
        <div id="hT" class="abs" style="left:0;right:0;top:510px;text-align:center;font-size:46px;color:#888">Free. Open source. <span class="acc">GPL-3.0.</span></div>
        <div id="hU" class="abs acc" style="left:0;right:0;top:650px;text-align:center;font-size:76px;font-weight:700">firmium.app</div>
        <div id="hG" class="abs" style="left:0;right:0;top:770px;text-align:center;font-size:34px;color:#888">github.com/fossisawesome/firmium</div>
      </div>
  {/if}
</div>

<style lang="scss">
  .ad-stage {
    --acc: #e8c97e;
    position: absolute;
    top: 0;
    left: 0;
    width: 1920px;
    height: 1080px;
    transform-origin: 0 0;
    overflow: hidden;
    font-family: 'Courier New', monospace;
    color: #f0f0f0;
    line-height: normal;
  }

  .ad-stage :global(*) {
    box-sizing: border-box;
  }

  .ad-stage :global(.abs) { position: absolute; }
  .ad-stage :global(.scene) { position: absolute; inset: 0; opacity: 0; }
  .ad-stage :global(.acc) { color: var(--acc); }

  .ad-stage.landscape :global(.h) {
    position: absolute;
    font-size: 88px;
    font-weight: 700;
    line-height: 1.08;
    letter-spacing: -3px;
    color: #f0f0f0;
  }

  .ad-stage.landscape :global(.sub) {
    position: absolute;
    font-size: 33px;
    line-height: 1.5;
    color: #888;
  }

  .ad-stage.landscape :global(.chip) {
    position: absolute;
    font-size: 28px;
    padding: 14px 26px;
    border-radius: 999px;
    background: #1a1a1a;
    border: 2px solid rgba(255, 255, 255, 0.08);
    color: #f0f0f0;
    white-space: nowrap;
  }

  .ad-stage :global(.chip.hl) {
    border-color: var(--acc);
    color: var(--acc);
    background: color-mix(in srgb, var(--acc) 15%, transparent);
  }

  .ad-stage :global(.phone) {
    position: absolute;
    width: 420px;
    height: 910px;
    border-radius: 56px;
    padding: 10px;
    background: #1a1a1a;
    box-shadow: 0 40px 90px rgba(0, 0, 0, 0.6), 0 0 0 2px #242424;
    will-change: transform;
  }

  .ad-stage :global(.phone img) {
    width: 400px;
    height: 890px;
    border-radius: 46px;
    display: block;
    max-width: none;
    object-fit: cover;
  }

  .ad-stage :global(.pill) {
    position: absolute;
    font-size: 46px;
    font-weight: 700;
    padding: 20px 40px;
    border-radius: 999px;
    background: #1a1a1a;
    border: 2px solid rgba(255, 255, 255, 0.08);
    color: #f0f0f0;
    white-space: nowrap;
  }

  .ad-stage :global(.fglyph) { display: inline-block; vertical-align: baseline; }
  .ad-stage :global(.fglyph svg) { display: block; }
  .ad-stage :global(.fglyph svg rect) { transform-box: fill-box; transform-origin: center; }


  /* 9:16 layout, straight from the vertical ad */
  .ad-stage.portrait {
    width: 1080px;
    height: 1920px;
  }

  .ad-stage.portrait :global(.t) {
    position: absolute;
    left: 0;
    right: 0;
    top: 175px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .ad-stage.portrait :global(.h) {
    font-size: 88px;
    font-weight: 700;
    line-height: 1.08;
    letter-spacing: -3px;
    color: #f0f0f0;
  }

  .ad-stage.portrait :global(.sub) {
    font-size: 34px;
    line-height: 1.5;
    color: #888;
    margin-top: 24px;
  }

  .ad-stage.portrait :global(.chips) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
    margin-top: 30px;
    max-width: 960px;
  }

  .ad-stage.portrait :global(.chip) {
    font-size: 27px;
    padding: 14px 26px;
    border-radius: 999px;
    background: #1a1a1a;
    border: 2px solid rgba(255, 255, 255, 0.08);
    color: #f0f0f0;
    white-space: nowrap;
  }

  .ad-stage.portrait :global(.chip.hl) {
    border-color: var(--acc);
    color: var(--acc);
    background: color-mix(in srgb, var(--acc) 15%, transparent);
  }

  .ad-stage.portrait :global(.phone) {
    left: 298px;
    top: 690px;
    width: 484px;
    height: 1048px;
    border-radius: 64px;
    padding: 12px;
  }

  .ad-stage.portrait :global(.phone img) {
    width: 460px;
    height: 1024px;
    border-radius: 52px;
  }
</style>
