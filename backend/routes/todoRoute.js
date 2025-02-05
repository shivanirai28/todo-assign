// routes/todoRoute.js
const express = require('express');
const router = express.Router();
const { readTodos, writeTodos } = require('../localData');

// Utility function to generate a unique ID.
function generateId() {
  return Date.now().toString();
}

// GET /api/todos - Retrieve all todos
router.get('/todos', (req, res) => {
  try {
    const todos = readTodos();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/todo/new - Create a new todo
router.post('/todo/new', (req, res) => {
  try {
    const todos = readTodos();
    const newTodo = {
      _id: generateId(),
      title: req.body.title,
      complete: false,
    };
    todos.push(newTodo);
    writeTodos(todos);
    res.json(newTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/todo/edit/:id - Edit a todo (update its title)
router.put('/todo/edit/:id', (req, res) => {
  try {
    const todos = readTodos();
    const todo = todos.find(todo => todo._id === req.params.id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    // Update the title (you could also update other fields)
    todo.title = req.body.title;
    writeTodos(todos);
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/todo/delete/:id - Delete a todo by its ID
router.delete('/todo/delete/:id', (req, res) => {
  try {
    let todos = readTodos();
    const todoToDelete = todos.find(todo => todo._id === req.params.id);
    if (!todoToDelete) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    todos = todos.filter(todo => todo._id !== req.params.id);
    writeTodos(todos);
    res.json(todoToDelete);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/todo/toggleStatus/:id - Toggle the completion status of a todo
router.get('/todo/toggleStatus/:id', (req, res) => {
  try {
    const todos = readTodos();
    const todo = todos.find(todo => todo._id === req.params.id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    todo.complete = !todo.complete;
    writeTodos(todos);
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
