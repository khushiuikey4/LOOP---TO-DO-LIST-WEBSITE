const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const taskRouter = require("./Routers/taskRouter");

const PORT = process.env.PORT || 3000;
const DB_PATH = process.env.DB_PATH;

const app = express();

// CORS configuration (allows FRONTEND_URL if set, otherwise allows all origins)
const corsOptions = process.env.FRONTEND_URL
    ? { origin: process.env.FRONTEND_URL.split(','), credentials: true }
    : { origin: '*' };

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint (for cloud provider health probes like Render/Railway)
app.get('/', (req, res) => {
    res.json({ status: 'ok', message: 'To-Do List API is running.' });
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok', uptime: process.uptime() });
});

// Routes
app.use('/task', taskRouter);

// 404 Handler
app.use((req, res, next) => {
    res.status(404).json({ message: `Route ${req.method} ${req.url} not found.` });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Unhandled Server Error:", err);
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
        error: process.env.NODE_ENV === 'production' ? {} : err.stack
    });
});

// Database connection & Server initialization
if (!DB_PATH) {
    console.error("FATAL: DB_PATH environment variable is not defined. Please set it in your .env or hosting environment.");
} else {
    mongoose.connect(DB_PATH)
        .then(() => {
            console.log("MongoDB connected successfully with mongoose.");
            app.listen(PORT, () => {
                console.log(`Server started successfully on port ${PORT}.`);
            });
        })
        .catch((err) => {
            console.error("MongoDB connection failed:", err.message);
        });
}

module.exports = app;
