import dotenv from "dotenv";
import Groq from "groq-sdk/index.mjs";
dotenv.config();
export const Client = new Groq({
  apiKey: process.env.OPENAI_SECRET_KEY,
});
