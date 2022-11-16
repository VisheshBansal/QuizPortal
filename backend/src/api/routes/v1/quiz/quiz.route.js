const { join } = require("path");
const router = require("express").Router();
const Joi = require("joi");
const quiz = require(join(
  __dirname,
  "..",
  "..",
  "..",
  "controllers",
  "quiz.controller"
));
const validate = require(join(
  __dirname,
  "..",
  "..",
  "..",
  "middleware",
  "validate.middleware"
));
const { authorise } = require(join(
  __dirname,
  "..",
  "..",
  "..",
  "middleware",
  "authorise.middleware"
));
// ! TO DO add picture to group; use pfp of group as picture
const schema = {
  getQuiz: Joi.object({
    id: Joi.string()
      .required()
      .regex(/^[0-9a-fA-F]{24}$/),
  }),
  createQuiz: Joi.object({
    // group: Joi.string().required(),
    name: Joi.string().required(),
    time: Joi.string()
      .required()
      .regex(/^[0-9]{1,2}:[0-9]{2}$/),
    // creator: Joi.string().required(),
    questions: Joi.array().items({
      question: Joi.string().required(),
      options: Joi.array().items(Joi.string().required()).min(2).required(),
      answer: Joi.string().required(),
    }),
  }),
  attemptQuiz: Joi.object({
    QuestionData: Joi.array().items({
      question: Joi.string().required(),
      answer: Joi.string().required(),
    }),
  }),
};

// quiz stuff here
router.post(
  "/new",
  validate(schema.createQuiz, "body"),
  authorise,
  quiz.createQuiz
);
router.get("/", quiz.getQuizzes);
router.get(
  "/:id",
  validate(schema.getQuiz, "params", "Invalid Quiz ID"),
  quiz.getQuiz
);
router.post(
  "/attempt/:id",
  validate(schema.getQuiz, "params", "Invalid Quiz ID"),
  validate(schema.attemptQuiz, "body"),
  quiz.attemptQuiz
);
router.get(
  "/:id/score",
  validate(schema.getQuiz, "params", "Invalid Quiz ID"),
  authorise,
  quiz.getQuizScore
);
// to test s
router.delete(
  "/:id",
  validate(schema.getQuiz, "params", "Invalid Quiz ID"),
  authorise,
  quiz.deleteQuiz
);

module.exports = router;
