---
name: add-plant
description: Add a new houseplant to the Focus Garden app. Draws it as a growing SVG (seed to fully grown), gives it a rarity tier and a fun fact, registers it in the plant catalog, and checks it visually in the plant gallery. Use this whenever the user wants a new plant, flower, succulent, cactus, tree or any other greenery in the garden, even if they just name a plant ("add a snake plant", "can we get a peace lily?", "more rare plants please", "/add-plant hoya rare").
argument-hint: <plant name> [common|uncommon|rare|legendary] [notes]
---

# Add a plant to Focus Garden

Each plant in the app is one file in `src/plants/` that draws the plant at four growth
stages, plus one line in the catalog `src/plants/index.js`. The person using this skill
cares most about the plant **looking like the real plant** and **looking cute next to the
others**, so most of the effort goes into the drawing and checking it with your own eyes.

## Inputs

From the request, work out:
- **Plant name**: required. If several plants are named, do each one in turn.
- **Tier** (optional): `common`, `uncommon`, `rare` or `legendary`. If not given, pick one
  using the guide below and say which you picked.
- **Notes** (optional): a cultivar or colour ("pink anthurium", "variegated"), a style wish.

### Choosing a tier

Longer focus sessions grow rarer plants, so rarity should feel earned:
- **common**: everyday, easy, mostly plain green (pothos, snake plant)
- **uncommon**: popular "statement" houseplants (fiddle leaf fig, calathea)
- **rare**: flowering or unusual plants (orchid, bird of paradise, string of pearls)
- **legendary**: collector plants and showstoppers, often variegated (pink princess)

Look at how many plants each tier already has in `src/plants/index.js`. If one tier is much
bigger than the others, mention it, but the person's choice wins.

## Steps

### 1. Read before drawing

- `src/plants/index.js`: the catalog. Check the plant isn't already in it, including under
  another common name (Sansevieria = snake plant, Monstera deliciosa = Swiss cheese plant).
  If it exists, say so and offer a different cultivar or plant instead.
- `src/plants/shared.jsx`: the coordinate system and helpers (`leafPath`, `heartPath`, `Stalk`).
- Two existing plants with a similar shape, to copy their structure and level of detail:
  - leaves on stalks from the soil: `calathea.jsx`, `aglaonema.jsx`
  - a trunk or stem with leaves along it: `fiddleLeafFig.jsx`, `rubberPlant.jsx`
  - flowers: `peaceLily.jsx`, `anthurium.jsx`, `orchid.jsx`
  - trailing or hanging: `pothos.jsx`, `stringOfPearls.jsx` (these use `Front`)
  - upright blades or succulents: `snakePlant.jsx`, `jadePlant.jsx`, `yucca.jsx`
  - patterned or variegated leaves (clip paths and masks): `pinkPrincess.jsx`, `monsteraAlbo.jsx`

### 2. Picture the real plant

Before writing code, note in one or two lines what makes this plant recognisable: leaf shape,
colours and patterns, how it grows (rosette, trunk, trailing, clumping), and any flowers.
Those features are what the drawing must get right. Exact botanical detail matters less than
the overall look someone would recognise at a glance.

If the plant has a close relative already in the catalog (another monstera, another calathea),
also note what tells them apart, and exaggerate that difference a little. For example, Monstera
adansonii's holes sit inside the leaf while Monstera deliciosa's split the edge. Without this,
the new plant can end up looking like a smaller copy of its relative.

### 3. Write `src/plants/<camelCaseId>.jsx`

The file's default export must have this shape:

```jsx
export default {
  name: 'snake plant',      // lowercase, except proper names like 'ZZ plant', 'alocasia Polly'
  tier: 'common',
  fact: 'One or two friendly sentences.',
  pot: '#f3e3c3',           // optional: a pot colour that suits the plant
  Draw,                     // required: ({ stage, uid }) => SVG elements, drawn behind the pot
  Front,                    // optional: same props, drawn in front of the pot (for trailing parts)
}
```

The drawing box is 100 wide and 150 tall. Smaller y means higher up. The plant comes out of the soil at `(BX, BY) = (50, 112)`.
The pot covers roughly x 18 to 82 below y 108, so anything drawn lower than that is hidden
unless it is in `Front`.

`Draw` gets `stage` from 1 to 4 (the Plant component draws stage 0, the seed, itself):
- **1, sprout**: one or two small leaves, already the right colour and shape for this plant.
- **2, young**: clearly bigger, with a few more leaves.
- **3, growing**: nearly full. Buds appear here for flowering plants.
- **4, fully grown**: the full plant with its signature features: flowers in bloom, splits or
  holes, the full variegation. This is the "New plant unlocked!" moment, so make it the best one.

Each stage should look obviously bigger than the one before it. The usual way is to scale
leaf sizes with `SIZE[stage]` from shared.jsx and show more leaves each stage.

Drawing rules, and why they matter:
- **Stay inside about x 6 to 94 and y 10 to 112.** Shelf slots are narrow, so plants that
  spill out overlap their neighbours.
- **Any `<clipPath>` or `<mask>` id must include `uid`** (for example `` `${uid}-leaf${i}` ``).
  The same plant appears several times on a page, and SVG ids that clash make patterns
  vanish from every copy except one.
- **Use flat, soft colours**, plus at most a small white highlight. Match the cozy style
  of the existing plants: no gradients, no thin outlines everywhere.
- Name the arrays at the top of the file (for example `const LEAVES = [...]`) and add a one-line
  comment saying what the plant is, like the existing files do.

### 4. Write the fun fact

One or two sentences, under about 110 characters, friendly, written in your own words, and
**true**. A charming, real fact about how the plant grows or looks is best. If you're not sure
something is true, choose a different fact.

### 5. Register it

In `src/plants/index.js`, import the file (imports are alphabetical) and add the id to `PLANTS`
under the matching tier comment. The key becomes the id stored in people's saved gardens, so
never rename or remove existing keys.

### 6. Check it with your own eyes

Code that compiles can still look wrong, so this step is not optional.

1. Run `npx vite build` in the `focus-garden` folder and fix any errors.
2. Open the gallery showing just the new plant and one or two similar existing ones, for
   example `http://localhost:5173/?gallery=monsteraAdansonii,monstera`. Pass the ids,
   separated by commas. Start the dev server with the browser preview's `focus-garden` launch
   config if it isn't running. Seeing only a few rows avoids scrolling the full gallery, and
   the neighbours show whether the new plant matches the style and stands apart from its relatives.
3. Check:
   - Does it look like the real plant at stage 4?
   - Does each stage grow visibly from the last?
   - Is anything hidden behind the pot or sticking out of the box?
   - Does the wilted version (last column) still look okay?
   - Does it fit in alongside the plants in the rows around it?
   - Could it be mistaken for a similar plant already in the catalog?
4. Fix what's off and look again. Two or three rounds is normal.

If no browser is available, say clearly that the plant hasn't been visually checked, so the
person knows to look at the gallery themselves.

## Report back

Keep it short:
- the plant's name, tier (with ★) and fact
- one line on how it grows through the stages
- the files created or changed, as links
- anything you weren't sure about, such as the tier you picked or a simplification
