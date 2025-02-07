import express from 'express';
import {protectRoute} from '../middleware/auth.middleware.js'
import { getGeneratedQuizzAi } from '../controllers/ai.controller.js';
const router = express.Router()



router.post('/generatedQuizz' , protectRoute , getGeneratedQuizzAi)

export default router;