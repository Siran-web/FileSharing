const express = require('express');
const multer = require('multer');
const fileController = require('../controllers/controller.js');

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

router.post('/upload', upload.single('file'), fileController.uploadFile);
router.get('/files/download/:id', fileController.getFile);

module.exports = router;
