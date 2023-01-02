const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionsSchema = new Schema(
  {
    body: String,
    student: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    rating: [
      {
        studentId: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        studentName: String,
      },
    ],
    answerType: {
      answered: {
        type: Boolean,
        default: false,
      },
      date: String,
    },
    responses: [
      {
        studentId: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        understanding: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

const Question = mongoose.model("Question", questionsSchema);

module.exports = Question;
