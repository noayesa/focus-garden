import { SIZE, Stalk, heartPath } from './shared.jsx'

// String of hearts: thin purple strands with pairs of silver-marbled heart leaves,
// and little pink lantern flowers once it's fully grown.
const TUFT = [{ a: -40, p: 5 }, { a: 35, p: 6 }, { a: -10, p: 7 }, { a: 65, p: 4 }, { a: -70, p: 4 }]
const STRANDS = [
  { x: 27, len: 32 }, { x: 72, len: 34 }, { x: 36, len: 24 }, { x: 64, len: 26 }, { x: 45, len: 16 }, { x: 80, len: 20 },
]
const GROWTH = [0, 0.3, 0.5, 0.75, 1]
// Which strand nodes get a flower (strand index, node index)
const FLOWERS = [[0, 1], [1, 2], [3, 1]]
const STEM = '#8d5a80'

function Heart({ L = 6.5, W = 5 }) {
  return (
    <g>
      <path d={heartPath(L, W)} fill="#46704b" />
      <path d={heartPath(L * 0.5, W * 0.5)} transform={`translate(0 ${-L * 0.25})`} fill="#b3c7b6" />
    </g>
  )
}

// A little lantern hanging below a leaf pair: a pink bulb, a tube and a dark purple tip
function Lantern({ bud }) {
  if (bud) return <ellipse cx="0" cy="5" rx="1.5" ry="2" fill="#dc94b8" />
  return (
    <g>
      <line x1="0" y1="0" x2="0" y2="3" stroke={STEM} strokeWidth="0.5" />
      <ellipse cx="0" cy="5" rx="2.2" ry="2" fill="#e59bbf" />
      <path d="M-1 6.5 L-0.8 12 L0.8 12 L1 6.5 Z" fill="#f2c4d9" />
      <path d="M-1.6 12 Q0 10 1.6 12 Q0 14.6 -1.6 12 Z" fill="#6b2f62" />
    </g>
  )
}

function Draw({ stage }) {
  const s = SIZE[stage]
  return TUFT.slice(0, [0, 2, 3, 4, 5][stage]).map((l, i) => (
    <Stalk key={i} a={l.a} p={l.p * s} color={STEM} width={0.8}>
      <Heart L={8 * s} W={6.5 * s} />
    </Stalk>
  ))
}

// The strands hang down in front of the pot
function Front({ stage }) {
  const g = GROWTH[stage]
  return STRANDS.slice(0, [0, 1, 2, 4, 6][stage]).map((st, si) => {
    const len = st.len * g
    const nodes = Math.max(1, Math.floor(len / 8))
    const sway = st.x < 50 ? -1 : 1
    const at = (t) => [st.x + sway * 3 * Math.sin(t * Math.PI), 109 + t * len]
    return (
      <g key={st.x}>
        <path d={`M${st.x} 109 q${sway * 3} ${len / 2} ${sway * 0.5} ${len}`} stroke={STEM} strokeWidth="0.6" fill="none" />
        {Array.from({ length: nodes }, (_, i) => {
          const [x, y] = at((i + 1) / nodes)
          return (
            <g key={i} transform={`translate(${x} ${y})`}>
              <g transform="rotate(-115)"><Heart /></g>
              <g transform="rotate(115)"><Heart /></g>
            </g>
          )
        })}
        {/* Flowers go on top so the leaves below don't cover them */}
        {stage >= 3 && FLOWERS.filter(([fs, fn]) => fs === si && fn < nodes).map(([, fn]) => {
          const [x, y] = at((fn + 1) / nodes)
          return (
            <g key={`f${fn}`} transform={`translate(${x} ${y})`}>
              <Lantern bud={stage === 3} />
            </g>
          )
        })}
      </g>
    )
  })
}

export default {
  name: 'string of hearts',
  tier: 'rare',
  fact: 'Its vines grow little bead-like tubers that can root into brand new plants.',
  pot: '#f2b5c4',
  Draw,
  Front,
}
