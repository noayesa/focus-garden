import { SIZE, Stalk } from './shared.jsx'

// Alocasia 'Polly': dark arrow-shaped leaves with bright white veins.
const LEAVES = [{ a: -30, p: 34 }, { a: 26, p: 38 }, { a: -2, p: 46 }, { a: -58, p: 24 }, { a: 56, p: 26 }]

function arrow(L, W) {
  return `M0 ${-L * 0.18} C${-W * 0.4} ${-L * 0.05} ${-W} ${L * 0.06} ${-W * 0.95} ${-L * 0.2} C${-W * 0.8} ${-L * 0.55} ${-W * 0.3} ${-L * 0.85} 0 ${-L} C${W * 0.3} ${-L * 0.85} ${W * 0.8} ${-L * 0.55} ${W * 0.95} ${-L * 0.2} C${W} ${L * 0.06} ${W * 0.4} ${-L * 0.05} 0 ${-L * 0.18} Z`
}

function Draw({ stage }) {
  const s = SIZE[stage]
  return LEAVES.slice(0, [0, 1, 2, 4, 5][stage]).map((l, i) => {
    const L = 30 * s
    const W = 13 * s
    return (
      <Stalk key={i} a={l.a} p={l.p * s} color="#7a8f5a" width={2.2}>
        <path d={arrow(L, W)} fill="#1f3d2b" stroke="#cfe8d0" strokeWidth="1" />
        <line x1="0" y1={-L * 0.18} x2="0" y2={-L * 0.97} stroke="#eaf6e6" strokeWidth="1.4" />
        {[0.3, 0.5, 0.7].map((t) => (
          <path
            key={t}
            d={`M0 ${-L * t} Q${-W * 0.5} ${-L * (t + 0.02)} ${-W * 0.85} ${-L * (t - 0.06)} M0 ${-L * t} Q${W * 0.5} ${-L * (t + 0.02)} ${W * 0.85} ${-L * (t - 0.06)}`}
            stroke="#eaf6e6"
            strokeWidth="1"
            fill="none"
          />
        ))}
      </Stalk>
    )
  })
}

export default {
  name: 'alocasia Polly',
  tier: 'rare',
  fact: 'Its dark arrow leaves have glowing white veins, like a drawing come to life.',
  Draw,
}
