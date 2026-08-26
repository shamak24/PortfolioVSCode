import { useEffect } from 'react'

export function useKeyboardShortcut(
  handler: (e: KeyboardEvent) => void,
  enabled = true,
) {
  useEffect(() => {
    if (!enabled) return

    const onKeyDown = (e: KeyboardEvent) => {
      handler(e)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [handler, enabled])
}
