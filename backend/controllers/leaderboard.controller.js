
import Analytics from "../models/Analytics.model.js";
import Attempt from "../models/Attempt.model.js";
import Leaderboard from "../models/Leaderboard.model.js";

export const getleaderboard = async (req ,res) => {
    try {
        const page = Number(req.query.page) || 1;
        let limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        limit = Math.min(limit, 50); 
        const totalCount = await Leaderboard.countDocuments();
        if (skip >= totalCount) {
            return res.status(200).json({
                success: true,
                leaderboard: [],
                totalPages: Math.ceil(totalCount / limit),
                currentPage: page,
                message: "No more leaderboard entries.",
            });
        }
        const leaderboard = await Leaderboard.find()
        .populate("userId", 'firstName lastName -_id')
        .sort({accuracyPercentage : -1 ,totalPassedQuizzes : -1 , totalTimeSpent:-1 , attempts:-1})
        .skip(skip)
        .limit(limit)
        .select("-_id userId accuracyPercentage totalPassedQuizzes totalTimeSpent attempts")
        .lean();
        res.json({
            success: true,
            leaderboard,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: page,
        });
    } catch (error) {
        console.log("error while getleaderboard", error);
        return res.status(500).json({
          success: false,
          message: "internal error",
        });
    }
}

export const updateRank = async (req , res) => {
    try {
        const analytics  = await Analytics.findOne({userId  : req.user._id})
        if (!analytics ) return res.status(404).json({
            message : 'No analytics yet you need to playe to reveal your rank'
        })
        const attempts = await Attempt.countDocuments({userId  : req.user._id})

        
        const ranks = [
            { name: "Diamond", accuracy: 95, passed: 151, attempted: 1001 },
            { name: "Platinum", accuracy: 85, passed: 71, attempted: 601 },
            { name: "Gold", accuracy: 70, passed: 31, attempted: 301 },
            { name: "Silver", accuracy: 50, passed: 11, attempted: 101 },
            { name: "Bronze", accuracy: 0, passed: 0, attempted: 0 } 
        ]; 
        const rank = ranks.find((rank) => rank.accuracy <= analytics.accuracyPercentage && rank.attempted <= attempts && rank?.passed<=analytics.totalPassedQuizzes) 
        const leaderboad = await Leaderboard.findOneAndUpdate({userId :req.user._id} , {rank : rank.name || 'Bronze' , attempts ,accuracyPercentage : analytics.accuracyPercentage   ,totalPassedQuizzes : analytics.totalPassedQuizzes ,totalTimeSpent : analytics.totalTimeSpent})
        res.json({
            acc : analytics.accuracyPercentage , 
            passed : analytics.totalPassedQuizzes , 
            attempts : attempts , 
            rank :rank.name ,
        })
    } catch (error) {
        console.log("error while getleaderboard", error);
        return res.status(500).json({
          success: false,
          message: "internal error",
        });
    }
}