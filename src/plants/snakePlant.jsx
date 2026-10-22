import { BX, BY, SIZE } from './shared.jsx'

// Snake plant (Sansevieria): stiff upright sword leaves with yellow edges and dark bands.
const LEAVES = [
  { dx: 0, a: 0, L: 62 }, { dx: -6, a: -9, L: 52 }, { dx: 6, a: 8, L: 56 },
  { dx: -11, a: -18, L: 40 }, { dx: 11, a: 16, L: 44 }, { dx: -2, a: -3, L: 34 },
]

function sword(L, W) {
  return `M${-W} 0 C${-W} ${-L * 0.5} ${-W * 0.7} ${-L * 0.8} 0 ${-L} C${W * 0.7} ${-L * 0.8} ${W} ${-L * 0.5} ${W} 0 Z`
}

function Draw({ stage }) {
  const s = SIZE[stage]
  return LEAVES.slice(0, [0, 2, 3, 5, 6][stage]).map((l, i) => {
    const L = l.L * s
    const W = 6.5
    return (
      <g key={i} transform={`translate(${BX + l.dx} ${BY}) rotate(${l.a})`}>
        <path d={sword(L, W)} fill="#3d6e3a" stroke="#e3d26b" strokeWidth="1.4" />
        <path d={sword(L * 0.92, W * 0.6)} fill="#5c8f4a" />
        {[0.2, 0.38, 0.56, 0.74].map((t) => (
          <path key={t} d={`M${-W * 0.8} ${-L * t} q${W * 0.8} -3 ${W * 1.6} 0`} stroke="#2e5a2c" strokeWidth="1.3" fill="none" />
        ))}
      </g>
    )
  })
}

export default {
  name: 'snake plant',
  tier: 'common',
  fact: 'Unlike most plants, it opens its pores at night to save water. Very hard to kill!',
  Draw,
}
