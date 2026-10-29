import { useId } from 'react'
import { FURNITURE } from '../furniture/index.js'

// Draws one furniture item at its own size. Used in the room and in the shop.
export default function FurnitureArt({ type }) {
  const uid = useId().replace(/:/g, '')
  const item = FURNITURE[type]
  return (
    <svg
      className="furniture-art"
      viewBox={`0 0 ${item.width} ${item.height}`}
      width={item.width}
      height={item.height}
      aria-hidden="true"
    >
      <item.Draw uid={uid} />
    </svg>
  )
}
