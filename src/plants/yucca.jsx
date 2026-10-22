import { BX, BY, leafPath } from './shared.jsx'

// Yucca: a woody trunk topped with a spiky rosette of leaves.
function Rosette({ x, y, count, L }) {
  return Array.from({ length: count }, (_, i) => {
    const a = -80 + (160 / (count - 1)) * i
    return (
      <g key={i} transform={`translate(${x} ${y}) rotate(${a})`}>
        <path d={leafPath(L, 3)} fill={i % 2 ? '#5f9e46' : '#78b35c'} />
      </g>
    )
  })
}

function Trunk({ x, h }) {
  return (
    <g>
      <rect x={x - 4} y={BY - h} width="8" height={h} rx="3" fill="#9b7a58" />
      {Array.from({ length: Math.floor(h / 6) }, (_, i) => (
        <path key={i} d={`M${x - 4} ${BY - 4 - i * 6} q4 -2 8 0`} stroke="#7d5f42" strokeWidth="0.8" fill="none" />
      ))}
    </g>
  )
}

function Draw({ stage }) {
  const h = [0, 0, 14, 30, 44][stage]
  return (
    <g>
      {stage === 4 && (
        <>
          <Trunk x={60} h={26} />
          <Rosette x={60} y={BY - 26} count={9} L={22} />
        </>
      )}
      {h > 0 && <Trunk x={BX} h={h} />}
      <Rosette x={BX} y={BY - h} count={[0, 5, 7, 9, 11][stage]} L={[0, 14, 20, 26, 30][stage]} />
    </g>
  )
}

export default {
  name: 'yucca',
  tier: 'common',
  fact: "Yuccas come from the desert, so they'd rather you forget to water them than overdo it.",
  Draw,
}
