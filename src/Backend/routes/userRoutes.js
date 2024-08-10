const express = require('express');
const { ObjectId } = require('mongodb');
const { v4: uuidv4 } = require('uuid'); // For generating unique question numbers

module.exports = (client) => {
  const router = express.Router();

  // Mock middleware to add user to req object for testing
  router.use((req, res, next) => {
    req.user = { id: '60d0fe4f5311236168a109ca' }; // Replace with a valid ObjectId string
    next();
  });

  // Endpoint to get user data
  router.get('/userdata', async (req, res) => {
    try {
      const db = client.db(); // Use the database specified in the connection string
      const usersCollection = db.collection('users'); // Replace with your collection name

      const userId = req.user.id;

      const user = await usersCollection.findOne({ _id: ObjectId.createFromHexString(userId) });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const userData = {
        numberOfQuestionsSolved: user.numberOfQuestionsSolved,
        last5QuestionsSolved: user.last5QuestionsSolved.slice(-5),
        languagesUsed: user.languagesUsed
      };

      res.json(userData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Endpoint to add a new question
  router.post('/add-question', async (req, res) => {
    try {
      const db = client.db(); // Use the database specified in the connection string
      const questionsCollection = db.collection('questions'); // Replace with your collection name

      const { question, difficulty, testCases, examples, images } = req.body;
      const userId = req.user.id; // Assuming user ID is available in req.user

      if (!question || !difficulty || !testCases || !examples) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Generate a unique question number
      const questionNumber = uuidv4();

      // Create a new ObjectId that includes user information
      const userObjectId = new ObjectId();

      const newQuestion = {
        questionNumber,
        question,
        difficulty,
        testCases,
        examples,
        images: images || [],
        addedBy: {
          userId: ObjectId.createFromHexString(userId),
          userObjectId: userObjectId
        },
        createdAt: new Date()
      };

      const result = await questionsCollection.insertOne(newQuestion);

      res.status(201).json({ message: 'Question added successfully', questionId: result.insertedId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  return router;
};