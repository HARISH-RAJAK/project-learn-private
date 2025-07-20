const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  content: String,
  image: String,
  createdAt: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User" //
  }
});

const questionSchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: [String],
  image: String,
  author: String, // Optional: this could also be a user ref
  createdAt: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  answers: [answerSchema]
});

module.exports = mongoose.model('question', questionSchema);
