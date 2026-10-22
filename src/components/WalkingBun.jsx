import { useEffect, useRef, useState } from 'react'
import Farmer from './Farmer.jsx'
import Plant from './Plant.jsx'

export const BUN_WIDTH = 130
const SPEED = 110 // walking speed, pixels per second
const CLIMB_MS = 1600
const LADDER_W = 36
const LADDER_HOME = 40 // ladder leans in the left corner when not in use
const LADDER_REACH = 62 // how far left of the shelf slot the ladder stands
const MIN_X = -30 // Bun's drawing has some empty space on its sides

const rand = (min, max) => min + Math.random() * (max - min)

// Bun walks around the room and reacts to what's happening.
//
// Her behaviour is written as a list of steps, for example:
//   [{ walkTo: () => 200 }, { do: 'water', ms: 3000 }, { then: wander }]
//
// Props:
//   mood      'idle' | 'working' | 'happy' | 'sad'
//   event     { kind, key }  kind: 'planted' | 'complete' | 'task' | 'placed'
//   shelving  { key, plant } when a grown plant should go up on the shelf
//   getTargets()  measures the room: { potX, slotX, climbY, ladderH }
//   onPickUp / onPlaced / onShelvingDone  callbacks during the ladder trip
export default function WalkingBun({ roomWidth, mood, event, shelving, getTargets, onPickUp, onPlaced, onShelvingDone }) {
  const [pos, setPos] = useState({ x: 120, y: 0, ms: 0, ease: 'linear' })
  const [facing, setFacing] = useState('right')
  const [activity, setActivity] = useState('idle')
  const [holding, setHolding] = useState(null) // null | 'ladder' | plant object
  const [ladder, setLadder] = useState({ state: 'home', x: LADDER_HOME, h: 200 })

  const posRef = useRef(pos)
  const timers = useRef([])
  const latest = useRef({})
  latest.current = { roomWidth, mood, getTargets, onPickUp, onPlaced, onShelvingDone }

  function stop() {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }
  useEffect(() => stop, [])

  const maxX = () => Math.max(0, latest.current.roomWidth - BUN_WIDTH)
  const targets = () => latest.current.getTargets()
  // Stand just left of the pot so the watering can / shovel reaches the soil
  const besidePot = () => targets().potX - BUN_WIDTH + 48
  const anywhere = () => rand(0, maxX())
  // Bun stands centred on the ladder (used to carry it, set it and climb it)
  const onLadderAt = (ladderX) => ladderX + LADDER_W / 2 - BUN_WIDTH / 2

  function move(next) {
    posRef.current = { ...posRef.current, ...next }
    setPos(posRef.current)
  }

  function run(steps) {
    stop()
    let i = 0
    const next = () => {
      if (i >= steps.length) return
      const step = steps[i++]
      if (step.then) return step.then()
      if (step.call) {
        step.call()
        return next()
      }
      if (step.face) {
        setFacing(step.face)
        return next()
      }
      if (step.hold !== undefined) {
        setHolding(step.hold)
        return next()
      }
      if (step.ladder) {
        setLadder((l) => ({ ...l, ...step.ladder() }))
        return next()
      }
      if (step.walkTo) {
        const target = Math.min(Math.max(MIN_X, step.walkTo()), maxX())
        const dist = Math.abs(target - posRef.current.x)
        if (dist < 4) return next()
        const ms = (dist / SPEED) * 1000
        setFacing(target > posRef.current.x ? 'right' : 'left')
        setActivity('walk')
        move({ x: target, ms, ease: 'linear' })
        timers.current.push(setTimeout(next, ms))
        return
      }
      if (step.climb !== undefined) {
        setActivity('climb')
        move({ y: step.climb(), ms: CLIMB_MS, ease: 'ease-in-out' })
        timers.current.push(setTimeout(next, CLIMB_MS))
        return
      }
      setActivity(step.do)
      if (step.ms) timers.current.push(setTimeout(next, step.ms))
    }
    next()
  }

  function wander() {
    run([{ do: 'idle', ms: rand(2500, 5000) }, { walkTo: anywhere }, { then: wander }])
  }

  function tendWhileFocusing() {
    run([
      { walkTo: besidePot },
      { face: 'right' },
      { do: 'water', ms: 5000 },
      { do: 'idle', ms: 1500 },
      { walkTo: anywhere },
      { do: 'idle', ms: 3000 },
      { then: tendWhileFocusing },
    ])
  }

  function afterCheer() {
    return latest.current.mood === 'working' ? tendWhileFocusing() : wander()
  }

  // The ladder trip: fetch ladder → set it under the shelf → fetch the pot →
  // climb → place the plant → climb down → put the ladder back.
  function shelvePlant(plant) {
    let t = targets()
    // Set the ladder just left of the slot, so Bun reaches over and you can see the plant land
    const slotLadderX = () => Math.max(LADDER_HOME + 20, t.slotX - LADDER_REACH) - LADDER_W / 2
    run([
      { call: () => (t = targets()) },
      { ladder: () => ({ h: t.ladderH }) },
      { walkTo: () => onLadderAt(LADDER_HOME) },
      { do: 'idle', ms: 400 },
      { hold: 'ladder' },
      { ladder: () => ({ state: 'carried' }) },
      { walkTo: () => onLadderAt(slotLadderX()) },
      { ladder: () => ({ state: 'set', x: slotLadderX() }) },
      { hold: null },
      { do: 'idle', ms: 500 },
      { walkTo: besidePot },
      { face: 'right' },
      { do: 'plant', ms: 900 }, // a little scoop to lift it
      { call: () => latest.current.onPickUp() },
      { hold: plant },
      { walkTo: () => onLadderAt(slotLadderX()) },
      { climb: () => t.climbY },
      { call: () => latest.current.onPlaced() },
      { hold: null },
      { do: 'cheer', ms: 1400 },
      { climb: () => 0 },
      { hold: 'ladder' },
      { ladder: () => ({ state: 'carried' }) },
      { walkTo: () => onLadderAt(LADDER_HOME) },
      { ladder: () => ({ state: 'home', x: LADDER_HOME }) },
      { hold: null },
      { call: () => latest.current.onShelvingDone() },
      { then: wander },
    ])
  }

  // Mood changes (focus started on reload, gave up, back to idle)
  useEffect(() => {
    if (!roomWidth) return
    if (mood === 'sad') run([{ do: 'sad', ms: 4000 }, { then: wander }])
    else if (mood === 'working') tendWhileFocusing()
    else if (mood === 'idle' && !shelving) wander()
  }, [mood, roomWidth > 0])

  // One-off events
  useEffect(() => {
    if (!event || !roomWidth) return
    if (event.kind === 'planted') {
      run([
        { walkTo: besidePot },
        { face: 'right' },
        { do: 'plant', ms: 2800 },
        { then: tendWhileFocusing },
      ])
    } else if (event.kind === 'complete') {
      run([{ walkTo: besidePot }, { face: 'right' }, { do: 'cheer', ms: 2500 }, { do: 'idle' }])
    } else if (event.kind === 'task' && latest.current.mood !== 'working' && !shelving) {
      run([{ do: 'cheer', ms: 1800 }, { then: afterCheer }])
    }
  }, [event?.key])

  useEffect(() => {
    if (shelving && roomWidth) shelvePlant(shelving.plant)
  }, [shelving?.key])

  const carried = ladder.state === 'carried'
  const ladderX = carried ? pos.x + BUN_WIDTH / 2 - LADDER_W / 2 : ladder.x
  const transition = `transform ${pos.ms}ms ${pos.ease}`

  return (
    <>
      <div
        className={`ladder ladder-${ladder.state}`}
        style={{
          height: ladder.h,
          transform: `translateX(${ladderX}px)${carried ? ' translateY(-14px) rotate(5deg)' : ''}`,
          transition: carried ? transition : 'transform 0.4s',
        }}
        aria-hidden="true"
      />
      <div
        className={`walking-bun ${activity === 'walk' || activity === 'climb' ? 'is-walking' : ''}`}
        style={{ transform: `translate(${pos.x}px, ${-pos.y}px)`, transition, width: BUN_WIDTH }}
      >
        <div className={`bun-flip ${facing === 'left' ? 'face-left' : ''}`}>
          <Farmer activity={activity} />
        </div>
        {holding && holding !== 'ladder' && (
          // While climbing, she holds the pot out toward the shelf slot
          <div className="held-plant" style={{ transform: pos.y > 0 ? `translateX(${LADDER_REACH - 10}px)` : 'none' }}>
            <Plant type={holding.type} stage={4} potIndex={holding.potIndex} />
          </div>
        )}
      </div>
    </>
  )
}
