const express = require('express');
const { MongoClient } = require('mongodb');
const passport = require('passport');
const session = require('express-session');
const rateLimit = require('express-rate-limit');
const cors = require('cors'); // Add this line
const globalLimiter = require('./middleware/globalLimiter'); // Ensure this path is correct
const codeExecutionRoutes = require('./routes/codeExecution');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config(); // Load environment variables from .env file
require('./auth/passport'); // Ensure Passport.js is configured

const app = express();

// MongoDB connection URI from environment variables
const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('MONGODB_URI is not defined in the environment variables');
  process.exit(1);
}
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    app.locals.db = client.db(); // Use the database specified in the connection string
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
    process.exit(1); // Exit the process if the connection fails
  }
}

connectToDatabase();

// Middleware
app.use(cors({ origin: '*' })); // Use CORS middleware and allow all origins
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Apply the global rate limiter to all requests
app.use(globalLimiter);

// Specific rate limiter for the /api/code/execute route
const codeExecutionLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute window
  max: 5, // Limit each IP to 5 requests per windowMs for code execution
  message: "Too many code execution requests from this IP, please try again after a minute.",
});

// Routes
app.use('/api/code', codeExecutionLimiter, codeExecutionRoutes); // Apply the rate limiter to the code execution route
app.use('/auth', authRoutes);

// Import userRoutes and pass the client
const userRoutes = require('./routes/userRoutes')(client);
app.use('/api', userRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  // console.log('MONGODB_URI:', process.env.MONGODB_URI); // Ensure sensitive information is not logged
});

module.exports = { app, client }; // Export client for use in routes