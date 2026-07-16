export interface ChangelogEntry {
  version: string
  tag: string
  bullets: string[]
}

export const FALLBACK_CHANGELOG: ChangelogEntry[] = [
  { version: 'v8.1.0', tag: 'Desktop / Android', bullets: ['Favorites — new Favorites screen/view (desktop and Android), backend/API support for favorite tracking.', 'Spotify-layout polish — home screen and player bar refined to match Spotify-style layout.'] },
  { version: 'v8.0.0', tag: 'Wear OS', bullets: ['Standalone playback — browse and play your library directly on the watch, no phone needed.', 'Browse UI — Home, Artist, Album, Playlist, and Search screens on the watch.'] },
  { version: 'v7.1.0', tag: 'Desktop', bullets: ['Command line control — control a running instance from the terminal: play-pause, next, prev, volume, seek, and more.', 'Scrollbar width setting — Appearance settings gains a scrollbar width slider.'] },
  { version: 'v7.0.0', tag: 'Desktop', bullets: ['Custom UI font — Settings > Appearance now has a font picker.', 'Windows NSIS installer rebuilt without Tauri.'] },
]

function stripMarkdown(text: string): string {
  return text.replace(/\*\*/g, '').replace(/`/g, '').trim()
}

export function parseChangelog(markdown: string): ChangelogEntry[] {
  const versionBlocks = markdown.split(/^# (v[\d.]+)/m).slice(1)
  const entries: ChangelogEntry[] = []

  for (let i = 0; i < versionBlocks.length && entries.length < 4; i += 2) {
    const version = versionBlocks[i].trim()
    const body = versionBlocks[i + 1] ?? ''

    const tagMatch = body.match(/^##\s+(.+)$/m)
    const tag = tagMatch ? stripMarkdown(tagMatch[1]) : ''

    const bulletMatches = [...body.matchAll(/^-\s+\*\*(.+?)\*\*\s*—\s*(.+)$/gm)]
    const bullets = bulletMatches.slice(0, 2).map((m) => {
      const combined = `${m[1]} — ${m[2]}`
      const stripped = stripMarkdown(combined)
      return stripped.length > 150 ? stripped.slice(0, 150) + '…' : stripped
    })

    entries.push({ version, tag, bullets })
  }

  return entries
}

export async function fetchChangelog(): Promise<ChangelogEntry[]> {
  try {
    const res = await fetch('https://raw.githubusercontent.com/fossisawesome/firmium/main/CHANGELOG.md')
    if (!res.ok) return FALLBACK_CHANGELOG
    const text = await res.text()
    const parsed = parseChangelog(text)
    return parsed.length > 0 ? parsed : FALLBACK_CHANGELOG
  } catch {
    return FALLBACK_CHANGELOG
  }
}
