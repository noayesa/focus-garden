import { BX, BY, SIZE, leafPath } from './shared.jsx'

// Burgundy rubber plant: glossy, almost-black oval leaves and a red sheath on top.
const LEAVES = [
  { t: 0.88, a: -38 }, { t: 0.74, a: 40 }, { t: 0.58, a: -52 }, { t: 0.42, a: 55 }, { t: 0.28, a: -62 },
]

function Draw({ stage }) {
  const s = SIZE[stage]
  const h = [0, 10, 26, 42, 54][stage]
  const L = 24 * s
  const W = 10 * s
  return (
    <g>
      <line x1={BX} y1={BY} x2={BX} y2={BY - h} stroke="#6e4a3c" strokeWidth="3" strokeLinecap="round" />
      {LEAVES.slice(0, [0, 2, 3, 4, 5][stage]).map((l, i) => (
        <g key={i} transform={`translate(${BX} ${BY - h * l.t}) rotate(${l.a})`}>
          <path d={leafPath(L, W)} fill="#4a2530" />
          <path d={`M${-W * 0.5} ${-L * 0.45} q${W * 0.2} ${-L * 0.25} ${W * 0.2} ${-L * 0.4}`} stroke="#fff" strokeWidth="1.2" opacity="0.25" fill="none" />
          <line x1="0" y1="0" x2="0" y2={-L * 0.95} stroke="#c0485a" strokeWidth="1.2" />
        </g>
      ))}
      {/* the new leaf unfurling from its red sheath */}
      <g transform={`translate(${BX} ${BY - h})`}>
        <path d={leafPath(10 * s + 4, 2.4)} fill="#d8455c" />
      </g>
    </g>
  )
}

export default {
  name: 'rubber plant',
  tier: 'uncommon',
  fact: 'Each new leaf unrolls from a bright red sheath, like a little flag.',
  Draw,
}
