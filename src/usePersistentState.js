import { useEffect, useState } from 'react'

// Like useState, but the value is saved in the browser (localStorage)
// so it survives a page refresh.
export default function usePersistentState(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved !== null ? JSON.parse(saved) : initial
    } catch {
      return initial
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // storage can be unavailable (private mode); the app still works, it just won't remember
    }
  }, [key, value])

  return [value, setValue]
}
