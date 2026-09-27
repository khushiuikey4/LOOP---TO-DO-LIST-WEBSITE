const express = require('express');
const taskRouter = express.Router();
const { postAddTask, getDeleteTask, postUpdateTask, getAllTasks } = require('../Controllers/taskController.js');
taskRouter.post('/add', postAddTask);
taskRouter.get('/delete/:id', getDeleteTask);
taskRouter.post('/update/:id', postUpdateTask);
taskRouter.get('/', getAllTasks);
module.exports = taskRouter;