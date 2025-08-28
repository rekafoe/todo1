import { useState, useEffect, ChangeEvent } from 'react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
  date: string;
}

type Filter = 'all' | 'active' | 'completed';

export default function HomePage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState<string>('');
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    const savedTheme = (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    setTheme(savedTheme);
    document.body.setAttribute('data-theme', savedTheme);

    const savedTasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  function toggleTheme() {
    const next: 'light' | 'dark' = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.body.setAttribute('data-theme', next);
    document.body.classList.add('theme-transition');
    setTimeout(() => {
      document.body.classList.remove('theme-transition');
    }, 1200);
    localStorage.setItem('theme', next);
  }

  function addTask() {
    if (input.trim()) {
      const newTask: Task = {
        id: Date.now(),
        text: input.trim(),
        completed: false,
        date: new Date().toLocaleString(),
      };
      setTasks([newTask, ...tasks]);
      setInput('');
    }
  }

  function toggleTask(id: number) {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  }

  function deleteTask(id: number) {
    setTasks(tasks.filter(t => t.id !== id));
  }

  const filteredTasks = tasks.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  return (
    <main>
      <button className="theme-btn" onClick={toggleTheme}>
        <span className="icon">{theme === 'light' ? '🌙' : '☀️'}</span>
      </button>

      <div>
        <input
          value={input}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
          placeholder="Новая задача"
        />
        <button className="BTN" onClick={addTask}>Добавить</button>
      </div>

      <div className="filter-btns">
        <button onClick={() => setFilter('all')}>Все</button>
        <button onClick={() => setFilter('active')}>Активные</button>
        <button onClick={() => setFilter('completed')}>Выполненные</button>
      </div>

      <ul>
        {filteredTasks.map(task => (
          <li key={task.id} className={`task ${task.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <span>{task.text}</span>
            <small>({task.date})</small>
            <button className="BTN" onClick={() => deleteTask(task.id)}>❌</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
