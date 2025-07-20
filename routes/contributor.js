// models/contributor.js
const mongoose = require('mongoose');

const contributorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  avatar: String,
  trend: String,
  questions: Number,
  answers: Number,
  best: Number,
  badges: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Contributor', contributorSchema);
