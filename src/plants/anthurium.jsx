import { SIZE, Stalk, heartPath } from './shared.jsx'

// Anthurium: heart-shaped leaves and shiny red heart "flowers" with a yellow spike.
const LEAVES = [{ a: -38, p: 24 }, { a: 34, p: 26 }, { a: -66, p: 16 }, { a: 64, p: 18 }, { a: 2, p: 30 }]
const FLOWERS = [{ a: -14, p: 44 }, { a: 18, p: 40 }, { a: -40, p: 34 }]

function Draw({ stage }) {
  const s = SIZE[stage]
  const flowers = stage === 4 ? 3 : stage === 3 ? 1 : 0
  return (
    <g>
      {LEAVES.slice(0, [0, 2, 3, 4, 5][stage]).map((l, i) => (
        <Stalk key={i} a={l.a} p={l.p * s}>
          <path d={heartPath(22 * s, 12 * s)} fill="#2f6e3f" />
          <line x1="0" y1={-3 * s} x2="0" y2={-20 * s} stroke="#4f9060" strokeWidth="0.9" />
        </Stalk>
      ))}
      {FLOWERS.slice(0, flowers).map((f, i) => (
        <Stalk key={i} a={f.a} p={f.p * s} color="#6a9a50" width={1.6}>
          <g transform="rotate(25)">
            <path d={heartPath(15, 9)} fill="#e0303f" stroke="#b81f2e" strokeWidth="0.7" />
            <ellipse cx="-3" cy="-9" rx="2.5" ry="1.5" fill="#fff" opacity="0.45" />
            <path d="M0 -3 q3 -6 1 -12" stroke="#f3d26b" strokeWidth="2.6" fill="none" strokeLinecap="round" />
          </g>
        </Stalk>
      ))}
    </g>
  )
}

export default {
  name: 'anthurium',
  tier: 'rare',
  fact: 'The shiny red heart is a waxy leaf. The real flowers are tiny dots on the yellow spike!',
  Draw,
}
