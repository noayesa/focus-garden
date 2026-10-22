import { SIZE, Stalk, leafPath } from './shared.jsx'

// Monstera adansonii (Swiss cheese vine): long oval leaves full of holes, trailing over the pot.
const LEAVES = [
  { a: -35, p: 20, L: 28 }, { a: 30, p: 24, L: 30 }, { a: -5, p: 30, L: 28 },
  { a: -62, p: 12, L: 22 }, { a: 60, p: 14, L: 22 },
]
const VINES = [
  { x: 24, dir: -1, len: 1 },
  { x: 76, dir: 1, len: 0.75 },
]
const VINE_LENGTH = [0, 0, 12, 24, 36]

// A leaf with oval holes that stay inside the edge (unlike its big cousin's splits)
function HoleyLeaf({ L, W, id, rows }) {
  const box = { x: -W * 1.5, y: -L * 1.1, width: W * 3, height: L * 1.3 }
  const ts = [[], [0.5], [0.4, 0.62], [0.3, 0.5, 0.7]][rows]
  return (
    <g>
      {rows > 0 && (
        <mask id={id} maskUnits="userSpaceOnUse" {...box}>
          <rect {...box} fill="#fff" />
          {ts.map((t) =>
            [-1, 1].map((side) => (
              // kept well inside the edge so they read as holes, not splits
              <ellipse
                key={`${t}${side}`}
                cx={side * W * 0.34}
                cy={-L * t}
                rx={W * 0.14}
                ry={L * 0.065}
                transform={`rotate(${side * -30} ${side * W * 0.34} ${-L * t})`}
                fill="#000"
              />
            )),
          )}
        </mask>
      )}
      <path d={leafPath(L, W)} fill="#5aa84e" mask={rows > 0 ? `url(#${id})` : undefined} />
      <line x1="0" y1="0" x2="0" y2={-L * 0.95} stroke="#8fd07a" strokeWidth="1" />
    </g>
  )
}

function Draw({ stage, uid }) {
  const s = SIZE[stage]
  const rows = [0, 0, 2, 3, 3][stage] // holes show up once the leaves have some size
  return LEAVES.slice(0, [0, 2, 3, 4, 5][stage]).map((l, i) => {
    const L = l.L * s
    return (
      <Stalk key={i} a={l.a} p={l.p * s} color="#5f9a4a">
        <HoleyLeaf L={L} W={L * 0.44} id={`${uid}-ad${i}`} rows={rows} />
      </Stalk>
    )
  })
}

// Vines trailing over the rim, drawn in front of the pot
function Front({ stage, uid }) {
  const length = VINE_LENGTH[stage]
  if (!length) return null
  return VINES.map((v, vi) => {
    const l = length * v.len
    const n = Math.max(1, Math.floor(l / 10))
    return (
      <g key={v.x}>
        <path d={`M${v.x} 110 q${v.dir * 6} ${l * 0.5} ${v.dir * 2} ${l}`} stroke="#5f9a4a" strokeWidth="1.5" fill="none" />
        {Array.from({ length: n }, (_, i) => (
          <g key={i} transform={`translate(${v.x + v.dir * 4} ${112 + ((i + 1) / n) * l}) rotate(${i % 2 ? 145 : 215})`}>
            <HoleyLeaf L={13} W={6} id={`${uid}-av${vi}${i}`} rows={stage >= 3 ? 2 : 1} />
          </g>
        ))}
      </g>
    )
  })
}

export default {
  name: 'monstera adansonii',
  tier: 'uncommon',
  fact: "Its big cousin's holes split the leaf edge, but this vine's holes stay inside, like lace.",
  pot: '#a9c4e8',
  Draw,
  Front,
}
