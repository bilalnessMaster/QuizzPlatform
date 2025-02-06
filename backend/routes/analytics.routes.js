import express from 'express';
import {protectRoute} from '../middleware/auth.middleware.js'
import { getAnalytics, getAttemptsPerday } from '../controllers/analytics.controller.js';
const router = express.Router()

router.get('/getanalytics',protectRoute ,getAnalytics)
router.get('/attemptsPerday', protectRoute , getAttemptsPerday)
export default router;