import { useState } from 'react';

const styles = {
  margin: "10px 0"
}

function App() {
  const [input, setInput] = useState('')
  const [time, setTime] = useState('')
  const [todos, setTodos] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      id: Math.floor(Math.random() * 1000000),
      text: input,
      time,
      completed: false
    }
    setTodos([data, ...todos])
    setInput('')
  }

  const taskDone = (id) => {
    const newTodo = todos.map(t => {
      if(id !== t.id) return t
      return {
        ...t,
        completed: true
      }
    })
    setTodos(newTodo)
  }

  const taskDelete = (id) => {
    const newTodo = todos.filter(t => t.id !== id)
    setTodos(newTodo)
  }

  return (
    <>
      <center>
        <h1>Todo APP ({todos.length})</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Todo"
            value={input}
            onChange={e => setInput(e.target.value)}
            required
          />
          <br />
          <label htmlFor="time">Time </label>
          <input
            id="time"
            type="time"
            value={time}
            onChange={e => setTime(e.target.value)}
            required
          />
          <button type="submit">Add 🛫</button>
        </form>
        <br />
        <div>
          {todos?.map(({ text, id, time, completed }) => (
            <h6 style={styles} key={id}>

              {completed ? (
                <del>
                  {text}{" "}
                  {time}{" "}
                </del>
              ) : (
                <>
                  {text}{" "}
                  {time}{" "}
                </>
              )}
              {!completed && (
                <button onClick={() => taskDone(id)}>✅</button>
              )}
              <button onClick={() => taskDelete(id)}>❌</button>
            </h6>
          ))}
        </div>
        {!!todos?.length && (
          <button onClick={() => setTodos([])}>Delete All</button>
        )}
      </center>
    </>
  );
}

export default App;