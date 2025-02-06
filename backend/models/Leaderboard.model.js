import mongoose from "mongoose";
const Schema = mongoose.Schema;

const LearderboardSchema = new Schema({
    userId :{ 
            type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
          index: true,
          unique: true
    }, 
    accuracyPercentage   : { 
        type : Number, 
        default :  0,
        index: true,
    },
    attempts   : { 
        type : Number, 
        default :  0,
        index: true,
    },
    totalPassedQuizzes : { 
        type : Number, 
        default :  0,
        index: true,
    },
    totalTimeSpent: { type: Number, default: 0 },
    rank : {
        type : String , 
        default : "Bronze"
    }
})

const Leaderboard = mongoose.model('leaderboard' , LearderboardSchema)

export default Leaderboard;