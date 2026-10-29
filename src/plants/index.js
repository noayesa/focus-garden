// The plant catalog. Each plant lives in its own file in this folder and exports:
//   { name, tier, fact, pot?, Draw, Front? }
// To add a plant: create its file, then import it and add it to PLANTS below.

import aglaonema from './aglaonema.jsx'
import alocasia from './alocasia.jsx'
import anthurium from './anthurium.jsx'
import birdOfParadise from './birdOfParadise.jsx'
import calathea from './calathea.jsx'
import fiddleLeafFig from './fiddleLeafFig.jsx'
import jadePlant from './jadePlant.jsx'
import maranta from './maranta.jsx'
import monstera from './monstera.jsx'
import monsteraAdansonii from './monsteraAdansonii.jsx'
import monsteraAlbo from './monsteraAlbo.jsx'
import orchid from './orchid.jsx'
import peaceLily from './peaceLily.jsx'
import pinkPrincess from './pinkPrincess.jsx'
import pothos from './pothos.jsx'
import rubberPlant from './rubberPlant.jsx'
import sakura from './sakura.jsx'
import snakePlant from './snakePlant.jsx'
import spiderPlant from './spiderPlant.jsx'
import stringOfHearts from './stringOfHearts.jsx'
import stringOfPearls from './stringOfPearls.jsx'
import yucca from './yucca.jsx'
import zzPlant from './zzPlant.jsx'

// The keys are the ids saved in your garden, so don't rename existing ones.
export const PLANTS = {
  // common
  yucca,
  aglaonema,
  snakePlant,
  pothos,
  jadePlant,
  spiderPlant,
  zzPlant,
  // uncommon
  maranta,
  monstera,
  fiddleLeafFig,
  rubberPlant,
  calathea,
  peaceLily,
  monsteraAdansonii,
  // rare
  orchid,
  stringOfPearls,
  birdOfParadise,
  anthurium,
  alocasia,
  stringOfHearts,
  // legendary
  sakura,
  pinkPrincess,
  monsteraAlbo,
}

// Longer focus sessions grow rarer plants, which also sell for more coins
export const TIERS = {
  common: { label: 'Common', stars: 1, color: '#7fb36f', minMinutes: 0, sellPrice: 3 },
  uncommon: { label: 'Uncommon', stars: 2, color: '#5d9fd6', minMinutes: 25, sellPrice: 8 },
  rare: { label: 'Rare', stars: 3, color: '#a77fdc', minMinutes: 45, sellPrice: 20 },
  legendary: { label: 'Legendary', stars: 4, color: '#eba52c', minMinutes: 60, sellPrice: 50 },
}

export function tierForMinutes(minutes) {
  if (minutes >= TIERS.legendary.minMinutes) return 'legendary'
  if (minutes >= TIERS.rare.minMinutes) return 'rare'
  if (minutes >= TIERS.uncommon.minMinutes) return 'uncommon'
  return 'common'
}

export function randomPlantFor(minutes) {
  const tier = tierForMinutes(minutes)
  const options = Object.keys(PLANTS).filter((id) => PLANTS[id].tier === tier)
  return options[Math.floor(Math.random() * options.length)]
}

// While a plant grows, its progress (0 to 1) decides which picture stage to show.
export function stageForProgress(progress) {
  if (progress >= 1) return 4
  if (progress >= 0.75) return 3
  if (progress >= 0.45) return 2
  if (progress >= 0.15) return 1
  return 0
}
