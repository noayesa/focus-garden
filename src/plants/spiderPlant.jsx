import { BX, BY, SIZE } from './shared.jsx'

// Spider plant: arching striped leaves, and baby plantlets dangling on runners.
function Draw({ stage }) {
  const s = SIZE[stage]
  const n = [0, 4, 7, 10, 12][stage]
  return Array.from({ length: n }, (_, i) => {
    const side = i % 2 ? 1 : -1
    const k = Math.floor(i / 2)
    // inner leaves stand tall, outer ones arch out and droop over the rim
    const c = `${BX + side * (2 + k * 4)} ${BY - (52 - k * 5) * s}`
    const e = `${BX + side * (6 + k * 8) * s} ${BY - (42 - k * 8) * s}`
    const d = `M${BX} ${BY} Q${c} ${e}`
    return (
      <g key={i}>
        <path d={d} stroke="#5e9e45" strokeWidth="3.2" fill="none" strokeLinecap="round" />
        <path d={d} stroke="#f2f5df" strokeWidth="1" fill="none" strokeLinecap="round" />
      </g>
    )
  })
}

function Baby({ x, y }) {
  return [-50, -15, 20, 55].map((a) => (
    <path key={a} d={`M${x} ${y} l${Math.sin((a * Math.PI) / 180) * 8} ${-Math.cos((a * Math.PI) / 180) * 8}`} stroke="#5e9e45" strokeWidth="2" strokeLinecap="round" />
  ))
}

// The runners with babies hang in front of the pot
function Front({ stage }) {
  if (stage < 4) return null
  return (
    <g>
      <path d="M62 108 Q86 100 88 134" stroke="#c9d6a8" strokeWidth="1.2" fill="none" />
      <Baby x={88} y={136} />
      <path d="M40 108 Q16 104 14 126" stroke="#c9d6a8" strokeWidth="1.2" fill="none" />
      <Baby x={14} y={128} />
    </g>
  )
}

export default {
  name: 'spider plant',
  tier: 'common',
  fact: 'Those dangling babies are real plants. Pop one in soil and it grows on its own!',
  Draw,
  Front,
}
