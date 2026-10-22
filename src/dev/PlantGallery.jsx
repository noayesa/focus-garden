import Plant from '../components/Plant.jsx'
import { PLANTS, TIERS } from '../plants/index.js'

// A dev page showing every plant at every growth stage.
// Open it at http://localhost:5173/?gallery
// or show just some plants: ?gallery=pothos,monsteraAdansonii
export default function PlantGallery() {
  const only = new URLSearchParams(window.location.search).get('gallery')
  const ids = only ? only.split(',') : Object.keys(PLANTS)
  const entries = Object.entries(PLANTS).filter(([id]) => ids.includes(id))

  return (
    <div className={`gallery ${only ? 'gallery-focus' : ''}`}>
      <h1>Plant gallery</h1>
      <p className="muted">{entries.length} of {Object.keys(PLANTS).length} plants · stages 0 to 4 · the last column is wilted</p>
      {entries.map(([id, p], i) => (
        <div className="gallery-row" key={id}>
          <div className="gallery-name">
            <strong>{p.name}</strong>
            <span style={{ color: TIERS[p.tier].color }}>{TIERS[p.tier].label}</span>
            <code>{id}</code>
          </div>
          {[0, 1, 2, 3, 4].map((stage) => (
            <div className="gallery-cell" key={stage}>
              <Plant type={id} stage={stage} potIndex={i} />
            </div>
          ))}
          <div className="gallery-cell">
            <Plant type={id} stage={2} potIndex={i} wilted />
          </div>
        </div>
      ))}
    </div>
  )
}
