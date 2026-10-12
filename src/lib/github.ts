const CACHE_KEY = 'firmium-stars'

export async function fetchStarCount(): Promise<number | null> {
  try {
    const cached = Number(sessionStorage.getItem(CACHE_KEY))
    if (cached > 0) return cached
  } catch {
    // sessionStorage unavailable; fetch every time
  }
  try {
    const res = await fetch('https://api.github.com/repos/fossisawesome/firmium')
    if (!res.ok) return null
    const data = await res.json()
    if (typeof data.stargazers_count !== 'number') return null
    try {
      sessionStorage.setItem(CACHE_KEY, String(data.stargazers_count))
    } catch {
      // ignore
    }
    return data.stargazers_count
  } catch {
    return null
  }
}
