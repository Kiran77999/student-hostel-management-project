const mongoose = require('mongoose');

const lostItemSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['Lost', 'Found']
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  time: {
    type: String
  },
  image: {
    type: String
  },
  reporter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Recovered', 'Returned'],
    default: 'Active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('LostItem', lostItemSchema);
