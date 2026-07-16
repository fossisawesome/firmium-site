export const KONAMI_SEQUENCE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
]

export function matchesKonami(buffer: string[]): boolean {
  if (buffer.length < KONAMI_SEQUENCE.length) return false
  const tail = buffer.slice(-KONAMI_SEQUENCE.length)
  return tail.every((key, i) => key.toLowerCase() === KONAMI_SEQUENCE[i].toLowerCase())
}

export function matchesSubsonic(buffer: string): boolean {
  return buffer.toLowerCase().includes('subsonic')
}
