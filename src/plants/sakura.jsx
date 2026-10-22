// Cherry blossom bonsai: a twisty little trunk with clouds of pink blossoms.
const CLOUDS = [
  { x: 34, y: 70, r: 11 }, { x: 66, y: 64, r: 12 }, { x: 50, y: 52, r: 13 },
  { x: 38, y: 54, r: 10 }, { x: 62, y: 46, r: 10 }, { x: 76, y: 58, r: 8 },
]

function Draw({ stage }) {
  if (stage === 1) {
    return (
      <g>
        <path d="M50 112 q-2 -8 1 -16" stroke="#7a5236" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <circle cx="47" cy="96" r="3" fill="#8cc47a" />
        <circle cx="54" cy="94" r="3" fill="#8cc47a" />
      </g>
    )
  }
  const blooming = stage === 4
  return (
    <g>
      <path
        d="M47 112 C42 100 58 96 52 86 C47 78 40 76 36 70 M52 86 C56 78 64 72 66 64 M50 92 C54 80 50 64 50 54"
        stroke="#6b4a33"
        strokeWidth={stage === 2 ? 4 : 6}
        fill="none"
        strokeLinecap="round"
      />
      {CLOUDS.slice(0, stage === 2 ? 3 : 6).map((c, i) => (
        <g key={i}>
          <circle cx={c.x} cy={c.y} r={c.r} fill={blooming ? (i % 2 ? '#f7c6d9' : '#f4abc6') : '#86b96f'} />
          {blooming && <circle cx={c.x - c.r * 0.35} cy={c.y - c.r * 0.35} r={c.r * 0.35} fill="#fde4ee" />}
          {stage === 3 && <circle cx={c.x + 3} cy={c.y - 2} r="2" fill="#f4abc6" />}
        </g>
      ))}
      {blooming &&
        [[24, 86], [80, 80], [70, 96]].map(([x, y]) => (
          <ellipse key={x} className="petal" cx={x} cy={y} rx="2.2" ry="1.4" fill="#f4abc6" />
        ))}
    </g>
  )
}

export default {
  name: 'cherry blossom bonsai',
  tier: 'legendary',
  fact: 'Bonsai can be cared for across generations. This one blooms all year, just for you.',
  pot: '#5d6d8f',
  Draw,
}
