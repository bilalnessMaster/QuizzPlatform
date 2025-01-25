import mongoose from 'mongoose';

const Schema = mongoose.Schema
const QuestionSchema= new Schema({
    answer: {
        type : String , 
        required : true
    },
    right: {
        type : Boolean , 
        required : true
    },
    
})
const QcmSchema = new Schema({
    type: {
        type : String , 
        enum : ['radio', 'checkbox']
    },
    question: {
        type : String , 
        required : true
    },
    answers: [
        QuestionSchema
    ],
    category: {
        type : String , 
        required : true
    },
    language: {
        type : String , 
        required : true ,
        enum : ['english', 'french']
    },
    level: {
        type : String , 
        required : true ,
        enum : ['easy', 'medium', 'hard']
    },
    tags: [],
    createdBy: {
        type: String , 
        default : "admin"
    },
},{timestamps : true})

const Qcm = mongoose.model('Qcm' , QcmSchema)

export default Qcm;