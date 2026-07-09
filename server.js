const express = require('express');
const jwt = require('jsonwebtoken');
const tasksRouter = require('./routes/tasks.js');
const loginroute = require('./routes/login_route.js');

const app = express();

// Body parser (should this be here?)
app.use(express.json()); //this should call before route funtion

// Routes
app.use('/tasks', tasksRouter);

// Login route
app.use(loginroute);

//check your server
app.get('/', (req, res) => {
  res.send('Task API is running');
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
