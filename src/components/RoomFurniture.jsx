import { useRef, useState } from 'react'
import FurnitureArt from './FurnitureArt.jsx'
import { FURNITURE, sellBackPrice } from '../furniture/index.js'

const NUDGE = 0.02 // how far one arrow-key press moves an item (share of the room's width)
const DRAG_START = 4 // pixels the pointer must move before a press counts as a drag, not a tap

// Furniture standing on the floor. Drag an item left or right to move it;
// tap it to open a small menu where you can sell it back.
// Each item's x is its centre as a share of the room's width (0 = left edge, 1 = right edge),
// so the room keeps its layout when the window is resized.
export default function RoomFurniture({ items, roomWidth, onMove, onSellBack }) {
  // { id, startClientX, startX, x, moved } while an item is held down.
  // The state redraws the item as it moves; the ref lets the pointer handlers read the
  // latest value straight away, even if events arrive faster than React redraws.
  const [drag, setDragState] = useState(null)
  const dragRef = useRef(null)
  const [selected, setSelected] = useState(null)

  function setDrag(d) {
    dragRef.current = d
    setDragState(d)
  }

  if (!roomWidth) return null

  // Keep the whole item inside the room
  function clampX(type, x) {
    const half = FURNITURE[type].width / 2 / roomWidth
    return Math.min(1 - half, Math.max(half, x))
  }

  function toggleMenu(id) {
    setSelected((s) => (s === id ? null : id))
  }

  function handlePointerDown(e, item) {
    // Keep getting move events even if the pointer slips off the item mid-drag.
    // It can throw for pointers the browser isn't tracking; dragging still works without it.
    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch {}
    setDrag({ id: item.id, startClientX: e.clientX, startX: clampX(item.type, item.x), x: item.x, moved: false })
  }

  function handlePointerMove(e, item) {
    const d = dragRef.current
    if (d?.id !== item.id) return
    const dx = e.clientX - d.startClientX
    if (!d.moved && Math.abs(dx) < DRAG_START) return
    setDrag({ ...d, moved: true, x: clampX(item.type, d.startX + dx / roomWidth) })
    setSelected(null)
  }

  function handlePointerUp(item) {
    const d = dragRef.current
    if (d?.id !== item.id) return
    if (d.moved) onMove(item.id, d.x)
    else toggleMenu(item.id)
    setDrag(null)
  }

  function handleKeyDown(e, item) {
    const step = { ArrowLeft: -NUDGE, ArrowRight: NUDGE }[e.key]
    if (step) {
      e.preventDefault()
      onMove(item.id, clampX(item.type, clampX(item.type, item.x) + step))
    } else if (e.key === 'Escape') {
      setSelected(null)
    }
  }

  // Rugs first, so they're drawn underneath everything else
  const ordered = [...items].sort((a, b) => Boolean(FURNITURE[b.type].flat) - Boolean(FURNITURE[a.type].flat))

  return ordered.map((item) => {
    const info = FURNITURE[item.type]
    const dragging = drag?.id === item.id && drag.moved
    const x = dragging ? drag.x : clampX(item.type, item.x)
    return (
      <div
        key={item.id}
        className={`furniture ${info.flat ? 'flat' : ''} ${dragging ? 'dragging' : ''}`}
        style={{ left: x * roomWidth - info.width / 2, width: info.width }}
      >
        {selected === item.id && (
          <div className="furniture-menu">
            <button
              className="btn primary small"
              onClick={() => {
                setSelected(null)
                onSellBack(item)
              }}
            >
              Sell back for {sellBackPrice(item.type)} 🪙
            </button>
            <button className="icon-btn" aria-label="Close menu" onClick={() => setSelected(null)}>✕</button>
          </div>
        )}
        <button
          className="furniture-handle"
          aria-label={`${info.name}: drag or use the arrow keys to move it, press Enter for options`}
          onPointerDown={(e) => handlePointerDown(e, item)}
          onPointerMove={(e) => handlePointerMove(e, item)}
          onPointerUp={() => handlePointerUp(item)}
          onPointerCancel={() => setDrag(null)}
          // Pointer taps are handled above; this catches Enter/Space from the keyboard
          onClick={(e) => e.detail === 0 && toggleMenu(item.id)}
          onKeyDown={(e) => handleKeyDown(e, item)}
        >
          <FurnitureArt type={item.type} />
        </button>
      </div>
    )
  })
}
