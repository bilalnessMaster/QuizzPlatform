import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

export const db = async ()=>{
    try {
        const url = process.env.URL_TO_MONGODB
        await mongoose.connect(url)
        console.log('CONNECTED SUCCESSFULLY');
        
    } catch (error) {
        console.log('error happened while trying to connect to database ',error);
    }
}