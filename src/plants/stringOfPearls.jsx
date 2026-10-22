// String of pearls: a mound of little green beads, with strands spilling over the pot.
const MOUND = [[40, 108], [46, 105], [52, 104], [58, 106], [44, 101], [50, 99], [56, 101], [62, 108], [36, 109]]
const STRANDS = [
  { x: 24, len: 34 }, { x: 32, len: 42 }, { x: 70, len: 38 }, { x: 78, len: 28 }, { x: 40, len: 24 }, { x: 62, len: 22 },
]
const GROWTH = [0, 0.15, 0.4, 0.7, 1]

function Pearl({ x, y }) {
  return (
    <g>
      <circle cx={x} cy={y} r="2.6" fill="#8cc46f" stroke="#6aa152" strokeWidth="0.5" />
      <circle cx={x - 0.8} cy={y - 0.8} r="0.8" fill="#fff" opacity="0.6" />
    </g>
  )
}

function Draw({ stage }) {
  return MOUND.slice(0, [0, 3, 5, 7, 9][stage]).map(([x, y]) => <Pearl key={`${x}${y}`} x={x} y={y} />)
}

// The strands hang down in front of the pot
function Front({ stage }) {
  const g = GROWTH[stage]
  if (!g) return null
  return STRANDS.slice(0, [0, 1, 2, 4, 6][stage]).map((st) => {
    const len = st.len * g
    const beads = Math.floor(len / 5)
    const sway = st.x < 50 ? -1 : 1
    return (
      <g key={st.x}>
        <path d={`M${st.x} 109 q${sway * 3} ${len / 2} ${sway} ${len}`} stroke="#8a9f6a" strokeWidth="0.8" fill="none" />
        {Array.from({ length: beads }, (_, i) => {
          const t = (i + 1) / beads
          return <Pearl key={i} x={st.x + sway * 3 * Math.sin(t * Math.PI)} y={110 + t * len} />
        })}
      </g>
    )
  })
}

export default {
  name: 'string of pearls',
  tier: 'rare',
  fact: 'Each pearl is a tiny leaf that stores water, with a little window to let light inside.',
  pot: '#f3e3c3',
  Draw,
  Front,
}
