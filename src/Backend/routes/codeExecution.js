const express = require('express');
const rateLimit = require('express-rate-limit');
const { executeCode } = require('../controllers/codeExecutionController');

const router = express.Router();

// Define rate limiter for the /execute route
const codeExecutionLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute window
    max: 5, // Limit each IP to 5 requests per windowMs
    message: "Too many code execution requests from this IP, please try again after a minute."
});

// Apply the rate limiter to the /execute route
router.post('/execute', codeExecutionLimiter, executeCode);

module.exports = router;
