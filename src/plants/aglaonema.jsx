import { SIZE, Stalk, leafPath } from './shared.jsx'

// Aglaonema 'Pink Valentine': pointed leaves, pink in the middle, green at the edges.
const ANGLES = [-48, 44, -18, 14, -70, 68, -2, -34, 32]

function Draw({ stage }) {
  const s = SIZE[stage]
  return ANGLES.slice(0, [0, 2, 4, 6, 9][stage]).map((a, i) => {
    const L = (i < 4 ? 34 : 28) * s
    const W = 8 * s
    return (
      <Stalk key={i} a={a} p={10 * s} color="#d98aa0">
        <path d={leafPath(L, W)} fill="#3f7a46" />
        <path d={leafPath(L * 0.88, W * 0.65)} fill="#f2a9bb" transform={`translate(0 ${-L * 0.05})`} />
        <circle cx={-W * 0.3} cy={-L * 0.4} r="0.9" fill="#3f7a46" />
        <circle cx={W * 0.25} cy={-L * 0.6} r="0.9" fill="#3f7a46" />
        <line x1="0" y1="0" x2="0" y2={-L * 0.95} stroke="#e07d97" strokeWidth="0.9" />
      </Stalk>
    )
  })
}

export default {
  name: 'aglaonema',
  tier: 'common',
  fact: 'Also called Chinese evergreen. It stays cheerful even in a dim corner.',
  Draw,
}
