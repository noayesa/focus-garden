import { useState } from 'react'

export default function TaskList({ tasks, activeTaskId, onSelect, onAdd, onToggleDone, onRemove }) {
  const [draft, setDraft] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const title = draft.trim()
    if (!title) return
    onAdd(title)
    setDraft('')
  }

  return (
    <div>
      <h2>Today's tasks</h2>

      <form className="task-form" onSubmit={handleSubmit}>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="What do you want to focus on?"
        />
        <button type="submit">Add</button>
      </form>

      {tasks.length === 0 && <p className="muted">No tasks yet. Add one above!</p>}

      <ul className="tasks">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`task ${task.id === activeTaskId ? 'active' : ''} ${task.done ? 'done' : ''}`}
          >
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => onToggleDone(task.id)}
              aria-label={`Mark ${task.title} done`}
            />
            <button className="task-title" onClick={() => onSelect(task.id)}>
              {task.title}
            </button>
            <span className="sessions" title="Focus sessions finished">
              {'🍅'.repeat(task.sessions)}
            </span>
            <button className="icon-btn" onClick={() => onRemove(task.id)} aria-label="Remove task">
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
