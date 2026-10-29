import { useEffect, useRef } from 'react'
import FurnitureArt from './FurnitureArt.jsx'
import { FURNITURE } from '../furniture/index.js'

// The furniture shop: a scrollable list of everything you can buy with coins.
export default function Shop({ coins, onBuy, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    closeRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-labelledby="shop-title" onClick={onClose}>
      <div className="shop" onClick={(e) => e.stopPropagation()}>
        <div className="shop-head">
          <h2 id="shop-title">🛋️ Shop</h2>
          <span className="shop-coins">🪙 {coins}</span>
          <button ref={closeRef} className="icon-btn shop-close" onClick={onClose} aria-label="Close shop">✕</button>
        </div>
        <p className="muted small shop-hint">Sell grown plants from your shelf to earn coins. Tap a plant to sell it.</p>

        <ul className="shop-list">
          {Object.entries(FURNITURE).map(([id, item]) => {
            const short = item.price - coins
            return (
              <li className="shop-item" key={id}>
                <div className="shop-art">
                  <FurnitureArt type={id} />
                </div>
                <div className="shop-info">
                  <strong className="shop-name">{item.name}</strong>
                  <span className="muted small">{item.blurb}</span>
                </div>
                <button className="btn primary shop-buy" disabled={short > 0} onClick={() => onBuy(id)}>
                  {item.price} 🪙
                </button>
                {short > 0 && <span className="shop-short small muted">{short} more</span>}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
