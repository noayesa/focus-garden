import { BX, BY, SIZE } from './shared.jsx'

// Fiddle leaf fig: a slim trunk with big, wavy, violin-shaped leaves.
const LEAVES = [
  { t: 1, a: 0 }, { t: 0.82, a: -42 }, { t: 0.66, a: 44 }, { t: 0.5, a: -55 }, { t: 0.36, a: 52 },
]

function fiddle(L, W) {
  return `M0 0 C${-W * 0.6} ${-L * 0.1} ${-W * 0.7} ${-L * 0.4} ${-W * 0.5} ${-L * 0.55} C${-W * 0.95} ${-L * 0.7} ${-W * 0.9} ${-L} 0 ${-L} C${W * 0.9} ${-L} ${W * 0.95} ${-L * 0.7} ${W * 0.5} ${-L * 0.55} C${W * 0.7} ${-L * 0.4} ${W * 0.6} ${-L * 0.1} 0 0 Z`
}

function Draw({ stage }) {
  const s = SIZE[stage]
  const h = [0, 8, 26, 42, 56][stage]
  const L = 24 * s
  const W = 14 * s
  return (
    <g>
      <line x1={BX} y1={BY} x2={BX} y2={BY - h} stroke="#7d6046" strokeWidth={stage >= 3 ? 3.5 : 2.5} strokeLinecap="round" />
      {LEAVES.slice(0, [0, 2, 3, 4, 5][stage]).map((l, i) => (
        <g key={i} transform={`translate(${BX} ${BY - h * l.t}) rotate(${l.a})`}>
          <path d={fiddle(L, W)} fill={i === 0 ? '#5a9a48' : '#3f7d3a'} />
          <line x1="0" y1="0" x2="0" y2={-L * 0.95} stroke="#a9cf86" strokeWidth="1" />
          {[0.35, 0.6, 0.8].map((t) => (
            <path key={t} d={`M0 ${-L * t} L${-W * 0.55} ${-L * (t + 0.12)} M0 ${-L * t} L${W * 0.55} ${-L * (t + 0.12)}`} stroke="#a9cf86" strokeWidth="0.6" />
          ))}
        </g>
      ))}
    </g>
  )
}

export default {
  name: 'fiddle leaf fig',
  tier: 'uncommon',
  fact: "Named for its violin-shaped leaves. It's famously fussy about being moved!",
  Draw,
}
