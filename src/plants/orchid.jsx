import { BY, Stalk, leafPath } from './shared.jsx'

// Phalaenopsis: broad flat leaves at the base and an arching spike of flowers.
const LEAVES = [
  { a: -66, L: 32, W: 10 }, { a: 62, L: 30, W: 10 },
  { a: -40, L: 26, W: 9 }, { a: 38, L: 25, W: 9 },
]
const LEAF_SIZE = [0, 0.7, 0.82, 0.92, 1] // orchids start with fairly big leaves
const SPIKE = [[54, 70], [56, 52], [64, 42], [74, 40], [83, 44]]

function Flower({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {[0, 120, 240].map((r) => (
        <ellipse key={r} cx="0" cy="-6" rx="3.2" ry="6" fill="#fff" stroke="#f0c9da" strokeWidth="0.6" transform={`rotate(${r + 180})`} />
      ))}
      <ellipse cx="-5" cy="-1" rx="5.5" ry="5" fill="#fff" stroke="#f0c9da" strokeWidth="0.6" />
      <ellipse cx="5" cy="-1" rx="5.5" ry="5" fill="#fff" stroke="#f0c9da" strokeWidth="0.6" />
      <ellipse cx="0" cy="2" rx="2.6" ry="3.2" fill="#c2387a" />
      <circle cx="0" cy="-0.5" r="1.2" fill="#f6c445" />
    </g>
  )
}

function Draw({ stage }) {
  const s = LEAF_SIZE[stage]
  return (
    <g>
      {stage >= 3 && (
        <>
          <path d="M50 110 Q52 80 54 70 Q56 52 64 42 Q74 36 83 44" stroke="#7a8b45" strokeWidth="1.8" fill="none" />
          <line x1="50" y1="110" x2="53" y2="68" stroke="#8b6a4a" strokeWidth="1" />
        </>
      )}
      {stage === 3 && SPIKE.slice(2).map(([x, y]) => <circle key={x} cx={x} cy={y} r="2.6" fill="#e6f0d5" stroke="#9db26b" strokeWidth="0.8" />)}
      {stage === 4 && (
        <>
          <circle cx="83" cy="44" r="2.4" fill="#e6f0d5" stroke="#9db26b" strokeWidth="0.8" />
          {SPIKE.slice(1, 4).map(([x, y]) => <Flower key={x} x={x} y={y} />)}
        </>
      )}
      {LEAVES.slice(0, [0, 2, 3, 4, 4][stage]).map((l, i) => (
        <Stalk key={i} a={l.a} p={0} y={BY - 3}>
          <path d={leafPath(l.L * s, l.W * s)} fill="#4f8a3c" />
          <path d={`M0 0 L0 ${-l.L * s * 0.9}`} stroke="#6fa85a" strokeWidth="1" />
        </Stalk>
      ))}
    </g>
  )
}

export default {
  name: 'moth orchid',
  tier: 'rare',
  fact: 'Its flowers can last for months, and with patience it will bloom again.',
  pot: '#f5f1ea',
  Draw,
}
