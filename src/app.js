const express = require('express');
const basicRoutes = require('./routes/basic');
const requestLogger = require('./middleware/requestLogger');

const app = express();

// Middleware
app.use(express.json());
app.use(requestLogger);

// Routes
app.use('/api', basicRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = app;