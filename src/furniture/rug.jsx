// Rug: an oval braided rug in peach, cream and sage rings, seen from the side so it's squashed flat.
const W = 150
const H = 26
const RINGS = [
  { s: 1, fill: '#e9967a' },
  { s: 0.86, fill: '#fbe6cf' },
  { s: 0.72, fill: '#a9c99a' },
  { s: 0.56, fill: '#fbe6cf' },
  { s: 0.4, fill: '#f2b49a' },
]

function Draw() {
  const cx = W / 2
  const cy = H / 2 + 1
  return (
    <g>
      {/* soft shadow so it sits on the floor */}
      <ellipse cx={cx} cy={cy + 2} rx={W / 2 - 2} ry={H / 2 - 2} fill="#00000014" />
      {RINGS.map((r) => (
        <ellipse key={r.s} cx={cx} cy={cy} rx={(W / 2 - 3) * r.s} ry={(H / 2 - 3) * r.s} fill={r.fill} />
      ))}
      {/* little braid stitches around the outer ring */}
      {Array.from({ length: 14 }, (_, i) => {
        const a = (i / 14) * Math.PI * 2
        return (
          <ellipse
            key={i}
            cx={cx + Math.cos(a) * (W / 2 - 8)}
            cy={cy + Math.sin(a) * (H / 2 - 5)}
            rx="2.5"
            ry="1"
            fill="#fff"
            opacity="0.45"
          />
        )
      })}
    </g>
  )
}

export default {
  name: 'braided rug',
  price: 12,
  width: W,
  height: H,
  flat: true,
  blurb: 'Soft and round, perfect for little bunny feet.',
  Draw,
}
