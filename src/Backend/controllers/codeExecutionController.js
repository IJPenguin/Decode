const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

exports.executeCode = (req, res) => {
    const { language, code } = req.body;

    // Define file paths
    const fileName = `solutions.${getFileExtension(language)}`;
    const filePath = path.join(__dirname, '..', fileName);
    
    // Write the code to a file
    fs.writeFileSync(filePath, code);
    
    // Build the Docker command
    const dockerImagePath = path.join(__dirname, '..', 'docker', language);
    const dockerCmd = `docker build -t ${language}-executor ${dockerImagePath} && docker run --rm ${language}-executor`;
    
    // Execute the Docker command
    exec(dockerCmd, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ error: stderr });
        }
        return res.json({ output: stdout });
    });
};

const getFileExtension = (language) => {
    switch (language) {
        case 'python':
            return 'py';
        case 'javascript':
            return 'js';
        case 'cpp':
            return 'cpp';
        case 'c':
            return 'c';
        case 'java':
            return 'java';
        case 'rust':
            return 'rs';
        default:
            throw new Error('Unsupported language');
    }
};
