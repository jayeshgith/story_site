const STORAGE_KEY = 'story_viewed'
const VIEWER_KEY = 'session_viewer'

export function ensureSessionViewer() {
  if (typeof window === 'undefined') return null
  const existing = sessionStorage.getItem(VIEWER_KEY)
  if (existing) return JSON.parse(existing)
  const viewer = { id: 'viewer_' + Date.now(), name: 'You' }
  sessionStorage.setItem(VIEWER_KEY, JSON.stringify(viewer))
  return viewer
}

export function getViewedMap(): Record<string, boolean> {
  if (typeof window === 'undefined') return {}
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '{}')
  } catch (e) {
    return {}
  }
}

export function markViewed(itemId: string) {
  if (typeof window === 'undefined') return
  const map = getViewedMap()
  map[itemId] = true
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(map))
}

export function hasViewed(itemId: string) {
  const map = getViewedMap()
  return !!map[itemId]
}
