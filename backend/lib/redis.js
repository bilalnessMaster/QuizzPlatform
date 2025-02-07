import Redis from "ioredis"
import dotenv from "dotenv";
dotenv.config();
export const clientRedis = new Redis(process.env.REDIS_SECRET_KEY);
