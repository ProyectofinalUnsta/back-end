import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  gmail: {
    type: String,
    required: true,
    trim: true
  },
  eventCode: {
    type: String,
    required: true,
    trim: true
  },
  uploadCode: {
    type: String,
    required: true,
    trim: true
  },
  fileName: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  fileUrl: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    required: true
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },
  size: {
    type: Number,
    required: true
  }
});

export const File = mongoose.model('File', fileSchema); 