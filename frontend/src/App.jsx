// src/App.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');

  // Fetch todos on mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/todos`);
      setTodos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddTodo = async () => {
    if (newTodo.trim() === '') return;
    try {
      const response = await axios.post(`${BASE_URL}/todo/new`, { title: newTodo });
      setTodos([...todos, response.data]);
      setNewTodo('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/todo/delete/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleTodo = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/todo/toggleStatus/${id}`);
      setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditTodo = (id, currentTitle) => {
    setEditingId(id);
    setEditedTitle(currentTitle);
  };

  const handleSaveEdit = async (id) => {
    if (editedTitle.trim() === '') return;
    try {
      const response = await axios.put(`${BASE_URL}/todo/edit/${id}`, { title: editedTitle });
      setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
      setEditingId(null);
      setEditedTitle('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedTitle('');
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">My To‑Do List</h1>
      <div className="flex mb-4">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-l px-3 py-2 focus:outline-none"
          placeholder="Add a new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button
          onClick={handleAddTodo}
          className="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600 transition-colors"
        >
          Add
        </button>
      </div>
      <ul className="space-y-2">
        {todos.length === 0 ? (
          <p className="text-center text-gray-500">No todos available</p>
        ) : (
          todos.map((todo) => (
            <li key={todo._id} className="flex justify-between items-center border p-3 rounded shadow-sm">
              {editingId === todo._id ? (
                <>
                  <input
                    type="text"
                    className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                  />
                  <button
                    onClick={() => handleSaveEdit(todo._id)}
                    className="ml-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="ml-2 bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span
                    onClick={() => handleToggleTodo(todo._id)}
                    className={`cursor-pointer flex-1 ${todo.complete ? 'line-through text-gray-500' : 'text-black'}`}
                  >
                    {todo.title}
                  </span>
                  <button
                    onClick={() => handleEditTodo(todo._id, todo.title)}
                    className="ml-2 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTodo(todo._id)}
                    className="ml-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
