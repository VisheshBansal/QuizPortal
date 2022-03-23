const mongoose = require('mongoose');
const QuizSchema = mongoose.Schema({
    email: { type: String },
    questionID: { type: String },
    answer: { type: String },
    marks: { type: Number },
    createdAt: { type: Date, default: Date.now() }
});

const QuestionsSchema = mongoose.Schema({
    subject: { type: String },
    question: { type: String },
    options: { type: Array },
    answer: { type: String },
    marks: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now() }
});

const question = mongoose.model('questions', QuestionsSchema);
const quiz = mongoose.model('quiz', QuizSchema);

module.exports = {
    question,
    quiz
};
