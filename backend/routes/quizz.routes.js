import express from 'express';
import { getQcms, quizAttempt } from '../controllers/quizz.controller.js';
const router = express.Router();

router.post('/getqcms', getQcms)
router.post('/attempt',quizAttempt )

export default router