const mongoose = require('mongoose');

const electiveSchema = new mongoose.Schema({
  subjectName: {
    type: String,
    required: true,
    trim: true
  },
  subjectCode: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String
  },
  department: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    default: 60
  },
  enrolledStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  status: {
    type: String,
    enum: ['Open', 'Closed'],
    default: 'Open'
  },
  semester: {
    type: Number,
    required: true
  },
  year: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Elective', electiveSchema);
