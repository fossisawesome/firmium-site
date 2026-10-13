<script lang="ts">
  const steps = [
    { n: '01', title: 'Point it at your library', desc: 'Local folder or Navidrome/OpenSubsonic server.' },
    { n: '02', title: 'It stays in sync', desc: 'Queue, favorites, and position follow you.' },
    { n: '03', title: 'Listen anywhere', desc: 'Desktop, Android, Wear OS, Auto, TV, or terminal.' },
  ]
</script>

<section class="how">
  <div class="container steps">
    {#each steps as step}
      <div class="step">
        <div class="num">{step.n}</div>
        <h3>{step.title}</h3>
        <p>{step.desc}</p>
      </div>
    {/each}
  </div>
</section>

<style lang="scss">
  .how {
    max-width: 1000px;
    margin: 0 auto;
    padding: 24px 48px 56px;
    text-align: center;
  }

  .steps {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
    padding: 0;
  }

  .num {
    font-size: 40px;
    font-weight: 700;
    letter-spacing: -0.04em;
    color: var(--accent);
    margin-bottom: 8px;
  }

  h3 {
    font-size: 20px;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin: 0 0 6px;
  }

  p {
    font-size: 14.5px;
    color: var(--muted);
    margin: 0;
  }

  @media (max-width: 700px) {
    .steps {
      grid-template-columns: 1fr;
      gap: 24px;
    }
  }
</style>
