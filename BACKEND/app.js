
const express = require('express');
const mongoose = require('mongoose');
const taskRouter = require("./Routers/taskRouter")
const cors = require('cors');
const DB_PATH = "mongodb+srv://<userName>:<password>@ferrox.ocin5yt.mongodb.net/<database>?appName=ferrox";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(DB_PATH).then(() => {
    console.log("MongoDB connected successfully with mongoose.");
    app.listen(3000, () => {
        console.log("Server started Successfully.");
    })
}).catch((err) => {
    console.log("MongoDB connection failed : ", err);
})
app.use('/task', taskRouter);
