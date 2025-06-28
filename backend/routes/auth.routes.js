import express from "express";
import {
  getMe,
  login,
  logout,
  protect,
  signup,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);
router.use(protect);

router.use(protect);
router.route("/logout").get(logout);
router.route("/me").get(getMe);

export default router;
