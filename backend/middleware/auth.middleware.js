import jwt from 'jsonwebtoken'
import User from '../models/User.model.js'


const protectRoute = async (req , res ,next) =>{
  try {
    const {accessToken}= req.cookies
    if(!accessToken) return res.status(401).json({
        message: 'you are unauthorize to make this operation'
    })
    jwt.verify(accessToken , process.env.SECRET, async (error , payload)=>{ 
        if(error) throw error
        const user = await User.findOne({_id : payload.userId}).select('-password')
        req.user = user
        next()
    })   
  } catch (error) {
    next(error)
    console.log('error while make you are connected',error);
    return res.status(500).json({
        success : true , 
        message : "internal error", 
    })
  }
}