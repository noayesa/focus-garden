// Drawing helpers shared by all plant files.
//
// Every plant is drawn in a 100 x 150 box. The plant comes out of the soil at
// (BX, BY); the pot covers everything below y = 108. Smaller y = higher up.

export const BX = 50
export const BY = 112

// How big leaves are at each stage: 0 seed, 1 sprout, 2 young, 3 growing, 4 fully grown
export const SIZE = [0, 0.5, 0.68, 0.85, 1]

// A pointed oval leaf. Its base is at (0,0) and it points up.
export function leafPath(L, W) {
  return `M0 0 C${W} ${-L * 0.25} ${W * 0.8} ${-L * 0.8} 0 ${-L} C${-W * 0.8} ${-L * 0.8} ${-W} ${-L * 0.25} 0 0 Z`
}

// A heart-shaped leaf (notch at the base), pointing up.
export function heartPath(L, W) {
  return `M0 ${-L * 0.15} C${-W * 0.3} ${L * 0.05} ${-W * 1.05} ${-L * 0.05} ${-W} ${-L * 0.45} C${-W * 0.9} ${-L * 0.75} ${-W * 0.3} ${-L * 0.9} 0 ${-L} C${W * 0.3} ${-L * 0.9} ${W * 0.9} ${-L * 0.75} ${W} ${-L * 0.45} C${W * 1.05} ${-L * 0.05} ${W * 0.3} ${L * 0.05} 0 ${-L * 0.15} Z`
}

// A leaf on a little stalk, leaning `a` degrees from straight up (negative = left).
// `p` is the stalk length. Children are drawn at the end of the stalk.
export function Stalk({ a, p, color = '#5a8f4b', width = 2, x = BX, y = BY, children }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${a})`}>
      {p > 0 && <line x1="0" y1="0" x2="0" y2={-p} stroke={color} strokeWidth={width} strokeLinecap="round" />}
      <g transform={`translate(0 ${-p})`}>{children}</g>
    </g>
  )
}
