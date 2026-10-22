import { useState } from 'react'
import { TIERS, tierForMinutes } from '../plants/index.js'

const DURATIONS = [1, 15, 25, 45, 60]

function format(ms) {
  const total = Math.max(0, Math.ceil(ms / 1000))
  const m = String(Math.floor(total / 60)).padStart(2, '0')
  const s = String(total % 60).padStart(2, '0')
  return `${m}:${s}`
}

// Shows the session controls. The session itself lives in App so it can be
// saved and keep running across a page refresh.
export default function Timer({ session, now, progress, tasks, focusTaskId, onFocusTaskChange, wilted, disabled, onStart, onGiveUp }) {
  const [minutes, setMinutes] = useState(25)
  const openTasks = tasks.filter((t) => !t.done)

  if (session) {
    const task = tasks.find((t) => t.id === session.taskId)
    return (
      <div className="timer">
        <h2>Focusing 🌱</h2>
        <p className="timer-task">
          {task ? <>On: <strong>{task.title}</strong></> : <span className="muted">Just focusing</span>}
        </p>
        <div className="time">{format(session.endsAt - now)}</div>
        <div className="progress" aria-label={`Plant ${Math.round(progress * 100)}% grown`}>
          <div className="progress-fill" style={{ width: `${progress * 100}%` }} />
        </div>
        <p className="muted small">
          Growing a mystery {TIERS[tierForMinutes(session.minutes)].label.toLowerCase()} seed...
        </p>
        <button className="btn secondary" onClick={onGiveUp}>Give up</button>
      </div>
    )
  }

  const tier = TIERS[tierForMinutes(minutes)]
  return (
    <div className="timer">
      <h2>Focus timer</h2>

      <div className="time">{format(minutes * 60 * 1000)}</div>

      <div className="durations">
        {DURATIONS.map((m) => {
          const t = TIERS[tierForMinutes(m)]
          return (
            <button
              key={m}
              className={`chip ${m === minutes ? 'selected' : ''}`}
              onClick={() => setMinutes(m)}
              style={{ '--tier': t.color }}
            >
              {m === 1 ? '1 min (test)' : `${m} min`}
              <span className="chip-tier">{'★'.repeat(t.stars)}</span>
            </button>
          )
        })}
      </div>
      <p className="tier-hint" style={{ color: tier.color }}>
        {'★'.repeat(tier.stars)} {tier.label} seed
      </p>
      {wilted && <p className="muted small">Your drooping sprout will be swapped for this fresh seed 🍂</p>}

      <label className="focus-on">
        <span className="muted small">Focus on a task (optional)</span>
        <select value={focusTaskId ?? ''} onChange={(e) => onFocusTaskChange(e.target.value ? Number(e.target.value) : null)}>
          <option value="">Just focus</option>
          {openTasks.map((t) => (
            <option key={t.id} value={t.id}>{t.title}</option>
          ))}
        </select>
      </label>

      <button className="btn primary" onClick={() => onStart(minutes)} disabled={disabled}>
        Plant a seed & focus 🌱
      </button>
    </div>
  )
}
