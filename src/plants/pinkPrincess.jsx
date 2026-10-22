import { SIZE, Stalk, heartPath } from './shared.jsx'

// Pink princess philodendron: dark heart leaves splashed with bubblegum pink.
const LEAVES = [
  { a: -34, p: 28, pink: 'half' }, { a: 30, p: 32, pink: 'spots' }, { a: -2, p: 40, pink: 'spots' },
  { a: -62, p: 18, pink: 'spots' }, { a: 60, p: 20, pink: 'half' },
]

function Draw({ stage, uid }) {
  const s = SIZE[stage]
  const showPink = stage >= 2
  return LEAVES.slice(0, [0, 1, 2, 4, 5][stage]).map((l, i) => {
    const L = 26 * s
    const W = 13 * s
    const clipId = `${uid}-pp${i}`
    return (
      <Stalk key={i} a={l.a} p={l.p * s} color="#b0667a">
        <clipPath id={clipId}>
          <path d={heartPath(L, W)} />
        </clipPath>
        <path d={heartPath(L, W)} fill="#33402f" />
        {showPink && (
          <g clipPath={`url(#${clipId})`}>
            {l.pink === 'half' ? (
              <rect x="0" y={-L * 1.1} width={W * 1.2} height={L * 1.2} fill="#f2a1bd" />
            ) : (
              <>
                <ellipse cx={-W * 0.45} cy={-L * 0.55} rx={W * 0.35} ry={L * 0.18} fill="#f2a1bd" />
                <ellipse cx={W * 0.4} cy={-L * 0.35} rx={W * 0.3} ry={L * 0.12} fill="#f7c2d4" />
                <circle cx={W * 0.25} cy={-L * 0.75} r={W * 0.16} fill="#f2a1bd" />
              </>
            )}
          </g>
        )}
        <line x1="0" y1={-L * 0.15} x2="0" y2={-L * 0.92} stroke="#5d4a4a" strokeWidth="0.9" />
      </Stalk>
    )
  })
}

export default {
  name: 'pink princess philodendron',
  tier: 'legendary',
  fact: 'The pink comes from a natural quirk, so every single leaf is a surprise.',
  pot: '#f2b5c4',
  Draw,
}
