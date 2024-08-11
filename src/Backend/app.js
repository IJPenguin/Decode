require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const { MongoClient } = require('mongodb');
const passport = require('passport');
const session = require('express-session');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const globalLimiter = require('./middleware/globalLimiter');
const codeExecutionRoutes = require('./routes/codeExecution');
const authRoutes = require('./routes/authRoutes');
const contestRoutes = require('./routes/contestRoutes'); // Import contest routes
require('./auth/passport');

const app = express();

// Configure trust proxy securely
app.set('trust proxy', 1); // Adjust the number of trusted hops as needed

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
    app.locals.db = client.db();
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
    process.exit(1);
  }
}

connectToDatabase().then(() => {
  // Middleware setup
  app.use(cors({ origin: '*' }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(globalLimiter);

  const codeExecutionLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 5,
    message: "Too many code execution requests from this IP, please try again after a minute.",
  });

  // Routes setup
  app.use('/api/code', codeExecutionLimiter, codeExecutionRoutes);
  app.use('/auth', authRoutes);

  const userRoutes = require('./routes/userRoutes')(client);
  app.use('/api', userRoutes);

  app.use('/api/contests', contestRoutes); // Use contest routes

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

module.exports = { app, client };