import { useRef, useEffect } from 'react'

export function useClickAway<T extends HTMLElement = HTMLElement>(callback: (event: MouseEvent | TouchEvent) => void) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const handleClickAway = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback(event)
      }
    }

    document.addEventListener('mousedown', handleClickAway)
    document.addEventListener('touchstart', handleClickAway)

    return () => {
      document.removeEventListener('mousedown', handleClickAway)
      document.removeEventListener('touchstart', handleClickAway)
    }
  }, [callback])

  return ref
} 