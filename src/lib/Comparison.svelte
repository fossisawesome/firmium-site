<script lang="ts">
  import { revealOnScroll } from './revealOnScroll'

  const rows: [string, string][] = [
    ['Own your files, play local folders', 'No'],
    ['No subscription', '$10–15/mo'],
    ['Open source (GPL-3.0)', 'No'],
    ['No account required', 'No'],
    ['Works fully offline', 'Limited'],
  ]
</script>

<section class="comparison">
  <div class="container">
    <div class="header reveal" {@attach revealOnScroll()}>
      <div class="eyebrow">WHY FIRMIUM</div>
      <h2>Not another streaming app</h2>
    </div>
    <table class="reveal" {@attach revealOnScroll()}>
      <thead>
        <tr>
          <th></th>
          <th class="accent firmium">Firmium</th>
          <th>Paid streaming</th>
        </tr>
      </thead>
      <tbody>
        {#each rows as [label, other]}
          <tr>
            <td>{label}</td>
            <td class="accent firmium">Yes</td>
            <td class="muted">{other}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</section>

<style lang="scss">
  .comparison {
    max-width: 1160px;
    margin: 0 auto;
    padding: 96px 48px;
  }

  .header {
    text-align: center;
    margin-bottom: 56px;
  }

  h2 {
    font-size: clamp(32px, 5.6vw, 60px);
    line-height: 1.05;
    letter-spacing: -0.04em;
    margin: 0;
  }

  table {
    width: 100%;
    max-width: 820px;
    margin: 0 auto;
    display: table;
    table-layout: fixed;
    border-collapse: collapse;
  }

  th, td {
    padding: 18px 16px;
    text-align: left;
    border-bottom: 1px solid var(--border);
    font-size: 15px;
    overflow-wrap: break-word;
  }

  th {
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--muted);
  }

  th:first-child, td:first-child {
    width: 46%;
  }

  .firmium {
    background: var(--surface);
  }

  td.firmium {
    font-weight: 700;
  }

  .accent {
    color: var(--accent);
  }

  .muted {
    color: var(--muted);
  }

  @media (max-width: 700px) {
    .comparison {
      padding: 40px 20px;
    }

    th, td {
      padding: 12px 8px;
      font-size: 13px;
    }

    th {
      font-size: 10px;
      letter-spacing: 0.02em;
      overflow-wrap: normal;
    }

    th:first-child, td:first-child {
      width: 40%;
    }
  }
</style>
