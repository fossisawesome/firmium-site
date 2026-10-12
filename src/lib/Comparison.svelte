<script lang="ts">
  import { revealOnScroll } from './revealOnScroll'

  const rows: [string, string][] = [
    ['Own your files, play local folders', '✗'],
    ['No subscription', '$10–15/mo'],
    ['Open source (GPL-3.0)', '✗'],
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
          <th>Paid streaming services</th>
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

  h2 {
    font-size: 38px;
    margin: 0;
  }

  table {
    width: 100%;
    table-layout: fixed;
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
    overflow-wrap: break-word;
  }

  th:first-child, td:first-child {
    width: 42%;
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

  @media (max-width: 700px) {
    .comparison {
      padding: 40px 20px;
    }

    th, td {
      padding: 10px 8px;
      font-size: 12px;
    }
  }
</style>
