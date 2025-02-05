// localData.js
const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, 'todos.json');

function readTodos() {
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, '[]', 'utf-8');
  }
  const data = fs.readFileSync(dataFilePath, 'utf-8');
  return JSON.parse(data);
}

function writeTodos(todos) {
  fs.writeFileSync(dataFilePath, JSON.stringify(todos, null, 2), 'utf-8');
}

module.exports = { readTodos, writeTodos };
