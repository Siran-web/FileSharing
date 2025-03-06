const File = require('../models/file');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const file = new File({
            name: req.file.originalname,
            path: req.file.path,
            shareableLink: uuidv4(), // Generate a unique ID for sharing
            expiresAt: null // Set expiration if needed
        });

        await file.save();

        res.status(200).json({
            message: 'File uploaded successfully',
            fileUrl: `http://localhost:8000/files/download/${file.shareableLink}`
        });
    } catch (error) {
        console.error('Error during file upload:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getFile = async (req, res) => {
    try {
        const file = await File.findOne({ shareableLink: req.params.id });
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        // Increase download count
        file.downloadCount += 1;
        await file.save();

        res.download(file.path);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving file' });
    }
};

module.exports = { uploadFile, getFile };
