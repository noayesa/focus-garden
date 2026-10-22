// Bun the bunny farmer, drawn in SVG and animated with CSS (see index.css).
// activity: 'idle' | 'walk' | 'water' | 'plant' | 'cheer' | 'sad' | 'climb'

const INK = '#4a3a3a'
const FUR = '#fff8f1'
const FUR_EDGE = '#ecd2bd'

function Eyes({ face }) {
  if (face === 'happy') {
    return (
      <g>
        <path d="M62 82 q6 -7 12 0" stroke={INK} strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M86 82 q6 -7 12 0" stroke={INK} strokeWidth="3.5" fill="none" strokeLinecap="round" />
      </g>
    )
  }
  // Big sparkly eyes that blink (the .eyes class animates them)
  const look = face === 'busy' ? 3 : 0 // glance toward the plant
  return (
    <g className="eyes">
      <ellipse cx={68 + look} cy={81} rx="5.5" ry="6.5" fill={INK} />
      <ellipse cx={92 + look} cy={81} rx="5.5" ry="6.5" fill={INK} />
      <circle cx={70 + look} cy={78.5} r="2.2" fill="#fff" />
      <circle cx={94 + look} cy={78.5} r="2.2" fill="#fff" />
      <circle cx={66.5 + look} cy={83.5} r="1" fill="#fff" />
      <circle cx={90.5 + look} cy={83.5} r="1" fill="#fff" />
    </g>
  )
}

function WateringCan() {
  return (
    // Raised up so the water pours down into the pot. (Outer <g> holds the
    // position, inner <g> is rotated by CSS. CSS transforms replace SVG ones.)
    <g transform="translate(-4 -22)">
      <line x1="118" y1="160" x2="122" y2="140" stroke="#fff8f1" strokeWidth="9" strokeLinecap="round" />
      <g className="watering-can">
        <rect x="118" y="120" width="26" height="20" rx="5" fill="#9cc5a1" stroke="#6f9c76" strokeWidth="1.5" />
        <path d="M144 126 l16 -10" stroke="#6f9c76" strokeWidth="4" strokeLinecap="round" />
        <path d="M124 120 q7 -10 14 0" stroke="#6f9c76" strokeWidth="2.5" fill="none" />
        <circle className="drop d1" cx="162" cy="120" r="2" fill="#7ec8f0" />
        <circle className="drop d2" cx="164" cy="120" r="2" fill="#7ec8f0" />
        <circle className="drop d3" cx="160" cy="120" r="2" fill="#7ec8f0" />
      </g>
    </g>
  )
}

function Shovel() {
  return (
    <g>
      <g className="shovel">
        <line x1="112" y1="128" x2="150" y2="170" stroke="#a0703f" strokeWidth="4" strokeLinecap="round" />
        <rect x="106" y="122" width="12" height="5" rx="2" fill="#a0703f" transform="rotate(42 112 124)" />
        <path d="M146 166 l12 -4 l6 14 q-6 8 -14 4 z" fill="#b8c4cc" stroke="#8a979f" strokeWidth="1" />
      </g>
      <circle className="dirt t1" cx="160" cy="178" r="2.5" fill="#7a5236" />
      <circle className="dirt t2" cx="162" cy="178" r="2" fill="#8a6142" />
      <circle className="dirt t3" cx="158" cy="178" r="2.2" fill="#6b4a33" />
    </g>
  )
}

export default function Farmer({ activity }) {
  const face =
    activity === 'cheer' ? 'happy' : activity === 'sad' ? 'sad' : ['water', 'plant', 'climb'].includes(activity) ? 'busy' : 'idle'

  return (
    <div className={`farmer act-${activity}`}>
      {activity === 'cheer' && (
        <div className="hearts" aria-hidden="true">
          <span>💗</span><span>💛</span><span>💗</span>
        </div>
      )}
      <svg viewBox="0 0 170 185" aria-label={`Bun the bunny, ${activity}`}>
        <g className="bun-body">
          {/* feet (step while walking) */}
          <ellipse className="foot foot-l" cx="64" cy="176" rx="12" ry="7" fill={FUR} stroke={FUR_EDGE} strokeWidth="2" />
          <ellipse className="foot foot-r" cx="96" cy="176" rx="12" ry="7" fill={FUR} stroke={FUR_EDGE} strokeWidth="2" />

          <g className="bun-upper">
            {/* ears */}
            <g className="ear ear-left">
              <ellipse cx="64" cy="30" rx="12" ry="30" fill={FUR} stroke={FUR_EDGE} strokeWidth="2" />
              <ellipse cx="64" cy="33" rx="6" ry="20" fill="#f9c9d3" />
            </g>
            <g className="ear ear-right">
              <ellipse cx="96" cy="30" rx="12" ry="30" fill={FUR} stroke={FUR_EDGE} strokeWidth="2" />
              <ellipse cx="96" cy="33" rx="6" ry="20" fill="#f9c9d3" />
            </g>

            {/* body + blue dress */}
            <ellipse cx="80" cy="148" rx="36" ry="30" fill={FUR} stroke={FUR_EDGE} strokeWidth="2" />
            <path
              d="M58 122 q22 -6 44 0 l14 42 q-36 14 -72 0 z"
              fill="#7fb0de"
              stroke="#6a9bc9"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {/* white scalloped hem */}
            <path d="M46 162 q6 5 12 1 q6 5 12 1 q6 5 12 1 q6 5 12 1 q6 5 12 1 q6 5 10 0" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            {/* collar + bow */}
            <path d="M66 121 l14 8 l-2 -9 z M94 121 l-14 8 l2 -9 z" fill="#fff" />
            <path d="M80 128 l-6 -4 v8 z M80 128 l6 -4 v8 z" fill="#f28da6" />
            <circle cx="80" cy="128" r="2" fill="#e2708e" />
            {/* little flower on the dress */}
            <circle cx="96" cy="148" r="2.2" fill="#fff" />
            <circle cx="93.5" cy="146" r="1.6" fill="#fff" />
            <circle cx="98.5" cy="146" r="1.6" fill="#fff" />
            <circle cx="96" cy="146.8" r="1.2" fill="#f6c445" />
            {/* left paw */}
            <ellipse cx="46" cy="140" rx="8" ry="10" fill={FUR} stroke={FUR_EDGE} strokeWidth="2" />

            {/* right paw + tool */}
            {activity === 'water' && <WateringCan />}
            {activity === 'plant' && <Shovel />}
            <ellipse cx="114" cy="138" rx="8" ry="10" fill={FUR} stroke={FUR_EDGE} strokeWidth="2" />

            {/* head */}
            <circle cx="80" cy="88" r="38" fill={FUR} stroke={FUR_EDGE} strokeWidth="2" />
            {/* straw hat */}
            <ellipse cx="80" cy="56" rx="46" ry="9" fill="#e9c46a" stroke="#d4a94a" strokeWidth="1.5" />
            <path d="M57 56 q23 -30 46 0 z" fill="#f4d58d" stroke="#d4a94a" strokeWidth="1.5" />
            <rect x="58" y="49" width="44" height="6" rx="2" fill="#f28da6" />
            <circle cx="98" cy="50" r="4" fill="#fff" />
            <circle cx="98" cy="50" r="1.8" fill="#f6c445" />

            <Eyes face={face} />
            {/* cheeks */}
            <ellipse cx="56" cy="96" rx="7" ry="5" fill="#f9b8c6" opacity="0.85" />
            <ellipse cx="104" cy="96" rx="7" ry="5" fill="#f9b8c6" opacity="0.85" />
            {/* nose + mouth */}
            <path d="M77 91 h6 l-3 3 z" fill="#e88c9a" />
            {face === 'sad' ? (
              <path d="M74 102 q6 -5 12 0" stroke={INK} strokeWidth="2.5" fill="none" strokeLinecap="round" />
            ) : (
              <path d="M74 96 q3 4 6 0 q3 4 6 0" stroke={INK} strokeWidth="2.5" fill="none" strokeLinecap="round" />
            )}
            {face === 'happy' && <path d="M76 99 q4 7 8 0 z" fill="#f28da6" />}
            {face === 'sad' && <path className="tear" d="M62 88 q-3 6 0 8 q3 -2 0 -8" fill="#9ed4f5" />}
          </g>
        </g>
      </svg>
    </div>
  )
}
