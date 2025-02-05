// server.js
const express = require('express');
const cors = require('cors');

const todoRoute = require('./routes/todoRoute');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

app.use('/api', todoRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
