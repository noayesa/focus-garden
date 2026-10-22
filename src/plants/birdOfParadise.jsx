import { SIZE, Stalk, leafPath } from './shared.jsx'

// Bird of paradise: long paddle leaves and a flower shaped like a tropical bird.
const LEAVES = [
  { a: -28, p: 34 }, { a: 22, p: 38 }, { a: -50, p: 24 }, { a: 48, p: 26 }, { a: -6, p: 44 },
]

function Flower() {
  // drawn around (64, 50), at the end of a stem
  return (
    <g>
      <path d="M46 54 q12 4 28 -3 l-2 4 q-14 5 -26 -1 z" fill="#5f7d5a" />
      <path d="M58 52 L52 36 L61 50 Z M60 51 L60 33 L64 50 Z M62 51 L69 36 L66 51 Z" fill="#f39237" stroke="#e07a22" strokeWidth="0.6" />
      <path d="M61 52 L73 43 L66 53 Z" fill="#4a6fd1" />
    </g>
  )
}

function Draw({ stage }) {
  const s = SIZE[stage]
  return (
    <g>
      {stage === 4 && (
        <>
          <path d="M50 112 Q54 80 50 54" stroke="#6a8f4a" strokeWidth="2" fill="none" />
          <Flower />
        </>
      )}
      {LEAVES.slice(0, [0, 2, 3, 4, 5][stage]).map((l, i) => {
        const L = 28 * s
        const W = 8 * s
        return (
          <Stalk key={i} a={l.a} p={l.p * s} color="#5f8f4e">
            <path d={leafPath(L, W)} fill="#3e7a4a" />
            <line x1="0" y1="0" x2="0" y2={-L} stroke="#a7cf96" strokeWidth="0.9" />
            {/* the leaves naturally tear into strips */}
            <path d={`M${W * 0.75} ${-L * 0.5} l${-W * 0.35} ${-L * 0.06} M${-W * 0.7} ${-L * 0.65} l${W * 0.3} ${-L * 0.05}`} stroke="#fbeee0" strokeWidth="0.9" />
          </Stalk>
        )
      })}
    </g>
  )
}

export default {
  name: 'bird of paradise',
  tier: 'rare',
  fact: "Its flower looks like a tropical bird's head, complete with an orange crest.",
  Draw,
}
