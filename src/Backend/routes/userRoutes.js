const express = require("express");
const { ObjectId } = require("mongodb");

module.exports = (client) => {
  const router = express.Router();

  // Mock middleware to add user to req object for testing
  router.use((req, res, next) => {
    req.user = { id: "60d0fe4f5311236168a109ca" }; // Replace with a valid ObjectId string
    next();
  });

  // Endpoint to get user data
  router.get("/userdata", async (req, res) => {
    try {
      const db = client.db(); // Use the database specified in the connection string
      const usersCollection = db.collection("users"); // Replace with your collection name

      const userId = req.user.id;

      const user = await usersCollection.findOne({
        _id: ObjectId.createFromHexString(userId),
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const userData = {
        numberOfQuestionsSolved: user.numberOfQuestionsSolved,
        last5QuestionsSolved: user.last5QuestionsSolved.slice(-5),
        languagesUsed: user.languagesUsed,
      };

      res.json(userData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

// Endpoint to add a new question
router.post("/add-question", async (req, res) => {
  try {
    const db = client.db(); // Use the database specified in the connection string
    const questionsCollection = db.collection("questions"); // Replace with your collection name

    const { questionTitle, question, difficulty, testCases, examples, images } = req.body;
    const userId = req.user.id; // Assuming user ID is available in req.user

    if (!questionTitle || !question || !difficulty || !testCases || !examples) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Count the existing questions to determine the new question number
    const questionCount = await questionsCollection.countDocuments();
    const questionNumber = questionCount + 1;

    // Create a new ObjectId that includes user information
    const userObjectId = new ObjectId();

    const newQuestion = {
      questionNumber,
      questionTitle,
      question,
      difficulty,
      testCases,
      examples,
      images: images || [],
      addedBy: {
        userId: ObjectId.createFromHexString(userId),
        userObjectId: userObjectId,
      },
      createdAt: new Date(),
    };

    const result = await questionsCollection.insertOne(newQuestion);

    res.status(201).json({
      message: "Question added successfully",
      questionId: result.insertedId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to get questions
router.get("/questions", async (req, res) => {
  try {
    const db = client.db(); // Use the database specified in the connection string
    const questionsCollection = db.collection("questions"); // Replace with your collection name

    // Use projection to return only the specified fields
    const questions = await questionsCollection
      .find({}, { projection: { questionTitle: 1, questionNumber: 1, difficulty: 1 } })
      .toArray();

    res.status(200).json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to get a question by question number
router.get("/questions/:questionNumber", async (req, res) => {
  try {
    const db = client.db(); // Use the database specified in the connection string
    const questionsCollection = db.collection("questions"); // Replace with your collection name

    const questionNumber = parseInt(req.params.questionNumber, 10);

    // Use projection to return only the specified fields
    const question = await questionsCollection.findOne(
      { questionNumber },
      { projection: { questionTitle: 1, questionNumber: 1, difficulty: 1 } }
    );

    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.status(200).json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Endpoint to get the entire question by question number
router.get("/question-data/:questionNumber", async (req, res) => {
  try {
    const db = client.db(); // Use the database specified in the connection string
    const questionsCollection = db.collection("questions"); // Replace with your collection name

    const questionNumber = parseInt(req.params.questionNumber, 10);

    // Find the question by question number
    const question = await questionsCollection.findOne({ questionNumber });

    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.status(200).json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

return router;

  return router;
};
