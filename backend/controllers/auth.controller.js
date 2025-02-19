import User from "../models/User.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
// export const signUp = async (req , res) => {
//     try {

//     } catch (error) {
//         console.log('error occured while signing up '+ error);

//     }
// }

export const signUp = async (req, res) => {
  try {
    const { gender, firstName, email, lastName, password } = req.body;
    const user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ message: "Email or username already exists" });
    if (password.length < 8)
      return res
        .status(400)
        .json({ message: "password must be 6 character long" });
    const newUser = new User({
      gender,
      firstName,
      lastName,
      email,
      password,
    });
    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, process.env.SECRET, {
      expiresIn: "3d",
    });

    res
      .cookie("accessToken", token, {
        httpOnly: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      })
      .json({ message: "user created succesfully" });
  } catch (error) {
    console.log("error occured while signing up " + error);
    res.status(500).json({ message: "something went wrong in server" });
  }
};
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Invalid credentials" });
    let match = await user.comparePassword(password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
      expiresIn: "3d",
    });
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      })
      .json({ success: true, message: "logged in  succesfully" });
  } catch (error) {
    console.log("error occured while signing in " + error);
    res.status(500).json({ message: "something went wrong in server " });
  }
};
export const Logout = async (req, res) => {
  try {
    res.clearCookie("accessToken");
    res.json({ message: "logged out sucessfully" });
  } catch (error) {
    console.log("error occured while logging  out  up " + error);
  }
};
export const profile = async (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    console.log("error occured while getting profile  " + error);
    res.status(500).json({ message: "something went wrong in server " });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const payload = req.body;
    const user = await User.findById(req.user._id)
    if(!user) return res.status(404).json({ message: "User not found" });
    const isMatch = await user.comparePassword(payload.password);
    if (!isMatch) return res.status(401).json({ message: "wrong passsword" });
    if(user.email !== payload.email){
        const taken = await User.findOne({email: payload.email})
        if(taken) return res.status(500).json({ message: "something wrong" })
        user.email = payload.email;
    }
    user.firstName = payload.firstName;
    user.lastName = payload.lastName;
    user.gender = payload.gender;
    if(payload.newPassword) { 
        user.password = payload.newPassword
    }
    await user.save();
    res.json({ message: "successfuly update" });
  } catch (error) {
    console.log("error occured while updating the profile  " + error);
    res.status(500).json({ message: "something went wrong in server " });
  }
};
