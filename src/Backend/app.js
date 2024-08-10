const express = require("express");
const rateLimit = require("express-rate-limit");

const app = express();

// Global rate limiter with a lenient limit
const globalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute window
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after a minute.",
});

// Apply the global rate limiter to all requests
app.use(globalLimiter);

// Specific rate limiter for the /api/code/execute route
const codeExecutionLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute window
  max: 5, // Limit each IP to 5 requests per windowMs for code execution
  message:
    "Too many code execution requests from this IP, please try again after a minute.",
});

// Apply the specific rate limiter to the /api/code/execute route
app.use("/api/code/execute", codeExecutionLimiter);

app.use(express.json());

// Import and use the code execution routes
const codeExecutionRoutes = require("./routes/codeExecution");
app.use("/api/code", codeExecutionRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
