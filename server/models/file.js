const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const fileSchema = new mongoose.Schema({
    path: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    downloadCount: {
        type: Number,
        default: 0
    },
    shareableLink: {
        type: String,
        unique: true,
        default: uuidv4 // Generate a unique shareable link
    },
    expiresAt: {
        type: Date,
        default: null
    }
});

fileSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 60 });

const File = mongoose.model('File', fileSchema);
module.exports = File;
