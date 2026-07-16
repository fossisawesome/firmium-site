import { writable, type Writable } from 'svelte/store'

export interface Theme {
  id: string
  name: string
  scheme: 'dark' | 'light'
  bg: string
  surface: string
  surface2: string
  border: string
  text: string
  muted: string
  accent: string
  accentDim: string
  error: string
}

export const THEMES: Theme[] = [
  { id: 'firmium', name: 'Firmium', scheme: 'dark', bg: '#0f0f0f', surface: '#1a1a1a', surface2: '#242424', border: 'rgba(255,255,255,.08)', text: '#f0f0f0', muted: '#888', accent: '#e8c97e', accentDim: 'rgba(232,201,126,.15)', error: '#e06060' },
  { id: 'gruvbox', name: 'Gruvbox', scheme: 'dark', bg: '#282828', surface: '#3c3836', surface2: '#504945', border: 'rgba(255,255,255,.08)', text: '#ebdbb2', muted: '#928374', accent: '#b8bb26', accentDim: 'rgba(184,187,38,.15)', error: '#fb4934' },
  { id: 'tokyo-night', name: 'Tokyo Night', scheme: 'dark', bg: '#1a1b26', surface: '#2b2d3a', surface2: '#3c3f50', border: 'rgba(255,255,255,.08)', text: '#c0caf5', muted: '#7aa2f7', accent: '#9ece6a', accentDim: 'rgba(158,206,106,.15)', error: '#f7768e' },
  { id: 'dracula', name: 'Dracula', scheme: 'dark', bg: '#282a36', surface: '#343746', surface2: '#44475a', border: 'rgba(255,255,255,.08)', text: '#f8f8f2', muted: '#6272a4', accent: '#bd93f9', accentDim: 'rgba(189,147,249,.15)', error: '#ff5555' },
  { id: 'catppuccin-mocha', name: 'Catppuccin Mocha', scheme: 'dark', bg: '#1e1e2e', surface: '#313244', surface2: '#45475a', border: 'rgba(255,255,255,.1)', text: '#cdd6f4', muted: '#a6adc8', accent: '#a6e3a1', accentDim: 'rgba(166,227,161,.15)', error: '#f38ba8' },
  { id: 'catppuccin-macchiato', name: 'Catppuccin Macchiato', scheme: 'dark', bg: '#24273a', surface: '#363a4f', surface2: '#494d64', border: 'rgba(255,255,255,.1)', text: '#cad3f5', muted: '#a5adcb', accent: '#a6da95', accentDim: 'rgba(166,218,149,.15)', error: '#ee99a0' },
  { id: 'catppuccin-frappe', name: 'Catppuccin Frappé', scheme: 'dark', bg: '#303446', surface: '#414559', surface2: '#51576d', border: 'rgba(255,255,255,.1)', text: '#c6d0f5', muted: '#a5adce', accent: '#a6d189', accentDim: 'rgba(166,209,137,.15)', error: '#e78284' },
  { id: 'catppuccin-latte', name: 'Catppuccin Latte', scheme: 'light', bg: '#eff1f5', surface: '#e6e9f0', surface2: '#dce0e8', border: 'rgba(0,0,0,.08)', text: '#4c4f69', muted: '#9ca0b0', accent: '#40a02b', accentDim: 'rgba(64,160,43,.15)', error: '#d20f39' },
  { id: 'monokai-classic', name: 'Monokai Classic', scheme: 'dark', bg: '#272822', surface: '#3e3d32', surface2: '#49483e', border: 'rgba(255,255,255,.08)', text: '#f8f8f2', muted: '#75715e', accent: '#a6e22e', accentDim: 'rgba(166,226,46,.15)', error: '#f92672' },
  { id: 'monokai-pro', name: 'Monokai Pro', scheme: 'dark', bg: '#2d2a2e', surface: '#403e41', surface2: '#5b5a5e', border: 'rgba(255,255,255,.08)', text: '#fcfcfa', muted: '#727072', accent: '#a9dc76', accentDim: 'rgba(169,220,118,.15)', error: '#ff6188' },
  { id: 'adwaita-dark', name: 'Adwaita Dark', scheme: 'dark', bg: '#242424', surface: '#303030', surface2: '#3c3c3c', border: 'rgba(255,255,255,.1)', text: '#deddda', muted: '#9a9996', accent: '#3584e4', accentDim: 'rgba(53,132,228,.15)', error: '#e01b24' },
  { id: 'adwaita', name: 'Adwaita', scheme: 'light', bg: '#f6f5f4', surface: '#ffffff', surface2: '#ebebeb', border: 'rgba(0,0,0,.12)', text: '#2e3436', muted: '#8c8c8c', accent: '#3584e4', accentDim: 'rgba(53,132,228,.15)', error: '#c01c28' },
  { id: 'ayu', name: 'ayu', scheme: 'dark', bg: '#0a0e14', surface: '#0d1017', surface2: '#131721', border: 'rgba(255,255,255,.07)', text: '#b3b1ad', muted: '#686868', accent: '#e6b450', accentDim: 'rgba(230,180,80,.15)', error: '#ea6c73' },
  { id: 'ayu-light', name: 'ayu Light', scheme: 'light', bg: '#fcfcfc', surface: '#f3f4f5', surface2: '#e7e8e9', border: 'rgba(0,0,0,.08)', text: '#575f66', muted: '#828c99', accent: '#ff9940', accentDim: 'rgba(255,153,64,.15)', error: '#f07171' },
  { id: 'github-dark', name: 'GitHub Dark', scheme: 'dark', bg: '#0d1117', surface: '#161b22', surface2: '#21262d', border: 'rgba(255,255,255,.08)', text: '#e6edf3', muted: '#8b949e', accent: '#58a6ff', accentDim: 'rgba(88,166,255,.15)', error: '#f85149' },
  { id: 'nordfox', name: 'Nordfox', scheme: 'dark', bg: '#232831', surface: '#2e3440', surface2: '#39404f', border: 'rgba(255,255,255,.08)', text: '#cdcecf', muted: '#60728a', accent: '#81a1c1', accentDim: 'rgba(129,161,193,.15)', error: '#bf616a' },
  { id: 'nord', name: 'Nord', scheme: 'dark', bg: '#2e3440', surface: '#3b4252', surface2: '#434c5e', border: 'rgba(255,255,255,.08)', text: '#eceff4', muted: '#81a1c1', accent: '#a3be8c', accentDim: 'rgba(163,190,140,.15)', error: '#bf616a' },
  { id: 'synthwave', name: "Synthwave '84", scheme: 'dark', bg: '#262335', surface: '#2a2139', surface2: '#34294f', border: 'rgba(255,255,255,.1)', text: '#ffffff', muted: '#848bbd', accent: '#ff7edb', accentDim: 'rgba(255,126,219,.15)', error: '#fe4450' },
  { id: 'svalbard', name: 'Svalbard', scheme: 'dark', bg: '#0b1117', surface: '#121d27', surface2: '#1c2c39', border: 'rgba(255,255,255,.08)', text: '#e8f1f7', muted: '#7e9bb0', accent: '#6cc8e0', accentDim: 'rgba(108,200,224,.15)', error: '#e06c75' },
  { id: 'spotify', name: 'Spotify', scheme: 'dark', bg: '#121212', surface: '#181818', surface2: '#282828', border: 'rgba(255,255,255,.1)', text: '#ffffff', muted: '#b3b3b3', accent: '#1ed760', accentDim: 'rgba(30,215,96,.15)', error: '#f15e6c' },
]

const STORAGE_KEY = 'firmium-theme'

export const themeId: Writable<string> = writable('firmium')

function writeVars(theme: Theme) {
  const root = document.documentElement.style
  root.setProperty('--bg', theme.bg)
  root.setProperty('--surface', theme.surface)
  root.setProperty('--surface2', theme.surface2)
  root.setProperty('--border', theme.border)
  root.setProperty('--text', theme.text)
  root.setProperty('--muted', theme.muted)
  root.setProperty('--accent', theme.accent)
  root.setProperty('--accent-dim', theme.accentDim)
  root.setProperty('--error', theme.error)
}

export function applyTheme(id: string): void {
  const theme = THEMES.find((t) => t.id === id) ?? THEMES[0]
  writeVars(theme)
  themeId.set(theme.id)
  try {
    localStorage.setItem(STORAGE_KEY, theme.id)
  } catch {
    // localStorage unavailable (private mode, SSR) — theme still applies for this session
  }
}

export function initTheme(): void {
  let stored: string | null = null
  try {
    stored = localStorage.getItem(STORAGE_KEY)
  } catch {
    // ignore
  }
  applyTheme(stored ?? 'firmium')
}
