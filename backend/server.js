const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');
dotenv.config({ path: 'backend/config/config.env' });

const PORT = process.env.PORT;
connectDatabase(); //connecting to the database

const server = app.listen(PORT, () => {
    console.log('Server is working on ', PORT);
});

// handle uncaught exception
process.on("uncaughtException", err => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to unhandled exception');
    server.close(() => {
        process.exit(1);
    });
});

// on UnhandledPromise rejection
process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to unhandled Promise rejection');
    server.close(() => {
        process.exit(1);
    });
});