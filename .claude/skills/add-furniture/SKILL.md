---
name: add-furniture
description: Add a new piece of furniture or decor to the Focus Garden shop. Draws it as a cozy SVG at bunny size, gives it a price and a short blurb, registers it in the furniture catalog so it appears in the shop, and checks it visually next to Bun in the furniture gallery. Use this whenever the user wants something new to buy or place in Bun's room (a chair, lamp, rug, table, bed, basket, shelf, decoration), even if they just name an item ("add an armchair", "can Bun have a bed?", "more cheap furniture please", "/add-furniture floor lamp 30").
argument-hint: <item name> [price] [notes]
---

# Add furniture to Focus Garden

Each furniture item is one file in `src/furniture/` that draws the item, plus one line in the
catalog `src/furniture/index.js`. The shop lists everything in the catalog automatically, and
bought items stand on the floor of Bun's room, where people drag them around.

The person using this skill cares most about three things: items look **cozy and match the
plants and Bun**, they share **one colour palette** so the room looks put together, and they
have **little bunny touches** where they fit. Items must also be the right size next to Bun, so
most of the effort goes into the drawing and checking it with your own eyes.

## Inputs

From the request, work out:
- **Item name**: required. If several items are named, do each one in turn.
- **Price** (optional): if not given, pick one using the guide below and say which you picked.
- **Notes** (optional): a colour, a material, a style wish ("pink armchair", "wicker basket").

### Choosing a price

Coins come from selling plants: common 3, uncommon 8, rare 20, legendary 50. Price items by
size and fanciness, so bigger and more special pieces are real goals:
- **small decor, 10 to 20**: rug (12), cushion, carrot basket, small plant stand
- **everyday furniture, 20 to 45**: side table, floor lamp, stool, bunny bed
- **big or special pieces, 50 to 90**: armchair, bookshelf, record player
- **showpieces, 100 and up**: things that change the whole room, like a big arched mirror

As a feel check: small decor costs a handful of common plants or one or two uncommon ones,
everyday furniture one or two rare ones, a big piece like the armchair (55) about one
legendary, and a showpiece two legendary or more.
Look at the prices already in `src/furniture/index.js` and keep similar items at similar prices.

## Steps

### 1. Read before drawing

- `src/furniture/index.js`: the catalog and the export shape. Check the item isn't already in
  it, including under another name (couch = sofa, bunny bed = pet bed). If it exists, say so
  and offer a different colour or item instead.
- One or two existing items with a similar shape, to copy their structure and level of detail.
  `rug.jsx` is the example of a flat item; use the closest standing item once there are some.
- If `src/dev/FurnitureGallery.jsx` doesn't exist yet, set it up first by following
  [gallery-setup.md](gallery-setup.md). This only happens once.

### 2. Picture the real object

Before writing code, note in one or two lines what makes this item recognisable at a glance:
its outline, the parts that stick out (legs, armrests, a lampshade), and its material. A tiny
shop thumbnail must still read as "armchair", so the outline matters more than small details.

Also decide one bunny touch that fits naturally, such as a carrot print on a cushion, ear
shapes on a headboard, or a pink heart. One is enough; skip it if it would look forced.

### 3. Write `src/furniture/<camelCaseId>.jsx`

The file's default export must have this shape:

```jsx
export default {
  name: 'braided rug',  // lowercase; the shop capitalises it
  price: 12,
  width: 150,           // the item's size in the room, in pixels
  height: 26,
  flat: true,           // optional: only for things that lie on the floor (rugs, mats)
  blurb: 'Soft and round, perfect for little bunny feet.',
  Draw,                 // required: ({ uid }) => SVG elements in a box of width x height
}
```

`Draw` paints into a box `width` wide and `height` tall (viewBox `0 0 width height`). Smaller
y means higher up, and the bottom edge of the box is the floor the item stands on, so legs and
bases should touch y = height.

**Size it next to Bun.** Bun is about 140px tall (ears included) and 130px wide, and the floor
pot is 130px wide. Furniture is bunny-sized, so Bun could really use it:
- seats and beds: about Bun's height or lower, 90 to 140px tall
- tables and stools: about Bun's waist, 50 to 70px tall
- lamps, shelves and tall pieces: up to 190px tall, never more, or they hit the shelves above
- nothing wider than 170px, so the floor doesn't fill up after two items

Drawing rules, and why they matter:
- **Use the room's palette**, so every item looks like part of one room:
  peach `#e9967a` `#f4a582`, cream `#fbe6cf`, sage `#a9c99a` `#9cc5a1`, soft wood `#c48a5a`
  `#a87149`, bunny pink `#f2b5c4` `#f28da6`, and white for highlights. A slightly darker
  shade of the same colour is fine for shadows and the undersides of things.
- **Use flat, soft colours**, plus at most a small white highlight. Match the cozy style of the
  plants and Bun: no gradients, no thin outlines everywhere.
- **Add a soft shadow ellipse at the bottom** (`fill="#00000014"`, as in `rug.jsx`), so the
  item sits on the floor instead of floating.
- **Any `<clipPath>`, `<mask>` or `<pattern>` id must include `uid`** (for example
  `` `${uid}-cushion` ``). The same item can be in the room and in the shop at once, and SVG ids
  that clash make the pattern vanish from every copy except one.
- Name the arrays and sizes at the top of the file (for example `const W = 120`) and add a
  one-line comment saying what the item is, like `rug.jsx` does.

### 4. Write the blurb

One short line, under about 60 characters, shown under the name in the shop. Cozy and a little
playful, ideally about Bun ("Soft and round, perfect for little bunny feet."). No prices or
sizes in it; the shop shows those.

### 5. Register it

In `src/furniture/index.js`, import the file (imports are alphabetical) and add the id to
`FURNITURE` in price order, cheapest first, because the shop shows them in that order. The key
becomes the id stored in people's saved rooms, so never rename or remove existing keys.

### 6. Check it with your own eyes

Code that compiles can still look wrong, so this step is not optional.

1. Run `npx vite build` in the `focus-garden` folder and fix any errors.
2. Open the furniture gallery showing just the new item and one or two existing ones, for
   example `http://localhost:5173/?furniture=armchair,rug`. Start the dev server with the
   browser preview's `focus-garden` launch config if it isn't running.
3. Check:
   - Would someone recognise it at a glance, both in the room and as the small shop picture?
   - Is it the right size next to Bun and the pot?
   - Does it stand on the floor line, with nothing floating or cut off at the edges?
   - Do its colours match the palette and the items next to it?
   - Is the bunny touch cute rather than cluttered?
4. Fix what's off and look again. Two or three rounds is normal.

If no browser is available, say clearly that the item hasn't been visually checked, so the
person knows to look at the gallery themselves.

## Report back

Keep it short:
- the item's name, price and blurb
- its size, and its bunny touch
- the files created or changed, as links
- anything you weren't sure about, such as the price you picked or a simplification
