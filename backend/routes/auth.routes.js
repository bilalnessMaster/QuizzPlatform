import express from 'express';
import { Logout, profile, signIn, signUp, updateProfile,  } from '../controllers/auth.controller.js';
import {protectRoute} from '../middleware/auth.middleware.js'
const router = express.Router()

router.post('/signup',signUp)
router.post('/signin',signIn)
router.get('/loggout',Logout)
router.get('/me',protectRoute,profile)
router.put('/update',protectRoute,updateProfile)

export default router;