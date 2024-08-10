const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid"); // Import the UUID package

exports.executeCode = (req, res) => {
  const { language, code } = req.body;

  // Generate a unique filename using UUID
  const uniqueId = uuidv4();
  const fileName = `solution_${uniqueId}.${getFileExtension(language)}`;
  const filePath = path.join(__dirname, "..", "..", "solutions", fileName);

  // Write the code to a file
  fs.writeFileSync(filePath, code);

  // Build the Docker command
  const dockerImagePath = path.join(__dirname, "..", "..", "docker", language);
  const dockerCmd = `
        docker build -t ${language}-executor ${dockerImagePath} && 
        docker run --rm -v ${filePath}:/usr/src/app/${fileName} ${language}-executor`;

  // Execute the Docker command
  exec(dockerCmd, (error, stdout, stderr) => {
    cleanupFile(filePath); // Perform file cleanup after execution

    if (error) {
      return res.status(500).json({ error: stderr });
    }
    return res.json({ output: stdout });
  });
};

const getFileExtension = (language) => {
  switch (language) {
    case "python":
      return "py";
    case "javascript":
      return "js";
    case "cpp":
      return "cpp";
    case "c":
      return "c";
    case "java":
      return "java";
    case "rust":
      return "rs";
    default:
      throw new Error("Unsupported language");
  }
};

const cleanupFile = (filePath) => {
  // Remove the file after execution to free up space
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Error deleting file: ${filePath}`, err);
    }
  });
};
