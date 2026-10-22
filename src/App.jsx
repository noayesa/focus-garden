import { useEffect, useRef, useState } from 'react'
import TaskList from './components/TaskList.jsx'
import Timer from './components/Timer.jsx'
import Garden from './components/Garden.jsx'
import UnlockCard from './components/UnlockCard.jsx'
import usePersistentState from './usePersistentState.js'
import { PLANTS, randomPlantFor, stageForProgress } from './plants/index.js'

const EMPTY_GARDEN = { shelf: [], floor: null, seen: [] }

export default function App() {
  // Saved in the browser so they survive a refresh
  const [tasks, setTasks] = usePersistentState('fg-tasks', [])
  const [coins, setCoins] = usePersistentState('fg-coins', 0)
  // shelf: grown plants. floor: the plant in the big pot (or null). seen: species unlocked so far
  const [garden, setGarden] = usePersistentState('fg-garden', EMPTY_GARDEN)
  // { startedAt, endsAt, minutes, taskId, revive } while a focus session runs
  const [session, setSession] = usePersistentState('fg-session', null)

  const [focusTaskId, setFocusTaskId] = useState(null)
  const [now, setNow] = useState(Date.now())
  // Bun's mood: 'idle' | 'working' | 'happy' | 'sad'
  const [mood, setMood] = useState(session ? 'working' : 'idle')
  const [message, setMessage] = useState(null)
  const [event, setEvent] = useState(null)
  const [showUnlock, setShowUnlock] = useState(garden.floor?.progress >= 1)
  const [shelving, setShelving] = useState(null)

  const { floor } = garden

  // How grown the floor plant is right now (0 to 1)
  let progress = floor?.progress ?? 0
  if (session && floor) {
    const sessionProgress = Math.min(1, (now - session.startedAt) / (session.endsAt - session.startedAt))
    progress = floor.progress + (1 - floor.progress) * sessionProgress
  }

  // Tick while a session runs, and finish it when time is up
  // (also catches sessions that ended while the page was closed)
  const completedRef = useRef(null)
  useEffect(() => {
    if (!session) return
    if (now >= session.endsAt) {
      if (completedRef.current === session.startedAt) return // don't finish the same session twice
      completedRef.current = session.startedAt
      completeSession()
      return
    }
    const id = setTimeout(() => setNow(Date.now()), 250)
    return () => clearTimeout(id)
  }, [session, now])

  function say(line) {
    setMessage(line)
  }

  function startSession(minutes) {
    const startedAt = Date.now()
    // Every session plants a fresh seed whose rarity matches *this* session's length.
    // A wilted plant from a session you gave up on is replaced, so a long session can't
    // be started, abandoned, then finished cheaply with a short one.
    const replacingWilted = Boolean(floor)
    const plant = { id: startedAt, type: randomPlantFor(minutes), progress: 0, wilted: false, potIndex: garden.shelf.length }
    setGarden((g) => ({ ...g, floor: plant }))
    setEvent({ kind: 'planted', key: startedAt })
    say(
      replacingWilted
        ? 'Out with the droopy one. Fresh seed time! 🌱'
        : "I planted a mystery seed! I wonder what it'll be? 🌱",
    )
    setSession({ startedAt, endsAt: startedAt + minutes * 60 * 1000, minutes, taskId: focusTaskId })
    setNow(startedAt)
    setMood('working')
  }

  function completeSession() {
    setGarden((g) => ({ ...g, floor: g.floor && { ...g.floor, progress: 1, wilted: false } }))
    if (session.taskId) {
      setTasks((prev) => prev.map((t) => (t.id === session.taskId ? { ...t, sessions: t.sessions + 1 } : t)))
    }
    setSession(null)
    setMood('happy')
    setEvent({ kind: 'complete', key: Date.now() })
    say("It's fully grown! Come see! 🌿")
    setTimeout(() => setShowUnlock(true), 1800)
  }

  function giveUp() {
    setGarden((g) => ({ ...g, floor: { ...g.floor, progress, wilted: true } }))
    setSession(null)
    setMood('sad')
    say("Oh no, the little plant is drooping... let's plant a fresh seed next time.")
  }

  function closeUnlock() {
    setShowUnlock(false)
    setShelving({ key: Date.now(), plant: floor })
    say("Let me grab the ladder! 🪜")
  }

  function handlePlaced() {
    const placed = floor
    setGarden((g) => ({
      shelf: [...g.shelf, { id: placed.id, type: placed.type, potIndex: placed.potIndex }],
      floor: null,
      seen: g.seen.includes(placed.type) ? g.seen : [...g.seen, placed.type],
    }))
    setEvent({ kind: 'placed', placedId: placed.id, key: Date.now() })
    say(`There! The ${PLANTS[placed.type].name} looks lovely up there 💚`)
  }

  function handleShelvingDone() {
    setShelving(null)
    setMood('idle')
  }

  function addTask(title) {
    setTasks((prev) => [...prev, { id: Date.now(), title, sessions: 0, done: false, rewarded: false }])
  }

  function toggleDone(id) {
    const task = tasks.find((t) => t.id === id)
    // Only the first time a task is completed earns a coin (no farming the checkbox!)
    const reward = !task.done && !task.rewarded
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done, rewarded: t.rewarded || reward } : t)))
    if (reward) {
      setCoins((c) => c + 1)
      setEvent({ kind: 'task', key: Date.now() })
      say(`"${task.title}" done! Here's a coin 🪙`)
    }
    if (id === focusTaskId) setFocusTaskId(null)
  }

  function removeTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id))
    if (id === focusTaskId) setFocusTaskId(null)
  }

  const waitingToShelve = floor?.progress >= 1

  return (
    <div className="app">
      <header className="header">
        <h1>🌱 Focus Garden</h1>
        <p className="subtitle">Focus to grow plants. Longer sessions grow rarer ones!</p>
        <div className="stats">
          <span title="Coins from finished tasks">🪙 {coins}</span>
          <span title="Plants on your shelves">🪴 {garden.shelf.length}</span>
          <span title="Different plants discovered">📖 {garden.seen.length}/{Object.keys(PLANTS).length}</span>
        </div>
      </header>

      <main className="layout">
        <section className="card garden-card">
          <Garden
            shelf={garden.shelf}
            floor={floor}
            floorStage={stageForProgress(progress)}
            mood={mood}
            message={message}
            event={event}
            shelving={shelving}
            onPlaced={handlePlaced}
            onShelvingDone={handleShelvingDone}
          />
        </section>

        <section className="card">
          <Timer
            session={session}
            now={now}
            progress={progress}
            tasks={tasks}
            focusTaskId={focusTaskId}
            onFocusTaskChange={setFocusTaskId}
            wilted={floor?.wilted ? floor.type : null}
            disabled={Boolean(shelving) || waitingToShelve}
            onStart={startSession}
            onGiveUp={giveUp}
          />
        </section>

        <section className="card">
          <TaskList
            tasks={tasks}
            activeTaskId={focusTaskId}
            onSelect={(id) => !session && setFocusTaskId(id)}
            onAdd={addTask}
            onToggleDone={toggleDone}
            onRemove={removeTask}
          />
        </section>
      </main>

      {showUnlock && floor && (
        <UnlockCard plant={floor} isNew={!garden.seen.includes(floor.type)} onClose={closeUnlock} />
      )}
    </div>
  )
}
