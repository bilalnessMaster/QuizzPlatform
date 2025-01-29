import mongoose from "mongoose";
const Schema = mongoose.Schema;

const attempSchema = new Schema(
  {
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
    score: {
      type: Number,
      required: true,
    },
    language: {
      type: String,
      enum: ["french", "english"],
    },
    category: [],
    status: {
      type: String,
      enum: ["passed", "failed"],
    },
    maxScore: {
      type: Number,
      required: true,
    },
    answers: [
      {
        question: {
          type : String,
        },
        answers : [] // select answers for a specific question
      },
    ], // of objects with each question and the right and selected answer
    timeTaken: {
      type: Number,
      required: true,
    }, // time taken for each user to take quizz in  second
  },
  { timestamps: true }
);

const Attempt = mongoose.model('Attempt' , attempSchema)
export default Attempt;