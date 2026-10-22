import { useEffect, useRef } from 'react'
import Plant from './Plant.jsx'
import { PLANTS, TIERS } from '../plants/index.js'

// The big "New plant unlocked!" moment when a plant finishes growing.
export default function UnlockCard({ plant, isNew, onClose }) {
  const info = PLANTS[plant.type]
  const tier = TIERS[info.tier]
  const buttonRef = useRef(null)

  useEffect(() => {
    buttonRef.current?.focus()
  }, [])

  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-labelledby="unlock-title">
      <div className="unlock-card" style={{ '--tier': tier.color }}>
        <div className="unlock-rays" aria-hidden="true" />
        <p className="unlock-kicker">{isNew ? '✨ New plant unlocked! ✨' : '🌿 Fully grown! 🌿'}</p>
        <div className="unlock-plant">
          <Plant type={plant.type} stage={4} potIndex={plant.potIndex} justGrew />
        </div>
        <h2 id="unlock-title" className="unlock-name">{info.name}</h2>
        <p className="unlock-tier">
          <span className="stars">{'★'.repeat(tier.stars)}<span className="dim">{'★'.repeat(4 - tier.stars)}</span></span>
          {tier.label}
        </p>
        <p className="unlock-fact">{info.fact}</p>
        <button ref={buttonRef} className="btn primary" onClick={onClose}>
          Put it on the shelf 🪜
        </button>
      </div>
    </div>
  )
}
