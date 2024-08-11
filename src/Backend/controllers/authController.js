const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register a new user
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const db = req.app.locals.db;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { name, email, password: hashedPassword };
    const result = await db.collection("users").insertOne(newUser);
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: result.insertedId,
        name: newUser.name,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error); // Log the error to the console
    res.status(500).json({ message: "Error registering user", error });
  }
};

// Login a user
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const db = req.app.locals.db;

  try {
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid credentials: User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid credentials: Password mismatch" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({
      token,
      userId: user._id, // Include userId in the response
      name: user.name,
    });
  } catch (error) {
    console.error("Error logging in:", error); // Log the error to the console
    res.status(500).json({ message: "Error logging in", error });
  }
};