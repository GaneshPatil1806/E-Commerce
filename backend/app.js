const express = require('express');
const ErrorMiddleware = require('./middleware/error');
const cookieParser = require('cookie-parser');

const app = express();

// Middleware for parsing JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Route imports
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

// Mounting routes
app.use('/api/v1', productRoutes);
app.use('/api/v1', userRoutes);

// Error-handling middleware
app.use(ErrorMiddleware);

module.exports = app;
