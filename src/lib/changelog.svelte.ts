export interface ChangelogEntry {
  version: string
  tag: string
  bullets: string[]
}

class ChangelogState {
  entries = $state.raw<ChangelogEntry[]>([])
  // Empty until the fetch succeeds; the UI hides anything that depends on it.
  version = $derived(this.entries[0]?.version ?? '')
}

export const changelog = new ChangelogState()

function stripMarkdown(text: string): string {
  return text.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/\*\*/g, '').replace(/`/g, '').trim()
}

export function parseChangelog(markdown: string): ChangelogEntry[] {
  const versionBlocks = markdown.split(/^#{1,2} (v[\d.]+)/m).slice(1)
  const entries: ChangelogEntry[] = []

  for (let i = 0; i < versionBlocks.length && entries.length < 4; i += 2) {
    const version = versionBlocks[i].trim()
    const body = versionBlocks[i + 1] ?? ''

    // Old format: "## Desktop" tag line. New format: "(2026-07-15)" date after the version.
    const tagMatch = body.match(/^##\s+(.+)$/m)
    const tag = tagMatch ? stripMarkdown(tagMatch[1]) : (body.match(/^\s*\((\d{4}-\d{2}-\d{2})\)/)?.[1] ?? '')

    const bulletMatches = [...body.matchAll(/^-\s+(?:\*\*(.+?)\*\*\s*—\s*)?(.+)$/gm)]
    const bullets = bulletMatches.slice(0, 2).map((m) => {
      const combined = m[1] ? `${m[1]} — ${m[2]}` : m[2]
      const stripped = stripMarkdown(combined)
      return stripped.length > 150 ? stripped.slice(0, 150) + '…' : stripped
    })

    entries.push({ version, tag, bullets })
  }

  return entries.filter((e) => e.bullets.length > 0)
}

export async function fetchChangelog(): Promise<ChangelogEntry[]> {
  try {
    const res = await fetch('https://raw.githubusercontent.com/fossisawesome/firmium/main/CHANGELOG.md')
    if (!res.ok) return []
    const text = await res.text()
    return parseChangelog(text)
  } catch {
    return []
  }
}

export function loadChangelog() {
  fetchChangelog().then((e) => changelog.entries = e)
}
