import { SIZE, Stalk, leafPath } from './shared.jsx'

// Maranta leuconeura: oval leaves with a light feathered centre and red veins.
const LEAVES = [
  { a: -60, p: 14, L: 30, W: 11 }, { a: 55, p: 16, L: 30, W: 11 },
  { a: -25, p: 22, L: 32, W: 12 }, { a: 20, p: 24, L: 32, W: 12 },
  { a: -82, p: 10, L: 26, W: 10 }, { a: 80, p: 10, L: 26, W: 10 },
  { a: -2, p: 30, L: 30, W: 11 },
]

function Draw({ stage }) {
  const s = SIZE[stage]
  return LEAVES.slice(0, [0, 2, 4, 6, 7][stage]).map((l, i) => {
    const L = l.L * s
    const W = l.W * s
    return (
      <Stalk key={i} a={l.a} p={l.p * s}>
        <path d={leafPath(L, W)} fill="#3d6b35" />
        <path d={leafPath(L * 0.85, W * 0.45)} fill="#a8cf7f" transform={`translate(0 ${-L * 0.07})`} />
        {[0.3, 0.5, 0.7].map((t) => (
          <g key={t}>
            <ellipse cx={-W * 0.5} cy={-L * t} rx={W * 0.16} ry={L * 0.05} fill="#27461f" />
            <ellipse cx={W * 0.5} cy={-L * t} rx={W * 0.16} ry={L * 0.05} fill="#27461f" />
            <path d={`M0 ${-L * t} L${-W * 0.75} ${-L * (t + 0.12)} M0 ${-L * t} L${W * 0.75} ${-L * (t + 0.12)}`} stroke="#c2453a" strokeWidth="0.8" />
          </g>
        ))}
        <line x1="0" y1="0" x2="0" y2={-L} stroke="#c2453a" strokeWidth="1.2" />
      </Stalk>
    )
  })
}

export default {
  name: 'prayer plant',
  tier: 'uncommon',
  fact: 'Prayer plants fold their leaves up at night, like hands coming together.',
  Draw,
}
