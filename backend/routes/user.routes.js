import express from "express";
import {
  followUnfollowUser,
  getSuggestedUsers,
  getUserProfile,
  updateUserProfile,
} from "../controllers/user.controller.js";
import { protect } from "../controllers/auth.controller.js";

const router = express.Router();

router.use(protect);

router.route("/profile/:username").get(getUserProfile);
router.route("/suggested").get(getSuggestedUsers);
router.route("/follow/:userId").post(followUnfollowUser);
router.route("/update").post(updateUserProfile);

export default router;
