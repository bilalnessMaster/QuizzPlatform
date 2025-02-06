import Attempt from "../models/Attempt.model.js";
import Qcm from "../models/Qcm.model.js";
import User from "../models/User.model.js";
import Analytics from "../models/Analytics.model.js";
import Leaderboard from "../models/Leaderboard.model.js";

const updateStearks = async (userId) => {
  try {
    const user = await User.findById(userId);
    let lastAttemptDate = user?.lastAttemptDate
      ? new Date(user?.lastAttemptDate)
      : null;
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    yesterday.setHours(0, 0, 0, 0);
    lastAttemptDate?.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (lastAttemptDate?.getTime() === yesterday.getTime()) {
      user.streak += 1;
      user.longestStreak = Math.max(user.longestStreak, user.streak);
    } else if (lastAttemptDate?.getTime() !== today.getTime()) {
      user.streak = 1;
    }
    user.lastAttemptDate = today;

    await user.save();
  } catch (error) {
    console.log("error while saving attempt", error);
  }
};

export const getQcms = async (req, res) => {
  try {
    const filter = req.body;
    const qcms = await Qcm.aggregate([
      {
        $match: {
          category: { $in: filter.category },
          level: filter.level,
          language: filter.language,
        },
      },
      { $sample: { size: filter.numberQcms } },
    ]).limit(filter.numberQcms);

    res.status(200).json({
      success: true,
      message: "fetching data for qcms",
      qcms: qcms,
    });
  } catch (error) {
    console.log("error happened while fetching qcms", error);
    return res.status(500).json({
      success: true,
      message: "internal error",
    });
  }
};

export const quizAttempt = async (req, res) => {
  try {
    const payload = req.body;
    const newAttempt = new Attempt({
      ...payload,
    });  
    await newAttempt.save();
    const analytics = await Analytics.findOne({ userId: req.user._id });
    if (!analytics) {
      const newAnalytics = await Analytics.create({
        userId: req.user._id,
        totalQuestionsAttempted: payload?.maxScore,
        totalTimeSpent: payload?.timeTaken,
        accuracyPercentage: (payload?.score / payload?.maxScore) * 100,
        totalPassedQuizzes: payload?.status === "passed" ? 1 : 0,
        totalCorrectAnswers: payload?.status === "passed" ? payload?.score : 0,
      });
      const newLeader = await Leaderboard.create({
        userId : req.user._id, 
        analyticsId : newAnalytics._id
      })
    } else {
      analytics.totalQuestionsAttempted += payload?.maxScore;
      analytics.totalTimeSpent += payload?.timeTaken;
      analytics.totalPassedQuizzes += payload?.status === "passed" ? 1 : 0;
      analytics.totalCorrectAnswers +=
        payload?.status === "passed" ? payload?.score : 0;
      analytics.accuracyPercentage =
        (analytics.totalCorrectAnswers / analytics.totalQuestionsAttempted) *100;
      payload?.selectedAnswers?.map((answer) => {
        // answer = {category , question , answer:{answer , right}[]}
        answer.answers.map((obj)=>{
          if (!obj.right) {
            const findTopic = analytics.weakTopics.find(
              (topic) => topic.category === answer.category
            );
            if (findTopic) {
              findTopic.incorrectAnswers += 1;
            } else {
              analytics.weakTopics.push({
                category: answer.category,
                incorrectAnswers: 1,
              });
            }
          } else {
            const findTopic = analytics.strongTopics.find(
              (topic) => topic.category === answer.category
            );
            if (findTopic) {
              findTopic.correctAnswers += 1;
            } else {
              analytics.strongTopics.push({
                category: answer.category,
                correctAnswers: 1,
              });
            }
          }
        })       
      });
      await analytics.save();
    }
    await updateStearks(req.user._id);
    res.status(200).json({
      success: true,
      message: "attempt has been registed",
    });
  } catch (error) {
    console.log("error while saving attempt", error);
    return res.status(500).json({
      success: false,
      message: "internal error",
    });
  }
};

export const getHistory = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 8;
    const skip = (page - 1) * limit;
    limit = Math.min(limit, 50); 
    let totalPages = await Attempt.find({ userId: req.user._id })
    totalPages = Math.ceil(totalPages?.length/limit)
    const attempts = await Attempt.find({ userId: req.user._id }).select("-userId")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()
    res.status(200).json({
      success: true,
      message: "retreive recent activities",
      attempts,
      totalPages
    });
  } catch (error) { 
    console.log("error while gethistory", error);
    return res.status(500).json({
      success: false,
      message: "internal error",
    });
  }
};

export const getstearks = async (req, res) => {
  try {
  } catch (error) {
    console.log("error while getstearks", error);
    return res.status(500).json({
      success: false,
      message: "internal error",
    });
  }
};
