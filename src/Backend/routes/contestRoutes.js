const express = require('express');
const { ObjectId } = require('mongodb');
const axios = require('axios'); // Import axios
const router = express.Router();

// Endpoint to create a new contest and add questions
router.post('/create-contest', async (req, res) => {
  try {
    const db = req.app.locals.db; // Use the database connection from app.locals
    const contestsCollection = db.collection('contests'); // Replace with your collection name
    const questionsCollection = db.collection('questions'); // Replace with your questions collection name

    const { contestName, description, startDate, endDate, questions } = req.body;

    if (!contestName || !description || !startDate || !endDate || !Array.isArray(questions)) {
      return res.status(400).json({ error: 'Missing required fields or questions is not an array' });
    }

    const newContest = {
      contestName,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      questions: [], // Will be populated with question IDs
      submissions: [], // Will store user submissions
      createdAt: new Date(),
    };

    const contestResult = await contestsCollection.insertOne(newContest);
    const contestId = contestResult.insertedId;

    // Add questions to the contest
    const questionIds = [];
    for (const question of questions) {
      try {
        let questionId;

        // Check if the question already exists
        const existingQuestion = await questionsCollection.findOne({ questionText: question.questionText });
        if (existingQuestion) {
          questionId = existingQuestion._id;
        } else {
          // Add new question
          const response = await axios.post(`${process.env.API_BASE_URL}/api/add-question`, question, {
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (response.status === 201) {
            questionId = response.data.questionId;
          } else {
            return res.status(response.status).json({ error: 'Failed to add question' });
          }
        }

        questionIds.push(questionId);
      } catch (error) {
        console.error('Error adding question:', error);
        return res.status(500).json({ error: 'Failed to add question' });
      }
    }

    // Update the contest with the question IDs
    await contestsCollection.updateOne(
      { _id: contestId },
      { $set: { questions: questionIds } }
    );

    res.status(201).json({
      message: 'Contest created successfully',
      contestId: contestId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to submit contest results
router.post('/submit-contest', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const contestsCollection = db.collection('contests');

    const { contestId, userId, timeTaken, solvedQuestions } = req.body;

    if (!contestId || !userId || !timeTaken || !Array.isArray(solvedQuestions)) {
      return res.status(400).json({ error: 'Missing required fields or solvedQuestions is not an array' });
    }

    // Calculate points
    let points = 0;
    for (const question of solvedQuestions) {
      if (question.difficulty === 'easy') {
        points += 2;
      } else if (question.difficulty === 'medium') {
        points += 4;
      } else if (question.difficulty === 'hard') {
        points += 8;
      }
    }

    const submission = {
      userId,
      timeTaken,
      solvedQuestions: solvedQuestions.length,
      points,
    };

    // Update the contest with the new submission
    await contestsCollection.updateOne(
      { _id: ObjectId(contestId) },
      { $push: { submissions: submission } }
    );

    res.status(201).json({ message: 'Submission successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to get the leaderboard for a contest
router.get('/leaderboard/:contestId', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const contestsCollection = db.collection('contests');

    const { contestId } = req.params;

    const contest = await contestsCollection.findOne({ _id: ObjectId(contestId) });

    if (!contest) {
      return res.status(404).json({ error: 'Contest not found' });
    }

    // Sort submissions by points, time taken, and number of questions solved
    const leaderboard = contest.submissions.sort((a, b) => {
      if (b.points !== a.points) {
        return b.points - a.points;
      }
      if (a.timeTaken !== b.timeTaken) {
        return a.timeTaken - b.timeTaken;
      }
      return b.solvedQuestions - a.solvedQuestions;
    });

    res.status(200).json(leaderboard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to get all contests
router.get('/contests', async (req, res) => {
  try {
    const db = req.app.locals.db; // Use the database connection from app.locals
    const contestsCollection = db.collection('contests'); // Replace with your collection name

    const contests = await contestsCollection.find({}).toArray();

    res.status(200).json(contests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;