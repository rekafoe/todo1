'use client';

import { useState, useEffect } from 'react';

export default function HomePage() {
  const [theme, setTheme] = useState('light');
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.body.setAttribute('data-theme', savedTheme);

    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
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
      const newTask = {
        id: Date.now(),
        text: input.trim(),
        completed: false,
        date: new Date().toLocaleString(),
      };
      setTasks([newTask, ...tasks]);
      setInput('');
    }
  }

  function toggleTask(id) {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  }

  function deleteTask(id) {
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
          onChange={(e) => setInput(e.target.value)}
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
