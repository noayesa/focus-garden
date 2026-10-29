import { useEffect, useRef, useState } from 'react'
import Plant from './Plant.jsx'
import RoomFurniture from './RoomFurniture.jsx'
import WalkingBun from './WalkingBun.jsx'
import { PLANTS } from '../plants/index.js'

const SLOTS_PER_SHELF = 4
const MIN_SHELVES = 2
const FLOOR_POT_WIDTH = 130
const BUN_FEET = 22 // how far above the room's bottom edge Bun stands
const BUN_PAWS = 36 // how far above her feet her paws are (where she holds things)

const DEFAULT_LINES = {
  idle: "Hi! I'm Bun. Start a focus session and I'll plant a seed!",
  working: 'Shh... tending the plants while you focus 💧',
  happy: 'Yay! You did it! 🌿',
  sad: "Aww, it drooped a little. Let's try again?",
}

function Sparkles() {
  return (
    <div className="sparkles" aria-hidden="true">
      <span>✨</span><span>💚</span><span>✨</span>
    </div>
  )
}

// The cozy room. The growing plant sits in a big pot on the floor;
// fully grown plants go up to the wall shelves (Bun carries them up a ladder).
// Tapping a shelf plant calls onPlantClick (to sell it); furniture you bought stands on the floor.
export default function Garden({
  shelf, floor, floorStage, mood, message, event, shelving, onPlaced, onShelvingDone,
  onPlantClick, furniture, onMoveFurniture, onSellFurniture,
}) {
  const roomRef = useRef(null)
  const [roomWidth, setRoomWidth] = useState(0)
  const [carrying, setCarrying] = useState(false)

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => setRoomWidth(entry.contentRect.width))
    observer.observe(roomRef.current)
    return () => observer.disconnect()
  }, [])

  const shelfCount = Math.max(MIN_SHELVES, Math.ceil((shelf.length + 1) / SLOTS_PER_SHELF))
  const slots = Array.from({ length: shelfCount * SLOTS_PER_SHELF }, (_, i) => shelf[i] || null)
  const rows = Array.from({ length: shelfCount }, (_, r) => slots.slice(r * SLOTS_PER_SHELF, (r + 1) * SLOTS_PER_SHELF))
  const potX = Math.min(roomWidth * 0.62, roomWidth - FLOOR_POT_WIDTH - 10)

  // Bun asks this when she needs to know where things are in the room
  function getTargets() {
    const room = roomRef.current.getBoundingClientRect()
    const slot = roomRef.current.querySelector('[data-next-slot]').getBoundingClientRect()
    const shelfTop = slot.bottom - room.top
    const feetY = room.height - BUN_FEET
    return {
      potX,
      slotX: (slot.left + slot.right) / 2 - room.left,
      climbY: feetY - shelfTop - BUN_PAWS,
      ladderH: feetY - shelfTop + 8,
    }
  }

  const showFloorPlant = floor && !carrying

  return (
    <div className="room" ref={roomRef}>
      <div className="wall">
        <div className="speech" role="status">
          <span className="speech-name">🐰 Bun</span>
          {message || DEFAULT_LINES[mood]}
        </div>

        <div className="wall-shelves">
          {rows.map((row, r) => (
            <div className="shelf-row" key={r}>
              <div className="shelf-slots">
                {row.map((p, i) => {
                  const index = r * SLOTS_PER_SHELF + i
                  return p ? (
                    <button
                      className="shelf-slot shelf-plant"
                      key={p.id}
                      disabled={!onPlantClick}
                      onClick={() => onPlantClick(p)}
                      aria-label={`${PLANTS[p.type].name}: sell or keep`}
                    >
                      {p.id === event?.placedId && <Sparkles key={event.key} />}
                      <Plant type={p.type} stage={4} potIndex={p.potIndex} />
                    </button>
                  ) : (
                    <div
                      className="shelf-slot empty"
                      key={`empty-${index}`}
                      title="Room for a new plant"
                      data-next-slot={index === shelf.length ? '' : undefined}
                    >
                      <span>+</span>
                    </div>
                  )
                })}
              </div>
              <div className="shelf-board" />
            </div>
          ))}
        </div>

        <div className="window" aria-hidden="true">
          <div className="sun" />
          <div className="cloud c1" />
          <div className="cloud c2" />
          <div className="window-bars" />
        </div>
      </div>

      <div className="stage">
        <RoomFurniture items={furniture} roomWidth={roomWidth} onMove={onMoveFurniture} onSellBack={onSellFurniture} />
        <div className="floor-pot" style={{ left: potX, width: FLOOR_POT_WIDTH }}>
          {showFloorPlant && event?.kind === 'complete' && <Sparkles key={event.key} />}
          {showFloorPlant ? (
            <Plant
              type={floor.type}
              stage={floorStage}
              wilted={floor.wilted}
              potIndex={floor.potIndex}
              justGrew
            />
          ) : (
            !carrying && <Plant potIndex={shelf.length} />
          )}
        </div>
        <div className="floor" />
      </div>

      <WalkingBun
        roomWidth={roomWidth}
        mood={mood}
        event={event}
        shelving={shelving}
        getTargets={getTargets}
        onPickUp={() => setCarrying(true)}
        onPlaced={() => {
          setCarrying(false)
          onPlaced()
        }}
        onShelvingDone={onShelvingDone}
      />
    </div>
  )
}
