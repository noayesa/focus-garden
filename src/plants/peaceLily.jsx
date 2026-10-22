import { SIZE, Stalk, leafPath } from './shared.jsx'

// Peace lily: glossy dark leaves and white "flowers" (spathes) on tall stems.
const LEAVES = [-50, 46, -20, 18, -72, 70, -2, -36, 34]
const FLOWERS = [{ a: -10, p: 50 }, { a: 14, p: 44 }, { a: -26, p: 38 }]

function Draw({ stage }) {
  const s = SIZE[stage]
  const flowers = stage === 4 ? 3 : stage === 3 ? 1 : 0
  return (
    <g>
      {LEAVES.slice(0, [0, 2, 4, 7, 9][stage]).map((a, i) => (
        <Stalk key={i} a={a} p={8 * s}>
          <path d={leafPath(32 * s, 9 * s)} fill="#2f6b3a" />
          <line x1="0" y1="0" x2="0" y2={-30 * s} stroke="#4e8c55" strokeWidth="0.9" />
        </Stalk>
      ))}
      {FLOWERS.slice(0, flowers).map((f, i) => (
        <Stalk key={i} a={f.a} p={f.p * s} color="#6aa060" width={1.6}>
          {stage === 3 ? (
            <path d={leafPath(9, 3)} fill="#d9ead0" />
          ) : (
            <g>
              <path d={leafPath(16, 7)} fill="#fbfbf4" stroke="#e1e6d4" strokeWidth="0.8" />
              <ellipse cx="0" cy="-5" rx="1.8" ry="5" fill="#f1e2a8" />
            </g>
          )}
        </Stalk>
      ))}
    </g>
  )
}

export default {
  name: 'peace lily',
  tier: 'uncommon',
  fact: 'It droops dramatically when thirsty, then perks right back up after a drink.',
  Draw,
}
