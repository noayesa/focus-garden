import { BX, BY, SIZE } from './shared.jsx'

// ZZ plant: upright stems lined with pairs of glossy, dark oval leaflets.
const STEMS = [
  { a: -12, L: 50 }, { a: 8, L: 58 }, { a: -30, L: 40 }, { a: 26, L: 44 }, { a: -2, L: 34 },
]

function Draw({ stage }) {
  const s = SIZE[stage]
  return STEMS.slice(0, [0, 1, 2, 4, 5][stage]).map((st, i) => {
    const L = st.L * s
    const pairs = [0.35, 0.5, 0.65, 0.8].filter((t) => t * L > 8)
    return (
      <g key={i} transform={`translate(${BX} ${BY}) rotate(${st.a})`}>
        <path d={`M0 0 Q2 ${-L * 0.5} 0 ${-L}`} stroke="#6b8f3e" strokeWidth="2.2" fill="none" />
        {pairs.map((t) =>
          [-1, 1].map((side) => (
            <g key={`${t}${side}`} transform={`translate(0 ${-L * t}) rotate(${side * 40})`}>
              <ellipse cx="0" cy="-6" rx="3" ry="6" fill="#2f6b34" />
              <ellipse cx="-0.8" cy="-7.5" rx="0.9" ry="2.4" fill="#fff" opacity="0.35" />
            </g>
          )),
        )}
        <g transform={`translate(0 ${-L})`}>
          <ellipse cx="0" cy="-5" rx="3" ry="6" fill="#2f6b34" />
        </g>
      </g>
    )
  })
}

export default {
  name: 'ZZ plant',
  tier: 'common',
  fact: 'It grows from potato-like roots that store water, so it shrugs off dry spells.',
  Draw,
}
