import Farmer from '../components/Farmer.jsx'
import FurnitureArt from '../components/FurnitureArt.jsx'
import Plant from '../components/Plant.jsx'
import { FURNITURE } from '../furniture/index.js'

// A dev page showing every furniture item at its real size between Bun and the floor pot,
// plus the small picture the shop uses.
// Open it at http://localhost:5173/?furniture
// or show just some items: ?furniture=armchair,rug
export default function FurnitureGallery() {
  const only = new URLSearchParams(window.location.search).get('furniture')
  const ids = only ? only.split(',') : Object.keys(FURNITURE)
  const entries = Object.entries(FURNITURE).filter(([id]) => ids.includes(id))

  return (
    <div className="gallery">
      <h1>Furniture gallery</h1>
      <p className="muted">{entries.length} of {Object.keys(FURNITURE).length} items · in the room next to Bun and the pot · as the shop shows it</p>
      {entries.map(([id, item]) => (
        <div className="gallery-row" key={id}>
          <div className="gallery-name">
            <strong>{item.name}</strong>
            <span>{item.price} 🪙</span>
            <code>{id}</code>
          </div>
          <div className="fgal-room">
            <div className="fgal-bun"><Farmer activity="idle" /></div>
            <div className={`fgal-item ${item.flat ? 'flat' : ''}`}><FurnitureArt type={id} /></div>
            <div className="fgal-pot"><Plant /></div>
            <div className="floor" />
          </div>
          <div className="shop-art fgal-shop">
            <FurnitureArt type={id} />
          </div>
        </div>
      ))}
    </div>
  )
}
