import { SIZE, Stalk } from './shared.jsx'

// Monstera deliciosa: big heart-ish leaves that only get their splits once mature.
export const MONSTERA_LEAVES = [
  { a: -5, p: 44, L: 34, W: 20 }, { a: -38, p: 30, L: 34, W: 20 },
  { a: 34, p: 34, L: 36, W: 21 }, { a: -68, p: 22, L: 28, W: 17 },
  { a: 66, p: 24, L: 28, W: 17 },
]

export function monsteraShape(L, W) {
  return `M0 0 C${W} 6 ${W * 1.1} ${-L * 0.7} 0 ${-L} C${-W * 1.1} ${-L * 0.7} ${-W} 6 0 0 Z`
}

// Black shapes cut the splits and holes out of the leaf (used inside a <mask>)
export function MonsteraHoles({ L, W }) {
  return [0.28, 0.48, 0.68].map((t) =>
    [-1, 1].map((side) => (
      <g key={`${t}${side}`}>
        <ellipse cx={side * W * 0.72} cy={-L * t} rx={W * 0.38} ry={1.4} fill="#000" transform={`rotate(${side * -18} ${side * W * 0.72} ${-L * t})`} />
        <ellipse cx={side * W * 0.28} cy={-L * (t + 0.09)} rx={1.8} ry={1.2} fill="#000" />
      </g>
    )),
  )
}

function Draw({ stage, uid }) {
  const s = SIZE[stage]
  const holes = stage >= 3 // young monsteras don't have splits yet!
  return MONSTERA_LEAVES.slice(0, [0, 1, 2, 4, 5][stage]).map((l, i) => {
    const L = l.L * s
    const W = l.W * s
    const maskId = `${uid}-m${i}`
    return (
      <Stalk key={i} a={l.a} p={l.p * s} color="#4e8a4a">
        {holes && (
          <mask id={maskId} maskUnits="userSpaceOnUse" x={-W * 1.5} y={-L * 1.2} width={W * 3} height={L * 1.5}>
            <rect x={-W * 1.5} y={-L * 1.2} width={W * 3} height={L * 1.5} fill="#fff" />
            <MonsteraHoles L={L} W={W} />
          </mask>
        )}
        <path d={monsteraShape(L, W)} fill="#2f7d46" mask={holes ? `url(#${maskId})` : undefined} />
        <line x1="0" y1="2" x2="0" y2={-L * 0.95} stroke="#5aa86b" strokeWidth="1.2" />
      </Stalk>
    )
  })
}

export default {
  name: 'Swiss cheese plant',
  tier: 'uncommon',
  fact: 'The famous holes only appear as the plant grows up. Babies have plain leaves!',
  Draw,
}
