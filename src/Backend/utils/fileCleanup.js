// /src/backend/utils/fileCleanup.js

const fs = require('fs');
const path = require('path');

/**
 * Deletes a file from the filesystem.
 * @param {string} filePath - The path to the file to be deleted.
 */
const cleanupFile = (filePath) => {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(`Error deleting file ${filePath}:`, err);
        } else {
            console.log(`Successfully deleted file ${filePath}`);
        }
    });
};

module.exports = { cleanupFile };
