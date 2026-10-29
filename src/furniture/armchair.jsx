// Armchair: a plump sage armchair with a cream seat cushion, wooden legs and bunny ears on the backrest.
const W = 124
const H = 112
const SAGE = '#9cc5a1'
const SAGE_DARK = '#86b28c'
const WOOD = '#a87149'
// Ears on top of the backrest: x, tilt in degrees
const EARS = [{ x: 46, tilt: -12 }, { x: 78, tilt: 12 }]
// Tufting buttons on the backrest
const BUTTONS = [[46, 52], [62, 48], [78, 52]]

function Draw() {
  return (
    <g>
      {/* soft shadow so it sits on the floor */}
      <ellipse cx={W / 2} cy={H - 3} rx={W / 2 - 6} ry="4" fill="#00000014" />

      {/* short tapered legs */}
      <path d={`M20 96 h9 l-2 ${H - 96} h-5 z`} fill={WOOD} />
      <path d={`M95 96 h9 l-2 ${H - 96} h-5 z`} fill={WOOD} />

      {/* bunny ears behind the backrest */}
      {EARS.map((e) => (
        <g key={e.x} transform={`rotate(${e.tilt} ${e.x} 34)`}>
          <ellipse cx={e.x} cy="20" rx="9" ry="18" fill={SAGE} />
          <ellipse cx={e.x} cy="22" rx="4.5" ry="12" fill="#f2b5c4" />
        </g>
      ))}

      {/* backrest */}
      <rect x="22" y="28" width="80" height="58" rx="24" fill={SAGE} />
      {BUTTONS.map(([x, y]) => <circle key={x} cx={x} cy={y} r="2" fill={SAGE_DARK} />)}
      <ellipse cx="40" cy="38" rx="9" ry="4" fill="#fff" opacity="0.35" transform="rotate(-20 40 38)" />

      {/* base under the seat */}
      <rect x="12" y="78" width="100" height="20" rx="8" fill={SAGE_DARK} />

      {/* plump seat cushion: a darker front edge under a puffy top, with a small highlight */}
      <rect x="26" y="70" width="72" height="16" rx="8" fill="#efd3b4" />
      <rect x="26" y="64" width="72" height="17" rx="8.5" fill="#fbe6cf" />
      <ellipse cx="46" cy="69" rx="9" ry="2.5" fill="#fff" opacity="0.6" />

      {/* armrests, with a rolled top */}
      <rect x="6" y="54" width="26" height="44" rx="12" fill={SAGE} />
      <rect x="92" y="54" width="26" height="44" rx="12" fill={SAGE} />
      <ellipse cx="19" cy="58" rx="12" ry="5" fill={SAGE_DARK} opacity="0.5" />
      <ellipse cx="105" cy="58" rx="12" ry="5" fill={SAGE_DARK} opacity="0.5" />
    </g>
  )
}

export default {
  name: 'bunny armchair',
  price: 55,
  width: W,
  height: H,
  blurb: 'Comfy enough for a well-earned bunny nap.',
  Draw,
}
