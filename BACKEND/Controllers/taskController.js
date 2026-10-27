const Task = require("../model/task");

// Controller to add tasks
exports.postAddTask = async (req, res, next) => {
    try {
        const { title, note, dateDeadline, timeDeadline } = req.body;
        if (!title || !title.trim()) {
            return res.status(400).json({ message: "Task title is required." });
        }

        let deadline = null;
        if (dateDeadline && timeDeadline) {
            const parsedDate = new Date(`${dateDeadline}T${timeDeadline}`);
            if (!isNaN(parsedDate.getTime())) {
                deadline = parsedDate;
            }
        }

        const task = new Task({
            title: title.trim(),
            deadline: deadline,
            note: note || "",
            Completed: false
        });

        const existingTask = await Task.findOne({
            title: task.title,
            deadline: deadline
        });

        if (existingTask) {
            return res.status(409).json({
                message: "Task already exists."
            });
        }

        await task.save();
        return res.status(201).json({
            message: "Task added successfully.",
            task: task
        });
    } catch (err) {
        console.error("Error in postAddTask:", err);
        return res.status(500).json({
            message: "Failed to add task.",
            error: err.message
        });
    }
};

// Controller to delete task (supports both DELETE and legacy GET)
const deleteTask = async (req, res, next) => {
    try {
        const del_Id = req.params.id;
        const task = await Task.findByIdAndDelete(del_Id);
        if (!task) {
            return res.status(404).json({
                message: "Task not found."
            });
        }
        return res.json({
            message: "Task deleted successfully.",
            id: del_Id
        });
    } catch (err) {
        console.error("Error in deleteTask:", err);
        if (err.name === "CastError") {
            return res.status(400).json({ message: "Invalid task ID format." });
        }
        return res.status(500).json({
            message: "Failed to delete task.",
            error: err.message
        });
    }
};

exports.deleteTask = deleteTask;
exports.getDeleteTask = deleteTask; // backward compatibility

// Controller to update task
exports.postUpdateTask = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { title, deadline, note, Completed } = req.body;

        const updateFields = {};
        if (title !== undefined) updateFields.title = title;
        if (deadline !== undefined) updateFields.deadline = deadline;
        if (note !== undefined) updateFields.note = note;
        if (Completed !== undefined) updateFields.Completed = Completed;

        const uptask = await Task.findByIdAndUpdate(
            id,
            updateFields,
            { new: true, runValidators: true }
        );

        if (!uptask) {
            return res.status(404).json({
                message: "Task not found."
            });
        }

        return res.json(uptask);
    } catch (err) {
        console.error("Error in postUpdateTask:", err);
        if (err.name === "CastError") {
            return res.status(400).json({ message: "Invalid task ID format." });
        }
        return res.status(500).json({
            message: "Failed to update task.",
            error: err.message
        });
    }
};

// Controller to fetch all tasks
exports.getAllTasks = async (req, res, next) => {
    try {
        const taskList = await Task.find().sort({ deadline: 1 });
        return res.json(taskList);
    } catch (err) {
        console.error("Error in getAllTasks:", err);
        return res.status(500).json({
            message: "Failed to fetch tasks.",
            error: err.message
        });
    }
};
