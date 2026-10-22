import { useId } from 'react'
import { PLANTS } from '../plants/index.js'
import { BX, BY } from '../plants/shared.jsx'

// Draws one potted plant at a growth stage: 0 seed, 1 sprout, 2 young, 3 growing,
// 4 fully grown. The plant drawings themselves live in src/plants/.
// With no `type` it draws an empty pot of soil.

const POT_COLORS = ['#e48a5f', '#f3e3c3', '#9cc5a1', '#f2b5c4', '#a9c4e8']

export default function Plant({ type, stage = 0, wilted, potIndex = 0, justGrew }) {
  const uid = useId().replace(/:/g, '')
  const plant = PLANTS[type]
  const pot = plant?.pot || POT_COLORS[potIndex % POT_COLORS.length]
  const stageName = ['seed', 'sprout', 'young', 'growing', 'fully grown'][stage]
  const label = plant ? `${plant.name}, ${stageName}${wilted ? ', drooping' : ''}` : 'empty pot'
  const Front = plant?.Front

  return (
    <svg viewBox="0 0 100 150" className={`plant ${wilted ? 'wilted' : ''}`} aria-label={label}>
      {/* re-keyed on stage so each new stage pops in */}
      <g key={stage} className={`plant-body ${justGrew ? 'grow-pop' : ''}`}>
        {!plant ? null : stage === 0 ? (
          <g>
            <ellipse cx={BX} cy={BY - 1} rx="5" ry="3" fill="#8a6142" />
            <path d={`M${BX} ${BY - 2} q-1 -8 -6 -10 q5 0 6 6 q1 -6 7 -7 q-5 3 -7 11`} fill="#7cc06b" />
          </g>
        ) : (
          <plant.Draw stage={stage} uid={uid} />
        )}
      </g>

      {/* Pot */}
      <path d="M22 116 h56 l-6 32 h-44 z" fill={pot} stroke="#00000022" strokeWidth="1" />
      <rect x="18" y="108" width="64" height="10" rx="3" fill={pot} stroke="#00000022" strokeWidth="1" />
      <ellipse cx={BX} cy={110} rx="27" ry="2.8" fill="#6b4a33" />

      {/* Anything that hangs over the pot (trailing vines etc.) */}
      {Front && stage > 0 && (
        <g className={wilted ? 'front-wilted' : ''}>
          <Front stage={stage} uid={uid} />
        </g>
      )}
    </svg>
  )
}
