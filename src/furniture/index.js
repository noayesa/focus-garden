// The furniture catalog. Each item lives in its own file in this folder and exports:
//   { name, price, width, height, flat?, blurb, Draw }
// width and height are the item's size in the room, in pixels; Draw paints it in a
// box of that size (viewBox 0 0 width height). flat items (rugs) lie on the floor
// behind everything else.
// To add an item: create its file, then import it and add it to FURNITURE below.

import armchair from './armchair.jsx'
import rug from './rug.jsx'

// The keys are the ids saved in your room, so don't rename existing ones.
// Listed cheapest first; the shop shows them in this order.
export const FURNITURE = {
  rug,
  armchair,
}

// Selling an item back to the shop returns half of what you paid
export function sellBackPrice(type) {
  return Math.floor(FURNITURE[type].price / 2)
}
