const mongoose = require("mongoose");

const quizSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,

    name: { type: String },
    subject : {type:String},
    questions : [{ type:mongoose.Mixed}]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quiz", quizSchema);