const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    title: {
        type: String
        , required: true
    },
    deadline: {
        type: Date
    },
    note: {
        type: String
    }
    , Completed: Boolean
})
const Task = mongoose.model("Task", taskSchema);
module.exports = Task;