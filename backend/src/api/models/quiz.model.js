const mongoose = require('mongoose');
const QuizSchema = new mongoose.Schema({
  name : { type: String, required: true, default: "Unnamed quiz" },
  time: { type: String, required: true, default: '00:00:00' },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  attempted: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    noOfAttempts: { type: Number, default: 0 },
    lastAttempt: [{
      question: { type: String },
      answer: { type: String },
      correct: { type: Boolean }
    }],
    score: { type: Number, default: 0 },
    date: { type: Date, default: Date.now }
  }],
  questions: [{
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    answer: { type: String, required: true }
  }],
  date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Quiz', QuizSchema)