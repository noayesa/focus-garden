import { SIZE, Stalk } from './shared.jsx'
import { MONSTERA_LEAVES, MonsteraHoles, monsteraShape } from './monstera.jsx'

// Variegated monstera ('Albo'): a Swiss cheese plant with creamy white patches.
const PATCHES = ['half', 'splash', 'splash', 'half', 'splash']

function Draw({ stage, uid }) {
  const s = SIZE[stage]
  const holes = stage >= 3
  return MONSTERA_LEAVES.slice(0, [0, 1, 2, 4, 5][stage]).map((l, i) => {
    const L = l.L * s
    const W = l.W * s
    const maskId = `${uid}-ma${i}`
    const clipId = `${uid}-mc${i}`
    const box = { x: -W * 1.5, y: -L * 1.2, width: W * 3, height: L * 1.5 }
    return (
      <Stalk key={i} a={l.a} p={l.p * s} color="#9cb98a">
        <mask id={maskId} maskUnits="userSpaceOnUse" {...box}>
          <rect {...box} fill="#fff" />
          {holes && <MonsteraHoles L={L} W={W} />}
        </mask>
        <clipPath id={clipId}>
          <path d={monsteraShape(L, W)} />
        </clipPath>
        <g mask={`url(#${maskId})`}>
          <path d={monsteraShape(L, W)} fill="#2f7d46" />
          <g clipPath={`url(#${clipId})`}>
            {PATCHES[i] === 'half' ? (
              <rect x={-W * 1.2} y={-L * 1.1} width={W * 1.2} height={L * 1.3} fill="#f6f3e4" />
            ) : (
              <>
                <ellipse cx={W * 0.4} cy={-L * 0.6} rx={W * 0.4} ry={L * 0.2} fill="#f6f3e4" />
                <ellipse cx={-W * 0.5} cy={-L * 0.3} rx={W * 0.3} ry={L * 0.1} fill="#e3eed3" />
              </>
            )}
          </g>
          {/* outline, so the white parts still read as leaf */}
          <path d={monsteraShape(L, W)} fill="none" stroke="#5e9b62" strokeWidth="1" />
        </g>
        <line x1="0" y1="2" x2="0" y2={-L * 0.95} stroke="#a5cf9f" strokeWidth="1.2" />
      </Stalk>
    )
  })
}

export default {
  name: 'variegated monstera',
  tier: 'legendary',
  fact: 'The white parts can’t make food from light, so each leaf is a delicate balance. Collectors adore it!',
  pot: '#f3e3c3',
  Draw,
}
