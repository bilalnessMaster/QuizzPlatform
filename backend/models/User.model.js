import mongoose from 'mongoose';
import bcrypt from 'bcrypt'

const Schema = mongoose.Schema
const userSchema = new Schema({
    name : {
        type : String , 
        required : true
    },
    username : {
        type : String ,
        required : true ,
        unique : true
    },
    email : {
        type : String ,
        required : true ,
        unique : true
    },
    password : {
        type  : String , 
        required : true,
        min : 6
    }
},{timestamps: true})

userSchema.pre('save', async function(next){
   try {
    if(!this.isModified('password')) next()
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password , salt)
        next()
   } catch (error) {
    console.log('error occured while hashing password ' +error);
    next(error)
   }
})
userSchema.methods.comparePassword = async function(pwd){
    return bcrypt.compare(pwd , this.password)
}


const User = mongoose.model('User', userSchema)


export default User;