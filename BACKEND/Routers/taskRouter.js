const express = require('express');
const taskRouter = express.Router();
const { postAddTask, deleteTask, getDeleteTask, postUpdateTask, getAllTasks } = require('../Controllers/taskController.js');

// Create task
taskRouter.post('/add', postAddTask);

// Delete task (supports RESTful DELETE and backward-compatible GET)
taskRouter.delete('/delete/:id', deleteTask);
taskRouter.delete('/:id', deleteTask);
taskRouter.get('/delete/:id', getDeleteTask);

// Update task (supports POST and RESTful PUT/PATCH)
taskRouter.post('/update/:id', postUpdateTask);
taskRouter.put('/update/:id', postUpdateTask);
taskRouter.put('/:id', postUpdateTask);
taskRouter.patch('/:id', postUpdateTask);

// Fetch tasks
taskRouter.get('/', getAllTasks);

module.exports = taskRouter;
