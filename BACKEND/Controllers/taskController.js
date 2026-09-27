const Task = require("../model/task");

//controller to add tasks

exports.postAddTask = async (req, res) => {
    //req will come with title, date-deadline, time-deadline, note
    const title = req.body.title;
    const note = req.body.note;
    const deadline = new Date(`${req.body.dateDeadline}T${req.body.timeDeadline}`);
    const task = new Task({
        title: title,
        deadline: deadline,
        note: note,
        Completed: false
    })
    console.log("The data which is going to be saved on the database is : \n ", task);
    const existingTask = await Task.findOne({
        title: title,
        deadline: deadline
    })
    if (existingTask) {
        return res.status(409).json({
            message: "Task already exist"
        })
    } else {
        await task.save();
        res.status(201).json({
            message: "Task added successfully",
            task: task
        });
    }
}

//controller to delete task
exports.getDeleteTask = async (req, res) => {
    // i will get the task to delete it 
    const del_Id = req.params.id;
    const task = await Task.findById(del_Id);
    if (task) {
        await Task.findByIdAndDelete(del_Id);
        return res.json({
            message: "Task delete successfully."
        })
    }
    return res.status(404).json({
        message: "Task not found."
    })
}

//controller to update task
exports.postUpdateTask = async (req, res) => {
    //i will get the task to update it 
    const title = req.body.title;
    const deadline = req.body.deadline;
    const note = req.body.note;
    const id = req.params.id;
    const Completed = req.body.Completed;
    const uptask = await Task.findByIdAndUpdate(id, {
        title: title, deadline: deadline, note: note, Completed: Completed
    }, {
        new: true
    })
    if (!uptask) {
        return res.status(404).json({
            message: "Task not found."
        })
    }
    res.json(uptask);
}

//controller to fetch all tasks
exports.getAllTasks = async (req, res) => {
    const taskList = await Task.find();
    console.log("The task list : \n", taskList);
    res.json(taskList);
}