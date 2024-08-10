const { Storage } = require('@google-cloud/storage');
const multer = require('multer');
const multerGoogleStorage = require('multer-google-storage');

// Configure Google Cloud Storage
const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT_ID,
  keyFilename: process.env.GCLOUD_KEY_FILE
});

const bucket = storage.bucket(process.env.GCLOUD_BUCKET_NAME);

const upload = multer({
  storage: multerGoogleStorage.storageEngine({
    bucket: process.env.GCLOUD_BUCKET_NAME,
    projectId: process.env.GCLOUD_PROJECT_ID,
    keyFilename: process.env.GCLOUD_KEY_FILE,
    acl: 'publicRead',
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  })
});

module.exports = upload;