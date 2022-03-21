const mongoose = require("mongoose")
const Quiz = require("../models/quiz")

exports.make = async (req, res) => {
    const { title, subject } = req.body
    console.log(req.body);
    const quiz = new Quiz({
        _id: new mongoose.Types.ObjectId(),
        name: title,
        subject: subject
    })
    quiz
        .save()
        .then((quiz) => {
            return res.status(201).json({
                success: "true",
                _id: quiz.id
            })
        })
}

exports.addQuestion = async (req, res) => {
    const { id } = req.query
    const { question } = req.body
    console.log(req.body);

    const r = await Quiz.findOneAndUpdate(
        { id: id }
        , { $push: { questions: question } })
    return res.status(200).json({
        success: true,
        message: "Question added"
    })

}

exports.viewQuiz = async (req, res) => {
    const { id } = req.query
    Quiz.findById(id).then((quiz) => {
        res.status(200).json({
            success: true,
            quiz
        })
    })

}