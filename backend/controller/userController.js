import {Users} from "../modals/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
  const {email, username, password} = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
      success: false,
    });
  }

  const user = await Users.findOne(email);

  console.log(user);

  if (!user) {
    return res.status(400).json({
      message: "User does not exist",
      success: false,
    });
  }
};