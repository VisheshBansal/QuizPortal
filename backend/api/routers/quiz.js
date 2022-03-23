const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const User = require('../models/User');
const Quiz = require('../models/quiz');

router.post('/add',
    [
        check('subject', 'The name of Subject is Required').not().isEmpty(),
        check('question', 'Question is Required').not().isEmpty(),
        check('options', 'Options are requires, accepts an array').not().isEmpty(),
        check('answer', 'A Answer is require (string)').not().isEmpty(),
        check('marks', 'Enter Marks In Numeric').isNumeric(),
    ], auth, async (req, res) => {
        const user = await User.findById(req.user.id);
        if (!user.isAdmin) return res.status(401).json({status: false, message: 'Unauthorized'});
        const errors = validationResult(req); 
        if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() }); }
        const { subject, question, options, answer, marks } = req.body;
        console.log(subject, question, options, answer, marks);
        if (!subject || !question || !options || !answer || !marks) return res.status(400).json({status: false, message: 'Please fill all the fields'});
        const q = new Quiz.question({
            subject,
            question,
            options,
            answer,
            marks,
        });
        q.save()
            .then(() => {
                res.status(200).json({
                    status: true,
                    id: q._id,
                    message: 'Question added successfully'
                });
            })
            .catch(err => {
                res.status(500).json({status: false, message: err.message});
            });
    });


router.get('/get', auth, async (req, res) => { // get data from database, if Admin, will send all data, else will send only the data of the user
    const user = await User.findById(req.user.id);
    if (user.isAdmin) {
        const quizes = await Quiz.quiz.find();
        Quiz.question.find()
            .then(questions => {
                res.status(200).json({
                    status: true,
                    quizes: quizes,
                    questions: questions
                });
            })
            .catch(err => {
                res.status(500).json({status: false, message: err.message});
            });
    }
    else {
        const email = user.email;
        const questions = await Quiz.question.find();
        const qattempted = await Quiz.quiz.find({email: email});
        let allQuestions = [];

        if (!qattempted) {
            for (let i = 0; i < questions.length; i++) {
                allQuestions.questions.push({
                    questionID: questions[i].id,
                    attempted: false,
                    mark: questions[i].marks
                });
            } 
            return res.status(200).json({
                status: true,
                allQuestions
            });
        }
        else {

            // // allQuestions = [];
            // // for (let i = 0; i < questions.length; i++) {
            // //     let flag = false;
            // //     for (let j = 0; j < qattempted.length; j++) {
            // //         if (questions[i].id.toString() === qattempted[j].questionID.toString()) {
            // //             flag = true;
            // //             break;
            // //         }
            // //     }
            // //     if (!flag) {
            // //         allQuestions.push(questions[i]);
            // //     }
            // // }
            // // if (allQuestions.length !== 0) {
            // //     // push the allQuestions to qattempted
            // //     for(let i = 0; i < allQuestions.length; i++) {
            // //         qattempted.push({
            // //             email: email,
            // //             questionID: allQuestions[i].id,
            // //             attempted: false,
            // //         });
            // //     }
            // // }
            allQuestions = [];
            let outOf = 0;
            let myMarks = 0;
            for (let i = 0; i < questions.length; i++) {
                outOf += questions[i].marks;
                let attempted = false;
                let marksObtained = 0;
                for (let j = 0; j < qattempted.length; j++) {
                    if (questions[i].id === qattempted[j].questionID) {
                        attempted = true;
                        myMarks += qattempted[j].marks;
                        marksObtained = qattempted[j].marks;
                        break;
                    }
                }
                allQuestions.push({
                    questionID: questions[i].id,
                    attempted,
                    totalMarks: questions[i].marks,
                    marksObtained
                });
            }
            return res.status(200).json({
                status: true,
                questions: allQuestions,
                myMarks,
                outOf: outOf
            });
        }

    }
});

router.post('/submit', 
    [
        check('questionID', 'Provide A Question ID').not().isEmpty(),
        check('answer', 'Provide a Answer').not().isEmpty(),
    ], auth, async (req, res) => { // this is the user endpoint where the user can submit the question
        const { questionID, answer } = req.body;
        const user = await User.findById(req.user.id);
        // check marks
        let marks = 0;
        let attempted = false;
        // check if attempted is true
        const quizes = await Quiz.quiz.find({email: user.email});
        for (let i = 0; i < quizes.length; i++) {
            if (quizes[i].questionID.toString() === questionID.toString()) {
                attempted = true;
                break;
            }
        }
        if (attempted) return res.status(400).json({status: false, message: 'You have already attempted this question'}); 
    
        const ogquestion = await Quiz.question.findById(questionID);
        if (!ogquestion) return res.status(400).json({status: false, message: 'Question not found'});
        if (ogquestion.answer === answer) {
            marks = ogquestion.marks;
        }
        const question = new Quiz.quiz({
            email: user.email,
            questionID,
            answer,
            marks
        });

        question.save()
            .then(() => {
                res.status(200).json({
                    status: true,
                    message: 'Question submitted successfully'
                });
            })
            .catch(err => {
                res.status(500).json({status: false, message: err.message});
            });
    });


module.exports = router;