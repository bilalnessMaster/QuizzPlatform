import express from 'express';
import {protectRoute} from '../middleware/auth.middleware.js'
import { getleaderboard, updateRank } from '../controllers/leaderboard.controller.js';
const router = express.Router()

router.get('/rank', protectRoute , updateRank)
router.get('/getleaderboard' , getleaderboard)

export default router;