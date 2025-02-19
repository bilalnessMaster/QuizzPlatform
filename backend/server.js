import express from 'express' ; 
import cors from 'cors'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import { db } from './lib/db.js';
import qcmRouter from './routes/quizz.routes.js';
import authRoutes from './routes/auth.routes.js'
import analyticsRoutes from './routes/analytics.routes.js'
import leaderboardRoutes from './routes/leaderboard.routes.js'
import aiRoutes from './routes/ai.routes.js'
// import { insert } from './lib/Configure.js';
dotenv.config()
const port = process.env.PORT || 5000
const app = express()
app.use(express.json({limit : '25mb'}))
app.use(cookieParser())
app.use(cors({
    origin : process.env.CLIENT_URL,
    credentials : true ,
}))

// nx mono repo
app.use('/api/v1/qcm' , qcmRouter)
app.use("/api/v1/auth", authRoutes )
app.use("/api/v1/analytics", analyticsRoutes )
app.use("/api/v1/leaderboard", leaderboardRoutes )
app.use("/api/v1/ai", aiRoutes )





app.listen(port , ()=>{
    db()
    console.log('server starts at port :',port);
})