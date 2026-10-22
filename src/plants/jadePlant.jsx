// Jade plant: a chunky little tree with round, fleshy leaves with rosy edges.
const BRANCHES = [
  { d: 'M50 112 C50 100 49 92 50 82', tip: [50, 82] },
  { d: 'M50 102 C44 98 40 94 36 86', tip: [36, 86] },
  { d: 'M50 98 C56 94 62 90 64 82', tip: [64, 82] },
  { d: 'M50 90 C46 84 43 78 42 70', tip: [42, 70] },
  { d: 'M50 90 C55 84 58 78 58 70', tip: [58, 70] },
]

function LeafCluster({ x, y, r }) {
  return [-70, -25, 25, 70].map((a) => (
    <ellipse
      key={a}
      cx={x}
      cy={y - r * 0.9}
      rx={r * 0.55}
      ry={r * 0.85}
      fill="#6a9e4f"
      stroke="#c0704a"
      strokeWidth="0.9"
      transform={`rotate(${a} ${x} ${y})`}
    />
  ))
}

function Draw({ stage }) {
  if (stage === 1) {
    return (
      <g>
        <line x1="50" y1="112" x2="50" y2="102" stroke="#8a7a4a" strokeWidth="2.5" />
        <LeafCluster x={50} y={102} r={5} />
      </g>
    )
  }
  const branches = BRANCHES.slice(0, [0, 1, 3, 4, 5][stage])
  return (
    <g>
      {branches.map((b) => (
        <path key={b.d} d={b.d} stroke="#8a7a4a" strokeWidth={stage === 4 ? 5 : 4} fill="none" strokeLinecap="round" />
      ))}
      {branches.map((b) => (
        <LeafCluster key={b.d} x={b.tip[0]} y={b.tip[1]} r={stage === 4 ? 8 : 7} />
      ))}
    </g>
  )
}

export default {
  name: 'jade plant',
  tier: 'common',
  fact: 'Jade stores water in its chubby leaves, and it is said to bring good luck.',
  Draw,
}
