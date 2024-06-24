import {Users} from "../modals/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const Register = async (req, res) => {
  try {
    const {email, username, password, name} = req.body;

    if (!name || !username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    // existed user

    const existedUser = await Users.findOne({
      $or: [{username}, {email}],
    });

    if (existedUser) {
      return res.status(409).json({
        messageg: "User with email or username already exists",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 14);

    const user = await Users.create({
      email,
      password: hashedPassword,
      name,
      username,
    });

    const createdUser = await Users.findById(user._id).select("-password");
    if (!createdUser) {
      return res.status(402).json({
        message: "Failed creating user ",
        success: false,
      });
    }

    return res.status(201).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error in registration:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const Login = async (req, res) => {
  const {email, password} = req.body;
  console.log(email, password);

  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const user = await Users.findOne({email});

    console.log(user._id);

    if (!user) {
      return res.status(400).json({
        message: "User does not exist",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Incorrect details",
        success: false,
      });
    }

    const token = jwt.sign({userId: user._id}, "sadfewdsv", {
      expiresIn: "1d",
    });

    return res
      .status(201)
      .cookie("token", token, {expiresIn: "1d", httpOnly: true})
      .json({
        message: "welcome user",
        user: user._id,
      });
  } catch (error) {
    return res.status(401).json({"Error login": error});
  }
};

export const UserDetails = async (req, res) => {
  try {
    const {id} = req.body;
    const user = await Users.findById({_id: id});

    return res.status(201).json({
      user,
      message: "User details found ",
      success: true,
    });
  } catch (error) {
    return res.status(401).json({"Error logout": error});
  }
};

export const Logout = async (req, res) => {
  try {
    return res.cookie("token", "", {expiresIn: new Date(Date.now())}).json({
      message: "User logged out successfuly",
      success: true,
    });
  } catch (error) {
    return res.status(401).json({"Error logout": error});
  }
};
