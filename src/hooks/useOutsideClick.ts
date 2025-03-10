import { useEffect } from 'react'

type Handler = (event: MouseEvent) => void

export function useOutsideClick<T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T>,
  handler: Handler,
  when: boolean = true,
): void {
  useEffect(() => {
    if (!when) {
      return
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler(event)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, handler, when])
}
