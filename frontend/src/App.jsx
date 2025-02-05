// src/App.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/todos`);
      setTodos(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddTodo = async () => {
    if (newTodo.trim() === '') return;
    try {
      const res = await axios.post(`${BASE_URL}/todo/new`, { title: newTodo });
      setTodos([...todos, res.data]);
      setNewTodo('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
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
      const res = await axios.get(`${BASE_URL}/todo/toggleStatus/${id}`);
      setTodos(todos.map(todo => (todo._id === id ? res.data : todo)));
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
      const res = await axios.put(`${BASE_URL}/todo/edit/${id}`, { title: editedTitle });
      setTodos(todos.map(todo => (todo._id === id ? res.data : todo)));
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

  // Separate todos into incomplete and complete arrays
  const incompleteTodos = todos.filter(todo => !todo.complete);
  const completeTodos = todos.filter(todo => todo.complete);

  // Render a styled, animated card for each todo
  const renderCard = (todo, index) => (
    <div
      key={todo._id}
      className="bg-white rounded-xl shadow-lg p-4 flex flex-col justify-between w-36 h-36 md:w-40 md:h-40 transform transition duration-300 hover:scale-105 border-4 border-transparent hover:border-gradient-to-r hover:from-purple-400 hover:to-pink-500"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs md:text-sm font-bold text-gray-700">{index + 1}.</span>
        <input
          type="checkbox"
          checked={todo.complete}
          onChange={() => handleToggleTodo(todo._id)}
          className="w-5 h-5 accent-green-500 rounded focus:ring-0"
        />
      </div>
      <div className="mt-2 flex-1">
        {editingId === todo._id ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400 text-xs md:text-sm"
          />
        ) : (
          <p
            onClick={() => handleToggleTodo(todo._id)}
            className={`cursor-pointer text-xs md:text-sm transition duration-200 ${
              todo.complete ? 'line-through text-gray-500' : 'text-gray-800'
            }`}
          >
            {todo.title}
          </p>
        )}
      </div>
      <div className="flex justify-around mt-2">
        {editingId === todo._id ? (
          <>
            <button
              onClick={() => handleSaveEdit(todo._id)}
              className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs"
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => handleEditTodo(todo._id, todo.title)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-xs"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteTodo(todo._id)}
              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
            >
              Delete
            </button>
          </>
        )}
      </div>
      {todo.complete && (
        <div className="mt-1 text-center text-xs text-green-700 font-semibold animate-bounce">
          Well done champ!! 🎉🎉
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-400 to-indigo-500 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">My Awesome To‑Do List</h1>
        </div>
        <div className="flex items-center justify-center mb-8">
          <input
            type="text"
            placeholder="What's on your mind?"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleAddTodo}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-r-lg font-semibold transition duration-200"
          >
            Add
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Left Section: To be done */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-white mb-4">To be done 📌</h2>
            <div className="flex flex-wrap gap-4">
              {incompleteTodos.length === 0 ? (
                <p className="text-center text-white">No pending tasks!</p>
              ) : (
                incompleteTodos.map((todo, idx) => renderCard(todo, idx))
              )}
            </div>
          </div>
          {/* Divider with thicker, designed style */}
          <div className="w-full md:w-6 bg-gradient-to-b from-gray-400 via-gray-500 to-gray-600 rounded-full"></div>
          {/* Right Section: Done */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-white mb-4">Done ✅</h2>
            <div className="flex flex-wrap gap-4">
              {completeTodos.length === 0 ? (
                <p className="text-center text-white">No completed tasks yet!</p>
              ) : (
                completeTodos.map((todo, idx) => renderCard(todo, idx))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
