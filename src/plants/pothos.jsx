import { SIZE, Stalk, heartPath } from './shared.jsx'

// Golden pothos: heart-shaped leaves with yellow streaks, and vines trailing over the pot.
const UPRIGHT = [{ a: -30, p: 12 }, { a: 25, p: 14 }, { a: -2, p: 20 }, { a: -60, p: 8 }, { a: 58, p: 8 }]

function Leaf({ L, W }) {
  return (
    <g>
      <path d={heartPath(L, W)} fill="#5aa34a" />
      <path d={`M${-W * 0.2} ${-L * 0.3} q${W * 0.4} ${-L * 0.2} ${W * 0.5} ${-L * 0.5}`} stroke="#e8d77a" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <line x1="0" y1={-L * 0.15} x2="0" y2={-L * 0.9} stroke="#3f8a35" strokeWidth="0.8" />
    </g>
  )
}

function Draw({ stage }) {
  const s = SIZE[stage]
  return UPRIGHT.slice(0, [0, 2, 3, 4, 5][stage]).map((l, i) => (
    <Stalk key={i} a={l.a} p={l.p * s} color="#6aa84f">
      <Leaf L={16 * s} W={10 * s} />
    </Stalk>
  ))
}

// Vines hang in front of the pot, so they're drawn after it
function Front({ stage }) {
  const len = [0, 0, 14, 26, 38][stage]
  if (!len) return null
  return [
    { x: 22, dir: -1 },
    { x: 78, dir: 1, short: true },
  ].map((v) => {
    const l = v.short ? len * 0.7 : len
    const n = Math.max(1, Math.floor(l / 9))
    return (
      <g key={v.x}>
        <path d={`M${v.x} 110 q${v.dir * 6} ${l * 0.5} ${v.dir * 2} ${l}`} stroke="#6aa84f" strokeWidth="1.5" fill="none" />
        {Array.from({ length: n }, (_, i) => {
          const y = 112 + ((i + 1) / n) * l
          return (
            <g key={i} transform={`translate(${v.x + v.dir * 4} ${y}) rotate(${i % 2 ? 140 : 220})`}>
              <Leaf L={9} W={6} />
            </g>
          )
        })}
      </g>
    )
  })
}

export default {
  name: 'pothos',
  tier: 'common',
  fact: 'A pothos cutting in a glass of water will grow new roots in a few weeks.',
  Draw,
  Front,
}
