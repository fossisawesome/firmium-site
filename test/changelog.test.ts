import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseChangelog } from '../src/lib/changelog.ts'

const sample = `# Unreleased

## Desktop

- Fix: something not yet released.

# v8.1.0

## Desktop / Android

- **Favorites** — new Favorites screen.
- Fix: plain bullet without a bold title.
- third bullet is dropped

# v8.0.0

No bullets here.
`

test('skips Unreleased, keeps plain bullets, caps at two', () => {
  const entries = parseChangelog(sample)
  assert.equal(entries.length, 1)
  assert.equal(entries[0].version, 'v8.1.0')
  assert.deepEqual(entries[0].bullets, ['Favorites — new Favorites screen.', 'Fix: plain bullet without a bold title.'])
})
