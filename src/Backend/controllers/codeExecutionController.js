const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

exports.executeCode = (req, res) => {
    const { language, code } = req.body;

    // Adjust filename for Java
    const fileName = language === "java" ? "solutions.java" : `solution_${uuidv4()}.${getFileExtension(language)}`;
    const solutionsDir = path.join(__dirname, "..", "..", "src", "solutions");
    const filePath = path.join(solutionsDir, fileName);

    // Ensure the solutions directory exists
    if (!fs.existsSync(solutionsDir)) {
        fs.mkdirSync(solutionsDir, { recursive: true });
    }

    // Write the code to a file
    fs.writeFileSync(filePath, code);

    // Map of Docker run commands for each language
    const dockerCommands = {
        python: `docker run --rm -v ${normalizePath(filePath)}:/app/${fileName} python-executor python /app/${fileName}`,
        javascript: `docker run --rm -v ${normalizePath(filePath)}:/app/${fileName} js-executor`,
        cpp: `docker run --rm -v ${normalizePath(filePath)}:/app/${fileName} cpp-dev-executor /bin/sh -c "g++ -o /app/solutions /app/${fileName} && /app/solutions"`,
        c: `docker run --rm -v ${normalizePath(filePath)}:/app/${fileName} c-executor /bin/sh -c "gcc -o /app/solutions /app/${fileName} && /app/solutions"`,
        java: `docker run --rm -v ${normalizePath(filePath)}:/workspace/${fileName} java-dev /bin/sh -c "javac /workspace/solutions.java && java -cp /workspace solutions"`,
        rust: `docker run --rm -v ${normalizePath(filePath)}:/usr/src/app/${fileName} rust-executor /bin/sh -c "rustc /usr/src/app/${fileName} -o /usr/src/app/solution && /usr/src/app/solution"`
    };

    const dockerCmd = dockerCommands[language];

    // Execute the Docker command
    exec(dockerCmd, (error, stdout, stderr) => {
        cleanupFile(filePath); // Perform file cleanup after execution

        if (error) {
            console.error(`Exec error: ${error.message}`);
            return res.status(500).json({ error: error.message });
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
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
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(`Error deleting file: ${filePath}`, err);
        }
    });
};

const normalizePath = (filePath) => {
    // Convert Windows backslashes to Unix forward slashes
    return process.platform === "win32" ? filePath.replace(/\\/g, "/") : filePath;
};
