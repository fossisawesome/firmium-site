<script lang="ts">
  import { revealOnScroll } from './revealOnScroll'

  const rows: [string, string][] = [
    ['Own your files', '✗'],
    ['Local file support', '✗'],
    ['No subscription', '$10–15/mo'],
    ['Open source GPL-3.0', '✗'],
    ['No account required', '✗'],
    ['Works fully offline', 'Limited'],
  ]
</script>

<section class="comparison">
  <div class="container">
    <div class="header reveal" use:revealOnScroll>
      <div class="eyebrow">WHY FIRMIUM</div>
      <h2>Not another streaming app</h2>
    </div>
    <table class="reveal" use:revealOnScroll>
      <thead>
        <tr>
          <th></th>
          <th class="accent">Firmium</th>
          <th>Typical streaming app</th>
        </tr>
      </thead>
      <tbody>
        {#each rows as [label, other]}
          <tr>
            <td>{label}</td>
            <td class="accent">✓</td>
            <td class="muted">{other}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</section>

<style>
  .comparison {
    max-width: 760px;
    margin: 0 auto;
    padding: 40px 48px;
  }

  .header {
    text-align: center;
    margin-bottom: 32px;
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

  table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid var(--border);
    border-radius: 14px;
    overflow: hidden;
  }

  th, td {
    padding: 14px 20px;
    text-align: left;
    border-bottom: 1px solid var(--border);
    font-size: 14px;
  }

  th:nth-child(2), td:nth-child(2),
  th:nth-child(3), td:nth-child(3) {
    text-align: center;
  }

  tr:last-child td {
    border-bottom: none;
  }

  .accent {
    color: var(--accent);
  }

  .muted {
    color: var(--muted);
  }
</style>
