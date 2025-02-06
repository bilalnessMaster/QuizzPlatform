import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    streak: { type: Number, default: 0 }, 
    longestStreak: { type: Number, default: 0 },
    lastAttemptDate: { type: Date, default: null },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    console.log("error occured while hashing password " + error);
    next(error);
  }
});
userSchema.methods.comparePassword = async function (pwd) {
  try {
    return bcrypt.compare(pwd, this.password);
  } catch (error) {
    console.log(error);
    
  }
};

const User = mongoose.model("User", userSchema);

export default User;
