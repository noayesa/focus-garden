# One-time setup: the furniture gallery

Only follow this if `src/dev/FurnitureGallery.jsx` doesn't exist yet. It's a dev page for
checking furniture, like the plant gallery at `?gallery`.

## What it should show

At `http://localhost:5173/?furniture`, one row per catalog item; with
`?furniture=armchair,rug`, only those items. Each row has:
- the item's name, price and id, like the plant gallery's name column
- **the item in a mini room**: a strip of the room's floor (copy the `.floor` look from
  `src/index.css`) with the item standing on it at its real size, Bun (`<Farmer activity="idle" />`
  at 130px wide) on one side and an empty floor pot (`<Plant />` at 130px wide) on the other.
  This is what shows whether the size is right.
- **the shop picture**: the item squeezed into a 110 x 80 box, as `Shop.jsx` shows it, to check
  it still reads at small size.

Use `FurnitureArt` from `src/components/FurnitureArt.jsx` to draw items, so the gallery shows
exactly what the room and shop show.

## How to add it

1. Create `src/dev/FurnitureGallery.jsx`, following the structure of `src/dev/PlantGallery.jsx`.
2. In `src/main.jsx`, show it when the URL has `?furniture`, next to the existing `?gallery` check.
3. Put its styles in `src/index.css` under a `/* Dev furniture gallery (?furniture) */` comment,
   next to the plant gallery's styles.
4. Run `npx vite build`, open `?furniture`, and check the rug shows up lying flat on the floor
   strip between Bun and the pot.

Tell the person you added the gallery, since it's a new page in their app.
