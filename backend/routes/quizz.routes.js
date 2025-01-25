import express from 'express';
import { getQcms } from '../controllers/quizz.controller.js';
const router = express.Router();

router.post('/getqcms', getQcms)

export default router