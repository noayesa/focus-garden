import { SIZE, Stalk } from './shared.jsx'

// Calathea orbifolia: big round leaves with silvery stripes.
const LEAVES = [
  { a: -40, p: 22, R: 15 }, { a: 38, p: 24, R: 15 }, { a: -5, p: 34, R: 16 },
  { a: -72, p: 14, R: 12 }, { a: 70, p: 14, R: 12 },
]

function Draw({ stage }) {
  const s = SIZE[stage]
  return LEAVES.slice(0, [0, 2, 3, 4, 5][stage]).map((l, i) => {
    const R = l.R * s
    return (
      <Stalk key={i} a={l.a} p={l.p * s} color="#7a9a5c">
        <ellipse cx="0" cy={-R} rx={R * 0.85} ry={R} fill="#4f8a52" />
        {[-0.75, -0.45, -0.15, 0.15, 0.45, 0.75].map((t) => (
          <path
            key={t}
            d={`M0 ${-R * (1 + t * 0.9)} q${R * 0.4} ${-R * 0.1} ${R * 0.7} ${-R * 0.25} M0 ${-R * (1 + t * 0.9)} q${-R * 0.4} ${-R * 0.1} ${-R * 0.7} ${-R * 0.25}`}
            stroke="#c9dcc0"
            strokeWidth="1.3"
            fill="none"
            strokeLinecap="round"
          />
        ))}
        <line x1="0" y1="0" x2="0" y2={-R * 2} stroke="#c9dcc0" strokeWidth="1" />
      </Stalk>
    )
  })
}

export default {
  name: 'calathea',
  tier: 'uncommon',
  fact: 'Calatheas love humid air. Their leaves even move a little through the day!',
  Draw,
}
