// middleware/multer.js
const multer = require('multer');
const storage = multer.diskStorage({}); // No need to save locally
const upload = multer({ storage });

module.exports = upload;
