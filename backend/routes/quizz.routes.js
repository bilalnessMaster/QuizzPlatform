import express from 'express';
import { getHistory, getQcms, quizAttempt } from '../controllers/quizz.controller.js';
import {protectRoute} from '../middleware/auth.middleware.js'
const router = express.Router();

router.post('/getqcms', getQcms)
router.post('/attempt',protectRoute,quizAttempt )
router.get('/history',protectRoute , getHistory)

export default router