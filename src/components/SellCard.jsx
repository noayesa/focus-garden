import { useEffect, useRef } from 'react'
import Plant from './Plant.jsx'
import { PLANTS, TIERS } from '../plants/index.js'

// Opens when you tap a plant on the shelf. Selling it takes it off the shelf for coins,
// but it stays discovered in your collection.
export default function SellCard({ plant, onSell, onClose }) {
  const info = PLANTS[plant.type]
  const tier = TIERS[info.tier]
  const keepRef = useRef(null)

  useEffect(() => {
    keepRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-labelledby="sell-title" onClick={onClose}>
      <div className="unlock-card sell-card" style={{ '--tier': tier.color }} onClick={(e) => e.stopPropagation()}>
        <div className="unlock-plant">
          <Plant type={plant.type} stage={4} potIndex={plant.potIndex} />
        </div>
        <h2 id="sell-title" className="unlock-name">{info.name}</h2>
        <p className="unlock-tier">
          <span className="stars">{'★'.repeat(tier.stars)}<span className="dim">{'★'.repeat(4 - tier.stars)}</span></span>
          {tier.label}
        </p>
        <p className="unlock-fact">It stays in your 📖 collection if you sell it.</p>
        <div className="card-actions">
          <button ref={keepRef} className="btn secondary" onClick={onClose}>Keep it</button>
          <button className="btn primary" onClick={onSell}>Sell for {tier.sellPrice} 🪙</button>
        </div>
      </div>
    </div>
  )
}
