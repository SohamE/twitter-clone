import User from "../models/user.model.js";
import { catchAsync } from "../utils/catchAsync.js";

export const getUserProfile = catchAsync(async (req, res, next) => {
  const { username } = req.params;
  const user = await User.findOne({ username }).select("-password");
  if (!user) {
    throw new Error("User not found!");
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

export const getSuggestedUsers = () => {};
export const followUnfollowUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  await User.updateOne({ _id: req.user._id }, { $push: { followers: userId } });
  await User.updateOne({ _id: userId }, { $push: { following: userId } });
  console.log(user);
});
export const updateUserProfile = () => {};
