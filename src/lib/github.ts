export async function fetchStarCount(): Promise<number | null> {
  try {
    const res = await fetch('https://api.github.com/repos/fossisawesome/firmium')
    if (!res.ok) return null
    const data = await res.json()
    return typeof data.stargazers_count === 'number' ? data.stargazers_count : null
  } catch {
    return null
  }
}
