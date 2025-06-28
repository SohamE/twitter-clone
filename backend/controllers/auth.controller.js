import validator from "validator";
import { catchAsync } from "../utils/catchAsync.js";
import User from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export const signup = catchAsync(async (req, res) => {
  if (req.body == undefined) {
    throw new Error("User details not provided");
  }
  const { fullName, username, email, password } = req.body;
  const newUser = await User.create({
    username,
    fullName,
    email,
    password,
  });
  generateTokenAndSetCookie(newUser._id, res);
  res.status("201").json({
    status: "success",
    data: newUser,
  });
});

export const login = async (req, res) => {
  res.json({
    status: "success",
    data: "You hit the login endpoint",
  });
};

export const logout = async (req, res) => {
  res.json({
    status: "success",
    data: "You hit the logout endpoint",
  });
};
