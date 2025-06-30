import { catchAsync } from "../utils/catchAsync.js";
import User from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
import { promisify } from "util";
import jwt from "jsonwebtoken";
import { json } from "express";

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
  newUser.password = undefined;
  res.status(201).json({
    status: "success",
    data: newUser,
  });
});

export const login = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }, { password: 1, _id: -1 });
  if (user == null) {
    throw new Error("User not found");
  }
  const checkPassword = await user.comparePassword(
    user.password,
    password ?? ""
  );
  if (!checkPassword) {
    throw new Error("Username or Password didn't match!");
  }
  generateTokenAndSetCookie(user._id, res);
  res.json({
    status: "success",
    data: "You've logged into the application.",
  });
});

export const logout = catchAsync(async (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.json({
    status: "success",
    data: "You've logged out successfully!",
  });
});

export const getMe = catchAsync(async (req, res) => {
  return res.status(200).json({
    status: "success",
    data: {
      user: req.user,
    },
  });
});

export const protect = catchAsync(async (req, res, next) => {
  const { jwt: token } = req.cookies;

  if (!token) {
    throw new Error("User must be authenticated!");
  }

  const tokenDet = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  if (!tokenDet) {
    throw new Error("Invalid user token!");
  }

  const user = await User.findOne({ _id: tokenDet.userId });
  if (user == null) {
    throw new Error("User doesnot exist!");
  }
  user.password = undefined;
  req.user = user;
  next();
});
