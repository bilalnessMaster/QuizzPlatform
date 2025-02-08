import { clientRedis } from "../lib/redis.js";
import Analytics from "../models/Analytics.model.js";
import Attempt from "../models/Attempt.model.js";
export const getAnalytics = async (req, res) => {
  try {
    const userId = req.user._id;
    const analytics = await Analytics.findOne({ userId });
    if (!analytics) {
      const newAnalytics = await Analytics.create({
        userId,
      });
      return res
        .status(200)
        .json({ message: "get the analytics", analytics: newAnalytics });
    }
    const  yourPosition = await clientRedis.get(req.user._id.toString())
    res.status(200).json({ message: "get the analytics", analytics , yourPosition });
  } catch (error) {
    console.log("error occured while signing up " + error);
    return res.status(500).json({
      success: false,
      message: "internal error",
    });
  }
};

export const getAttemptsPerday = async (req, res) => {
  const today = new Date();
  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);
  const daysOfWeek = [
    { day: "Sunday", attempts: 0 },
    { day: "Monday", attempts: 0 },
    { day: "Tuesday", attempts: 0 },
    { day: "Wednesday", attempts: 0 },
    { day: "Thursday", attempts: 0 },
    { day: "Friday", attempts: 0 },
    { day: "Saturday", attempts: 0 },
  ];
  try {
    const attempts = await Attempt.aggregate([
      {
        $match: {
          userId: req.user._id,
          createdAt: {
            $gte: lastWeek,
            $lte: today,
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          attempts: { $sum: 1 },
          createdAt: { $first: "$createdAt" },
        },
      },
      {
        $project: {
          dayIndex: { $dayOfWeek: "$createdAt" },
          attempts: 1,
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const formattedAttempts = daysOfWeek?.map((day, indexDay) => {
      let attemptFound = attempts.find(
        (attempt) => (attempt.dayIndex -1)  === indexDay
      );

      return attemptFound
        ? { day: day.day, attempts: attemptFound.attempts }
        : { ...day };
    });
    res.status(200).json({
      formattedAttempts
    })
  } catch (error) {
    console.log("error occured while signing up " + error);
    return res.status(500).json({
      success: false,
      message: "internal error",
    });
  }
};
