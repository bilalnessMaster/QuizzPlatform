import mongoose from 'mongoose';

const Schema = mongoose.Schema 

const AnalyticsSchema = new Schema({
    userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
          index: true,
          unique: true 
    },
    totalQuestionsAttempted  : {
        type : Number, // total number of question you had answered , 
        default :  0

    }, 
    totalPassedQuizzes  : {
        type : Number,  // how many quizz you had passed sucessfully basicaly 50% <=
        default : 0
    } ,
    totalCorrectAnswers  : {
        type : Number,  // number of questions you did  in successfully attempt 
    
        default :  0
    }, 
    totalTimeSpent: {
        type: Number,
        default: 0
    },
    accuracyPercentage   : { 
        type : Number, // over all accuracy 
        default :  0
    },
    weakTopics  : [
        {
            category : String , 
            incorrectAnswers : {
                type: Number ,
                default : 0
            }
        }
    ], 
    strongTopics: [
        {
            category : String , 
            correctAnswers : {
                type: Number ,
                default : 0
            }
        }
    ]
},{timestamps : true })

const Analytics = mongoose.model('Analytics', AnalyticsSchema)

export default Analytics;